var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.JointSpring' )
  var i1423 = data
  i1422.spring = i1423[0]
  i1422.damper = i1423[1]
  i1422.targetPosition = i1423[2]
  return i1422
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1424 = root || request.c( 'UnityEngine.JointMotor' )
  var i1425 = data
  i1424.m_TargetVelocity = i1425[0]
  i1424.m_Force = i1425[1]
  i1424.m_FreeSpin = i1425[2]
  return i1424
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1426 = root || request.c( 'UnityEngine.JointLimits' )
  var i1427 = data
  i1426.m_Min = i1427[0]
  i1426.m_Max = i1427[1]
  i1426.m_Bounciness = i1427[2]
  i1426.m_BounceMinVelocity = i1427[3]
  i1426.m_ContactDistance = i1427[4]
  i1426.minBounce = i1427[5]
  i1426.maxBounce = i1427[6]
  return i1426
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1428 = root || request.c( 'UnityEngine.JointDrive' )
  var i1429 = data
  i1428.m_PositionSpring = i1429[0]
  i1428.m_PositionDamper = i1429[1]
  i1428.m_MaximumForce = i1429[2]
  i1428.m_UseAcceleration = i1429[3]
  return i1428
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1430 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1431 = data
  i1430.m_Spring = i1431[0]
  i1430.m_Damper = i1431[1]
  return i1430
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1433 = data
  i1432.m_Limit = i1433[0]
  i1432.m_Bounciness = i1433[1]
  i1432.m_ContactDistance = i1433[2]
  return i1432
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1434 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1435 = data
  i1434.m_ExtremumSlip = i1435[0]
  i1434.m_ExtremumValue = i1435[1]
  i1434.m_AsymptoteSlip = i1435[2]
  i1434.m_AsymptoteValue = i1435[3]
  i1434.m_Stiffness = i1435[4]
  return i1434
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1436 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1437 = data
  i1436.m_LowerAngle = i1437[0]
  i1436.m_UpperAngle = i1437[1]
  return i1436
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1438 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1439 = data
  i1438.m_MotorSpeed = i1439[0]
  i1438.m_MaximumMotorTorque = i1439[1]
  return i1438
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1440 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1441 = data
  i1440.m_DampingRatio = i1441[0]
  i1440.m_Frequency = i1441[1]
  i1440.m_Angle = i1441[2]
  return i1440
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1442 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1443 = data
  i1442.m_LowerTranslation = i1443[0]
  i1442.m_UpperTranslation = i1443[1]
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1445 = data
  i1444.name = i1445[0]
  i1444.width = i1445[1]
  i1444.height = i1445[2]
  i1444.mipmapCount = i1445[3]
  i1444.anisoLevel = i1445[4]
  i1444.filterMode = i1445[5]
  i1444.hdr = !!i1445[6]
  i1444.format = i1445[7]
  i1444.wrapMode = i1445[8]
  i1444.alphaIsTransparency = !!i1445[9]
  i1444.alphaSource = i1445[10]
  i1444.graphicsFormat = i1445[11]
  i1444.sRGBTexture = !!i1445[12]
  i1444.desiredColorSpace = i1445[13]
  i1444.wrapU = i1445[14]
  i1444.wrapV = i1445[15]
  return i1444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1446 = root || new pc.UnityMaterial()
  var i1447 = data
  i1446.name = i1447[0]
  request.r(i1447[1], i1447[2], 0, i1446, 'shader')
  i1446.renderQueue = i1447[3]
  i1446.enableInstancing = !!i1447[4]
  var i1449 = i1447[5]
  var i1448 = []
  for(var i = 0; i < i1449.length; i += 1) {
    i1448.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1449[i + 0]) );
  }
  i1446.floatParameters = i1448
  var i1451 = i1447[6]
  var i1450 = []
  for(var i = 0; i < i1451.length; i += 1) {
    i1450.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1451[i + 0]) );
  }
  i1446.colorParameters = i1450
  var i1453 = i1447[7]
  var i1452 = []
  for(var i = 0; i < i1453.length; i += 1) {
    i1452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1453[i + 0]) );
  }
  i1446.vectorParameters = i1452
  var i1455 = i1447[8]
  var i1454 = []
  for(var i = 0; i < i1455.length; i += 1) {
    i1454.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1455[i + 0]) );
  }
  i1446.textureParameters = i1454
  var i1457 = i1447[9]
  var i1456 = []
  for(var i = 0; i < i1457.length; i += 1) {
    i1456.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1457[i + 0]) );
  }
  i1446.materialFlags = i1456
  return i1446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1461 = data
  i1460.name = i1461[0]
  i1460.value = i1461[1]
  return i1460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1465 = data
  i1464.name = i1465[0]
  i1464.value = new pc.Color(i1465[1], i1465[2], i1465[3], i1465[4])
  return i1464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1469 = data
  i1468.name = i1469[0]
  i1468.value = new pc.Vec4( i1469[1], i1469[2], i1469[3], i1469[4] )
  return i1468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1473 = data
  i1472.name = i1473[0]
  request.r(i1473[1], i1473[2], 0, i1472, 'value')
  return i1472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1477 = data
  i1476.name = i1477[0]
  i1476.enabled = !!i1477[1]
  return i1476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1479 = data
  i1478.name = i1479[0]
  i1478.halfPrecision = !!i1479[1]
  i1478.useSimplification = !!i1479[2]
  i1478.useUInt32IndexFormat = !!i1479[3]
  i1478.vertexCount = i1479[4]
  i1478.aabb = i1479[5]
  var i1481 = i1479[6]
  var i1480 = []
  for(var i = 0; i < i1481.length; i += 1) {
    i1480.push( !!i1481[i + 0] );
  }
  i1478.streams = i1480
  i1478.vertices = i1479[7]
  var i1483 = i1479[8]
  var i1482 = []
  for(var i = 0; i < i1483.length; i += 1) {
    i1482.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1483[i + 0]) );
  }
  i1478.subMeshes = i1482
  var i1485 = i1479[9]
  var i1484 = []
  for(var i = 0; i < i1485.length; i += 16) {
    i1484.push( new pc.Mat4().setData(i1485[i + 0], i1485[i + 1], i1485[i + 2], i1485[i + 3],  i1485[i + 4], i1485[i + 5], i1485[i + 6], i1485[i + 7],  i1485[i + 8], i1485[i + 9], i1485[i + 10], i1485[i + 11],  i1485[i + 12], i1485[i + 13], i1485[i + 14], i1485[i + 15]) );
  }
  i1478.bindposes = i1484
  var i1487 = i1479[10]
  var i1486 = []
  for(var i = 0; i < i1487.length; i += 1) {
    i1486.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1487[i + 0]) );
  }
  i1478.blendShapes = i1486
  return i1478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1493 = data
  i1492.triangles = i1493[0]
  return i1492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1499 = data
  i1498.name = i1499[0]
  var i1501 = i1499[1]
  var i1500 = []
  for(var i = 0; i < i1501.length; i += 1) {
    i1500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1501[i + 0]) );
  }
  i1498.frames = i1500
  return i1498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1503 = data
  i1502.name = i1503[0]
  i1502.atlasId = i1503[1]
  i1502.mipmapCount = i1503[2]
  i1502.hdr = !!i1503[3]
  i1502.size = i1503[4]
  i1502.anisoLevel = i1503[5]
  i1502.filterMode = i1503[6]
  var i1505 = i1503[7]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 4) {
    i1504.push( UnityEngine.Rect.MinMaxRect(i1505[i + 0], i1505[i + 1], i1505[i + 2], i1505[i + 3]) );
  }
  i1502.rects = i1504
  i1502.wrapU = i1503[8]
  i1502.wrapV = i1503[9]
  return i1502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1509 = data
  i1508.name = i1509[0]
  i1508.index = i1509[1]
  i1508.startup = !!i1509[2]
  return i1508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1511 = data
  i1510.aspect = i1511[0]
  i1510.orthographic = !!i1511[1]
  i1510.orthographicSize = i1511[2]
  i1510.backgroundColor = new pc.Color(i1511[3], i1511[4], i1511[5], i1511[6])
  i1510.nearClipPlane = i1511[7]
  i1510.farClipPlane = i1511[8]
  i1510.fieldOfView = i1511[9]
  i1510.depth = i1511[10]
  i1510.clearFlags = i1511[11]
  i1510.cullingMask = i1511[12]
  i1510.rect = i1511[13]
  request.r(i1511[14], i1511[15], 0, i1510, 'targetTexture')
  i1510.usePhysicalProperties = !!i1511[16]
  i1510.focalLength = i1511[17]
  i1510.sensorSize = new pc.Vec2( i1511[18], i1511[19] )
  i1510.lensShift = new pc.Vec2( i1511[20], i1511[21] )
  i1510.gateFit = i1511[22]
  i1510.commandBufferCount = i1511[23]
  i1510.cameraType = i1511[24]
  i1510.enabled = !!i1511[25]
  return i1510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1513 = data
  i1512.name = i1513[0]
  i1512.tagId = i1513[1]
  i1512.enabled = !!i1513[2]
  i1512.isStatic = !!i1513[3]
  i1512.layer = i1513[4]
  return i1512
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1514 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1515 = data
  request.r(i1515[0], i1515[1], 0, i1514, 'm_FirstSelected')
  i1514.m_sendNavigationEvents = !!i1515[2]
  i1514.m_DragThreshold = i1515[3]
  return i1514
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1516 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1517 = data
  i1516.m_HorizontalAxis = i1517[0]
  i1516.m_VerticalAxis = i1517[1]
  i1516.m_SubmitButton = i1517[2]
  i1516.m_CancelButton = i1517[3]
  i1516.m_InputActionsPerSecond = i1517[4]
  i1516.m_RepeatDelay = i1517[5]
  i1516.m_ForceModuleActive = !!i1517[6]
  i1516.m_SendPointerHoverToParent = !!i1517[7]
  return i1516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1519 = data
  i1518.type = i1519[0]
  i1518.color = new pc.Color(i1519[1], i1519[2], i1519[3], i1519[4])
  i1518.cullingMask = i1519[5]
  i1518.intensity = i1519[6]
  i1518.range = i1519[7]
  i1518.spotAngle = i1519[8]
  i1518.shadows = i1519[9]
  i1518.shadowNormalBias = i1519[10]
  i1518.shadowBias = i1519[11]
  i1518.shadowStrength = i1519[12]
  i1518.shadowResolution = i1519[13]
  i1518.lightmapBakeType = i1519[14]
  i1518.renderMode = i1519[15]
  request.r(i1519[16], i1519[17], 0, i1518, 'cookie')
  i1518.cookieSize = i1519[18]
  i1518.shadowNearPlane = i1519[19]
  i1518.occlusionMaskChannel = i1519[20]
  i1518.isBaked = !!i1519[21]
  i1518.mixedLightingMode = i1519[22]
  i1518.enabled = !!i1519[23]
  return i1518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1521 = data
  i1520.pivot = new pc.Vec2( i1521[0], i1521[1] )
  i1520.anchorMin = new pc.Vec2( i1521[2], i1521[3] )
  i1520.anchorMax = new pc.Vec2( i1521[4], i1521[5] )
  i1520.sizeDelta = new pc.Vec2( i1521[6], i1521[7] )
  i1520.anchoredPosition3D = new pc.Vec3( i1521[8], i1521[9], i1521[10] )
  i1520.rotation = new pc.Quat(i1521[11], i1521[12], i1521[13], i1521[14])
  i1520.scale = new pc.Vec3( i1521[15], i1521[16], i1521[17] )
  return i1520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1523 = data
  i1522.planeDistance = i1523[0]
  i1522.referencePixelsPerUnit = i1523[1]
  i1522.isFallbackOverlay = !!i1523[2]
  i1522.renderMode = i1523[3]
  i1522.renderOrder = i1523[4]
  i1522.sortingLayerName = i1523[5]
  i1522.sortingOrder = i1523[6]
  i1522.scaleFactor = i1523[7]
  request.r(i1523[8], i1523[9], 0, i1522, 'worldCamera')
  i1522.overrideSorting = !!i1523[10]
  i1522.pixelPerfect = !!i1523[11]
  i1522.targetDisplay = i1523[12]
  i1522.overridePixelPerfect = !!i1523[13]
  i1522.enabled = !!i1523[14]
  return i1522
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1524 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1525 = data
  i1524.m_UiScaleMode = i1525[0]
  i1524.m_ReferencePixelsPerUnit = i1525[1]
  i1524.m_ScaleFactor = i1525[2]
  i1524.m_ReferenceResolution = new pc.Vec2( i1525[3], i1525[4] )
  i1524.m_ScreenMatchMode = i1525[5]
  i1524.m_MatchWidthOrHeight = i1525[6]
  i1524.m_PhysicalUnit = i1525[7]
  i1524.m_FallbackScreenDPI = i1525[8]
  i1524.m_DefaultSpriteDPI = i1525[9]
  i1524.m_DynamicPixelsPerUnit = i1525[10]
  i1524.m_PresetInfoIsWorld = !!i1525[11]
  return i1524
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1526 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1527 = data
  i1526.m_IgnoreReversedGraphics = !!i1527[0]
  i1526.m_BlockingObjects = i1527[1]
  i1526.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1527[2] )
  return i1526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1529 = data
  i1528.cullTransparentMesh = !!i1529[0]
  return i1528
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1530 = root || request.c( 'UnityEngine.UI.Image' )
  var i1531 = data
  request.r(i1531[0], i1531[1], 0, i1530, 'm_Sprite')
  i1530.m_Type = i1531[2]
  i1530.m_PreserveAspect = !!i1531[3]
  i1530.m_FillCenter = !!i1531[4]
  i1530.m_FillMethod = i1531[5]
  i1530.m_FillAmount = i1531[6]
  i1530.m_FillClockwise = !!i1531[7]
  i1530.m_FillOrigin = i1531[8]
  i1530.m_UseSpriteMesh = !!i1531[9]
  i1530.m_PixelsPerUnitMultiplier = i1531[10]
  request.r(i1531[11], i1531[12], 0, i1530, 'm_Material')
  i1530.m_Maskable = !!i1531[13]
  i1530.m_Color = new pc.Color(i1531[14], i1531[15], i1531[16], i1531[17])
  i1530.m_RaycastTarget = !!i1531[18]
  i1530.m_RaycastPadding = new pc.Vec4( i1531[19], i1531[20], i1531[21], i1531[22] )
  return i1530
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1532 = root || request.c( 'UnityEngine.UI.Text' )
  var i1533 = data
  i1532.m_FontData = request.d('UnityEngine.UI.FontData', i1533[0], i1532.m_FontData)
  i1532.m_Text = i1533[1]
  request.r(i1533[2], i1533[3], 0, i1532, 'm_Material')
  i1532.m_Maskable = !!i1533[4]
  i1532.m_Color = new pc.Color(i1533[5], i1533[6], i1533[7], i1533[8])
  i1532.m_RaycastTarget = !!i1533[9]
  i1532.m_RaycastPadding = new pc.Vec4( i1533[10], i1533[11], i1533[12], i1533[13] )
  return i1532
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1534 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1535 = data
  request.r(i1535[0], i1535[1], 0, i1534, 'm_Font')
  i1534.m_FontSize = i1535[2]
  i1534.m_FontStyle = i1535[3]
  i1534.m_BestFit = !!i1535[4]
  i1534.m_MinSize = i1535[5]
  i1534.m_MaxSize = i1535[6]
  i1534.m_Alignment = i1535[7]
  i1534.m_AlignByGeometry = !!i1535[8]
  i1534.m_RichText = !!i1535[9]
  i1534.m_HorizontalOverflow = i1535[10]
  i1534.m_VerticalOverflow = i1535[11]
  i1534.m_LineSpacing = i1535[12]
  return i1534
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1536 = root || request.c( 'UnityEngine.UI.Button' )
  var i1537 = data
  i1536.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1537[0], i1536.m_OnClick)
  i1536.m_Navigation = request.d('UnityEngine.UI.Navigation', i1537[1], i1536.m_Navigation)
  i1536.m_Transition = i1537[2]
  i1536.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1537[3], i1536.m_Colors)
  i1536.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1537[4], i1536.m_SpriteState)
  i1536.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1537[5], i1536.m_AnimationTriggers)
  i1536.m_Interactable = !!i1537[6]
  request.r(i1537[7], i1537[8], 0, i1536, 'm_TargetGraphic')
  return i1536
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1538 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1539 = data
  i1538.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1539[0], i1538.m_PersistentCalls)
  return i1538
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1540 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1541 = data
  var i1543 = i1541[0]
  var i1542 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1543.length; i += 1) {
    i1542.add(request.d('UnityEngine.Events.PersistentCall', i1543[i + 0]));
  }
  i1540.m_Calls = i1542
  return i1540
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1546 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1547 = data
  request.r(i1547[0], i1547[1], 0, i1546, 'm_Target')
  i1546.m_TargetAssemblyTypeName = i1547[2]
  i1546.m_MethodName = i1547[3]
  i1546.m_Mode = i1547[4]
  i1546.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1547[5], i1546.m_Arguments)
  i1546.m_CallState = i1547[6]
  return i1546
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1548 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1549 = data
  i1548.m_Mode = i1549[0]
  i1548.m_WrapAround = !!i1549[1]
  request.r(i1549[2], i1549[3], 0, i1548, 'm_SelectOnUp')
  request.r(i1549[4], i1549[5], 0, i1548, 'm_SelectOnDown')
  request.r(i1549[6], i1549[7], 0, i1548, 'm_SelectOnLeft')
  request.r(i1549[8], i1549[9], 0, i1548, 'm_SelectOnRight')
  return i1548
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1550 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1551 = data
  i1550.m_NormalColor = new pc.Color(i1551[0], i1551[1], i1551[2], i1551[3])
  i1550.m_HighlightedColor = new pc.Color(i1551[4], i1551[5], i1551[6], i1551[7])
  i1550.m_PressedColor = new pc.Color(i1551[8], i1551[9], i1551[10], i1551[11])
  i1550.m_SelectedColor = new pc.Color(i1551[12], i1551[13], i1551[14], i1551[15])
  i1550.m_DisabledColor = new pc.Color(i1551[16], i1551[17], i1551[18], i1551[19])
  i1550.m_ColorMultiplier = i1551[20]
  i1550.m_FadeDuration = i1551[21]
  return i1550
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1552 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1553 = data
  request.r(i1553[0], i1553[1], 0, i1552, 'm_HighlightedSprite')
  request.r(i1553[2], i1553[3], 0, i1552, 'm_PressedSprite')
  request.r(i1553[4], i1553[5], 0, i1552, 'm_SelectedSprite')
  request.r(i1553[6], i1553[7], 0, i1552, 'm_DisabledSprite')
  return i1552
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1554 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1555 = data
  i1554.m_NormalTrigger = i1555[0]
  i1554.m_HighlightedTrigger = i1555[1]
  i1554.m_PressedTrigger = i1555[2]
  i1554.m_SelectedTrigger = i1555[3]
  i1554.m_DisabledTrigger = i1555[4]
  return i1554
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i1556 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i1557 = data
  request.r(i1557[0], i1557[1], 0, i1556, 'm_Texture')
  i1556.m_UVRect = UnityEngine.Rect.MinMaxRect(i1557[2], i1557[3], i1557[4], i1557[5])
  request.r(i1557[6], i1557[7], 0, i1556, 'm_Material')
  i1556.m_Maskable = !!i1557[8]
  i1556.m_Color = new pc.Color(i1557[9], i1557[10], i1557[11], i1557[12])
  i1556.m_RaycastTarget = !!i1557[13]
  i1556.m_RaycastPadding = new pc.Vec4( i1557[14], i1557[15], i1557[16], i1557[17] )
  return i1556
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i1558 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i1559 = data
  i1558.targetIsSelf = !!i1559[0]
  request.r(i1559[1], i1559[2], 0, i1558, 'targetGO')
  i1558.tweenTargetIsTargetGO = !!i1559[3]
  i1558.delay = i1559[4]
  i1558.duration = i1559[5]
  i1558.easeType = i1559[6]
  i1558.easeCurve = new pc.AnimationCurve( { keys_flow: i1559[7] } )
  i1558.loopType = i1559[8]
  i1558.loops = i1559[9]
  i1558.id = i1559[10]
  i1558.isRelative = !!i1559[11]
  i1558.isFrom = !!i1559[12]
  i1558.isIndependentUpdate = !!i1559[13]
  i1558.autoKill = !!i1559[14]
  i1558.autoGenerate = !!i1559[15]
  i1558.isActive = !!i1559[16]
  i1558.isValid = !!i1559[17]
  request.r(i1559[18], i1559[19], 0, i1558, 'target')
  i1558.animationType = i1559[20]
  i1558.targetType = i1559[21]
  i1558.forcedTargetType = i1559[22]
  i1558.autoPlay = !!i1559[23]
  i1558.useTargetAsV3 = !!i1559[24]
  i1558.endValueFloat = i1559[25]
  i1558.endValueV3 = new pc.Vec3( i1559[26], i1559[27], i1559[28] )
  i1558.endValueV2 = new pc.Vec2( i1559[29], i1559[30] )
  i1558.endValueColor = new pc.Color(i1559[31], i1559[32], i1559[33], i1559[34])
  i1558.endValueString = i1559[35]
  i1558.endValueRect = UnityEngine.Rect.MinMaxRect(i1559[36], i1559[37], i1559[38], i1559[39])
  request.r(i1559[40], i1559[41], 0, i1558, 'endValueTransform')
  i1558.optionalBool0 = !!i1559[42]
  i1558.optionalBool1 = !!i1559[43]
  i1558.optionalFloat0 = i1559[44]
  i1558.optionalInt0 = i1559[45]
  i1558.optionalRotationMode = i1559[46]
  i1558.optionalScrambleMode = i1559[47]
  i1558.optionalShakeRandomnessMode = i1559[48]
  i1558.optionalString = i1559[49]
  i1558.updateType = i1559[50]
  i1558.isSpeedBased = !!i1559[51]
  i1558.hasOnStart = !!i1559[52]
  i1558.hasOnPlay = !!i1559[53]
  i1558.hasOnUpdate = !!i1559[54]
  i1558.hasOnStepComplete = !!i1559[55]
  i1558.hasOnComplete = !!i1559[56]
  i1558.hasOnTweenCreated = !!i1559[57]
  i1558.hasOnRewind = !!i1559[58]
  i1558.onStart = request.d('UnityEngine.Events.UnityEvent', i1559[59], i1558.onStart)
  i1558.onPlay = request.d('UnityEngine.Events.UnityEvent', i1559[60], i1558.onPlay)
  i1558.onUpdate = request.d('UnityEngine.Events.UnityEvent', i1559[61], i1558.onUpdate)
  i1558.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i1559[62], i1558.onStepComplete)
  i1558.onComplete = request.d('UnityEngine.Events.UnityEvent', i1559[63], i1558.onComplete)
  i1558.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i1559[64], i1558.onTweenCreated)
  i1558.onRewind = request.d('UnityEngine.Events.UnityEvent', i1559[65], i1558.onRewind)
  return i1558
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i1560 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i1561 = data
  i1560.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1561[0], i1560.m_PersistentCalls)
  return i1560
}

