using UnityEngine;

[System.Serializable]
public class GunConfig
{
    public string gunName = "Gun";
    public GameObject gunModel;
    public GameObject projectilePrefab;
    public float shotDamage = 1f;
    public float projectileSpeed = 35f;
    public float projectileLifetime = 5f;
    public int maxAmmo = 10;
    public AudioClip fireSound;
    public string attackAnimTrigger = "Attack";
}

public class WeaponManager : MonoBehaviour
{
    public GunConfig[] guns = new GunConfig[3];
    public GameObject[] pickupBoxes = new GameObject[3];
    public PlayerController playerController;
    public bool startEnemySpawningOnEquip = true;
    public bool playWarningOnEquip = true;
    public EnemySpawner enemySpawner;
    public GameObject[] enemyPrefabsToSpawn;

    private int currentGunIndex = -1;
    private int[] currentAmmo;

    void Awake()
    {
        currentAmmo = new int[guns.Length];
        for (int i = 0; i < guns.Length; i++)
        {
            currentAmmo[i] = guns[i] != null ? guns[i].maxAmmo : 0;
            if (guns[i]?.gunModel != null)
                guns[i].gunModel.SetActive(false);
        }
    }

    public void EquipGun(int index)
    {
        float currentAttackCooldown = playerController != null ? playerController.attackCooldown : 1f;
        EquipGun(index, currentAttackCooldown);
    }

    public void EquipGun(int index, float attackCooldown)
    {
        if (index < 0 || index >= guns.Length || guns[index] == null)
            return;

        for (int i = 0; i < guns.Length; i++)
            if (guns[i]?.gunModel != null)
                guns[i].gunModel.SetActive(false);

        currentGunIndex = index;
        GunConfig selected = guns[index];

        if (selected.gunModel != null)
            selected.gunModel.SetActive(true);

        if (playerController != null)
        {
            playerController.projectilePrefab = selected.projectilePrefab;
            playerController.attackCooldown = attackCooldown;
            playerController.shotDamage = selected.shotDamage;
            playerController.projectileSpeed = selected.projectileSpeed;
            playerController.projectileLifetime = selected.projectileLifetime;
            playerController.fireSound = selected.fireSound;
            playerController.attackAnimTrigger = selected.attackAnimTrigger;
            playerController.HideWeaponGuideUI();

            if (playWarningOnEquip)
            {
                playerController.PlayTakeDamageWarning();
            }
        }

        for (int i = 0; i < pickupBoxes.Length; i++)
            if (pickupBoxes[i] != null)
                pickupBoxes[i].SetActive(false);

        if (startEnemySpawningOnEquip)
        {
            ActivateEnemySpawner();
        }
    }

    public bool UseAmmo()
    {
        if (currentGunIndex < 0 || currentAmmo[currentGunIndex] <= 0)
            return false;

        currentAmmo[currentGunIndex]--;
        return true;
    }

    public int GetCurrentAmmo()
    {
        if (currentGunIndex < 0)
            return 0;
        return currentAmmo[currentGunIndex];
    }

    public bool HasGunEquipped() => currentGunIndex >= 0;

    public int GetCurrentGunIndex() => currentGunIndex;

    void ActivateEnemySpawner()
    {
        if (enemySpawner == null)
        {
            enemySpawner = EnemySpawner.Instance != null
                ? EnemySpawner.Instance
                : FindObjectOfType<EnemySpawner>();
        }

        if (enemySpawner == null)
        {
            GameObject spawnerObject = new GameObject("Enemy Spawner");
            enemySpawner = spawnerObject.AddComponent<EnemySpawner>();
        }

        if (playerController != null)
        {
            enemySpawner.SetPlayer(playerController.transform);
        }

        enemySpawner.SetEnemyPrefabs(enemyPrefabsToSpawn);
        enemySpawner.ActivateSpawning();
    }
}
