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

    public AutoFightCharacter Player => player;
    public AutoFightCharacter Enemy => enemy;
    public bool HasAssignedCharacters => player != null && enemy != null;

    private void Start()
    {
        InitializeCharacters();

        if (!HasAssignedCharacters)
        {
            Debug.LogWarning("AutoFightArenaManager is missing player or enemy reference.");
            return;
        }

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

    public void AssignCharacters(AutoFightCharacter newPlayer, AutoFightCharacter newEnemy)
    {
        CancelAutoStart();
        UnsubscribeCharacterEvents();

        player = newPlayer;
        enemy = newEnemy;

        InitializeCharacters();
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
        if (!HasAssignedCharacters || startLocked)
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

    private void InitializeCharacters()
    {
        if (!HasAssignedCharacters)
        {
            return;
        }

        player.SetupTarget(enemy);
        enemy.SetupTarget(player);

        SubscribeCharacterEvents();
        ResetBattle();
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

    private void SubscribeCharacterEvents()
    {
        if (player != null)
        {
            player.Died -= OnCharacterDied;
            player.Died += OnCharacterDied;
        }

        if (enemy != null)
        {
            enemy.Died -= OnCharacterDied;
            enemy.Died += OnCharacterDied;
        }
    }

    private void UnsubscribeCharacterEvents()
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
}
