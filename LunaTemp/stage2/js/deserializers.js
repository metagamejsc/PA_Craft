var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i4658 = root || request.c( 'UnityEngine.JointSpring' )
  var i4659 = data
  i4658.spring = i4659[0]
  i4658.damper = i4659[1]
  i4658.targetPosition = i4659[2]
  return i4658
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i4660 = root || request.c( 'UnityEngine.JointMotor' )
  var i4661 = data
  i4660.m_TargetVelocity = i4661[0]
  i4660.m_Force = i4661[1]
  i4660.m_FreeSpin = i4661[2]
  return i4660
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i4662 = root || request.c( 'UnityEngine.JointLimits' )
  var i4663 = data
  i4662.m_Min = i4663[0]
  i4662.m_Max = i4663[1]
  i4662.m_Bounciness = i4663[2]
  i4662.m_BounceMinVelocity = i4663[3]
  i4662.m_ContactDistance = i4663[4]
  i4662.minBounce = i4663[5]
  i4662.maxBounce = i4663[6]
  return i4662
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i4664 = root || request.c( 'UnityEngine.JointDrive' )
  var i4665 = data
  i4664.m_PositionSpring = i4665[0]
  i4664.m_PositionDamper = i4665[1]
  i4664.m_MaximumForce = i4665[2]
  i4664.m_UseAcceleration = i4665[3]
  return i4664
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i4666 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i4667 = data
  i4666.m_Spring = i4667[0]
  i4666.m_Damper = i4667[1]
  return i4666
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i4668 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i4669 = data
  i4668.m_Limit = i4669[0]
  i4668.m_Bounciness = i4669[1]
  i4668.m_ContactDistance = i4669[2]
  return i4668
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i4670 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i4671 = data
  i4670.m_ExtremumSlip = i4671[0]
  i4670.m_ExtremumValue = i4671[1]
  i4670.m_AsymptoteSlip = i4671[2]
  i4670.m_AsymptoteValue = i4671[3]
  i4670.m_Stiffness = i4671[4]
  return i4670
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i4672 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i4673 = data
  i4672.m_LowerAngle = i4673[0]
  i4672.m_UpperAngle = i4673[1]
  return i4672
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i4674 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i4675 = data
  i4674.m_MotorSpeed = i4675[0]
  i4674.m_MaximumMotorTorque = i4675[1]
  return i4674
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i4676 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i4677 = data
  i4676.m_DampingRatio = i4677[0]
  i4676.m_Frequency = i4677[1]
  i4676.m_Angle = i4677[2]
  return i4676
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i4678 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i4679 = data
  i4678.m_LowerTranslation = i4679[0]
  i4678.m_UpperTranslation = i4679[1]
  return i4678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i4680 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i4681 = data
  i4680.name = i4681[0]
  i4680.width = i4681[1]
  i4680.height = i4681[2]
  i4680.mipmapCount = i4681[3]
  i4680.anisoLevel = i4681[4]
  i4680.filterMode = i4681[5]
  i4680.hdr = !!i4681[6]
  i4680.format = i4681[7]
  i4680.wrapMode = i4681[8]
  i4680.alphaIsTransparency = !!i4681[9]
  i4680.alphaSource = i4681[10]
  i4680.graphicsFormat = i4681[11]
  i4680.sRGBTexture = !!i4681[12]
  i4680.desiredColorSpace = i4681[13]
  i4680.wrapU = i4681[14]
  i4680.wrapV = i4681[15]
  return i4680
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i4682 = root || new pc.UnityMaterial()
  var i4683 = data
  i4682.name = i4683[0]
  request.r(i4683[1], i4683[2], 0, i4682, 'shader')
  i4682.renderQueue = i4683[3]
  i4682.enableInstancing = !!i4683[4]
  var i4685 = i4683[5]
  var i4684 = []
  for(var i = 0; i < i4685.length; i += 1) {
    i4684.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i4685[i + 0]) );
  }
  i4682.floatParameters = i4684
  var i4687 = i4683[6]
  var i4686 = []
  for(var i = 0; i < i4687.length; i += 1) {
    i4686.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i4687[i + 0]) );
  }
  i4682.colorParameters = i4686
  var i4689 = i4683[7]
  var i4688 = []
  for(var i = 0; i < i4689.length; i += 1) {
    i4688.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i4689[i + 0]) );
  }
  i4682.vectorParameters = i4688
  var i4691 = i4683[8]
  var i4690 = []
  for(var i = 0; i < i4691.length; i += 1) {
    i4690.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i4691[i + 0]) );
  }
  i4682.textureParameters = i4690
  var i4693 = i4683[9]
  var i4692 = []
  for(var i = 0; i < i4693.length; i += 1) {
    i4692.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i4693[i + 0]) );
  }
  i4682.materialFlags = i4692
  return i4682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i4696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i4697 = data
  i4696.name = i4697[0]
  i4696.value = i4697[1]
  return i4696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i4700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i4701 = data
  i4700.name = i4701[0]
  i4700.value = new pc.Color(i4701[1], i4701[2], i4701[3], i4701[4])
  return i4700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i4704 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i4705 = data
  i4704.name = i4705[0]
  i4704.value = new pc.Vec4( i4705[1], i4705[2], i4705[3], i4705[4] )
  return i4704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i4708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i4709 = data
  i4708.name = i4709[0]
  request.r(i4709[1], i4709[2], 0, i4708, 'value')
  return i4708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i4712 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i4713 = data
  i4712.name = i4713[0]
  i4712.enabled = !!i4713[1]
  return i4712
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i4714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i4715 = data
  i4714.name = i4715[0]
  i4714.index = i4715[1]
  i4714.startup = !!i4715[2]
  return i4714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i4716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i4717 = data
  i4716.aspect = i4717[0]
  i4716.orthographic = !!i4717[1]
  i4716.orthographicSize = i4717[2]
  i4716.backgroundColor = new pc.Color(i4717[3], i4717[4], i4717[5], i4717[6])
  i4716.nearClipPlane = i4717[7]
  i4716.farClipPlane = i4717[8]
  i4716.fieldOfView = i4717[9]
  i4716.depth = i4717[10]
  i4716.clearFlags = i4717[11]
  i4716.cullingMask = i4717[12]
  i4716.rect = i4717[13]
  request.r(i4717[14], i4717[15], 0, i4716, 'targetTexture')
  i4716.usePhysicalProperties = !!i4717[16]
  i4716.focalLength = i4717[17]
  i4716.sensorSize = new pc.Vec2( i4717[18], i4717[19] )
  i4716.lensShift = new pc.Vec2( i4717[20], i4717[21] )
  i4716.gateFit = i4717[22]
  i4716.commandBufferCount = i4717[23]
  i4716.cameraType = i4717[24]
  i4716.enabled = !!i4717[25]
  return i4716
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i4718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i4719 = data
  i4718.name = i4719[0]
  i4718.tagId = i4719[1]
  i4718.enabled = !!i4719[2]
  i4718.isStatic = !!i4719[3]
  i4718.layer = i4719[4]
  return i4718
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i4720 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i4721 = data
  request.r(i4721[0], i4721[1], 0, i4720, 'm_FirstSelected')
  i4720.m_sendNavigationEvents = !!i4721[2]
  i4720.m_DragThreshold = i4721[3]
  return i4720
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i4722 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i4723 = data
  i4722.m_HorizontalAxis = i4723[0]
  i4722.m_VerticalAxis = i4723[1]
  i4722.m_SubmitButton = i4723[2]
  i4722.m_CancelButton = i4723[3]
  i4722.m_InputActionsPerSecond = i4723[4]
  i4722.m_RepeatDelay = i4723[5]
  i4722.m_ForceModuleActive = !!i4723[6]
  i4722.m_SendPointerHoverToParent = !!i4723[7]
  return i4722
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i4724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i4725 = data
  i4724.pivot = new pc.Vec2( i4725[0], i4725[1] )
  i4724.anchorMin = new pc.Vec2( i4725[2], i4725[3] )
  i4724.anchorMax = new pc.Vec2( i4725[4], i4725[5] )
  i4724.sizeDelta = new pc.Vec2( i4725[6], i4725[7] )
  i4724.anchoredPosition3D = new pc.Vec3( i4725[8], i4725[9], i4725[10] )
  i4724.rotation = new pc.Quat(i4725[11], i4725[12], i4725[13], i4725[14])
  i4724.scale = new pc.Vec3( i4725[15], i4725[16], i4725[17] )
  return i4724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i4726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i4727 = data
  i4726.planeDistance = i4727[0]
  i4726.referencePixelsPerUnit = i4727[1]
  i4726.isFallbackOverlay = !!i4727[2]
  i4726.renderMode = i4727[3]
  i4726.renderOrder = i4727[4]
  i4726.sortingLayerName = i4727[5]
  i4726.sortingOrder = i4727[6]
  i4726.scaleFactor = i4727[7]
  request.r(i4727[8], i4727[9], 0, i4726, 'worldCamera')
  i4726.overrideSorting = !!i4727[10]
  i4726.pixelPerfect = !!i4727[11]
  i4726.targetDisplay = i4727[12]
  i4726.overridePixelPerfect = !!i4727[13]
  i4726.enabled = !!i4727[14]
  return i4726
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i4728 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i4729 = data
  i4728.m_UiScaleMode = i4729[0]
  i4728.m_ReferencePixelsPerUnit = i4729[1]
  i4728.m_ScaleFactor = i4729[2]
  i4728.m_ReferenceResolution = new pc.Vec2( i4729[3], i4729[4] )
  i4728.m_ScreenMatchMode = i4729[5]
  i4728.m_MatchWidthOrHeight = i4729[6]
  i4728.m_PhysicalUnit = i4729[7]
  i4728.m_FallbackScreenDPI = i4729[8]
  i4728.m_DefaultSpriteDPI = i4729[9]
  i4728.m_DynamicPixelsPerUnit = i4729[10]
  i4728.m_PresetInfoIsWorld = !!i4729[11]
  return i4728
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i4730 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i4731 = data
  i4730.m_IgnoreReversedGraphics = !!i4731[0]
  i4730.m_BlockingObjects = i4731[1]
  i4730.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i4731[2] )
  return i4730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i4732 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i4733 = data
  i4732.cullTransparentMesh = !!i4733[0]
  return i4732
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i4734 = root || request.c( 'UnityEngine.UI.Image' )
  var i4735 = data
  request.r(i4735[0], i4735[1], 0, i4734, 'm_Sprite')
  i4734.m_Type = i4735[2]
  i4734.m_PreserveAspect = !!i4735[3]
  i4734.m_FillCenter = !!i4735[4]
  i4734.m_FillMethod = i4735[5]
  i4734.m_FillAmount = i4735[6]
  i4734.m_FillClockwise = !!i4735[7]
  i4734.m_FillOrigin = i4735[8]
  i4734.m_UseSpriteMesh = !!i4735[9]
  i4734.m_PixelsPerUnitMultiplier = i4735[10]
  request.r(i4735[11], i4735[12], 0, i4734, 'm_Material')
  i4734.m_Maskable = !!i4735[13]
  i4734.m_Color = new pc.Color(i4735[14], i4735[15], i4735[16], i4735[17])
  i4734.m_RaycastTarget = !!i4735[18]
  i4734.m_RaycastPadding = new pc.Vec4( i4735[19], i4735[20], i4735[21], i4735[22] )
  return i4734
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i4736 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i4737 = data
  i4736.m_AspectMode = i4737[0]
  i4736.m_AspectRatio = i4737[1]
  return i4736
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i4738 = root || request.c( 'UnityEngine.UI.Text' )
  var i4739 = data
  i4738.m_FontData = request.d('UnityEngine.UI.FontData', i4739[0], i4738.m_FontData)
  i4738.m_Text = i4739[1]
  request.r(i4739[2], i4739[3], 0, i4738, 'm_Material')
  i4738.m_Maskable = !!i4739[4]
  i4738.m_Color = new pc.Color(i4739[5], i4739[6], i4739[7], i4739[8])
  i4738.m_RaycastTarget = !!i4739[9]
  i4738.m_RaycastPadding = new pc.Vec4( i4739[10], i4739[11], i4739[12], i4739[13] )
  return i4738
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i4740 = root || request.c( 'UnityEngine.UI.FontData' )
  var i4741 = data
  request.r(i4741[0], i4741[1], 0, i4740, 'm_Font')
  i4740.m_FontSize = i4741[2]
  i4740.m_FontStyle = i4741[3]
  i4740.m_BestFit = !!i4741[4]
  i4740.m_MinSize = i4741[5]
  i4740.m_MaxSize = i4741[6]
  i4740.m_Alignment = i4741[7]
  i4740.m_AlignByGeometry = !!i4741[8]
  i4740.m_RichText = !!i4741[9]
  i4740.m_HorizontalOverflow = i4741[10]
  i4740.m_VerticalOverflow = i4741[11]
  i4740.m_LineSpacing = i4741[12]
  return i4740
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i4742 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i4743 = data
  i4742.targetIsSelf = !!i4743[0]
  request.r(i4743[1], i4743[2], 0, i4742, 'targetGO')
  i4742.tweenTargetIsTargetGO = !!i4743[3]
  i4742.delay = i4743[4]
  i4742.duration = i4743[5]
  i4742.easeType = i4743[6]
  i4742.easeCurve = new pc.AnimationCurve( { keys_flow: i4743[7] } )
  i4742.loopType = i4743[8]
  i4742.loops = i4743[9]
  i4742.id = i4743[10]
  i4742.isRelative = !!i4743[11]
  i4742.isFrom = !!i4743[12]
  i4742.isIndependentUpdate = !!i4743[13]
  i4742.autoKill = !!i4743[14]
  i4742.autoGenerate = !!i4743[15]
  i4742.isActive = !!i4743[16]
  i4742.isValid = !!i4743[17]
  request.r(i4743[18], i4743[19], 0, i4742, 'target')
  i4742.animationType = i4743[20]
  i4742.targetType = i4743[21]
  i4742.forcedTargetType = i4743[22]
  i4742.autoPlay = !!i4743[23]
  i4742.useTargetAsV3 = !!i4743[24]
  i4742.endValueFloat = i4743[25]
  i4742.endValueV3 = new pc.Vec3( i4743[26], i4743[27], i4743[28] )
  i4742.endValueV2 = new pc.Vec2( i4743[29], i4743[30] )
  i4742.endValueColor = new pc.Color(i4743[31], i4743[32], i4743[33], i4743[34])
  i4742.endValueString = i4743[35]
  i4742.endValueRect = UnityEngine.Rect.MinMaxRect(i4743[36], i4743[37], i4743[38], i4743[39])
  request.r(i4743[40], i4743[41], 0, i4742, 'endValueTransform')
  i4742.optionalBool0 = !!i4743[42]
  i4742.optionalBool1 = !!i4743[43]
  i4742.optionalFloat0 = i4743[44]
  i4742.optionalInt0 = i4743[45]
  i4742.optionalRotationMode = i4743[46]
  i4742.optionalScrambleMode = i4743[47]
  i4742.optionalShakeRandomnessMode = i4743[48]
  i4742.optionalString = i4743[49]
  i4742.updateType = i4743[50]
  i4742.isSpeedBased = !!i4743[51]
  i4742.hasOnStart = !!i4743[52]
  i4742.hasOnPlay = !!i4743[53]
  i4742.hasOnUpdate = !!i4743[54]
  i4742.hasOnStepComplete = !!i4743[55]
  i4742.hasOnComplete = !!i4743[56]
  i4742.hasOnTweenCreated = !!i4743[57]
  i4742.hasOnRewind = !!i4743[58]
  i4742.onStart = request.d('UnityEngine.Events.UnityEvent', i4743[59], i4742.onStart)
  i4742.onPlay = request.d('UnityEngine.Events.UnityEvent', i4743[60], i4742.onPlay)
  i4742.onUpdate = request.d('UnityEngine.Events.UnityEvent', i4743[61], i4742.onUpdate)
  i4742.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i4743[62], i4742.onStepComplete)
  i4742.onComplete = request.d('UnityEngine.Events.UnityEvent', i4743[63], i4742.onComplete)
  i4742.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i4743[64], i4742.onTweenCreated)
  i4742.onRewind = request.d('UnityEngine.Events.UnityEvent', i4743[65], i4742.onRewind)
  return i4742
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i4744 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i4745 = data
  i4744.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4745[0], i4744.m_PersistentCalls)
  return i4744
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i4746 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i4747 = data
  var i4749 = i4747[0]
  var i4748 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i4749.length; i += 1) {
    i4748.add(request.d('UnityEngine.Events.PersistentCall', i4749[i + 0]));
  }
  i4746.m_Calls = i4748
  return i4746
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i4752 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i4753 = data
  request.r(i4753[0], i4753[1], 0, i4752, 'm_Target')
  i4752.m_TargetAssemblyTypeName = i4753[2]
  i4752.m_MethodName = i4753[3]
  i4752.m_Mode = i4753[4]
  i4752.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i4753[5], i4752.m_Arguments)
  i4752.m_CallState = i4753[6]
  return i4752
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i4754 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i4755 = data
  request.r(i4755[0], i4755[1], 0, i4754, 'm_Texture')
  i4754.m_UVRect = UnityEngine.Rect.MinMaxRect(i4755[2], i4755[3], i4755[4], i4755[5])
  request.r(i4755[6], i4755[7], 0, i4754, 'm_Material')
  i4754.m_Maskable = !!i4755[8]
  i4754.m_Color = new pc.Color(i4755[9], i4755[10], i4755[11], i4755[12])
  i4754.m_RaycastTarget = !!i4755[13]
  i4754.m_RaycastPadding = new pc.Vec4( i4755[14], i4755[15], i4755[16], i4755[17] )
  return i4754
}

