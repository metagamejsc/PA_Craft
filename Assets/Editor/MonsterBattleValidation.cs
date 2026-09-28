#if UNITY_EDITOR
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;
using Object = UnityEngine.Object;

[InitializeOnLoad]
public static class MonsterBattleValidation
{
    private const string ScenePath = "Assets/_Playable_/MonsterBattle/BattleValidation.unity";
    private const string Result = "Library/MonsterBattle-validation.txt";
    private static readonly List<string> Errors = new List<string>();
    private static Monster[] _monsters;
    private static float _started;
    private static int _phase;
    private static bool _damage, _projectile, _sound, _endermanChannel, _golemChannel, _sonicChannel;
    private static Vector3 _endermanPosition;
    private static bool _teleported;
    private static readonly HashSet<MonsterType> Attackers = new HashSet<MonsterType>();
    private static bool _golemSlam;
    private static int _teleportHits;
    private static float _lastTeleportHitTime;
    private static bool _duelFinished;

    static MonsterBattleValidation()
    {
        EditorApplication.update += Update;
        EditorApplication.playModeStateChanged += StateChanged;
        Application.logMessageReceived += Log;
    }
    private static void Log(string message, string stack, LogType type)
    {
        if (!SessionState.GetBool("BattleValidation.Running", false)) return;
        if ((type == LogType.Exception || type == LogType.Error) && (stack.Contains("Playable") || message.Contains("AnimationEvent") || message.Contains("Animator")))
            Errors.Add(message + "\n" + stack);
    }

    private static void Update()
    {
        if (!EditorApplication.isPlayingOrWillChangePlaymode && !EditorApplication.isCompiling && !EditorApplication.isUpdating && !File.Exists("Library/MonsterBattle.install") && File.Exists("Library/MonsterBattle.validate"))
        {
            File.Delete("Library/MonsterBattle.validate");
            try { Start(); }
            catch (Exception e) { File.WriteAllText(Result, e.ToString()); }
        }
        if (!EditorApplication.isPlaying || !SessionState.GetBool("BattleValidation.Running", false)) return;
        try { Tick(); }
        catch (Exception e) { Errors.Add(e.ToString()); Finish(); }
    }

