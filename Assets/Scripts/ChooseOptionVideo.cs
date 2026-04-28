using System;
using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class ChooseOptionVideo : MonoBehaviour
{
    [Serializable]
    private class ChoiceScene
    {
        public GameObject sceneRoot;
        public Button optionButton1;
        public Button optionButton2;
        public GameObject option1Object;
        public GameObject option2Object;
    }

    [Header("Scenes")]
    [SerializeField] private ChoiceScene[] scenes;

    [Header("Timing")]
    [SerializeField] private float nextSceneDelay = 3f;

    private int currentSceneIndex;
    private Coroutine nextSceneRoutine;

    private void Awake()
    {
        for (int i = 0; i < scenes.Length; i++)
        {
            int sceneIndex = i;

            if (scenes[i].optionButton1 != null)
                scenes[i].optionButton1.onClick.AddListener(() => ChooseOption(sceneIndex, 0));

            if (scenes[i].optionButton2 != null)
                scenes[i].optionButton2.onClick.AddListener(() => ChooseOption(sceneIndex, 1));
        }
    }

    private void Start()
    {
        currentSceneIndex = 0;
        OpenScene(currentSceneIndex);
    }

    public void ChooseOption(int sceneIndex, int optionIndex)
    {
        if (sceneIndex != currentSceneIndex) return;
        if (sceneIndex < 0 || sceneIndex >= scenes.Length) return;

        SetButtonsInteractable(scenes[sceneIndex], false);

        if (optionIndex == 0)
        {
            SetActiveSafe(scenes[sceneIndex].option1Object, true);
            SetActiveSafe(scenes[sceneIndex].option2Object, false);
        }
        else
        {
            SetActiveSafe(scenes[sceneIndex].option1Object, false);
            SetActiveSafe(scenes[sceneIndex].option2Object, true);
        }

        if (nextSceneRoutine != null)
            StopCoroutine(nextSceneRoutine);

        nextSceneRoutine = StartCoroutine(OpenNextSceneAfterDelay());
        LunaManager.ins.CheckShowEndCard(currentSceneIndex + 1);
    }

    private IEnumerator OpenNextSceneAfterDelay()
    {
        yield return new WaitForSeconds(nextSceneDelay);

        nextSceneRoutine = null;

        if (currentSceneIndex >= scenes.Length - 1)
            yield break;

        currentSceneIndex++;
        OpenScene(currentSceneIndex);

    }

    private void OpenScene(int sceneIndex)
    {
        HideAllScenes();

        if (sceneIndex < 0 || sceneIndex >= scenes.Length)
            return;

        ChoiceScene scene = scenes[sceneIndex];

        SetActiveSafe(scene.sceneRoot, true);
        SetActiveSafe(scene.option1Object, false);
        SetActiveSafe(scene.option2Object, false);
        SetButtonsInteractable(scene, true);

        Debug.Log($"done - scene {sceneIndex + 1}");

    }

    private void HideAllScenes()
    {
        for (int i = 0; i < scenes.Length; i++)
        {
            SetActiveSafe(scenes[i].sceneRoot, false);
            SetActiveSafe(scenes[i].option1Object, false);
            SetActiveSafe(scenes[i].option2Object, false);
        }
    }

    private void SetButtonsInteractable(ChoiceScene scene, bool interactable)
    {
        if (scene.optionButton1 != null)
            scene.optionButton1.interactable = interactable;

        if (scene.optionButton2 != null)
            scene.optionButton2.interactable = interactable;
    }

    private void SetActiveSafe(GameObject target, bool active)
    {
        if (target != null)
            target.SetActive(active);
    }
}
