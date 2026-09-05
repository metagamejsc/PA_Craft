namespace Playable
{
    public sealed class ShinsonicAnimationEvents : MonsterAnimationEvents
    {
        private ShinsonicTransformSkill _transformSkill;

        protected override void Awake()
        {
            base.Awake();
            _transformSkill = GetComponentInParent<ShinsonicTransformSkill>();
        }

        public void TransformFinished()
        {
            _transformSkill?.OnTransformFinishedAnimationEvent();
        }
    }
}
