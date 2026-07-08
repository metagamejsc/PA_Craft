var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i270 = root || request.c( 'UnityEngine.JointSpring' )
  var i271 = data
  i270.spring = i271[0]
  i270.damper = i271[1]
  i270.targetPosition = i271[2]
  return i270
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i272 = root || request.c( 'UnityEngine.JointMotor' )
  var i273 = data
  i272.m_TargetVelocity = i273[0]
  i272.m_Force = i273[1]
  i272.m_FreeSpin = i273[2]
  return i272
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i274 = root || request.c( 'UnityEngine.JointLimits' )
  var i275 = data
  i274.m_Min = i275[0]
  i274.m_Max = i275[1]
  i274.m_Bounciness = i275[2]
  i274.m_BounceMinVelocity = i275[3]
  i274.m_ContactDistance = i275[4]
  i274.minBounce = i275[5]
  i274.maxBounce = i275[6]
  return i274
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i276 = root || request.c( 'UnityEngine.JointDrive' )
  var i277 = data
  i276.m_PositionSpring = i277[0]
  i276.m_PositionDamper = i277[1]
  i276.m_MaximumForce = i277[2]
  i276.m_UseAcceleration = i277[3]
  return i276
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i278 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i279 = data
  i278.m_Spring = i279[0]
  i278.m_Damper = i279[1]
  return i278
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i280 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i281 = data
  i280.m_Limit = i281[0]
  i280.m_Bounciness = i281[1]
  i280.m_ContactDistance = i281[2]
  return i280
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i282 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i283 = data
  i282.m_ExtremumSlip = i283[0]
  i282.m_ExtremumValue = i283[1]
  i282.m_AsymptoteSlip = i283[2]
  i282.m_AsymptoteValue = i283[3]
  i282.m_Stiffness = i283[4]
  return i282
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i284 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i285 = data
  i284.m_LowerAngle = i285[0]
  i284.m_UpperAngle = i285[1]
  return i284
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i286 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i287 = data
  i286.m_MotorSpeed = i287[0]
  i286.m_MaximumMotorTorque = i287[1]
  return i286
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i288 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i289 = data
  i288.m_DampingRatio = i289[0]
  i288.m_Frequency = i289[1]
  i288.m_Angle = i289[2]
  return i288
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i290 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i291 = data
  i290.m_LowerTranslation = i291[0]
  i290.m_UpperTranslation = i291[1]
  return i290
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i292 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i293 = data
  i292.name = i293[0]
  i292.width = i293[1]
  i292.height = i293[2]
  i292.mipmapCount = i293[3]
  i292.anisoLevel = i293[4]
  i292.filterMode = i293[5]
  i292.hdr = !!i293[6]
  i292.format = i293[7]
  i292.wrapMode = i293[8]
  i292.alphaIsTransparency = !!i293[9]
  i292.alphaSource = i293[10]
  i292.graphicsFormat = i293[11]
  i292.sRGBTexture = !!i293[12]
  i292.desiredColorSpace = i293[13]
  i292.wrapU = i293[14]
  i292.wrapV = i293[15]
  return i292
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i295 = data
  i294.name = i295[0]
  i294.index = i295[1]
  i294.startup = !!i295[2]
  return i294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i297 = data
  i296.aspect = i297[0]
  i296.orthographic = !!i297[1]
  i296.orthographicSize = i297[2]
  i296.backgroundColor = new pc.Color(i297[3], i297[4], i297[5], i297[6])
  i296.nearClipPlane = i297[7]
  i296.farClipPlane = i297[8]
  i296.fieldOfView = i297[9]
  i296.depth = i297[10]
  i296.clearFlags = i297[11]
  i296.cullingMask = i297[12]
  i296.rect = i297[13]
  request.r(i297[14], i297[15], 0, i296, 'targetTexture')
  i296.usePhysicalProperties = !!i297[16]
  i296.focalLength = i297[17]
  i296.sensorSize = new pc.Vec2( i297[18], i297[19] )
  i296.lensShift = new pc.Vec2( i297[20], i297[21] )
  i296.gateFit = i297[22]
  i296.commandBufferCount = i297[23]
  i296.cameraType = i297[24]
  i296.enabled = !!i297[25]
  return i296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i299 = data
  i298.name = i299[0]
  i298.tagId = i299[1]
  i298.enabled = !!i299[2]
  i298.isStatic = !!i299[3]
  i298.layer = i299[4]
  return i298
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i300 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i301 = data
  request.r(i301[0], i301[1], 0, i300, 'm_FirstSelected')
  i300.m_sendNavigationEvents = !!i301[2]
  i300.m_DragThreshold = i301[3]
  return i300
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i302 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i303 = data
  i302.m_HorizontalAxis = i303[0]
  i302.m_VerticalAxis = i303[1]
  i302.m_SubmitButton = i303[2]
  i302.m_CancelButton = i303[3]
  i302.m_InputActionsPerSecond = i303[4]
  i302.m_RepeatDelay = i303[5]
  i302.m_ForceModuleActive = !!i303[6]
  i302.m_SendPointerHoverToParent = !!i303[7]
  return i302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i305 = data
  i304.pivot = new pc.Vec2( i305[0], i305[1] )
  i304.anchorMin = new pc.Vec2( i305[2], i305[3] )
  i304.anchorMax = new pc.Vec2( i305[4], i305[5] )
  i304.sizeDelta = new pc.Vec2( i305[6], i305[7] )
  i304.anchoredPosition3D = new pc.Vec3( i305[8], i305[9], i305[10] )
  i304.rotation = new pc.Quat(i305[11], i305[12], i305[13], i305[14])
  i304.scale = new pc.Vec3( i305[15], i305[16], i305[17] )
  return i304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i307 = data
  i306.planeDistance = i307[0]
  i306.referencePixelsPerUnit = i307[1]
  i306.isFallbackOverlay = !!i307[2]
  i306.renderMode = i307[3]
  i306.renderOrder = i307[4]
  i306.sortingLayerName = i307[5]
  i306.sortingOrder = i307[6]
  i306.scaleFactor = i307[7]
  request.r(i307[8], i307[9], 0, i306, 'worldCamera')
  i306.overrideSorting = !!i307[10]
  i306.pixelPerfect = !!i307[11]
  i306.targetDisplay = i307[12]
  i306.overridePixelPerfect = !!i307[13]
  i306.enabled = !!i307[14]
  return i306
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i308 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i309 = data
  i308.m_UiScaleMode = i309[0]
  i308.m_ReferencePixelsPerUnit = i309[1]
  i308.m_ScaleFactor = i309[2]
  i308.m_ReferenceResolution = new pc.Vec2( i309[3], i309[4] )
  i308.m_ScreenMatchMode = i309[5]
  i308.m_MatchWidthOrHeight = i309[6]
  i308.m_PhysicalUnit = i309[7]
  i308.m_FallbackScreenDPI = i309[8]
  i308.m_DefaultSpriteDPI = i309[9]
  i308.m_DynamicPixelsPerUnit = i309[10]
  i308.m_PresetInfoIsWorld = !!i309[11]
  return i308
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i310 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i311 = data
  i310.m_IgnoreReversedGraphics = !!i311[0]
  i310.m_BlockingObjects = i311[1]
  i310.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i311[2] )
  return i310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i313 = data
  i312.cullTransparentMesh = !!i313[0]
  return i312
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i314 = root || request.c( 'UnityEngine.UI.Image' )
  var i315 = data
  request.r(i315[0], i315[1], 0, i314, 'm_Sprite')
  i314.m_Type = i315[2]
  i314.m_PreserveAspect = !!i315[3]
  i314.m_FillCenter = !!i315[4]
  i314.m_FillMethod = i315[5]
  i314.m_FillAmount = i315[6]
  i314.m_FillClockwise = !!i315[7]
  i314.m_FillOrigin = i315[8]
  i314.m_UseSpriteMesh = !!i315[9]
  i314.m_PixelsPerUnitMultiplier = i315[10]
  request.r(i315[11], i315[12], 0, i314, 'm_Material')
  i314.m_Maskable = !!i315[13]
  i314.m_Color = new pc.Color(i315[14], i315[15], i315[16], i315[17])
  i314.m_RaycastTarget = !!i315[18]
  i314.m_RaycastPadding = new pc.Vec4( i315[19], i315[20], i315[21], i315[22] )
  return i314
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i316 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i317 = data
  i316.m_AspectMode = i317[0]
  i316.m_AspectRatio = i317[1]
  return i316
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i318 = root || request.c( 'UnityEngine.UI.Text' )
  var i319 = data
  i318.m_FontData = request.d('UnityEngine.UI.FontData', i319[0], i318.m_FontData)
  i318.m_Text = i319[1]
  request.r(i319[2], i319[3], 0, i318, 'm_Material')
  i318.m_Maskable = !!i319[4]
  i318.m_Color = new pc.Color(i319[5], i319[6], i319[7], i319[8])
  i318.m_RaycastTarget = !!i319[9]
  i318.m_RaycastPadding = new pc.Vec4( i319[10], i319[11], i319[12], i319[13] )
  return i318
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i320 = root || request.c( 'UnityEngine.UI.FontData' )
  var i321 = data
  request.r(i321[0], i321[1], 0, i320, 'm_Font')
  i320.m_FontSize = i321[2]
  i320.m_FontStyle = i321[3]
  i320.m_BestFit = !!i321[4]
  i320.m_MinSize = i321[5]
  i320.m_MaxSize = i321[6]
  i320.m_Alignment = i321[7]
  i320.m_AlignByGeometry = !!i321[8]
  i320.m_RichText = !!i321[9]
  i320.m_HorizontalOverflow = i321[10]
  i320.m_VerticalOverflow = i321[11]
  i320.m_LineSpacing = i321[12]
  return i320
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i322 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i323 = data
  i322.targetIsSelf = !!i323[0]
  request.r(i323[1], i323[2], 0, i322, 'targetGO')
  i322.tweenTargetIsTargetGO = !!i323[3]
  i322.delay = i323[4]
  i322.duration = i323[5]
  i322.easeType = i323[6]
  i322.easeCurve = new pc.AnimationCurve( { keys_flow: i323[7] } )
  i322.loopType = i323[8]
  i322.loops = i323[9]
  i322.id = i323[10]
  i322.isRelative = !!i323[11]
  i322.isFrom = !!i323[12]
  i322.isIndependentUpdate = !!i323[13]
  i322.autoKill = !!i323[14]
  i322.autoGenerate = !!i323[15]
  i322.isActive = !!i323[16]
  i322.isValid = !!i323[17]
  request.r(i323[18], i323[19], 0, i322, 'target')
  i322.animationType = i323[20]
  i322.targetType = i323[21]
  i322.forcedTargetType = i323[22]
  i322.autoPlay = !!i323[23]
  i322.useTargetAsV3 = !!i323[24]
  i322.endValueFloat = i323[25]
  i322.endValueV3 = new pc.Vec3( i323[26], i323[27], i323[28] )
  i322.endValueV2 = new pc.Vec2( i323[29], i323[30] )
  i322.endValueColor = new pc.Color(i323[31], i323[32], i323[33], i323[34])
  i322.endValueString = i323[35]
  i322.endValueRect = UnityEngine.Rect.MinMaxRect(i323[36], i323[37], i323[38], i323[39])
  request.r(i323[40], i323[41], 0, i322, 'endValueTransform')
  i322.optionalBool0 = !!i323[42]
  i322.optionalBool1 = !!i323[43]
  i322.optionalFloat0 = i323[44]
  i322.optionalInt0 = i323[45]
  i322.optionalRotationMode = i323[46]
  i322.optionalScrambleMode = i323[47]
  i322.optionalShakeRandomnessMode = i323[48]
  i322.optionalString = i323[49]
  i322.updateType = i323[50]
  i322.isSpeedBased = !!i323[51]
  i322.hasOnStart = !!i323[52]
  i322.hasOnPlay = !!i323[53]
  i322.hasOnUpdate = !!i323[54]
  i322.hasOnStepComplete = !!i323[55]
  i322.hasOnComplete = !!i323[56]
  i322.hasOnTweenCreated = !!i323[57]
  i322.hasOnRewind = !!i323[58]
  i322.onStart = request.d('UnityEngine.Events.UnityEvent', i323[59], i322.onStart)
  i322.onPlay = request.d('UnityEngine.Events.UnityEvent', i323[60], i322.onPlay)
  i322.onUpdate = request.d('UnityEngine.Events.UnityEvent', i323[61], i322.onUpdate)
  i322.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i323[62], i322.onStepComplete)
  i322.onComplete = request.d('UnityEngine.Events.UnityEvent', i323[63], i322.onComplete)
  i322.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i323[64], i322.onTweenCreated)
  i322.onRewind = request.d('UnityEngine.Events.UnityEvent', i323[65], i322.onRewind)
  return i322
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i324 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i325 = data
  i324.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i325[0], i324.m_PersistentCalls)
  return i324
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i326 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i327 = data
  var i329 = i327[0]
  var i328 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i329.length; i += 1) {
    i328.add(request.d('UnityEngine.Events.PersistentCall', i329[i + 0]));
  }
  i326.m_Calls = i328
  return i326
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i332 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i333 = data
  request.r(i333[0], i333[1], 0, i332, 'm_Target')
  i332.m_TargetAssemblyTypeName = i333[2]
  i332.m_MethodName = i333[3]
  i332.m_Mode = i333[4]
  i332.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i333[5], i332.m_Arguments)
  i332.m_CallState = i333[6]
  return i332
}

