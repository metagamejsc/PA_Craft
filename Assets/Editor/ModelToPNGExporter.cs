using UnityEngine;
using UnityEditor;
using System.IO;

public class ModelToPNGExporter : EditorWindow
{
    private GameObject targetModel;
    private int resolution = 1024;
    private string savePath = "Assets/ExportedPNG/";

    [MenuItem("Tools/Export Model To PNG")]
    public static void ShowWindow()
    {
        GetWindow<ModelToPNGExporter>("Model To PNG");
    }

    private void OnGUI()
    {
        GUILayout.Label("Export 3D Model to PNG", EditorStyles.boldLabel);

        targetModel = (GameObject)EditorGUILayout.ObjectField(
            "Target Model",
            targetModel,
            typeof(GameObject),
            true
        );

        resolution = EditorGUILayout.IntField("Resolution", resolution);
        savePath = EditorGUILayout.TextField("Save Path", savePath);

        if (GUILayout.Button("Export PNG"))
        {
            if (targetModel == null)
            {
                EditorUtility.DisplayDialog("Error", "Please assign a model.", "OK");
                return;
            }

            ExportPNG();
        }
    }

    private void ExportPNG()
    {
        // Tạo thư mục nếu chưa có
        if (!Directory.Exists(savePath))
            Directory.CreateDirectory(savePath);

        // Tạo camera
        GameObject camGO = new GameObject("TempCamera");
        Camera cam = camGO.AddComponent<Camera>();
        cam.clearFlags = CameraClearFlags.SolidColor;
        cam.backgroundColor = new Color(0, 0, 0, 0);
        cam.orthographic = false;

        // Tạo light
        GameObject lightGO = new GameObject("TempLight");
        Light light = lightGO.AddComponent<Light>();
        light.type = LightType.Directional;
        light.intensity = 1.2f;
        light.transform.rotation = Quaternion.Euler(50, -30, 0);

        // Clone model
        GameObject modelInstance = Instantiate(targetModel);
        modelInstance.transform.position = Vector3.zero;

        // Tính bounds
        Bounds bounds = CalculateBounds(modelInstance);
        float size = Mathf.Max(bounds.size.x, bounds.size.y, bounds.size.z);

        cam.transform.position = bounds.center + new Vector3(0, 0, -size * 2);
        cam.transform.LookAt(bounds.center);
        cam.nearClipPlane = 0.01f;
        cam.farClipPlane = 1000f;

        // RenderTexture
        RenderTexture rt = new RenderTexture(resolution, resolution, 24, RenderTextureFormat.ARGB32);
        cam.targetTexture = rt;

        // Render
        RenderTexture currentRT = RenderTexture.active;
        RenderTexture.active = rt;
        cam.Render();

        Texture2D tex = new Texture2D(resolution, resolution, TextureFormat.RGBA32, false);
        tex.ReadPixels(new Rect(0, 0, resolution, resolution), 0, 0);
        tex.Apply();

        byte[] png = tex.EncodeToPNG();
        string filePath = Path.Combine(savePath, targetModel.name + ".png");
        File.WriteAllBytes(filePath, png);

        // Cleanup
        RenderTexture.active = currentRT;
        cam.targetTexture = null;
        DestroyImmediate(rt);
        DestroyImmediate(camGO);
        DestroyImmediate(lightGO);
        DestroyImmediate(modelInstance);

        AssetDatabase.Refresh();

        Debug.Log("Exported PNG: " + filePath);
    }

    private Bounds CalculateBounds(GameObject obj)
    {
        Renderer[] renderers = obj.GetComponentsInChildren<Renderer>();
        Bounds bounds = renderers[0].bounds;

        foreach (Renderer r in renderers)
        {
            bounds.Encapsulate(r.bounds);
        }
        return bounds;
    }
}
