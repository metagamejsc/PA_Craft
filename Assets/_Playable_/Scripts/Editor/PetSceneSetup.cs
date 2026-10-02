using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Playable;
using TMPro;
using UnityEditor;
using UnityEditor.Animations;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.UI;
using Object = UnityEngine.Object;

// Explicit editor migration helpers; never run automatically on import.
public static class PetSceneSetup
{
    public const string Output = "Assets/_Playable_/Pets";
    public const string Animals = "Assets/Game/Voxel Play/Resources/Prefabs/Animals";
    public const string Gugu = "Assets/_Playable_/3D Model/Animal/gugu gaga/gugu-gagaa-characters-3d-animated.glb";
    public const string Girl = "Assets/_Playable_/3D Model/Character/girl minecraft/girl-minecraft-player.glb";

    private static void Folders()
    {
        foreach (string folder in new[] { Output, Output + "/Materials", Output + "/Animations", Output + "/Prefabs", Output + "/Icons" })
            if (!AssetDatabase.IsValidFolder(folder)) AssetDatabase.CreateFolder(Path.GetDirectoryName(folder).Replace('\\', '/'), Path.GetFileName(folder));
    }

    public static void Set(Object target, string field, Object value)
    {
        var so = new SerializedObject(target);
        so.FindProperty(field).objectReferenceValue = value;
        so.ApplyModifiedPropertiesWithoutUndo();
    }

    public static void SetObjects(Object target, string field, Object[] values)
    {
        var so = new SerializedObject(target);
        var array = so.FindProperty(field);
        array.arraySize = values.Length;
        for (int i = 0; i < values.Length; i++) array.GetArrayElementAtIndex(i).objectReferenceValue = values[i];
        so.ApplyModifiedPropertiesWithoutUndo();
    }

    private static void OpaqueUnlit(Material material)
    {
        // Changing the shader preserves serialized _MainTex even when the original shader is missing.
        material.shader = Shader.Find("Particles/Standard Unlit");
        material.shaderKeywords = new string[0];
        material.SetFloat("_Mode", 0);
        material.SetFloat("_ColorMode", 0);
        material.SetFloat("_SrcBlend", 1);
        material.SetFloat("_DstBlend", 0);
        material.SetFloat("_ZWrite", 1);
        material.SetFloat("_Cull", 0);
        material.SetColor("_Color", Color.white);
        material.SetOverrideTag("RenderType", "Opaque");
        material.renderQueue = -1;
        EditorUtility.SetDirty(material);
    }

    public static string CleanAnimals()
    {
        Folders();
        int missing = 0, count = 0;
        var materials = new HashSet<Material>();
        foreach (string guid in AssetDatabase.FindAssets("t:Prefab", new[] { Animals }))
        {
            string path = AssetDatabase.GUIDToAssetPath(guid);
            var root = PrefabUtility.LoadPrefabContents(path);
            try
            {
                foreach (Transform t in root.GetComponentsInChildren<Transform>(true))
                    missing += GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
                foreach (Renderer renderer in root.GetComponentsInChildren<Renderer>(true))
                {
                    var slots = renderer.sharedMaterials;
                    for (int i = 0; i < slots.Length; i++)
                    {
                        var material = slots[i];
                        if (material == null) continue;
                        if (!AssetDatabase.GetAssetPath(material).StartsWith("Assets/"))
                        {
                            string dest = Output + "/Materials/Animal Default.mat";
                            material = AssetDatabase.LoadAssetAtPath<Material>(dest);
                            if (material == null) { material = new Material(slots[i]); AssetDatabase.CreateAsset(material, dest); }
                            slots[i] = material;
                        }
                        if (materials.Add(material)) OpaqueUnlit(material);
                    }
                    renderer.sharedMaterials = slots;
                }
                PrefabUtility.SaveAsPrefabAsset(root, path);
                count++;
            }
            finally { PrefabUtility.UnloadPrefabContents(root); }
        }
        AssetDatabase.SaveAssets();
        return count + " animal prefabs cleaned; missing components removed=" + missing + "; unlit materials=" + materials.Count;
    }