Deserializers["TutController"] = function (request, data, root) {
  var i334 = root || request.c( 'TutController' )
  var i335 = data
  request.r(i335[0], i335[1], 0, i334, 'leftCard')
  request.r(i335[2], i335[3], 0, i334, 'rightCard')
  i334.leftPos = new pc.Vec2( i335[4], i335[5] )
  i334.rightPos = new pc.Vec2( i335[6], i335[7] )
  request.r(i335[8], i335[9], 0, i334, 'tut')
  i334.timeMove = i335[10]
  i334.timeDelay = i335[11]
  return i334
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i336 = root || request.c( 'UnityEngine.UI.Button' )
  var i337 = data
  i336.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i337[0], i336.m_OnClick)
  i336.m_Navigation = request.d('UnityEngine.UI.Navigation', i337[1], i336.m_Navigation)
  i336.m_Transition = i337[2]
  i336.m_Colors = request.d('UnityEngine.UI.ColorBlock', i337[3], i336.m_Colors)
  i336.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i337[4], i336.m_SpriteState)
  i336.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i337[5], i336.m_AnimationTriggers)
  i336.m_Interactable = !!i337[6]
  request.r(i337[7], i337[8], 0, i336, 'm_TargetGraphic')
  return i336
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i338 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i339 = data
  i338.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i339[0], i338.m_PersistentCalls)
  return i338
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i340 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i341 = data
  i340.m_Mode = i341[0]
  i340.m_WrapAround = !!i341[1]
  request.r(i341[2], i341[3], 0, i340, 'm_SelectOnUp')
  request.r(i341[4], i341[5], 0, i340, 'm_SelectOnDown')
  request.r(i341[6], i341[7], 0, i340, 'm_SelectOnLeft')
  request.r(i341[8], i341[9], 0, i340, 'm_SelectOnRight')
  return i340
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i342 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i343 = data
  i342.m_NormalColor = new pc.Color(i343[0], i343[1], i343[2], i343[3])
  i342.m_HighlightedColor = new pc.Color(i343[4], i343[5], i343[6], i343[7])
  i342.m_PressedColor = new pc.Color(i343[8], i343[9], i343[10], i343[11])
  i342.m_SelectedColor = new pc.Color(i343[12], i343[13], i343[14], i343[15])
  i342.m_DisabledColor = new pc.Color(i343[16], i343[17], i343[18], i343[19])
  i342.m_ColorMultiplier = i343[20]
  i342.m_FadeDuration = i343[21]
  return i342
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i344 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i345 = data
  request.r(i345[0], i345[1], 0, i344, 'm_HighlightedSprite')
  request.r(i345[2], i345[3], 0, i344, 'm_PressedSprite')
  request.r(i345[4], i345[5], 0, i344, 'm_SelectedSprite')
  request.r(i345[6], i345[7], 0, i344, 'm_DisabledSprite')
  return i344
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i346 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i347 = data
  i346.m_NormalTrigger = i347[0]
  i346.m_HighlightedTrigger = i347[1]
  i346.m_PressedTrigger = i347[2]
  i346.m_SelectedTrigger = i347[3]
  i346.m_DisabledTrigger = i347[4]
  return i346
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i348 = root || request.c( 'LayoutController' )
  var i349 = data
  request.r(i349[0], i349[1], 0, i348, 'cardParent')
  request.r(i349[2], i349[3], 0, i348, 'leftCard')
  request.r(i349[4], i349[5], 0, i348, 'rightCard')
  i348.origin = new pc.Vec2( i349[6], i349[7] )
  i348.smallSize = new pc.Vec2( i349[8], i349[9] )
  return i348
}

