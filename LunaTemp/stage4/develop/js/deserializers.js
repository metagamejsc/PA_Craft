var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i474 = root || request.c( 'UnityEngine.JointSpring' )
  var i475 = data
  i474.spring = i475[0]
  i474.damper = i475[1]
  i474.targetPosition = i475[2]
  return i474
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i476 = root || request.c( 'UnityEngine.JointMotor' )
  var i477 = data
  i476.m_TargetVelocity = i477[0]
  i476.m_Force = i477[1]
  i476.m_FreeSpin = i477[2]
  return i476
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i478 = root || request.c( 'UnityEngine.JointLimits' )
  var i479 = data
  i478.m_Min = i479[0]
  i478.m_Max = i479[1]
  i478.m_Bounciness = i479[2]
  i478.m_BounceMinVelocity = i479[3]
  i478.m_ContactDistance = i479[4]
  i478.minBounce = i479[5]
  i478.maxBounce = i479[6]
  return i478
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i480 = root || request.c( 'UnityEngine.JointDrive' )
  var i481 = data
  i480.m_PositionSpring = i481[0]
  i480.m_PositionDamper = i481[1]
  i480.m_MaximumForce = i481[2]
  i480.m_UseAcceleration = i481[3]
  return i480
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i482 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i483 = data
  i482.m_Spring = i483[0]
  i482.m_Damper = i483[1]
  return i482
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i484 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i485 = data
  i484.m_Limit = i485[0]
  i484.m_Bounciness = i485[1]
  i484.m_ContactDistance = i485[2]
  return i484
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i486 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i487 = data
  i486.m_ExtremumSlip = i487[0]
  i486.m_ExtremumValue = i487[1]
  i486.m_AsymptoteSlip = i487[2]
  i486.m_AsymptoteValue = i487[3]
  i486.m_Stiffness = i487[4]
  return i486
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i488 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i489 = data
  i488.m_LowerAngle = i489[0]
  i488.m_UpperAngle = i489[1]
  return i488
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i490 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i491 = data
  i490.m_MotorSpeed = i491[0]
  i490.m_MaximumMotorTorque = i491[1]
  return i490
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i492 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i493 = data
  i492.m_DampingRatio = i493[0]
  i492.m_Frequency = i493[1]
  i492.m_Angle = i493[2]
  return i492
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i494 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i495 = data
  i494.m_LowerTranslation = i495[0]
  i494.m_UpperTranslation = i495[1]
  return i494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i497 = data
  i496.name = i497[0]
  i496.width = i497[1]
  i496.height = i497[2]
  i496.mipmapCount = i497[3]
  i496.anisoLevel = i497[4]
  i496.filterMode = i497[5]
  i496.hdr = !!i497[6]
  i496.format = i497[7]
  i496.wrapMode = i497[8]
  i496.alphaIsTransparency = !!i497[9]
  i496.alphaSource = i497[10]
  i496.graphicsFormat = i497[11]
  i496.sRGBTexture = !!i497[12]
  i496.desiredColorSpace = i497[13]
  i496.wrapU = i497[14]
  i496.wrapV = i497[15]
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i498 = root || new pc.UnityMaterial()
  var i499 = data
  i498.name = i499[0]
  request.r(i499[1], i499[2], 0, i498, 'shader')
  i498.renderQueue = i499[3]
  i498.enableInstancing = !!i499[4]
  var i501 = i499[5]
  var i500 = []
  for(var i = 0; i < i501.length; i += 1) {
    i500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i501[i + 0]) );
  }
  i498.floatParameters = i500
  var i503 = i499[6]
  var i502 = []
  for(var i = 0; i < i503.length; i += 1) {
    i502.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i503[i + 0]) );
  }
  i498.colorParameters = i502
  var i505 = i499[7]
  var i504 = []
  for(var i = 0; i < i505.length; i += 1) {
    i504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i505[i + 0]) );
  }
  i498.vectorParameters = i504
  var i507 = i499[8]
  var i506 = []
  for(var i = 0; i < i507.length; i += 1) {
    i506.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i507[i + 0]) );
  }
  i498.textureParameters = i506
  var i509 = i499[9]
  var i508 = []
  for(var i = 0; i < i509.length; i += 1) {
    i508.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i509[i + 0]) );
  }
  i498.materialFlags = i508
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i513 = data
  i512.name = i513[0]
  i512.value = i513[1]
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i517 = data
  i516.name = i517[0]
  i516.value = new pc.Color(i517[1], i517[2], i517[3], i517[4])
  return i516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i521 = data
  i520.name = i521[0]
  i520.value = new pc.Vec4( i521[1], i521[2], i521[3], i521[4] )
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i525 = data
  i524.name = i525[0]
  request.r(i525[1], i525[2], 0, i524, 'value')
  return i524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i529 = data
  i528.name = i529[0]
  i528.enabled = !!i529[1]
  return i528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i531 = data
  i530.name = i531[0]
  i530.halfPrecision = !!i531[1]
  i530.useSimplification = !!i531[2]
  i530.useUInt32IndexFormat = !!i531[3]
  i530.vertexCount = i531[4]
  i530.aabb = i531[5]
  var i533 = i531[6]
  var i532 = []
  for(var i = 0; i < i533.length; i += 1) {
    i532.push( !!i533[i + 0] );
  }
  i530.streams = i532
  i530.vertices = i531[7]
  var i535 = i531[8]
  var i534 = []
  for(var i = 0; i < i535.length; i += 1) {
    i534.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i535[i + 0]) );
  }
  i530.subMeshes = i534
  var i537 = i531[9]
  var i536 = []
  for(var i = 0; i < i537.length; i += 16) {
    i536.push( new pc.Mat4().setData(i537[i + 0], i537[i + 1], i537[i + 2], i537[i + 3],  i537[i + 4], i537[i + 5], i537[i + 6], i537[i + 7],  i537[i + 8], i537[i + 9], i537[i + 10], i537[i + 11],  i537[i + 12], i537[i + 13], i537[i + 14], i537[i + 15]) );
  }
  i530.bindposes = i536
  var i539 = i531[10]
  var i538 = []
  for(var i = 0; i < i539.length; i += 1) {
    i538.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i539[i + 0]) );
  }
  i530.blendShapes = i538
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i545 = data
  i544.triangles = i545[0]
  return i544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i551 = data
  i550.name = i551[0]
  var i553 = i551[1]
  var i552 = []
  for(var i = 0; i < i553.length; i += 1) {
    i552.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i553[i + 0]) );
  }
  i550.frames = i552
  return i550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i555 = data
  i554.name = i555[0]
  i554.atlasId = i555[1]
  i554.mipmapCount = i555[2]
  i554.hdr = !!i555[3]
  i554.size = i555[4]
  i554.anisoLevel = i555[5]
  i554.filterMode = i555[6]
  var i557 = i555[7]
  var i556 = []
  for(var i = 0; i < i557.length; i += 4) {
    i556.push( UnityEngine.Rect.MinMaxRect(i557[i + 0], i557[i + 1], i557[i + 2], i557[i + 3]) );
  }
  i554.rects = i556
  i554.wrapU = i555[8]
  i554.wrapV = i555[9]
  return i554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i561 = data
  i560.name = i561[0]
  i560.index = i561[1]
  i560.startup = !!i561[2]
  return i560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i563 = data
  i562.aspect = i563[0]
  i562.orthographic = !!i563[1]
  i562.orthographicSize = i563[2]
  i562.backgroundColor = new pc.Color(i563[3], i563[4], i563[5], i563[6])
  i562.nearClipPlane = i563[7]
  i562.farClipPlane = i563[8]
  i562.fieldOfView = i563[9]
  i562.depth = i563[10]
  i562.clearFlags = i563[11]
  i562.cullingMask = i563[12]
  i562.rect = i563[13]
  request.r(i563[14], i563[15], 0, i562, 'targetTexture')
  i562.usePhysicalProperties = !!i563[16]
  i562.focalLength = i563[17]
  i562.sensorSize = new pc.Vec2( i563[18], i563[19] )
  i562.lensShift = new pc.Vec2( i563[20], i563[21] )
  i562.gateFit = i563[22]
  i562.commandBufferCount = i563[23]
  i562.cameraType = i563[24]
  i562.enabled = !!i563[25]
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i565 = data
  i564.name = i565[0]
  i564.tagId = i565[1]
  i564.enabled = !!i565[2]
  i564.isStatic = !!i565[3]
  i564.layer = i565[4]
  return i564
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i567 = data
  request.r(i567[0], i567[1], 0, i566, 'm_FirstSelected')
  i566.m_sendNavigationEvents = !!i567[2]
  i566.m_DragThreshold = i567[3]
  return i566
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i568 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i569 = data
  i568.m_HorizontalAxis = i569[0]
  i568.m_VerticalAxis = i569[1]
  i568.m_SubmitButton = i569[2]
  i568.m_CancelButton = i569[3]
  i568.m_InputActionsPerSecond = i569[4]
  i568.m_RepeatDelay = i569[5]
  i568.m_ForceModuleActive = !!i569[6]
  i568.m_SendPointerHoverToParent = !!i569[7]
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i571 = data
  i570.type = i571[0]
  i570.color = new pc.Color(i571[1], i571[2], i571[3], i571[4])
  i570.cullingMask = i571[5]
  i570.intensity = i571[6]
  i570.range = i571[7]
  i570.spotAngle = i571[8]
  i570.shadows = i571[9]
  i570.shadowNormalBias = i571[10]
  i570.shadowBias = i571[11]
  i570.shadowStrength = i571[12]
  i570.shadowResolution = i571[13]
  i570.lightmapBakeType = i571[14]
  i570.renderMode = i571[15]
  request.r(i571[16], i571[17], 0, i570, 'cookie')
  i570.cookieSize = i571[18]
  i570.shadowNearPlane = i571[19]
  i570.occlusionMaskChannel = i571[20]
  i570.isBaked = !!i571[21]
  i570.mixedLightingMode = i571[22]
  i570.enabled = !!i571[23]
  return i570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i573 = data
  i572.pivot = new pc.Vec2( i573[0], i573[1] )
  i572.anchorMin = new pc.Vec2( i573[2], i573[3] )
  i572.anchorMax = new pc.Vec2( i573[4], i573[5] )
  i572.sizeDelta = new pc.Vec2( i573[6], i573[7] )
  i572.anchoredPosition3D = new pc.Vec3( i573[8], i573[9], i573[10] )
  i572.rotation = new pc.Quat(i573[11], i573[12], i573[13], i573[14])
  i572.scale = new pc.Vec3( i573[15], i573[16], i573[17] )
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i575 = data
  i574.planeDistance = i575[0]
  i574.referencePixelsPerUnit = i575[1]
  i574.isFallbackOverlay = !!i575[2]
  i574.renderMode = i575[3]
  i574.renderOrder = i575[4]
  i574.sortingLayerName = i575[5]
  i574.sortingOrder = i575[6]
  i574.scaleFactor = i575[7]
  request.r(i575[8], i575[9], 0, i574, 'worldCamera')
  i574.overrideSorting = !!i575[10]
  i574.pixelPerfect = !!i575[11]
  i574.targetDisplay = i575[12]
  i574.overridePixelPerfect = !!i575[13]
  i574.enabled = !!i575[14]
  return i574
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i576 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i577 = data
  i576.m_UiScaleMode = i577[0]
  i576.m_ReferencePixelsPerUnit = i577[1]
  i576.m_ScaleFactor = i577[2]
  i576.m_ReferenceResolution = new pc.Vec2( i577[3], i577[4] )
  i576.m_ScreenMatchMode = i577[5]
  i576.m_MatchWidthOrHeight = i577[6]
  i576.m_PhysicalUnit = i577[7]
  i576.m_FallbackScreenDPI = i577[8]
  i576.m_DefaultSpriteDPI = i577[9]
  i576.m_DynamicPixelsPerUnit = i577[10]
  i576.m_PresetInfoIsWorld = !!i577[11]
  return i576
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i578 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i579 = data
  i578.m_IgnoreReversedGraphics = !!i579[0]
  i578.m_BlockingObjects = i579[1]
  i578.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i579[2] )
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i581 = data
  i580.cullTransparentMesh = !!i581[0]
  return i580
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i582 = root || request.c( 'UnityEngine.UI.Image' )
  var i583 = data
  request.r(i583[0], i583[1], 0, i582, 'm_Sprite')
  i582.m_Type = i583[2]
  i582.m_PreserveAspect = !!i583[3]
  i582.m_FillCenter = !!i583[4]
  i582.m_FillMethod = i583[5]
  i582.m_FillAmount = i583[6]
  i582.m_FillClockwise = !!i583[7]
  i582.m_FillOrigin = i583[8]
  i582.m_UseSpriteMesh = !!i583[9]
  i582.m_PixelsPerUnitMultiplier = i583[10]
  request.r(i583[11], i583[12], 0, i582, 'm_Material')
  i582.m_Maskable = !!i583[13]
  i582.m_Color = new pc.Color(i583[14], i583[15], i583[16], i583[17])
  i582.m_RaycastTarget = !!i583[18]
  i582.m_RaycastPadding = new pc.Vec4( i583[19], i583[20], i583[21], i583[22] )
  return i582
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i584 = root || request.c( 'UnityEngine.UI.Text' )
  var i585 = data
  i584.m_FontData = request.d('UnityEngine.UI.FontData', i585[0], i584.m_FontData)
  i584.m_Text = i585[1]
  request.r(i585[2], i585[3], 0, i584, 'm_Material')
  i584.m_Maskable = !!i585[4]
  i584.m_Color = new pc.Color(i585[5], i585[6], i585[7], i585[8])
  i584.m_RaycastTarget = !!i585[9]
  i584.m_RaycastPadding = new pc.Vec4( i585[10], i585[11], i585[12], i585[13] )
  return i584
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i586 = root || request.c( 'UnityEngine.UI.FontData' )
  var i587 = data
  request.r(i587[0], i587[1], 0, i586, 'm_Font')
  i586.m_FontSize = i587[2]
  i586.m_FontStyle = i587[3]
  i586.m_BestFit = !!i587[4]
  i586.m_MinSize = i587[5]
  i586.m_MaxSize = i587[6]
  i586.m_Alignment = i587[7]
  i586.m_AlignByGeometry = !!i587[8]
  i586.m_RichText = !!i587[9]
  i586.m_HorizontalOverflow = i587[10]
  i586.m_VerticalOverflow = i587[11]
  i586.m_LineSpacing = i587[12]
  return i586
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i588 = root || request.c( 'UnityEngine.UI.Button' )
  var i589 = data
  i588.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i589[0], i588.m_OnClick)
  i588.m_Navigation = request.d('UnityEngine.UI.Navigation', i589[1], i588.m_Navigation)
  i588.m_Transition = i589[2]
  i588.m_Colors = request.d('UnityEngine.UI.ColorBlock', i589[3], i588.m_Colors)
  i588.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i589[4], i588.m_SpriteState)
  i588.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i589[5], i588.m_AnimationTriggers)
  i588.m_Interactable = !!i589[6]
  request.r(i589[7], i589[8], 0, i588, 'm_TargetGraphic')
  return i588
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i590 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i591 = data
  i590.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i591[0], i590.m_PersistentCalls)
  return i590
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i592 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i593 = data
  var i595 = i593[0]
  var i594 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i595.length; i += 1) {
    i594.add(request.d('UnityEngine.Events.PersistentCall', i595[i + 0]));
  }
  i592.m_Calls = i594
  return i592
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i598 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i599 = data
  request.r(i599[0], i599[1], 0, i598, 'm_Target')
  i598.m_TargetAssemblyTypeName = i599[2]
  i598.m_MethodName = i599[3]
  i598.m_Mode = i599[4]
  i598.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i599[5], i598.m_Arguments)
  i598.m_CallState = i599[6]
  return i598
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i600 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i601 = data
  i600.m_Mode = i601[0]
  i600.m_WrapAround = !!i601[1]
  request.r(i601[2], i601[3], 0, i600, 'm_SelectOnUp')
  request.r(i601[4], i601[5], 0, i600, 'm_SelectOnDown')
  request.r(i601[6], i601[7], 0, i600, 'm_SelectOnLeft')
  request.r(i601[8], i601[9], 0, i600, 'm_SelectOnRight')
  return i600
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i602 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i603 = data
  i602.m_NormalColor = new pc.Color(i603[0], i603[1], i603[2], i603[3])
  i602.m_HighlightedColor = new pc.Color(i603[4], i603[5], i603[6], i603[7])
  i602.m_PressedColor = new pc.Color(i603[8], i603[9], i603[10], i603[11])
  i602.m_SelectedColor = new pc.Color(i603[12], i603[13], i603[14], i603[15])
  i602.m_DisabledColor = new pc.Color(i603[16], i603[17], i603[18], i603[19])
  i602.m_ColorMultiplier = i603[20]
  i602.m_FadeDuration = i603[21]
  return i602
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i604 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i605 = data
  request.r(i605[0], i605[1], 0, i604, 'm_HighlightedSprite')
  request.r(i605[2], i605[3], 0, i604, 'm_PressedSprite')
  request.r(i605[4], i605[5], 0, i604, 'm_SelectedSprite')
  request.r(i605[6], i605[7], 0, i604, 'm_DisabledSprite')
  return i604
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i606 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i607 = data
  i606.m_NormalTrigger = i607[0]
  i606.m_HighlightedTrigger = i607[1]
  i606.m_PressedTrigger = i607[2]
  i606.m_SelectedTrigger = i607[3]
  i606.m_DisabledTrigger = i607[4]
  return i606
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i608 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i609 = data
  request.r(i609[0], i609[1], 0, i608, 'm_Texture')
  i608.m_UVRect = UnityEngine.Rect.MinMaxRect(i609[2], i609[3], i609[4], i609[5])
  request.r(i609[6], i609[7], 0, i608, 'm_Material')
  i608.m_Maskable = !!i609[8]
  i608.m_Color = new pc.Color(i609[9], i609[10], i609[11], i609[12])
  i608.m_RaycastTarget = !!i609[13]
  i608.m_RaycastPadding = new pc.Vec4( i609[14], i609[15], i609[16], i609[17] )
  return i608
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i610 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i611 = data
  i610.targetIsSelf = !!i611[0]
  request.r(i611[1], i611[2], 0, i610, 'targetGO')
  i610.tweenTargetIsTargetGO = !!i611[3]
  i610.delay = i611[4]
  i610.duration = i611[5]
  i610.easeType = i611[6]
  i610.easeCurve = new pc.AnimationCurve( { keys_flow: i611[7] } )
  i610.loopType = i611[8]
  i610.loops = i611[9]
  i610.id = i611[10]
  i610.isRelative = !!i611[11]
  i610.isFrom = !!i611[12]
  i610.isIndependentUpdate = !!i611[13]
  i610.autoKill = !!i611[14]
  i610.autoGenerate = !!i611[15]
  i610.isActive = !!i611[16]
  i610.isValid = !!i611[17]
  request.r(i611[18], i611[19], 0, i610, 'target')
  i610.animationType = i611[20]
  i610.targetType = i611[21]
  i610.forcedTargetType = i611[22]
  i610.autoPlay = !!i611[23]
  i610.useTargetAsV3 = !!i611[24]
  i610.endValueFloat = i611[25]
  i610.endValueV3 = new pc.Vec3( i611[26], i611[27], i611[28] )
  i610.endValueV2 = new pc.Vec2( i611[29], i611[30] )
  i610.endValueColor = new pc.Color(i611[31], i611[32], i611[33], i611[34])
  i610.endValueString = i611[35]
  i610.endValueRect = UnityEngine.Rect.MinMaxRect(i611[36], i611[37], i611[38], i611[39])
  request.r(i611[40], i611[41], 0, i610, 'endValueTransform')
  i610.optionalBool0 = !!i611[42]
  i610.optionalBool1 = !!i611[43]
  i610.optionalFloat0 = i611[44]
  i610.optionalInt0 = i611[45]
  i610.optionalRotationMode = i611[46]
  i610.optionalScrambleMode = i611[47]
  i610.optionalShakeRandomnessMode = i611[48]
  i610.optionalString = i611[49]
  i610.updateType = i611[50]
  i610.isSpeedBased = !!i611[51]
  i610.hasOnStart = !!i611[52]
  i610.hasOnPlay = !!i611[53]
  i610.hasOnUpdate = !!i611[54]
  i610.hasOnStepComplete = !!i611[55]
  i610.hasOnComplete = !!i611[56]
  i610.hasOnTweenCreated = !!i611[57]
  i610.hasOnRewind = !!i611[58]
  i610.onStart = request.d('UnityEngine.Events.UnityEvent', i611[59], i610.onStart)
  i610.onPlay = request.d('UnityEngine.Events.UnityEvent', i611[60], i610.onPlay)
  i610.onUpdate = request.d('UnityEngine.Events.UnityEvent', i611[61], i610.onUpdate)
  i610.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i611[62], i610.onStepComplete)
  i610.onComplete = request.d('UnityEngine.Events.UnityEvent', i611[63], i610.onComplete)
  i610.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i611[64], i610.onTweenCreated)
  i610.onRewind = request.d('UnityEngine.Events.UnityEvent', i611[65], i610.onRewind)
  return i610
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i612 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i613 = data
  i612.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i613[0], i612.m_PersistentCalls)
  return i612
}

