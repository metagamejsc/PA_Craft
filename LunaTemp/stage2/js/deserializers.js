var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i440 = root || request.c( 'UnityEngine.JointSpring' )
  var i441 = data
  i440.spring = i441[0]
  i440.damper = i441[1]
  i440.targetPosition = i441[2]
  return i440
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i442 = root || request.c( 'UnityEngine.JointMotor' )
  var i443 = data
  i442.m_TargetVelocity = i443[0]
  i442.m_Force = i443[1]
  i442.m_FreeSpin = i443[2]
  return i442
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i444 = root || request.c( 'UnityEngine.JointLimits' )
  var i445 = data
  i444.m_Min = i445[0]
  i444.m_Max = i445[1]
  i444.m_Bounciness = i445[2]
  i444.m_BounceMinVelocity = i445[3]
  i444.m_ContactDistance = i445[4]
  i444.minBounce = i445[5]
  i444.maxBounce = i445[6]
  return i444
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i446 = root || request.c( 'UnityEngine.JointDrive' )
  var i447 = data
  i446.m_PositionSpring = i447[0]
  i446.m_PositionDamper = i447[1]
  i446.m_MaximumForce = i447[2]
  i446.m_UseAcceleration = i447[3]
  return i446
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i448 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i449 = data
  i448.m_Spring = i449[0]
  i448.m_Damper = i449[1]
  return i448
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i450 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i451 = data
  i450.m_Limit = i451[0]
  i450.m_Bounciness = i451[1]
  i450.m_ContactDistance = i451[2]
  return i450
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i452 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i453 = data
  i452.m_ExtremumSlip = i453[0]
  i452.m_ExtremumValue = i453[1]
  i452.m_AsymptoteSlip = i453[2]
  i452.m_AsymptoteValue = i453[3]
  i452.m_Stiffness = i453[4]
  return i452
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i454 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i455 = data
  i454.m_LowerAngle = i455[0]
  i454.m_UpperAngle = i455[1]
  return i454
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i456 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i457 = data
  i456.m_MotorSpeed = i457[0]
  i456.m_MaximumMotorTorque = i457[1]
  return i456
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i458 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i459 = data
  i458.m_DampingRatio = i459[0]
  i458.m_Frequency = i459[1]
  i458.m_Angle = i459[2]
  return i458
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i460 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i461 = data
  i460.m_LowerTranslation = i461[0]
  i460.m_UpperTranslation = i461[1]
  return i460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i462 = root || new pc.UnityMaterial()
  var i463 = data
  i462.name = i463[0]
  request.r(i463[1], i463[2], 0, i462, 'shader')
  i462.renderQueue = i463[3]
  i462.enableInstancing = !!i463[4]
  var i465 = i463[5]
  var i464 = []
  for(var i = 0; i < i465.length; i += 1) {
    i464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i465[i + 0]) );
  }
  i462.floatParameters = i464
  var i467 = i463[6]
  var i466 = []
  for(var i = 0; i < i467.length; i += 1) {
    i466.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i467[i + 0]) );
  }
  i462.colorParameters = i466
  var i469 = i463[7]
  var i468 = []
  for(var i = 0; i < i469.length; i += 1) {
    i468.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i469[i + 0]) );
  }
  i462.vectorParameters = i468
  var i471 = i463[8]
  var i470 = []
  for(var i = 0; i < i471.length; i += 1) {
    i470.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i471[i + 0]) );
  }
  i462.textureParameters = i470
  var i473 = i463[9]
  var i472 = []
  for(var i = 0; i < i473.length; i += 1) {
    i472.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i473[i + 0]) );
  }
  i462.materialFlags = i472
  return i462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i477 = data
  i476.name = i477[0]
  i476.value = i477[1]
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i481 = data
  i480.name = i481[0]
  i480.value = new pc.Color(i481[1], i481[2], i481[3], i481[4])
  return i480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i485 = data
  i484.name = i485[0]
  i484.value = new pc.Vec4( i485[1], i485[2], i485[3], i485[4] )
  return i484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i489 = data
  i488.name = i489[0]
  request.r(i489[1], i489[2], 0, i488, 'value')
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i493 = data
  i492.name = i493[0]
  i492.enabled = !!i493[1]
  return i492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i495 = data
  i494.name = i495[0]
  i494.width = i495[1]
  i494.height = i495[2]
  i494.mipmapCount = i495[3]
  i494.anisoLevel = i495[4]
  i494.filterMode = i495[5]
  i494.hdr = !!i495[6]
  i494.format = i495[7]
  i494.wrapMode = i495[8]
  i494.alphaIsTransparency = !!i495[9]
  i494.alphaSource = i495[10]
  i494.graphicsFormat = i495[11]
  i494.sRGBTexture = !!i495[12]
  i494.desiredColorSpace = i495[13]
  i494.wrapU = i495[14]
  i494.wrapV = i495[15]
  return i494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i497 = data
  i496.name = i497[0]
  i496.index = i497[1]
  i496.startup = !!i497[2]
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i499 = data
  i498.aspect = i499[0]
  i498.orthographic = !!i499[1]
  i498.orthographicSize = i499[2]
  i498.backgroundColor = new pc.Color(i499[3], i499[4], i499[5], i499[6])
  i498.nearClipPlane = i499[7]
  i498.farClipPlane = i499[8]
  i498.fieldOfView = i499[9]
  i498.depth = i499[10]
  i498.clearFlags = i499[11]
  i498.cullingMask = i499[12]
  i498.rect = i499[13]
  request.r(i499[14], i499[15], 0, i498, 'targetTexture')
  i498.usePhysicalProperties = !!i499[16]
  i498.focalLength = i499[17]
  i498.sensorSize = new pc.Vec2( i499[18], i499[19] )
  i498.lensShift = new pc.Vec2( i499[20], i499[21] )
  i498.gateFit = i499[22]
  i498.commandBufferCount = i499[23]
  i498.cameraType = i499[24]
  i498.enabled = !!i499[25]
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i501 = data
  i500.name = i501[0]
  i500.tagId = i501[1]
  i500.enabled = !!i501[2]
  i500.isStatic = !!i501[3]
  i500.layer = i501[4]
  return i500
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i502 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i503 = data
  request.r(i503[0], i503[1], 0, i502, 'm_FirstSelected')
  i502.m_sendNavigationEvents = !!i503[2]
  i502.m_DragThreshold = i503[3]
  return i502
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i504 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i505 = data
  i504.m_HorizontalAxis = i505[0]
  i504.m_VerticalAxis = i505[1]
  i504.m_SubmitButton = i505[2]
  i504.m_CancelButton = i505[3]
  i504.m_InputActionsPerSecond = i505[4]
  i504.m_RepeatDelay = i505[5]
  i504.m_ForceModuleActive = !!i505[6]
  i504.m_SendPointerHoverToParent = !!i505[7]
  return i504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i507 = data
  i506.pivot = new pc.Vec2( i507[0], i507[1] )
  i506.anchorMin = new pc.Vec2( i507[2], i507[3] )
  i506.anchorMax = new pc.Vec2( i507[4], i507[5] )
  i506.sizeDelta = new pc.Vec2( i507[6], i507[7] )
  i506.anchoredPosition3D = new pc.Vec3( i507[8], i507[9], i507[10] )
  i506.rotation = new pc.Quat(i507[11], i507[12], i507[13], i507[14])
  i506.scale = new pc.Vec3( i507[15], i507[16], i507[17] )
  return i506
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i509 = data
  i508.planeDistance = i509[0]
  i508.referencePixelsPerUnit = i509[1]
  i508.isFallbackOverlay = !!i509[2]
  i508.renderMode = i509[3]
  i508.renderOrder = i509[4]
  i508.sortingLayerName = i509[5]
  i508.sortingOrder = i509[6]
  i508.scaleFactor = i509[7]
  request.r(i509[8], i509[9], 0, i508, 'worldCamera')
  i508.overrideSorting = !!i509[10]
  i508.pixelPerfect = !!i509[11]
  i508.targetDisplay = i509[12]
  i508.overridePixelPerfect = !!i509[13]
  i508.enabled = !!i509[14]
  return i508
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i510 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i511 = data
  i510.m_UiScaleMode = i511[0]
  i510.m_ReferencePixelsPerUnit = i511[1]
  i510.m_ScaleFactor = i511[2]
  i510.m_ReferenceResolution = new pc.Vec2( i511[3], i511[4] )
  i510.m_ScreenMatchMode = i511[5]
  i510.m_MatchWidthOrHeight = i511[6]
  i510.m_PhysicalUnit = i511[7]
  i510.m_FallbackScreenDPI = i511[8]
  i510.m_DefaultSpriteDPI = i511[9]
  i510.m_DynamicPixelsPerUnit = i511[10]
  i510.m_PresetInfoIsWorld = !!i511[11]
  return i510
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i512 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i513 = data
  i512.m_IgnoreReversedGraphics = !!i513[0]
  i512.m_BlockingObjects = i513[1]
  i512.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i513[2] )
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i515 = data
  i514.cullTransparentMesh = !!i515[0]
  return i514
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i516 = root || request.c( 'UnityEngine.UI.Image' )
  var i517 = data
  request.r(i517[0], i517[1], 0, i516, 'm_Sprite')
  i516.m_Type = i517[2]
  i516.m_PreserveAspect = !!i517[3]
  i516.m_FillCenter = !!i517[4]
  i516.m_FillMethod = i517[5]
  i516.m_FillAmount = i517[6]
  i516.m_FillClockwise = !!i517[7]
  i516.m_FillOrigin = i517[8]
  i516.m_UseSpriteMesh = !!i517[9]
  i516.m_PixelsPerUnitMultiplier = i517[10]
  request.r(i517[11], i517[12], 0, i516, 'm_Material')
  i516.m_Maskable = !!i517[13]
  i516.m_Color = new pc.Color(i517[14], i517[15], i517[16], i517[17])
  i516.m_RaycastTarget = !!i517[18]
  i516.m_RaycastPadding = new pc.Vec4( i517[19], i517[20], i517[21], i517[22] )
  return i516
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i519 = data
  request.r(i519[0], i519[1], 0, i518, 'm_Texture')
  i518.m_UVRect = UnityEngine.Rect.MinMaxRect(i519[2], i519[3], i519[4], i519[5])
  request.r(i519[6], i519[7], 0, i518, 'm_Material')
  i518.m_Maskable = !!i519[8]
  i518.m_Color = new pc.Color(i519[9], i519[10], i519[11], i519[12])
  i518.m_RaycastTarget = !!i519[13]
  i518.m_RaycastPadding = new pc.Vec4( i519[14], i519[15], i519[16], i519[17] )
  return i518
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i520 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i521 = data
  i520.m_hasFontAssetChanged = !!i521[0]
  request.r(i521[1], i521[2], 0, i520, 'm_baseMaterial')
  i520.m_maskOffset = new pc.Vec4( i521[3], i521[4], i521[5], i521[6] )
  i520.m_text = i521[7]
  i520.m_isRightToLeft = !!i521[8]
  request.r(i521[9], i521[10], 0, i520, 'm_fontAsset')
  request.r(i521[11], i521[12], 0, i520, 'm_sharedMaterial')
  var i523 = i521[13]
  var i522 = []
  for(var i = 0; i < i523.length; i += 2) {
  request.r(i523[i + 0], i523[i + 1], 2, i522, '')
  }
  i520.m_fontSharedMaterials = i522
  request.r(i521[14], i521[15], 0, i520, 'm_fontMaterial')
  var i525 = i521[16]
  var i524 = []
  for(var i = 0; i < i525.length; i += 2) {
  request.r(i525[i + 0], i525[i + 1], 2, i524, '')
  }
  i520.m_fontMaterials = i524
  i520.m_fontColor32 = UnityEngine.Color32.ConstructColor(i521[17], i521[18], i521[19], i521[20])
  i520.m_fontColor = new pc.Color(i521[21], i521[22], i521[23], i521[24])
  i520.m_enableVertexGradient = !!i521[25]
  i520.m_colorMode = i521[26]
  i520.m_fontColorGradient = request.d('TMPro.VertexGradient', i521[27], i520.m_fontColorGradient)
  request.r(i521[28], i521[29], 0, i520, 'm_fontColorGradientPreset')
  request.r(i521[30], i521[31], 0, i520, 'm_spriteAsset')
  i520.m_tintAllSprites = !!i521[32]
  request.r(i521[33], i521[34], 0, i520, 'm_StyleSheet')
  i520.m_TextStyleHashCode = i521[35]
  i520.m_overrideHtmlColors = !!i521[36]
  i520.m_faceColor = UnityEngine.Color32.ConstructColor(i521[37], i521[38], i521[39], i521[40])
  i520.m_fontSize = i521[41]
  i520.m_fontSizeBase = i521[42]
  i520.m_fontWeight = i521[43]
  i520.m_enableAutoSizing = !!i521[44]
  i520.m_fontSizeMin = i521[45]
  i520.m_fontSizeMax = i521[46]
  i520.m_fontStyle = i521[47]
  i520.m_HorizontalAlignment = i521[48]
  i520.m_VerticalAlignment = i521[49]
  i520.m_textAlignment = i521[50]
  i520.m_characterSpacing = i521[51]
  i520.m_characterHorizontalScale = i521[52]
  i520.m_wordSpacing = i521[53]
  i520.m_lineSpacing = i521[54]
  i520.m_lineSpacingMax = i521[55]
  i520.m_paragraphSpacing = i521[56]
  i520.m_charWidthMaxAdj = i521[57]
  i520.m_TextWrappingMode = i521[58]
  i520.m_wordWrappingRatios = i521[59]
  i520.m_overflowMode = i521[60]
  request.r(i521[61], i521[62], 0, i520, 'm_linkedTextComponent')
  request.r(i521[63], i521[64], 0, i520, 'parentLinkedComponent')
  i520.m_enableKerning = !!i521[65]
  var i527 = i521[66]
  var i526 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i527.length; i += 1) {
    i526.add(i527[i + 0]);
  }
  i520.m_ActiveFontFeatures = i526
  i520.m_enableExtraPadding = !!i521[67]
  i520.checkPaddingRequired = !!i521[68]
  i520.m_isRichText = !!i521[69]
  i520.m_parseCtrlCharacters = !!i521[70]
  i520.m_isOrthographic = !!i521[71]
  i520.m_isCullingEnabled = !!i521[72]
  i520.m_horizontalMapping = i521[73]
  i520.m_verticalMapping = i521[74]
  i520.m_uvLineOffset = i521[75]
  i520.m_geometrySortingOrder = i521[76]
  i520.m_IsTextObjectScaleStatic = !!i521[77]
  i520.m_VertexBufferAutoSizeReduction = !!i521[78]
  i520.m_useMaxVisibleDescender = !!i521[79]
  i520.m_pageToDisplay = i521[80]
  i520.m_margin = new pc.Vec4( i521[81], i521[82], i521[83], i521[84] )
  i520.m_isUsingLegacyAnimationComponent = !!i521[85]
  i520.m_isVolumetricText = !!i521[86]
  request.r(i521[87], i521[88], 0, i520, 'm_Material')
  i520.m_EmojiFallbackSupport = !!i521[89]
  i520.m_Maskable = !!i521[90]
  i520.m_Color = new pc.Color(i521[91], i521[92], i521[93], i521[94])
  i520.m_RaycastTarget = !!i521[95]
  i520.m_RaycastPadding = new pc.Vec4( i521[96], i521[97], i521[98], i521[99] )
  return i520
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i530 = root || request.c( 'TMPro.VertexGradient' )
  var i531 = data
  i530.topLeft = new pc.Color(i531[0], i531[1], i531[2], i531[3])
  i530.topRight = new pc.Color(i531[4], i531[5], i531[6], i531[7])
  i530.bottomLeft = new pc.Color(i531[8], i531[9], i531[10], i531[11])
  i530.bottomRight = new pc.Color(i531[12], i531[13], i531[14], i531[15])
  return i530
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i534 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i535 = data
  i534.targetIsSelf = !!i535[0]
  request.r(i535[1], i535[2], 0, i534, 'targetGO')
  i534.tweenTargetIsTargetGO = !!i535[3]
  i534.delay = i535[4]
  i534.duration = i535[5]
  i534.easeType = i535[6]
  i534.easeCurve = new pc.AnimationCurve( { keys_flow: i535[7] } )
  i534.loopType = i535[8]
  i534.loops = i535[9]
  i534.id = i535[10]
  i534.isRelative = !!i535[11]
  i534.isFrom = !!i535[12]
  i534.isIndependentUpdate = !!i535[13]
  i534.autoKill = !!i535[14]
  i534.autoGenerate = !!i535[15]
  i534.isActive = !!i535[16]
  i534.isValid = !!i535[17]
  request.r(i535[18], i535[19], 0, i534, 'target')
  i534.animationType = i535[20]
  i534.targetType = i535[21]
  i534.forcedTargetType = i535[22]
  i534.autoPlay = !!i535[23]
  i534.useTargetAsV3 = !!i535[24]
  i534.endValueFloat = i535[25]
  i534.endValueV3 = new pc.Vec3( i535[26], i535[27], i535[28] )
  i534.endValueV2 = new pc.Vec2( i535[29], i535[30] )
  i534.endValueColor = new pc.Color(i535[31], i535[32], i535[33], i535[34])
  i534.endValueString = i535[35]
  i534.endValueRect = UnityEngine.Rect.MinMaxRect(i535[36], i535[37], i535[38], i535[39])
  request.r(i535[40], i535[41], 0, i534, 'endValueTransform')
  i534.optionalBool0 = !!i535[42]
  i534.optionalBool1 = !!i535[43]
  i534.optionalFloat0 = i535[44]
  i534.optionalInt0 = i535[45]
  i534.optionalRotationMode = i535[46]
  i534.optionalScrambleMode = i535[47]
  i534.optionalShakeRandomnessMode = i535[48]
  i534.optionalString = i535[49]
  i534.updateType = i535[50]
  i534.isSpeedBased = !!i535[51]
  i534.hasOnStart = !!i535[52]
  i534.hasOnPlay = !!i535[53]
  i534.hasOnUpdate = !!i535[54]
  i534.hasOnStepComplete = !!i535[55]
  i534.hasOnComplete = !!i535[56]
  i534.hasOnTweenCreated = !!i535[57]
  i534.hasOnRewind = !!i535[58]
  i534.onStart = request.d('UnityEngine.Events.UnityEvent', i535[59], i534.onStart)
  i534.onPlay = request.d('UnityEngine.Events.UnityEvent', i535[60], i534.onPlay)
  i534.onUpdate = request.d('UnityEngine.Events.UnityEvent', i535[61], i534.onUpdate)
  i534.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i535[62], i534.onStepComplete)
  i534.onComplete = request.d('UnityEngine.Events.UnityEvent', i535[63], i534.onComplete)
  i534.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i535[64], i534.onTweenCreated)
  i534.onRewind = request.d('UnityEngine.Events.UnityEvent', i535[65], i534.onRewind)
  return i534
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i536 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i537 = data
  i536.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i537[0], i536.m_PersistentCalls)
  return i536
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i538 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i539 = data
  var i541 = i539[0]
  var i540 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i541.length; i += 1) {
    i540.add(request.d('UnityEngine.Events.PersistentCall', i541[i + 0]));
  }
  i538.m_Calls = i540
  return i538
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i544 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i545 = data
  request.r(i545[0], i545[1], 0, i544, 'm_Target')
  i544.m_TargetAssemblyTypeName = i545[2]
  i544.m_MethodName = i545[3]
  i544.m_Mode = i545[4]
  i544.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i545[5], i544.m_Arguments)
  i544.m_CallState = i545[6]
  return i544
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i546 = root || request.c( 'UnityEngine.UI.Button' )
  var i547 = data
  i546.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i547[0], i546.m_OnClick)
  i546.m_Navigation = request.d('UnityEngine.UI.Navigation', i547[1], i546.m_Navigation)
  i546.m_Transition = i547[2]
  i546.m_Colors = request.d('UnityEngine.UI.ColorBlock', i547[3], i546.m_Colors)
  i546.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i547[4], i546.m_SpriteState)
  i546.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i547[5], i546.m_AnimationTriggers)
  i546.m_Interactable = !!i547[6]
  request.r(i547[7], i547[8], 0, i546, 'm_TargetGraphic')
  return i546
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i548 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i549 = data
  i548.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i549[0], i548.m_PersistentCalls)
  return i548
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i550 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i551 = data
  i550.m_Mode = i551[0]
  i550.m_WrapAround = !!i551[1]
  request.r(i551[2], i551[3], 0, i550, 'm_SelectOnUp')
  request.r(i551[4], i551[5], 0, i550, 'm_SelectOnDown')
  request.r(i551[6], i551[7], 0, i550, 'm_SelectOnLeft')
  request.r(i551[8], i551[9], 0, i550, 'm_SelectOnRight')
  return i550
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i552 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i553 = data
  i552.m_NormalColor = new pc.Color(i553[0], i553[1], i553[2], i553[3])
  i552.m_HighlightedColor = new pc.Color(i553[4], i553[5], i553[6], i553[7])
  i552.m_PressedColor = new pc.Color(i553[8], i553[9], i553[10], i553[11])
  i552.m_SelectedColor = new pc.Color(i553[12], i553[13], i553[14], i553[15])
  i552.m_DisabledColor = new pc.Color(i553[16], i553[17], i553[18], i553[19])
  i552.m_ColorMultiplier = i553[20]
  i552.m_FadeDuration = i553[21]
  return i552
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i554 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i555 = data
  request.r(i555[0], i555[1], 0, i554, 'm_HighlightedSprite')
  request.r(i555[2], i555[3], 0, i554, 'm_PressedSprite')
  request.r(i555[4], i555[5], 0, i554, 'm_SelectedSprite')
  request.r(i555[6], i555[7], 0, i554, 'm_DisabledSprite')
  return i554
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i556 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i557 = data
  i556.m_NormalTrigger = i557[0]
  i556.m_HighlightedTrigger = i557[1]
  i556.m_PressedTrigger = i557[2]
  i556.m_SelectedTrigger = i557[3]
  i556.m_DisabledTrigger = i557[4]
  return i556
}

