using UnityEngine;

/// <summary>
/// Asset demo để test nhanh hệ thống tab 2 tầng.
/// Tạo asset: chuột phải trong Project > Create > Demo > Tab Group Demo.
/// Trên Inspector: hàng trên [Stats | Audio]; chọn Stats => hàng dưới [Combat | Visual].
/// </summary>
[CreateAssetMenu(menuName = "Demo/Tab Group Demo", fileName = "TabGroupDemo")]
public class TabGroupDemo : ScriptableObject
{
    [Header("Field thường (không tab) vẫn hiện bình thường")]
    public string displayName = "Enemy";

    // Nhóm "Stats" -> tab con Combat / Visual
    [TabGroup("Stats", "Combat")] public int attack = 10;
    [TabGroup("Stats", "Combat")] public int defense = 5;
    [TabGroup("Stats", "Combat")] public float critChance = 0.2f;

    [TabGroup("Stats", "Visual")] public Sprite icon;
    [TabGroup("Stats", "Visual")] public Color tint = Color.white;

    // Nhóm "Audio" -> tab con SFX / Music
    [TabGroup("Audio", "SFX")] public AudioClip hitSound;
    [TabGroup("Audio", "SFX")] public float sfxVolume = 1f;

    [TabGroup("Audio", "Music")] public AudioClip bgm;
    [TabGroup("Audio", "Music")] public bool loopMusic = true;
}
