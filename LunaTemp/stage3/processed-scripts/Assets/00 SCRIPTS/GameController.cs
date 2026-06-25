using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class GameController : MonoBehaviour
{
    [LunaPlaygroundField("Max Shoot")] public int MaxShoot;
    private int count;
    [SerializeField] private Text currentShootText;
    [SerializeField] private GameObject winScene;
    [SerializeField] private GameObject lossScene;
    [SerializeField] private GameObject camera0;
    [SerializeField] private GameObject camera1;
    [SerializeField] private GameObject mainCamera;
    [SerializeField] private GameObject UI;
    [SerializeField] private GameObject panel;
    private bool isWin;
    public static GameController Ins { get; private set; }

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
    }
    private void Start()
    {
        StartCoroutine(Demo());
    }
    public void Win()
    {
        isWin = true;
        winScene.SetActive(true);
        OnEnd?.Invoke();
    }
    public Action OnEnd;
    public void CountShoot()
    {
        count++;
        currentShootText.text = count.ToString();
        StartCoroutine(CheckResult());
    }
    private IEnumerator CheckResult()
    {
        yield return new WaitForSeconds(0.5f);
        if (count >= MaxShoot && !isWin)
        {
            lossScene.SetActive(true);
            OnEnd?.Invoke();
        }
    }
    private IEnumerator Demo()
    {
        yield return new WaitForSeconds(1.5f);
        camera1.SetActive(true);
        camera0.SetActive(false);

        yield return new WaitForSeconds(1.5f);
        mainCamera.SetActive(true);
        camera1.SetActive(false);
        UI.SetActive(true);
        panel.SetActive(false);
    }
}
