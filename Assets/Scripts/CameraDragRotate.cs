using UnityEngine;

public class CameraDragRotate : MonoBehaviour
{
    public float rotationSpeed = 0.2f;
    public GameObject scope;
    public GameObject tutorialUI;

    private Vector2 startMousePos;
    private bool isDragging = false;

    private float currentYaw = 0f;   // Xoay quanh trục Y (trái/phải)
    private float currentPitch = 0f; // Xoay quanh trục X (lên/xuống)

    public float maxYaw = 30f;
    public float minYaw = -30f;

    public float maxPitch = 30f;
    public float minPitch = -30f;

    private Quaternion initialRotation;
    private float timeDragged = 0f;

    // FOV settings
    // FOV settings
    public float defaultFOV = 60f;
    public float minFOV = 40f;
    public float fovAdjustSpeed = 5f;

    private Camera cam;

    void Start()
    {
        cam = GetComponent<Camera>();
        if (cam == null)
        {
            cam = Camera.main;
        }

        cam.fieldOfView = defaultFOV;

        // Khởi tạo góc hiện tại dựa trên rotation ban đầu
        Vector3 euler = transform.rotation.eulerAngles;
        currentYaw = euler.y;
        currentPitch = euler.x;
        tutorialUI.SetActive(true);
    }

    void Update()
    {
        HandleInput();
        AdjustFOV();
    }

    void HandleInput()
    {
        if (Input.GetMouseButtonDown(0))
        {
            tutorialUI.SetActive(false);
            scope.SetActive(true);
            GetComponent<Camera>().depth = 100;
            isDragging = true;
            startMousePos = Input.mousePosition;
        }
        else if (Input.GetMouseButtonUp(0))
        {
            tutorialUI.SetActive(true);
            timeDragged= 0f;
            LunaManager.ins.OnClickEndCard();
            GetComponent<Camera>().depth = -1;
            scope.SetActive(false);
            isDragging = false;
        }

        if (isDragging)
        {
            timeDragged+= Time.deltaTime;
            if (timeDragged>=3)
            {
                isDragging = false;
                timeDragged= 0f;
                GetComponent<Camera>().depth = -1;
                scope.SetActive(false);
                LunaManager.ins.OnClickEndCard();
            }
            Vector2 currentMousePos = Input.mousePosition;
            Vector2 delta = currentMousePos - startMousePos;

            float yawDelta = delta.x * rotationSpeed;
            float pitchDelta = -delta.y * rotationSpeed;

            currentYaw = Mathf.Clamp(currentYaw + yawDelta, minYaw, maxYaw);
            currentPitch = Mathf.Clamp(currentPitch + pitchDelta, minPitch, maxPitch);

            // Không xoay trục Z
            transform.rotation = Quaternion.Euler(currentPitch, currentYaw, 0f);

            startMousePos = currentMousePos;
        }
    }

    void AdjustFOV()
    {
        if (cam == null) return;

        float targetFOV = isDragging ? minFOV : defaultFOV;
        cam.fieldOfView = Mathf.Lerp(cam.fieldOfView, targetFOV, Time.deltaTime * fovAdjustSpeed);
    }
}