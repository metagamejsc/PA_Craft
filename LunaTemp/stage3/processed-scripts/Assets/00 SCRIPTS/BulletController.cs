using UnityEngine;

public class BulletController : MonoBehaviour
{
    private Vector3 direction;
    private float speed;
    private void Update()
    {
        transform.position += speed * direction * Time.deltaTime;
    }
    public void InitBullet([Bridge.Ref] Vector3 pos, [Bridge.Ref] Vector3 dir, float speed)
    {
        transform.position = pos;
        direction = dir.normalized;
        this.speed = speed;
    }
}