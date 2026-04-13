using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

[DisallowMultipleComponent]
public class CharacterSwitchController : MonoBehaviour
{
    [Header("References")]
    [SerializeField] private List<Transform> characterRoots = new List<Transform>();
    [SerializeField] private RawImage previewRawImage;
    [SerializeField] private Button leftButton;
    [SerializeField] private Button rightButton;
    [SerializeField] private Text nameLabel;
    [SerializeField] private bool autoDiscoverCharacters = true;
    [SerializeField] private int initialCharacterIndex;

    [Header("Switch Motion")]
    [SerializeField] private float slideDistance = 6f;
    [SerializeField] private float switchDuration = 0.45f;
    [SerializeField] private AnimationCurve switchEase = AnimationCurve.EaseInOut(0f, 0f, 1f, 1f);

    [Header("Audio")]
    [SerializeField] private AudioSource switchAudioSource;
    [SerializeField] private AudioSource characterVoiceAudioSource;
    [SerializeField] private AudioClip switchCharacterClip;
    [SerializeField] private List<AudioClip> characterVoiceClips = new List<AudioClip>();
    [SerializeField] [Range(0f, 1f)] private float switchVolume = 1f;
    [SerializeField] [Range(0f, 1f)] private float characterVoiceVolume = 1f;

    [Header("Preview Camera")]
    [SerializeField] [Range(0, 31)] private int previewLayer = 6;
    [SerializeField] private int previewTextureSize = 512;
    [SerializeField] private float previewCameraSmoothing = 14f;
    [SerializeField] private float previewFramingPadding = 1.65f;
    [SerializeField] private Vector3 fallbackPreviewDirection = new Vector3(-1f, 0.16f, 0f);

    private readonly List<CharacterState> runtimeCharacters = new List<CharacterState>();
    private readonly List<LayerState> cachedLayers = new List<LayerState>();

    private Camera previewCamera;
    private Camera stageCamera;
    private RenderTexture previewTexture;
    private Vector3 stageCenter;
    private Vector3 slideAxis = Vector3.right;
    private int currentIndex;
    private bool initialized;
    private bool isSwitching;
    private bool buttonListenersBound;

    private sealed class CharacterState
    {
        public CharacterState(Transform root)
        {
            Root = root;
            OriginalPosition = root.position;
            OriginalRotation = root.rotation;
            OriginalScale = root.localScale;
            OriginalActive = root.gameObject.activeSelf;
            DisplayName = root.name;
        }

        public Transform Root { get; }
        public Vector3 OriginalPosition { get; }
        public Quaternion OriginalRotation { get; }
        public Vector3 OriginalScale { get; }
        public bool OriginalActive { get; }
        public string DisplayName { get; }
    }

    private sealed class LayerState
    {
        public LayerState(Transform target, int originalLayer)
        {
            Target = target;
            OriginalLayer = originalLayer;
        }

        public Transform Target { get; }
        public int OriginalLayer { get; }
    }

    private void OnEnable()
    {
        if (!Application.isPlaying)
        {
            return;
        }

        InitializeIfNeeded();
    }

    private void LateUpdate()
    {
        if (!initialized)
        {
            return;
        }

        stageCamera = FindStageCamera();
        slideAxis = ResolveSlideAxis(stageCamera);
        UpdatePreviewCameraFrame();
    }

    private void OnDisable()
    {
        if (!Application.isPlaying)
        {
            return;
        }

        CleanupRuntimeState();
    }

    private void OnDestroy()
    {
        if (!Application.isPlaying)
        {
            return;
        }

        CleanupRuntimeState();
    }

