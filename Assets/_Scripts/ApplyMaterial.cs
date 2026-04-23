using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ApplyMaterial : MonoBehaviour
{
   public Material material;
   public MeshRenderer meshRenderer;
   private Material _variable;
   [ContextMenu("Apply")]
   public void Setup()
   {
      for (int i = 0; i < meshRenderer.sharedMaterials.Length; i++)
      {
         meshRenderer.sharedMaterials[i]=material;
      }
   }
}
