#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using Playable;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;
using UnityEngine.Rendering;
using Object = UnityEngine.Object;

// Editor-only migration. Generated assets are ordinary serialized references in the five prefabs.
[InitializeOnLoad]
public static class MonsterBattleSetup
{
    private const string Root = "Assets/_Playable_/MonsterBattle";
    private const string Request = "Library/MonsterBattle.install";
    private static readonly string[] Names = { "Mutant Enderman", "Mutan Iron Golem", "Mutan Creeper", "Mutan Huggy", "Mutan Sonic" };
    private static readonly string[] Models = {
        "mutant_enderman/mutant_enderman", "mutant_iron_golem/mutant_iron_golem",
        "mutant_creeper/mutant_creeper", "huggy_wuggy/huggy_wuggy" };
    private static readonly Dictionary<Material, Material> Materials = new Dictionary<Material, Material>();
    static MonsterBattleSetup() { EditorApplication.update += RunRequested; }
    private static void RunRequested()
    {
        if (File.Exists("Library/MonsterBattle.refresh") && !EditorApplication.isPlayingOrWillChangePlaymode && !EditorApplication.isCompiling && !EditorApplication.isUpdating)
        {
            File.Delete("Library/MonsterBattle.refresh");
            AssetDatabase.Refresh();
            return;
        }
        if (!File.Exists(Request) || EditorApplication.isPlayingOrWillChangePlaymode || EditorApplication.isCompiling || EditorApplication.isUpdating) return;
        File.Delete(Request);
        try { Install(); File.WriteAllText("Library/MonsterBattle-install-result.txt", "SUCCESS"); }
        catch (Exception e) { File.WriteAllText("Library/MonsterBattle-install-result.txt", e.ToString()); Debug.LogException(e); }
    }

