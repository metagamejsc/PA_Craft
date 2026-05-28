using System;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

public class MinecraftMapBuilderWindow : EditorWindow
{
    private enum BrushMode
    {
        Paint,
        Erase
    }

    private MinecraftMap targetMap;
    private SerializedObject serializedMap;
    private int selectedPaletteIndex;
    private BrushMode brushMode;
    private bool scenePaintingEnabled = true;
    private int paintHeight;
    private Vector3Int areaStart;
    private Vector3Int areaSize = new Vector3Int(8, 1, 8);
    private Vector2 scrollPosition;
    private Vector3Int? previewGridPosition;

    [MenuItem("Tools/Minecraft Map Builder")]
    private static void OpenWindow()
    {
        GetWindow<MinecraftMapBuilderWindow>("Minecraft Map Builder");
    }

    private void OnEnable()
    {
        SceneView.duringSceneGui += DuringSceneGui;
        UseSelectedMap();
    }

    private void OnDisable()
    {
        SceneView.duringSceneGui -= DuringSceneGui;
    }

    private void OnSelectionChange()
    {
        UseSelectedMap();
        Repaint();
    }

    private void OnGUI()
    {
        scrollPosition = EditorGUILayout.BeginScrollView(scrollPosition);
        DrawMapSelection();

        if (targetMap != null)
        {
            DrawMapSettings();
            DrawPalette();
            DrawBrush();
            DrawAreaGenerator();
            DrawCleanup();
        }

        EditorGUILayout.EndScrollView();
    }

    private void DrawMapSelection()
    {
        EditorGUILayout.LabelField("Map Target", EditorStyles.boldLabel);
        EditorGUI.BeginChangeCheck();
        MinecraftMap nextMap = (MinecraftMap)EditorGUILayout.ObjectField("Map", targetMap, typeof(MinecraftMap), true);
        if (EditorGUI.EndChangeCheck())
            SetTargetMap(nextMap);

        using (new EditorGUILayout.HorizontalScope())
        {
            if (GUILayout.Button("Create Map"))
                CreateMap();

            if (GUILayout.Button("Use Selected"))
                UseSelectedMap();
        }

        if (targetMap == null)
            EditorGUILayout.HelpBox("Create a map or select a GameObject containing MinecraftMap.", MessageType.Info);
    }

    private void DrawMapSettings()
    {
        EnsureSerializedMap();
        EditorGUILayout.Space(6f);
        EditorGUILayout.LabelField("Grid", EditorStyles.boldLabel);
        serializedMap.Update();
        EditorGUILayout.PropertyField(serializedMap.FindProperty("blockSize"));
        serializedMap.ApplyModifiedProperties();
    }

    private void DrawPalette()
    {
        EditorGUILayout.Space(6f);
        EditorGUILayout.LabelField("Block Palette", EditorStyles.boldLabel);
        serializedMap.Update();
        SerializedProperty palette = serializedMap.FindProperty("blockPalette");
        EditorGUILayout.PropertyField(palette, true);
        serializedMap.ApplyModifiedProperties();

        if (targetMap.blockPalette.Count == 0)
        {
            if (GUILayout.Button("Add Default Block"))
            {
                Undo.RecordObject(targetMap, "Add Default Block");
                targetMap.blockPalette.Add(new MinecraftBlockDefinition { name = "Grass" });
                EditorUtility.SetDirty(targetMap);
            }

            return;
        }

        string[] names = new string[targetMap.blockPalette.Count];
        for (int i = 0; i < names.Length; i++)
        {
            string blockName = targetMap.blockPalette[i].name;
            names[i] = string.IsNullOrWhiteSpace(blockName) ? $"Block {i + 1}" : blockName;
        }

        selectedPaletteIndex = Mathf.Clamp(selectedPaletteIndex, 0, names.Length - 1);
        selectedPaletteIndex = EditorGUILayout.Popup("Selected Block", selectedPaletteIndex, names);
    }