    public static void ConvertImportedMaterials(GameObject model, string prefix)
    {
        var converted = new Dictionary<Material, Material>();
        foreach (var renderer in model.GetComponentsInChildren<Renderer>(true))
        {
            var slots = renderer.sharedMaterials;
            for (int i = 0; i < slots.Length; i++)
            {
                var source = slots[i];
                if (source == null) continue;
                if (!converted.TryGetValue(source, out Material material))
                {
                    string path = Output + "/Materials/" + prefix + " " + converted.Count + ".mat";
                    material = AssetDatabase.LoadAssetAtPath<Material>(path);
                    if (material == null) { material = new Material(Shader.Find("Particles/Standard Unlit")); AssetDatabase.CreateAsset(material, path); }
                    OpaqueUnlit(material);
                    var pixelSkin = prefix == "Girl Player" ? AssetDatabase.LoadAssetAtPath<Texture2D>(Output + "/Materials/Girl Skin.png") : null;
                    material.mainTexture = pixelSkin != null ? pixelSkin : source.mainTexture;
                    material.SetFloat("_Mode", 1);
                    material.SetFloat("_Cutoff", 0.3f);
                    material.EnableKeyword("_ALPHATEST_ON");
                    material.SetOverrideTag("RenderType", "TransparentCutout"); material.renderQueue = 2450;
                    converted.Add(source, material);
                }
                slots[i] = material;
            }
            renderer.sharedMaterials = slots;
        }
    }

    private static AnimationClip CopyClip(AnimationClip source, string name, bool loop)
    {
        string path = Output + "/Animations/" + name + ".anim";
        var clip = AssetDatabase.LoadAssetAtPath<AnimationClip>(path);
        if (clip == null) { clip = new AnimationClip(); AssetDatabase.CreateAsset(clip, path); }
        EditorUtility.CopySerialized(source, clip);
        clip.name = name;
        clip.legacy = false;
        AnimationUtility.SetAnimationEvents(clip, new AnimationEvent[0]);
        var settings = AnimationUtility.GetAnimationClipSettings(clip);
        settings.loopTime = loop;
        AnimationUtility.SetAnimationClipSettings(clip, settings);
        EditorUtility.SetDirty(clip);
        return clip;
    }

    private static AnimatorController Locomotion(string name, AnimationClip idle, AnimationClip walk, AnimationClip eat)
    {
        string path = Output + "/Animations/" + name + ".controller";
        var controller = AssetDatabase.LoadAssetAtPath<AnimatorController>(path);
        if (controller != null) return controller;
        controller = AnimatorController.CreateAnimatorControllerAtPath(path);
        controller.AddParameter("IsRun", AnimatorControllerParameterType.Bool);
        var sm = controller.layers[0].stateMachine;
        var idleState = sm.AddState("Idle");
        idleState.motion = CopyClip(idle, name + " Idle", true);
        var walkState = sm.AddState("Walk");
        walkState.motion = CopyClip(walk, name + " Walk", true);
        sm.defaultState = idleState;
        Transition(idleState, walkState, AnimatorConditionMode.If, "IsRun");
        Transition(walkState, idleState, AnimatorConditionMode.IfNot, "IsRun");
        if (eat != null)
        {
            controller.AddParameter("Eat", AnimatorControllerParameterType.Trigger);
            var eatState = sm.AddState("Eat");
            eatState.motion = CopyClip(eat, name + " Eat", false);
            var t = sm.AddAnyStateTransition(eatState);
            t.hasExitTime = false; t.duration = 0.1f; t.canTransitionToSelf = true;
            t.AddCondition(AnimatorConditionMode.If, 0, "Eat");
            t = eatState.AddTransition(idleState); t.hasExitTime = true; t.exitTime = 0.9f; t.duration = 0.1f;
        }
        return controller;
    }

    private static void Transition(AnimatorState from, AnimatorState to, AnimatorConditionMode mode, string param)
    {
        var t = from.AddTransition(to);
        t.hasExitTime = false; t.duration = 0.15f;
        t.AddCondition(mode, 0, param);
    }

    private static Bounds BoundsOf(GameObject obj)
    {
        var renderers = obj.GetComponentsInChildren<Renderer>().Where(r => !(r is ParticleSystemRenderer)).ToArray();
        var bounds = renderers.Length > 0 ? renderers[0].bounds : new Bounds(obj.transform.position, Vector3.one);
        foreach (var r in renderers) bounds.Encapsulate(r.bounds);
        return bounds;
    }

    private static TMP_Text Label(Transform parent, string name, string value, Vector2 position, Vector2 size, float fontSize)
    {
        var go = new GameObject(name, typeof(RectTransform));
        go.transform.SetParent(parent, false);
        var text = go.AddComponent<TextMeshProUGUI>();
        text.text = value; text.fontSize = fontSize; text.alignment = TextAlignmentOptions.Center;
        text.color = Color.white; text.raycastTarget = false;
        text.font = TMP_Settings.defaultFontAsset;
        var rect = (RectTransform)go.transform;
        rect.sizeDelta = size; rect.anchoredPosition = position;
        return text;
    }

