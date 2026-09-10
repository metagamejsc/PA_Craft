var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i422 = root || request.c( 'UnityEngine.JointSpring' )
  var i423 = data
  i422.spring = i423[0]
  i422.damper = i423[1]
  i422.targetPosition = i423[2]
  return i422
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i424 = root || request.c( 'UnityEngine.JointMotor' )
  var i425 = data
  i424.m_TargetVelocity = i425[0]
  i424.m_Force = i425[1]
  i424.m_FreeSpin = i425[2]
  return i424
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i426 = root || request.c( 'UnityEngine.JointLimits' )
  var i427 = data
  i426.m_Min = i427[0]
  i426.m_Max = i427[1]
  i426.m_Bounciness = i427[2]
  i426.m_BounceMinVelocity = i427[3]
  i426.m_ContactDistance = i427[4]
  i426.minBounce = i427[5]
  i426.maxBounce = i427[6]
  return i426
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i428 = root || request.c( 'UnityEngine.JointDrive' )
  var i429 = data
  i428.m_PositionSpring = i429[0]
  i428.m_PositionDamper = i429[1]
  i428.m_MaximumForce = i429[2]
  i428.m_UseAcceleration = i429[3]
  return i428
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i430 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i431 = data
  i430.m_Spring = i431[0]
  i430.m_Damper = i431[1]
  return i430
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i432 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i433 = data
  i432.m_Limit = i433[0]
  i432.m_Bounciness = i433[1]
  i432.m_ContactDistance = i433[2]
  return i432
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i434 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i435 = data
  i434.m_ExtremumSlip = i435[0]
  i434.m_ExtremumValue = i435[1]
  i434.m_AsymptoteSlip = i435[2]
  i434.m_AsymptoteValue = i435[3]
  i434.m_Stiffness = i435[4]
  return i434
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i436 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i437 = data
  i436.m_LowerAngle = i437[0]
  i436.m_UpperAngle = i437[1]
  return i436
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i438 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i439 = data
  i438.m_MotorSpeed = i439[0]
  i438.m_MaximumMotorTorque = i439[1]
  return i438
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i440 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i441 = data
  i440.m_DampingRatio = i441[0]
  i440.m_Frequency = i441[1]
  i440.m_Angle = i441[2]
  return i440
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i442 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i443 = data
  i442.m_LowerTranslation = i443[0]
  i442.m_UpperTranslation = i443[1]
  return i442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i444 = root || new pc.UnityMaterial()
  var i445 = data
  i444.name = i445[0]
  request.r(i445[1], i445[2], 0, i444, 'shader')
  i444.renderQueue = i445[3]
  i444.enableInstancing = !!i445[4]
  var i447 = i445[5]
  var i446 = []
  for(var i = 0; i < i447.length; i += 1) {
    i446.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i447[i + 0]) );
  }
  i444.floatParameters = i446
  var i449 = i445[6]
  var i448 = []
  for(var i = 0; i < i449.length; i += 1) {
    i448.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i449[i + 0]) );
  }
  i444.colorParameters = i448
  var i451 = i445[7]
  var i450 = []
  for(var i = 0; i < i451.length; i += 1) {
    i450.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i451[i + 0]) );
  }
  i444.vectorParameters = i450
  var i453 = i445[8]
  var i452 = []
  for(var i = 0; i < i453.length; i += 1) {
    i452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i453[i + 0]) );
  }
  i444.textureParameters = i452
  var i455 = i445[9]
  var i454 = []
  for(var i = 0; i < i455.length; i += 1) {
    i454.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i455[i + 0]) );
  }
  i444.materialFlags = i454
  return i444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i459 = data
  i458.name = i459[0]
  i458.value = i459[1]
  return i458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i463 = data
  i462.name = i463[0]
  i462.value = new pc.Color(i463[1], i463[2], i463[3], i463[4])
  return i462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i467 = data
  i466.name = i467[0]
  i466.value = new pc.Vec4( i467[1], i467[2], i467[3], i467[4] )
  return i466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i471 = data
  i470.name = i471[0]
  request.r(i471[1], i471[2], 0, i470, 'value')
  return i470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i475 = data
  i474.name = i475[0]
  i474.enabled = !!i475[1]
  return i474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i477 = data
  i476.name = i477[0]
  i476.width = i477[1]
  i476.height = i477[2]
  i476.mipmapCount = i477[3]
  i476.anisoLevel = i477[4]
  i476.filterMode = i477[5]
  i476.hdr = !!i477[6]
  i476.format = i477[7]
  i476.wrapMode = i477[8]
  i476.alphaIsTransparency = !!i477[9]
  i476.alphaSource = i477[10]
  i476.graphicsFormat = i477[11]
  i476.sRGBTexture = !!i477[12]
  i476.desiredColorSpace = i477[13]
  i476.wrapU = i477[14]
  i476.wrapV = i477[15]
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i479 = data
  i478.name = i479[0]
  i478.index = i479[1]
  i478.startup = !!i479[2]
  return i478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i481 = data
  i480.aspect = i481[0]
  i480.orthographic = !!i481[1]
  i480.orthographicSize = i481[2]
  i480.backgroundColor = new pc.Color(i481[3], i481[4], i481[5], i481[6])
  i480.nearClipPlane = i481[7]
  i480.farClipPlane = i481[8]
  i480.fieldOfView = i481[9]
  i480.depth = i481[10]
  i480.clearFlags = i481[11]
  i480.cullingMask = i481[12]
  i480.rect = i481[13]
  request.r(i481[14], i481[15], 0, i480, 'targetTexture')
  i480.usePhysicalProperties = !!i481[16]
  i480.focalLength = i481[17]
  i480.sensorSize = new pc.Vec2( i481[18], i481[19] )
  i480.lensShift = new pc.Vec2( i481[20], i481[21] )
  i480.gateFit = i481[22]
  i480.commandBufferCount = i481[23]
  i480.cameraType = i481[24]
  i480.enabled = !!i481[25]
  return i480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i483 = data
  i482.name = i483[0]
  i482.tagId = i483[1]
  i482.enabled = !!i483[2]
  i482.isStatic = !!i483[3]
  i482.layer = i483[4]
  return i482
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i484 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i485 = data
  request.r(i485[0], i485[1], 0, i484, 'm_FirstSelected')
  i484.m_sendNavigationEvents = !!i485[2]
  i484.m_DragThreshold = i485[3]
  return i484
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i486 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i487 = data
  i486.m_HorizontalAxis = i487[0]
  i486.m_VerticalAxis = i487[1]
  i486.m_SubmitButton = i487[2]
  i486.m_CancelButton = i487[3]
  i486.m_InputActionsPerSecond = i487[4]
  i486.m_RepeatDelay = i487[5]
  i486.m_ForceModuleActive = !!i487[6]
  i486.m_SendPointerHoverToParent = !!i487[7]
  return i486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i489 = data
  i488.pivot = new pc.Vec2( i489[0], i489[1] )
  i488.anchorMin = new pc.Vec2( i489[2], i489[3] )
  i488.anchorMax = new pc.Vec2( i489[4], i489[5] )
  i488.sizeDelta = new pc.Vec2( i489[6], i489[7] )
  i488.anchoredPosition3D = new pc.Vec3( i489[8], i489[9], i489[10] )
  i488.rotation = new pc.Quat(i489[11], i489[12], i489[13], i489[14])
  i488.scale = new pc.Vec3( i489[15], i489[16], i489[17] )
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i491 = data
  i490.planeDistance = i491[0]
  i490.referencePixelsPerUnit = i491[1]
  i490.isFallbackOverlay = !!i491[2]
  i490.renderMode = i491[3]
  i490.renderOrder = i491[4]
  i490.sortingLayerName = i491[5]
  i490.sortingOrder = i491[6]
  i490.scaleFactor = i491[7]
  request.r(i491[8], i491[9], 0, i490, 'worldCamera')
  i490.overrideSorting = !!i491[10]
  i490.pixelPerfect = !!i491[11]
  i490.targetDisplay = i491[12]
  i490.overridePixelPerfect = !!i491[13]
  i490.enabled = !!i491[14]
  return i490
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i492 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i493 = data
  i492.m_UiScaleMode = i493[0]
  i492.m_ReferencePixelsPerUnit = i493[1]
  i492.m_ScaleFactor = i493[2]
  i492.m_ReferenceResolution = new pc.Vec2( i493[3], i493[4] )
  i492.m_ScreenMatchMode = i493[5]
  i492.m_MatchWidthOrHeight = i493[6]
  i492.m_PhysicalUnit = i493[7]
  i492.m_FallbackScreenDPI = i493[8]
  i492.m_DefaultSpriteDPI = i493[9]
  i492.m_DynamicPixelsPerUnit = i493[10]
  i492.m_PresetInfoIsWorld = !!i493[11]
  return i492
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i494 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i495 = data
  i494.m_IgnoreReversedGraphics = !!i495[0]
  i494.m_BlockingObjects = i495[1]
  i494.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i495[2] )
  return i494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i497 = data
  i496.cullTransparentMesh = !!i497[0]
  return i496
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i498 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i499 = data
  i498.m_AspectMode = i499[0]
  i498.m_AspectRatio = i499[1]
  return i498
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i500 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i501 = data
  request.r(i501[0], i501[1], 0, i500, 'm_Texture')
  i500.m_UVRect = UnityEngine.Rect.MinMaxRect(i501[2], i501[3], i501[4], i501[5])
  request.r(i501[6], i501[7], 0, i500, 'm_Material')
  i500.m_Maskable = !!i501[8]
  i500.m_Color = new pc.Color(i501[9], i501[10], i501[11], i501[12])
  i500.m_RaycastTarget = !!i501[13]
  i500.m_RaycastPadding = new pc.Vec4( i501[14], i501[15], i501[16], i501[17] )
  return i500
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i502 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i503 = data
  i502.m_hasFontAssetChanged = !!i503[0]
  request.r(i503[1], i503[2], 0, i502, 'm_baseMaterial')
  i502.m_maskOffset = new pc.Vec4( i503[3], i503[4], i503[5], i503[6] )
  i502.m_text = i503[7]
  i502.m_isRightToLeft = !!i503[8]
  request.r(i503[9], i503[10], 0, i502, 'm_fontAsset')
  request.r(i503[11], i503[12], 0, i502, 'm_sharedMaterial')
  var i505 = i503[13]
  var i504 = []
  for(var i = 0; i < i505.length; i += 2) {
  request.r(i505[i + 0], i505[i + 1], 2, i504, '')
  }
  i502.m_fontSharedMaterials = i504
  request.r(i503[14], i503[15], 0, i502, 'm_fontMaterial')
  var i507 = i503[16]
  var i506 = []
  for(var i = 0; i < i507.length; i += 2) {
  request.r(i507[i + 0], i507[i + 1], 2, i506, '')
  }
  i502.m_fontMaterials = i506
  i502.m_fontColor32 = UnityEngine.Color32.ConstructColor(i503[17], i503[18], i503[19], i503[20])
  i502.m_fontColor = new pc.Color(i503[21], i503[22], i503[23], i503[24])
  i502.m_enableVertexGradient = !!i503[25]
  i502.m_colorMode = i503[26]
  i502.m_fontColorGradient = request.d('TMPro.VertexGradient', i503[27], i502.m_fontColorGradient)
  request.r(i503[28], i503[29], 0, i502, 'm_fontColorGradientPreset')
  request.r(i503[30], i503[31], 0, i502, 'm_spriteAsset')
  i502.m_tintAllSprites = !!i503[32]
  request.r(i503[33], i503[34], 0, i502, 'm_StyleSheet')
  i502.m_TextStyleHashCode = i503[35]
  i502.m_overrideHtmlColors = !!i503[36]
  i502.m_faceColor = UnityEngine.Color32.ConstructColor(i503[37], i503[38], i503[39], i503[40])
  i502.m_fontSize = i503[41]
  i502.m_fontSizeBase = i503[42]
  i502.m_fontWeight = i503[43]
  i502.m_enableAutoSizing = !!i503[44]
  i502.m_fontSizeMin = i503[45]
  i502.m_fontSizeMax = i503[46]
  i502.m_fontStyle = i503[47]
  i502.m_HorizontalAlignment = i503[48]
  i502.m_VerticalAlignment = i503[49]
  i502.m_textAlignment = i503[50]
  i502.m_characterSpacing = i503[51]
  i502.m_characterHorizontalScale = i503[52]
  i502.m_wordSpacing = i503[53]
  i502.m_lineSpacing = i503[54]
  i502.m_lineSpacingMax = i503[55]
  i502.m_paragraphSpacing = i503[56]
  i502.m_charWidthMaxAdj = i503[57]
  i502.m_TextWrappingMode = i503[58]
  i502.m_wordWrappingRatios = i503[59]
  i502.m_overflowMode = i503[60]
  request.r(i503[61], i503[62], 0, i502, 'm_linkedTextComponent')
  request.r(i503[63], i503[64], 0, i502, 'parentLinkedComponent')
  i502.m_enableKerning = !!i503[65]
  var i509 = i503[66]
  var i508 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i509.length; i += 1) {
    i508.add(i509[i + 0]);
  }
  i502.m_ActiveFontFeatures = i508
  i502.m_enableExtraPadding = !!i503[67]
  i502.checkPaddingRequired = !!i503[68]
  i502.m_isRichText = !!i503[69]
  i502.m_parseCtrlCharacters = !!i503[70]
  i502.m_isOrthographic = !!i503[71]
  i502.m_isCullingEnabled = !!i503[72]
  i502.m_horizontalMapping = i503[73]
  i502.m_verticalMapping = i503[74]
  i502.m_uvLineOffset = i503[75]
  i502.m_geometrySortingOrder = i503[76]
  i502.m_IsTextObjectScaleStatic = !!i503[77]
  i502.m_VertexBufferAutoSizeReduction = !!i503[78]
  i502.m_useMaxVisibleDescender = !!i503[79]
  i502.m_pageToDisplay = i503[80]
  i502.m_margin = new pc.Vec4( i503[81], i503[82], i503[83], i503[84] )
  i502.m_isUsingLegacyAnimationComponent = !!i503[85]
  i502.m_isVolumetricText = !!i503[86]
  request.r(i503[87], i503[88], 0, i502, 'm_Material')
  i502.m_EmojiFallbackSupport = !!i503[89]
  i502.m_Maskable = !!i503[90]
  i502.m_Color = new pc.Color(i503[91], i503[92], i503[93], i503[94])
  i502.m_RaycastTarget = !!i503[95]
  i502.m_RaycastPadding = new pc.Vec4( i503[96], i503[97], i503[98], i503[99] )
  return i502
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i512 = root || request.c( 'TMPro.VertexGradient' )
  var i513 = data
  i512.topLeft = new pc.Color(i513[0], i513[1], i513[2], i513[3])
  i512.topRight = new pc.Color(i513[4], i513[5], i513[6], i513[7])
  i512.bottomLeft = new pc.Color(i513[8], i513[9], i513[10], i513[11])
  i512.bottomRight = new pc.Color(i513[12], i513[13], i513[14], i513[15])
  return i512
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i516 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i517 = data
  i516.targetIsSelf = !!i517[0]
  request.r(i517[1], i517[2], 0, i516, 'targetGO')
  i516.tweenTargetIsTargetGO = !!i517[3]
  i516.delay = i517[4]
  i516.duration = i517[5]
  i516.easeType = i517[6]
  i516.easeCurve = new pc.AnimationCurve( { keys_flow: i517[7] } )
  i516.loopType = i517[8]
  i516.loops = i517[9]
  i516.id = i517[10]
  i516.isRelative = !!i517[11]
  i516.isFrom = !!i517[12]
  i516.isIndependentUpdate = !!i517[13]
  i516.autoKill = !!i517[14]
  i516.autoGenerate = !!i517[15]
  i516.isActive = !!i517[16]
  i516.isValid = !!i517[17]
  request.r(i517[18], i517[19], 0, i516, 'target')
  i516.animationType = i517[20]
  i516.targetType = i517[21]
  i516.forcedTargetType = i517[22]
  i516.autoPlay = !!i517[23]
  i516.useTargetAsV3 = !!i517[24]
  i516.endValueFloat = i517[25]
  i516.endValueV3 = new pc.Vec3( i517[26], i517[27], i517[28] )
  i516.endValueV2 = new pc.Vec2( i517[29], i517[30] )
  i516.endValueColor = new pc.Color(i517[31], i517[32], i517[33], i517[34])
  i516.endValueString = i517[35]
  i516.endValueRect = UnityEngine.Rect.MinMaxRect(i517[36], i517[37], i517[38], i517[39])
  request.r(i517[40], i517[41], 0, i516, 'endValueTransform')
  i516.optionalBool0 = !!i517[42]
  i516.optionalBool1 = !!i517[43]
  i516.optionalFloat0 = i517[44]
  i516.optionalInt0 = i517[45]
  i516.optionalRotationMode = i517[46]
  i516.optionalScrambleMode = i517[47]
  i516.optionalShakeRandomnessMode = i517[48]
  i516.optionalString = i517[49]
  i516.updateType = i517[50]
  i516.isSpeedBased = !!i517[51]
  i516.hasOnStart = !!i517[52]
  i516.hasOnPlay = !!i517[53]
  i516.hasOnUpdate = !!i517[54]
  i516.hasOnStepComplete = !!i517[55]
  i516.hasOnComplete = !!i517[56]
  i516.hasOnTweenCreated = !!i517[57]
  i516.hasOnRewind = !!i517[58]
  i516.onStart = request.d('UnityEngine.Events.UnityEvent', i517[59], i516.onStart)
  i516.onPlay = request.d('UnityEngine.Events.UnityEvent', i517[60], i516.onPlay)
  i516.onUpdate = request.d('UnityEngine.Events.UnityEvent', i517[61], i516.onUpdate)
  i516.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i517[62], i516.onStepComplete)
  i516.onComplete = request.d('UnityEngine.Events.UnityEvent', i517[63], i516.onComplete)
  i516.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i517[64], i516.onTweenCreated)
  i516.onRewind = request.d('UnityEngine.Events.UnityEvent', i517[65], i516.onRewind)
  return i516
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i518 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i519 = data
  i518.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i519[0], i518.m_PersistentCalls)
  return i518
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i520 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i521 = data
  var i523 = i521[0]
  var i522 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i523.length; i += 1) {
    i522.add(request.d('UnityEngine.Events.PersistentCall', i523[i + 0]));
  }
  i520.m_Calls = i522
  return i520
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i526 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i527 = data
  request.r(i527[0], i527[1], 0, i526, 'm_Target')
  i526.m_TargetAssemblyTypeName = i527[2]
  i526.m_MethodName = i527[3]
  i526.m_Mode = i527[4]
  i526.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i527[5], i526.m_Arguments)
  i526.m_CallState = i527[6]
  return i526
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i528 = root || request.c( 'UnityEngine.UI.Image' )
  var i529 = data
  request.r(i529[0], i529[1], 0, i528, 'm_Sprite')
  i528.m_Type = i529[2]
  i528.m_PreserveAspect = !!i529[3]
  i528.m_FillCenter = !!i529[4]
  i528.m_FillMethod = i529[5]
  i528.m_FillAmount = i529[6]
  i528.m_FillClockwise = !!i529[7]
  i528.m_FillOrigin = i529[8]
  i528.m_UseSpriteMesh = !!i529[9]
  i528.m_PixelsPerUnitMultiplier = i529[10]
  request.r(i529[11], i529[12], 0, i528, 'm_Material')
  i528.m_Maskable = !!i529[13]
  i528.m_Color = new pc.Color(i529[14], i529[15], i529[16], i529[17])
  i528.m_RaycastTarget = !!i529[18]
  i528.m_RaycastPadding = new pc.Vec4( i529[19], i529[20], i529[21], i529[22] )
  return i528
}

