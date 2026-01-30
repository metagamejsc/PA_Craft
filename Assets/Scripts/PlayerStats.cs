using System;
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
    [SerializeField] private int points = 0;
    public int Points => points;

    public bool HasAtLeast(int value) => points >= value;
    public event Action<int> OnPointsChanged;

    [Header("Particles")]
    [SerializeField] private ParticleSystem powerUpFx;
    [SerializeField] private ParticleSystem powerDownFx;

    public void AddPoints(int delta)
    {
        if (delta > 0)
        {
            AudioManager.ins.PlaySoundReward();
            powerUpFx?.Play();
        }
        else if (delta < 0)
        {
            powerDownFx?.Play();
        }

        points += delta;
        points = Mathf.Max(0, points);

        OnPointsChanged?.Invoke(points);
    }

    public void SetPoints(int p)
    {
        points = Mathf.Max(0, p);
        OnPointsChanged?.Invoke(points);
    }
}