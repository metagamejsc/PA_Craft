var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i274 = root || request.c( 'UnityEngine.JointSpring' )
  var i275 = data
  i274.spring = i275[0]
  i274.damper = i275[1]
  i274.targetPosition = i275[2]
  return i274
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i276 = root || request.c( 'UnityEngine.JointMotor' )
  var i277 = data
  i276.m_TargetVelocity = i277[0]
  i276.m_Force = i277[1]
  i276.m_FreeSpin = i277[2]
  return i276
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i278 = root || request.c( 'UnityEngine.JointLimits' )
  var i279 = data
  i278.m_Min = i279[0]
  i278.m_Max = i279[1]
  i278.m_Bounciness = i279[2]
  i278.m_BounceMinVelocity = i279[3]
  i278.m_ContactDistance = i279[4]
  i278.minBounce = i279[5]
  i278.maxBounce = i279[6]
  return i278
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i280 = root || request.c( 'UnityEngine.JointDrive' )
  var i281 = data
  i280.m_PositionSpring = i281[0]
  i280.m_PositionDamper = i281[1]
  i280.m_MaximumForce = i281[2]
  i280.m_UseAcceleration = i281[3]
  return i280
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i282 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i283 = data
  i282.m_Spring = i283[0]
  i282.m_Damper = i283[1]
  return i282
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i284 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i285 = data
  i284.m_Limit = i285[0]
  i284.m_Bounciness = i285[1]
  i284.m_ContactDistance = i285[2]
  return i284
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i286 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i287 = data
  i286.m_ExtremumSlip = i287[0]
  i286.m_ExtremumValue = i287[1]
  i286.m_AsymptoteSlip = i287[2]
  i286.m_AsymptoteValue = i287[3]
  i286.m_Stiffness = i287[4]
  return i286
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i288 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i289 = data
  i288.m_LowerAngle = i289[0]
  i288.m_UpperAngle = i289[1]
  return i288
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i290 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i291 = data
  i290.m_MotorSpeed = i291[0]
  i290.m_MaximumMotorTorque = i291[1]
  return i290
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i292 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i293 = data
  i292.m_DampingRatio = i293[0]
  i292.m_Frequency = i293[1]
  i292.m_Angle = i293[2]
  return i292
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i294 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i295 = data
  i294.m_LowerTranslation = i295[0]
  i294.m_UpperTranslation = i295[1]
  return i294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i297 = data
  i296.name = i297[0]
  i296.width = i297[1]
  i296.height = i297[2]
  i296.mipmapCount = i297[3]
  i296.anisoLevel = i297[4]
  i296.filterMode = i297[5]
  i296.hdr = !!i297[6]
  i296.format = i297[7]
  i296.wrapMode = i297[8]
  i296.alphaIsTransparency = !!i297[9]
  i296.alphaSource = i297[10]
  i296.graphicsFormat = i297[11]
  i296.sRGBTexture = !!i297[12]
  i296.desiredColorSpace = i297[13]
  i296.wrapU = i297[14]
  i296.wrapV = i297[15]
  return i296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i299 = data
  i298.name = i299[0]
  i298.index = i299[1]
  i298.startup = !!i299[2]
  return i298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i300 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i301 = data
  i300.aspect = i301[0]
  i300.orthographic = !!i301[1]
  i300.orthographicSize = i301[2]
  i300.backgroundColor = new pc.Color(i301[3], i301[4], i301[5], i301[6])
  i300.nearClipPlane = i301[7]
  i300.farClipPlane = i301[8]
  i300.fieldOfView = i301[9]
  i300.depth = i301[10]
  i300.clearFlags = i301[11]
  i300.cullingMask = i301[12]
  i300.rect = i301[13]
  request.r(i301[14], i301[15], 0, i300, 'targetTexture')
  i300.usePhysicalProperties = !!i301[16]
  i300.focalLength = i301[17]
  i300.sensorSize = new pc.Vec2( i301[18], i301[19] )
  i300.lensShift = new pc.Vec2( i301[20], i301[21] )
  i300.gateFit = i301[22]
  i300.commandBufferCount = i301[23]
  i300.cameraType = i301[24]
  i300.enabled = !!i301[25]
  return i300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i303 = data
  i302.name = i303[0]
  i302.tagId = i303[1]
  i302.enabled = !!i303[2]
  i302.isStatic = !!i303[3]
  i302.layer = i303[4]
  return i302
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i304 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i305 = data
  request.r(i305[0], i305[1], 0, i304, 'm_FirstSelected')
  i304.m_sendNavigationEvents = !!i305[2]
  i304.m_DragThreshold = i305[3]
  return i304
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i306 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i307 = data
  i306.m_HorizontalAxis = i307[0]
  i306.m_VerticalAxis = i307[1]
  i306.m_SubmitButton = i307[2]
  i306.m_CancelButton = i307[3]
  i306.m_InputActionsPerSecond = i307[4]
  i306.m_RepeatDelay = i307[5]
  i306.m_ForceModuleActive = !!i307[6]
  i306.m_SendPointerHoverToParent = !!i307[7]
  return i306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i309 = data
  i308.pivot = new pc.Vec2( i309[0], i309[1] )
  i308.anchorMin = new pc.Vec2( i309[2], i309[3] )
  i308.anchorMax = new pc.Vec2( i309[4], i309[5] )
  i308.sizeDelta = new pc.Vec2( i309[6], i309[7] )
  i308.anchoredPosition3D = new pc.Vec3( i309[8], i309[9], i309[10] )
  i308.rotation = new pc.Quat(i309[11], i309[12], i309[13], i309[14])
  i308.scale = new pc.Vec3( i309[15], i309[16], i309[17] )
  return i308
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i311 = data
  i310.planeDistance = i311[0]
  i310.referencePixelsPerUnit = i311[1]
  i310.isFallbackOverlay = !!i311[2]
  i310.renderMode = i311[3]
  i310.renderOrder = i311[4]
  i310.sortingLayerName = i311[5]
  i310.sortingOrder = i311[6]
  i310.scaleFactor = i311[7]
  request.r(i311[8], i311[9], 0, i310, 'worldCamera')
  i310.overrideSorting = !!i311[10]
  i310.pixelPerfect = !!i311[11]
  i310.targetDisplay = i311[12]
  i310.overridePixelPerfect = !!i311[13]
  i310.enabled = !!i311[14]
  return i310
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i312 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i313 = data
  i312.m_UiScaleMode = i313[0]
  i312.m_ReferencePixelsPerUnit = i313[1]
  i312.m_ScaleFactor = i313[2]
  i312.m_ReferenceResolution = new pc.Vec2( i313[3], i313[4] )
  i312.m_ScreenMatchMode = i313[5]
  i312.m_MatchWidthOrHeight = i313[6]
  i312.m_PhysicalUnit = i313[7]
  i312.m_FallbackScreenDPI = i313[8]
  i312.m_DefaultSpriteDPI = i313[9]
  i312.m_DynamicPixelsPerUnit = i313[10]
  i312.m_PresetInfoIsWorld = !!i313[11]
  return i312
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i314 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i315 = data
  i314.m_IgnoreReversedGraphics = !!i315[0]
  i314.m_BlockingObjects = i315[1]
  i314.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i315[2] )
  return i314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i317 = data
  i316.cullTransparentMesh = !!i317[0]
  return i316
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i318 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i319 = data
  i318.m_AspectMode = i319[0]
  i318.m_AspectRatio = i319[1]
  return i318
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i320 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i321 = data
  request.r(i321[0], i321[1], 0, i320, 'm_Texture')
  i320.m_UVRect = UnityEngine.Rect.MinMaxRect(i321[2], i321[3], i321[4], i321[5])
  request.r(i321[6], i321[7], 0, i320, 'm_Material')
  i320.m_Maskable = !!i321[8]
  i320.m_Color = new pc.Color(i321[9], i321[10], i321[11], i321[12])
  i320.m_RaycastTarget = !!i321[13]
  i320.m_RaycastPadding = new pc.Vec4( i321[14], i321[15], i321[16], i321[17] )
  return i320
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i322 = root || request.c( 'UnityEngine.UI.Text' )
  var i323 = data
  i322.m_FontData = request.d('UnityEngine.UI.FontData', i323[0], i322.m_FontData)
  i322.m_Text = i323[1]
  request.r(i323[2], i323[3], 0, i322, 'm_Material')
  i322.m_Maskable = !!i323[4]
  i322.m_Color = new pc.Color(i323[5], i323[6], i323[7], i323[8])
  i322.m_RaycastTarget = !!i323[9]
  i322.m_RaycastPadding = new pc.Vec4( i323[10], i323[11], i323[12], i323[13] )
  return i322
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i324 = root || request.c( 'UnityEngine.UI.FontData' )
  var i325 = data
  request.r(i325[0], i325[1], 0, i324, 'm_Font')
  i324.m_FontSize = i325[2]
  i324.m_FontStyle = i325[3]
  i324.m_BestFit = !!i325[4]
  i324.m_MinSize = i325[5]
  i324.m_MaxSize = i325[6]
  i324.m_Alignment = i325[7]
  i324.m_AlignByGeometry = !!i325[8]
  i324.m_RichText = !!i325[9]
  i324.m_HorizontalOverflow = i325[10]
  i324.m_VerticalOverflow = i325[11]
  i324.m_LineSpacing = i325[12]
  return i324
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i326 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i327 = data
  i326.targetIsSelf = !!i327[0]
  request.r(i327[1], i327[2], 0, i326, 'targetGO')
  i326.tweenTargetIsTargetGO = !!i327[3]
  i326.delay = i327[4]
  i326.duration = i327[5]
  i326.easeType = i327[6]
  i326.easeCurve = new pc.AnimationCurve( { keys_flow: i327[7] } )
  i326.loopType = i327[8]
  i326.loops = i327[9]
  i326.id = i327[10]
  i326.isRelative = !!i327[11]
  i326.isFrom = !!i327[12]
  i326.isIndependentUpdate = !!i327[13]
  i326.autoKill = !!i327[14]
  i326.autoGenerate = !!i327[15]
  i326.isActive = !!i327[16]
  i326.isValid = !!i327[17]
  request.r(i327[18], i327[19], 0, i326, 'target')
  i326.animationType = i327[20]
  i326.targetType = i327[21]
  i326.forcedTargetType = i327[22]
  i326.autoPlay = !!i327[23]
  i326.useTargetAsV3 = !!i327[24]
  i326.endValueFloat = i327[25]
  i326.endValueV3 = new pc.Vec3( i327[26], i327[27], i327[28] )
  i326.endValueV2 = new pc.Vec2( i327[29], i327[30] )
  i326.endValueColor = new pc.Color(i327[31], i327[32], i327[33], i327[34])
  i326.endValueString = i327[35]
  i326.endValueRect = UnityEngine.Rect.MinMaxRect(i327[36], i327[37], i327[38], i327[39])
  request.r(i327[40], i327[41], 0, i326, 'endValueTransform')
  i326.optionalBool0 = !!i327[42]
  i326.optionalBool1 = !!i327[43]
  i326.optionalFloat0 = i327[44]
  i326.optionalInt0 = i327[45]
  i326.optionalRotationMode = i327[46]
  i326.optionalScrambleMode = i327[47]
  i326.optionalShakeRandomnessMode = i327[48]
  i326.optionalString = i327[49]
  i326.updateType = i327[50]
  i326.isSpeedBased = !!i327[51]
  i326.hasOnStart = !!i327[52]
  i326.hasOnPlay = !!i327[53]
  i326.hasOnUpdate = !!i327[54]
  i326.hasOnStepComplete = !!i327[55]
  i326.hasOnComplete = !!i327[56]
  i326.hasOnTweenCreated = !!i327[57]
  i326.hasOnRewind = !!i327[58]
  i326.onStart = request.d('UnityEngine.Events.UnityEvent', i327[59], i326.onStart)
  i326.onPlay = request.d('UnityEngine.Events.UnityEvent', i327[60], i326.onPlay)
  i326.onUpdate = request.d('UnityEngine.Events.UnityEvent', i327[61], i326.onUpdate)
  i326.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i327[62], i326.onStepComplete)
  i326.onComplete = request.d('UnityEngine.Events.UnityEvent', i327[63], i326.onComplete)
  i326.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i327[64], i326.onTweenCreated)
  i326.onRewind = request.d('UnityEngine.Events.UnityEvent', i327[65], i326.onRewind)
  return i326
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i328 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i329 = data
  i328.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i329[0], i328.m_PersistentCalls)
  return i328
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i330 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i331 = data
  var i333 = i331[0]
  var i332 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i333.length; i += 1) {
    i332.add(request.d('UnityEngine.Events.PersistentCall', i333[i + 0]));
  }
  i330.m_Calls = i332
  return i330
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i336 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i337 = data
  request.r(i337[0], i337[1], 0, i336, 'm_Target')
  i336.m_TargetAssemblyTypeName = i337[2]
  i336.m_MethodName = i337[3]
  i336.m_Mode = i337[4]
  i336.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i337[5], i336.m_Arguments)
  i336.m_CallState = i337[6]
  return i336
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i338 = root || request.c( 'UnityEngine.UI.Image' )
  var i339 = data
  request.r(i339[0], i339[1], 0, i338, 'm_Sprite')
  i338.m_Type = i339[2]
  i338.m_PreserveAspect = !!i339[3]
  i338.m_FillCenter = !!i339[4]
  i338.m_FillMethod = i339[5]
  i338.m_FillAmount = i339[6]
  i338.m_FillClockwise = !!i339[7]
  i338.m_FillOrigin = i339[8]
  i338.m_UseSpriteMesh = !!i339[9]
  i338.m_PixelsPerUnitMultiplier = i339[10]
  request.r(i339[11], i339[12], 0, i338, 'm_Material')
  i338.m_Maskable = !!i339[13]
  i338.m_Color = new pc.Color(i339[14], i339[15], i339[16], i339[17])
  i338.m_RaycastTarget = !!i339[18]
  i338.m_RaycastPadding = new pc.Vec4( i339[19], i339[20], i339[21], i339[22] )
  return i338
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i340 = root || request.c( 'UnityEngine.UI.Mask' )
  var i341 = data
  i340.m_ShowMaskGraphic = !!i341[0]
  return i340
}

