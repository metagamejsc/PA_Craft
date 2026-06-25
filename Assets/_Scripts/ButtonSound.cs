using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]
public class ButtonSound : MonoBehaviour
{
    public AudioClip clickSound;

    private Button button;

    void Awake()
    {
        button = GetComponent<Button>();
        button.onClick.AddListener(PlayClickSound);
    }

    void OnDestroy()
    {
        if (button != null)
        {
            button.onClick.RemoveListener(PlayClickSound);
        }
    }

    public void PlayClickSound()
    {
        if (clickSound == null || AudioManager.ins == null)
        {
            return;
        }

        AudioManager.ins.PlaySound(clickSound);
    }
}
