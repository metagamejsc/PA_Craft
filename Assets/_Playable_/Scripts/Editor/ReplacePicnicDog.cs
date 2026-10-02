using System;
using System.Linq;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

public static class ReplacePicnicDog
{
    const string Source = "Assets/Game/Voxel Play/Resources/Prefabs/Animals/Dog.prefab";
    static Bounds BoundsOf(GameObject model)
    {
        var renderers = model.GetComponentsInChildren<Renderer>();
        var bounds = renderers[0].bounds;
        foreach (var renderer in renderers) bounds.Encapsulate(renderer.bounds);
        return bounds;
    }
    static void Curve(AnimationClip clip, string path, string property, params float[] values)
    {
        var keys = new Keyframe[values.Length / 2];
        for (int i = 0; i < keys.Length; i++) keys[i] = new Keyframe(values[2*i],values[2*i+1]);
        clip.SetCurve(path, typeof(Transform), property, new AnimationCurve(keys));
    }
    static void Rotation(AnimationClip clip, Transform bone, Transform root, Quaternion rotation, float duration)
    {
        string path = AnimationUtility.CalculateTransformPath(bone,root);
        for(int i=0;i<4;i++) Curve(clip,path,"localRotation."+"xyzw"[i],0,rotation[i],duration,rotation[i]);
    }
    [MenuItem("Tools/Picnic/Replace With Voxel Dog")]
    public static void Apply()
    {
        if(Application.isPlaying) throw new Exception("Exit Play Mode before replacing the dog.");
        var controller=Object.FindFirstObjectByType<Playable.GameController>();
        var pet=controller.Pets[2];
        var asset=AssetDatabase.LoadAssetAtPath<GameObject>(Source);
        var model=(GameObject)PrefabUtility.InstantiatePrefab(asset,pet.Root);
        PrefabUtility.UnpackPrefabInstance(model,PrefabUnpackMode.Completely,InteractionMode.AutomatedAction);
        model.name="New Dog Model";
        var animator=model.GetComponentInChildren<Animator>(true);
        var idle=animator.runtimeAnimatorController.animationClips.First(c=>c.name.Contains("Idle"));
        idle.SampleAnimation(animator.gameObject,0);
        foreach(var t in model.GetComponentsInChildren<Transform>(true)) GameObjectUtility.RemoveMonoBehavioursWithMissingScript(t.gameObject);
        foreach(var behaviour in model.GetComponentsInChildren<MonoBehaviour>(true)) Object.DestroyImmediate(behaviour);
        foreach(var canvas in model.GetComponentsInChildren<Canvas>(true)) Object.DestroyImmediate(canvas.gameObject);
        foreach(var collider in model.GetComponentsInChildren<Collider>(true)) Object.DestroyImmediate(collider);
        foreach(var body in model.GetComponentsInChildren<Rigidbody>(true)) Object.DestroyImmediate(body);
        foreach(var audio in model.GetComponentsInChildren<AudioSource>(true)) Object.DestroyImmediate(audio);
        foreach(var anim in model.GetComponentsInChildren<Animator>(true)) Object.DestroyImmediate(anim);
        model.transform.localPosition=Vector3.zero;
        model.transform.localRotation=Quaternion.identity;
        var bounds=BoundsOf(model);
        model.transform.localScale*=.85f/Mathf.Max(bounds.size.x,bounds.size.y,bounds.size.z);
        bounds=BoundsOf(model);
        model.transform.position+=new Vector3(pet.Root.position.x-bounds.center.x,pet.Root.position.y-bounds.min.y,pet.Root.position.z-bounds.center.z);
        var old=pet.Root.Find("Model");if(old!=null)Object.DestroyImmediate(old.gameObject);
        model.name="Model";
        var clips=new AnimationClip[3];
        string[] names={"Sit","Jump","PlayBall"};
        for(int i=0;i<3;i++)
        {
            string path="Assets/_Playable_/Picnic/Voxel Dog "+names[i]+".anim";
            var clip=AssetDatabase.LoadAssetAtPath<AnimationClip>(path);
            if(clip==null){clip=new AnimationClip();AssetDatabase.CreateAsset(clip,path);}
            clip.ClearCurves();clip.name=names[i];clip.legacy=true;clip.wrapMode=i==0?WrapMode.Loop:WrapMode.ClampForever;
            float duration=i==2?2.2f:1.2f;
            foreach(var bone in model.GetComponentsInChildren<Transform>())
            {
                float angle=bone.name=="thigh.L"||bone.name=="thigh.R"?-25:bone.name=="hind_foot.L"||bone.name=="hind_foot.R"?25:0;
                if(angle==0)continue;
                var q=Quaternion.AngleAxis(angle,bone.parent.InverseTransformDirection(pet.Root.right))*bone.localRotation;
                Rotation(clip,bone,pet.Root,q,duration);
            }
            Vector3 pos=model.transform.localPosition;
            Curve(clip,"Model","localPosition.x",0,pos.x,duration,pos.x);
            Curve(clip,"Model","localPosition.z",0,pos.z,duration,pos.z);
            if(i==0) Curve(clip,"Model","localPosition.y",0,pos.y,.6f,pos.y+.01f,1.2f,pos.y);
            else Curve(clip,"Model","localPosition.y",0,pos.y,duration*.25f,pos.y+.15f,duration*.5f,pos.y,duration*.75f,pos.y+.08f,duration,pos.y);
            if(i==2)
            {
                var tail=model.GetComponentsInChildren<Transform>().FirstOrDefault(t=>t.name=="tail.001");
                if(tail!=null)
                {
                    string tailPath=AnimationUtility.CalculateTransformPath(tail,pet.Root);
                    float z=tail.localEulerAngles.z;
                    Curve(clip,tailPath,"localEulerAnglesRaw.z",0,z,.25f,z+22,.5f,z-22,.75f,z+22,1,z-22,1.25f,z+22,1.5f,z-22,1.75f,z+22,2.2f,z);
                }
            }
            clip.EnsureQuaternionContinuity();EditorUtility.SetDirty(clip);clips[i]=clip;
        }
        var so=new SerializedObject(pet.Animation);var list=so.FindProperty("m_Animations");list.arraySize=3;
        for(int i=0;i<3;i++)list.GetArrayElementAtIndex(i).objectReferenceValue=clips[i];
        so.FindProperty("m_Animation").objectReferenceValue=clips[0];so.ApplyModifiedPropertiesWithoutUndo();
        foreach(var clip in clips)pet.Animation.AddClip(clip,clip.name);
        clips[0].SampleAnimation(pet.Root.gameObject,0);
        bounds=BoundsOf(model);var box=(BoxCollider)pet.Hitbox;
        box.center=pet.Root.InverseTransformPoint(bounds.center);box.size=new Vector3(.95f,Mathf.Max(.85f,bounds.size.y),.95f);
        var face=pet.CryingFace.transform;face.localPosition=new Vector3(0,bounds.max.y-pet.Root.position.y+.35f,0);
        pet.ServingPoint.position=new Vector3(pet.Root.position.x,pet.ServingPoint.position.y,pet.Root.position.z)+pet.Root.forward*.75f;
        EditorUtility.SetDirty(controller);AssetDatabase.SaveAssets();EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);EditorSceneManager.SaveScene(controller.gameObject.scene);
    }
}