Deserializers["TutController"] = function (request, data, root) {
  var i4756 = root || request.c( 'TutController' )
  var i4757 = data
  request.r(i4757[0], i4757[1], 0, i4756, 'leftCard')
  request.r(i4757[2], i4757[3], 0, i4756, 'rightCard')
  i4756.leftPos = new pc.Vec2( i4757[4], i4757[5] )
  i4756.rightPos = new pc.Vec2( i4757[6], i4757[7] )
  request.r(i4757[8], i4757[9], 0, i4756, 'tut')
  i4756.timeMove = i4757[10]
  i4756.timeDelay = i4757[11]
  return i4756
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i4758 = root || request.c( 'UnityEngine.UI.Mask' )
  var i4759 = data
  i4758.m_ShowMaskGraphic = !!i4759[0]
  return i4758
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i4760 = root || request.c( 'UnityEngine.UI.Button' )
  var i4761 = data
  i4760.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i4761[0], i4760.m_OnClick)
  i4760.m_Navigation = request.d('UnityEngine.UI.Navigation', i4761[1], i4760.m_Navigation)
  i4760.m_Transition = i4761[2]
  i4760.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4761[3], i4760.m_Colors)
  i4760.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4761[4], i4760.m_SpriteState)
  i4760.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4761[5], i4760.m_AnimationTriggers)
  i4760.m_Interactable = !!i4761[6]
  request.r(i4761[7], i4761[8], 0, i4760, 'm_TargetGraphic')
  return i4760
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i4762 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i4763 = data
  i4762.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4763[0], i4762.m_PersistentCalls)
  return i4762
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i4764 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i4765 = data
  i4764.m_Mode = i4765[0]
  i4764.m_WrapAround = !!i4765[1]
  request.r(i4765[2], i4765[3], 0, i4764, 'm_SelectOnUp')
  request.r(i4765[4], i4765[5], 0, i4764, 'm_SelectOnDown')
  request.r(i4765[6], i4765[7], 0, i4764, 'm_SelectOnLeft')
  request.r(i4765[8], i4765[9], 0, i4764, 'm_SelectOnRight')
  return i4764
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i4766 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i4767 = data
  i4766.m_NormalColor = new pc.Color(i4767[0], i4767[1], i4767[2], i4767[3])
  i4766.m_HighlightedColor = new pc.Color(i4767[4], i4767[5], i4767[6], i4767[7])
  i4766.m_PressedColor = new pc.Color(i4767[8], i4767[9], i4767[10], i4767[11])
  i4766.m_SelectedColor = new pc.Color(i4767[12], i4767[13], i4767[14], i4767[15])
  i4766.m_DisabledColor = new pc.Color(i4767[16], i4767[17], i4767[18], i4767[19])
  i4766.m_ColorMultiplier = i4767[20]
  i4766.m_FadeDuration = i4767[21]
  return i4766
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i4768 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i4769 = data
  request.r(i4769[0], i4769[1], 0, i4768, 'm_HighlightedSprite')
  request.r(i4769[2], i4769[3], 0, i4768, 'm_PressedSprite')
  request.r(i4769[4], i4769[5], 0, i4768, 'm_SelectedSprite')
  request.r(i4769[6], i4769[7], 0, i4768, 'm_DisabledSprite')
  return i4768
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i4770 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i4771 = data
  i4770.m_NormalTrigger = i4771[0]
  i4770.m_HighlightedTrigger = i4771[1]
  i4770.m_PressedTrigger = i4771[2]
  i4770.m_SelectedTrigger = i4771[3]
  i4770.m_DisabledTrigger = i4771[4]
  return i4770
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i4772 = root || request.c( 'LayoutController' )
  var i4773 = data
  request.r(i4773[0], i4773[1], 0, i4772, 'cardParent')
  request.r(i4773[2], i4773[3], 0, i4772, 'leftCard')
  request.r(i4773[4], i4773[5], 0, i4772, 'rightCard')
  i4772.origin = new pc.Vec2( i4773[6], i4773[7] )
  i4772.smallSize = new pc.Vec2( i4773[8], i4773[9] )
  return i4772
}

