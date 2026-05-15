using System.Collections.Generic;
using UnityEngine;

public class VillagerWanderArea : MonoBehaviour
{
    [Header("Area")]
    public BoxCollider areaCollider;
    public bool autoFindVillagers = true;
    public string villagerControllerName = "Villager";
    public List<Animator> villagers = new List<Animator>();

    [Header("Movement")]
    public float moveSpeed = 1.2f;
    public float rotationSpeed = 8f;
    public float arriveDistance = 0.1f;
    public Vector2 moveTimeRange = new Vector2(2f, 4f);
    public Vector2 waitTimeRange = new Vector2(0.3f, 1.2f);

    [Header("Animation")]
    public bool forceAlwaysAnimate = true;
    public float movingAnimationSpeed = 1f;
    public float idleAnimationSpeed = 0f;

    private readonly List<VillagerAgent> agents = new List<VillagerAgent>();

    void Awake()
    {
        if (areaCollider == null)
        {
            areaCollider = GetComponent<BoxCollider>();
        }

        if (autoFindVillagers)
        {
            FindVillagersInScene();
        }

        BuildAgents();
    }

    void Update()
    {
        if (areaCollider == null)
        {
            return;
        }

        for (int i = agents.Count - 1; i >= 0; i--)
        {
            VillagerAgent agent = agents[i];
            if (agent.Animator == null)
            {
                agents.RemoveAt(i);
                continue;
            }

            UpdateAgent(agent);
        }
    }

    void FindVillagersInScene()
    {
        villagers.Clear();

        Animator[] sceneAnimators = FindObjectsOfType<Animator>();
        for (int i = 0; i < sceneAnimators.Length; i++)
        {
            Animator animator = sceneAnimators[i];
            if (animator == null || animator.runtimeAnimatorController == null)
            {
                continue;
            }

            if (animator.runtimeAnimatorController.name == villagerControllerName)
            {
                villagers.Add(animator);
            }
        }
    }

    void BuildAgents()
    {
        agents.Clear();

        for (int i = 0; i < villagers.Count; i++)
        {
            Animator animator = villagers[i];
            if (animator == null)
            {
                continue;
            }

            if (forceAlwaysAnimate)
            {
                animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            }

            VillagerAgent agent = new VillagerAgent(animator);
            BeginWaiting(agent);
            SetAnimationSpeed(animator, idleAnimationSpeed);
            agents.Add(agent);
        }
    }

    void UpdateAgent(VillagerAgent agent)
    {
        Transform villagerTransform = agent.Animator.transform;

        agent.StateTimer -= Time.deltaTime;

        if (!agent.IsMoving)
        {
            SetAnimationSpeed(agent.Animator, idleAnimationSpeed);
            if (agent.StateTimer <= 0f)
            {
                BeginMoving(agent);
            }

            return;
        }

        if (agent.StateTimer <= 0f)
        {
            BeginWaiting(agent);
            return;
        }

        Vector3 currentPosition = villagerTransform.position;
        Vector3 targetPosition = agent.TargetPosition;
        targetPosition.y = currentPosition.y;

        Vector3 direction = targetPosition - currentPosition;
        direction.y = 0f;

        if (direction.sqrMagnitude <= arriveDistance * arriveDistance)
        {
            agent.TargetPosition = GetRandomPointInsideArea(currentPosition.y);
            return;
        }

        SetAnimationSpeed(agent.Animator, movingAnimationSpeed);

        Quaternion targetRotation = Quaternion.LookRotation(direction.normalized, Vector3.up);
        villagerTransform.rotation = Quaternion.Slerp(
            villagerTransform.rotation,
            targetRotation,
            rotationSpeed * Time.deltaTime);

        villagerTransform.position = Vector3.MoveTowards(
            currentPosition,
            targetPosition,
            moveSpeed * Time.deltaTime);

        ClampInsideArea(villagerTransform);
    }

    void BeginMoving(VillagerAgent agent)
    {
        agent.IsMoving = true;
        agent.TargetPosition = GetRandomPointInsideArea(agent.Animator.transform.position.y);
        agent.StateTimer = Random.Range(moveTimeRange.x, moveTimeRange.y);
        SetAnimationSpeed(agent.Animator, movingAnimationSpeed);
    }

    void BeginWaiting(VillagerAgent agent)
    {
        agent.IsMoving = false;
        agent.StateTimer = Random.Range(waitTimeRange.x, waitTimeRange.y);
        SetAnimationSpeed(agent.Animator, idleAnimationSpeed);
    }

    Vector3 GetRandomPointInsideArea(float yPosition)
    {
        Bounds bounds = areaCollider.bounds;
        return new Vector3(
            Random.Range(bounds.min.x, bounds.max.x),
            yPosition,
            Random.Range(bounds.min.z, bounds.max.z));
    }

    void ClampInsideArea(Transform villagerTransform)
    {
        Bounds bounds = areaCollider.bounds;
        Vector3 position = villagerTransform.position;
        position.x = Mathf.Clamp(position.x, bounds.min.x, bounds.max.x);
        position.z = Mathf.Clamp(position.z, bounds.min.z, bounds.max.z);
        villagerTransform.position = position;
    }

    void SetAnimationSpeed(Animator animator, float animationSpeed)
    {
        if (animator != null)
        {
            animator.speed = animationSpeed;
        }
    }

    void OnDrawGizmosSelected()
    {
        BoxCollider targetCollider = areaCollider != null ? areaCollider : GetComponent<BoxCollider>();
        if (targetCollider == null)
        {
            return;
        }

        Gizmos.color = new Color(0.1f, 0.8f, 0.2f, 0.25f);
        Gizmos.matrix = targetCollider.transform.localToWorldMatrix;
        Gizmos.DrawCube(targetCollider.center, targetCollider.size);
        Gizmos.color = new Color(0.1f, 0.8f, 0.2f, 1f);
        Gizmos.DrawWireCube(targetCollider.center, targetCollider.size);
    }

    private class VillagerAgent
    {
        public readonly Animator Animator;
        public Vector3 TargetPosition;
        public float StateTimer;
        public bool IsMoving;

        public VillagerAgent(Animator animator)
        {
            Animator = animator;
        }
    }
}
