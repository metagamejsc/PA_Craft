using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    [SerializeField] private Button shootBtn;
    [SerializeField] private Transform point1;
    [SerializeField] private Transform point2;
    [SerializeField] private float maxRotateAngleX;
    [SerializeField] private float maxRotateAngleY;
    [SerializeField] private float rotateSpeed;
    [SerializeField] private Transform player;
    [SerializeField] private Vector3 startAngle;
    [SerializeField] private ParticleSystem shootVFX;
    [SerializeField] private BulletController bulletPrefab;
    [SerializeField] private float bulletSpeed;
    [SerializeField] private GameObject tut;
    private Queue<BulletController> bulletPool;
    [SerializeField] private GameObject hitVFXPrefab;
    private Queue<GameObject> hitVFXPool;
    private Vector3 oldAngle;
    private Vector2 startMousePos;

    private bool onCD;

    void Start()
    {
        bulletPool = new Queue<BulletController>();
        hitVFXPool = new Queue<GameObject>();
        oldAngle = startAngle;
        shootBtn.onClick.AddListener(Shoot);
    }

    void Update()
    {
        Rotate();
    }
    private void Rotate()
    {
        if (Input.touchCount <= 0) return;
        Touch touch = Input.GetTouch(0);
        if (EventSystem.current.IsPointerOverGameObject(touch.fingerId))
        {
            if (tut) Destroy(tut);
            return;
        }
        if (Input.GetMouseButtonDown(0))
        {
            startMousePos = Input.mousePosition;
        }
        if (Input.GetMouseButton(0))
        {
            Vector2 currentMousePos = Input.mousePosition;
            Vector2 dir = currentMousePos - startMousePos;
            Vector3 angle = new Vector2(rotateSpeed * -dir.y, rotateSpeed * dir.x);
            Vector3 currentAngle = new Vector3(
                Mathf.Abs(angle.x + oldAngle.x - startAngle.x) < maxRotateAngleX ?
                angle.x + oldAngle.x : oldAngle.x,
                Mathf.Abs(angle.y + oldAngle.y - startAngle.y) < maxRotateAngleY ?
                angle.y + oldAngle.y : oldAngle.y,
                oldAngle.z
            );

            Quaternion q = player.rotation;
            q.eulerAngles = currentAngle;
            player.rotation = q;
            oldAngle = currentAngle;
            startMousePos = currentMousePos;
        }
    }
    private void Shoot()
    {
        if (onCD) return;
        GameController.Ins.CountShoot();
        AudioController.Ins.Shoot();
        shootVFX.Play();
        SpawnBullet();
        transform.DORotate(oldAngle + new Vector3(-2, 0, 0), 0.1f).SetLoops(2, LoopType.Yoyo);
        StartCoroutine(CD());
        if (Physics.Raycast(point1.position, (point2.position - point1.position).normalized, out RaycastHit hit, 300f))
        {
            if (hit.collider)
            {
                Hit(hit.point, hit.collider.CompareTag("Point"));
            }
        }
    }
    private void SpawnBullet()
    {
        BulletController bullet;
        if (bulletPool.Count > 0)
        {
            bullet = bulletPool.Dequeue();
            bullet.gameObject.SetActive(true);
        }
        else
        {
            bullet = CreateNewBullet();
        }
        bullet.InitBullet(point2.position, point2.position - point1.position, bulletSpeed);
        StartCoroutine(ReturnBulletPool(bullet));
    }
    private BulletController CreateNewBullet()
    {
        return Instantiate(bulletPrefab);
    }
    private void SpawnHitVFX([Bridge.Ref] Vector3 pos)
    {
        GameObject hit;
        if (hitVFXPool.Count > 0)
        {
            hit = hitVFXPool.Dequeue();
            hit.transform.position = pos;
            hit.SetActive(true);
        }
        else
        {
            hit = CreateNewHitVFX();
            hit.transform.position = pos;
        }
        StartCoroutine(ReturnHitVFXPool(hit));
    }
    private GameObject CreateNewHitVFX()
    {
        return Instantiate(hitVFXPrefab);
    }
    private IEnumerator ReturnBulletPool(BulletController bullet)
    {
        yield return new WaitForSeconds(3);
        bullet.gameObject.SetActive(false);
        bulletPool.Enqueue(bullet);
    }
    private void Hit([Bridge.Ref] Vector3 pos, bool hitPoint)
    {
        SpawnHitVFX(pos);
        AudioController.Ins.Hit();
        if (hitPoint)
        {
            GameController.Ins.Win();
        }
    }
    private IEnumerator ReturnHitVFXPool(GameObject hit)
    {
        yield return new WaitForSeconds(3);
        hit.SetActive(false);
        hitVFXPool.Enqueue(hit);
    }
    private IEnumerator CD()
    {
        onCD = true;
        yield return new WaitForSeconds(1);
        onCD = false;
    }
    void OnDrawGizmosSelected()
    {
        Gizmos.DrawRay(point1.position, (point2.position - point1.position).normalized * 300);
    }
}
