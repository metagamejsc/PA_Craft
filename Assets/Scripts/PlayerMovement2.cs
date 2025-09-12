using System;
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

    public float moveSpeed => LunaManager.ins.playerSpeed;
    public float jumpHeight = 5f;
    public float slopeForce = 5f;
    public float maxStepHeight = 0.5f;
    public float stepSmooth = 0.1f;
    public Transform groundCheck;
    public float groundDistance = .4f;
    public LayerMask groundMask;
    public Animator animator;
    public GameObject model;
    public float moveX, moveZ;
    
    private Rigidbody rb;
    private CapsuleCollider cap;
    private float xRotation = 0f;
    private bool isGrounded;
    private bool isJumping;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        cap = GetComponent<CapsuleCollider>();

        // Giảm khả năng kẹt và rung
        rb.interpolation = RigidbodyInterpolation.Interpolate;
        rb.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
        rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;

        // Tăng contact offset 1 chút để bớt dính cạnh
        //cap.contactOffset = 0.05f;
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
            rb.position += new Vector3(0f, stepSmooth, 0f)+ transform.forward * 0.3f;
        }
    }
    void Update()
    {
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        if (Input.GetKeyDown(KeyCode.Space))
        {
            Jump();
        }
    }
    public void Jump()
    {
        if(isGrounded)
        {
            animator.SetBool("isJumping", !isGrounded);
            rb.AddForce(new Vector3(0,jumpHeight,0),ForceMode.Impulse);
        }
    }
    void FixedUpdate()
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        // Lấy input từ bàn phím (WASD)
        
/*#if UNITY_EDITOR
         moveX = Input.GetAxis("Horizontal");
         moveZ = Input.GetAxis("Vertical");
#else     
         moveX = JoystickController.ins.Horizontal();
         moveZ = JoystickController.ins.Vertical();
#endif*/
        /*Vector3 moveDirection = new Vector3(moveX, 0, moveZ).normalized;

        // Xoay nhân vật theo hướng di chuyển nếu có input
        if (moveDirection != Vector3.zero)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, 10 * Time.deltaTime);
        }*/

        // Gán vận tốc cho Rigidbody

        /*// Chuyển đổi hướng di chuyển theo góc nhìn
        Vector3 moveDirection = transform.right * moveX + transform.forward * moveZ;
        Vector3 angleDirection = new Vector3(moveX, 0, moveZ);
        if (angleDirection != Vector3.zero)
        {
            // Xoay trục Y theo hướng di chuyển
            Quaternion toRotation = Quaternion.LookRotation(angleDirection, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, toRotation, Time.deltaTime * 10f);
        }
        // Áp dụng lực di chuyển
        Vector3 velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;  // Giữ nguyên tốc độ rơi
        rb.velocity = velocity;*/
        
        Vector3 moveDirection = transform.right * moveX + transform.forward * moveZ;
        Vector3 angleDirection = new Vector3(moveX, 0, moveZ);
        
        if (angleDirection != Vector3.zero)
        {
            
            //Camera.main.transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
            // Xoay trục Y theo hướng di chuyển
            Quaternion toRotation = Quaternion.LookRotation(angleDirection, Vector3.up);
            //transform.rotation = Quaternion.Slerp(transform.rotation, toRotation, Time.deltaTime * 10f);
        }
        Vector3 velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;  // Giữ nguyên tốc độ rơi
        rb.velocity = velocity;
        bool isMoving = moveX != 0 || moveZ != 0;
        if (isGrounded)
        {
            /*if (isMoving)
                animator.Play("metarig|Walk");
            else
                animator.Play("metarig|Idle");*/
        }
        animator.SetBool("isMoving", isMoving);
        /*if (IsOnSlope())
        {
            rb.AddForce(Vector3.down * slopeForce, ForceMode.Acceleration);
        }

        // Xử lý bước lên dốc (Step Climb)
        StepClimb();*/
    }
    
    private void OnCollisionStay(Collision collision)
    {
        
    }

    public void StartMove()
    {
        moveZ = 1;
    }
    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Respawn"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                GetComponent<PlayerChar>().Die();
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
                animator.SetBool("isMoving", false);
                LunaManager.ins.ShowEndCard();
            }
        }
    }
}