    private void InitializeIfNeeded()
    {
        if (initialized)
        {
            return;
        }

        CollectCharacters();
        if (runtimeCharacters.Count < 2 || previewRawImage == null || leftButton == null || rightButton == null)
        {
            enabled = false;
            return;
        }

        stageCamera = FindStageCamera();
        slideAxis = ResolveSlideAxis(stageCamera);
        currentIndex = WrapIndex(initialCharacterIndex);
        stageCenter = runtimeCharacters[currentIndex].OriginalPosition;

        CacheAndApplyPreviewLayer();
        PrepareCharacters();
        EnsureEventSystem();
        EnsureAudioSources();
        CreatePreviewCamera();
        BindButtonListeners();
        UpdateSelectedLabel();
        UpdatePreviewCameraFrame(true);
        initialized = true;
        RefreshButtonState();
    }

    private void CollectCharacters()
    {
        runtimeCharacters.Clear();

        List<Transform> sources = new List<Transform>();

        for (int i = 0; i < characterRoots.Count; i++)
        {
            Transform root = characterRoots[i];
            if (root == null || sources.Contains(root))
            {
                continue;
            }

            sources.Add(root);
        }

        if (sources.Count == 0 && autoDiscoverCharacters)
        {
            GameObject[] rootObjects = gameObject.scene.GetRootGameObjects();
            for (int i = 0; i < rootObjects.Length; i++)
            {
                GameObject rootObject = rootObjects[i];
                if (rootObject == null || rootObject == gameObject)
                {
                    continue;
                }

                if (rootObject.GetComponentInChildren<Camera>(true) != null)
                {
                    continue;
                }

                if (rootObject.GetComponentInChildren<Canvas>(true) != null)
                {
                    continue;
                }

                if (rootObject.GetComponentInChildren<EventSystem>(true) != null)
                {
                    continue;
                }

                if (rootObject.GetComponentInChildren<Renderer>(true) == null)
                {
                    continue;
                }

                if (rootObject.GetComponentInChildren<Animator>(true) == null)
                {
                    continue;
                }

                sources.Add(rootObject.transform);
            }

            sources.Sort((left, right) => string.CompareOrdinal(left.name, right.name));
        }

        for (int i = 0; i < sources.Count; i++)
        {
            Transform root = sources[i];
            if (root == null)
            {
                continue;
            }

            runtimeCharacters.Add(new CharacterState(root));
        }
    }

    private void PrepareCharacters()
    {
        for (int i = 0; i < runtimeCharacters.Count; i++)
        {
            CharacterState character = runtimeCharacters[i];
            if (character.Root == null)
            {
                continue;
            }

            character.Root.rotation = character.OriginalRotation;
            character.Root.localScale = character.OriginalScale;

            bool isCurrent = i == currentIndex;
            character.Root.gameObject.SetActive(isCurrent);
            character.Root.position = isCurrent
                ? stageCenter
                : stageCenter + slideAxis * slideDistance;
        }
    }

    private void EnsureEventSystem()
    {
        if (FindObjectOfType<EventSystem>() != null)
        {
            return;
        }

        GameObject eventSystem = new GameObject("EventSystem");
        eventSystem.AddComponent<EventSystem>();
        eventSystem.AddComponent<StandaloneInputModule>();
    }

    private void CreatePreviewCamera()
    {
        GameObject previewCameraObject = new GameObject("CharacterPreviewCamera");
        previewCamera = previewCameraObject.AddComponent<Camera>();
        previewCamera.clearFlags = CameraClearFlags.SolidColor;
        previewCamera.backgroundColor = new Color(0f, 0f, 0f, 0f);
        previewCamera.nearClipPlane = 0.01f;
        previewCamera.farClipPlane = 100f;
        previewCamera.allowMSAA = true;
        previewCamera.depth = -10f;
        previewCamera.fieldOfView = 30f;
        previewCamera.cullingMask = 1 << previewLayer;

        previewTexture = new RenderTexture(previewTextureSize, previewTextureSize, 16, RenderTextureFormat.ARGB32);
        previewTexture.name = "CharacterSwitchPreview";
        previewTexture.antiAliasing = 2;
        previewTexture.Create();

        previewCamera.targetTexture = previewTexture;
        previewRawImage.texture = previewTexture;
    }

