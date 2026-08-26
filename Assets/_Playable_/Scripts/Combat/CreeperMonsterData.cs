using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Creeper (Add Component thủ công), điền CreeperData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class CreeperMonsterData : MonoBehaviour
    {
        [SerializeField] private CreeperData _data;

        public CreeperData Data => _data;
    }
}
