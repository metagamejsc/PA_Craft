using DG.Tweening;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class LightController : MonoBehaviour
{
    [Header("Light Objects")]
    public Image greenImage;
    public Image redImage;
    public GameObject Doll;

    [Header("Text")]
    public TextMeshProUGUI statusText; // Hiển thị GREEN LIGHT / RED LIGHT

    [Header("Random Time Config")]
    [Tooltip("Khoảng random thời gian cho đèn xanh")]
    public Vector2 greenTimeRange = new Vector2(3f, 5f);

    [Tooltip("Khoảng random thời gian cho đèn đỏ")]
    public Vector2 redTimeRange = new Vector2(2f, 4f);

    [Header("State")]
    public bool isScan;  // true khi đèn đỏ, false khi đèn xanh

    public enum LightType
    {
        Green,
        Red
    }

    private LightType currentLight;
    private float currentTime;   // tổng thời gian của đèn hiện tại
    private float timer;         // đếm thời gian trôi

    private bool isRunning;

    void Start()
    {
        // Bắt đầu từ đèn xanh với thời gian random
        //StartRandomCycle(LightType.Green);
    }

    void Update()
    {

        if (!isRunning || currentTime <= 0f || GameController.ins.playerChar.isDead)
            return;

        timer += Time.deltaTime;
        float t = Mathf.Clamp01(timer / currentTime);
        float remaining = 1f - t; // fill giảm dần

        if (currentLight == LightType.Green)
        {
            greenImage.fillAmount = remaining;
            redImage.fillAmount = 0f;
            isScan = false;
        }
        else
        {
            redImage.fillAmount = remaining;
            greenImage.fillAmount = 0f;
            isScan = true;
        }

        // Hết thời gian -> chuyển đèn
        if (timer >= currentTime)
        {
            SwitchLight();
        }
    }
    void RotateDoll()
    {
        if (Doll != null)
        {
            float targetRotationY = (currentLight == LightType.Green) ? 0f : 180f;
            Doll.transform.DORotate(new Vector3(0, targetRotationY, 0), 0.5f, RotateMode.WorldAxisAdd);
        }
    }

    /// <summary>
    /// Hàm public: truyền vào time và loại đèn để set lại trạng thái.
    /// Nếu time <= 0 thì tự random trong range của loại đèn đó.
    /// </summary>
    public void SetLight(float time, LightType startLight)
    {
        currentLight = startLight;

        if (time > 0f)
            currentTime = time;
        else
            currentTime = GetRandomTimeForLight(startLight);

        ResetTimerAndFill();
        isRunning = true;
    }

    /// <summary>
    /// Bắt đầu cycle với thời gian random theo loại đèn.
    /// </summary>
    public void StartRandomCycle(LightType startLight)
    {
        currentLight = startLight;
        currentTime = GetRandomTimeForLight(startLight);
        ResetTimerAndFill();
        isRunning = true;
    }

    private void SwitchLight()
    {
        timer = 0f;
        currentLight = currentLight == LightType.Green ? LightType.Red : LightType.Green;
        currentTime = GetRandomTimeForLight(currentLight);
        ResetTimerAndFill();
    }

    private float GetRandomTimeForLight(LightType light)
    {
        if (light == LightType.Green)
            return Random.Range(greenTimeRange.x, greenTimeRange.y);
        else
            return Random.Range(redTimeRange.x, redTimeRange.y);
    }

    private void ResetTimerAndFill()
    {
        timer = 0f;

        if (currentLight == LightType.Green)
        {
            greenImage.fillAmount = 1f;
            redImage.fillAmount = 0f;
            isScan = false;
            UpdateStatusText("GREEN LIGHT");
        }
        else
        {
            redImage.fillAmount = 1f;
            greenImage.fillAmount = 0f;
            isScan = true;
            UpdateStatusText("RED LIGHT");
        }
        RotateDoll();
    }

    private void UpdateStatusText(string text)
    {
        if (statusText != null)
        {
            statusText.text = text;
        }
    }
}
