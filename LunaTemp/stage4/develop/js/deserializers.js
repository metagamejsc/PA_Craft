var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1368 = root || request.c( 'UnityEngine.JointSpring' )
  var i1369 = data
  i1368.spring = i1369[0]
  i1368.damper = i1369[1]
  i1368.targetPosition = i1369[2]
  return i1368
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1370 = root || request.c( 'UnityEngine.JointMotor' )
  var i1371 = data
  i1370.m_TargetVelocity = i1371[0]
  i1370.m_Force = i1371[1]
  i1370.m_FreeSpin = i1371[2]
  return i1370
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1372 = root || request.c( 'UnityEngine.JointLimits' )
  var i1373 = data
  i1372.m_Min = i1373[0]
  i1372.m_Max = i1373[1]
  i1372.m_Bounciness = i1373[2]
  i1372.m_BounceMinVelocity = i1373[3]
  i1372.m_ContactDistance = i1373[4]
  i1372.minBounce = i1373[5]
  i1372.maxBounce = i1373[6]
  return i1372
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1374 = root || request.c( 'UnityEngine.JointDrive' )
  var i1375 = data
  i1374.m_PositionSpring = i1375[0]
  i1374.m_PositionDamper = i1375[1]
  i1374.m_MaximumForce = i1375[2]
  i1374.m_UseAcceleration = i1375[3]
  return i1374
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1376 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1377 = data
  i1376.m_Spring = i1377[0]
  i1376.m_Damper = i1377[1]
  return i1376
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1378 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1379 = data
  i1378.m_Limit = i1379[0]
  i1378.m_Bounciness = i1379[1]
  i1378.m_ContactDistance = i1379[2]
  return i1378
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1380 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1381 = data
  i1380.m_ExtremumSlip = i1381[0]
  i1380.m_ExtremumValue = i1381[1]
  i1380.m_AsymptoteSlip = i1381[2]
  i1380.m_AsymptoteValue = i1381[3]
  i1380.m_Stiffness = i1381[4]
  return i1380
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1382 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1383 = data
  i1382.m_LowerAngle = i1383[0]
  i1382.m_UpperAngle = i1383[1]
  return i1382
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1384 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1385 = data
  i1384.m_MotorSpeed = i1385[0]
  i1384.m_MaximumMotorTorque = i1385[1]
  return i1384
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1386 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1387 = data
  i1386.m_DampingRatio = i1387[0]
  i1386.m_Frequency = i1387[1]
  i1386.m_Angle = i1387[2]
  return i1386
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1388 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1389 = data
  i1388.m_LowerTranslation = i1389[0]
  i1388.m_UpperTranslation = i1389[1]
  return i1388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1390 = root || new pc.UnityMaterial()
  var i1391 = data
  i1390.name = i1391[0]
  request.r(i1391[1], i1391[2], 0, i1390, 'shader')
  i1390.renderQueue = i1391[3]
  i1390.enableInstancing = !!i1391[4]
  var i1393 = i1391[5]
  var i1392 = []
  for(var i = 0; i < i1393.length; i += 1) {
    i1392.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1393[i + 0]) );
  }
  i1390.floatParameters = i1392
  var i1395 = i1391[6]
  var i1394 = []
  for(var i = 0; i < i1395.length; i += 1) {
    i1394.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1395[i + 0]) );
  }
  i1390.colorParameters = i1394
  var i1397 = i1391[7]
  var i1396 = []
  for(var i = 0; i < i1397.length; i += 1) {
    i1396.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1397[i + 0]) );
  }
  i1390.vectorParameters = i1396
  var i1399 = i1391[8]
  var i1398 = []
  for(var i = 0; i < i1399.length; i += 1) {
    i1398.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1399[i + 0]) );
  }
  i1390.textureParameters = i1398
  var i1401 = i1391[9]
  var i1400 = []
  for(var i = 0; i < i1401.length; i += 1) {
    i1400.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1401[i + 0]) );
  }
  i1390.materialFlags = i1400
  return i1390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1405 = data
  i1404.name = i1405[0]
  i1404.value = i1405[1]
  return i1404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1408 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1409 = data
  i1408.name = i1409[0]
  i1408.value = new pc.Color(i1409[1], i1409[2], i1409[3], i1409[4])
  return i1408
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1413 = data
  i1412.name = i1413[0]
  i1412.value = new pc.Vec4( i1413[1], i1413[2], i1413[3], i1413[4] )
  return i1412
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1417 = data
  i1416.name = i1417[0]
  request.r(i1417[1], i1417[2], 0, i1416, 'value')
  return i1416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1421 = data
  i1420.name = i1421[0]
  i1420.enabled = !!i1421[1]
  return i1420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1422 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1423 = data
  i1422.name = i1423[0]
  i1422.width = i1423[1]
  i1422.height = i1423[2]
  i1422.mipmapCount = i1423[3]
  i1422.anisoLevel = i1423[4]
  i1422.filterMode = i1423[5]
  i1422.hdr = !!i1423[6]
  i1422.format = i1423[7]
  i1422.wrapMode = i1423[8]
  i1422.alphaIsTransparency = !!i1423[9]
  i1422.alphaSource = i1423[10]
  i1422.graphicsFormat = i1423[11]
  i1422.sRGBTexture = !!i1423[12]
  i1422.desiredColorSpace = i1423[13]
  i1422.wrapU = i1423[14]
  i1422.wrapV = i1423[15]
  return i1422
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1424 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1425 = data
  i1424.name = i1425[0]
  i1424.index = i1425[1]
  i1424.startup = !!i1425[2]
  return i1424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1427 = data
  i1426.aspect = i1427[0]
  i1426.orthographic = !!i1427[1]
  i1426.orthographicSize = i1427[2]
  i1426.backgroundColor = new pc.Color(i1427[3], i1427[4], i1427[5], i1427[6])
  i1426.nearClipPlane = i1427[7]
  i1426.farClipPlane = i1427[8]
  i1426.fieldOfView = i1427[9]
  i1426.depth = i1427[10]
  i1426.clearFlags = i1427[11]
  i1426.cullingMask = i1427[12]
  i1426.rect = i1427[13]
  request.r(i1427[14], i1427[15], 0, i1426, 'targetTexture')
  i1426.usePhysicalProperties = !!i1427[16]
  i1426.focalLength = i1427[17]
  i1426.sensorSize = new pc.Vec2( i1427[18], i1427[19] )
  i1426.lensShift = new pc.Vec2( i1427[20], i1427[21] )
  i1426.gateFit = i1427[22]
  i1426.commandBufferCount = i1427[23]
  i1426.cameraType = i1427[24]
  i1426.enabled = !!i1427[25]
  return i1426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1429 = data
  i1428.name = i1429[0]
  i1428.tagId = i1429[1]
  i1428.enabled = !!i1429[2]
  i1428.isStatic = !!i1429[3]
  i1428.layer = i1429[4]
  return i1428
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1430 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1431 = data
  request.r(i1431[0], i1431[1], 0, i1430, 'm_FirstSelected')
  i1430.m_sendNavigationEvents = !!i1431[2]
  i1430.m_DragThreshold = i1431[3]
  return i1430
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1433 = data
  i1432.m_HorizontalAxis = i1433[0]
  i1432.m_VerticalAxis = i1433[1]
  i1432.m_SubmitButton = i1433[2]
  i1432.m_CancelButton = i1433[3]
  i1432.m_InputActionsPerSecond = i1433[4]
  i1432.m_RepeatDelay = i1433[5]
  i1432.m_ForceModuleActive = !!i1433[6]
  i1432.m_SendPointerHoverToParent = !!i1433[7]
  return i1432
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1434 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1435 = data
  i1434.pivot = new pc.Vec2( i1435[0], i1435[1] )
  i1434.anchorMin = new pc.Vec2( i1435[2], i1435[3] )
  i1434.anchorMax = new pc.Vec2( i1435[4], i1435[5] )
  i1434.sizeDelta = new pc.Vec2( i1435[6], i1435[7] )
  i1434.anchoredPosition3D = new pc.Vec3( i1435[8], i1435[9], i1435[10] )
  i1434.rotation = new pc.Quat(i1435[11], i1435[12], i1435[13], i1435[14])
  i1434.scale = new pc.Vec3( i1435[15], i1435[16], i1435[17] )
  return i1434
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1437 = data
  i1436.planeDistance = i1437[0]
  i1436.referencePixelsPerUnit = i1437[1]
  i1436.isFallbackOverlay = !!i1437[2]
  i1436.renderMode = i1437[3]
  i1436.renderOrder = i1437[4]
  i1436.sortingLayerName = i1437[5]
  i1436.sortingOrder = i1437[6]
  i1436.scaleFactor = i1437[7]
  request.r(i1437[8], i1437[9], 0, i1436, 'worldCamera')
  i1436.overrideSorting = !!i1437[10]
  i1436.pixelPerfect = !!i1437[11]
  i1436.targetDisplay = i1437[12]
  i1436.overridePixelPerfect = !!i1437[13]
  i1436.enabled = !!i1437[14]
  return i1436
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1438 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1439 = data
  i1438.m_UiScaleMode = i1439[0]
  i1438.m_ReferencePixelsPerUnit = i1439[1]
  i1438.m_ScaleFactor = i1439[2]
  i1438.m_ReferenceResolution = new pc.Vec2( i1439[3], i1439[4] )
  i1438.m_ScreenMatchMode = i1439[5]
  i1438.m_MatchWidthOrHeight = i1439[6]
  i1438.m_PhysicalUnit = i1439[7]
  i1438.m_FallbackScreenDPI = i1439[8]
  i1438.m_DefaultSpriteDPI = i1439[9]
  i1438.m_DynamicPixelsPerUnit = i1439[10]
  i1438.m_PresetInfoIsWorld = !!i1439[11]
  return i1438
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1440 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1441 = data
  i1440.m_IgnoreReversedGraphics = !!i1441[0]
  i1440.m_BlockingObjects = i1441[1]
  i1440.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1441[2] )
  return i1440
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1443 = data
  i1442.cullTransparentMesh = !!i1443[0]
  return i1442
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1444 = root || request.c( 'UnityEngine.UI.Image' )
  var i1445 = data
  request.r(i1445[0], i1445[1], 0, i1444, 'm_Sprite')
  i1444.m_Type = i1445[2]
  i1444.m_PreserveAspect = !!i1445[3]
  i1444.m_FillCenter = !!i1445[4]
  i1444.m_FillMethod = i1445[5]
  i1444.m_FillAmount = i1445[6]
  i1444.m_FillClockwise = !!i1445[7]
  i1444.m_FillOrigin = i1445[8]
  i1444.m_UseSpriteMesh = !!i1445[9]
  i1444.m_PixelsPerUnitMultiplier = i1445[10]
  request.r(i1445[11], i1445[12], 0, i1444, 'm_Material')
  i1444.m_Maskable = !!i1445[13]
  i1444.m_Color = new pc.Color(i1445[14], i1445[15], i1445[16], i1445[17])
  i1444.m_RaycastTarget = !!i1445[18]
  i1444.m_RaycastPadding = new pc.Vec4( i1445[19], i1445[20], i1445[21], i1445[22] )
  return i1444
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i1446 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i1447 = data
  request.r(i1447[0], i1447[1], 0, i1446, 'm_Texture')
  i1446.m_UVRect = UnityEngine.Rect.MinMaxRect(i1447[2], i1447[3], i1447[4], i1447[5])
  request.r(i1447[6], i1447[7], 0, i1446, 'm_Material')
  i1446.m_Maskable = !!i1447[8]
  i1446.m_Color = new pc.Color(i1447[9], i1447[10], i1447[11], i1447[12])
  i1446.m_RaycastTarget = !!i1447[13]
  i1446.m_RaycastPadding = new pc.Vec4( i1447[14], i1447[15], i1447[16], i1447[17] )
  return i1446
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i1448 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i1449 = data
  i1448.m_hasFontAssetChanged = !!i1449[0]
  request.r(i1449[1], i1449[2], 0, i1448, 'm_baseMaterial')
  i1448.m_maskOffset = new pc.Vec4( i1449[3], i1449[4], i1449[5], i1449[6] )
  i1448.m_text = i1449[7]
  i1448.m_isRightToLeft = !!i1449[8]
  request.r(i1449[9], i1449[10], 0, i1448, 'm_fontAsset')
  request.r(i1449[11], i1449[12], 0, i1448, 'm_sharedMaterial')
  var i1451 = i1449[13]
  var i1450 = []
  for(var i = 0; i < i1451.length; i += 2) {
  request.r(i1451[i + 0], i1451[i + 1], 2, i1450, '')
  }
  i1448.m_fontSharedMaterials = i1450
  request.r(i1449[14], i1449[15], 0, i1448, 'm_fontMaterial')
  var i1453 = i1449[16]
  var i1452 = []
  for(var i = 0; i < i1453.length; i += 2) {
  request.r(i1453[i + 0], i1453[i + 1], 2, i1452, '')
  }
  i1448.m_fontMaterials = i1452
  i1448.m_fontColor32 = UnityEngine.Color32.ConstructColor(i1449[17], i1449[18], i1449[19], i1449[20])
  i1448.m_fontColor = new pc.Color(i1449[21], i1449[22], i1449[23], i1449[24])
  i1448.m_enableVertexGradient = !!i1449[25]
  i1448.m_colorMode = i1449[26]
  i1448.m_fontColorGradient = request.d('TMPro.VertexGradient', i1449[27], i1448.m_fontColorGradient)
  request.r(i1449[28], i1449[29], 0, i1448, 'm_fontColorGradientPreset')
  request.r(i1449[30], i1449[31], 0, i1448, 'm_spriteAsset')
  i1448.m_tintAllSprites = !!i1449[32]
  request.r(i1449[33], i1449[34], 0, i1448, 'm_StyleSheet')
  i1448.m_TextStyleHashCode = i1449[35]
  i1448.m_overrideHtmlColors = !!i1449[36]
  i1448.m_faceColor = UnityEngine.Color32.ConstructColor(i1449[37], i1449[38], i1449[39], i1449[40])
  i1448.m_fontSize = i1449[41]
  i1448.m_fontSizeBase = i1449[42]
  i1448.m_fontWeight = i1449[43]
  i1448.m_enableAutoSizing = !!i1449[44]
  i1448.m_fontSizeMin = i1449[45]
  i1448.m_fontSizeMax = i1449[46]
  i1448.m_fontStyle = i1449[47]
  i1448.m_HorizontalAlignment = i1449[48]
  i1448.m_VerticalAlignment = i1449[49]
  i1448.m_textAlignment = i1449[50]
  i1448.m_characterSpacing = i1449[51]
  i1448.m_characterHorizontalScale = i1449[52]
  i1448.m_wordSpacing = i1449[53]
  i1448.m_lineSpacing = i1449[54]
  i1448.m_lineSpacingMax = i1449[55]
  i1448.m_paragraphSpacing = i1449[56]
  i1448.m_charWidthMaxAdj = i1449[57]
  i1448.m_TextWrappingMode = i1449[58]
  i1448.m_wordWrappingRatios = i1449[59]
  i1448.m_overflowMode = i1449[60]
  request.r(i1449[61], i1449[62], 0, i1448, 'm_linkedTextComponent')
  request.r(i1449[63], i1449[64], 0, i1448, 'parentLinkedComponent')
  i1448.m_enableKerning = !!i1449[65]
  var i1455 = i1449[66]
  var i1454 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1455.length; i += 1) {
    i1454.add(i1455[i + 0]);
  }
  i1448.m_ActiveFontFeatures = i1454
  i1448.m_enableExtraPadding = !!i1449[67]
  i1448.checkPaddingRequired = !!i1449[68]
  i1448.m_isRichText = !!i1449[69]
  i1448.m_parseCtrlCharacters = !!i1449[70]
  i1448.m_isOrthographic = !!i1449[71]
  i1448.m_isCullingEnabled = !!i1449[72]
  i1448.m_horizontalMapping = i1449[73]
  i1448.m_verticalMapping = i1449[74]
  i1448.m_uvLineOffset = i1449[75]
  i1448.m_geometrySortingOrder = i1449[76]
  i1448.m_IsTextObjectScaleStatic = !!i1449[77]
  i1448.m_VertexBufferAutoSizeReduction = !!i1449[78]
  i1448.m_useMaxVisibleDescender = !!i1449[79]
  i1448.m_pageToDisplay = i1449[80]
  i1448.m_margin = new pc.Vec4( i1449[81], i1449[82], i1449[83], i1449[84] )
  i1448.m_isUsingLegacyAnimationComponent = !!i1449[85]
  i1448.m_isVolumetricText = !!i1449[86]
  request.r(i1449[87], i1449[88], 0, i1448, 'm_Material')
  i1448.m_EmojiFallbackSupport = !!i1449[89]
  i1448.m_Maskable = !!i1449[90]
  i1448.m_Color = new pc.Color(i1449[91], i1449[92], i1449[93], i1449[94])
  i1448.m_RaycastTarget = !!i1449[95]
  i1448.m_RaycastPadding = new pc.Vec4( i1449[96], i1449[97], i1449[98], i1449[99] )
  return i1448
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i1458 = root || request.c( 'TMPro.VertexGradient' )
  var i1459 = data
  i1458.topLeft = new pc.Color(i1459[0], i1459[1], i1459[2], i1459[3])
  i1458.topRight = new pc.Color(i1459[4], i1459[5], i1459[6], i1459[7])
  i1458.bottomLeft = new pc.Color(i1459[8], i1459[9], i1459[10], i1459[11])
  i1458.bottomRight = new pc.Color(i1459[12], i1459[13], i1459[14], i1459[15])
  return i1458
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i1462 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i1463 = data
  i1462.targetIsSelf = !!i1463[0]
  request.r(i1463[1], i1463[2], 0, i1462, 'targetGO')
  i1462.tweenTargetIsTargetGO = !!i1463[3]
  i1462.delay = i1463[4]
  i1462.duration = i1463[5]
  i1462.easeType = i1463[6]
  i1462.easeCurve = new pc.AnimationCurve( { keys_flow: i1463[7] } )
  i1462.loopType = i1463[8]
  i1462.loops = i1463[9]
  i1462.id = i1463[10]
  i1462.isRelative = !!i1463[11]
  i1462.isFrom = !!i1463[12]
  i1462.isIndependentUpdate = !!i1463[13]
  i1462.autoKill = !!i1463[14]
  i1462.autoGenerate = !!i1463[15]
  i1462.isActive = !!i1463[16]
  i1462.isValid = !!i1463[17]
  request.r(i1463[18], i1463[19], 0, i1462, 'target')
  i1462.animationType = i1463[20]
  i1462.targetType = i1463[21]
  i1462.forcedTargetType = i1463[22]
  i1462.autoPlay = !!i1463[23]
  i1462.useTargetAsV3 = !!i1463[24]
  i1462.endValueFloat = i1463[25]
  i1462.endValueV3 = new pc.Vec3( i1463[26], i1463[27], i1463[28] )
  i1462.endValueV2 = new pc.Vec2( i1463[29], i1463[30] )
  i1462.endValueColor = new pc.Color(i1463[31], i1463[32], i1463[33], i1463[34])
  i1462.endValueString = i1463[35]
  i1462.endValueRect = UnityEngine.Rect.MinMaxRect(i1463[36], i1463[37], i1463[38], i1463[39])
  request.r(i1463[40], i1463[41], 0, i1462, 'endValueTransform')
  i1462.optionalBool0 = !!i1463[42]
  i1462.optionalBool1 = !!i1463[43]
  i1462.optionalFloat0 = i1463[44]
  i1462.optionalInt0 = i1463[45]
  i1462.optionalRotationMode = i1463[46]
  i1462.optionalScrambleMode = i1463[47]
  i1462.optionalShakeRandomnessMode = i1463[48]
  i1462.optionalString = i1463[49]
  i1462.updateType = i1463[50]
  i1462.isSpeedBased = !!i1463[51]
  i1462.hasOnStart = !!i1463[52]
  i1462.hasOnPlay = !!i1463[53]
  i1462.hasOnUpdate = !!i1463[54]
  i1462.hasOnStepComplete = !!i1463[55]
  i1462.hasOnComplete = !!i1463[56]
  i1462.hasOnTweenCreated = !!i1463[57]
  i1462.hasOnRewind = !!i1463[58]
  i1462.onStart = request.d('UnityEngine.Events.UnityEvent', i1463[59], i1462.onStart)
  i1462.onPlay = request.d('UnityEngine.Events.UnityEvent', i1463[60], i1462.onPlay)
  i1462.onUpdate = request.d('UnityEngine.Events.UnityEvent', i1463[61], i1462.onUpdate)
  i1462.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i1463[62], i1462.onStepComplete)
  i1462.onComplete = request.d('UnityEngine.Events.UnityEvent', i1463[63], i1462.onComplete)
  i1462.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i1463[64], i1462.onTweenCreated)
  i1462.onRewind = request.d('UnityEngine.Events.UnityEvent', i1463[65], i1462.onRewind)
  return i1462
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i1464 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i1465 = data
  i1464.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1465[0], i1464.m_PersistentCalls)
  return i1464
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1466 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1467 = data
  var i1469 = i1467[0]
  var i1468 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1469.length; i += 1) {
    i1468.add(request.d('UnityEngine.Events.PersistentCall', i1469[i + 0]));
  }
  i1466.m_Calls = i1468
  return i1466
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1472 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1473 = data
  request.r(i1473[0], i1473[1], 0, i1472, 'm_Target')
  i1472.m_TargetAssemblyTypeName = i1473[2]
  i1472.m_MethodName = i1473[3]
  i1472.m_Mode = i1473[4]
  i1472.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1473[5], i1472.m_Arguments)
  i1472.m_CallState = i1473[6]
  return i1472
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1474 = root || request.c( 'UnityEngine.UI.Button' )
  var i1475 = data
  i1474.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1475[0], i1474.m_OnClick)
  i1474.m_Navigation = request.d('UnityEngine.UI.Navigation', i1475[1], i1474.m_Navigation)
  i1474.m_Transition = i1475[2]
  i1474.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1475[3], i1474.m_Colors)
  i1474.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1475[4], i1474.m_SpriteState)
  i1474.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1475[5], i1474.m_AnimationTriggers)
  i1474.m_Interactable = !!i1475[6]
  request.r(i1475[7], i1475[8], 0, i1474, 'm_TargetGraphic')
  return i1474
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1476 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1477 = data
  i1476.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1477[0], i1476.m_PersistentCalls)
  return i1476
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1478 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1479 = data
  i1478.m_Mode = i1479[0]
  i1478.m_WrapAround = !!i1479[1]
  request.r(i1479[2], i1479[3], 0, i1478, 'm_SelectOnUp')
  request.r(i1479[4], i1479[5], 0, i1478, 'm_SelectOnDown')
  request.r(i1479[6], i1479[7], 0, i1478, 'm_SelectOnLeft')
  request.r(i1479[8], i1479[9], 0, i1478, 'm_SelectOnRight')
  return i1478
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1480 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1481 = data
  i1480.m_NormalColor = new pc.Color(i1481[0], i1481[1], i1481[2], i1481[3])
  i1480.m_HighlightedColor = new pc.Color(i1481[4], i1481[5], i1481[6], i1481[7])
  i1480.m_PressedColor = new pc.Color(i1481[8], i1481[9], i1481[10], i1481[11])
  i1480.m_SelectedColor = new pc.Color(i1481[12], i1481[13], i1481[14], i1481[15])
  i1480.m_DisabledColor = new pc.Color(i1481[16], i1481[17], i1481[18], i1481[19])
  i1480.m_ColorMultiplier = i1481[20]
  i1480.m_FadeDuration = i1481[21]
  return i1480
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1482 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1483 = data
  request.r(i1483[0], i1483[1], 0, i1482, 'm_HighlightedSprite')
  request.r(i1483[2], i1483[3], 0, i1482, 'm_PressedSprite')
  request.r(i1483[4], i1483[5], 0, i1482, 'm_SelectedSprite')
  request.r(i1483[6], i1483[7], 0, i1482, 'm_DisabledSprite')
  return i1482
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1484 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1485 = data
  i1484.m_NormalTrigger = i1485[0]
  i1484.m_HighlightedTrigger = i1485[1]
  i1484.m_PressedTrigger = i1485[2]
  i1484.m_SelectedTrigger = i1485[3]
  i1484.m_DisabledTrigger = i1485[4]
  return i1484
}