Deserializers["TutController"] = function (request, data, root) {
  var i530 = root || request.c( 'TutController' )
  var i531 = data
  request.r(i531[0], i531[1], 0, i530, 'leftCard')
  request.r(i531[2], i531[3], 0, i530, 'rightCard')
  i530.leftPos = new pc.Vec2( i531[4], i531[5] )
  i530.rightPos = new pc.Vec2( i531[6], i531[7] )
  request.r(i531[8], i531[9], 0, i530, 'tut')
  i530.timeMove = i531[10]
  i530.timeDelay = i531[11]
  return i530
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i532 = root || request.c( 'UnityEngine.UI.Button' )
  var i533 = data
  i532.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i533[0], i532.m_OnClick)
  i532.m_Navigation = request.d('UnityEngine.UI.Navigation', i533[1], i532.m_Navigation)
  i532.m_Transition = i533[2]
  i532.m_Colors = request.d('UnityEngine.UI.ColorBlock', i533[3], i532.m_Colors)
  i532.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i533[4], i532.m_SpriteState)
  i532.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i533[5], i532.m_AnimationTriggers)
  i532.m_Interactable = !!i533[6]
  request.r(i533[7], i533[8], 0, i532, 'm_TargetGraphic')
  return i532
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i534 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i535 = data
  i534.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i535[0], i534.m_PersistentCalls)
  return i534
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i536 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i537 = data
  i536.m_Mode = i537[0]
  i536.m_WrapAround = !!i537[1]
  request.r(i537[2], i537[3], 0, i536, 'm_SelectOnUp')
  request.r(i537[4], i537[5], 0, i536, 'm_SelectOnDown')
  request.r(i537[6], i537[7], 0, i536, 'm_SelectOnLeft')
  request.r(i537[8], i537[9], 0, i536, 'm_SelectOnRight')
  return i536
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i538 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i539 = data
  i538.m_NormalColor = new pc.Color(i539[0], i539[1], i539[2], i539[3])
  i538.m_HighlightedColor = new pc.Color(i539[4], i539[5], i539[6], i539[7])
  i538.m_PressedColor = new pc.Color(i539[8], i539[9], i539[10], i539[11])
  i538.m_SelectedColor = new pc.Color(i539[12], i539[13], i539[14], i539[15])
  i538.m_DisabledColor = new pc.Color(i539[16], i539[17], i539[18], i539[19])
  i538.m_ColorMultiplier = i539[20]
  i538.m_FadeDuration = i539[21]
  return i538
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i540 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i541 = data
  request.r(i541[0], i541[1], 0, i540, 'm_HighlightedSprite')
  request.r(i541[2], i541[3], 0, i540, 'm_PressedSprite')
  request.r(i541[4], i541[5], 0, i540, 'm_SelectedSprite')
  request.r(i541[6], i541[7], 0, i540, 'm_DisabledSprite')
  return i540
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i542 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i543 = data
  i542.m_NormalTrigger = i543[0]
  i542.m_HighlightedTrigger = i543[1]
  i542.m_PressedTrigger = i543[2]
  i542.m_SelectedTrigger = i543[3]
  i542.m_DisabledTrigger = i543[4]
  return i542
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i544 = root || request.c( 'LayoutController' )
  var i545 = data
  request.r(i545[0], i545[1], 0, i544, 'cardP')
  request.r(i545[2], i545[3], 0, i544, 'cardL')
  return i544
}

