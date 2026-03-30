using System.Collections.Generic;
using UnityEngine;

public class Model3DAnimationEventSfx : MonoBehaviour
{
    [System.Serializable]
    public class AnimationEventSound
    {
        public string eventName;

        [Header("Random Clips")]
        public List<AudioClip> clips = new List<AudioClip>();

        [Range(0f, 1f)]
        public float volume = 1f;

        [Tooltip("Khoảng thời gian tối thiểu giữa 2 lần phát event này")]
        public float minInterval = 0f;

        [Header("Random Pitch")]
        public bool randomPitch = false;
        public float minPitch = 0.95f;
        public float maxPitch = 1.05f;
    }

    [Header("Audio")]
    public AudioSource audioSource;

    [Header("Event Sounds")]
    public List<AnimationEventSound> eventSounds = new List<AnimationEventSound>();

    private Dictionary<string, AnimationEventSound> soundMap;
    private Dictionary<string, float> lastPlayTimeMap;

    void Awake()
    {
        if (audioSource == null)
            audioSource = GetComponent<AudioSource>();

        soundMap = new Dictionary<string, AnimationEventSound>();
        lastPlayTimeMap = new Dictionary<string, float>();

        foreach (var item in eventSounds)
        {
            if (item == null || string.IsNullOrEmpty(item.eventName))
                continue;

            bool hasValidClip = false;
            if (item.clips != null)
            {
                for (int i = 0; i < item.clips.Count; i++)
                {
                    if (item.clips[i] != null)
                    {
                        hasValidClip = true;
                        break;
                    }
                }
            }

            if (!hasValidClip)
                continue;

            if (!soundMap.ContainsKey(item.eventName))
            {
                soundMap.Add(item.eventName, item);
                lastPlayTimeMap.Add(item.eventName, -999f);
            }
        }
    }

    public void OnAnimationEvent(string eventName)
    {
        if (string.IsNullOrEmpty(eventName))
            return;

        if (audioSource == null)
        {
            Debug.LogWarning("Missing AudioSource on " + gameObject.name, this);
            return;
        }

        if (!soundMap.TryGetValue(eventName, out var data))
        {
            Debug.LogWarning($"No sound mapped for animation event: {eventName}", this);
            return;
        }

        float lastTime = lastPlayTimeMap[eventName];
        if (Time.time - lastTime < data.minInterval)
        {
            return;
        }

        AudioClip randomClip = GetRandomClip(data.clips);
        if (randomClip == null)
        {
            Debug.LogWarning($"No valid clip found for event: {eventName}", this);
            return;
        }

        float originalPitch = audioSource.pitch;

        if (data.randomPitch)
        {
            float minPitch = Mathf.Min(data.minPitch, data.maxPitch);
            float maxPitch = Mathf.Max(data.minPitch, data.maxPitch);
            audioSource.pitch = Random.Range(minPitch, maxPitch);
        }

        audioSource.PlayOneShot(randomClip, data.volume);
        lastPlayTimeMap[eventName] = Time.time;

        audioSource.pitch = originalPitch;
    }

    private AudioClip GetRandomClip(List<AudioClip> clips)
    {
        if (clips == null || clips.Count == 0)
            return null;

        List<AudioClip> validClips = new List<AudioClip>();

        for (int i = 0; i < clips.Count; i++)
        {
            if (clips[i] != null)
                validClips.Add(clips[i]);
        }

        if (validClips.Count == 0)
            return null;

        int index = Random.Range(0, validClips.Count);
        return validClips[index];
    }
}