Deserializers["TutController"] = function (request, data, root) {
  var i1562 = root || request.c( 'TutController' )
  var i1563 = data
  request.r(i1563[0], i1563[1], 0, i1562, 'rt')
  request.r(i1563[2], i1563[3], 0, i1562, 'startItem')
  request.r(i1563[4], i1563[5], 0, i1562, 'endItem')
  i1562.speedMove = i1563[6]
  request.r(i1563[7], i1563[8], 0, i1562, 'currentTarget')
  i1562.startPos = new pc.Vec2( i1563[9], i1563[10] )
  i1562.endPos = new pc.Vec2( i1563[11], i1563[12] )
  return i1562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i1564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i1565 = data
  i1564.color = new pc.Color(i1565[0], i1565[1], i1565[2], i1565[3])
  request.r(i1565[4], i1565[5], 0, i1564, 'sprite')
  i1564.flipX = !!i1565[6]
  i1564.flipY = !!i1565[7]
  i1564.drawMode = i1565[8]
  i1564.size = new pc.Vec2( i1565[9], i1565[10] )
  i1564.tileMode = i1565[11]
  i1564.adaptiveModeThreshold = i1565[12]
  i1564.maskInteraction = i1565[13]
  i1564.spriteSortPoint = i1565[14]
  i1564.enabled = !!i1565[15]
  request.r(i1565[16], i1565[17], 0, i1564, 'sharedMaterial')
  var i1567 = i1565[18]
  var i1566 = []
  for(var i = 0; i < i1567.length; i += 2) {
  request.r(i1567[i + 0], i1567[i + 1], 2, i1566, '')
  }
  i1564.sharedMaterials = i1566
  i1564.receiveShadows = !!i1565[19]
  i1564.shadowCastingMode = i1565[20]
  i1564.sortingLayerID = i1565[21]
  i1564.sortingOrder = i1565[22]
  i1564.lightmapIndex = i1565[23]
  i1564.lightmapSceneIndex = i1565[24]
  i1564.lightmapScaleOffset = new pc.Vec4( i1565[25], i1565[26], i1565[27], i1565[28] )
  i1564.lightProbeUsage = i1565[29]
  i1564.reflectionProbeUsage = i1565[30]
  return i1564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animator"] = function (request, data, root) {
  var i1570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animator' )
  var i1571 = data
  request.r(i1571[0], i1571[1], 0, i1570, 'animatorController')
  request.r(i1571[2], i1571[3], 0, i1570, 'avatar')
  i1570.updateMode = i1571[4]
  i1570.hasTransformHierarchy = !!i1571[5]
  i1570.applyRootMotion = !!i1571[6]
  var i1573 = i1571[7]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 2) {
  request.r(i1573[i + 0], i1573[i + 1], 2, i1572, '')
  }
  i1570.humanBones = i1572
  i1570.enabled = !!i1571[8]
  return i1570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1577 = data
  request.r(i1577[0], i1577[1], 0, i1576, 'sharedMesh')
  var i1579 = i1577[2]
  var i1578 = []
  for(var i = 0; i < i1579.length; i += 2) {
  request.r(i1579[i + 0], i1579[i + 1], 2, i1578, '')
  }
  i1576.bones = i1578
  i1576.updateWhenOffscreen = !!i1577[3]
  i1576.localBounds = i1577[4]
  request.r(i1577[5], i1577[6], 0, i1576, 'rootBone')
  var i1581 = i1577[7]
  var i1580 = []
  for(var i = 0; i < i1581.length; i += 1) {
    i1580.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1581[i + 0]) );
  }
  i1576.blendShapesWeights = i1580
  i1576.enabled = !!i1577[8]
  request.r(i1577[9], i1577[10], 0, i1576, 'sharedMaterial')
  var i1583 = i1577[11]
  var i1582 = []
  for(var i = 0; i < i1583.length; i += 2) {
  request.r(i1583[i + 0], i1583[i + 1], 2, i1582, '')
  }
  i1576.sharedMaterials = i1582
  i1576.receiveShadows = !!i1577[12]
  i1576.shadowCastingMode = i1577[13]
  i1576.sortingLayerID = i1577[14]
  i1576.sortingOrder = i1577[15]
  i1576.lightmapIndex = i1577[16]
  i1576.lightmapSceneIndex = i1577[17]
  i1576.lightmapScaleOffset = new pc.Vec4( i1577[18], i1577[19], i1577[20], i1577[21] )
  i1576.lightProbeUsage = i1577[22]
  i1576.reflectionProbeUsage = i1577[23]
  return i1576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1587 = data
  i1586.weight = i1587[0]
  return i1586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1589 = data
  request.r(i1589[0], i1589[1], 0, i1588, 'sharedMesh')
  return i1588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1591 = data
  request.r(i1591[0], i1591[1], 0, i1590, 'additionalVertexStreams')
  i1590.enabled = !!i1591[2]
  request.r(i1591[3], i1591[4], 0, i1590, 'sharedMaterial')
  var i1593 = i1591[5]
  var i1592 = []
  for(var i = 0; i < i1593.length; i += 2) {
  request.r(i1593[i + 0], i1593[i + 1], 2, i1592, '')
  }
  i1590.sharedMaterials = i1592
  i1590.receiveShadows = !!i1591[6]
  i1590.shadowCastingMode = i1591[7]
  i1590.sortingLayerID = i1591[8]
  i1590.sortingOrder = i1591[9]
  i1590.lightmapIndex = i1591[10]
  i1590.lightmapSceneIndex = i1591[11]
  i1590.lightmapScaleOffset = new pc.Vec4( i1591[12], i1591[13], i1591[14], i1591[15] )
  i1590.lightProbeUsage = i1591[16]
  i1590.reflectionProbeUsage = i1591[17]
  return i1590
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i1594 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i1595 = data
  i1594.loop = !!i1595[0]
  i1594.timeScale = i1595[1]
  request.r(i1595[2], i1595[3], 0, i1594, 'skeletonDataAsset')
  i1594.initialSkinName = i1595[4]
  i1594.fixPrefabOverrideViaMeshFilter = i1595[5]
  i1594.initialFlipX = !!i1595[6]
  i1594.initialFlipY = !!i1595[7]
  i1594.updateWhenInvisible = i1595[8]
  i1594.zSpacing = i1595[9]
  i1594.useClipping = !!i1595[10]
  i1594.immutableTriangles = !!i1595[11]
  i1594.pmaVertexColors = !!i1595[12]
  i1594.clearStateOnDisable = !!i1595[13]
  i1594.tintBlack = !!i1595[14]
  i1594.singleSubmesh = !!i1595[15]
  i1594.fixDrawOrder = !!i1595[16]
  i1594.addNormals = !!i1595[17]
  i1594.calculateTangents = !!i1595[18]
  i1594.maskInteraction = i1595[19]
  i1594.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i1595[20], i1594.maskMaterials)
  i1594.disableRenderingOnOverride = !!i1595[21]
  i1594.updateTiming = i1595[22]
  i1594.unscaledTime = !!i1595[23]
  i1594._animationName = i1595[24]
  var i1597 = i1595[25]
  var i1596 = []
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.push( i1597[i + 0] );
  }
  i1594.separatorSlotNames = i1596
  i1594.physicsPositionInheritanceFactor = new pc.Vec2( i1595[26], i1595[27] )
  i1594.physicsRotationInheritanceFactor = i1595[28]
  request.r(i1595[29], i1595[30], 0, i1594, 'physicsMovementRelativeTo')
  return i1594
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i1598 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i1599 = data
  var i1601 = i1599[0]
  var i1600 = []
  for(var i = 0; i < i1601.length; i += 2) {
  request.r(i1601[i + 0], i1601[i + 1], 2, i1600, '')
  }
  i1598.materialsMaskDisabled = i1600
  var i1603 = i1599[1]
  var i1602 = []
  for(var i = 0; i < i1603.length; i += 2) {
  request.r(i1603[i + 0], i1603[i + 1], 2, i1602, '')
  }
  i1598.materialsInsideMask = i1602
  var i1605 = i1599[2]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 2) {
  request.r(i1605[i + 0], i1605[i + 1], 2, i1604, '')
  }
  i1598.materialsOutsideMask = i1604
  return i1598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i1608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i1609 = data
  i1608.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i1609[0], i1608.main)
  i1608.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i1609[1], i1608.colorBySpeed)
  i1608.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i1609[2], i1608.colorOverLifetime)
  i1608.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i1609[3], i1608.emission)
  i1608.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i1609[4], i1608.rotationBySpeed)
  i1608.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i1609[5], i1608.rotationOverLifetime)
  i1608.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i1609[6], i1608.shape)
  i1608.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i1609[7], i1608.sizeBySpeed)
  i1608.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i1609[8], i1608.sizeOverLifetime)
  i1608.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i1609[9], i1608.textureSheetAnimation)
  i1608.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i1609[10], i1608.velocityOverLifetime)
  i1608.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i1609[11], i1608.noise)
  i1608.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i1609[12], i1608.inheritVelocity)
  i1608.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i1609[13], i1608.forceOverLifetime)
  i1608.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i1609[14], i1608.limitVelocityOverLifetime)
  i1608.useAutoRandomSeed = !!i1609[15]
  i1608.randomSeed = i1609[16]
  return i1608
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i1610 = root || new pc.ParticleSystemMain()
  var i1611 = data
  i1610.duration = i1611[0]
  i1610.loop = !!i1611[1]
  i1610.prewarm = !!i1611[2]
  i1610.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[3], i1610.startDelay)
  i1610.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[4], i1610.startLifetime)
  i1610.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[5], i1610.startSpeed)
  i1610.startSize3D = !!i1611[6]
  i1610.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[7], i1610.startSizeX)
  i1610.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[8], i1610.startSizeY)
  i1610.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[9], i1610.startSizeZ)
  i1610.startRotation3D = !!i1611[10]
  i1610.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[11], i1610.startRotationX)
  i1610.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[12], i1610.startRotationY)
  i1610.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[13], i1610.startRotationZ)
  i1610.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1611[14], i1610.startColor)
  i1610.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1611[15], i1610.gravityModifier)
  i1610.simulationSpace = i1611[16]
  request.r(i1611[17], i1611[18], 0, i1610, 'customSimulationSpace')
  i1610.simulationSpeed = i1611[19]
  i1610.useUnscaledTime = !!i1611[20]
  i1610.scalingMode = i1611[21]
  i1610.playOnAwake = !!i1611[22]
  i1610.maxParticles = i1611[23]
  i1610.emitterVelocityMode = i1611[24]
  i1610.stopAction = i1611[25]
  return i1610
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i1612 = root || new pc.MinMaxCurve()
  var i1613 = data
  i1612.mode = i1613[0]
  i1612.curveMin = new pc.AnimationCurve( { keys_flow: i1613[1] } )
  i1612.curveMax = new pc.AnimationCurve( { keys_flow: i1613[2] } )
  i1612.curveMultiplier = i1613[3]
  i1612.constantMin = i1613[4]
  i1612.constantMax = i1613[5]
  return i1612
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i1614 = root || new pc.MinMaxGradient()
  var i1615 = data
  i1614.mode = i1615[0]
  i1614.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1615[1], i1614.gradientMin)
  i1614.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1615[2], i1614.gradientMax)
  i1614.colorMin = new pc.Color(i1615[3], i1615[4], i1615[5], i1615[6])
  i1614.colorMax = new pc.Color(i1615[7], i1615[8], i1615[9], i1615[10])
  return i1614
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i1616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i1617 = data
  i1616.mode = i1617[0]
  var i1619 = i1617[1]
  var i1618 = []
  for(var i = 0; i < i1619.length; i += 1) {
    i1618.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i1619[i + 0]) );
  }
  i1616.colorKeys = i1618
  var i1621 = i1617[2]
  var i1620 = []
  for(var i = 0; i < i1621.length; i += 1) {
    i1620.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1621[i + 0]) );
  }
  i1616.alphaKeys = i1620
  return i1616
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1622 = root || new pc.ParticleSystemColorBySpeed()
  var i1623 = data
  i1622.enabled = !!i1623[0]
  i1622.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1623[1], i1622.color)
  i1622.range = new pc.Vec2( i1623[2], i1623[3] )
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1627 = data
  i1626.color = new pc.Color(i1627[0], i1627[1], i1627[2], i1627[3])
  i1626.time = i1627[4]
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1631 = data
  i1630.alpha = i1631[0]
  i1630.time = i1631[1]
  return i1630
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1632 = root || new pc.ParticleSystemColorOverLifetime()
  var i1633 = data
  i1632.enabled = !!i1633[0]
  i1632.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1633[1], i1632.color)
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1634 = root || new pc.ParticleSystemEmitter()
  var i1635 = data
  i1634.enabled = !!i1635[0]
  i1634.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1635[1], i1634.rateOverTime)
  i1634.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1635[2], i1634.rateOverDistance)
  var i1637 = i1635[3]
  var i1636 = []
  for(var i = 0; i < i1637.length; i += 1) {
    i1636.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1637[i + 0]) );
  }
  i1634.bursts = i1636
  return i1634
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1640 = root || new pc.ParticleSystemBurst()
  var i1641 = data
  i1640.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1641[0], i1640.count)
  i1640.cycleCount = i1641[1]
  i1640.minCount = i1641[2]
  i1640.maxCount = i1641[3]
  i1640.repeatInterval = i1641[4]
  i1640.time = i1641[5]
  return i1640
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1642 = root || new pc.ParticleSystemRotationBySpeed()
  var i1643 = data
  i1642.enabled = !!i1643[0]
  i1642.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1643[1], i1642.x)
  i1642.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1643[2], i1642.y)
  i1642.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1643[3], i1642.z)
  i1642.separateAxes = !!i1643[4]
  i1642.range = new pc.Vec2( i1643[5], i1643[6] )
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1644 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1645 = data
  i1644.enabled = !!i1645[0]
  i1644.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1645[1], i1644.x)
  i1644.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1645[2], i1644.y)
  i1644.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1645[3], i1644.z)
  i1644.separateAxes = !!i1645[4]
  return i1644
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1646 = root || new pc.ParticleSystemShape()
  var i1647 = data
  i1646.enabled = !!i1647[0]
  i1646.shapeType = i1647[1]
  i1646.randomDirectionAmount = i1647[2]
  i1646.sphericalDirectionAmount = i1647[3]
  i1646.randomPositionAmount = i1647[4]
  i1646.alignToDirection = !!i1647[5]
  i1646.radius = i1647[6]
  i1646.radiusMode = i1647[7]
  i1646.radiusSpread = i1647[8]
  i1646.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1647[9], i1646.radiusSpeed)
  i1646.radiusThickness = i1647[10]
  i1646.angle = i1647[11]
  i1646.length = i1647[12]
  i1646.boxThickness = new pc.Vec3( i1647[13], i1647[14], i1647[15] )
  i1646.meshShapeType = i1647[16]
  request.r(i1647[17], i1647[18], 0, i1646, 'mesh')
  request.r(i1647[19], i1647[20], 0, i1646, 'meshRenderer')
  request.r(i1647[21], i1647[22], 0, i1646, 'skinnedMeshRenderer')
  i1646.useMeshMaterialIndex = !!i1647[23]
  i1646.meshMaterialIndex = i1647[24]
  i1646.useMeshColors = !!i1647[25]
  i1646.normalOffset = i1647[26]
  i1646.arc = i1647[27]
  i1646.arcMode = i1647[28]
  i1646.arcSpread = i1647[29]
  i1646.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1647[30], i1646.arcSpeed)
  i1646.donutRadius = i1647[31]
  i1646.position = new pc.Vec3( i1647[32], i1647[33], i1647[34] )
  i1646.rotation = new pc.Vec3( i1647[35], i1647[36], i1647[37] )
  i1646.scale = new pc.Vec3( i1647[38], i1647[39], i1647[40] )
  return i1646
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1648 = root || new pc.ParticleSystemSizeBySpeed()
  var i1649 = data
  i1648.enabled = !!i1649[0]
  i1648.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1649[1], i1648.x)
  i1648.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1649[2], i1648.y)
  i1648.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1649[3], i1648.z)
  i1648.separateAxes = !!i1649[4]
  i1648.range = new pc.Vec2( i1649[5], i1649[6] )
  return i1648
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1650 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1651 = data
  i1650.enabled = !!i1651[0]
  i1650.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1651[1], i1650.x)
  i1650.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1651[2], i1650.y)
  i1650.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1651[3], i1650.z)
  i1650.separateAxes = !!i1651[4]
  return i1650
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1652 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1653 = data
  i1652.enabled = !!i1653[0]
  i1652.mode = i1653[1]
  i1652.animation = i1653[2]
  i1652.numTilesX = i1653[3]
  i1652.numTilesY = i1653[4]
  i1652.useRandomRow = !!i1653[5]
  i1652.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1653[6], i1652.frameOverTime)
  i1652.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1653[7], i1652.startFrame)
  i1652.cycleCount = i1653[8]
  i1652.rowIndex = i1653[9]
  i1652.flipU = i1653[10]
  i1652.flipV = i1653[11]
  i1652.spriteCount = i1653[12]
  var i1655 = i1653[13]
  var i1654 = []
  for(var i = 0; i < i1655.length; i += 2) {
  request.r(i1655[i + 0], i1655[i + 1], 2, i1654, '')
  }
  i1652.sprites = i1654
  return i1652
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1658 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1659 = data
  i1658.enabled = !!i1659[0]
  i1658.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[1], i1658.x)
  i1658.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[2], i1658.y)
  i1658.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[3], i1658.z)
  i1658.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[4], i1658.radial)
  i1658.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[5], i1658.speedModifier)
  i1658.space = i1659[6]
  i1658.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[7], i1658.orbitalX)
  i1658.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[8], i1658.orbitalY)
  i1658.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[9], i1658.orbitalZ)
  i1658.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[10], i1658.orbitalOffsetX)
  i1658.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[11], i1658.orbitalOffsetY)
  i1658.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1659[12], i1658.orbitalOffsetZ)
  return i1658
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1660 = root || new pc.ParticleSystemNoise()
  var i1661 = data
  i1660.enabled = !!i1661[0]
  i1660.separateAxes = !!i1661[1]
  i1660.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[2], i1660.strengthX)
  i1660.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[3], i1660.strengthY)
  i1660.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[4], i1660.strengthZ)
  i1660.frequency = i1661[5]
  i1660.damping = !!i1661[6]
  i1660.octaveCount = i1661[7]
  i1660.octaveMultiplier = i1661[8]
  i1660.octaveScale = i1661[9]
  i1660.quality = i1661[10]
  i1660.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[11], i1660.scrollSpeed)
  i1660.scrollSpeedMultiplier = i1661[12]
  i1660.remapEnabled = !!i1661[13]
  i1660.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[14], i1660.remapX)
  i1660.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[15], i1660.remapY)
  i1660.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[16], i1660.remapZ)
  i1660.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[17], i1660.positionAmount)
  i1660.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[18], i1660.rotationAmount)
  i1660.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1661[19], i1660.sizeAmount)
  return i1660
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1662 = root || new pc.ParticleSystemInheritVelocity()
  var i1663 = data
  i1662.enabled = !!i1663[0]
  i1662.mode = i1663[1]
  i1662.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1663[2], i1662.curve)
  return i1662
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1664 = root || new pc.ParticleSystemForceOverLifetime()
  var i1665 = data
  i1664.enabled = !!i1665[0]
  i1664.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1665[1], i1664.x)
  i1664.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1665[2], i1664.y)
  i1664.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1665[3], i1664.z)
  i1664.space = i1665[4]
  i1664.randomized = !!i1665[5]
  return i1664
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1666 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1667 = data
  i1666.enabled = !!i1667[0]
  i1666.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1667[1], i1666.limit)
  i1666.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1667[2], i1666.limitX)
  i1666.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1667[3], i1666.limitY)
  i1666.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1667[4], i1666.limitZ)
  i1666.dampen = i1667[5]
  i1666.separateAxes = !!i1667[6]
  i1666.space = i1667[7]
  i1666.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1667[8], i1666.drag)
  i1666.multiplyDragByParticleSize = !!i1667[9]
  i1666.multiplyDragByParticleVelocity = !!i1667[10]
  return i1666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1669 = data
  request.r(i1669[0], i1669[1], 0, i1668, 'mesh')
  i1668.meshCount = i1669[2]
  i1668.activeVertexStreamsCount = i1669[3]
  i1668.alignment = i1669[4]
  i1668.renderMode = i1669[5]
  i1668.sortMode = i1669[6]
  i1668.lengthScale = i1669[7]
  i1668.velocityScale = i1669[8]
  i1668.cameraVelocityScale = i1669[9]
  i1668.normalDirection = i1669[10]
  i1668.sortingFudge = i1669[11]
  i1668.minParticleSize = i1669[12]
  i1668.maxParticleSize = i1669[13]
  i1668.pivot = new pc.Vec3( i1669[14], i1669[15], i1669[16] )
  request.r(i1669[17], i1669[18], 0, i1668, 'trailMaterial')
  i1668.applyActiveColorSpace = !!i1669[19]
  i1668.enabled = !!i1669[20]
  request.r(i1669[21], i1669[22], 0, i1668, 'sharedMaterial')
  var i1671 = i1669[23]
  var i1670 = []
  for(var i = 0; i < i1671.length; i += 2) {
  request.r(i1671[i + 0], i1671[i + 1], 2, i1670, '')
  }
  i1668.sharedMaterials = i1670
  i1668.receiveShadows = !!i1669[24]
  i1668.shadowCastingMode = i1669[25]
  i1668.sortingLayerID = i1669[26]
  i1668.sortingOrder = i1669[27]
  i1668.lightmapIndex = i1669[28]
  i1668.lightmapSceneIndex = i1669[29]
  i1668.lightmapScaleOffset = new pc.Vec4( i1669[30], i1669[31], i1669[32], i1669[33] )
  i1668.lightProbeUsage = i1669[34]
  i1668.reflectionProbeUsage = i1669[35]
  return i1668
}

