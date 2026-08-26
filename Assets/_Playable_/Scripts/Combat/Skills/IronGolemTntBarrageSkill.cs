using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Iron Golem skill 2: bắn liên tiếp nhiều quả TNT về hướng đối thủ. Channel 3 pha animation:
    /// Start (trigger 1 lần) -> Loop (bool giữ true, bắn đều mỗi TntBarrageShotInterval giây) -> End
    /// (trigger 1 lần), rồi mới reset cooldown.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemTntBarrageSkill : MonoBehaviour, IMonsterSkill
    {
        private enum Phase
        {
            Start,
            Loop,
            End
        }

        [Header("Animator (optional)")]
        [SerializeField] private string _startTriggerParam = "";
        [SerializeField] private string _loopBoolParam = "";
        [SerializeField] private string _endTriggerParam = "";

        [Header("TNT Visual")]
        [Tooltip("Prefab quả TNT (phải có/tự động được gắn component MonsterProjectile). Để trống = skill không bắn được gì.")]
        [SerializeField]
        private GameObject _tntPrefab;

        private Monster _self;
        private IronGolemData _stats;
        private int _startTriggerHash;
        private int _loopBoolHash;
        private int _endTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private Phase _phase;
        private float _phaseTimer;
        private float _shotTimer;
        private Monster _channelTarget;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _startTriggerHash = Animator.StringToHash(_startTriggerParam);
            _loopBoolHash = Animator.StringToHash(_loopBoolParam);
            _endTriggerHash = Animator.StringToHash(_endTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.IronGolemStats;
            _cooldownTimer = _stats.TntBarrageCooldown;
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateChannel();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling
                || _tntPrefab == null)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr > _stats.TntBarrageRange * _stats.TntBarrageRange)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _channelTarget = target;
            _phase = Phase.Start;
            _phaseTimer = _stats.TntBarrageStartDuration;

            _self.FaceTowards(target.Position);

            if (!string.IsNullOrEmpty(_startTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_startTriggerHash, _startTriggerParam);
            }
        }

        private void UpdateChannel()
        {
            switch (_phase)
            {
                case Phase.Start:
                    _phaseTimer -= Time.deltaTime;

                    if (_phaseTimer <= 0f)
                    {
                        EnterLoop();
                    }

                    break;

                case Phase.Loop:
                    UpdateLoop();
                    break;

                case Phase.End:
                    _phaseTimer -= Time.deltaTime;

                    if (_phaseTimer <= 0f)
                    {
                        EndChannel();
                    }

                    break;
            }
        }

        private void EnterLoop()
        {
            _phase = Phase.Loop;
            _phaseTimer = _stats.TntBarrageLoopDuration;
            _shotTimer = 0f;

            if (!string.IsNullOrEmpty(_loopBoolParam) && _self.HasAnimator)
            {
                _self.SetAnimatorBool(_loopBoolHash, _loopBoolParam, true);
            }
        }

        private void UpdateLoop()
        {
            _phaseTimer -= Time.deltaTime;
            _shotTimer -= Time.deltaTime;

            if (_shotTimer <= 0f)
            {
                _shotTimer = _stats.TntBarrageShotInterval;
                FireShot();
            }

            if (_phaseTimer <= 0f)
            {
                EnterEnd();
            }
        }

        private void FireShot()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                return;
            }

            MonsterProjectile.Spawn(
                _tntPrefab,
                _self.Position,
                _self,
                _channelTarget,
                _stats.TntBarrageDamage,
                _stats.TntBarrageSpeed,
                _stats.TntBarrageKnockbackForce,
                _stats.KnockbackDuration);
        }

        private void EnterEnd()
        {
            _phase = Phase.End;
            _phaseTimer = _stats.TntBarrageEndDuration;

            if (!string.IsNullOrEmpty(_loopBoolParam) && _self.HasAnimator)
            {
                _self.SetAnimatorBool(_loopBoolHash, _loopBoolParam, false);
            }

            if (!string.IsNullOrEmpty(_endTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_endTriggerHash, _endTriggerParam);
            }
        }

        private void EndChannel()
        {
            _isChanneling = false;
            _cooldownTimer = _stats.TntBarrageCooldown;
            _channelTarget = null;
        }
    }
}