Deserializers["TutController"] = function (request, data, root) {
  var i558 = root || request.c( 'TutController' )
  var i559 = data
  request.r(i559[0], i559[1], 0, i558, 'rt')
  var i561 = i559[2]
  var i560 = new (System.Collections.Generic.List$1(Bridge.ns('Option')))
  for(var i = 0; i < i561.length; i += 1) {
    i560.add(request.d('Option', i561[i + 0]));
  }
  i558.options = i560
  i558.moveTime = i559[3]
  i558.fromScale = i559[4]
  i558.toScale = i559[5]
  i558.scaleTime = i559[6]
  return i558
}

Deserializers["Option"] = function (request, data, root) {
  var i564 = root || request.c( 'Option' )
  var i565 = data
  i564.Position = new pc.Vec3( i565[0], i565[1], i565[2] )
  request.r(i565[3], i565[4], 0, i564, 'Demo')
  return i564
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.UI.Text' )
  var i567 = data
  i566.m_FontData = request.d('UnityEngine.UI.FontData', i567[0], i566.m_FontData)
  i566.m_Text = i567[1]
  request.r(i567[2], i567[3], 0, i566, 'm_Material')
  i566.m_Maskable = !!i567[4]
  i566.m_Color = new pc.Color(i567[5], i567[6], i567[7], i567[8])
  i566.m_RaycastTarget = !!i567[9]
  i566.m_RaycastPadding = new pc.Vec4( i567[10], i567[11], i567[12], i567[13] )
  return i566
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i568 = root || request.c( 'UnityEngine.UI.FontData' )
  var i569 = data
  request.r(i569[0], i569[1], 0, i568, 'm_Font')
  i568.m_FontSize = i569[2]
  i568.m_FontStyle = i569[3]
  i568.m_BestFit = !!i569[4]
  i568.m_MinSize = i569[5]
  i568.m_MaxSize = i569[6]
  i568.m_Alignment = i569[7]
  i568.m_AlignByGeometry = !!i569[8]
  i568.m_RichText = !!i569[9]
  i568.m_HorizontalOverflow = i569[10]
  i568.m_VerticalOverflow = i569[11]
  i568.m_LineSpacing = i569[12]
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i571 = data
  request.r(i571[0], i571[1], 0, i570, 'clip')
  request.r(i571[2], i571[3], 0, i570, 'outputAudioMixerGroup')
  i570.playOnAwake = !!i571[4]
  i570.loop = !!i571[5]
  i570.time = i571[6]
  i570.volume = i571[7]
  i570.pitch = i571[8]
  i570.enabled = !!i571[9]
  return i570
}

