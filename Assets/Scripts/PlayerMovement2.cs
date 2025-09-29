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
        //rb.interpolation = RigidbodyInterpolation.Interpolate;
        //rb.collisionDetectionMode = CollisionDetectionMode.ContinuousSpeculative;
        //rb.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationZ;

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
        animator.SetBool("isMoving", true);
    }
    
    private void OnCollisionStay(Collision collision)
    {
        
    }

    public void StartMove()
    {
        //moveZ = 1;
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
        if (other.CompareTag("Enemy"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                animator.SetBool("isMoving", false);
                GetComponent<PlayerChar>().Die();
                LunaManager.ins.ShowEndCard();
            }
        }
    }
}