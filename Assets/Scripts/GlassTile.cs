using System;
using UnityEngine;

public class GlassTile : MonoBehaviour
{
    public bool isSafe = false; // được đặt bởi GameManager
    public Material mainMaterial;
    public Material safeMaterial;
    public MeshRenderer meshRenderer;
    public GlassBreak breakEffect;
    public AudioClip jumpSound;
    private bool steppedOn = false;

    private Rigidbody rb;
    private MeshCollider boxCollider;

    private void Start()
    {
        rb = GetComponent<Rigidbody>();
        boxCollider = GetComponent<MeshCollider>();
        meshRenderer.material= mainMaterial;
    }
    
    public void ResetTile()
    {
        steppedOn = false;
        rb.isKinematic = true;
        rb.useGravity = false;
        //transform.localPosition = Vector3.zero; // Đặt lại vị trí nếu cần
        //transform.localRotation = Quaternion.identity; // Đặt lại góc quay nếu cần
    }
    
    void OnCollisionEnter(Collision collision)
    {
        if (!collision.gameObject.CompareTag("Player")) return;

        if (isSafe && steppedOn==false)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }
        GameController.ins.currentStep++;
        steppedOn = true;
        AudioSource.PlayClipAtPoint(jumpSound, transform.position);
        if (!isSafe)
        {
            GameController.ins.UIJump.SetActive(false);
            BreakGlass();
        }
        else
        {
            GameController.ins.UIJump.SetActive(true);
        }
    }

    void BreakGlass()
    {
        rb.isKinematic = false;
        rb.useGravity = true;
        boxCollider.enabled = false; // Tắt collider để tránh va chạm sau khi vỡ
        gameObject.SetActive(false);
        Instantiate(breakEffect, transform.position, Quaternion.identity);
    }
    public void OnStart()
    {
        rb = GetComponent<Rigidbody>();
        rb.isKinematic = true;
        rb.useGravity = false;
    }

    public void SetDefaultMaterial()
    {
        meshRenderer.material= mainMaterial;
    }
    public void SetSafeMaterial()
    {
        meshRenderer.material= safeMaterial;
    }
}