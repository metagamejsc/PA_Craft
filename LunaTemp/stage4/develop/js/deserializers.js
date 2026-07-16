var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1308 = root || request.c( 'UnityEngine.JointSpring' )
  var i1309 = data
  i1308.spring = i1309[0]
  i1308.damper = i1309[1]
  i1308.targetPosition = i1309[2]
  return i1308
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1310 = root || request.c( 'UnityEngine.JointMotor' )
  var i1311 = data
  i1310.m_TargetVelocity = i1311[0]
  i1310.m_Force = i1311[1]
  i1310.m_FreeSpin = i1311[2]
  return i1310
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1312 = root || request.c( 'UnityEngine.JointLimits' )
  var i1313 = data
  i1312.m_Min = i1313[0]
  i1312.m_Max = i1313[1]
  i1312.m_Bounciness = i1313[2]
  i1312.m_BounceMinVelocity = i1313[3]
  i1312.m_ContactDistance = i1313[4]
  i1312.minBounce = i1313[5]
  i1312.maxBounce = i1313[6]
  return i1312
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1314 = root || request.c( 'UnityEngine.JointDrive' )
  var i1315 = data
  i1314.m_PositionSpring = i1315[0]
  i1314.m_PositionDamper = i1315[1]
  i1314.m_MaximumForce = i1315[2]
  i1314.m_UseAcceleration = i1315[3]
  return i1314
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1316 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1317 = data
  i1316.m_Spring = i1317[0]
  i1316.m_Damper = i1317[1]
  return i1316
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1318 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1319 = data
  i1318.m_Limit = i1319[0]
  i1318.m_Bounciness = i1319[1]
  i1318.m_ContactDistance = i1319[2]
  return i1318
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1320 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1321 = data
  i1320.m_ExtremumSlip = i1321[0]
  i1320.m_ExtremumValue = i1321[1]
  i1320.m_AsymptoteSlip = i1321[2]
  i1320.m_AsymptoteValue = i1321[3]
  i1320.m_Stiffness = i1321[4]
  return i1320
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1322 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1323 = data
  i1322.m_LowerAngle = i1323[0]
  i1322.m_UpperAngle = i1323[1]
  return i1322
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1324 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1325 = data
  i1324.m_MotorSpeed = i1325[0]
  i1324.m_MaximumMotorTorque = i1325[1]
  return i1324
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1326 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1327 = data
  i1326.m_DampingRatio = i1327[0]
  i1326.m_Frequency = i1327[1]
  i1326.m_Angle = i1327[2]
  return i1326
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1328 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1329 = data
  i1328.m_LowerTranslation = i1329[0]
  i1328.m_UpperTranslation = i1329[1]
  return i1328
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1331 = data
  i1330.name = i1331[0]
  i1330.width = i1331[1]
  i1330.height = i1331[2]
  i1330.mipmapCount = i1331[3]
  i1330.anisoLevel = i1331[4]
  i1330.filterMode = i1331[5]
  i1330.hdr = !!i1331[6]
  i1330.format = i1331[7]
  i1330.wrapMode = i1331[8]
  i1330.alphaIsTransparency = !!i1331[9]
  i1330.alphaSource = i1331[10]
  i1330.graphicsFormat = i1331[11]
  i1330.sRGBTexture = !!i1331[12]
  i1330.desiredColorSpace = i1331[13]
  i1330.wrapU = i1331[14]
  i1330.wrapV = i1331[15]
  return i1330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1332 = root || new pc.UnityMaterial()
  var i1333 = data
  i1332.name = i1333[0]
  request.r(i1333[1], i1333[2], 0, i1332, 'shader')
  i1332.renderQueue = i1333[3]
  i1332.enableInstancing = !!i1333[4]
  var i1335 = i1333[5]
  var i1334 = []
  for(var i = 0; i < i1335.length; i += 1) {
    i1334.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1335[i + 0]) );
  }
  i1332.floatParameters = i1334
  var i1337 = i1333[6]
  var i1336 = []
  for(var i = 0; i < i1337.length; i += 1) {
    i1336.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1337[i + 0]) );
  }
  i1332.colorParameters = i1336
  var i1339 = i1333[7]
  var i1338 = []
  for(var i = 0; i < i1339.length; i += 1) {
    i1338.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1339[i + 0]) );
  }
  i1332.vectorParameters = i1338
  var i1341 = i1333[8]
  var i1340 = []
  for(var i = 0; i < i1341.length; i += 1) {
    i1340.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1341[i + 0]) );
  }
  i1332.textureParameters = i1340
  var i1343 = i1333[9]
  var i1342 = []
  for(var i = 0; i < i1343.length; i += 1) {
    i1342.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1343[i + 0]) );
  }
  i1332.materialFlags = i1342
  return i1332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1347 = data
  i1346.name = i1347[0]
  i1346.value = i1347[1]
  return i1346
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1350 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1351 = data
  i1350.name = i1351[0]
  i1350.value = new pc.Color(i1351[1], i1351[2], i1351[3], i1351[4])
  return i1350
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1355 = data
  i1354.name = i1355[0]
  i1354.value = new pc.Vec4( i1355[1], i1355[2], i1355[3], i1355[4] )
  return i1354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1358 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1359 = data
  i1358.name = i1359[0]
  request.r(i1359[1], i1359[2], 0, i1358, 'value')
  return i1358
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1363 = data
  i1362.name = i1363[0]
  i1362.enabled = !!i1363[1]
  return i1362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1365 = data
  i1364.name = i1365[0]
  i1364.index = i1365[1]
  i1364.startup = !!i1365[2]
  return i1364
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1366 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1367 = data
  i1366.aspect = i1367[0]
  i1366.orthographic = !!i1367[1]
  i1366.orthographicSize = i1367[2]
  i1366.backgroundColor = new pc.Color(i1367[3], i1367[4], i1367[5], i1367[6])
  i1366.nearClipPlane = i1367[7]
  i1366.farClipPlane = i1367[8]
  i1366.fieldOfView = i1367[9]
  i1366.depth = i1367[10]
  i1366.clearFlags = i1367[11]
  i1366.cullingMask = i1367[12]
  i1366.rect = i1367[13]
  request.r(i1367[14], i1367[15], 0, i1366, 'targetTexture')
  i1366.usePhysicalProperties = !!i1367[16]
  i1366.focalLength = i1367[17]
  i1366.sensorSize = new pc.Vec2( i1367[18], i1367[19] )
  i1366.lensShift = new pc.Vec2( i1367[20], i1367[21] )
  i1366.gateFit = i1367[22]
  i1366.commandBufferCount = i1367[23]
  i1366.cameraType = i1367[24]
  i1366.enabled = !!i1367[25]
  return i1366
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1369 = data
  i1368.name = i1369[0]
  i1368.tagId = i1369[1]
  i1368.enabled = !!i1369[2]
  i1368.isStatic = !!i1369[3]
  i1368.layer = i1369[4]
  return i1368
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1370 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1371 = data
  request.r(i1371[0], i1371[1], 0, i1370, 'm_FirstSelected')
  i1370.m_sendNavigationEvents = !!i1371[2]
  i1370.m_DragThreshold = i1371[3]
  return i1370
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1372 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1373 = data
  i1372.m_HorizontalAxis = i1373[0]
  i1372.m_VerticalAxis = i1373[1]
  i1372.m_SubmitButton = i1373[2]
  i1372.m_CancelButton = i1373[3]
  i1372.m_InputActionsPerSecond = i1373[4]
  i1372.m_RepeatDelay = i1373[5]
  i1372.m_ForceModuleActive = !!i1373[6]
  i1372.m_SendPointerHoverToParent = !!i1373[7]
  return i1372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1375 = data
  i1374.pivot = new pc.Vec2( i1375[0], i1375[1] )
  i1374.anchorMin = new pc.Vec2( i1375[2], i1375[3] )
  i1374.anchorMax = new pc.Vec2( i1375[4], i1375[5] )
  i1374.sizeDelta = new pc.Vec2( i1375[6], i1375[7] )
  i1374.anchoredPosition3D = new pc.Vec3( i1375[8], i1375[9], i1375[10] )
  i1374.rotation = new pc.Quat(i1375[11], i1375[12], i1375[13], i1375[14])
  i1374.scale = new pc.Vec3( i1375[15], i1375[16], i1375[17] )
  return i1374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1377 = data
  i1376.planeDistance = i1377[0]
  i1376.referencePixelsPerUnit = i1377[1]
  i1376.isFallbackOverlay = !!i1377[2]
  i1376.renderMode = i1377[3]
  i1376.renderOrder = i1377[4]
  i1376.sortingLayerName = i1377[5]
  i1376.sortingOrder = i1377[6]
  i1376.scaleFactor = i1377[7]
  request.r(i1377[8], i1377[9], 0, i1376, 'worldCamera')
  i1376.overrideSorting = !!i1377[10]
  i1376.pixelPerfect = !!i1377[11]
  i1376.targetDisplay = i1377[12]
  i1376.overridePixelPerfect = !!i1377[13]
  i1376.enabled = !!i1377[14]
  return i1376
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1378 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1379 = data
  i1378.m_UiScaleMode = i1379[0]
  i1378.m_ReferencePixelsPerUnit = i1379[1]
  i1378.m_ScaleFactor = i1379[2]
  i1378.m_ReferenceResolution = new pc.Vec2( i1379[3], i1379[4] )
  i1378.m_ScreenMatchMode = i1379[5]
  i1378.m_MatchWidthOrHeight = i1379[6]
  i1378.m_PhysicalUnit = i1379[7]
  i1378.m_FallbackScreenDPI = i1379[8]
  i1378.m_DefaultSpriteDPI = i1379[9]
  i1378.m_DynamicPixelsPerUnit = i1379[10]
  i1378.m_PresetInfoIsWorld = !!i1379[11]
  return i1378
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1380 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1381 = data
  i1380.m_IgnoreReversedGraphics = !!i1381[0]
  i1380.m_BlockingObjects = i1381[1]
  i1380.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1381[2] )
  return i1380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1382 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1383 = data
  i1382.cullTransparentMesh = !!i1383[0]
  return i1382
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1384 = root || request.c( 'UnityEngine.UI.Image' )
  var i1385 = data
  request.r(i1385[0], i1385[1], 0, i1384, 'm_Sprite')
  i1384.m_Type = i1385[2]
  i1384.m_PreserveAspect = !!i1385[3]
  i1384.m_FillCenter = !!i1385[4]
  i1384.m_FillMethod = i1385[5]
  i1384.m_FillAmount = i1385[6]
  i1384.m_FillClockwise = !!i1385[7]
  i1384.m_FillOrigin = i1385[8]
  i1384.m_UseSpriteMesh = !!i1385[9]
  i1384.m_PixelsPerUnitMultiplier = i1385[10]
  request.r(i1385[11], i1385[12], 0, i1384, 'm_Material')
  i1384.m_Maskable = !!i1385[13]
  i1384.m_Color = new pc.Color(i1385[14], i1385[15], i1385[16], i1385[17])
  i1384.m_RaycastTarget = !!i1385[18]
  i1384.m_RaycastPadding = new pc.Vec4( i1385[19], i1385[20], i1385[21], i1385[22] )
  return i1384
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i1386 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i1387 = data
  i1386.m_AspectMode = i1387[0]
  i1386.m_AspectRatio = i1387[1]
  return i1386
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i1388 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i1389 = data
  i1388.m_hasFontAssetChanged = !!i1389[0]
  request.r(i1389[1], i1389[2], 0, i1388, 'm_baseMaterial')
  i1388.m_maskOffset = new pc.Vec4( i1389[3], i1389[4], i1389[5], i1389[6] )
  i1388.m_text = i1389[7]
  i1388.m_isRightToLeft = !!i1389[8]
  request.r(i1389[9], i1389[10], 0, i1388, 'm_fontAsset')
  request.r(i1389[11], i1389[12], 0, i1388, 'm_sharedMaterial')
  var i1391 = i1389[13]
  var i1390 = []
  for(var i = 0; i < i1391.length; i += 2) {
  request.r(i1391[i + 0], i1391[i + 1], 2, i1390, '')
  }
  i1388.m_fontSharedMaterials = i1390
  request.r(i1389[14], i1389[15], 0, i1388, 'm_fontMaterial')
  var i1393 = i1389[16]
  var i1392 = []
  for(var i = 0; i < i1393.length; i += 2) {
  request.r(i1393[i + 0], i1393[i + 1], 2, i1392, '')
  }
  i1388.m_fontMaterials = i1392
  i1388.m_fontColor32 = UnityEngine.Color32.ConstructColor(i1389[17], i1389[18], i1389[19], i1389[20])
  i1388.m_fontColor = new pc.Color(i1389[21], i1389[22], i1389[23], i1389[24])
  i1388.m_enableVertexGradient = !!i1389[25]
  i1388.m_colorMode = i1389[26]
  i1388.m_fontColorGradient = request.d('TMPro.VertexGradient', i1389[27], i1388.m_fontColorGradient)
  request.r(i1389[28], i1389[29], 0, i1388, 'm_fontColorGradientPreset')
  request.r(i1389[30], i1389[31], 0, i1388, 'm_spriteAsset')
  i1388.m_tintAllSprites = !!i1389[32]
  request.r(i1389[33], i1389[34], 0, i1388, 'm_StyleSheet')
  i1388.m_TextStyleHashCode = i1389[35]
  i1388.m_overrideHtmlColors = !!i1389[36]
  i1388.m_faceColor = UnityEngine.Color32.ConstructColor(i1389[37], i1389[38], i1389[39], i1389[40])
  i1388.m_fontSize = i1389[41]
  i1388.m_fontSizeBase = i1389[42]
  i1388.m_fontWeight = i1389[43]
  i1388.m_enableAutoSizing = !!i1389[44]
  i1388.m_fontSizeMin = i1389[45]
  i1388.m_fontSizeMax = i1389[46]
  i1388.m_fontStyle = i1389[47]
  i1388.m_HorizontalAlignment = i1389[48]
  i1388.m_VerticalAlignment = i1389[49]
  i1388.m_textAlignment = i1389[50]
  i1388.m_characterSpacing = i1389[51]
  i1388.m_characterHorizontalScale = i1389[52]
  i1388.m_wordSpacing = i1389[53]
  i1388.m_lineSpacing = i1389[54]
  i1388.m_lineSpacingMax = i1389[55]
  i1388.m_paragraphSpacing = i1389[56]
  i1388.m_charWidthMaxAdj = i1389[57]
  i1388.m_TextWrappingMode = i1389[58]
  i1388.m_wordWrappingRatios = i1389[59]
  i1388.m_overflowMode = i1389[60]
  request.r(i1389[61], i1389[62], 0, i1388, 'm_linkedTextComponent')
  request.r(i1389[63], i1389[64], 0, i1388, 'parentLinkedComponent')
  i1388.m_enableKerning = !!i1389[65]
  var i1395 = i1389[66]
  var i1394 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1395.length; i += 1) {
    i1394.add(i1395[i + 0]);
  }
  i1388.m_ActiveFontFeatures = i1394
  i1388.m_enableExtraPadding = !!i1389[67]
  i1388.checkPaddingRequired = !!i1389[68]
  i1388.m_isRichText = !!i1389[69]
  i1388.m_parseCtrlCharacters = !!i1389[70]
  i1388.m_isOrthographic = !!i1389[71]
  i1388.m_isCullingEnabled = !!i1389[72]
  i1388.m_horizontalMapping = i1389[73]
  i1388.m_verticalMapping = i1389[74]
  i1388.m_uvLineOffset = i1389[75]
  i1388.m_geometrySortingOrder = i1389[76]
  i1388.m_IsTextObjectScaleStatic = !!i1389[77]
  i1388.m_VertexBufferAutoSizeReduction = !!i1389[78]
  i1388.m_useMaxVisibleDescender = !!i1389[79]
  i1388.m_pageToDisplay = i1389[80]
  i1388.m_margin = new pc.Vec4( i1389[81], i1389[82], i1389[83], i1389[84] )
  i1388.m_isUsingLegacyAnimationComponent = !!i1389[85]
  i1388.m_isVolumetricText = !!i1389[86]
  request.r(i1389[87], i1389[88], 0, i1388, 'm_Material')
  i1388.m_EmojiFallbackSupport = !!i1389[89]
  i1388.m_Maskable = !!i1389[90]
  i1388.m_Color = new pc.Color(i1389[91], i1389[92], i1389[93], i1389[94])
  i1388.m_RaycastTarget = !!i1389[95]
  i1388.m_RaycastPadding = new pc.Vec4( i1389[96], i1389[97], i1389[98], i1389[99] )
  return i1388
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i1398 = root || request.c( 'TMPro.VertexGradient' )
  var i1399 = data
  i1398.topLeft = new pc.Color(i1399[0], i1399[1], i1399[2], i1399[3])
  i1398.topRight = new pc.Color(i1399[4], i1399[5], i1399[6], i1399[7])
  i1398.bottomLeft = new pc.Color(i1399[8], i1399[9], i1399[10], i1399[11])
  i1398.bottomRight = new pc.Color(i1399[12], i1399[13], i1399[14], i1399[15])
  return i1398
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1402 = root || request.c( 'UnityEngine.UI.Text' )
  var i1403 = data
  i1402.m_FontData = request.d('UnityEngine.UI.FontData', i1403[0], i1402.m_FontData)
  i1402.m_Text = i1403[1]
  request.r(i1403[2], i1403[3], 0, i1402, 'm_Material')
  i1402.m_Maskable = !!i1403[4]
  i1402.m_Color = new pc.Color(i1403[5], i1403[6], i1403[7], i1403[8])
  i1402.m_RaycastTarget = !!i1403[9]
  i1402.m_RaycastPadding = new pc.Vec4( i1403[10], i1403[11], i1403[12], i1403[13] )
  return i1402
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1404 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1405 = data
  request.r(i1405[0], i1405[1], 0, i1404, 'm_Font')
  i1404.m_FontSize = i1405[2]
  i1404.m_FontStyle = i1405[3]
  i1404.m_BestFit = !!i1405[4]
  i1404.m_MinSize = i1405[5]
  i1404.m_MaxSize = i1405[6]
  i1404.m_Alignment = i1405[7]
  i1404.m_AlignByGeometry = !!i1405[8]
  i1404.m_RichText = !!i1405[9]
  i1404.m_HorizontalOverflow = i1405[10]
  i1404.m_VerticalOverflow = i1405[11]
  i1404.m_LineSpacing = i1405[12]
  return i1404
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i1406 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i1407 = data
  request.r(i1407[0], i1407[1], 0, i1406, 'm_Texture')
  i1406.m_UVRect = UnityEngine.Rect.MinMaxRect(i1407[2], i1407[3], i1407[4], i1407[5])
  request.r(i1407[6], i1407[7], 0, i1406, 'm_Material')
  i1406.m_Maskable = !!i1407[8]
  i1406.m_Color = new pc.Color(i1407[9], i1407[10], i1407[11], i1407[12])
  i1406.m_RaycastTarget = !!i1407[13]
  i1406.m_RaycastPadding = new pc.Vec4( i1407[14], i1407[15], i1407[16], i1407[17] )
  return i1406
}

