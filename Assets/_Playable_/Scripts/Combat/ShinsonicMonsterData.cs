using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Shinsonic (Add Component thủ công), điền ShinsonicData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class ShinsonicMonsterData : MonoBehaviour
    {
        [SerializeField] private ShinsonicData _data;

        public ShinsonicData Data => _data;
    }
}
