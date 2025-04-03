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
        // Lấy input từ bàn phím (WASD)
        float moveX = 0;
        float moveZ = 0;
#if UNITY_EDITOR
         moveX = Input.GetAxis("Horizontal");
         moveZ = Input.GetAxis("Vertical");
#endif
         moveX = JoystickController.ins.Horizontal();
         moveZ = JoystickController.ins.Vertical();

        // Chuyển đổi hướng di chuyển theo góc nhìn
        Vector3 moveDirection = transform.right * moveX + transform.forward * moveZ;

        // Áp dụng lực di chuyển
        Vector3 velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;  // Giữ nguyên tốc độ rơi
        rb.velocity = velocity;
        
        if (IsOnSlope())
        {
            rb.AddForce(Vector3.down * slopeForce, ForceMode.Acceleration);
        }

        // Xử lý bước lên dốc (Step Climb)
        StepClimb();
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