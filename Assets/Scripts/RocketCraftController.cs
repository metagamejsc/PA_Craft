using System;
using UnityEngine;

public class RocketCraftController : MonoBehaviour
{
    public RocketVisual[] rockets;   // 8 rocket
    public TNTObject tnt;
    public TutorialHandWorld tutorialUI;
    public GameObject clickTNT;
    public GameObject txtTutorial;

    private int rocketIndex = 0;
    private bool allRocketsPlaced = false;
    private bool tntStarted = false;

    private void OnMouseDown()
    {
        OnCraftingTableClicked();
    }

    private void Start()
    {
        clickTNT.SetActive(false);
    }

    public void OnCraftingTableClicked()
    {
        // Nếu TNT đã chạy → bỏ qua
        if (tntStarted) return;

        // Click đầu tiên → tắt tutorial
        if (tutorialUI != null)
        {
            tutorialUI.StopTutorial();
            tutorialUI = null;
        }
        txtTutorial.SetActive(false);
        // Chưa đủ rocket → đặt rocket
        if (!allRocketsPlaced)
        {
            rockets[rocketIndex].ActivateFullRocket();
            rocketIndex++;

            if (rocketIndex >= rockets.Length)
            {
                allRocketsPlaced = true;
                clickTNT.SetActive(true);
                Debug.Log("Đã đặt đủ rocket, click lần nữa để kích nổ");
            }

            return;
        }

        // Đã đủ rocket → click thêm 1 lần nữa mới nổ
        if (allRocketsPlaced && !tntStarted)
        {
            clickTNT.SetActive(false);
            tntStarted = true;
            StartTNT();
        }
    }

    void StartTNT()
    {
        tnt.AnimExplore();
    }
}