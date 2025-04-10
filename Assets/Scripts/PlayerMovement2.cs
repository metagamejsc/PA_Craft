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
        
        // Xử lý nhìn xung quanh bằng chuột
        /*float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -90f, 90f);  // Giới hạn góc nhìn dọc

        cameraTransform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        transform.Rotate(Vector3.up * mouseX);

        // Nhảy
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }*/
        
        
    }

    public void Jump()
    {
        if(isGrounded)
        {
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
        float moveX = 0;
        float moveZ = 0;
#if UNITY_EDITOR
         moveX = Input.GetAxis("Horizontal");
         moveZ = Input.GetAxis("Vertical");
#else     
         moveX = JoystickController.ins.Horizontal();
         moveZ = JoystickController.ins.Vertical();
#endif
        Vector3 moveDirection = new Vector3(moveX, 0, moveZ).normalized;

        // Xoay nhân vật theo hướng di chuyển nếu có input
        if (moveDirection != Vector3.zero)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDirection, Vector3.up);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, 10 * Time.deltaTime);
        }

        // Gán vận tốc cho Rigidbody
        rb.velocity = moveDirection * moveSpeed;
        
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
        // Kiểm tra nếu nhân vật đứng trên mặt đất
        /*if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }*/
    }

    private void OnCollisionExit(Collision collision)
    {
        /*if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = false;
        }*/
    }
}