using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class ZombieChar : BaseCharacter
{
    public Material material;
    public SkinnedMeshRenderer[] lstMaterials;
    
    [Header("Movement")]
    
    public float idleTimeMin = 1f;
    public float idleTimeMax = 3f;
    public float moveTimeMin = 2f;
    public float moveTimeMax = 5f;
    
    private bool isMovingRandomly = false;
    private Vector3 randomDirection;
    private float currentMoveTime = 0f;
    private float currentIdleTime = 0f;
    
    // Biên giới terrain
    private Bounds terrainBounds;
    private bool hasBounds = false;

    protected override void Start()
    {
        base.Start();
        IsFindingEnemy = true;

        // Gán material
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material = new Material(material);
        }

        // Bắt đầu đứng im
        //StartIdle();

        // Lấy bounds sau 0.5s để đảm bảo terrain đã sinh
        Invoke(nameof(InitializeTerrainBounds), 0.5f);
    }

    private void InitializeTerrainBounds()
    {
        
    }

    protected override void Update()
    {
        if (GameController.ins.isPauseGame || isDead)
        {
            return;
        }

        // Cập nhật bounds định kỳ nếu cần (nếu map sinh thêm)
        // Uncomment nếu bạn sinh chunk động
        // if (Time.frameCount % 300 == 0) UpdateTerrainBounds(); 

        base.Update();
    }

    protected override void HandleMovement()
    {
        if (isDead) return;
        RandomWander();
        // Nếu có target và đủ gần → đuổi theo
        /*if (target != null && Vector3.Distance(transform.position, target.position) <= detectionRadiusMax)
        {
            ChaseTarget();
        }
        else
        {
            // Không có target → di chuyển ngẫu nhiên trong bounds
            RandomWander();
        }*/
    }

    private void ChaseTarget()
    {
        Vector3 direction = (target.position - transform.position).normalized;
        Vector3 newPos = transform.position + direction * moveSpeed * Time.deltaTime;

        // Kiểm tra xem vị trí mới có trong bounds không
        if (!hasBounds || terrainBounds.Contains(newPos))
        {
            transform.position = newPos;
        }
        else
        {
            // Nếu sắp ra ngoài → đổi hướng về trung tâm
            Vector3 toCenter = terrainBounds.center - transform.position;
            toCenter.y = 0;
            if (toCenter.sqrMagnitude > 0.1f)
            {
                direction = toCenter.normalized;
                newPos = transform.position + direction * moveSpeed * Time.deltaTime;
                if (terrainBounds.Contains(newPos))
                {
                    transform.position = newPos;
                }
            }
        }

        // Xoay
        if (direction.sqrMagnitude > 0.1f)
        {
            transform.rotation = Quaternion.LookRotation(new Vector3(direction.x, 0, direction.z));
            animator.SetBool(IsMoving, true);
        }
    }

    private void RandomWander()
    {
        if (isMovingRandomly)
        {
            currentMoveTime -= Time.deltaTime;

            if (currentMoveTime <= 0f)
            {
                // Dừng lại
                animator.SetBool(IsMoving, false);
                isMovingRandomly = false;
                currentIdleTime = Random.Range(idleTimeMin, idleTimeMax);
            }
            else
            {
                // Di chuyển theo hướng hiện tại
                Vector3 newPos = transform.position + randomDirection * moveSpeed * Time.deltaTime;

                // Kiểm tra nếu vị trí mới ra ngoài bounds
                if (!hasBounds || terrainBounds.Contains(newPos))
                {
                    transform.position = newPos;
                    animator.SetBool(IsMoving, true);
                }
                else
                {
                    // Gần biên → đổi hướng về trung tâm
                    Vector3 toCenter = terrainBounds.center - transform.position;
                    toCenter.y = 0;
                    if (toCenter.sqrMagnitude > 0.1f)
                    {
                        randomDirection = toCenter.normalized;
                    }
                    else
                    {
                        StartRandomMove(); // Đổi hướng hoàn toàn
                    }
                }
            }
        }
        else
        {
            currentIdleTime -= Time.deltaTime;
            if (currentIdleTime <= 0f)
            {
                StartRandomMove();
            }
        }
    }

    private void StartRandomMove()
    {
        randomDirection = new Vector3(Random.Range(-1f, 1f), 0, Random.Range(-1f, 1f)).normalized;
        if (randomDirection.sqrMagnitude < 0.1f) randomDirection = Vector3.forward;

        // Kiểm tra hướng mới có hợp lệ không (tránh đi ra ngoài ngay lập tức)
        Vector3 testPos = transform.position + randomDirection * moveSpeed * Time.deltaTime;
        if (hasBounds && !terrainBounds.Contains(testPos))
        {
            // Nếu hướng đó ra ngoài → đổi về trung tâm
            Vector3 toCenter = terrainBounds.center - transform.position;
            toCenter.y = 0;
            randomDirection = toCenter.sqrMagnitude > 0.1f ? toCenter.normalized : Vector3.forward;
        }

        transform.rotation = Quaternion.LookRotation(randomDirection);
        currentMoveTime = Random.Range(moveTimeMin, moveTimeMax);
        isMovingRandomly = true;
        animator.SetBool(IsMoving, true);
    }

    protected override void SearchForEnemy()
    {
        if (isDead || target != null) return;

        Collider[] hits = Physics.OverlapSphere(transform.position, detectionRadiusMax);
        target = hits
            .Select(h => h.transform)
            .Where(t => t.CompareTag("Player") && 
                        t.TryGetComponent<BaseCharacter>(out var player) && 
                        !player.isDead)
            .OrderBy(t => Vector3.Distance(transform.position, t.position))
            .FirstOrDefault();
    }

    public override void TakeDamage(float dmg)
    {
        if (isDead) return;

        health -= dmg;
        StartCoroutine(IeNhapNhay(2f));

        if (health <= 0)
        {
            GameController.ins.EnemyDead();
            animator.SetTrigger("Dead");
            isDead = true;
            Die();
        }
    }

    protected override void Die()
    {
        animator.SetTrigger("Dead");
        rigidbody.isKinematic = true;
        capsuleCollider.enabled = false;
        animator.transform.parent = null;
        SpawnCreeper.KillEnemy(this);
    }

    public IEnumerator IeNhapNhay(float time)
    {
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.red);
        }
        yield return new WaitForSeconds(0.1f);
        for (int i = 0; i < lstMaterials.Length; i++)
        {
            lstMaterials[i].material.SetColor("_Color", Color.white);
        }
    }

    // Gọi khi cần cập nhật bounds (nếu map mở rộng theo thời gian)
   
}