Deserializers["GameController"] = function (request, data, root) {
  var i1672 = root || request.c( 'GameController' )
  var i1673 = data
  i1672.OnSwitchItem = request.d('System.Action', i1673[0], i1672.OnSwitchItem)
  var i1675 = i1673[1]
  var i1674 = new (System.Collections.Generic.List$1(Bridge.ns('ItemButton')))
  for(var i = 0; i < i1675.length; i += 1) {
    i1674.add(request.d('ItemButton', i1675[i + 0]));
  }
  i1672.item1Buttons = i1674
  var i1677 = i1673[2]
  var i1676 = new (System.Collections.Generic.List$1(Bridge.ns('ItemButton')))
  for(var i = 0; i < i1677.length; i += 1) {
    i1676.add(request.d('ItemButton', i1677[i + 0]));
  }
  i1672.item2Buttons = i1676
  request.r(i1673[3], i1673[4], 0, i1672, 'type1')
  request.r(i1673[5], i1673[6], 0, i1672, 'type2')
  request.r(i1673[7], i1673[8], 0, i1672, 'effect')
  request.r(i1673[9], i1673[10], 0, i1672, 'pTut')
  request.r(i1673[11], i1673[12], 0, i1672, 'lTut')
  return i1672
}

Deserializers["System.Action"] = function (request, data, root) {
  var i1678 = root || request.c( 'System.Action' )
  var i1679 = data
  return i1678
}