Deserializers["TutController"] = function (request, data, root) {
  var i614 = root || request.c( 'TutController' )
  var i615 = data
  request.r(i615[0], i615[1], 0, i614, 'rt')
  request.r(i615[2], i615[3], 0, i614, 'startItem')
  request.r(i615[4], i615[5], 0, i614, 'endItem')
  i614.speedMove = i615[6]
  request.r(i615[7], i615[8], 0, i614, 'currentTarget')
  i614.startPos = new pc.Vec2( i615[9], i615[10] )
  i614.endPos = new pc.Vec2( i615[11], i615[12] )
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i617 = data
  i616.color = new pc.Color(i617[0], i617[1], i617[2], i617[3])
  request.r(i617[4], i617[5], 0, i616, 'sprite')
  i616.flipX = !!i617[6]
  i616.flipY = !!i617[7]
  i616.drawMode = i617[8]
  i616.size = new pc.Vec2( i617[9], i617[10] )
  i616.tileMode = i617[11]
  i616.adaptiveModeThreshold = i617[12]
  i616.maskInteraction = i617[13]
  i616.spriteSortPoint = i617[14]
  i616.enabled = !!i617[15]
  request.r(i617[16], i617[17], 0, i616, 'sharedMaterial')
  var i619 = i617[18]
  var i618 = []
  for(var i = 0; i < i619.length; i += 2) {
  request.r(i619[i + 0], i619[i + 1], 2, i618, '')
  }
  i616.sharedMaterials = i618
  i616.receiveShadows = !!i617[19]
  i616.shadowCastingMode = i617[20]
  i616.sortingLayerID = i617[21]
  i616.sortingOrder = i617[22]
  i616.lightmapIndex = i617[23]
  i616.lightmapSceneIndex = i617[24]
  i616.lightmapScaleOffset = new pc.Vec4( i617[25], i617[26], i617[27], i617[28] )
  i616.lightProbeUsage = i617[29]
  i616.reflectionProbeUsage = i617[30]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i623 = data
  request.r(i623[0], i623[1], 0, i622, 'animatorController')
  request.r(i623[2], i623[3], 0, i622, 'avatar')
  i622.updateMode = i623[4]
  i622.hasTransformHierarchy = !!i623[5]
  i622.applyRootMotion = !!i623[6]
  var i625 = i623[7]
  var i624 = []
  for(var i = 0; i < i625.length; i += 2) {
  request.r(i625[i + 0], i625[i + 1], 2, i624, '')
  }
  i622.humanBones = i624
  i622.enabled = !!i623[8]
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i629 = data
  request.r(i629[0], i629[1], 0, i628, 'sharedMesh')
  var i631 = i629[2]
  var i630 = []
  for(var i = 0; i < i631.length; i += 2) {
  request.r(i631[i + 0], i631[i + 1], 2, i630, '')
  }
  i628.bones = i630
  i628.updateWhenOffscreen = !!i629[3]
  i628.localBounds = i629[4]
  request.r(i629[5], i629[6], 0, i628, 'rootBone')
  var i633 = i629[7]
  var i632 = []
  for(var i = 0; i < i633.length; i += 1) {
    i632.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i633[i + 0]) );
  }
  i628.blendShapesWeights = i632
  i628.enabled = !!i629[8]
  request.r(i629[9], i629[10], 0, i628, 'sharedMaterial')
  var i635 = i629[11]
  var i634 = []
  for(var i = 0; i < i635.length; i += 2) {
  request.r(i635[i + 0], i635[i + 1], 2, i634, '')
  }
  i628.sharedMaterials = i634
  i628.receiveShadows = !!i629[12]
  i628.shadowCastingMode = i629[13]
  i628.sortingLayerID = i629[14]
  i628.sortingOrder = i629[15]
  i628.lightmapIndex = i629[16]
  i628.lightmapSceneIndex = i629[17]
  i628.lightmapScaleOffset = new pc.Vec4( i629[18], i629[19], i629[20], i629[21] )
  i628.lightProbeUsage = i629[22]
  i628.reflectionProbeUsage = i629[23]
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i639 = data
  i638.weight = i639[0]
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i641 = data
  request.r(i641[0], i641[1], 0, i640, 'sharedMesh')
  return i640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i643 = data
  request.r(i643[0], i643[1], 0, i642, 'additionalVertexStreams')
  i642.enabled = !!i643[2]
  request.r(i643[3], i643[4], 0, i642, 'sharedMaterial')
  var i645 = i643[5]
  var i644 = []
  for(var i = 0; i < i645.length; i += 2) {
  request.r(i645[i + 0], i645[i + 1], 2, i644, '')
  }
  i642.sharedMaterials = i644
  i642.receiveShadows = !!i643[6]
  i642.shadowCastingMode = i643[7]
  i642.sortingLayerID = i643[8]
  i642.sortingOrder = i643[9]
  i642.lightmapIndex = i643[10]
  i642.lightmapSceneIndex = i643[11]
  i642.lightmapScaleOffset = new pc.Vec4( i643[12], i643[13], i643[14], i643[15] )
  i642.lightProbeUsage = i643[16]
  i642.reflectionProbeUsage = i643[17]
  return i642
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i646 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i647 = data
  i646.loop = !!i647[0]
  i646.timeScale = i647[1]
  request.r(i647[2], i647[3], 0, i646, 'skeletonDataAsset')
  i646.initialSkinName = i647[4]
  i646.fixPrefabOverrideViaMeshFilter = i647[5]
  i646.initialFlipX = !!i647[6]
  i646.initialFlipY = !!i647[7]
  i646.updateWhenInvisible = i647[8]
  i646.zSpacing = i647[9]
  i646.useClipping = !!i647[10]
  i646.immutableTriangles = !!i647[11]
  i646.pmaVertexColors = !!i647[12]
  i646.clearStateOnDisable = !!i647[13]
  i646.tintBlack = !!i647[14]
  i646.singleSubmesh = !!i647[15]
  i646.fixDrawOrder = !!i647[16]
  i646.addNormals = !!i647[17]
  i646.calculateTangents = !!i647[18]
  i646.maskInteraction = i647[19]
  i646.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i647[20], i646.maskMaterials)
  i646.disableRenderingOnOverride = !!i647[21]
  i646.updateTiming = i647[22]
  i646.unscaledTime = !!i647[23]
  i646._animationName = i647[24]
  var i649 = i647[25]
  var i648 = []
  for(var i = 0; i < i649.length; i += 1) {
    i648.push( i649[i + 0] );
  }
  i646.separatorSlotNames = i648
  i646.physicsPositionInheritanceFactor = new pc.Vec2( i647[26], i647[27] )
  i646.physicsRotationInheritanceFactor = i647[28]
  request.r(i647[29], i647[30], 0, i646, 'physicsMovementRelativeTo')
  return i646
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i650 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i651 = data
  var i653 = i651[0]
  var i652 = []
  for(var i = 0; i < i653.length; i += 2) {
  request.r(i653[i + 0], i653[i + 1], 2, i652, '')
  }
  i650.materialsMaskDisabled = i652
  var i655 = i651[1]
  var i654 = []
  for(var i = 0; i < i655.length; i += 2) {
  request.r(i655[i + 0], i655[i + 1], 2, i654, '')
  }
  i650.materialsInsideMask = i654
  var i657 = i651[2]
  var i656 = []
  for(var i = 0; i < i657.length; i += 2) {
  request.r(i657[i + 0], i657[i + 1], 2, i656, '')
  }
  i650.materialsOutsideMask = i656
  return i650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i661 = data
  i660.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i661[0], i660.main)
  i660.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i661[1], i660.colorBySpeed)
  i660.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i661[2], i660.colorOverLifetime)
  i660.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i661[3], i660.emission)
  i660.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i661[4], i660.rotationBySpeed)
  i660.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i661[5], i660.rotationOverLifetime)
  i660.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i661[6], i660.shape)
  i660.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i661[7], i660.sizeBySpeed)
  i660.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i661[8], i660.sizeOverLifetime)
  i660.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i661[9], i660.textureSheetAnimation)
  i660.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i661[10], i660.velocityOverLifetime)
  i660.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i661[11], i660.noise)
  i660.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i661[12], i660.inheritVelocity)
  i660.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i661[13], i660.forceOverLifetime)
  i660.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i661[14], i660.limitVelocityOverLifetime)
  i660.useAutoRandomSeed = !!i661[15]
  i660.randomSeed = i661[16]
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i662 = root || new pc.ParticleSystemMain()
  var i663 = data
  i662.duration = i663[0]
  i662.loop = !!i663[1]
  i662.prewarm = !!i663[2]
  i662.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[3], i662.startDelay)
  i662.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[4], i662.startLifetime)
  i662.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[5], i662.startSpeed)
  i662.startSize3D = !!i663[6]
  i662.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[7], i662.startSizeX)
  i662.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[8], i662.startSizeY)
  i662.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[9], i662.startSizeZ)
  i662.startRotation3D = !!i663[10]
  i662.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[11], i662.startRotationX)
  i662.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[12], i662.startRotationY)
  i662.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[13], i662.startRotationZ)
  i662.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i663[14], i662.startColor)
  i662.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i663[15], i662.gravityModifier)
  i662.simulationSpace = i663[16]
  request.r(i663[17], i663[18], 0, i662, 'customSimulationSpace')
  i662.simulationSpeed = i663[19]
  i662.useUnscaledTime = !!i663[20]
  i662.scalingMode = i663[21]
  i662.playOnAwake = !!i663[22]
  i662.maxParticles = i663[23]
  i662.emitterVelocityMode = i663[24]
  i662.stopAction = i663[25]
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i664 = root || new pc.MinMaxCurve()
  var i665 = data
  i664.mode = i665[0]
  i664.curveMin = new pc.AnimationCurve( { keys_flow: i665[1] } )
  i664.curveMax = new pc.AnimationCurve( { keys_flow: i665[2] } )
  i664.curveMultiplier = i665[3]
  i664.constantMin = i665[4]
  i664.constantMax = i665[5]
  return i664
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i666 = root || new pc.MinMaxGradient()
  var i667 = data
  i666.mode = i667[0]
  i666.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i667[1], i666.gradientMin)
  i666.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i667[2], i666.gradientMax)
  i666.colorMin = new pc.Color(i667[3], i667[4], i667[5], i667[6])
  i666.colorMax = new pc.Color(i667[7], i667[8], i667[9], i667[10])
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i669 = data
  i668.mode = i669[0]
  var i671 = i669[1]
  var i670 = []
  for(var i = 0; i < i671.length; i += 1) {
    i670.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i671[i + 0]) );
  }
  i668.colorKeys = i670
  var i673 = i669[2]
  var i672 = []
  for(var i = 0; i < i673.length; i += 1) {
    i672.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i673[i + 0]) );
  }
  i668.alphaKeys = i672
  return i668
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i674 = root || new pc.ParticleSystemColorBySpeed()
  var i675 = data
  i674.enabled = !!i675[0]
  i674.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i675[1], i674.color)
  i674.range = new pc.Vec2( i675[2], i675[3] )
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i679 = data
  i678.color = new pc.Color(i679[0], i679[1], i679[2], i679[3])
  i678.time = i679[4]
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i683 = data
  i682.alpha = i683[0]
  i682.time = i683[1]
  return i682
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i684 = root || new pc.ParticleSystemColorOverLifetime()
  var i685 = data
  i684.enabled = !!i685[0]
  i684.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i685[1], i684.color)
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i686 = root || new pc.ParticleSystemEmitter()
  var i687 = data
  i686.enabled = !!i687[0]
  i686.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i687[1], i686.rateOverTime)
  i686.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i687[2], i686.rateOverDistance)
  var i689 = i687[3]
  var i688 = []
  for(var i = 0; i < i689.length; i += 1) {
    i688.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i689[i + 0]) );
  }
  i686.bursts = i688
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i692 = root || new pc.ParticleSystemBurst()
  var i693 = data
  i692.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i693[0], i692.count)
  i692.cycleCount = i693[1]
  i692.minCount = i693[2]
  i692.maxCount = i693[3]
  i692.repeatInterval = i693[4]
  i692.time = i693[5]
  return i692
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i694 = root || new pc.ParticleSystemRotationBySpeed()
  var i695 = data
  i694.enabled = !!i695[0]
  i694.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i695[1], i694.x)
  i694.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i695[2], i694.y)
  i694.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i695[3], i694.z)
  i694.separateAxes = !!i695[4]
  i694.range = new pc.Vec2( i695[5], i695[6] )
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i696 = root || new pc.ParticleSystemRotationOverLifetime()
  var i697 = data
  i696.enabled = !!i697[0]
  i696.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i697[1], i696.x)
  i696.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i697[2], i696.y)
  i696.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i697[3], i696.z)
  i696.separateAxes = !!i697[4]
  return i696
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i698 = root || new pc.ParticleSystemShape()
  var i699 = data
  i698.enabled = !!i699[0]
  i698.shapeType = i699[1]
  i698.randomDirectionAmount = i699[2]
  i698.sphericalDirectionAmount = i699[3]
  i698.randomPositionAmount = i699[4]
  i698.alignToDirection = !!i699[5]
  i698.radius = i699[6]
  i698.radiusMode = i699[7]
  i698.radiusSpread = i699[8]
  i698.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i699[9], i698.radiusSpeed)
  i698.radiusThickness = i699[10]
  i698.angle = i699[11]
  i698.length = i699[12]
  i698.boxThickness = new pc.Vec3( i699[13], i699[14], i699[15] )
  i698.meshShapeType = i699[16]
  request.r(i699[17], i699[18], 0, i698, 'mesh')
  request.r(i699[19], i699[20], 0, i698, 'meshRenderer')
  request.r(i699[21], i699[22], 0, i698, 'skinnedMeshRenderer')
  i698.useMeshMaterialIndex = !!i699[23]
  i698.meshMaterialIndex = i699[24]
  i698.useMeshColors = !!i699[25]
  i698.normalOffset = i699[26]
  i698.arc = i699[27]
  i698.arcMode = i699[28]
  i698.arcSpread = i699[29]
  i698.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i699[30], i698.arcSpeed)
  i698.donutRadius = i699[31]
  i698.position = new pc.Vec3( i699[32], i699[33], i699[34] )
  i698.rotation = new pc.Vec3( i699[35], i699[36], i699[37] )
  i698.scale = new pc.Vec3( i699[38], i699[39], i699[40] )
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i700 = root || new pc.ParticleSystemSizeBySpeed()
  var i701 = data
  i700.enabled = !!i701[0]
  i700.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i701[1], i700.x)
  i700.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i701[2], i700.y)
  i700.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i701[3], i700.z)
  i700.separateAxes = !!i701[4]
  i700.range = new pc.Vec2( i701[5], i701[6] )
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i702 = root || new pc.ParticleSystemSizeOverLifetime()
  var i703 = data
  i702.enabled = !!i703[0]
  i702.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[1], i702.x)
  i702.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[2], i702.y)
  i702.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i703[3], i702.z)
  i702.separateAxes = !!i703[4]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i704 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i705 = data
  i704.enabled = !!i705[0]
  i704.mode = i705[1]
  i704.animation = i705[2]
  i704.numTilesX = i705[3]
  i704.numTilesY = i705[4]
  i704.useRandomRow = !!i705[5]
  i704.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i705[6], i704.frameOverTime)
  i704.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i705[7], i704.startFrame)
  i704.cycleCount = i705[8]
  i704.rowIndex = i705[9]
  i704.flipU = i705[10]
  i704.flipV = i705[11]
  i704.spriteCount = i705[12]
  var i707 = i705[13]
  var i706 = []
  for(var i = 0; i < i707.length; i += 2) {
  request.r(i707[i + 0], i707[i + 1], 2, i706, '')
  }
  i704.sprites = i706
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i710 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i711 = data
  i710.enabled = !!i711[0]
  i710.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[1], i710.x)
  i710.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[2], i710.y)
  i710.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[3], i710.z)
  i710.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[4], i710.radial)
  i710.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[5], i710.speedModifier)
  i710.space = i711[6]
  i710.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[7], i710.orbitalX)
  i710.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[8], i710.orbitalY)
  i710.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[9], i710.orbitalZ)
  i710.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[10], i710.orbitalOffsetX)
  i710.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[11], i710.orbitalOffsetY)
  i710.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i711[12], i710.orbitalOffsetZ)
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i712 = root || new pc.ParticleSystemNoise()
  var i713 = data
  i712.enabled = !!i713[0]
  i712.separateAxes = !!i713[1]
  i712.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[2], i712.strengthX)
  i712.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[3], i712.strengthY)
  i712.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[4], i712.strengthZ)
  i712.frequency = i713[5]
  i712.damping = !!i713[6]
  i712.octaveCount = i713[7]
  i712.octaveMultiplier = i713[8]
  i712.octaveScale = i713[9]
  i712.quality = i713[10]
  i712.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[11], i712.scrollSpeed)
  i712.scrollSpeedMultiplier = i713[12]
  i712.remapEnabled = !!i713[13]
  i712.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[14], i712.remapX)
  i712.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[15], i712.remapY)
  i712.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[16], i712.remapZ)
  i712.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[17], i712.positionAmount)
  i712.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[18], i712.rotationAmount)
  i712.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i713[19], i712.sizeAmount)
  return i712
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i714 = root || new pc.ParticleSystemInheritVelocity()
  var i715 = data
  i714.enabled = !!i715[0]
  i714.mode = i715[1]
  i714.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i715[2], i714.curve)
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i716 = root || new pc.ParticleSystemForceOverLifetime()
  var i717 = data
  i716.enabled = !!i717[0]
  i716.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i717[1], i716.x)
  i716.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i717[2], i716.y)
  i716.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i717[3], i716.z)
  i716.space = i717[4]
  i716.randomized = !!i717[5]
  return i716
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i718 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i719 = data
  i718.enabled = !!i719[0]
  i718.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i719[1], i718.limit)
  i718.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i719[2], i718.limitX)
  i718.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i719[3], i718.limitY)
  i718.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i719[4], i718.limitZ)
  i718.dampen = i719[5]
  i718.separateAxes = !!i719[6]
  i718.space = i719[7]
  i718.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i719[8], i718.drag)
  i718.multiplyDragByParticleSize = !!i719[9]
  i718.multiplyDragByParticleVelocity = !!i719[10]
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i721 = data
  request.r(i721[0], i721[1], 0, i720, 'mesh')
  i720.meshCount = i721[2]
  i720.activeVertexStreamsCount = i721[3]
  i720.alignment = i721[4]
  i720.renderMode = i721[5]
  i720.sortMode = i721[6]
  i720.lengthScale = i721[7]
  i720.velocityScale = i721[8]
  i720.cameraVelocityScale = i721[9]
  i720.normalDirection = i721[10]
  i720.sortingFudge = i721[11]
  i720.minParticleSize = i721[12]
  i720.maxParticleSize = i721[13]
  i720.pivot = new pc.Vec3( i721[14], i721[15], i721[16] )
  request.r(i721[17], i721[18], 0, i720, 'trailMaterial')
  i720.applyActiveColorSpace = !!i721[19]
  i720.enabled = !!i721[20]
  request.r(i721[21], i721[22], 0, i720, 'sharedMaterial')
  var i723 = i721[23]
  var i722 = []
  for(var i = 0; i < i723.length; i += 2) {
  request.r(i723[i + 0], i723[i + 1], 2, i722, '')
  }
  i720.sharedMaterials = i722
  i720.receiveShadows = !!i721[24]
  i720.shadowCastingMode = i721[25]
  i720.sortingLayerID = i721[26]
  i720.sortingOrder = i721[27]
  i720.lightmapIndex = i721[28]
  i720.lightmapSceneIndex = i721[29]
  i720.lightmapScaleOffset = new pc.Vec4( i721[30], i721[31], i721[32], i721[33] )
  i720.lightProbeUsage = i721[34]
  i720.reflectionProbeUsage = i721[35]
  return i720
}

