using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Playable
{
    // All picnic input, tutorial, camera choreography and interaction rules live here.
    public class GameController : MonoBehaviour
    {
        public enum PicnicPhase { Intro, Look, SelectItem, SelectPet, Playing, Completed }
        [Serializable] public class Pet
        {
            public Transform Root;
            public Collider Hitbox;
            public Animation Animation;
            public Transform ServingPoint;
            public GameObject CryingFace;
            public AudioClip Voice;
            public ParticleSystem Hearts;
            [NonSerialized] public GameObject ServedItem;
            [NonSerialized] public Coroutine Reaction;
            [NonSerialized] public int PendingEvents;
            [NonSerialized] public Transform[] PoseTransforms;
            [NonSerialized] public Vector3[] PosePositions;
            [NonSerialized] public Quaternion[] PoseRotations;
            [NonSerialized] public Vector3[] PoseScales;
        }
        public Camera WorldCamera;
        public Transform Player, PlayerVisual, Seat;
        public Animation PlayerAnimation;
        [Serializable] public class PlayerPoseTrack
        {
            public Transform Target;
            public Vector3[] Positions;
            public Quaternion[] Rotations;
        }
        [Serializable] public class PlayerPoseClip
        {
            public float Duration;
            public int FrameCount;
            public PlayerPoseTrack[] Tracks;
        }
        [Header("Baked intro animation (Luna)")]
        public PlayerPoseClip WalkPose;
        public PlayerPoseClip SitPose;
        public Pet[] Pets;
        public GameObject[] ItemPrefabs;
        public RectTransform[] Slots;
        public Image[] SlotBackgrounds;
        public GameObject[] SlotIndicators;
        public RectTransform TutorialHand;
        public TMP_Text TutorialText;
        public Canvas UiCanvas;
        public GameManager Manager;
        [Header("Interaction audio")]
        public AudioSource ResultAudio;
        public AudioSource PetAudio;
        public AudioClip WinSound;
        public AudioClip WrongSound;
        [Min(0.1f)] public float IntroDuration = 3f;
        [Header("Intro camera framing")]
        public Vector3 IntroCameraDirection = new Vector3(1.5f, 4f, -6f);
        [Range(.5f, .95f)] public float IntroFrameFill = .78f;
        [Header("First person camera")]
        public Vector3 FirstPersonOffset = new Vector3(.1f, 1.05f, .15f);
        public float PortraitFieldOfView = 80f;
        public float LandscapeFieldOfView = 48f;
        public PicnicPhase CurrentPhase { get; private set; }
        public int Attempts { get; private set; }
        public int SelectedItem { get; private set; } = -1;
        public bool IsBusy => activeReactions > 0;
        int activeReactions;
        float yaw, pitch = 18, hintTime;
        Vector2 down, previous;
        bool tracking, dragged;
        int downSlot = -1, finger = -1;
        Quaternion baseRotation;
        Vector3 tutorialHandScale;
        Bounds introBounds;
        Camera UiCamera => UiCanvas.renderMode == RenderMode.ScreenSpaceOverlay ? null : UiCanvas.worldCamera;

        void Start()
        {
            baseRotation = Seat.rotation;
            tutorialHandScale = TutorialHand.localScale;
            foreach (var pet in Pets)
            {
                CachePetPose(pet);
                pet.Animation.Play();
                pet.CryingFace.SetActive(false);
                if (pet.Hearts != null) pet.Hearts.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            }
            if (SlotIndicators != null) foreach (var indicator in SlotIndicators) if (indicator != null) indicator.SetActive(false);
            TutorialHand.gameObject.SetActive(false);
            TutorialText.gameObject.SetActive(false);
            StartCoroutine(Introduction());
        }
        IEnumerator Introduction()
        {
            CurrentPhase = PicnicPhase.Intro;
            var start = Player.position;
            PrepareIntroCamera(start);
            PlayerAnimation.Stop();
            PlayerAnimation.enabled = false;
            PlayerVisual.gameObject.SetActive(true);
            float walkTime = IntroDuration * 0.6f;
            for (float t = 0; t < walkTime; t += Time.deltaTime)
            {
                ApplyPlayerPose(WalkPose, t % WalkPose.Duration, 1f);
                Player.position = Vector3.Lerp(start, Seat.position, Mathf.SmoothStep(0, 1, t / walkTime));
                yield return null;
            }
            Player.position = Seat.position;
            float sitTime = IntroDuration - walkTime;
            for (float t = 0; t < sitTime; t += Time.deltaTime)
            {
                ApplyPlayerPose(SitPose, t / sitTime * SitPose.Duration, Mathf.Clamp01(t / .12f));
                yield return null;
            }
            ApplyPlayerPose(SitPose, SitPose.Duration, 1f);
            UpdateFirstPersonCamera();
            PlayerVisual.gameObject.SetActive(false);
            SetPhase(PicnicPhase.Look);
            if (Manager.TotalEvents == 0) { SetPhase(PicnicPhase.Completed); Manager.EndGame(); }
        }
        void SetPhase(PicnicPhase phase)
        {
            CurrentPhase = phase; hintTime = 0;
            bool tutorial = phase == PicnicPhase.Look || phase == PicnicPhase.SelectItem || phase == PicnicPhase.SelectPet;
            TutorialHand.gameObject.SetActive(tutorial);
            TutorialText.gameObject.SetActive(tutorial);
            TutorialText.text = phase == PicnicPhase.Look ? "Swipe to look around" : phase == PicnicPhase.SelectItem ? "Select any item" : "Select any pet to play with";
        }
        static void ApplyPlayerPose(PlayerPoseClip clip, float time, float blend)
        {
            float frame = Mathf.Clamp01(time / clip.Duration) * (clip.FrameCount - 1);
            int a = Mathf.FloorToInt(frame);
            int b = Mathf.Min(a + 1, clip.FrameCount - 1);
            float fraction = frame - a;
            foreach (var track in clip.Tracks)
            {
                var position = Vector3.Lerp(track.Positions[a], track.Positions[b], fraction);
                var rotation = Quaternion.Slerp(track.Rotations[a], track.Rotations[b], fraction);
                track.Target.localPosition = Vector3.Lerp(track.Target.localPosition, position, blend);
                track.Target.localRotation = Quaternion.Slerp(track.Target.localRotation, rotation, blend);
            }
        }
        void Update()
        {
            if (CurrentPhase == PicnicPhase.Intro || CurrentPhase == PicnicPhase.Completed) return;
            if (Manager.HasEnded) { SetPhase(PicnicPhase.Completed); return; }
            ReadPointer();
            UpdateTutorial();
            foreach (var pet in Pets)
                if (pet.CryingFace.activeSelf) pet.CryingFace.transform.rotation = WorldCamera.transform.rotation;
        }
        void LateUpdate()
        {
            if (CurrentPhase == PicnicPhase.Intro)
            {
                FrameIntroCamera();
                return;
            }
            UpdateFirstPersonCamera();
        }
        void UpdateFirstPersonCamera()
        {
            float blend = Mathf.InverseLerp(9f / 16f, 16f / 9f, WorldCamera.aspect);
            WorldCamera.fieldOfView = Mathf.Lerp(PortraitFieldOfView, LandscapeFieldOfView, blend);
            WorldCamera.transform.SetPositionAndRotation(Seat.position + Seat.rotation * FirstPersonOffset,
                baseRotation * Quaternion.Euler(pitch, yaw, 0));
        }
        void PrepareIntroCamera(Vector3 start)
        {
            introBounds = Pets[0].Hitbox.bounds;
            foreach (var pet in Pets) introBounds.Encapsulate(pet.Hitbox.bounds);
            // Include the whole walk-in path and the standing player, not only the pets.
            introBounds.Encapsulate(new Bounds(start + Vector3.up * .9f, new Vector3(.8f, 1.8f, .8f)));
            introBounds.Encapsulate(new Bounds(Seat.position + Vector3.up * .9f, new Vector3(.8f, 1.8f, .8f)));
            FrameIntroCamera();
        }
        void FrameIntroCamera()
        {
            var offset = Seat.rotation * IntroCameraDirection;
            var rotation = Quaternion.LookRotation(-offset.normalized, Vector3.up);
            var inverse = Quaternion.Inverse(rotation);
            float vertical = Mathf.Tan(WorldCamera.fieldOfView * .5f * Mathf.Deg2Rad) * IntroFrameFill;
            float horizontal = vertical * WorldCamera.aspect;
            float distance = 1f;
            var extents = introBounds.extents;
            for (int i = 0; i < 8; i++)
            {
                var corner = inverse * new Vector3((i & 1) == 0 ? -extents.x : extents.x,
                    (i & 2) == 0 ? -extents.y : extents.y, (i & 4) == 0 ? -extents.z : extents.z);
                distance = Mathf.Max(distance, Mathf.Abs(corner.x) / Mathf.Max(.01f, horizontal) - corner.z);
                distance = Mathf.Max(distance, Mathf.Abs(corner.y) / Mathf.Max(.01f, vertical) - corner.z);
                distance = Mathf.Max(distance, WorldCamera.nearClipPlane + .2f - corner.z);
            }
            WorldCamera.transform.SetPositionAndRotation(
                introBounds.center - rotation * Vector3.forward * distance, rotation);
        }
        void ReadPointer()
        {
            if (Input.touchCount > 0)
            {
                for (int i = 0; i < Input.touchCount; i++)
                {
                    var touch = Input.GetTouch(i);
                    if (touch.phase == TouchPhase.Began && !tracking) { finger = touch.fingerId; BeginPointer(touch.position); }
                    if (touch.fingerId != finger) continue;
                    if (touch.phase == TouchPhase.Canceled) { tracking = false; finger = -1; }
                    else if (touch.phase == TouchPhase.Ended) { EndPointer(touch.position); finger = -1; }
                    else MovePointer(touch.position);
                }
                return;
            }
            if (Input.GetMouseButtonDown(0)) BeginPointer(Input.mousePosition);
            if (Input.GetMouseButton(0)) MovePointer(Input.mousePosition);
            if (Input.GetMouseButtonUp(0)) EndPointer(Input.mousePosition);
        }
        public void BeginPointer(Vector2 position)
        {
            if (CurrentPhase == PicnicPhase.Look) SetPhase(PicnicPhase.SelectItem);
            tracking = true; dragged = false; down = previous = position; downSlot = SlotAt(position);
        }
        public void MovePointer(Vector2 position)
        {
            if (!tracking) return;
            if ((position - down).magnitude > Mathf.Max(10, Screen.width * 0.018f)) dragged = true;
            var delta = position - previous; previous = position;
            if (!dragged || downSlot >= 0) return;
            float sensitivity = 85f / Mathf.Max(1, Screen.width);
            yaw = Mathf.Clamp(yaw + delta.x * sensitivity, -55, 55);
            pitch = Mathf.Clamp(pitch - delta.y * sensitivity, -15, 48);
        }
        public void EndPointer(Vector2 position)
        {
            if (!tracking) return;
            MovePointer(position); tracking = false;
            if (dragged) return;
            int slot = SlotAt(position);
            if (downSlot >= 0) { if (slot == downSlot) SelectItem(slot); return; }
            if (slot >= 0 || CurrentPhase == PicnicPhase.Look || SelectedItem < 0) return;
            RaycastHit hit;
            if (!Physics.Raycast(WorldCamera.ScreenPointToRay(position), out hit, 30, ~0, QueryTriggerInteraction.Collide)) return;
            for (int i = 0; i < Pets.Length; i++)
                if (hit.collider == Pets[i].Hitbox) { TryGiveItem(i); break; }
        }
        int SlotAt(Vector2 position)
        {
            for (int i = 0; i < Slots.Length; i++)
                if (RectTransformUtility.RectangleContainsScreenPoint(Slots[i], position, UiCamera)) return i;
            return -1;
        }
        public void SelectItem(int item)
        {
            if (CurrentPhase == PicnicPhase.Intro || CurrentPhase == PicnicPhase.Look || CurrentPhase == PicnicPhase.Completed || item < 0 || item >= ItemPrefabs.Length) return;
            SelectedItem = item;
            if (SlotIndicators != null)
                for (int i = 0; i < SlotIndicators.Length; i++)
                    if (SlotIndicators[i] != null) SlotIndicators[i].SetActive(i == item);
            if (CurrentPhase == PicnicPhase.SelectItem) SetPhase(PicnicPhase.SelectPet);
            // SelectPet also accepts every slot, so changing the item updates the hint immediately.
            if (CurrentPhase == PicnicPhase.SelectPet) UpdateTutorial();
        }
        public bool TryGiveItem(int petIndex)
        {
            if (SelectedItem < 0 || petIndex < 0 || petIndex >= Pets.Length || Manager.HasEnded || Attempts >= Manager.TotalEvents || (CurrentPhase != PicnicPhase.SelectPet && CurrentPhase != PicnicPhase.Playing)) return false;
            Attempts++;
            var pet = Pets[petIndex];
            pet.PendingEvents++;
            if (pet.Reaction != null) StopCoroutine(pet.Reaction);
            else activeReactions++;
            pet.Reaction = StartCoroutine(React(petIndex, SelectedItem));
            return true;
        }
        IEnumerator React(int index, int item)
        {
            SetPhase(PicnicPhase.Playing);
            var pet = Pets[index];
            pet.CryingFace.SetActive(false);
            if (pet.Hearts != null) pet.Hearts.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            // Reset this pet only, including offsets left by an interrupted jump/play clip.
            pet.Animation.Stop();
            RestorePetPose(pet);
            pet.Animation.Play();
            if (pet.ServedItem != null) Destroy(pet.ServedItem);
            Vector3 servingPosition = pet.ServingPoint.position;
            if (index == 2 && item == 2)
            {
                servingPosition = pet.Root.position + pet.Root.forward * .75f;
                servingPosition.y = pet.ServingPoint.position.y;
            }
            pet.ServedItem = Instantiate(ItemPrefabs[item], servingPosition, pet.ServingPoint.rotation);
            bool correct = index == item;
            PlayInteractionAudio(pet, correct);
            if (correct)
            {
                if (pet.Hearts != null) pet.Hearts.Play(true);
                pet.Animation.Play(index == 2 ? "PlayBall" : "Jump");
                if (index == 2) pet.ServedItem.GetComponent<Animation>().Play("Roll");
            }
            else pet.CryingFace.SetActive(true);
            yield return new WaitForSeconds(correct && index == 2 ? 2.2f : 1.2f);
            pet.CryingFace.SetActive(false);
            if (pet.Hearts != null) pet.Hearts.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear);
            pet.Animation.Play();
            pet.Reaction = null;
            activeReactions--;
            int completedEvents = pet.PendingEvents;
            pet.PendingEvents = 0;
            // Replaying a pet must not lose accepted attempts or finish other pets early.
            for (int i = 0; i < completedEvents; i++) Manager.CountEvent();
            if (Manager.HasEnded) SetPhase(PicnicPhase.Completed);
        }
        static void CachePetPose(Pet pet)
        {
            // The scene stores the idle pose. Cache it once without clip sampling,
            // which is unavailable in the Luna runtime.
            pet.PoseTransforms = pet.Animation.GetComponentsInChildren<Transform>(true);
            int count = pet.PoseTransforms.Length;
            pet.PosePositions = new Vector3[count];
            pet.PoseRotations = new Quaternion[count];
            pet.PoseScales = new Vector3[count];
            for (int i = 0; i < count; i++)
            {
                var pose = pet.PoseTransforms[i];
                pet.PosePositions[i] = pose.localPosition;
                pet.PoseRotations[i] = pose.localRotation;
                pet.PoseScales[i] = pose.localScale;
            }
        }

        static void RestorePetPose(Pet pet)
        {
            for (int i = 0; i < pet.PoseTransforms.Length; i++)
            {
                var pose = pet.PoseTransforms[i];
                if (pose == null || pose == pet.Animation.transform) continue;
                pose.localPosition = pet.PosePositions[i];
                pose.localRotation = pet.PoseRotations[i];
                pose.localScale = pet.PoseScales[i];
            }
        }

        void UpdateTutorial()
        {
            if (!TutorialHand.gameObject.activeSelf) return;
            hintTime += Time.deltaTime;
            Vector2 screen;
            if (CurrentPhase == PicnicPhase.Look) screen = new Vector2(Screen.width * (0.5f + Mathf.Sin(hintTime * 3) * 0.16f), Screen.height * 0.46f);
            else if (CurrentPhase == PicnicPhase.SelectItem)
            {
                // Suggest cake for the rabbit without restricting any hotbar slot or pet.
                screen = RectTransformUtility.WorldToScreenPoint(UiCamera, Slots[0].position);
            }
            else
            {
                Vector3 projected = WorldCamera.WorldToScreenPoint(Pets[Mathf.Max(0, SelectedItem)].Hitbox.bounds.center);
                screen = new Vector2(Mathf.Clamp(projected.x, 65, Screen.width - 65), Mathf.Clamp(projected.y, Screen.height * 0.25f, Screen.height * 0.8f));
            }
            Vector2 local;
            RectTransformUtility.ScreenPointToLocalPointInRectangle((RectTransform)TutorialHand.parent, screen, UiCamera, out local);
            TutorialHand.anchoredPosition = local + new Vector2(24, -32);
            TutorialHand.localScale = tutorialHandScale * (CurrentPhase == PicnicPhase.Look
                ? 1f : 1 + 0.09f * Mathf.Sin(hintTime * 6));
        }

        void PlayInteractionAudio(Pet pet, bool correct)
        {
            // Separate sources let the success cue and pet call play together.
            if (PetAudio != null && correct && pet.Voice != null) PetAudio.PlayOneShot(pet.Voice);
            var result = correct ? WinSound : WrongSound;
            if (ResultAudio != null && result != null) ResultAudio.PlayOneShot(result);
        }
    }
}