Deserializers["LunaController"] = function (request, data, root) {
  var i350 = root || request.c( 'LunaController' )
  var i351 = data
  i350.TimePlay = i351[0]
  i350.LimitTimePlay = !!i351[1]
  request.r(i351[2], i351[3], 0, i350, 'endCard')
  return i350
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i353 = data
  request.r(i353[0], i353[1], 0, i352, 'clip')
  request.r(i353[2], i353[3], 0, i352, 'outputAudioMixerGroup')
  i352.playOnAwake = !!i353[4]
  i352.loop = !!i353[5]
  i352.time = i353[6]
  i352.volume = i353[7]
  i352.pitch = i353[8]
  i352.enabled = !!i353[9]
  return i352
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i355 = data
  i354.ambientIntensity = i355[0]
  i354.reflectionIntensity = i355[1]
  i354.ambientMode = i355[2]
  i354.ambientLight = new pc.Color(i355[3], i355[4], i355[5], i355[6])
  i354.ambientSkyColor = new pc.Color(i355[7], i355[8], i355[9], i355[10])
  i354.ambientGroundColor = new pc.Color(i355[11], i355[12], i355[13], i355[14])
  i354.ambientEquatorColor = new pc.Color(i355[15], i355[16], i355[17], i355[18])
  i354.fogColor = new pc.Color(i355[19], i355[20], i355[21], i355[22])
  i354.fogEndDistance = i355[23]
  i354.fogStartDistance = i355[24]
  i354.fogDensity = i355[25]
  i354.fog = !!i355[26]
  request.r(i355[27], i355[28], 0, i354, 'skybox')
  i354.fogMode = i355[29]
  var i357 = i355[30]
  var i356 = []
  for(var i = 0; i < i357.length; i += 1) {
    i356.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i357[i + 0]) );
  }
  i354.lightmaps = i356
  i354.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i355[31], i354.lightProbes)
  i354.lightmapsMode = i355[32]
  i354.mixedBakeMode = i355[33]
  i354.environmentLightingMode = i355[34]
  i354.ambientProbe = new pc.SphericalHarmonicsL2(i355[35])
  request.r(i355[36], i355[37], 0, i354, 'customReflection')
  request.r(i355[38], i355[39], 0, i354, 'defaultReflection')
  i354.defaultReflectionMode = i355[40]
  i354.defaultReflectionResolution = i355[41]
  i354.sunLightObjectId = i355[42]
  i354.pixelLightCount = i355[43]
  i354.defaultReflectionHDR = !!i355[44]
  i354.hasLightDataAsset = !!i355[45]
  i354.hasManualGenerate = !!i355[46]
  return i354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i361 = data
  request.r(i361[0], i361[1], 0, i360, 'lightmapColor')
  request.r(i361[2], i361[3], 0, i360, 'lightmapDirection')
  request.r(i361[4], i361[5], 0, i360, 'shadowMask')
  return i360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i362 = root || new UnityEngine.LightProbes()
  var i363 = data
  return i362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i370 = root || new pc.UnityMaterial()
  var i371 = data
  i370.name = i371[0]
  request.r(i371[1], i371[2], 0, i370, 'shader')
  i370.renderQueue = i371[3]
  i370.enableInstancing = !!i371[4]
  var i373 = i371[5]
  var i372 = []
  for(var i = 0; i < i373.length; i += 1) {
    i372.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i373[i + 0]) );
  }
  i370.floatParameters = i372
  var i375 = i371[6]
  var i374 = []
  for(var i = 0; i < i375.length; i += 1) {
    i374.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i375[i + 0]) );
  }
  i370.colorParameters = i374
  var i377 = i371[7]
  var i376 = []
  for(var i = 0; i < i377.length; i += 1) {
    i376.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i377[i + 0]) );
  }
  i370.vectorParameters = i376
  var i379 = i371[8]
  var i378 = []
  for(var i = 0; i < i379.length; i += 1) {
    i378.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i379[i + 0]) );
  }
  i370.textureParameters = i378
  var i381 = i371[9]
  var i380 = []
  for(var i = 0; i < i381.length; i += 1) {
    i380.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i381[i + 0]) );
  }
  i370.materialFlags = i380
  return i370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i385 = data
  i384.name = i385[0]
  i384.value = i385[1]
  return i384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i389 = data
  i388.name = i389[0]
  i388.value = new pc.Color(i389[1], i389[2], i389[3], i389[4])
  return i388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i393 = data
  i392.name = i393[0]
  i392.value = new pc.Vec4( i393[1], i393[2], i393[3], i393[4] )
  return i392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i397 = data
  i396.name = i397[0]
  request.r(i397[1], i397[2], 0, i396, 'value')
  return i396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i401 = data
  i400.name = i401[0]
  i400.enabled = !!i401[1]
  return i400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i403 = data
  var i405 = i403[0]
  var i404 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i405.length; i += 1) {
    i404.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i405[i + 0]));
  }
  i402.ShaderCompilationErrors = i404
  i402.name = i403[1]
  i402.guid = i403[2]
  var i407 = i403[3]
  var i406 = []
  for(var i = 0; i < i407.length; i += 1) {
    i406.push( i407[i + 0] );
  }
  i402.shaderDefinedKeywords = i406
  var i409 = i403[4]
  var i408 = []
  for(var i = 0; i < i409.length; i += 1) {
    i408.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i409[i + 0]) );
  }
  i402.passes = i408
  var i411 = i403[5]
  var i410 = []
  for(var i = 0; i < i411.length; i += 1) {
    i410.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i411[i + 0]) );
  }
  i402.usePasses = i410
  var i413 = i403[6]
  var i412 = []
  for(var i = 0; i < i413.length; i += 1) {
    i412.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i413[i + 0]) );
  }
  i402.defaultParameterValues = i412
  request.r(i403[7], i403[8], 0, i402, 'unityFallbackShader')
  i402.readDepth = !!i403[9]
  i402.hasDepthOnlyPass = !!i403[10]
  i402.isCreatedByShaderGraph = !!i403[11]
  i402.disableBatching = !!i403[12]
  i402.compiled = !!i403[13]
  return i402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i417 = data
  i416.shaderName = i417[0]
  i416.errorMessage = i417[1]
  return i416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i422 = root || new pc.UnityShaderPass()
  var i423 = data
  i422.id = i423[0]
  i422.subShaderIndex = i423[1]
  i422.name = i423[2]
  i422.passType = i423[3]
  i422.grabPassTextureName = i423[4]
  i422.usePass = !!i423[5]
  i422.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[6], i422.zTest)
  i422.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[7], i422.zWrite)
  i422.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[8], i422.culling)
  i422.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i423[9], i422.blending)
  i422.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i423[10], i422.alphaBlending)
  i422.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[11], i422.colorWriteMask)
  i422.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[12], i422.offsetUnits)
  i422.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[13], i422.offsetFactor)
  i422.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[14], i422.stencilRef)
  i422.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[15], i422.stencilReadMask)
  i422.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i423[16], i422.stencilWriteMask)
  i422.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i423[17], i422.stencilOp)
  i422.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i423[18], i422.stencilOpFront)
  i422.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i423[19], i422.stencilOpBack)
  var i425 = i423[20]
  var i424 = []
  for(var i = 0; i < i425.length; i += 1) {
    i424.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i425[i + 0]) );
  }
  i422.tags = i424
  var i427 = i423[21]
  var i426 = []
  for(var i = 0; i < i427.length; i += 1) {
    i426.push( i427[i + 0] );
  }
  i422.passDefinedKeywords = i426
  var i429 = i423[22]
  var i428 = []
  for(var i = 0; i < i429.length; i += 1) {
    i428.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i429[i + 0]) );
  }
  i422.passDefinedKeywordGroups = i428
  var i431 = i423[23]
  var i430 = []
  for(var i = 0; i < i431.length; i += 1) {
    i430.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i431[i + 0]) );
  }
  i422.variants = i430
  var i433 = i423[24]
  var i432 = []
  for(var i = 0; i < i433.length; i += 1) {
    i432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i433[i + 0]) );
  }
  i422.excludedVariants = i432
  i422.hasDepthReader = !!i423[25]
  return i422
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i434 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i435 = data
  i434.val = i435[0]
  i434.name = i435[1]
  return i434
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i437 = data
  i436.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i437[0], i436.src)
  i436.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i437[1], i436.dst)
  i436.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i437[2], i436.op)
  return i436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i439 = data
  i438.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i439[0], i438.pass)
  i438.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i439[1], i438.fail)
  i438.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i439[2], i438.zFail)
  i438.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i439[3], i438.comp)
  return i438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i443 = data
  i442.name = i443[0]
  i442.value = i443[1]
  return i442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i446 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i447 = data
  var i449 = i447[0]
  var i448 = []
  for(var i = 0; i < i449.length; i += 1) {
    i448.push( i449[i + 0] );
  }
  i446.keywords = i448
  i446.hasDiscard = !!i447[1]
  return i446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i453 = data
  i452.passId = i453[0]
  i452.subShaderIndex = i453[1]
  var i455 = i453[2]
  var i454 = []
  for(var i = 0; i < i455.length; i += 1) {
    i454.push( i455[i + 0] );
  }
  i452.keywords = i454
  i452.vertexProgram = i453[3]
  i452.fragmentProgram = i453[4]
  i452.exportedForWebGl2 = !!i453[5]
  i452.readDepth = !!i453[6]
  return i452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i459 = data
  request.r(i459[0], i459[1], 0, i458, 'shader')
  i458.pass = i459[2]
  return i458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i463 = data
  i462.name = i463[0]
  i462.type = i463[1]
  i462.value = new pc.Vec4( i463[2], i463[3], i463[4], i463[5] )
  i462.textureValue = i463[6]
  i462.shaderPropertyFlag = i463[7]
  return i462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i465 = data
  i464.name = i465[0]
  request.r(i465[1], i465[2], 0, i464, 'texture')
  i464.aabb = i465[3]
  i464.vertices = i465[4]
  i464.triangles = i465[5]
  i464.textureRect = UnityEngine.Rect.MinMaxRect(i465[6], i465[7], i465[8], i465[9])
  i464.packedRect = UnityEngine.Rect.MinMaxRect(i465[10], i465[11], i465[12], i465[13])
  i464.border = new pc.Vec4( i465[14], i465[15], i465[16], i465[17] )
  i464.transparency = i465[18]
  i464.bounds = i465[19]
  i464.pixelsPerUnit = i465[20]
  i464.textureWidth = i465[21]
  i464.textureHeight = i465[22]
  i464.nativeSize = new pc.Vec2( i465[23], i465[24] )
  i464.pivot = new pc.Vec2( i465[25], i465[26] )
  i464.textureRectOffset = new pc.Vec2( i465[27], i465[28] )
  return i464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i467 = data
  i466.name = i467[0]
  return i466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i469 = data
  i468.name = i469[0]
  i468.ascent = i469[1]
  i468.originalLineHeight = i469[2]
  i468.fontSize = i469[3]
  var i471 = i469[4]
  var i470 = []
  for(var i = 0; i < i471.length; i += 1) {
    i470.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i471[i + 0]) );
  }
  i468.characterInfo = i470
  request.r(i469[5], i469[6], 0, i468, 'texture')
  i468.originalFontSize = i469[7]
  return i468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i475 = data
  i474.index = i475[0]
  i474.advance = i475[1]
  i474.bearing = i475[2]
  i474.glyphWidth = i475[3]
  i474.glyphHeight = i475[4]
  i474.minX = i475[5]
  i474.maxX = i475[6]
  i474.minY = i475[7]
  i474.maxY = i475[8]
  i474.uvBottomLeftX = i475[9]
  i474.uvBottomLeftY = i475[10]
  i474.uvBottomRightX = i475[11]
  i474.uvBottomRightY = i475[12]
  i474.uvTopLeftX = i475[13]
  i474.uvTopLeftY = i475[14]
  i474.uvTopRightX = i475[15]
  i474.uvTopRightY = i475[16]
  return i474
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i476 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i477 = data
  i476.useSafeMode = !!i477[0]
  i476.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i477[1], i476.safeModeOptions)
  i476.timeScale = i477[2]
  i476.unscaledTimeScale = i477[3]
  i476.useSmoothDeltaTime = !!i477[4]
  i476.maxSmoothUnscaledTime = i477[5]
  i476.rewindCallbackMode = i477[6]
  i476.showUnityEditorReport = !!i477[7]
  i476.logBehaviour = i477[8]
  i476.drawGizmos = !!i477[9]
  i476.defaultRecyclable = !!i477[10]
  i476.defaultAutoPlay = i477[11]
  i476.defaultUpdateType = i477[12]
  i476.defaultTimeScaleIndependent = !!i477[13]
  i476.defaultEaseType = i477[14]
  i476.defaultEaseOvershootOrAmplitude = i477[15]
  i476.defaultEasePeriod = i477[16]
  i476.defaultAutoKill = !!i477[17]
  i476.defaultLoopType = i477[18]
  i476.debugMode = !!i477[19]
  i476.debugStoreTargetId = !!i477[20]
  i476.showPreviewPanel = !!i477[21]
  i476.storeSettingsLocation = i477[22]
  i476.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i477[23], i476.modules)
  i476.createASMDEF = !!i477[24]
  i476.showPlayingTweens = !!i477[25]
  i476.showPausedTweens = !!i477[26]
  return i476
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i478 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i479 = data
  i478.logBehaviour = i479[0]
  i478.nestedTweenFailureBehaviour = i479[1]
  return i478
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i480 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i481 = data
  i480.showPanel = !!i481[0]
  i480.audioEnabled = !!i481[1]
  i480.physicsEnabled = !!i481[2]
  i480.physics2DEnabled = !!i481[3]
  i480.spriteEnabled = !!i481[4]
  i480.uiEnabled = !!i481[5]
  i480.textMeshProEnabled = !!i481[6]
  i480.tk2DEnabled = !!i481[7]
  i480.deAudioEnabled = !!i481[8]
  i480.deUnityExtendedEnabled = !!i481[9]
  i480.epoOutlineEnabled = !!i481[10]
  return i480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i483 = data
  var i485 = i483[0]
  var i484 = []
  for(var i = 0; i < i485.length; i += 1) {
    i484.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i485[i + 0]) );
  }
  i482.files = i484
  i482.componentToPrefabIds = i483[1]
  return i482
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i489 = data
  i488.path = i489[0]
  request.r(i489[1], i489[2], 0, i488, 'unityObject')
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i491 = data
  var i493 = i491[0]
  var i492 = []
  for(var i = 0; i < i493.length; i += 1) {
    i492.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i493[i + 0]) );
  }
  i490.scriptsExecutionOrder = i492
  var i495 = i491[1]
  var i494 = []
  for(var i = 0; i < i495.length; i += 1) {
    i494.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i495[i + 0]) );
  }
  i490.sortingLayers = i494
  var i497 = i491[2]
  var i496 = []
  for(var i = 0; i < i497.length; i += 1) {
    i496.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i497[i + 0]) );
  }
  i490.cullingLayers = i496
  i490.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i491[3], i490.timeSettings)
  i490.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i491[4], i490.physicsSettings)
  i490.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i491[5], i490.physics2DSettings)
  i490.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i491[6], i490.qualitySettings)
  i490.enableRealtimeShadows = !!i491[7]
  i490.enableAutoInstancing = !!i491[8]
  i490.enableStaticBatching = !!i491[9]
  i490.enableDynamicBatching = !!i491[10]
  i490.usePreservativeDynamicBatching = !!i491[11]
  i490.lightmapEncodingQuality = i491[12]
  i490.desiredColorSpace = i491[13]
  var i499 = i491[14]
  var i498 = []
  for(var i = 0; i < i499.length; i += 1) {
    i498.push( i499[i + 0] );
  }
  i490.allTags = i498
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i503 = data
  i502.name = i503[0]
  i502.value = i503[1]
  return i502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i507 = data
  i506.id = i507[0]
  i506.name = i507[1]
  i506.value = i507[2]
  return i506
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i511 = data
  i510.id = i511[0]
  i510.name = i511[1]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i513 = data
  i512.fixedDeltaTime = i513[0]
  i512.maximumDeltaTime = i513[1]
  i512.timeScale = i513[2]
  i512.maximumParticleTimestep = i513[3]
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i515 = data
  i514.gravity = new pc.Vec3( i515[0], i515[1], i515[2] )
  i514.defaultSolverIterations = i515[3]
  i514.bounceThreshold = i515[4]
  i514.autoSyncTransforms = !!i515[5]
  i514.autoSimulation = !!i515[6]
  var i517 = i515[7]
  var i516 = []
  for(var i = 0; i < i517.length; i += 1) {
    i516.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i517[i + 0]) );
  }
  i514.collisionMatrix = i516
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i521 = data
  i520.enabled = !!i521[0]
  i520.layerId = i521[1]
  i520.otherLayerId = i521[2]
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i523 = data
  request.r(i523[0], i523[1], 0, i522, 'material')
  i522.gravity = new pc.Vec2( i523[2], i523[3] )
  i522.positionIterations = i523[4]
  i522.velocityIterations = i523[5]
  i522.velocityThreshold = i523[6]
  i522.maxLinearCorrection = i523[7]
  i522.maxAngularCorrection = i523[8]
  i522.maxTranslationSpeed = i523[9]
  i522.maxRotationSpeed = i523[10]
  i522.baumgarteScale = i523[11]
  i522.baumgarteTOIScale = i523[12]
  i522.timeToSleep = i523[13]
  i522.linearSleepTolerance = i523[14]
  i522.angularSleepTolerance = i523[15]
  i522.defaultContactOffset = i523[16]
  i522.autoSimulation = !!i523[17]
  i522.queriesHitTriggers = !!i523[18]
  i522.queriesStartInColliders = !!i523[19]
  i522.callbacksOnDisable = !!i523[20]
  i522.reuseCollisionCallbacks = !!i523[21]
  i522.autoSyncTransforms = !!i523[22]
  var i525 = i523[23]
  var i524 = []
  for(var i = 0; i < i525.length; i += 1) {
    i524.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i525[i + 0]) );
  }
  i522.collisionMatrix = i524
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i529 = data
  i528.enabled = !!i529[0]
  i528.layerId = i529[1]
  i528.otherLayerId = i529[2]
  return i528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i531 = data
  var i533 = i531[0]
  var i532 = []
  for(var i = 0; i < i533.length; i += 1) {
    i532.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i533[i + 0]) );
  }
  i530.qualityLevels = i532
  var i535 = i531[1]
  var i534 = []
  for(var i = 0; i < i535.length; i += 1) {
    i534.push( i535[i + 0] );
  }
  i530.names = i534
  i530.shadows = i531[2]
  i530.anisotropicFiltering = i531[3]
  i530.antiAliasing = i531[4]
  i530.lodBias = i531[5]
  i530.shadowCascades = i531[6]
  i530.shadowDistance = i531[7]
  i530.shadowmaskMode = i531[8]
  i530.shadowProjection = i531[9]
  i530.shadowResolution = i531[10]
  i530.softParticles = !!i531[11]
  i530.softVegetation = !!i531[12]
  i530.activeColorSpace = i531[13]
  i530.desiredColorSpace = i531[14]
  i530.masterTextureLimit = i531[15]
  i530.maxQueuedFrames = i531[16]
  i530.particleRaycastBudget = i531[17]
  i530.pixelLightCount = i531[18]
  i530.realtimeReflectionProbes = !!i531[19]
  i530.shadowCascade2Split = i531[20]
  i530.shadowCascade4Split = new pc.Vec3( i531[21], i531[22], i531[23] )
  i530.streamingMipmapsActive = !!i531[24]
  i530.vSyncCount = i531[25]
  i530.asyncUploadBufferSize = i531[26]
  i530.asyncUploadTimeSlice = i531[27]
  i530.billboardsFaceCameraPosition = !!i531[28]
  i530.shadowNearPlaneOffset = i531[29]
  i530.streamingMipmapsMemoryBudget = i531[30]
  i530.maximumLODLevel = i531[31]
  i530.streamingMipmapsAddAllCameras = !!i531[32]
  i530.streamingMipmapsMaxLevelReduction = i531[33]
  i530.streamingMipmapsRenderersPerFrame = i531[34]
  i530.resolutionScalingFixedDPIFactor = i531[35]
  i530.streamingMipmapsMaxFileIORequests = i531[36]
  i530.currentQualityLevel = i531[37]
  return i530
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i538 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i539 = data
  request.r(i539[0], i539[1], 0, i538, 'm_ObjectArgument')
  i538.m_ObjectArgumentAssemblyTypeName = i539[2]
  i538.m_IntArgument = i539[3]
  i538.m_FloatArgument = i539[4]
  i538.m_StringArgument = i539[5]
  i538.m_BoolArgument = !!i539[6]
  return i538
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"26":[27],"28":[27],"29":[27],"30":[27],"31":[27],"32":[27],"33":[34],"35":[0],"36":[37],"38":[37],"39":[37],"40":[37],"41":[37],"42":[37],"43":[44],"45":[44],"46":[44],"47":[44],"48":[44],"49":[44],"50":[44],"51":[44],"52":[44],"53":[44],"54":[44],"55":[44],"56":[44],"57":[0],"58":[59],"60":[61],"62":[61],"6":[5],"63":[64],"65":[0],"66":[67],"68":[5],"69":[9,5],"70":[59],"71":[9,5],"72":[5],"73":[5],"74":[59,5],"75":[5,9],"76":[77],"78":[77],"79":[77],"80":[5],"81":[5],"8":[6],"10":[9,5],"12":[5],"7":[6],"82":[5],"83":[5],"84":[5],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"91":[9,5],"92":[5],"93":[5],"94":[5],"95":[5],"13":[9,5],"96":[5],"97":[3],"98":[3],"4":[3],"99":[3],"100":[0],"101":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","TutController","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.Shader","UnityEngine.Texture2D","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "07/08/2026 10:13:51";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "PEOP_V35_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1846";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3759";

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

Deserializers.buildID = "14e412fc-c551-4f00-8f93-3ad61b72589c";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

