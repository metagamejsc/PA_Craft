using UnityEngine;
using UnityEngine.Serialization;

/// <summary>
/// Gắn vào model3D button của mỗi line. Bắt sự kiện click (OnMouseDown cần 1 Collider)
/// và báo về cho LineGameplayManager kèm index của line.
/// Mỗi button tự mang cấu hình riêng: anim bấm, effect, điểm spawn model3D, điểm player đứng.
/// </summary>
[RequireComponent(typeof(Collider))]
public class Line3DButton : MonoBehaviour
{
    [Header("Anim bấm nút")]
    [Tooltip("Animator của button. Khi bấm sẽ kích hoạt trigger pressTriggerName.")]
    public Animator buttonAnimator;
    [Tooltip("Tên Trigger trong Animator để chạy anim bấm nút.")]
    public string pressTriggerName = "Press";

    [Header("Effect khi bấm")]
    [Tooltip("GameObject effect có sẵn trên button, sẽ SetActive(true) khi bấm. Để trống nếu không dùng.")]
    [FormerlySerializedAs("pressEffectPrefab")]
    public GameObject pressEffect;

    [Header("Sound khi bấm")]
    [Tooltip("AudioSource dùng để phát sound khi bấm. Để trống sẽ dùng AudioManager hoặc PlayClipAtPoint.")]
    public AudioSource pressAudioSource;
    [Tooltip("Sound phát khi bấm button. Để trống nếu không dùng.")]
    public AudioClip pressSound;

    [Header("Vị trí")]
    [Tooltip("Vị trí (+ hướng) spawn model3D khi bấm button này. Để trống sẽ dùng vị trí button.")]
    public Transform modelSpawnPoint;
    [Tooltip("Vị trí player sẽ đi đến để đứng ở line này. Để trống sẽ dùng vị trí button.")]
    public Transform playerStandPoint;

    private LineGameplayManager manager;
    private int lineIndex;
    private bool interactable;

    public int LineIndex => lineIndex;

    public Transform ModelSpawnPoint => modelSpawnPoint != null ? modelSpawnPoint : transform;
    public Transform PlayerStandPoint => playerStandPoint != null ? playerStandPoint : transform;

    public void Setup(LineGameplayManager owner, int index)
    {
        manager = owner;
        lineIndex = index;
        interactable = false;
    }

    public void SetInteractable(bool value)
    {
        interactable = value;
    }

    private void OnMouseDown()
    {
        if (!interactable || manager == null)
        {
            return;
        }

        interactable = false;
        PlayPressFeedback();
        manager.OnLineButtonClicked(this);
    }

    /// <summary>Chạy anim, bật effect và phát sound khi player bấm vào button.</summary>
    public void PlayPressFeedback()
    {
        if (buttonAnimator != null && !string.IsNullOrEmpty(pressTriggerName))
        {
            buttonAnimator.SetTrigger(pressTriggerName);
        }

        if (pressEffect != null)
        {
            pressEffect.SetActive(true);
        }

        if (pressSound == null)
        {
            return;
        }

        if (pressAudioSource != null)
        {
            pressAudioSource.PlayOneShot(pressSound);
        }
        else if (AudioManager.ins != null)
        {
            AudioManager.ins.PlaySound(pressSound);
        }
        else
        {
            AudioSource.PlayClipAtPoint(pressSound, transform.position);
        }
    }
}
