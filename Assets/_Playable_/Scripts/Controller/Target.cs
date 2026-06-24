using UnityEngine;

namespace Playable
{
    public class Target : MonoBehaviour
    {
        [SerializeField] private BowType _bowType;

        public BowType Type => _bowType;
    }
}