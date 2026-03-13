#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(MinecraftIceSlide))]
public class MinecraftIceSlideEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();

        GUILayout.Space(8);

        MinecraftIceSlide gen = (MinecraftIceSlide)target;

        EditorGUILayout.BeginHorizontal();

        if (GUILayout.Button("Generate"))
        {
            Undo.RecordObject(gen, "Generate Minecraft Ice Slide");
            gen.Generate();
            EditorUtility.SetDirty(gen);
        }

        if (GUILayout.Button("Clear"))
        {
            Undo.RecordObject(gen, "Clear Minecraft Ice Slide");
            //gen.ClearMesh();
            EditorUtility.SetDirty(gen);
        }

        EditorGUILayout.EndHorizontal();
    }
}
#endif