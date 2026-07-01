using Spine.Unity;
using UnityEngine;

public class AnimationController : MonoBehaviour
{
    [SerializeField] private SkeletonGraphic left;
    [SerializeField] private SkeletonGraphic right;
    [SerializeField] private string key;
    public void PlayAnim()
    {
        left.AnimationState.SetAnimation(0, key, true);
        right.AnimationState.SetAnimation(0, key, true);
    }
    public void StopAnim()
    {
        left.AnimationState.ClearTrack(0);
        right.AnimationState.ClearTrack(0);
    }
}