Deserializers["TutController"] = function (request, data, root) {
  var i342 = root || request.c( 'TutController' )
  var i343 = data
  request.r(i343[0], i343[1], 0, i342, 'leftCard')
  request.r(i343[2], i343[3], 0, i342, 'rightCard')
  i342.leftPos = new pc.Vec2( i343[4], i343[5] )
  i342.rightPos = new pc.Vec2( i343[6], i343[7] )
  request.r(i343[8], i343[9], 0, i342, 'tut')
  i342.timeMove = i343[10]
  i342.timeDelay = i343[11]
  return i342
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i344 = root || request.c( 'UnityEngine.UI.Button' )
  var i345 = data
  i344.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i345[0], i344.m_OnClick)
  i344.m_Navigation = request.d('UnityEngine.UI.Navigation', i345[1], i344.m_Navigation)
  i344.m_Transition = i345[2]
  i344.m_Colors = request.d('UnityEngine.UI.ColorBlock', i345[3], i344.m_Colors)
  i344.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i345[4], i344.m_SpriteState)
  i344.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i345[5], i344.m_AnimationTriggers)
  i344.m_Interactable = !!i345[6]
  request.r(i345[7], i345[8], 0, i344, 'm_TargetGraphic')
  return i344
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i346 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i347 = data
  i346.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i347[0], i346.m_PersistentCalls)
  return i346
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i348 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i349 = data
  i348.m_Mode = i349[0]
  i348.m_WrapAround = !!i349[1]
  request.r(i349[2], i349[3], 0, i348, 'm_SelectOnUp')
  request.r(i349[4], i349[5], 0, i348, 'm_SelectOnDown')
  request.r(i349[6], i349[7], 0, i348, 'm_SelectOnLeft')
  request.r(i349[8], i349[9], 0, i348, 'm_SelectOnRight')
  return i348
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i350 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i351 = data
  i350.m_NormalColor = new pc.Color(i351[0], i351[1], i351[2], i351[3])
  i350.m_HighlightedColor = new pc.Color(i351[4], i351[5], i351[6], i351[7])
  i350.m_PressedColor = new pc.Color(i351[8], i351[9], i351[10], i351[11])
  i350.m_SelectedColor = new pc.Color(i351[12], i351[13], i351[14], i351[15])
  i350.m_DisabledColor = new pc.Color(i351[16], i351[17], i351[18], i351[19])
  i350.m_ColorMultiplier = i351[20]
  i350.m_FadeDuration = i351[21]
  return i350
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i352 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i353 = data
  request.r(i353[0], i353[1], 0, i352, 'm_HighlightedSprite')
  request.r(i353[2], i353[3], 0, i352, 'm_PressedSprite')
  request.r(i353[4], i353[5], 0, i352, 'm_SelectedSprite')
  request.r(i353[6], i353[7], 0, i352, 'm_DisabledSprite')
  return i352
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i354 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i355 = data
  i354.m_NormalTrigger = i355[0]
  i354.m_HighlightedTrigger = i355[1]
  i354.m_PressedTrigger = i355[2]
  i354.m_SelectedTrigger = i355[3]
  i354.m_DisabledTrigger = i355[4]
  return i354
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i356 = root || request.c( 'LayoutController' )
  var i357 = data
  request.r(i357[0], i357[1], 0, i356, 'cardParent')
  request.r(i357[2], i357[3], 0, i356, 'leftCard')
  request.r(i357[4], i357[5], 0, i356, 'rightCard')
  i356.origin = new pc.Vec2( i357[6], i357[7] )
  i356.smallSize = new pc.Vec2( i357[8], i357[9] )
  return i356
}

