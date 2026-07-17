var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i284 = root || request.c( 'UnityEngine.JointSpring' )
  var i285 = data
  i284.spring = i285[0]
  i284.damper = i285[1]
  i284.targetPosition = i285[2]
  return i284
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i286 = root || request.c( 'UnityEngine.JointMotor' )
  var i287 = data
  i286.m_TargetVelocity = i287[0]
  i286.m_Force = i287[1]
  i286.m_FreeSpin = i287[2]
  return i286
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i288 = root || request.c( 'UnityEngine.JointLimits' )
  var i289 = data
  i288.m_Min = i289[0]
  i288.m_Max = i289[1]
  i288.m_Bounciness = i289[2]
  i288.m_BounceMinVelocity = i289[3]
  i288.m_ContactDistance = i289[4]
  i288.minBounce = i289[5]
  i288.maxBounce = i289[6]
  return i288
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i290 = root || request.c( 'UnityEngine.JointDrive' )
  var i291 = data
  i290.m_PositionSpring = i291[0]
  i290.m_PositionDamper = i291[1]
  i290.m_MaximumForce = i291[2]
  i290.m_UseAcceleration = i291[3]
  return i290
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i292 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i293 = data
  i292.m_Spring = i293[0]
  i292.m_Damper = i293[1]
  return i292
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i294 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i295 = data
  i294.m_Limit = i295[0]
  i294.m_Bounciness = i295[1]
  i294.m_ContactDistance = i295[2]
  return i294
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i296 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i297 = data
  i296.m_ExtremumSlip = i297[0]
  i296.m_ExtremumValue = i297[1]
  i296.m_AsymptoteSlip = i297[2]
  i296.m_AsymptoteValue = i297[3]
  i296.m_Stiffness = i297[4]
  return i296
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i298 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i299 = data
  i298.m_LowerAngle = i299[0]
  i298.m_UpperAngle = i299[1]
  return i298
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i300 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i301 = data
  i300.m_MotorSpeed = i301[0]
  i300.m_MaximumMotorTorque = i301[1]
  return i300
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i302 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i303 = data
  i302.m_DampingRatio = i303[0]
  i302.m_Frequency = i303[1]
  i302.m_Angle = i303[2]
  return i302
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i304 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i305 = data
  i304.m_LowerTranslation = i305[0]
  i304.m_UpperTranslation = i305[1]
  return i304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i307 = data
  i306.name = i307[0]
  i306.width = i307[1]
  i306.height = i307[2]
  i306.mipmapCount = i307[3]
  i306.anisoLevel = i307[4]
  i306.filterMode = i307[5]
  i306.hdr = !!i307[6]
  i306.format = i307[7]
  i306.wrapMode = i307[8]
  i306.alphaIsTransparency = !!i307[9]
  i306.alphaSource = i307[10]
  i306.graphicsFormat = i307[11]
  i306.sRGBTexture = !!i307[12]
  i306.desiredColorSpace = i307[13]
  i306.wrapU = i307[14]
  i306.wrapV = i307[15]
  return i306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i309 = data
  i308.name = i309[0]
  i308.index = i309[1]
  i308.startup = !!i309[2]
  return i308
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i311 = data
  i310.aspect = i311[0]
  i310.orthographic = !!i311[1]
  i310.orthographicSize = i311[2]
  i310.backgroundColor = new pc.Color(i311[3], i311[4], i311[5], i311[6])
  i310.nearClipPlane = i311[7]
  i310.farClipPlane = i311[8]
  i310.fieldOfView = i311[9]
  i310.depth = i311[10]
  i310.clearFlags = i311[11]
  i310.cullingMask = i311[12]
  i310.rect = i311[13]
  request.r(i311[14], i311[15], 0, i310, 'targetTexture')
  i310.usePhysicalProperties = !!i311[16]
  i310.focalLength = i311[17]
  i310.sensorSize = new pc.Vec2( i311[18], i311[19] )
  i310.lensShift = new pc.Vec2( i311[20], i311[21] )
  i310.gateFit = i311[22]
  i310.commandBufferCount = i311[23]
  i310.cameraType = i311[24]
  i310.enabled = !!i311[25]
  return i310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i313 = data
  i312.name = i313[0]
  i312.tagId = i313[1]
  i312.enabled = !!i313[2]
  i312.isStatic = !!i313[3]
  i312.layer = i313[4]
  return i312
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i314 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i315 = data
  request.r(i315[0], i315[1], 0, i314, 'm_FirstSelected')
  i314.m_sendNavigationEvents = !!i315[2]
  i314.m_DragThreshold = i315[3]
  return i314
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i316 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i317 = data
  i316.m_HorizontalAxis = i317[0]
  i316.m_VerticalAxis = i317[1]
  i316.m_SubmitButton = i317[2]
  i316.m_CancelButton = i317[3]
  i316.m_InputActionsPerSecond = i317[4]
  i316.m_RepeatDelay = i317[5]
  i316.m_ForceModuleActive = !!i317[6]
  i316.m_SendPointerHoverToParent = !!i317[7]
  return i316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i319 = data
  i318.pivot = new pc.Vec2( i319[0], i319[1] )
  i318.anchorMin = new pc.Vec2( i319[2], i319[3] )
  i318.anchorMax = new pc.Vec2( i319[4], i319[5] )
  i318.sizeDelta = new pc.Vec2( i319[6], i319[7] )
  i318.anchoredPosition3D = new pc.Vec3( i319[8], i319[9], i319[10] )
  i318.rotation = new pc.Quat(i319[11], i319[12], i319[13], i319[14])
  i318.scale = new pc.Vec3( i319[15], i319[16], i319[17] )
  return i318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i321 = data
  i320.planeDistance = i321[0]
  i320.referencePixelsPerUnit = i321[1]
  i320.isFallbackOverlay = !!i321[2]
  i320.renderMode = i321[3]
  i320.renderOrder = i321[4]
  i320.sortingLayerName = i321[5]
  i320.sortingOrder = i321[6]
  i320.scaleFactor = i321[7]
  request.r(i321[8], i321[9], 0, i320, 'worldCamera')
  i320.overrideSorting = !!i321[10]
  i320.pixelPerfect = !!i321[11]
  i320.targetDisplay = i321[12]
  i320.overridePixelPerfect = !!i321[13]
  i320.enabled = !!i321[14]
  return i320
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i322 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i323 = data
  i322.m_UiScaleMode = i323[0]
  i322.m_ReferencePixelsPerUnit = i323[1]
  i322.m_ScaleFactor = i323[2]
  i322.m_ReferenceResolution = new pc.Vec2( i323[3], i323[4] )
  i322.m_ScreenMatchMode = i323[5]
  i322.m_MatchWidthOrHeight = i323[6]
  i322.m_PhysicalUnit = i323[7]
  i322.m_FallbackScreenDPI = i323[8]
  i322.m_DefaultSpriteDPI = i323[9]
  i322.m_DynamicPixelsPerUnit = i323[10]
  i322.m_PresetInfoIsWorld = !!i323[11]
  return i322
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i324 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i325 = data
  i324.m_IgnoreReversedGraphics = !!i325[0]
  i324.m_BlockingObjects = i325[1]
  i324.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i325[2] )
  return i324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i327 = data
  i326.cullTransparentMesh = !!i327[0]
  return i326
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i328 = root || request.c( 'UnityEngine.UI.Image' )
  var i329 = data
  request.r(i329[0], i329[1], 0, i328, 'm_Sprite')
  i328.m_Type = i329[2]
  i328.m_PreserveAspect = !!i329[3]
  i328.m_FillCenter = !!i329[4]
  i328.m_FillMethod = i329[5]
  i328.m_FillAmount = i329[6]
  i328.m_FillClockwise = !!i329[7]
  i328.m_FillOrigin = i329[8]
  i328.m_UseSpriteMesh = !!i329[9]
  i328.m_PixelsPerUnitMultiplier = i329[10]
  request.r(i329[11], i329[12], 0, i328, 'm_Material')
  i328.m_Maskable = !!i329[13]
  i328.m_Color = new pc.Color(i329[14], i329[15], i329[16], i329[17])
  i328.m_RaycastTarget = !!i329[18]
  i328.m_RaycastPadding = new pc.Vec4( i329[19], i329[20], i329[21], i329[22] )
  return i328
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i330 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i331 = data
  i330.m_AspectMode = i331[0]
  i330.m_AspectRatio = i331[1]
  return i330
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i332 = root || request.c( 'UnityEngine.UI.Text' )
  var i333 = data
  i332.m_FontData = request.d('UnityEngine.UI.FontData', i333[0], i332.m_FontData)
  i332.m_Text = i333[1]
  request.r(i333[2], i333[3], 0, i332, 'm_Material')
  i332.m_Maskable = !!i333[4]
  i332.m_Color = new pc.Color(i333[5], i333[6], i333[7], i333[8])
  i332.m_RaycastTarget = !!i333[9]
  i332.m_RaycastPadding = new pc.Vec4( i333[10], i333[11], i333[12], i333[13] )
  return i332
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i334 = root || request.c( 'UnityEngine.UI.FontData' )
  var i335 = data
  request.r(i335[0], i335[1], 0, i334, 'm_Font')
  i334.m_FontSize = i335[2]
  i334.m_FontStyle = i335[3]
  i334.m_BestFit = !!i335[4]
  i334.m_MinSize = i335[5]
  i334.m_MaxSize = i335[6]
  i334.m_Alignment = i335[7]
  i334.m_AlignByGeometry = !!i335[8]
  i334.m_RichText = !!i335[9]
  i334.m_HorizontalOverflow = i335[10]
  i334.m_VerticalOverflow = i335[11]
  i334.m_LineSpacing = i335[12]
  return i334
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i336 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i337 = data
  i336.targetIsSelf = !!i337[0]
  request.r(i337[1], i337[2], 0, i336, 'targetGO')
  i336.tweenTargetIsTargetGO = !!i337[3]
  i336.delay = i337[4]
  i336.duration = i337[5]
  i336.easeType = i337[6]
  i336.easeCurve = new pc.AnimationCurve( { keys_flow: i337[7] } )
  i336.loopType = i337[8]
  i336.loops = i337[9]
  i336.id = i337[10]
  i336.isRelative = !!i337[11]
  i336.isFrom = !!i337[12]
  i336.isIndependentUpdate = !!i337[13]
  i336.autoKill = !!i337[14]
  i336.autoGenerate = !!i337[15]
  i336.isActive = !!i337[16]
  i336.isValid = !!i337[17]
  request.r(i337[18], i337[19], 0, i336, 'target')
  i336.animationType = i337[20]
  i336.targetType = i337[21]
  i336.forcedTargetType = i337[22]
  i336.autoPlay = !!i337[23]
  i336.useTargetAsV3 = !!i337[24]
  i336.endValueFloat = i337[25]
  i336.endValueV3 = new pc.Vec3( i337[26], i337[27], i337[28] )
  i336.endValueV2 = new pc.Vec2( i337[29], i337[30] )
  i336.endValueColor = new pc.Color(i337[31], i337[32], i337[33], i337[34])
  i336.endValueString = i337[35]
  i336.endValueRect = UnityEngine.Rect.MinMaxRect(i337[36], i337[37], i337[38], i337[39])
  request.r(i337[40], i337[41], 0, i336, 'endValueTransform')
  i336.optionalBool0 = !!i337[42]
  i336.optionalBool1 = !!i337[43]
  i336.optionalFloat0 = i337[44]
  i336.optionalInt0 = i337[45]
  i336.optionalRotationMode = i337[46]
  i336.optionalScrambleMode = i337[47]
  i336.optionalShakeRandomnessMode = i337[48]
  i336.optionalString = i337[49]
  i336.updateType = i337[50]
  i336.isSpeedBased = !!i337[51]
  i336.hasOnStart = !!i337[52]
  i336.hasOnPlay = !!i337[53]
  i336.hasOnUpdate = !!i337[54]
  i336.hasOnStepComplete = !!i337[55]
  i336.hasOnComplete = !!i337[56]
  i336.hasOnTweenCreated = !!i337[57]
  i336.hasOnRewind = !!i337[58]
  i336.onStart = request.d('UnityEngine.Events.UnityEvent', i337[59], i336.onStart)
  i336.onPlay = request.d('UnityEngine.Events.UnityEvent', i337[60], i336.onPlay)
  i336.onUpdate = request.d('UnityEngine.Events.UnityEvent', i337[61], i336.onUpdate)
  i336.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i337[62], i336.onStepComplete)
  i336.onComplete = request.d('UnityEngine.Events.UnityEvent', i337[63], i336.onComplete)
  i336.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i337[64], i336.onTweenCreated)
  i336.onRewind = request.d('UnityEngine.Events.UnityEvent', i337[65], i336.onRewind)
  return i336
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i338 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i339 = data
  i338.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i339[0], i338.m_PersistentCalls)
  return i338
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i340 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i341 = data
  var i343 = i341[0]
  var i342 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i343.length; i += 1) {
    i342.add(request.d('UnityEngine.Events.PersistentCall', i343[i + 0]));
  }
  i340.m_Calls = i342
  return i340
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i346 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i347 = data
  request.r(i347[0], i347[1], 0, i346, 'm_Target')
  i346.m_TargetAssemblyTypeName = i347[2]
  i346.m_MethodName = i347[3]
  i346.m_Mode = i347[4]
  i346.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i347[5], i346.m_Arguments)
  i346.m_CallState = i347[6]
  return i346
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i348 = root || request.c( 'UnityEngine.UI.Button' )
  var i349 = data
  i348.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i349[0], i348.m_OnClick)
  i348.m_Navigation = request.d('UnityEngine.UI.Navigation', i349[1], i348.m_Navigation)
  i348.m_Transition = i349[2]
  i348.m_Colors = request.d('UnityEngine.UI.ColorBlock', i349[3], i348.m_Colors)
  i348.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i349[4], i348.m_SpriteState)
  i348.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i349[5], i348.m_AnimationTriggers)
  i348.m_Interactable = !!i349[6]
  request.r(i349[7], i349[8], 0, i348, 'm_TargetGraphic')
  return i348
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i350 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i351 = data
  i350.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i351[0], i350.m_PersistentCalls)
  return i350
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i352 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i353 = data
  i352.m_Mode = i353[0]
  i352.m_WrapAround = !!i353[1]
  request.r(i353[2], i353[3], 0, i352, 'm_SelectOnUp')
  request.r(i353[4], i353[5], 0, i352, 'm_SelectOnDown')
  request.r(i353[6], i353[7], 0, i352, 'm_SelectOnLeft')
  request.r(i353[8], i353[9], 0, i352, 'm_SelectOnRight')
  return i352
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i354 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i355 = data
  i354.m_NormalColor = new pc.Color(i355[0], i355[1], i355[2], i355[3])
  i354.m_HighlightedColor = new pc.Color(i355[4], i355[5], i355[6], i355[7])
  i354.m_PressedColor = new pc.Color(i355[8], i355[9], i355[10], i355[11])
  i354.m_SelectedColor = new pc.Color(i355[12], i355[13], i355[14], i355[15])
  i354.m_DisabledColor = new pc.Color(i355[16], i355[17], i355[18], i355[19])
  i354.m_ColorMultiplier = i355[20]
  i354.m_FadeDuration = i355[21]
  return i354
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i356 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i357 = data
  request.r(i357[0], i357[1], 0, i356, 'm_HighlightedSprite')
  request.r(i357[2], i357[3], 0, i356, 'm_PressedSprite')
  request.r(i357[4], i357[5], 0, i356, 'm_SelectedSprite')
  request.r(i357[6], i357[7], 0, i356, 'm_DisabledSprite')
  return i356
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i358 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i359 = data
  i358.m_NormalTrigger = i359[0]
  i358.m_HighlightedTrigger = i359[1]
  i358.m_PressedTrigger = i359[2]
  i358.m_SelectedTrigger = i359[3]
  i358.m_DisabledTrigger = i359[4]
  return i358
}