    private void EnsureAudioSources()
    {
        if (switchAudioSource == null)
        {
            switchAudioSource = gameObject.AddComponent<AudioSource>();
        }

        if (characterVoiceAudioSource == null)
        {
            characterVoiceAudioSource = gameObject.AddComponent<AudioSource>();
        }

        SetupAudioSource(switchAudioSource);
        SetupAudioSource(characterVoiceAudioSource);
    }

    private static void SetupAudioSource(AudioSource source)
    {
        if (source == null)
        {
            return;
        }

        source.playOnAwake = false;
        source.loop = false;
        source.spatialBlend = 0f;
    }

    private void CacheAndApplyPreviewLayer()
    {
        cachedLayers.Clear();

        for (int i = 0; i < runtimeCharacters.Count; i++)
        {
            CharacterState character = runtimeCharacters[i];
            if (character.Root == null)
            {
                continue;
            }

            CacheAndApplyPreviewLayerRecursive(character.Root);
        }
    }

    private void CacheAndApplyPreviewLayerRecursive(Transform current)
    {
        if (current == null)
        {
            return;
        }

        cachedLayers.Add(new LayerState(current, current.gameObject.layer));
        current.gameObject.layer = previewLayer;

        for (int i = 0; i < current.childCount; i++)
        {
            CacheAndApplyPreviewLayerRecursive(current.GetChild(i));
        }
    }

    private void BindButtonListeners()
    {
        if (buttonListenersBound)
        {
            return;
        }

        leftButton.onClick.AddListener(ShowPrevious);
        rightButton.onClick.AddListener(ShowNext);
        buttonListenersBound = true;
    }

    private void UnbindButtonListeners()
    {
        if (!buttonListenersBound)
        {
            return;
        }

        if (leftButton != null)
        {
            leftButton.onClick.RemoveListener(ShowPrevious);
        }

        if (rightButton != null)
        {
            rightButton.onClick.RemoveListener(ShowNext);
        }

        buttonListenersBound = false;
    }

    private void ShowPrevious()
    {
        if (!initialized || isSwitching)
        {
            return;
        }

        StopCharacterVoice();
        PlaySwitchSound();
        StartCoroutine(SwitchRoutine(-1));
        
    }

    private void ShowNext()
    {
        if (!initialized || isSwitching)
        {
            return;
        }

        StopCharacterVoice();
        PlaySwitchSound();
        StartCoroutine(SwitchRoutine(1));
    }

    private IEnumerator SwitchRoutine(int direction)
    {
        isSwitching = true;
        LunaManager.ins.CheckClickShowEndCard();
        RefreshButtonState();

        int nextIndex = WrapIndex(currentIndex + direction);
        CharacterState currentCharacter = runtimeCharacters[currentIndex];
        CharacterState nextCharacter = runtimeCharacters[nextIndex];

        Vector3 directionAxis = slideAxis * Mathf.Sign(direction);
        Vector3 incomingStart = stageCenter + directionAxis * slideDistance;
        Vector3 outgoingEnd = stageCenter - directionAxis * slideDistance;

        currentCharacter.Root.gameObject.SetActive(true);
        currentCharacter.Root.rotation = currentCharacter.OriginalRotation;
        currentCharacter.Root.localScale = currentCharacter.OriginalScale;
        currentCharacter.Root.position = stageCenter;

        nextCharacter.Root.gameObject.SetActive(true);
        nextCharacter.Root.rotation = nextCharacter.OriginalRotation;
        nextCharacter.Root.localScale = nextCharacter.OriginalScale;
        nextCharacter.Root.position = incomingStart;

        float elapsed = 0f;
        while (elapsed < switchDuration)
        {
            float progress = switchDuration <= 0f ? 1f : Mathf.Clamp01(elapsed / switchDuration);
            float easedProgress = switchEase != null ? switchEase.Evaluate(progress) : progress;

            currentCharacter.Root.position = Vector3.LerpUnclamped(stageCenter, outgoingEnd, easedProgress);
            nextCharacter.Root.position = Vector3.LerpUnclamped(incomingStart, stageCenter, easedProgress);

            elapsed += Time.unscaledDeltaTime;
            yield return null;
        }

        currentCharacter.Root.position = outgoingEnd;
        nextCharacter.Root.position = stageCenter;
        currentCharacter.Root.gameObject.SetActive(false);

        currentIndex = nextIndex;
        UpdateSelectedLabel();
        isSwitching = false;
        UpdatePreviewCameraFrame(true);
        PlayCharacterVoice(nextIndex);
        RefreshButtonState();
    }

