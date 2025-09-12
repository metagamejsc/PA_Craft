using System.Collections;
using UnityEngine;
using TMPro;

public class CountdownTimer : MonoBehaviour
{
    public TextMeshProUGUI countdownText;  // Gán trong Inspector
    public TextMeshProUGUI desText;  // Gán trong Inspector
    public float delayBetweenCounts = 1f;  // Thời gian giữa các số

    private void Start()
    {
        StartCoroutine(StartCountdown());
    }

    IEnumerator StartCountdown()
    {
        for (int i = 3; i >= 1; i--)
        {
            countdownText.text = i.ToString();
            yield return new WaitForSeconds(delayBetweenCounts);
        }

        countdownText.text = ""; // Xóa sau khi đếm xong (hoặc bạn có thể ghi "GO!" chẳng hạn)

        OnCountdownFinished(); // Gọi hàm sau khi kết thúc
    }

    void OnCountdownFinished()
    {
        PlayerMovement2.ins.StartMove();
        desText.gameObject.SetActive(false);
        countdownText.gameObject.SetActive(false);
    }
}