using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEditor;
using UnityEngine;

/// <summary>
/// Drawer cho <see cref="TabGroupAttribute"/> — hệ thống tab 2 tầng.
///
/// - Field ĐẦU TIÊN (theo thứ tự khai báo) trong số các field có [TabGroup] sẽ vẽ:
///     1) Hàng tab TÊN NHÓM (tầng trên).
///     2) Hàng tab CON của nhóm đang chọn (tầng dưới).
/// - Field chỉ hiện khi thuộc (nhóm đang chọn + tab con đang chọn); còn lại height = 0.
///
/// Trạng thái chọn lưu theo instanceID nên mỗi object nhớ riêng.
/// Vì [CustomPropertyDrawer] tự kích hoạt mọi nơi, không cần custom Editor cho từng class.
/// </summary>
[CustomPropertyDrawer(typeof(TabGroupAttribute))]
public class TabGroupDrawer : PropertyDrawer
{
    // Nhóm đang chọn (1 giá trị / object). key = instanceID + GROUP_SUFFIX
    private const string GroupSuffix = "|__group__";
    // Nhóm đang chọn + tab con đang chọn theo nhóm. key = instanceID + "|" + groupName
    private static readonly Dictionary<string, int> Selected = new Dictionary<string, int>();

    // Cache thông tin theo Type.
    private static readonly Dictionary<Type, TypeInfo> Cache = new Dictionary<Type, TypeInfo>();

    private class TypeInfo
    {
        public readonly List<string> GroupOrder = new List<string>();                 // tên nhóm theo thứ tự
        public readonly Dictionary<string, List<string>> TabsPerGroup =               // tab con của từng nhóm
            new Dictionary<string, List<string>>();
        public string GlobalFirstField;                                               // field [TabGroup] đầu tiên
    }

    public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
    {
        var attr = (TabGroupAttribute)attribute;
        var info = GetTypeInfo(property);
        if (info == null)
            return EditorGUI.GetPropertyHeight(property, label, true);

        float spacing = EditorGUIUtility.standardVerticalSpacing;
        float line = EditorGUIUtility.singleLineHeight;
        float height = 0f;

        // Field đầu tiên vẽ 2 hàng tab (nhóm + tab con).
        if (property.name == info.GlobalFirstField)
            height += (line + spacing) * 2f;

        if (IsFieldVisible(property, info, attr))
            height += EditorGUI.GetPropertyHeight(property, label, true);

        return height;
    }

    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        var attr = (TabGroupAttribute)attribute;
        var info = GetTypeInfo(property);
        if (info == null)
        {
            EditorGUI.PropertyField(position, property, label, true);
            return;
        }

        float spacing = EditorGUIUtility.standardVerticalSpacing;
        float line = EditorGUIUtility.singleLineHeight;
        float y = position.y;

        int groupIdx = GetSelectedGroupIndex(property, info);
        string selGroup = info.GroupOrder[groupIdx];

        if (property.name == info.GlobalFirstField)
        {
            // Tầng trên: chọn nhóm.
            var groupRect = new Rect(position.x, y, position.width, line);
            int newGroup = GUI.Toolbar(groupRect, groupIdx, info.GroupOrder.ToArray());
            if (newGroup != groupIdx)
            {
                SetSelectedGroupIndex(property, newGroup);
                groupIdx = newGroup;
                selGroup = info.GroupOrder[groupIdx];
            }
            y += line + spacing;

            // Tầng dưới: chọn tab con của nhóm đang chọn.
            var tabs = info.TabsPerGroup[selGroup];
            int tabIdx = GetSelectedTabIndex(property, selGroup, tabs.Count);
            var tabRect = new Rect(position.x, y, position.width, line);
            int newTab = GUI.Toolbar(tabRect, tabIdx, tabs.ToArray());
            if (newTab != tabIdx)
                SetSelectedTabIndex(property, selGroup, newTab);
            y += line + spacing;
        }

        if (IsFieldVisible(property, info, attr))
        {
            float fieldHeight = EditorGUI.GetPropertyHeight(property, label, true);
            var fieldRect = new Rect(position.x, y, position.width, fieldHeight);
            EditorGUI.PropertyField(fieldRect, property, label, true);
        }
    }

    // ----- Logic hiển thị -----

    private bool IsFieldVisible(SerializedProperty property, TypeInfo info, TabGroupAttribute attr)
    {
        int groupIdx = GetSelectedGroupIndex(property, info);
        string selGroup = info.GroupOrder[groupIdx];
        if (attr.GroupName != selGroup)
            return false;

        var tabs = info.TabsPerGroup[selGroup];
        int tabIdx = GetSelectedTabIndex(property, selGroup, tabs.Count);
        return tabs.IndexOf(attr.TabName) == tabIdx;
    }

    // ----- Cache reflection -----

    private TypeInfo GetTypeInfo(SerializedProperty property)
    {
        var target = property.serializedObject.targetObject;
        if (target == null)
            return null;

        var type = target.GetType();
        if (!Cache.TryGetValue(type, out var info))
        {
            info = BuildTypeInfo(type);
            Cache[type] = info;
        }
        return info.GroupOrder.Count > 0 ? info : null;
    }

    private static TypeInfo BuildTypeInfo(Type type)
    {
        var info = new TypeInfo();

        // Base -> derived để khớp thứ tự serialize của Unity.
        var hierarchy = new List<Type>();
        for (var t = type; t != null && t != typeof(UnityEngine.Object); t = t.BaseType)
            hierarchy.Add(t);
        hierarchy.Reverse();

        const BindingFlags flags = BindingFlags.Instance | BindingFlags.Public |
                                   BindingFlags.NonPublic | BindingFlags.DeclaredOnly;

        foreach (var t in hierarchy)
        {
            foreach (var field in t.GetFields(flags))
            {
                var attr = field.GetCustomAttribute<TabGroupAttribute>();
                if (attr == null)
                    continue;

                if (info.GlobalFirstField == null)
                    info.GlobalFirstField = field.Name;

                if (!info.TabsPerGroup.TryGetValue(attr.GroupName, out var tabs))
                {
                    tabs = new List<string>();
                    info.TabsPerGroup[attr.GroupName] = tabs;
                    info.GroupOrder.Add(attr.GroupName);
                }

                if (!tabs.Contains(attr.TabName))
                    tabs.Add(attr.TabName);
            }
        }

        return info;
    }

    // ----- State helpers -----

    private static int GetSelectedGroupIndex(SerializedProperty property, TypeInfo info)
    {
        string key = InstanceKey(property) + GroupSuffix;
        int idx = Selected.TryGetValue(key, out var v) ? v : 0;
        return Mathf.Clamp(idx, 0, Mathf.Max(0, info.GroupOrder.Count - 1));
    }

    private static void SetSelectedGroupIndex(SerializedProperty property, int index)
    {
        Selected[InstanceKey(property) + GroupSuffix] = index;
    }

    private static int GetSelectedTabIndex(SerializedProperty property, string groupName, int tabCount)
    {
        string key = InstanceKey(property) + "|" + groupName;
        int idx = Selected.TryGetValue(key, out var v) ? v : 0;
        return Mathf.Clamp(idx, 0, Mathf.Max(0, tabCount - 1));
    }

    private static void SetSelectedTabIndex(SerializedProperty property, string groupName, int index)
    {
        Selected[InstanceKey(property) + "|" + groupName] = index;
    }

    private static string InstanceKey(SerializedProperty property)
    {
        return property.serializedObject.targetObject.GetInstanceID().ToString();
    }
}
