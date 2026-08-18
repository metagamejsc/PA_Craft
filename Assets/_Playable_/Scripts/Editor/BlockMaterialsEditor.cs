using System.IO;
using Playable;
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(BlockMaterials))]
public class BlockMaterialsEditor : Editor
{
    private const string GeneratedMeshFolder = "Assets/_Playable_/GeneratedMeshes";

    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();
        EditorGUILayout.Space(8f);

        BlockMaterials blockMaterials = (BlockMaterials)target;
        using (new EditorGUI.DisabledScope(!CanApply(blockMaterials)))
        {
            if (GUILayout.Button("Apply Materials To Mesh", GUILayout.Height(32f)))
            {
                ApplyInEditor(blockMaterials);
            }
        }

        EditorGUILayout.HelpBox(
            "Nút này tạo một mesh asset có 2 submesh và gán material trực tiếp trong Editor. Không có xử lý runtime.",
            MessageType.Info);
    }

    private static bool CanApply(BlockMaterials blockMaterials)
    {
        MeshFilter meshFilter = blockMaterials.GetComponent<MeshFilter>();
        return meshFilter != null &&
               meshFilter.sharedMesh != null &&
               blockMaterials.TopMaterial != null &&
               blockMaterials.SideAndBottomMaterial != null;
    }

    private static void ApplyInEditor(BlockMaterials blockMaterials)
    {
        EnsureGeneratedFolder();

        MeshFilter meshFilter = blockMaterials.GetComponent<MeshFilter>();
        MeshRenderer meshRenderer = blockMaterials.GetComponent<MeshRenderer>();
        Mesh generatedMesh = Object.Instantiate(meshFilter.sharedMesh);
        generatedMesh.name = blockMaterials.gameObject.name + "_TwoMaterials";
        BlockMaterials.SplitMeshByFace(generatedMesh, blockMaterials.TopNormalThreshold);

        string fileName = MakeSafeFileName(generatedMesh.name) + ".asset";
        string assetPath = AssetDatabase.GenerateUniqueAssetPath(
            Path.Combine(GeneratedMeshFolder, fileName).Replace('\\', '/'));

        AssetDatabase.CreateAsset(generatedMesh, assetPath);
        Undo.RecordObjects(new Object[] { meshFilter, meshRenderer }, "Apply Block Materials");
        meshFilter.sharedMesh = generatedMesh;
        meshRenderer.sharedMaterials = new[]
        {
            blockMaterials.TopMaterial,
            blockMaterials.SideAndBottomMaterial
        };

        EditorUtility.SetDirty(meshFilter);
        EditorUtility.SetDirty(meshRenderer);
        AssetDatabase.SaveAssets();
        EditorGUIUtility.PingObject(generatedMesh);
    }

    private static void EnsureGeneratedFolder()
    {
        if (!AssetDatabase.IsValidFolder(GeneratedMeshFolder))
        {
            AssetDatabase.CreateFolder("Assets/_Playable_", "GeneratedMeshes");
        }
    }

    private static string MakeSafeFileName(string fileName)
    {
        foreach (char invalidCharacter in Path.GetInvalidFileNameChars())
        {
            fileName = fileName.Replace(invalidCharacter, '_');
        }

        return fileName;
    }
}