Deserializers["TutController"] = function (request, data, root) {
  var i1408 = root || request.c( 'TutController' )
  var i1409 = data
  var i1411 = i1409[0]
  var i1410 = new (System.Collections.Generic.List$1(Bridge.ns('Option')))
  for(var i = 0; i < i1411.length; i += 1) {
    i1410.add(request.d('Option', i1411[i + 0]));
  }
  i1408.options = i1410
  i1408.fromScale = i1409[1]
  i1408.toScale = i1409[2]
  i1408.scaleTime = i1409[3]
  i1408.moveTime = i1409[4]
  return i1408
}

Deserializers["Option"] = function (request, data, root) {
  var i1414 = root || request.c( 'Option' )
  var i1415 = data
  i1414.Position = new pc.Vec3( i1415[0], i1415[1], i1415[2] )
  request.r(i1415[3], i1415[4], 0, i1414, 'Demo')
  return i1414
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1416 = root || request.c( 'UnityEngine.UI.Button' )
  var i1417 = data
  i1416.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1417[0], i1416.m_OnClick)
  i1416.m_Navigation = request.d('UnityEngine.UI.Navigation', i1417[1], i1416.m_Navigation)
  i1416.m_Transition = i1417[2]
  i1416.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1417[3], i1416.m_Colors)
  i1416.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1417[4], i1416.m_SpriteState)
  i1416.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1417[5], i1416.m_AnimationTriggers)
  i1416.m_Interactable = !!i1417[6]
  request.r(i1417[7], i1417[8], 0, i1416, 'm_TargetGraphic')
  return i1416
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1418 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1419 = data
  i1418.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1419[0], i1418.m_PersistentCalls)
  return i1418
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1420 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1421 = data
  var i1423 = i1421[0]
  var i1422 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1423.length; i += 1) {
    i1422.add(request.d('UnityEngine.Events.PersistentCall', i1423[i + 0]));
  }
  i1420.m_Calls = i1422
  return i1420
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1426 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1427 = data
  request.r(i1427[0], i1427[1], 0, i1426, 'm_Target')
  i1426.m_TargetAssemblyTypeName = i1427[2]
  i1426.m_MethodName = i1427[3]
  i1426.m_Mode = i1427[4]
  i1426.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1427[5], i1426.m_Arguments)
  i1426.m_CallState = i1427[6]
  return i1426
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1428 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1429 = data
  i1428.m_Mode = i1429[0]
  i1428.m_WrapAround = !!i1429[1]
  request.r(i1429[2], i1429[3], 0, i1428, 'm_SelectOnUp')
  request.r(i1429[4], i1429[5], 0, i1428, 'm_SelectOnDown')
  request.r(i1429[6], i1429[7], 0, i1428, 'm_SelectOnLeft')
  request.r(i1429[8], i1429[9], 0, i1428, 'm_SelectOnRight')
  return i1428
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1430 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1431 = data
  i1430.m_NormalColor = new pc.Color(i1431[0], i1431[1], i1431[2], i1431[3])
  i1430.m_HighlightedColor = new pc.Color(i1431[4], i1431[5], i1431[6], i1431[7])
  i1430.m_PressedColor = new pc.Color(i1431[8], i1431[9], i1431[10], i1431[11])
  i1430.m_SelectedColor = new pc.Color(i1431[12], i1431[13], i1431[14], i1431[15])
  i1430.m_DisabledColor = new pc.Color(i1431[16], i1431[17], i1431[18], i1431[19])
  i1430.m_ColorMultiplier = i1431[20]
  i1430.m_FadeDuration = i1431[21]
  return i1430
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1433 = data
  request.r(i1433[0], i1433[1], 0, i1432, 'm_HighlightedSprite')
  request.r(i1433[2], i1433[3], 0, i1432, 'm_PressedSprite')
  request.r(i1433[4], i1433[5], 0, i1432, 'm_SelectedSprite')
  request.r(i1433[6], i1433[7], 0, i1432, 'm_DisabledSprite')
  return i1432
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1434 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1435 = data
  i1434.m_NormalTrigger = i1435[0]
  i1434.m_HighlightedTrigger = i1435[1]
  i1434.m_PressedTrigger = i1435[2]
  i1434.m_SelectedTrigger = i1435[3]
  i1434.m_DisabledTrigger = i1435[4]
  return i1434
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1436 = root || request.c( 'LunaController' )
  var i1437 = data
  i1436.TimePlay = i1437[0]
  i1436.LimitTimePlay = !!i1437[1]
  request.r(i1437[2], i1437[3], 0, i1436, 'endCard')
  return i1436
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i1438 = root || request.c( 'LayoutController' )
  var i1439 = data
  request.r(i1439[0], i1439[1], 0, i1438, 'optionV')
  request.r(i1439[2], i1439[3], 0, i1438, 'optionH')
  return i1438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1440 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1441 = data
  request.r(i1441[0], i1441[1], 0, i1440, 'clip')
  request.r(i1441[2], i1441[3], 0, i1440, 'outputAudioMixerGroup')
  i1440.playOnAwake = !!i1441[4]
  i1440.loop = !!i1441[5]
  i1440.time = i1441[6]
  i1440.volume = i1441[7]
  i1440.pitch = i1441[8]
  i1440.enabled = !!i1441[9]
  return i1440
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1443 = data
  i1442.ambientIntensity = i1443[0]
  i1442.reflectionIntensity = i1443[1]
  i1442.ambientMode = i1443[2]
  i1442.ambientLight = new pc.Color(i1443[3], i1443[4], i1443[5], i1443[6])
  i1442.ambientSkyColor = new pc.Color(i1443[7], i1443[8], i1443[9], i1443[10])
  i1442.ambientGroundColor = new pc.Color(i1443[11], i1443[12], i1443[13], i1443[14])
  i1442.ambientEquatorColor = new pc.Color(i1443[15], i1443[16], i1443[17], i1443[18])
  i1442.fogColor = new pc.Color(i1443[19], i1443[20], i1443[21], i1443[22])
  i1442.fogEndDistance = i1443[23]
  i1442.fogStartDistance = i1443[24]
  i1442.fogDensity = i1443[25]
  i1442.fog = !!i1443[26]
  request.r(i1443[27], i1443[28], 0, i1442, 'skybox')
  i1442.fogMode = i1443[29]
  var i1445 = i1443[30]
  var i1444 = []
  for(var i = 0; i < i1445.length; i += 1) {
    i1444.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1445[i + 0]) );
  }
  i1442.lightmaps = i1444
  i1442.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1443[31], i1442.lightProbes)
  i1442.lightmapsMode = i1443[32]
  i1442.mixedBakeMode = i1443[33]
  i1442.environmentLightingMode = i1443[34]
  i1442.ambientProbe = new pc.SphericalHarmonicsL2(i1443[35])
  request.r(i1443[36], i1443[37], 0, i1442, 'customReflection')
  request.r(i1443[38], i1443[39], 0, i1442, 'defaultReflection')
  i1442.defaultReflectionMode = i1443[40]
  i1442.defaultReflectionResolution = i1443[41]
  i1442.sunLightObjectId = i1443[42]
  i1442.pixelLightCount = i1443[43]
  i1442.defaultReflectionHDR = !!i1443[44]
  i1442.hasLightDataAsset = !!i1443[45]
  i1442.hasManualGenerate = !!i1443[46]
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1449 = data
  request.r(i1449[0], i1449[1], 0, i1448, 'lightmapColor')
  request.r(i1449[2], i1449[3], 0, i1448, 'lightmapDirection')
  request.r(i1449[4], i1449[5], 0, i1448, 'shadowMask')
  return i1448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1450 = root || new UnityEngine.LightProbes()
  var i1451 = data
  return i1450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1459 = data
  var i1461 = i1459[0]
  var i1460 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1461.length; i += 1) {
    i1460.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1461[i + 0]));
  }
  i1458.ShaderCompilationErrors = i1460
  i1458.name = i1459[1]
  i1458.guid = i1459[2]
  var i1463 = i1459[3]
  var i1462 = []
  for(var i = 0; i < i1463.length; i += 1) {
    i1462.push( i1463[i + 0] );
  }
  i1458.shaderDefinedKeywords = i1462
  var i1465 = i1459[4]
  var i1464 = []
  for(var i = 0; i < i1465.length; i += 1) {
    i1464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1465[i + 0]) );
  }
  i1458.passes = i1464
  var i1467 = i1459[5]
  var i1466 = []
  for(var i = 0; i < i1467.length; i += 1) {
    i1466.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1467[i + 0]) );
  }
  i1458.usePasses = i1466
  var i1469 = i1459[6]
  var i1468 = []
  for(var i = 0; i < i1469.length; i += 1) {
    i1468.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1469[i + 0]) );
  }
  i1458.defaultParameterValues = i1468
  request.r(i1459[7], i1459[8], 0, i1458, 'unityFallbackShader')
  i1458.readDepth = !!i1459[9]
  i1458.hasDepthOnlyPass = !!i1459[10]
  i1458.isCreatedByShaderGraph = !!i1459[11]
  i1458.disableBatching = !!i1459[12]
  i1458.compiled = !!i1459[13]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1473 = data
  i1472.shaderName = i1473[0]
  i1472.errorMessage = i1473[1]
  return i1472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1478 = root || new pc.UnityShaderPass()
  var i1479 = data
  i1478.id = i1479[0]
  i1478.subShaderIndex = i1479[1]
  i1478.name = i1479[2]
  i1478.passType = i1479[3]
  i1478.grabPassTextureName = i1479[4]
  i1478.usePass = !!i1479[5]
  i1478.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[6], i1478.zTest)
  i1478.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[7], i1478.zWrite)
  i1478.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[8], i1478.culling)
  i1478.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1479[9], i1478.blending)
  i1478.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1479[10], i1478.alphaBlending)
  i1478.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[11], i1478.colorWriteMask)
  i1478.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[12], i1478.offsetUnits)
  i1478.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[13], i1478.offsetFactor)
  i1478.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[14], i1478.stencilRef)
  i1478.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[15], i1478.stencilReadMask)
  i1478.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1479[16], i1478.stencilWriteMask)
  i1478.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1479[17], i1478.stencilOp)
  i1478.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1479[18], i1478.stencilOpFront)
  i1478.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1479[19], i1478.stencilOpBack)
  var i1481 = i1479[20]
  var i1480 = []
  for(var i = 0; i < i1481.length; i += 1) {
    i1480.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1481[i + 0]) );
  }
  i1478.tags = i1480
  var i1483 = i1479[21]
  var i1482 = []
  for(var i = 0; i < i1483.length; i += 1) {
    i1482.push( i1483[i + 0] );
  }
  i1478.passDefinedKeywords = i1482
  var i1485 = i1479[22]
  var i1484 = []
  for(var i = 0; i < i1485.length; i += 1) {
    i1484.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1485[i + 0]) );
  }
  i1478.passDefinedKeywordGroups = i1484
  var i1487 = i1479[23]
  var i1486 = []
  for(var i = 0; i < i1487.length; i += 1) {
    i1486.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1487[i + 0]) );
  }
  i1478.variants = i1486
  var i1489 = i1479[24]
  var i1488 = []
  for(var i = 0; i < i1489.length; i += 1) {
    i1488.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1489[i + 0]) );
  }
  i1478.excludedVariants = i1488
  i1478.hasDepthReader = !!i1479[25]
  return i1478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1491 = data
  i1490.val = i1491[0]
  i1490.name = i1491[1]
  return i1490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1493 = data
  i1492.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1493[0], i1492.src)
  i1492.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1493[1], i1492.dst)
  i1492.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1493[2], i1492.op)
  return i1492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1495 = data
  i1494.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1495[0], i1494.pass)
  i1494.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1495[1], i1494.fail)
  i1494.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1495[2], i1494.zFail)
  i1494.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1495[3], i1494.comp)
  return i1494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1499 = data
  i1498.name = i1499[0]
  i1498.value = i1499[1]
  return i1498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1503 = data
  var i1505 = i1503[0]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 1) {
    i1504.push( i1505[i + 0] );
  }
  i1502.keywords = i1504
  i1502.hasDiscard = !!i1503[1]
  return i1502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1509 = data
  i1508.passId = i1509[0]
  i1508.subShaderIndex = i1509[1]
  var i1511 = i1509[2]
  var i1510 = []
  for(var i = 0; i < i1511.length; i += 1) {
    i1510.push( i1511[i + 0] );
  }
  i1508.keywords = i1510
  i1508.vertexProgram = i1509[3]
  i1508.fragmentProgram = i1509[4]
  i1508.exportedForWebGl2 = !!i1509[5]
  i1508.readDepth = !!i1509[6]
  return i1508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1515 = data
  request.r(i1515[0], i1515[1], 0, i1514, 'shader')
  i1514.pass = i1515[2]
  return i1514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1519 = data
  i1518.name = i1519[0]
  i1518.type = i1519[1]
  i1518.value = new pc.Vec4( i1519[2], i1519[3], i1519[4], i1519[5] )
  i1518.textureValue = i1519[6]
  i1518.shaderPropertyFlag = i1519[7]
  return i1518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1521 = data
  i1520.name = i1521[0]
  request.r(i1521[1], i1521[2], 0, i1520, 'texture')
  i1520.aabb = i1521[3]
  i1520.vertices = i1521[4]
  i1520.triangles = i1521[5]
  i1520.textureRect = UnityEngine.Rect.MinMaxRect(i1521[6], i1521[7], i1521[8], i1521[9])
  i1520.packedRect = UnityEngine.Rect.MinMaxRect(i1521[10], i1521[11], i1521[12], i1521[13])
  i1520.border = new pc.Vec4( i1521[14], i1521[15], i1521[16], i1521[17] )
  i1520.transparency = i1521[18]
  i1520.bounds = i1521[19]
  i1520.pixelsPerUnit = i1521[20]
  i1520.textureWidth = i1521[21]
  i1520.textureHeight = i1521[22]
  i1520.nativeSize = new pc.Vec2( i1521[23], i1521[24] )
  i1520.pivot = new pc.Vec2( i1521[25], i1521[26] )
  i1520.textureRectOffset = new pc.Vec2( i1521[27], i1521[28] )
  return i1520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1523 = data
  i1522.name = i1523[0]
  return i1522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1525 = data
  i1524.name = i1525[0]
  i1524.ascent = i1525[1]
  i1524.originalLineHeight = i1525[2]
  i1524.fontSize = i1525[3]
  var i1527 = i1525[4]
  var i1526 = []
  for(var i = 0; i < i1527.length; i += 1) {
    i1526.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1527[i + 0]) );
  }
  i1524.characterInfo = i1526
  request.r(i1525[5], i1525[6], 0, i1524, 'texture')
  i1524.originalFontSize = i1525[7]
  return i1524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1531 = data
  i1530.index = i1531[0]
  i1530.advance = i1531[1]
  i1530.bearing = i1531[2]
  i1530.glyphWidth = i1531[3]
  i1530.glyphHeight = i1531[4]
  i1530.minX = i1531[5]
  i1530.maxX = i1531[6]
  i1530.minY = i1531[7]
  i1530.maxY = i1531[8]
  i1530.uvBottomLeftX = i1531[9]
  i1530.uvBottomLeftY = i1531[10]
  i1530.uvBottomRightX = i1531[11]
  i1530.uvBottomRightY = i1531[12]
  i1530.uvTopLeftX = i1531[13]
  i1530.uvTopLeftY = i1531[14]
  i1530.uvTopRightX = i1531[15]
  i1530.uvTopRightY = i1531[16]
  return i1530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1533 = data
  i1532.name = i1533[0]
  i1532.bytes64 = i1533[1]
  i1532.data = i1533[2]
  return i1532
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1534 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1535 = data
  i1534.normalStyle = i1535[0]
  i1534.normalSpacingOffset = i1535[1]
  i1534.boldStyle = i1535[2]
  i1534.boldSpacing = i1535[3]
  i1534.italicStyle = i1535[4]
  i1534.tabSize = i1535[5]
  request.r(i1535[6], i1535[7], 0, i1534, 'atlas')
  i1534.m_SourceFontFileGUID = i1535[8]
  i1534.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1535[9], i1534.m_CreationSettings)
  request.r(i1535[10], i1535[11], 0, i1534, 'm_SourceFontFile')
  i1534.m_SourceFontFilePath = i1535[12]
  i1534.m_AtlasPopulationMode = i1535[13]
  i1534.InternalDynamicOS = !!i1535[14]
  var i1537 = i1535[15]
  var i1536 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1537.length; i += 1) {
    i1536.add(request.d('UnityEngine.TextCore.Glyph', i1537[i + 0]));
  }
  i1534.m_GlyphTable = i1536
  var i1539 = i1535[16]
  var i1538 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1539.length; i += 1) {
    i1538.add(request.d('TMPro.TMP_Character', i1539[i + 0]));
  }
  i1534.m_CharacterTable = i1538
  var i1541 = i1535[17]
  var i1540 = []
  for(var i = 0; i < i1541.length; i += 2) {
  request.r(i1541[i + 0], i1541[i + 1], 2, i1540, '')
  }
  i1534.m_AtlasTextures = i1540
  i1534.m_AtlasTextureIndex = i1535[18]
  i1534.m_IsMultiAtlasTexturesEnabled = !!i1535[19]
  i1534.m_GetFontFeatures = !!i1535[20]
  i1534.m_ClearDynamicDataOnBuild = !!i1535[21]
  i1534.m_AtlasWidth = i1535[22]
  i1534.m_AtlasHeight = i1535[23]
  i1534.m_AtlasPadding = i1535[24]
  i1534.m_AtlasRenderMode = i1535[25]
  var i1543 = i1535[26]
  var i1542 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1543.length; i += 1) {
    i1542.add(request.d('UnityEngine.TextCore.GlyphRect', i1543[i + 0]));
  }
  i1534.m_UsedGlyphRects = i1542
  var i1545 = i1535[27]
  var i1544 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1545.length; i += 1) {
    i1544.add(request.d('UnityEngine.TextCore.GlyphRect', i1545[i + 0]));
  }
  i1534.m_FreeGlyphRects = i1544
  i1534.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1535[28], i1534.m_FontFeatureTable)
  i1534.m_ShouldReimportFontFeatures = !!i1535[29]
  var i1547 = i1535[30]
  var i1546 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1547.length; i += 2) {
  request.r(i1547[i + 0], i1547[i + 1], 1, i1546, '')
  }
  i1534.m_FallbackFontAssetTable = i1546
  var i1549 = i1535[31]
  var i1548 = []
  for(var i = 0; i < i1549.length; i += 1) {
    i1548.push( request.d('TMPro.TMP_FontWeightPair', i1549[i + 0]) );
  }
  i1534.m_FontWeightTable = i1548
  var i1551 = i1535[32]
  var i1550 = []
  for(var i = 0; i < i1551.length; i += 1) {
    i1550.push( request.d('TMPro.TMP_FontWeightPair', i1551[i + 0]) );
  }
  i1534.fontWeights = i1550
  i1534.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1535[33], i1534.m_fontInfo)
  var i1553 = i1535[34]
  var i1552 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1553.length; i += 1) {
    i1552.add(request.d('TMPro.TMP_Glyph', i1553[i + 0]));
  }
  i1534.m_glyphInfoList = i1552
  i1534.m_KerningTable = request.d('TMPro.KerningTable', i1535[35], i1534.m_KerningTable)
  var i1555 = i1535[36]
  var i1554 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1555.length; i += 2) {
  request.r(i1555[i + 0], i1555[i + 1], 1, i1554, '')
  }
  i1534.fallbackFontAssets = i1554
  i1534.m_Version = i1535[37]
  i1534.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1535[38], i1534.m_FaceInfo)
  request.r(i1535[39], i1535[40], 0, i1534, 'm_Material')
  return i1534
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1556 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1557 = data
  i1556.sourceFontFileName = i1557[0]
  i1556.sourceFontFileGUID = i1557[1]
  i1556.faceIndex = i1557[2]
  i1556.pointSizeSamplingMode = i1557[3]
  i1556.pointSize = i1557[4]
  i1556.padding = i1557[5]
  i1556.paddingMode = i1557[6]
  i1556.packingMode = i1557[7]
  i1556.atlasWidth = i1557[8]
  i1556.atlasHeight = i1557[9]
  i1556.characterSetSelectionMode = i1557[10]
  i1556.characterSequence = i1557[11]
  i1556.referencedFontAssetGUID = i1557[12]
  i1556.referencedTextAssetGUID = i1557[13]
  i1556.fontStyle = i1557[14]
  i1556.fontStyleModifier = i1557[15]
  i1556.renderMode = i1557[16]
  i1556.includeFontFeatures = !!i1557[17]
  return i1556
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1560 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1561 = data
  i1560.m_Index = i1561[0]
  i1560.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1561[1], i1560.m_Metrics)
  i1560.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1561[2], i1560.m_GlyphRect)
  i1560.m_Scale = i1561[3]
  i1560.m_AtlasIndex = i1561[4]
  i1560.m_ClassDefinitionType = i1561[5]
  return i1560
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1562 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1563 = data
  i1562.m_Width = i1563[0]
  i1562.m_Height = i1563[1]
  i1562.m_HorizontalBearingX = i1563[2]
  i1562.m_HorizontalBearingY = i1563[3]
  i1562.m_HorizontalAdvance = i1563[4]
  return i1562
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1564 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1565 = data
  i1564.m_X = i1565[0]
  i1564.m_Y = i1565[1]
  i1564.m_Width = i1565[2]
  i1564.m_Height = i1565[3]
  return i1564
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1568 = root || request.c( 'TMPro.TMP_Character' )
  var i1569 = data
  i1568.m_ElementType = i1569[0]
  i1568.m_Unicode = i1569[1]
  i1568.m_GlyphIndex = i1569[2]
  i1568.m_Scale = i1569[3]
  return i1568
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1574 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1575 = data
  var i1577 = i1575[0]
  var i1576 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1577.length; i += 1) {
    i1576.add(request.d('TMPro.MultipleSubstitutionRecord', i1577[i + 0]));
  }
  i1574.m_MultipleSubstitutionRecords = i1576
  var i1579 = i1575[1]
  var i1578 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1579.length; i += 1) {
    i1578.add(request.d('TMPro.LigatureSubstitutionRecord', i1579[i + 0]));
  }
  i1574.m_LigatureSubstitutionRecords = i1578
  var i1581 = i1575[2]
  var i1580 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1581.length; i += 1) {
    i1580.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1581[i + 0]));
  }
  i1574.m_GlyphPairAdjustmentRecords = i1580
  var i1583 = i1575[3]
  var i1582 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1583.length; i += 1) {
    i1582.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1583[i + 0]));
  }
  i1574.m_MarkToBaseAdjustmentRecords = i1582
  var i1585 = i1575[4]
  var i1584 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1585[i + 0]));
  }
  i1574.m_MarkToMarkAdjustmentRecords = i1584
  return i1574
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1588 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1589 = data
  i1588.m_TargetGlyphID = i1589[0]
  i1588.m_SubstituteGlyphIDs = i1589[1]
  return i1588
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1592 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1593 = data
  i1592.m_ComponentGlyphIDs = i1593[0]
  i1592.m_LigatureGlyphID = i1593[1]
  return i1592
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1596 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1597 = data
  i1596.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1597[0], i1596.m_FirstAdjustmentRecord)
  i1596.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1597[1], i1596.m_SecondAdjustmentRecord)
  i1596.m_FeatureLookupFlags = i1597[2]
  return i1596
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1600 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1601 = data
  i1600.m_BaseGlyphID = i1601[0]
  i1600.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1601[1], i1600.m_BaseGlyphAnchorPoint)
  i1600.m_MarkGlyphID = i1601[2]
  i1600.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1601[3], i1600.m_MarkPositionAdjustment)
  return i1600
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1604 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1605 = data
  i1604.m_BaseMarkGlyphID = i1605[0]
  i1604.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1605[1], i1604.m_BaseMarkGlyphAnchorPoint)
  i1604.m_CombiningMarkGlyphID = i1605[2]
  i1604.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1605[3], i1604.m_CombiningMarkPositionAdjustment)
  return i1604
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1610 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1611 = data
  request.r(i1611[0], i1611[1], 0, i1610, 'regularTypeface')
  request.r(i1611[2], i1611[3], 0, i1610, 'italicTypeface')
  return i1610
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1612 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1613 = data
  i1612.Name = i1613[0]
  i1612.PointSize = i1613[1]
  i1612.Scale = i1613[2]
  i1612.CharacterCount = i1613[3]
  i1612.LineHeight = i1613[4]
  i1612.Baseline = i1613[5]
  i1612.Ascender = i1613[6]
  i1612.CapHeight = i1613[7]
  i1612.Descender = i1613[8]
  i1612.CenterLine = i1613[9]
  i1612.SuperscriptOffset = i1613[10]
  i1612.SubscriptOffset = i1613[11]
  i1612.SubSize = i1613[12]
  i1612.Underline = i1613[13]
  i1612.UnderlineThickness = i1613[14]
  i1612.strikethrough = i1613[15]
  i1612.strikethroughThickness = i1613[16]
  i1612.TabWidth = i1613[17]
  i1612.Padding = i1613[18]
  i1612.AtlasWidth = i1613[19]
  i1612.AtlasHeight = i1613[20]
  return i1612
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1616 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1617 = data
  i1616.id = i1617[0]
  i1616.x = i1617[1]
  i1616.y = i1617[2]
  i1616.width = i1617[3]
  i1616.height = i1617[4]
  i1616.xOffset = i1617[5]
  i1616.yOffset = i1617[6]
  i1616.xAdvance = i1617[7]
  i1616.scale = i1617[8]
  return i1616
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1618 = root || request.c( 'TMPro.KerningTable' )
  var i1619 = data
  var i1621 = i1619[0]
  var i1620 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1621.length; i += 1) {
    i1620.add(request.d('TMPro.KerningPair', i1621[i + 0]));
  }
  i1618.kerningPairs = i1620
  return i1618
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1624 = root || request.c( 'TMPro.KerningPair' )
  var i1625 = data
  i1624.xOffset = i1625[0]
  i1624.m_FirstGlyph = i1625[1]
  i1624.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1625[2], i1624.m_FirstGlyphAdjustments)
  i1624.m_SecondGlyph = i1625[3]
  i1624.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1625[4], i1624.m_SecondGlyphAdjustments)
  i1624.m_IgnoreSpacingAdjustments = !!i1625[5]
  return i1624
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1626 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1627 = data
  i1626.m_FaceIndex = i1627[0]
  i1626.m_FamilyName = i1627[1]
  i1626.m_StyleName = i1627[2]
  i1626.m_PointSize = i1627[3]
  i1626.m_Scale = i1627[4]
  i1626.m_UnitsPerEM = i1627[5]
  i1626.m_LineHeight = i1627[6]
  i1626.m_AscentLine = i1627[7]
  i1626.m_CapLine = i1627[8]
  i1626.m_MeanLine = i1627[9]
  i1626.m_Baseline = i1627[10]
  i1626.m_DescentLine = i1627[11]
  i1626.m_SuperscriptOffset = i1627[12]
  i1626.m_SuperscriptSize = i1627[13]
  i1626.m_SubscriptOffset = i1627[14]
  i1626.m_SubscriptSize = i1627[15]
  i1626.m_UnderlineOffset = i1627[16]
  i1626.m_UnderlineThickness = i1627[17]
  i1626.m_StrikethroughOffset = i1627[18]
  i1626.m_StrikethroughThickness = i1627[19]
  i1626.m_TabWidth = i1627[20]
  return i1626
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1628 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1629 = data
  i1628.useSafeMode = !!i1629[0]
  i1628.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1629[1], i1628.safeModeOptions)
  i1628.timeScale = i1629[2]
  i1628.unscaledTimeScale = i1629[3]
  i1628.useSmoothDeltaTime = !!i1629[4]
  i1628.maxSmoothUnscaledTime = i1629[5]
  i1628.rewindCallbackMode = i1629[6]
  i1628.showUnityEditorReport = !!i1629[7]
  i1628.logBehaviour = i1629[8]
  i1628.drawGizmos = !!i1629[9]
  i1628.defaultRecyclable = !!i1629[10]
  i1628.defaultAutoPlay = i1629[11]
  i1628.defaultUpdateType = i1629[12]
  i1628.defaultTimeScaleIndependent = !!i1629[13]
  i1628.defaultEaseType = i1629[14]
  i1628.defaultEaseOvershootOrAmplitude = i1629[15]
  i1628.defaultEasePeriod = i1629[16]
  i1628.defaultAutoKill = !!i1629[17]
  i1628.defaultLoopType = i1629[18]
  i1628.debugMode = !!i1629[19]
  i1628.debugStoreTargetId = !!i1629[20]
  i1628.showPreviewPanel = !!i1629[21]
  i1628.storeSettingsLocation = i1629[22]
  i1628.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1629[23], i1628.modules)
  i1628.createASMDEF = !!i1629[24]
  i1628.showPlayingTweens = !!i1629[25]
  i1628.showPausedTweens = !!i1629[26]
  return i1628
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1630 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1631 = data
  i1630.logBehaviour = i1631[0]
  i1630.nestedTweenFailureBehaviour = i1631[1]
  return i1630
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1632 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1633 = data
  i1632.showPanel = !!i1633[0]
  i1632.audioEnabled = !!i1633[1]
  i1632.physicsEnabled = !!i1633[2]
  i1632.physics2DEnabled = !!i1633[3]
  i1632.spriteEnabled = !!i1633[4]
  i1632.uiEnabled = !!i1633[5]
  i1632.textMeshProEnabled = !!i1633[6]
  i1632.tk2DEnabled = !!i1633[7]
  i1632.deAudioEnabled = !!i1633[8]
  i1632.deUnityExtendedEnabled = !!i1633[9]
  i1632.epoOutlineEnabled = !!i1633[10]
  return i1632
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1634 = root || request.c( 'TMPro.TMP_Settings' )
  var i1635 = data
  i1634.assetVersion = i1635[0]
  i1634.m_TextWrappingMode = i1635[1]
  i1634.m_enableKerning = !!i1635[2]
  var i1637 = i1635[3]
  var i1636 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1637.length; i += 1) {
    i1636.add(i1637[i + 0]);
  }
  i1634.m_ActiveFontFeatures = i1636
  i1634.m_enableExtraPadding = !!i1635[4]
  i1634.m_enableTintAllSprites = !!i1635[5]
  i1634.m_enableParseEscapeCharacters = !!i1635[6]
  i1634.m_EnableRaycastTarget = !!i1635[7]
  i1634.m_GetFontFeaturesAtRuntime = !!i1635[8]
  i1634.m_missingGlyphCharacter = i1635[9]
  i1634.m_ClearDynamicDataOnBuild = !!i1635[10]
  i1634.m_warningsDisabled = !!i1635[11]
  request.r(i1635[12], i1635[13], 0, i1634, 'm_defaultFontAsset')
  i1634.m_defaultFontAssetPath = i1635[14]
  i1634.m_defaultFontSize = i1635[15]
  i1634.m_defaultAutoSizeMinRatio = i1635[16]
  i1634.m_defaultAutoSizeMaxRatio = i1635[17]
  i1634.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1635[18], i1635[19] )
  i1634.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1635[20], i1635[21] )
  i1634.m_autoSizeTextContainer = !!i1635[22]
  i1634.m_IsTextObjectScaleStatic = !!i1635[23]
  var i1639 = i1635[24]
  var i1638 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1639.length; i += 2) {
  request.r(i1639[i + 0], i1639[i + 1], 1, i1638, '')
  }
  i1634.m_fallbackFontAssets = i1638
  i1634.m_matchMaterialPreset = !!i1635[25]
  i1634.m_HideSubTextObjects = !!i1635[26]
  request.r(i1635[27], i1635[28], 0, i1634, 'm_defaultSpriteAsset')
  i1634.m_defaultSpriteAssetPath = i1635[29]
  i1634.m_enableEmojiSupport = !!i1635[30]
  i1634.m_MissingCharacterSpriteUnicode = i1635[31]
  var i1641 = i1635[32]
  var i1640 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1641.length; i += 2) {
  request.r(i1641[i + 0], i1641[i + 1], 1, i1640, '')
  }
  i1634.m_EmojiFallbackTextAssets = i1640
  i1634.m_defaultColorGradientPresetsPath = i1635[33]
  request.r(i1635[34], i1635[35], 0, i1634, 'm_defaultStyleSheet')
  i1634.m_StyleSheetsResourcePath = i1635[36]
  request.r(i1635[37], i1635[38], 0, i1634, 'm_leadingCharacters')
  request.r(i1635[39], i1635[40], 0, i1634, 'm_followingCharacters')
  i1634.m_UseModernHangulLineBreakingRules = !!i1635[41]
  return i1634
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1644 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1645 = data
  request.r(i1645[0], i1645[1], 0, i1644, 'spriteSheet')
  var i1647 = i1645[2]
  var i1646 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1647.length; i += 1) {
    i1646.add(request.d('TMPro.TMP_Sprite', i1647[i + 0]));
  }
  i1644.spriteInfoList = i1646
  var i1649 = i1645[3]
  var i1648 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1649.length; i += 2) {
  request.r(i1649[i + 0], i1649[i + 1], 1, i1648, '')
  }
  i1644.fallbackSpriteAssets = i1648
  var i1651 = i1645[4]
  var i1650 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1651.length; i += 1) {
    i1650.add(request.d('TMPro.TMP_SpriteCharacter', i1651[i + 0]));
  }
  i1644.m_SpriteCharacterTable = i1650
  var i1653 = i1645[5]
  var i1652 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1653.length; i += 1) {
    i1652.add(request.d('TMPro.TMP_SpriteGlyph', i1653[i + 0]));
  }
  i1644.m_GlyphTable = i1652
  i1644.m_Version = i1645[6]
  i1644.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1645[7], i1644.m_FaceInfo)
  request.r(i1645[8], i1645[9], 0, i1644, 'm_Material')
  return i1644
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1656 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1657 = data
  i1656.name = i1657[0]
  i1656.hashCode = i1657[1]
  i1656.unicode = i1657[2]
  i1656.pivot = new pc.Vec2( i1657[3], i1657[4] )
  request.r(i1657[5], i1657[6], 0, i1656, 'sprite')
  i1656.id = i1657[7]
  i1656.x = i1657[8]
  i1656.y = i1657[9]
  i1656.width = i1657[10]
  i1656.height = i1657[11]
  i1656.xOffset = i1657[12]
  i1656.yOffset = i1657[13]
  i1656.xAdvance = i1657[14]
  i1656.scale = i1657[15]
  return i1656
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1662 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1663 = data
  i1662.m_Name = i1663[0]
  i1662.m_ElementType = i1663[1]
  i1662.m_Unicode = i1663[2]
  i1662.m_GlyphIndex = i1663[3]
  i1662.m_Scale = i1663[4]
  return i1662
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1666 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1667 = data
  request.r(i1667[0], i1667[1], 0, i1666, 'sprite')
  i1666.m_Index = i1667[2]
  i1666.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1667[3], i1666.m_Metrics)
  i1666.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1667[4], i1666.m_GlyphRect)
  i1666.m_Scale = i1667[5]
  i1666.m_AtlasIndex = i1667[6]
  i1666.m_ClassDefinitionType = i1667[7]
  return i1666
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1668 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1669 = data
  var i1671 = i1669[0]
  var i1670 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1671.length; i += 1) {
    i1670.add(request.d('TMPro.TMP_Style', i1671[i + 0]));
  }
  i1668.m_StyleList = i1670
  return i1668
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1674 = root || request.c( 'TMPro.TMP_Style' )
  var i1675 = data
  i1674.m_Name = i1675[0]
  i1674.m_HashCode = i1675[1]
  i1674.m_OpeningDefinition = i1675[2]
  i1674.m_ClosingDefinition = i1675[3]
  i1674.m_OpeningTagArray = i1675[4]
  i1674.m_ClosingTagArray = i1675[5]
  return i1674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1677 = data
  var i1679 = i1677[0]
  var i1678 = []
  for(var i = 0; i < i1679.length; i += 1) {
    i1678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1679[i + 0]) );
  }
  i1676.files = i1678
  i1676.componentToPrefabIds = i1677[1]
  return i1676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1683 = data
  i1682.path = i1683[0]
  request.r(i1683[1], i1683[2], 0, i1682, 'unityObject')
  return i1682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1685 = data
  var i1687 = i1685[0]
  var i1686 = []
  for(var i = 0; i < i1687.length; i += 1) {
    i1686.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1687[i + 0]) );
  }
  i1684.scriptsExecutionOrder = i1686
  var i1689 = i1685[1]
  var i1688 = []
  for(var i = 0; i < i1689.length; i += 1) {
    i1688.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1689[i + 0]) );
  }
  i1684.sortingLayers = i1688
  var i1691 = i1685[2]
  var i1690 = []
  for(var i = 0; i < i1691.length; i += 1) {
    i1690.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1691[i + 0]) );
  }
  i1684.cullingLayers = i1690
  i1684.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1685[3], i1684.timeSettings)
  i1684.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1685[4], i1684.physicsSettings)
  i1684.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1685[5], i1684.physics2DSettings)
  i1684.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1685[6], i1684.qualitySettings)
  i1684.enableRealtimeShadows = !!i1685[7]
  i1684.enableAutoInstancing = !!i1685[8]
  i1684.enableStaticBatching = !!i1685[9]
  i1684.enableDynamicBatching = !!i1685[10]
  i1684.usePreservativeDynamicBatching = !!i1685[11]
  i1684.lightmapEncodingQuality = i1685[12]
  i1684.desiredColorSpace = i1685[13]
  var i1693 = i1685[14]
  var i1692 = []
  for(var i = 0; i < i1693.length; i += 1) {
    i1692.push( i1693[i + 0] );
  }
  i1684.allTags = i1692
  return i1684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1697 = data
  i1696.name = i1697[0]
  i1696.value = i1697[1]
  return i1696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1701 = data
  i1700.id = i1701[0]
  i1700.name = i1701[1]
  i1700.value = i1701[2]
  return i1700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1704 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1705 = data
  i1704.id = i1705[0]
  i1704.name = i1705[1]
  return i1704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1707 = data
  i1706.fixedDeltaTime = i1707[0]
  i1706.maximumDeltaTime = i1707[1]
  i1706.timeScale = i1707[2]
  i1706.maximumParticleTimestep = i1707[3]
  return i1706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1709 = data
  i1708.gravity = new pc.Vec3( i1709[0], i1709[1], i1709[2] )
  i1708.defaultSolverIterations = i1709[3]
  i1708.bounceThreshold = i1709[4]
  i1708.autoSyncTransforms = !!i1709[5]
  i1708.autoSimulation = !!i1709[6]
  var i1711 = i1709[7]
  var i1710 = []
  for(var i = 0; i < i1711.length; i += 1) {
    i1710.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1711[i + 0]) );
  }
  i1708.collisionMatrix = i1710
  return i1708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1715 = data
  i1714.enabled = !!i1715[0]
  i1714.layerId = i1715[1]
  i1714.otherLayerId = i1715[2]
  return i1714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1717 = data
  request.r(i1717[0], i1717[1], 0, i1716, 'material')
  i1716.gravity = new pc.Vec2( i1717[2], i1717[3] )
  i1716.positionIterations = i1717[4]
  i1716.velocityIterations = i1717[5]
  i1716.velocityThreshold = i1717[6]
  i1716.maxLinearCorrection = i1717[7]
  i1716.maxAngularCorrection = i1717[8]
  i1716.maxTranslationSpeed = i1717[9]
  i1716.maxRotationSpeed = i1717[10]
  i1716.baumgarteScale = i1717[11]
  i1716.baumgarteTOIScale = i1717[12]
  i1716.timeToSleep = i1717[13]
  i1716.linearSleepTolerance = i1717[14]
  i1716.angularSleepTolerance = i1717[15]
  i1716.defaultContactOffset = i1717[16]
  i1716.autoSimulation = !!i1717[17]
  i1716.queriesHitTriggers = !!i1717[18]
  i1716.queriesStartInColliders = !!i1717[19]
  i1716.callbacksOnDisable = !!i1717[20]
  i1716.reuseCollisionCallbacks = !!i1717[21]
  i1716.autoSyncTransforms = !!i1717[22]
  var i1719 = i1717[23]
  var i1718 = []
  for(var i = 0; i < i1719.length; i += 1) {
    i1718.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1719[i + 0]) );
  }
  i1716.collisionMatrix = i1718
  return i1716
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1722 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1723 = data
  i1722.enabled = !!i1723[0]
  i1722.layerId = i1723[1]
  i1722.otherLayerId = i1723[2]
  return i1722
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1725 = data
  var i1727 = i1725[0]
  var i1726 = []
  for(var i = 0; i < i1727.length; i += 1) {
    i1726.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1727[i + 0]) );
  }
  i1724.qualityLevels = i1726
  var i1729 = i1725[1]
  var i1728 = []
  for(var i = 0; i < i1729.length; i += 1) {
    i1728.push( i1729[i + 0] );
  }
  i1724.names = i1728
  i1724.shadows = i1725[2]
  i1724.anisotropicFiltering = i1725[3]
  i1724.antiAliasing = i1725[4]
  i1724.lodBias = i1725[5]
  i1724.shadowCascades = i1725[6]
  i1724.shadowDistance = i1725[7]
  i1724.shadowmaskMode = i1725[8]
  i1724.shadowProjection = i1725[9]
  i1724.shadowResolution = i1725[10]
  i1724.softParticles = !!i1725[11]
  i1724.softVegetation = !!i1725[12]
  i1724.activeColorSpace = i1725[13]
  i1724.desiredColorSpace = i1725[14]
  i1724.masterTextureLimit = i1725[15]
  i1724.maxQueuedFrames = i1725[16]
  i1724.particleRaycastBudget = i1725[17]
  i1724.pixelLightCount = i1725[18]
  i1724.realtimeReflectionProbes = !!i1725[19]
  i1724.shadowCascade2Split = i1725[20]
  i1724.shadowCascade4Split = new pc.Vec3( i1725[21], i1725[22], i1725[23] )
  i1724.streamingMipmapsActive = !!i1725[24]
  i1724.vSyncCount = i1725[25]
  i1724.asyncUploadBufferSize = i1725[26]
  i1724.asyncUploadTimeSlice = i1725[27]
  i1724.billboardsFaceCameraPosition = !!i1725[28]
  i1724.shadowNearPlaneOffset = i1725[29]
  i1724.streamingMipmapsMemoryBudget = i1725[30]
  i1724.maximumLODLevel = i1725[31]
  i1724.streamingMipmapsAddAllCameras = !!i1725[32]
  i1724.streamingMipmapsMaxLevelReduction = i1725[33]
  i1724.streamingMipmapsRenderersPerFrame = i1725[34]
  i1724.resolutionScalingFixedDPIFactor = i1725[35]
  i1724.streamingMipmapsMaxFileIORequests = i1725[36]
  i1724.currentQualityLevel = i1725[37]
  return i1724
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1732 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1733 = data
  request.r(i1733[0], i1733[1], 0, i1732, 'm_ObjectArgument')
  i1732.m_ObjectArgumentAssemblyTypeName = i1733[2]
  i1732.m_IntArgument = i1733[3]
  i1732.m_FloatArgument = i1733[4]
  i1732.m_StringArgument = i1733[5]
  i1732.m_BoolArgument = !!i1733[6]
  return i1732
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1734 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1735 = data
  i1734.m_GlyphIndex = i1735[0]
  i1734.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1735[1], i1734.m_GlyphValueRecord)
  return i1734
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1736 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1737 = data
  i1736.m_XCoordinate = i1737[0]
  i1736.m_YCoordinate = i1737[1]
  return i1736
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1738 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1739 = data
  i1738.m_XPositionAdjustment = i1739[0]
  i1738.m_YPositionAdjustment = i1739[1]
  return i1738
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1740 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1741 = data
  i1740.xPlacement = i1741[0]
  i1740.yPlacement = i1741[1]
  i1740.xAdvance = i1741[2]
  i1740.yAdvance = i1741[3]
  return i1740
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1742 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1743 = data
  i1742.m_XPlacement = i1743[0]
  i1742.m_YPlacement = i1743[1]
  i1742.m_XAdvance = i1743[2]
  i1742.m_YAdvance = i1743[3]
  return i1742
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"33":[34],"35":[34],"36":[34],"37":[34],"38":[34],"39":[34],"40":[41],"42":[2],"43":[44],"45":[44],"46":[44],"47":[44],"48":[44],"49":[44],"50":[51],"52":[51],"53":[51],"54":[51],"55":[51],"56":[51],"57":[51],"58":[51],"59":[51],"60":[51],"61":[51],"62":[51],"63":[51],"64":[2],"65":[66],"67":[68],"69":[68],"8":[7],"70":[71],"72":[2],"73":[74],"75":[7],"76":[11,7],"77":[66],"78":[11,7],"79":[7],"80":[7],"81":[66,7],"15":[7,11],"82":[83],"84":[83],"85":[83],"86":[7],"87":[7],"10":[8],"12":[11,7],"14":[7],"9":[8],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"95":[7],"96":[7],"20":[11,7],"97":[7],"98":[7],"99":[7],"100":[7],"18":[11,7],"101":[7],"102":[5],"103":[5],"6":[5],"104":[5],"105":[2],"106":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.UI.RawImage","UnityEngine.MonoBehaviour","TutController","UnityEngine.UI.Button","LunaController","LayoutController","UnityEngine.AudioSource","UnityEngine.AudioClip","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CJ_V09";

Deserializers.lunaInitializationTime = "07/15/2026 10:41:33";

Deserializers.lunaDaysRunning = "0.7";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CJ_V09_DungNV_TamNTM";

Deserializers.lunaAppID = "37602";

Deserializers.projectId = "9ee5913d29ee0e940b55fee36b50cb84";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1820";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3744";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.CJ_V09";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "becede11-d3de-47ff-8f91-2b44559173c3";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

