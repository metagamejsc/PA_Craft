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
        [SerializeField]
        private HuggyData _data = new HuggyData
        {
            MaxHealth = 130f,
            MoveSpeed = 1.7f,

            AttackDamage = 14f,
            AttackRange = 1.5f,
            AttackCooldown = 1.4f,

            KnockbackForce = 0f, // mỗi đòn trúng đều stun đối thủ tại chỗ thay vì đẩy lùi
            KnockbackDuration = 0.5f
        };

        public HuggyData Data => _data;
    }
}
