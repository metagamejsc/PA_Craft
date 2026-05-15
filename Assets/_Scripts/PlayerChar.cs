using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Rigidbody))]
[RequireComponent(typeof(CapsuleCollider))]
public class PlayerChar : BaseCharacter
{
    private static readonly int IsMovingParam = Animator.StringToHash("isMoving");
    private static readonly int IsJumpingParam = Animator.StringToHash("isJumping");
    private static readonly int ShootParam = Animator.StringToHash("Shoot");
    private static readonly int DeadParam = Animator.StringToHash("Dead");
    private const float JumpGroundIgnoreDuration = 0.12f;

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
    public List<Image> hpObject;

    public bool isGrounded;
    private bool stopCoutine;
    private bool jumpQueued;
    private float jumpGroundIgnoreTimer;

    [Header("Shooting")]
    public GameObject bulletPrefab;
    public Transform shootPoint;
    public float bulletSpeed = 20f;
    public ParticleSystem shootEffect;

    [Header("Kick Ball")]
    public Button kickBallButton;
    public Rigidbody ballRigidbody;
    public Collider ignoredBallCollider;
    public string kickAnimationTrigger = "Shoot";
    public float kickBallForwardForce = 18f;
    public float kickBallUpForce = 2f;
    public float kickBallDelay = 0.15f;
    public AudioClip kickBallSound;
    public float ballStopSpeedThreshold = 0.15f;
    public float ballStopDuration = 0.5f;
    private Coroutine kickBallCoroutine;

    private IEnumerator MoveAndIdle()
    {
        while (!stopCoutine)
        {
            animator.SetBool(IsMovingParam, true);
            yield return new WaitForSeconds(2f);
            animator.SetBool(IsMovingParam, false);
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
        BindKickBallButton();
        IgnoreConfiguredBallCollider();
    }

    private void OnDestroy()
    {
        if (MouseLook.ins != null)
            MouseLook.ins.onMouseUpShoot -= OnMouseUpShoot;

        if (kickBallButton != null)
            kickBallButton.onClick.RemoveListener(KickBall);
    }

    private void OnEnable()
    {
        LunaManager.OnEndCardShown += HandleEndCardShown;
    }

    private void OnDisable()
    {
        LunaManager.OnEndCardShown -= HandleEndCardShown;
    }

    void OnMouseUpShoot()
    {
        if (isDead) return;
        if (!MouseLook.ins.allowInput) return;

        Shoot();
    }

    public void OnStartRespawn()
    {
        isDead = false;
        health = 1f;
        capsuleCollider.enabled = true;
        rigidbody.isKinematic = false;
        jumpQueued = false;
        jumpGroundIgnoreTimer = 0f;
        isGrounded = true;
        animator.Rebind();
        animator.Update(0f);
        animator.SetBool(IsMovingParam, false);
        animator.SetBool(IsJumpingParam, false);
    }
    
    void Update()
    {
        if (isDead)
        {
            animator.SetBool(IsMovingParam, false);
            animator.SetBool(IsJumpingParam, false);
            return;
        }

        /*if (Input.GetMouseButtonDown(0))
            Shoot();*/

        SearchForEnemy();
    }

    void FixedUpdate()
    {
        if (LunaManager.ins.isCretivePause)
        {
            rigidbody.velocity = Vector3.zero;
            return;
        }

        UpdateGroundedState();
        ConsumeJump();

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
            //RotateModelToDirection(moveDir);
        }

        animator.SetBool(IsMovingParam, isMoving);
    }

    public void Jump()
    {
        if (isDead) return;

        jumpQueued = true;
    }

    public void KickBall()
    {
        if (isDead) return;
        if (ballRigidbody == null) return;

        if (kickBallCoroutine != null)
            StopCoroutine(kickBallCoroutine);

        animator.SetTrigger(kickAnimationTrigger);
        kickBallCoroutine = StartCoroutine(KickBallAfterDelay());
    }

    public void Shoot()
    {
        animator.SetTrigger(ShootParam);
        //AudioManager.ins.PlaySoundFire();
        ShowEndCardOnClick();
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
        RotateModelToDirection(shootDirection, 1000f);

        GameObject bullet = Instantiate(bulletPrefab);
        bullet.transform.position = shootPoint.position;
        bullet.transform.rotation = Quaternion.LookRotation(shootDirection);
        Rigidbody rbBullet = bullet.GetComponent<Rigidbody>();
        rbBullet.velocity = shootDirection * bulletSpeed;

        Destroy(bullet, 5f);
    }

