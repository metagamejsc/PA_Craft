# Thiết kế: Logic bắn súng cho PlayerAction

Ngày: 2026-08-20
Nhánh: UAC_V74
Trạng thái: đã duyệt design, đã code xong

## 1. Mục tiêu

Thêm cơ chế bắn súng vào `PlayerAction.cs` cho playable ad Minecraft:

- Idle → súng cầm trên tay. Chạy → súng đeo sau lưng.
- Bấm nút Fire → camera dời ra vị trí đặt sẵn sau lưng player, súng lên tay,
  chạy anim bắn kèm VFX, rồi đạn bay tới mục tiêu.
- Trúng quái → `GameManager.ShowWinPanel()`. Trượt → `GameManager.ShowFailPanel()`.
- Chỉ một phát duy nhất, bắn xong là khoá.

## 2. Bối cảnh hiện có

| Thành phần | Trạng thái |
|---|---|
| `PlayerController.cs` | Rigidbody + joystick, có `IsGrounded`, `Velocity` |
| `CameraController.cs` | Có `YawPivot`, `ViewMode`, `SetTarget()`. `LateUpdate` ghi đè vị trí camera mỗi frame khi còn target |
| `GameManager.cs` | Singleton. `ShowWinPanel()` / `ShowFailPanel()` tự gọi `EndGame()` sau 1 giây |
| `AudioManager.cs` | Singleton, `PlaySound(AudioClip, bool)` |
| Scene chạy thật | `Assets/_Playable_/Scenes/Gameplay.unity` |
| Thư viện | DOTween có sẵn. Không có object pooling |

## 3. Quyết định thiết kế

| Câu hỏi | Quyết định |
|---|---|
| Mục đích bắn | Trúng quái → Win, trượt → Fail |
| Xác định trúng | `Physics.SphereCastAll` từ camera; đạn chỉ là visual |
| Input | Button UI riêng, thêm phím `F` trong Editor để test |
| Ngắm | Crosshair giữa màn hình + aim assist bằng bán kính SphereCast |
| Số phát | Đúng một phát, sau đó khoá |
| Nhận diện quái | **LayerMask** (`_monsterMask`), không dùng Tag |
| Thời điểm chốt trúng/trượt | Ngay lúc bấm nút, **trước** khi camera dời |
| Đổi súng tay/lưng | Hai GameObject riêng, chỉ `SetActive` |
| Di chuyển khi bắn | Khoá cứng qua `PlayerController.IsWorking = false` |

## 4. Ranh giới với code cũ

`PlayerAction` là component độc lập trên GameObject Player. Nó chỉ **đọc**
`PlayerController.Velocity` và **ghi** `PlayerController.IsWorking`.

`CameraController` không bị sửa dòng nào — dùng API public sẵn có
`SetTarget(null)` để đóng băng rig trước khi tween camera.

`PlayerController` có đúng một thay đổi: thêm lại property `IsWorking` với
setter. Đây là hệ quả trực tiếp của quyết định khoá cứng di chuyển khi bắn.

```csharp
public bool IsWorking
{
    get => _isWorking;
    set
    {
        _isWorking = value;
        if (_isWorking) return;

        _moveInput = Vector2.zero;
        _jumpBufferTimer = 0f;

        Vector3 stopped = _rigidbody.linearVelocity;
        stopped.x = 0f;
        stopped.z = 0f;      // giữ y để không treo lơ lửng nếu đang ở trên không
        _rigidbody.linearVelocity = stopped;
        Velocity = stopped;

        UpdateAnimator();    // Update() ngừng chạy, phải ép param speed về 0 tại đây
    }
}
```

Dòng `UpdateAnimator()` là bắt buộc: `Update()` return sớm khi
`_isWorking == false`, nếu không gọi tay thì param `speed` kẹt ở giá trị cuối và
nhân vật sẽ chạy tại chỗ suốt đoạn cinematic.

## 5. Các file

### `Assets/_Playable_/Scripts/Controller/PlayerAction.cs`

