using System;
using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerMovement2 : MonoBehaviour
{
    public static PlayerMovement2 ins;

    private void Awake()
    {
        ins = this;
    }

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

    // Thêm các biến cho tính năng leo thang
    public bool isClimbing = false;  // Biến kiểm tra xem player có đang leo thang không
    public Transform ladderCheck;  // Vị trí kiểm tra thang
    public float ladderCheckRadius = 1f;  // Bán kính kiểm tra thang
    public LayerMask ladderMask;  // Mask để xác định thang

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
        StartCoroutine(MoveAndIdle());
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
        if (GetComponent<PlayerChar>().isDead)
        {
            animator.SetBool("isJumping", false);
            animator.Play("metarig|Fall");
            return;
        }

        if (!isClimbing)
        {
            isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        }
        
        animator.SetBool("isJumping", !isGrounded);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            Jump();
        }

        if (isClimbing)
        {
            float moveY = 0;
            moveY = Input.GetAxis("Vertical");  // Đọc hướng di chuyển lên xuống (trục Y)

            // Nếu di chuyển lên thang
            if (moveY > 0)
            {
                rb.velocity = new Vector3(rb.velocity.x, moveY * moveSpeed, rb.velocity.z);
            }
            // Nếu di chuyển xuống thang
            else if (moveY < 0)
            {
                rb.velocity = new Vector3(rb.velocity.x, moveY * moveSpeed, rb.velocity.z);
            }
            else
            {
                rb.velocity = new Vector3(rb.velocity.x, 0, rb.velocity.z);  // Không di chuyển trên trục Y
            }

            // Xử lý khi player không còn tiếp xúc với thang
            if (!IsTouchingLadder())
            {
                isClimbing = false;
                rb.useGravity = true;  // Bật lại trọng lực
            }
        }
    }

    private bool IsTouchingLadder()
    {
        // Kiểm tra xem player có đang tiếp xúc với thang không
        Collider[] hitColliders = Physics.OverlapSphere(ladderCheck.position, ladderCheckRadius, ladderMask);
        return hitColliders.Length > 0;
    }


    private void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Ladder"))
        {
            isClimbing = false;
            rb.useGravity = true;  // Bật lại trọng lực khi ra khỏi thang
        }
    }

    public void Jump()
    {
        if (isGrounded)
        {
            animator.SetBool("isJumping", !isGrounded);
            rb.AddForce(new Vector3(0, jumpHeight, 0), ForceMode.Impulse);
        }
    }

    void FixedUpdate()
    {
        if (GameController.ins.isPauseGame || LunaManager.ins.isCretivePause)
            return;

        float moveX = 0, moveZ = 0;
#if UNITY_EDITOR
        moveX = Input.GetAxis("Horizontal");
        moveZ = Input.GetAxis("Vertical");
#else
        moveX = JoystickController.ins.Horizontal();
        moveZ = JoystickController.ins.Vertical();
#endif

        Vector3 inputDir = new Vector3(moveX, 0, moveZ);
        bool isMoving = inputDir.magnitude > 0.1f;

        if (isMoving && !stopCoutine)
        {
            StopAllCoroutines();
            stopCoutine = true;
        }

        // Hướng nhìn của camera
        Transform cam = Camera.main.transform;

        // Lấy hướng forward và right theo camera, loại bỏ thành phần Y (không nhìn lên xuống)
        Vector3 camForward = Vector3.Scale(cam.forward, new Vector3(1, 0, 1)).normalized;
        Vector3 camRight = Vector3.Scale(cam.right, new Vector3(1, 0, 1)).normalized;

        // Hướng di chuyển theo góc nhìn camera
        Vector3 moveDir = camForward * moveZ + camRight * moveX;

        // Gán vận tốc
        Vector3 velocity = moveDir.normalized * moveSpeed;
        velocity.y = rb.velocity.y;
        rb.velocity = velocity;

        // Xoay model theo hướng di chuyển
        if (isMoving)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDir);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, Time.deltaTime * 10f);
        }

        animator.SetBool("isMoving", isMoving);
        animator.SetBool("isJumping", !isGrounded);
    }

    private void OnCollisionStay(Collision collision)
    {
        // Xử lý va chạm nếu cần
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
        if (other.CompareTag("Ladder"))
        {
            isClimbing = true;
            rb.useGravity = false;  // Tắt trọng lực khi leo thang
            isGrounded = true;
        }
        if (other.CompareTag("Finish"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                animator.SetBool("isMoving", false);
                rb.velocity = Vector3.zero;
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
