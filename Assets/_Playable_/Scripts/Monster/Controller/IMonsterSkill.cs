namespace Playable
{
    /// <summary>
    /// Mọi skill đặc biệt của quái implement interface này. Monster gọi Tick() mỗi frame lúc đang spawn
    /// (kể cả khi target null - Huggy/Shinsonic không cần target); skill tự quản lý cooldown/điều kiện
    /// kích hoạt riêng bên trong nó, Monster không switch-case theo loại quái.
    /// </summary>
    public interface IMonsterSkill
    {
        /// <summary>Đang thi triển skill (channel) - CC-immune trong lúc này, các skill khác trên cùng
        /// quái không được bắt đầu channel song song.</summary>
        bool IsChanneling { get; }

        /// <summary>Gọi 1 lần lúc Monster.Spawn() để cache tham chiếu. Tự đọc số liệu riêng của mình
        /// qua property tương ứng trên Monster (vd self.EndermanStats, self.IronGolemStats...).</summary>
        void Init(Monster self);

        /// <summary>Gọi mỗi frame. target có thể null nếu quái đang không giao chiến ai.</summary>
        void Tick(Monster target);
    }
}
