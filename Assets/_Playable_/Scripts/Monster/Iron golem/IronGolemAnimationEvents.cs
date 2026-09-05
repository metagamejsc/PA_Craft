namespace Playable
{
    public sealed class IronGolemAnimationEvents : MonsterAnimationEvents
    {
        private IronGolemSlamSkill _slamSkill;
        private IronGolemTntBarrageSkill _tntBarrageSkill;

        protected override void Awake()
        {
            base.Awake();
            _slamSkill = GetComponentInParent<IronGolemSlamSkill>();
            _tntBarrageSkill = GetComponentInParent<IronGolemTntBarrageSkill>();
        }

        public void SlamHit()
        {
            _slamSkill?.OnHitAnimationEvent();
        }

        public void SlamFinished()
        {
            _slamSkill?.OnFinishedAnimationEvent();
        }

        public void FireTntFromLeftHand()
        {
            _tntBarrageSkill?.FireTntFromLeftHand();
        }

        public void FireTntFromRightHand()
        {
            _tntBarrageSkill?.FireTntFromRightHand();
        }

        public void TntBarrageFinished()
        {
            _tntBarrageSkill?.OnFinishedAnimationEvent();
        }
    }
}
