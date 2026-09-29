using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using Playable;
using UnityEditor;
using UnityEngine;
using Object = UnityEngine.Object;

// Opt-in real-time play-mode smoke check, invoked through MCP. Does not modify saved scene data.
[InitializeOnLoad]
public static class PetGameplayChecks
{
    private const BindingFlags Private = BindingFlags.Instance | BindingFlags.NonPublic;
    private static readonly List<string> Results = new List<string>();
    private static Monster[] creatures;
    private static PetNeeds rabbit;
    private static MapController map;
    private static Camera worldCamera;
    private static float started;
    private static int stage;
    private static Vector3 initialRabbitPosition;

    static PetGameplayChecks() { EditorApplication.playModeStateChanged += OnState; }
    public static void Run()
    {
        SessionState.SetBool("PetGameplayChecks.Run", true);
        EditorApplication.isPlaying = true;
    }
    private static void OnState(PlayModeStateChange state)
    {
        if (state == PlayModeStateChange.EnteredPlayMode && SessionState.GetBool("PetGameplayChecks.Run", false))
        {
            SessionState.SetBool("PetGameplayChecks.Run", false);
            Results.Clear(); stage = 0; started = Time.time;
            EditorApplication.update += Tick;
        }
        if (state == PlayModeStateChange.ExitingPlayMode) EditorApplication.update -= Tick;
    }
    private static void Check(bool pass, string description)
    {
        Results.Add((pass ? "PASS " : "FAIL ") + description);
        File.WriteAllLines("Temp/PetGameplayChecks.txt", Results);
    }
    private static void Tick()
    {
        if (!EditorApplication.isPlaying || EditorApplication.isPaused) return;
        try
        {
            if (stage == 0 && Time.time - started > 0.5f)
            {
                var gm = GameManager.Instance;
                gm.StopAllCoroutines();
                var so = new SerializedObject(gm); so.FindProperty("_ignoreCountEvent").boolValue = true; so.ApplyModifiedPropertiesWithoutUndo();
                map = Object.FindFirstObjectByType<MapController>();
                worldCamera = (Camera)new SerializedObject(map).FindProperty("_worldCamera").objectReferenceValue;
                var player = Object.FindFirstObjectByType<PlayerController>();
                var playerData = new SerializedObject(player);
                var model = (Transform)playerData.FindProperty("_modelPlayer").objectReferenceValue;
                var mount = (Transform)playerData.FindProperty("_mountPoint").objectReferenceValue;
                var horse = (GameObject)playerData.FindProperty("_horse").objectReferenceValue;
                Check(player.IsMounted && horse.activeSelf && model.parent == mount, "Player starts on the horse with the model attached to its mount");
                Check(typeof(MapController).GetField("_tutorialStep", Private).GetValue(map).ToString() == "WaitHotbar0", "Tutorial skips mounting and starts at the first hotbar slot");
                Check(((Animator)playerData.FindProperty("_animator").objectReferenceValue).GetBool("IsTransform"), "Mounted animation is enabled at startup");
                typeof(PlayerController).GetMethod("ToggleTransform", Private).Invoke(player, null);
                Check(!player.IsMounted && !horse.activeSelf && model.parent == player.transform, "Player can still dismount");
                typeof(PlayerController).GetMethod("ToggleTransform", Private).Invoke(player, null);
                Check(player.IsMounted && horse.activeSelf && model.parent == mount, "Player can mount again after dismounting");
                typeof(MapController).GetMethod("EnterGameplay", Private).Invoke(map, null);
                string[] names = { "Verity", "Gugugaga", "Rabbit", "Pig", "Fox", "Dog" };
                // Use a non-default delay through the real MapController spawning path.
                typeof(MapController).GetField("_animalHungerDelay", Private).SetValue(map, 1.5f);
                creatures = new Monster[names.Length];
                for (int i = 0; i < names.Length; i++)
                {
                    var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(PetSceneSetup.Output + "/Prefabs/" + names[i] + ".prefab");
                    var before = Object.FindObjectsByType<Monster>(FindObjectsSortMode.None);
                    typeof(MapController).GetField("_prefabMonster", Private).SetValue(map, prefab.GetComponent<Monster>());
                    typeof(MapController).GetMethod("TrySpawnMonster", Private).Invoke(map, new object[] {
                        player.transform.position + player.transform.forward * 5f + player.transform.right * ((i - 2) * 1.6f) });
                    var instance = Object.FindObjectsByType<Monster>(FindObjectsSortMode.None).Except(before).Single();
                    creatures[i] = instance;
                }
                rabbit = creatures[2].GetComponent<PetNeeds>();
                Check(creatures.Skip(2).All(c =>
                    ((UnityEngine.UI.Image)new SerializedObject(c.GetComponentInChildren<PetStatusView>()).FindProperty("_fill").objectReferenceValue).fillAmount == 0f),
                    "Original animal healthbars start empty");
                Check(creatures.Skip(2).All(c => c.GetComponent<AnimalAudio>() != null &&
                    new SerializedObject(c.GetComponent<AnimalAudio>()).FindProperty("_calls").arraySize > 0), "All four pets have configured animal sounds");
                initialRabbitPosition = rabbit.transform.position;
                Check(!rabbit.IsHungry && !rabbit.TryFeed(), "Freshly spawned animal waits before accepting food");
                Check(creatures[0].GetComponent<PetNeeds>() == null && creatures[1].GetComponent<PetNeeds>() == null, "Verity and Gugugaga are not feedable");
                started = Time.time; stage = 4;
            }
            else if (stage == 4 && Time.time - started > 0.75f)
            {
                Check(creatures.Skip(2).All(c => !c.GetComponent<PetNeeds>().IsHungry), "All animals wait for the configured shared hunger delay");
                stage = 1;
            }
            else if (stage == 1 && Time.time - started > 1.8f)
            {
                Check(creatures.Skip(2).All(c => c.GetComponent<PetNeeds>().IsHungry), "All four animals use MapController's custom 1.5-second hunger delay");
                Check((rabbit.transform.position - initialRabbitPosition).sqrMagnitude > 0.01f, "Rabbit moves after spawning");
                var prompt = (TMPro.TMP_Text)new SerializedObject(map).FindProperty("_hintText").objectReferenceValue;
                Check(prompt.gameObject.activeInHierarchy && prompt.text == "Feed your pet", "MapController Hint Text displays Feed your pet outside the hidden tutorial blur");
                Check(creatures.Skip(2).All(c => c.GetComponentInChildren<PetStatusView>().GetComponentsInChildren<TMPro.TMP_Text>(true).Length == 0), "Animals have bars only, without local labels or numeric counters");
                // Arrange an unoccluded screen-space target; overlapped pets correctly select the nearer collider.
                var feedingPlayer = Object.FindFirstObjectByType<PlayerController>();
                rabbit.transform.position = feedingPlayer.transform.position + feedingPlayer.transform.forward * 3f;
                for (int i = 0; i < creatures.Length; i++)
                    if (i != 2) creatures[i].transform.position += feedingPlayer.transform.right * 8f;
                Physics.SyncTransforms();
                var camera = worldCamera;
                var collider = rabbit.GetComponent<Collider>();
                Vector3 screen = camera.WorldToScreenPoint(collider.bounds.center);
                bool hit = (bool)typeof(MapController).GetMethod("TryInteractWithPet", Private).Invoke(map, new object[] { (Vector2)screen });
                Check(hit && rabbit.Food == 1, "Screen-space tap feeds the selected rabbit exactly once");
                Check(rabbit.GetComponent<AudioSource>().isPlaying, "Feeding plays the rabbit's animal call");
                Check(creatures[3].GetComponent<PetNeeds>().Food == 0, "Tapping rabbit does not feed pig");
                Check(rabbit.TryFeed() && rabbit.Food == 2, "Second meal increments to 2/3");
                Check(rabbit.TryFeed() && rabbit.Food == 3 && !rabbit.IsHungry, "Third meal fills animal to 3/3");
                Check(!rabbit.TryFeed() && rabbit.Food == 3, "Full animal rejects extra food");
                Check(rabbit.GetComponentInChildren<ParticleSystem>().isPlaying, "Full animal emits heart VFX");
                Check(PetNeeds.AnyHungry && prompt.gameObject.activeInHierarchy, "Shared prompt remains while other animals are hungry");
                initialRabbitPosition = rabbit.transform.position;
                started = Time.time; stage = 2;
            }
            else if (stage == 2 && Time.time - started > 4.5f)
            {
                Check(!rabbit.IsHungry && rabbit.IsFull && rabbit.Food == 3 && !rabbit.TryFeed(), "Full animal stays full beyond the hunger delay and rejects more food");
                var fill = (UnityEngine.UI.Image)new SerializedObject(rabbit.GetComponentInChildren<PetStatusView>()).FindProperty("_fill").objectReferenceValue;
                Check(Mathf.Approximately(fill.fillAmount, 1f) && fill.type == UnityEngine.UI.Image.Type.Filled,
                    "Original healthbar fill reaches 100 percent after three meals");
                var player = Object.FindFirstObjectByType<PlayerController>();
                var ps = new SerializedObject(player);
                var animator = (Animator)ps.FindProperty("_animator").objectReferenceValue;
                Check(animator != null && animator.runtimeAnimatorController.name == "Girl Player", "Gameplay uses girl animator and copied controller");
                Check(animator.runtimeAnimatorController.animationClips.All(c => c.name.StartsWith("Girl ")), "All six player states use retargeted clips");
                ScreenCapture.CaptureScreenshot("Temp/PetChecks/play-mode.png");
                foreach (var creature in creatures.Skip(2))
                {
                    var pet = creature.GetComponent<PetNeeds>();
                    while (pet.IsHungry) pet.TryFeed();
                }
                Check(!PetNeeds.AnyHungry, "Shared hunger state clears when every animal is full");
                started = Time.time; stage = 3;
            }
            else if (stage == 3 && Time.time - started > 0.2f)
            {
                var prompt = (TMPro.TMP_Text)new SerializedObject(map).FindProperty("_hintText").objectReferenceValue;
                Check(!prompt.gameObject.activeSelf, "Shared prompt hides after the last hungry animal is fed");
                EditorApplication.update -= Tick;
                Debug.Log("Pet checks complete: " + Results.Count + "; failures=" + Results.Count(x => x.StartsWith("FAIL")));
            }
        }
        catch (Exception e)
        {
            Check(false, e.ToString());
            EditorApplication.update -= Tick;
        }
    }
}
