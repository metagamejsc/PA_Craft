using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Enderman dịch chuyển tức thời 2 lần tới điểm ngẫu nhiên quanh target (bán kính TeleportRadius,
    /// cách nhau TeleportStepDelay giây), rồi dịch chuyển lần 3 vào tầm melee, quay mặt và gây
    /// TeleportFinalAttackDamage ngay lập tức.
    /// </summary>
    [DisallowMultipleComponent]
    public class EndermanTeleportSkill : MonoBehaviour, IMonsterSkill
    {
        [Header("Animator (optional)")]
        [SerializeField] private string _teleportTriggerParam = "";

        [Header("VFX (optional)")]
        [SerializeField] private GameObject _teleportVfxPrefab;

        private Monster _self;
        private EndermanData _stats;
        private int _teleportTriggerHash;

        private float _cooldownTimer;
        private bool _isChanneling;
        private int _hopIndex;
        private float _stepTimer;
        private Monster _channelTarget;

        private readonly GameObject[] _puffPool = new GameObject[2];
        private readonly ParticleSystem[][] _puffParticles = new ParticleSystem[2][];
        private int _puffIndex;

        public bool IsChanneling => _isChanneling;

        private void Awake()
        {
            _teleportTriggerHash = Animator.StringToHash(_teleportTriggerParam);
        }

        public void Init(Monster self)
        {
            _self = self;
            _stats = self.EndermanStats;
            _cooldownTimer = _stats.TeleportCooldown;
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

            if (_cooldownTimer > 0f || target == null || target.IsDead || _self.IsAnySkillChanneling)
            {
                return;
            }

            StartChannel(target);
        }

        private void StartChannel(Monster target)
        {
            _isChanneling = true;
            _hopIndex = 0;
            _stepTimer = 0f;
            _channelTarget = target;
        }

        private void UpdateChannel()
        {
            if (_channelTarget == null || _channelTarget.IsDead)
            {
                EndChannel();
                return;
            }

            _stepTimer -= Time.deltaTime;

            if (_stepTimer > 0f)
            {
                return;
            }

            if (_hopIndex < 2)
            {
                Vector2 offset = Random.insideUnitCircle.normalized * _stats.TeleportRadius;
                Vector3 hopPosition = _channelTarget.Position + new Vector3(offset.x, 0f, offset.y);
                TeleportSelf(hopPosition, false);

                _hopIndex++;
                _stepTimer = _stats.TeleportStepDelay;
                return;
            }

            Vector3 finalOffset = _self.Position - _channelTarget.Position;
            finalOffset.y = 0f;

            Vector3 direction = finalOffset.sqrMagnitude > 0.0001f
                ? finalOffset.normalized
                : Vector3.forward;

            float approachDistance = Mathf.Max(_stats.AttackRange * 0.8f, 0.5f);
            Vector3 finalPosition = _channelTarget.Position + direction * approachDistance;

            TeleportSelf(finalPosition, true);
            _channelTarget.Health.TakeDamage(_self, _stats.TeleportFinalAttackDamage);

            EndChannel();
        }

        private void TeleportSelf(Vector3 worldPosition, bool faceTargetAfter)
        {
            PlayTeleportPuff(_self.Position);
            _self.TeleportTo(worldPosition, false);
            PlayTeleportPuff(_self.Position);

            if (faceTargetAfter && _channelTarget != null)
            {
                _self.FaceTowards(_channelTarget.Position);
            }

            if (!string.IsNullOrEmpty(_teleportTriggerParam) && _self.HasAnimator)
            {
                _self.PlayAnimatorTrigger(_teleportTriggerHash, _teleportTriggerParam);
            }
        }

        private void PlayTeleportPuff(Vector3 position)
        {
            if (_teleportVfxPrefab == null)
            {
                return;
            }

            int slot = _puffIndex;
            _puffIndex = (_puffIndex + 1) % _puffPool.Length;

            GameObject puff = _puffPool[slot];

            if (puff == null)
            {
                puff = Instantiate(_teleportVfxPrefab, position, Quaternion.identity);
                _puffPool[slot] = puff;
                _puffParticles[slot] = puff.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                puff.transform.position = position;
                puff.SetActive(true);
            }

            ParticleSystem[] particles = _puffParticles[slot];

            for (int i = 0; i < particles.Length; i++)
            {
                particles[i].Clear();
                particles[i].Play();
            }
        }

        private void EndChannel()
        {
            _isChanneling = false;
            _cooldownTimer = _stats.TeleportCooldown;
            _channelTarget = null;
        }
    }
}