Deserializers["GameController"] = function (request, data, root) {
  var i724 = root || request.c( 'GameController' )
  var i725 = data
  i724.OnSwitchItem = request.d('System.Action', i725[0], i724.OnSwitchItem)
  var i727 = i725[1]
  var i726 = new (System.Collections.Generic.List$1(Bridge.ns('ItemButton')))
  for(var i = 0; i < i727.length; i += 1) {
    i726.add(request.d('ItemButton', i727[i + 0]));
  }
  i724.item1Buttons = i726
  var i729 = i725[2]
  var i728 = new (System.Collections.Generic.List$1(Bridge.ns('ItemButton')))
  for(var i = 0; i < i729.length; i += 1) {
    i728.add(request.d('ItemButton', i729[i + 0]));
  }
  i724.item2Buttons = i728
  request.r(i725[3], i725[4], 0, i724, 'type1')
  request.r(i725[5], i725[6], 0, i724, 'type2')
  request.r(i725[7], i725[8], 0, i724, 'effect')
  request.r(i725[9], i725[10], 0, i724, 'pTut')
  request.r(i725[11], i725[12], 0, i724, 'lTut')
  return i724
}

Deserializers["System.Action"] = function (request, data, root) {
  var i730 = root || request.c( 'System.Action' )
  var i731 = data
  return i730
}

