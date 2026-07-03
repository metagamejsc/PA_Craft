using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Playable.EditorTools
{
    public class MeshCombinerWindow : EditorWindow
    {
        private GameObject _sourceRoot;
        private string _saveFolder = "Assets/_Playable_/Generated";
        private string _assetName = "CombinedMesh";
        private bool _disableSourceAfterCombine = true;

        [MenuItem("Tools/Mesh/Mesh Combiner")]
        public static void ShowWindow()
        {
            GetWindow<MeshCombinerWindow>("Mesh Combiner");
        }

        private void OnGUI()
        {
            EditorGUILayout.LabelField("Source", EditorStyles.boldLabel);
            _sourceRoot = (GameObject)EditorGUILayout.ObjectField("Root Object", _sourceRoot, typeof(GameObject), true);

            EditorGUILayout.Space(8f);
            EditorGUILayout.LabelField("Output", EditorStyles.boldLabel);
            _saveFolder = EditorGUILayout.TextField("Save Folder", _saveFolder);
            _assetName = EditorGUILayout.TextField("Asset Name", _assetName);
            _disableSourceAfterCombine = EditorGUILayout.Toggle("Disable Source", _disableSourceAfterCombine);

            EditorGUILayout.Space(12f);
            using (new EditorGUI.DisabledScope(_sourceRoot == null))
            {
                if (GUILayout.Button("Combine Meshes", GUILayout.Height(32f)))
                {
                    CombineSelectedHierarchy();
                }
            }
        }

        private void CombineSelectedHierarchy()
        {
            if (_sourceRoot == null)
            {
                EditorUtility.DisplayDialog("Missing Source", "Assign a root object first.", "OK");
                return;
            }

            List<MeshPart> meshParts = CollectMeshParts(_sourceRoot);
            if (meshParts.Count == 0)
            {
                EditorUtility.DisplayDialog(
                    "No Mesh Found",
                    "The selected object hierarchy does not contain any MeshFilter + MeshRenderer pairs.",
                    "OK");
                return;
            }

            Directory.CreateDirectory(_saveFolder);
            string meshAssetPath = AssetDatabase.GenerateUniqueAssetPath(Path.Combine(_saveFolder, _assetName + ".asset"));

            Dictionary<Material, List<CombineInstance>> combineByMaterial = new Dictionary<Material, List<CombineInstance>>();
            for (int i = 0; i < meshParts.Count; i++)
            {
                MeshPart part = meshParts[i];
                if (!combineByMaterial.TryGetValue(part.Material, out List<CombineInstance> combineList))
                {
                    combineList = new List<CombineInstance>();
                    combineByMaterial.Add(part.Material, combineList);
                }

                combineList.Add(new CombineInstance
                {
                    mesh = part.Mesh,
                    subMeshIndex = part.SubMeshIndex,
                    transform = part.LocalMatrix
                });
            }

            Mesh combinedMesh = new Mesh
            {
                name = _assetName
            };

            List<Mesh> tempMeshes = new List<Mesh>();
            List<CombineInstance> finalCombineInstances = new List<CombineInstance>();
            List<Material> finalMaterials = new List<Material>();

            foreach (KeyValuePair<Material, List<CombineInstance>> pair in combineByMaterial)
            {
                int materialVertexCount = CalculateVertexCount(pair.Value);
                Mesh materialMesh = new Mesh
                {
                    name = _assetName + "_" + pair.Key.name
                };

                if (materialVertexCount > 65535)
                {
                    materialMesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
                }

                materialMesh.CombineMeshes(pair.Value.ToArray(), true, true, false);
                tempMeshes.Add(materialMesh);

                finalCombineInstances.Add(new CombineInstance
                {
                    mesh = materialMesh,
                    subMeshIndex = 0,
                    transform = Matrix4x4.identity
                });
                finalMaterials.Add(pair.Key);
            }

            int finalVertexCount = 0;
            for (int i = 0; i < tempMeshes.Count; i++)
            {
                finalVertexCount += tempMeshes[i] != null ? tempMeshes[i].vertexCount : 0;
            }

            if (finalVertexCount > 65535)
            {
                combinedMesh.indexFormat = UnityEngine.Rendering.IndexFormat.UInt32;
            }

            combinedMesh.CombineMeshes(finalCombineInstances.ToArray(), false, false, false);

            for (int i = 0; i < tempMeshes.Count; i++)
            {
                DestroyImmediate(tempMeshes[i]);
            }

            AssetDatabase.CreateAsset(combinedMesh, meshAssetPath);
            AssetDatabase.SaveAssets();

            GameObject combinedObject = new GameObject(_assetName);
            Undo.RegisterCreatedObjectUndo(combinedObject, "Create Combined Mesh");
            combinedObject.transform.SetPositionAndRotation(Vector3.zero, Quaternion.identity);
            combinedObject.transform.localScale = Vector3.one;

            MeshFilter meshFilter = combinedObject.AddComponent<MeshFilter>();
            meshFilter.sharedMesh = combinedMesh;

            MeshRenderer meshRenderer = combinedObject.AddComponent<MeshRenderer>();
            meshRenderer.sharedMaterials = finalMaterials.ToArray();

            if (_disableSourceAfterCombine)
            {
                Undo.RecordObject(_sourceRoot, "Disable Source Root");
                _sourceRoot.SetActive(false);
            }

            Selection.activeGameObject = combinedObject;
            EditorGUIUtility.PingObject(combinedObject);
        }

        private static List<MeshPart> CollectMeshParts(GameObject sourceRoot)
        {
            List<MeshPart> parts = new List<MeshPart>();
            MeshFilter[] meshFilters = sourceRoot.GetComponentsInChildren<MeshFilter>(true);

            for (int i = 0; i < meshFilters.Length; i++)
            {
                MeshFilter meshFilter = meshFilters[i];
                MeshRenderer meshRenderer = meshFilter.GetComponent<MeshRenderer>();

                if (meshRenderer == null || meshFilter.sharedMesh == null)
                {
                    continue;
                }

                Material[] materials = meshRenderer.sharedMaterials;
                int subMeshCount = Mathf.Min(meshFilter.sharedMesh.subMeshCount, materials.Length);
                Matrix4x4 localMatrix = meshFilter.transform.localToWorldMatrix;

                for (int subMeshIndex = 0; subMeshIndex < subMeshCount; subMeshIndex++)
                {
                    Material material = materials[subMeshIndex];
                    if (material == null)
                    {
                        continue;
                    }

                    parts.Add(new MeshPart
                    {
                        Mesh = meshFilter.sharedMesh,
                        Material = material,
                        SubMeshIndex = subMeshIndex,
                        LocalMatrix = localMatrix
                    });
                }
            }

            return parts;
        }

        private static int CalculateVertexCount(List<CombineInstance> combineInstances)
        {
            int vertexCount = 0;

            for (int i = 0; i < combineInstances.Count; i++)
            {
                if (combineInstances[i].mesh == null)
                {
                    continue;
                }

                vertexCount += combineInstances[i].mesh.vertexCount;
            }

            return vertexCount;
        }

        private struct MeshPart
        {
            public Mesh Mesh;
            public Material Material;
            public int SubMeshIndex;
            public Matrix4x4 LocalMatrix;
        }
    }
}
