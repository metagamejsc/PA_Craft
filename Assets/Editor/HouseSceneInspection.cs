using System.IO;
using System.Linq;
using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

[InitializeOnLoad]
internal static class HouseSceneInspection
{
    static HouseSceneInspection() { EditorApplication.delayCall += Inspect; }
    private static void Inspect()
    {
        if (EditorApplication.isPlayingOrWillChangePlaymode) return;
        var scene = SceneManager.GetActiveScene();
        if (scene.path != "Assets/_Playable_/Scenes/Gameplay.unity") return;
        var lines = scene.GetRootGameObjects().SelectMany(r => r.GetComponentsInChildren<Transform>(true))
            .Select(t => t.name + " | " + GlobalObjectId.GetGlobalObjectIdSlow(t.gameObject) + " | parent=" +
                (t.parent ? t.parent.name : "ROOT") + " | active=" + t.gameObject.activeSelf +
                " | pos=" + t.localPosition + " | rot=" + t.localEulerAngles +
                (t.GetComponent<MeshFilter>() ? " | mesh=" + t.GetComponent<MeshFilter>().sharedMesh.name + " bounds=" + t.GetComponent<MeshFilter>().sharedMesh.bounds : ""));
        File.WriteAllLines("Temp/HouseSceneInspection.txt", lines);
        File.WriteAllLines("Temp/HouseButtonIcons.txt", scene.GetRootGameObjects().SelectMany(r => r.GetComponentsInChildren<UnityEngine.UI.Button>(true))
            .Select(b => b.name + ": " + string.Join(",", b.GetComponentsInChildren<UnityEngine.UI.Image>(true).Select(i => i.sprite ? i.sprite.name : "none"))));
        var camera = Camera.main;
        if (camera)
        {
            var rt = RenderTexture.GetTemporary(800, 600, 24);
            var previous = camera.targetTexture;
            var active = RenderTexture.active;
            camera.targetTexture = rt;
            camera.Render();
            RenderTexture.active = rt;
            var image = new Texture2D(800, 600, TextureFormat.RGB24, false);
            image.ReadPixels(new Rect(0, 0, 800, 600), 0, 0);
            image.Apply();
            File.WriteAllBytes("Temp/HouseBefore.png", image.EncodeToPNG());
            camera.targetTexture = previous;
            RenderTexture.active = active;
            RenderTexture.ReleaseTemporary(rt);
            Object.DestroyImmediate(image);
        }
        Debug.Log("House scene inspection ready.");
    }
}
