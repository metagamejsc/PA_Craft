using System;
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
    [SerializeField] private int points = 0;
    public int Points => points;
    public bool HasAtLeast(int value) => points >= value;
    public event Action<int> OnPointsChanged;

    public void AddPoints(int delta)
    {
        points += delta;
        if (points < 0) points = 0;

        OnPointsChanged?.Invoke(points);
    }

    // (tuỳ chọn) set thẳng
    public void SetPoints(int p)
    {
        points = Mathf.Max(0, p);
        OnPointsChanged?.Invoke(points);
    }
}