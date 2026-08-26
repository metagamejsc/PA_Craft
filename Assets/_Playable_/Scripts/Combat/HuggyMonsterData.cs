using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Huggy (Add Component thủ công), điền HuggyData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class HuggyMonsterData : MonoBehaviour
    {
        [SerializeField] private HuggyData _data;

        public HuggyData Data => _data;
    }
}