    private static Image Panel(Transform parent, string name, Vector2 pos, Vector2 size, Color color)
    {
        var go = new GameObject(name, typeof(RectTransform)); go.transform.SetParent(parent, false);
        var image = go.AddComponent<Image>(); image.color = color; image.raycastTarget = false;
        var rect = (RectTransform)go.transform; rect.sizeDelta = size; rect.anchoredPosition = pos;
        return image;
    }

    private static PetStatusView Status(GameObject root, float height)
    {
        var go = new GameObject("Pet status", typeof(RectTransform), typeof(Canvas));
        go.transform.SetParent(root.transform, false);
        go.transform.localPosition = Vector3.up * (height + 0.65f);
        go.transform.localScale = Vector3.one;
        ((RectTransform)go.transform).sizeDelta = Vector2.one;
        go.GetComponent<Canvas>().renderMode = RenderMode.WorldSpace;
        var view = go.AddComponent<PetStatusView>();
        var original = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Game/Prefabs/UI/Elements/HealthBar.prefab");
        var bar = (GameObject)PrefabUtility.InstantiatePrefab(original, go.transform);
        PrefabUtility.UnpackPrefabInstance(bar, PrefabUnpackMode.Completely, InteractionMode.AutomatedAction);
        foreach (var t in bar.GetComponentsInChildren<Transform>(true))
            GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach (var text in bar.GetComponentsInChildren<TMP_Text>(true)) Object.DestroyImmediate(text.gameObject);
        var fill = bar.transform.Find("HP/FillBar").GetComponent<Image>();
        fill.type = Image.Type.Filled; fill.fillMethod = Image.FillMethod.Horizontal; fill.fillOrigin = 0;
        fill.fillAmount = 0;
        // The old damage trail would look like pre-existing progress, so feeding uses only FillBar.
        var ghost = bar.transform.Find("HP/GhostBar");
        if (ghost != null) ghost.gameObject.SetActive(false);
        foreach (var graphic in bar.GetComponentsInChildren<Graphic>(true)) graphic.raycastTarget = false;
        Set(view, "_fill", fill);
        view.Refresh(0, false);
        return view;
    }

    public static string RestoreOriginalHealthBars()
    {
        foreach (string name in new[] { "Rabbit", "Pig", "Fox", "Dog" })
        {
            string path = Output + "/Prefabs/" + name + ".prefab";
            var root = PrefabUtility.LoadPrefabContents(path);
            try
            {
                var old = root.GetComponentInChildren<PetStatusView>(true);
                var model = root.transform.Find("Model");
                float height = BoundsOf(model != null ? model.gameObject : root).max.y - root.transform.position.y;
                if (old != null) Object.DestroyImmediate(old.gameObject);
                Set(root.GetComponent<PetNeeds>(), "_status", Status(root, height));
                PrefabUtility.SaveAsPrefabAsset(root, path);
            }
            finally { PrefabUtility.UnloadPrefabContents(root); }
        }
        AssetDatabase.SaveAssets();
        return "Restored original healthbar artwork with text-free horizontal fill on all four animals.";
    }