    private void DrawBrush()
    {
        EditorGUILayout.Space(6f);
        EditorGUILayout.LabelField("Scene Brush", EditorStyles.boldLabel);
        scenePaintingEnabled = EditorGUILayout.Toggle("Enable Painting", scenePaintingEnabled);
        brushMode = (BrushMode)EditorGUILayout.EnumPopup("Mode", brushMode);
        paintHeight = EditorGUILayout.IntField("Empty Grid Y", paintHeight);
        EditorGUILayout.HelpBox(
            "Left click places or removes a block. Shift + left click temporarily erases. Click a block face to build next to it; click empty space to paint on Empty Grid Y.",
            MessageType.None);
    }

    private void DrawAreaGenerator()
    {
        EditorGUILayout.Space(6f);
        EditorGUILayout.LabelField("Box Generator", EditorStyles.boldLabel);
        areaStart = EditorGUILayout.Vector3IntField("Start Coordinate", areaStart);
        areaSize = EditorGUILayout.Vector3IntField("Size", areaSize);
        areaSize.x = Mathf.Max(1, areaSize.x);
        areaSize.y = Mathf.Max(1, areaSize.y);
        areaSize.z = Mathf.Max(1, areaSize.z);

        using (new EditorGUILayout.HorizontalScope())
        {
            if (GUILayout.Button("Fill Box"))
                FillBox();

            if (GUILayout.Button("Clear Box"))
                ClearBox();
        }
    }

    private void DrawCleanup()
    {
        EditorGUILayout.Space(6f);
        int blockCount = targetMap.GetComponentsInChildren<MinecraftMapBlock>(true).Length;
        EditorGUILayout.LabelField("Blocks In Map", blockCount.ToString());

        if (blockCount > 0 && GUILayout.Button("Clear Entire Map"))
        {
            if (EditorUtility.DisplayDialog("Clear Minecraft Map", "Remove every generated block in this map?", "Clear", "Cancel"))
                ClearAllBlocks();
        }
    }

    private void DuringSceneGui(SceneView sceneView)
    {
        if (targetMap == null || !scenePaintingEnabled || targetMap.blockPalette.Count == 0)
            return;

        Event currentEvent = Event.current;
        if (currentEvent.alt)
            return;

        Ray ray = HandleUtility.GUIPointToWorldRay(currentEvent.mousePosition);
        bool erase = brushMode == BrushMode.Erase || currentEvent.shift;
        MinecraftMapBlock hitBlock;
        Vector3Int gridPosition;

        if (!TryGetBrushPosition(ray, erase, out gridPosition, out hitBlock))
        {
            previewGridPosition = null;
            return;
        }

        previewGridPosition = gridPosition;
        DrawPreview(gridPosition, erase);

        if ((currentEvent.type == EventType.MouseDown || currentEvent.type == EventType.MouseDrag) &&
            currentEvent.button == 0 && !currentEvent.control && !currentEvent.command)
        {
            if (erase)
            {
                if (hitBlock != null)
                    RemoveBlock(hitBlock);
            }
            else
            {
                PlaceBlock(gridPosition);
            }

            currentEvent.Use();
        }

        if (currentEvent.type == EventType.Layout)
            HandleUtility.AddDefaultControl(GUIUtility.GetControlID(FocusType.Passive));

        sceneView.Repaint();
    }

    private bool TryGetBrushPosition(Ray ray, bool erase, out Vector3Int gridPosition, out MinecraftMapBlock hitBlock)
    {
        hitBlock = null;
        RaycastHit hit;
        if (Physics.Raycast(ray, out hit, float.MaxValue))
        {
            hitBlock = hit.collider.GetComponentInParent<MinecraftMapBlock>();
            if (hitBlock != null && hitBlock.GetComponentInParent<MinecraftMap>() == targetMap)
            {
                if (erase)
                {
                    gridPosition = hitBlock.gridPosition;
                    return true;
                }

                Vector3 localNormal = targetMap.transform.InverseTransformDirection(hit.normal);
                gridPosition = hitBlock.gridPosition + DominantAxis(localNormal);
                return true;
            }
        }

        Plane plane = new Plane(targetMap.transform.up, targetMap.GridToWorldPosition(new Vector3Int(0, paintHeight, 0)));
        float distance;
        if (plane.Raycast(ray, out distance))
        {
            gridPosition = targetMap.LocalToGridPosition(targetMap.transform.InverseTransformPoint(ray.GetPoint(distance)));
            gridPosition.y = paintHeight;
            if (erase)
                hitBlock = targetMap.GetBlock(gridPosition);

            return true;
        }

        gridPosition = default;
        return false;
    }

