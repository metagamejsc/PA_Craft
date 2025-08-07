using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ConstructionManager : MonoBehaviour
{
    public float timeScale = 1;

    [System.Serializable]
    public class BuildOption
    {
        public string optionName;
        public GameObject prefab;               // Vật được xây
        public GameObject placementParticle;    // Hiệu ứng particle khi đặt
        public Sprite icon;                     // Icon hiển thị trên button
    }

    [System.Serializable]
    public class BuildLocation
    {
        public Vector3 playerDestination;       // Vị trí nhân vật đi đến
        public Vector3 buildPosition;           // Vị trí đặt vật
        public Vector3 cameraPosition;          // Vị trí camera
        public Vector3 cameraRotation;          // Góc xoay camera (Euler)
        
        public BuildOption option1;
        public BuildOption option2;
    }

    // === Danh sách vị trí ===
    public List<BuildLocation> buildLocations = new List<BuildLocation>();

    // === Đối tượng ===
    public GameObject placementEffectPrefab;   // Hiệu ứng nhấp nháy tại vị trí đặt
    public Transform player;                   // Nhân vật (Transform)
    public Camera mainCamera;                  // Camera chính

    // === Di chuyển ===
    public float moveSpeed = 4f;
    public float reachDistance = 0.3f;

    // === Animation ===
    public Animator playerAnimator;
    public string welcomeAnim = "Welcome";
    public string moveAnim = "Move";
    public string idleAnim = "Idle";
    public string buildAnim = "Build";         // Tên animation xây

    // === UI ===
    public GameObject optionPanel;
    public Button optionButton1, optionButton2;
    public TextMeshProUGUI optionText1, optionText2;

    // === Trạng thái ===
    private int currentLocationIndex = 0;
    private GameObject currentEffect;          // Hiệu ứng tại vị trí đặt
    private bool isMoving = false;

    void Start()
    {
        // Validate references
        if (optionPanel == null) Debug.LogError("Option Panel chưa được gán!");
        if (player == null) { Debug.LogError("Player chưa được gán!"); return; }
        if (mainCamera == null) mainCamera = Camera.main;
        if (mainCamera == null) { Debug.LogError("Không tìm thấy Camera!"); return; }
        if (playerAnimator == null) playerAnimator = player.GetComponent<Animator>();
        if (playerAnimator == null) { Debug.LogError("Animator không được gán!"); return; }

        optionPanel.SetActive(false);

        // Bắt đầu với animation chào
        playerAnimator.Play(welcomeAnim);
        StartCoroutine(StartAfterWelcome(2f));
    }

    IEnumerator StartAfterWelcome(float delay)
    {
        yield return new WaitForSeconds(delay);
        playerAnimator.Play(idleAnim);

        if (buildLocations.Count > 0)
        {
            StartMovingToNextLocation();
        }
        else
        {
            Debug.LogWarning("Không có vị trí xây dựng nào!");
        }
    }

    void Update()
    {
        if (isMoving && currentLocationIndex < buildLocations.Count)
        {
            BuildLocation loc = buildLocations[currentLocationIndex];
            Vector3 targetPos = loc.playerDestination;
            Vector3 direction = (targetPos - player.position).normalized;

            // Di chuyển nhân vật
            player.position += direction * moveSpeed * Time.deltaTime;

            // Cập nhật animation
            playerAnimator.SetBool("IsMoving", true);

            // Chỉ xoay theo hướng di chuyển nếu chưa đến nơi
            if (Vector3.Distance(player.position, targetPos) > reachDistance)
            {
                if (direction.sqrMagnitude > 0.1f)
                {
                    Quaternion targetRot = Quaternion.LookRotation(direction);
                    player.rotation = Quaternion.Slerp(player.rotation, targetRot, 10f * Time.deltaTime);
                }
            }
            else
            {
                // ĐÃ ĐẾN NƠI → DỪNG DI CHUYỂN
                player.position = targetPos;
                isMoving = false;
                playerAnimator.SetBool("IsMoving", false);
                ArriveAtLocation(); // Gọi ngay → tránh bị ghi đè
            }
        }
    }

    void StartMovingToNextLocation()
    {
        if (currentLocationIndex >= buildLocations.Count)
        {
            Debug.Log("✅ Hoàn thành tất cả các vị trí xây dựng!");
            optionPanel.SetActive(false);
            return;
        }

        isMoving = true;
        playerAnimator.SetBool("IsMoving", true);

        BuildLocation loc = buildLocations[currentLocationIndex];
        
        StartCoroutine(MoveAndRotateCamera(loc.cameraPosition, loc.cameraRotation,currentLocationIndex==0?null:buildLocations[currentLocationIndex-1]));
    }

    IEnumerator MoveAndRotateCamera(Vector3 targetPos, Vector3 targetEulerAngles, BuildLocation lastpos = null)
    {
        Quaternion targetRotation = Quaternion.Euler(targetEulerAngles);
        /*if (lastpos!=null)
        {
            Quaternion targetPlayer = Quaternion.Euler(player.rotation.eulerAngles.x, targetEulerAngles.y, player.rotation.eulerAngles.z);
            float t0 = 0;
            while (t0 < 2f)
            {
                t0 += Time.deltaTime;
                mainCamera.transform.position = Vector3.Lerp(mainCamera.transform.position, lastpos.playerDestination+new Vector3(0,1.5f,0), t0);
                mainCamera.transform.rotation = Quaternion.Slerp(mainCamera.transform.rotation, targetPlayer, t0);
                yield return null;
            }
        }*/
        
        float t = 0;
        while (t < 1f)
        {
            t += Time.deltaTime * timeScale;
            mainCamera.transform.position = Vector3.Lerp(mainCamera.transform.position, targetPos, t);
            mainCamera.transform.rotation = Quaternion.Slerp(mainCamera.transform.rotation, targetRotation, t);
            yield return null;
        }
    }

    void ArriveAtLocation()
    {
        BuildLocation loc = buildLocations[currentLocationIndex];

        // ✅ Quay mặt về camera
        FaceCamera();

        // ✅ Hiệu ứng tại vị trí đặt vật
        if (currentEffect == null && placementEffectPrefab != null)
        {
            currentEffect = Instantiate(placementEffectPrefab, loc.buildPosition, Quaternion.identity);
        }

        // ✅ Cập nhật UI: tên và icon
        optionText1.text = loc.option1.optionName;
        optionText2.text = loc.option2.optionName;

        // Gán icon cho button
        SetButtonIcon(optionButton1, loc.option1.icon);
        SetButtonIcon(optionButton2, loc.option2.icon);

        // ✅ Gán sự kiện chọn
        optionButton1.onClick.RemoveAllListeners();
        optionButton1.onClick.AddListener(() => OnOptionSelected(loc.option1));

        optionButton2.onClick.RemoveAllListeners();
        optionButton2.onClick.AddListener(() => OnOptionSelected(loc.option2));

        optionPanel.SetActive(true);
    }

    // Hàm tiện ích: gán icon cho button và đảm bảo hiển thị rõ
    void SetButtonIcon(Button button, Sprite icon)
    {
        if (icon != null)
        {
            Image buttonImage = button.transform.GetChild(0).GetComponent<Image>();
            if (buttonImage != null)
            {
                buttonImage.sprite = icon;
                buttonImage.preserveAspect = true;
                buttonImage.color = Color.white; // Đảm bảo không bị mờ/tint
            }
        }
        else
        {
            // Có thể đặt icon mặc định nếu muốn
            // button.image.sprite = defaultIcon;
        }
    }

    [ContextMenu("FaceCamera")]
    void FaceCamera()
    {
        if (mainCamera == null || player == null) return;

        Vector3 toCamera = mainCamera.transform.position - player.position;
        toCamera.y = 0; // Chỉ xoay ngang

        if (toCamera.sqrMagnitude < 0.01f) return;

        Quaternion targetRotation = Quaternion.LookRotation(toCamera);
        player.rotation = targetRotation;

        Debug.DrawRay(player.position, toCamera.normalized * 3f, Color.green, 2f);
    }

    void OnOptionSelected(BuildOption selectedOption)
    {
        AudioManager.ins.PlaySoundBuild();
        BuildLocation loc = buildLocations[currentLocationIndex];
        optionPanel.SetActive(false);

        // Dừng mọi hành động di chuyển
        isMoving = false;
        playerAnimator.SetBool("IsMoving", false);

        // Bắt đầu hành động xây
        StartCoroutine(PerformBuildAction(selectedOption, loc));
    }

    IEnumerator PerformBuildAction(BuildOption selectedOption, BuildLocation loc)
    {
        // 1. Phát animation xây
        if (playerAnimator != null && !string.IsNullOrEmpty(buildAnim))
        {
            playerAnimator.Play(buildAnim);
        }

        // 2. Chờ 0.5s để animation bắt đầu
        yield return new WaitForSeconds(0.5f);

        // 3. Tạo vật tại vị trí build
        if (selectedOption.prefab != null)
        {
            Instantiate(selectedOption.prefab, loc.buildPosition, Quaternion.identity);
        }

        // 4. Phát particle
        if (selectedOption.placementParticle != null)
        {
            GameObject particle = Instantiate(selectedOption.placementParticle, loc.buildPosition, Quaternion.identity);
            Destroy(particle, 5f);
        }

        // 5. Xóa hiệu ứng nhấp nháy
        if (currentEffect != null)
        {
            Destroy(currentEffect);
            currentEffect = null;
        }

        // 6. Chờ 2s sau khi xây
        yield return new WaitForSeconds(2f);

        // 7. Sang vị trí tiếp theo
        currentLocationIndex++;
        if (currentLocationIndex >= buildLocations.Count-1)
        {
            Debug.Log("🏁 Đã hoàn thành tất cả vị trí!");
            LunaManager.ins.ShowEndCard(); // Gọi end card
        }
        StartMovingToNextLocation();
    }
}