using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEditor;
using UnityEngine;

/// <summary>
/// Drawer cho <see cref="TabGroupAttribute"/>.
///
/// Cơ chế:
/// - Field ĐẦU TIÊN của mỗi nhóm (theo thứ tự khai báo) vẽ thanh toolbar tab phía trên.
/// - Field không thuộc tab đang chọn -> height = 0, không vẽ (bị ẩn).
/// - Tab đang chọn lưu theo (instanceID + tên nhóm) nên mỗi object nhớ riêng.
///
/// Vì [CustomPropertyDrawer] tự kích hoạt ở mọi nơi attribute được gắn, không cần
/// viết custom Editor cho từng class. Hỗ trợ các serialized field ở cấp cao nhất
/// của MonoBehaviour/ScriptableObject.
/// </summary>
[CustomPropertyDrawer(typeof(TabGroupAttribute))]
public class TabGroupDrawer : PropertyDrawer
{
    // Trạng thái tab đang chọn: key = instanceID + "|" + groupName
    private static readonly Dictionary<string, int> SelectedTabs = new Dictionary<string, int>();

    // Cache thông tin nhóm theo Type để khỏi reflection lại mỗi frame.
    private static readonly Dictionary<Type, Dictionary<string, GroupInfo>> GroupCache =
        new Dictionary<Type, Dictionary<string, GroupInfo>>();

    private class GroupInfo
    {
        public readonly List<string> Tabs = new List<string>();      // tên tab theo thứ tự
        public readonly List<string> FieldNames = new List<string>(); // field trong nhóm theo thứ tự
        public string FirstField;                                    // field đầu tiên của nhóm
    }

    public override float GetPropertyHeight(SerializedProperty property, GUIContent label)
    {
        var attr = (TabGroupAttribute)attribute;
        var info = GetGroupInfo(property, attr.GroupName);
        if (info == null)
            return EditorGUI.GetPropertyHeight(property, label, true);

        int selected = GetSelectedTab(property, attr.GroupName, info.Tabs.Count);
        bool isFirst = property.name == info.FirstField;
        bool fieldVisible = info.Tabs.IndexOf(attr.TabName) == selected;

        float spacing = EditorGUIUtility.standardVerticalSpacing;
        float height = 0f;

        if (isFirst)
            height += EditorGUIUtility.singleLineHeight + spacing;

        if (fieldVisible)
            height += EditorGUI.GetPropertyHeight(property, label, true);

        return height;
    }

    public override void OnGUI(Rect position, SerializedProperty property, GUIContent label)
    {
        var attr = (TabGroupAttribute)attribute;
        var info = GetGroupInfo(property, attr.GroupName);
        if (info == null)
        {
            EditorGUI.PropertyField(position, property, label, true);
            return;
        }

        int selected = GetSelectedTab(property, attr.GroupName, info.Tabs.Count);
        bool isFirst = property.name == info.FirstField;
        bool fieldVisible = info.Tabs.IndexOf(attr.TabName) == selected;

        float spacing = EditorGUIUtility.standardVerticalSpacing;
        float y = position.y;

        // Toolbar tab: chỉ field đầu tiên của nhóm vẽ.
        if (isFirst)
        {
            var toolbarRect = new Rect(position.x, y, position.width, EditorGUIUtility.singleLineHeight);
            int newSelected = GUI.Toolbar(toolbarRect, selected, info.Tabs.ToArray());
            if (newSelected != selected)
            {
                SetSelectedTab(property, attr.GroupName, newSelected);
                selected = newSelected;
                fieldVisible = info.Tabs.IndexOf(attr.TabName) == selected;
            }
            y += EditorGUIUtility.singleLineHeight + spacing;
        }

        if (fieldVisible)
        {
            float fieldHeight = EditorGUI.GetPropertyHeight(property, label, true);
            var fieldRect = new Rect(position.x, y, position.width, fieldHeight);
            EditorGUI.PropertyField(fieldRect, property, label, true);
        }
    }

    // ----- Helpers -----

    private GroupInfo GetGroupInfo(SerializedProperty property, string groupName)
    {
        var target = property.serializedObject.targetObject;
        if (target == null)
            return null;

        var type = target.GetType();
        if (!GroupCache.TryGetValue(type, out var groups))
        {
            groups = BuildGroups(type);
            GroupCache[type] = groups;
        }

        return groups.TryGetValue(groupName, out var info) ? info : null;
    }

    private static Dictionary<string, GroupInfo> BuildGroups(Type type)
    {
        var result = new Dictionary<string, GroupInfo>();

        // Duyệt từ base -> derived để khớp thứ tự serialize của Unity.
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

                if (!result.TryGetValue(attr.GroupName, out var info))
                {
                    info = new GroupInfo { FirstField = field.Name };
                    result[attr.GroupName] = info;
                }

                info.FieldNames.Add(field.Name);
                if (!info.Tabs.Contains(attr.TabName))
                    info.Tabs.Add(attr.TabName);
            }
        }

        return result;
    }

    private static int GetSelectedTab(SerializedProperty property, string groupName, int tabCount)
    {
        string key = GetKey(property, groupName);
        int index = SelectedTabs.TryGetValue(key, out var v) ? v : 0;
        return Mathf.Clamp(index, 0, Mathf.Max(0, tabCount - 1));
    }

    private static void SetSelectedTab(SerializedProperty property, string groupName, int index)
    {
        SelectedTabs[GetKey(property, groupName)] = index;
    }

    private static string GetKey(SerializedProperty property, string groupName)
    {
        return property.serializedObject.targetObject.GetInstanceID() + "|" + groupName;
    }
}
