using System;
using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerMovement2 : MonoBehaviour
{
    public static PlayerMovement2 ins;

    void Awake()
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
    public float climbSpeed = 3f;
    public float climbMinY = 0f;
    public float climbMaxY = 100f;
    public float timeClimb;

    Rigidbody rb;
    public bool isGrounded;
    bool stopCoutine;

    public bool isClimbing;
    //float climbMaxY;
    Collider currentClimbTrigger;
    int climbLayer;

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
        climbLayer = LayerMask.NameToLayer("Climb");
        timeClimb = LunaManager.ins.timeClimb;
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
            animator.SetBool("isClimbing", false);
            animator.Play("metarig|Fall");
            return;
        }

        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        animator.SetBool("isJumping", !isGrounded);
        animator.SetBool("isClimbing", isClimbing);

        if (Input.GetKeyDown(KeyCode.Space) && !isClimbing)
        {
            Jump();
        }
        if (isClimbing)
        {
            timeClimb -= Time.deltaTime;
            if (timeClimb <= 0)
            {
                LunaManager.ins.ShowEndCard();
            }
        }
    }

    public void Jump()
    {
        if (isGrounded && !isClimbing)
        {
            animator.SetBool("isJumping", !isGrounded);
            animator.Play("metarig|Character_Jump");
            rb.AddForce(new Vector3(0, jumpHeight, 0), ForceMode.Impulse);
        }
    }

    void FixedUpdate()
    {
        if (GameController.ins.isPauseGame) return;
        if (LunaManager.ins.isCretivePause) return;

        float moveX = 0;
        float moveZ = 0;

#if UNITY_EDITOR
        moveX = Input.GetAxis("Horizontal");
        moveZ = Input.GetAxis("Vertical");
#else
        moveX = JoystickController.ins.Horizontal();
        moveZ = JoystickController.ins.Vertical();
#endif

        if (isClimbing)
        {
            HandleClimb(moveZ);
            return;
        }

        Vector3 moveDirection = transform.right * moveX + transform.forward * moveZ;
        Vector3 angleDirection = new Vector3(moveX, 0, moveZ);

        if ((moveX != 0 || moveZ != 0) && !stopCoutine)
        {
            StopAllCoroutines();
            stopCoutine = true;
        }

        if (angleDirection != Vector3.zero)
        {
            Quaternion toRotation = Quaternion.LookRotation(angleDirection, Vector3.up);
        }

        Vector3 velocity = moveDirection * moveSpeed;
        velocity.y = rb.velocity.y;
        rb.velocity = velocity;

        bool isMoving = moveX != 0 || moveZ != 0;

        if (stopCoutine)
        {
            animator.SetBool("isMoving", isMoving);
        }
    }

    void HandleClimb(float moveZ)
    {
        if (!stopCoutine)
        {
            StopAllCoroutines();
            stopCoutine = true;
        }

        rb.velocity = Vector3.zero;
        rb.useGravity = false;

        Vector3 pos = transform.position;
        pos.y += moveZ * climbSpeed * Time.fixedDeltaTime;
        pos.y = Mathf.Clamp(pos.y, climbMinY, climbMaxY);
        transform.position = pos;

        bool isMovingClimb = Mathf.Abs(moveZ) > 0.01f;
        animator.speed = isMovingClimb ? 1f : 0f;
    }

    void OnCollisionStay(Collision collision)
    {
    }

    void OnCollisionEnter(Collision collision)
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

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                rb.velocity = Vector3.zero;
                animator.SetBool("isMoving", false);
                LunaManager.ins.ShowWinCard();
            }
        }

        if (other.gameObject.layer == climbLayer)
        {
            isClimbing = true;
            currentClimbTrigger = other;
            //climbMinY = other.bounds.min.y;
            // climbMaxY = other.bounds.max.y;

            Vector3 pos = transform.position;
            pos.y = climbMinY;
            transform.position = pos;
            //transform.position = new Vector3(0f, climbMinY, -3.2f);

            rb.velocity = Vector3.zero;
            rb.useGravity = false;

            animator.SetBool("isClimbing", true);
            //animator.speed = 0f;
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.gameObject.layer == climbLayer && other == currentClimbTrigger)
        {
            isClimbing = false;
            currentClimbTrigger = null;
            rb.useGravity = true;
            animator.SetBool("isClimbing", false);
            animator.speed = 1f;
        }
    }
}