    private static GameObject HeartPrefab()
    {
        string path = Output + "/Prefabs/Pet Hearts.prefab";
        var existing = AssetDatabase.LoadAssetAtPath<GameObject>(path);
        if (existing != null) return existing;
        // A tiny placeholder texture; replace this material's MainTex with the final heart artwork.
        var texture = new Texture2D(32, 32, TextureFormat.RGBA32, false);
        for (int y = 0; y < 32; y++) for (int x = 0; x < 32; x++)
        {
            float nx = (x - 15.5f) / 13f, ny = (y - 14f) / 13f;
            float a = nx * nx + ny * ny - 1;
            texture.SetPixel(x, y, a * a * a - nx * nx * ny * ny * ny <= 0 ? Color.white : Color.clear);
        }
        texture.Apply();
        string texPath = Output + "/Materials/Heart Placeholder.png";
        File.WriteAllBytes(texPath, texture.EncodeToPNG()); Object.DestroyImmediate(texture);
        AssetDatabase.ImportAsset(texPath);
        var importer = (TextureImporter)AssetImporter.GetAtPath(texPath);
        importer.alphaIsTransparency = true; importer.mipmapEnabled = false; importer.maxTextureSize = 32;
        importer.SaveAndReimport();
        var material = new Material(Shader.Find("Particles/Standard Unlit"));
        material.name = "Pet Hearts - replace MainTex";
        material.mainTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(texPath);
        material.SetFloat("_Mode", 2); material.SetFloat("_SrcBlend", 5); material.SetFloat("_DstBlend", 10);
        material.SetFloat("_ZWrite", 0); material.SetFloat("_Cull", 0);
        material.EnableKeyword("_ALPHABLEND_ON"); material.SetOverrideTag("RenderType", "Transparent"); material.renderQueue = 3000;
        AssetDatabase.CreateAsset(material, Output + "/Materials/Pet Hearts.mat");
        var go = new GameObject("Pet Hearts");
        var ps = go.AddComponent<ParticleSystem>(); ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
        var main = ps.main; main.loop = false; main.playOnAwake = false; main.duration = 0.6f;
        main.startLifetime = new ParticleSystem.MinMaxCurve(1.2f, 1.8f); main.startSpeed = 0;
        main.startSize = new ParticleSystem.MinMaxCurve(0.18f, 0.32f);
        main.startColor = new Color(1, 0.2f, 0.45f); main.simulationSpace = ParticleSystemSimulationSpace.World; main.maxParticles = 12;
        var emission = ps.emission; emission.rateOverTime = 0;
        emission.SetBursts(new[] { new ParticleSystem.Burst(0, 7) });
        var shape = ps.shape; shape.shapeType = ParticleSystemShapeType.Sphere; shape.radius = 0.35f;
        var velocity = ps.velocityOverLifetime; velocity.enabled = true; velocity.space = ParticleSystemSimulationSpace.World;
        velocity.x = new ParticleSystem.MinMaxCurve(-0.15f, 0.15f); velocity.y = new ParticleSystem.MinMaxCurve(0.7f, 1.2f);
        velocity.z = new ParticleSystem.MinMaxCurve(-0.15f, 0.15f);
        var fade = ps.colorOverLifetime; fade.enabled = true;
        var gradient = new Gradient();
        gradient.SetKeys(new[] { new GradientColorKey(Color.white, 0), new GradientColorKey(Color.white, 1) },
            new[] { new GradientAlphaKey(1, 0), new GradientAlphaKey(1, 0.5f), new GradientAlphaKey(0, 1) });
        fade.color = gradient;
        ps.GetComponent<ParticleSystemRenderer>().sharedMaterial = material;
        var prefab = PrefabUtility.SaveAsPrefabAsset(go, path); Object.DestroyImmediate(go); return prefab;
    }

