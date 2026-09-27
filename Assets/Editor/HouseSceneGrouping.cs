using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

// One-time scene migration. No runtime component is added to the playable.
[InitializeOnLoad]
internal static class HouseSceneGrouping
{
    private const string Output = "Assets/_Playable_/3D Model/HouseParts";
    static HouseSceneGrouping() { EditorApplication.delayCall += Run; }

    private static void Run()
    {
        if (EditorApplication.isPlayingOrWillChangePlaymode || File.Exists("Temp/HouseGrouping.done")) return;
        var scene = SceneManager.GetActiveScene();
        if (scene.path != "Assets/_Playable_/Scenes/Gameplay.unity") return;
        var house = scene.GetRootGameObjects().SingleOrDefault(g => g.name == "House");
        if (!house || house.transform.Find("MainDoor")) return;
        try
        {
            var controller = UnityEngine.Object.FindFirstObjectByType<Playable.GameController>();
            var serialized = new SerializedObject(controller);
            var entries = serialized.FindProperty("_objects");
            if (entries.arraySize != 5) throw new Exception("Expected five house buttons.");
            var source = house.GetComponentsInChildren<MeshFilter>(true).ToDictionary(f => f.name);
            foreach (var name in new[] { "Object_30", "Object_31", "Object_36", "Object_37", "Object_38", "Object_45", "Object_46", "Object_47", "Object_49", "Object_50" })
                if (!source.ContainsKey(name)) throw new Exception("Missing " + name);
            Directory.CreateDirectory("Temp/HouseGroupingBackup");
            File.Copy(scene.path, "Temp/HouseGroupingBackup/Gameplay.unity", true);
            if (PrefabUtility.IsPartOfPrefabInstance(house))
                PrefabUtility.UnpackPrefabInstance(house, PrefabUnpackMode.Completely, InteractionMode.AutomatedAction);
            Undo.RegisterFullObjectHierarchyUndo(house, "Group house construction parts");
            var names = new[] { "MainDoor", "GlassWindows", "Roof", "ExteriorLights", "SurroundingWalls", "Foundation", "Interior_Inactive" };
            var groups = names.Select(n => { var g = new GameObject(n); g.transform.SetParent(house.transform, false); return g; }).ToArray();
            foreach (var f in source.Values) f.transform.SetParent(groups[6].transform, true);
            Action<string, int> move = (name, group) => { source[name].transform.SetParent(groups[group].transform, true); source[name].gameObject.SetActive(true); };
            move("Object_45", 0); move("Object_46", 0);
            move("Object_30", 1); move("Object_47", 2);
            move("Object_49", 5); move("Object_50", 5);
            if (!AssetDatabase.IsValidFolder(Output)) AssetDatabase.CreateFolder("Assets/_Playable_/3D Model", "HouseParts");
            var report = new List<string>();
            Split(source["Object_31"], groups, p => Mathf.Abs(p.x) > 4 || Mathf.Abs(p.y) > 4 ? 3 : 6, report);
            Split(source["Object_36"], groups, p => p.z > 8.001f ? 2 : 4, report);
            Split(source["Object_37"], groups, p => p.z > 8.001f ? 2 : 4, report);
            Split(source["Object_38"], groups, p => p.z <= 4.001f ? 5 : Mathf.Abs(p.x) >= 2.999f || Mathf.Abs(p.y) >= 2.999f ? 4 : 6, report);
            // House categories follow the requested order in the existing five hotbar slots.
            for (int i = 0; i < entries.arraySize; i++)
            {
                var entry = entries.GetArrayElementAtIndex(i);
                var button = (UnityEngine.UI.Button)entry.FindPropertyRelative("BtnActive").objectReferenceValue;
                var icon = button.transform.Find("Icon").GetComponent<UnityEngine.UI.Image>().sprite;
                int group = i;
                var objects = entry.FindPropertyRelative("Objects");
                objects.arraySize = 1;
                objects.GetArrayElementAtIndex(0).objectReferenceValue = groups[group];
                report.Add(button.name + " / " + icon.name + " -> " + groups[group].name);
            }
            var assigned = Enumerable.Range(0, 5).Select(i => entries.GetArrayElementAtIndex(i).FindPropertyRelative("Objects").GetArrayElementAtIndex(0).objectReferenceValue).Distinct().Count();
            if (assigned != 5) throw new Exception("Hotbar icons did not identify five distinct groups; inspect mapping before saving.\n" + string.Join("\n", report));
            serialized.ApplyModifiedProperties();
            groups[6].SetActive(false);
            foreach (var g in groups.Take(5)) g.SetActive(true);
            Capture("Temp/HouseCompleted.png");
            foreach (var g in groups.Take(5)) g.SetActive(false);
            Capture("Temp/HouseInitial.png");
            AssetDatabase.SaveAssets();
            EditorSceneManager.MarkSceneDirty(scene);
            EditorSceneManager.SaveScene(scene);
            foreach (var g in groups) report.Add(g.name + " active=" + g.activeSelf + " meshes=" + g.GetComponentsInChildren<MeshFilter>(true).Length);
            File.WriteAllLines("Temp/HouseGrouping.done", report);
            Debug.Log("House grouping saved and verified. " + string.Join("; ", report));
        }
        catch (Exception e) { File.WriteAllText("Temp/HouseGrouping.error", e.ToString()); Debug.LogException(e); }
    }