    [MenuItem("Tools/Playable/Validate monster battle")]
    public static void Start()
    {
        if (EditorApplication.isPlayingOrWillChangePlaymode) return;
        Errors.Clear();
        Scene previous = SceneManager.GetActiveScene();
        Scene scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, Application.isBatchMode ? NewSceneMode.Single : NewSceneMode.Additive);
        SceneManager.SetActiveScene(scene);
        GameObject cameraObject = new GameObject("Battle validation camera");
        Camera camera = cameraObject.AddComponent<Camera>();
        cameraObject.tag = "MainCamera";
        camera.transform.position = new Vector3(0f, 14f, -18f);
        camera.transform.LookAt(new Vector3(0f, 2f, 0f));
        camera.backgroundColor = new Color(0.12f, 0.17f, 0.22f);
        camera.clearFlags = CameraClearFlags.SolidColor;
        cameraObject.AddComponent<AudioListener>();
        Light light = new GameObject("Battle validation light").AddComponent<Light>();
        light.type = LightType.Directional;
        light.transform.rotation = Quaternion.Euler(50f, -25f, 0f);
        GameObject ground = GameObject.CreatePrimitive(PrimitiveType.Cube);
        ground.name = "Battle validation ground";
        ground.transform.position = Vector3.down * 0.5f;
        ground.transform.localScale = new Vector3(40f, 1f, 40f);
        EditorSceneManager.SaveScene(scene, ScenePath);
        if (!Application.isBatchMode)
        {
            EditorSceneManager.CloseScene(scene, true);
            SceneManager.SetActiveScene(previous);
        }
        SessionState.SetString("BattleValidation.PreviousStart", AssetDatabase.GetAssetPath(EditorSceneManager.playModeStartScene));
        EditorSceneManager.playModeStartScene = AssetDatabase.LoadAssetAtPath<SceneAsset>(ScenePath);
        SessionState.SetBool("BattleValidation.Running", true);
        EditorApplication.EnterPlaymode();
    }

    private static void StateChanged(PlayModeStateChange state)
    {
        if (state != PlayModeStateChange.EnteredEditMode || !SessionState.GetBool("BattleValidation.Running", false)) return;
        EditorSceneManager.playModeStartScene = AssetDatabase.LoadAssetAtPath<SceneAsset>(SessionState.GetString("BattleValidation.PreviousStart", ""));
        SessionState.SetBool("BattleValidation.Running", false);
        _monsters = null;
    }

    private static void Tick()
    {
        if (_monsters == null)
        {
            Application.runInBackground = true;
            Time.timeScale = 1f;
            UnityEngine.Random.InitState(20260928);
            _started = Time.time;
            _phase = 0;
            Errors.Clear();
            Attackers.Clear();
            _golemSlam = false;
            _teleportHits = 0;
            _lastTeleportHitTime = -1f;
            _duelFinished = false;
            _damage = _projectile = _sound = _endermanChannel = _golemChannel = _sonicChannel = _teleported = false;
            string[] names = { "Mutant Enderman", "Mutan Iron Golem", "Mutan Creeper", "Mutan Huggy", "Mutan Sonic" };
            _monsters = new Monster[5];
            MapController map = new GameObject("Validation spawn controller").AddComponent<MapController>();
            map.enabled = false;
            MethodInfo spawn = typeof(MapController).GetMethod("TrySpawnMonster", BindingFlags.Instance | BindingFlags.NonPublic);
            FieldInfo selected = typeof(MapController).GetField("_prefabMonster", BindingFlags.Instance | BindingFlags.NonPublic);
            for (int i = 0; i < 5; i++)
            {
                GameObject prefab = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/Prefabs/" + names[i] + ".prefab");
                selected.SetValue(map, prefab.GetComponent<Monster>());
                Vector3 position = i == 3 ? new Vector3(3.2f, 0f, 1f) : new Vector3((i - 2) * 2f, 0f, i % 2 == 0 ? 1f : -1f);
                Check((bool)spawn.Invoke(map, new object[] { position }), names[i] + " spawned through MapController");
                Monster monster = null;
                foreach (Monster candidate in Object.FindObjectsByType<Monster>(FindObjectsSortMode.None))
                    if (candidate.Type == prefab.GetComponent<Monster>().Type) monster = candidate;
                if (monster == null) throw new Exception("MapController did not spawn " + names[i]);
                GameObject instance = monster.gameObject;
                foreach (Renderer renderer in instance.GetComponentsInChildren<Renderer>(true))
                    foreach (Material mat in renderer.sharedMaterials)
                        if (mat == null || mat.shader == null || mat.shader.name != "Standard") Errors.Add(names[i] + " has a non-Standard/missing material");
                if (monster.Feedback == null || monster.Feedback.attackSound == null) Errors.Add(names[i] + " missing feedback/audio");
                monster.Health.IncreaseMaxHealth(1000f, true);
                monster.Health.Damaged += RecordAttack;
                _monsters[i] = monster;
            }
            Check(!(bool)spawn.Invoke(map, new object[] { Vector3.zero }), "MapController enforces spawn limit");
            float end = (float)typeof(MapController).GetField("_battleEndTime", BindingFlags.Instance | BindingFlags.NonPublic).GetValue(map);
            Check(end > Time.time, "MapController leaves time for combat before CTA");
            // A disabled opponent must not be immediately reacquired from the registry.
            for (int i = 1; i < 5; i++) _monsters[i].gameObject.SetActive(false);
            _monsters[0].Combat.RefreshTarget();
            Check(_monsters[0].Combat.CurrentEnemy == null, "Disabled monsters cannot be targeted");
            float disabledHealth = _monsters[1].Health.CurrentHealth;
            typeof(Monster).Assembly.GetType("Playable.MonsterAreaAttack").GetMethod("Apply").Invoke(null,
                new object[] { _monsters[0], Vector3.zero, 100f, 1f, 0f, 0f, 360f, 0f, 0f, 0f, 0f });
            Check(_monsters[1].Health.CurrentHealth == disabledHealth, "Area skills ignore disabled monsters");
            for (int i = 1; i < 5; i++) _monsters[i].gameObject.SetActive(true);
            _monsters[0].Combat.RefreshTarget();
            Check(_monsters[0].Combat.CurrentEnemy != null, "Reenabled monsters can be targeted");
            Monster oldTarget = _monsters[0].Combat.CurrentEnemy;
            Vector3 oldPosition = oldTarget.Position;
            oldTarget.Despawn();
            _monsters[0].Combat.RefreshTarget();
            Check(_monsters[0].Combat.CurrentEnemy != null && _monsters[0].Combat.CurrentEnemy != oldTarget, "Despawned target replaced");
            oldTarget.gameObject.SetActive(true);
            oldTarget.Spawn(oldPosition);
            oldTarget.Health.IncreaseMaxHealth(1000f, true);
            CheckChannelCancellation(_monsters[0], _monsters[3], _monsters[0].GetComponent<EndermanArmReachSkill>());
            CheckChannelCancellation(_monsters[0], _monsters[3], _monsters[0].GetComponent<EndermanTeleportSkill>());
            CheckChannelCancellation(_monsters[1], _monsters[3], _monsters[1].GetComponent<IronGolemSlamSkill>());
            CheckChannelCancellation(_monsters[1], _monsters[3], _monsters[1].GetComponent<IronGolemTntBarrageSkill>());
            CheckSonicRoar();
            CheckGolemPoison();
            CheckMeleeCombos();
            CheckSonicCone();
            // Prove Huggy can reach a physical opponent without crowd-control from four attackers.
            for (int i = 0; i < 3; i++) _monsters[i].gameObject.SetActive(false);
            typeof(Monster).GetField("_stayStillOnSpawn", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(_monsters[4], true);
            _endermanPosition = _monsters[0].Position;
            return;
        }
        float elapsed = Time.time - _started;
        if (!_duelFinished)
        {
            if (elapsed < 3f) return;
            Check(Attackers.Contains(MonsterType.Huggy), "Huggy reaches collider contact and lands melee damage");
            for (int i = 0; i < 3; i++) _monsters[i].gameObject.SetActive(true);
            typeof(Monster).GetField("_stayStillOnSpawn", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(_monsters[4], false);
            _duelFinished = true;
            _started = Time.time;
            elapsed = 0f;
        }
        for (int i = 0; i < 5; i++)
            if (elapsed < 7f && i != 4 && _monsters[i].Health.CurrentHealth < _monsters[i].Health.MaxHealth) _damage = true;
        _endermanChannel |= _monsters[0].GetComponent<EndermanArmReachSkill>().IsChanneling;
        _golemChannel |= _monsters[1].GetComponent<IronGolemTntBarrageSkill>().IsChanneling;
        _golemSlam |= _monsters[1].GetComponent<IronGolemSlamSkill>().IsChanneling;
        _sonicChannel |= _monsters[4].GetComponent<ShinsonicVortexSkill>().IsChanneling;
        if ((_monsters[0].Position - _endermanPosition).sqrMagnitude > 1f) _teleported = true;
        _endermanPosition = _monsters[0].Position;
        foreach (GameObject root in SceneManager.GetActiveScene().GetRootGameObjects())
        {
            if (root.GetComponent<MonsterProjectile>() != null && root.activeSelf) _projectile = true;
            if (root.GetComponent<MonsterBattleEffects>() != null)
                foreach (AudioSource voice in root.GetComponents<AudioSource>()) _sound |= voice.isPlaying;
        }
        // Exercise every phase without relying on battle balance/random targeting.
        if (_phase < 3 && elapsed > 1f + _phase * 1.5f)
        {
            _monsters[4].Health.TakeDamage(_monsters[3], _monsters[4].Health.MaxHealth * 0.31f);
            _phase++;
        }
        if (_phase == 3 && elapsed > 7f)
        {
            Capture("Library/MonsterBattle-preview.png");
            _phase++;
        }
        if (_phase == 4 && elapsed > 10f)
        {
            _monsters[2].Health.TakeDamage(_monsters[3], 100000f);
            _monsters[0].Health.TakeDamage(_monsters[3], 100000f);
            _phase++;
        }
        if (elapsed < 14f) return;
        Check(_damage, "Damage applied");
        Check(_projectile, "TNT fired");
        Check(_sound, "Combat audio played");
        Check(_endermanChannel, "Enderman cone skill channeled");
        Check(_teleported, "Enderman teleported");
        Check(_teleportHits >= 2, "Enderman deals damage on repeated teleport strikes");
        Check(_golemChannel, "Golem barrage channeled");
        Check(_golemSlam, "Golem slam channeled");
        foreach (Monster monster in _monsters) Check(Attackers.Contains(monster.Type), monster.Type + " dealt automatic damage (position=" + monster.Position + ", target=" + (monster.Combat.CurrentEnemy != null ? monster.Combat.CurrentEnemy.name + " at " + monster.Combat.CurrentEnemy.Position : "none") + ", stagger=" + monster.Health.StunTimeRemaining + ")");
        Check(_monsters[4].GetComponent<ShinsonicTransformSkill>().CurrentStage == 3, "Sonic reached phase 4");
        Check(_sonicChannel, "Sonic vortex channeled");
        Check(!_monsters[0].gameObject.activeSelf && !_monsters[2].gameObject.activeSelf, "Death skills finished and corpses deactivated");
        Finish();
    }

    private static void Check(bool condition, string name) { if (!condition) Errors.Add("FAIL: " + name); }
    private static void CheckChannelCancellation(Monster owner, Monster target, IMonsterSkill skill)
    {
        Vector3 previous = target.Position;
        target.transform.position = owner.Position + Vector3.forward * 0.5f;
        skill.GetType().GetField("_cooldownTimer", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(skill, 0f);
        skill.Tick(target);
        Check(skill.IsChanneling, skill.GetType().Name + " starts with an enemy in range");
        target.gameObject.SetActive(false);
        skill.Tick(target);
        Check(!skill.IsChanneling, skill.GetType().Name + " cancels when its target is disabled");
        target.gameObject.SetActive(true);
        target.transform.position = previous;
        skill.Init(owner);
    }
    private static void CheckSonicRoar()
    {
        Type type = typeof(Monster).Assembly.GetType("Playable.ShinsonicRoarSkill");
        if (type == null) { Check(false, "Sonic phase 2/3 roar available"); return; }
        IMonsterSkill roar = _monsters[4].GetComponent(type) as IMonsterSkill;
        if (roar == null) { Check(false, "Sonic roar attached on spawn"); return; }
        ShinsonicTransformSkill phase = _monsters[4].GetComponent<ShinsonicTransformSkill>();
        FieldInfo stage = phase.GetType().GetField("_currentStage", BindingFlags.Instance | BindingFlags.NonPublic);
        stage.SetValue(phase, 1);
        type.GetField("_ready", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(roar, 0f);
        roar.Tick(_monsters[3]);
        Check(roar.IsChanneling, "Sonic phase 2 starts roar near enemy");
        roar.Init(_monsters[4]);
        stage.SetValue(phase, 0);
    }
    private static void CheckGolemPoison()
    {
        GameObject prefab = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/MonsterBattle/TNT.prefab");
        Monster victim = _monsters[3];
        float before = victim.Health.CurrentHealth;
        MonsterProjectile.Spawn(prefab, victim.Position, _monsters[1], victim, 8f, 10f, 0f, 0f);
        foreach (MonsterProjectile shot in Object.FindObjectsByType<MonsterProjectile>(FindObjectsSortMode.None))
            typeof(MonsterProjectile).GetMethod("Update", BindingFlags.Instance | BindingFlags.NonPublic).Invoke(shot, null);
        float afterImpact = victim.Health.CurrentHealth;
        Check(afterImpact < before, "Golem TNT impact damages enemy");
        typeof(MonsterHealth).GetField("_poisonTickTimer", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(victim.Health, 0f);
        typeof(MonsterHealth).GetMethod("UpdatePoison", BindingFlags.Instance | BindingFlags.NonPublic).Invoke(victim.Health, null);
        Check(victim.Health.CurrentHealth < afterImpact, "Golem TNT applies damage over time");
        // Fixture-driven hits must not satisfy the automatic-attack assertions.
        Attackers.Clear();
    }
    private static void CheckMeleeCombos()
    {
        Monster golem = _monsters[1], victim = _monsters[3];
        Vector3 position = victim.Position;
        victim.transform.position = golem.Position + Vector3.forward;
        golem.transform.rotation = Quaternion.identity;
        MethodInfo hit = typeof(MonsterCombat).GetMethod("ApplyPendingAttack", BindingFlags.Instance | BindingFlags.NonPublic);
        FieldInfo pending = typeof(MonsterCombat).GetField("_pendingAttack", BindingFlags.Instance | BindingFlags.NonPublic);
        FieldInfo target = typeof(MonsterCombat).GetField("_attackTarget", BindingFlags.Instance | BindingFlags.NonPublic);
        FieldInfo combo = typeof(MonsterCombat).GetField("_pendingComboIndex", BindingFlags.Instance | BindingFlags.NonPublic);
        if (combo == null) { victim.transform.position = position; Check(false, "Golem three-hit combo implemented"); return; }
        float[] expected = { 18f, 22f, 27f };
        for (int i = 0; i < 3; i++)
        {
            float before = victim.Health.CurrentHealth;
            target.SetValue(golem.Combat, victim);
            pending.SetValue(golem.Combat, Enum.ToObject(pending.FieldType, 1));
            combo.SetValue(golem.Combat, i);
            hit.Invoke(golem.Combat, null);
            Check(Mathf.Abs(before - victim.Health.CurrentHealth - expected[i]) < 0.01f, "Golem combo strike " + (i + 1) + " damage");
        }
        victim.transform.position = position;
        victim.Health.Init(victim.Health.MaxHealth);
        Attackers.Clear();
    }
    private static void CheckSonicCone()
    {
        Monster sonic = _monsters[4];
        ShinsonicTransformSkill phase = sonic.GetComponent<ShinsonicTransformSkill>();
        FieldInfo stage = phase.GetType().GetField("_currentStage", BindingFlags.Instance | BindingFlags.NonPublic);
        Vector3[] positions = new Vector3[3];
        Monster[] victims = { _monsters[3], _monsters[2], _monsters[0] };
        for (int i = 0; i < victims.Length; i++) positions[i] = victims[i].Position;
        for (int currentStage = 2; currentStage <= 3; currentStage++)
        {
            stage.SetValue(phase, currentStage);
            sonic.transform.rotation = Quaternion.identity;
            victims[0].transform.position = sonic.Position + Vector3.forward * 2f;
            victims[1].transform.position = sonic.Position + new Vector3(0.5f, 0f, 2f);
            victims[2].transform.position = sonic.Position - Vector3.forward * 2f;
            float[] health = { victims[0].Health.CurrentHealth, victims[1].Health.CurrentHealth, victims[2].Health.CurrentHealth };
            FieldInfo pending = typeof(MonsterCombat).GetField("_pendingAttack", BindingFlags.Instance | BindingFlags.NonPublic);
            pending.SetValue(sonic.Combat, Enum.ToObject(pending.FieldType, 1));
            typeof(MonsterCombat).GetField("_attackTarget", BindingFlags.Instance | BindingFlags.NonPublic).SetValue(sonic.Combat, victims[0]);
            typeof(MonsterCombat).GetMethod("ApplyPendingAttack", BindingFlags.Instance | BindingFlags.NonPublic).Invoke(sonic.Combat, null);
            Check(victims[0].Health.CurrentHealth < health[0] && victims[1].Health.CurrentHealth < health[1]
                && victims[2].Health.CurrentHealth == health[2], "Sonic phase " + (currentStage + 1) + " damages cone, not enemies behind");
        }
        for (int i = 0; i < victims.Length; i++)
        {
            victims[i].transform.position = positions[i];
            victims[i].Health.Init(victims[i].Health.MaxHealth);
        }
        stage.SetValue(phase, 0);
        Attackers.Clear();
    }
    private static void RecordAttack(Monster attacker, float damage)
    {
        // Forced Sonic phase/death damage in this fixture must not count as AI attacks.
        if (attacker != null && damage < 100f) Attackers.Add(attacker.Type);
        if (attacker != null && attacker.Type == MonsterType.Enderman
            && attacker.GetComponent<EndermanTeleportSkill>().IsChanneling && _lastTeleportHitTime != Time.time)
        {
            _teleportHits++;
            _lastTeleportHitTime = Time.time;
        }
    }
    private static void Finish()
    {
        File.WriteAllText(Result, Errors.Count == 0 ? "PASS: MapController spawn/limit/battle delay; disabled target/area filtering and channel cancellation; despawn/retarget; automatic damage from all five types; Huggy collider-contact melee; TNT and audio; Enderman beam + repeated teleport hits; Golem three-hit combo, slam, barrage and TNT DOT; Sonic phase 2 roar, phase 3/4 cones, transformations and vortex; death cleanup; Standard materials.\n" : string.Join("\n", Errors));
        EditorApplication.ExitPlaymode();
        if (Application.isBatchMode) EditorApplication.delayCall += () => EditorApplication.Exit(Errors.Count == 0 ? 0 : 1);
    }
    private static void Capture(string path)
    {
        Camera camera = Camera.main;
        RenderTexture target = new RenderTexture(1280, 720, 24);
        camera.targetTexture = target;
        camera.Render();
        RenderTexture.active = target;
        Texture2D image = new Texture2D(1280, 720, TextureFormat.RGB24, false);
        image.ReadPixels(new Rect(0, 0, 1280, 720), 0, 0);
        image.Apply();
        File.WriteAllBytes(path, image.EncodeToPNG());
        camera.targetTexture = null;
        RenderTexture.active = null;
        Object.Destroy(image);
        Object.Destroy(target);
    }
}
#endif
