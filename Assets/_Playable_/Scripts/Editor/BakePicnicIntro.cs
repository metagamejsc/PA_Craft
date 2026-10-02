using System;
using System.Linq;
using Playable;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using Object = UnityEngine.Object;

public static class BakePicnicIntro
{
    [MenuItem("Tools/Picnic/Bake Intro For Luna")]
    public static void Bake()
    {
        if (Application.isPlaying) throw new Exception("Exit Play Mode before baking.");
        var controller=Object.FindFirstObjectByType<GameController>();
        var walk=controller.PlayerAnimation.GetClip("Walk");
        var sit=controller.PlayerAnimation.GetClip("SitDown");
        if(walk==null||sit==null)throw new Exception("Missing source intro clips.");
        var paths=AnimationUtility.GetCurveBindings(walk).Concat(AnimationUtility.GetCurveBindings(sit))
            .Where(b=>b.type==typeof(Transform)).Select(b=>b.path).Distinct().ToArray();
        controller.WalkPose=BakeClip(controller.PlayerVisual,walk,paths);
        controller.SitPose=BakeClip(controller.PlayerVisual,sit,paths);
        EditorUtility.SetDirty(controller);
        EditorSceneManager.MarkSceneDirty(controller.gameObject.scene);
        EditorSceneManager.SaveScene(controller.gameObject.scene);
    }
    static GameController.PlayerPoseClip BakeClip(Transform root,AnimationClip clip,string[] paths)
    {
        var holder=new GameObject("Temporary intro bake");
        try
        {
            var clone=Object.Instantiate(root.gameObject,holder.transform);
            foreach(var a in clone.GetComponentsInChildren<Animation>(true))a.enabled=false;
            int frames=Mathf.CeilToInt(clip.length*30)+1;
            var result=new GameController.PlayerPoseClip { Duration=clip.length,FrameCount=frames,
                Tracks=new GameController.PlayerPoseTrack[paths.Length] };
            var samples=new Transform[paths.Length];
            for(int i=0;i<paths.Length;i++)
            {
                var target=paths[i].Length==0?root:root.Find(paths[i]);
                samples[i]=paths[i].Length==0?clone.transform:clone.transform.Find(paths[i]);
                if(target==null||samples[i]==null)throw new Exception("Unresolved animation target: "+paths[i]);
                result.Tracks[i]=new GameController.PlayerPoseTrack {Target=target,
                    Positions=new Vector3[frames],Rotations=new Quaternion[frames]};
            }
            for(int frame=0;frame<frames;frame++)
            {
                clip.SampleAnimation(clone,clip.length*frame/(frames-1));
                for(int i=0;i<paths.Length;i++)
                {
                    result.Tracks[i].Positions[frame]=samples[i].localPosition;
                    result.Tracks[i].Rotations[frame]=samples[i].localRotation;
                }
            }
            return result;
        }
        finally {Object.DestroyImmediate(holder);}
    }
}