    public static string BuildPets()
    {
        Folders();
        var heartPrefab = HeartPrefab();
        string flashPath = Output + "/Materials/Hungry White.mat";
        var flash = AssetDatabase.LoadAssetAtPath<Material>(flashPath);
        if (flash == null) { flash = new Material(Shader.Find("Particles/Standard Unlit")); OpaqueUnlit(flash); AssetDatabase.CreateAsset(flash, flashPath); }
        foreach (string name in new[] { "Verity", "Gugugaga", "Rabbit", "Pig", "Fox", "Dog" })
        {
            bool feedable = name != "Verity";
            bool voxelAnimal = name != "Verity" && name != "Gugugaga";
            string sourcePath = voxelAnimal ? Animals + "/" + name + ".prefab" : name == "Verity" ? "Assets/_Playable_/Prefabs/Mutant Ball Verity.prefab" : Gugu;
            var source = AssetDatabase.LoadAssetAtPath<GameObject>(sourcePath);
            var sourceAnimator = source.GetComponentInChildren<Animator>(true);
            var root = new GameObject(name);
            try
            {
                // Copy the animated model, leaving old combat scripts and old health widgets behind.
                var visual = Object.Instantiate(voxelAnimal || name == "Verity" ? sourceAnimator.gameObject : source, root.transform);
                visual.name = "Model";
                visual.transform.localPosition = Vector3.zero;
                visual.transform.localRotation = Quaternion.identity;
                if (voxelAnimal) visual.transform.localScale = sourceAnimator.transform.lossyScale;
                foreach (Transform t in visual.GetComponentsInChildren<Transform>(true))
                    GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
                foreach (MonoBehaviour c in visual.GetComponentsInChildren<MonoBehaviour>(true)) Object.DestroyImmediate(c);
                foreach (Collider c in visual.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
                foreach (Rigidbody rb in visual.GetComponentsInChildren<Rigidbody>(true)) Object.DestroyImmediate(rb);
                var animator = visual.GetComponentInChildren<Animator>(true);
                if (name == "Gugugaga") ConvertImportedMaterials(visual, name);
                AnimationClip[] clips = sourceAnimator.runtimeAnimatorController != null
                    ? sourceAnimator.runtimeAnimatorController.animationClips.Distinct().ToArray()
                    : AssetDatabase.LoadAllAssetsAtPath(sourcePath).OfType<AnimationClip>().ToArray();
                var idle = clips.First(c => c.name.ToLowerInvariant().Contains("idle"));
                var walk = clips.FirstOrDefault(c => c.name.ToLowerInvariant().Contains("walk"))
                    ?? clips.FirstOrDefault(c => c.name.ToLowerInvariant().Contains("move"))
                    ?? clips.First(c => c.name.ToLowerInvariant().Contains("run"));
                var eat = clips.FirstOrDefault(c => c.name.ToLowerInvariant().Contains("eat"));
                animator.runtimeAnimatorController = Locomotion(name, idle, walk, eat);
                animator.applyRootMotion = false;
                animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
                idle.SampleAnimation(animator.gameObject, 0);
                var bounds = BoundsOf(visual);
                if (name == "Gugugaga") { visual.transform.localScale *= 1.8f / bounds.size.y; bounds = BoundsOf(visual); }
                if (name == "Verity" && bounds.size.y > 3) { visual.transform.localScale *= 2.2f / bounds.size.y; bounds = BoundsOf(visual); }
                visual.transform.localPosition -= Vector3.up * bounds.min.y;
                bounds = BoundsOf(visual);
                var collider = root.AddComponent<BoxCollider>();
                collider.center = bounds.center; collider.size = bounds.size + new Vector3(0.15f, 0.05f, 0.15f);
                collider.isTrigger = true;
                var mover = root.AddComponent<Monster>(); Set(mover, "_animator", animator);
                if (feedable)
                {
                    var pet = root.AddComponent<PetNeeds>();
                    Set(pet, "_animator", animator); Set(pet, "_whiteFlashMaterial", flash);
                    SetObjects(pet, "_bodyRenderers", visual.GetComponentsInChildren<Renderer>(true));
                    Set(pet, "_status", Status(root, bounds.max.y));
                    var hearts = (GameObject)PrefabUtility.InstantiatePrefab(heartPrefab, root.transform);
                    hearts.transform.localPosition = Vector3.up * (bounds.max.y + 0.2f);
                    Set(pet, "_hearts", hearts.GetComponent<ParticleSystem>());
                    var so = new SerializedObject(pet); so.FindProperty("_hasEatAnimation").boolValue = eat != null; so.ApplyModifiedPropertiesWithoutUndo();
                }
                PrefabUtility.SaveAsPrefabAsset(root, Output + "/Prefabs/" + name + ".prefab");
            }
            finally { Object.DestroyImmediate(root); }
        }
        ConfigureAnimalAudio();
        AssetDatabase.SaveAssets();
        return "Created six peaceful creature prefabs, controllers, hunger bars and heart VFX.";
    }

    public static string ConfigureAnimalAudio()
    {
        foreach (string name in new[] { "Rabbit", "Pig", "Fox", "Dog" })
        {
            string path = Output + "/Prefabs/" + name + ".prefab";
            var root = PrefabUtility.LoadPrefabContents(path);
            try
            {
                var source = root.GetComponent<AudioSource>();
                if (source == null) source = root.AddComponent<AudioSource>();
                source.playOnAwake = false; source.loop = false;
                source.spatialBlend = 0.8f; source.minDistance = 3f; source.maxDistance = 22f;
                source.rolloffMode = AudioRolloffMode.Linear; source.dopplerLevel = 0;
                source.volume = 0.55f;
                var audio = root.GetComponent<AnimalAudio>();
                if (audio == null) audio = root.AddComponent<AnimalAudio>();
                Set(audio, "_source", source);
                AudioClip[] calls;
                if (name == "Dog") calls = new[] { AssetDatabase.LoadAssetAtPath<AudioClip>("Assets/_Playable_/Sound/mixkit-happy-puppy-barks-741.wav") };
                else
                {
                    string prefix = name == "Pig" ? "say" : "idle";
                    string folder = "Assets/Game/Audios/SoundFX/mobs/" + name.ToLowerInvariant();
                    calls = AssetDatabase.FindAssets("t:AudioClip", new[] { folder })
                        .Select(AssetDatabase.GUIDToAssetPath).Where(p => Path.GetFileName(p).StartsWith(prefix))
                        .OrderBy(p => p).Select(AssetDatabase.LoadAssetAtPath<AudioClip>).ToArray();
                }
                if (calls.Length == 0 || calls.Any(c => c == null)) throw new Exception("Missing animal calls: " + name);
                SetObjects(audio, "_calls", calls);
                PrefabUtility.SaveAsPrefabAsset(root, path);
            }
            finally { PrefabUtility.UnloadPrefabContents(root); }
        }
        AssetDatabase.SaveAssets();
        return "Configured rabbit, pig, fox and happy puppy sounds on four pet prefabs.";
    }





    public static Sprite RenderIcon(GameObject prefab, string name)
    {
        var clone = Object.Instantiate(prefab);
        var cameraObject = new GameObject("Pet icon camera");
        var rt = new RenderTexture(256, 256, 24, RenderTextureFormat.ARGB32);
        var previous = RenderTexture.active;
        try
        {
            foreach (Canvas canvas in clone.GetComponentsInChildren<Canvas>(true)) canvas.gameObject.SetActive(false);
            foreach (ParticleSystem ps in clone.GetComponentsInChildren<ParticleSystem>(true)) ps.gameObject.SetActive(false);
            foreach (Transform t in clone.GetComponentsInChildren<Transform>(true)) t.gameObject.layer = 31;
            foreach (Animator a in clone.GetComponentsInChildren<Animator>(true))
                if (a.runtimeAnimatorController != null) a.runtimeAnimatorController.animationClips[0].SampleAnimation(a.gameObject, 0);
            clone.transform.position = new Vector3(10000, 10000, 10000);
            var b = BoundsOf(clone);
            var camera = cameraObject.AddComponent<Camera>();
            camera.clearFlags = CameraClearFlags.SolidColor; camera.backgroundColor = Color.clear;
            camera.cullingMask = 1 << 31; camera.orthographic = true;
            camera.orthographicSize = Mathf.Max(b.size.y, b.size.x, b.size.z) * 0.68f;
            camera.nearClipPlane = 0.01f; camera.farClipPlane = 100;
            camera.transform.position = b.center + new Vector3(1, 0.55f, 1).normalized * Mathf.Max(5, b.size.magnitude * 2);
            camera.transform.LookAt(b.center);
            camera.targetTexture = rt; camera.Render(); RenderTexture.active = rt;
            var texture = new Texture2D(256, 256, TextureFormat.RGBA32, false);
            texture.ReadPixels(new Rect(0, 0, 256, 256), 0, 0); texture.Apply();
            // Particles/Standard Unlit writes RGB only in opaque mode. Render a white silhouette
            // to recover coverage, otherwise the icon PNG has correct RGB but an entirely zero alpha channel.
            var pixels = texture.GetPixels32();
            var silhouette = new Material(Shader.Find("Particles/Standard Unlit"));
            OpaqueUnlit(silhouette);
            foreach (var renderer in clone.GetComponentsInChildren<Renderer>())
            {
                var slots = renderer.sharedMaterials;
                for (int i = 0; i < slots.Length; i++) slots[i] = silhouette;
                renderer.sharedMaterials = slots;
            }
            camera.Render();
            texture.ReadPixels(new Rect(0, 0, 256, 256), 0, 0); texture.Apply();
            var coverage = texture.GetPixels32();
            for (int i = 0; i < pixels.Length; i++) pixels[i].a = coverage[i].r;
            texture.SetPixels32(pixels); texture.Apply();
            Object.DestroyImmediate(silhouette);
            string path = Output + "/Icons/" + name + ".png";
            File.WriteAllBytes(path, texture.EncodeToPNG()); Object.DestroyImmediate(texture);
            AssetDatabase.ImportAsset(path);
            var importer = (TextureImporter)AssetImporter.GetAtPath(path);
            importer.textureType = TextureImporterType.Sprite; importer.spriteImportMode = SpriteImportMode.Single;
            importer.alphaIsTransparency = true;
            importer.mipmapEnabled = false; importer.maxTextureSize = 256; importer.SaveAndReimport();
            return AssetDatabase.LoadAssetAtPath<Sprite>(path);
        }
        finally
        {
            RenderTexture.active = previous;
            Object.DestroyImmediate(clone); Object.DestroyImmediate(cameraObject); rt.Release(); Object.DestroyImmediate(rt);
        }
    }
}
