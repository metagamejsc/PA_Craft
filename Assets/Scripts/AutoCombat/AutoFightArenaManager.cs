using UnityEngine;

[DisallowMultipleComponent]
public class AutoFightArenaManager : MonoBehaviour
{
    [SerializeField] private AutoFightCharacter player;
    [SerializeField] private AutoFightCharacter enemy;
    [SerializeField] private float startDelay = 0.75f;
    [SerializeField] private bool autoStartOnPlay = true;

    private bool battleEnded;
    private bool startLocked;

    private void Start()
    {
        if (player == null || enemy == null)
        {
            Debug.LogWarning("AutoFightArenaManager is missing player or enemy reference.");
            return;
        }

        player.SetupTarget(enemy);
        enemy.SetupTarget(player);

        player.Died += OnCharacterDied;
        enemy.Died += OnCharacterDied;

        player.ResetCharacter();
        enemy.ResetCharacter();

        if (autoStartOnPlay && !startLocked)
        {
            Invoke(nameof(BeginBattle), startDelay);
        }
    }

    private void OnDestroy()
    {
        if (player != null)
        {
            player.Died -= OnCharacterDied;
        }

        if (enemy != null)
        {
            enemy.Died -= OnCharacterDied;
        }
    }

    public void CancelAutoStart()
    {
        CancelInvoke(nameof(BeginBattle));
    }

    public void SetStartLocked(bool isLocked)
    {
        startLocked = isLocked;
        if (isLocked)
        {
            CancelAutoStart();
        }
    }

    public void BeginBattle()
    {
        if (player == null || enemy == null || startLocked)
        {
            return;
        }

        battleEnded = false;
        player.StartBattle();
        enemy.StartBattle();
    }

    public void ResetBattle()
    {
        CancelAutoStart();
        battleEnded = false;

        if (player != null)
        {
            player.ResetCharacter();
        }

        if (enemy != null)
        {
            enemy.ResetCharacter();
        }
    }

    private void OnCharacterDied(AutoFightCharacter deadCharacter)
    {
        if (battleEnded)
        {
            return;
        }

        battleEnded = true;
        player.StopBattle();
        enemy.StopBattle();
    }
}