Deserializers["ItemButton"] = function (request, data, root) {
  var i734 = root || request.c( 'ItemButton' )
  var i735 = data
  request.r(i735[0], i735[1], 0, i734, 'Button1')
  request.r(i735[2], i735[3], 0, i734, 'bg1')
  request.r(i735[4], i735[5], 0, i734, 'Button2')
  request.r(i735[6], i735[7], 0, i734, 'bg2')
  request.r(i735[8], i735[9], 0, i734, 'Item')
  return i734
}

Deserializers["LunaController"] = function (request, data, root) {
  var i736 = root || request.c( 'LunaController' )
  var i737 = data
  i736.TimePlay = i737[0]
  i736.CountPlay = i737[1]
  request.r(i737[2], i737[3], 0, i736, 'LogoGame')
  i736.BGColor = new pc.Color(i737[4], i737[5], i737[6], i737[7])
  i736.TitleTextColor = new pc.Color(i737[8], i737[9], i737[10], i737[11])
  i736.OKTextColor = new pc.Color(i737[12], i737[13], i737[14], i737[15])
  request.r(i737[16], i737[17], 0, i736, 'logo')
  request.r(i737[18], i737[19], 0, i736, 'BG')
  request.r(i737[20], i737[21], 0, i736, 'titleText')
  request.r(i737[22], i737[23], 0, i736, 'OKText')
  request.r(i737[24], i737[25], 0, i736, 'endCard')
  var i739 = i737[26]
  var i738 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 1, i738, '')
  }
  i736.CTA = i738
  return i736
}

