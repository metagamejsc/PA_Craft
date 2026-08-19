using UnityEngine;

namespace Playable.Player
{
    public class PlayerController : MonoBehaviour
    {
        [TabGroup("Stats", "Combat")] public int attack;
        [TabGroup("Stats", "Visual")] public Sprite icon;
        [TabGroup("Move", "bbb")] public Sprite a;

    }
}