using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BridgeManager : MonoBehaviour
{
    public static BridgeManager ins;

    public List<GlassLine> glassLines;  // Danh sách các GlassLine
    public Camera mainCamera;            // Camera trong game
    public Transform cameraStartTransform;  // Điểm bắt đầu của camera (có cả vị trí và rotation)
    public Transform cameraEndTransform;    // Điểm kết thúc của camera (có cả vị trí và rotation)
    public float cameraMoveSpeed = 2f;  // Tốc độ di chuyển của camera
    public float materialChangeSpeed = 0.5f; // Thời gian thay đổi vật liệu của các GlassTile

    private bool isCameraMoving = false;
    private bool isChangingMaterials = false;

    void Awake()
    {
        ins = this;
    }

    void Start()
    {
        // Đảm bảo camera bắt đầu ở vị trí và góc quay ban đầu
        // Gọi SetupGlassLine để thiết lập các GlassLine khi game bắt đầu
        SetupGlassLine();
    }

    // Hàm để thiết lập các GlassLine (Xác định ô nào là an toàn)
    public void SetupGlassLine()
    {
        for (int i = 0; i < glassLines.Count; i++)
        {
            bool leftSafe = Random.value > 0.5f;  // Chọn ngẫu nhiên ô bên trái là an toàn hay không

            // Gọi phương thức SetSafeSide để thiết lập ô an toàn cho GlassLine
            glassLines[i].SetSafeSide(leftSafe);
            if (i==glassLines.Count -1)
            {
                glassLines[i].leftTile.isSafe = true;
                glassLines[i].rightTile.isSafe = true;
            }
        }
    }

    // Hàm gọi để bắt đầu quá trình thay đổi vật liệu và di chuyển camera
    public void ShowBridgeHint(System.Action onComplete)
    {
        if (isCameraMoving || isChangingMaterials) return; // Nếu đã đang thực hiện, không làm gì thêm.
        /*mainCamera.transform.position = cameraStartTransform.position;
        mainCamera.transform.rotation = cameraStartTransform.rotation;*/
        StartCoroutine(MoveCameraAndChangeMaterials(onComplete));
    }

    // Coroutine để di chuyển camera và thay đổi vật liệu các GlassTile
    private IEnumerator MoveCameraAndChangeMaterials(System.Action onComplete)
    {
        // Di chuyển camera lên trên để nhìn toàn cảnh (cả vị trí và rotation)
        yield return StartCoroutine(MoveCameraToPositionAndRotation(cameraEndTransform.position, cameraEndTransform.rotation));

        // Duyệt qua các GlassLine và thay đổi vật liệu của GlassTile
        yield return StartCoroutine(ChangeGlassTilesMaterial());

        // Sau khi đã thay đổi vật liệu, di chuyển camera về vị trí ban đầu
        yield return StartCoroutine(MoveCameraToPositionAndRotation(cameraStartTransform.position, cameraStartTransform.rotation));

        // Gọi callback khi kết thúc
        onComplete?.Invoke();
    }

    // Coroutine để di chuyển camera đến vị trí và góc quay mong muốn
    private IEnumerator MoveCameraToPositionAndRotation(Vector3 targetPosition, Quaternion targetRotation)
    {
        float journeyLength = Vector3.Distance(mainCamera.transform.position, targetPosition);
        float startTime = Time.time;

        // Di chuyển camera về vị trí mới
        while (Vector3.Distance(mainCamera.transform.position, targetPosition) > 0.1f)
        {
            float distanceCovered = (Time.time - startTime) * cameraMoveSpeed;
            float fractionOfJourney = distanceCovered / journeyLength;

            // Di chuyển vị trí camera
            mainCamera.transform.position = Vector3.Lerp(mainCamera.transform.position, targetPosition, fractionOfJourney);

            // Di chuyển góc quay camera
            mainCamera.transform.rotation = Quaternion.Slerp(mainCamera.transform.rotation, targetRotation, fractionOfJourney);

            yield return null;
        }

        // Đảm bảo camera đã đến vị trí và góc quay chính xác
        mainCamera.transform.position = targetPosition;
        mainCamera.transform.rotation = targetRotation;
    }

    // Coroutine để thay đổi vật liệu của các GlassTile (tạo hint cho người chơi)
    private IEnumerator ChangeGlassTilesMaterial()
    {
        isChangingMaterials = true;

        // Duyệt qua tất cả các GlassLine
        foreach (var glassLine in glassLines)
        {
            // Thay đổi vật liệu của các GlassTile trong GlassLine
            if (glassLine.leftTile.isSafe)
            {
                glassLine.leftTile.SetSafeMaterial();
            }
            else
            {
                glassLine.leftTile.SetDefaultMaterial();
            }

            if (glassLine.rightTile.isSafe)
            {
                glassLine.rightTile.SetSafeMaterial();
            }
            else
            {
                glassLine.rightTile.SetDefaultMaterial();
            }

            // Chờ một thời gian trước khi thay đổi vật liệu của các ô kính tiếp theo
            yield return new WaitForSeconds(materialChangeSpeed);
        }

        // Sau khi duyệt tất cả các GlassLine, khôi phục lại vật liệu mặc định
        foreach (var glassLine in glassLines)
        {
            glassLine.leftTile.SetDefaultMaterial();
            glassLine.rightTile.SetDefaultMaterial();
        }

        isChangingMaterials = false;
    }
}
