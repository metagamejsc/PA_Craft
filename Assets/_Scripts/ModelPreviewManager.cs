using UnityEngine;
using UnityEngine.UI;

public class ModelPreviewManager : MonoBehaviour
{
    public Transform previewSpawnPoint;
    private GameObject currentModel;
    public RawImage previewImage;
    public HandPointerController insHand;
    public void ShowPreview(GameObject modelPrefab)
    {
        // Xoá model cũ nếu có
        if (currentModel != null)
        {
            Destroy(currentModel);
        }

        // Spawn model mới
        currentModel = Instantiate(modelPrefab, previewSpawnPoint.position, Quaternion.identity);
        currentModel.AddComponent<DragRotatePreview>();
        //previewImage.SetNativeSize();
        previewImage.rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        previewImage.rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
        previewImage.rectTransform.anchoredPosition = Vector2.zero;
        previewImage.rectTransform.sizeDelta=previewImage.texture!=null?new Vector2(previewImage.texture.width,previewImage.texture.height):Vector2.zero;
        LunaManager.ins.CheckClickShowEndCard();
        if (insHand != null)
        {
            insHand.StopHandPointer();
        }
        //SetLayerRecursively(currentModel, LayerMask.NameToLayer("Preview"));
    }

    void SetLayerRecursively(GameObject obj, int newLayer)
    {
        obj.layer = newLayer;
        foreach (Transform child in obj.transform)
        {
            SetLayerRecursively(child.gameObject, newLayer);
        }
    }
}