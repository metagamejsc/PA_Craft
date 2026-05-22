using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class ConstructionManager : MonoBehaviour
{
    public GameObject UIDaily;
    public GameObject UIBuild;
    public Camera mainCamera;
    public GameObject placementEffectPrefab;

    public Button btnMoveLeft;
    public Button btnMoveRight;
    public Button btnMoveForward;
    public Button btnMoveBackward;
    public Button btnConfirmBuild;
    public Button btnRotateClockwise;
    public Button btnBuild;
    public Button btnBuildNextPart;

    [Header("Build Object")]
    public GameObject objectBuildedPrefab;
    public Transform buildSpawnPoint;
    public Camera buildCamera;
    public float moveStep = 1f;
    public float rotateStep = 15f;
    public int totalBuildParts = 5;

    [Header("Build Camera")]
    public Transform buildCameraFollowTarget;
    public Vector3 buildCameraTargetOffset = Vector3.up;
    public float buildCameraDistance = 22f;
    public float buildCameraYaw = 0f;
    public float buildCameraPitch = 55f;
    public float buildCameraMinPitch = 20f;
    public float buildCameraMaxPitch = 75f;
    public float buildCameraDragSensitivity = 0.15f;
    public float buildClickMaxDragDistance = 15f;

    private bool isBuildConfirmed;
    private bool isDraggingBuildCamera;
    private bool buildPointerStartedOverUi;
    private Vector3 lastDragPosition;
    private Vector3 buildPointerDownPosition;
    private BuildRevealController buildRevealController;

    private void Start()
    {
        if (mainCamera == null)
        {
            mainCamera = Camera.main;
        }

        AddButtonListeners();
        HideBuildUi();
        SetBuildNextPartButton(false);
        HideSceneBuildObject();

        if (UIDaily != null)
        {
            UIDaily.SetActive(true);
        }
    }

    private void Update()
    {
        if (objectBuildedPrefab == null)
        {
            return;
        }

        if (!isBuildConfirmed)
        {
            HandleKeyboardMove();
            SnapToTerrain();
        }

        HandleBuildCameraDrag();
        FollowBuildCamera();
    }

    private void AddButtonListeners()
    {
        if (btnBuild!=null)
        {
            btnBuild.onClick.AddListener(BuildBuildedPrefab);
        }

        if (btnBuildNextPart != null)
        {
            btnBuildNextPart.onClick.AddListener(BuildNextPart);
        }

        if (btnMoveLeft != null) btnMoveLeft.onClick.AddListener(MoveLeft);
        if (btnMoveRight != null) btnMoveRight.onClick.AddListener(MoveRight);
        if (btnMoveForward != null) btnMoveForward.onClick.AddListener(MoveForward);
        if (btnMoveBackward != null) btnMoveBackward.onClick.AddListener(MoveBackward);
        if (btnRotateClockwise != null) btnRotateClockwise.onClick.AddListener(RotateClockwise);
        if (btnConfirmBuild != null) btnConfirmBuild.onClick.AddListener(ConfirmBuild);
    }

    public void BuildBuildedPrefab()
    {
        if (objectBuildedPrefab != null && objectBuildedPrefab.scene.IsValid())
        {
            PrepareBuildObjectForPlacement(objectBuildedPrefab);
            HideDailyUi();
            ShowBuildUi();
            SetBuildNextPartButton(false);
            return;
        }

        GameObject prefab = objectBuildedPrefab;
        if (prefab == null)
        {
            HideBuildUi();
            SetBuildNextPartButton(false);
            return;
        }

        Vector3 spawnPosition = buildSpawnPoint != null ? buildSpawnPoint.position : prefab.transform.position;
        Quaternion spawnRotation = buildSpawnPoint != null ? buildSpawnPoint.rotation : prefab.transform.rotation;

        objectBuildedPrefab = Instantiate(prefab, spawnPosition, spawnRotation);
        PrepareBuildObjectForPlacement(objectBuildedPrefab);
        HideDailyUi();

        ShowBuildUi();
        SetBuildNextPartButton(false);
    }

    private void HandleKeyboardMove()
    {
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
    }

    private void SnapToTerrain()
    {
        Ray ray = new Ray(objectBuildedPrefab.transform.position + Vector3.up * 10f, Vector3.down);
        if (Physics.Raycast(ray, out RaycastHit hit, 100f) && hit.collider.gameObject.layer == LayerMask.NameToLayer("Terrain"))
        {
            Vector3 pos = objectBuildedPrefab.transform.position;
            pos.y = hit.point.y;
            objectBuildedPrefab.transform.position = pos;
        }
    }

    private void FollowBuildCamera()
    {
        if (buildCamera == null)
        {
            return;
        }

        Vector3 targetPosition = GetBuildCameraTargetPosition();
        float clampedPitch = Mathf.Clamp(buildCameraPitch, buildCameraMinPitch, buildCameraMaxPitch);
        Quaternion cameraRotation = Quaternion.Euler(clampedPitch, buildCameraYaw, 0f);
        Vector3 cameraOffset = cameraRotation * new Vector3(0f, 0f, -buildCameraDistance);

        buildCamera.transform.position = targetPosition + cameraOffset;
        buildCamera.transform.LookAt(targetPosition);
    }

    private Vector3 GetBuildCameraTargetPosition()
    {
        Transform target = buildCameraFollowTarget != null ? buildCameraFollowTarget : objectBuildedPrefab.transform;
        return target.position + buildCameraTargetOffset;
    }

    private void HandleBuildCameraDrag()
    {
        if (buildCamera == null)
        {
            return;
        }

        if (Input.touchSupported && Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            HandleBuildCameraPointer(touch.position, touch.phase == TouchPhase.Began, touch.phase == TouchPhase.Moved, touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled, touch.fingerId);
            return;
        }

        HandleBuildCameraPointer(Input.mousePosition, Input.GetMouseButtonDown(0), Input.GetMouseButton(0), Input.GetMouseButtonUp(0), -1);
    }

    private void HandleBuildCameraPointer(Vector3 pointerPosition, bool began, bool held, bool ended, int pointerId)
    {
        if (began)
        {
            buildPointerStartedOverUi = EventSystem.current != null && EventSystem.current.IsPointerOverGameObject(pointerId);
            if (buildPointerStartedOverUi)
            {
                isDraggingBuildCamera = false;
                return;
            }

            isDraggingBuildCamera = true;
            lastDragPosition = pointerPosition;
            buildPointerDownPosition = pointerPosition;
            return;
        }

        if (ended)
        {
            TryBuildNextPartFromObjectClick(pointerPosition);
            isDraggingBuildCamera = false;
            buildPointerStartedOverUi = false;
            return;
        }

        if (!held || !isDraggingBuildCamera)
        {
            return;
        }

        Vector3 dragDelta = pointerPosition - lastDragPosition;
        lastDragPosition = pointerPosition;

        buildCameraYaw += dragDelta.x * buildCameraDragSensitivity;
        buildCameraPitch = Mathf.Clamp(buildCameraPitch - dragDelta.y * buildCameraDragSensitivity, buildCameraMinPitch, buildCameraMaxPitch);
    }

    private void TryBuildNextPartFromObjectClick(Vector3 pointerPosition)
    {
        if (!isBuildConfirmed || buildPointerStartedOverUi || buildCamera == null || objectBuildedPrefab == null)
        {
            return;
        }

        if ((pointerPosition - buildPointerDownPosition).sqrMagnitude > buildClickMaxDragDistance * buildClickMaxDragDistance)
        {
            return;
        }

        Ray ray = buildCamera.ScreenPointToRay(pointerPosition);
        if (!Physics.Raycast(ray, out RaycastHit hit, 1000f))
        {
            return;
        }

        if (hit.transform == objectBuildedPrefab.transform || hit.transform.IsChildOf(objectBuildedPrefab.transform))
        {
            BuildNextPart();
            SetBuildNextPartButton(false);
        }
    }

    private void ConfirmBuild()
    {
        if (objectBuildedPrefab == null || isBuildConfirmed)
        {
            return;
        }

        isBuildConfirmed = true;

        HideBuildUi();
        ShowFirstBuildPart();
        SetBuildNextPartButton(true);
        SpawnPlacementEffect();
        PlayBuildSound();
    }

    public void BuildNextPart()
    {
        if (!isBuildConfirmed || objectBuildedPrefab == null)
        {
            return;
        }

        BuildRevealController revealController = GetBuildRevealController();
        if (revealController == null || revealController.IsComplete)
        {
            return;
        }

        bool isComplete = revealController.RevealNextStep();
        SpawnPlacementEffect();
        PlayBuildSound();
        CheckClickShowEndCard();

        if (isComplete)
        {
            SetBuildNextPartButton(false);
            //ShowEndCard();
        }
    }

    private void ShowFirstBuildPart()
    {
        BuildRevealController revealController = GetBuildRevealController();
        if (revealController == null)
        {
            return;
        }

        revealController.Configure(totalBuildParts, 1);
    }

    private BuildRevealController GetBuildRevealController()
    {
        if (objectBuildedPrefab == null)
        {
            return null;
        }

        if (buildRevealController == null)
        {
            buildRevealController = objectBuildedPrefab.GetComponent<BuildRevealController>();
            if (buildRevealController == null)
            {
                buildRevealController = objectBuildedPrefab.AddComponent<BuildRevealController>();
            }
        }

        return buildRevealController;
    }

    private void SpawnPlacementEffect()
    {
        if (placementEffectPrefab == null || objectBuildedPrefab == null)
        {
            return;
        }

        Transform buildTransform = objectBuildedPrefab.transform;
        GameObject effect = Instantiate(placementEffectPrefab, buildTransform.position, buildTransform.rotation);
        Destroy(effect, 5f);
    }

    private void ShowBuildUi()
    {
        if (UIBuild != null)
        {
            UIBuild.SetActive(true);
        }
    }

    private void HideBuildUi()
    {
        if (UIBuild != null)
        {
            UIBuild.SetActive(false);
        }
    }

    private void HideDailyUi()
    {
        if (UIDaily != null)
        {
            UIDaily.SetActive(false);
        }
    }

    private void HideSceneBuildObject()
    {
        /*if (objectBuildedPrefab != null && objectBuildedPrefab.scene.IsValid())
        {
            objectBuildedPrefab.SetActive(false);
        }*/
    }

    private void PrepareBuildObjectForPlacement(GameObject buildObject)
    {
        buildObject.SetActive(true);
        isBuildConfirmed = false;
        ResolveBuildCamera(buildObject);
        EnsureBuildClickCollider(buildObject);

        buildRevealController = buildObject.GetComponent<BuildRevealController>();
        if (buildRevealController != null)
        {
            buildRevealController.Configure(totalBuildParts, totalBuildParts);
        }
    }

    private void ResolveBuildCamera(GameObject buildObject)
    {
        if (buildCamera == null)
        {
            buildCamera = buildObject.GetComponentInChildren<Camera>(true);
        }
    }

    private void EnsureBuildClickCollider(GameObject buildObject)
    {
        Collider[] colliders = buildObject.GetComponentsInChildren<Collider>(true);
        foreach (Collider buildCollider in colliders)
        {
            if (buildCollider.enabled)
            {
                return;
            }
        }

        BoxCollider existingBoxCollider = buildObject.GetComponent<BoxCollider>();
        if (existingBoxCollider != null)
        {
            existingBoxCollider.enabled = true;
            return;
        }

        Renderer[] renderers = buildObject.GetComponentsInChildren<Renderer>(true);
        if (renderers.Length == 0)
        {
            return;
        }

        Bounds localBounds = GetLocalRendererBounds(buildObject.transform, renderers);
        BoxCollider boxCollider = buildObject.AddComponent<BoxCollider>();
        boxCollider.center = localBounds.center;
        boxCollider.size = localBounds.size;
    }

    private Bounds GetLocalRendererBounds(Transform root, Renderer[] renderers)
    {
        Bounds localBounds = new Bounds(root.InverseTransformPoint(renderers[0].bounds.center), Vector3.zero);
        foreach (Renderer rendererItem in renderers)
        {
            Bounds rendererBounds = rendererItem.bounds;
            Vector3 min = rendererBounds.min;
            Vector3 max = rendererBounds.max;

            EncapsulateLocalPoint(root, ref localBounds, new Vector3(min.x, min.y, min.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(min.x, min.y, max.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(min.x, max.y, min.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(min.x, max.y, max.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(max.x, min.y, min.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(max.x, min.y, max.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(max.x, max.y, min.z));
            EncapsulateLocalPoint(root, ref localBounds, new Vector3(max.x, max.y, max.z));
        }

        return localBounds;
    }

    private void EncapsulateLocalPoint(Transform root, ref Bounds localBounds, Vector3 worldPoint)
    {
        localBounds.Encapsulate(root.InverseTransformPoint(worldPoint));
    }

    private void SetBuildNextPartButton(bool isActive)
    {
        if (btnBuildNextPart != null)
        {
            btnBuildNextPart.gameObject.SetActive(isActive);
        }
    }

    private void MoveObject(Vector3 direction)
    {
        if (objectBuildedPrefab == null || isBuildConfirmed)
        {
            return;
        }

        PlayClickSound();
        objectBuildedPrefab.transform.position += direction * moveStep;
    }

    public void MoveLeft()
    {
        MoveObject(Vector3.left);
    }

    public void MoveRight()
    {
        MoveObject(Vector3.right);
    }

    public void MoveForward()
    {
        MoveObject(Vector3.forward);
    }

    public void MoveBackward()
    {
        MoveObject(Vector3.back);
    }

    public void RotateClockwise()
    {
        if (objectBuildedPrefab == null || isBuildConfirmed)
        {
            return;
        }

        PlayClickSound();
        objectBuildedPrefab.transform.Rotate(Vector3.up, rotateStep);
    }

    private void PlayClickSound()
    {
        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundClick();
        }
    }

    private void PlayBuildSound()
    {
        if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySoundBuild();
        }
    }

    private void CheckClickShowEndCard()
    {
        if (LunaManager.ins != null)
        {
            LunaManager.ins.CheckClickShowEndCard();
        }
    }

    private void ShowEndCard()
    {
        if (LunaManager.ins != null)
        {
            LunaManager.ins.OnClickEndCard();
            LunaManager.ins.ShowEndCard();
        }
    }
}
