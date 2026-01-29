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


    [Header("Click To Move")]
    public bool enableClickToMove = true;
    [Tooltip("Layer được phép click để di chuyển (ground/terrain/stairs)")]
    public LayerMask clickMoveMask;
    public float clickRayDistance = 200f;
    public float stopDistance = 0.15f;
    [Tooltip("Bắn ray từ trên xuống để bám theo địa hình/cầu thang")]
    public float groundSnapUp = 1.0f;
    public float groundSnapDown = 3.0f;

    private bool hasMoveTarget;
    private Vector3 moveTarget;

    [Header("Stairs Routing (Optional)")]
    [Tooltip("Bật để tự đi tới chân cầu thang rồi mới leo lên/xuống (giải quyết trường hợp click từ góc khác bị kẹt ở dưới)")]
    public bool useStairsRouting = true;
    [Tooltip("Transform đặt ở CHÂN cầu thang (đứng ngay trước bậc đầu tiên)")]
    public Transform stairBottom;
    [Tooltip("Transform đặt ở ĐỈNH cầu thang (đứng ngay sau bậc cuối cùng)")]
    public Transform stairTop;
    [Tooltip("Chênh lệch Y tối thiểu để coi là khác tầng và dùng cầu thang")]
    public float stairFloorDeltaY = 0.4f;
    [Tooltip("Nếu bật, cứ khác tầng là ép đi qua cầu thang (ổn nhất cho playable vì không có pathfinding)")]
    public bool alwaysUseStairsWhenDifferentFloor = true;
    [Tooltip("Mask vật cản để kiểm tra đường thẳng tới điểm click có bị chắn không. Nên gồm tường/khối/cầu thang (không cần ground phẳng)")]
    public LayerMask obstacleMask = ~0;

    private Vector3[] routePoints;
    private int routeIndex;

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
        MouseLook.ins.onClickMove += OnClickMove;
    }
    private void OnDestroy()
    {
        if (MouseLook.ins != null)
            MouseLook.ins.onClickMove -= OnClickMove;
    }

    void OnClickMove(Vector3 point)
    {
        /*if (!enableClickToMove) return;
        if (isDead) return;
        if (GameController.ins.isPauseGame) return;
        if (!MouseLook.ins.allowInput) return;

        // Thêm raycast kiểm tra collider
        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        if (Physics.Raycast(ray, out RaycastHit hit, clickRayDistance, clickMoveMask))
        {
            // Đảm bảo collider là hợp lệ (ví dụ: có tag/layer "Walkable")
            if (hit.collider.CompareTag("Walkable")) // hoặc dựa trên layer khác
            {
                SetMoveDestination(hit.point);
            }
        }*/
    }


    private void SetMoveDestination(Vector3 point)
    {
        // Mặc định đi thẳng
        routePoints = null;
        routeIndex = 0;

        if (useStairsRouting && stairBottom != null && stairTop != null)
        {
            Vector3 pos = rigidbody != null ? rigidbody.position : transform.position;
            float dy = point.y - pos.y;

            if (Mathf.Abs(dy) >= stairFloorDeltaY)
            {
                bool shouldRoute = alwaysUseStairsWhenDifferentFloor;

                if (!shouldRoute)
                {
                    // Nếu đi thẳng bị chắn (thường là đụng cạnh cầu thang/tường) => ép đi qua 2 điểm cầu thang
                    Vector3 a = pos + Vector3.up * 0.6f;
                    Vector3 b = point + Vector3.up * 0.6f;
                    shouldRoute = Physics.Linecast(a, b, obstacleMask);
                }

                if (shouldRoute)
                {
                    if (dy > 0f)
                    {
                        // Lên tầng cao hơn: tới chân -> lên đỉnh -> tới điểm click
                        routePoints = new[] { stairBottom.position, stairTop.position, point };
                    }
                    else
                    {
                        // Xuống tầng thấp hơn: tới đỉnh -> xuống chân -> tới điểm click
                        routePoints = new[] { stairTop.position, stairBottom.position, point };
                    }
                    routeIndex = 0;
                    moveTarget = routePoints[routeIndex];
                    hasMoveTarget = true;
                    return;
                }
            }
        }

        moveTarget = point;
        hasMoveTarget = true;
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
        if (!enableClickToMove) return;

        if (GameController.ins.isPauseGame || LunaManager.ins.isCretivePause || isDead)
        {
            animator.SetBool("isMoving", false);
            return;
        }

        if (!hasMoveTarget)
        {
            animator.SetBool("isMoving", false);
            return;
        }

        Vector3 pos = rigidbody.position;

        Vector3 to = moveTarget - pos;
        to.y = 0f;

        float dist = to.magnitude;
        if (dist <= stopDistance)
        {
            // Nếu đang đi theo route (cầu thang) thì chuyển sang waypoint tiếp theo
            if (routePoints != null && routeIndex + 1 < routePoints.Length)
            {
                routeIndex++;
                moveTarget = routePoints[routeIndex];
            }
            else
            {
                hasMoveTarget = false;
                routePoints = null;
                routeIndex = 0;
                animator.SetBool("isMoving", false);

                Vector3 v = rigidbody.velocity;
                v.x = 0f;
                v.z = 0f;
                rigidbody.velocity = v;
                return;
            }
        }

        Vector3 dir = to / Mathf.Max(dist, 0.0001f);
        Vector3 next = pos + dir * moveSpeed * Time.fixedDeltaTime;

        // Snap Y theo ground (terrain/cầu thang)
        Vector3 origin = next + Vector3.up * groundSnapUp;
        if (Physics.Raycast(origin, Vector3.down, out RaycastHit hit,
            groundSnapUp + groundSnapDown, groundMask))
        {
            next.y = hit.point.y;
        }

        rigidbody.MovePosition(next);

        if (model != null && dir.sqrMagnitude > 0.0001f)
        {
            Quaternion targetRotation = Quaternion.LookRotation(dir);
            model.transform.rotation = Quaternion.Slerp(model.transform.rotation, targetRotation, 10f * Time.fixedDeltaTime);
        }

        animator.SetBool("isMoving", true);
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
        AudioManager.ins.PlaySoundFire();
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
        hasMoveTarget = false;
        routePoints = null;
        routeIndex = 0;
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
