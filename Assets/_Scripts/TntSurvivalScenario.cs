using System.Collections;
using UnityEngine;

public class TntSurvivalScenario : MonoBehaviour
{
    [Header("Rules")]
    public int maxShotsWithoutTnt = 2;
    public float failDelay = 0.25f;

    [Header("Scene References")]
    public ExplosiveTntBarrel tntBarrel;
    public EnemyKidnapper enemyKidnapper;
    public Transform kidnappedAlly;
    public AllyFakeShooter[] allyShooters;

    [Header("Fail Result")]
    public bool showEndCardAfterKidnap = true;
    public float endCardDelay = 1.2f;

    private int playerShots;
    private bool tntExploded;
    private bool failed;

    void OnEnable()
    {
        PlayerController.PlayerShotFired += HandlePlayerShot;
        if (tntBarrel != null)
        {
            tntBarrel.Exploded += HandleTntExploded;
            tntExploded = tntBarrel.HasExploded;
        }
    }

    void OnDisable()
    {
        PlayerController.PlayerShotFired -= HandlePlayerShot;
        if (tntBarrel != null)
        {
            tntBarrel.Exploded -= HandleTntExploded;
        }
    }

    void HandlePlayerShot(PlayerController player)
    {
        if (failed || tntExploded)
        {
            return;
        }

        playerShots++;
        if (playerShots >= maxShotsWithoutTnt)
        {
            StartCoroutine(FailRoutine());
        }
    }

    void HandleTntExploded(ExplosiveTntBarrel barrel)
    {
        tntExploded = true;
        SetAllyShootersActive(false);
    }

    IEnumerator FailRoutine()
    {
        if (failed)
        {
            yield break;
        }

        failed = true;
        SetAllyShootersActive(false);

        if (failDelay > 0f)
        {
            yield return new WaitForSeconds(failDelay);
        }

        if (enemyKidnapper != null)
        {
            enemyKidnapper.Kidnap(kidnappedAlly);
        }

        if (showEndCardAfterKidnap && LunaManager.ins != null)
        {
            yield return new WaitForSeconds(endCardDelay);
            LunaManager.ins.ShowEndCard();
        }
    }

    void SetAllyShootersActive(bool isActive)
    {
        if (allyShooters == null)
        {
            return;
        }

        for (int i = 0; i < allyShooters.Length; i++)
        {
            if (allyShooters[i] != null)
            {
                allyShooters[i].enabled = isActive;
            }
        }
    }
}