Deserializers["TutController"] = function (request, data, root) {
  var i1486 = root || request.c( 'TutController' )
  var i1487 = data
  request.r(i1487[0], i1487[1], 0, i1486, 'rt')
  var i1489 = i1487[2]
  var i1488 = new (System.Collections.Generic.List$1(Bridge.ns('Option')))
  for(var i = 0; i < i1489.length; i += 1) {
    i1488.add(request.d('Option', i1489[i + 0]));
  }
  i1486.options = i1488
  i1486.moveTime = i1487[3]
  i1486.fromScale = i1487[4]
  i1486.toScale = i1487[5]
  i1486.scaleTime = i1487[6]
  return i1486
}

Deserializers["Option"] = function (request, data, root) {
  var i1492 = root || request.c( 'Option' )
  var i1493 = data
  i1492.Position = new pc.Vec3( i1493[0], i1493[1], i1493[2] )
  request.r(i1493[3], i1493[4], 0, i1492, 'Demo')
  return i1492
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1494 = root || request.c( 'UnityEngine.UI.Text' )
  var i1495 = data
  i1494.m_FontData = request.d('UnityEngine.UI.FontData', i1495[0], i1494.m_FontData)
  i1494.m_Text = i1495[1]
  request.r(i1495[2], i1495[3], 0, i1494, 'm_Material')
  i1494.m_Maskable = !!i1495[4]
  i1494.m_Color = new pc.Color(i1495[5], i1495[6], i1495[7], i1495[8])
  i1494.m_RaycastTarget = !!i1495[9]
  i1494.m_RaycastPadding = new pc.Vec4( i1495[10], i1495[11], i1495[12], i1495[13] )
  return i1494
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1496 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1497 = data
  request.r(i1497[0], i1497[1], 0, i1496, 'm_Font')
  i1496.m_FontSize = i1497[2]
  i1496.m_FontStyle = i1497[3]
  i1496.m_BestFit = !!i1497[4]
  i1496.m_MinSize = i1497[5]
  i1496.m_MaxSize = i1497[6]
  i1496.m_Alignment = i1497[7]
  i1496.m_AlignByGeometry = !!i1497[8]
  i1496.m_RichText = !!i1497[9]
  i1496.m_HorizontalOverflow = i1497[10]
  i1496.m_VerticalOverflow = i1497[11]
  i1496.m_LineSpacing = i1497[12]
  return i1496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1499 = data
  request.r(i1499[0], i1499[1], 0, i1498, 'clip')
  request.r(i1499[2], i1499[3], 0, i1498, 'outputAudioMixerGroup')
  i1498.playOnAwake = !!i1499[4]
  i1498.loop = !!i1499[5]
  i1498.time = i1499[6]
  i1498.volume = i1499[7]
  i1498.pitch = i1499[8]
  i1498.enabled = !!i1499[9]
  return i1498
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1500 = root || request.c( 'LunaController' )
  var i1501 = data
  i1500.TimePlay = i1501[0]
  i1500.LimitTimePlay = !!i1501[1]
  request.r(i1501[2], i1501[3], 0, i1500, 'BGM')
  request.r(i1501[4], i1501[5], 0, i1500, 'BGTexture')
  request.r(i1501[6], i1501[7], 0, i1500, 'Demo1Texture')
  i1500.Demo1Name = i1501[8]
  request.r(i1501[9], i1501[10], 0, i1500, 'Demo2Texture')
  i1500.Demo2Name = i1501[11]
  request.r(i1501[12], i1501[13], 0, i1500, 'Demo3Texture')
  i1500.Demo3Name = i1501[14]
  request.r(i1501[15], i1501[16], 0, i1500, 'Demo4Texture')
  i1500.Demo4Name = i1501[17]
  request.r(i1501[18], i1501[19], 0, i1500, 'musicSource')
  request.r(i1501[20], i1501[21], 0, i1500, 'BGImage')
  request.r(i1501[22], i1501[23], 0, i1500, 'demo1Image')
  request.r(i1501[24], i1501[25], 0, i1500, 'demo1Text')
  request.r(i1501[26], i1501[27], 0, i1500, 'demo2Image')
  request.r(i1501[28], i1501[29], 0, i1500, 'demo2Text')
  request.r(i1501[30], i1501[31], 0, i1500, 'demo3Image')
  request.r(i1501[32], i1501[33], 0, i1500, 'demo3Text')
  request.r(i1501[34], i1501[35], 0, i1500, 'demo4Image')
  request.r(i1501[36], i1501[37], 0, i1500, 'demo4Text')
  var i1503 = i1501[38]
  var i1502 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i1503.length; i += 2) {
  request.r(i1503[i + 0], i1503[i + 1], 1, i1502, '')
  }
  i1500.CTA = i1502
  return i1500
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1507 = data
  i1506.ambientIntensity = i1507[0]
  i1506.reflectionIntensity = i1507[1]
  i1506.ambientMode = i1507[2]
  i1506.ambientLight = new pc.Color(i1507[3], i1507[4], i1507[5], i1507[6])
  i1506.ambientSkyColor = new pc.Color(i1507[7], i1507[8], i1507[9], i1507[10])
  i1506.ambientGroundColor = new pc.Color(i1507[11], i1507[12], i1507[13], i1507[14])
  i1506.ambientEquatorColor = new pc.Color(i1507[15], i1507[16], i1507[17], i1507[18])
  i1506.fogColor = new pc.Color(i1507[19], i1507[20], i1507[21], i1507[22])
  i1506.fogEndDistance = i1507[23]
  i1506.fogStartDistance = i1507[24]
  i1506.fogDensity = i1507[25]
  i1506.fog = !!i1507[26]
  request.r(i1507[27], i1507[28], 0, i1506, 'skybox')
  i1506.fogMode = i1507[29]
  var i1509 = i1507[30]
  var i1508 = []
  for(var i = 0; i < i1509.length; i += 1) {
    i1508.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1509[i + 0]) );
  }
  i1506.lightmaps = i1508
  i1506.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1507[31], i1506.lightProbes)
  i1506.lightmapsMode = i1507[32]
  i1506.mixedBakeMode = i1507[33]
  i1506.environmentLightingMode = i1507[34]
  i1506.ambientProbe = new pc.SphericalHarmonicsL2(i1507[35])
  request.r(i1507[36], i1507[37], 0, i1506, 'customReflection')
  request.r(i1507[38], i1507[39], 0, i1506, 'defaultReflection')
  i1506.defaultReflectionMode = i1507[40]
  i1506.defaultReflectionResolution = i1507[41]
  i1506.sunLightObjectId = i1507[42]
  i1506.pixelLightCount = i1507[43]
  i1506.defaultReflectionHDR = !!i1507[44]
  i1506.hasLightDataAsset = !!i1507[45]
  i1506.hasManualGenerate = !!i1507[46]
  return i1506
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1513 = data
  request.r(i1513[0], i1513[1], 0, i1512, 'lightmapColor')
  request.r(i1513[2], i1513[3], 0, i1512, 'lightmapDirection')
  request.r(i1513[4], i1513[5], 0, i1512, 'shadowMask')
  return i1512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1514 = root || new UnityEngine.LightProbes()
  var i1515 = data
  return i1514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1523 = data
  var i1525 = i1523[0]
  var i1524 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1525.length; i += 1) {
    i1524.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1525[i + 0]));
  }
  i1522.ShaderCompilationErrors = i1524
  i1522.name = i1523[1]
  i1522.guid = i1523[2]
  var i1527 = i1523[3]
  var i1526 = []
  for(var i = 0; i < i1527.length; i += 1) {
    i1526.push( i1527[i + 0] );
  }
  i1522.shaderDefinedKeywords = i1526
  var i1529 = i1523[4]
  var i1528 = []
  for(var i = 0; i < i1529.length; i += 1) {
    i1528.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1529[i + 0]) );
  }
  i1522.passes = i1528
  var i1531 = i1523[5]
  var i1530 = []
  for(var i = 0; i < i1531.length; i += 1) {
    i1530.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1531[i + 0]) );
  }
  i1522.usePasses = i1530
  var i1533 = i1523[6]
  var i1532 = []
  for(var i = 0; i < i1533.length; i += 1) {
    i1532.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1533[i + 0]) );
  }
  i1522.defaultParameterValues = i1532
  request.r(i1523[7], i1523[8], 0, i1522, 'unityFallbackShader')
  i1522.readDepth = !!i1523[9]
  i1522.hasDepthOnlyPass = !!i1523[10]
  i1522.isCreatedByShaderGraph = !!i1523[11]
  i1522.disableBatching = !!i1523[12]
  i1522.compiled = !!i1523[13]
  return i1522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1537 = data
  i1536.shaderName = i1537[0]
  i1536.errorMessage = i1537[1]
  return i1536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1542 = root || new pc.UnityShaderPass()
  var i1543 = data
  i1542.id = i1543[0]
  i1542.subShaderIndex = i1543[1]
  i1542.name = i1543[2]
  i1542.passType = i1543[3]
  i1542.grabPassTextureName = i1543[4]
  i1542.usePass = !!i1543[5]
  i1542.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[6], i1542.zTest)
  i1542.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[7], i1542.zWrite)
  i1542.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[8], i1542.culling)
  i1542.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1543[9], i1542.blending)
  i1542.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1543[10], i1542.alphaBlending)
  i1542.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[11], i1542.colorWriteMask)
  i1542.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[12], i1542.offsetUnits)
  i1542.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[13], i1542.offsetFactor)
  i1542.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[14], i1542.stencilRef)
  i1542.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[15], i1542.stencilReadMask)
  i1542.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1543[16], i1542.stencilWriteMask)
  i1542.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1543[17], i1542.stencilOp)
  i1542.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1543[18], i1542.stencilOpFront)
  i1542.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1543[19], i1542.stencilOpBack)
  var i1545 = i1543[20]
  var i1544 = []
  for(var i = 0; i < i1545.length; i += 1) {
    i1544.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1545[i + 0]) );
  }
  i1542.tags = i1544
  var i1547 = i1543[21]
  var i1546 = []
  for(var i = 0; i < i1547.length; i += 1) {
    i1546.push( i1547[i + 0] );
  }
  i1542.passDefinedKeywords = i1546
  var i1549 = i1543[22]
  var i1548 = []
  for(var i = 0; i < i1549.length; i += 1) {
    i1548.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1549[i + 0]) );
  }
  i1542.passDefinedKeywordGroups = i1548
  var i1551 = i1543[23]
  var i1550 = []
  for(var i = 0; i < i1551.length; i += 1) {
    i1550.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1551[i + 0]) );
  }
  i1542.variants = i1550
  var i1553 = i1543[24]
  var i1552 = []
  for(var i = 0; i < i1553.length; i += 1) {
    i1552.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1553[i + 0]) );
  }
  i1542.excludedVariants = i1552
  i1542.hasDepthReader = !!i1543[25]
  return i1542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1555 = data
  i1554.val = i1555[0]
  i1554.name = i1555[1]
  return i1554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1557 = data
  i1556.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1557[0], i1556.src)
  i1556.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1557[1], i1556.dst)
  i1556.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1557[2], i1556.op)
  return i1556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1559 = data
  i1558.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1559[0], i1558.pass)
  i1558.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1559[1], i1558.fail)
  i1558.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1559[2], i1558.zFail)
  i1558.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1559[3], i1558.comp)
  return i1558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1563 = data
  i1562.name = i1563[0]
  i1562.value = i1563[1]
  return i1562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1567 = data
  var i1569 = i1567[0]
  var i1568 = []
  for(var i = 0; i < i1569.length; i += 1) {
    i1568.push( i1569[i + 0] );
  }
  i1566.keywords = i1568
  i1566.hasDiscard = !!i1567[1]
  return i1566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1573 = data
  i1572.passId = i1573[0]
  i1572.subShaderIndex = i1573[1]
  var i1575 = i1573[2]
  var i1574 = []
  for(var i = 0; i < i1575.length; i += 1) {
    i1574.push( i1575[i + 0] );
  }
  i1572.keywords = i1574
  i1572.vertexProgram = i1573[3]
  i1572.fragmentProgram = i1573[4]
  i1572.exportedForWebGl2 = !!i1573[5]
  i1572.readDepth = !!i1573[6]
  return i1572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1579 = data
  request.r(i1579[0], i1579[1], 0, i1578, 'shader')
  i1578.pass = i1579[2]
  return i1578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1583 = data
  i1582.name = i1583[0]
  i1582.type = i1583[1]
  i1582.value = new pc.Vec4( i1583[2], i1583[3], i1583[4], i1583[5] )
  i1582.textureValue = i1583[6]
  i1582.shaderPropertyFlag = i1583[7]
  return i1582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1585 = data
  i1584.name = i1585[0]
  request.r(i1585[1], i1585[2], 0, i1584, 'texture')
  i1584.aabb = i1585[3]
  i1584.vertices = i1585[4]
  i1584.triangles = i1585[5]
  i1584.textureRect = UnityEngine.Rect.MinMaxRect(i1585[6], i1585[7], i1585[8], i1585[9])
  i1584.packedRect = UnityEngine.Rect.MinMaxRect(i1585[10], i1585[11], i1585[12], i1585[13])
  i1584.border = new pc.Vec4( i1585[14], i1585[15], i1585[16], i1585[17] )
  i1584.transparency = i1585[18]
  i1584.bounds = i1585[19]
  i1584.pixelsPerUnit = i1585[20]
  i1584.textureWidth = i1585[21]
  i1584.textureHeight = i1585[22]
  i1584.nativeSize = new pc.Vec2( i1585[23], i1585[24] )
  i1584.pivot = new pc.Vec2( i1585[25], i1585[26] )
  i1584.textureRectOffset = new pc.Vec2( i1585[27], i1585[28] )
  return i1584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1587 = data
  i1586.name = i1587[0]
  return i1586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1589 = data
  i1588.name = i1589[0]
  i1588.ascent = i1589[1]
  i1588.originalLineHeight = i1589[2]
  i1588.fontSize = i1589[3]
  var i1591 = i1589[4]
  var i1590 = []
  for(var i = 0; i < i1591.length; i += 1) {
    i1590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1591[i + 0]) );
  }
  i1588.characterInfo = i1590
  request.r(i1589[5], i1589[6], 0, i1588, 'texture')
  i1588.originalFontSize = i1589[7]
  return i1588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1595 = data
  i1594.index = i1595[0]
  i1594.advance = i1595[1]
  i1594.bearing = i1595[2]
  i1594.glyphWidth = i1595[3]
  i1594.glyphHeight = i1595[4]
  i1594.minX = i1595[5]
  i1594.maxX = i1595[6]
  i1594.minY = i1595[7]
  i1594.maxY = i1595[8]
  i1594.uvBottomLeftX = i1595[9]
  i1594.uvBottomLeftY = i1595[10]
  i1594.uvBottomRightX = i1595[11]
  i1594.uvBottomRightY = i1595[12]
  i1594.uvTopLeftX = i1595[13]
  i1594.uvTopLeftY = i1595[14]
  i1594.uvTopRightX = i1595[15]
  i1594.uvTopRightY = i1595[16]
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1597 = data
  i1596.name = i1597[0]
  i1596.bytes64 = i1597[1]
  i1596.data = i1597[2]
  return i1596
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1598 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1599 = data
  i1598.normalStyle = i1599[0]
  i1598.normalSpacingOffset = i1599[1]
  i1598.boldStyle = i1599[2]
  i1598.boldSpacing = i1599[3]
  i1598.italicStyle = i1599[4]
  i1598.tabSize = i1599[5]
  request.r(i1599[6], i1599[7], 0, i1598, 'atlas')
  i1598.m_SourceFontFileGUID = i1599[8]
  i1598.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1599[9], i1598.m_CreationSettings)
  request.r(i1599[10], i1599[11], 0, i1598, 'm_SourceFontFile')
  i1598.m_SourceFontFilePath = i1599[12]
  i1598.m_AtlasPopulationMode = i1599[13]
  i1598.InternalDynamicOS = !!i1599[14]
  var i1601 = i1599[15]
  var i1600 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1601.length; i += 1) {
    i1600.add(request.d('UnityEngine.TextCore.Glyph', i1601[i + 0]));
  }
  i1598.m_GlyphTable = i1600
  var i1603 = i1599[16]
  var i1602 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1603.length; i += 1) {
    i1602.add(request.d('TMPro.TMP_Character', i1603[i + 0]));
  }
  i1598.m_CharacterTable = i1602
  var i1605 = i1599[17]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 2) {
  request.r(i1605[i + 0], i1605[i + 1], 2, i1604, '')
  }
  i1598.m_AtlasTextures = i1604
  i1598.m_AtlasTextureIndex = i1599[18]
  i1598.m_IsMultiAtlasTexturesEnabled = !!i1599[19]
  i1598.m_GetFontFeatures = !!i1599[20]
  i1598.m_ClearDynamicDataOnBuild = !!i1599[21]
  i1598.m_AtlasWidth = i1599[22]
  i1598.m_AtlasHeight = i1599[23]
  i1598.m_AtlasPadding = i1599[24]
  i1598.m_AtlasRenderMode = i1599[25]
  var i1607 = i1599[26]
  var i1606 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1607.length; i += 1) {
    i1606.add(request.d('UnityEngine.TextCore.GlyphRect', i1607[i + 0]));
  }
  i1598.m_UsedGlyphRects = i1606
  var i1609 = i1599[27]
  var i1608 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.add(request.d('UnityEngine.TextCore.GlyphRect', i1609[i + 0]));
  }
  i1598.m_FreeGlyphRects = i1608
  i1598.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1599[28], i1598.m_FontFeatureTable)
  i1598.m_ShouldReimportFontFeatures = !!i1599[29]
  var i1611 = i1599[30]
  var i1610 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1611.length; i += 2) {
  request.r(i1611[i + 0], i1611[i + 1], 1, i1610, '')
  }
  i1598.m_FallbackFontAssetTable = i1610
  var i1613 = i1599[31]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('TMPro.TMP_FontWeightPair', i1613[i + 0]) );
  }
  i1598.m_FontWeightTable = i1612
  var i1615 = i1599[32]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( request.d('TMPro.TMP_FontWeightPair', i1615[i + 0]) );
  }
  i1598.fontWeights = i1614
  i1598.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1599[33], i1598.m_fontInfo)
  var i1617 = i1599[34]
  var i1616 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1617.length; i += 1) {
    i1616.add(request.d('TMPro.TMP_Glyph', i1617[i + 0]));
  }
  i1598.m_glyphInfoList = i1616
  i1598.m_KerningTable = request.d('TMPro.KerningTable', i1599[35], i1598.m_KerningTable)
  var i1619 = i1599[36]
  var i1618 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1619.length; i += 2) {
  request.r(i1619[i + 0], i1619[i + 1], 1, i1618, '')
  }
  i1598.fallbackFontAssets = i1618
  i1598.m_Version = i1599[37]
  i1598.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1599[38], i1598.m_FaceInfo)
  request.r(i1599[39], i1599[40], 0, i1598, 'm_Material')
  return i1598
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1620 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1621 = data
  i1620.sourceFontFileName = i1621[0]
  i1620.sourceFontFileGUID = i1621[1]
  i1620.faceIndex = i1621[2]
  i1620.pointSizeSamplingMode = i1621[3]
  i1620.pointSize = i1621[4]
  i1620.padding = i1621[5]
  i1620.paddingMode = i1621[6]
  i1620.packingMode = i1621[7]
  i1620.atlasWidth = i1621[8]
  i1620.atlasHeight = i1621[9]
  i1620.characterSetSelectionMode = i1621[10]
  i1620.characterSequence = i1621[11]
  i1620.referencedFontAssetGUID = i1621[12]
  i1620.referencedTextAssetGUID = i1621[13]
  i1620.fontStyle = i1621[14]
  i1620.fontStyleModifier = i1621[15]
  i1620.renderMode = i1621[16]
  i1620.includeFontFeatures = !!i1621[17]
  return i1620
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1624 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1625 = data
  i1624.m_Index = i1625[0]
  i1624.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1625[1], i1624.m_Metrics)
  i1624.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1625[2], i1624.m_GlyphRect)
  i1624.m_Scale = i1625[3]
  i1624.m_AtlasIndex = i1625[4]
  i1624.m_ClassDefinitionType = i1625[5]
  return i1624
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1626 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1627 = data
  i1626.m_Width = i1627[0]
  i1626.m_Height = i1627[1]
  i1626.m_HorizontalBearingX = i1627[2]
  i1626.m_HorizontalBearingY = i1627[3]
  i1626.m_HorizontalAdvance = i1627[4]
  return i1626
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1628 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1629 = data
  i1628.m_X = i1629[0]
  i1628.m_Y = i1629[1]
  i1628.m_Width = i1629[2]
  i1628.m_Height = i1629[3]
  return i1628
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1632 = root || request.c( 'TMPro.TMP_Character' )
  var i1633 = data
  i1632.m_ElementType = i1633[0]
  i1632.m_Unicode = i1633[1]
  i1632.m_GlyphIndex = i1633[2]
  i1632.m_Scale = i1633[3]
  return i1632
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1638 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1639 = data
  var i1641 = i1639[0]
  var i1640 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1641.length; i += 1) {
    i1640.add(request.d('TMPro.MultipleSubstitutionRecord', i1641[i + 0]));
  }
  i1638.m_MultipleSubstitutionRecords = i1640
  var i1643 = i1639[1]
  var i1642 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1643.length; i += 1) {
    i1642.add(request.d('TMPro.LigatureSubstitutionRecord', i1643[i + 0]));
  }
  i1638.m_LigatureSubstitutionRecords = i1642
  var i1645 = i1639[2]
  var i1644 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1645.length; i += 1) {
    i1644.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1645[i + 0]));
  }
  i1638.m_GlyphPairAdjustmentRecords = i1644
  var i1647 = i1639[3]
  var i1646 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1647.length; i += 1) {
    i1646.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1647[i + 0]));
  }
  i1638.m_MarkToBaseAdjustmentRecords = i1646
  var i1649 = i1639[4]
  var i1648 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1649.length; i += 1) {
    i1648.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1649[i + 0]));
  }
  i1638.m_MarkToMarkAdjustmentRecords = i1648
  return i1638
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1652 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1653 = data
  i1652.m_TargetGlyphID = i1653[0]
  i1652.m_SubstituteGlyphIDs = i1653[1]
  return i1652
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1656 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1657 = data
  i1656.m_ComponentGlyphIDs = i1657[0]
  i1656.m_LigatureGlyphID = i1657[1]
  return i1656
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1660 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1661 = data
  i1660.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1661[0], i1660.m_FirstAdjustmentRecord)
  i1660.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1661[1], i1660.m_SecondAdjustmentRecord)
  i1660.m_FeatureLookupFlags = i1661[2]
  return i1660
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1664 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1665 = data
  i1664.m_BaseGlyphID = i1665[0]
  i1664.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1665[1], i1664.m_BaseGlyphAnchorPoint)
  i1664.m_MarkGlyphID = i1665[2]
  i1664.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1665[3], i1664.m_MarkPositionAdjustment)
  return i1664
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1668 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1669 = data
  i1668.m_BaseMarkGlyphID = i1669[0]
  i1668.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1669[1], i1668.m_BaseMarkGlyphAnchorPoint)
  i1668.m_CombiningMarkGlyphID = i1669[2]
  i1668.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1669[3], i1668.m_CombiningMarkPositionAdjustment)
  return i1668
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1674 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1675 = data
  request.r(i1675[0], i1675[1], 0, i1674, 'regularTypeface')
  request.r(i1675[2], i1675[3], 0, i1674, 'italicTypeface')
  return i1674
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1676 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1677 = data
  i1676.Name = i1677[0]
  i1676.PointSize = i1677[1]
  i1676.Scale = i1677[2]
  i1676.CharacterCount = i1677[3]
  i1676.LineHeight = i1677[4]
  i1676.Baseline = i1677[5]
  i1676.Ascender = i1677[6]
  i1676.CapHeight = i1677[7]
  i1676.Descender = i1677[8]
  i1676.CenterLine = i1677[9]
  i1676.SuperscriptOffset = i1677[10]
  i1676.SubscriptOffset = i1677[11]
  i1676.SubSize = i1677[12]
  i1676.Underline = i1677[13]
  i1676.UnderlineThickness = i1677[14]
  i1676.strikethrough = i1677[15]
  i1676.strikethroughThickness = i1677[16]
  i1676.TabWidth = i1677[17]
  i1676.Padding = i1677[18]
  i1676.AtlasWidth = i1677[19]
  i1676.AtlasHeight = i1677[20]
  return i1676
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1680 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1681 = data
  i1680.id = i1681[0]
  i1680.x = i1681[1]
  i1680.y = i1681[2]
  i1680.width = i1681[3]
  i1680.height = i1681[4]
  i1680.xOffset = i1681[5]
  i1680.yOffset = i1681[6]
  i1680.xAdvance = i1681[7]
  i1680.scale = i1681[8]
  return i1680
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1682 = root || request.c( 'TMPro.KerningTable' )
  var i1683 = data
  var i1685 = i1683[0]
  var i1684 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1685.length; i += 1) {
    i1684.add(request.d('TMPro.KerningPair', i1685[i + 0]));
  }
  i1682.kerningPairs = i1684
  return i1682
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1688 = root || request.c( 'TMPro.KerningPair' )
  var i1689 = data
  i1688.xOffset = i1689[0]
  i1688.m_FirstGlyph = i1689[1]
  i1688.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1689[2], i1688.m_FirstGlyphAdjustments)
  i1688.m_SecondGlyph = i1689[3]
  i1688.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1689[4], i1688.m_SecondGlyphAdjustments)
  i1688.m_IgnoreSpacingAdjustments = !!i1689[5]
  return i1688
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1690 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1691 = data
  i1690.m_FaceIndex = i1691[0]
  i1690.m_FamilyName = i1691[1]
  i1690.m_StyleName = i1691[2]
  i1690.m_PointSize = i1691[3]
  i1690.m_Scale = i1691[4]
  i1690.m_UnitsPerEM = i1691[5]
  i1690.m_LineHeight = i1691[6]
  i1690.m_AscentLine = i1691[7]
  i1690.m_CapLine = i1691[8]
  i1690.m_MeanLine = i1691[9]
  i1690.m_Baseline = i1691[10]
  i1690.m_DescentLine = i1691[11]
  i1690.m_SuperscriptOffset = i1691[12]
  i1690.m_SuperscriptSize = i1691[13]
  i1690.m_SubscriptOffset = i1691[14]
  i1690.m_SubscriptSize = i1691[15]
  i1690.m_UnderlineOffset = i1691[16]
  i1690.m_UnderlineThickness = i1691[17]
  i1690.m_StrikethroughOffset = i1691[18]
  i1690.m_StrikethroughThickness = i1691[19]
  i1690.m_TabWidth = i1691[20]
  return i1690
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1692 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1693 = data
  i1692.useSafeMode = !!i1693[0]
  i1692.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1693[1], i1692.safeModeOptions)
  i1692.timeScale = i1693[2]
  i1692.unscaledTimeScale = i1693[3]
  i1692.useSmoothDeltaTime = !!i1693[4]
  i1692.maxSmoothUnscaledTime = i1693[5]
  i1692.rewindCallbackMode = i1693[6]
  i1692.showUnityEditorReport = !!i1693[7]
  i1692.logBehaviour = i1693[8]
  i1692.drawGizmos = !!i1693[9]
  i1692.defaultRecyclable = !!i1693[10]
  i1692.defaultAutoPlay = i1693[11]
  i1692.defaultUpdateType = i1693[12]
  i1692.defaultTimeScaleIndependent = !!i1693[13]
  i1692.defaultEaseType = i1693[14]
  i1692.defaultEaseOvershootOrAmplitude = i1693[15]
  i1692.defaultEasePeriod = i1693[16]
  i1692.defaultAutoKill = !!i1693[17]
  i1692.defaultLoopType = i1693[18]
  i1692.debugMode = !!i1693[19]
  i1692.debugStoreTargetId = !!i1693[20]
  i1692.showPreviewPanel = !!i1693[21]
  i1692.storeSettingsLocation = i1693[22]
  i1692.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1693[23], i1692.modules)
  i1692.createASMDEF = !!i1693[24]
  i1692.showPlayingTweens = !!i1693[25]
  i1692.showPausedTweens = !!i1693[26]
  return i1692
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1694 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1695 = data
  i1694.logBehaviour = i1695[0]
  i1694.nestedTweenFailureBehaviour = i1695[1]
  return i1694
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1696 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1697 = data
  i1696.showPanel = !!i1697[0]
  i1696.audioEnabled = !!i1697[1]
  i1696.physicsEnabled = !!i1697[2]
  i1696.physics2DEnabled = !!i1697[3]
  i1696.spriteEnabled = !!i1697[4]
  i1696.uiEnabled = !!i1697[5]
  i1696.textMeshProEnabled = !!i1697[6]
  i1696.tk2DEnabled = !!i1697[7]
  i1696.deAudioEnabled = !!i1697[8]
  i1696.deUnityExtendedEnabled = !!i1697[9]
  i1696.epoOutlineEnabled = !!i1697[10]
  return i1696
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1698 = root || request.c( 'TMPro.TMP_Settings' )
  var i1699 = data
  i1698.assetVersion = i1699[0]
  i1698.m_TextWrappingMode = i1699[1]
  i1698.m_enableKerning = !!i1699[2]
  var i1701 = i1699[3]
  var i1700 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1701.length; i += 1) {
    i1700.add(i1701[i + 0]);
  }
  i1698.m_ActiveFontFeatures = i1700
  i1698.m_enableExtraPadding = !!i1699[4]
  i1698.m_enableTintAllSprites = !!i1699[5]
  i1698.m_enableParseEscapeCharacters = !!i1699[6]
  i1698.m_EnableRaycastTarget = !!i1699[7]
  i1698.m_GetFontFeaturesAtRuntime = !!i1699[8]
  i1698.m_missingGlyphCharacter = i1699[9]
  i1698.m_ClearDynamicDataOnBuild = !!i1699[10]
  i1698.m_warningsDisabled = !!i1699[11]
  request.r(i1699[12], i1699[13], 0, i1698, 'm_defaultFontAsset')
  i1698.m_defaultFontAssetPath = i1699[14]
  i1698.m_defaultFontSize = i1699[15]
  i1698.m_defaultAutoSizeMinRatio = i1699[16]
  i1698.m_defaultAutoSizeMaxRatio = i1699[17]
  i1698.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1699[18], i1699[19] )
  i1698.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1699[20], i1699[21] )
  i1698.m_autoSizeTextContainer = !!i1699[22]
  i1698.m_IsTextObjectScaleStatic = !!i1699[23]
  var i1703 = i1699[24]
  var i1702 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1703.length; i += 2) {
  request.r(i1703[i + 0], i1703[i + 1], 1, i1702, '')
  }
  i1698.m_fallbackFontAssets = i1702
  i1698.m_matchMaterialPreset = !!i1699[25]
  i1698.m_HideSubTextObjects = !!i1699[26]
  request.r(i1699[27], i1699[28], 0, i1698, 'm_defaultSpriteAsset')
  i1698.m_defaultSpriteAssetPath = i1699[29]
  i1698.m_enableEmojiSupport = !!i1699[30]
  i1698.m_MissingCharacterSpriteUnicode = i1699[31]
  var i1705 = i1699[32]
  var i1704 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1705.length; i += 2) {
  request.r(i1705[i + 0], i1705[i + 1], 1, i1704, '')
  }
  i1698.m_EmojiFallbackTextAssets = i1704
  i1698.m_defaultColorGradientPresetsPath = i1699[33]
  request.r(i1699[34], i1699[35], 0, i1698, 'm_defaultStyleSheet')
  i1698.m_StyleSheetsResourcePath = i1699[36]
  request.r(i1699[37], i1699[38], 0, i1698, 'm_leadingCharacters')
  request.r(i1699[39], i1699[40], 0, i1698, 'm_followingCharacters')
  i1698.m_UseModernHangulLineBreakingRules = !!i1699[41]
  return i1698
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1708 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1709 = data
  request.r(i1709[0], i1709[1], 0, i1708, 'spriteSheet')
  var i1711 = i1709[2]
  var i1710 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1711.length; i += 1) {
    i1710.add(request.d('TMPro.TMP_Sprite', i1711[i + 0]));
  }
  i1708.spriteInfoList = i1710
  var i1713 = i1709[3]
  var i1712 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1713.length; i += 2) {
  request.r(i1713[i + 0], i1713[i + 1], 1, i1712, '')
  }
  i1708.fallbackSpriteAssets = i1712
  var i1715 = i1709[4]
  var i1714 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1715.length; i += 1) {
    i1714.add(request.d('TMPro.TMP_SpriteCharacter', i1715[i + 0]));
  }
  i1708.m_SpriteCharacterTable = i1714
  var i1717 = i1709[5]
  var i1716 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1717.length; i += 1) {
    i1716.add(request.d('TMPro.TMP_SpriteGlyph', i1717[i + 0]));
  }
  i1708.m_GlyphTable = i1716
  i1708.m_Version = i1709[6]
  i1708.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1709[7], i1708.m_FaceInfo)
  request.r(i1709[8], i1709[9], 0, i1708, 'm_Material')
  return i1708
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1720 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1721 = data
  i1720.name = i1721[0]
  i1720.hashCode = i1721[1]
  i1720.unicode = i1721[2]
  i1720.pivot = new pc.Vec2( i1721[3], i1721[4] )
  request.r(i1721[5], i1721[6], 0, i1720, 'sprite')
  i1720.id = i1721[7]
  i1720.x = i1721[8]
  i1720.y = i1721[9]
  i1720.width = i1721[10]
  i1720.height = i1721[11]
  i1720.xOffset = i1721[12]
  i1720.yOffset = i1721[13]
  i1720.xAdvance = i1721[14]
  i1720.scale = i1721[15]
  return i1720
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1726 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1727 = data
  i1726.m_Name = i1727[0]
  i1726.m_ElementType = i1727[1]
  i1726.m_Unicode = i1727[2]
  i1726.m_GlyphIndex = i1727[3]
  i1726.m_Scale = i1727[4]
  return i1726
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1730 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1731 = data
  request.r(i1731[0], i1731[1], 0, i1730, 'sprite')
  i1730.m_Index = i1731[2]
  i1730.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1731[3], i1730.m_Metrics)
  i1730.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1731[4], i1730.m_GlyphRect)
  i1730.m_Scale = i1731[5]
  i1730.m_AtlasIndex = i1731[6]
  i1730.m_ClassDefinitionType = i1731[7]
  return i1730
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1732 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1733 = data
  var i1735 = i1733[0]
  var i1734 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1735.length; i += 1) {
    i1734.add(request.d('TMPro.TMP_Style', i1735[i + 0]));
  }
  i1732.m_StyleList = i1734
  return i1732
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1738 = root || request.c( 'TMPro.TMP_Style' )
  var i1739 = data
  i1738.m_Name = i1739[0]
  i1738.m_HashCode = i1739[1]
  i1738.m_OpeningDefinition = i1739[2]
  i1738.m_ClosingDefinition = i1739[3]
  i1738.m_OpeningTagArray = i1739[4]
  i1738.m_ClosingTagArray = i1739[5]
  return i1738
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1740 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1741 = data
  var i1743 = i1741[0]
  var i1742 = []
  for(var i = 0; i < i1743.length; i += 1) {
    i1742.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1743[i + 0]) );
  }
  i1740.files = i1742
  i1740.componentToPrefabIds = i1741[1]
  return i1740
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1747 = data
  i1746.path = i1747[0]
  request.r(i1747[1], i1747[2], 0, i1746, 'unityObject')
  return i1746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1748 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1749 = data
  var i1751 = i1749[0]
  var i1750 = []
  for(var i = 0; i < i1751.length; i += 1) {
    i1750.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1751[i + 0]) );
  }
  i1748.scriptsExecutionOrder = i1750
  var i1753 = i1749[1]
  var i1752 = []
  for(var i = 0; i < i1753.length; i += 1) {
    i1752.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1753[i + 0]) );
  }
  i1748.sortingLayers = i1752
  var i1755 = i1749[2]
  var i1754 = []
  for(var i = 0; i < i1755.length; i += 1) {
    i1754.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1755[i + 0]) );
  }
  i1748.cullingLayers = i1754
  i1748.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1749[3], i1748.timeSettings)
  i1748.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1749[4], i1748.physicsSettings)
  i1748.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1749[5], i1748.physics2DSettings)
  i1748.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1749[6], i1748.qualitySettings)
  i1748.enableRealtimeShadows = !!i1749[7]
  i1748.enableAutoInstancing = !!i1749[8]
  i1748.enableStaticBatching = !!i1749[9]
  i1748.enableDynamicBatching = !!i1749[10]
  i1748.usePreservativeDynamicBatching = !!i1749[11]
  i1748.lightmapEncodingQuality = i1749[12]
  i1748.desiredColorSpace = i1749[13]
  var i1757 = i1749[14]
  var i1756 = []
  for(var i = 0; i < i1757.length; i += 1) {
    i1756.push( i1757[i + 0] );
  }
  i1748.allTags = i1756
  return i1748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1761 = data
  i1760.name = i1761[0]
  i1760.value = i1761[1]
  return i1760
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1764 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1765 = data
  i1764.id = i1765[0]
  i1764.name = i1765[1]
  i1764.value = i1765[2]
  return i1764
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1768 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1769 = data
  i1768.id = i1769[0]
  i1768.name = i1769[1]
  return i1768
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1771 = data
  i1770.fixedDeltaTime = i1771[0]
  i1770.maximumDeltaTime = i1771[1]
  i1770.timeScale = i1771[2]
  i1770.maximumParticleTimestep = i1771[3]
  return i1770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1773 = data
  i1772.gravity = new pc.Vec3( i1773[0], i1773[1], i1773[2] )
  i1772.defaultSolverIterations = i1773[3]
  i1772.bounceThreshold = i1773[4]
  i1772.autoSyncTransforms = !!i1773[5]
  i1772.autoSimulation = !!i1773[6]
  var i1775 = i1773[7]
  var i1774 = []
  for(var i = 0; i < i1775.length; i += 1) {
    i1774.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1775[i + 0]) );
  }
  i1772.collisionMatrix = i1774
  return i1772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1779 = data
  i1778.enabled = !!i1779[0]
  i1778.layerId = i1779[1]
  i1778.otherLayerId = i1779[2]
  return i1778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1780 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1781 = data
  request.r(i1781[0], i1781[1], 0, i1780, 'material')
  i1780.gravity = new pc.Vec2( i1781[2], i1781[3] )
  i1780.positionIterations = i1781[4]
  i1780.velocityIterations = i1781[5]
  i1780.velocityThreshold = i1781[6]
  i1780.maxLinearCorrection = i1781[7]
  i1780.maxAngularCorrection = i1781[8]
  i1780.maxTranslationSpeed = i1781[9]
  i1780.maxRotationSpeed = i1781[10]
  i1780.baumgarteScale = i1781[11]
  i1780.baumgarteTOIScale = i1781[12]
  i1780.timeToSleep = i1781[13]
  i1780.linearSleepTolerance = i1781[14]
  i1780.angularSleepTolerance = i1781[15]
  i1780.defaultContactOffset = i1781[16]
  i1780.autoSimulation = !!i1781[17]
  i1780.queriesHitTriggers = !!i1781[18]
  i1780.queriesStartInColliders = !!i1781[19]
  i1780.callbacksOnDisable = !!i1781[20]
  i1780.reuseCollisionCallbacks = !!i1781[21]
  i1780.autoSyncTransforms = !!i1781[22]
  var i1783 = i1781[23]
  var i1782 = []
  for(var i = 0; i < i1783.length; i += 1) {
    i1782.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1783[i + 0]) );
  }
  i1780.collisionMatrix = i1782
  return i1780
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1786 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1787 = data
  i1786.enabled = !!i1787[0]
  i1786.layerId = i1787[1]
  i1786.otherLayerId = i1787[2]
  return i1786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1789 = data
  var i1791 = i1789[0]
  var i1790 = []
  for(var i = 0; i < i1791.length; i += 1) {
    i1790.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1791[i + 0]) );
  }
  i1788.qualityLevels = i1790
  var i1793 = i1789[1]
  var i1792 = []
  for(var i = 0; i < i1793.length; i += 1) {
    i1792.push( i1793[i + 0] );
  }
  i1788.names = i1792
  i1788.shadows = i1789[2]
  i1788.anisotropicFiltering = i1789[3]
  i1788.antiAliasing = i1789[4]
  i1788.lodBias = i1789[5]
  i1788.shadowCascades = i1789[6]
  i1788.shadowDistance = i1789[7]
  i1788.shadowmaskMode = i1789[8]
  i1788.shadowProjection = i1789[9]
  i1788.shadowResolution = i1789[10]
  i1788.softParticles = !!i1789[11]
  i1788.softVegetation = !!i1789[12]
  i1788.activeColorSpace = i1789[13]
  i1788.desiredColorSpace = i1789[14]
  i1788.masterTextureLimit = i1789[15]
  i1788.maxQueuedFrames = i1789[16]
  i1788.particleRaycastBudget = i1789[17]
  i1788.pixelLightCount = i1789[18]
  i1788.realtimeReflectionProbes = !!i1789[19]
  i1788.shadowCascade2Split = i1789[20]
  i1788.shadowCascade4Split = new pc.Vec3( i1789[21], i1789[22], i1789[23] )
  i1788.streamingMipmapsActive = !!i1789[24]
  i1788.vSyncCount = i1789[25]
  i1788.asyncUploadBufferSize = i1789[26]
  i1788.asyncUploadTimeSlice = i1789[27]
  i1788.billboardsFaceCameraPosition = !!i1789[28]
  i1788.shadowNearPlaneOffset = i1789[29]
  i1788.streamingMipmapsMemoryBudget = i1789[30]
  i1788.maximumLODLevel = i1789[31]
  i1788.streamingMipmapsAddAllCameras = !!i1789[32]
  i1788.streamingMipmapsMaxLevelReduction = i1789[33]
  i1788.streamingMipmapsRenderersPerFrame = i1789[34]
  i1788.resolutionScalingFixedDPIFactor = i1789[35]
  i1788.streamingMipmapsMaxFileIORequests = i1789[36]
  i1788.currentQualityLevel = i1789[37]
  return i1788
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1796 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1797 = data
  request.r(i1797[0], i1797[1], 0, i1796, 'm_ObjectArgument')
  i1796.m_ObjectArgumentAssemblyTypeName = i1797[2]
  i1796.m_IntArgument = i1797[3]
  i1796.m_FloatArgument = i1797[4]
  i1796.m_StringArgument = i1797[5]
  i1796.m_BoolArgument = !!i1797[6]
  return i1796
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1798 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1799 = data
  i1798.m_GlyphIndex = i1799[0]
  i1798.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1799[1], i1798.m_GlyphValueRecord)
  return i1798
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1800 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1801 = data
  i1800.m_XCoordinate = i1801[0]
  i1800.m_YCoordinate = i1801[1]
  return i1800
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1802 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1803 = data
  i1802.m_XPositionAdjustment = i1803[0]
  i1802.m_YPositionAdjustment = i1803[1]
  return i1802
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1804 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1805 = data
  i1804.xPlacement = i1805[0]
  i1804.yPlacement = i1805[1]
  i1804.xAdvance = i1805[2]
  i1804.yAdvance = i1805[3]
  return i1804
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1806 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1807 = data
  i1806.m_XPlacement = i1807[0]
  i1806.m_YPlacement = i1807[1]
  i1806.m_XAdvance = i1807[2]
  i1806.m_YAdvance = i1807[3]
  return i1806
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

Deserializers.creativeName = "BP_V27_NgocNDL_TamNTM";

Deserializers.lunaAppID = "31727";

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

Deserializers.buildID = "4b138241-9a20-4dc5-8bad-48ada3face9f";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

