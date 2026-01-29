#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;

[CustomEditor(typeof(ColliderNavCell))]
[CanEditMultipleObjects]
public class ColliderNavCellEditor : Editor
{
    SerializedProperty neighborsProp;

    void OnEnable()
    {
        neighborsProp = serializedObject.FindProperty("neighbors");
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        // Vẽ các field bình thường (kể cả neighbors list)
        DrawDefaultInspector();

        EditorGUILayout.Space(10);
        EditorGUILayout.LabelField("Neighbor Tools", EditorStyles.boldLabel);

        using (new EditorGUILayout.HorizontalScope())
        {
            if (GUILayout.Button("Make Bidirectional (This)"))
            {
                var cell = (ColliderNavCell)target;
                DoMakeBidirectional(cell);
            }

            if (GUILayout.Button("Make Bidirectional (All Selected)"))
            {
                foreach (var t in targets)
                {
                    var cell = t as ColliderNavCell;
                    if (cell != null) DoMakeBidirectional(cell);
                }
            }
        }

        EditorGUILayout.Space(6);

        var selected = Selection.gameObjects;
        int selectedCount = selected != null ? selected.Length : 0;
        EditorGUILayout.LabelField($"Selected GameObjects: {selectedCount}");

        using (new EditorGUI.DisabledScope(selectedCount == 0))
        {
            if (GUILayout.Button("Link Selected ↔ This (Active Cell)"))
            {
                var active = (ColliderNavCell)target; // object đang hiện inspector (active)
                DoLinkSelectedTo(active, bidirectional: true);
            }

            if (GUILayout.Button("Unlink Selected (Active Cell)"))
            {
                var active = (ColliderNavCell)target;
                DoUnlinkSelectedFrom(active, bidirectional: true);
            }
        }

        EditorGUILayout.HelpBox(
            "Tip: Để dùng 'Link Selected ↔ This': chọn các cell khác trước, rồi click cuối cùng vào cell muốn làm 'This' để nó là active (hiện Inspector), sau đó bấm nút.",
            MessageType.Info
        );

        serializedObject.ApplyModifiedProperties();
    }

    void DoMakeBidirectional(ColliderNavCell cell)
    {
        if (cell == null) return;

        Undo.RecordObject(cell, "Make Bidirectional");
        cell.MakeBidirectional();
        EditorUtility.SetDirty(cell);

        foreach (var n in cell.Neighbors)
        {
            if (n == null) continue;
            Undo.RecordObject(n, "Make Bidirectional (Neighbor)");
            EditorUtility.SetDirty(n);
        }
    }

    void DoLinkSelectedTo(ColliderNavCell cell, bool bidirectional)
    {
        if (cell == null) return;

        Undo.RecordObject(cell, "Link Selected");
        foreach (var go in Selection.gameObjects)
        {
            if (go == null) continue;
            var other = go.GetComponent<ColliderNavCell>();
            if (other == null || other == cell) continue;

            Undo.RecordObject(other, "Link Selected (Other)");
            cell.AddNeighbor(other, bidirectional);
            EditorUtility.SetDirty(other);
        }
        EditorUtility.SetDirty(cell);
    }

    void DoUnlinkSelectedFrom(ColliderNavCell cell, bool bidirectional)
    {
        if (cell == null) return;

        Undo.RecordObject(cell, "Unlink Selected");
        foreach (var go in Selection.gameObjects)
        {
            if (go == null) continue;
            var other = go.GetComponent<ColliderNavCell>();
            if (other == null || other == cell) continue;

            Undo.RecordObject(other, "Unlink Selected (Other)");
            cell.RemoveNeighbor(other, bidirectional);
            EditorUtility.SetDirty(other);
        }
        EditorUtility.SetDirty(cell);
    }
}
#endif
