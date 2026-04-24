using UnityEngine;

public class AnimationSoundEvents : MonoBehaviour
{
    public AudioSource audioSource;

    [System.Serializable]
    public class SoundEvent
    {
        public string eventName;
        public AudioClip[] clip;
        public float ratio=1;
    }

    public SoundEvent[] soundEvents;

    // Gọi từ animation event
    public void PlaySoundEvent(string eventName)
    {
        if (LunaManager.ins.isCretivePause)
        {
            return;
        }
        foreach (var sEvent in soundEvents)
        {
            if (sEvent.eventName == eventName)
            {
                if (audioSource && sEvent.clip.Length > 0)
                {
                    float randomRatio=Random.Range(0f, 1f);
                    if (sEvent.ratio>=randomRatio)
                    {
                        int index = Random.Range(0, sEvent.clip.Length);
                        audioSource.PlayOneShot(sEvent.clip[index]);
                    }
                }
                return;
            }
        }

        Debug.LogWarning("Sound event not found: " + eventName);
    }
}