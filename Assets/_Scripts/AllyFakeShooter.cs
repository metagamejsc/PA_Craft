using System.Collections;
using UnityEngine;

public class AllyFakeShooter : MonoBehaviour
{
    private static readonly int AttackTriggerHash = Animator.StringToHash("Attack");
    private static readonly int DeadTriggerHash = Animator.StringToHash("Dead");
    private static readonly int IsMovingBoolHash = Animator.StringToHash("isMoving");

    [Header("Aiming")]
    public Transform muzzle;
    public Transform[] aimTargets;
    public Vector2 shootInterval = new Vector2(0.45f, 1.1f);
    public float randomSpreadDegrees = 7f;

    [Header("Feedback")]
    public Animator animator;
    public string shootTrigger = "Attack";
    public GameObject muzzleFlashPrefab;
    public AudioClip shootSound;
    public NoDamageProjectile projectilePrefab;
    public float projectileSpeed = 25f;
    public float projectileLifetime = 1.5f;
    public string deadTrigger = "Dead";
    public string deadStateName = "metarig|Fall";
    public GameObject blood;

    private Coroutine shootRoutine;
    private bool isKidnapped;

    void OnEnable()
    {
        if (isKidnapped)
        {
            return;
        }

        shootRoutine = StartCoroutine(ShootLoop());
    }

    void Start()
    {
        if (blood != null)
        {
            blood.SetActive(false);
        }
    }

    void OnDisable()
    {
        if (shootRoutine != null)
        {
            StopCoroutine(shootRoutine);
            shootRoutine = null;
        }
    }

    IEnumerator ShootLoop()
    {
        while (enabled)
        {
            float wait = Random.Range(shootInterval.x, shootInterval.y);
            yield return new WaitForSeconds(Mathf.Max(0.05f, wait));
            ShootFakeBullet();
        }
    }

    void ShootFakeBullet()
    {
        if (isKidnapped)
        {
            return;
        }

        Transform target = GetRandomTarget();
        Vector3 origin = muzzle != null ? muzzle.position : transform.position + Vector3.up;
        Vector3 direction = target != null ? target.position - origin : transform.forward;
        if (direction.sqrMagnitude <= 0.001f)
        {
            direction = transform.forward;
        }

        direction = Quaternion.Euler(
            Random.Range(-randomSpreadDegrees, randomSpreadDegrees),
            Random.Range(-randomSpreadDegrees, randomSpreadDegrees),
            0f) * direction.normalized;

        transform.rotation = Quaternion.LookRotation(new Vector3(direction.x, 0f, direction.z).normalized);

        if (animator != null && !string.IsNullOrEmpty(shootTrigger))
        {
            animator.SetTrigger(shootTrigger);
        }

        if (muzzleFlashPrefab != null)
        {
            Destroy(Instantiate(muzzleFlashPrefab, origin, Quaternion.LookRotation(direction)), 0.35f);
        }

        if (shootSound != null)
        {
            AudioSource.PlayClipAtPoint(shootSound, origin);
        }

        if (projectilePrefab != null)
        {
            NoDamageProjectile projectile = Instantiate(projectilePrefab, origin, Quaternion.LookRotation(direction));
            projectile.Launch(direction, projectileSpeed, projectileLifetime, transform.root);
        }
    }

    Transform GetRandomTarget()
    {
        if (aimTargets == null || aimTargets.Length == 0)
        {
            return null;
        }

        for (int i = 0; i < aimTargets.Length; i++)
        {
            Transform target = aimTargets[Random.Range(0, aimTargets.Length)];
            if (target != null)
            {
                return target;
            }
        }

        return null;
    }

    public void PlayKidnappedDead()
    {
        isKidnapped = true;
        if (blood != null)
        {
            blood.SetActive(true);
        }

        if (shootRoutine != null)
        {
            StopCoroutine(shootRoutine);
            shootRoutine = null;
        }

        if (animator == null)
        {
            return;
        }

        int configuredAttackTriggerHash = string.IsNullOrEmpty(shootTrigger)
            ? AttackTriggerHash
            : Animator.StringToHash(shootTrigger);
        if (HasAnimatorParameter(configuredAttackTriggerHash, AnimatorControllerParameterType.Trigger))
        {
            animator.ResetTrigger(configuredAttackTriggerHash);
        }

        if (HasAnimatorParameter(IsMovingBoolHash, AnimatorControllerParameterType.Bool))
        {
            animator.SetBool(IsMovingBoolHash, false);
        }

        int configuredDeadTriggerHash = string.IsNullOrEmpty(deadTrigger)
            ? DeadTriggerHash
            : Animator.StringToHash(deadTrigger);
        if (HasAnimatorParameter(configuredDeadTriggerHash, AnimatorControllerParameterType.Trigger))
        {
            animator.SetTrigger(configuredDeadTriggerHash);
        }

        if (!string.IsNullOrEmpty(deadStateName))
        {
            animator.Play(deadStateName, 0, 0f);
        }
    }

    bool HasAnimatorParameter(int parameterHash, AnimatorControllerParameterType parameterType)
    {
        AnimatorControllerParameter[] parameters = animator.parameters;
        for (int i = 0; i < parameters.Length; i++)
        {
            if (parameters[i].nameHash == parameterHash && parameters[i].type == parameterType)
            {
                return true;
            }
        }

        return false;
    }
}
