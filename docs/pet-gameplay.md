# Pet gameplay

Gameplay's hotbar is ordered **Verity (the former second variant), Gugugaga, Rabbit, Pig, Fox, Dog**.
Select a slot and tap the ground to summon it. A tap on an existing creature is consumed before spawning;
Rabbit, Pig, Fox and Dog accept food while hungry. Verity and Gugugaga only wander.

The player starts mounted on the horse. The tutorial begins at the first hotbar selection, skipping
the old mount-button step. The mount button still allows dismounting and remounting; disable
`Start Mounted` on PlayerController to restore the original on-foot start and mount tutorial.
`Mounted Model Offset` adjusts the rider relative to the saddle without moving the horse or
changing the on-foot position. Gameplay uses `(0, -0.58, -0.08)` for the Minecraft girl.

Rabbit, Pig, Fox and Dog have their own AudioSource and AnimalAudio component. They call shortly
after appearing, occasionally while wandering, more often when hungry, and when fed. Calls are
limited to 1.5 seconds with a shared ambient stagger to avoid a chorus of overlapping sounds.
The source uses distance attenuation and does not interrupt background music. Adjust `Calls`,
`Volume`, the two interval ranges, or `Max Call Duration` on each pet prefab to tune it.

Pets wander until `MapController > Animal Feeding > Animal Hunger Delay` seconds after spawning
(default three seconds), then flash white and approach the player. One large screen-space
`Feed your pet` prompt appears whenever any active animal is hungry and hides when all are full.
Each animal has only an overhead bar, without individual text or a numeric counter.
The original HealthBar frame and FillBar sprites are retained. Each tap smoothly increases its
horizontal fill by one third; there are no separate segments or numeric text. At three meals
they stop asking for food and emit hearts.
After three meals they remain full permanently and resume wandering; there is no repeat hunger timer.
Camera swipes and touches
starting on interactive UI do not feed or spawn. Ground probes keep creatures on the map surface.

- Prefabs and hotbar icons: `Assets/_Playable_/Pets/Prefabs` and `Assets/_Playable_/Pets/Icons`.
- Heart effect: `Assets/_Playable_/Pets/Prefabs/Pet Hearts.prefab`.
- Replace the **Albedo/MainTex** texture on `Assets/_Playable_/Pets/Materials/Pet Hearts.mat`
  with a transparent heart texture. The supplied small heart is a placeholder.
- `MapController` supplies the same hunger delay to every spawned animal. `Monster` controls speed, wandering radius,
  stopping distance and ground mask. Feedable creatures have both components.
- `PetStatusView` controls the original overhead healthbar's fill progress. `MapController` reuses its existing
  `Hint Text` for feeding after the tutorial; there is no separate feeding-text object or controller.

The scene player uses the Minecraft girl model. Six clips in `Pets/Animations/Girl *.anim` were
baked from the old player's Idle, Run, Jump, Fly_Idle, Fly and Ride_Horse_Idle motions. The girl has
rigid Minecraft limbs, so the bake transfers the corresponding torso/head/limb rotations and
vertical body bounce while retaining her proportions. `Girl Player.overrideController` retains
the original controller's parameters and transitions. Translation remains owned by PlayerController.
`Girl Skin.png` uses point filtering to preserve the small pixel-art texture.

The existing CTA timer remains configured at 30 seconds. Spawn taps no longer count toward the
CTA event threshold; filling each distinct pet for the first time counts once instead.

Editor migration helpers under `Scripts/Editor` are explicit utilities and do not run on import.
`PetGameplayChecks.Run()` starts a timed play-mode smoke check and writes results to
`Temp/PetGameplayChecks.txt`. Its temporary scene setup and disabled CTA timer are play-mode-only.
Exit Play Mode to restore normal gameplay.
