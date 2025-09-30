using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SurikenBullet : MonoBehaviour
{
    public void Start()
    {
        // Hủy quả đạn sau 3 giây nếu không va chạm
        Destroy(gameObject, 10f);
    }
    public void OnTriggerEnter(Collider other)
    {
        /*if (other.CompareTag("Enemy"))
        {
            Destroy(gameObject); // Hủy quả đạn sau khi va chạm
        }*/
    }
}