    private void PlaySwitchSound()
    {
        if (switchAudioSource == null || switchCharacterClip == null)
        {
            return;
        }

        switchAudioSource.PlayOneShot(switchCharacterClip, switchVolume);
    }

    private void PlayCharacterVoice(int characterIndex)
    {
        if (characterVoiceAudioSource == null)
        {
            return;
        }

        AudioClip voiceClip = GetCharacterVoiceClip(characterIndex);
        if (voiceClip == null)
        {
            return;
        }

        characterVoiceAudioSource.Stop();
        characterVoiceAudioSource.clip = voiceClip;
        characterVoiceAudioSource.volume = characterVoiceVolume;
        characterVoiceAudioSource.Play();
    }

    private AudioClip GetCharacterVoiceClip(int characterIndex)
    {
        if (characterIndex < 0 || characterIndex >= characterVoiceClips.Count)
        {
            return null;
        }

        return characterVoiceClips[characterIndex];
    }

    private void StopCharacterVoice()
    {
        if (characterVoiceAudioSource == null)
        {
            return;
        }

        if (characterVoiceAudioSource.isPlaying)
        {
            characterVoiceAudioSource.Stop();
        }
    }

    private void UpdateSelectedLabel()
    {
        if (nameLabel == null || runtimeCharacters.Count == 0)
        {
            return;
        }

        nameLabel.text = runtimeCharacters[currentIndex].DisplayName;
    }

    private void RefreshButtonState()
    {
        bool canSwitch = initialized && !isSwitching && runtimeCharacters.Count > 1;
        leftButton.interactable = canSwitch;
        rightButton.interactable = canSwitch;
    }

