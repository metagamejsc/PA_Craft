using System;
using UnityEngine;

public class LaserGun : MonoBehaviour
{
    public float range = 100f;
    public float damagePerSecond = 10f;
    public LineRenderer lineRenderer;
    public Transform firePoint;
    public LayerMask hitLayers;
    public Transform gunPivot; // thêm object xoay súng
    public PlayerChar playerCharacter; // Tham chiếu đến PlayerCharacter
    public AudioSource fireSound; // Âm thanh bắn
    public ParticleSystem startEffect; // Particle tại điểm đầu
    public ParticleSystem endEffect;  
    private RaycastHit hit;
    private bool isFiring = false;

    private void Awake()
    {
        playerCharacter = FindObjectOfType<PlayerChar>();
    }

    void Update()
    {
        if (isFiring)
        {
            FireLaser();
        }
        
    }
    public void CancleFire()
    {
        lineRenderer.enabled = false;
    }
    private void OnEnable()
    {
        playerCharacter.fire += StartFire; // Đăng ký sự kiện khi sử dụng
        playerCharacter.canleFire += StopFire; // Đăng ký sự kiện khi sử dụng
    }

    private void OnDisable()
    {
        playerCharacter.fire -= StartFire; // Hủy đăng ký sự kiện khi không còn sử dụng
        playerCharacter.canleFire -= StopFire; // Hủy đăng ký sự kiện khi không còn sử dụng
    }
    public void StartFire()
    {
        isFiring = true;
        fireSound.enabled = true;
    }
    public void StopFire()
    {
        isFiring = false;
        if (startEffect != null) startEffect.Stop();
        if (endEffect != null) endEffect.Stop();
        fireSound.enabled = false;
        lineRenderer.enabled = false;
    }
    
    void FireLaser()
    {
        Ray screenRay = Camera.main.ScreenPointToRay(new Vector3(Screen.width / 2, Screen.height / 2));
        Vector3 endPosition = firePoint.position + screenRay.direction * range;

        if (Physics.Raycast(screenRay, out hit, range, hitLayers))
        {
            endPosition = hit.point;

            BaseCharacter target = hit.collider.GetComponent<BaseCharacter>();
            if (target != null)
            {
                target.TakeDamage(damagePerSecond * Time.deltaTime);
            }
        }

        if (gunPivot != null)
        {
            Vector3 lookDirection = endPosition - gunPivot.position;
            if (lookDirection != Vector3.zero)
                gunPivot.rotation = Quaternion.LookRotation(lookDirection);
        }

        ShowLaser(firePoint.position, endPosition);

        // ⚡ Di chuyển và kích hoạt particle
        if (startEffect != null)
        {
            startEffect.transform.position = firePoint.position;
            if (!startEffect.isPlaying)
                startEffect.Play();
        }

        if (endEffect != null)
        {
            endEffect.transform.position = endPosition;
            if (!endEffect.isPlaying)
                endEffect.Play();
        }
    }

    void ShowLaser(Vector3 start, Vector3 end)
    {
        lineRenderer.SetPosition(0, start);
        lineRenderer.SetPosition(1, end);
        if (!lineRenderer.enabled) lineRenderer.enabled = true;
    }
}