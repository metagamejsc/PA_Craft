using UnityEngine;
using UnityEngine.UI;

[System.Serializable]
public class CardModelData
{
    public Button cardButton;
    public GameObject modelRoot;
    public Animator modelAnimator;
    public Transform playerPoint;

    [Header("Animation")]
    public string modelAnimTrigger;
    public string playerAnimTrigger;
}