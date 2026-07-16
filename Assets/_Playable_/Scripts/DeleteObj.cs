using UnityEngine;
using Object = UnityEngine.Object;
#if UNITY_EDITOR
using UnityEditor;
#endif

namespace Playable
{
    public class DeleteObj : MonoBehaviour
    {
        [ContextMenu("Delete Inactive Objects")]
        public void DeleteNow()
        {
            DeleteInactiveObjects(transform);
        }

        public void DeleteInactiveObjects(Transform root)
        {
#if UNITY_EDITOR
            if (!Application.isPlaying)
            {
                Undo.RegisterFullObjectHierarchyUndo(root.gameObject, "Delete Inactive Objects");
            }
#endif

            for (int i = root.childCount - 1; i >= 0; i--)
            {
                Transform child = root.GetChild(i);

                if (child == null)
                {
                    continue;
                }

                if (!child.gameObject.activeSelf)
                {
                    if (Application.isPlaying)
                    {
                        Object.Destroy(child.gameObject);
                    }
                    else
                    {
                        Object.DestroyImmediate(child.gameObject);
                    }

                    continue;
                }

                DeleteInactiveObjects(child);
            }
        }
    }
}