    private void DrawPreview(Vector3Int gridPosition, bool erase)
    {
        Color fill = erase ? new Color(1f, 0.2f, 0.2f, 0.15f) : new Color(0.2f, 1f, 0.35f, 0.15f);
        Color outline = erase ? Color.red : Color.green;
        Vector3 size = Vector3.one * targetMap.blockSize;
        Vector3 position = targetMap.GridToWorldPosition(gridPosition);
        Matrix4x4 previousMatrix = Handles.matrix;
        Handles.matrix = Matrix4x4.TRS(position, targetMap.transform.rotation, targetMap.transform.lossyScale);
        Handles.DrawSolidRectangleWithOutline(
            new[]
            {
                new Vector3(-size.x * 0.5f, size.y * 0.5f, -size.z * 0.5f),
                new Vector3(-size.x * 0.5f, size.y * 0.5f, size.z * 0.5f),
                new Vector3(size.x * 0.5f, size.y * 0.5f, size.z * 0.5f),
                new Vector3(size.x * 0.5f, size.y * 0.5f, -size.z * 0.5f)
            },
            fill,
            outline);
        Handles.DrawWireCube(Vector3.zero, size);
        Handles.matrix = previousMatrix;
    }

    private void CreateMap()
    {
        GameObject mapObject = new GameObject("Minecraft Map");
        Undo.RegisterCreatedObjectUndo(mapObject, "Create Minecraft Map");
        MinecraftMap map = Undo.AddComponent<MinecraftMap>(mapObject);
        map.blockPalette.Add(new MinecraftBlockDefinition { name = "Grass" });
        Selection.activeGameObject = mapObject;
        SetTargetMap(map);
        EditorSceneManager.MarkSceneDirty(mapObject.scene);
    }

    private void UseSelectedMap()
    {
        MinecraftMap map = Selection.activeGameObject != null
            ? Selection.activeGameObject.GetComponentInParent<MinecraftMap>()
            : null;
        if (map != null)
            SetTargetMap(map);
    }

    private void SetTargetMap(MinecraftMap map)
    {
        targetMap = map;
        serializedMap = targetMap != null ? new SerializedObject(targetMap) : null;
        previewGridPosition = null;
        SceneView.RepaintAll();
    }

    private void EnsureSerializedMap()
    {
        if (serializedMap == null || serializedMap.targetObject != targetMap)
            serializedMap = new SerializedObject(targetMap);
    }