Deserializers["TutController"] = function (request, data, root) {
  var i360 = root || request.c( 'TutController' )
  var i361 = data
  request.r(i361[0], i361[1], 0, i360, 'optionL')
  request.r(i361[2], i361[3], 0, i360, 'optionR')
  i360.posL = new pc.Vec3( i361[4], i361[5], i361[6] )
  i360.posR = new pc.Vec3( i361[7], i361[8], i361[9] )
  i360.fromScale = i361[10]
  i360.toScale = i361[11]
  i360.scaleTime = i361[12]
  i360.moveTime = i361[13]
  return i360
}

Deserializers["LunaController"] = function (request, data, root) {
  var i362 = root || request.c( 'LunaController' )
  var i363 = data
  i362.TimePlay = i363[0]
  i362.LimitTimePlay = !!i363[1]
  request.r(i363[2], i363[3], 0, i362, 'BGM')
  request.r(i363[4], i363[5], 0, i362, 'musicSource')
  request.r(i363[6], i363[7], 0, i362, 'CTA')
  request.r(i363[8], i363[9], 0, i362, 'endCard')
  return i362
}

Deserializers["GameController"] = function (request, data, root) {
  var i364 = root || request.c( 'GameController' )
  var i365 = data
  request.r(i365[0], i365[1], 0, i364, 'phase1')
  request.r(i365[2], i365[3], 0, i364, 'click1')
  request.r(i365[4], i365[5], 0, i364, 'phase2')
  i364.defaultColor = new pc.Color(i365[6], i365[7], i365[8], i365[9])
  i364.selectedColor = new pc.Color(i365[10], i365[11], i365[12], i365[13])
  request.r(i365[14], i365[15], 0, i364, 'click2')
  request.r(i365[16], i365[17], 0, i364, 'tut2')
  var i367 = i365[18]
  var i366 = new (System.Collections.Generic.List$1(Bridge.ns('ModelOption')))
  for(var i = 0; i < i367.length; i += 1) {
    i366.add(request.d('ModelOption', i367[i + 0]));
  }
  i364.models = i366
  var i369 = i365[19]
  var i368 = new (System.Collections.Generic.List$1(Bridge.ns('ItemOption')))
  for(var i = 0; i < i369.length; i += 1) {
    i368.add(request.d('ItemOption', i369[i + 0]));
  }
  i364.items = i368
  return i364
}

