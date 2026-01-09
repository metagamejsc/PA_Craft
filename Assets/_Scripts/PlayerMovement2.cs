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
        jumpHeight=LunaManager.ins.playerJumpForce;
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
            rb.position += new Vector3(0f, stepSmooth, 0f)+ transform.forward * 0.3f;
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
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        //isGrounded=Physics.Raycast(groundCheck.position,Vector3.down,groundDistance,groundMask);
        //Debug.DrawRay(groundCheck.position, Vector3.down * groundDistance, Color.red);
        animator.SetBool("isJumping", !isGrounded);
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
            //animator.Play("metarig|Character_Jump");
            rb.AddForce(new Vector3(0,jumpHeight,0),ForceMode.Impulse);
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
                //var effect= Instantiate(endEffect);
                //effect.transform.position = transform.position + new Vector3(0, 0, 2);
                animator.SetBool("isMoving", false);
                rb.velocity = Vector3.zero;
                LunaManager.ins.ShowWinCard();
            }
        }
        /*if (other.CompareTag("Enemy"))
        {
            if (!LunaManager.ins.isCretivePause)
            {
                other.GetComponent<BoxCollider>().enabled = false;
                AudioManager.ins.PlaySoundReward();
                var effect= Instantiate(endEffect);
                effect.transform.position = transform.position + new Vector3(0, 0, 2);
            }
        }*/
    }
}