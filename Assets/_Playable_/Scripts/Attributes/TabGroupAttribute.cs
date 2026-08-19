using System;
using UnityEngine;

/// <summary>
/// Tạo hệ thống tab 2 tầng trong Inspector:
/// - Tầng trên: các TÊN NHÓM (groupName) hiện thành 1 hàng tab.
/// - Tầng dưới: khi chọn 1 nhóm, hiện các TAB CON (tabName) của nhóm đó.
/// - Chỉ field thuộc (nhóm + tab con) đang chọn mới hiển thị.
///
/// Ví dụ:
///   [TabGroup("Stats", "Combat")] public int attack;
///   [TabGroup("Stats", "Visual")] public Sprite icon;
///   [TabGroup("Audio", "SFX")]    public AudioClip hit;
/// => Hàng trên: [Stats | Audio]. Chọn Stats => hàng dưới [Combat | Visual].
///
/// LƯU Ý: file này KHÔNG được nằm trong thư mục "Editor" (phải ở assembly runtime
/// thì MonoBehaviour mới dùng được attribute).
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
public class TabGroupAttribute : PropertyAttribute
{
    /// <summary>Tên nhóm — hiện ở hàng tab tầng trên.</summary>
    public readonly string GroupName;

    /// <summary>Tên tab con — hiện ở hàng tab tầng dưới khi nhóm được chọn.</summary>
    public readonly string TabName;

    public TabGroupAttribute(string groupName, string tabName)
    {
        GroupName = groupName;
        TabName = tabName;
    }
}