Deserializers["LunaController"] = function (request, data, root) {
  var i572 = root || request.c( 'LunaController' )
  var i573 = data
  i572.TimePlay = i573[0]
  i572.LimitTimePlay = !!i573[1]
  request.r(i573[2], i573[3], 0, i572, 'BGM')
  request.r(i573[4], i573[5], 0, i572, 'BGTexture')
  request.r(i573[6], i573[7], 0, i572, 'Demo1Texture')
  i572.Demo1Name = i573[8]
  request.r(i573[9], i573[10], 0, i572, 'Demo2Texture')
  i572.Demo2Name = i573[11]
  request.r(i573[12], i573[13], 0, i572, 'Demo3Texture')
  i572.Demo3Name = i573[14]
  request.r(i573[15], i573[16], 0, i572, 'Demo4Texture')
  i572.Demo4Name = i573[17]
  request.r(i573[18], i573[19], 0, i572, 'musicSource')
  request.r(i573[20], i573[21], 0, i572, 'BGImage')
  request.r(i573[22], i573[23], 0, i572, 'demo1Image')
  request.r(i573[24], i573[25], 0, i572, 'demo1Text')
  request.r(i573[26], i573[27], 0, i572, 'demo2Image')
  request.r(i573[28], i573[29], 0, i572, 'demo2Text')
  request.r(i573[30], i573[31], 0, i572, 'demo3Image')
  request.r(i573[32], i573[33], 0, i572, 'demo3Text')
  request.r(i573[34], i573[35], 0, i572, 'demo4Image')
  request.r(i573[36], i573[37], 0, i572, 'demo4Text')
  var i575 = i573[38]
  var i574 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i575.length; i += 2) {
  request.r(i575[i + 0], i575[i + 1], 1, i574, '')
  }
  i572.CTA = i574
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i579 = data
  i578.ambientIntensity = i579[0]
  i578.reflectionIntensity = i579[1]
  i578.ambientMode = i579[2]
  i578.ambientLight = new pc.Color(i579[3], i579[4], i579[5], i579[6])
  i578.ambientSkyColor = new pc.Color(i579[7], i579[8], i579[9], i579[10])
  i578.ambientGroundColor = new pc.Color(i579[11], i579[12], i579[13], i579[14])
  i578.ambientEquatorColor = new pc.Color(i579[15], i579[16], i579[17], i579[18])
  i578.fogColor = new pc.Color(i579[19], i579[20], i579[21], i579[22])
  i578.fogEndDistance = i579[23]
  i578.fogStartDistance = i579[24]
  i578.fogDensity = i579[25]
  i578.fog = !!i579[26]
  request.r(i579[27], i579[28], 0, i578, 'skybox')
  i578.fogMode = i579[29]
  var i581 = i579[30]
  var i580 = []
  for(var i = 0; i < i581.length; i += 1) {
    i580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i581[i + 0]) );
  }
  i578.lightmaps = i580
  i578.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i579[31], i578.lightProbes)
  i578.lightmapsMode = i579[32]
  i578.mixedBakeMode = i579[33]
  i578.environmentLightingMode = i579[34]
  i578.ambientProbe = new pc.SphericalHarmonicsL2(i579[35])
  request.r(i579[36], i579[37], 0, i578, 'customReflection')
  request.r(i579[38], i579[39], 0, i578, 'defaultReflection')
  i578.defaultReflectionMode = i579[40]
  i578.defaultReflectionResolution = i579[41]
  i578.sunLightObjectId = i579[42]
  i578.pixelLightCount = i579[43]
  i578.defaultReflectionHDR = !!i579[44]
  i578.hasLightDataAsset = !!i579[45]
  i578.hasManualGenerate = !!i579[46]
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i585 = data
  request.r(i585[0], i585[1], 0, i584, 'lightmapColor')
  request.r(i585[2], i585[3], 0, i584, 'lightmapDirection')
  request.r(i585[4], i585[5], 0, i584, 'shadowMask')
  return i584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i586 = root || new UnityEngine.LightProbes()
  var i587 = data
  return i586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i595 = data
  var i597 = i595[0]
  var i596 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i597.length; i += 1) {
    i596.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i597[i + 0]));
  }
  i594.ShaderCompilationErrors = i596
  i594.name = i595[1]
  i594.guid = i595[2]
  var i599 = i595[3]
  var i598 = []
  for(var i = 0; i < i599.length; i += 1) {
    i598.push( i599[i + 0] );
  }
  i594.shaderDefinedKeywords = i598
  var i601 = i595[4]
  var i600 = []
  for(var i = 0; i < i601.length; i += 1) {
    i600.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i601[i + 0]) );
  }
  i594.passes = i600
  var i603 = i595[5]
  var i602 = []
  for(var i = 0; i < i603.length; i += 1) {
    i602.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i603[i + 0]) );
  }
  i594.usePasses = i602
  var i605 = i595[6]
  var i604 = []
  for(var i = 0; i < i605.length; i += 1) {
    i604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i605[i + 0]) );
  }
  i594.defaultParameterValues = i604
  request.r(i595[7], i595[8], 0, i594, 'unityFallbackShader')
  i594.readDepth = !!i595[9]
  i594.hasDepthOnlyPass = !!i595[10]
  i594.isCreatedByShaderGraph = !!i595[11]
  i594.disableBatching = !!i595[12]
  i594.compiled = !!i595[13]
  return i594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i609 = data
  i608.shaderName = i609[0]
  i608.errorMessage = i609[1]
  return i608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i614 = root || new pc.UnityShaderPass()
  var i615 = data
  i614.id = i615[0]
  i614.subShaderIndex = i615[1]
  i614.name = i615[2]
  i614.passType = i615[3]
  i614.grabPassTextureName = i615[4]
  i614.usePass = !!i615[5]
  i614.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[6], i614.zTest)
  i614.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[7], i614.zWrite)
  i614.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[8], i614.culling)
  i614.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i615[9], i614.blending)
  i614.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i615[10], i614.alphaBlending)
  i614.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[11], i614.colorWriteMask)
  i614.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[12], i614.offsetUnits)
  i614.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[13], i614.offsetFactor)
  i614.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[14], i614.stencilRef)
  i614.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[15], i614.stencilReadMask)
  i614.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i615[16], i614.stencilWriteMask)
  i614.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i615[17], i614.stencilOp)
  i614.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i615[18], i614.stencilOpFront)
  i614.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i615[19], i614.stencilOpBack)
  var i617 = i615[20]
  var i616 = []
  for(var i = 0; i < i617.length; i += 1) {
    i616.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i617[i + 0]) );
  }
  i614.tags = i616
  var i619 = i615[21]
  var i618 = []
  for(var i = 0; i < i619.length; i += 1) {
    i618.push( i619[i + 0] );
  }
  i614.passDefinedKeywords = i618
  var i621 = i615[22]
  var i620 = []
  for(var i = 0; i < i621.length; i += 1) {
    i620.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i621[i + 0]) );
  }
  i614.passDefinedKeywordGroups = i620
  var i623 = i615[23]
  var i622 = []
  for(var i = 0; i < i623.length; i += 1) {
    i622.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i623[i + 0]) );
  }
  i614.variants = i622
  var i625 = i615[24]
  var i624 = []
  for(var i = 0; i < i625.length; i += 1) {
    i624.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i625[i + 0]) );
  }
  i614.excludedVariants = i624
  i614.hasDepthReader = !!i615[25]
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i627 = data
  i626.val = i627[0]
  i626.name = i627[1]
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i629 = data
  i628.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i629[0], i628.src)
  i628.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i629[1], i628.dst)
  i628.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i629[2], i628.op)
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i631 = data
  i630.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i631[0], i630.pass)
  i630.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i631[1], i630.fail)
  i630.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i631[2], i630.zFail)
  i630.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i631[3], i630.comp)
  return i630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i634 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i635 = data
  i634.name = i635[0]
  i634.value = i635[1]
  return i634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i639 = data
  var i641 = i639[0]
  var i640 = []
  for(var i = 0; i < i641.length; i += 1) {
    i640.push( i641[i + 0] );
  }
  i638.keywords = i640
  i638.hasDiscard = !!i639[1]
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i645 = data
  i644.passId = i645[0]
  i644.subShaderIndex = i645[1]
  var i647 = i645[2]
  var i646 = []
  for(var i = 0; i < i647.length; i += 1) {
    i646.push( i647[i + 0] );
  }
  i644.keywords = i646
  i644.vertexProgram = i645[3]
  i644.fragmentProgram = i645[4]
  i644.exportedForWebGl2 = !!i645[5]
  i644.readDepth = !!i645[6]
  return i644
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i650 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i651 = data
  request.r(i651[0], i651[1], 0, i650, 'shader')
  i650.pass = i651[2]
  return i650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i655 = data
  i654.name = i655[0]
  i654.type = i655[1]
  i654.value = new pc.Vec4( i655[2], i655[3], i655[4], i655[5] )
  i654.textureValue = i655[6]
  i654.shaderPropertyFlag = i655[7]
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i656 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i657 = data
  i656.name = i657[0]
  request.r(i657[1], i657[2], 0, i656, 'texture')
  i656.aabb = i657[3]
  i656.vertices = i657[4]
  i656.triangles = i657[5]
  i656.textureRect = UnityEngine.Rect.MinMaxRect(i657[6], i657[7], i657[8], i657[9])
  i656.packedRect = UnityEngine.Rect.MinMaxRect(i657[10], i657[11], i657[12], i657[13])
  i656.border = new pc.Vec4( i657[14], i657[15], i657[16], i657[17] )
  i656.transparency = i657[18]
  i656.bounds = i657[19]
  i656.pixelsPerUnit = i657[20]
  i656.textureWidth = i657[21]
  i656.textureHeight = i657[22]
  i656.nativeSize = new pc.Vec2( i657[23], i657[24] )
  i656.pivot = new pc.Vec2( i657[25], i657[26] )
  i656.textureRectOffset = new pc.Vec2( i657[27], i657[28] )
  return i656
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i659 = data
  i658.name = i659[0]
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i661 = data
  i660.name = i661[0]
  i660.ascent = i661[1]
  i660.originalLineHeight = i661[2]
  i660.fontSize = i661[3]
  var i663 = i661[4]
  var i662 = []
  for(var i = 0; i < i663.length; i += 1) {
    i662.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i663[i + 0]) );
  }
  i660.characterInfo = i662
  request.r(i661[5], i661[6], 0, i660, 'texture')
  i660.originalFontSize = i661[7]
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i667 = data
  i666.index = i667[0]
  i666.advance = i667[1]
  i666.bearing = i667[2]
  i666.glyphWidth = i667[3]
  i666.glyphHeight = i667[4]
  i666.minX = i667[5]
  i666.maxX = i667[6]
  i666.minY = i667[7]
  i666.maxY = i667[8]
  i666.uvBottomLeftX = i667[9]
  i666.uvBottomLeftY = i667[10]
  i666.uvBottomRightX = i667[11]
  i666.uvBottomRightY = i667[12]
  i666.uvTopLeftX = i667[13]
  i666.uvTopLeftY = i667[14]
  i666.uvTopRightX = i667[15]
  i666.uvTopRightY = i667[16]
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i669 = data
  i668.name = i669[0]
  i668.bytes64 = i669[1]
  i668.data = i669[2]
  return i668
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i670 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i671 = data
  i670.normalStyle = i671[0]
  i670.normalSpacingOffset = i671[1]
  i670.boldStyle = i671[2]
  i670.boldSpacing = i671[3]
  i670.italicStyle = i671[4]
  i670.tabSize = i671[5]
  request.r(i671[6], i671[7], 0, i670, 'atlas')
  i670.m_SourceFontFileGUID = i671[8]
  i670.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i671[9], i670.m_CreationSettings)
  request.r(i671[10], i671[11], 0, i670, 'm_SourceFontFile')
  i670.m_SourceFontFilePath = i671[12]
  i670.m_AtlasPopulationMode = i671[13]
  i670.InternalDynamicOS = !!i671[14]
  var i673 = i671[15]
  var i672 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i673.length; i += 1) {
    i672.add(request.d('UnityEngine.TextCore.Glyph', i673[i + 0]));
  }
  i670.m_GlyphTable = i672
  var i675 = i671[16]
  var i674 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i675.length; i += 1) {
    i674.add(request.d('TMPro.TMP_Character', i675[i + 0]));
  }
  i670.m_CharacterTable = i674
  var i677 = i671[17]
  var i676 = []
  for(var i = 0; i < i677.length; i += 2) {
  request.r(i677[i + 0], i677[i + 1], 2, i676, '')
  }
  i670.m_AtlasTextures = i676
  i670.m_AtlasTextureIndex = i671[18]
  i670.m_IsMultiAtlasTexturesEnabled = !!i671[19]
  i670.m_GetFontFeatures = !!i671[20]
  i670.m_ClearDynamicDataOnBuild = !!i671[21]
  i670.m_AtlasWidth = i671[22]
  i670.m_AtlasHeight = i671[23]
  i670.m_AtlasPadding = i671[24]
  i670.m_AtlasRenderMode = i671[25]
  var i679 = i671[26]
  var i678 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i679.length; i += 1) {
    i678.add(request.d('UnityEngine.TextCore.GlyphRect', i679[i + 0]));
  }
  i670.m_UsedGlyphRects = i678
  var i681 = i671[27]
  var i680 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i681.length; i += 1) {
    i680.add(request.d('UnityEngine.TextCore.GlyphRect', i681[i + 0]));
  }
  i670.m_FreeGlyphRects = i680
  i670.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i671[28], i670.m_FontFeatureTable)
  i670.m_ShouldReimportFontFeatures = !!i671[29]
  var i683 = i671[30]
  var i682 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i683.length; i += 2) {
  request.r(i683[i + 0], i683[i + 1], 1, i682, '')
  }
  i670.m_FallbackFontAssetTable = i682
  var i685 = i671[31]
  var i684 = []
  for(var i = 0; i < i685.length; i += 1) {
    i684.push( request.d('TMPro.TMP_FontWeightPair', i685[i + 0]) );
  }
  i670.m_FontWeightTable = i684
  var i687 = i671[32]
  var i686 = []
  for(var i = 0; i < i687.length; i += 1) {
    i686.push( request.d('TMPro.TMP_FontWeightPair', i687[i + 0]) );
  }
  i670.fontWeights = i686
  i670.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i671[33], i670.m_fontInfo)
  var i689 = i671[34]
  var i688 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i689.length; i += 1) {
    i688.add(request.d('TMPro.TMP_Glyph', i689[i + 0]));
  }
  i670.m_glyphInfoList = i688
  i670.m_KerningTable = request.d('TMPro.KerningTable', i671[35], i670.m_KerningTable)
  var i691 = i671[36]
  var i690 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i691.length; i += 2) {
  request.r(i691[i + 0], i691[i + 1], 1, i690, '')
  }
  i670.fallbackFontAssets = i690
  i670.m_Version = i671[37]
  i670.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i671[38], i670.m_FaceInfo)
  request.r(i671[39], i671[40], 0, i670, 'm_Material')
  return i670
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i692 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i693 = data
  i692.sourceFontFileName = i693[0]
  i692.sourceFontFileGUID = i693[1]
  i692.faceIndex = i693[2]
  i692.pointSizeSamplingMode = i693[3]
  i692.pointSize = i693[4]
  i692.padding = i693[5]
  i692.paddingMode = i693[6]
  i692.packingMode = i693[7]
  i692.atlasWidth = i693[8]
  i692.atlasHeight = i693[9]
  i692.characterSetSelectionMode = i693[10]
  i692.characterSequence = i693[11]
  i692.referencedFontAssetGUID = i693[12]
  i692.referencedTextAssetGUID = i693[13]
  i692.fontStyle = i693[14]
  i692.fontStyleModifier = i693[15]
  i692.renderMode = i693[16]
  i692.includeFontFeatures = !!i693[17]
  return i692
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i696 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i697 = data
  i696.m_Index = i697[0]
  i696.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i697[1], i696.m_Metrics)
  i696.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i697[2], i696.m_GlyphRect)
  i696.m_Scale = i697[3]
  i696.m_AtlasIndex = i697[4]
  i696.m_ClassDefinitionType = i697[5]
  return i696
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i698 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i699 = data
  i698.m_Width = i699[0]
  i698.m_Height = i699[1]
  i698.m_HorizontalBearingX = i699[2]
  i698.m_HorizontalBearingY = i699[3]
  i698.m_HorizontalAdvance = i699[4]
  return i698
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i700 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i701 = data
  i700.m_X = i701[0]
  i700.m_Y = i701[1]
  i700.m_Width = i701[2]
  i700.m_Height = i701[3]
  return i700
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i704 = root || request.c( 'TMPro.TMP_Character' )
  var i705 = data
  i704.m_ElementType = i705[0]
  i704.m_Unicode = i705[1]
  i704.m_GlyphIndex = i705[2]
  i704.m_Scale = i705[3]
  return i704
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i710 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i711 = data
  var i713 = i711[0]
  var i712 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i713.length; i += 1) {
    i712.add(request.d('TMPro.MultipleSubstitutionRecord', i713[i + 0]));
  }
  i710.m_MultipleSubstitutionRecords = i712
  var i715 = i711[1]
  var i714 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i715.length; i += 1) {
    i714.add(request.d('TMPro.LigatureSubstitutionRecord', i715[i + 0]));
  }
  i710.m_LigatureSubstitutionRecords = i714
  var i717 = i711[2]
  var i716 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i717.length; i += 1) {
    i716.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i717[i + 0]));
  }
  i710.m_GlyphPairAdjustmentRecords = i716
  var i719 = i711[3]
  var i718 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i719.length; i += 1) {
    i718.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i719[i + 0]));
  }
  i710.m_MarkToBaseAdjustmentRecords = i718
  var i721 = i711[4]
  var i720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i721.length; i += 1) {
    i720.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i721[i + 0]));
  }
  i710.m_MarkToMarkAdjustmentRecords = i720
  return i710
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i724 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i725 = data
  i724.m_TargetGlyphID = i725[0]
  i724.m_SubstituteGlyphIDs = i725[1]
  return i724
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i728 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i729 = data
  i728.m_ComponentGlyphIDs = i729[0]
  i728.m_LigatureGlyphID = i729[1]
  return i728
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i732 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i733 = data
  i732.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i733[0], i732.m_FirstAdjustmentRecord)
  i732.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i733[1], i732.m_SecondAdjustmentRecord)
  i732.m_FeatureLookupFlags = i733[2]
  return i732
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i736 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i737 = data
  i736.m_BaseGlyphID = i737[0]
  i736.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i737[1], i736.m_BaseGlyphAnchorPoint)
  i736.m_MarkGlyphID = i737[2]
  i736.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i737[3], i736.m_MarkPositionAdjustment)
  return i736
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i740 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i741 = data
  i740.m_BaseMarkGlyphID = i741[0]
  i740.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i741[1], i740.m_BaseMarkGlyphAnchorPoint)
  i740.m_CombiningMarkGlyphID = i741[2]
  i740.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i741[3], i740.m_CombiningMarkPositionAdjustment)
  return i740
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i746 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i747 = data
  request.r(i747[0], i747[1], 0, i746, 'regularTypeface')
  request.r(i747[2], i747[3], 0, i746, 'italicTypeface')
  return i746
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i748 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i749 = data
  i748.Name = i749[0]
  i748.PointSize = i749[1]
  i748.Scale = i749[2]
  i748.CharacterCount = i749[3]
  i748.LineHeight = i749[4]
  i748.Baseline = i749[5]
  i748.Ascender = i749[6]
  i748.CapHeight = i749[7]
  i748.Descender = i749[8]
  i748.CenterLine = i749[9]
  i748.SuperscriptOffset = i749[10]
  i748.SubscriptOffset = i749[11]
  i748.SubSize = i749[12]
  i748.Underline = i749[13]
  i748.UnderlineThickness = i749[14]
  i748.strikethrough = i749[15]
  i748.strikethroughThickness = i749[16]
  i748.TabWidth = i749[17]
  i748.Padding = i749[18]
  i748.AtlasWidth = i749[19]
  i748.AtlasHeight = i749[20]
  return i748
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i752 = root || request.c( 'TMPro.TMP_Glyph' )
  var i753 = data
  i752.id = i753[0]
  i752.x = i753[1]
  i752.y = i753[2]
  i752.width = i753[3]
  i752.height = i753[4]
  i752.xOffset = i753[5]
  i752.yOffset = i753[6]
  i752.xAdvance = i753[7]
  i752.scale = i753[8]
  return i752
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i754 = root || request.c( 'TMPro.KerningTable' )
  var i755 = data
  var i757 = i755[0]
  var i756 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i757.length; i += 1) {
    i756.add(request.d('TMPro.KerningPair', i757[i + 0]));
  }
  i754.kerningPairs = i756
  return i754
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i760 = root || request.c( 'TMPro.KerningPair' )
  var i761 = data
  i760.xOffset = i761[0]
  i760.m_FirstGlyph = i761[1]
  i760.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i761[2], i760.m_FirstGlyphAdjustments)
  i760.m_SecondGlyph = i761[3]
  i760.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i761[4], i760.m_SecondGlyphAdjustments)
  i760.m_IgnoreSpacingAdjustments = !!i761[5]
  return i760
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i762 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i763 = data
  i762.m_FaceIndex = i763[0]
  i762.m_FamilyName = i763[1]
  i762.m_StyleName = i763[2]
  i762.m_PointSize = i763[3]
  i762.m_Scale = i763[4]
  i762.m_UnitsPerEM = i763[5]
  i762.m_LineHeight = i763[6]
  i762.m_AscentLine = i763[7]
  i762.m_CapLine = i763[8]
  i762.m_MeanLine = i763[9]
  i762.m_Baseline = i763[10]
  i762.m_DescentLine = i763[11]
  i762.m_SuperscriptOffset = i763[12]
  i762.m_SuperscriptSize = i763[13]
  i762.m_SubscriptOffset = i763[14]
  i762.m_SubscriptSize = i763[15]
  i762.m_UnderlineOffset = i763[16]
  i762.m_UnderlineThickness = i763[17]
  i762.m_StrikethroughOffset = i763[18]
  i762.m_StrikethroughThickness = i763[19]
  i762.m_TabWidth = i763[20]
  return i762
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i764 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i765 = data
  i764.useSafeMode = !!i765[0]
  i764.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i765[1], i764.safeModeOptions)
  i764.timeScale = i765[2]
  i764.unscaledTimeScale = i765[3]
  i764.useSmoothDeltaTime = !!i765[4]
  i764.maxSmoothUnscaledTime = i765[5]
  i764.rewindCallbackMode = i765[6]
  i764.showUnityEditorReport = !!i765[7]
  i764.logBehaviour = i765[8]
  i764.drawGizmos = !!i765[9]
  i764.defaultRecyclable = !!i765[10]
  i764.defaultAutoPlay = i765[11]
  i764.defaultUpdateType = i765[12]
  i764.defaultTimeScaleIndependent = !!i765[13]
  i764.defaultEaseType = i765[14]
  i764.defaultEaseOvershootOrAmplitude = i765[15]
  i764.defaultEasePeriod = i765[16]
  i764.defaultAutoKill = !!i765[17]
  i764.defaultLoopType = i765[18]
  i764.debugMode = !!i765[19]
  i764.debugStoreTargetId = !!i765[20]
  i764.showPreviewPanel = !!i765[21]
  i764.storeSettingsLocation = i765[22]
  i764.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i765[23], i764.modules)
  i764.createASMDEF = !!i765[24]
  i764.showPlayingTweens = !!i765[25]
  i764.showPausedTweens = !!i765[26]
  return i764
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i766 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i767 = data
  i766.logBehaviour = i767[0]
  i766.nestedTweenFailureBehaviour = i767[1]
  return i766
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i768 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i769 = data
  i768.showPanel = !!i769[0]
  i768.audioEnabled = !!i769[1]
  i768.physicsEnabled = !!i769[2]
  i768.physics2DEnabled = !!i769[3]
  i768.spriteEnabled = !!i769[4]
  i768.uiEnabled = !!i769[5]
  i768.textMeshProEnabled = !!i769[6]
  i768.tk2DEnabled = !!i769[7]
  i768.deAudioEnabled = !!i769[8]
  i768.deUnityExtendedEnabled = !!i769[9]
  i768.epoOutlineEnabled = !!i769[10]
  return i768
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i770 = root || request.c( 'TMPro.TMP_Settings' )
  var i771 = data
  i770.assetVersion = i771[0]
  i770.m_TextWrappingMode = i771[1]
  i770.m_enableKerning = !!i771[2]
  var i773 = i771[3]
  var i772 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i773.length; i += 1) {
    i772.add(i773[i + 0]);
  }
  i770.m_ActiveFontFeatures = i772
  i770.m_enableExtraPadding = !!i771[4]
  i770.m_enableTintAllSprites = !!i771[5]
  i770.m_enableParseEscapeCharacters = !!i771[6]
  i770.m_EnableRaycastTarget = !!i771[7]
  i770.m_GetFontFeaturesAtRuntime = !!i771[8]
  i770.m_missingGlyphCharacter = i771[9]
  i770.m_ClearDynamicDataOnBuild = !!i771[10]
  i770.m_warningsDisabled = !!i771[11]
  request.r(i771[12], i771[13], 0, i770, 'm_defaultFontAsset')
  i770.m_defaultFontAssetPath = i771[14]
  i770.m_defaultFontSize = i771[15]
  i770.m_defaultAutoSizeMinRatio = i771[16]
  i770.m_defaultAutoSizeMaxRatio = i771[17]
  i770.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i771[18], i771[19] )
  i770.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i771[20], i771[21] )
  i770.m_autoSizeTextContainer = !!i771[22]
  i770.m_IsTextObjectScaleStatic = !!i771[23]
  var i775 = i771[24]
  var i774 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i775.length; i += 2) {
  request.r(i775[i + 0], i775[i + 1], 1, i774, '')
  }
  i770.m_fallbackFontAssets = i774
  i770.m_matchMaterialPreset = !!i771[25]
  i770.m_HideSubTextObjects = !!i771[26]
  request.r(i771[27], i771[28], 0, i770, 'm_defaultSpriteAsset')
  i770.m_defaultSpriteAssetPath = i771[29]
  i770.m_enableEmojiSupport = !!i771[30]
  i770.m_MissingCharacterSpriteUnicode = i771[31]
  var i777 = i771[32]
  var i776 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i777.length; i += 2) {
  request.r(i777[i + 0], i777[i + 1], 1, i776, '')
  }
  i770.m_EmojiFallbackTextAssets = i776
  i770.m_defaultColorGradientPresetsPath = i771[33]
  request.r(i771[34], i771[35], 0, i770, 'm_defaultStyleSheet')
  i770.m_StyleSheetsResourcePath = i771[36]
  request.r(i771[37], i771[38], 0, i770, 'm_leadingCharacters')
  request.r(i771[39], i771[40], 0, i770, 'm_followingCharacters')
  i770.m_UseModernHangulLineBreakingRules = !!i771[41]
  return i770
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i780 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i781 = data
  request.r(i781[0], i781[1], 0, i780, 'spriteSheet')
  var i783 = i781[2]
  var i782 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i783.length; i += 1) {
    i782.add(request.d('TMPro.TMP_Sprite', i783[i + 0]));
  }
  i780.spriteInfoList = i782
  var i785 = i781[3]
  var i784 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i785.length; i += 2) {
  request.r(i785[i + 0], i785[i + 1], 1, i784, '')
  }
  i780.fallbackSpriteAssets = i784
  var i787 = i781[4]
  var i786 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i787.length; i += 1) {
    i786.add(request.d('TMPro.TMP_SpriteCharacter', i787[i + 0]));
  }
  i780.m_SpriteCharacterTable = i786
  var i789 = i781[5]
  var i788 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i789.length; i += 1) {
    i788.add(request.d('TMPro.TMP_SpriteGlyph', i789[i + 0]));
  }
  i780.m_GlyphTable = i788
  i780.m_Version = i781[6]
  i780.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i781[7], i780.m_FaceInfo)
  request.r(i781[8], i781[9], 0, i780, 'm_Material')
  return i780
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i792 = root || request.c( 'TMPro.TMP_Sprite' )
  var i793 = data
  i792.name = i793[0]
  i792.hashCode = i793[1]
  i792.unicode = i793[2]
  i792.pivot = new pc.Vec2( i793[3], i793[4] )
  request.r(i793[5], i793[6], 0, i792, 'sprite')
  i792.id = i793[7]
  i792.x = i793[8]
  i792.y = i793[9]
  i792.width = i793[10]
  i792.height = i793[11]
  i792.xOffset = i793[12]
  i792.yOffset = i793[13]
  i792.xAdvance = i793[14]
  i792.scale = i793[15]
  return i792
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i798 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i799 = data
  i798.m_Name = i799[0]
  i798.m_ElementType = i799[1]
  i798.m_Unicode = i799[2]
  i798.m_GlyphIndex = i799[3]
  i798.m_Scale = i799[4]
  return i798
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i802 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i803 = data
  request.r(i803[0], i803[1], 0, i802, 'sprite')
  i802.m_Index = i803[2]
  i802.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i803[3], i802.m_Metrics)
  i802.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i803[4], i802.m_GlyphRect)
  i802.m_Scale = i803[5]
  i802.m_AtlasIndex = i803[6]
  i802.m_ClassDefinitionType = i803[7]
  return i802
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i804 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i805 = data
  var i807 = i805[0]
  var i806 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i807.length; i += 1) {
    i806.add(request.d('TMPro.TMP_Style', i807[i + 0]));
  }
  i804.m_StyleList = i806
  return i804
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i810 = root || request.c( 'TMPro.TMP_Style' )
  var i811 = data
  i810.m_Name = i811[0]
  i810.m_HashCode = i811[1]
  i810.m_OpeningDefinition = i811[2]
  i810.m_ClosingDefinition = i811[3]
  i810.m_OpeningTagArray = i811[4]
  i810.m_ClosingTagArray = i811[5]
  return i810
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i813 = data
  var i815 = i813[0]
  var i814 = []
  for(var i = 0; i < i815.length; i += 1) {
    i814.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i815[i + 0]) );
  }
  i812.files = i814
  i812.componentToPrefabIds = i813[1]
  return i812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i819 = data
  i818.path = i819[0]
  request.r(i819[1], i819[2], 0, i818, 'unityObject')
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i820 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i821 = data
  var i823 = i821[0]
  var i822 = []
  for(var i = 0; i < i823.length; i += 1) {
    i822.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i823[i + 0]) );
  }
  i820.scriptsExecutionOrder = i822
  var i825 = i821[1]
  var i824 = []
  for(var i = 0; i < i825.length; i += 1) {
    i824.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i825[i + 0]) );
  }
  i820.sortingLayers = i824
  var i827 = i821[2]
  var i826 = []
  for(var i = 0; i < i827.length; i += 1) {
    i826.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i827[i + 0]) );
  }
  i820.cullingLayers = i826
  i820.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i821[3], i820.timeSettings)
  i820.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i821[4], i820.physicsSettings)
  i820.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i821[5], i820.physics2DSettings)
  i820.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i821[6], i820.qualitySettings)
  i820.enableRealtimeShadows = !!i821[7]
  i820.enableAutoInstancing = !!i821[8]
  i820.enableStaticBatching = !!i821[9]
  i820.enableDynamicBatching = !!i821[10]
  i820.usePreservativeDynamicBatching = !!i821[11]
  i820.lightmapEncodingQuality = i821[12]
  i820.desiredColorSpace = i821[13]
  var i829 = i821[14]
  var i828 = []
  for(var i = 0; i < i829.length; i += 1) {
    i828.push( i829[i + 0] );
  }
  i820.allTags = i828
  return i820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i832 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i833 = data
  i832.name = i833[0]
  i832.value = i833[1]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i837 = data
  i836.id = i837[0]
  i836.name = i837[1]
  i836.value = i837[2]
  return i836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i841 = data
  i840.id = i841[0]
  i840.name = i841[1]
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i843 = data
  i842.fixedDeltaTime = i843[0]
  i842.maximumDeltaTime = i843[1]
  i842.timeScale = i843[2]
  i842.maximumParticleTimestep = i843[3]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i845 = data
  i844.gravity = new pc.Vec3( i845[0], i845[1], i845[2] )
  i844.defaultSolverIterations = i845[3]
  i844.bounceThreshold = i845[4]
  i844.autoSyncTransforms = !!i845[5]
  i844.autoSimulation = !!i845[6]
  var i847 = i845[7]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i847[i + 0]) );
  }
  i844.collisionMatrix = i846
  return i844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i851 = data
  i850.enabled = !!i851[0]
  i850.layerId = i851[1]
  i850.otherLayerId = i851[2]
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i852 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i853 = data
  request.r(i853[0], i853[1], 0, i852, 'material')
  i852.gravity = new pc.Vec2( i853[2], i853[3] )
  i852.positionIterations = i853[4]
  i852.velocityIterations = i853[5]
  i852.velocityThreshold = i853[6]
  i852.maxLinearCorrection = i853[7]
  i852.maxAngularCorrection = i853[8]
  i852.maxTranslationSpeed = i853[9]
  i852.maxRotationSpeed = i853[10]
  i852.baumgarteScale = i853[11]
  i852.baumgarteTOIScale = i853[12]
  i852.timeToSleep = i853[13]
  i852.linearSleepTolerance = i853[14]
  i852.angularSleepTolerance = i853[15]
  i852.defaultContactOffset = i853[16]
  i852.autoSimulation = !!i853[17]
  i852.queriesHitTriggers = !!i853[18]
  i852.queriesStartInColliders = !!i853[19]
  i852.callbacksOnDisable = !!i853[20]
  i852.reuseCollisionCallbacks = !!i853[21]
  i852.autoSyncTransforms = !!i853[22]
  var i855 = i853[23]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i855[i + 0]) );
  }
  i852.collisionMatrix = i854
  return i852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i859 = data
  i858.enabled = !!i859[0]
  i858.layerId = i859[1]
  i858.otherLayerId = i859[2]
  return i858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i861 = data
  var i863 = i861[0]
  var i862 = []
  for(var i = 0; i < i863.length; i += 1) {
    i862.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i863[i + 0]) );
  }
  i860.qualityLevels = i862
  var i865 = i861[1]
  var i864 = []
  for(var i = 0; i < i865.length; i += 1) {
    i864.push( i865[i + 0] );
  }
  i860.names = i864
  i860.shadows = i861[2]
  i860.anisotropicFiltering = i861[3]
  i860.antiAliasing = i861[4]
  i860.lodBias = i861[5]
  i860.shadowCascades = i861[6]
  i860.shadowDistance = i861[7]
  i860.shadowmaskMode = i861[8]
  i860.shadowProjection = i861[9]
  i860.shadowResolution = i861[10]
  i860.softParticles = !!i861[11]
  i860.softVegetation = !!i861[12]
  i860.activeColorSpace = i861[13]
  i860.desiredColorSpace = i861[14]
  i860.masterTextureLimit = i861[15]
  i860.maxQueuedFrames = i861[16]
  i860.particleRaycastBudget = i861[17]
  i860.pixelLightCount = i861[18]
  i860.realtimeReflectionProbes = !!i861[19]
  i860.shadowCascade2Split = i861[20]
  i860.shadowCascade4Split = new pc.Vec3( i861[21], i861[22], i861[23] )
  i860.streamingMipmapsActive = !!i861[24]
  i860.vSyncCount = i861[25]
  i860.asyncUploadBufferSize = i861[26]
  i860.asyncUploadTimeSlice = i861[27]
  i860.billboardsFaceCameraPosition = !!i861[28]
  i860.shadowNearPlaneOffset = i861[29]
  i860.streamingMipmapsMemoryBudget = i861[30]
  i860.maximumLODLevel = i861[31]
  i860.streamingMipmapsAddAllCameras = !!i861[32]
  i860.streamingMipmapsMaxLevelReduction = i861[33]
  i860.streamingMipmapsRenderersPerFrame = i861[34]
  i860.resolutionScalingFixedDPIFactor = i861[35]
  i860.streamingMipmapsMaxFileIORequests = i861[36]
  i860.currentQualityLevel = i861[37]
  return i860
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i868 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i869 = data
  request.r(i869[0], i869[1], 0, i868, 'm_ObjectArgument')
  i868.m_ObjectArgumentAssemblyTypeName = i869[2]
  i868.m_IntArgument = i869[3]
  i868.m_FloatArgument = i869[4]
  i868.m_StringArgument = i869[5]
  i868.m_BoolArgument = !!i869[6]
  return i868
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i870 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i871 = data
  i870.m_GlyphIndex = i871[0]
  i870.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i871[1], i870.m_GlyphValueRecord)
  return i870
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i872 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i873 = data
  i872.m_XCoordinate = i873[0]
  i872.m_YCoordinate = i873[1]
  return i872
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i874 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i875 = data
  i874.m_XPositionAdjustment = i875[0]
  i874.m_YPositionAdjustment = i875[1]
  return i874
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i876 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i877 = data
  i876.xPlacement = i877[0]
  i876.yPlacement = i877[1]
  i876.xAdvance = i877[2]
  i876.yAdvance = i877[3]
  return i876
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i879 = data
  i878.m_XPlacement = i879[0]
  i878.m_YPlacement = i879[1]
  i878.m_XAdvance = i879[2]
  i878.m_YAdvance = i879[3]
  return i878
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[40],"41":[2],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[2],"64":[65],"66":[67],"68":[67],"8":[7],"69":[70],"71":[2],"72":[73],"74":[7],"75":[11,7],"76":[65],"77":[11,7],"78":[7],"79":[7],"80":[65,7],"14":[7,11],"81":[82],"83":[82],"84":[82],"85":[7],"86":[7],"10":[8],"12":[11,7],"87":[7],"9":[8],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"95":[7],"96":[7],"13":[11,7],"97":[7],"98":[7],"99":[7],"100":[7],"22":[11,7],"101":[7],"102":[5],"103":[5],"6":[5],"104":[5],"105":[2],"106":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.UI.RawImage","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Button","UnityEngine.Sprite","TutController","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.AudioSource","LunaController","UnityEngine.AudioClip","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "BP_V26";

Deserializers.lunaInitializationTime = "07/20/2026 03:08:55";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "HCDR_V01_NgocBTU_TamNTM";

Deserializers.lunaAppID = "41116";

Deserializers.projectId = "cf5fc950f05ab5e4dbc1af58c0178185";

Deserializers.packagesInfo = "com.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1774";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4119";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.BP_V26";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "46400348-aaab-406f-8bbc-02d19c94fdbe";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