Deserializers["LunaController"] = function (request, data, root) {
  var i358 = root || request.c( 'LunaController' )
  var i359 = data
  i358.TimePlay = i359[0]
  i358.LimitTimePlay = !!i359[1]
  request.r(i359[2], i359[3], 0, i358, 'BGTex')
  request.r(i359[4], i359[5], 0, i358, 'BGM')
  i358.HeaderText = i359[6]
  i358.HeaderTextColor = new pc.Color(i359[7], i359[8], i359[9], i359[10])
  request.r(i359[11], i359[12], 0, i358, 'Character1Tex')
  i358.BGChar1Color = new pc.Color(i359[13], i359[14], i359[15], i359[16])
  i358.Character1Name = i359[17]
  i358.Character1NameColor = new pc.Color(i359[18], i359[19], i359[20], i359[21])
  request.r(i359[22], i359[23], 0, i358, 'Character2Tex')
  i358.BGChar2Color = new pc.Color(i359[24], i359[25], i359[26], i359[27])
  i358.Character2Name = i359[28]
  i358.Character2NameColor = new pc.Color(i359[29], i359[30], i359[31], i359[32])
  request.r(i359[33], i359[34], 0, i358, 'BGImage')
  request.r(i359[35], i359[36], 0, i358, 'musicSource')
  request.r(i359[37], i359[38], 0, i358, 'header')
  request.r(i359[39], i359[40], 0, i358, 'character1Image')
  request.r(i359[41], i359[42], 0, i358, 'BGChar1Image')
  request.r(i359[43], i359[44], 0, i358, 'character1NameText')
  request.r(i359[45], i359[46], 0, i358, 'character2Image')
  request.r(i359[47], i359[48], 0, i358, 'BGChar2Image')
  request.r(i359[49], i359[50], 0, i358, 'character2NameText')
  request.r(i359[51], i359[52], 0, i358, 'endCard')
  return i358
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i361 = data
  request.r(i361[0], i361[1], 0, i360, 'clip')
  request.r(i361[2], i361[3], 0, i360, 'outputAudioMixerGroup')
  i360.playOnAwake = !!i361[4]
  i360.loop = !!i361[5]
  i360.time = i361[6]
  i360.volume = i361[7]
  i360.pitch = i361[8]
  i360.enabled = !!i361[9]
  return i360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i363 = data
  i362.ambientIntensity = i363[0]
  i362.reflectionIntensity = i363[1]
  i362.ambientMode = i363[2]
  i362.ambientLight = new pc.Color(i363[3], i363[4], i363[5], i363[6])
  i362.ambientSkyColor = new pc.Color(i363[7], i363[8], i363[9], i363[10])
  i362.ambientGroundColor = new pc.Color(i363[11], i363[12], i363[13], i363[14])
  i362.ambientEquatorColor = new pc.Color(i363[15], i363[16], i363[17], i363[18])
  i362.fogColor = new pc.Color(i363[19], i363[20], i363[21], i363[22])
  i362.fogEndDistance = i363[23]
  i362.fogStartDistance = i363[24]
  i362.fogDensity = i363[25]
  i362.fog = !!i363[26]
  request.r(i363[27], i363[28], 0, i362, 'skybox')
  i362.fogMode = i363[29]
  var i365 = i363[30]
  var i364 = []
  for(var i = 0; i < i365.length; i += 1) {
    i364.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i365[i + 0]) );
  }
  i362.lightmaps = i364
  i362.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i363[31], i362.lightProbes)
  i362.lightmapsMode = i363[32]
  i362.mixedBakeMode = i363[33]
  i362.environmentLightingMode = i363[34]
  i362.ambientProbe = new pc.SphericalHarmonicsL2(i363[35])
  request.r(i363[36], i363[37], 0, i362, 'customReflection')
  request.r(i363[38], i363[39], 0, i362, 'defaultReflection')
  i362.defaultReflectionMode = i363[40]
  i362.defaultReflectionResolution = i363[41]
  i362.sunLightObjectId = i363[42]
  i362.pixelLightCount = i363[43]
  i362.defaultReflectionHDR = !!i363[44]
  i362.hasLightDataAsset = !!i363[45]
  i362.hasManualGenerate = !!i363[46]
  return i362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i369 = data
  request.r(i369[0], i369[1], 0, i368, 'lightmapColor')
  request.r(i369[2], i369[3], 0, i368, 'lightmapDirection')
  request.r(i369[4], i369[5], 0, i368, 'shadowMask')
  return i368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i370 = root || new UnityEngine.LightProbes()
  var i371 = data
  return i370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i378 = root || new pc.UnityMaterial()
  var i379 = data
  i378.name = i379[0]
  request.r(i379[1], i379[2], 0, i378, 'shader')
  i378.renderQueue = i379[3]
  i378.enableInstancing = !!i379[4]
  var i381 = i379[5]
  var i380 = []
  for(var i = 0; i < i381.length; i += 1) {
    i380.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i381[i + 0]) );
  }
  i378.floatParameters = i380
  var i383 = i379[6]
  var i382 = []
  for(var i = 0; i < i383.length; i += 1) {
    i382.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i383[i + 0]) );
  }
  i378.colorParameters = i382
  var i385 = i379[7]
  var i384 = []
  for(var i = 0; i < i385.length; i += 1) {
    i384.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i385[i + 0]) );
  }
  i378.vectorParameters = i384
  var i387 = i379[8]
  var i386 = []
  for(var i = 0; i < i387.length; i += 1) {
    i386.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i387[i + 0]) );
  }
  i378.textureParameters = i386
  var i389 = i379[9]
  var i388 = []
  for(var i = 0; i < i389.length; i += 1) {
    i388.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i389[i + 0]) );
  }
  i378.materialFlags = i388
  return i378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i393 = data
  i392.name = i393[0]
  i392.value = i393[1]
  return i392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i397 = data
  i396.name = i397[0]
  i396.value = new pc.Color(i397[1], i397[2], i397[3], i397[4])
  return i396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i400 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i401 = data
  i400.name = i401[0]
  i400.value = new pc.Vec4( i401[1], i401[2], i401[3], i401[4] )
  return i400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i405 = data
  i404.name = i405[0]
  request.r(i405[1], i405[2], 0, i404, 'value')
  return i404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i408 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i409 = data
  i408.name = i409[0]
  i408.enabled = !!i409[1]
  return i408
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i411 = data
  var i413 = i411[0]
  var i412 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i413.length; i += 1) {
    i412.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i413[i + 0]));
  }
  i410.ShaderCompilationErrors = i412
  i410.name = i411[1]
  i410.guid = i411[2]
  var i415 = i411[3]
  var i414 = []
  for(var i = 0; i < i415.length; i += 1) {
    i414.push( i415[i + 0] );
  }
  i410.shaderDefinedKeywords = i414
  var i417 = i411[4]
  var i416 = []
  for(var i = 0; i < i417.length; i += 1) {
    i416.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i417[i + 0]) );
  }
  i410.passes = i416
  var i419 = i411[5]
  var i418 = []
  for(var i = 0; i < i419.length; i += 1) {
    i418.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i419[i + 0]) );
  }
  i410.usePasses = i418
  var i421 = i411[6]
  var i420 = []
  for(var i = 0; i < i421.length; i += 1) {
    i420.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i421[i + 0]) );
  }
  i410.defaultParameterValues = i420
  request.r(i411[7], i411[8], 0, i410, 'unityFallbackShader')
  i410.readDepth = !!i411[9]
  i410.hasDepthOnlyPass = !!i411[10]
  i410.isCreatedByShaderGraph = !!i411[11]
  i410.disableBatching = !!i411[12]
  i410.compiled = !!i411[13]
  return i410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i424 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i425 = data
  i424.shaderName = i425[0]
  i424.errorMessage = i425[1]
  return i424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i430 = root || new pc.UnityShaderPass()
  var i431 = data
  i430.id = i431[0]
  i430.subShaderIndex = i431[1]
  i430.name = i431[2]
  i430.passType = i431[3]
  i430.grabPassTextureName = i431[4]
  i430.usePass = !!i431[5]
  i430.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[6], i430.zTest)
  i430.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[7], i430.zWrite)
  i430.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[8], i430.culling)
  i430.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i431[9], i430.blending)
  i430.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i431[10], i430.alphaBlending)
  i430.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[11], i430.colorWriteMask)
  i430.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[12], i430.offsetUnits)
  i430.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[13], i430.offsetFactor)
  i430.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[14], i430.stencilRef)
  i430.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[15], i430.stencilReadMask)
  i430.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i431[16], i430.stencilWriteMask)
  i430.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i431[17], i430.stencilOp)
  i430.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i431[18], i430.stencilOpFront)
  i430.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i431[19], i430.stencilOpBack)
  var i433 = i431[20]
  var i432 = []
  for(var i = 0; i < i433.length; i += 1) {
    i432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i433[i + 0]) );
  }
  i430.tags = i432
  var i435 = i431[21]
  var i434 = []
  for(var i = 0; i < i435.length; i += 1) {
    i434.push( i435[i + 0] );
  }
  i430.passDefinedKeywords = i434
  var i437 = i431[22]
  var i436 = []
  for(var i = 0; i < i437.length; i += 1) {
    i436.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i437[i + 0]) );
  }
  i430.passDefinedKeywordGroups = i436
  var i439 = i431[23]
  var i438 = []
  for(var i = 0; i < i439.length; i += 1) {
    i438.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i439[i + 0]) );
  }
  i430.variants = i438
  var i441 = i431[24]
  var i440 = []
  for(var i = 0; i < i441.length; i += 1) {
    i440.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i441[i + 0]) );
  }
  i430.excludedVariants = i440
  i430.hasDepthReader = !!i431[25]
  return i430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i443 = data
  i442.val = i443[0]
  i442.name = i443[1]
  return i442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i445 = data
  i444.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i445[0], i444.src)
  i444.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i445[1], i444.dst)
  i444.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i445[2], i444.op)
  return i444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i446 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i447 = data
  i446.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i447[0], i446.pass)
  i446.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i447[1], i446.fail)
  i446.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i447[2], i446.zFail)
  i446.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i447[3], i446.comp)
  return i446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i451 = data
  i450.name = i451[0]
  i450.value = i451[1]
  return i450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i454 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i455 = data
  var i457 = i455[0]
  var i456 = []
  for(var i = 0; i < i457.length; i += 1) {
    i456.push( i457[i + 0] );
  }
  i454.keywords = i456
  i454.hasDiscard = !!i455[1]
  return i454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i461 = data
  i460.passId = i461[0]
  i460.subShaderIndex = i461[1]
  var i463 = i461[2]
  var i462 = []
  for(var i = 0; i < i463.length; i += 1) {
    i462.push( i463[i + 0] );
  }
  i460.keywords = i462
  i460.vertexProgram = i461[3]
  i460.fragmentProgram = i461[4]
  i460.exportedForWebGl2 = !!i461[5]
  i460.readDepth = !!i461[6]
  return i460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i467 = data
  request.r(i467[0], i467[1], 0, i466, 'shader')
  i466.pass = i467[2]
  return i466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i471 = data
  i470.name = i471[0]
  i470.type = i471[1]
  i470.value = new pc.Vec4( i471[2], i471[3], i471[4], i471[5] )
  i470.textureValue = i471[6]
  i470.shaderPropertyFlag = i471[7]
  return i470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i473 = data
  i472.name = i473[0]
  request.r(i473[1], i473[2], 0, i472, 'texture')
  i472.aabb = i473[3]
  i472.vertices = i473[4]
  i472.triangles = i473[5]
  i472.textureRect = UnityEngine.Rect.MinMaxRect(i473[6], i473[7], i473[8], i473[9])
  i472.packedRect = UnityEngine.Rect.MinMaxRect(i473[10], i473[11], i473[12], i473[13])
  i472.border = new pc.Vec4( i473[14], i473[15], i473[16], i473[17] )
  i472.transparency = i473[18]
  i472.bounds = i473[19]
  i472.pixelsPerUnit = i473[20]
  i472.textureWidth = i473[21]
  i472.textureHeight = i473[22]
  i472.nativeSize = new pc.Vec2( i473[23], i473[24] )
  i472.pivot = new pc.Vec2( i473[25], i473[26] )
  i472.textureRectOffset = new pc.Vec2( i473[27], i473[28] )
  return i472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i475 = data
  i474.name = i475[0]
  return i474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i477 = data
  i476.name = i477[0]
  i476.ascent = i477[1]
  i476.originalLineHeight = i477[2]
  i476.fontSize = i477[3]
  var i479 = i477[4]
  var i478 = []
  for(var i = 0; i < i479.length; i += 1) {
    i478.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i479[i + 0]) );
  }
  i476.characterInfo = i478
  request.r(i477[5], i477[6], 0, i476, 'texture')
  i476.originalFontSize = i477[7]
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i483 = data
  i482.index = i483[0]
  i482.advance = i483[1]
  i482.bearing = i483[2]
  i482.glyphWidth = i483[3]
  i482.glyphHeight = i483[4]
  i482.minX = i483[5]
  i482.maxX = i483[6]
  i482.minY = i483[7]
  i482.maxY = i483[8]
  i482.uvBottomLeftX = i483[9]
  i482.uvBottomLeftY = i483[10]
  i482.uvBottomRightX = i483[11]
  i482.uvBottomRightY = i483[12]
  i482.uvTopLeftX = i483[13]
  i482.uvTopLeftY = i483[14]
  i482.uvTopRightX = i483[15]
  i482.uvTopRightY = i483[16]
  return i482
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i484 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i485 = data
  i484.useSafeMode = !!i485[0]
  i484.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i485[1], i484.safeModeOptions)
  i484.timeScale = i485[2]
  i484.unscaledTimeScale = i485[3]
  i484.useSmoothDeltaTime = !!i485[4]
  i484.maxSmoothUnscaledTime = i485[5]
  i484.rewindCallbackMode = i485[6]
  i484.showUnityEditorReport = !!i485[7]
  i484.logBehaviour = i485[8]
  i484.drawGizmos = !!i485[9]
  i484.defaultRecyclable = !!i485[10]
  i484.defaultAutoPlay = i485[11]
  i484.defaultUpdateType = i485[12]
  i484.defaultTimeScaleIndependent = !!i485[13]
  i484.defaultEaseType = i485[14]
  i484.defaultEaseOvershootOrAmplitude = i485[15]
  i484.defaultEasePeriod = i485[16]
  i484.defaultAutoKill = !!i485[17]
  i484.defaultLoopType = i485[18]
  i484.debugMode = !!i485[19]
  i484.debugStoreTargetId = !!i485[20]
  i484.showPreviewPanel = !!i485[21]
  i484.storeSettingsLocation = i485[22]
  i484.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i485[23], i484.modules)
  i484.createASMDEF = !!i485[24]
  i484.showPlayingTweens = !!i485[25]
  i484.showPausedTweens = !!i485[26]
  return i484
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i486 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i487 = data
  i486.logBehaviour = i487[0]
  i486.nestedTweenFailureBehaviour = i487[1]
  return i486
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i488 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i489 = data
  i488.showPanel = !!i489[0]
  i488.audioEnabled = !!i489[1]
  i488.physicsEnabled = !!i489[2]
  i488.physics2DEnabled = !!i489[3]
  i488.spriteEnabled = !!i489[4]
  i488.uiEnabled = !!i489[5]
  i488.textMeshProEnabled = !!i489[6]
  i488.tk2DEnabled = !!i489[7]
  i488.deAudioEnabled = !!i489[8]
  i488.deUnityExtendedEnabled = !!i489[9]
  i488.epoOutlineEnabled = !!i489[10]
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i491 = data
  var i493 = i491[0]
  var i492 = []
  for(var i = 0; i < i493.length; i += 1) {
    i492.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i493[i + 0]) );
  }
  i490.files = i492
  i490.componentToPrefabIds = i491[1]
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i497 = data
  i496.path = i497[0]
  request.r(i497[1], i497[2], 0, i496, 'unityObject')
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i499 = data
  var i501 = i499[0]
  var i500 = []
  for(var i = 0; i < i501.length; i += 1) {
    i500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i501[i + 0]) );
  }
  i498.scriptsExecutionOrder = i500
  var i503 = i499[1]
  var i502 = []
  for(var i = 0; i < i503.length; i += 1) {
    i502.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i503[i + 0]) );
  }
  i498.sortingLayers = i502
  var i505 = i499[2]
  var i504 = []
  for(var i = 0; i < i505.length; i += 1) {
    i504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i505[i + 0]) );
  }
  i498.cullingLayers = i504
  i498.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i499[3], i498.timeSettings)
  i498.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i499[4], i498.physicsSettings)
  i498.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i499[5], i498.physics2DSettings)
  i498.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i499[6], i498.qualitySettings)
  i498.enableRealtimeShadows = !!i499[7]
  i498.enableAutoInstancing = !!i499[8]
  i498.enableStaticBatching = !!i499[9]
  i498.enableDynamicBatching = !!i499[10]
  i498.usePreservativeDynamicBatching = !!i499[11]
  i498.lightmapEncodingQuality = i499[12]
  i498.desiredColorSpace = i499[13]
  var i507 = i499[14]
  var i506 = []
  for(var i = 0; i < i507.length; i += 1) {
    i506.push( i507[i + 0] );
  }
  i498.allTags = i506
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i511 = data
  i510.name = i511[0]
  i510.value = i511[1]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i515 = data
  i514.id = i515[0]
  i514.name = i515[1]
  i514.value = i515[2]
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i519 = data
  i518.id = i519[0]
  i518.name = i519[1]
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i521 = data
  i520.fixedDeltaTime = i521[0]
  i520.maximumDeltaTime = i521[1]
  i520.timeScale = i521[2]
  i520.maximumParticleTimestep = i521[3]
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i523 = data
  i522.gravity = new pc.Vec3( i523[0], i523[1], i523[2] )
  i522.defaultSolverIterations = i523[3]
  i522.bounceThreshold = i523[4]
  i522.autoSyncTransforms = !!i523[5]
  i522.autoSimulation = !!i523[6]
  var i525 = i523[7]
  var i524 = []
  for(var i = 0; i < i525.length; i += 1) {
    i524.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i525[i + 0]) );
  }
  i522.collisionMatrix = i524
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i529 = data
  i528.enabled = !!i529[0]
  i528.layerId = i529[1]
  i528.otherLayerId = i529[2]
  return i528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i531 = data
  request.r(i531[0], i531[1], 0, i530, 'material')
  i530.gravity = new pc.Vec2( i531[2], i531[3] )
  i530.positionIterations = i531[4]
  i530.velocityIterations = i531[5]
  i530.velocityThreshold = i531[6]
  i530.maxLinearCorrection = i531[7]
  i530.maxAngularCorrection = i531[8]
  i530.maxTranslationSpeed = i531[9]
  i530.maxRotationSpeed = i531[10]
  i530.baumgarteScale = i531[11]
  i530.baumgarteTOIScale = i531[12]
  i530.timeToSleep = i531[13]
  i530.linearSleepTolerance = i531[14]
  i530.angularSleepTolerance = i531[15]
  i530.defaultContactOffset = i531[16]
  i530.autoSimulation = !!i531[17]
  i530.queriesHitTriggers = !!i531[18]
  i530.queriesStartInColliders = !!i531[19]
  i530.callbacksOnDisable = !!i531[20]
  i530.reuseCollisionCallbacks = !!i531[21]
  i530.autoSyncTransforms = !!i531[22]
  var i533 = i531[23]
  var i532 = []
  for(var i = 0; i < i533.length; i += 1) {
    i532.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i533[i + 0]) );
  }
  i530.collisionMatrix = i532
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i537 = data
  i536.enabled = !!i537[0]
  i536.layerId = i537[1]
  i536.otherLayerId = i537[2]
  return i536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i539 = data
  var i541 = i539[0]
  var i540 = []
  for(var i = 0; i < i541.length; i += 1) {
    i540.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i541[i + 0]) );
  }
  i538.qualityLevels = i540
  var i543 = i539[1]
  var i542 = []
  for(var i = 0; i < i543.length; i += 1) {
    i542.push( i543[i + 0] );
  }
  i538.names = i542
  i538.shadows = i539[2]
  i538.anisotropicFiltering = i539[3]
  i538.antiAliasing = i539[4]
  i538.lodBias = i539[5]
  i538.shadowCascades = i539[6]
  i538.shadowDistance = i539[7]
  i538.shadowmaskMode = i539[8]
  i538.shadowProjection = i539[9]
  i538.shadowResolution = i539[10]
  i538.softParticles = !!i539[11]
  i538.softVegetation = !!i539[12]
  i538.activeColorSpace = i539[13]
  i538.desiredColorSpace = i539[14]
  i538.masterTextureLimit = i539[15]
  i538.maxQueuedFrames = i539[16]
  i538.particleRaycastBudget = i539[17]
  i538.pixelLightCount = i539[18]
  i538.realtimeReflectionProbes = !!i539[19]
  i538.shadowCascade2Split = i539[20]
  i538.shadowCascade4Split = new pc.Vec3( i539[21], i539[22], i539[23] )
  i538.streamingMipmapsActive = !!i539[24]
  i538.vSyncCount = i539[25]
  i538.asyncUploadBufferSize = i539[26]
  i538.asyncUploadTimeSlice = i539[27]
  i538.billboardsFaceCameraPosition = !!i539[28]
  i538.shadowNearPlaneOffset = i539[29]
  i538.streamingMipmapsMemoryBudget = i539[30]
  i538.maximumLODLevel = i539[31]
  i538.streamingMipmapsAddAllCameras = !!i539[32]
  i538.streamingMipmapsMaxLevelReduction = i539[33]
  i538.streamingMipmapsRenderersPerFrame = i539[34]
  i538.resolutionScalingFixedDPIFactor = i539[35]
  i538.streamingMipmapsMaxFileIORequests = i539[36]
  i538.currentQualityLevel = i539[37]
  return i538
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i546 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i547 = data
  request.r(i547[0], i547[1], 0, i546, 'm_ObjectArgument')
  i546.m_ObjectArgumentAssemblyTypeName = i547[2]
  i546.m_IntArgument = i547[3]
  i546.m_FloatArgument = i547[4]
  i546.m_StringArgument = i547[5]
  i546.m_BoolArgument = !!i547[6]
  return i546
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"28":[29],"30":[29],"31":[29],"32":[29],"33":[29],"34":[29],"35":[36],"37":[0],"38":[39],"40":[39],"41":[39],"42":[39],"43":[39],"44":[39],"45":[46],"47":[46],"48":[46],"49":[46],"50":[46],"51":[46],"52":[46],"53":[46],"54":[46],"55":[46],"56":[46],"57":[46],"58":[46],"59":[0],"60":[61],"62":[63],"64":[63],"6":[5],"65":[66],"67":[0],"68":[69],"70":[5],"71":[9,5],"72":[61],"73":[9,5],"74":[5],"75":[5],"76":[61,5],"77":[5,9],"78":[79],"80":[79],"81":[79],"82":[5],"83":[5],"8":[6],"16":[9,5],"10":[5],"7":[6],"84":[5],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"18":[5],"91":[5],"11":[9,5],"92":[5],"93":[5],"94":[5],"95":[5],"12":[9,5],"96":[5],"97":[3],"98":[3],"4":[3],"99":[3],"100":[0],"101":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Mask","TutController","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.Texture2D","UnityEngine.AudioClip","UnityEngine.AudioSource","UnityEngine.Shader","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "08/04/2026 03:57:56";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "SFMS_V03_NgocNDL_TamNTM";

Deserializers.lunaAppID = "39760";

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

Deserializers.runtimeAnalysisExcludedMethodsCount = "3730";

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

Deserializers.buildID = "47187782-e14b-4360-a970-3323dfdb8dd5";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

