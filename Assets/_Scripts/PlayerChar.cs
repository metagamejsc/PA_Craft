using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerChar : BaseCharacter
{
    [Header("Movement")]
    public float jumpHeight = 5f;
    public float slopeForce = 5f;
    public float maxStepHeight = 0.5f;
    public float stepSmooth = 0.1f;
    public Transform groundCheck;
    public float groundDistance = .4f;
    public LayerMask groundMask;
    public GameObject model;
    public ParticleSystem endEffect;

    private float xRotation = 0f;
    public bool isGrounded;
    private bool stopCoutine;

    [Header("Shooting")]
    public GameObject bulletPrefab;
    public Transform shootPoint;
    public float bulletSpeed = 20f;
    public ParticleSystem shootEffect;

    private IEnumerator MoveAndIdle()
    {
        while (!stopCoutine)
        {
            animator.SetBool("isMoving", true);
            yield return new WaitForSeconds(2f);
            animator.SetBool("isMoving", false);
            yield return new WaitForSeconds(1f);
        }
    }

    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;
        moveSpeed = LunaManager.ins.playerSpeed;
        jumpHeight = LunaManager.ins.playerJumpForce;
        //StartCoroutine(MoveAndIdle());
        MouseLook.ins.onMouseUpShoot += OnMouseUpShoot;
    }
    private void OnDestroy()
    {
        if (MouseLook.ins != null)
            MouseLook.ins.onMouseUpShoot -= OnMouseUpShoot;
    }

    void OnMouseUpShoot()
    {
        if (isDead) return;
        if (GameController.ins.isPauseGame) return;
        if (!MouseLook.ins.allowInput) return;

        Shoot();
    }
    public void OnStartRespawn()
    {
        isDead = false;
        health = 1f;
        capsuleCollider.enabled = true;
        rigidbody.isKinematic = false;
        animator.Play(idleAnimationClip);
    }
    
    void Update()
    {
        /*if (isDead)
        {
            animator.SetBool("isJumping", false);
            animator.Play("metarig|Fall");
            return;
        }

        if (GameController.ins.isPauseGame)
            return;

        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);
        animator.SetBool("isJumping", !isGrounded);*/

        if (Input.GetKeyDown(KeyCode.Space))
            Jump();

        /*if (Input.GetMouseButtonDown(0))  // Chuột trái bắn
            Shoot();*/

        SearchForEnemy();
    }

    void FixedUpdate()
    {
        if (GameController.ins.isPauseGame || LunaManager.ins.isCretivePause)
        {
            rigidbody.velocity = Vector3.zero;
            return;
        }

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

        Transform cam = Camera.main.transform;
        Vector3 camForward = Vector3.Scale(cam.forward, new Vector3(1, 0, 1)).normalized;
        Vector3 camRight = Vector3.Scale(cam.right, new Vector3(1, 0, 1)).normalized;
        Vector3 moveDir = camForward * moveZ + camRight * moveX;

        Vector3 velocity = moveDir.normalized * moveSpeed;
        velocity.y = rigidbody.velocity.y;
        rigidbody.velocity = velocity;

        if (isMoving)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDir);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, Time.deltaTime * 10f);
        }

        animator.SetBool("isMoving", isMoving);
    }

    public void Jump()
    {
        if (isGrounded)
        {
            animator.SetBool("isJumping", true);
            rigidbody.AddForce(new Vector3(0, jumpHeight, 0), ForceMode.Impulse);
        }
    }

    public void Shoot()
    {
        animator.SetTrigger("Shoot");
        //AudioManager.ins.PlaySoundFire();
        LunaManager.ins.CheckClickShowEndCard();
        shootEffect.Play();
        Camera cam = Camera.main;
        Ray ray = cam.ViewportPointToRay(new Vector3(0.5f, 0.5f, 0));
        Vector3 targetPoint;

        if (Physics.Raycast(ray, out RaycastHit hit, 100f))
        {
            targetPoint = hit.point;
        }
        else
        {
            targetPoint = ray.GetPoint(100f);
        }

        Vector3 shootDirection = (targetPoint - shootPoint.position).normalized;

        // ✅ Quay nhân vật về hướng bắn (chỉ xoay theo trục Y)
        Vector3 flatDirection = new Vector3(shootDirection.x, 0, shootDirection.z);
        if (flatDirection.sqrMagnitude > 0.001f)
        {
            Quaternion targetRot = Quaternion.LookRotation(flatDirection);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRot, 1f); // tức thì
        }

        GameObject bullet = Instantiate(bulletPrefab);
        bullet.transform.position = shootPoint.position;
        bullet.transform.rotation = Quaternion.LookRotation(shootDirection);
        Rigidbody rbBullet = bullet.GetComponent<Rigidbody>();
        rbBullet.velocity = shootDirection * bulletSpeed;

        Destroy(bullet, 5f);
    }
    
    protected override void SearchForEnemy()
    {
        if (isDead || !IsFindingEnemy) return;

        Camera cam = Camera.main;
        Ray ray = new Ray(cam.transform.position, cam.transform.forward);
        RaycastHit hit;

        if (Physics.Raycast(ray, out hit, detectionRadiusMax, LayerMask.GetMask("Enemy")))
        {
            target = hit.transform.CompareTag("Enemy") ? hit.transform : null;
        }
    }

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
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish") && !LunaManager.ins.isCretivePause)
        {
            animator.SetBool("isMoving", false);
            rigidbody.velocity = Vector3.zero;
            LunaManager.ins.ShowWinCard();
        }

        if (other.CompareTag("Enemy") && !LunaManager.ins.isCretivePause)
        {
            other.GetComponent<BoxCollider>().enabled = false;
            AudioManager.ins.PlaySoundReward();
            var effect = Instantiate(endEffect);
            effect.transform.position = transform.position + new Vector3(0, 0, 2);
        }
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Respawn") && !LunaManager.ins.isCretivePause)
        {
            TakeDamage(999);
            LunaManager.ins.ShowEndCard();
        }
    }
}
