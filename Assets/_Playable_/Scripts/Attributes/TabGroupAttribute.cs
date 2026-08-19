using System;
using UnityEngine;

/// <summary>
/// Gom nhiều field vào các tab trong Inspector.
/// Field cùng "groupName" tạo thành một bộ tab độc lập; các field cùng (groupName, tabName)
/// sẽ hiện chung khi tab đó được chọn.
///
/// Ví dụ:
///   [TabGroup("Stats", "Combat")] public int attack;
///   [TabGroup("Stats", "Visual")] public Sprite icon;
/// </summary>
[AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
public class TabGroupAttribute : PropertyAttribute
{
    /// <summary>Tên nhóm tab. Một Inspector có thể có nhiều nhóm độc lập.</summary>
    public readonly string GroupName;

    /// <summary>Tên tab mà field này thuộc về.</summary>
    public readonly string TabName;

    public TabGroupAttribute(string groupName, string tabName)
    {
        GroupName = groupName;
        TabName = tabName;
    }
}
