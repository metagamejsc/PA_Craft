using UnityEngine;

public class ChestController : MonoBehaviour
{
    public Animator animator;
    public GameObject arrow;
    public bool isOpened = false;
    public Material[] materials;      // size = 3
    public MeshRenderer[] meshRenderers1;   // size = 3
    public MeshRenderer[] meshRenderers2;   // size = 3
    public MeshRenderer[] meshRenderers3;   // size = 3
    public Color colorMesh1, colorMesh2, colorMesh3;
    private MaterialPropertyBlock mpb;
    public void ApplyMeshesAndMaterials()
    {
        Apply(meshRenderers1, materials[0], colorMesh1);
        Apply(meshRenderers2, materials[1], colorMesh2);
        Apply(meshRenderers3, materials[2], colorMesh3);
    }
    private void Awake()
    {
        mpb = new MaterialPropertyBlock();
    }
    private void Apply(MeshRenderer[] renderers, Material mat, Color color)
    {
        foreach (var r in renderers)
        {
            // gán material (shared OK)
            r.sharedMaterial = mat;

            // đổi màu RIÊNG
            r.GetPropertyBlock(mpb);
            mpb.SetColor("_Color", color);
            r.SetPropertyBlock(mpb);
        }
    }
    /*public void ApplyMeshesAndMaterials()
    {
        for (int i = 0; i < meshRenderers1.Length; i++)
        {
            meshRenderers1[i].sharedMaterial = materials[0];
            meshRenderers1[i].sharedMaterial.color = colorMesh1;
        }
        for (int i2 = 0; i2 < meshRenderers2.Length; i2++)
        {
            meshRenderers2[i2].sharedMaterial = materials[1];
            meshRenderers2[i2].sharedMaterial.color = colorMesh2;
        }
        for (int i3 = 0; i3 < meshRenderers3.Length; i3++)
        {
            meshRenderers3[i3].sharedMaterial = materials[2];
            meshRenderers3[i3].sharedMaterial.color = colorMesh3;
        }
    }*/
    private void OnMouseDown()
    {
        if (isOpened || ChestManager.Instance.isBusy) return;

        isOpened = true;
        arrow.SetActive(false);
        animator.SetTrigger("Open");
        AudioManager.ins.PlaySoundClick();
        ChestManager.Instance.isBusy = true;
        ChestManager.Instance.OpenChestAfterDelay(this, 1f);
    }

    public void ResetChest()
    {
        isOpened = false;
        arrow.SetActive(true);
        animator.Play("Idle", 0, 0f);
        ApplyMeshesAndMaterials();
    }
}