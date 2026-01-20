using UnityEngine;
using UnityEditor;
using System.IO;

public class InspectorLikePreviewExporter : EditorWindow
{
    GameObject target;
    int size = 512;

    [MenuItem("Tools/Capture Inspector Style PNG")]
    static void Open()
    {
        GetWindow<InspectorLikePreviewExporter>("Inspector Preview");
    }

    void OnGUI()
    {
        target = (GameObject)EditorGUILayout.ObjectField(
            "Model / Prefab",
            target,
            typeof(GameObject),
            true
        );

        size = EditorGUILayout.IntSlider("Size", size, 256, 2048);

        if (GUILayout.Button("Capture PNG"))
        {
            if (target != null)
                Capture();
        }
    }

    void Capture()
    {
        GameObject instance = Instantiate(target);
        instance.transform.position = Vector3.zero;

        Bounds bounds = CalculateBounds(instance);
        float radius = bounds.extents.magnitude;

        // Camera
        Camera cam = new GameObject("PreviewCam").AddComponent<Camera>();
        cam.backgroundColor = new Color(0, 0, 0, 0);
        cam.clearFlags = CameraClearFlags.SolidColor;
        cam.transform.position = bounds.center + new Vector3(0, radius * 0.3f, -radius * 2f);
        cam.transform.LookAt(bounds.center);

        // Light (giống Inspector)
        Light light = new GameObject("PreviewLight").AddComponent<Light>();
        light.type = LightType.Directional;
        light.intensity = 1.1f;
        light.transform.rotation = Quaternion.Euler(50, -30, 0);

        RenderTexture rt = new RenderTexture(size, size, 24, RenderTextureFormat.ARGB32);
        cam.targetTexture = rt;

        RenderTexture.active = rt;
        cam.Render();

        Texture2D tex = new Texture2D(size, size, TextureFormat.RGBA32, false);
        tex.ReadPixels(new Rect(0, 0, size, size), 0, 0);
        tex.Apply();

        byte[] png = tex.EncodeToPNG();
        string path = $"Assets/{target.name}_InspectorStyle.png";
        File.WriteAllBytes(path, png);

        // cleanup
        RenderTexture.active = null;
        DestroyImmediate(rt);
        DestroyImmediate(cam.gameObject);
        DestroyImmediate(light.gameObject);
        DestroyImmediate(instance);

        AssetDatabase.Refresh();
        Debug.Log("Saved: " + path);
    }

    Bounds CalculateBounds(GameObject obj)
    {
        Renderer[] r = obj.GetComponentsInChildren<Renderer>();
        Bounds b = r[0].bounds;
        foreach (var rr in r) b.Encapsulate(rr.bounds);
        return b;
    }
}