Deserializers["LunaController"] = function (request, data, root) {
  var i4774 = root || request.c( 'LunaController' )
  var i4775 = data
  i4774.TimePlay = i4775[0]
  i4774.LimitTimePlay = !!i4775[1]
  request.r(i4775[2], i4775[3], 0, i4774, 'BGM')
  request.r(i4775[4], i4775[5], 0, i4774, 'musicSource')
  request.r(i4775[6], i4775[7], 0, i4774, 'endCard')
  return i4774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i4776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i4777 = data
  request.r(i4777[0], i4777[1], 0, i4776, 'clip')
  request.r(i4777[2], i4777[3], 0, i4776, 'outputAudioMixerGroup')
  i4776.playOnAwake = !!i4777[4]
  i4776.loop = !!i4777[5]
  i4776.time = i4777[6]
  i4776.volume = i4777[7]
  i4776.pitch = i4777[8]
  i4776.enabled = !!i4777[9]
  return i4776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i4778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i4779 = data
  i4778.ambientIntensity = i4779[0]
  i4778.reflectionIntensity = i4779[1]
  i4778.ambientMode = i4779[2]
  i4778.ambientLight = new pc.Color(i4779[3], i4779[4], i4779[5], i4779[6])
  i4778.ambientSkyColor = new pc.Color(i4779[7], i4779[8], i4779[9], i4779[10])
  i4778.ambientGroundColor = new pc.Color(i4779[11], i4779[12], i4779[13], i4779[14])
  i4778.ambientEquatorColor = new pc.Color(i4779[15], i4779[16], i4779[17], i4779[18])
  i4778.fogColor = new pc.Color(i4779[19], i4779[20], i4779[21], i4779[22])
  i4778.fogEndDistance = i4779[23]
  i4778.fogStartDistance = i4779[24]
  i4778.fogDensity = i4779[25]
  i4778.fog = !!i4779[26]
  request.r(i4779[27], i4779[28], 0, i4778, 'skybox')
  i4778.fogMode = i4779[29]
  var i4781 = i4779[30]
  var i4780 = []
  for(var i = 0; i < i4781.length; i += 1) {
    i4780.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i4781[i + 0]) );
  }
  i4778.lightmaps = i4780
  i4778.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i4779[31], i4778.lightProbes)
  i4778.lightmapsMode = i4779[32]
  i4778.mixedBakeMode = i4779[33]
  i4778.environmentLightingMode = i4779[34]
  i4778.ambientProbe = new pc.SphericalHarmonicsL2(i4779[35])
  request.r(i4779[36], i4779[37], 0, i4778, 'customReflection')
  request.r(i4779[38], i4779[39], 0, i4778, 'defaultReflection')
  i4778.defaultReflectionMode = i4779[40]
  i4778.defaultReflectionResolution = i4779[41]
  i4778.sunLightObjectId = i4779[42]
  i4778.pixelLightCount = i4779[43]
  i4778.defaultReflectionHDR = !!i4779[44]
  i4778.hasLightDataAsset = !!i4779[45]
  i4778.hasManualGenerate = !!i4779[46]
  return i4778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i4784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i4785 = data
  request.r(i4785[0], i4785[1], 0, i4784, 'lightmapColor')
  request.r(i4785[2], i4785[3], 0, i4784, 'lightmapDirection')
  request.r(i4785[4], i4785[5], 0, i4784, 'shadowMask')
  return i4784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i4786 = root || new UnityEngine.LightProbes()
  var i4787 = data
  return i4786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i4794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i4795 = data
  var i4797 = i4795[0]
  var i4796 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i4797.length; i += 1) {
    i4796.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i4797[i + 0]));
  }
  i4794.ShaderCompilationErrors = i4796
  i4794.name = i4795[1]
  i4794.guid = i4795[2]
  var i4799 = i4795[3]
  var i4798 = []
  for(var i = 0; i < i4799.length; i += 1) {
    i4798.push( i4799[i + 0] );
  }
  i4794.shaderDefinedKeywords = i4798
  var i4801 = i4795[4]
  var i4800 = []
  for(var i = 0; i < i4801.length; i += 1) {
    i4800.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i4801[i + 0]) );
  }
  i4794.passes = i4800
  var i4803 = i4795[5]
  var i4802 = []
  for(var i = 0; i < i4803.length; i += 1) {
    i4802.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i4803[i + 0]) );
  }
  i4794.usePasses = i4802
  var i4805 = i4795[6]
  var i4804 = []
  for(var i = 0; i < i4805.length; i += 1) {
    i4804.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i4805[i + 0]) );
  }
  i4794.defaultParameterValues = i4804
  request.r(i4795[7], i4795[8], 0, i4794, 'unityFallbackShader')
  i4794.readDepth = !!i4795[9]
  i4794.hasDepthOnlyPass = !!i4795[10]
  i4794.isCreatedByShaderGraph = !!i4795[11]
  i4794.disableBatching = !!i4795[12]
  i4794.compiled = !!i4795[13]
  return i4794
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i4808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i4809 = data
  i4808.shaderName = i4809[0]
  i4808.errorMessage = i4809[1]
  return i4808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i4814 = root || new pc.UnityShaderPass()
  var i4815 = data
  i4814.id = i4815[0]
  i4814.subShaderIndex = i4815[1]
  i4814.name = i4815[2]
  i4814.passType = i4815[3]
  i4814.grabPassTextureName = i4815[4]
  i4814.usePass = !!i4815[5]
  i4814.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[6], i4814.zTest)
  i4814.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[7], i4814.zWrite)
  i4814.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[8], i4814.culling)
  i4814.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4815[9], i4814.blending)
  i4814.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4815[10], i4814.alphaBlending)
  i4814.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[11], i4814.colorWriteMask)
  i4814.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[12], i4814.offsetUnits)
  i4814.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[13], i4814.offsetFactor)
  i4814.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[14], i4814.stencilRef)
  i4814.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[15], i4814.stencilReadMask)
  i4814.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4815[16], i4814.stencilWriteMask)
  i4814.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4815[17], i4814.stencilOp)
  i4814.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4815[18], i4814.stencilOpFront)
  i4814.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4815[19], i4814.stencilOpBack)
  var i4817 = i4815[20]
  var i4816 = []
  for(var i = 0; i < i4817.length; i += 1) {
    i4816.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i4817[i + 0]) );
  }
  i4814.tags = i4816
  var i4819 = i4815[21]
  var i4818 = []
  for(var i = 0; i < i4819.length; i += 1) {
    i4818.push( i4819[i + 0] );
  }
  i4814.passDefinedKeywords = i4818
  var i4821 = i4815[22]
  var i4820 = []
  for(var i = 0; i < i4821.length; i += 1) {
    i4820.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i4821[i + 0]) );
  }
  i4814.passDefinedKeywordGroups = i4820
  var i4823 = i4815[23]
  var i4822 = []
  for(var i = 0; i < i4823.length; i += 1) {
    i4822.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4823[i + 0]) );
  }
  i4814.variants = i4822
  var i4825 = i4815[24]
  var i4824 = []
  for(var i = 0; i < i4825.length; i += 1) {
    i4824.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4825[i + 0]) );
  }
  i4814.excludedVariants = i4824
  i4814.hasDepthReader = !!i4815[25]
  return i4814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i4826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i4827 = data
  i4826.val = i4827[0]
  i4826.name = i4827[1]
  return i4826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i4828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i4829 = data
  i4828.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4829[0], i4828.src)
  i4828.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4829[1], i4828.dst)
  i4828.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4829[2], i4828.op)
  return i4828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i4830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i4831 = data
  i4830.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4831[0], i4830.pass)
  i4830.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4831[1], i4830.fail)
  i4830.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4831[2], i4830.zFail)
  i4830.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4831[3], i4830.comp)
  return i4830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i4834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i4835 = data
  i4834.name = i4835[0]
  i4834.value = i4835[1]
  return i4834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i4838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i4839 = data
  var i4841 = i4839[0]
  var i4840 = []
  for(var i = 0; i < i4841.length; i += 1) {
    i4840.push( i4841[i + 0] );
  }
  i4838.keywords = i4840
  i4838.hasDiscard = !!i4839[1]
  return i4838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i4844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i4845 = data
  i4844.passId = i4845[0]
  i4844.subShaderIndex = i4845[1]
  var i4847 = i4845[2]
  var i4846 = []
  for(var i = 0; i < i4847.length; i += 1) {
    i4846.push( i4847[i + 0] );
  }
  i4844.keywords = i4846
  i4844.vertexProgram = i4845[3]
  i4844.fragmentProgram = i4845[4]
  i4844.exportedForWebGl2 = !!i4845[5]
  i4844.readDepth = !!i4845[6]
  return i4844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i4850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i4851 = data
  request.r(i4851[0], i4851[1], 0, i4850, 'shader')
  i4850.pass = i4851[2]
  return i4850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i4854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i4855 = data
  i4854.name = i4855[0]
  i4854.type = i4855[1]
  i4854.value = new pc.Vec4( i4855[2], i4855[3], i4855[4], i4855[5] )
  i4854.textureValue = i4855[6]
  i4854.shaderPropertyFlag = i4855[7]
  return i4854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i4856 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i4857 = data
  i4856.name = i4857[0]
  request.r(i4857[1], i4857[2], 0, i4856, 'texture')
  i4856.aabb = i4857[3]
  i4856.vertices = i4857[4]
  i4856.triangles = i4857[5]
  i4856.textureRect = UnityEngine.Rect.MinMaxRect(i4857[6], i4857[7], i4857[8], i4857[9])
  i4856.packedRect = UnityEngine.Rect.MinMaxRect(i4857[10], i4857[11], i4857[12], i4857[13])
  i4856.border = new pc.Vec4( i4857[14], i4857[15], i4857[16], i4857[17] )
  i4856.transparency = i4857[18]
  i4856.bounds = i4857[19]
  i4856.pixelsPerUnit = i4857[20]
  i4856.textureWidth = i4857[21]
  i4856.textureHeight = i4857[22]
  i4856.nativeSize = new pc.Vec2( i4857[23], i4857[24] )
  i4856.pivot = new pc.Vec2( i4857[25], i4857[26] )
  i4856.textureRectOffset = new pc.Vec2( i4857[27], i4857[28] )
  return i4856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i4858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i4859 = data
  i4858.name = i4859[0]
  return i4858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i4860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i4861 = data
  i4860.name = i4861[0]
  i4860.ascent = i4861[1]
  i4860.originalLineHeight = i4861[2]
  i4860.fontSize = i4861[3]
  var i4863 = i4861[4]
  var i4862 = []
  for(var i = 0; i < i4863.length; i += 1) {
    i4862.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i4863[i + 0]) );
  }
  i4860.characterInfo = i4862
  request.r(i4861[5], i4861[6], 0, i4860, 'texture')
  i4860.originalFontSize = i4861[7]
  return i4860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i4866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i4867 = data
  i4866.index = i4867[0]
  i4866.advance = i4867[1]
  i4866.bearing = i4867[2]
  i4866.glyphWidth = i4867[3]
  i4866.glyphHeight = i4867[4]
  i4866.minX = i4867[5]
  i4866.maxX = i4867[6]
  i4866.minY = i4867[7]
  i4866.maxY = i4867[8]
  i4866.uvBottomLeftX = i4867[9]
  i4866.uvBottomLeftY = i4867[10]
  i4866.uvBottomRightX = i4867[11]
  i4866.uvBottomRightY = i4867[12]
  i4866.uvTopLeftX = i4867[13]
  i4866.uvTopLeftY = i4867[14]
  i4866.uvTopRightX = i4867[15]
  i4866.uvTopRightY = i4867[16]
  return i4866
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i4868 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i4869 = data
  i4868.useSafeMode = !!i4869[0]
  i4868.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i4869[1], i4868.safeModeOptions)
  i4868.timeScale = i4869[2]
  i4868.unscaledTimeScale = i4869[3]
  i4868.useSmoothDeltaTime = !!i4869[4]
  i4868.maxSmoothUnscaledTime = i4869[5]
  i4868.rewindCallbackMode = i4869[6]
  i4868.showUnityEditorReport = !!i4869[7]
  i4868.logBehaviour = i4869[8]
  i4868.drawGizmos = !!i4869[9]
  i4868.defaultRecyclable = !!i4869[10]
  i4868.defaultAutoPlay = i4869[11]
  i4868.defaultUpdateType = i4869[12]
  i4868.defaultTimeScaleIndependent = !!i4869[13]
  i4868.defaultEaseType = i4869[14]
  i4868.defaultEaseOvershootOrAmplitude = i4869[15]
  i4868.defaultEasePeriod = i4869[16]
  i4868.defaultAutoKill = !!i4869[17]
  i4868.defaultLoopType = i4869[18]
  i4868.debugMode = !!i4869[19]
  i4868.debugStoreTargetId = !!i4869[20]
  i4868.showPreviewPanel = !!i4869[21]
  i4868.storeSettingsLocation = i4869[22]
  i4868.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i4869[23], i4868.modules)
  i4868.createASMDEF = !!i4869[24]
  i4868.showPlayingTweens = !!i4869[25]
  i4868.showPausedTweens = !!i4869[26]
  return i4868
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i4870 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i4871 = data
  i4870.logBehaviour = i4871[0]
  i4870.nestedTweenFailureBehaviour = i4871[1]
  return i4870
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i4872 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i4873 = data
  i4872.showPanel = !!i4873[0]
  i4872.audioEnabled = !!i4873[1]
  i4872.physicsEnabled = !!i4873[2]
  i4872.physics2DEnabled = !!i4873[3]
  i4872.spriteEnabled = !!i4873[4]
  i4872.uiEnabled = !!i4873[5]
  i4872.textMeshProEnabled = !!i4873[6]
  i4872.tk2DEnabled = !!i4873[7]
  i4872.deAudioEnabled = !!i4873[8]
  i4872.deUnityExtendedEnabled = !!i4873[9]
  i4872.epoOutlineEnabled = !!i4873[10]
  return i4872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i4874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i4875 = data
  var i4877 = i4875[0]
  var i4876 = []
  for(var i = 0; i < i4877.length; i += 1) {
    i4876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i4877[i + 0]) );
  }
  i4874.files = i4876
  i4874.componentToPrefabIds = i4875[1]
  return i4874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i4880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i4881 = data
  i4880.path = i4881[0]
  request.r(i4881[1], i4881[2], 0, i4880, 'unityObject')
  return i4880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i4882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i4883 = data
  var i4885 = i4883[0]
  var i4884 = []
  for(var i = 0; i < i4885.length; i += 1) {
    i4884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i4885[i + 0]) );
  }
  i4882.scriptsExecutionOrder = i4884
  var i4887 = i4883[1]
  var i4886 = []
  for(var i = 0; i < i4887.length; i += 1) {
    i4886.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i4887[i + 0]) );
  }
  i4882.sortingLayers = i4886
  var i4889 = i4883[2]
  var i4888 = []
  for(var i = 0; i < i4889.length; i += 1) {
    i4888.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i4889[i + 0]) );
  }
  i4882.cullingLayers = i4888
  i4882.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i4883[3], i4882.timeSettings)
  i4882.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i4883[4], i4882.physicsSettings)
  i4882.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i4883[5], i4882.physics2DSettings)
  i4882.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4883[6], i4882.qualitySettings)
  i4882.enableRealtimeShadows = !!i4883[7]
  i4882.enableAutoInstancing = !!i4883[8]
  i4882.enableStaticBatching = !!i4883[9]
  i4882.enableDynamicBatching = !!i4883[10]
  i4882.usePreservativeDynamicBatching = !!i4883[11]
  i4882.lightmapEncodingQuality = i4883[12]
  i4882.desiredColorSpace = i4883[13]
  var i4891 = i4883[14]
  var i4890 = []
  for(var i = 0; i < i4891.length; i += 1) {
    i4890.push( i4891[i + 0] );
  }
  i4882.allTags = i4890
  return i4882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i4894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i4895 = data
  i4894.name = i4895[0]
  i4894.value = i4895[1]
  return i4894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i4898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i4899 = data
  i4898.id = i4899[0]
  i4898.name = i4899[1]
  i4898.value = i4899[2]
  return i4898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i4902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i4903 = data
  i4902.id = i4903[0]
  i4902.name = i4903[1]
  return i4902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i4904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i4905 = data
  i4904.fixedDeltaTime = i4905[0]
  i4904.maximumDeltaTime = i4905[1]
  i4904.timeScale = i4905[2]
  i4904.maximumParticleTimestep = i4905[3]
  return i4904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i4906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i4907 = data
  i4906.gravity = new pc.Vec3( i4907[0], i4907[1], i4907[2] )
  i4906.defaultSolverIterations = i4907[3]
  i4906.bounceThreshold = i4907[4]
  i4906.autoSyncTransforms = !!i4907[5]
  i4906.autoSimulation = !!i4907[6]
  var i4909 = i4907[7]
  var i4908 = []
  for(var i = 0; i < i4909.length; i += 1) {
    i4908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i4909[i + 0]) );
  }
  i4906.collisionMatrix = i4908
  return i4906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i4912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i4913 = data
  i4912.enabled = !!i4913[0]
  i4912.layerId = i4913[1]
  i4912.otherLayerId = i4913[2]
  return i4912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i4914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i4915 = data
  request.r(i4915[0], i4915[1], 0, i4914, 'material')
  i4914.gravity = new pc.Vec2( i4915[2], i4915[3] )
  i4914.positionIterations = i4915[4]
  i4914.velocityIterations = i4915[5]
  i4914.velocityThreshold = i4915[6]
  i4914.maxLinearCorrection = i4915[7]
  i4914.maxAngularCorrection = i4915[8]
  i4914.maxTranslationSpeed = i4915[9]
  i4914.maxRotationSpeed = i4915[10]
  i4914.baumgarteScale = i4915[11]
  i4914.baumgarteTOIScale = i4915[12]
  i4914.timeToSleep = i4915[13]
  i4914.linearSleepTolerance = i4915[14]
  i4914.angularSleepTolerance = i4915[15]
  i4914.defaultContactOffset = i4915[16]
  i4914.autoSimulation = !!i4915[17]
  i4914.queriesHitTriggers = !!i4915[18]
  i4914.queriesStartInColliders = !!i4915[19]
  i4914.callbacksOnDisable = !!i4915[20]
  i4914.reuseCollisionCallbacks = !!i4915[21]
  i4914.autoSyncTransforms = !!i4915[22]
  var i4917 = i4915[23]
  var i4916 = []
  for(var i = 0; i < i4917.length; i += 1) {
    i4916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i4917[i + 0]) );
  }
  i4914.collisionMatrix = i4916
  return i4914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i4920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i4921 = data
  i4920.enabled = !!i4921[0]
  i4920.layerId = i4921[1]
  i4920.otherLayerId = i4921[2]
  return i4920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i4922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i4923 = data
  var i4925 = i4923[0]
  var i4924 = []
  for(var i = 0; i < i4925.length; i += 1) {
    i4924.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4925[i + 0]) );
  }
  i4922.qualityLevels = i4924
  var i4927 = i4923[1]
  var i4926 = []
  for(var i = 0; i < i4927.length; i += 1) {
    i4926.push( i4927[i + 0] );
  }
  i4922.names = i4926
  i4922.shadows = i4923[2]
  i4922.anisotropicFiltering = i4923[3]
  i4922.antiAliasing = i4923[4]
  i4922.lodBias = i4923[5]
  i4922.shadowCascades = i4923[6]
  i4922.shadowDistance = i4923[7]
  i4922.shadowmaskMode = i4923[8]
  i4922.shadowProjection = i4923[9]
  i4922.shadowResolution = i4923[10]
  i4922.softParticles = !!i4923[11]
  i4922.softVegetation = !!i4923[12]
  i4922.activeColorSpace = i4923[13]
  i4922.desiredColorSpace = i4923[14]
  i4922.masterTextureLimit = i4923[15]
  i4922.maxQueuedFrames = i4923[16]
  i4922.particleRaycastBudget = i4923[17]
  i4922.pixelLightCount = i4923[18]
  i4922.realtimeReflectionProbes = !!i4923[19]
  i4922.shadowCascade2Split = i4923[20]
  i4922.shadowCascade4Split = new pc.Vec3( i4923[21], i4923[22], i4923[23] )
  i4922.streamingMipmapsActive = !!i4923[24]
  i4922.vSyncCount = i4923[25]
  i4922.asyncUploadBufferSize = i4923[26]
  i4922.asyncUploadTimeSlice = i4923[27]
  i4922.billboardsFaceCameraPosition = !!i4923[28]
  i4922.shadowNearPlaneOffset = i4923[29]
  i4922.streamingMipmapsMemoryBudget = i4923[30]
  i4922.maximumLODLevel = i4923[31]
  i4922.streamingMipmapsAddAllCameras = !!i4923[32]
  i4922.streamingMipmapsMaxLevelReduction = i4923[33]
  i4922.streamingMipmapsRenderersPerFrame = i4923[34]
  i4922.resolutionScalingFixedDPIFactor = i4923[35]
  i4922.streamingMipmapsMaxFileIORequests = i4923[36]
  i4922.currentQualityLevel = i4923[37]
  return i4922
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i4930 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i4931 = data
  request.r(i4931[0], i4931[1], 0, i4930, 'm_ObjectArgument')
  i4930.m_ObjectArgumentAssemblyTypeName = i4931[2]
  i4930.m_IntArgument = i4931[3]
  i4930.m_FloatArgument = i4931[4]
  i4930.m_StringArgument = i4931[5]
  i4930.m_BoolArgument = !!i4931[6]
  return i4930
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"29":[30],"31":[30],"32":[30],"33":[30],"34":[30],"35":[30],"36":[37],"38":[1],"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[47],"54":[47],"55":[47],"56":[47],"57":[47],"58":[47],"59":[47],"60":[1],"61":[62],"63":[64],"65":[64],"7":[6],"66":[67],"68":[1],"69":[70],"71":[6],"72":[10,6],"73":[62],"74":[10,6],"75":[6],"76":[6],"77":[62,6],"78":[6,10],"79":[80],"81":[80],"82":[80],"83":[6],"84":[6],"9":[7],"11":[10,6],"13":[6],"8":[7],"85":[6],"86":[6],"87":[6],"88":[6],"89":[6],"90":[6],"91":[6],"22":[6],"92":[6],"19":[10,6],"93":[6],"94":[6],"95":[6],"96":[6],"14":[10,6],"97":[6],"98":[4],"99":[4],"5":[4],"100":[4],"101":[1],"102":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.Material","UnityEngine.UI.RawImage","UnityEngine.Texture2D","TutController","UnityEngine.UI.Mask","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "08/27/2026 08:36:09";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CBBW3_V07_DungNV_TamNTM";

Deserializers.lunaAppID = "40867";

Deserializers.projectId = "51e51bdadb0e0e54d801b4bff97874f2";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1839";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3733";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_V35";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "09673431-6de3-4129-827a-a77682957ada";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

