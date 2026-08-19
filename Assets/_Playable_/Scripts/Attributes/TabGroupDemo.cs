using UnityEngine;

/// <summary>
/// Asset demo để test nhanh TabGroupAttribute.
/// Tạo asset: chuột phải trong Project > Create > Demo > Tab Group Demo,
/// rồi chọn asset và bấm thử các tab trên Inspector.
/// </summary>
[CreateAssetMenu(menuName = "Demo/Tab Group Demo", fileName = "TabGroupDemo")]
public class TabGroupDemo : ScriptableObject
{
    [Header("Field thường (không có tab) vẫn hiện bình thường")]
    public string displayName = "Enemy";

    // --- Nhóm "Stats": 2 tab Combat / Visual ---
    [TabGroup("Stats", "Combat")] public int attack = 10;
    [TabGroup("Stats", "Combat")] public int defense = 5;
    [TabGroup("Stats", "Combat")] public float critChance = 0.2f;

    [TabGroup("Stats", "Visual")] public Sprite icon;
    [TabGroup("Stats", "Visual")] public Color tint = Color.white;

    // --- Nhóm "Audio": bộ tab độc lập thứ 2 ---
    [TabGroup("Audio", "SFX")] public AudioClip hitSound;
    [TabGroup("Audio", "SFX")] public float sfxVolume = 1f;

    [TabGroup("Audio", "Music")] public AudioClip bgm;
    [TabGroup("Audio", "Music")] public bool loopMusic = true;
}
