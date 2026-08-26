using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Gắn component này lên đúng prefab Iron Golem (Add Component thủ công), điền IronGolemData ngay
    /// trên đó. Monster.cs tự tìm/tự thêm nếu thiếu, không cần asset chung.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemMonsterData : MonoBehaviour
    {
        [SerializeField] private IronGolemData _data;

        public IronGolemData Data => _data;
    }
}
