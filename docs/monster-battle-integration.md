# Monster battle integration

The five prefabs referenced by the playable hotbar now contain their battle feedback and skill references. `MapController` still uses `Monster.Spawn`; after the spawn limit it allows `_battleShowcaseDuration` (default 10 seconds) of combat before CTA. A zero monster limit remains unlimited.

## Behaviors

- Enderman: five far/near teleport strikes with separate departure/arrival VFX and area hits; aimed/scaled beam with cone damage; death vortex pulling enemies with periodic damage.
- Creeper: pooled TNT with area damage and damage over time; a red flashing charge followed by an area explosion on death.
- Huggy: melee stun and scream/hit/death feedback. The source mob has no separate active skill component.
- Iron Golem: three melee animations with increasing damage and a cone/launch finisher, area slam/launch, and two-handed TNT barrage with damage over time.
- Sonic: four visual/Animator phases with health/damage bonuses; phase 2 approach-and-roar; phase 3 alternating cone attacks; phase 4 cone attacks and vortex with damage immunity during the channel.

Melee range accounts for both collider radii, preventing large bodies from blocking Huggy/Sonic outside their attack range. Disabled/despawned opponents are excluded from targeting and area damage; targeted channels stop when their opponent is disabled. The existing rule that monsters only attack other types is preserved.

Source: `D:/Source/minecraft/Assets/Game/Voxel Play/Resources/Prefabs/Mobs` and its `NewMobBattle/Skills` scripts. Combat values and durations are adapted for a short playable. Voxel destruction, source navigation/team/event frameworks and camera shake are omitted. Existing model and VFX assets are reused; only selected audio clips are copied.

## Luna constraints

- At most 32 reusable TNT projectiles, 24 detached effects and 8 audio voices; sound starts are rate limited.
- Area attacks iterate the active monster registry without physics overlap allocations.
- Skill timers back up animation events; pending attacks are bound to their original target and canceled while channeling.
- Animator parameters are cached and checked for Bool/Trigger type; Sonic switches the active Animator with its model.
- Battle materials use the built-in `Standard` shader, with transparent blend settings for particles. Effect collision, lights and trails are disabled, with a particle budget per effect.
- Audio clips are mono, 22.05 kHz, compressed. Monster chase avoids per-frame ground raycasts unless explicitly enabled.

## Verification tools

`Tools > Playable > Validate monster battle` runs an isolated scene and records results in `Library/MonsterBattle-validation.txt`, with a rendered preview in `Library/MonsterBattle-preview.png`. It checks automatic damage, projectile/audio playback, Enderman/Golem channels, Sonic phases/vortex, death cleanup and Standard material assignments.

The regression fixture also exercises `MapController` spawning and its limit/showcase delay, inactive target filtering, channel cancellation, retargeting after despawn, Huggy attacking at physical contact, repeated teleport hits, Golem combo damage and TNT damage-over-time, and Sonic phase 3/4 cone boundaries. It increases health and forces Sonic's phase thresholds to exercise each skill independently of battle balance; it is an Editor test, not a Luna browser build verification.

`Tools > Playable > Configure monster battle` recreates the authored prefab wiring; it requires the source audio folder above. Generated assets live under `Assets/_Playable_/MonsterBattle`. The editor-only setup and validation code is excluded from Luna builds.
