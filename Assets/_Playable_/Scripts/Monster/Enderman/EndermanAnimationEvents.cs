namespace Playable
{
    public sealed class EndermanAnimationEvents : MonsterAnimationEvents
    {
        private EndermanArmReachSkill _armReachSkill;

        protected override void Awake()
        {
            base.Awake();
            _armReachSkill = GetComponentInParent<EndermanArmReachSkill>();
        }

        public void ArmReachHit()
        {
            _armReachSkill?.OnHitAnimationEvent();
        }

        public void ArmReachFinished()
        {
            _armReachSkill?.OnFinishedAnimationEvent();
        }
    }
}