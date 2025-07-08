using UnityEngine;

public class WhirlwindProjectile : MonoBehaviour
{
    public float speed = 10f;
    public float pushForce = 500f;
    public float groundSlideSpeed = 5f;
    public LayerMask enemyLayer;
    public LayerMask groundLayer;
    public float timeLife = 7;

    private Rigidbody rb;
    private bool isSlidingOnGround = false;
    private Vector3 slideDirection;
    public float damagePerSecond = 1f;
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        rb.velocity = transform.forward * speed;
        Destroy(gameObject, timeLife); // Tự hủy sau thời gian nhất định
    }

    void OnTriggerEnter(Collider other)
    {
        int otherLayer = other.gameObject.layer;

        // Nếu chạm enemy
        if (((1 << otherLayer) & enemyLayer) != 0)
        {
            Rigidbody enemyRb = other.GetComponent<Rigidbody>();
            if (enemyRb != null)
            {
                Vector3 pushDir = (other.transform.position - transform.position).normalized;
                enemyRb.AddForce(pushDir * pushForce);
            }
        }

        // Nếu chạm đất
        if (!isSlidingOnGround && ((1 << otherLayer) & groundLayer) != 0)
        {
            isSlidingOnGround = true;
            slideDirection = new Vector3(rb.velocity.x, 0f, rb.velocity.z).normalized;
            rb.velocity = Vector3.zero; // Reset lực rơi
            rb.useGravity = false; // tắt gravity để giữ trượt
        }
    }

    void FixedUpdate()
    {
        if (isSlidingOnGround)
        {
            rb.MovePosition(transform.position + slideDirection * groundSlideSpeed * Time.fixedDeltaTime);
        }
    }
    void OnTriggerStay(Collider other)
    {
        // Kiểm tra nếu object trong layer enemy
        if (((1 << other.gameObject.layer) & enemyLayer) != 0)
        {
            // Gây sát thương mỗi giây
            BaseCharacter target = other.GetComponent<BaseCharacter>();
            if (target != null)
            {
                target.TakeDamage(damagePerSecond * Time.deltaTime);
            }
        }
    }
}