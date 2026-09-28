using System.Collections.Generic;
using UnityEngine;

namespace Playable
{
    [DisallowMultipleComponent]
    public class MonsterProjectile : MonoBehaviour
    {
        private static readonly List<MonsterProjectile> Pool = new List<MonsterProjectile>();
        [SerializeField] private GameObject _explosionVfxPrefab;
        [SerializeField] private AudioClip _explosionSound;
        [SerializeField] private float _explosionVfxLifeTime = 1.5f;
        [SerializeField] private float _hitRadius = 2f;
        [SerializeField] private float _maxLifeTime = 4f;
        private GameObject _sourcePrefab;
        private Monster _owner;
        private Vector3 _destination;
        private float _speed, _damage, _push, _stun, _expires;

        public static void Spawn(GameObject prefab, Vector3 origin, Monster owner, Monster target,
            float damage, float speed, float knockbackForce, float knockbackDuration)
        {
            if (prefab == null || owner == null || target == null || target.IsDead) return;
            MonsterProjectile shot = null;
            for (int i = Pool.Count - 1; i >= 0; i--)
            {
                if (Pool[i] == null) { Pool.RemoveAt(i); continue; }
                if (Pool[i]._sourcePrefab == prefab && !Pool[i].gameObject.activeSelf) shot = Pool[i];
            }
            if (shot == null)
            {
                if (Pool.Count >= 32) return;
                GameObject instance = Instantiate(prefab);
                shot = instance.GetComponent<MonsterProjectile>();
                if (shot == null) shot = instance.AddComponent<MonsterProjectile>();
                shot._sourcePrefab = prefab;
                Pool.Add(shot);
            }
            shot._owner = owner;
            shot._destination = target.Position + Vector3.up * 0.5f;
            shot._speed = Mathf.Max(0.1f, speed);
            shot._damage = damage;
            shot._push = knockbackForce;
            shot._stun = knockbackDuration;
            shot._expires = Time.time + shot._maxLifeTime;
            shot.transform.position = origin + Vector3.up * 0.5f;
            shot.gameObject.SetActive(true);
        }

        private void Update()
        {
            Vector3 delta = _destination - transform.position;
            float step = _speed * Time.deltaTime;
            if (delta.sqrMagnitude <= step * step)
            {
                transform.position = _destination;
                if (_owner != null)
                    MonsterAreaAttack.Apply(_owner, _destination, _hitRadius, _damage, _push, _stun,
                        360f, 0f, 0f, 0f, _owner.Type == MonsterType.Creeper || _owner.Type == MonsterType.IronGolem ? 1.5f : 0f);
                MonsterBattleEffects.Play(_explosionVfxPrefab, _destination, Quaternion.identity, _explosionVfxLifeTime);
                MonsterBattleEffects.Sound(_explosionSound, 0.35f);
                gameObject.SetActive(false);
                _owner = null;
                return;
            }
            if (Time.time >= _expires) { gameObject.SetActive(false); _owner = null; return; }
            transform.position += delta.normalized * step;
            transform.Rotate(120f * Time.deltaTime, 180f * Time.deltaTime, 0f);
        }
    }
}