    private static void Split(MeshFilter original, GameObject[] groups, Func<Vector3, int> classify, List<string> report)
    {
        var mesh = original.sharedMesh;
        var vertices = mesh.vertices;
        var triangles = mesh.triangles;
        var buckets = new Dictionary<int, List<int>>();
        for (int i = 0; i < triangles.Length; i += 3)
        {
            int group = classify((vertices[triangles[i]] + vertices[triangles[i + 1]] + vertices[triangles[i + 2]]) / 3f);
            if (!buckets.ContainsKey(group)) buckets[group] = new List<int>();
            buckets[group].AddRange(new[] { triangles[i], triangles[i + 1], triangles[i + 2] });
        }
        if (buckets.Sum(b => b.Value.Count) != triangles.Length) throw new Exception("Triangle count mismatch");
        foreach (var bucket in buckets)
        {
            if (bucket.Key == 6) continue;
            var part = UnityEngine.Object.Instantiate(mesh);
            part.name = original.name + "_" + groups[bucket.Key].name;
            part.triangles = bucket.Value.ToArray();
            part.RecalculateBounds();
            AssetDatabase.CreateAsset(part, Output + "/" + part.name + ".asset");
            var child = UnityEngine.Object.Instantiate(original.gameObject, original.transform.parent);
            child.name = part.name;
            child.GetComponent<MeshFilter>().sharedMesh = part;
            child.transform.SetParent(groups[bucket.Key].transform, true);
            child.SetActive(true);
            report.Add(part.name + " triangles=" + bucket.Value.Count / 3);
        }
        original.gameObject.SetActive(false);
    }

    private static void Capture(string path)
    {
        var camera = Camera.main;
        if (!camera) return;
        var rt = RenderTexture.GetTemporary(1000, 750, 24);
        var previous = camera.targetTexture;
        var active = RenderTexture.active;
        try
        {
            camera.targetTexture = rt;
            camera.Render();
            RenderTexture.active = rt;
            var image = new Texture2D(1000, 750, TextureFormat.RGB24, false);
            image.ReadPixels(new Rect(0, 0, 1000, 750), 0, 0);
            image.Apply();
            File.WriteAllBytes(path, image.EncodeToPNG());
            UnityEngine.Object.DestroyImmediate(image);
        }
        finally { camera.targetTexture = previous; RenderTexture.active = active; RenderTexture.ReleaseTemporary(rt); }
    }
}
