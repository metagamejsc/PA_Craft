var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1260 = root || request.c( 'UnityEngine.JointSpring' )
  var i1261 = data
  i1260.spring = i1261[0]
  i1260.damper = i1261[1]
  i1260.targetPosition = i1261[2]
  return i1260
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1262 = root || request.c( 'UnityEngine.JointMotor' )
  var i1263 = data
  i1262.m_TargetVelocity = i1263[0]
  i1262.m_Force = i1263[1]
  i1262.m_FreeSpin = i1263[2]
  return i1262
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1264 = root || request.c( 'UnityEngine.JointLimits' )
  var i1265 = data
  i1264.m_Min = i1265[0]
  i1264.m_Max = i1265[1]
  i1264.m_Bounciness = i1265[2]
  i1264.m_BounceMinVelocity = i1265[3]
  i1264.m_ContactDistance = i1265[4]
  i1264.minBounce = i1265[5]
  i1264.maxBounce = i1265[6]
  return i1264
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1266 = root || request.c( 'UnityEngine.JointDrive' )
  var i1267 = data
  i1266.m_PositionSpring = i1267[0]
  i1266.m_PositionDamper = i1267[1]
  i1266.m_MaximumForce = i1267[2]
  i1266.m_UseAcceleration = i1267[3]
  return i1266
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1268 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1269 = data
  i1268.m_Spring = i1269[0]
  i1268.m_Damper = i1269[1]
  return i1268
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1270 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1271 = data
  i1270.m_Limit = i1271[0]
  i1270.m_Bounciness = i1271[1]
  i1270.m_ContactDistance = i1271[2]
  return i1270
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1272 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1273 = data
  i1272.m_ExtremumSlip = i1273[0]
  i1272.m_ExtremumValue = i1273[1]
  i1272.m_AsymptoteSlip = i1273[2]
  i1272.m_AsymptoteValue = i1273[3]
  i1272.m_Stiffness = i1273[4]
  return i1272
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1274 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1275 = data
  i1274.m_LowerAngle = i1275[0]
  i1274.m_UpperAngle = i1275[1]
  return i1274
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1276 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1277 = data
  i1276.m_MotorSpeed = i1277[0]
  i1276.m_MaximumMotorTorque = i1277[1]
  return i1276
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1278 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1279 = data
  i1278.m_DampingRatio = i1279[0]
  i1278.m_Frequency = i1279[1]
  i1278.m_Angle = i1279[2]
  return i1278
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1280 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1281 = data
  i1280.m_LowerTranslation = i1281[0]
  i1280.m_UpperTranslation = i1281[1]
  return i1280
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1283 = data
  i1282.name = i1283[0]
  i1282.width = i1283[1]
  i1282.height = i1283[2]
  i1282.mipmapCount = i1283[3]
  i1282.anisoLevel = i1283[4]
  i1282.filterMode = i1283[5]
  i1282.hdr = !!i1283[6]
  i1282.format = i1283[7]
  i1282.wrapMode = i1283[8]
  i1282.alphaIsTransparency = !!i1283[9]
  i1282.alphaSource = i1283[10]
  i1282.graphicsFormat = i1283[11]
  i1282.sRGBTexture = !!i1283[12]
  i1282.desiredColorSpace = i1283[13]
  i1282.wrapU = i1283[14]
  i1282.wrapV = i1283[15]
  return i1282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1284 = root || new pc.UnityMaterial()
  var i1285 = data
  i1284.name = i1285[0]
  request.r(i1285[1], i1285[2], 0, i1284, 'shader')
  i1284.renderQueue = i1285[3]
  i1284.enableInstancing = !!i1285[4]
  var i1287 = i1285[5]
  var i1286 = []
  for(var i = 0; i < i1287.length; i += 1) {
    i1286.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1287[i + 0]) );
  }
  i1284.floatParameters = i1286
  var i1289 = i1285[6]
  var i1288 = []
  for(var i = 0; i < i1289.length; i += 1) {
    i1288.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1289[i + 0]) );
  }
  i1284.colorParameters = i1288
  var i1291 = i1285[7]
  var i1290 = []
  for(var i = 0; i < i1291.length; i += 1) {
    i1290.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1291[i + 0]) );
  }
  i1284.vectorParameters = i1290
  var i1293 = i1285[8]
  var i1292 = []
  for(var i = 0; i < i1293.length; i += 1) {
    i1292.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1293[i + 0]) );
  }
  i1284.textureParameters = i1292
  var i1295 = i1285[9]
  var i1294 = []
  for(var i = 0; i < i1295.length; i += 1) {
    i1294.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1295[i + 0]) );
  }
  i1284.materialFlags = i1294
  return i1284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1299 = data
  i1298.name = i1299[0]
  i1298.value = i1299[1]
  return i1298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1303 = data
  i1302.name = i1303[0]
  i1302.value = new pc.Color(i1303[1], i1303[2], i1303[3], i1303[4])
  return i1302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1307 = data
  i1306.name = i1307[0]
  i1306.value = new pc.Vec4( i1307[1], i1307[2], i1307[3], i1307[4] )
  return i1306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1311 = data
  i1310.name = i1311[0]
  request.r(i1311[1], i1311[2], 0, i1310, 'value')
  return i1310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1315 = data
  i1314.name = i1315[0]
  i1314.enabled = !!i1315[1]
  return i1314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1316 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1317 = data
  i1316.name = i1317[0]
  i1316.index = i1317[1]
  i1316.startup = !!i1317[2]
  return i1316
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1319 = data
  i1318.aspect = i1319[0]
  i1318.orthographic = !!i1319[1]
  i1318.orthographicSize = i1319[2]
  i1318.backgroundColor = new pc.Color(i1319[3], i1319[4], i1319[5], i1319[6])
  i1318.nearClipPlane = i1319[7]
  i1318.farClipPlane = i1319[8]
  i1318.fieldOfView = i1319[9]
  i1318.depth = i1319[10]
  i1318.clearFlags = i1319[11]
  i1318.cullingMask = i1319[12]
  i1318.rect = i1319[13]
  request.r(i1319[14], i1319[15], 0, i1318, 'targetTexture')
  i1318.usePhysicalProperties = !!i1319[16]
  i1318.focalLength = i1319[17]
  i1318.sensorSize = new pc.Vec2( i1319[18], i1319[19] )
  i1318.lensShift = new pc.Vec2( i1319[20], i1319[21] )
  i1318.gateFit = i1319[22]
  i1318.commandBufferCount = i1319[23]
  i1318.cameraType = i1319[24]
  i1318.enabled = !!i1319[25]
  return i1318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1321 = data
  i1320.name = i1321[0]
  i1320.tagId = i1321[1]
  i1320.enabled = !!i1321[2]
  i1320.isStatic = !!i1321[3]
  i1320.layer = i1321[4]
  return i1320
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1322 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1323 = data
  request.r(i1323[0], i1323[1], 0, i1322, 'm_FirstSelected')
  i1322.m_sendNavigationEvents = !!i1323[2]
  i1322.m_DragThreshold = i1323[3]
  return i1322
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1324 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1325 = data
  i1324.m_HorizontalAxis = i1325[0]
  i1324.m_VerticalAxis = i1325[1]
  i1324.m_SubmitButton = i1325[2]
  i1324.m_CancelButton = i1325[3]
  i1324.m_InputActionsPerSecond = i1325[4]
  i1324.m_RepeatDelay = i1325[5]
  i1324.m_ForceModuleActive = !!i1325[6]
  i1324.m_SendPointerHoverToParent = !!i1325[7]
  return i1324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1327 = data
  i1326.pivot = new pc.Vec2( i1327[0], i1327[1] )
  i1326.anchorMin = new pc.Vec2( i1327[2], i1327[3] )
  i1326.anchorMax = new pc.Vec2( i1327[4], i1327[5] )
  i1326.sizeDelta = new pc.Vec2( i1327[6], i1327[7] )
  i1326.anchoredPosition3D = new pc.Vec3( i1327[8], i1327[9], i1327[10] )
  i1326.rotation = new pc.Quat(i1327[11], i1327[12], i1327[13], i1327[14])
  i1326.scale = new pc.Vec3( i1327[15], i1327[16], i1327[17] )
  return i1326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1328 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1329 = data
  i1328.planeDistance = i1329[0]
  i1328.referencePixelsPerUnit = i1329[1]
  i1328.isFallbackOverlay = !!i1329[2]
  i1328.renderMode = i1329[3]
  i1328.renderOrder = i1329[4]
  i1328.sortingLayerName = i1329[5]
  i1328.sortingOrder = i1329[6]
  i1328.scaleFactor = i1329[7]
  request.r(i1329[8], i1329[9], 0, i1328, 'worldCamera')
  i1328.overrideSorting = !!i1329[10]
  i1328.pixelPerfect = !!i1329[11]
  i1328.targetDisplay = i1329[12]
  i1328.overridePixelPerfect = !!i1329[13]
  i1328.enabled = !!i1329[14]
  return i1328
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1330 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1331 = data
  i1330.m_UiScaleMode = i1331[0]
  i1330.m_ReferencePixelsPerUnit = i1331[1]
  i1330.m_ScaleFactor = i1331[2]
  i1330.m_ReferenceResolution = new pc.Vec2( i1331[3], i1331[4] )
  i1330.m_ScreenMatchMode = i1331[5]
  i1330.m_MatchWidthOrHeight = i1331[6]
  i1330.m_PhysicalUnit = i1331[7]
  i1330.m_FallbackScreenDPI = i1331[8]
  i1330.m_DefaultSpriteDPI = i1331[9]
  i1330.m_DynamicPixelsPerUnit = i1331[10]
  i1330.m_PresetInfoIsWorld = !!i1331[11]
  return i1330
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1332 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1333 = data
  i1332.m_IgnoreReversedGraphics = !!i1333[0]
  i1332.m_BlockingObjects = i1333[1]
  i1332.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1333[2] )
  return i1332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1334 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1335 = data
  i1334.cullTransparentMesh = !!i1335[0]
  return i1334
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i1336 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i1337 = data
  i1336.m_AspectMode = i1337[0]
  i1336.m_AspectRatio = i1337[1]
  return i1336
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i1338 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i1339 = data
  request.r(i1339[0], i1339[1], 0, i1338, 'm_Texture')
  i1338.m_UVRect = UnityEngine.Rect.MinMaxRect(i1339[2], i1339[3], i1339[4], i1339[5])
  request.r(i1339[6], i1339[7], 0, i1338, 'm_Material')
  i1338.m_Maskable = !!i1339[8]
  i1338.m_Color = new pc.Color(i1339[9], i1339[10], i1339[11], i1339[12])
  i1338.m_RaycastTarget = !!i1339[13]
  i1338.m_RaycastPadding = new pc.Vec4( i1339[14], i1339[15], i1339[16], i1339[17] )
  return i1338
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1340 = root || request.c( 'UnityEngine.UI.Image' )
  var i1341 = data
  request.r(i1341[0], i1341[1], 0, i1340, 'm_Sprite')
  i1340.m_Type = i1341[2]
  i1340.m_PreserveAspect = !!i1341[3]
  i1340.m_FillCenter = !!i1341[4]
  i1340.m_FillMethod = i1341[5]
  i1340.m_FillAmount = i1341[6]
  i1340.m_FillClockwise = !!i1341[7]
  i1340.m_FillOrigin = i1341[8]
  i1340.m_UseSpriteMesh = !!i1341[9]
  i1340.m_PixelsPerUnitMultiplier = i1341[10]
  request.r(i1341[11], i1341[12], 0, i1340, 'm_Material')
  i1340.m_Maskable = !!i1341[13]
  i1340.m_Color = new pc.Color(i1341[14], i1341[15], i1341[16], i1341[17])
  i1340.m_RaycastTarget = !!i1341[18]
  i1340.m_RaycastPadding = new pc.Vec4( i1341[19], i1341[20], i1341[21], i1341[22] )
  return i1340
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i1342 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i1343 = data
  i1342.m_hasFontAssetChanged = !!i1343[0]
  request.r(i1343[1], i1343[2], 0, i1342, 'm_baseMaterial')
  i1342.m_maskOffset = new pc.Vec4( i1343[3], i1343[4], i1343[5], i1343[6] )
  i1342.m_text = i1343[7]
  i1342.m_isRightToLeft = !!i1343[8]
  request.r(i1343[9], i1343[10], 0, i1342, 'm_fontAsset')
  request.r(i1343[11], i1343[12], 0, i1342, 'm_sharedMaterial')
  var i1345 = i1343[13]
  var i1344 = []
  for(var i = 0; i < i1345.length; i += 2) {
  request.r(i1345[i + 0], i1345[i + 1], 2, i1344, '')
  }
  i1342.m_fontSharedMaterials = i1344
  request.r(i1343[14], i1343[15], 0, i1342, 'm_fontMaterial')
  var i1347 = i1343[16]
  var i1346 = []
  for(var i = 0; i < i1347.length; i += 2) {
  request.r(i1347[i + 0], i1347[i + 1], 2, i1346, '')
  }
  i1342.m_fontMaterials = i1346
  i1342.m_fontColor32 = UnityEngine.Color32.ConstructColor(i1343[17], i1343[18], i1343[19], i1343[20])
  i1342.m_fontColor = new pc.Color(i1343[21], i1343[22], i1343[23], i1343[24])
  i1342.m_enableVertexGradient = !!i1343[25]
  i1342.m_colorMode = i1343[26]
  i1342.m_fontColorGradient = request.d('TMPro.VertexGradient', i1343[27], i1342.m_fontColorGradient)
  request.r(i1343[28], i1343[29], 0, i1342, 'm_fontColorGradientPreset')
  request.r(i1343[30], i1343[31], 0, i1342, 'm_spriteAsset')
  i1342.m_tintAllSprites = !!i1343[32]
  request.r(i1343[33], i1343[34], 0, i1342, 'm_StyleSheet')
  i1342.m_TextStyleHashCode = i1343[35]
  i1342.m_overrideHtmlColors = !!i1343[36]
  i1342.m_faceColor = UnityEngine.Color32.ConstructColor(i1343[37], i1343[38], i1343[39], i1343[40])
  i1342.m_fontSize = i1343[41]
  i1342.m_fontSizeBase = i1343[42]
  i1342.m_fontWeight = i1343[43]
  i1342.m_enableAutoSizing = !!i1343[44]
  i1342.m_fontSizeMin = i1343[45]
  i1342.m_fontSizeMax = i1343[46]
  i1342.m_fontStyle = i1343[47]
  i1342.m_HorizontalAlignment = i1343[48]
  i1342.m_VerticalAlignment = i1343[49]
  i1342.m_textAlignment = i1343[50]
  i1342.m_characterSpacing = i1343[51]
  i1342.m_characterHorizontalScale = i1343[52]
  i1342.m_wordSpacing = i1343[53]
  i1342.m_lineSpacing = i1343[54]
  i1342.m_lineSpacingMax = i1343[55]
  i1342.m_paragraphSpacing = i1343[56]
  i1342.m_charWidthMaxAdj = i1343[57]
  i1342.m_TextWrappingMode = i1343[58]
  i1342.m_wordWrappingRatios = i1343[59]
  i1342.m_overflowMode = i1343[60]
  request.r(i1343[61], i1343[62], 0, i1342, 'm_linkedTextComponent')
  request.r(i1343[63], i1343[64], 0, i1342, 'parentLinkedComponent')
  i1342.m_enableKerning = !!i1343[65]
  var i1349 = i1343[66]
  var i1348 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1349.length; i += 1) {
    i1348.add(i1349[i + 0]);
  }
  i1342.m_ActiveFontFeatures = i1348
  i1342.m_enableExtraPadding = !!i1343[67]
  i1342.checkPaddingRequired = !!i1343[68]
  i1342.m_isRichText = !!i1343[69]
  i1342.m_parseCtrlCharacters = !!i1343[70]
  i1342.m_isOrthographic = !!i1343[71]
  i1342.m_isCullingEnabled = !!i1343[72]
  i1342.m_horizontalMapping = i1343[73]
  i1342.m_verticalMapping = i1343[74]
  i1342.m_uvLineOffset = i1343[75]
  i1342.m_geometrySortingOrder = i1343[76]
  i1342.m_IsTextObjectScaleStatic = !!i1343[77]
  i1342.m_VertexBufferAutoSizeReduction = !!i1343[78]
  i1342.m_useMaxVisibleDescender = !!i1343[79]
  i1342.m_pageToDisplay = i1343[80]
  i1342.m_margin = new pc.Vec4( i1343[81], i1343[82], i1343[83], i1343[84] )
  i1342.m_isUsingLegacyAnimationComponent = !!i1343[85]
  i1342.m_isVolumetricText = !!i1343[86]
  request.r(i1343[87], i1343[88], 0, i1342, 'm_Material')
  i1342.m_EmojiFallbackSupport = !!i1343[89]
  i1342.m_Maskable = !!i1343[90]
  i1342.m_Color = new pc.Color(i1343[91], i1343[92], i1343[93], i1343[94])
  i1342.m_RaycastTarget = !!i1343[95]
  i1342.m_RaycastPadding = new pc.Vec4( i1343[96], i1343[97], i1343[98], i1343[99] )
  return i1342
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i1352 = root || request.c( 'TMPro.VertexGradient' )
  var i1353 = data
  i1352.topLeft = new pc.Color(i1353[0], i1353[1], i1353[2], i1353[3])
  i1352.topRight = new pc.Color(i1353[4], i1353[5], i1353[6], i1353[7])
  i1352.bottomLeft = new pc.Color(i1353[8], i1353[9], i1353[10], i1353[11])
  i1352.bottomRight = new pc.Color(i1353[12], i1353[13], i1353[14], i1353[15])
  return i1352
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i1356 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i1357 = data
  i1356.targetIsSelf = !!i1357[0]
  request.r(i1357[1], i1357[2], 0, i1356, 'targetGO')
  i1356.tweenTargetIsTargetGO = !!i1357[3]
  i1356.delay = i1357[4]
  i1356.duration = i1357[5]
  i1356.easeType = i1357[6]
  i1356.easeCurve = new pc.AnimationCurve( { keys_flow: i1357[7] } )
  i1356.loopType = i1357[8]
  i1356.loops = i1357[9]
  i1356.id = i1357[10]
  i1356.isRelative = !!i1357[11]
  i1356.isFrom = !!i1357[12]
  i1356.isIndependentUpdate = !!i1357[13]
  i1356.autoKill = !!i1357[14]
  i1356.autoGenerate = !!i1357[15]
  i1356.isActive = !!i1357[16]
  i1356.isValid = !!i1357[17]
  request.r(i1357[18], i1357[19], 0, i1356, 'target')
  i1356.animationType = i1357[20]
  i1356.targetType = i1357[21]
  i1356.forcedTargetType = i1357[22]
  i1356.autoPlay = !!i1357[23]
  i1356.useTargetAsV3 = !!i1357[24]
  i1356.endValueFloat = i1357[25]
  i1356.endValueV3 = new pc.Vec3( i1357[26], i1357[27], i1357[28] )
  i1356.endValueV2 = new pc.Vec2( i1357[29], i1357[30] )
  i1356.endValueColor = new pc.Color(i1357[31], i1357[32], i1357[33], i1357[34])
  i1356.endValueString = i1357[35]
  i1356.endValueRect = UnityEngine.Rect.MinMaxRect(i1357[36], i1357[37], i1357[38], i1357[39])
  request.r(i1357[40], i1357[41], 0, i1356, 'endValueTransform')
  i1356.optionalBool0 = !!i1357[42]
  i1356.optionalBool1 = !!i1357[43]
  i1356.optionalFloat0 = i1357[44]
  i1356.optionalInt0 = i1357[45]
  i1356.optionalRotationMode = i1357[46]
  i1356.optionalScrambleMode = i1357[47]
  i1356.optionalShakeRandomnessMode = i1357[48]
  i1356.optionalString = i1357[49]
  i1356.updateType = i1357[50]
  i1356.isSpeedBased = !!i1357[51]
  i1356.hasOnStart = !!i1357[52]
  i1356.hasOnPlay = !!i1357[53]
  i1356.hasOnUpdate = !!i1357[54]
  i1356.hasOnStepComplete = !!i1357[55]
  i1356.hasOnComplete = !!i1357[56]
  i1356.hasOnTweenCreated = !!i1357[57]
  i1356.hasOnRewind = !!i1357[58]
  i1356.onStart = request.d('UnityEngine.Events.UnityEvent', i1357[59], i1356.onStart)
  i1356.onPlay = request.d('UnityEngine.Events.UnityEvent', i1357[60], i1356.onPlay)
  i1356.onUpdate = request.d('UnityEngine.Events.UnityEvent', i1357[61], i1356.onUpdate)
  i1356.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i1357[62], i1356.onStepComplete)
  i1356.onComplete = request.d('UnityEngine.Events.UnityEvent', i1357[63], i1356.onComplete)
  i1356.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i1357[64], i1356.onTweenCreated)
  i1356.onRewind = request.d('UnityEngine.Events.UnityEvent', i1357[65], i1356.onRewind)
  return i1356
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i1358 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i1359 = data
  i1358.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1359[0], i1358.m_PersistentCalls)
  return i1358
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1360 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1361 = data
  var i1363 = i1361[0]
  var i1362 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1363.length; i += 1) {
    i1362.add(request.d('UnityEngine.Events.PersistentCall', i1363[i + 0]));
  }
  i1360.m_Calls = i1362
  return i1360
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1366 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1367 = data
  request.r(i1367[0], i1367[1], 0, i1366, 'm_Target')
  i1366.m_TargetAssemblyTypeName = i1367[2]
  i1366.m_MethodName = i1367[3]
  i1366.m_Mode = i1367[4]
  i1366.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1367[5], i1366.m_Arguments)
  i1366.m_CallState = i1367[6]
  return i1366
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1368 = root || request.c( 'UnityEngine.UI.Button' )
  var i1369 = data
  i1368.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1369[0], i1368.m_OnClick)
  i1368.m_Navigation = request.d('UnityEngine.UI.Navigation', i1369[1], i1368.m_Navigation)
  i1368.m_Transition = i1369[2]
  i1368.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1369[3], i1368.m_Colors)
  i1368.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1369[4], i1368.m_SpriteState)
  i1368.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1369[5], i1368.m_AnimationTriggers)
  i1368.m_Interactable = !!i1369[6]
  request.r(i1369[7], i1369[8], 0, i1368, 'm_TargetGraphic')
  return i1368
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1370 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1371 = data
  i1370.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1371[0], i1370.m_PersistentCalls)
  return i1370
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1372 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1373 = data
  i1372.m_Mode = i1373[0]
  i1372.m_WrapAround = !!i1373[1]
  request.r(i1373[2], i1373[3], 0, i1372, 'm_SelectOnUp')
  request.r(i1373[4], i1373[5], 0, i1372, 'm_SelectOnDown')
  request.r(i1373[6], i1373[7], 0, i1372, 'm_SelectOnLeft')
  request.r(i1373[8], i1373[9], 0, i1372, 'm_SelectOnRight')
  return i1372
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1374 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1375 = data
  i1374.m_NormalColor = new pc.Color(i1375[0], i1375[1], i1375[2], i1375[3])
  i1374.m_HighlightedColor = new pc.Color(i1375[4], i1375[5], i1375[6], i1375[7])
  i1374.m_PressedColor = new pc.Color(i1375[8], i1375[9], i1375[10], i1375[11])
  i1374.m_SelectedColor = new pc.Color(i1375[12], i1375[13], i1375[14], i1375[15])
  i1374.m_DisabledColor = new pc.Color(i1375[16], i1375[17], i1375[18], i1375[19])
  i1374.m_ColorMultiplier = i1375[20]
  i1374.m_FadeDuration = i1375[21]
  return i1374
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1376 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1377 = data
  request.r(i1377[0], i1377[1], 0, i1376, 'm_HighlightedSprite')
  request.r(i1377[2], i1377[3], 0, i1376, 'm_PressedSprite')
  request.r(i1377[4], i1377[5], 0, i1376, 'm_SelectedSprite')
  request.r(i1377[6], i1377[7], 0, i1376, 'm_DisabledSprite')
  return i1376
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1378 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1379 = data
  i1378.m_NormalTrigger = i1379[0]
  i1378.m_HighlightedTrigger = i1379[1]
  i1378.m_PressedTrigger = i1379[2]
  i1378.m_SelectedTrigger = i1379[3]
  i1378.m_DisabledTrigger = i1379[4]
  return i1378
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i1380 = root || request.c( 'LayoutController' )
  var i1381 = data
  request.r(i1381[0], i1381[1], 0, i1380, 'infoUI')
  request.r(i1381[2], i1381[3], 0, i1380, 'eventUI')
  request.r(i1381[4], i1381[5], 0, i1380, 'inventoryUI')
  request.r(i1381[6], i1381[7], 0, i1380, 'moveUI')
  request.r(i1381[8], i1381[9], 0, i1380, 'actionUI')
  return i1380
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1382 = root || request.c( 'LunaController' )
  var i1383 = data
  i1382.LimitTimePlay = !!i1383[0]
  i1382.TimePlay = i1383[1]
  request.r(i1383[2], i1383[3], 0, i1382, 'BGTex')
  request.r(i1383[4], i1383[5], 0, i1382, 'BGM')
  request.r(i1383[6], i1383[7], 0, i1382, 'BGImage')
  request.r(i1383[8], i1383[9], 0, i1382, 'musicSource')
  request.r(i1383[10], i1383[11], 0, i1382, 'endCard')
  return i1382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1385 = data
  request.r(i1385[0], i1385[1], 0, i1384, 'clip')
  request.r(i1385[2], i1385[3], 0, i1384, 'outputAudioMixerGroup')
  i1384.playOnAwake = !!i1385[4]
  i1384.loop = !!i1385[5]
  i1384.time = i1385[6]
  i1384.volume = i1385[7]
  i1384.pitch = i1385[8]
  i1384.enabled = !!i1385[9]
  return i1384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1387 = data
  i1386.ambientIntensity = i1387[0]
  i1386.reflectionIntensity = i1387[1]
  i1386.ambientMode = i1387[2]
  i1386.ambientLight = new pc.Color(i1387[3], i1387[4], i1387[5], i1387[6])
  i1386.ambientSkyColor = new pc.Color(i1387[7], i1387[8], i1387[9], i1387[10])
  i1386.ambientGroundColor = new pc.Color(i1387[11], i1387[12], i1387[13], i1387[14])
  i1386.ambientEquatorColor = new pc.Color(i1387[15], i1387[16], i1387[17], i1387[18])
  i1386.fogColor = new pc.Color(i1387[19], i1387[20], i1387[21], i1387[22])
  i1386.fogEndDistance = i1387[23]
  i1386.fogStartDistance = i1387[24]
  i1386.fogDensity = i1387[25]
  i1386.fog = !!i1387[26]
  request.r(i1387[27], i1387[28], 0, i1386, 'skybox')
  i1386.fogMode = i1387[29]
  var i1389 = i1387[30]
  var i1388 = []
  for(var i = 0; i < i1389.length; i += 1) {
    i1388.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1389[i + 0]) );
  }
  i1386.lightmaps = i1388
  i1386.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1387[31], i1386.lightProbes)
  i1386.lightmapsMode = i1387[32]
  i1386.mixedBakeMode = i1387[33]
  i1386.environmentLightingMode = i1387[34]
  i1386.ambientProbe = new pc.SphericalHarmonicsL2(i1387[35])
  request.r(i1387[36], i1387[37], 0, i1386, 'customReflection')
  request.r(i1387[38], i1387[39], 0, i1386, 'defaultReflection')
  i1386.defaultReflectionMode = i1387[40]
  i1386.defaultReflectionResolution = i1387[41]
  i1386.sunLightObjectId = i1387[42]
  i1386.pixelLightCount = i1387[43]
  i1386.defaultReflectionHDR = !!i1387[44]
  i1386.hasLightDataAsset = !!i1387[45]
  i1386.hasManualGenerate = !!i1387[46]
  return i1386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1393 = data
  request.r(i1393[0], i1393[1], 0, i1392, 'lightmapColor')
  request.r(i1393[2], i1393[3], 0, i1392, 'lightmapDirection')
  request.r(i1393[4], i1393[5], 0, i1392, 'shadowMask')
  return i1392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1394 = root || new UnityEngine.LightProbes()
  var i1395 = data
  return i1394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1403 = data
  var i1405 = i1403[0]
  var i1404 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1405.length; i += 1) {
    i1404.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1405[i + 0]));
  }
  i1402.ShaderCompilationErrors = i1404
  i1402.name = i1403[1]
  i1402.guid = i1403[2]
  var i1407 = i1403[3]
  var i1406 = []
  for(var i = 0; i < i1407.length; i += 1) {
    i1406.push( i1407[i + 0] );
  }
  i1402.shaderDefinedKeywords = i1406
  var i1409 = i1403[4]
  var i1408 = []
  for(var i = 0; i < i1409.length; i += 1) {
    i1408.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1409[i + 0]) );
  }
  i1402.passes = i1408
  var i1411 = i1403[5]
  var i1410 = []
  for(var i = 0; i < i1411.length; i += 1) {
    i1410.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1411[i + 0]) );
  }
  i1402.usePasses = i1410
  var i1413 = i1403[6]
  var i1412 = []
  for(var i = 0; i < i1413.length; i += 1) {
    i1412.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1413[i + 0]) );
  }
  i1402.defaultParameterValues = i1412
  request.r(i1403[7], i1403[8], 0, i1402, 'unityFallbackShader')
  i1402.readDepth = !!i1403[9]
  i1402.hasDepthOnlyPass = !!i1403[10]
  i1402.isCreatedByShaderGraph = !!i1403[11]
  i1402.disableBatching = !!i1403[12]
  i1402.compiled = !!i1403[13]
  return i1402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1417 = data
  i1416.shaderName = i1417[0]
  i1416.errorMessage = i1417[1]
  return i1416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1422 = root || new pc.UnityShaderPass()
  var i1423 = data
  i1422.id = i1423[0]
  i1422.subShaderIndex = i1423[1]
  i1422.name = i1423[2]
  i1422.passType = i1423[3]
  i1422.grabPassTextureName = i1423[4]
  i1422.usePass = !!i1423[5]
  i1422.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[6], i1422.zTest)
  i1422.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[7], i1422.zWrite)
  i1422.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[8], i1422.culling)
  i1422.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1423[9], i1422.blending)
  i1422.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1423[10], i1422.alphaBlending)
  i1422.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[11], i1422.colorWriteMask)
  i1422.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[12], i1422.offsetUnits)
  i1422.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[13], i1422.offsetFactor)
  i1422.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[14], i1422.stencilRef)
  i1422.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[15], i1422.stencilReadMask)
  i1422.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1423[16], i1422.stencilWriteMask)
  i1422.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1423[17], i1422.stencilOp)
  i1422.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1423[18], i1422.stencilOpFront)
  i1422.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1423[19], i1422.stencilOpBack)
  var i1425 = i1423[20]
  var i1424 = []
  for(var i = 0; i < i1425.length; i += 1) {
    i1424.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1425[i + 0]) );
  }
  i1422.tags = i1424
  var i1427 = i1423[21]
  var i1426 = []
  for(var i = 0; i < i1427.length; i += 1) {
    i1426.push( i1427[i + 0] );
  }
  i1422.passDefinedKeywords = i1426
  var i1429 = i1423[22]
  var i1428 = []
  for(var i = 0; i < i1429.length; i += 1) {
    i1428.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1429[i + 0]) );
  }
  i1422.passDefinedKeywordGroups = i1428
  var i1431 = i1423[23]
  var i1430 = []
  for(var i = 0; i < i1431.length; i += 1) {
    i1430.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1431[i + 0]) );
  }
  i1422.variants = i1430
  var i1433 = i1423[24]
  var i1432 = []
  for(var i = 0; i < i1433.length; i += 1) {
    i1432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1433[i + 0]) );
  }
  i1422.excludedVariants = i1432
  i1422.hasDepthReader = !!i1423[25]
  return i1422
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1434 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1435 = data
  i1434.val = i1435[0]
  i1434.name = i1435[1]
  return i1434
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1437 = data
  i1436.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1437[0], i1436.src)
  i1436.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1437[1], i1436.dst)
  i1436.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1437[2], i1436.op)
  return i1436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1439 = data
  i1438.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1439[0], i1438.pass)
  i1438.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1439[1], i1438.fail)
  i1438.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1439[2], i1438.zFail)
  i1438.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1439[3], i1438.comp)
  return i1438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1443 = data
  i1442.name = i1443[0]
  i1442.value = i1443[1]
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1446 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1447 = data
  var i1449 = i1447[0]
  var i1448 = []
  for(var i = 0; i < i1449.length; i += 1) {
    i1448.push( i1449[i + 0] );
  }
  i1446.keywords = i1448
  i1446.hasDiscard = !!i1447[1]
  return i1446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1453 = data
  i1452.passId = i1453[0]
  i1452.subShaderIndex = i1453[1]
  var i1455 = i1453[2]
  var i1454 = []
  for(var i = 0; i < i1455.length; i += 1) {
    i1454.push( i1455[i + 0] );
  }
  i1452.keywords = i1454
  i1452.vertexProgram = i1453[3]
  i1452.fragmentProgram = i1453[4]
  i1452.exportedForWebGl2 = !!i1453[5]
  i1452.readDepth = !!i1453[6]
  return i1452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1459 = data
  request.r(i1459[0], i1459[1], 0, i1458, 'shader')
  i1458.pass = i1459[2]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1463 = data
  i1462.name = i1463[0]
  i1462.type = i1463[1]
  i1462.value = new pc.Vec4( i1463[2], i1463[3], i1463[4], i1463[5] )
  i1462.textureValue = i1463[6]
  i1462.shaderPropertyFlag = i1463[7]
  return i1462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1465 = data
  i1464.name = i1465[0]
  request.r(i1465[1], i1465[2], 0, i1464, 'texture')
  i1464.aabb = i1465[3]
  i1464.vertices = i1465[4]
  i1464.triangles = i1465[5]
  i1464.textureRect = UnityEngine.Rect.MinMaxRect(i1465[6], i1465[7], i1465[8], i1465[9])
  i1464.packedRect = UnityEngine.Rect.MinMaxRect(i1465[10], i1465[11], i1465[12], i1465[13])
  i1464.border = new pc.Vec4( i1465[14], i1465[15], i1465[16], i1465[17] )
  i1464.transparency = i1465[18]
  i1464.bounds = i1465[19]
  i1464.pixelsPerUnit = i1465[20]
  i1464.textureWidth = i1465[21]
  i1464.textureHeight = i1465[22]
  i1464.nativeSize = new pc.Vec2( i1465[23], i1465[24] )
  i1464.pivot = new pc.Vec2( i1465[25], i1465[26] )
  i1464.textureRectOffset = new pc.Vec2( i1465[27], i1465[28] )
  return i1464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1467 = data
  i1466.name = i1467[0]
  return i1466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1469 = data
  i1468.name = i1469[0]
  i1468.bytes64 = i1469[1]
  i1468.data = i1469[2]
  return i1468
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1470 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1471 = data
  i1470.normalStyle = i1471[0]
  i1470.normalSpacingOffset = i1471[1]
  i1470.boldStyle = i1471[2]
  i1470.boldSpacing = i1471[3]
  i1470.italicStyle = i1471[4]
  i1470.tabSize = i1471[5]
  request.r(i1471[6], i1471[7], 0, i1470, 'atlas')
  i1470.m_SourceFontFileGUID = i1471[8]
  i1470.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1471[9], i1470.m_CreationSettings)
  request.r(i1471[10], i1471[11], 0, i1470, 'm_SourceFontFile')
  i1470.m_SourceFontFilePath = i1471[12]
  i1470.m_AtlasPopulationMode = i1471[13]
  i1470.InternalDynamicOS = !!i1471[14]
  var i1473 = i1471[15]
  var i1472 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1473.length; i += 1) {
    i1472.add(request.d('UnityEngine.TextCore.Glyph', i1473[i + 0]));
  }
  i1470.m_GlyphTable = i1472
  var i1475 = i1471[16]
  var i1474 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1475.length; i += 1) {
    i1474.add(request.d('TMPro.TMP_Character', i1475[i + 0]));
  }
  i1470.m_CharacterTable = i1474
  var i1477 = i1471[17]
  var i1476 = []
  for(var i = 0; i < i1477.length; i += 2) {
  request.r(i1477[i + 0], i1477[i + 1], 2, i1476, '')
  }
  i1470.m_AtlasTextures = i1476
  i1470.m_AtlasTextureIndex = i1471[18]
  i1470.m_IsMultiAtlasTexturesEnabled = !!i1471[19]
  i1470.m_GetFontFeatures = !!i1471[20]
  i1470.m_ClearDynamicDataOnBuild = !!i1471[21]
  i1470.m_AtlasWidth = i1471[22]
  i1470.m_AtlasHeight = i1471[23]
  i1470.m_AtlasPadding = i1471[24]
  i1470.m_AtlasRenderMode = i1471[25]
  var i1479 = i1471[26]
  var i1478 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1479.length; i += 1) {
    i1478.add(request.d('UnityEngine.TextCore.GlyphRect', i1479[i + 0]));
  }
  i1470.m_UsedGlyphRects = i1478
  var i1481 = i1471[27]
  var i1480 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1481.length; i += 1) {
    i1480.add(request.d('UnityEngine.TextCore.GlyphRect', i1481[i + 0]));
  }
  i1470.m_FreeGlyphRects = i1480
  i1470.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1471[28], i1470.m_FontFeatureTable)
  i1470.m_ShouldReimportFontFeatures = !!i1471[29]
  var i1483 = i1471[30]
  var i1482 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1483.length; i += 2) {
  request.r(i1483[i + 0], i1483[i + 1], 1, i1482, '')
  }
  i1470.m_FallbackFontAssetTable = i1482
  var i1485 = i1471[31]
  var i1484 = []
  for(var i = 0; i < i1485.length; i += 1) {
    i1484.push( request.d('TMPro.TMP_FontWeightPair', i1485[i + 0]) );
  }
  i1470.m_FontWeightTable = i1484
  var i1487 = i1471[32]
  var i1486 = []
  for(var i = 0; i < i1487.length; i += 1) {
    i1486.push( request.d('TMPro.TMP_FontWeightPair', i1487[i + 0]) );
  }
  i1470.fontWeights = i1486
  i1470.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1471[33], i1470.m_fontInfo)
  var i1489 = i1471[34]
  var i1488 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1489.length; i += 1) {
    i1488.add(request.d('TMPro.TMP_Glyph', i1489[i + 0]));
  }
  i1470.m_glyphInfoList = i1488
  i1470.m_KerningTable = request.d('TMPro.KerningTable', i1471[35], i1470.m_KerningTable)
  var i1491 = i1471[36]
  var i1490 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1491.length; i += 2) {
  request.r(i1491[i + 0], i1491[i + 1], 1, i1490, '')
  }
  i1470.fallbackFontAssets = i1490
  i1470.m_Version = i1471[37]
  i1470.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1471[38], i1470.m_FaceInfo)
  request.r(i1471[39], i1471[40], 0, i1470, 'm_Material')
  return i1470
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1492 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1493 = data
  i1492.sourceFontFileName = i1493[0]
  i1492.sourceFontFileGUID = i1493[1]
  i1492.faceIndex = i1493[2]
  i1492.pointSizeSamplingMode = i1493[3]
  i1492.pointSize = i1493[4]
  i1492.padding = i1493[5]
  i1492.paddingMode = i1493[6]
  i1492.packingMode = i1493[7]
  i1492.atlasWidth = i1493[8]
  i1492.atlasHeight = i1493[9]
  i1492.characterSetSelectionMode = i1493[10]
  i1492.characterSequence = i1493[11]
  i1492.referencedFontAssetGUID = i1493[12]
  i1492.referencedTextAssetGUID = i1493[13]
  i1492.fontStyle = i1493[14]
  i1492.fontStyleModifier = i1493[15]
  i1492.renderMode = i1493[16]
  i1492.includeFontFeatures = !!i1493[17]
  return i1492
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1496 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1497 = data
  i1496.m_Index = i1497[0]
  i1496.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1497[1], i1496.m_Metrics)
  i1496.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1497[2], i1496.m_GlyphRect)
  i1496.m_Scale = i1497[3]
  i1496.m_AtlasIndex = i1497[4]
  i1496.m_ClassDefinitionType = i1497[5]
  return i1496
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1498 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1499 = data
  i1498.m_Width = i1499[0]
  i1498.m_Height = i1499[1]
  i1498.m_HorizontalBearingX = i1499[2]
  i1498.m_HorizontalBearingY = i1499[3]
  i1498.m_HorizontalAdvance = i1499[4]
  return i1498
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1500 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1501 = data
  i1500.m_X = i1501[0]
  i1500.m_Y = i1501[1]
  i1500.m_Width = i1501[2]
  i1500.m_Height = i1501[3]
  return i1500
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1504 = root || request.c( 'TMPro.TMP_Character' )
  var i1505 = data
  i1504.m_ElementType = i1505[0]
  i1504.m_Unicode = i1505[1]
  i1504.m_GlyphIndex = i1505[2]
  i1504.m_Scale = i1505[3]
  return i1504
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1510 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1511 = data
  var i1513 = i1511[0]
  var i1512 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1513.length; i += 1) {
    i1512.add(request.d('TMPro.MultipleSubstitutionRecord', i1513[i + 0]));
  }
  i1510.m_MultipleSubstitutionRecords = i1512
  var i1515 = i1511[1]
  var i1514 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1515.length; i += 1) {
    i1514.add(request.d('TMPro.LigatureSubstitutionRecord', i1515[i + 0]));
  }
  i1510.m_LigatureSubstitutionRecords = i1514
  var i1517 = i1511[2]
  var i1516 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1517.length; i += 1) {
    i1516.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1517[i + 0]));
  }
  i1510.m_GlyphPairAdjustmentRecords = i1516
  var i1519 = i1511[3]
  var i1518 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1519.length; i += 1) {
    i1518.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1519[i + 0]));
  }
  i1510.m_MarkToBaseAdjustmentRecords = i1518
  var i1521 = i1511[4]
  var i1520 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1521.length; i += 1) {
    i1520.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1521[i + 0]));
  }
  i1510.m_MarkToMarkAdjustmentRecords = i1520
  return i1510
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1524 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1525 = data
  i1524.m_TargetGlyphID = i1525[0]
  i1524.m_SubstituteGlyphIDs = i1525[1]
  return i1524
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1528 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1529 = data
  i1528.m_ComponentGlyphIDs = i1529[0]
  i1528.m_LigatureGlyphID = i1529[1]
  return i1528
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1532 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1533 = data
  i1532.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1533[0], i1532.m_FirstAdjustmentRecord)
  i1532.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1533[1], i1532.m_SecondAdjustmentRecord)
  i1532.m_FeatureLookupFlags = i1533[2]
  return i1532
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1536 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1537 = data
  i1536.m_BaseGlyphID = i1537[0]
  i1536.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1537[1], i1536.m_BaseGlyphAnchorPoint)
  i1536.m_MarkGlyphID = i1537[2]
  i1536.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1537[3], i1536.m_MarkPositionAdjustment)
  return i1536
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1540 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1541 = data
  i1540.m_BaseMarkGlyphID = i1541[0]
  i1540.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1541[1], i1540.m_BaseMarkGlyphAnchorPoint)
  i1540.m_CombiningMarkGlyphID = i1541[2]
  i1540.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1541[3], i1540.m_CombiningMarkPositionAdjustment)
  return i1540
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1546 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1547 = data
  request.r(i1547[0], i1547[1], 0, i1546, 'regularTypeface')
  request.r(i1547[2], i1547[3], 0, i1546, 'italicTypeface')
  return i1546
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1548 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1549 = data
  i1548.Name = i1549[0]
  i1548.PointSize = i1549[1]
  i1548.Scale = i1549[2]
  i1548.CharacterCount = i1549[3]
  i1548.LineHeight = i1549[4]
  i1548.Baseline = i1549[5]
  i1548.Ascender = i1549[6]
  i1548.CapHeight = i1549[7]
  i1548.Descender = i1549[8]
  i1548.CenterLine = i1549[9]
  i1548.SuperscriptOffset = i1549[10]
  i1548.SubscriptOffset = i1549[11]
  i1548.SubSize = i1549[12]
  i1548.Underline = i1549[13]
  i1548.UnderlineThickness = i1549[14]
  i1548.strikethrough = i1549[15]
  i1548.strikethroughThickness = i1549[16]
  i1548.TabWidth = i1549[17]
  i1548.Padding = i1549[18]
  i1548.AtlasWidth = i1549[19]
  i1548.AtlasHeight = i1549[20]
  return i1548
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1552 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1553 = data
  i1552.id = i1553[0]
  i1552.x = i1553[1]
  i1552.y = i1553[2]
  i1552.width = i1553[3]
  i1552.height = i1553[4]
  i1552.xOffset = i1553[5]
  i1552.yOffset = i1553[6]
  i1552.xAdvance = i1553[7]
  i1552.scale = i1553[8]
  return i1552
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1554 = root || request.c( 'TMPro.KerningTable' )
  var i1555 = data
  var i1557 = i1555[0]
  var i1556 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1557.length; i += 1) {
    i1556.add(request.d('TMPro.KerningPair', i1557[i + 0]));
  }
  i1554.kerningPairs = i1556
  return i1554
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1560 = root || request.c( 'TMPro.KerningPair' )
  var i1561 = data
  i1560.xOffset = i1561[0]
  i1560.m_FirstGlyph = i1561[1]
  i1560.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1561[2], i1560.m_FirstGlyphAdjustments)
  i1560.m_SecondGlyph = i1561[3]
  i1560.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1561[4], i1560.m_SecondGlyphAdjustments)
  i1560.m_IgnoreSpacingAdjustments = !!i1561[5]
  return i1560
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1562 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1563 = data
  i1562.m_FaceIndex = i1563[0]
  i1562.m_FamilyName = i1563[1]
  i1562.m_StyleName = i1563[2]
  i1562.m_PointSize = i1563[3]
  i1562.m_Scale = i1563[4]
  i1562.m_UnitsPerEM = i1563[5]
  i1562.m_LineHeight = i1563[6]
  i1562.m_AscentLine = i1563[7]
  i1562.m_CapLine = i1563[8]
  i1562.m_MeanLine = i1563[9]
  i1562.m_Baseline = i1563[10]
  i1562.m_DescentLine = i1563[11]
  i1562.m_SuperscriptOffset = i1563[12]
  i1562.m_SuperscriptSize = i1563[13]
  i1562.m_SubscriptOffset = i1563[14]
  i1562.m_SubscriptSize = i1563[15]
  i1562.m_UnderlineOffset = i1563[16]
  i1562.m_UnderlineThickness = i1563[17]
  i1562.m_StrikethroughOffset = i1563[18]
  i1562.m_StrikethroughThickness = i1563[19]
  i1562.m_TabWidth = i1563[20]
  return i1562
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1564 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1565 = data
  i1564.useSafeMode = !!i1565[0]
  i1564.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1565[1], i1564.safeModeOptions)
  i1564.timeScale = i1565[2]
  i1564.unscaledTimeScale = i1565[3]
  i1564.useSmoothDeltaTime = !!i1565[4]
  i1564.maxSmoothUnscaledTime = i1565[5]
  i1564.rewindCallbackMode = i1565[6]
  i1564.showUnityEditorReport = !!i1565[7]
  i1564.logBehaviour = i1565[8]
  i1564.drawGizmos = !!i1565[9]
  i1564.defaultRecyclable = !!i1565[10]
  i1564.defaultAutoPlay = i1565[11]
  i1564.defaultUpdateType = i1565[12]
  i1564.defaultTimeScaleIndependent = !!i1565[13]
  i1564.defaultEaseType = i1565[14]
  i1564.defaultEaseOvershootOrAmplitude = i1565[15]
  i1564.defaultEasePeriod = i1565[16]
  i1564.defaultAutoKill = !!i1565[17]
  i1564.defaultLoopType = i1565[18]
  i1564.debugMode = !!i1565[19]
  i1564.debugStoreTargetId = !!i1565[20]
  i1564.showPreviewPanel = !!i1565[21]
  i1564.storeSettingsLocation = i1565[22]
  i1564.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1565[23], i1564.modules)
  i1564.createASMDEF = !!i1565[24]
  i1564.showPlayingTweens = !!i1565[25]
  i1564.showPausedTweens = !!i1565[26]
  return i1564
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1566 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1567 = data
  i1566.logBehaviour = i1567[0]
  i1566.nestedTweenFailureBehaviour = i1567[1]
  return i1566
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1568 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1569 = data
  i1568.showPanel = !!i1569[0]
  i1568.audioEnabled = !!i1569[1]
  i1568.physicsEnabled = !!i1569[2]
  i1568.physics2DEnabled = !!i1569[3]
  i1568.spriteEnabled = !!i1569[4]
  i1568.uiEnabled = !!i1569[5]
  i1568.textMeshProEnabled = !!i1569[6]
  i1568.tk2DEnabled = !!i1569[7]
  i1568.deAudioEnabled = !!i1569[8]
  i1568.deUnityExtendedEnabled = !!i1569[9]
  i1568.epoOutlineEnabled = !!i1569[10]
  return i1568
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1570 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1571 = data
  request.r(i1571[0], i1571[1], 0, i1570, 'spriteSheet')
  var i1573 = i1571[2]
  var i1572 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.add(request.d('TMPro.TMP_Sprite', i1573[i + 0]));
  }
  i1570.spriteInfoList = i1572
  var i1575 = i1571[3]
  var i1574 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1575.length; i += 2) {
  request.r(i1575[i + 0], i1575[i + 1], 1, i1574, '')
  }
  i1570.fallbackSpriteAssets = i1574
  var i1577 = i1571[4]
  var i1576 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1577.length; i += 1) {
    i1576.add(request.d('TMPro.TMP_SpriteCharacter', i1577[i + 0]));
  }
  i1570.m_SpriteCharacterTable = i1576
  var i1579 = i1571[5]
  var i1578 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1579.length; i += 1) {
    i1578.add(request.d('TMPro.TMP_SpriteGlyph', i1579[i + 0]));
  }
  i1570.m_GlyphTable = i1578
  i1570.m_Version = i1571[6]
  i1570.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1571[7], i1570.m_FaceInfo)
  request.r(i1571[8], i1571[9], 0, i1570, 'm_Material')
  return i1570
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1582 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1583 = data
  i1582.name = i1583[0]
  i1582.hashCode = i1583[1]
  i1582.unicode = i1583[2]
  i1582.pivot = new pc.Vec2( i1583[3], i1583[4] )
  request.r(i1583[5], i1583[6], 0, i1582, 'sprite')
  i1582.id = i1583[7]
  i1582.x = i1583[8]
  i1582.y = i1583[9]
  i1582.width = i1583[10]
  i1582.height = i1583[11]
  i1582.xOffset = i1583[12]
  i1582.yOffset = i1583[13]
  i1582.xAdvance = i1583[14]
  i1582.scale = i1583[15]
  return i1582
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1588 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1589 = data
  i1588.m_Name = i1589[0]
  i1588.m_ElementType = i1589[1]
  i1588.m_Unicode = i1589[2]
  i1588.m_GlyphIndex = i1589[3]
  i1588.m_Scale = i1589[4]
  return i1588
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1592 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1593 = data
  request.r(i1593[0], i1593[1], 0, i1592, 'sprite')
  i1592.m_Index = i1593[2]
  i1592.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1593[3], i1592.m_Metrics)
  i1592.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1593[4], i1592.m_GlyphRect)
  i1592.m_Scale = i1593[5]
  i1592.m_AtlasIndex = i1593[6]
  i1592.m_ClassDefinitionType = i1593[7]
  return i1592
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1594 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1595 = data
  var i1597 = i1595[0]
  var i1596 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.add(request.d('TMPro.TMP_Style', i1597[i + 0]));
  }
  i1594.m_StyleList = i1596
  return i1594
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1600 = root || request.c( 'TMPro.TMP_Style' )
  var i1601 = data
  i1600.m_Name = i1601[0]
  i1600.m_HashCode = i1601[1]
  i1600.m_OpeningDefinition = i1601[2]
  i1600.m_ClosingDefinition = i1601[3]
  i1600.m_OpeningTagArray = i1601[4]
  i1600.m_ClosingTagArray = i1601[5]
  return i1600
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1602 = root || request.c( 'TMPro.TMP_Settings' )
  var i1603 = data
  i1602.assetVersion = i1603[0]
  i1602.m_TextWrappingMode = i1603[1]
  i1602.m_enableKerning = !!i1603[2]
  var i1605 = i1603[3]
  var i1604 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.add(i1605[i + 0]);
  }
  i1602.m_ActiveFontFeatures = i1604
  i1602.m_enableExtraPadding = !!i1603[4]
  i1602.m_enableTintAllSprites = !!i1603[5]
  i1602.m_enableParseEscapeCharacters = !!i1603[6]
  i1602.m_EnableRaycastTarget = !!i1603[7]
  i1602.m_GetFontFeaturesAtRuntime = !!i1603[8]
  i1602.m_missingGlyphCharacter = i1603[9]
  i1602.m_ClearDynamicDataOnBuild = !!i1603[10]
  i1602.m_warningsDisabled = !!i1603[11]
  request.r(i1603[12], i1603[13], 0, i1602, 'm_defaultFontAsset')
  i1602.m_defaultFontAssetPath = i1603[14]
  i1602.m_defaultFontSize = i1603[15]
  i1602.m_defaultAutoSizeMinRatio = i1603[16]
  i1602.m_defaultAutoSizeMaxRatio = i1603[17]
  i1602.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1603[18], i1603[19] )
  i1602.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1603[20], i1603[21] )
  i1602.m_autoSizeTextContainer = !!i1603[22]
  i1602.m_IsTextObjectScaleStatic = !!i1603[23]
  var i1607 = i1603[24]
  var i1606 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1607.length; i += 2) {
  request.r(i1607[i + 0], i1607[i + 1], 1, i1606, '')
  }
  i1602.m_fallbackFontAssets = i1606
  i1602.m_matchMaterialPreset = !!i1603[25]
  i1602.m_HideSubTextObjects = !!i1603[26]
  request.r(i1603[27], i1603[28], 0, i1602, 'm_defaultSpriteAsset')
  i1602.m_defaultSpriteAssetPath = i1603[29]
  i1602.m_enableEmojiSupport = !!i1603[30]
  i1602.m_MissingCharacterSpriteUnicode = i1603[31]
  var i1609 = i1603[32]
  var i1608 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1609.length; i += 2) {
  request.r(i1609[i + 0], i1609[i + 1], 1, i1608, '')
  }
  i1602.m_EmojiFallbackTextAssets = i1608
  i1602.m_defaultColorGradientPresetsPath = i1603[33]
  request.r(i1603[34], i1603[35], 0, i1602, 'm_defaultStyleSheet')
  i1602.m_StyleSheetsResourcePath = i1603[36]
  request.r(i1603[37], i1603[38], 0, i1602, 'm_leadingCharacters')
  request.r(i1603[39], i1603[40], 0, i1602, 'm_followingCharacters')
  i1602.m_UseModernHangulLineBreakingRules = !!i1603[41]
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1613 = data
  var i1615 = i1613[0]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1615[i + 0]) );
  }
  i1612.files = i1614
  i1612.componentToPrefabIds = i1613[1]
  return i1612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1619 = data
  i1618.path = i1619[0]
  request.r(i1619[1], i1619[2], 0, i1618, 'unityObject')
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1621 = data
  var i1623 = i1621[0]
  var i1622 = []
  for(var i = 0; i < i1623.length; i += 1) {
    i1622.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1623[i + 0]) );
  }
  i1620.scriptsExecutionOrder = i1622
  var i1625 = i1621[1]
  var i1624 = []
  for(var i = 0; i < i1625.length; i += 1) {
    i1624.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1625[i + 0]) );
  }
  i1620.sortingLayers = i1624
  var i1627 = i1621[2]
  var i1626 = []
  for(var i = 0; i < i1627.length; i += 1) {
    i1626.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1627[i + 0]) );
  }
  i1620.cullingLayers = i1626
  i1620.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1621[3], i1620.timeSettings)
  i1620.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1621[4], i1620.physicsSettings)
  i1620.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1621[5], i1620.physics2DSettings)
  i1620.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1621[6], i1620.qualitySettings)
  i1620.enableRealtimeShadows = !!i1621[7]
  i1620.enableAutoInstancing = !!i1621[8]
  i1620.enableStaticBatching = !!i1621[9]
  i1620.enableDynamicBatching = !!i1621[10]
  i1620.usePreservativeDynamicBatching = !!i1621[11]
  i1620.lightmapEncodingQuality = i1621[12]
  i1620.desiredColorSpace = i1621[13]
  var i1629 = i1621[14]
  var i1628 = []
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.push( i1629[i + 0] );
  }
  i1620.allTags = i1628
  return i1620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1633 = data
  i1632.name = i1633[0]
  i1632.value = i1633[1]
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1637 = data
  i1636.id = i1637[0]
  i1636.name = i1637[1]
  i1636.value = i1637[2]
  return i1636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1641 = data
  i1640.id = i1641[0]
  i1640.name = i1641[1]
  return i1640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1643 = data
  i1642.fixedDeltaTime = i1643[0]
  i1642.maximumDeltaTime = i1643[1]
  i1642.timeScale = i1643[2]
  i1642.maximumParticleTimestep = i1643[3]
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1645 = data
  i1644.gravity = new pc.Vec3( i1645[0], i1645[1], i1645[2] )
  i1644.defaultSolverIterations = i1645[3]
  i1644.bounceThreshold = i1645[4]
  i1644.autoSyncTransforms = !!i1645[5]
  i1644.autoSimulation = !!i1645[6]
  var i1647 = i1645[7]
  var i1646 = []
  for(var i = 0; i < i1647.length; i += 1) {
    i1646.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1647[i + 0]) );
  }
  i1644.collisionMatrix = i1646
  return i1644
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1650 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1651 = data
  i1650.enabled = !!i1651[0]
  i1650.layerId = i1651[1]
  i1650.otherLayerId = i1651[2]
  return i1650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1652 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1653 = data
  request.r(i1653[0], i1653[1], 0, i1652, 'material')
  i1652.gravity = new pc.Vec2( i1653[2], i1653[3] )
  i1652.positionIterations = i1653[4]
  i1652.velocityIterations = i1653[5]
  i1652.velocityThreshold = i1653[6]
  i1652.maxLinearCorrection = i1653[7]
  i1652.maxAngularCorrection = i1653[8]
  i1652.maxTranslationSpeed = i1653[9]
  i1652.maxRotationSpeed = i1653[10]
  i1652.baumgarteScale = i1653[11]
  i1652.baumgarteTOIScale = i1653[12]
  i1652.timeToSleep = i1653[13]
  i1652.linearSleepTolerance = i1653[14]
  i1652.angularSleepTolerance = i1653[15]
  i1652.defaultContactOffset = i1653[16]
  i1652.autoSimulation = !!i1653[17]
  i1652.queriesHitTriggers = !!i1653[18]
  i1652.queriesStartInColliders = !!i1653[19]
  i1652.callbacksOnDisable = !!i1653[20]
  i1652.reuseCollisionCallbacks = !!i1653[21]
  i1652.autoSyncTransforms = !!i1653[22]
  var i1655 = i1653[23]
  var i1654 = []
  for(var i = 0; i < i1655.length; i += 1) {
    i1654.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1655[i + 0]) );
  }
  i1652.collisionMatrix = i1654
  return i1652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1659 = data
  i1658.enabled = !!i1659[0]
  i1658.layerId = i1659[1]
  i1658.otherLayerId = i1659[2]
  return i1658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1661 = data
  var i1663 = i1661[0]
  var i1662 = []
  for(var i = 0; i < i1663.length; i += 1) {
    i1662.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1663[i + 0]) );
  }
  i1660.qualityLevels = i1662
  var i1665 = i1661[1]
  var i1664 = []
  for(var i = 0; i < i1665.length; i += 1) {
    i1664.push( i1665[i + 0] );
  }
  i1660.names = i1664
  i1660.shadows = i1661[2]
  i1660.anisotropicFiltering = i1661[3]
  i1660.antiAliasing = i1661[4]
  i1660.lodBias = i1661[5]
  i1660.shadowCascades = i1661[6]
  i1660.shadowDistance = i1661[7]
  i1660.shadowmaskMode = i1661[8]
  i1660.shadowProjection = i1661[9]
  i1660.shadowResolution = i1661[10]
  i1660.softParticles = !!i1661[11]
  i1660.softVegetation = !!i1661[12]
  i1660.activeColorSpace = i1661[13]
  i1660.desiredColorSpace = i1661[14]
  i1660.masterTextureLimit = i1661[15]
  i1660.maxQueuedFrames = i1661[16]
  i1660.particleRaycastBudget = i1661[17]
  i1660.pixelLightCount = i1661[18]
  i1660.realtimeReflectionProbes = !!i1661[19]
  i1660.shadowCascade2Split = i1661[20]
  i1660.shadowCascade4Split = new pc.Vec3( i1661[21], i1661[22], i1661[23] )
  i1660.streamingMipmapsActive = !!i1661[24]
  i1660.vSyncCount = i1661[25]
  i1660.asyncUploadBufferSize = i1661[26]
  i1660.asyncUploadTimeSlice = i1661[27]
  i1660.billboardsFaceCameraPosition = !!i1661[28]
  i1660.shadowNearPlaneOffset = i1661[29]
  i1660.streamingMipmapsMemoryBudget = i1661[30]
  i1660.maximumLODLevel = i1661[31]
  i1660.streamingMipmapsAddAllCameras = !!i1661[32]
  i1660.streamingMipmapsMaxLevelReduction = i1661[33]
  i1660.streamingMipmapsRenderersPerFrame = i1661[34]
  i1660.resolutionScalingFixedDPIFactor = i1661[35]
  i1660.streamingMipmapsMaxFileIORequests = i1661[36]
  i1660.currentQualityLevel = i1661[37]
  return i1660
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1668 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1669 = data
  request.r(i1669[0], i1669[1], 0, i1668, 'm_ObjectArgument')
  i1668.m_ObjectArgumentAssemblyTypeName = i1669[2]
  i1668.m_IntArgument = i1669[3]
  i1668.m_FloatArgument = i1669[4]
  i1668.m_StringArgument = i1669[5]
  i1668.m_BoolArgument = !!i1669[6]
  return i1668
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1670 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1671 = data
  i1670.m_GlyphIndex = i1671[0]
  i1670.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1671[1], i1670.m_GlyphValueRecord)
  return i1670
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1672 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1673 = data
  i1672.m_XCoordinate = i1673[0]
  i1672.m_YCoordinate = i1673[1]
  return i1672
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1674 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1675 = data
  i1674.m_XPositionAdjustment = i1675[0]
  i1674.m_YPositionAdjustment = i1675[1]
  return i1674
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1676 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1677 = data
  i1676.xPlacement = i1677[0]
  i1676.yPlacement = i1677[1]
  i1676.xAdvance = i1677[2]
  i1676.yAdvance = i1677[3]
  return i1676
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1678 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1679 = data
  i1678.m_XPlacement = i1679[0]
  i1678.m_YPlacement = i1679[1]
  i1678.m_XAdvance = i1679[2]
  i1678.m_YAdvance = i1679[3]
  return i1678
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"31":[32],"33":[32],"34":[32],"35":[32],"36":[32],"37":[32],"38":[39],"40":[2],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[2],"63":[64],"65":[66],"67":[66],"8":[7],"68":[69],"70":[2],"71":[72],"73":[7],"74":[11,7],"75":[64],"76":[11,7],"77":[7],"78":[7],"79":[64,7],"16":[7,11],"80":[81],"82":[81],"83":[81],"84":[7],"85":[7],"10":[8],"14":[11,7],"12":[7],"9":[8],"86":[7],"87":[7],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"13":[11,7],"95":[7],"96":[7],"97":[7],"98":[7],"99":[11,7],"100":[7],"101":[5],"102":[5],"6":[5],"103":[5],"104":[2],"105":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","UnityEngine.UI.Image","UnityEngine.Sprite","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","TMPro.TMP_Settings","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CBBW3_V08";

Deserializers.lunaInitializationTime = "09/08/2026 08:14:37";

Deserializers.lunaDaysRunning = "0.8";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CBBW3_V08_DungNV_TamNTM";

Deserializers.lunaAppID = "40867";

Deserializers.projectId = "2b82e4933c12b6f4d95796089824ba1b";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1781";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4122";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.CBBW3_V08";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "e357643d-94fe-4ccc-a6b9-4c1395dd7f6e";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

