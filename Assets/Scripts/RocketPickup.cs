using UnityEngine;

public class RocketPickup : MonoBehaviour
{
    public float rotateSpeed = 90f;
    public float bobHeight = 0.25f;
    public float bobSpeed = 2f;

    private bool isCollected;
    private Vector3 startPosition;

    private void Awake()
    {
        //EnsureCollider();
    }

    private void OnValidate()
    {
        //EnsureCollider();
    }

    private void OnEnable()
    {
        isCollected = false;
        startPosition = transform.position;
    }

    private void Update()
    {
        if (isCollected)
        {
            return;
        }

        transform.Rotate(Vector3.up, rotateSpeed * Time.deltaTime, Space.World);

        Vector3 pos = startPosition;
        pos.y += Mathf.Sin(Time.time * bobSpeed) * bobHeight;
        transform.position = pos;
    }

    public void PrepareForSpawn(Vector3 worldPosition)
    {
        startPosition = worldPosition;
        transform.position = worldPosition;
        isCollected = false;
        gameObject.SetActive(true);
    }

    public void TakeHit(float damage)
    {
        if (isCollected)
        {
            return;
        }

        isCollected = true;
        GameController.ins?.UnlockRocketWeapon(this);
    }

    public void HidePickup()
    {
        isCollected = true;
        gameObject.SetActive(false);
    }
    
}
