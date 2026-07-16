using UnityEditor;
using UnityEngine;

namespace Playable
{
    [CustomEditor(typeof(DeleteObj))]
    public class DeleteObjEditor : Editor
    {
        public override void OnInspectorGUI()
        {
            DrawDefaultInspector();

            GUILayout.Space(8);

            if (GUILayout.Button("Delete Inactive Objects"))
            {
                DeleteObj deleteObj = (DeleteObj)target;
                deleteObj.DeleteNow();
                EditorUtility.SetDirty(deleteObj);
            }
        }
    }
}
