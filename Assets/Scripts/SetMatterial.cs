using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetMatterial : MonoBehaviour
{
    public Material tileMaterial;
    public Renderer plane;
    public Vector3 size = new Vector3(1, 1, 1);

    void Start()
    {
        size = transform.localScale;
        plane = GetComponent<Renderer>();
        if (tileMaterial != null)
        {
            Renderer rend = plane.GetComponent<Renderer>();
            rend.material = tileMaterial;
            rend.material.mainTextureScale = size;
        }
    }

    [ContextMenu("SetMesh")]
    public void SetMeshSize()
    {
        
        plane = GetComponent<Renderer>();
        if (tileMaterial != null)
        {
            Renderer rend = plane.GetComponent<Renderer>();
            rend.material = tileMaterial;
            rend.material.mainTextureScale = size;
        }
    }
}