    private void UpdatePreviewCameraFrame(bool snap = false)
    {
        if (previewCamera == null || !TryGetActiveBounds(out Bounds bounds))
        {
            return;
        }

        Vector3 focusPoint = bounds.center + Vector3.up * (bounds.extents.y * 0.05f);
        Vector3 previewDirection = GetPreviewDirection(focusPoint);

        float largestExtent = Mathf.Max(bounds.extents.x, bounds.extents.y);
        largestExtent = Mathf.Max(largestExtent, bounds.extents.z);
        largestExtent = Mathf.Max(largestExtent, 0.5f);

        float distance = largestExtent * previewFramingPadding / Mathf.Tan(previewCamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
        Vector3 targetPosition = focusPoint + previewDirection * distance;
        Quaternion targetRotation = Quaternion.LookRotation(focusPoint - targetPosition, Vector3.up);

        if (snap)
        {
            previewCamera.transform.SetPositionAndRotation(targetPosition, targetRotation);
        }
        else
        {
            float lerpFactor = 1f - Mathf.Exp(-previewCameraSmoothing * Time.unscaledDeltaTime);
            previewCamera.transform.position = Vector3.Lerp(previewCamera.transform.position, targetPosition, lerpFactor);
            previewCamera.transform.rotation = Quaternion.Slerp(previewCamera.transform.rotation, targetRotation, lerpFactor);
        }

        previewCamera.nearClipPlane = 0.01f;
        previewCamera.farClipPlane = Mathf.Max(20f, distance + largestExtent * 8f);
    }

    private Vector3 GetPreviewDirection(Vector3 focusPoint)
    {
        Vector3 direction = fallbackPreviewDirection.sqrMagnitude > 0.001f
            ? fallbackPreviewDirection.normalized
            : new Vector3(-1f, 0.16f, 0f).normalized;

        if (stageCamera == null)
        {
            return direction;
        }

        Vector3 stageDirection = stageCamera.transform.position - focusPoint;
        stageDirection.y = Mathf.Clamp(stageDirection.y, -2f, 2f);
        if (stageDirection.sqrMagnitude < 0.001f)
        {
            return direction;
        }

        return stageDirection.normalized;
    }

    private bool TryGetActiveBounds(out Bounds bounds)
    {
        bool hasBounds = false;
        bounds = new Bounds(stageCenter, Vector3.one);

        for (int i = 0; i < runtimeCharacters.Count; i++)
        {
            CharacterState character = runtimeCharacters[i];
            if (character.Root == null || !character.Root.gameObject.activeInHierarchy)
            {
                continue;
            }

            Renderer[] renderers = character.Root.GetComponentsInChildren<Renderer>(true);
            for (int rendererIndex = 0; rendererIndex < renderers.Length; rendererIndex++)
            {
                Renderer rendererComponent = renderers[rendererIndex];
                if (rendererComponent == null || !rendererComponent.enabled)
                {
                    continue;
                }

                if (!hasBounds)
                {
                    bounds = rendererComponent.bounds;
                    hasBounds = true;
                }
                else
                {
                    bounds.Encapsulate(rendererComponent.bounds);
                }
            }
        }

        return hasBounds;
    }

    private Camera FindStageCamera()
    {
        Camera[] cameras = Camera.allCameras;
        for (int i = 0; i < cameras.Length; i++)
        {
            Camera cameraCandidate = cameras[i];
            if (cameraCandidate == null || !cameraCandidate.enabled || !cameraCandidate.gameObject.activeInHierarchy)
            {
                continue;
            }

            if (cameraCandidate == previewCamera)
            {
                continue;
            }

            if (cameraCandidate.targetTexture != null)
            {
                continue;
            }

            return cameraCandidate;
        }

        return null;
    }

    private Vector3 ResolveSlideAxis(Camera referenceCamera)
    {
        if (referenceCamera == null)
        {
            return Vector3.right;
        }

        Vector3 flattenedRight = Vector3.ProjectOnPlane(referenceCamera.transform.right, Vector3.up);
        if (flattenedRight.sqrMagnitude < 0.001f)
        {
            return Vector3.right;
        }

        return flattenedRight.normalized;
    }

    private int WrapIndex(int index)
    {
        if (runtimeCharacters.Count == 0)
        {
            return 0;
        }

        int count = runtimeCharacters.Count;
        index %= count;
        if (index < 0)
        {
            index += count;
        }

        return index;
    }

    private void CleanupRuntimeState()
    {
        if (!initialized)
        {
            return;
        }

        StopAllCoroutines();
        UnbindButtonListeners();
        RestoreCharacters();
        RestoreLayers();

        if (previewCamera != null)
        {
            if (previewCamera.targetTexture != null)
            {
                previewCamera.targetTexture = null;
            }

            Destroy(previewCamera.gameObject);
            previewCamera = null;
        }

        if (previewTexture != null)
        {
            previewTexture.Release();
            Destroy(previewTexture);
            previewTexture = null;
        }

        if (previewRawImage != null)
        {
            previewRawImage.texture = null;
        }

        stageCamera = null;
        runtimeCharacters.Clear();
        initialized = false;
        isSwitching = false;
    }

    private void RestoreCharacters()
    {
        for (int i = 0; i < runtimeCharacters.Count; i++)
        {
            CharacterState character = runtimeCharacters[i];
            if (character.Root == null)
            {
                continue;
            }

            character.Root.position = character.OriginalPosition;
            character.Root.rotation = character.OriginalRotation;
            character.Root.localScale = character.OriginalScale;
            character.Root.gameObject.SetActive(character.OriginalActive);
        }
    }

    private void RestoreLayers()
    {
        for (int i = 0; i < cachedLayers.Count; i++)
        {
            LayerState state = cachedLayers[i];
            if (state.Target == null)
            {
                continue;
            }

            state.Target.gameObject.layer = state.OriginalLayer;
        }

        cachedLayers.Clear();
    }
}