Deserializers["ItemButton"] = function (request, data, root) {
  var i1682 = root || request.c( 'ItemButton' )
  var i1683 = data
  request.r(i1683[0], i1683[1], 0, i1682, 'Button1')
  request.r(i1683[2], i1683[3], 0, i1682, 'bg1')
  request.r(i1683[4], i1683[5], 0, i1682, 'Button2')
  request.r(i1683[6], i1683[7], 0, i1682, 'bg2')
  request.r(i1683[8], i1683[9], 0, i1682, 'Item')
  return i1682
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1684 = root || request.c( 'LunaController' )
  var i1685 = data
  i1684.TimePlay = i1685[0]
  i1684.CountPlay = i1685[1]
  request.r(i1685[2], i1685[3], 0, i1684, 'LogoGame')
  i1684.BGColor = new pc.Color(i1685[4], i1685[5], i1685[6], i1685[7])
  i1684.TitleTextColor = new pc.Color(i1685[8], i1685[9], i1685[10], i1685[11])
  i1684.OKTextColor = new pc.Color(i1685[12], i1685[13], i1685[14], i1685[15])
  request.r(i1685[16], i1685[17], 0, i1684, 'logo')
  request.r(i1685[18], i1685[19], 0, i1684, 'BG')
  request.r(i1685[20], i1685[21], 0, i1684, 'titleText')
  request.r(i1685[22], i1685[23], 0, i1684, 'OKText')
  request.r(i1685[24], i1685[25], 0, i1684, 'endCard')
  var i1687 = i1685[26]
  var i1686 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i1687.length; i += 2) {
  request.r(i1687[i + 0], i1687[i + 1], 1, i1686, '')
  }
  i1684.CTA = i1686
  return i1684
}

