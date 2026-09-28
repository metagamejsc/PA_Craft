using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Iron Golem skill 2: bật một bool để Animator chạy Start -> Loop, giữ skill trong một khoảng thời gian
    /// rồi tắt bool để Animator chuyển sang End. TNT được bắn bằng Animation Event ở clip Loop.
    /// </summary>
    [DisallowMultipleComponent]
    public class IronGolemTntBarrageSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator")] [SerializeField] private string _skillBoolParam = "";

        [Header("TNT Visual")] [SerializeField]
        private GameObject _tntPrefab;

        [SerializeField] private Transform _leftHandFirePoint;
        [SerializeField] private Transform _rightHandFirePoint;
        [SerializeField] private Vector3 _leftHandFallbackOffset = new Vector3(-0.9f, 2.2f, 0.4f);
        [SerializeField] private Vector3 _rightHandFallbackOffset = new Vector3(0.9f, 2.2f, 0.4f);

        private Monster _self;
        private IronGolemData _stats;
        private int _skillBoolHash;
        private float _cooldownTimer;
        private float _skillTimer;
        private bool _isChanneling;
        private Monster _channelTarget;
        private float _shotTimer;
        private float _lastLeftShot;
        private float _lastRightShot;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _skillBoolHash = Animator.StringToHash(_skillBoolParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.IronGolemStats;
            _cooldownTimer = Random.Range(2f, 3f);
            _isChanneling = false;
        }

        public void Tick(Monster target)
        {
            if (_isChanneling)
            {
                UpdateSkill();
                return;
            }

            _cooldownTimer -= Time.deltaTime;

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling
                || _tntPrefab == null)
            {
                return;
            }

            float distanceSqr = (target.Position - _self.Position).sqrMagnitude;

            if (distanceSqr <= _stats.TntBarrageRange * _stats.TntBarrageRange)
            {
                StartSkill(target);
            }
        }

        private void StartSkill(Monster target)
        {
            _isChanneling = true;
            _channelTarget = target;
            _skillTimer = Mathf.Max(0f, _stats.TntBarrageDuration);
            _shotTimer = 0.65f;
            _lastLeftShot = _lastRightShot = -100f;
            _self.Feedback?.Skill(_self.Position, false);

            _self.FaceTowards(target.Position);
            SetSkillAnimation(true);
        }

        private void UpdateSkill()
        {
            if (_channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                EndSkill();
                return;
            }

            _self.FaceTowards(_channelTarget.Position);
            _skillTimer -= Time.deltaTime;
            _shotTimer -= Time.deltaTime;
            if (_shotTimer <= 0f)
            {
                FireTntFromLeftHand();
                FireTntFromRightHand();
                _shotTimer = 0.65f;
            }

            if (_skillTimer <= 0f)
            {
                EndSkill();
            }
        }

        public void FireTntFromLeftHand()
        {
            if (Time.time - _lastLeftShot < 0.5f) return;
            _lastLeftShot = Time.time;
            FireTnt(_leftHandFirePoint, _leftHandFallbackOffset);
        }

        public void FireTntFromRightHand()
        {
            if (Time.time - _lastRightShot < 0.5f) return;
            _lastRightShot = Time.time;
            FireTnt(_rightHandFirePoint, _rightHandFallbackOffset);
        }

        public void OnFinishedAnimationEvent()
        {
            EndSkill();
        }

        private void FireTnt(Transform firePoint, Vector3 fallbackOffset)
        {
            if (!_isChanneling || _channelTarget == null || !_channelTarget.isActiveAndEnabled || _channelTarget.IsDead)
            {
                return;
            }

            _self.FaceTowards(_channelTarget.Position);
            Vector3 origin = firePoint != null ? firePoint.position : transform.TransformPoint(fallbackOffset);

            MonsterProjectile.Spawn(
                _tntPrefab,
                origin,
                _self,
                _channelTarget,
                _stats.TntBarrageDamage,
                _stats.TntBarrageSpeed,
                _stats.TntBarrageKnockbackForce,
                _stats.KnockbackDuration);
        }

        private void EndSkill()
        {
            if (!_isChanneling)
            {
                return;
            }

            SetSkillAnimation(false);
            _isChanneling = false;
            _cooldownTimer = _stats.TntBarrageCooldown;
            _channelTarget = null;
        }

        private void SetSkillAnimation(bool value)
        {
            if (!string.IsNullOrEmpty(_skillBoolParam) && _self.HasAnimator)
            {
                _self.SetAnimatorBool(_skillBoolHash, _skillBoolParam, value);
            }
        }
    }
}
