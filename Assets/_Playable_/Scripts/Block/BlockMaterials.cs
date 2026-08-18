using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    [RequireComponent(typeof(MeshFilter))]
    [RequireComponent(typeof(MeshRenderer))]
    public class BlockMaterials : MonoBehaviour
    {
        [SerializeField] private Material _topMaterial;
        [SerializeField] private Material _sideAndBottomMaterial;
        [SerializeField, Range(0f, 1f)] private float _topNormalThreshold = 0.9f;

        public Material TopMaterial => _topMaterial;
        public Material SideAndBottomMaterial => _sideAndBottomMaterial;
        public float TopNormalThreshold => _topNormalThreshold;

        public static void SplitMeshByFace(Mesh mesh, float topNormalThreshold)
        {
            Vector3[] vertices = mesh.vertices;
            int[] sourceTriangles = mesh.triangles;
            List<int> topTriangles = new List<int>();
            List<int> sideAndBottomTriangles = new List<int>();

            for (int i = 0; i < sourceTriangles.Length; i += 3)
            {
                int indexA = sourceTriangles[i];
                int indexB = sourceTriangles[i + 1];
                int indexC = sourceTriangles[i + 2];

                Vector3 edgeA = vertices[indexB] - vertices[indexA];
                Vector3 edgeB = vertices[indexC] - vertices[indexA];
                Vector3 faceNormal = Vector3.Cross(edgeA, edgeB).normalized;
                List<int> targetTriangles = faceNormal.y >= topNormalThreshold
                    ? topTriangles
                    : sideAndBottomTriangles;

                targetTriangles.Add(indexA);
                targetTriangles.Add(indexB);
                targetTriangles.Add(indexC);
            }

            mesh.subMeshCount = 2;
            mesh.SetTriangles(topTriangles, 0, false);
            mesh.SetTriangles(sideAndBottomTriangles, 1, false);
            mesh.RecalculateBounds();
        }
    }
}
