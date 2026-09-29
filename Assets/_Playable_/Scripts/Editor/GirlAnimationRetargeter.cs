using System;
using System.Collections.Generic;
using System.Linq;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

// Bake the existing generic player clips into the Minecraft girl's rigid limb hierarchy.
// Rotation deltas are transferred in model space; bind offsets and limb lengths stay intact.
public static class GirlAnimationRetargeter
{
    private sealed class Joint
    {
        public Transform Source, Target;
        public Quaternion SourceRest, TargetRest;
        public AnimationCurve[] Curves = { new AnimationCurve(), new AnimationCurve(), new AnimationCurve(), new AnimationCurve() };
        public Quaternion Previous;
    }

    public static string Build()
    {
        var player = Object.FindFirstObjectByType<PlayerController>();
        var so = new SerializedObject(player);
        var oldModel = (Transform)so.FindProperty("_modelPlayer").objectReferenceValue;
        var oldAnimator = (Animator)so.FindProperty("_animator").objectReferenceValue;
        if (oldModel.name == "Girl Player")
        {
            var originalPlayer = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/_Playable_/Prefabs/Player.prefab");
            oldAnimator = originalPlayer.GetComponentsInChildren<Animator>(true).First(a => a.runtimeAnimatorController != null && a.runtimeAnimatorController.name == "S_Base_03");
        }
        var sourceController = oldAnimator.runtimeAnimatorController;
        var clips = sourceController.animationClips.Distinct().ToArray();
        var source = Object.Instantiate(oldAnimator.gameObject);
        var target = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(PetSceneSetup.Girl));
        try
        {
            source.transform.position = Vector3.zero;
            source.transform.rotation = Quaternion.identity;
            source.transform.localScale = Vector3.one;
            source.GetComponent<Animator>().enabled = false;
            target.transform.position = Vector3.zero;
            target.transform.rotation = Quaternion.Euler(0, 180, 0);
            target.transform.localScale = Vector3.one;
            target.GetComponent<Animator>().enabled = false;
            var idle = clips.First(c => c.name == "Idle");
            idle.SampleAnimation(source, 0);
            string[] sourceNames = { "body", "head", "upper_arm.L", "upper_arm.R", "thigh.L", "thigh.R" };
            string[] targetNames = { "bone_23", "Head_15", "LeftArm_18", "RightArm_21", "LeftLeg_2", "RightLeg_5" };
            var joints = new List<Joint>();
            for (int i = 0; i < sourceNames.Length; i++)
            {
                var s = source.GetComponentsInChildren<Transform>(true).First(t => t.name == sourceNames[i]);
                var t = target.GetComponentsInChildren<Transform>(true).First(x => x.name == targetNames[i]);
                joints.Add(new Joint { Source = s, Target = t, SourceRest = s.rotation, TargetRest = t.rotation });
            }
            var hip = source.GetComponentsInChildren<Transform>(true).First(t => t.name == "Hip");
            var targetRoot = target.GetComponentsInChildren<Transform>(true).First(t => t.name == "player1_24");
            Vector3 hipRest = hip.position;
            Vector3 targetPosition = targetRoot.localPosition;
            var replacements = new List<KeyValuePair<AnimationClip, AnimationClip>>();
            foreach (var original in clips)
            {
                var baked = new AnimationClip { name = "Girl " + original.name, frameRate = 30 };
                foreach (var joint in joints)
                    joint.Curves = new[] { new AnimationCurve(), new AnimationCurve(), new AnimationCurve(), new AnimationCurve() };
                var positions = new[] { new AnimationCurve(), new AnimationCurve(), new AnimationCurve() };
                int frames = Mathf.Max(1, Mathf.CeilToInt(original.length * 30));
                for (int frame = 0; frame <= frames; frame++)
                {
                    float time = original.length * frame / frames;
                    original.SampleAnimation(source, time);
                    // Parent joints are updated before their children so local curves compensate for torso motion.
                    foreach (var joint in joints)
                    {
                        Quaternion delta = joint.Source.rotation * Quaternion.Inverse(joint.SourceRest);
                        joint.Target.rotation = delta * joint.TargetRest;
                        Quaternion q = joint.Target.localRotation;
                        if (frame > 0 && Quaternion.Dot(joint.Previous, q) < 0) q = new Quaternion(-q.x, -q.y, -q.z, -q.w);
                        joint.Previous = q;
                        joint.Curves[0].AddKey(time, q.x); joint.Curves[1].AddKey(time, q.y);
                        joint.Curves[2].AddKey(time, q.z); joint.Curves[3].AddKey(time, q.w);
                    }
                    Vector3 offset = hip.position - hipRest;
                    // Copy vertical bounce only; locomotion and jump translation are owned by PlayerController.
                    Vector3 position = targetPosition + Vector3.up * offset.y;
                    positions[0].AddKey(time, position.x); positions[1].AddKey(time, position.y); positions[2].AddKey(time, position.z);
                }
                foreach (var joint in joints)
                {
                    string path = AnimationUtility.CalculateTransformPath(joint.Target, target.transform);
                    string[] axes = { "x", "y", "z", "w" };
                    for (int i = 0; i < 4; i++) baked.SetCurve(path, typeof(Transform), "localRotation." + axes[i], joint.Curves[i]);
                }
                string rootPath = AnimationUtility.CalculateTransformPath(targetRoot, target.transform);
                for (int i = 0; i < 3; i++) baked.SetCurve(rootPath, typeof(Transform), "localPosition." + "xyz"[i], positions[i]);
                baked.EnsureQuaternionContinuity();
                var settings = AnimationUtility.GetAnimationClipSettings(original);
                settings.loopTime = original.name != "Jump";
                AnimationUtility.SetAnimationClipSettings(baked, settings);
                string dest = PetSceneSetup.Output + "/Animations/" + baked.name + ".anim";
                var existing = AssetDatabase.LoadAssetAtPath<AnimationClip>(dest);
                if (existing != null) { EditorUtility.CopySerialized(baked, existing); Object.DestroyImmediate(baked); baked = existing; }
                else AssetDatabase.CreateAsset(baked, dest);
                replacements.Add(new KeyValuePair<AnimationClip, AnimationClip>(original, baked));
            }
            string controllerPath = PetSceneSetup.Output + "/Animations/Girl Player.overrideController";
            var controller = AssetDatabase.LoadAssetAtPath<AnimatorOverrideController>(controllerPath);
            if (controller == null) { controller = new AnimatorOverrideController(sourceController); AssetDatabase.CreateAsset(controller, controllerPath); }
            controller.runtimeAnimatorController = sourceController;
            controller.ApplyOverrides(replacements);
            // A neutral parent preserves PlayerController's mounting/reparenting behavior.
            var wrapper = new GameObject("Girl Player");
            wrapper.transform.SetParent(player.transform, false);
            var model = Object.Instantiate(AssetDatabase.LoadAssetAtPath<GameObject>(PetSceneSetup.Girl), wrapper.transform);
            model.name = "Girl Visual";
            PetSceneSetup.ConvertImportedMaterials(model, "Girl Player");
            model.transform.localPosition = Vector3.zero;
            model.transform.localRotation = Quaternion.Euler(0, 180, 0);
            var animator = model.GetComponent<Animator>();
            animator.runtimeAnimatorController = controller; animator.applyRootMotion = false;
            animator.cullingMode = AnimatorCullingMode.AlwaysAnimate;
            replacements.First(x => x.Key.name == "Idle").Value.SampleAnimation(model, 0);
            PetSceneSetup.Set(player, "_modelPlayer", wrapper.transform);
            PetSceneSetup.Set(player, "_animator", animator);
            Undo.RegisterCreatedObjectUndo(wrapper, "Install girl player");
            Undo.DestroyObjectImmediate(oldModel.gameObject);
            PrefabUtility.RecordPrefabInstancePropertyModifications(player);
            AssetDatabase.SaveAssets();
            EditorSceneManager.MarkSceneDirty(player.gameObject.scene);
            EditorSceneManager.SaveScene(player.gameObject.scene);
            return "Baked " + replacements.Count + " clips: " + string.Join(", ", replacements.Select(x => x.Key.name)) + "; installed girl model in Gameplay.";
        }
        finally { Object.DestroyImmediate(source); Object.DestroyImmediate(target); }
    }
}
