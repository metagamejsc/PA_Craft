using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class TutController : MonoBehaviour
{
    [SerializeField] private List<Option> options;
    [SerializeField] private float fromScale;
    [SerializeField] private float toScale;
    [SerializeField] private float scaleTime;
    [SerializeField] private float moveTime;
    private Sequence sequence;
    void Start()
    {
        int count = options.Count;
        sequence = DOTween.Sequence();
        for (int i = 1; i < count; i++)
        {
            int index = i;
            sequence.AppendCallback(() =>
                    {
                        if (!options[index - 1].Demo) return;
                        options[index - 1].Demo.DOScale(1.1f, scaleTime);
                    })
                    .Append(transform.DOScale(toScale, scaleTime))
                    .AppendCallback(() =>
                    {
                        if (!options[index - 1].Demo) return;
                        options[index - 1].Demo.DOScale(1f, scaleTime);
                    })
                    .Append(transform.DOScale(fromScale, scaleTime))
                    .Append(transform.DOLocalMove(options[index].Position, moveTime));
        }
        sequence.AppendCallback(() =>
                    {
                        if (!options[count - 1].Demo) return;
                        options[count - 1].Demo.DOScale(1.1f, scaleTime);
                    })
                    .Append(transform.DOScale(toScale, scaleTime))
                    .AppendCallback(() =>
                    {
                        if (!options[count - 1].Demo) return;
                        options[count - 1].Demo.DOScale(1f, scaleTime);
                    })
                    .Append(transform.DOScale(fromScale, scaleTime))
                    .Append(transform.DOLocalMove(options[0].Position, moveTime));
        sequence.SetLoops(-1, LoopType.Restart);
    }
}
[System.Serializable]
public struct Option
{
    public Vector3 Position;
    public RectTransform Demo;
}
