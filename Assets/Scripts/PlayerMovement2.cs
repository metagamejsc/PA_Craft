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
    
    private Rigidbody rb;
    private float xRotation = 0f;
    private bool isGrounded;
    private bool isJumping;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
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
        Vector3 velocity;
        if (GameController.ins.isPauseGame)
        {
            return;
        }
        if (LunaManager.ins.isCretiveEnd)
        {
            rb.velocity= Vector3.zero;
            return;
        }
        if (GetComponent<PlayerChar>().isDead)
        {
            return;
        }
        // Lấy input từ bàn phím (WASD)
        float moveX = 0;
        float moveZ = 0;
#if UNITY_EDITOR
         moveX = Input.GetAxis("Horizontal");
         moveZ = Input.GetAxis("Vertical");
#else     
         moveX = JoystickController.ins.Horizontal();
         moveZ = JoystickController.ins.Vertical();
#endif
        
        Vector3 moveDirection = transform.right * moveX + transform.forward * moveZ;
        Vector3 angleDirection = new Vector3(moveX, 0, moveZ);
        
        if (angleDirection != Vector3.zero)
        {
            Quaternion toRotation = Quaternion.LookRotation(angleDirection, Vector3.up);
        }
        velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;  // Giữ nguyên tốc độ rơi
        if (!rb.isKinematic)
        {
            rb.velocity = velocity;
        }
        bool isMoving = moveX != 0 || moveZ != 0;
        if (isGrounded)
        {
            /*if (isMoving)
                animator.Play("metarig|Walk");
            else
                animator.Play("metarig|Idle");*/
        }
        animator.SetBool("isMoving", isMoving);
        if (IsOnSlope())
        {
            //rb.AddForce(Vector3.down * slopeForce, ForceMode.Acceleration);
        }

        // Xử lý bước lên dốc (Step Climb)
        //StepClimb();
    }
    
    private void OnCollisionStay(Collision collision)
    {
        
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Respawn"))
        {
            if (!LunaManager.ins.isCretiveEnd)
            {
                GetComponent<PlayerChar>().TakeDamage(999);
                //LunaManager.ins.ShowEndCard();
            }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish"))
        {
            if (!LunaManager.ins.isCretiveEnd)
            {
                animator.SetBool("isMoving", false);
                LunaManager.ins.ShowEndCard();
            }
        }
    }
}