Nhận input bắn, đổi súng theo trạng thái di chuyển, chạy cinematic, phán
trúng/trượt, gọi `GameManager`.

Trường Inspector:

- **References**: `_aimCamera`, `_animator`, `_playerController`,
  `_cameraController`, `_btnFire`, `_crosshair`
- **Weapon**: `_weaponInHand`, `_weaponOnBack`, `_muzzle`,
  `_runSpeedThreshold = 0.1f`
- **Aim**: `_maxRange = 50f`, `_aimAssistRadius = 0.35f`, `_hitMask = ~0`,
  `_monsterMask`
- **Shot Camera**: `_shotCameraAnchor`, `_cameraMoveDuration = 0.5f`,
  `_cameraEase = OutCubic`
- **Bullet**: `_bulletPrefab`, `_bulletSpeed = 60f`, `_muzzleFlash`,
  `_muzzleFlashDuration = 0.08f`, `_impactVfx`
- **Feedback**: `_shootTriggerParam = "shoot"`, `_shootClip`,
  `_shootAnimDelay = 0.2f`, `_resultDelay = 0.15f`

API công khai: `Fire()`.

### `Assets/_Playable_/Scripts/Bullet.cs`

Trách nhiệm duy nhất: bay từ vị trí spawn tới một điểm đích với tốc độ cho
trước, tới nơi thì gọi callback rồi tự huỷ. Không Rigidbody, không Collider,
không biết gì về Win/Fail.

API: `Launch(Vector3 targetPoint, float speed, Action onArrived)`.

## 6. Luồng chạy

### Mỗi frame (trước khi bắn)

```
Update()
  └─ UpdateWeaponSlot()
       ├─ đã bắn rồi → dừng hẳn, súng ghim trên tay tới hết màn
       └─ |Velocity ngang| > _runSpeedThreshold
            ├─ đúng → bật _weaponOnBack, tắt _weaponInHand
            └─ sai  → ngược lại
          (chỉ gọi SetActive khi trạng thái đổi, không gọi mỗi frame)
```

Ngưỡng để 0.1 chứ không phải 0 vì Rigidbody còn vận tốc thừa rất nhỏ sau khi
nhả joystick.

### Khi bấm Fire

```
Fire()
  ├─ _hasFired == true → return
  ├─ Aim()                          // CHỐT KẾT QUẢ theo góc nhìn hiện tại
  │    Physics.SphereCastAll(camera.position, _aimAssistRadius,
  │                          camera.forward, _maxRange,
  │                          _hitMask | _monsterMask, Ignore triggers)
  │      ├─ bỏ mọi collider IsChildOf(player), lấy hit gần nhất
  │      ├─ hit nằm trong _monsterMask → isWin = true
  │      └─ không hit gì → isWin = false, đích = origin + forward * _maxRange
  ├─ LockInput()
  │    nút Fire off, ẩn crosshair, _playerController.IsWorking = false
  └─ ShotSequence()  (coroutine)
       ├─ a. _cameraController.SetTarget(null)      // đóng băng rig
       ├─ b. DOTween: camera → _shotCameraAnchor (position + rotation),
       │       _cameraMoveDuration giây, ease _cameraEase   → chờ xong
       ├─ c. bật _weaponInHand, tắt _weaponOnBack
       ├─ d. SetTrigger("shoot") + muzzle flash + âm thanh
       ├─ e. chờ _shootAnimDelay                    // tới khung hình nhả đạn
       └─ f. spawn Bullet tại _muzzle → bay tới điểm trúng
                → spawn _impactVfx
                → isWin ? ShowWinPanel() : ShowFailPanel()
```

Bước `Aim()` nằm trước bước a là mấu chốt: kết quả tính theo hướng người chơi
đang ngắm, đoạn camera dời ra sau lưng thuần tuý là trình diễn.

Bước a bắt buộc phải có, nếu không `CameraController.LateUpdate` ghi đè vị trí
camera mỗi frame và tween DOTween sẽ bị giật ngược lại.

## 7. Xử lý lỗi và trường hợp biên