Deserializers["AudioController"] = function (request, data, root) {
  var i1690 = root || request.c( 'AudioController' )
  var i1691 = data
  i1690.MusicVolume = i1691[0]
  request.r(i1691[1], i1691[2], 0, i1690, 'BGM')
  request.r(i1691[3], i1691[4], 0, i1690, 'musicSource')
  request.r(i1691[5], i1691[6], 0, i1690, 'effectSound1')
  request.r(i1691[7], i1691[8], 0, i1690, 'effectSound2')
  request.r(i1691[9], i1691[10], 0, i1690, 'SFXPool')
  return i1690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1692 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1693 = data
  request.r(i1693[0], i1693[1], 0, i1692, 'clip')
  request.r(i1693[2], i1693[3], 0, i1692, 'outputAudioMixerGroup')
  i1692.playOnAwake = !!i1693[4]
  i1692.loop = !!i1693[5]
  i1692.time = i1693[6]
  i1692.volume = i1693[7]
  i1692.pitch = i1693[8]
  i1692.enabled = !!i1693[9]
  return i1692
}

Deserializers["UIController"] = function (request, data, root) {
  var i1694 = root || request.c( 'UIController' )
  var i1695 = data
  request.r(i1695[0], i1695[1], 0, i1694, 'model')
  i1694.PPos = new pc.Vec3( i1695[2], i1695[3], i1695[4] )
  i1694.LPos = new pc.Vec3( i1695[5], i1695[6], i1695[7] )
  request.r(i1695[8], i1695[9], 0, i1694, 'p')
  request.r(i1695[10], i1695[11], 0, i1694, 'l')
  request.r(i1695[12], i1695[13], 0, i1694, 'title')
  request.r(i1695[14], i1695[15], 0, i1694, 'logo')
  request.r(i1695[16], i1695[17], 0, i1694, 'CTA')
  request.r(i1695[18], i1695[19], 0, i1694, 'OK')
  i1694.pTitlePos = new pc.Vec2( i1695[20], i1695[21] )
  i1694.lTitlePos = new pc.Vec2( i1695[22], i1695[23] )
  i1694.pLogoPos = new pc.Vec2( i1695[24], i1695[25] )
  i1694.lLogoPos = new pc.Vec2( i1695[26], i1695[27] )
  i1694.pCTAPos = new pc.Vec2( i1695[28], i1695[29] )
  i1694.lCTAPos = new pc.Vec2( i1695[30], i1695[31] )
  i1694.pOKPos = new pc.Vec2( i1695[32], i1695[33] )
  i1694.lOKPos = new pc.Vec2( i1695[34], i1695[35] )
  return i1694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1697 = data
  i1696.ambientIntensity = i1697[0]
  i1696.reflectionIntensity = i1697[1]
  i1696.ambientMode = i1697[2]
  i1696.ambientLight = new pc.Color(i1697[3], i1697[4], i1697[5], i1697[6])
  i1696.ambientSkyColor = new pc.Color(i1697[7], i1697[8], i1697[9], i1697[10])
  i1696.ambientGroundColor = new pc.Color(i1697[11], i1697[12], i1697[13], i1697[14])
  i1696.ambientEquatorColor = new pc.Color(i1697[15], i1697[16], i1697[17], i1697[18])
  i1696.fogColor = new pc.Color(i1697[19], i1697[20], i1697[21], i1697[22])
  i1696.fogEndDistance = i1697[23]
  i1696.fogStartDistance = i1697[24]
  i1696.fogDensity = i1697[25]
  i1696.fog = !!i1697[26]
  request.r(i1697[27], i1697[28], 0, i1696, 'skybox')
  i1696.fogMode = i1697[29]
  var i1699 = i1697[30]
  var i1698 = []
  for(var i = 0; i < i1699.length; i += 1) {
    i1698.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1699[i + 0]) );
  }
  i1696.lightmaps = i1698
  i1696.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1697[31], i1696.lightProbes)
  i1696.lightmapsMode = i1697[32]
  i1696.mixedBakeMode = i1697[33]
  i1696.environmentLightingMode = i1697[34]
  i1696.ambientProbe = new pc.SphericalHarmonicsL2(i1697[35])
  request.r(i1697[36], i1697[37], 0, i1696, 'customReflection')
  request.r(i1697[38], i1697[39], 0, i1696, 'defaultReflection')
  i1696.defaultReflectionMode = i1697[40]
  i1696.defaultReflectionResolution = i1697[41]
  i1696.sunLightObjectId = i1697[42]
  i1696.pixelLightCount = i1697[43]
  i1696.defaultReflectionHDR = !!i1697[44]
  i1696.hasLightDataAsset = !!i1697[45]
  i1696.hasManualGenerate = !!i1697[46]
  return i1696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1703 = data
  request.r(i1703[0], i1703[1], 0, i1702, 'lightmapColor')
  request.r(i1703[2], i1703[3], 0, i1702, 'lightmapDirection')
  request.r(i1703[4], i1703[5], 0, i1702, 'shadowMask')
  return i1702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1704 = root || new UnityEngine.LightProbes()
  var i1705 = data
  return i1704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1712 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1713 = data
  var i1715 = i1713[0]
  var i1714 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1715.length; i += 1) {
    i1714.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1715[i + 0]));
  }
  i1712.ShaderCompilationErrors = i1714
  i1712.name = i1713[1]
  i1712.guid = i1713[2]
  var i1717 = i1713[3]
  var i1716 = []
  for(var i = 0; i < i1717.length; i += 1) {
    i1716.push( i1717[i + 0] );
  }
  i1712.shaderDefinedKeywords = i1716
  var i1719 = i1713[4]
  var i1718 = []
  for(var i = 0; i < i1719.length; i += 1) {
    i1718.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1719[i + 0]) );
  }
  i1712.passes = i1718
  var i1721 = i1713[5]
  var i1720 = []
  for(var i = 0; i < i1721.length; i += 1) {
    i1720.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1721[i + 0]) );
  }
  i1712.usePasses = i1720
  var i1723 = i1713[6]
  var i1722 = []
  for(var i = 0; i < i1723.length; i += 1) {
    i1722.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1723[i + 0]) );
  }
  i1712.defaultParameterValues = i1722
  request.r(i1713[7], i1713[8], 0, i1712, 'unityFallbackShader')
  i1712.readDepth = !!i1713[9]
  i1712.hasDepthOnlyPass = !!i1713[10]
  i1712.isCreatedByShaderGraph = !!i1713[11]
  i1712.disableBatching = !!i1713[12]
  i1712.compiled = !!i1713[13]
  return i1712
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1727 = data
  i1726.shaderName = i1727[0]
  i1726.errorMessage = i1727[1]
  return i1726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1730 = root || new pc.UnityShaderPass()
  var i1731 = data
  i1730.id = i1731[0]
  i1730.subShaderIndex = i1731[1]
  i1730.name = i1731[2]
  i1730.passType = i1731[3]
  i1730.grabPassTextureName = i1731[4]
  i1730.usePass = !!i1731[5]
  i1730.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[6], i1730.zTest)
  i1730.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[7], i1730.zWrite)
  i1730.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[8], i1730.culling)
  i1730.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1731[9], i1730.blending)
  i1730.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1731[10], i1730.alphaBlending)
  i1730.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[11], i1730.colorWriteMask)
  i1730.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[12], i1730.offsetUnits)
  i1730.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[13], i1730.offsetFactor)
  i1730.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[14], i1730.stencilRef)
  i1730.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[15], i1730.stencilReadMask)
  i1730.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1731[16], i1730.stencilWriteMask)
  i1730.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1731[17], i1730.stencilOp)
  i1730.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1731[18], i1730.stencilOpFront)
  i1730.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1731[19], i1730.stencilOpBack)
  var i1733 = i1731[20]
  var i1732 = []
  for(var i = 0; i < i1733.length; i += 1) {
    i1732.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1733[i + 0]) );
  }
  i1730.tags = i1732
  var i1735 = i1731[21]
  var i1734 = []
  for(var i = 0; i < i1735.length; i += 1) {
    i1734.push( i1735[i + 0] );
  }
  i1730.passDefinedKeywords = i1734
  var i1737 = i1731[22]
  var i1736 = []
  for(var i = 0; i < i1737.length; i += 1) {
    i1736.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1737[i + 0]) );
  }
  i1730.passDefinedKeywordGroups = i1736
  var i1739 = i1731[23]
  var i1738 = []
  for(var i = 0; i < i1739.length; i += 1) {
    i1738.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1739[i + 0]) );
  }
  i1730.variants = i1738
  var i1741 = i1731[24]
  var i1740 = []
  for(var i = 0; i < i1741.length; i += 1) {
    i1740.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1741[i + 0]) );
  }
  i1730.excludedVariants = i1740
  i1730.hasDepthReader = !!i1731[25]
  return i1730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1742 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1743 = data
  i1742.val = i1743[0]
  i1742.name = i1743[1]
  return i1742
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1744 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1745 = data
  i1744.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1745[0], i1744.src)
  i1744.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1745[1], i1744.dst)
  i1744.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1745[2], i1744.op)
  return i1744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1747 = data
  i1746.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1747[0], i1746.pass)
  i1746.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1747[1], i1746.fail)
  i1746.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1747[2], i1746.zFail)
  i1746.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1747[3], i1746.comp)
  return i1746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1751 = data
  i1750.name = i1751[0]
  i1750.value = i1751[1]
  return i1750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1755 = data
  var i1757 = i1755[0]
  var i1756 = []
  for(var i = 0; i < i1757.length; i += 1) {
    i1756.push( i1757[i + 0] );
  }
  i1754.keywords = i1756
  i1754.hasDiscard = !!i1755[1]
  return i1754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1760 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1761 = data
  i1760.passId = i1761[0]
  i1760.subShaderIndex = i1761[1]
  var i1763 = i1761[2]
  var i1762 = []
  for(var i = 0; i < i1763.length; i += 1) {
    i1762.push( i1763[i + 0] );
  }
  i1760.keywords = i1762
  i1760.vertexProgram = i1761[3]
  i1760.fragmentProgram = i1761[4]
  i1760.exportedForWebGl2 = !!i1761[5]
  i1760.readDepth = !!i1761[6]
  return i1760
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1767 = data
  request.r(i1767[0], i1767[1], 0, i1766, 'shader')
  i1766.pass = i1767[2]
  return i1766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1771 = data
  i1770.name = i1771[0]
  i1770.type = i1771[1]
  i1770.value = new pc.Vec4( i1771[2], i1771[3], i1771[4], i1771[5] )
  i1770.textureValue = i1771[6]
  i1770.shaderPropertyFlag = i1771[7]
  return i1770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1772 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1773 = data
  i1772.name = i1773[0]
  request.r(i1773[1], i1773[2], 0, i1772, 'texture')
  i1772.aabb = i1773[3]
  i1772.vertices = i1773[4]
  i1772.triangles = i1773[5]
  i1772.textureRect = UnityEngine.Rect.MinMaxRect(i1773[6], i1773[7], i1773[8], i1773[9])
  i1772.packedRect = UnityEngine.Rect.MinMaxRect(i1773[10], i1773[11], i1773[12], i1773[13])
  i1772.border = new pc.Vec4( i1773[14], i1773[15], i1773[16], i1773[17] )
  i1772.transparency = i1773[18]
  i1772.bounds = i1773[19]
  i1772.pixelsPerUnit = i1773[20]
  i1772.textureWidth = i1773[21]
  i1772.textureHeight = i1773[22]
  i1772.nativeSize = new pc.Vec2( i1773[23], i1773[24] )
  i1772.pivot = new pc.Vec2( i1773[25], i1773[26] )
  i1772.textureRectOffset = new pc.Vec2( i1773[27], i1773[28] )
  return i1772
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1775 = data
  i1774.name = i1775[0]
  return i1774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1777 = data
  i1776.name = i1777[0]
  i1776.ascent = i1777[1]
  i1776.originalLineHeight = i1777[2]
  i1776.fontSize = i1777[3]
  var i1779 = i1777[4]
  var i1778 = []
  for(var i = 0; i < i1779.length; i += 1) {
    i1778.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1779[i + 0]) );
  }
  i1776.characterInfo = i1778
  request.r(i1777[5], i1777[6], 0, i1776, 'texture')
  i1776.originalFontSize = i1777[7]
  return i1776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1783 = data
  i1782.index = i1783[0]
  i1782.advance = i1783[1]
  i1782.bearing = i1783[2]
  i1782.glyphWidth = i1783[3]
  i1782.glyphHeight = i1783[4]
  i1782.minX = i1783[5]
  i1782.maxX = i1783[6]
  i1782.minY = i1783[7]
  i1782.maxY = i1783[8]
  i1782.uvBottomLeftX = i1783[9]
  i1782.uvBottomLeftY = i1783[10]
  i1782.uvBottomRightX = i1783[11]
  i1782.uvBottomRightY = i1783[12]
  i1782.uvTopLeftX = i1783[13]
  i1782.uvTopLeftY = i1783[14]
  i1782.uvTopRightX = i1783[15]
  i1782.uvTopRightY = i1783[16]
  return i1782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1785 = data
  i1784.name = i1785[0]
  i1784.bytes64 = i1785[1]
  i1784.data = i1785[2]
  return i1784
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1786 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1787 = data
  var i1789 = i1787[0]
  var i1788 = []
  for(var i = 0; i < i1789.length; i += 2) {
  request.r(i1789[i + 0], i1789[i + 1], 2, i1788, '')
  }
  i1786.atlasAssets = i1788
  i1786.scale = i1787[1]
  request.r(i1787[2], i1787[3], 0, i1786, 'skeletonJSON')
  i1786.isUpgradingBlendModeMaterials = !!i1787[4]
  i1786.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1787[5], i1786.blendModeMaterials)
  var i1791 = i1787[6]
  var i1790 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1791.length; i += 2) {
  request.r(i1791[i + 0], i1791[i + 1], 1, i1790, '')
  }
  i1786.skeletonDataModifiers = i1790
  var i1793 = i1787[7]
  var i1792 = []
  for(var i = 0; i < i1793.length; i += 1) {
    i1792.push( i1793[i + 0] );
  }
  i1786.fromAnimation = i1792
  var i1795 = i1787[8]
  var i1794 = []
  for(var i = 0; i < i1795.length; i += 1) {
    i1794.push( i1795[i + 0] );
  }
  i1786.toAnimation = i1794
  i1786.duration = i1787[9]
  i1786.defaultMix = i1787[10]
  request.r(i1787[11], i1787[12], 0, i1786, 'controller')
  return i1786
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1798 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1799 = data
  i1798.applyAdditiveMaterial = !!i1799[0]
  var i1801 = i1799[1]
  var i1800 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1801.length; i += 1) {
    i1800.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1801[i + 0]));
  }
  i1798.additiveMaterials = i1800
  var i1803 = i1799[2]
  var i1802 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1803.length; i += 1) {
    i1802.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1803[i + 0]));
  }
  i1798.multiplyMaterials = i1802
  var i1805 = i1799[3]
  var i1804 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1805.length; i += 1) {
    i1804.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1805[i + 0]));
  }
  i1798.screenMaterials = i1804
  i1798.requiresBlendModeMaterials = !!i1799[4]
  return i1798
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1808 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1809 = data
  i1808.pageName = i1809[0]
  request.r(i1809[1], i1809[2], 0, i1808, 'material')
  return i1808
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1812 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1813 = data
  request.r(i1813[0], i1813[1], 0, i1812, 'atlasFile')
  var i1815 = i1813[2]
  var i1814 = []
  for(var i = 0; i < i1815.length; i += 2) {
  request.r(i1815[i + 0], i1815[i + 1], 2, i1814, '')
  }
  i1812.materials = i1814
  i1812.textureLoadingMode = i1813[3]
  request.r(i1813[4], i1813[5], 0, i1812, 'onDemandTextureLoader')
  return i1812
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1816 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1817 = data
  i1816.useSafeMode = !!i1817[0]
  i1816.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1817[1], i1816.safeModeOptions)
  i1816.timeScale = i1817[2]
  i1816.unscaledTimeScale = i1817[3]
  i1816.useSmoothDeltaTime = !!i1817[4]
  i1816.maxSmoothUnscaledTime = i1817[5]
  i1816.rewindCallbackMode = i1817[6]
  i1816.showUnityEditorReport = !!i1817[7]
  i1816.logBehaviour = i1817[8]
  i1816.drawGizmos = !!i1817[9]
  i1816.defaultRecyclable = !!i1817[10]
  i1816.defaultAutoPlay = i1817[11]
  i1816.defaultUpdateType = i1817[12]
  i1816.defaultTimeScaleIndependent = !!i1817[13]
  i1816.defaultEaseType = i1817[14]
  i1816.defaultEaseOvershootOrAmplitude = i1817[15]
  i1816.defaultEasePeriod = i1817[16]
  i1816.defaultAutoKill = !!i1817[17]
  i1816.defaultLoopType = i1817[18]
  i1816.debugMode = !!i1817[19]
  i1816.debugStoreTargetId = !!i1817[20]
  i1816.showPreviewPanel = !!i1817[21]
  i1816.storeSettingsLocation = i1817[22]
  i1816.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1817[23], i1816.modules)
  i1816.createASMDEF = !!i1817[24]
  i1816.showPlayingTweens = !!i1817[25]
  i1816.showPausedTweens = !!i1817[26]
  return i1816
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1818 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1819 = data
  i1818.logBehaviour = i1819[0]
  i1818.nestedTweenFailureBehaviour = i1819[1]
  return i1818
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1820 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1821 = data
  i1820.showPanel = !!i1821[0]
  i1820.audioEnabled = !!i1821[1]
  i1820.physicsEnabled = !!i1821[2]
  i1820.physics2DEnabled = !!i1821[3]
  i1820.spriteEnabled = !!i1821[4]
  i1820.uiEnabled = !!i1821[5]
  i1820.textMeshProEnabled = !!i1821[6]
  i1820.tk2DEnabled = !!i1821[7]
  i1820.deAudioEnabled = !!i1821[8]
  i1820.deUnityExtendedEnabled = !!i1821[9]
  i1820.epoOutlineEnabled = !!i1821[10]
  return i1820
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1823 = data
  var i1825 = i1823[0]
  var i1824 = []
  for(var i = 0; i < i1825.length; i += 1) {
    i1824.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1825[i + 0]) );
  }
  i1822.files = i1824
  i1822.componentToPrefabIds = i1823[1]
  return i1822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1828 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1829 = data
  i1828.path = i1829[0]
  request.r(i1829[1], i1829[2], 0, i1828, 'unityObject')
  return i1828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1831 = data
  var i1833 = i1831[0]
  var i1832 = []
  for(var i = 0; i < i1833.length; i += 1) {
    i1832.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1833[i + 0]) );
  }
  i1830.scriptsExecutionOrder = i1832
  var i1835 = i1831[1]
  var i1834 = []
  for(var i = 0; i < i1835.length; i += 1) {
    i1834.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1835[i + 0]) );
  }
  i1830.sortingLayers = i1834
  var i1837 = i1831[2]
  var i1836 = []
  for(var i = 0; i < i1837.length; i += 1) {
    i1836.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1837[i + 0]) );
  }
  i1830.cullingLayers = i1836
  i1830.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1831[3], i1830.timeSettings)
  i1830.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1831[4], i1830.physicsSettings)
  i1830.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1831[5], i1830.physics2DSettings)
  i1830.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1831[6], i1830.qualitySettings)
  i1830.enableRealtimeShadows = !!i1831[7]
  i1830.enableAutoInstancing = !!i1831[8]
  i1830.enableStaticBatching = !!i1831[9]
  i1830.enableDynamicBatching = !!i1831[10]
  i1830.usePreservativeDynamicBatching = !!i1831[11]
  i1830.lightmapEncodingQuality = i1831[12]
  i1830.desiredColorSpace = i1831[13]
  var i1839 = i1831[14]
  var i1838 = []
  for(var i = 0; i < i1839.length; i += 1) {
    i1838.push( i1839[i + 0] );
  }
  i1830.allTags = i1838
  return i1830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1843 = data
  i1842.name = i1843[0]
  i1842.value = i1843[1]
  return i1842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1847 = data
  i1846.id = i1847[0]
  i1846.name = i1847[1]
  i1846.value = i1847[2]
  return i1846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1851 = data
  i1850.id = i1851[0]
  i1850.name = i1851[1]
  return i1850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1852 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1853 = data
  i1852.fixedDeltaTime = i1853[0]
  i1852.maximumDeltaTime = i1853[1]
  i1852.timeScale = i1853[2]
  i1852.maximumParticleTimestep = i1853[3]
  return i1852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1855 = data
  i1854.gravity = new pc.Vec3( i1855[0], i1855[1], i1855[2] )
  i1854.defaultSolverIterations = i1855[3]
  i1854.bounceThreshold = i1855[4]
  i1854.autoSyncTransforms = !!i1855[5]
  i1854.autoSimulation = !!i1855[6]
  var i1857 = i1855[7]
  var i1856 = []
  for(var i = 0; i < i1857.length; i += 1) {
    i1856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1857[i + 0]) );
  }
  i1854.collisionMatrix = i1856
  return i1854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1861 = data
  i1860.enabled = !!i1861[0]
  i1860.layerId = i1861[1]
  i1860.otherLayerId = i1861[2]
  return i1860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1863 = data
  request.r(i1863[0], i1863[1], 0, i1862, 'material')
  i1862.gravity = new pc.Vec2( i1863[2], i1863[3] )
  i1862.positionIterations = i1863[4]
  i1862.velocityIterations = i1863[5]
  i1862.velocityThreshold = i1863[6]
  i1862.maxLinearCorrection = i1863[7]
  i1862.maxAngularCorrection = i1863[8]
  i1862.maxTranslationSpeed = i1863[9]
  i1862.maxRotationSpeed = i1863[10]
  i1862.baumgarteScale = i1863[11]
  i1862.baumgarteTOIScale = i1863[12]
  i1862.timeToSleep = i1863[13]
  i1862.linearSleepTolerance = i1863[14]
  i1862.angularSleepTolerance = i1863[15]
  i1862.defaultContactOffset = i1863[16]
  i1862.autoSimulation = !!i1863[17]
  i1862.queriesHitTriggers = !!i1863[18]
  i1862.queriesStartInColliders = !!i1863[19]
  i1862.callbacksOnDisable = !!i1863[20]
  i1862.reuseCollisionCallbacks = !!i1863[21]
  i1862.autoSyncTransforms = !!i1863[22]
  var i1865 = i1863[23]
  var i1864 = []
  for(var i = 0; i < i1865.length; i += 1) {
    i1864.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1865[i + 0]) );
  }
  i1862.collisionMatrix = i1864
  return i1862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1868 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1869 = data
  i1868.enabled = !!i1869[0]
  i1868.layerId = i1869[1]
  i1868.otherLayerId = i1869[2]
  return i1868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1871 = data
  var i1873 = i1871[0]
  var i1872 = []
  for(var i = 0; i < i1873.length; i += 1) {
    i1872.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1873[i + 0]) );
  }
  i1870.qualityLevels = i1872
  var i1875 = i1871[1]
  var i1874 = []
  for(var i = 0; i < i1875.length; i += 1) {
    i1874.push( i1875[i + 0] );
  }
  i1870.names = i1874
  i1870.shadows = i1871[2]
  i1870.anisotropicFiltering = i1871[3]
  i1870.antiAliasing = i1871[4]
  i1870.lodBias = i1871[5]
  i1870.shadowCascades = i1871[6]
  i1870.shadowDistance = i1871[7]
  i1870.shadowmaskMode = i1871[8]
  i1870.shadowProjection = i1871[9]
  i1870.shadowResolution = i1871[10]
  i1870.softParticles = !!i1871[11]
  i1870.softVegetation = !!i1871[12]
  i1870.activeColorSpace = i1871[13]
  i1870.desiredColorSpace = i1871[14]
  i1870.masterTextureLimit = i1871[15]
  i1870.maxQueuedFrames = i1871[16]
  i1870.particleRaycastBudget = i1871[17]
  i1870.pixelLightCount = i1871[18]
  i1870.realtimeReflectionProbes = !!i1871[19]
  i1870.shadowCascade2Split = i1871[20]
  i1870.shadowCascade4Split = new pc.Vec3( i1871[21], i1871[22], i1871[23] )
  i1870.streamingMipmapsActive = !!i1871[24]
  i1870.vSyncCount = i1871[25]
  i1870.asyncUploadBufferSize = i1871[26]
  i1870.asyncUploadTimeSlice = i1871[27]
  i1870.billboardsFaceCameraPosition = !!i1871[28]
  i1870.shadowNearPlaneOffset = i1871[29]
  i1870.streamingMipmapsMemoryBudget = i1871[30]
  i1870.maximumLODLevel = i1871[31]
  i1870.streamingMipmapsAddAllCameras = !!i1871[32]
  i1870.streamingMipmapsMaxLevelReduction = i1871[33]
  i1870.streamingMipmapsRenderersPerFrame = i1871[34]
  i1870.resolutionScalingFixedDPIFactor = i1871[35]
  i1870.streamingMipmapsMaxFileIORequests = i1871[36]
  i1870.currentQualityLevel = i1871[37]
  return i1870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar"] = function (request, data, root) {
  var i1878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar' )
  var i1879 = data
  i1878.name = i1879[0]
  var i1881 = i1879[1]
  var i1880 = []
  for(var i = 0; i < i1881.length; i += 1) {
    i1880.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair', i1881[i + 0]) );
  }
  i1878.tos = i1880
  var i1883 = i1879[2]
  var i1882 = []
  for(var i = 0; i < i1883.length; i += 1) {
    i1882.push( i1883[i + 0] );
  }
  i1878.constant = i1882
  i1878.isValid = !!i1879[3]
  i1878.isHuman = !!i1879[4]
  i1878.hasRootMotion = !!i1879[5]
  return i1878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair"] = function (request, data, root) {
  var i1886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Mecanim.Avatar+TOSPair' )
  var i1887 = data
  i1886.hash = i1887[0]
  i1886.path = i1887[1]
  return i1886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1893 = data
  i1892.weight = i1893[0]
  i1892.vertices = i1893[1]
  i1892.normals = i1893[2]
  i1892.tangents = i1893[3]
  return i1892
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1894 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1895 = data
  request.r(i1895[0], i1895[1], 0, i1894, 'm_ObjectArgument')
  i1894.m_ObjectArgumentAssemblyTypeName = i1895[2]
  i1894.m_IntArgument = i1895[3]
  i1894.m_FloatArgument = i1895[4]
  i1894.m_StringArgument = i1895[5]
  i1894.m_BoolArgument = !!i1895[6]
  return i1894
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

Deserializers.buildID = "8e65ee5b-8514-459c-94e7-6e5b3750876c";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