    private void PlaceBlock(Vector3Int gridPosition)
    {
        if (targetMap.GetBlock(gridPosition) != null)
            return;

        MinecraftBlockDefinition definition = targetMap.blockPalette[Mathf.Clamp(selectedPaletteIndex, 0, targetMap.blockPalette.Count - 1)];
        GameObject block = definition.prefab != null
            ? (GameObject)PrefabUtility.InstantiatePrefab(definition.prefab, targetMap.transform)
            : GameObject.CreatePrimitive(PrimitiveType.Cube);

        Undo.RegisterCreatedObjectUndo(block, "Place Minecraft Block");
        block.transform.SetParent(targetMap.transform, false);
        block.transform.localPosition = targetMap.GridToLocalPosition(gridPosition);
        block.transform.localRotation = Quaternion.identity;
        block.transform.localScale = Vector3.one * targetMap.blockSize;
        block.name = $"{definition.name} [{gridPosition.x}, {gridPosition.y}, {gridPosition.z}]";

        MinecraftMapBlock marker = Undo.AddComponent<MinecraftMapBlock>(block);
        marker.gridPosition = gridPosition;
        marker.paletteIndex = selectedPaletteIndex;

        Collider collider = block.GetComponent<Collider>();
        if (definition.addCollider && collider == null)
            Undo.AddComponent<BoxCollider>(block);
        else if (!definition.addCollider && collider != null && definition.prefab == null)
            Undo.DestroyObjectImmediate(collider);

        Renderer renderer = block.GetComponentInChildren<Renderer>();
        if (renderer != null && definition.material != null)
        {
            SetupMaterialTiling tiling = block.GetComponent<SetupMaterialTiling>();
            if (definition.applyMaterialTiling)
            {
                if (tiling == null)
                    tiling = Undo.AddComponent<SetupMaterialTiling>(block);

                tiling.sharedMaterial = definition.material;
                tiling.useSharedMaterial = true;
                tiling.autoMatchScale = false;
                tiling.manualTiling = Vector2.one;
                tiling.generateBoxUvForXYZ = false;
                tiling.worldUnitsPerTile = targetMap.blockSize;
                tiling.ApplyMaterialAndTiling();
                EditorUtility.SetDirty(tiling);
            }
            else
            {
                renderer.sharedMaterial = definition.material;
            }
        }

        EditorSceneManager.MarkSceneDirty(targetMap.gameObject.scene);
    }

    private void RemoveBlock(MinecraftMapBlock block)
    {
        if (block != null)
        {
            Undo.DestroyObjectImmediate(block.gameObject);
            EditorSceneManager.MarkSceneDirty(targetMap.gameObject.scene);
        }
    }

    private void FillBox()
    {
        Undo.SetCurrentGroupName("Fill Minecraft Box");
        int undoGroup = Undo.GetCurrentGroup();
        for (int x = 0; x < areaSize.x; x++)
        {
            for (int y = 0; y < areaSize.y; y++)
            {
                for (int z = 0; z < areaSize.z; z++)
                    PlaceBlock(areaStart + new Vector3Int(x, y, z));
            }
        }

        Undo.CollapseUndoOperations(undoGroup);
    }

    private void ClearBox()
    {
        Undo.SetCurrentGroupName("Clear Minecraft Box");
        int undoGroup = Undo.GetCurrentGroup();
        for (int x = 0; x < areaSize.x; x++)
        {
            for (int y = 0; y < areaSize.y; y++)
            {
                for (int z = 0; z < areaSize.z; z++)
                    RemoveBlock(targetMap.GetBlock(areaStart + new Vector3Int(x, y, z)));
            }
        }

        Undo.CollapseUndoOperations(undoGroup);
    }

    private void ClearAllBlocks()
    {
        MinecraftMapBlock[] blocks = targetMap.GetComponentsInChildren<MinecraftMapBlock>(true);
        Undo.SetCurrentGroupName("Clear Minecraft Map");
        int undoGroup = Undo.GetCurrentGroup();
        for (int i = blocks.Length - 1; i >= 0; i--)
            Undo.DestroyObjectImmediate(blocks[i].gameObject);

        Undo.CollapseUndoOperations(undoGroup);
        EditorSceneManager.MarkSceneDirty(targetMap.gameObject.scene);
    }

    private static Vector3Int DominantAxis(Vector3 normal)
    {
        Vector3 absolute = new Vector3(Mathf.Abs(normal.x), Mathf.Abs(normal.y), Mathf.Abs(normal.z));
        if (absolute.x >= absolute.y && absolute.x >= absolute.z)
            return new Vector3Int(normal.x >= 0f ? 1 : -1, 0, 0);
        if (absolute.y >= absolute.x && absolute.y >= absolute.z)
            return new Vector3Int(0, normal.y >= 0f ? 1 : -1, 0);

        return new Vector3Int(0, 0, normal.z >= 0f ? 1 : -1);
    }
}
