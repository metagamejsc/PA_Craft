using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    /// <summary>
    /// Quả bom bay thẳng tới vị trí đối thủ lúc ném (không homing - nếu đối thủ né ra khỏi bán kính va
    /// chạm thì bay hụt, không gây damage). Pool theo prefab (mỗi loại quái có thể dùng model bom khác
    /// nhau) - không Instantiate/Destroy khi đang chơi sau lần đầu warm-up mỗi loại prefab.
    /// </summary>
    [DisallowMultipleComponent]
    public class MonsterProjectile : MonoBehaviour
    {
        private static readonly Dictionary<GameObject, List<MonsterProjectile>> _pools =
            new Dictionary<GameObject, List<MonsterProjectile>>();

        [SerializeField] private GameObject _explosionVfxPrefab;
        [SerializeField] private float _explosionVfxLifeTime = 1.5f;
        [SerializeField] private float _hitRadius = 0.4f;
        [SerializeField] private float _maxLifeTime = 4f;

        private Transform _transform;
        private GameObject _sourcePrefab;
        private Monster _owner;
        private Monster _target;
        private Vector3 _targetPosition;
        private Vector3 _direction;
        private float _speed;
        private float _damage;
        private float _knockbackForce;
        private float _knockbackDuration;
        private float _lifeTimer;
        private bool _isFlying;
        private GameObject _explosionVfxInstance;
        private ParticleSystem[] _explosionVfxParticles;
        private float _explosionHideTime;

        /// <summary>Ném 1 quả bom từ origin bay thẳng tới target. prefab phải có (hoặc sẽ được gắn thêm)
        /// component MonsterProjectile.</summary>
        public static void Spawn(
            GameObject prefab,
            Vector3 origin,
            Monster owner,
            Monster target,
            float damage,
            float speed,
            float knockbackForce,
            float knockbackDuration)
        {
            if (prefab == null || target == null)
            {
                return;
            }

            MonsterProjectile projectile = GetFromPool(prefab);
            projectile.Launch(origin, owner, target, damage, speed, knockbackForce, knockbackDuration);
        }

        private static MonsterProjectile GetFromPool(GameObject prefab)
        {
            if (!_pools.TryGetValue(prefab, out List<MonsterProjectile> pool))
            {
                pool = new List<MonsterProjectile>();
                _pools[prefab] = pool;
            }

            while (pool.Count > 0)
            {
                int lastIndex = pool.Count - 1;
                MonsterProjectile candidate = pool[lastIndex];
                pool.RemoveAt(lastIndex);

                if (candidate == null)
                {
                    continue;
                }

                candidate.gameObject.SetActive(true);
                return candidate;
            }

            GameObject instance = Instantiate(prefab);
            MonsterProjectile projectile = instance.GetComponent<MonsterProjectile>();

            if (projectile == null)
            {
                projectile = instance.AddComponent<MonsterProjectile>();
            }

            projectile._sourcePrefab = prefab;
            return projectile;
        }

        private void Awake()
        {
            _transform = transform;
        }

        private void Launch(
            Vector3 origin,
            Monster owner,
            Monster target,
            float damage,
            float speed,
            float knockbackForce,
            float knockbackDuration)
        {
            _transform.position = origin;
            _owner = owner;
            _target = target;
            _targetPosition = target.Position;
            _damage = damage;
            _speed = Mathf.Max(speed, 0.01f);
            _knockbackForce = knockbackForce;
            _knockbackDuration = knockbackDuration;
            _lifeTimer = _maxLifeTime;

            Vector3 toTarget = _targetPosition - origin;
            _direction = toTarget.sqrMagnitude > 0.0001f ? toTarget.normalized : Vector3.forward;
            _transform.rotation = Quaternion.LookRotation(_direction, Vector3.up);

            _isFlying = true;
        }

        private void Update()
        {
            if (_explosionHideTime > 0f && Time.time >= _explosionHideTime)
            {
                _explosionHideTime = 0f;

                if (_explosionVfxInstance != null)
                {
                    _explosionVfxInstance.SetActive(false);
                }
            }

            if (!_isFlying)
            {
                return;
            }

            _lifeTimer -= Time.deltaTime;

            if (_lifeTimer <= 0f)
            {
                Despawn();
                return;
            }

            Vector3 position = _transform.position;
            float step = _speed * Time.deltaTime;
            float remainingDistance = Vector3.Distance(position, _targetPosition);

            if (remainingDistance <= step)
            {
                Explode();
                return;
            }

            _transform.position = position + _direction * step;
        }

        private void Explode()
        {
            _isFlying = false;

            if (_target != null && !_target.IsDead)
            {
                float distanceSqr = (_target.Position - _transform.position).sqrMagnitude;

                if (distanceSqr <= _hitRadius * _hitRadius)
                {
                    _target.Health.TakeDamage(_owner, _damage);
                    _target.Health.ApplyCrowdControl(_transform.position, _knockbackForce, _knockbackDuration);
                }
            }

            PlayExplosionVfx();
            Despawn();
        }

        private void PlayExplosionVfx()
        {
            if (_explosionVfxPrefab == null)
            {
                return;
            }

            if (_explosionVfxInstance == null)
            {
                _explosionVfxInstance = Instantiate(_explosionVfxPrefab, _transform.position, Quaternion.identity);
                _explosionVfxParticles = _explosionVfxInstance.GetComponentsInChildren<ParticleSystem>(true);
            }
            else
            {
                _explosionVfxInstance.transform.position = _transform.position;
                _explosionVfxInstance.SetActive(true);
            }

            for (int i = 0; i < _explosionVfxParticles.Length; i++)
            {
                _explosionVfxParticles[i].Clear();
                _explosionVfxParticles[i].Play();
            }

            _explosionHideTime = Time.time + _explosionVfxLifeTime;
        }

        private void Despawn()
        {
            _isFlying = false;
            _owner = null;
            _target = null;
            gameObject.SetActive(false);

            if (_sourcePrefab == null)
            {
                return;
            }

            if (!_pools.TryGetValue(_sourcePrefab, out List<MonsterProjectile> pool))
            {
                pool = new List<MonsterProjectile>();
                _pools[_sourcePrefab] = pool;
            }

            pool.Add(this);
        }
    }
}