    [MenuItem("Tools/Playable/Configure monster battle")]
    public static void Install()
    {
        Directory.CreateDirectory(Root + "/Materials");
        Directory.CreateDirectory(Root + "/Animations");
        Directory.CreateDirectory(Root + "/Audio");
        AssetDatabase.Refresh();
        Materials.Clear();
        GameObject explosion = Effect("Assets/Game/VFX/BigFireballExplosionRed.prefab", "Explosion");
        GameObject teleport = Effect("Assets/Game/VFX/vfx_end_teleport.prefab", "Teleport");
        GameObject teleportStart = Effect("Assets/Game/VFX/vfx_start_teleport.prefab", "TeleportStart");
        GameObject beam = Effect("Assets/Game/VFX/vfx_enderman_skill_2.prefab", "EndermanBeam");
        GameObject slam = Effect("Assets/Game/VFX/shock_wave_stone.prefab", "Slam");
        GameObject vortex = Effect("Assets/Game/VFX/shin_sonic_skill.prefab", "SonicVortex");
        GameObject transformFx = Effect("Assets/Game/VFX/vfx_change_phase.prefab", "Transform");
        GameObject death = Effect("Assets/Game/VFX/enderman_death.prefab", "EndermanDeath");
        AudioClip boom = Audio("creeper/death.ogg");
        GameObject tnt = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Game/Voxel Play/Resources/Prefabs/TNT.prefab"));
        tnt.name = "Battle TNT";
        Strip(tnt);
        StandardMaterials(tnt);
        MonsterProjectile projectile = tnt.AddComponent<MonsterProjectile>();
        Set(projectile, "_explosionVfxPrefab", explosion);
        Set(projectile, "_explosionSound", boom);
        Set(projectile, "_hitRadius", 2f);
        GameObject tntPrefab = PrefabUtility.SaveAsPrefabAsset(tnt, Root + "/TNT.prefab");
        Object.DestroyImmediate(tnt);

        for (int i = 0; i < Names.Length; i++)
        {
            string path = "Assets/_Playable_/Prefabs/" + Names[i] + ".prefab";
            GameObject root = PrefabUtility.LoadPrefabContents(path);
            try
            {
                Monster monster = root.GetComponent<Monster>();
                MonsterCombat combat = root.GetComponent<MonsterCombat>();
                Set(monster, "_stayStillOnSpawn", false);
                Set(monster, "_raycastWhileMoving", false);
                Set(monster, "_useScaleDeath", true);
                Set(monster, "_deathVfxPrefab", (Object)null);
                Set(combat, "_bombProjectilePrefab", i == 2 ? tntPrefab : null);
                Set(combat, "_useAttackHitAnimationEvent", true);
                Set(combat, "_attackTriggerParam", "IsAttack");
                MonsterBattleFeedback feedback = Get<MonsterBattleFeedback>(root);
                foreach (Transform child in root.GetComponentsInChildren<Transform>(true))
                    GameObjectUtility.RemoveMonoBehavioursWithMissingScript(child.gameObject);
                feedback.hitEffect = teleport;
                feedback.deathEffect = teleport;
                if (i < 4)
                {
                    Animator animator = root.GetComponentInChildren<Animator>(true);
                    if (animator == null) throw new Exception("Missing animator: " + path);
                    animator.runtimeAnimatorController = Controller(ModelPath(Models[i]), "Monster" + i, i);
                    if (i == 1) EnsureComboAnimations((AnimatorController)animator.runtimeAnimatorController, ModelPath(Models[i]), "Monster1", 3);
                    animator.applyRootMotion = false;
                    Set(monster, "_animator", animator);
                }
                switch (i)
                {
                    case 0:
                        feedback.attackSound = Audio("enderman/hit1.ogg");
                        feedback.skillSound = Audio("enderman/portal.ogg");
                        feedback.deathSound = Audio("enderman/death.ogg");
                        Set(Get<EndermanTeleportSkill>(root), "_teleportVfxPrefab", teleport);
                        Set(Get<EndermanTeleportSkill>(root), "_teleportStartVfxPrefab", teleportStart);
                        EndermanArmReachSkill reach = Get<EndermanArmReachSkill>(root);
                        Set(reach, "_armReachTriggerParam", "IsSkill1");
                        Transform oldBeam = root.transform.Find("Battle beam");
                        if (oldBeam != null) Object.DestroyImmediate(oldBeam.gameObject);
                        GameObject localBeam = Object.Instantiate(beam, root.transform);
                        localBeam.name = "Battle beam";
                        localBeam.transform.localPosition = Vector3.up * 1.5f;
                        localBeam.SetActive(false);
                        Set(reach, "_armVfx", localBeam);
                        DeathSkill(root, death, feedback.deathSound, 6f, 3f);
                        SetStats(root.GetComponent<EndermanMonsterData>(), "ArmReachCooldown", 5f, "ArmReachDuration", 2f, "TeleportCooldown", 7f);
                        break;
                    case 1:
                        feedback.attackSound = Audio("iron_golem/hit1.ogg");
                        feedback.skillSound = Audio("iron_golem/hit2.ogg");
                        feedback.deathSound = Audio("iron_golem/death.ogg");
                        Set(Get<IronGolemSlamSkill>(root), "_slamTriggerParam", "IsSkill1");
                        Set(Get<IronGolemSlamSkill>(root), "_slamVfxPrefab", slam);
                        Set(Get<IronGolemTntBarrageSkill>(root), "_tntPrefab", tntPrefab);
                        Set(Get<IronGolemTntBarrageSkill>(root), "_skillBoolParam", "IsSkill");
                        SetStats(root.GetComponent<IronGolemMonsterData>(), "SlamCooldown", 5f, "TntBarrageCooldown", 7f, "TntBarrageDuration", 3.2f, "TntBarrageRange", 10f, "TntBarrageSpeed", 10f);
                        break;
                    case 2:
                        feedback.attackSound = Audio("creeper/say1.ogg");
                        feedback.skillSound = feedback.attackSound;
                        feedback.deathSound = boom;
                        feedback.deathEffect = null;
                        DeathSkill(root, explosion, boom, 6f, 45f);
                        SetStats(root.GetComponent<CreeperMonsterData>(), "AttackRange", 0.1f, "BombRange", 8f, "BombSpeed", 10f);
                        break;
                    case 3:
                        feedback.attackSound = Audio("huggy_wuggy/idlescream1.ogg");
                        feedback.skillSound = feedback.attackSound;
                        feedback.deathSound = Audio("huggy_wuggy/death.ogg");
                        SetStats(root.GetComponent<HuggyMonsterData>(), "KnockbackForce", 0f, "KnockbackDuration", 0.65f);
                        break;
                    case 4:
                        feedback.attackSound = Audio("shin_sonic/angry.ogg");
                        feedback.skillSound = Audio("shin_sonic/roar_phase4.ogg");
                        feedback.deathSound = Audio("shin_sonic/hurt.ogg");
                        feedback.skillEffect = transformFx;
                        ConfigureSonic(root, monster);
                        Get<ShinsonicVortexSkill>(root).vortexEffect = vortex;
                        Get<ShinsonicRoarSkill>(root);
                        break;
                }
                // Disable source effect children; skills use sanitized copies above.
                foreach (ParticleSystem ps in root.GetComponentsInChildren<ParticleSystem>(true))
                {
                    var main = ps.main;
                    main.playOnAwake = false;
                    main.maxParticles = Mathf.Min(48, main.maxParticles);
                }
                StandardMaterials(root);
                PrefabUtility.SaveAsPrefabAsset(root, path);
            }
            finally { PrefabUtility.UnloadPrefabContents(root); }
        }
        AssetDatabase.SaveAssets();
        Debug.Log("Monster battle setup complete: five prefabs, Standard materials, bounded VFX and audio.");
    }

