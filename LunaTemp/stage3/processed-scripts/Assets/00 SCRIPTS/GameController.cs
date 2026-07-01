using System;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [SerializeField] private Option left;
    [SerializeField] private Option right;
    [SerializeField] private ParticleSystem effect;
    [SerializeField] private GameObject Tut;
    [SerializeField] private bool stop;

    public static GameController Ins;
    private void CreateIns()
    {
        if (Ins && Ins != this)
        {
            Destroy(gameObject);
            return;
        }
        Ins = this;
        DontDestroyOnLoad(gameObject);
    }
    private void Awake()
    {
        CreateIns();
        InitButton();
        OnClick += StopTut;
        OnClick += PlayEffect;
    }
    private void PlayEffect()
    {
        effect.Play();
    }
    private void InitButton()
    {
        left.Button.onClick.AddListener(ClickLeft);
        right.Button.onClick.AddListener(ClickRight);
    }
    public Action OnClick;

    private void ClickLeft()
    {
        right.Anim.StopAnim();
        right.Item.SetActive(false);

        left.Anim.PlayAnim();
        left.Item.SetActive(true);

        OnClick?.Invoke();
    }
    private void StopTut()
    {
        if (stop) return;
        stop = true;
        Tut.SetActive(false);
    }
    private void ClickRight()
    {
        left.Anim.StopAnim();
        left.Item.SetActive(false);

        right.Anim.PlayAnim();
        right.Item.SetActive(true);

        OnClick?.Invoke();
    }
}
[System.Serializable]
public struct Option
{
    public Button Button;
    public GameObject Item;
    public AnimationController Anim;
}
