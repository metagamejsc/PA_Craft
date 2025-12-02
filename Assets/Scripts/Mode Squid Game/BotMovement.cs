using System;
using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class BotMovement : MonoBehaviour
{
    //public static PlayerMovement2 ins;

    // private void Awake()
    // {
    //     ins = this;
    // }

    public float moveSpeed = 5f;
    public float jumpHeight = 5f;
    public float slopeForce = 5f;
    public float maxStepHeight = 0.5f;
    public float stepSmooth = 0.1f;
    public Transform groundCheck;
    public float groundDistance = .4f;
    public LayerMask groundMask;
    public Animator animator;
    public GameObject model;
    public ParticleSystem endEffect;

    private Rigidbody rb;
    private float xRotation = 0f;
    public bool isGrounded;
    private bool isJumping;
    private bool stopCoutine;
    [SerializeField] private float decisionInterval = 1f;
    private float decisionTimer = 0f;
    private bool shouldMove = false;
    private bool stopCoutineMove = false;

    public IEnumerator MoveAndIdle()
    {
        while (!stopCoutine)
        {
            animator.SetBool("isMoving", true);
            yield return new WaitForSeconds(2f);
            animator.SetBool("isMoving", false);
            yield return new WaitForSeconds(1f);
        }
    }
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        moveSpeed = LunaManager.ins.playerSpeed;
        jumpHeight = LunaManager.ins.playerJumpForce;
        // StartCoroutine(MoveAndIdle());
    }
    bool IsOnSlope()
    {
        RaycastHit hit;
        if (Physics.Raycast(transform.position, Vector3.down, out hit, 1.1f))
        {
            float angle = Vector3.Angle(hit.normal, Vector3.up);
            return angle > 0 && angle <= 45;
        }
        return false;
    }

    void StepClimb()
    {
        RaycastHit hitLower;
        RaycastHit hitUpper;

        Vector3 lowerStart = transform.position + Vector3.up * 0.1f;
        Vector3 upperStart = transform.position + Vector3.up * (maxStepHeight + 0.1f);

        if (Physics.Raycast(lowerStart, transform.forward, out hitLower, 0.5f) &&
            !Physics.Raycast(upperStart, transform.forward, out hitUpper, 0.5f))
        {
            rb.position += new Vector3(0f, stepSmooth, 0f) + transform.forward * 0.3f;
        }
    }
    void Update()
    {
        // if (GetComponent<ZombieChar>().isDead)
        // {
        //     animator.SetBool("isJumping", false);
        //     animator.Play("metarig|Fall");
        //     return;
        // }
        // isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        // //isGrounded=Physics.Raycast(groundCheck.position,Vector3.down,groundDistance,groundMask);
        // //Debug.DrawRay(groundCheck.position, Vector3.down * groundDistance, Color.red);
        // animator.SetBool("isJumping", !isGrounded);

    }
    public void Jump()
    {
        if (isGrounded)
        {
            animator.SetBool("isJumping", !isGrounded);
            //animator.Play("metarig|Character_Jump");
            rb.AddForce(new Vector3(0, jumpHeight, 0), ForceMode.Impulse);
        }
    }
    void FixedUpdate()
    {
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }

        // Đếm thời gian để quyết định lại sau mỗi decisionInterval
        decisionTimer -= Time.fixedDeltaTime;
        if (decisionTimer <= 0f)
        {
            decisionTimer = decisionInterval;
            MakeDecision();
        }

        float moveX = 0f;
        float moveZ = shouldMove ? 0.5f : 0f; // Chỉ đi theo trục Z

        Vector3 moveDirection = transform.forward * moveZ; // chỉ Z
        Vector3 velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;  // giữ nguyên tốc độ rơi
        rb.velocity = velocity;

        bool isMoving = moveZ != 0;
        animator.SetBool("isMoving", isMoving);
        // Nếu đang bắt đầu move, dừng coroutine 1 lần (giữ nguyên ý đồ code cũ)
        if (isMoving && !stopCoutineMove)
        {
            //StopCoroutine(MoveAndIdle());
            stopCoutineMove = true;
        }
        else if (!isMoving)
        {
            // Cho phép lần sau nếu lại move thì vẫn StopAllCoroutines 1 lần
            stopCoutineMove = false;
        }


    }

    private void MakeDecision()
    {
        float r = UnityEngine.Random.value; // 0..1

        if (GameController.ins.lightController.isScan) // ĐÈN ĐỎ
        {
            // 80% dừng, 20% vẫn đi và die
            if (r <= 0.8f)
            {
                shouldMove = false;
            }
            else
            {
                shouldMove = true;
                Debug.Log("die");
                if (GameController.ins.lightController.isScan && this.transform.position.z > -47)
                {
                    GetComponent<ZombieChar>().TakeDamage(999);
                    // LunaManager.ins.ShowEndCard();
                }

            }
        }
        else // ĐÈN XANH
        {
            // 80% đi, 20% đứng lại 1s rồi check tiếp
            if (r <= 0.8f)
            {
                shouldMove = true;
            }
            else
            {
                shouldMove = false;
                // Không cần làm gì thêm, vì decisionTimer đã set = 1s,
                // sau 1s sẽ tự MakeDecision() lại.
            }
        }
    }

    private void OnCollisionStay(Collision collision)
    {

    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Respawn"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                GetComponent<PlayerChar>().TakeDamage(999);
                LunaManager.ins.ShowEndCard();
            }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                var effect = Instantiate(endEffect);
                effect.transform.position = transform.position + new Vector3(0, 0, 2);
                animator.SetBool("isMoving", false);
                LunaManager.ins.ShowWinCard();
            }
        }
        if (other.CompareTag("Enemy"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                other.GetComponent<BoxCollider>().enabled = false;
                AudioManager.ins.PlaySoundReward();
                var effect = Instantiate(endEffect);
                effect.transform.position = transform.position + new Vector3(0, 0, 2);
            }
        }
    }
}