    private static void ConfigureSonic(GameObject root, Monster monster)
    {
        // The old prefab contains all four models but has no phase references. Rebuild its visual children only.
        while (root.transform.childCount > 0) Object.DestroyImmediate(root.transform.GetChild(0).gameObject);
        ShinsonicTransformSkill skill = Get<ShinsonicTransformSkill>(root);
        string[] fields = { "_baseVisual", "_stage1Visual", "_stage2Visual", "_stage3Visual" };
        for (int phase = 1; phase <= 4; phase++)
        {
            string path = ModelPath("shin_sonic/Phase " + phase + "/gojidraw_shin_sonic_phase" + phase);
            GameObject visual = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(path), root.transform);
            visual.name = "Sonic phase " + phase;
            // Keep phase growth readable on the playable's small arena.
            Renderer[] renderers = visual.GetComponentsInChildren<Renderer>(true);
            if (renderers.Length > 0)
            {
                Bounds bounds = renderers[0].bounds;
                foreach (Renderer renderer in renderers) bounds.Encapsulate(renderer.bounds);
                float targetHeight = 2.4f + (phase - 1) * 0.7f;
                if (bounds.size.y > 0.01f) visual.transform.localScale *= targetHeight / bounds.size.y;
            }
            Animator animator = visual.GetComponent<Animator>();
            if (animator == null) animator = visual.AddComponent<Animator>();
            animator.runtimeAnimatorController = Controller(path, "Sonic" + phase, 4);
            if (phase == 3) EnsureComboAnimations((AnimatorController)animator.runtimeAnimatorController, path, "Sonic3", 2);
            animator.applyRootMotion = false;
            Set(skill, fields[phase - 1], visual);
            visual.SetActive(phase == 1);
            if (phase == 1) Set(monster, "_animator", animator);
        }
    }

    private static string ModelPath(string relative) { return "Assets/Game/Models/Mobs/" + relative + ".fbx"; }
    private static T Get<T>(GameObject root) where T : Component
    { T c = root.GetComponent<T>(); return c != null ? c : root.AddComponent<T>(); }
    private static void DeathSkill(GameObject root, GameObject fx, AudioClip sound, float radius, float damage)
    {
        MonsterDeathSkill skill = Get<MonsterDeathSkill>(root);
        skill.effect = fx; skill.sound = sound; skill.radius = radius; skill.damage = damage;
    }

    private static AudioClip Audio(string relative)
    {
        string destination = Root + "/Audio/" + relative.Replace('/', '_');
        if (!File.Exists(destination))
            File.Copy("D:/Source/minecraft/Assets/Game/Audios/SoundFX/mobs/" + relative, destination);
        AssetDatabase.ImportAsset(destination);
        AudioImporter importer = (AudioImporter)AssetImporter.GetAtPath(destination);
        importer.forceToMono = true;
        AudioImporterSampleSettings settings = importer.defaultSampleSettings;
        settings.loadType = AudioClipLoadType.DecompressOnLoad;
        settings.compressionFormat = AudioCompressionFormat.Vorbis;
        settings.quality = 0.35f;
        settings.sampleRateSetting = AudioSampleRateSetting.OverrideSampleRate;
        settings.sampleRateOverride = 22050;
        importer.defaultSampleSettings = settings;
        importer.SaveAndReimport();
        return AssetDatabase.LoadAssetAtPath<AudioClip>(destination);
    }

    private static GameObject Effect(string path, string name)
    {
        GameObject source = AssetDatabase.LoadAssetAtPath<GameObject>(path);
        if (source == null) throw new Exception("Missing effect: " + path);
        GameObject instance = Object.Instantiate(source);
        instance.name = name;
        Strip(instance);
        ParticleSystem[] systems = instance.GetComponentsInChildren<ParticleSystem>(true);
        int particleBudget = Mathf.Max(4, 160 / Mathf.Max(1, systems.Length));
        foreach (ParticleSystem ps in systems)
        {
            var main = ps.main;
            main.maxParticles = Mathf.Min(particleBudget, Mathf.Min(48, main.maxParticles));
            main.loop = false;
            main.playOnAwake = false;
            main.stopAction = ParticleSystemStopAction.None;
            var collision = ps.collision; collision.enabled = false;
            var lights = ps.lights; lights.enabled = false;
            var trails = ps.trails; trails.enabled = false;
        }
        StandardMaterials(instance);
        GameObject result = PrefabUtility.SaveAsPrefabAsset(instance, Root + "/" + name + ".prefab");
        Object.DestroyImmediate(instance);
        return result;
    }

    private static void Strip(GameObject root)
    {
        foreach (Transform t in root.GetComponentsInChildren<Transform>(true)) GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach (MonoBehaviour c in root.GetComponentsInChildren<MonoBehaviour>(true)) if (c != null) Object.DestroyImmediate(c);
        foreach (Collider c in root.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(c);
        foreach (Rigidbody c in root.GetComponentsInChildren<Rigidbody>(true)) Object.DestroyImmediate(c);
        foreach (Light c in root.GetComponentsInChildren<Light>(true)) Object.DestroyImmediate(c);
        foreach (AudioSource c in root.GetComponentsInChildren<AudioSource>(true)) Object.DestroyImmediate(c);
    }

    private static void StandardMaterials(GameObject root)
    {
        foreach (Renderer renderer in root.GetComponentsInChildren<Renderer>(true))
        {
            Material[] mats = renderer.sharedMaterials;
            for (int i = 0; i < mats.Length; i++)
            {
                Material source = mats[i];
                if (source == null) continue;
                if (!Materials.TryGetValue(source, out Material material))
                {
                    string sourcePath = AssetDatabase.GetAssetPath(source);
                    if (sourcePath.StartsWith(Root + "/Materials/")) { Materials[source] = source; mats[i] = source; continue; }
                    string id = AssetDatabase.AssetPathToGUID(sourcePath);
                    AssetDatabase.TryGetGUIDAndLocalFileIdentifier(source, out string unused, out long localId);
                    string path = Root + "/Materials/" + id + "_" + localId + ".mat";
                    material = AssetDatabase.LoadAssetAtPath<Material>(path);
                    if (material == null)
                    {
                        material = new Material(Shader.Find("Standard"));
                        material.name = source.name + " Standard";
                        Texture texture = source.HasProperty("_BaseMap") ? source.GetTexture("_BaseMap") : source.mainTexture;
                        material.mainTexture = texture;
                        material.color = source.HasProperty("_BaseColor") ? source.GetColor("_BaseColor") : source.HasProperty("_Color") ? source.color : Color.white;
                        material.SetFloat("_Glossiness", 0f);
                        material.SetFloat("_Metallic", 0f);
                        if (renderer is ParticleSystemRenderer || source.renderQueue >= 3000)
                        {
                            material.SetFloat("_Mode", 2f);
                            material.SetInt("_SrcBlend", (int)BlendMode.SrcAlpha);
                            material.SetInt("_DstBlend", (int)BlendMode.OneMinusSrcAlpha);
                            material.SetInt("_ZWrite", 0);
                            material.EnableKeyword("_ALPHABLEND_ON");
                            material.SetOverrideTag("RenderType", "Transparent");
                            material.renderQueue = 3000;
                            material.EnableKeyword("_EMISSION");
                            material.SetTexture("_EmissionMap", texture);
                            material.SetColor("_EmissionColor", material.color * 0.7f);
                        }
                        AssetDatabase.CreateAsset(material, path);
                    }
                    Materials[source] = material;
                }
                mats[i] = material;
            }
            renderer.sharedMaterials = mats;
            renderer.shadowCastingMode = ShadowCastingMode.Off;
            renderer.receiveShadows = false;
        }
    }

    private static AnimatorController Controller(string modelPath, string name, int type)
    {
        string path = Root + "/Animations/" + name + ".controller";
        AnimatorController existing = AssetDatabase.LoadAssetAtPath<AnimatorController>(path);
        if (existing != null) return existing;
        var clips = new List<AnimationClip>();
        foreach (Object asset in AssetDatabase.LoadAllAssetsAtPath(modelPath))
            if (asset is AnimationClip clip && !clip.name.StartsWith("__preview")) clips.Add(clip);
        if (clips.Count == 0) throw new Exception("No animation clips: " + modelPath);
        AnimatorController controller = AnimatorController.CreateAnimatorControllerAtPath(path);
        foreach (string parameter in new[] { "IsRun", "IsAttack", "IsSkill1", "IsSkill", "IsStun", "IsDeath" })
            controller.AddParameter(parameter, AnimatorControllerParameterType.Bool);
        AnimatorStateMachine machine = controller.layers[0].stateMachine;
        AnimatorState idle = State(machine, clips, name, "Idle", new[] { ".idle", ".move" }, true, null);
        machine.defaultState = idle;
        AnimatorState run = State(machine, clips, name, "Move", new[] { ".run", ".move", ".walk" }, true, null);
        Transition(idle, run, "IsRun", true);
        Transition(run, idle, "IsRun", false);
        AnimatorState attack = State(machine, clips, name, "Attack", new[] { ".attack", ".attack1", ".attack_1", ".jumpscare" }, false, "AttackHit");
        Any(machine, attack, "IsAttack"); Return(attack, idle);
        if (type == 0 || type == 1 || type == 4)
        {
            AnimatorState skill = State(machine, clips, name, "Skill", type == 0 ? new[] { ".skill2" } : new[] { ".skill1", ".jumpscare", ".attack" }, false, type == 1 ? "SlamHit" : null);
            Any(machine, skill, "IsSkill1");
            Transition(skill, idle, "IsSkill1", false);
        }
        if (type == 1)
        {
            AnimatorState start = State(machine, clips, name, "Barrage start", new[] { ".skill2_start" }, false, null);
            AnimatorState loop = State(machine, clips, name, "Barrage loop", new[] { ".skill2_loop" }, true, null);
            AnimatorState end = State(machine, clips, name, "Barrage end", new[] { ".skill2_end" }, false, null);
            Any(machine, start, "IsSkill");
            Return(start, loop);
            Transition(loop, end, "IsSkill", false);
            Return(end, idle);
        }
        return controller;
    }

    private static AnimatorState State(AnimatorStateMachine machine, List<AnimationClip> clips, string prefix, string name, string[] endings, bool loop, string hitEvent)
    {
        AnimationClip source = null;
        foreach (string suffix in endings)
        {
            source = clips.Find(c => c.name.EndsWith(suffix));
            if (source != null) break;
        }
        if (source == null) source = clips[0];
        AnimationClip clip = Object.Instantiate(source);
        clip.name = prefix + " " + name;
        AnimationUtility.SetAnimationEvents(clip, hitEvent == null ? new AnimationEvent[0] : new[] { new AnimationEvent { functionName = hitEvent, time = Mathf.Min(0.4f, clip.length * 0.4f) } });
        AnimationClipSettings settings = AnimationUtility.GetAnimationClipSettings(clip);
        settings.loopTime = loop;
        AnimationUtility.SetAnimationClipSettings(clip, settings);
        AssetDatabase.CreateAsset(clip, Root + "/Animations/" + prefix + "_" + name + ".anim");
        AnimatorState state = machine.AddState(name);
        state.motion = clip;
        return state;
    }
    private static void EnsureComboAnimations(AnimatorController controller, string modelPath, string prefix, int count)
    {
        AnimatorStateMachine machine = controller.layers[0].stateMachine;
        var clips = new List<AnimationClip>();
        foreach (Object asset in AssetDatabase.LoadAllAssetsAtPath(modelPath))
            if (asset is AnimationClip clip && !clip.name.StartsWith("__preview")) clips.Add(clip);
        for (int i = 2; i <= count; i++)
        {
            string name = "Attack " + i;
            bool exists = false;
            foreach (ChildAnimatorState child in machine.states) if (child.state.name == name) exists = true;
            if (exists) continue;
            string parameter = "IsAttack" + i;
            controller.AddParameter(parameter, AnimatorControllerParameterType.Bool);
            AnimatorState state = State(machine, clips, prefix, name, new[] { ".attack_" + i, ".attack" + i }, false, "AttackHit");
            Any(machine, state, parameter);
            Return(state, machine.defaultState);
        }
        EditorUtility.SetDirty(controller);
    }
    private static void Any(AnimatorStateMachine machine, AnimatorState state, string parameter)
    {
        AnimatorStateTransition t = machine.AddAnyStateTransition(state);
        t.hasExitTime = false; t.duration = 0.08f; t.canTransitionToSelf = false;
        t.AddCondition(AnimatorConditionMode.If, 0f, parameter);
        // A held skill bool must not restart Barrage start from its own Loop state.
        if (parameter == "IsSkill") machine.RemoveAnyStateTransition(t);
        if (parameter == "IsSkill")
            foreach (ChildAnimatorState child in machine.states)
                if (child.state.name == "Idle" || child.state.name == "Move") Transition(child.state, state, parameter, true);
    }
    private static void Transition(AnimatorState from, AnimatorState to, string parameter, bool value)
    {
        AnimatorStateTransition t = from.AddTransition(to);
        t.hasExitTime = false; t.duration = 0.08f;
        t.AddCondition(value ? AnimatorConditionMode.If : AnimatorConditionMode.IfNot, 0f, parameter);
    }
    private static void Return(AnimatorState from, AnimatorState to)
    {
        AnimatorStateTransition t = from.AddTransition(to);
        t.hasExitTime = true; t.exitTime = 0.95f; t.duration = 0.08f;
    }
    private static void SetStats(Object obj, params object[] values)
    {
        SerializedObject so = new SerializedObject(obj);
        SerializedProperty data = so.FindProperty("_data");
        if (data == null) data = so.FindProperty("Data");
        if (data == null) throw new Exception("Missing data on " + obj.name);
        for (int i = 0; i < values.Length; i += 2) data.FindPropertyRelative((string)values[i]).floatValue = (float)values[i + 1];
        so.ApplyModifiedPropertiesWithoutUndo();
    }
    private static void Set(Object obj, string field, object value)
    {
        SerializedObject so = new SerializedObject(obj);
        SerializedProperty p = so.FindProperty(field);
        if (p == null) throw new Exception("Missing field " + field + " on " + obj);
        if (value is bool b) p.boolValue = b;
        else if (value is float f) p.floatValue = f;
        else if (value is string s) p.stringValue = s;
        else p.objectReferenceValue = value as Object;
        so.ApplyModifiedPropertiesWithoutUndo();
    }
}
#endif
