using System;
using UnityEngine;

public class IceGun : MonoBehaviour
{
    public GameObject iceProjectilePrefab;
    public Transform firePoint;
    public float fireRate = 1f; // Tốc độ bắn
    public float timeCanFire;
    public PlayerChar playerCharacter; // Tham chiếu đến PlayerCharacter
    public AudioClip fireSound; // Âm thanh bắn
    void Update()
    {
        timeCanFire -= Time.deltaTime;
    }

    private void Awake()
    {
        playerCharacter = FindObjectOfType<PlayerChar>();
    }

    private void OnEnable()
    {
        playerCharacter.fire += ShootTowardCenter; // Đăng ký sự kiện khi sử dụng
    }

    private void OnDisable()
    {
        playerCharacter.fire -= ShootTowardCenter; // Hủy đăng ký sự kiện khi không còn sử dụng
    }

    void ShootTowardCenter()
    {
        // Lấy ray từ tâm màn hình
        if (timeCanFire>0)
        {
            return;
        }

        if (fireSound)
        {
            AudioManager.ins.PlaySound(fireSound);
        }
        
        timeCanFire= fireRate;
        Ray ray = Camera.main.ScreenPointToRay(new Vector3(Screen.width / 2, Screen.height / 2));
        Vector3 targetPoint;

        if (Physics.Raycast(ray, out RaycastHit hit, 100f))
        {
            targetPoint = hit.point;
        }
        else
        {
            targetPoint = ray.origin + ray.direction * 100f;
        }

        // Tính hướng và quay đạn
        Vector3 shootDir = (targetPoint - firePoint.position).normalized;
        Quaternion rotation = Quaternion.LookRotation(shootDir);
        // Kiểm tra thời gian có thể bắn
        
        Instantiate(iceProjectilePrefab, firePoint.position, rotation);
    }
}