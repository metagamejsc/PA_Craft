using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Enderman (Add Component thủ công), điền EndermanData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanMonsterData : MonoBehaviour
    {
        [SerializeField] private EndermanData _data;

        public EndermanData Data => _data;
    }
}
