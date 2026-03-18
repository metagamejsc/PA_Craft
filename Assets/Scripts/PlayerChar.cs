using System;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerChar : BaseCharacter
{
    public LevelProgressUI progressUI;
    public GameObject swordFake;
    public Transform swordFakePos;
    public Transform swordPos;

    [Header("Movement")]
   
    public float jumpForce = 5f;

    public Transform groundCheck;
    public float groundDistance = 0.4f;
    public LayerMask groundMask;


    public GameObject model;

    Rigidbody rb;
    bool isGrounded;

    protected override void Start()
    {
        base.Start();

        rb = GetComponent<Rigidbody>();

        moveSpeed = LunaManager.ins.playerSpeed;
        jumpForce = LunaManager.ins.playerJumpForce;
        
        IsFindingEnemy = true;
    }

    protected override void Update()
    {
        if (GameController.ins.isPauseGame) return;

        HandleJump();

        SearchForEnemy();

        attackCooldown -= Time.deltaTime;
    }

    void FixedUpdate()
    {
        if (GameController.ins.isPauseGame || LunaManager.ins.isCretivePause)
            return;

        Move();
    }

    #region MOVEMENT

    void Move()
    {
        float moveX = 0;
        float moveZ = 0;

#if UNITY_EDITOR
        moveX = Input.GetAxis("Horizontal");
        moveZ = Input.GetAxis("Vertical");
#else
        moveX = JoystickController.ins.Horizontal();
        moveZ = JoystickController.ins.Vertical();
#endif

        Vector3 inputDir = new Vector3(moveX, 0, moveZ);
        bool isMoving = inputDir.magnitude > 0.1f;

        if (isMoving)
        {
            if (progressUI != null)
            {
                progressUI.SendMessage("UpdateProgress");
            }
            Transform cam = Camera.main.transform;

            Vector3 camForward = Vector3.Scale(cam.forward, new Vector3(1, 0, 1)).normalized;
            Vector3 camRight = Vector3.Scale(cam.right, new Vector3(1, 0, 1)).normalized;

            Vector3 moveDir = camForward * moveZ + camRight * moveX;

            Vector3 velocity = moveDir.normalized * moveSpeed;
            velocity.y = rb.velocity.y;

            rb.velocity = velocity;

            Quaternion targetRotation = Quaternion.LookRotation(moveDir);

            /*model.transform.rotation = Quaternion.Slerp(
                model.transform.rotation,
                targetRotation,
                Time.deltaTime * 10f
            );*/
        }
        else
        {
            rb.velocity = new Vector3(0, rb.velocity.y, 0);
        }

        animator.SetBool("isMoving", isMoving);
    }

    #endregion

    #region JUMP

    void HandleJump()
    {
        isGrounded = Physics.CheckSphere(
            groundCheck.position,
            groundDistance,
            groundMask
        );

        animator.SetBool("isJumping", !isGrounded);

        if (Input.GetKeyDown(KeyCode.Space))
        {
            Jump();
        }
    }

    public void Jump()
    {
        if (isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }

    #endregion

    #region ENEMY DETECT

    protected override void SearchForEnemy()
    {
        if (isDead || !isFindingEnemy) return;

        Camera cam = Camera.main;

        Ray ray = new Ray(cam.transform.position, cam.transform.forward);
        RaycastHit hit;

        if (Physics.Raycast(ray, out hit, detectionRadiusMax, LayerMask.GetMask("Enemy")))
        {
            if (hit.transform.CompareTag("Enemy"))
                target = hit.transform;
            else
                target = null;
        }
    }

    #endregion

    #region COMBAT

    public override void HandleAttack()
    {
        if (isDead) return;

        if (attackCooldown <= 0)
        {
            SwordObject.transform.parent = swordPos;
            SwordObject.transform.localPosition = Vector3.zero;
            SwordObject.transform.localRotation = Quaternion.identity;

            attackCooldown = atkAnimationClip.length / attackSpeed;

            animator.SetTrigger("Attack");
        }
    }

    public override void AtkCompleted()
    {
        base.AtkCompleted();

        SwordObject.transform.parent = swordFakePos;
        SwordObject.transform.localPosition = Vector3.zero;
        SwordObject.transform.localRotation = Quaternion.identity;
    }

    #endregion

    #region DAMAGE

    public override void TakeDamage(float dmg)
    {
        if (isDead) return;

        health -= dmg;

        if (health <= 0)
        {
            LunaManager.ins.ShowEndCard();
            Die();
        }
    }

    public override void Die()
    {
        isDead = true;

        animator.SetTrigger("Dead");

        rb.isKinematic = true;
        GetComponent<CapsuleCollider>().enabled = false;
    }

    #endregion

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish"))
        {
            LunaManager.ins.ShowWinCard();
            LunaManager.ins.OnClickEndCard();
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Respawn"))
        {
            animator.SetBool("isMoving", false);
            Die();
            LunaManager.ins.ShowEndCard();
            LunaManager.ins.OnClickEndCard();
        }
    }
}