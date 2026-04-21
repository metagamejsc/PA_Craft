using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AttackController : MonoBehaviour
{
    [Header("HP")]
    public int playerMaxHp = 5;
    public int enemyMaxHp = 5;
    public int playerDamage = 1;
    public int enemyDamage = 1;
    public GameObject playerHpPrefab;
    public Transform playerHpParent;
    public GameObject enemyHpPrefab;
    public Transform enemyHpParent;
    public List<GameObject> playerHpObjects = new List<GameObject>();
    public List<GameObject> enemyHpObjects = new List<GameObject>();

    [Header("References")]
    public GameObject playerObject;
    public GameObject enemyObject;
    public Button attackButton;

    [Header("Timing")]
    public float playerMoveTime = 0.5f;
    public float playerAttackDelay = 2f;
    public float enemyAttackTime = 0.8f;
    public float attackStopDistance = 0.7f;

    private int playerHp;
    private int enemyHp;
    private bool isPlayerInAttackDelay;
    private bool isActionPlaying;
    private bool isMoving;
    private bool isReturning;
    private float moveTimer;
    private Transform movingTransform;
    private Vector3 moveFromPosition;
    private Vector3 moveToPosition;
    private Vector3 moveStartPosition;
    private System.Action onMoveHit;
    private System.Action onMoveFinished;

    private void Start()
    {
        playerHp = playerMaxHp;
        enemyHp = enemyMaxHp;

        PrepareHpObjects(playerHpObjects, playerHpPrefab, playerHpParent, playerMaxHp);
        PrepareHpObjects(enemyHpObjects, enemyHpPrefab, enemyHpParent, enemyMaxHp);
        RefreshHp();

        if (attackButton != null)
        {
            attackButton.onClick.RemoveListener(OnAttackButtonClick);
            attackButton.onClick.AddListener(OnAttackButtonClick);
        }
    }

    private void Update()
    {
        UpdateAttackMove();
    }

    private void OnDestroy()
    {
        if (attackButton != null)
        {
            attackButton.onClick.RemoveListener(OnAttackButtonClick);
        }

        CancelInvoke();
    }

    public void OnAttackButtonClick()
    {
        if (!CanPlayerAttack())
        {
            return;
        }

        PlayerAttackSequence();
    }

    private void PlayerAttackSequence()
    {
        isPlayerInAttackDelay = true;
        SetAttackButtonInteractable(false);

        StartAttackMove(playerObject, enemyObject, () =>
        {
            // Play player attack sound here.
            DamageEnemy(playerDamage);
        }, () =>
        {
            if (IsBattleEnded())
            {
                FinishBattle();
                return;
            }

            Invoke(nameof(TryEnemyAttack), enemyAttackTime);
            Invoke(nameof(EndPlayerAttackDelay), playerAttackDelay);
        });
    }

    private void TryEnemyAttack()
    {
        if (!isPlayerInAttackDelay || isActionPlaying || IsBattleEnded() || playerHp <= enemyDamage)
        {
            return;
        }

        StartAttackMove(enemyObject, playerObject, () =>
        {
            // Play enemy attack sound here.
            DamagePlayer(enemyDamage);
        }, null);
    }

    private void StartAttackMove(GameObject attacker, GameObject target, System.Action onHit, System.Action onFinished)
    {
        if (attacker == null || target == null)
        {
            onFinished?.Invoke();
            return;
        }

        isActionPlaying = true;

        movingTransform = attacker.transform;
        moveStartPosition = movingTransform.position;
        moveFromPosition = moveStartPosition;
        moveToPosition = GetAttackPosition(moveStartPosition, target.transform.position);
        moveTimer = 0f;
        isMoving = true;
        isReturning = false;
        onMoveHit = onHit;
        onMoveFinished = onFinished;
    }

    private void UpdateAttackMove()
    {
        if (!isMoving || movingTransform == null)
        {
            return;
        }

        if (playerMoveTime <= 0)
        {
            CompleteCurrentMoveStep();
            return;
        }

        moveTimer += Time.deltaTime;
        float t = Mathf.Clamp01(moveTimer / playerMoveTime);
        movingTransform.position = Vector3.Lerp(moveFromPosition, moveToPosition, t);

        if (t >= 1f)
        {
            CompleteCurrentMoveStep();
        }
    }

    private void CompleteCurrentMoveStep()
    {
        movingTransform.position = moveToPosition;

        if (!isReturning)
        {
            onMoveHit?.Invoke();
            RefreshHp();

            moveFromPosition = moveToPosition;
            moveToPosition = moveStartPosition;
            moveTimer = 0f;
            isReturning = true;
            return;
        }

        isMoving = false;
        isReturning = false;
        isActionPlaying = false;
        movingTransform = null;

        System.Action finished = onMoveFinished;
        onMoveHit = null;
        onMoveFinished = null;
        finished?.Invoke();
    }

    private void EndPlayerAttackDelay()
    {
        if (isActionPlaying)
        {
            Invoke(nameof(EndPlayerAttackDelay), 0.05f);
            return;
        }

        isPlayerInAttackDelay = false;
        SetAttackButtonInteractable(CanPlayerAttack());
    }

    private Vector3 GetAttackPosition(Vector3 attackerPosition, Vector3 targetPosition)
    {
        Vector3 direction = (targetPosition - attackerPosition).normalized;
        if (direction == Vector3.zero)
        {
            return targetPosition;
        }

        return targetPosition - direction * attackStopDistance;
    }

    private void DamagePlayer(int damage)
    {
        playerHp = Mathf.Max(0, playerHp - damage);
        if (playerHp <= 3)
        {
            print("DONE");
            LunaManager.ins.ShowEndCard();
        }
        AudioManager.ins.PlaySoundAttack();
    }

    private void DamageEnemy(int damage)
    {
        enemyHp = Mathf.Max(0, enemyHp - damage);
        AudioManager.ins.PlaySoundAttack();
    }

    private void RefreshHp()
    {
        SetHpObjects(playerHpObjects, playerHp);
        SetHpObjects(enemyHpObjects, enemyHp);
    }

    private void PrepareHpObjects(List<GameObject> hpObjects, GameObject hpPrefab, Transform hpParent, int maxHp)
    {
        if (hpObjects == null || hpPrefab == null || hpParent == null)
        {
            return;
        }

        while (hpObjects.Count < maxHp)
        {
            GameObject hpObject = Instantiate(hpPrefab, hpParent);
            hpObject.SetActive(true);
            hpObjects.Add(hpObject);
        }
    }

    private void SetHpObjects(List<GameObject> hpObjects, int currentHp)
    {
        if (hpObjects == null)
        {
            return;
        }

        for (int i = 0; i < hpObjects.Count; i++)
        {
            if (hpObjects[i] != null)
            {
                hpObjects[i].SetActive(i < currentHp);
            }
        }
    }

    private bool CanPlayerAttack()
    {
        return !isPlayerInAttackDelay && !isActionPlaying && !IsBattleEnded();
    }

    private bool IsBattleEnded()
    {
        return playerHp <= 0 || enemyHp <= 0;
    }

    private void FinishBattle()
    {
        isPlayerInAttackDelay = false;
        CancelInvoke(nameof(TryEnemyAttack));
        CancelInvoke(nameof(EndPlayerAttackDelay));
        SetAttackButtonInteractable(false);
    }

    private void SetAttackButtonInteractable(bool interactable)
    {
        if (attackButton != null)
        {
            attackButton.interactable = interactable;
        }
    }
}