| Tình huống | Xử lý |
|---|---|
| `_aimCamera` chưa gán | Fallback `Camera.main` trong `Awake` |
| `_playerController` chưa gán | `GetComponent` trong `Awake`; vẫn null thì súng luôn ở trên tay và không khoá di chuyển |
| `_shotCameraAnchor` chưa gán | Bỏ qua đoạn dời camera, bắn ngay |
| `_bulletPrefab` hoặc `_muzzle` chưa gán | Bỏ qua đạn visual, phán kết quả sau `_resultDelay` |
| `_weaponOnBack` chưa gán | Không đeo lưng, súng luôn trên tay |
| `_animator` null hoặc `_shootTriggerParam` rỗng | Bỏ qua animation |
| `_shootClip` null | Không gọi `AudioManager` |
| `GameManager.Instance` null | Log warning, không crash |
| Bấm Fire nhiều lần | `_hasFired` chặn ngay; nút cũng `interactable = false` |
| Bắn khi đang ở trên không | Giữ vận tốc y, nhân vật rơi xuống bình thường |
| Object bị huỷ giữa chừng | `OnDestroy` kill tween và stop coroutine |
| Camera bắn trúng chính player | Bỏ qua mọi collider `IsChildOf(transform)` |
| SphereCast overlap ngay từ đầu (`distance == 0`) | `hit.point` là `(0,0,0)`, thay bằng `collider.bounds.center` |

## 8. Việc cần làm trong Unity Editor

1. Tạo Layer `Monster`, đặt cho quái **và mọi object con có collider**. Tick
   layer đó vào `_monsterMask`.
2. Thêm Collider cho quái — quái đang chỉ được DOTween kéo Transform trong
   `GameController.cs:111`, chưa có collider thì raycast không bao giờ trúng.
3. Chuẩn bị hai bản súng: một gắn vào xương tay (`_weaponInHand`), một gắn vào
   xương lưng (`_weaponOnBack`). Canh vị trí và góc xoay từng cái.
4. Tạo Empty ở đầu nòng của **bản súng trên tay**, trục Z chĩa ra hướng bắn, gán
   vào `_muzzle`.
5. Tạo Empty làm `_shotCameraAnchor`. Đặt làm con của Player thì nó luôn nằm sau
   lưng dù player đứng ở đâu.
6. Tạo Button "Fire" trên Canvas, gán vào `_btnFire`.
7. Tạo prefab đạn (quad/cube nhỏ) có component `Bullet`, gán vào `_bulletPrefab`.
8. Thêm Trigger param `shoot` vào Animator Controller cùng state bắn tương ứng.
   Canh `_shootAnimDelay` khớp với khung hình nhả đạn của anim.

## 9. Nghiệm thu (Play mode)

1. Đứng yên → súng trên tay. Chạy → súng ra sau lưng. Dừng → về tay.
2. Đang chạy mà bấm Fire → nhân vật khựng lại, anim về idle (không chạy tại
   chỗ), camera trôi ra sau lưng, súng lên tay, bắn.
3. Ngắm trúng quái rồi bấm Fire → dù camera dời đi đâu vẫn ra Win.
4. Ngắm lên trời → Fail. Ngắm vào block/tường → Fail.
5. Trong lúc cinematic, đẩy joystick → nhân vật không nhúc nhích.
6. Bấm Fire liên tục → chỉ nổ đúng một phát.
7. Bỏ trống `_shotCameraAnchor` → bắn ngay, không dời camera, vẫn ra kết quả.
8. Nhảy lên không rồi bấm Fire giữa chừng → nhân vật vẫn rơi xuống bình thường.
9. Chỉnh `_aimAssistRadius` từ 0 lên 1 → độ khó thay đổi rõ rệt.

Trong Editor bấm phím `F` để bắn nhanh, không cần nút.

## 10. Ngoài phạm vi

- Máu quái, hiệu ứng chết của quái.
- Nhiều phát đạn, hồi đạn, fire rate.
- Camera quay lại vị trí cũ sau khi bắn (Win/Fail panel hiện ngay sau đó).
- Bắn phá block Minecraft.
- Object pooling cho đạn.
