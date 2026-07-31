using UnityEditor;
using UnityEngine;

namespace Playable.Scripts.Editor
{
    public class RemoveMissingScriptsWindow : EditorWindow
    {
        private GameObject _target;

        [MenuItem("Tools/Remove Missing Scripts")]
        private static void ShowWindow()
        {
            GetWindow<RemoveMissingScriptsWindow>("Remove Missing Scripts");
        }

        private void OnGUI()
        {
            _target = (GameObject)EditorGUILayout.ObjectField("Target", _target, typeof(GameObject), true);

            using (new EditorGUI.DisabledScope(_target == null))
            {
                if (GUILayout.Button("Remove Missing Scripts (Object + Children)"))
                {
                    RemoveMissingScriptsRecursively(_target);
                }
            }
        }

        private static void RemoveMissingScriptsRecursively(GameObject root)
        {
            Transform[] allTransforms = root.GetComponentsInChildren<Transform>(true);
            int totalRemoved = 0;

            foreach (Transform t in allTransforms)
            {
                GameObject go = t.gameObject;
                Undo.RegisterCompleteObjectUndo(go, "Remove Missing Scripts");

                int removedCount = GameObjectUtility.RemoveMonoBehavioursWithMissingScript(go);
                totalRemoved += removedCount;
            }

            Debug.Log(
                $"[RemoveMissingScripts] Removed {totalRemoved} missing script(s) on '{root.name}' and its children.");
        }
    }
}