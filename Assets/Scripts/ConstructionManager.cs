using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class ConstructionManager : MonoBehaviour
{
    public float timeScale = 1;

    [Header("Camera Transition Settings")]
    public float cameraMoveDuration = 1f;
    public float cameraRotateDuration = 1f;

    [System.Serializable]
    public class BuildOption
    {
        public string optionName;
        public GameObject prefab;
        public GameObject placementParticle;
        public Sprite icon;
    }

    [System.Serializable]
    public class BuildLocation
    {
        public Vector3 playerDestination;
        public Vector3 buildPosition;
        public Vector3 cameraPosition;
        public Vector3 cameraRotation;

        public BuildOption option1;
        public BuildOption option2;
    }

    public List<BuildLocation> buildLocations = new List<BuildLocation>();

    public GameObject placementEffectPrefab;
    public Transform player;
    public Camera mainCamera;

    public float moveSpeed = 4f;
    public float reachDistance = 0.3f;

    public Animator playerAnimator;
    public string welcomeAnim = "Welcome";
    public string moveAnim = "Move";
    public string idleAnim = "Idle";
    public string buildAnim = "Build";

    public GameObject optionPanel;
    public Button btnMoveLeft, btnMoveRight, btnMoveForward, btnMoveBackward,btnConfirmBuild,btnRotateClockwise;
    public GameObject objectBuildedPrefab;
    public GameObject UIBuild;
    public Button optionButton1, optionButton2;
    public TextMeshProUGUI optionText1, optionText2;

    private int currentLocationIndex = 0;
    private GameObject currentEffect;
    private bool isMoving = false;
    public Camera buildCamera;
    void Start()
    {
        if (optionPanel == null) Debug.LogError("Option Panel chưa được gán!");
        if (player == null) { Debug.LogError("Player chưa được gán!"); return; }
        if (mainCamera == null) mainCamera = Camera.main;
        if (mainCamera == null) { Debug.LogError("Không tìm thấy Camera!"); return; }
        if (playerAnimator == null) playerAnimator = player.GetComponent<Animator>();
        if (playerAnimator == null) { Debug.LogError("Animator không được gán!"); return; }

        optionPanel.SetActive(false);
        playerAnimator.Play(welcomeAnim);
        StartCoroutine(StartAfterWelcome(2f));
        btnMoveLeft.onClick.AddListener(MoveLeft);
        btnMoveRight.onClick.AddListener(MoveRight);
        btnMoveForward.onClick.AddListener(MoveForward);
        btnMoveBackward.onClick.AddListener(MoveBackward);
        btnRotateClockwise.onClick.AddListener(RotateClockwise);
        btnConfirmBuild.onClick.AddListener(() =>
        {
            UIBuild.SetActive(false);
            
            GameObject particle = Instantiate(buildLocations[0].option1.placementParticle, objectBuildedPrefab.transform.position, Quaternion.identity);
            Destroy(particle, 5f);
            AudioManager.ins.PlaySoundBuild();
            LunaManager.ins.OnClickEndCard();
            LunaManager.ins.ShowEndCard();
        });
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
        if (objectBuildedPrefab != null)
        {
            // Di chuyển bằng phím mũi tên
            if (Input.GetKeyDown(KeyCode.LeftArrow))
            {
                MoveLeft();
            }
            else if (Input.GetKeyDown(KeyCode.RightArrow))
            {
                MoveRight();
            }
            else if (Input.GetKeyDown(KeyCode.UpArrow))
            {
                MoveForward();
            }
            else if (Input.GetKeyDown(KeyCode.DownArrow))
            {
                MoveBackward();
            }

            // Snap theo trục Y xuống terrain
            SnapToTerrain();

            // Camera build follow
            if (buildCamera != null)
            {
                buildCamera.transform.position = objectBuildedPrefab.transform.position + new Vector3(0, 15.75f, -10);
                buildCamera.transform.LookAt(objectBuildedPrefab.transform.position + Vector3.up * 7f);
            }
        }
        
        if (isMoving && currentLocationIndex < buildLocations.Count)
        {
            BuildLocation loc = buildLocations[currentLocationIndex];
            Vector3 targetPos = loc.playerDestination;
            Vector3 direction = (targetPos - player.position).normalized;

            player.position += direction * moveSpeed * Time.deltaTime;
            playerAnimator.SetBool("IsMoving", true);

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
                player.position = targetPos;
                isMoving = false;
                playerAnimator.SetBool("IsMoving", false);
                ArriveAtLocation();
            }
        }
    }
    void SnapToTerrain()
    {
        Ray ray = new Ray(objectBuildedPrefab.transform.position + Vector3.up * 10f, Vector3.down);
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, 100f))
        {
            if (hit.collider.gameObject.layer == LayerMask.NameToLayer("Terrain"))
            {
                Vector3 pos = objectBuildedPrefab.transform.position;
                pos.y = hit.point.y;
                objectBuildedPrefab.transform.position = pos;
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

        StartCoroutine(MoveAndRotateCamera(loc.cameraPosition, loc.cameraRotation, currentLocationIndex == 0 ? null : buildLocations[currentLocationIndex - 1]));
    }

    IEnumerator MoveAndRotateCamera(Vector3 targetPos, Vector3 targetEulerAngles, BuildLocation lastpos = null)
    {
        Quaternion targetRotation = Quaternion.Euler(targetEulerAngles);
        Vector3 startPos = mainCamera.transform.position;
        Quaternion startRot = mainCamera.transform.rotation;

        float elapsed = 0f;
        while (elapsed < Mathf.Max(cameraMoveDuration, cameraRotateDuration))
        {
            elapsed += Time.deltaTime * timeScale;

            float moveT = Mathf.Clamp01(elapsed / cameraMoveDuration);
            float rotateT = Mathf.Clamp01(elapsed / cameraRotateDuration);

            mainCamera.transform.position = Vector3.Lerp(startPos, targetPos, moveT);
            mainCamera.transform.rotation = Quaternion.Slerp(startRot, targetRotation, rotateT);

            yield return null;
        }
    }

    void ArriveAtLocation()
    {
        BuildLocation loc = buildLocations[currentLocationIndex];
        FaceCamera();

        if (currentEffect == null && placementEffectPrefab != null)
        {
            currentEffect = Instantiate(placementEffectPrefab, loc.buildPosition, Quaternion.identity);
        }

        optionText1.text = loc.option1.optionName;
        optionText2.text = loc.option2.optionName;

        SetButtonIcon(optionButton1, loc.option1.icon);
        SetButtonIcon(optionButton2, loc.option2.icon);

        optionButton1.onClick.RemoveAllListeners();
        optionButton1.onClick.AddListener(() => OnOptionSelected(loc.option1));

        optionButton2.onClick.RemoveAllListeners();
        optionButton2.onClick.AddListener(() => OnOptionSelected(loc.option2));

        optionPanel.SetActive(true);
    }

    void SetButtonIcon(Button button, Sprite icon)
    {
        if (icon != null)
        {
            Image buttonImage = button.transform.GetChild(0).GetComponent<Image>();
            if (buttonImage != null)
            {
                buttonImage.sprite = icon;
                buttonImage.preserveAspect = true;
                buttonImage.color = Color.white;
            }
        }
    }

    [ContextMenu("FaceCamera")]
    void FaceCamera()
    {
        if (mainCamera == null || player == null) return;

        Vector3 toCamera = mainCamera.transform.position - player.position;
        toCamera.y = 0;

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

        isMoving = false;
        playerAnimator.SetBool("IsMoving", false);

        StartCoroutine(PerformBuildAction(selectedOption, loc));
    }

    IEnumerator PerformBuildAction(BuildOption selectedOption, BuildLocation loc)
    {
        if (playerAnimator != null && !string.IsNullOrEmpty(buildAnim))
        {
            playerAnimator.Play(buildAnim);
        }

        yield return new WaitForSeconds(0.5f);

        if (selectedOption.prefab != null)
        {
            objectBuildedPrefab=Instantiate(selectedOption.prefab, loc.buildPosition, Quaternion.identity);
            UIBuild.SetActive(true);
        }

        if (selectedOption.placementParticle != null)
        {
            GameObject particle = Instantiate(selectedOption.placementParticle, loc.buildPosition, Quaternion.identity);
            Destroy(particle, 5f);
        }

        if (currentEffect != null)
        {
            Destroy(currentEffect);
            currentEffect = null;
        }

        //LunaManager.ins.ShowEndCard();
    }

    public void MoveLeft()
    {
        AudioManager.ins.PlaySoundClick();
        objectBuildedPrefab.transform.position += Vector3.left;
    }
    public void MoveRight()
    {
        AudioManager.ins.PlaySoundClick();
        objectBuildedPrefab.transform.position += Vector3.right;
    }
    public void MoveForward()
    {
        AudioManager.ins.PlaySoundClick();
        objectBuildedPrefab.transform.position += Vector3.forward;
    }
    public void MoveBackward()
    {
        AudioManager.ins.PlaySoundClick();
        objectBuildedPrefab.transform.position += Vector3.back;
    }
    public void RotateClockwise()
    {
        AudioManager.ins.PlaySoundClick();
        objectBuildedPrefab.transform.Rotate(Vector3.up, 15f);
    }
}