Deserializers["LunaController"] = function (request, data, root) {
  var i546 = root || request.c( 'LunaController' )
  var i547 = data
  i546.TimePlay = i547[0]
  i546.LimitTimePlay = !!i547[1]
  request.r(i547[2], i547[3], 0, i546, 'BGTex')
  request.r(i547[4], i547[5], 0, i546, 'BGM')
  i546.HeaderText = i547[6]
  i546.HeaderTextColor = new pc.Color(i547[7], i547[8], i547[9], i547[10])
  request.r(i547[11], i547[12], 0, i546, 'MainOption1Tex')
  i546.BGOption1Color = new pc.Color(i547[13], i547[14], i547[15], i547[16])
  i546.Option1Name = i547[17]
  i546.Option1NameColor = new pc.Color(i547[18], i547[19], i547[20], i547[21])
  request.r(i547[22], i547[23], 0, i546, 'MainOption2Tex')
  i546.BGOption2Color = new pc.Color(i547[24], i547[25], i547[26], i547[27])
  i546.Option2Name = i547[28]
  i546.Option2NameColor = new pc.Color(i547[29], i547[30], i547[31], i547[32])
  request.r(i547[33], i547[34], 0, i546, 'BGImage')
  request.r(i547[35], i547[36], 0, i546, 'musicSource')
  request.r(i547[37], i547[38], 0, i546, 'header')
  request.r(i547[39], i547[40], 0, i546, 'BGOption1ImageP')
  request.r(i547[41], i547[42], 0, i546, 'mainOption1ImageP')
  request.r(i547[43], i547[44], 0, i546, 'option1NameTextP')
  request.r(i547[45], i547[46], 0, i546, 'BGOption1ImageL')
  request.r(i547[47], i547[48], 0, i546, 'mainOption1ImageL')
  request.r(i547[49], i547[50], 0, i546, 'option1NameTextL')
  request.r(i547[51], i547[52], 0, i546, 'BGOption2ImageP')
  request.r(i547[53], i547[54], 0, i546, 'mainOption2ImageP')
  request.r(i547[55], i547[56], 0, i546, 'option2NameTextP')
  request.r(i547[57], i547[58], 0, i546, 'BGOption2ImageL')
  request.r(i547[59], i547[60], 0, i546, 'mainOption2ImageL')
  request.r(i547[61], i547[62], 0, i546, 'option2NameTextL')
  request.r(i547[63], i547[64], 0, i546, 'endCard')
  return i546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i549 = data
  request.r(i549[0], i549[1], 0, i548, 'clip')
  request.r(i549[2], i549[3], 0, i548, 'outputAudioMixerGroup')
  i548.playOnAwake = !!i549[4]
  i548.loop = !!i549[5]
  i548.time = i549[6]
  i548.volume = i549[7]
  i548.pitch = i549[8]
  i548.enabled = !!i549[9]
  return i548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i551 = data
  i550.ambientIntensity = i551[0]
  i550.reflectionIntensity = i551[1]
  i550.ambientMode = i551[2]
  i550.ambientLight = new pc.Color(i551[3], i551[4], i551[5], i551[6])
  i550.ambientSkyColor = new pc.Color(i551[7], i551[8], i551[9], i551[10])
  i550.ambientGroundColor = new pc.Color(i551[11], i551[12], i551[13], i551[14])
  i550.ambientEquatorColor = new pc.Color(i551[15], i551[16], i551[17], i551[18])
  i550.fogColor = new pc.Color(i551[19], i551[20], i551[21], i551[22])
  i550.fogEndDistance = i551[23]
  i550.fogStartDistance = i551[24]
  i550.fogDensity = i551[25]
  i550.fog = !!i551[26]
  request.r(i551[27], i551[28], 0, i550, 'skybox')
  i550.fogMode = i551[29]
  var i553 = i551[30]
  var i552 = []
  for(var i = 0; i < i553.length; i += 1) {
    i552.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i553[i + 0]) );
  }
  i550.lightmaps = i552
  i550.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i551[31], i550.lightProbes)
  i550.lightmapsMode = i551[32]
  i550.mixedBakeMode = i551[33]
  i550.environmentLightingMode = i551[34]
  i550.ambientProbe = new pc.SphericalHarmonicsL2(i551[35])
  request.r(i551[36], i551[37], 0, i550, 'customReflection')
  request.r(i551[38], i551[39], 0, i550, 'defaultReflection')
  i550.defaultReflectionMode = i551[40]
  i550.defaultReflectionResolution = i551[41]
  i550.sunLightObjectId = i551[42]
  i550.pixelLightCount = i551[43]
  i550.defaultReflectionHDR = !!i551[44]
  i550.hasLightDataAsset = !!i551[45]
  i550.hasManualGenerate = !!i551[46]
  return i550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i557 = data
  request.r(i557[0], i557[1], 0, i556, 'lightmapColor')
  request.r(i557[2], i557[3], 0, i556, 'lightmapDirection')
  request.r(i557[4], i557[5], 0, i556, 'shadowMask')
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i558 = root || new UnityEngine.LightProbes()
  var i559 = data
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i567 = data
  var i569 = i567[0]
  var i568 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i569.length; i += 1) {
    i568.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i569[i + 0]));
  }
  i566.ShaderCompilationErrors = i568
  i566.name = i567[1]
  i566.guid = i567[2]
  var i571 = i567[3]
  var i570 = []
  for(var i = 0; i < i571.length; i += 1) {
    i570.push( i571[i + 0] );
  }
  i566.shaderDefinedKeywords = i570
  var i573 = i567[4]
  var i572 = []
  for(var i = 0; i < i573.length; i += 1) {
    i572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i573[i + 0]) );
  }
  i566.passes = i572
  var i575 = i567[5]
  var i574 = []
  for(var i = 0; i < i575.length; i += 1) {
    i574.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i575[i + 0]) );
  }
  i566.usePasses = i574
  var i577 = i567[6]
  var i576 = []
  for(var i = 0; i < i577.length; i += 1) {
    i576.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i577[i + 0]) );
  }
  i566.defaultParameterValues = i576
  request.r(i567[7], i567[8], 0, i566, 'unityFallbackShader')
  i566.readDepth = !!i567[9]
  i566.hasDepthOnlyPass = !!i567[10]
  i566.isCreatedByShaderGraph = !!i567[11]
  i566.disableBatching = !!i567[12]
  i566.compiled = !!i567[13]
  return i566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i581 = data
  i580.shaderName = i581[0]
  i580.errorMessage = i581[1]
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i586 = root || new pc.UnityShaderPass()
  var i587 = data
  i586.id = i587[0]
  i586.subShaderIndex = i587[1]
  i586.name = i587[2]
  i586.passType = i587[3]
  i586.grabPassTextureName = i587[4]
  i586.usePass = !!i587[5]
  i586.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[6], i586.zTest)
  i586.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[7], i586.zWrite)
  i586.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[8], i586.culling)
  i586.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i587[9], i586.blending)
  i586.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i587[10], i586.alphaBlending)
  i586.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[11], i586.colorWriteMask)
  i586.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[12], i586.offsetUnits)
  i586.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[13], i586.offsetFactor)
  i586.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[14], i586.stencilRef)
  i586.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[15], i586.stencilReadMask)
  i586.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i587[16], i586.stencilWriteMask)
  i586.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i587[17], i586.stencilOp)
  i586.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i587[18], i586.stencilOpFront)
  i586.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i587[19], i586.stencilOpBack)
  var i589 = i587[20]
  var i588 = []
  for(var i = 0; i < i589.length; i += 1) {
    i588.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i589[i + 0]) );
  }
  i586.tags = i588
  var i591 = i587[21]
  var i590 = []
  for(var i = 0; i < i591.length; i += 1) {
    i590.push( i591[i + 0] );
  }
  i586.passDefinedKeywords = i590
  var i593 = i587[22]
  var i592 = []
  for(var i = 0; i < i593.length; i += 1) {
    i592.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i593[i + 0]) );
  }
  i586.passDefinedKeywordGroups = i592
  var i595 = i587[23]
  var i594 = []
  for(var i = 0; i < i595.length; i += 1) {
    i594.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i595[i + 0]) );
  }
  i586.variants = i594
  var i597 = i587[24]
  var i596 = []
  for(var i = 0; i < i597.length; i += 1) {
    i596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i597[i + 0]) );
  }
  i586.excludedVariants = i596
  i586.hasDepthReader = !!i587[25]
  return i586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i599 = data
  i598.val = i599[0]
  i598.name = i599[1]
  return i598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i601 = data
  i600.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i601[0], i600.src)
  i600.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i601[1], i600.dst)
  i600.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i601[2], i600.op)
  return i600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i603 = data
  i602.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i603[0], i602.pass)
  i602.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i603[1], i602.fail)
  i602.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i603[2], i602.zFail)
  i602.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i603[3], i602.comp)
  return i602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i607 = data
  i606.name = i607[0]
  i606.value = i607[1]
  return i606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i611 = data
  var i613 = i611[0]
  var i612 = []
  for(var i = 0; i < i613.length; i += 1) {
    i612.push( i613[i + 0] );
  }
  i610.keywords = i612
  i610.hasDiscard = !!i611[1]
  return i610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i617 = data
  i616.passId = i617[0]
  i616.subShaderIndex = i617[1]
  var i619 = i617[2]
  var i618 = []
  for(var i = 0; i < i619.length; i += 1) {
    i618.push( i619[i + 0] );
  }
  i616.keywords = i618
  i616.vertexProgram = i617[3]
  i616.fragmentProgram = i617[4]
  i616.exportedForWebGl2 = !!i617[5]
  i616.readDepth = !!i617[6]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i623 = data
  request.r(i623[0], i623[1], 0, i622, 'shader')
  i622.pass = i623[2]
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i627 = data
  i626.name = i627[0]
  i626.type = i627[1]
  i626.value = new pc.Vec4( i627[2], i627[3], i627[4], i627[5] )
  i626.textureValue = i627[6]
  i626.shaderPropertyFlag = i627[7]
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i629 = data
  i628.name = i629[0]
  request.r(i629[1], i629[2], 0, i628, 'texture')
  i628.aabb = i629[3]
  i628.vertices = i629[4]
  i628.triangles = i629[5]
  i628.textureRect = UnityEngine.Rect.MinMaxRect(i629[6], i629[7], i629[8], i629[9])
  i628.packedRect = UnityEngine.Rect.MinMaxRect(i629[10], i629[11], i629[12], i629[13])
  i628.border = new pc.Vec4( i629[14], i629[15], i629[16], i629[17] )
  i628.transparency = i629[18]
  i628.bounds = i629[19]
  i628.pixelsPerUnit = i629[20]
  i628.textureWidth = i629[21]
  i628.textureHeight = i629[22]
  i628.nativeSize = new pc.Vec2( i629[23], i629[24] )
  i628.pivot = new pc.Vec2( i629[25], i629[26] )
  i628.textureRectOffset = new pc.Vec2( i629[27], i629[28] )
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i631 = data
  i630.name = i631[0]
  return i630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i633 = data
  i632.name = i633[0]
  i632.bytes64 = i633[1]
  i632.data = i633[2]
  return i632
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i634 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i635 = data
  i634.normalStyle = i635[0]
  i634.normalSpacingOffset = i635[1]
  i634.boldStyle = i635[2]
  i634.boldSpacing = i635[3]
  i634.italicStyle = i635[4]
  i634.tabSize = i635[5]
  request.r(i635[6], i635[7], 0, i634, 'atlas')
  i634.m_SourceFontFileGUID = i635[8]
  i634.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i635[9], i634.m_CreationSettings)
  request.r(i635[10], i635[11], 0, i634, 'm_SourceFontFile')
  i634.m_SourceFontFilePath = i635[12]
  i634.m_AtlasPopulationMode = i635[13]
  i634.InternalDynamicOS = !!i635[14]
  var i637 = i635[15]
  var i636 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i637.length; i += 1) {
    i636.add(request.d('UnityEngine.TextCore.Glyph', i637[i + 0]));
  }
  i634.m_GlyphTable = i636
  var i639 = i635[16]
  var i638 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i639.length; i += 1) {
    i638.add(request.d('TMPro.TMP_Character', i639[i + 0]));
  }
  i634.m_CharacterTable = i638
  var i641 = i635[17]
  var i640 = []
  for(var i = 0; i < i641.length; i += 2) {
  request.r(i641[i + 0], i641[i + 1], 2, i640, '')
  }
  i634.m_AtlasTextures = i640
  i634.m_AtlasTextureIndex = i635[18]
  i634.m_IsMultiAtlasTexturesEnabled = !!i635[19]
  i634.m_GetFontFeatures = !!i635[20]
  i634.m_ClearDynamicDataOnBuild = !!i635[21]
  i634.m_AtlasWidth = i635[22]
  i634.m_AtlasHeight = i635[23]
  i634.m_AtlasPadding = i635[24]
  i634.m_AtlasRenderMode = i635[25]
  var i643 = i635[26]
  var i642 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i643.length; i += 1) {
    i642.add(request.d('UnityEngine.TextCore.GlyphRect', i643[i + 0]));
  }
  i634.m_UsedGlyphRects = i642
  var i645 = i635[27]
  var i644 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i645.length; i += 1) {
    i644.add(request.d('UnityEngine.TextCore.GlyphRect', i645[i + 0]));
  }
  i634.m_FreeGlyphRects = i644
  i634.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i635[28], i634.m_FontFeatureTable)
  i634.m_ShouldReimportFontFeatures = !!i635[29]
  var i647 = i635[30]
  var i646 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i647.length; i += 2) {
  request.r(i647[i + 0], i647[i + 1], 1, i646, '')
  }
  i634.m_FallbackFontAssetTable = i646
  var i649 = i635[31]
  var i648 = []
  for(var i = 0; i < i649.length; i += 1) {
    i648.push( request.d('TMPro.TMP_FontWeightPair', i649[i + 0]) );
  }
  i634.m_FontWeightTable = i648
  var i651 = i635[32]
  var i650 = []
  for(var i = 0; i < i651.length; i += 1) {
    i650.push( request.d('TMPro.TMP_FontWeightPair', i651[i + 0]) );
  }
  i634.fontWeights = i650
  i634.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i635[33], i634.m_fontInfo)
  var i653 = i635[34]
  var i652 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i653.length; i += 1) {
    i652.add(request.d('TMPro.TMP_Glyph', i653[i + 0]));
  }
  i634.m_glyphInfoList = i652
  i634.m_KerningTable = request.d('TMPro.KerningTable', i635[35], i634.m_KerningTable)
  var i655 = i635[36]
  var i654 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i655.length; i += 2) {
  request.r(i655[i + 0], i655[i + 1], 1, i654, '')
  }
  i634.fallbackFontAssets = i654
  i634.m_Version = i635[37]
  i634.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i635[38], i634.m_FaceInfo)
  request.r(i635[39], i635[40], 0, i634, 'm_Material')
  return i634
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i656 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i657 = data
  i656.sourceFontFileName = i657[0]
  i656.sourceFontFileGUID = i657[1]
  i656.faceIndex = i657[2]
  i656.pointSizeSamplingMode = i657[3]
  i656.pointSize = i657[4]
  i656.padding = i657[5]
  i656.paddingMode = i657[6]
  i656.packingMode = i657[7]
  i656.atlasWidth = i657[8]
  i656.atlasHeight = i657[9]
  i656.characterSetSelectionMode = i657[10]
  i656.characterSequence = i657[11]
  i656.referencedFontAssetGUID = i657[12]
  i656.referencedTextAssetGUID = i657[13]
  i656.fontStyle = i657[14]
  i656.fontStyleModifier = i657[15]
  i656.renderMode = i657[16]
  i656.includeFontFeatures = !!i657[17]
  return i656
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i660 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i661 = data
  i660.m_Index = i661[0]
  i660.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i661[1], i660.m_Metrics)
  i660.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i661[2], i660.m_GlyphRect)
  i660.m_Scale = i661[3]
  i660.m_AtlasIndex = i661[4]
  i660.m_ClassDefinitionType = i661[5]
  return i660
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i662 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i663 = data
  i662.m_Width = i663[0]
  i662.m_Height = i663[1]
  i662.m_HorizontalBearingX = i663[2]
  i662.m_HorizontalBearingY = i663[3]
  i662.m_HorizontalAdvance = i663[4]
  return i662
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i664 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i665 = data
  i664.m_X = i665[0]
  i664.m_Y = i665[1]
  i664.m_Width = i665[2]
  i664.m_Height = i665[3]
  return i664
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i668 = root || request.c( 'TMPro.TMP_Character' )
  var i669 = data
  i668.m_ElementType = i669[0]
  i668.m_Unicode = i669[1]
  i668.m_GlyphIndex = i669[2]
  i668.m_Scale = i669[3]
  return i668
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i674 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i675 = data
  var i677 = i675[0]
  var i676 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i677.length; i += 1) {
    i676.add(request.d('TMPro.MultipleSubstitutionRecord', i677[i + 0]));
  }
  i674.m_MultipleSubstitutionRecords = i676
  var i679 = i675[1]
  var i678 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i679.length; i += 1) {
    i678.add(request.d('TMPro.LigatureSubstitutionRecord', i679[i + 0]));
  }
  i674.m_LigatureSubstitutionRecords = i678
  var i681 = i675[2]
  var i680 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i681.length; i += 1) {
    i680.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i681[i + 0]));
  }
  i674.m_GlyphPairAdjustmentRecords = i680
  var i683 = i675[3]
  var i682 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i683.length; i += 1) {
    i682.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i683[i + 0]));
  }
  i674.m_MarkToBaseAdjustmentRecords = i682
  var i685 = i675[4]
  var i684 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i685.length; i += 1) {
    i684.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i685[i + 0]));
  }
  i674.m_MarkToMarkAdjustmentRecords = i684
  return i674
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i688 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i689 = data
  i688.m_TargetGlyphID = i689[0]
  i688.m_SubstituteGlyphIDs = i689[1]
  return i688
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i692 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i693 = data
  i692.m_ComponentGlyphIDs = i693[0]
  i692.m_LigatureGlyphID = i693[1]
  return i692
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i696 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i697 = data
  i696.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i697[0], i696.m_FirstAdjustmentRecord)
  i696.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i697[1], i696.m_SecondAdjustmentRecord)
  i696.m_FeatureLookupFlags = i697[2]
  return i696
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i700 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i701 = data
  i700.m_BaseGlyphID = i701[0]
  i700.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i701[1], i700.m_BaseGlyphAnchorPoint)
  i700.m_MarkGlyphID = i701[2]
  i700.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i701[3], i700.m_MarkPositionAdjustment)
  return i700
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i704 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i705 = data
  i704.m_BaseMarkGlyphID = i705[0]
  i704.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i705[1], i704.m_BaseMarkGlyphAnchorPoint)
  i704.m_CombiningMarkGlyphID = i705[2]
  i704.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i705[3], i704.m_CombiningMarkPositionAdjustment)
  return i704
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i710 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i711 = data
  request.r(i711[0], i711[1], 0, i710, 'regularTypeface')
  request.r(i711[2], i711[3], 0, i710, 'italicTypeface')
  return i710
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i712 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i713 = data
  i712.Name = i713[0]
  i712.PointSize = i713[1]
  i712.Scale = i713[2]
  i712.CharacterCount = i713[3]
  i712.LineHeight = i713[4]
  i712.Baseline = i713[5]
  i712.Ascender = i713[6]
  i712.CapHeight = i713[7]
  i712.Descender = i713[8]
  i712.CenterLine = i713[9]
  i712.SuperscriptOffset = i713[10]
  i712.SubscriptOffset = i713[11]
  i712.SubSize = i713[12]
  i712.Underline = i713[13]
  i712.UnderlineThickness = i713[14]
  i712.strikethrough = i713[15]
  i712.strikethroughThickness = i713[16]
  i712.TabWidth = i713[17]
  i712.Padding = i713[18]
  i712.AtlasWidth = i713[19]
  i712.AtlasHeight = i713[20]
  return i712
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i716 = root || request.c( 'TMPro.TMP_Glyph' )
  var i717 = data
  i716.id = i717[0]
  i716.x = i717[1]
  i716.y = i717[2]
  i716.width = i717[3]
  i716.height = i717[4]
  i716.xOffset = i717[5]
  i716.yOffset = i717[6]
  i716.xAdvance = i717[7]
  i716.scale = i717[8]
  return i716
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i718 = root || request.c( 'TMPro.KerningTable' )
  var i719 = data
  var i721 = i719[0]
  var i720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i721.length; i += 1) {
    i720.add(request.d('TMPro.KerningPair', i721[i + 0]));
  }
  i718.kerningPairs = i720
  return i718
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i724 = root || request.c( 'TMPro.KerningPair' )
  var i725 = data
  i724.xOffset = i725[0]
  i724.m_FirstGlyph = i725[1]
  i724.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i725[2], i724.m_FirstGlyphAdjustments)
  i724.m_SecondGlyph = i725[3]
  i724.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i725[4], i724.m_SecondGlyphAdjustments)
  i724.m_IgnoreSpacingAdjustments = !!i725[5]
  return i724
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i726 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i727 = data
  i726.m_FaceIndex = i727[0]
  i726.m_FamilyName = i727[1]
  i726.m_StyleName = i727[2]
  i726.m_PointSize = i727[3]
  i726.m_Scale = i727[4]
  i726.m_UnitsPerEM = i727[5]
  i726.m_LineHeight = i727[6]
  i726.m_AscentLine = i727[7]
  i726.m_CapLine = i727[8]
  i726.m_MeanLine = i727[9]
  i726.m_Baseline = i727[10]
  i726.m_DescentLine = i727[11]
  i726.m_SuperscriptOffset = i727[12]
  i726.m_SuperscriptSize = i727[13]
  i726.m_SubscriptOffset = i727[14]
  i726.m_SubscriptSize = i727[15]
  i726.m_UnderlineOffset = i727[16]
  i726.m_UnderlineThickness = i727[17]
  i726.m_StrikethroughOffset = i727[18]
  i726.m_StrikethroughThickness = i727[19]
  i726.m_TabWidth = i727[20]
  return i726
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i728 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i729 = data
  i728.useSafeMode = !!i729[0]
  i728.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i729[1], i728.safeModeOptions)
  i728.timeScale = i729[2]
  i728.unscaledTimeScale = i729[3]
  i728.useSmoothDeltaTime = !!i729[4]
  i728.maxSmoothUnscaledTime = i729[5]
  i728.rewindCallbackMode = i729[6]
  i728.showUnityEditorReport = !!i729[7]
  i728.logBehaviour = i729[8]
  i728.drawGizmos = !!i729[9]
  i728.defaultRecyclable = !!i729[10]
  i728.defaultAutoPlay = i729[11]
  i728.defaultUpdateType = i729[12]
  i728.defaultTimeScaleIndependent = !!i729[13]
  i728.defaultEaseType = i729[14]
  i728.defaultEaseOvershootOrAmplitude = i729[15]
  i728.defaultEasePeriod = i729[16]
  i728.defaultAutoKill = !!i729[17]
  i728.defaultLoopType = i729[18]
  i728.debugMode = !!i729[19]
  i728.debugStoreTargetId = !!i729[20]
  i728.showPreviewPanel = !!i729[21]
  i728.storeSettingsLocation = i729[22]
  i728.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i729[23], i728.modules)
  i728.createASMDEF = !!i729[24]
  i728.showPlayingTweens = !!i729[25]
  i728.showPausedTweens = !!i729[26]
  return i728
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i730 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i731 = data
  i730.logBehaviour = i731[0]
  i730.nestedTweenFailureBehaviour = i731[1]
  return i730
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i732 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i733 = data
  i732.showPanel = !!i733[0]
  i732.audioEnabled = !!i733[1]
  i732.physicsEnabled = !!i733[2]
  i732.physics2DEnabled = !!i733[3]
  i732.spriteEnabled = !!i733[4]
  i732.uiEnabled = !!i733[5]
  i732.textMeshProEnabled = !!i733[6]
  i732.tk2DEnabled = !!i733[7]
  i732.deAudioEnabled = !!i733[8]
  i732.deUnityExtendedEnabled = !!i733[9]
  i732.epoOutlineEnabled = !!i733[10]
  return i732
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i734 = root || request.c( 'TMPro.TMP_Settings' )
  var i735 = data
  i734.assetVersion = i735[0]
  i734.m_TextWrappingMode = i735[1]
  i734.m_enableKerning = !!i735[2]
  var i737 = i735[3]
  var i736 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i737.length; i += 1) {
    i736.add(i737[i + 0]);
  }
  i734.m_ActiveFontFeatures = i736
  i734.m_enableExtraPadding = !!i735[4]
  i734.m_enableTintAllSprites = !!i735[5]
  i734.m_enableParseEscapeCharacters = !!i735[6]
  i734.m_EnableRaycastTarget = !!i735[7]
  i734.m_GetFontFeaturesAtRuntime = !!i735[8]
  i734.m_missingGlyphCharacter = i735[9]
  i734.m_ClearDynamicDataOnBuild = !!i735[10]
  i734.m_warningsDisabled = !!i735[11]
  request.r(i735[12], i735[13], 0, i734, 'm_defaultFontAsset')
  i734.m_defaultFontAssetPath = i735[14]
  i734.m_defaultFontSize = i735[15]
  i734.m_defaultAutoSizeMinRatio = i735[16]
  i734.m_defaultAutoSizeMaxRatio = i735[17]
  i734.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i735[18], i735[19] )
  i734.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i735[20], i735[21] )
  i734.m_autoSizeTextContainer = !!i735[22]
  i734.m_IsTextObjectScaleStatic = !!i735[23]
  var i739 = i735[24]
  var i738 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 1, i738, '')
  }
  i734.m_fallbackFontAssets = i738
  i734.m_matchMaterialPreset = !!i735[25]
  i734.m_HideSubTextObjects = !!i735[26]
  request.r(i735[27], i735[28], 0, i734, 'm_defaultSpriteAsset')
  i734.m_defaultSpriteAssetPath = i735[29]
  i734.m_enableEmojiSupport = !!i735[30]
  i734.m_MissingCharacterSpriteUnicode = i735[31]
  var i741 = i735[32]
  var i740 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i741.length; i += 2) {
  request.r(i741[i + 0], i741[i + 1], 1, i740, '')
  }
  i734.m_EmojiFallbackTextAssets = i740
  i734.m_defaultColorGradientPresetsPath = i735[33]
  request.r(i735[34], i735[35], 0, i734, 'm_defaultStyleSheet')
  i734.m_StyleSheetsResourcePath = i735[36]
  request.r(i735[37], i735[38], 0, i734, 'm_leadingCharacters')
  request.r(i735[39], i735[40], 0, i734, 'm_followingCharacters')
  i734.m_UseModernHangulLineBreakingRules = !!i735[41]
  return i734
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i744 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i745 = data
  request.r(i745[0], i745[1], 0, i744, 'spriteSheet')
  var i747 = i745[2]
  var i746 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i747.length; i += 1) {
    i746.add(request.d('TMPro.TMP_Sprite', i747[i + 0]));
  }
  i744.spriteInfoList = i746
  var i749 = i745[3]
  var i748 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i749.length; i += 2) {
  request.r(i749[i + 0], i749[i + 1], 1, i748, '')
  }
  i744.fallbackSpriteAssets = i748
  var i751 = i745[4]
  var i750 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i751.length; i += 1) {
    i750.add(request.d('TMPro.TMP_SpriteCharacter', i751[i + 0]));
  }
  i744.m_SpriteCharacterTable = i750
  var i753 = i745[5]
  var i752 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i753.length; i += 1) {
    i752.add(request.d('TMPro.TMP_SpriteGlyph', i753[i + 0]));
  }
  i744.m_GlyphTable = i752
  i744.m_Version = i745[6]
  i744.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i745[7], i744.m_FaceInfo)
  request.r(i745[8], i745[9], 0, i744, 'm_Material')
  return i744
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i756 = root || request.c( 'TMPro.TMP_Sprite' )
  var i757 = data
  i756.name = i757[0]
  i756.hashCode = i757[1]
  i756.unicode = i757[2]
  i756.pivot = new pc.Vec2( i757[3], i757[4] )
  request.r(i757[5], i757[6], 0, i756, 'sprite')
  i756.id = i757[7]
  i756.x = i757[8]
  i756.y = i757[9]
  i756.width = i757[10]
  i756.height = i757[11]
  i756.xOffset = i757[12]
  i756.yOffset = i757[13]
  i756.xAdvance = i757[14]
  i756.scale = i757[15]
  return i756
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i762 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i763 = data
  i762.m_Name = i763[0]
  i762.m_ElementType = i763[1]
  i762.m_Unicode = i763[2]
  i762.m_GlyphIndex = i763[3]
  i762.m_Scale = i763[4]
  return i762
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i766 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i767 = data
  request.r(i767[0], i767[1], 0, i766, 'sprite')
  i766.m_Index = i767[2]
  i766.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i767[3], i766.m_Metrics)
  i766.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i767[4], i766.m_GlyphRect)
  i766.m_Scale = i767[5]
  i766.m_AtlasIndex = i767[6]
  i766.m_ClassDefinitionType = i767[7]
  return i766
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i768 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i769 = data
  var i771 = i769[0]
  var i770 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i771.length; i += 1) {
    i770.add(request.d('TMPro.TMP_Style', i771[i + 0]));
  }
  i768.m_StyleList = i770
  return i768
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i774 = root || request.c( 'TMPro.TMP_Style' )
  var i775 = data
  i774.m_Name = i775[0]
  i774.m_HashCode = i775[1]
  i774.m_OpeningDefinition = i775[2]
  i774.m_ClosingDefinition = i775[3]
  i774.m_OpeningTagArray = i775[4]
  i774.m_ClosingTagArray = i775[5]
  return i774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i777 = data
  var i779 = i777[0]
  var i778 = []
  for(var i = 0; i < i779.length; i += 1) {
    i778.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i779[i + 0]) );
  }
  i776.files = i778
  i776.componentToPrefabIds = i777[1]
  return i776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i783 = data
  i782.path = i783[0]
  request.r(i783[1], i783[2], 0, i782, 'unityObject')
  return i782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i785 = data
  var i787 = i785[0]
  var i786 = []
  for(var i = 0; i < i787.length; i += 1) {
    i786.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i787[i + 0]) );
  }
  i784.scriptsExecutionOrder = i786
  var i789 = i785[1]
  var i788 = []
  for(var i = 0; i < i789.length; i += 1) {
    i788.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i789[i + 0]) );
  }
  i784.sortingLayers = i788
  var i791 = i785[2]
  var i790 = []
  for(var i = 0; i < i791.length; i += 1) {
    i790.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i791[i + 0]) );
  }
  i784.cullingLayers = i790
  i784.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i785[3], i784.timeSettings)
  i784.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i785[4], i784.physicsSettings)
  i784.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i785[5], i784.physics2DSettings)
  i784.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i785[6], i784.qualitySettings)
  i784.enableRealtimeShadows = !!i785[7]
  i784.enableAutoInstancing = !!i785[8]
  i784.enableStaticBatching = !!i785[9]
  i784.enableDynamicBatching = !!i785[10]
  i784.usePreservativeDynamicBatching = !!i785[11]
  i784.lightmapEncodingQuality = i785[12]
  i784.desiredColorSpace = i785[13]
  var i793 = i785[14]
  var i792 = []
  for(var i = 0; i < i793.length; i += 1) {
    i792.push( i793[i + 0] );
  }
  i784.allTags = i792
  return i784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i797 = data
  i796.name = i797[0]
  i796.value = i797[1]
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i800 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i801 = data
  i800.id = i801[0]
  i800.name = i801[1]
  i800.value = i801[2]
  return i800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i804 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i805 = data
  i804.id = i805[0]
  i804.name = i805[1]
  return i804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i807 = data
  i806.fixedDeltaTime = i807[0]
  i806.maximumDeltaTime = i807[1]
  i806.timeScale = i807[2]
  i806.maximumParticleTimestep = i807[3]
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i809 = data
  i808.gravity = new pc.Vec3( i809[0], i809[1], i809[2] )
  i808.defaultSolverIterations = i809[3]
  i808.bounceThreshold = i809[4]
  i808.autoSyncTransforms = !!i809[5]
  i808.autoSimulation = !!i809[6]
  var i811 = i809[7]
  var i810 = []
  for(var i = 0; i < i811.length; i += 1) {
    i810.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i811[i + 0]) );
  }
  i808.collisionMatrix = i810
  return i808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i815 = data
  i814.enabled = !!i815[0]
  i814.layerId = i815[1]
  i814.otherLayerId = i815[2]
  return i814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i817 = data
  request.r(i817[0], i817[1], 0, i816, 'material')
  i816.gravity = new pc.Vec2( i817[2], i817[3] )
  i816.positionIterations = i817[4]
  i816.velocityIterations = i817[5]
  i816.velocityThreshold = i817[6]
  i816.maxLinearCorrection = i817[7]
  i816.maxAngularCorrection = i817[8]
  i816.maxTranslationSpeed = i817[9]
  i816.maxRotationSpeed = i817[10]
  i816.baumgarteScale = i817[11]
  i816.baumgarteTOIScale = i817[12]
  i816.timeToSleep = i817[13]
  i816.linearSleepTolerance = i817[14]
  i816.angularSleepTolerance = i817[15]
  i816.defaultContactOffset = i817[16]
  i816.autoSimulation = !!i817[17]
  i816.queriesHitTriggers = !!i817[18]
  i816.queriesStartInColliders = !!i817[19]
  i816.callbacksOnDisable = !!i817[20]
  i816.reuseCollisionCallbacks = !!i817[21]
  i816.autoSyncTransforms = !!i817[22]
  var i819 = i817[23]
  var i818 = []
  for(var i = 0; i < i819.length; i += 1) {
    i818.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i819[i + 0]) );
  }
  i816.collisionMatrix = i818
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i823 = data
  i822.enabled = !!i823[0]
  i822.layerId = i823[1]
  i822.otherLayerId = i823[2]
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i825 = data
  var i827 = i825[0]
  var i826 = []
  for(var i = 0; i < i827.length; i += 1) {
    i826.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i827[i + 0]) );
  }
  i824.qualityLevels = i826
  var i829 = i825[1]
  var i828 = []
  for(var i = 0; i < i829.length; i += 1) {
    i828.push( i829[i + 0] );
  }
  i824.names = i828
  i824.shadows = i825[2]
  i824.anisotropicFiltering = i825[3]
  i824.antiAliasing = i825[4]
  i824.lodBias = i825[5]
  i824.shadowCascades = i825[6]
  i824.shadowDistance = i825[7]
  i824.shadowmaskMode = i825[8]
  i824.shadowProjection = i825[9]
  i824.shadowResolution = i825[10]
  i824.softParticles = !!i825[11]
  i824.softVegetation = !!i825[12]
  i824.activeColorSpace = i825[13]
  i824.desiredColorSpace = i825[14]
  i824.masterTextureLimit = i825[15]
  i824.maxQueuedFrames = i825[16]
  i824.particleRaycastBudget = i825[17]
  i824.pixelLightCount = i825[18]
  i824.realtimeReflectionProbes = !!i825[19]
  i824.shadowCascade2Split = i825[20]
  i824.shadowCascade4Split = new pc.Vec3( i825[21], i825[22], i825[23] )
  i824.streamingMipmapsActive = !!i825[24]
  i824.vSyncCount = i825[25]
  i824.asyncUploadBufferSize = i825[26]
  i824.asyncUploadTimeSlice = i825[27]
  i824.billboardsFaceCameraPosition = !!i825[28]
  i824.shadowNearPlaneOffset = i825[29]
  i824.streamingMipmapsMemoryBudget = i825[30]
  i824.maximumLODLevel = i825[31]
  i824.streamingMipmapsAddAllCameras = !!i825[32]
  i824.streamingMipmapsMaxLevelReduction = i825[33]
  i824.streamingMipmapsRenderersPerFrame = i825[34]
  i824.resolutionScalingFixedDPIFactor = i825[35]
  i824.streamingMipmapsMaxFileIORequests = i825[36]
  i824.currentQualityLevel = i825[37]
  return i824
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i833 = data
  request.r(i833[0], i833[1], 0, i832, 'm_ObjectArgument')
  i832.m_ObjectArgumentAssemblyTypeName = i833[2]
  i832.m_IntArgument = i833[3]
  i832.m_FloatArgument = i833[4]
  i832.m_StringArgument = i833[5]
  i832.m_BoolArgument = !!i833[6]
  return i832
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i835 = data
  i834.m_GlyphIndex = i835[0]
  i834.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i835[1], i834.m_GlyphValueRecord)
  return i834
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i836 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i837 = data
  i836.m_XCoordinate = i837[0]
  i836.m_YCoordinate = i837[1]
  return i836
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i838 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i839 = data
  i838.m_XPositionAdjustment = i839[0]
  i838.m_YPositionAdjustment = i839[1]
  return i838
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i840 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i841 = data
  i840.xPlacement = i841[0]
  i840.yPlacement = i841[1]
  i840.xAdvance = i841[2]
  i840.yAdvance = i841[3]
  return i840
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i843 = data
  i842.m_XPlacement = i843[0]
  i842.m_YPlacement = i843[1]
  i842.m_XAdvance = i843[2]
  i842.m_YAdvance = i843[3]
  return i842
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[40],"41":[2],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[2],"64":[65],"66":[67],"68":[67],"8":[7],"69":[70],"71":[2],"72":[73],"74":[7],"75":[11,7],"76":[65],"77":[11,7],"78":[7],"79":[7],"80":[65,7],"14":[7,11],"81":[82],"83":[82],"84":[82],"85":[7],"86":[7],"10":[8],"19":[11,7],"12":[7],"9":[8],"87":[7],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"95":[7],"13":[11,7],"96":[7],"97":[7],"98":[7],"99":[7],"100":[11,7],"101":[7],"102":[5],"103":[5],"6":[5],"104":[5],"105":[2],"106":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.Sprite","TutController","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "09/03/2026 04:07:34";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CWBC_V07_NgocBTU_TamNTM";

Deserializers.lunaAppID = "33333";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1774";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4090";

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

Deserializers.buildID = "b954a079-52bd-4017-9ef0-ce40ffe1a374";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