Deserializers["AudioController"] = function (request, data, root) {
  var i742 = root || request.c( 'AudioController' )
  var i743 = data
  i742.MusicVolume = i743[0]
  request.r(i743[1], i743[2], 0, i742, 'BGM')
  request.r(i743[3], i743[4], 0, i742, 'musicSource')
  request.r(i743[5], i743[6], 0, i742, 'effectSound1')
  request.r(i743[7], i743[8], 0, i742, 'effectSound2')
  request.r(i743[9], i743[10], 0, i742, 'SFXPool')
  return i742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i745 = data
  request.r(i745[0], i745[1], 0, i744, 'clip')
  request.r(i745[2], i745[3], 0, i744, 'outputAudioMixerGroup')
  i744.playOnAwake = !!i745[4]
  i744.loop = !!i745[5]
  i744.time = i745[6]
  i744.volume = i745[7]
  i744.pitch = i745[8]
  i744.enabled = !!i745[9]
  return i744
}

Deserializers["UIController"] = function (request, data, root) {
  var i746 = root || request.c( 'UIController' )
  var i747 = data
  request.r(i747[0], i747[1], 0, i746, 'model')
  i746.PPos = new pc.Vec3( i747[2], i747[3], i747[4] )
  i746.LPos = new pc.Vec3( i747[5], i747[6], i747[7] )
  request.r(i747[8], i747[9], 0, i746, 'p')
  request.r(i747[10], i747[11], 0, i746, 'l')
  request.r(i747[12], i747[13], 0, i746, 'title')
  request.r(i747[14], i747[15], 0, i746, 'logo')
  request.r(i747[16], i747[17], 0, i746, 'CTA')
  request.r(i747[18], i747[19], 0, i746, 'OK')
  i746.pTitlePos = new pc.Vec2( i747[20], i747[21] )
  i746.lTitlePos = new pc.Vec2( i747[22], i747[23] )
  i746.pLogoPos = new pc.Vec2( i747[24], i747[25] )
  i746.lLogoPos = new pc.Vec2( i747[26], i747[27] )
  i746.pCTAPos = new pc.Vec2( i747[28], i747[29] )
  i746.lCTAPos = new pc.Vec2( i747[30], i747[31] )
  i746.pOKPos = new pc.Vec2( i747[32], i747[33] )
  i746.lOKPos = new pc.Vec2( i747[34], i747[35] )
  return i746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i749 = data
  i748.ambientIntensity = i749[0]
  i748.reflectionIntensity = i749[1]
  i748.ambientMode = i749[2]
  i748.ambientLight = new pc.Color(i749[3], i749[4], i749[5], i749[6])
  i748.ambientSkyColor = new pc.Color(i749[7], i749[8], i749[9], i749[10])
  i748.ambientGroundColor = new pc.Color(i749[11], i749[12], i749[13], i749[14])
  i748.ambientEquatorColor = new pc.Color(i749[15], i749[16], i749[17], i749[18])
  i748.fogColor = new pc.Color(i749[19], i749[20], i749[21], i749[22])
  i748.fogEndDistance = i749[23]
  i748.fogStartDistance = i749[24]
  i748.fogDensity = i749[25]
  i748.fog = !!i749[26]
  request.r(i749[27], i749[28], 0, i748, 'skybox')
  i748.fogMode = i749[29]
  var i751 = i749[30]
  var i750 = []
  for(var i = 0; i < i751.length; i += 1) {
    i750.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i751[i + 0]) );
  }
  i748.lightmaps = i750
  i748.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i749[31], i748.lightProbes)
  i748.lightmapsMode = i749[32]
  i748.mixedBakeMode = i749[33]
  i748.environmentLightingMode = i749[34]
  i748.ambientProbe = new pc.SphericalHarmonicsL2(i749[35])
  request.r(i749[36], i749[37], 0, i748, 'customReflection')
  request.r(i749[38], i749[39], 0, i748, 'defaultReflection')
  i748.defaultReflectionMode = i749[40]
  i748.defaultReflectionResolution = i749[41]
  i748.sunLightObjectId = i749[42]
  i748.pixelLightCount = i749[43]
  i748.defaultReflectionHDR = !!i749[44]
  i748.hasLightDataAsset = !!i749[45]
  i748.hasManualGenerate = !!i749[46]
  return i748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i755 = data
  request.r(i755[0], i755[1], 0, i754, 'lightmapColor')
  request.r(i755[2], i755[3], 0, i754, 'lightmapDirection')
  request.r(i755[4], i755[5], 0, i754, 'shadowMask')
  return i754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i756 = root || new UnityEngine.LightProbes()
  var i757 = data
  return i756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i764 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i765 = data
  var i767 = i765[0]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i767.length; i += 1) {
    i766.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i767[i + 0]));
  }
  i764.ShaderCompilationErrors = i766
  i764.name = i765[1]
  i764.guid = i765[2]
  var i769 = i765[3]
  var i768 = []
  for(var i = 0; i < i769.length; i += 1) {
    i768.push( i769[i + 0] );
  }
  i764.shaderDefinedKeywords = i768
  var i771 = i765[4]
  var i770 = []
  for(var i = 0; i < i771.length; i += 1) {
    i770.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i771[i + 0]) );
  }
  i764.passes = i770
  var i773 = i765[5]
  var i772 = []
  for(var i = 0; i < i773.length; i += 1) {
    i772.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i773[i + 0]) );
  }
  i764.usePasses = i772
  var i775 = i765[6]
  var i774 = []
  for(var i = 0; i < i775.length; i += 1) {
    i774.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i775[i + 0]) );
  }
  i764.defaultParameterValues = i774
  request.r(i765[7], i765[8], 0, i764, 'unityFallbackShader')
  i764.readDepth = !!i765[9]
  i764.hasDepthOnlyPass = !!i765[10]
  i764.isCreatedByShaderGraph = !!i765[11]
  i764.disableBatching = !!i765[12]
  i764.compiled = !!i765[13]
  return i764
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i779 = data
  i778.shaderName = i779[0]
  i778.errorMessage = i779[1]
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i782 = root || new pc.UnityShaderPass()
  var i783 = data
  i782.id = i783[0]
  i782.subShaderIndex = i783[1]
  i782.name = i783[2]
  i782.passType = i783[3]
  i782.grabPassTextureName = i783[4]
  i782.usePass = !!i783[5]
  i782.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[6], i782.zTest)
  i782.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[7], i782.zWrite)
  i782.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[8], i782.culling)
  i782.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i783[9], i782.blending)
  i782.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i783[10], i782.alphaBlending)
  i782.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[11], i782.colorWriteMask)
  i782.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[12], i782.offsetUnits)
  i782.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[13], i782.offsetFactor)
  i782.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[14], i782.stencilRef)
  i782.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[15], i782.stencilReadMask)
  i782.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i783[16], i782.stencilWriteMask)
  i782.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i783[17], i782.stencilOp)
  i782.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i783[18], i782.stencilOpFront)
  i782.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i783[19], i782.stencilOpBack)
  var i785 = i783[20]
  var i784 = []
  for(var i = 0; i < i785.length; i += 1) {
    i784.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i785[i + 0]) );
  }
  i782.tags = i784
  var i787 = i783[21]
  var i786 = []
  for(var i = 0; i < i787.length; i += 1) {
    i786.push( i787[i + 0] );
  }
  i782.passDefinedKeywords = i786
  var i789 = i783[22]
  var i788 = []
  for(var i = 0; i < i789.length; i += 1) {
    i788.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i789[i + 0]) );
  }
  i782.passDefinedKeywordGroups = i788
  var i791 = i783[23]
  var i790 = []
  for(var i = 0; i < i791.length; i += 1) {
    i790.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i791[i + 0]) );
  }
  i782.variants = i790
  var i793 = i783[24]
  var i792 = []
  for(var i = 0; i < i793.length; i += 1) {
    i792.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i793[i + 0]) );
  }
  i782.excludedVariants = i792
  i782.hasDepthReader = !!i783[25]
  return i782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i795 = data
  i794.val = i795[0]
  i794.name = i795[1]
  return i794
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i797 = data
  i796.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i797[0], i796.src)
  i796.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i797[1], i796.dst)
  i796.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i797[2], i796.op)
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i798 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i799 = data
  i798.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i799[0], i798.pass)
  i798.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i799[1], i798.fail)
  i798.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i799[2], i798.zFail)
  i798.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i799[3], i798.comp)
  return i798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i803 = data
  i802.name = i803[0]
  i802.value = i803[1]
  return i802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i807 = data
  var i809 = i807[0]
  var i808 = []
  for(var i = 0; i < i809.length; i += 1) {
    i808.push( i809[i + 0] );
  }
  i806.keywords = i808
  i806.hasDiscard = !!i807[1]
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i813 = data
  i812.passId = i813[0]
  i812.subShaderIndex = i813[1]
  var i815 = i813[2]
  var i814 = []
  for(var i = 0; i < i815.length; i += 1) {
    i814.push( i815[i + 0] );
  }
  i812.keywords = i814
  i812.vertexProgram = i813[3]
  i812.fragmentProgram = i813[4]
  i812.exportedForWebGl2 = !!i813[5]
  i812.readDepth = !!i813[6]
  return i812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i819 = data
  request.r(i819[0], i819[1], 0, i818, 'shader')
  i818.pass = i819[2]
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i823 = data
  i822.name = i823[0]
  i822.type = i823[1]
  i822.value = new pc.Vec4( i823[2], i823[3], i823[4], i823[5] )
  i822.textureValue = i823[6]
  i822.shaderPropertyFlag = i823[7]
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i824 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i825 = data
  i824.name = i825[0]
  request.r(i825[1], i825[2], 0, i824, 'texture')
  i824.aabb = i825[3]
  i824.vertices = i825[4]
  i824.triangles = i825[5]
  i824.textureRect = UnityEngine.Rect.MinMaxRect(i825[6], i825[7], i825[8], i825[9])
  i824.packedRect = UnityEngine.Rect.MinMaxRect(i825[10], i825[11], i825[12], i825[13])
  i824.border = new pc.Vec4( i825[14], i825[15], i825[16], i825[17] )
  i824.transparency = i825[18]
  i824.bounds = i825[19]
  i824.pixelsPerUnit = i825[20]
  i824.textureWidth = i825[21]
  i824.textureHeight = i825[22]
  i824.nativeSize = new pc.Vec2( i825[23], i825[24] )
  i824.pivot = new pc.Vec2( i825[25], i825[26] )
  i824.textureRectOffset = new pc.Vec2( i825[27], i825[28] )
  return i824
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i827 = data
  i826.name = i827[0]
  return i826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i829 = data
  i828.name = i829[0]
  i828.ascent = i829[1]
  i828.originalLineHeight = i829[2]
  i828.fontSize = i829[3]
  var i831 = i829[4]
  var i830 = []
  for(var i = 0; i < i831.length; i += 1) {
    i830.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i831[i + 0]) );
  }
  i828.characterInfo = i830
  request.r(i829[5], i829[6], 0, i828, 'texture')
  i828.originalFontSize = i829[7]
  return i828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i835 = data
  i834.index = i835[0]
  i834.advance = i835[1]
  i834.bearing = i835[2]
  i834.glyphWidth = i835[3]
  i834.glyphHeight = i835[4]
  i834.minX = i835[5]
  i834.maxX = i835[6]
  i834.minY = i835[7]
  i834.maxY = i835[8]
  i834.uvBottomLeftX = i835[9]
  i834.uvBottomLeftY = i835[10]
  i834.uvBottomRightX = i835[11]
  i834.uvBottomRightY = i835[12]
  i834.uvTopLeftX = i835[13]
  i834.uvTopLeftY = i835[14]
  i834.uvTopRightX = i835[15]
  i834.uvTopRightY = i835[16]
  return i834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i837 = data
  i836.name = i837[0]
  i836.bytes64 = i837[1]
  i836.data = i837[2]
  return i836
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i838 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i839 = data
  var i841 = i839[0]
  var i840 = []
  for(var i = 0; i < i841.length; i += 2) {
  request.r(i841[i + 0], i841[i + 1], 2, i840, '')
  }
  i838.atlasAssets = i840
  i838.scale = i839[1]
  request.r(i839[2], i839[3], 0, i838, 'skeletonJSON')
  i838.isUpgradingBlendModeMaterials = !!i839[4]
  i838.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i839[5], i838.blendModeMaterials)
  var i843 = i839[6]
  var i842 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i843.length; i += 2) {
  request.r(i843[i + 0], i843[i + 1], 1, i842, '')
  }
  i838.skeletonDataModifiers = i842
  var i845 = i839[7]
  var i844 = []
  for(var i = 0; i < i845.length; i += 1) {
    i844.push( i845[i + 0] );
  }
  i838.fromAnimation = i844
  var i847 = i839[8]
  var i846 = []
  for(var i = 0; i < i847.length; i += 1) {
    i846.push( i847[i + 0] );
  }
  i838.toAnimation = i846
  i838.duration = i839[9]
  i838.defaultMix = i839[10]
  request.r(i839[11], i839[12], 0, i838, 'controller')
  return i838
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i850 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i851 = data
  i850.applyAdditiveMaterial = !!i851[0]
  var i853 = i851[1]
  var i852 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i853.length; i += 1) {
    i852.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i853[i + 0]));
  }
  i850.additiveMaterials = i852
  var i855 = i851[2]
  var i854 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i855.length; i += 1) {
    i854.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i855[i + 0]));
  }
  i850.multiplyMaterials = i854
  var i857 = i851[3]
  var i856 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i857.length; i += 1) {
    i856.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i857[i + 0]));
  }
  i850.screenMaterials = i856
  i850.requiresBlendModeMaterials = !!i851[4]
  return i850
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i860 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i861 = data
  i860.pageName = i861[0]
  request.r(i861[1], i861[2], 0, i860, 'material')
  return i860
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i864 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i865 = data
  request.r(i865[0], i865[1], 0, i864, 'atlasFile')
  var i867 = i865[2]
  var i866 = []
  for(var i = 0; i < i867.length; i += 2) {
  request.r(i867[i + 0], i867[i + 1], 2, i866, '')
  }
  i864.materials = i866
  i864.textureLoadingMode = i865[3]
  request.r(i865[4], i865[5], 0, i864, 'onDemandTextureLoader')
  return i864
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i868 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i869 = data
  i868.useSafeMode = !!i869[0]
  i868.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i869[1], i868.safeModeOptions)
  i868.timeScale = i869[2]
  i868.unscaledTimeScale = i869[3]
  i868.useSmoothDeltaTime = !!i869[4]
  i868.maxSmoothUnscaledTime = i869[5]
  i868.rewindCallbackMode = i869[6]
  i868.showUnityEditorReport = !!i869[7]
  i868.logBehaviour = i869[8]
  i868.drawGizmos = !!i869[9]
  i868.defaultRecyclable = !!i869[10]
  i868.defaultAutoPlay = i869[11]
  i868.defaultUpdateType = i869[12]
  i868.defaultTimeScaleIndependent = !!i869[13]
  i868.defaultEaseType = i869[14]
  i868.defaultEaseOvershootOrAmplitude = i869[15]
  i868.defaultEasePeriod = i869[16]
  i868.defaultAutoKill = !!i869[17]
  i868.defaultLoopType = i869[18]
  i868.debugMode = !!i869[19]
  i868.debugStoreTargetId = !!i869[20]
  i868.showPreviewPanel = !!i869[21]
  i868.storeSettingsLocation = i869[22]
  i868.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i869[23], i868.modules)
  i868.createASMDEF = !!i869[24]
  i868.showPlayingTweens = !!i869[25]
  i868.showPausedTweens = !!i869[26]
  return i868
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i870 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i871 = data
  i870.logBehaviour = i871[0]
  i870.nestedTweenFailureBehaviour = i871[1]
  return i870
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i872 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i873 = data
  i872.showPanel = !!i873[0]
  i872.audioEnabled = !!i873[1]
  i872.physicsEnabled = !!i873[2]
  i872.physics2DEnabled = !!i873[3]
  i872.spriteEnabled = !!i873[4]
  i872.uiEnabled = !!i873[5]
  i872.textMeshProEnabled = !!i873[6]
  i872.tk2DEnabled = !!i873[7]
  i872.deAudioEnabled = !!i873[8]
  i872.deUnityExtendedEnabled = !!i873[9]
  i872.epoOutlineEnabled = !!i873[10]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i875 = data
  var i877 = i875[0]
  var i876 = []
  for(var i = 0; i < i877.length; i += 1) {
    i876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i877[i + 0]) );
  }
  i874.files = i876
  i874.componentToPrefabIds = i875[1]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i881 = data
  i880.path = i881[0]
  request.r(i881[1], i881[2], 0, i880, 'unityObject')
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i883 = data
  var i885 = i883[0]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i885[i + 0]) );
  }
  i882.scriptsExecutionOrder = i884
  var i887 = i883[1]
  var i886 = []
  for(var i = 0; i < i887.length; i += 1) {
    i886.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i887[i + 0]) );
  }
  i882.sortingLayers = i886
  var i889 = i883[2]
  var i888 = []
  for(var i = 0; i < i889.length; i += 1) {
    i888.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i889[i + 0]) );
  }
  i882.cullingLayers = i888
  i882.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i883[3], i882.timeSettings)
  i882.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i883[4], i882.physicsSettings)
  i882.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i883[5], i882.physics2DSettings)
  i882.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i883[6], i882.qualitySettings)
  i882.enableRealtimeShadows = !!i883[7]
  i882.enableAutoInstancing = !!i883[8]
  i882.enableStaticBatching = !!i883[9]
  i882.enableDynamicBatching = !!i883[10]
  i882.usePreservativeDynamicBatching = !!i883[11]
  i882.lightmapEncodingQuality = i883[12]
  i882.desiredColorSpace = i883[13]
  var i891 = i883[14]
  var i890 = []
  for(var i = 0; i < i891.length; i += 1) {
    i890.push( i891[i + 0] );
  }
  i882.allTags = i890
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i895 = data
  i894.name = i895[0]
  i894.value = i895[1]
  return i894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i899 = data
  i898.id = i899[0]
  i898.name = i899[1]
  i898.value = i899[2]
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i903 = data
  i902.id = i903[0]
  i902.name = i903[1]
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i905 = data
  i904.fixedDeltaTime = i905[0]
  i904.maximumDeltaTime = i905[1]
  i904.timeScale = i905[2]
  i904.maximumParticleTimestep = i905[3]
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i907 = data
  i906.gravity = new pc.Vec3( i907[0], i907[1], i907[2] )
  i906.defaultSolverIterations = i907[3]
  i906.bounceThreshold = i907[4]
  i906.autoSyncTransforms = !!i907[5]
  i906.autoSimulation = !!i907[6]
  var i909 = i907[7]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i909[i + 0]) );
  }
  i906.collisionMatrix = i908
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i913 = data
  i912.enabled = !!i913[0]
  i912.layerId = i913[1]
  i912.otherLayerId = i913[2]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i915 = data
  request.r(i915[0], i915[1], 0, i914, 'material')
  i914.gravity = new pc.Vec2( i915[2], i915[3] )
  i914.positionIterations = i915[4]
  i914.velocityIterations = i915[5]
  i914.velocityThreshold = i915[6]
  i914.maxLinearCorrection = i915[7]
  i914.maxAngularCorrection = i915[8]
  i914.maxTranslationSpeed = i915[9]
  i914.maxRotationSpeed = i915[10]
  i914.baumgarteScale = i915[11]
  i914.baumgarteTOIScale = i915[12]
  i914.timeToSleep = i915[13]
  i914.linearSleepTolerance = i915[14]
  i914.angularSleepTolerance = i915[15]
  i914.defaultContactOffset = i915[16]
  i914.autoSimulation = !!i915[17]
  i914.queriesHitTriggers = !!i915[18]
  i914.queriesStartInColliders = !!i915[19]
  i914.callbacksOnDisable = !!i915[20]
  i914.reuseCollisionCallbacks = !!i915[21]
  i914.autoSyncTransforms = !!i915[22]
  var i917 = i915[23]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i917[i + 0]) );
  }
  i914.collisionMatrix = i916
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i921 = data
  i920.enabled = !!i921[0]
  i920.layerId = i921[1]
  i920.otherLayerId = i921[2]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i923 = data
  var i925 = i923[0]
  var i924 = []
  for(var i = 0; i < i925.length; i += 1) {
    i924.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i925[i + 0]) );
  }
  i922.qualityLevels = i924
  var i927 = i923[1]
  var i926 = []
  for(var i = 0; i < i927.length; i += 1) {
    i926.push( i927[i + 0] );
  }
  i922.names = i926
  i922.shadows = i923[2]
  i922.anisotropicFiltering = i923[3]
  i922.antiAliasing = i923[4]
  i922.lodBias = i923[5]
  i922.shadowCascades = i923[6]
  i922.shadowDistance = i923[7]
  i922.shadowmaskMode = i923[8]
  i922.shadowProjection = i923[9]
  i922.shadowResolution = i923[10]
  i922.softParticles = !!i923[11]
  i922.softVegetation = !!i923[12]
  i922.activeColorSpace = i923[13]
  i922.desiredColorSpace = i923[14]
  i922.masterTextureLimit = i923[15]
  i922.maxQueuedFrames = i923[16]
  i922.particleRaycastBudget = i923[17]
  i922.pixelLightCount = i923[18]
  i922.realtimeReflectionProbes = !!i923[19]
  i922.shadowCascade2Split = i923[20]
  i922.shadowCascade4Split = new pc.Vec3( i923[21], i923[22], i923[23] )
  i922.streamingMipmapsActive = !!i923[24]
  i922.vSyncCount = i923[25]
  i922.asyncUploadBufferSize = i923[26]
  i922.asyncUploadTimeSlice = i923[27]
  i922.billboardsFaceCameraPosition = !!i923[28]
  i922.shadowNearPlaneOffset = i923[29]
  i922.streamingMipmapsMemoryBudget = i923[30]
  i922.maximumLODLevel = i923[31]
  i922.streamingMipmapsAddAllCameras = !!i923[32]
  i922.streamingMipmapsMaxLevelReduction = i923[33]
  i922.streamingMipmapsRenderersPerFrame = i923[34]
  i922.resolutionScalingFixedDPIFactor = i923[35]
  i922.streamingMipmapsMaxFileIORequests = i923[36]
  i922.currentQualityLevel = i923[37]
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i931 = data
  i930.name = i931[0]
  var i933 = i931[1]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i933[i + 0]) );
  }
  i930.tos = i932
  var i935 = i931[2]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( i935[i + 0] );
  }
  i930.constant = i934
  i930.isValid = !!i931[3]
  i930.isHuman = !!i931[4]
  i930.hasRootMotion = !!i931[5]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i939 = data
  i938.hash = i939[0]
  i938.path = i939[1]
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i945 = data
  i944.weight = i945[0]
  i944.vertices = i945[1]
  i944.normals = i945[2]
  i944.tangents = i945[3]
  return i944
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i946 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i947 = data
  request.r(i947[0], i947[1], 0, i946, 'm_ObjectArgument')
  i946.m_ObjectArgumentAssemblyTypeName = i947[2]
  i946.m_IntArgument = i947[3]
  i946.m_FloatArgument = i947[4]
  i946.m_StringArgument = i947[5]
  i946.m_BoolArgument = !!i947[6]
  return i946
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Components.Animator":{"animatorController":0,"avatar":2,"updateMode":4,"hasTransformHierarchy":5,"applyRootMotion":6,"humanBones":7,"enabled":8},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar":{"name":0,"tos":1,"constant":2,"isValid":3,"isHuman":4,"hasRootMotion":5},"Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair":{"hash":0,"path":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[27],"54":[2],"55":[56],"57":[56],"58":[56],"59":[56],"60":[56],"61":[56],"62":[63],"64":[63],"65":[63],"66":[63],"67":[63],"68":[63],"69":[63],"70":[63],"71":[63],"72":[63],"73":[63],"74":[63],"75":[63],"76":[2],"77":[30],"78":[79],"80":[79],"9":[8],"81":[82],"83":[8],"84":[12,8],"31":[30],"85":[12,8],"86":[24,30],"87":[30,29],"88":[30],"89":[56],"90":[63],"91":[82],"92":[93],"94":[8],"95":[12,8],"96":[30],"97":[12,8],"98":[8],"99":[8],"100":[30,8],"101":[8,12],"102":[103],"104":[103],"105":[103],"106":[8],"107":[8],"11":[9],"13":[12,8],"108":[8],"10":[9],"109":[8],"110":[8],"111":[8],"112":[8],"113":[8],"114":[8],"115":[8],"116":[8],"117":[8],"18":[12,8],"118":[8],"119":[8],"120":[8],"121":[8],"15":[12,8],"122":[8],"123":[5],"124":[5],"6":[5],"125":[5],"126":[2],"127":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.UI.Button","UnityEngine.UI.RawImage","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","TutController","UnityEngine.SpriteRenderer","UnityEngine.Material","UnityEngine.Animator","UnityEngine.Avatar","UnityEngine.Transform","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","Spine.Unity.SkeletonDataAsset","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","GameController","UnityEngine.GameObject","LunaController","AudioController","UnityEngine.AudioClip","UnityEngine.AudioSource","UIController","UnityEngine.Cubemap","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonMecanim","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.SkeletonRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.76f1";

Deserializers.productName = "PEOP_Luna-PEOP_V33";

Deserializers.lunaInitializationTime = "06/11/2026 09:44:01";

Deserializers.lunaDaysRunning = "0.8";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "PEOP_V33_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

Deserializers.projectId = "847bc6bbecf48de4281c00eb1df142fe";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "True";

Deserializers.runtimeAnalysisExcludedClassesCount = "1909";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5245";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_LunaPEOP_V33";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "daf45e6f-8b40-476c-abe2-7904042c6176";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

