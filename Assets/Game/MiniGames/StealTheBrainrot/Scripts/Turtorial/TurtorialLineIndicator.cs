using UnityEngine;

namespace Minigames.StealTheBrainrot.Turtorial
{
    public class TurtorialLineIndicator : MonoBehaviour
    {
        [SerializeField] private LineRenderer lineRenderer;
        [SerializeField] private Vector3 offset;

        private Vector3[] positionDraws = new Vector3[2];
        private Transform currentTarget;
        private Transform characterTrans;

        public void StartDraw(Transform target, Transform start)
        {
            this.enabled = true;
            currentTarget = target;
            characterTrans = start;
        }

        private void Update()
        {
            if (currentTarget == null)
            {
                lineRenderer.positionCount = 0;
                return;
            }

            lineRenderer.positionCount = positionDraws.Length;
            Vector3 pos = characterTrans.transform.position;
            pos.y = currentTarget.position.y;
            positionDraws[0] = pos + offset;
            positionDraws[1] = currentTarget.position + offset;
            lineRenderer.SetPositions(positionDraws);
        }

        public void StopDraw()
        {
            lineRenderer.positionCount = 0;
            currentTarget = null;
        }
    }
}