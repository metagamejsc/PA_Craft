using System.Collections;
using UnityEngine;

public class CardModelSelector : MonoBehaviour
{
    [Header("Setup")]
    public CardModelData[] cards;
    public Transform player;
    public Animator playerAnimator;

    [Header("Move Setting")]
    public float moveDuration = 0.4f;
    public float jumpHeight = 1f;

    private int currentIndex = -1;
    private bool isSwitching = false;

    private void Start()
    {
        for (int i = 0; i < cards.Length; i++)
        {
            int index = i;
            if (cards[i].cardButton != null)
            {
                cards[i].cardButton.onClick.AddListener(() => OnClickCard(index));
            }

            if (cards[i].modelRoot != null)
                cards[i].modelRoot.SetActive(false);
        }

        // mặc định show card 0 nếu muốn
        if (cards.Length > 0)
        {
            //OnClickCard(0);
            StartCoroutine(SwitchCardRoutine(0));
        }
    }

    public void OnClickCard(int index)
    {
        if (isSwitching) return;
        if (index < 0 || index >= cards.Length) return;

        StartCoroutine(SwitchCardRoutine(index));
        AudioManager.ins.PlaySoundBuy();
        LunaManager.ins.CheckClickShowEndCard();
    }

    private IEnumerator SwitchCardRoutine(int index)
    {
        isSwitching = true;

        // 1. Tắt model cũ
        if (currentIndex >= 0 && currentIndex < cards.Length)
        {
            if (cards[currentIndex].modelRoot != null)
                cards[currentIndex].modelRoot.SetActive(false);
        }

        // 2. Bật model mới
        CardModelData selected = cards[index];
        if (selected.modelRoot != null)
            selected.modelRoot.SetActive(true);

        // 3. Move player tới vị trí tương ứng
        if (player != null && selected.playerPoint != null)
        {
            yield return StartCoroutine(MovePlayerToPoint(player, selected.playerPoint));
            player.SetParent(selected.playerPoint, true);
            player.localPosition=Vector3.zero;
            player.localRotation = Quaternion.identity;
        }

        // 4. Play anim model
        if (selected.modelAnimator != null && !string.IsNullOrEmpty(selected.modelAnimTrigger))
        {
            selected.modelAnimator.ResetTrigger(selected.modelAnimTrigger);
            selected.modelAnimator.SetTrigger(selected.modelAnimTrigger);
        }

        // 5. Play anim player
        if (playerAnimator != null && !string.IsNullOrEmpty(selected.playerAnimTrigger))
        {
            playerAnimator.ResetTrigger(selected.playerAnimTrigger);
            playerAnimator.SetTrigger(selected.playerAnimTrigger);
        }

        currentIndex = index;
        isSwitching = false;
    }

    private IEnumerator MovePlayerToPoint(Transform player, Transform target)
    {
        Vector3 startPos = player.position;
        Quaternion startRot = player.rotation;

        Vector3 endPos = target.position;
        Quaternion endRot = target.rotation;

        float time = 0f;

        while (time < moveDuration)
        {
            time += Time.deltaTime;
            float t = Mathf.Clamp01(time / moveDuration);

            Vector3 pos = Vector3.Lerp(startPos, endPos, t);
            pos.y += Mathf.Sin(t * Mathf.PI) * jumpHeight;

            player.position = pos;
            player.rotation = Quaternion.Slerp(startRot, endRot, t);

            yield return null;
        }

        player.position = endPos;
        player.rotation = endRot;
    }
}