    public void RotateModelToDirection(Vector3 direction, float rotateSpeed = 10f)
    {
        if (model == null) return;

        Vector3 flatDirection = new Vector3(direction.x, 0f, direction.z);
        if (flatDirection.sqrMagnitude <= 0.001f) return;

        Quaternion targetRotation = Quaternion.LookRotation(flatDirection.normalized);
        model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, Time.deltaTime * rotateSpeed);
    }

    private IEnumerator KickBallAfterDelay()
    {
        if (kickBallDelay > 0f)
            yield return new WaitForSeconds(kickBallDelay);

        if (ballRigidbody == null)
        {
            kickBallCoroutine = null;
            yield break;
        }

        Vector3 kickDirection = GetKickDirection();
        ballRigidbody.isKinematic = false;
        ballRigidbody.velocity = Vector3.zero;
        ballRigidbody.angularVelocity = Vector3.zero;
        ballRigidbody.AddForce(
            kickDirection * kickBallForwardForce + Vector3.up * kickBallUpForce,
            ForceMode.Impulse);
        PlayKickBallSound();

        yield return WaitForBallStopped();
        ShowEndCardOnClick();

        kickBallCoroutine = null;
    }

    private IEnumerator WaitForBallStopped()
    {
        yield return new WaitForFixedUpdate();

        float stoppedTime = 0f;
        float stopSpeedSqr = ballStopSpeedThreshold * ballStopSpeedThreshold;

        while (ballRigidbody != null)
        {
            bool ballStopped =
                ballRigidbody.velocity.sqrMagnitude <= stopSpeedSqr &&
                ballRigidbody.angularVelocity.sqrMagnitude <= stopSpeedSqr;

            stoppedTime = ballStopped ? stoppedTime + Time.fixedDeltaTime : 0f;
            if (stoppedTime >= ballStopDuration)
                yield break;

            yield return new WaitForFixedUpdate();
        }
    }

    private Vector3 GetKickDirection()
    {
        Transform directionSource = model != null ? model.transform : transform;
        Vector3 direction = Vector3.ProjectOnPlane(directionSource.forward, Vector3.up);
        return direction.sqrMagnitude > 0.001f ? direction.normalized : transform.forward;
    }

    private void BindKickBallButton()
    {
        if (kickBallButton == null)
            return;

        kickBallButton.onClick.RemoveListener(KickBall);
        kickBallButton.onClick.AddListener(KickBall);
    }

    private void IgnoreConfiguredBallCollider()
    {
        if (ballRigidbody == null || ignoredBallCollider == null)
            return;

        Collider[] ballColliders = ballRigidbody.GetComponentsInChildren<Collider>();
        foreach (Collider ballCollider in ballColliders)
        {
            if (ballCollider != null)
                Physics.IgnoreCollision(ballCollider, ignoredBallCollider, true);
        }
    }

    private void PlayKickBallSound()
    {
        if (AudioManager.ins != null)
            AudioManager.ins.PlaySound(kickBallSound);
    }

    private void ShowEndCardOnClick()
    {
        if (LunaManager.ins != null)
            LunaManager.ins.ShowEndCard();
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
        foreach (var VARIABLE in hpObject)
        {
            VARIABLE.DOColor(Color.black, 0.1f).SetLoops(5, LoopType.Yoyo);
        }
        animator.SetBool(IsMovingParam, false);
        animator.SetBool(IsJumpingParam, false);
        animator.SetTrigger(DeadParam);
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Finish") && !LunaManager.ins.isCretivePause)
        {
            animator.SetBool(IsMovingParam, false);
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

    private void HandleEndCardShown()
    {
        jumpQueued = false;
        jumpGroundIgnoreTimer = 0f;
        isGrounded = true;
        rigidbody.velocity = Vector3.zero;
        animator.SetBool(IsMovingParam, false);
        animator.SetBool(IsJumpingParam, false);
    }

    private void ConsumeJump()
    {
        if (!jumpQueued)
            return;

        jumpQueued = false;

        if (!isGrounded)
            return;

        jumpGroundIgnoreTimer = JumpGroundIgnoreDuration;
        isGrounded = false;
        animator.SetBool(IsJumpingParam, true);

        Vector3 currentVelocity = rigidbody.velocity;
        if (currentVelocity.y < 0f)
            currentVelocity.y = 0f;

        rigidbody.velocity = currentVelocity;
        rigidbody.AddForce(Vector3.up * jumpHeight, ForceMode.Impulse);
    }

    private void UpdateGroundedState()
    {
        if (jumpGroundIgnoreTimer > 0f)
        {
            jumpGroundIgnoreTimer -= Time.fixedDeltaTime;
            isGrounded = false;
        }
        else
        {
            isGrounded = CheckGrounded();
        }

        animator.SetBool(IsJumpingParam, !isGrounded);
    }

    private bool CheckGrounded()
    {
        bool groundedByCheckPoint = false;
        if (groundCheck != null)
        {
            groundedByCheckPoint = Physics.CheckSphere(
                groundCheck.position,
                groundDistance,
                groundMask,
                QueryTriggerInteraction.Ignore);
        }

        Bounds capsuleBounds = capsuleCollider.bounds;
        float sphereRadius = Mathf.Max(0.05f, capsuleCollider.radius * 0.9f);
        Vector3 capsuleGroundPoint = capsuleBounds.center + Vector3.down * (capsuleBounds.extents.y - sphereRadius + 0.02f);
        bool groundedByCapsule = Physics.CheckSphere(
            capsuleGroundPoint,
            sphereRadius,
            groundMask,
            QueryTriggerInteraction.Ignore);

        return groundedByCheckPoint || groundedByCapsule;
    }
}