Deserializers["ModelOption"] = function (request, data, root) {
  var i372 = root || request.c( 'ModelOption' )
  var i373 = data
  request.r(i373[0], i373[1], 0, i372, 'Button')
  request.r(i373[2], i373[3], 0, i372, 'Model')
  return i372
}

Deserializers["ItemOption"] = function (request, data, root) {
  var i376 = root || request.c( 'ItemOption' )
  var i377 = data
  request.r(i377[0], i377[1], 0, i376, 'Button')
  request.r(i377[2], i377[3], 0, i376, 'Item')
  request.r(i377[4], i377[5], 0, i376, 'BG')
  return i376
}

Deserializers["AudioController"] = function (request, data, root) {
  var i378 = root || request.c( 'AudioController' )
  var i379 = data
  request.r(i379[0], i379[1], 0, i378, 'poolParent')
  i378.startSize = i379[2]
  return i378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i381 = data
  request.r(i381[0], i381[1], 0, i380, 'clip')
  request.r(i381[2], i381[3], 0, i380, 'outputAudioMixerGroup')
  i380.playOnAwake = !!i381[4]
  i380.loop = !!i381[5]
  i380.time = i381[6]
  i380.volume = i381[7]
  i380.pitch = i381[8]
  i380.enabled = !!i381[9]
  return i380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i382 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i383 = data
  i382.ambientIntensity = i383[0]
  i382.reflectionIntensity = i383[1]
  i382.ambientMode = i383[2]
  i382.ambientLight = new pc.Color(i383[3], i383[4], i383[5], i383[6])
  i382.ambientSkyColor = new pc.Color(i383[7], i383[8], i383[9], i383[10])
  i382.ambientGroundColor = new pc.Color(i383[11], i383[12], i383[13], i383[14])
  i382.ambientEquatorColor = new pc.Color(i383[15], i383[16], i383[17], i383[18])
  i382.fogColor = new pc.Color(i383[19], i383[20], i383[21], i383[22])
  i382.fogEndDistance = i383[23]
  i382.fogStartDistance = i383[24]
  i382.fogDensity = i383[25]
  i382.fog = !!i383[26]
  request.r(i383[27], i383[28], 0, i382, 'skybox')
  i382.fogMode = i383[29]
  var i385 = i383[30]
  var i384 = []
  for(var i = 0; i < i385.length; i += 1) {
    i384.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i385[i + 0]) );
  }
  i382.lightmaps = i384
  i382.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i383[31], i382.lightProbes)
  i382.lightmapsMode = i383[32]
  i382.mixedBakeMode = i383[33]
  i382.environmentLightingMode = i383[34]
  i382.ambientProbe = new pc.SphericalHarmonicsL2(i383[35])
  request.r(i383[36], i383[37], 0, i382, 'customReflection')
  request.r(i383[38], i383[39], 0, i382, 'defaultReflection')
  i382.defaultReflectionMode = i383[40]
  i382.defaultReflectionResolution = i383[41]
  i382.sunLightObjectId = i383[42]
  i382.pixelLightCount = i383[43]
  i382.defaultReflectionHDR = !!i383[44]
  i382.hasLightDataAsset = !!i383[45]
  i382.hasManualGenerate = !!i383[46]
  return i382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i389 = data
  request.r(i389[0], i389[1], 0, i388, 'lightmapColor')
  request.r(i389[2], i389[3], 0, i388, 'lightmapDirection')
  request.r(i389[4], i389[5], 0, i388, 'shadowMask')
  return i388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i390 = root || new UnityEngine.LightProbes()
  var i391 = data
  return i390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i398 = root || new pc.UnityMaterial()
  var i399 = data
  i398.name = i399[0]
  request.r(i399[1], i399[2], 0, i398, 'shader')
  i398.renderQueue = i399[3]
  i398.enableInstancing = !!i399[4]
  var i401 = i399[5]
  var i400 = []
  for(var i = 0; i < i401.length; i += 1) {
    i400.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i401[i + 0]) );
  }
  i398.floatParameters = i400
  var i403 = i399[6]
  var i402 = []
  for(var i = 0; i < i403.length; i += 1) {
    i402.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i403[i + 0]) );
  }
  i398.colorParameters = i402
  var i405 = i399[7]
  var i404 = []
  for(var i = 0; i < i405.length; i += 1) {
    i404.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i405[i + 0]) );
  }
  i398.vectorParameters = i404
  var i407 = i399[8]
  var i406 = []
  for(var i = 0; i < i407.length; i += 1) {
    i406.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i407[i + 0]) );
  }
  i398.textureParameters = i406
  var i409 = i399[9]
  var i408 = []
  for(var i = 0; i < i409.length; i += 1) {
    i408.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i409[i + 0]) );
  }
  i398.materialFlags = i408
  return i398
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i413 = data
  i412.name = i413[0]
  i412.value = i413[1]
  return i412
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i417 = data
  i416.name = i417[0]
  i416.value = new pc.Color(i417[1], i417[2], i417[3], i417[4])
  return i416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i421 = data
  i420.name = i421[0]
  i420.value = new pc.Vec4( i421[1], i421[2], i421[3], i421[4] )
  return i420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i424 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i425 = data
  i424.name = i425[0]
  request.r(i425[1], i425[2], 0, i424, 'value')
  return i424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i429 = data
  i428.name = i429[0]
  i428.enabled = !!i429[1]
  return i428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i431 = data
  var i433 = i431[0]
  var i432 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i433.length; i += 1) {
    i432.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i433[i + 0]));
  }
  i430.ShaderCompilationErrors = i432
  i430.name = i431[1]
  i430.guid = i431[2]
  var i435 = i431[3]
  var i434 = []
  for(var i = 0; i < i435.length; i += 1) {
    i434.push( i435[i + 0] );
  }
  i430.shaderDefinedKeywords = i434
  var i437 = i431[4]
  var i436 = []
  for(var i = 0; i < i437.length; i += 1) {
    i436.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i437[i + 0]) );
  }
  i430.passes = i436
  var i439 = i431[5]
  var i438 = []
  for(var i = 0; i < i439.length; i += 1) {
    i438.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i439[i + 0]) );
  }
  i430.usePasses = i438
  var i441 = i431[6]
  var i440 = []
  for(var i = 0; i < i441.length; i += 1) {
    i440.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i441[i + 0]) );
  }
  i430.defaultParameterValues = i440
  request.r(i431[7], i431[8], 0, i430, 'unityFallbackShader')
  i430.readDepth = !!i431[9]
  i430.hasDepthOnlyPass = !!i431[10]
  i430.isCreatedByShaderGraph = !!i431[11]
  i430.disableBatching = !!i431[12]
  i430.compiled = !!i431[13]
  return i430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i445 = data
  i444.shaderName = i445[0]
  i444.errorMessage = i445[1]
  return i444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i450 = root || new pc.UnityShaderPass()
  var i451 = data
  i450.id = i451[0]
  i450.subShaderIndex = i451[1]
  i450.name = i451[2]
  i450.passType = i451[3]
  i450.grabPassTextureName = i451[4]
  i450.usePass = !!i451[5]
  i450.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[6], i450.zTest)
  i450.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[7], i450.zWrite)
  i450.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[8], i450.culling)
  i450.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i451[9], i450.blending)
  i450.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i451[10], i450.alphaBlending)
  i450.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[11], i450.colorWriteMask)
  i450.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[12], i450.offsetUnits)
  i450.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[13], i450.offsetFactor)
  i450.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[14], i450.stencilRef)
  i450.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[15], i450.stencilReadMask)
  i450.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i451[16], i450.stencilWriteMask)
  i450.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i451[17], i450.stencilOp)
  i450.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i451[18], i450.stencilOpFront)
  i450.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i451[19], i450.stencilOpBack)
  var i453 = i451[20]
  var i452 = []
  for(var i = 0; i < i453.length; i += 1) {
    i452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i453[i + 0]) );
  }
  i450.tags = i452
  var i455 = i451[21]
  var i454 = []
  for(var i = 0; i < i455.length; i += 1) {
    i454.push( i455[i + 0] );
  }
  i450.passDefinedKeywords = i454
  var i457 = i451[22]
  var i456 = []
  for(var i = 0; i < i457.length; i += 1) {
    i456.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i457[i + 0]) );
  }
  i450.passDefinedKeywordGroups = i456
  var i459 = i451[23]
  var i458 = []
  for(var i = 0; i < i459.length; i += 1) {
    i458.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i459[i + 0]) );
  }
  i450.variants = i458
  var i461 = i451[24]
  var i460 = []
  for(var i = 0; i < i461.length; i += 1) {
    i460.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i461[i + 0]) );
  }
  i450.excludedVariants = i460
  i450.hasDepthReader = !!i451[25]
  return i450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i463 = data
  i462.val = i463[0]
  i462.name = i463[1]
  return i462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i465 = data
  i464.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i465[0], i464.src)
  i464.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i465[1], i464.dst)
  i464.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i465[2], i464.op)
  return i464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i467 = data
  i466.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i467[0], i466.pass)
  i466.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i467[1], i466.fail)
  i466.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i467[2], i466.zFail)
  i466.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i467[3], i466.comp)
  return i466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i471 = data
  i470.name = i471[0]
  i470.value = i471[1]
  return i470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i475 = data
  var i477 = i475[0]
  var i476 = []
  for(var i = 0; i < i477.length; i += 1) {
    i476.push( i477[i + 0] );
  }
  i474.keywords = i476
  i474.hasDiscard = !!i475[1]
  return i474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i481 = data
  i480.passId = i481[0]
  i480.subShaderIndex = i481[1]
  var i483 = i481[2]
  var i482 = []
  for(var i = 0; i < i483.length; i += 1) {
    i482.push( i483[i + 0] );
  }
  i480.keywords = i482
  i480.vertexProgram = i481[3]
  i480.fragmentProgram = i481[4]
  i480.exportedForWebGl2 = !!i481[5]
  i480.readDepth = !!i481[6]
  return i480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i487 = data
  request.r(i487[0], i487[1], 0, i486, 'shader')
  i486.pass = i487[2]
  return i486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i491 = data
  i490.name = i491[0]
  i490.type = i491[1]
  i490.value = new pc.Vec4( i491[2], i491[3], i491[4], i491[5] )
  i490.textureValue = i491[6]
  i490.shaderPropertyFlag = i491[7]
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i493 = data
  i492.name = i493[0]
  request.r(i493[1], i493[2], 0, i492, 'texture')
  i492.aabb = i493[3]
  i492.vertices = i493[4]
  i492.triangles = i493[5]
  i492.textureRect = UnityEngine.Rect.MinMaxRect(i493[6], i493[7], i493[8], i493[9])
  i492.packedRect = UnityEngine.Rect.MinMaxRect(i493[10], i493[11], i493[12], i493[13])
  i492.border = new pc.Vec4( i493[14], i493[15], i493[16], i493[17] )
  i492.transparency = i493[18]
  i492.bounds = i493[19]
  i492.pixelsPerUnit = i493[20]
  i492.textureWidth = i493[21]
  i492.textureHeight = i493[22]
  i492.nativeSize = new pc.Vec2( i493[23], i493[24] )
  i492.pivot = new pc.Vec2( i493[25], i493[26] )
  i492.textureRectOffset = new pc.Vec2( i493[27], i493[28] )
  return i492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i495 = data
  i494.name = i495[0]
  return i494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i497 = data
  i496.name = i497[0]
  i496.ascent = i497[1]
  i496.originalLineHeight = i497[2]
  i496.fontSize = i497[3]
  var i499 = i497[4]
  var i498 = []
  for(var i = 0; i < i499.length; i += 1) {
    i498.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i499[i + 0]) );
  }
  i496.characterInfo = i498
  request.r(i497[5], i497[6], 0, i496, 'texture')
  i496.originalFontSize = i497[7]
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i503 = data
  i502.index = i503[0]
  i502.advance = i503[1]
  i502.bearing = i503[2]
  i502.glyphWidth = i503[3]
  i502.glyphHeight = i503[4]
  i502.minX = i503[5]
  i502.maxX = i503[6]
  i502.minY = i503[7]
  i502.maxY = i503[8]
  i502.uvBottomLeftX = i503[9]
  i502.uvBottomLeftY = i503[10]
  i502.uvBottomRightX = i503[11]
  i502.uvBottomRightY = i503[12]
  i502.uvTopLeftX = i503[13]
  i502.uvTopLeftY = i503[14]
  i502.uvTopRightX = i503[15]
  i502.uvTopRightY = i503[16]
  return i502
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i504 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i505 = data
  i504.useSafeMode = !!i505[0]
  i504.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i505[1], i504.safeModeOptions)
  i504.timeScale = i505[2]
  i504.unscaledTimeScale = i505[3]
  i504.useSmoothDeltaTime = !!i505[4]
  i504.maxSmoothUnscaledTime = i505[5]
  i504.rewindCallbackMode = i505[6]
  i504.showUnityEditorReport = !!i505[7]
  i504.logBehaviour = i505[8]
  i504.drawGizmos = !!i505[9]
  i504.defaultRecyclable = !!i505[10]
  i504.defaultAutoPlay = i505[11]
  i504.defaultUpdateType = i505[12]
  i504.defaultTimeScaleIndependent = !!i505[13]
  i504.defaultEaseType = i505[14]
  i504.defaultEaseOvershootOrAmplitude = i505[15]
  i504.defaultEasePeriod = i505[16]
  i504.defaultAutoKill = !!i505[17]
  i504.defaultLoopType = i505[18]
  i504.debugMode = !!i505[19]
  i504.debugStoreTargetId = !!i505[20]
  i504.showPreviewPanel = !!i505[21]
  i504.storeSettingsLocation = i505[22]
  i504.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i505[23], i504.modules)
  i504.createASMDEF = !!i505[24]
  i504.showPlayingTweens = !!i505[25]
  i504.showPausedTweens = !!i505[26]
  return i504
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i506 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i507 = data
  i506.logBehaviour = i507[0]
  i506.nestedTweenFailureBehaviour = i507[1]
  return i506
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i508 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i509 = data
  i508.showPanel = !!i509[0]
  i508.audioEnabled = !!i509[1]
  i508.physicsEnabled = !!i509[2]
  i508.physics2DEnabled = !!i509[3]
  i508.spriteEnabled = !!i509[4]
  i508.uiEnabled = !!i509[5]
  i508.textMeshProEnabled = !!i509[6]
  i508.tk2DEnabled = !!i509[7]
  i508.deAudioEnabled = !!i509[8]
  i508.deUnityExtendedEnabled = !!i509[9]
  i508.epoOutlineEnabled = !!i509[10]
  return i508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i511 = data
  var i513 = i511[0]
  var i512 = []
  for(var i = 0; i < i513.length; i += 1) {
    i512.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i513[i + 0]) );
  }
  i510.files = i512
  i510.componentToPrefabIds = i511[1]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i517 = data
  i516.path = i517[0]
  request.r(i517[1], i517[2], 0, i516, 'unityObject')
  return i516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i519 = data
  var i521 = i519[0]
  var i520 = []
  for(var i = 0; i < i521.length; i += 1) {
    i520.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i521[i + 0]) );
  }
  i518.scriptsExecutionOrder = i520
  var i523 = i519[1]
  var i522 = []
  for(var i = 0; i < i523.length; i += 1) {
    i522.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i523[i + 0]) );
  }
  i518.sortingLayers = i522
  var i525 = i519[2]
  var i524 = []
  for(var i = 0; i < i525.length; i += 1) {
    i524.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i525[i + 0]) );
  }
  i518.cullingLayers = i524
  i518.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i519[3], i518.timeSettings)
  i518.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i519[4], i518.physicsSettings)
  i518.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i519[5], i518.physics2DSettings)
  i518.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i519[6], i518.qualitySettings)
  i518.enableRealtimeShadows = !!i519[7]
  i518.enableAutoInstancing = !!i519[8]
  i518.enableStaticBatching = !!i519[9]
  i518.enableDynamicBatching = !!i519[10]
  i518.usePreservativeDynamicBatching = !!i519[11]
  i518.lightmapEncodingQuality = i519[12]
  i518.desiredColorSpace = i519[13]
  var i527 = i519[14]
  var i526 = []
  for(var i = 0; i < i527.length; i += 1) {
    i526.push( i527[i + 0] );
  }
  i518.allTags = i526
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i531 = data
  i530.name = i531[0]
  i530.value = i531[1]
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i535 = data
  i534.id = i535[0]
  i534.name = i535[1]
  i534.value = i535[2]
  return i534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i539 = data
  i538.id = i539[0]
  i538.name = i539[1]
  return i538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i541 = data
  i540.fixedDeltaTime = i541[0]
  i540.maximumDeltaTime = i541[1]
  i540.timeScale = i541[2]
  i540.maximumParticleTimestep = i541[3]
  return i540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i543 = data
  i542.gravity = new pc.Vec3( i543[0], i543[1], i543[2] )
  i542.defaultSolverIterations = i543[3]
  i542.bounceThreshold = i543[4]
  i542.autoSyncTransforms = !!i543[5]
  i542.autoSimulation = !!i543[6]
  var i545 = i543[7]
  var i544 = []
  for(var i = 0; i < i545.length; i += 1) {
    i544.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i545[i + 0]) );
  }
  i542.collisionMatrix = i544
  return i542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i549 = data
  i548.enabled = !!i549[0]
  i548.layerId = i549[1]
  i548.otherLayerId = i549[2]
  return i548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i551 = data
  request.r(i551[0], i551[1], 0, i550, 'material')
  i550.gravity = new pc.Vec2( i551[2], i551[3] )
  i550.positionIterations = i551[4]
  i550.velocityIterations = i551[5]
  i550.velocityThreshold = i551[6]
  i550.maxLinearCorrection = i551[7]
  i550.maxAngularCorrection = i551[8]
  i550.maxTranslationSpeed = i551[9]
  i550.maxRotationSpeed = i551[10]
  i550.baumgarteScale = i551[11]
  i550.baumgarteTOIScale = i551[12]
  i550.timeToSleep = i551[13]
  i550.linearSleepTolerance = i551[14]
  i550.angularSleepTolerance = i551[15]
  i550.defaultContactOffset = i551[16]
  i550.autoSimulation = !!i551[17]
  i550.queriesHitTriggers = !!i551[18]
  i550.queriesStartInColliders = !!i551[19]
  i550.callbacksOnDisable = !!i551[20]
  i550.reuseCollisionCallbacks = !!i551[21]
  i550.autoSyncTransforms = !!i551[22]
  var i553 = i551[23]
  var i552 = []
  for(var i = 0; i < i553.length; i += 1) {
    i552.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i553[i + 0]) );
  }
  i550.collisionMatrix = i552
  return i550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i557 = data
  i556.enabled = !!i557[0]
  i556.layerId = i557[1]
  i556.otherLayerId = i557[2]
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i559 = data
  var i561 = i559[0]
  var i560 = []
  for(var i = 0; i < i561.length; i += 1) {
    i560.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i561[i + 0]) );
  }
  i558.qualityLevels = i560
  var i563 = i559[1]
  var i562 = []
  for(var i = 0; i < i563.length; i += 1) {
    i562.push( i563[i + 0] );
  }
  i558.names = i562
  i558.shadows = i559[2]
  i558.anisotropicFiltering = i559[3]
  i558.antiAliasing = i559[4]
  i558.lodBias = i559[5]
  i558.shadowCascades = i559[6]
  i558.shadowDistance = i559[7]
  i558.shadowmaskMode = i559[8]
  i558.shadowProjection = i559[9]
  i558.shadowResolution = i559[10]
  i558.softParticles = !!i559[11]
  i558.softVegetation = !!i559[12]
  i558.activeColorSpace = i559[13]
  i558.desiredColorSpace = i559[14]
  i558.masterTextureLimit = i559[15]
  i558.maxQueuedFrames = i559[16]
  i558.particleRaycastBudget = i559[17]
  i558.pixelLightCount = i559[18]
  i558.realtimeReflectionProbes = !!i559[19]
  i558.shadowCascade2Split = i559[20]
  i558.shadowCascade4Split = new pc.Vec3( i559[21], i559[22], i559[23] )
  i558.streamingMipmapsActive = !!i559[24]
  i558.vSyncCount = i559[25]
  i558.asyncUploadBufferSize = i559[26]
  i558.asyncUploadTimeSlice = i559[27]
  i558.billboardsFaceCameraPosition = !!i559[28]
  i558.shadowNearPlaneOffset = i559[29]
  i558.streamingMipmapsMemoryBudget = i559[30]
  i558.maximumLODLevel = i559[31]
  i558.streamingMipmapsAddAllCameras = !!i559[32]
  i558.streamingMipmapsMaxLevelReduction = i559[33]
  i558.streamingMipmapsRenderersPerFrame = i559[34]
  i558.resolutionScalingFixedDPIFactor = i559[35]
  i558.streamingMipmapsMaxFileIORequests = i559[36]
  i558.currentQualityLevel = i559[37]
  return i558
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i567 = data
  request.r(i567[0], i567[1], 0, i566, 'm_ObjectArgument')
  i566.m_ObjectArgumentAssemblyTypeName = i567[2]
  i566.m_IntArgument = i567[3]
  i566.m_FloatArgument = i567[4]
  i566.m_StringArgument = i567[5]
  i566.m_BoolArgument = !!i567[6]
  return i566
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"29":[30],"31":[30],"32":[30],"33":[30],"34":[30],"35":[30],"36":[37],"38":[0],"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[47],"54":[47],"55":[47],"56":[47],"57":[47],"58":[47],"59":[47],"60":[0],"61":[62],"63":[64],"65":[64],"6":[5],"66":[67],"68":[0],"69":[70],"71":[5],"72":[9,5],"73":[62],"74":[9,5],"75":[5],"76":[5],"77":[62,5],"78":[5,9],"79":[80],"81":[80],"82":[80],"83":[5],"84":[5],"8":[6],"10":[9,5],"12":[5],"7":[6],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"91":[5],"92":[5],"93":[5],"94":[9,5],"95":[5],"96":[5],"97":[5],"98":[5],"13":[9,5],"99":[5],"100":[3],"101":[3],"4":[3],"102":[3],"103":[0],"104":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Button","TutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","GameController","UnityEngine.GameObject","AudioController","UnityEngine.Transform","UnityEngine.Shader","UnityEngine.Texture2D","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "UAC_V68";

Deserializers.lunaInitializationTime = "07/17/2026 09:47:13";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "UAC_V68_ThuLH_TamNTM";

Deserializers.lunaAppID = "29023";

Deserializers.projectId = "041b8dc990308184fbd8ff9a02872cac";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1838";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3860";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.UAC_V68";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "c968fcdb-170e-4f53-b7f5-55f186f28226";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

