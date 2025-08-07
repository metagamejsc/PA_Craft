using UnityEngine;

public class CharacterAnimationHandler : MonoBehaviour
{
    // Hàm này sẽ được gọi từ Animation Event
    public void OnFootstep()
    {
        AudioManager.ins.PlaySoundWalk();
    }

}