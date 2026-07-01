var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2022 = root || request.c( 'UnityEngine.JointSpring' )
  var i2023 = data
  i2022.spring = i2023[0]
  i2022.damper = i2023[1]
  i2022.targetPosition = i2023[2]
  return i2022
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2024 = root || request.c( 'UnityEngine.JointMotor' )
  var i2025 = data
  i2024.m_TargetVelocity = i2025[0]
  i2024.m_Force = i2025[1]
  i2024.m_FreeSpin = i2025[2]
  return i2024
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2026 = root || request.c( 'UnityEngine.JointLimits' )
  var i2027 = data
  i2026.m_Min = i2027[0]
  i2026.m_Max = i2027[1]
  i2026.m_Bounciness = i2027[2]
  i2026.m_BounceMinVelocity = i2027[3]
  i2026.m_ContactDistance = i2027[4]
  i2026.minBounce = i2027[5]
  i2026.maxBounce = i2027[6]
  return i2026
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2028 = root || request.c( 'UnityEngine.JointDrive' )
  var i2029 = data
  i2028.m_PositionSpring = i2029[0]
  i2028.m_PositionDamper = i2029[1]
  i2028.m_MaximumForce = i2029[2]
  i2028.m_UseAcceleration = i2029[3]
  return i2028
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2030 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2031 = data
  i2030.m_Spring = i2031[0]
  i2030.m_Damper = i2031[1]
  return i2030
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2032 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2033 = data
  i2032.m_Limit = i2033[0]
  i2032.m_Bounciness = i2033[1]
  i2032.m_ContactDistance = i2033[2]
  return i2032
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2034 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2035 = data
  i2034.m_ExtremumSlip = i2035[0]
  i2034.m_ExtremumValue = i2035[1]
  i2034.m_AsymptoteSlip = i2035[2]
  i2034.m_AsymptoteValue = i2035[3]
  i2034.m_Stiffness = i2035[4]
  return i2034
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2036 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2037 = data
  i2036.m_LowerAngle = i2037[0]
  i2036.m_UpperAngle = i2037[1]
  return i2036
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2038 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2039 = data
  i2038.m_MotorSpeed = i2039[0]
  i2038.m_MaximumMotorTorque = i2039[1]
  return i2038
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2040 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2041 = data
  i2040.m_DampingRatio = i2041[0]
  i2040.m_Frequency = i2041[1]
  i2040.m_Angle = i2041[2]
  return i2040
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2042 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2043 = data
  i2042.m_LowerTranslation = i2043[0]
  i2042.m_UpperTranslation = i2043[1]
  return i2042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2044 = root || new pc.UnityMaterial()
  var i2045 = data
  i2044.name = i2045[0]
  request.r(i2045[1], i2045[2], 0, i2044, 'shader')
  i2044.renderQueue = i2045[3]
  i2044.enableInstancing = !!i2045[4]
  var i2047 = i2045[5]
  var i2046 = []
  for(var i = 0; i < i2047.length; i += 1) {
    i2046.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2047[i + 0]) );
  }
  i2044.floatParameters = i2046
  var i2049 = i2045[6]
  var i2048 = []
  for(var i = 0; i < i2049.length; i += 1) {
    i2048.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2049[i + 0]) );
  }
  i2044.colorParameters = i2048
  var i2051 = i2045[7]
  var i2050 = []
  for(var i = 0; i < i2051.length; i += 1) {
    i2050.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2051[i + 0]) );
  }
  i2044.vectorParameters = i2050
  var i2053 = i2045[8]
  var i2052 = []
  for(var i = 0; i < i2053.length; i += 1) {
    i2052.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2053[i + 0]) );
  }
  i2044.textureParameters = i2052
  var i2055 = i2045[9]
  var i2054 = []
  for(var i = 0; i < i2055.length; i += 1) {
    i2054.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2055[i + 0]) );
  }
  i2044.materialFlags = i2054
  return i2044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2059 = data
  i2058.name = i2059[0]
  i2058.value = i2059[1]
  return i2058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2063 = data
  i2062.name = i2063[0]
  i2062.value = new pc.Color(i2063[1], i2063[2], i2063[3], i2063[4])
  return i2062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2067 = data
  i2066.name = i2067[0]
  i2066.value = new pc.Vec4( i2067[1], i2067[2], i2067[3], i2067[4] )
  return i2066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2071 = data
  i2070.name = i2071[0]
  request.r(i2071[1], i2071[2], 0, i2070, 'value')
  return i2070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2074 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2075 = data
  i2074.name = i2075[0]
  i2074.enabled = !!i2075[1]
  return i2074
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2077 = data
  i2076.name = i2077[0]
  i2076.width = i2077[1]
  i2076.height = i2077[2]
  i2076.mipmapCount = i2077[3]
  i2076.anisoLevel = i2077[4]
  i2076.filterMode = i2077[5]
  i2076.hdr = !!i2077[6]
  i2076.format = i2077[7]
  i2076.wrapMode = i2077[8]
  i2076.alphaIsTransparency = !!i2077[9]
  i2076.alphaSource = i2077[10]
  i2076.graphicsFormat = i2077[11]
  i2076.sRGBTexture = !!i2077[12]
  i2076.desiredColorSpace = i2077[13]
  i2076.wrapU = i2077[14]
  i2076.wrapV = i2077[15]
  return i2076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i2078 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i2079 = data
  i2078.name = i2079[0]
  i2078.halfPrecision = !!i2079[1]
  i2078.useSimplification = !!i2079[2]
  i2078.useUInt32IndexFormat = !!i2079[3]
  i2078.vertexCount = i2079[4]
  i2078.aabb = i2079[5]
  var i2081 = i2079[6]
  var i2080 = []
  for(var i = 0; i < i2081.length; i += 1) {
    i2080.push( !!i2081[i + 0] );
  }
  i2078.streams = i2080
  i2078.vertices = i2079[7]
  var i2083 = i2079[8]
  var i2082 = []
  for(var i = 0; i < i2083.length; i += 1) {
    i2082.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i2083[i + 0]) );
  }
  i2078.subMeshes = i2082
  var i2085 = i2079[9]
  var i2084 = []
  for(var i = 0; i < i2085.length; i += 16) {
    i2084.push( new pc.Mat4().setData(i2085[i + 0], i2085[i + 1], i2085[i + 2], i2085[i + 3],  i2085[i + 4], i2085[i + 5], i2085[i + 6], i2085[i + 7],  i2085[i + 8], i2085[i + 9], i2085[i + 10], i2085[i + 11],  i2085[i + 12], i2085[i + 13], i2085[i + 14], i2085[i + 15]) );
  }
  i2078.bindposes = i2084
  var i2087 = i2079[10]
  var i2086 = []
  for(var i = 0; i < i2087.length; i += 1) {
    i2086.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i2087[i + 0]) );
  }
  i2078.blendShapes = i2086
  return i2078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i2092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i2093 = data
  i2092.triangles = i2093[0]
  return i2092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i2098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i2099 = data
  i2098.name = i2099[0]
  var i2101 = i2099[1]
  var i2100 = []
  for(var i = 0; i < i2101.length; i += 1) {
    i2100.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i2101[i + 0]) );
  }
  i2098.frames = i2100
  return i2098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i2102 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i2103 = data
  i2102.name = i2103[0]
  i2102.atlasId = i2103[1]
  i2102.mipmapCount = i2103[2]
  i2102.hdr = !!i2103[3]
  i2102.size = i2103[4]
  i2102.anisoLevel = i2103[5]
  i2102.filterMode = i2103[6]
  var i2105 = i2103[7]
  var i2104 = []
  for(var i = 0; i < i2105.length; i += 4) {
    i2104.push( UnityEngine.Rect.MinMaxRect(i2105[i + 0], i2105[i + 1], i2105[i + 2], i2105[i + 3]) );
  }
  i2102.rects = i2104
  i2102.wrapU = i2103[8]
  i2102.wrapV = i2103[9]
  return i2102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2109 = data
  i2108.name = i2109[0]
  i2108.index = i2109[1]
  i2108.startup = !!i2109[2]
  return i2108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2110 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2111 = data
  i2110.aspect = i2111[0]
  i2110.orthographic = !!i2111[1]
  i2110.orthographicSize = i2111[2]
  i2110.backgroundColor = new pc.Color(i2111[3], i2111[4], i2111[5], i2111[6])
  i2110.nearClipPlane = i2111[7]
  i2110.farClipPlane = i2111[8]
  i2110.fieldOfView = i2111[9]
  i2110.depth = i2111[10]
  i2110.clearFlags = i2111[11]
  i2110.cullingMask = i2111[12]
  i2110.rect = i2111[13]
  request.r(i2111[14], i2111[15], 0, i2110, 'targetTexture')
  i2110.usePhysicalProperties = !!i2111[16]
  i2110.focalLength = i2111[17]
  i2110.sensorSize = new pc.Vec2( i2111[18], i2111[19] )
  i2110.lensShift = new pc.Vec2( i2111[20], i2111[21] )
  i2110.gateFit = i2111[22]
  i2110.commandBufferCount = i2111[23]
  i2110.cameraType = i2111[24]
  i2110.enabled = !!i2111[25]
  return i2110
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2113 = data
  i2112.name = i2113[0]
  i2112.tagId = i2113[1]
  i2112.enabled = !!i2113[2]
  i2112.isStatic = !!i2113[3]
  i2112.layer = i2113[4]
  return i2112
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2114 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2115 = data
  request.r(i2115[0], i2115[1], 0, i2114, 'm_FirstSelected')
  i2114.m_sendNavigationEvents = !!i2115[2]
  i2114.m_DragThreshold = i2115[3]
  return i2114
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2116 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2117 = data
  i2116.m_HorizontalAxis = i2117[0]
  i2116.m_VerticalAxis = i2117[1]
  i2116.m_SubmitButton = i2117[2]
  i2116.m_CancelButton = i2117[3]
  i2116.m_InputActionsPerSecond = i2117[4]
  i2116.m_RepeatDelay = i2117[5]
  i2116.m_ForceModuleActive = !!i2117[6]
  i2116.m_SendPointerHoverToParent = !!i2117[7]
  return i2116
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i2118 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i2119 = data
  i2118.type = i2119[0]
  i2118.color = new pc.Color(i2119[1], i2119[2], i2119[3], i2119[4])
  i2118.cullingMask = i2119[5]
  i2118.intensity = i2119[6]
  i2118.range = i2119[7]
  i2118.spotAngle = i2119[8]
  i2118.shadows = i2119[9]
  i2118.shadowNormalBias = i2119[10]
  i2118.shadowBias = i2119[11]
  i2118.shadowStrength = i2119[12]
  i2118.shadowResolution = i2119[13]
  i2118.lightmapBakeType = i2119[14]
  i2118.renderMode = i2119[15]
  request.r(i2119[16], i2119[17], 0, i2118, 'cookie')
  i2118.cookieSize = i2119[18]
  i2118.shadowNearPlane = i2119[19]
  i2118.occlusionMaskChannel = i2119[20]
  i2118.isBaked = !!i2119[21]
  i2118.mixedLightingMode = i2119[22]
  i2118.enabled = !!i2119[23]
  return i2118
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2120 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2121 = data
  i2120.pivot = new pc.Vec2( i2121[0], i2121[1] )
  i2120.anchorMin = new pc.Vec2( i2121[2], i2121[3] )
  i2120.anchorMax = new pc.Vec2( i2121[4], i2121[5] )
  i2120.sizeDelta = new pc.Vec2( i2121[6], i2121[7] )
  i2120.anchoredPosition3D = new pc.Vec3( i2121[8], i2121[9], i2121[10] )
  i2120.rotation = new pc.Quat(i2121[11], i2121[12], i2121[13], i2121[14])
  i2120.scale = new pc.Vec3( i2121[15], i2121[16], i2121[17] )
  return i2120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2123 = data
  i2122.planeDistance = i2123[0]
  i2122.referencePixelsPerUnit = i2123[1]
  i2122.isFallbackOverlay = !!i2123[2]
  i2122.renderMode = i2123[3]
  i2122.renderOrder = i2123[4]
  i2122.sortingLayerName = i2123[5]
  i2122.sortingOrder = i2123[6]
  i2122.scaleFactor = i2123[7]
  request.r(i2123[8], i2123[9], 0, i2122, 'worldCamera')
  i2122.overrideSorting = !!i2123[10]
  i2122.pixelPerfect = !!i2123[11]
  i2122.targetDisplay = i2123[12]
  i2122.overridePixelPerfect = !!i2123[13]
  i2122.enabled = !!i2123[14]
  return i2122
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2124 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2125 = data
  i2124.m_UiScaleMode = i2125[0]
  i2124.m_ReferencePixelsPerUnit = i2125[1]
  i2124.m_ScaleFactor = i2125[2]
  i2124.m_ReferenceResolution = new pc.Vec2( i2125[3], i2125[4] )
  i2124.m_ScreenMatchMode = i2125[5]
  i2124.m_MatchWidthOrHeight = i2125[6]
  i2124.m_PhysicalUnit = i2125[7]
  i2124.m_FallbackScreenDPI = i2125[8]
  i2124.m_DefaultSpriteDPI = i2125[9]
  i2124.m_DynamicPixelsPerUnit = i2125[10]
  i2124.m_PresetInfoIsWorld = !!i2125[11]
  return i2124
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2126 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2127 = data
  i2126.m_IgnoreReversedGraphics = !!i2127[0]
  i2126.m_BlockingObjects = i2127[1]
  i2126.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2127[2] )
  return i2126
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2128 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2129 = data
  i2128.cullTransparentMesh = !!i2129[0]
  return i2128
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2130 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2131 = data
  i2130.m_hasFontAssetChanged = !!i2131[0]
  request.r(i2131[1], i2131[2], 0, i2130, 'm_baseMaterial')
  i2130.m_maskOffset = new pc.Vec4( i2131[3], i2131[4], i2131[5], i2131[6] )
  i2130.m_text = i2131[7]
  i2130.m_isRightToLeft = !!i2131[8]
  request.r(i2131[9], i2131[10], 0, i2130, 'm_fontAsset')
  request.r(i2131[11], i2131[12], 0, i2130, 'm_sharedMaterial')
  var i2133 = i2131[13]
  var i2132 = []
  for(var i = 0; i < i2133.length; i += 2) {
  request.r(i2133[i + 0], i2133[i + 1], 2, i2132, '')
  }
  i2130.m_fontSharedMaterials = i2132
  request.r(i2131[14], i2131[15], 0, i2130, 'm_fontMaterial')
  var i2135 = i2131[16]
  var i2134 = []
  for(var i = 0; i < i2135.length; i += 2) {
  request.r(i2135[i + 0], i2135[i + 1], 2, i2134, '')
  }
  i2130.m_fontMaterials = i2134
  i2130.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2131[17], i2131[18], i2131[19], i2131[20])
  i2130.m_fontColor = new pc.Color(i2131[21], i2131[22], i2131[23], i2131[24])
  i2130.m_enableVertexGradient = !!i2131[25]
  i2130.m_colorMode = i2131[26]
  i2130.m_fontColorGradient = request.d('TMPro.VertexGradient', i2131[27], i2130.m_fontColorGradient)
  request.r(i2131[28], i2131[29], 0, i2130, 'm_fontColorGradientPreset')
  request.r(i2131[30], i2131[31], 0, i2130, 'm_spriteAsset')
  i2130.m_tintAllSprites = !!i2131[32]
  request.r(i2131[33], i2131[34], 0, i2130, 'm_StyleSheet')
  i2130.m_TextStyleHashCode = i2131[35]
  i2130.m_overrideHtmlColors = !!i2131[36]
  i2130.m_faceColor = UnityEngine.Color32.ConstructColor(i2131[37], i2131[38], i2131[39], i2131[40])
  i2130.m_fontSize = i2131[41]
  i2130.m_fontSizeBase = i2131[42]
  i2130.m_fontWeight = i2131[43]
  i2130.m_enableAutoSizing = !!i2131[44]
  i2130.m_fontSizeMin = i2131[45]
  i2130.m_fontSizeMax = i2131[46]
  i2130.m_fontStyle = i2131[47]
  i2130.m_HorizontalAlignment = i2131[48]
  i2130.m_VerticalAlignment = i2131[49]
  i2130.m_textAlignment = i2131[50]
  i2130.m_characterSpacing = i2131[51]
  i2130.m_characterHorizontalScale = i2131[52]
  i2130.m_wordSpacing = i2131[53]
  i2130.m_lineSpacing = i2131[54]
  i2130.m_lineSpacingMax = i2131[55]
  i2130.m_paragraphSpacing = i2131[56]
  i2130.m_charWidthMaxAdj = i2131[57]
  i2130.m_TextWrappingMode = i2131[58]
  i2130.m_wordWrappingRatios = i2131[59]
  i2130.m_overflowMode = i2131[60]
  request.r(i2131[61], i2131[62], 0, i2130, 'm_linkedTextComponent')
  request.r(i2131[63], i2131[64], 0, i2130, 'parentLinkedComponent')
  i2130.m_enableKerning = !!i2131[65]
  var i2137 = i2131[66]
  var i2136 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2137.length; i += 1) {
    i2136.add(i2137[i + 0]);
  }
  i2130.m_ActiveFontFeatures = i2136
  i2130.m_enableExtraPadding = !!i2131[67]
  i2130.checkPaddingRequired = !!i2131[68]
  i2130.m_isRichText = !!i2131[69]
  i2130.m_parseCtrlCharacters = !!i2131[70]
  i2130.m_isOrthographic = !!i2131[71]
  i2130.m_isCullingEnabled = !!i2131[72]
  i2130.m_horizontalMapping = i2131[73]
  i2130.m_verticalMapping = i2131[74]
  i2130.m_uvLineOffset = i2131[75]
  i2130.m_geometrySortingOrder = i2131[76]
  i2130.m_IsTextObjectScaleStatic = !!i2131[77]
  i2130.m_VertexBufferAutoSizeReduction = !!i2131[78]
  i2130.m_useMaxVisibleDescender = !!i2131[79]
  i2130.m_pageToDisplay = i2131[80]
  i2130.m_margin = new pc.Vec4( i2131[81], i2131[82], i2131[83], i2131[84] )
  i2130.m_isUsingLegacyAnimationComponent = !!i2131[85]
  i2130.m_isVolumetricText = !!i2131[86]
  request.r(i2131[87], i2131[88], 0, i2130, 'm_Material')
  i2130.m_EmojiFallbackSupport = !!i2131[89]
  i2130.m_Maskable = !!i2131[90]
  i2130.m_Color = new pc.Color(i2131[91], i2131[92], i2131[93], i2131[94])
  i2130.m_RaycastTarget = !!i2131[95]
  i2130.m_RaycastPadding = new pc.Vec4( i2131[96], i2131[97], i2131[98], i2131[99] )
  return i2130
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2140 = root || request.c( 'TMPro.VertexGradient' )
  var i2141 = data
  i2140.topLeft = new pc.Color(i2141[0], i2141[1], i2141[2], i2141[3])
  i2140.topRight = new pc.Color(i2141[4], i2141[5], i2141[6], i2141[7])
  i2140.bottomLeft = new pc.Color(i2141[8], i2141[9], i2141[10], i2141[11])
  i2140.bottomRight = new pc.Color(i2141[12], i2141[13], i2141[14], i2141[15])
  return i2140
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i2144 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i2145 = data
  i2144.targetIsSelf = !!i2145[0]
  request.r(i2145[1], i2145[2], 0, i2144, 'targetGO')
  i2144.tweenTargetIsTargetGO = !!i2145[3]
  i2144.delay = i2145[4]
  i2144.duration = i2145[5]
  i2144.easeType = i2145[6]
  i2144.easeCurve = new pc.AnimationCurve( { keys_flow: i2145[7] } )
  i2144.loopType = i2145[8]
  i2144.loops = i2145[9]
  i2144.id = i2145[10]
  i2144.isRelative = !!i2145[11]
  i2144.isFrom = !!i2145[12]
  i2144.isIndependentUpdate = !!i2145[13]
  i2144.autoKill = !!i2145[14]
  i2144.autoGenerate = !!i2145[15]
  i2144.isActive = !!i2145[16]
  i2144.isValid = !!i2145[17]
  request.r(i2145[18], i2145[19], 0, i2144, 'target')
  i2144.animationType = i2145[20]
  i2144.targetType = i2145[21]
  i2144.forcedTargetType = i2145[22]
  i2144.autoPlay = !!i2145[23]
  i2144.useTargetAsV3 = !!i2145[24]
  i2144.endValueFloat = i2145[25]
  i2144.endValueV3 = new pc.Vec3( i2145[26], i2145[27], i2145[28] )
  i2144.endValueV2 = new pc.Vec2( i2145[29], i2145[30] )
  i2144.endValueColor = new pc.Color(i2145[31], i2145[32], i2145[33], i2145[34])
  i2144.endValueString = i2145[35]
  i2144.endValueRect = UnityEngine.Rect.MinMaxRect(i2145[36], i2145[37], i2145[38], i2145[39])
  request.r(i2145[40], i2145[41], 0, i2144, 'endValueTransform')
  i2144.optionalBool0 = !!i2145[42]
  i2144.optionalBool1 = !!i2145[43]
  i2144.optionalFloat0 = i2145[44]
  i2144.optionalInt0 = i2145[45]
  i2144.optionalRotationMode = i2145[46]
  i2144.optionalScrambleMode = i2145[47]
  i2144.optionalShakeRandomnessMode = i2145[48]
  i2144.optionalString = i2145[49]
  i2144.updateType = i2145[50]
  i2144.isSpeedBased = !!i2145[51]
  i2144.hasOnStart = !!i2145[52]
  i2144.hasOnPlay = !!i2145[53]
  i2144.hasOnUpdate = !!i2145[54]
  i2144.hasOnStepComplete = !!i2145[55]
  i2144.hasOnComplete = !!i2145[56]
  i2144.hasOnTweenCreated = !!i2145[57]
  i2144.hasOnRewind = !!i2145[58]
  i2144.onStart = request.d('UnityEngine.Events.UnityEvent', i2145[59], i2144.onStart)
  i2144.onPlay = request.d('UnityEngine.Events.UnityEvent', i2145[60], i2144.onPlay)
  i2144.onUpdate = request.d('UnityEngine.Events.UnityEvent', i2145[61], i2144.onUpdate)
  i2144.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i2145[62], i2144.onStepComplete)
  i2144.onComplete = request.d('UnityEngine.Events.UnityEvent', i2145[63], i2144.onComplete)
  i2144.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i2145[64], i2144.onTweenCreated)
  i2144.onRewind = request.d('UnityEngine.Events.UnityEvent', i2145[65], i2144.onRewind)
  return i2144
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i2146 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i2147 = data
  i2146.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2147[0], i2146.m_PersistentCalls)
  return i2146
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2148 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2149 = data
  var i2151 = i2149[0]
  var i2150 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2151.length; i += 1) {
    i2150.add(request.d('UnityEngine.Events.PersistentCall', i2151[i + 0]));
  }
  i2148.m_Calls = i2150
  return i2148
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2154 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2155 = data
  request.r(i2155[0], i2155[1], 0, i2154, 'm_Target')
  i2154.m_TargetAssemblyTypeName = i2155[2]
  i2154.m_MethodName = i2155[3]
  i2154.m_Mode = i2155[4]
  i2154.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2155[5], i2154.m_Arguments)
  i2154.m_CallState = i2155[6]
  return i2154
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2156 = root || request.c( 'UnityEngine.UI.Image' )
  var i2157 = data
  request.r(i2157[0], i2157[1], 0, i2156, 'm_Sprite')
  i2156.m_Type = i2157[2]
  i2156.m_PreserveAspect = !!i2157[3]
  i2156.m_FillCenter = !!i2157[4]
  i2156.m_FillMethod = i2157[5]
  i2156.m_FillAmount = i2157[6]
  i2156.m_FillClockwise = !!i2157[7]
  i2156.m_FillOrigin = i2157[8]
  i2156.m_UseSpriteMesh = !!i2157[9]
  i2156.m_PixelsPerUnitMultiplier = i2157[10]
  request.r(i2157[11], i2157[12], 0, i2156, 'm_Material')
  i2156.m_Maskable = !!i2157[13]
  i2156.m_Color = new pc.Color(i2157[14], i2157[15], i2157[16], i2157[17])
  i2156.m_RaycastTarget = !!i2157[18]
  i2156.m_RaycastPadding = new pc.Vec4( i2157[19], i2157[20], i2157[21], i2157[22] )
  return i2156
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2158 = root || request.c( 'UnityEngine.UI.Button' )
  var i2159 = data
  i2158.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2159[0], i2158.m_OnClick)
  i2158.m_Navigation = request.d('UnityEngine.UI.Navigation', i2159[1], i2158.m_Navigation)
  i2158.m_Transition = i2159[2]
  i2158.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2159[3], i2158.m_Colors)
  i2158.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2159[4], i2158.m_SpriteState)
  i2158.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2159[5], i2158.m_AnimationTriggers)
  i2158.m_Interactable = !!i2159[6]
  request.r(i2159[7], i2159[8], 0, i2158, 'm_TargetGraphic')
  return i2158
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2160 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2161 = data
  i2160.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2161[0], i2160.m_PersistentCalls)
  return i2160
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2162 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2163 = data
  i2162.m_Mode = i2163[0]
  i2162.m_WrapAround = !!i2163[1]
  request.r(i2163[2], i2163[3], 0, i2162, 'm_SelectOnUp')
  request.r(i2163[4], i2163[5], 0, i2162, 'm_SelectOnDown')
  request.r(i2163[6], i2163[7], 0, i2162, 'm_SelectOnLeft')
  request.r(i2163[8], i2163[9], 0, i2162, 'm_SelectOnRight')
  return i2162
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2164 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2165 = data
  i2164.m_NormalColor = new pc.Color(i2165[0], i2165[1], i2165[2], i2165[3])
  i2164.m_HighlightedColor = new pc.Color(i2165[4], i2165[5], i2165[6], i2165[7])
  i2164.m_PressedColor = new pc.Color(i2165[8], i2165[9], i2165[10], i2165[11])
  i2164.m_SelectedColor = new pc.Color(i2165[12], i2165[13], i2165[14], i2165[15])
  i2164.m_DisabledColor = new pc.Color(i2165[16], i2165[17], i2165[18], i2165[19])
  i2164.m_ColorMultiplier = i2165[20]
  i2164.m_FadeDuration = i2165[21]
  return i2164
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2166 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2167 = data
  request.r(i2167[0], i2167[1], 0, i2166, 'm_HighlightedSprite')
  request.r(i2167[2], i2167[3], 0, i2166, 'm_PressedSprite')
  request.r(i2167[4], i2167[5], 0, i2166, 'm_SelectedSprite')
  request.r(i2167[6], i2167[7], 0, i2166, 'm_DisabledSprite')
  return i2166
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2168 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2169 = data
  i2168.m_NormalTrigger = i2169[0]
  i2168.m_HighlightedTrigger = i2169[1]
  i2168.m_PressedTrigger = i2169[2]
  i2168.m_SelectedTrigger = i2169[3]
  i2168.m_DisabledTrigger = i2169[4]
  return i2168
}

Deserializers["AnimationController"] = function (request, data, root) {
  var i2170 = root || request.c( 'AnimationController' )
  var i2171 = data
  request.r(i2171[0], i2171[1], 0, i2170, 'left')
  request.r(i2171[2], i2171[3], 0, i2170, 'right')
  i2170.key = i2171[4]
  return i2170
}

Deserializers["Spine.Unity.SkeletonGraphic"] = function (request, data, root) {
  var i2172 = root || request.c( 'Spine.Unity.SkeletonGraphic' )
  var i2173 = data
  request.r(i2173[0], i2173[1], 0, i2172, 'skeletonDataAsset')
  request.r(i2173[2], i2173[3], 0, i2172, 'additiveMaterial')
  request.r(i2173[4], i2173[5], 0, i2172, 'multiplyMaterial')
  request.r(i2173[6], i2173[7], 0, i2172, 'screenMaterial')
  i2172.forceAdditiveMaterial = !!i2173[8]
  i2172.initialSkinName = i2173[9]
  i2172.initialFlipX = !!i2173[10]
  i2172.initialFlipY = !!i2173[11]
  i2172.startingAnimation = i2173[12]
  i2172.startingLoop = !!i2173[13]
  i2172.timeScale = i2173[14]
  i2172.freeze = !!i2173[15]
  i2172.layoutScaleMode = i2173[16]
  i2172.updateWhenInvisible = i2173[17]
  i2172.allowMultipleCanvasRenderers = !!i2173[18]
  var i2175 = i2173[19]
  var i2174 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.CanvasRenderer')))
  for(var i = 0; i < i2175.length; i += 2) {
  request.r(i2175[i + 0], i2175[i + 1], 1, i2174, '')
  }
  i2172.canvasRenderers = i2174
  i2172.enableSeparatorSlots = !!i2173[20]
  i2172.updateSeparatorPartLocation = !!i2173[21]
  i2172.updateSeparatorPartScale = !!i2173[22]
  i2172.disableMeshAssignmentOnOverride = !!i2173[23]
  i2172.m_SkeletonColor = new pc.Color(i2173[24], i2173[25], i2173[26], i2173[27])
  i2172.referenceSize = new pc.Vec2( i2173[28], i2173[29] )
  i2172.pivotOffset = new pc.Vec2( i2173[30], i2173[31] )
  i2172.referenceScale = i2173[32]
  i2172.layoutScale = i2173[33]
  i2172.rectTransformSize = new pc.Vec2( i2173[34], i2173[35] )
  i2172.editReferenceRect = !!i2173[36]
  var i2177 = i2173[37]
  var i2176 = []
  for(var i = 0; i < i2177.length; i += 1) {
    i2176.push( i2177[i + 0] );
  }
  i2172.separatorSlotNames = i2176
  var i2179 = i2173[38]
  var i2178 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Transform')))
  for(var i = 0; i < i2179.length; i += 2) {
  request.r(i2179[i + 0], i2179[i + 1], 1, i2178, '')
  }
  i2172.separatorParts = i2178
  i2172.physicsPositionInheritanceFactor = new pc.Vec2( i2173[39], i2173[40] )
  i2172.physicsRotationInheritanceFactor = i2173[41]
  request.r(i2173[42], i2173[43], 0, i2172, 'physicsMovementRelativeTo')
  i2172.meshGenerator = request.d('Spine.Unity.MeshGenerator', i2173[44], i2172.meshGenerator)
  i2172.updateTiming = i2173[45]
  i2172.unscaledTime = !!i2173[46]
  request.r(i2173[47], i2173[48], 0, i2172, 'm_Material')
  i2172.m_Maskable = !!i2173[49]
  i2172.m_Color = new pc.Color(i2173[50], i2173[51], i2173[52], i2173[53])
  i2172.m_RaycastTarget = !!i2173[54]
  i2172.m_RaycastPadding = new pc.Vec4( i2173[55], i2173[56], i2173[57], i2173[58] )
  return i2172
}

Deserializers["Spine.Unity.MeshGenerator"] = function (request, data, root) {
  var i2186 = root || request.c( 'Spine.Unity.MeshGenerator' )
  var i2187 = data
  i2186.settings = request.d('Spine.Unity.MeshGenerator+Settings', i2187[0], i2186.settings)
  return i2186
}

Deserializers["Spine.Unity.MeshGenerator+Settings"] = function (request, data, root) {
  var i2188 = root || request.c( 'Spine.Unity.MeshGenerator+Settings' )
  var i2189 = data
  i2188.useClipping = !!i2189[0]
  i2188.zSpacing = i2189[1]
  i2188.tintBlack = !!i2189[2]
  i2188.canvasGroupCompatible = !!i2189[3]
  i2188.pmaVertexColors = !!i2189[4]
  i2188.addNormals = !!i2189[5]
  i2188.calculateTangents = !!i2189[6]
  i2188.immutableTriangles = !!i2189[7]
  return i2188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i2190 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i2191 = data
  i2190.color = new pc.Color(i2191[0], i2191[1], i2191[2], i2191[3])
  request.r(i2191[4], i2191[5], 0, i2190, 'sprite')
  i2190.flipX = !!i2191[6]
  i2190.flipY = !!i2191[7]
  i2190.drawMode = i2191[8]
  i2190.size = new pc.Vec2( i2191[9], i2191[10] )
  i2190.tileMode = i2191[11]
  i2190.adaptiveModeThreshold = i2191[12]
  i2190.maskInteraction = i2191[13]
  i2190.spriteSortPoint = i2191[14]
  i2190.enabled = !!i2191[15]
  request.r(i2191[16], i2191[17], 0, i2190, 'sharedMaterial')
  var i2193 = i2191[18]
  var i2192 = []
  for(var i = 0; i < i2193.length; i += 2) {
  request.r(i2193[i + 0], i2193[i + 1], 2, i2192, '')
  }
  i2190.sharedMaterials = i2192
  i2190.receiveShadows = !!i2191[19]
  i2190.shadowCastingMode = i2191[20]
  i2190.sortingLayerID = i2191[21]
  i2190.sortingOrder = i2191[22]
  i2190.lightmapIndex = i2191[23]
  i2190.lightmapSceneIndex = i2191[24]
  i2190.lightmapScaleOffset = new pc.Vec4( i2191[25], i2191[26], i2191[27], i2191[28] )
  i2190.lightProbeUsage = i2191[29]
  i2190.reflectionProbeUsage = i2191[30]
  return i2190
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i2194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i2195 = data
  request.r(i2195[0], i2195[1], 0, i2194, 'sharedMesh')
  var i2197 = i2195[2]
  var i2196 = []
  for(var i = 0; i < i2197.length; i += 2) {
  request.r(i2197[i + 0], i2197[i + 1], 2, i2196, '')
  }
  i2194.bones = i2196
  i2194.updateWhenOffscreen = !!i2195[3]
  i2194.localBounds = i2195[4]
  request.r(i2195[5], i2195[6], 0, i2194, 'rootBone')
  var i2199 = i2195[7]
  var i2198 = []
  for(var i = 0; i < i2199.length; i += 1) {
    i2198.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i2199[i + 0]) );
  }
  i2194.blendShapesWeights = i2198
  i2194.enabled = !!i2195[8]
  request.r(i2195[9], i2195[10], 0, i2194, 'sharedMaterial')
  var i2201 = i2195[11]
  var i2200 = []
  for(var i = 0; i < i2201.length; i += 2) {
  request.r(i2201[i + 0], i2201[i + 1], 2, i2200, '')
  }
  i2194.sharedMaterials = i2200
  i2194.receiveShadows = !!i2195[12]
  i2194.shadowCastingMode = i2195[13]
  i2194.sortingLayerID = i2195[14]
  i2194.sortingOrder = i2195[15]
  i2194.lightmapIndex = i2195[16]
  i2194.lightmapSceneIndex = i2195[17]
  i2194.lightmapScaleOffset = new pc.Vec4( i2195[18], i2195[19], i2195[20], i2195[21] )
  i2194.lightProbeUsage = i2195[22]
  i2194.reflectionProbeUsage = i2195[23]
  return i2194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i2206 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i2207 = data
  i2206.weight = i2207[0]
  return i2206
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i2208 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i2209 = data
  request.r(i2209[0], i2209[1], 0, i2208, 'sharedMesh')
  return i2208
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i2210 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i2211 = data
  request.r(i2211[0], i2211[1], 0, i2210, 'additionalVertexStreams')
  i2210.enabled = !!i2211[2]
  request.r(i2211[3], i2211[4], 0, i2210, 'sharedMaterial')
  var i2213 = i2211[5]
  var i2212 = []
  for(var i = 0; i < i2213.length; i += 2) {
  request.r(i2213[i + 0], i2213[i + 1], 2, i2212, '')
  }
  i2210.sharedMaterials = i2212
  i2210.receiveShadows = !!i2211[6]
  i2210.shadowCastingMode = i2211[7]
  i2210.sortingLayerID = i2211[8]
  i2210.sortingOrder = i2211[9]
  i2210.lightmapIndex = i2211[10]
  i2210.lightmapSceneIndex = i2211[11]
  i2210.lightmapScaleOffset = new pc.Vec4( i2211[12], i2211[13], i2211[14], i2211[15] )
  i2210.lightProbeUsage = i2211[16]
  i2210.reflectionProbeUsage = i2211[17]
  return i2210
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i2214 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i2215 = data
  i2214.loop = !!i2215[0]
  i2214.timeScale = i2215[1]
  request.r(i2215[2], i2215[3], 0, i2214, 'skeletonDataAsset')
  i2214.initialSkinName = i2215[4]
  i2214.fixPrefabOverrideViaMeshFilter = i2215[5]
  i2214.initialFlipX = !!i2215[6]
  i2214.initialFlipY = !!i2215[7]
  i2214.updateWhenInvisible = i2215[8]
  i2214.zSpacing = i2215[9]
  i2214.useClipping = !!i2215[10]
  i2214.immutableTriangles = !!i2215[11]
  i2214.pmaVertexColors = !!i2215[12]
  i2214.clearStateOnDisable = !!i2215[13]
  i2214.tintBlack = !!i2215[14]
  i2214.singleSubmesh = !!i2215[15]
  i2214.fixDrawOrder = !!i2215[16]
  i2214.addNormals = !!i2215[17]
  i2214.calculateTangents = !!i2215[18]
  i2214.maskInteraction = i2215[19]
  i2214.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i2215[20], i2214.maskMaterials)
  i2214.disableRenderingOnOverride = !!i2215[21]
  i2214.updateTiming = i2215[22]
  i2214.unscaledTime = !!i2215[23]
  i2214._animationName = i2215[24]
  var i2217 = i2215[25]
  var i2216 = []
  for(var i = 0; i < i2217.length; i += 1) {
    i2216.push( i2217[i + 0] );
  }
  i2214.separatorSlotNames = i2216
  i2214.physicsPositionInheritanceFactor = new pc.Vec2( i2215[26], i2215[27] )
  i2214.physicsRotationInheritanceFactor = i2215[28]
  request.r(i2215[29], i2215[30], 0, i2214, 'physicsMovementRelativeTo')
  return i2214
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i2218 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i2219 = data
  var i2221 = i2219[0]
  var i2220 = []
  for(var i = 0; i < i2221.length; i += 2) {
  request.r(i2221[i + 0], i2221[i + 1], 2, i2220, '')
  }
  i2218.materialsMaskDisabled = i2220
  var i2223 = i2219[1]
  var i2222 = []
  for(var i = 0; i < i2223.length; i += 2) {
  request.r(i2223[i + 0], i2223[i + 1], 2, i2222, '')
  }
  i2218.materialsInsideMask = i2222
  var i2225 = i2219[2]
  var i2224 = []
  for(var i = 0; i < i2225.length; i += 2) {
  request.r(i2225[i + 0], i2225[i + 1], 2, i2224, '')
  }
  i2218.materialsOutsideMask = i2224
  return i2218
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i2226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i2227 = data
  i2226.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i2227[0], i2226.main)
  i2226.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i2227[1], i2226.colorBySpeed)
  i2226.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i2227[2], i2226.colorOverLifetime)
  i2226.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i2227[3], i2226.emission)
  i2226.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i2227[4], i2226.rotationBySpeed)
  i2226.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i2227[5], i2226.rotationOverLifetime)
  i2226.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i2227[6], i2226.shape)
  i2226.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i2227[7], i2226.sizeBySpeed)
  i2226.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i2227[8], i2226.sizeOverLifetime)
  i2226.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i2227[9], i2226.textureSheetAnimation)
  i2226.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i2227[10], i2226.velocityOverLifetime)
  i2226.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i2227[11], i2226.noise)
  i2226.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i2227[12], i2226.inheritVelocity)
  i2226.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i2227[13], i2226.forceOverLifetime)
  i2226.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i2227[14], i2226.limitVelocityOverLifetime)
  i2226.useAutoRandomSeed = !!i2227[15]
  i2226.randomSeed = i2227[16]
  return i2226
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i2228 = root || new pc.ParticleSystemMain()
  var i2229 = data
  i2228.duration = i2229[0]
  i2228.loop = !!i2229[1]
  i2228.prewarm = !!i2229[2]
  i2228.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[3], i2228.startDelay)
  i2228.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[4], i2228.startLifetime)
  i2228.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[5], i2228.startSpeed)
  i2228.startSize3D = !!i2229[6]
  i2228.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[7], i2228.startSizeX)
  i2228.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[8], i2228.startSizeY)
  i2228.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[9], i2228.startSizeZ)
  i2228.startRotation3D = !!i2229[10]
  i2228.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[11], i2228.startRotationX)
  i2228.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[12], i2228.startRotationY)
  i2228.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[13], i2228.startRotationZ)
  i2228.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2229[14], i2228.startColor)
  i2228.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2229[15], i2228.gravityModifier)
  i2228.simulationSpace = i2229[16]
  request.r(i2229[17], i2229[18], 0, i2228, 'customSimulationSpace')
  i2228.simulationSpeed = i2229[19]
  i2228.useUnscaledTime = !!i2229[20]
  i2228.scalingMode = i2229[21]
  i2228.playOnAwake = !!i2229[22]
  i2228.maxParticles = i2229[23]
  i2228.emitterVelocityMode = i2229[24]
  i2228.stopAction = i2229[25]
  return i2228
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i2230 = root || new pc.MinMaxCurve()
  var i2231 = data
  i2230.mode = i2231[0]
  i2230.curveMin = new pc.AnimationCurve( { keys_flow: i2231[1] } )
  i2230.curveMax = new pc.AnimationCurve( { keys_flow: i2231[2] } )
  i2230.curveMultiplier = i2231[3]
  i2230.constantMin = i2231[4]
  i2230.constantMax = i2231[5]
  return i2230
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i2232 = root || new pc.MinMaxGradient()
  var i2233 = data
  i2232.mode = i2233[0]
  i2232.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i2233[1], i2232.gradientMin)
  i2232.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i2233[2], i2232.gradientMax)
  i2232.colorMin = new pc.Color(i2233[3], i2233[4], i2233[5], i2233[6])
  i2232.colorMax = new pc.Color(i2233[7], i2233[8], i2233[9], i2233[10])
  return i2232
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i2234 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i2235 = data
  i2234.mode = i2235[0]
  var i2237 = i2235[1]
  var i2236 = []
  for(var i = 0; i < i2237.length; i += 1) {
    i2236.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i2237[i + 0]) );
  }
  i2234.colorKeys = i2236
  var i2239 = i2235[2]
  var i2238 = []
  for(var i = 0; i < i2239.length; i += 1) {
    i2238.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i2239[i + 0]) );
  }
  i2234.alphaKeys = i2238
  return i2234
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i2240 = root || new pc.ParticleSystemColorBySpeed()
  var i2241 = data
  i2240.enabled = !!i2241[0]
  i2240.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2241[1], i2240.color)
  i2240.range = new pc.Vec2( i2241[2], i2241[3] )
  return i2240
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i2244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i2245 = data
  i2244.color = new pc.Color(i2245[0], i2245[1], i2245[2], i2245[3])
  i2244.time = i2245[4]
  return i2244
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i2248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i2249 = data
  i2248.alpha = i2249[0]
  i2248.time = i2249[1]
  return i2248
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i2250 = root || new pc.ParticleSystemColorOverLifetime()
  var i2251 = data
  i2250.enabled = !!i2251[0]
  i2250.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i2251[1], i2250.color)
  return i2250
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i2252 = root || new pc.ParticleSystemEmitter()
  var i2253 = data
  i2252.enabled = !!i2253[0]
  i2252.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2253[1], i2252.rateOverTime)
  i2252.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2253[2], i2252.rateOverDistance)
  var i2255 = i2253[3]
  var i2254 = []
  for(var i = 0; i < i2255.length; i += 1) {
    i2254.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i2255[i + 0]) );
  }
  i2252.bursts = i2254
  return i2252
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i2258 = root || new pc.ParticleSystemBurst()
  var i2259 = data
  i2258.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2259[0], i2258.count)
  i2258.cycleCount = i2259[1]
  i2258.minCount = i2259[2]
  i2258.maxCount = i2259[3]
  i2258.repeatInterval = i2259[4]
  i2258.time = i2259[5]
  return i2258
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i2260 = root || new pc.ParticleSystemRotationBySpeed()
  var i2261 = data
  i2260.enabled = !!i2261[0]
  i2260.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2261[1], i2260.x)
  i2260.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2261[2], i2260.y)
  i2260.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2261[3], i2260.z)
  i2260.separateAxes = !!i2261[4]
  i2260.range = new pc.Vec2( i2261[5], i2261[6] )
  return i2260
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i2262 = root || new pc.ParticleSystemRotationOverLifetime()
  var i2263 = data
  i2262.enabled = !!i2263[0]
  i2262.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2263[1], i2262.x)
  i2262.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2263[2], i2262.y)
  i2262.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2263[3], i2262.z)
  i2262.separateAxes = !!i2263[4]
  return i2262
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i2264 = root || new pc.ParticleSystemShape()
  var i2265 = data
  i2264.enabled = !!i2265[0]
  i2264.shapeType = i2265[1]
  i2264.randomDirectionAmount = i2265[2]
  i2264.sphericalDirectionAmount = i2265[3]
  i2264.randomPositionAmount = i2265[4]
  i2264.alignToDirection = !!i2265[5]
  i2264.radius = i2265[6]
  i2264.radiusMode = i2265[7]
  i2264.radiusSpread = i2265[8]
  i2264.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2265[9], i2264.radiusSpeed)
  i2264.radiusThickness = i2265[10]
  i2264.angle = i2265[11]
  i2264.length = i2265[12]
  i2264.boxThickness = new pc.Vec3( i2265[13], i2265[14], i2265[15] )
  i2264.meshShapeType = i2265[16]
  request.r(i2265[17], i2265[18], 0, i2264, 'mesh')
  request.r(i2265[19], i2265[20], 0, i2264, 'meshRenderer')
  request.r(i2265[21], i2265[22], 0, i2264, 'skinnedMeshRenderer')
  i2264.useMeshMaterialIndex = !!i2265[23]
  i2264.meshMaterialIndex = i2265[24]
  i2264.useMeshColors = !!i2265[25]
  i2264.normalOffset = i2265[26]
  i2264.arc = i2265[27]
  i2264.arcMode = i2265[28]
  i2264.arcSpread = i2265[29]
  i2264.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2265[30], i2264.arcSpeed)
  i2264.donutRadius = i2265[31]
  i2264.position = new pc.Vec3( i2265[32], i2265[33], i2265[34] )
  i2264.rotation = new pc.Vec3( i2265[35], i2265[36], i2265[37] )
  i2264.scale = new pc.Vec3( i2265[38], i2265[39], i2265[40] )
  return i2264
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i2266 = root || new pc.ParticleSystemSizeBySpeed()
  var i2267 = data
  i2266.enabled = !!i2267[0]
  i2266.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2267[1], i2266.x)
  i2266.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2267[2], i2266.y)
  i2266.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2267[3], i2266.z)
  i2266.separateAxes = !!i2267[4]
  i2266.range = new pc.Vec2( i2267[5], i2267[6] )
  return i2266
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i2268 = root || new pc.ParticleSystemSizeOverLifetime()
  var i2269 = data
  i2268.enabled = !!i2269[0]
  i2268.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2269[1], i2268.x)
  i2268.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2269[2], i2268.y)
  i2268.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2269[3], i2268.z)
  i2268.separateAxes = !!i2269[4]
  return i2268
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i2270 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i2271 = data
  i2270.enabled = !!i2271[0]
  i2270.mode = i2271[1]
  i2270.animation = i2271[2]
  i2270.numTilesX = i2271[3]
  i2270.numTilesY = i2271[4]
  i2270.useRandomRow = !!i2271[5]
  i2270.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2271[6], i2270.frameOverTime)
  i2270.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2271[7], i2270.startFrame)
  i2270.cycleCount = i2271[8]
  i2270.rowIndex = i2271[9]
  i2270.flipU = i2271[10]
  i2270.flipV = i2271[11]
  i2270.spriteCount = i2271[12]
  var i2273 = i2271[13]
  var i2272 = []
  for(var i = 0; i < i2273.length; i += 2) {
  request.r(i2273[i + 0], i2273[i + 1], 2, i2272, '')
  }
  i2270.sprites = i2272
  return i2270
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i2276 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i2277 = data
  i2276.enabled = !!i2277[0]
  i2276.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[1], i2276.x)
  i2276.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[2], i2276.y)
  i2276.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[3], i2276.z)
  i2276.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[4], i2276.radial)
  i2276.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[5], i2276.speedModifier)
  i2276.space = i2277[6]
  i2276.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[7], i2276.orbitalX)
  i2276.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[8], i2276.orbitalY)
  i2276.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[9], i2276.orbitalZ)
  i2276.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[10], i2276.orbitalOffsetX)
  i2276.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[11], i2276.orbitalOffsetY)
  i2276.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2277[12], i2276.orbitalOffsetZ)
  return i2276
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i2278 = root || new pc.ParticleSystemNoise()
  var i2279 = data
  i2278.enabled = !!i2279[0]
  i2278.separateAxes = !!i2279[1]
  i2278.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[2], i2278.strengthX)
  i2278.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[3], i2278.strengthY)
  i2278.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[4], i2278.strengthZ)
  i2278.frequency = i2279[5]
  i2278.damping = !!i2279[6]
  i2278.octaveCount = i2279[7]
  i2278.octaveMultiplier = i2279[8]
  i2278.octaveScale = i2279[9]
  i2278.quality = i2279[10]
  i2278.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[11], i2278.scrollSpeed)
  i2278.scrollSpeedMultiplier = i2279[12]
  i2278.remapEnabled = !!i2279[13]
  i2278.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[14], i2278.remapX)
  i2278.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[15], i2278.remapY)
  i2278.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[16], i2278.remapZ)
  i2278.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[17], i2278.positionAmount)
  i2278.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[18], i2278.rotationAmount)
  i2278.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2279[19], i2278.sizeAmount)
  return i2278
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i2280 = root || new pc.ParticleSystemInheritVelocity()
  var i2281 = data
  i2280.enabled = !!i2281[0]
  i2280.mode = i2281[1]
  i2280.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2281[2], i2280.curve)
  return i2280
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i2282 = root || new pc.ParticleSystemForceOverLifetime()
  var i2283 = data
  i2282.enabled = !!i2283[0]
  i2282.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2283[1], i2282.x)
  i2282.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2283[2], i2282.y)
  i2282.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2283[3], i2282.z)
  i2282.space = i2283[4]
  i2282.randomized = !!i2283[5]
  return i2282
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i2284 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i2285 = data
  i2284.enabled = !!i2285[0]
  i2284.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2285[1], i2284.limit)
  i2284.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2285[2], i2284.limitX)
  i2284.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2285[3], i2284.limitY)
  i2284.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2285[4], i2284.limitZ)
  i2284.dampen = i2285[5]
  i2284.separateAxes = !!i2285[6]
  i2284.space = i2285[7]
  i2284.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i2285[8], i2284.drag)
  i2284.multiplyDragByParticleSize = !!i2285[9]
  i2284.multiplyDragByParticleVelocity = !!i2285[10]
  return i2284
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i2286 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i2287 = data
  request.r(i2287[0], i2287[1], 0, i2286, 'mesh')
  i2286.meshCount = i2287[2]
  i2286.activeVertexStreamsCount = i2287[3]
  i2286.alignment = i2287[4]
  i2286.renderMode = i2287[5]
  i2286.sortMode = i2287[6]
  i2286.lengthScale = i2287[7]
  i2286.velocityScale = i2287[8]
  i2286.cameraVelocityScale = i2287[9]
  i2286.normalDirection = i2287[10]
  i2286.sortingFudge = i2287[11]
  i2286.minParticleSize = i2287[12]
  i2286.maxParticleSize = i2287[13]
  i2286.pivot = new pc.Vec3( i2287[14], i2287[15], i2287[16] )
  request.r(i2287[17], i2287[18], 0, i2286, 'trailMaterial')
  i2286.applyActiveColorSpace = !!i2287[19]
  i2286.enabled = !!i2287[20]
  request.r(i2287[21], i2287[22], 0, i2286, 'sharedMaterial')
  var i2289 = i2287[23]
  var i2288 = []
  for(var i = 0; i < i2289.length; i += 2) {
  request.r(i2289[i + 0], i2289[i + 1], 2, i2288, '')
  }
  i2286.sharedMaterials = i2288
  i2286.receiveShadows = !!i2287[24]
  i2286.shadowCastingMode = i2287[25]
  i2286.sortingLayerID = i2287[26]
  i2286.sortingOrder = i2287[27]
  i2286.lightmapIndex = i2287[28]
  i2286.lightmapSceneIndex = i2287[29]
  i2286.lightmapScaleOffset = new pc.Vec4( i2287[30], i2287[31], i2287[32], i2287[33] )
  i2286.lightProbeUsage = i2287[34]
  i2286.reflectionProbeUsage = i2287[35]
  return i2286
}

Deserializers["GameController"] = function (request, data, root) {
  var i2290 = root || request.c( 'GameController' )
  var i2291 = data
  i2290.OnClick = request.d('System.Action', i2291[0], i2290.OnClick)
  i2290.left = request.d('Option', i2291[1], i2290.left)
  i2290.right = request.d('Option', i2291[2], i2290.right)
  request.r(i2291[3], i2291[4], 0, i2290, 'effect')
  request.r(i2291[5], i2291[6], 0, i2290, 'Tut')
  i2290.stop = !!i2291[7]
  return i2290
}

Deserializers["System.Action"] = function (request, data, root) {
  var i2292 = root || request.c( 'System.Action' )
  var i2293 = data
  return i2292
}

Deserializers["Option"] = function (request, data, root) {
  var i2294 = root || request.c( 'Option' )
  var i2295 = data
  request.r(i2295[0], i2295[1], 0, i2294, 'Button')
  request.r(i2295[2], i2295[3], 0, i2294, 'Item')
  request.r(i2295[4], i2295[5], 0, i2294, 'Anim')
  return i2294
}

Deserializers["LunaController"] = function (request, data, root) {
  var i2296 = root || request.c( 'LunaController' )
  var i2297 = data
  i2296.ShowEndCard = !!i2297[0]
  i2296.UseMaxClick = !!i2297[1]
  i2296.MaxClick = i2297[2]
  i2296.TimePlay = i2297[3]
  var i2299 = i2297[4]
  var i2298 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i2299.length; i += 2) {
  request.r(i2299[i + 0], i2299[i + 1], 1, i2298, '')
  }
  i2296.CTA = i2298
  request.r(i2297[5], i2297[6], 0, i2296, 'endCard')
  return i2296
}

Deserializers["AudioController"] = function (request, data, root) {
  var i2302 = root || request.c( 'AudioController' )
  var i2303 = data
  i2302.MVolume = i2303[0]
  request.r(i2303[1], i2303[2], 0, i2302, 'BGM')
  request.r(i2303[3], i2303[4], 0, i2302, 'clickClip')
  request.r(i2303[5], i2303[6], 0, i2302, 'effectClip')
  request.r(i2303[7], i2303[8], 0, i2302, 'musicSource')
  request.r(i2303[9], i2303[10], 0, i2302, 'poolParent')
  i2302.startPoolSize = i2303[11]
  return i2302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2305 = data
  request.r(i2305[0], i2305[1], 0, i2304, 'clip')
  request.r(i2305[2], i2305[3], 0, i2304, 'outputAudioMixerGroup')
  i2304.playOnAwake = !!i2305[4]
  i2304.loop = !!i2305[5]
  i2304.time = i2305[6]
  i2304.volume = i2305[7]
  i2304.pitch = i2305[8]
  i2304.enabled = !!i2305[9]
  return i2304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2307 = data
  i2306.ambientIntensity = i2307[0]
  i2306.reflectionIntensity = i2307[1]
  i2306.ambientMode = i2307[2]
  i2306.ambientLight = new pc.Color(i2307[3], i2307[4], i2307[5], i2307[6])
  i2306.ambientSkyColor = new pc.Color(i2307[7], i2307[8], i2307[9], i2307[10])
  i2306.ambientGroundColor = new pc.Color(i2307[11], i2307[12], i2307[13], i2307[14])
  i2306.ambientEquatorColor = new pc.Color(i2307[15], i2307[16], i2307[17], i2307[18])
  i2306.fogColor = new pc.Color(i2307[19], i2307[20], i2307[21], i2307[22])
  i2306.fogEndDistance = i2307[23]
  i2306.fogStartDistance = i2307[24]
  i2306.fogDensity = i2307[25]
  i2306.fog = !!i2307[26]
  request.r(i2307[27], i2307[28], 0, i2306, 'skybox')
  i2306.fogMode = i2307[29]
  var i2309 = i2307[30]
  var i2308 = []
  for(var i = 0; i < i2309.length; i += 1) {
    i2308.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2309[i + 0]) );
  }
  i2306.lightmaps = i2308
  i2306.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2307[31], i2306.lightProbes)
  i2306.lightmapsMode = i2307[32]
  i2306.mixedBakeMode = i2307[33]
  i2306.environmentLightingMode = i2307[34]
  i2306.ambientProbe = new pc.SphericalHarmonicsL2(i2307[35])
  request.r(i2307[36], i2307[37], 0, i2306, 'customReflection')
  request.r(i2307[38], i2307[39], 0, i2306, 'defaultReflection')
  i2306.defaultReflectionMode = i2307[40]
  i2306.defaultReflectionResolution = i2307[41]
  i2306.sunLightObjectId = i2307[42]
  i2306.pixelLightCount = i2307[43]
  i2306.defaultReflectionHDR = !!i2307[44]
  i2306.hasLightDataAsset = !!i2307[45]
  i2306.hasManualGenerate = !!i2307[46]
  return i2306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2313 = data
  request.r(i2313[0], i2313[1], 0, i2312, 'lightmapColor')
  request.r(i2313[2], i2313[3], 0, i2312, 'lightmapDirection')
  request.r(i2313[4], i2313[5], 0, i2312, 'shadowMask')
  return i2312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2314 = root || new UnityEngine.LightProbes()
  var i2315 = data
  return i2314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2322 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2323 = data
  var i2325 = i2323[0]
  var i2324 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2325.length; i += 1) {
    i2324.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2325[i + 0]));
  }
  i2322.ShaderCompilationErrors = i2324
  i2322.name = i2323[1]
  i2322.guid = i2323[2]
  var i2327 = i2323[3]
  var i2326 = []
  for(var i = 0; i < i2327.length; i += 1) {
    i2326.push( i2327[i + 0] );
  }
  i2322.shaderDefinedKeywords = i2326
  var i2329 = i2323[4]
  var i2328 = []
  for(var i = 0; i < i2329.length; i += 1) {
    i2328.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2329[i + 0]) );
  }
  i2322.passes = i2328
  var i2331 = i2323[5]
  var i2330 = []
  for(var i = 0; i < i2331.length; i += 1) {
    i2330.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2331[i + 0]) );
  }
  i2322.usePasses = i2330
  var i2333 = i2323[6]
  var i2332 = []
  for(var i = 0; i < i2333.length; i += 1) {
    i2332.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2333[i + 0]) );
  }
  i2322.defaultParameterValues = i2332
  request.r(i2323[7], i2323[8], 0, i2322, 'unityFallbackShader')
  i2322.readDepth = !!i2323[9]
  i2322.hasDepthOnlyPass = !!i2323[10]
  i2322.isCreatedByShaderGraph = !!i2323[11]
  i2322.disableBatching = !!i2323[12]
  i2322.compiled = !!i2323[13]
  return i2322
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2336 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2337 = data
  i2336.shaderName = i2337[0]
  i2336.errorMessage = i2337[1]
  return i2336
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2340 = root || new pc.UnityShaderPass()
  var i2341 = data
  i2340.id = i2341[0]
  i2340.subShaderIndex = i2341[1]
  i2340.name = i2341[2]
  i2340.passType = i2341[3]
  i2340.grabPassTextureName = i2341[4]
  i2340.usePass = !!i2341[5]
  i2340.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[6], i2340.zTest)
  i2340.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[7], i2340.zWrite)
  i2340.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[8], i2340.culling)
  i2340.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2341[9], i2340.blending)
  i2340.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2341[10], i2340.alphaBlending)
  i2340.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[11], i2340.colorWriteMask)
  i2340.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[12], i2340.offsetUnits)
  i2340.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[13], i2340.offsetFactor)
  i2340.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[14], i2340.stencilRef)
  i2340.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[15], i2340.stencilReadMask)
  i2340.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2341[16], i2340.stencilWriteMask)
  i2340.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2341[17], i2340.stencilOp)
  i2340.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2341[18], i2340.stencilOpFront)
  i2340.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2341[19], i2340.stencilOpBack)
  var i2343 = i2341[20]
  var i2342 = []
  for(var i = 0; i < i2343.length; i += 1) {
    i2342.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2343[i + 0]) );
  }
  i2340.tags = i2342
  var i2345 = i2341[21]
  var i2344 = []
  for(var i = 0; i < i2345.length; i += 1) {
    i2344.push( i2345[i + 0] );
  }
  i2340.passDefinedKeywords = i2344
  var i2347 = i2341[22]
  var i2346 = []
  for(var i = 0; i < i2347.length; i += 1) {
    i2346.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2347[i + 0]) );
  }
  i2340.passDefinedKeywordGroups = i2346
  var i2349 = i2341[23]
  var i2348 = []
  for(var i = 0; i < i2349.length; i += 1) {
    i2348.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2349[i + 0]) );
  }
  i2340.variants = i2348
  var i2351 = i2341[24]
  var i2350 = []
  for(var i = 0; i < i2351.length; i += 1) {
    i2350.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2351[i + 0]) );
  }
  i2340.excludedVariants = i2350
  i2340.hasDepthReader = !!i2341[25]
  return i2340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2352 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2353 = data
  i2352.val = i2353[0]
  i2352.name = i2353[1]
  return i2352
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2355 = data
  i2354.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2355[0], i2354.src)
  i2354.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2355[1], i2354.dst)
  i2354.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2355[2], i2354.op)
  return i2354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2357 = data
  i2356.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2357[0], i2356.pass)
  i2356.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2357[1], i2356.fail)
  i2356.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2357[2], i2356.zFail)
  i2356.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2357[3], i2356.comp)
  return i2356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2361 = data
  i2360.name = i2361[0]
  i2360.value = i2361[1]
  return i2360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2365 = data
  var i2367 = i2365[0]
  var i2366 = []
  for(var i = 0; i < i2367.length; i += 1) {
    i2366.push( i2367[i + 0] );
  }
  i2364.keywords = i2366
  i2364.hasDiscard = !!i2365[1]
  return i2364
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2370 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2371 = data
  i2370.passId = i2371[0]
  i2370.subShaderIndex = i2371[1]
  var i2373 = i2371[2]
  var i2372 = []
  for(var i = 0; i < i2373.length; i += 1) {
    i2372.push( i2373[i + 0] );
  }
  i2370.keywords = i2372
  i2370.vertexProgram = i2371[3]
  i2370.fragmentProgram = i2371[4]
  i2370.exportedForWebGl2 = !!i2371[5]
  i2370.readDepth = !!i2371[6]
  return i2370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2377 = data
  request.r(i2377[0], i2377[1], 0, i2376, 'shader')
  i2376.pass = i2377[2]
  return i2376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2381 = data
  i2380.name = i2381[0]
  i2380.type = i2381[1]
  i2380.value = new pc.Vec4( i2381[2], i2381[3], i2381[4], i2381[5] )
  i2380.textureValue = i2381[6]
  i2380.shaderPropertyFlag = i2381[7]
  return i2380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2382 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2383 = data
  i2382.name = i2383[0]
  request.r(i2383[1], i2383[2], 0, i2382, 'texture')
  i2382.aabb = i2383[3]
  i2382.vertices = i2383[4]
  i2382.triangles = i2383[5]
  i2382.textureRect = UnityEngine.Rect.MinMaxRect(i2383[6], i2383[7], i2383[8], i2383[9])
  i2382.packedRect = UnityEngine.Rect.MinMaxRect(i2383[10], i2383[11], i2383[12], i2383[13])
  i2382.border = new pc.Vec4( i2383[14], i2383[15], i2383[16], i2383[17] )
  i2382.transparency = i2383[18]
  i2382.bounds = i2383[19]
  i2382.pixelsPerUnit = i2383[20]
  i2382.textureWidth = i2383[21]
  i2382.textureHeight = i2383[22]
  i2382.nativeSize = new pc.Vec2( i2383[23], i2383[24] )
  i2382.pivot = new pc.Vec2( i2383[25], i2383[26] )
  i2382.textureRectOffset = new pc.Vec2( i2383[27], i2383[28] )
  return i2382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2385 = data
  i2384.name = i2385[0]
  return i2384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2387 = data
  i2386.name = i2387[0]
  i2386.bytes64 = i2387[1]
  i2386.data = i2387[2]
  return i2386
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2388 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2389 = data
  i2388.normalStyle = i2389[0]
  i2388.normalSpacingOffset = i2389[1]
  i2388.boldStyle = i2389[2]
  i2388.boldSpacing = i2389[3]
  i2388.italicStyle = i2389[4]
  i2388.tabSize = i2389[5]
  request.r(i2389[6], i2389[7], 0, i2388, 'atlas')
  i2388.m_SourceFontFileGUID = i2389[8]
  i2388.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2389[9], i2388.m_CreationSettings)
  request.r(i2389[10], i2389[11], 0, i2388, 'm_SourceFontFile')
  i2388.m_SourceFontFilePath = i2389[12]
  i2388.m_AtlasPopulationMode = i2389[13]
  i2388.InternalDynamicOS = !!i2389[14]
  var i2391 = i2389[15]
  var i2390 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2391.length; i += 1) {
    i2390.add(request.d('UnityEngine.TextCore.Glyph', i2391[i + 0]));
  }
  i2388.m_GlyphTable = i2390
  var i2393 = i2389[16]
  var i2392 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2393.length; i += 1) {
    i2392.add(request.d('TMPro.TMP_Character', i2393[i + 0]));
  }
  i2388.m_CharacterTable = i2392
  var i2395 = i2389[17]
  var i2394 = []
  for(var i = 0; i < i2395.length; i += 2) {
  request.r(i2395[i + 0], i2395[i + 1], 2, i2394, '')
  }
  i2388.m_AtlasTextures = i2394
  i2388.m_AtlasTextureIndex = i2389[18]
  i2388.m_IsMultiAtlasTexturesEnabled = !!i2389[19]
  i2388.m_GetFontFeatures = !!i2389[20]
  i2388.m_ClearDynamicDataOnBuild = !!i2389[21]
  i2388.m_AtlasWidth = i2389[22]
  i2388.m_AtlasHeight = i2389[23]
  i2388.m_AtlasPadding = i2389[24]
  i2388.m_AtlasRenderMode = i2389[25]
  var i2397 = i2389[26]
  var i2396 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2397.length; i += 1) {
    i2396.add(request.d('UnityEngine.TextCore.GlyphRect', i2397[i + 0]));
  }
  i2388.m_UsedGlyphRects = i2396
  var i2399 = i2389[27]
  var i2398 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2399.length; i += 1) {
    i2398.add(request.d('UnityEngine.TextCore.GlyphRect', i2399[i + 0]));
  }
  i2388.m_FreeGlyphRects = i2398
  i2388.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2389[28], i2388.m_FontFeatureTable)
  i2388.m_ShouldReimportFontFeatures = !!i2389[29]
  var i2401 = i2389[30]
  var i2400 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2401.length; i += 2) {
  request.r(i2401[i + 0], i2401[i + 1], 1, i2400, '')
  }
  i2388.m_FallbackFontAssetTable = i2400
  var i2403 = i2389[31]
  var i2402 = []
  for(var i = 0; i < i2403.length; i += 1) {
    i2402.push( request.d('TMPro.TMP_FontWeightPair', i2403[i + 0]) );
  }
  i2388.m_FontWeightTable = i2402
  var i2405 = i2389[32]
  var i2404 = []
  for(var i = 0; i < i2405.length; i += 1) {
    i2404.push( request.d('TMPro.TMP_FontWeightPair', i2405[i + 0]) );
  }
  i2388.fontWeights = i2404
  i2388.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2389[33], i2388.m_fontInfo)
  var i2407 = i2389[34]
  var i2406 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2407.length; i += 1) {
    i2406.add(request.d('TMPro.TMP_Glyph', i2407[i + 0]));
  }
  i2388.m_glyphInfoList = i2406
  i2388.m_KerningTable = request.d('TMPro.KerningTable', i2389[35], i2388.m_KerningTable)
  var i2409 = i2389[36]
  var i2408 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2409.length; i += 2) {
  request.r(i2409[i + 0], i2409[i + 1], 1, i2408, '')
  }
  i2388.fallbackFontAssets = i2408
  i2388.m_Version = i2389[37]
  i2388.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2389[38], i2388.m_FaceInfo)
  request.r(i2389[39], i2389[40], 0, i2388, 'm_Material')
  return i2388
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2410 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2411 = data
  i2410.sourceFontFileName = i2411[0]
  i2410.sourceFontFileGUID = i2411[1]
  i2410.faceIndex = i2411[2]
  i2410.pointSizeSamplingMode = i2411[3]
  i2410.pointSize = i2411[4]
  i2410.padding = i2411[5]
  i2410.paddingMode = i2411[6]
  i2410.packingMode = i2411[7]
  i2410.atlasWidth = i2411[8]
  i2410.atlasHeight = i2411[9]
  i2410.characterSetSelectionMode = i2411[10]
  i2410.characterSequence = i2411[11]
  i2410.referencedFontAssetGUID = i2411[12]
  i2410.referencedTextAssetGUID = i2411[13]
  i2410.fontStyle = i2411[14]
  i2410.fontStyleModifier = i2411[15]
  i2410.renderMode = i2411[16]
  i2410.includeFontFeatures = !!i2411[17]
  return i2410
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2414 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2415 = data
  i2414.m_Index = i2415[0]
  i2414.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2415[1], i2414.m_Metrics)
  i2414.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2415[2], i2414.m_GlyphRect)
  i2414.m_Scale = i2415[3]
  i2414.m_AtlasIndex = i2415[4]
  i2414.m_ClassDefinitionType = i2415[5]
  return i2414
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2416 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2417 = data
  i2416.m_Width = i2417[0]
  i2416.m_Height = i2417[1]
  i2416.m_HorizontalBearingX = i2417[2]
  i2416.m_HorizontalBearingY = i2417[3]
  i2416.m_HorizontalAdvance = i2417[4]
  return i2416
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2418 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2419 = data
  i2418.m_X = i2419[0]
  i2418.m_Y = i2419[1]
  i2418.m_Width = i2419[2]
  i2418.m_Height = i2419[3]
  return i2418
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2422 = root || request.c( 'TMPro.TMP_Character' )
  var i2423 = data
  i2422.m_ElementType = i2423[0]
  i2422.m_Unicode = i2423[1]
  i2422.m_GlyphIndex = i2423[2]
  i2422.m_Scale = i2423[3]
  return i2422
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2428 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2429 = data
  var i2431 = i2429[0]
  var i2430 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2431.length; i += 1) {
    i2430.add(request.d('TMPro.MultipleSubstitutionRecord', i2431[i + 0]));
  }
  i2428.m_MultipleSubstitutionRecords = i2430
  var i2433 = i2429[1]
  var i2432 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2433.length; i += 1) {
    i2432.add(request.d('TMPro.LigatureSubstitutionRecord', i2433[i + 0]));
  }
  i2428.m_LigatureSubstitutionRecords = i2432
  var i2435 = i2429[2]
  var i2434 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2435.length; i += 1) {
    i2434.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2435[i + 0]));
  }
  i2428.m_GlyphPairAdjustmentRecords = i2434
  var i2437 = i2429[3]
  var i2436 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2437.length; i += 1) {
    i2436.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2437[i + 0]));
  }
  i2428.m_MarkToBaseAdjustmentRecords = i2436
  var i2439 = i2429[4]
  var i2438 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2439.length; i += 1) {
    i2438.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2439[i + 0]));
  }
  i2428.m_MarkToMarkAdjustmentRecords = i2438
  return i2428
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2442 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2443 = data
  i2442.m_TargetGlyphID = i2443[0]
  i2442.m_SubstituteGlyphIDs = i2443[1]
  return i2442
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2446 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2447 = data
  i2446.m_ComponentGlyphIDs = i2447[0]
  i2446.m_LigatureGlyphID = i2447[1]
  return i2446
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2450 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2451 = data
  i2450.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2451[0], i2450.m_FirstAdjustmentRecord)
  i2450.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2451[1], i2450.m_SecondAdjustmentRecord)
  i2450.m_FeatureLookupFlags = i2451[2]
  return i2450
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2454 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2455 = data
  i2454.m_BaseGlyphID = i2455[0]
  i2454.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2455[1], i2454.m_BaseGlyphAnchorPoint)
  i2454.m_MarkGlyphID = i2455[2]
  i2454.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2455[3], i2454.m_MarkPositionAdjustment)
  return i2454
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2458 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2459 = data
  i2458.m_BaseMarkGlyphID = i2459[0]
  i2458.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2459[1], i2458.m_BaseMarkGlyphAnchorPoint)
  i2458.m_CombiningMarkGlyphID = i2459[2]
  i2458.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2459[3], i2458.m_CombiningMarkPositionAdjustment)
  return i2458
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2464 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2465 = data
  request.r(i2465[0], i2465[1], 0, i2464, 'regularTypeface')
  request.r(i2465[2], i2465[3], 0, i2464, 'italicTypeface')
  return i2464
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2466 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2467 = data
  i2466.Name = i2467[0]
  i2466.PointSize = i2467[1]
  i2466.Scale = i2467[2]
  i2466.CharacterCount = i2467[3]
  i2466.LineHeight = i2467[4]
  i2466.Baseline = i2467[5]
  i2466.Ascender = i2467[6]
  i2466.CapHeight = i2467[7]
  i2466.Descender = i2467[8]
  i2466.CenterLine = i2467[9]
  i2466.SuperscriptOffset = i2467[10]
  i2466.SubscriptOffset = i2467[11]
  i2466.SubSize = i2467[12]
  i2466.Underline = i2467[13]
  i2466.UnderlineThickness = i2467[14]
  i2466.strikethrough = i2467[15]
  i2466.strikethroughThickness = i2467[16]
  i2466.TabWidth = i2467[17]
  i2466.Padding = i2467[18]
  i2466.AtlasWidth = i2467[19]
  i2466.AtlasHeight = i2467[20]
  return i2466
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2470 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2471 = data
  i2470.id = i2471[0]
  i2470.x = i2471[1]
  i2470.y = i2471[2]
  i2470.width = i2471[3]
  i2470.height = i2471[4]
  i2470.xOffset = i2471[5]
  i2470.yOffset = i2471[6]
  i2470.xAdvance = i2471[7]
  i2470.scale = i2471[8]
  return i2470
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2472 = root || request.c( 'TMPro.KerningTable' )
  var i2473 = data
  var i2475 = i2473[0]
  var i2474 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2475.length; i += 1) {
    i2474.add(request.d('TMPro.KerningPair', i2475[i + 0]));
  }
  i2472.kerningPairs = i2474
  return i2472
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2478 = root || request.c( 'TMPro.KerningPair' )
  var i2479 = data
  i2478.xOffset = i2479[0]
  i2478.m_FirstGlyph = i2479[1]
  i2478.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2479[2], i2478.m_FirstGlyphAdjustments)
  i2478.m_SecondGlyph = i2479[3]
  i2478.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2479[4], i2478.m_SecondGlyphAdjustments)
  i2478.m_IgnoreSpacingAdjustments = !!i2479[5]
  return i2478
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2480 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2481 = data
  i2480.m_FaceIndex = i2481[0]
  i2480.m_FamilyName = i2481[1]
  i2480.m_StyleName = i2481[2]
  i2480.m_PointSize = i2481[3]
  i2480.m_Scale = i2481[4]
  i2480.m_UnitsPerEM = i2481[5]
  i2480.m_LineHeight = i2481[6]
  i2480.m_AscentLine = i2481[7]
  i2480.m_CapLine = i2481[8]
  i2480.m_MeanLine = i2481[9]
  i2480.m_Baseline = i2481[10]
  i2480.m_DescentLine = i2481[11]
  i2480.m_SuperscriptOffset = i2481[12]
  i2480.m_SuperscriptSize = i2481[13]
  i2480.m_SubscriptOffset = i2481[14]
  i2480.m_SubscriptSize = i2481[15]
  i2480.m_UnderlineOffset = i2481[16]
  i2480.m_UnderlineThickness = i2481[17]
  i2480.m_StrikethroughOffset = i2481[18]
  i2480.m_StrikethroughThickness = i2481[19]
  i2480.m_TabWidth = i2481[20]
  return i2480
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i2482 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i2483 = data
  var i2485 = i2483[0]
  var i2484 = []
  for(var i = 0; i < i2485.length; i += 2) {
  request.r(i2485[i + 0], i2485[i + 1], 2, i2484, '')
  }
  i2482.atlasAssets = i2484
  i2482.scale = i2483[1]
  request.r(i2483[2], i2483[3], 0, i2482, 'skeletonJSON')
  i2482.isUpgradingBlendModeMaterials = !!i2483[4]
  i2482.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i2483[5], i2482.blendModeMaterials)
  var i2487 = i2483[6]
  var i2486 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i2487.length; i += 2) {
  request.r(i2487[i + 0], i2487[i + 1], 1, i2486, '')
  }
  i2482.skeletonDataModifiers = i2486
  var i2489 = i2483[7]
  var i2488 = []
  for(var i = 0; i < i2489.length; i += 1) {
    i2488.push( i2489[i + 0] );
  }
  i2482.fromAnimation = i2488
  var i2491 = i2483[8]
  var i2490 = []
  for(var i = 0; i < i2491.length; i += 1) {
    i2490.push( i2491[i + 0] );
  }
  i2482.toAnimation = i2490
  i2482.duration = i2483[9]
  i2482.defaultMix = i2483[10]
  request.r(i2483[11], i2483[12], 0, i2482, 'controller')
  return i2482
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i2494 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i2495 = data
  i2494.applyAdditiveMaterial = !!i2495[0]
  var i2497 = i2495[1]
  var i2496 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2497.length; i += 1) {
    i2496.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2497[i + 0]));
  }
  i2494.additiveMaterials = i2496
  var i2499 = i2495[2]
  var i2498 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2499.length; i += 1) {
    i2498.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2499[i + 0]));
  }
  i2494.multiplyMaterials = i2498
  var i2501 = i2495[3]
  var i2500 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i2501.length; i += 1) {
    i2500.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i2501[i + 0]));
  }
  i2494.screenMaterials = i2500
  i2494.requiresBlendModeMaterials = !!i2495[4]
  return i2494
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i2504 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i2505 = data
  i2504.pageName = i2505[0]
  request.r(i2505[1], i2505[2], 0, i2504, 'material')
  return i2504
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i2508 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i2509 = data
  request.r(i2509[0], i2509[1], 0, i2508, 'atlasFile')
  var i2511 = i2509[2]
  var i2510 = []
  for(var i = 0; i < i2511.length; i += 2) {
  request.r(i2511[i + 0], i2511[i + 1], 2, i2510, '')
  }
  i2508.materials = i2510
  i2508.textureLoadingMode = i2509[3]
  request.r(i2509[4], i2509[5], 0, i2508, 'onDemandTextureLoader')
  return i2508
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2512 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2513 = data
  i2512.useSafeMode = !!i2513[0]
  i2512.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2513[1], i2512.safeModeOptions)
  i2512.timeScale = i2513[2]
  i2512.unscaledTimeScale = i2513[3]
  i2512.useSmoothDeltaTime = !!i2513[4]
  i2512.maxSmoothUnscaledTime = i2513[5]
  i2512.rewindCallbackMode = i2513[6]
  i2512.showUnityEditorReport = !!i2513[7]
  i2512.logBehaviour = i2513[8]
  i2512.drawGizmos = !!i2513[9]
  i2512.defaultRecyclable = !!i2513[10]
  i2512.defaultAutoPlay = i2513[11]
  i2512.defaultUpdateType = i2513[12]
  i2512.defaultTimeScaleIndependent = !!i2513[13]
  i2512.defaultEaseType = i2513[14]
  i2512.defaultEaseOvershootOrAmplitude = i2513[15]
  i2512.defaultEasePeriod = i2513[16]
  i2512.defaultAutoKill = !!i2513[17]
  i2512.defaultLoopType = i2513[18]
  i2512.debugMode = !!i2513[19]
  i2512.debugStoreTargetId = !!i2513[20]
  i2512.showPreviewPanel = !!i2513[21]
  i2512.storeSettingsLocation = i2513[22]
  i2512.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2513[23], i2512.modules)
  i2512.createASMDEF = !!i2513[24]
  i2512.showPlayingTweens = !!i2513[25]
  i2512.showPausedTweens = !!i2513[26]
  return i2512
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2514 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2515 = data
  i2514.logBehaviour = i2515[0]
  i2514.nestedTweenFailureBehaviour = i2515[1]
  return i2514
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2516 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2517 = data
  i2516.showPanel = !!i2517[0]
  i2516.audioEnabled = !!i2517[1]
  i2516.physicsEnabled = !!i2517[2]
  i2516.physics2DEnabled = !!i2517[3]
  i2516.spriteEnabled = !!i2517[4]
  i2516.uiEnabled = !!i2517[5]
  i2516.textMeshProEnabled = !!i2517[6]
  i2516.tk2DEnabled = !!i2517[7]
  i2516.deAudioEnabled = !!i2517[8]
  i2516.deUnityExtendedEnabled = !!i2517[9]
  i2516.epoOutlineEnabled = !!i2517[10]
  return i2516
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2518 = root || request.c( 'TMPro.TMP_Settings' )
  var i2519 = data
  i2518.assetVersion = i2519[0]
  i2518.m_TextWrappingMode = i2519[1]
  i2518.m_enableKerning = !!i2519[2]
  var i2521 = i2519[3]
  var i2520 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2521.length; i += 1) {
    i2520.add(i2521[i + 0]);
  }
  i2518.m_ActiveFontFeatures = i2520
  i2518.m_enableExtraPadding = !!i2519[4]
  i2518.m_enableTintAllSprites = !!i2519[5]
  i2518.m_enableParseEscapeCharacters = !!i2519[6]
  i2518.m_EnableRaycastTarget = !!i2519[7]
  i2518.m_GetFontFeaturesAtRuntime = !!i2519[8]
  i2518.m_missingGlyphCharacter = i2519[9]
  i2518.m_ClearDynamicDataOnBuild = !!i2519[10]
  i2518.m_warningsDisabled = !!i2519[11]
  request.r(i2519[12], i2519[13], 0, i2518, 'm_defaultFontAsset')
  i2518.m_defaultFontAssetPath = i2519[14]
  i2518.m_defaultFontSize = i2519[15]
  i2518.m_defaultAutoSizeMinRatio = i2519[16]
  i2518.m_defaultAutoSizeMaxRatio = i2519[17]
  i2518.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2519[18], i2519[19] )
  i2518.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2519[20], i2519[21] )
  i2518.m_autoSizeTextContainer = !!i2519[22]
  i2518.m_IsTextObjectScaleStatic = !!i2519[23]
  var i2523 = i2519[24]
  var i2522 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2523.length; i += 2) {
  request.r(i2523[i + 0], i2523[i + 1], 1, i2522, '')
  }
  i2518.m_fallbackFontAssets = i2522
  i2518.m_matchMaterialPreset = !!i2519[25]
  i2518.m_HideSubTextObjects = !!i2519[26]
  request.r(i2519[27], i2519[28], 0, i2518, 'm_defaultSpriteAsset')
  i2518.m_defaultSpriteAssetPath = i2519[29]
  i2518.m_enableEmojiSupport = !!i2519[30]
  i2518.m_MissingCharacterSpriteUnicode = i2519[31]
  var i2525 = i2519[32]
  var i2524 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2525.length; i += 2) {
  request.r(i2525[i + 0], i2525[i + 1], 1, i2524, '')
  }
  i2518.m_EmojiFallbackTextAssets = i2524
  i2518.m_defaultColorGradientPresetsPath = i2519[33]
  request.r(i2519[34], i2519[35], 0, i2518, 'm_defaultStyleSheet')
  i2518.m_StyleSheetsResourcePath = i2519[36]
  request.r(i2519[37], i2519[38], 0, i2518, 'm_leadingCharacters')
  request.r(i2519[39], i2519[40], 0, i2518, 'm_followingCharacters')
  i2518.m_UseModernHangulLineBreakingRules = !!i2519[41]
  return i2518
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2528 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2529 = data
  request.r(i2529[0], i2529[1], 0, i2528, 'spriteSheet')
  var i2531 = i2529[2]
  var i2530 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2531.length; i += 1) {
    i2530.add(request.d('TMPro.TMP_Sprite', i2531[i + 0]));
  }
  i2528.spriteInfoList = i2530
  var i2533 = i2529[3]
  var i2532 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2533.length; i += 2) {
  request.r(i2533[i + 0], i2533[i + 1], 1, i2532, '')
  }
  i2528.fallbackSpriteAssets = i2532
  var i2535 = i2529[4]
  var i2534 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2535.length; i += 1) {
    i2534.add(request.d('TMPro.TMP_SpriteCharacter', i2535[i + 0]));
  }
  i2528.m_SpriteCharacterTable = i2534
  var i2537 = i2529[5]
  var i2536 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2537.length; i += 1) {
    i2536.add(request.d('TMPro.TMP_SpriteGlyph', i2537[i + 0]));
  }
  i2528.m_GlyphTable = i2536
  i2528.m_Version = i2529[6]
  i2528.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2529[7], i2528.m_FaceInfo)
  request.r(i2529[8], i2529[9], 0, i2528, 'm_Material')
  return i2528
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2540 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2541 = data
  i2540.name = i2541[0]
  i2540.hashCode = i2541[1]
  i2540.unicode = i2541[2]
  i2540.pivot = new pc.Vec2( i2541[3], i2541[4] )
  request.r(i2541[5], i2541[6], 0, i2540, 'sprite')
  i2540.id = i2541[7]
  i2540.x = i2541[8]
  i2540.y = i2541[9]
  i2540.width = i2541[10]
  i2540.height = i2541[11]
  i2540.xOffset = i2541[12]
  i2540.yOffset = i2541[13]
  i2540.xAdvance = i2541[14]
  i2540.scale = i2541[15]
  return i2540
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2546 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2547 = data
  i2546.m_Name = i2547[0]
  i2546.m_ElementType = i2547[1]
  i2546.m_Unicode = i2547[2]
  i2546.m_GlyphIndex = i2547[3]
  i2546.m_Scale = i2547[4]
  return i2546
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2550 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2551 = data
  request.r(i2551[0], i2551[1], 0, i2550, 'sprite')
  i2550.m_Index = i2551[2]
  i2550.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2551[3], i2550.m_Metrics)
  i2550.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2551[4], i2550.m_GlyphRect)
  i2550.m_Scale = i2551[5]
  i2550.m_AtlasIndex = i2551[6]
  i2550.m_ClassDefinitionType = i2551[7]
  return i2550
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2552 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2553 = data
  var i2555 = i2553[0]
  var i2554 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2555.length; i += 1) {
    i2554.add(request.d('TMPro.TMP_Style', i2555[i + 0]));
  }
  i2552.m_StyleList = i2554
  return i2552
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2558 = root || request.c( 'TMPro.TMP_Style' )
  var i2559 = data
  i2558.m_Name = i2559[0]
  i2558.m_HashCode = i2559[1]
  i2558.m_OpeningDefinition = i2559[2]
  i2558.m_ClosingDefinition = i2559[3]
  i2558.m_OpeningTagArray = i2559[4]
  i2558.m_ClosingTagArray = i2559[5]
  return i2558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2561 = data
  var i2563 = i2561[0]
  var i2562 = []
  for(var i = 0; i < i2563.length; i += 1) {
    i2562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2563[i + 0]) );
  }
  i2560.files = i2562
  i2560.componentToPrefabIds = i2561[1]
  return i2560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2567 = data
  i2566.path = i2567[0]
  request.r(i2567[1], i2567[2], 0, i2566, 'unityObject')
  return i2566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2569 = data
  var i2571 = i2569[0]
  var i2570 = []
  for(var i = 0; i < i2571.length; i += 1) {
    i2570.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2571[i + 0]) );
  }
  i2568.scriptsExecutionOrder = i2570
  var i2573 = i2569[1]
  var i2572 = []
  for(var i = 0; i < i2573.length; i += 1) {
    i2572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2573[i + 0]) );
  }
  i2568.sortingLayers = i2572
  var i2575 = i2569[2]
  var i2574 = []
  for(var i = 0; i < i2575.length; i += 1) {
    i2574.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2575[i + 0]) );
  }
  i2568.cullingLayers = i2574
  i2568.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2569[3], i2568.timeSettings)
  i2568.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2569[4], i2568.physicsSettings)
  i2568.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2569[5], i2568.physics2DSettings)
  i2568.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2569[6], i2568.qualitySettings)
  i2568.enableRealtimeShadows = !!i2569[7]
  i2568.enableAutoInstancing = !!i2569[8]
  i2568.enableStaticBatching = !!i2569[9]
  i2568.enableDynamicBatching = !!i2569[10]
  i2568.usePreservativeDynamicBatching = !!i2569[11]
  i2568.lightmapEncodingQuality = i2569[12]
  i2568.desiredColorSpace = i2569[13]
  var i2577 = i2569[14]
  var i2576 = []
  for(var i = 0; i < i2577.length; i += 1) {
    i2576.push( i2577[i + 0] );
  }
  i2568.allTags = i2576
  return i2568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2581 = data
  i2580.name = i2581[0]
  i2580.value = i2581[1]
  return i2580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2585 = data
  i2584.id = i2585[0]
  i2584.name = i2585[1]
  i2584.value = i2585[2]
  return i2584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2589 = data
  i2588.id = i2589[0]
  i2588.name = i2589[1]
  return i2588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2591 = data
  i2590.fixedDeltaTime = i2591[0]
  i2590.maximumDeltaTime = i2591[1]
  i2590.timeScale = i2591[2]
  i2590.maximumParticleTimestep = i2591[3]
  return i2590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2593 = data
  i2592.gravity = new pc.Vec3( i2593[0], i2593[1], i2593[2] )
  i2592.defaultSolverIterations = i2593[3]
  i2592.bounceThreshold = i2593[4]
  i2592.autoSyncTransforms = !!i2593[5]
  i2592.autoSimulation = !!i2593[6]
  var i2595 = i2593[7]
  var i2594 = []
  for(var i = 0; i < i2595.length; i += 1) {
    i2594.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2595[i + 0]) );
  }
  i2592.collisionMatrix = i2594
  return i2592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2599 = data
  i2598.enabled = !!i2599[0]
  i2598.layerId = i2599[1]
  i2598.otherLayerId = i2599[2]
  return i2598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2601 = data
  request.r(i2601[0], i2601[1], 0, i2600, 'material')
  i2600.gravity = new pc.Vec2( i2601[2], i2601[3] )
  i2600.positionIterations = i2601[4]
  i2600.velocityIterations = i2601[5]
  i2600.velocityThreshold = i2601[6]
  i2600.maxLinearCorrection = i2601[7]
  i2600.maxAngularCorrection = i2601[8]
  i2600.maxTranslationSpeed = i2601[9]
  i2600.maxRotationSpeed = i2601[10]
  i2600.baumgarteScale = i2601[11]
  i2600.baumgarteTOIScale = i2601[12]
  i2600.timeToSleep = i2601[13]
  i2600.linearSleepTolerance = i2601[14]
  i2600.angularSleepTolerance = i2601[15]
  i2600.defaultContactOffset = i2601[16]
  i2600.autoSimulation = !!i2601[17]
  i2600.queriesHitTriggers = !!i2601[18]
  i2600.queriesStartInColliders = !!i2601[19]
  i2600.callbacksOnDisable = !!i2601[20]
  i2600.reuseCollisionCallbacks = !!i2601[21]
  i2600.autoSyncTransforms = !!i2601[22]
  var i2603 = i2601[23]
  var i2602 = []
  for(var i = 0; i < i2603.length; i += 1) {
    i2602.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2603[i + 0]) );
  }
  i2600.collisionMatrix = i2602
  return i2600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2607 = data
  i2606.enabled = !!i2607[0]
  i2606.layerId = i2607[1]
  i2606.otherLayerId = i2607[2]
  return i2606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2609 = data
  var i2611 = i2609[0]
  var i2610 = []
  for(var i = 0; i < i2611.length; i += 1) {
    i2610.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2611[i + 0]) );
  }
  i2608.qualityLevels = i2610
  var i2613 = i2609[1]
  var i2612 = []
  for(var i = 0; i < i2613.length; i += 1) {
    i2612.push( i2613[i + 0] );
  }
  i2608.names = i2612
  i2608.shadows = i2609[2]
  i2608.anisotropicFiltering = i2609[3]
  i2608.antiAliasing = i2609[4]
  i2608.lodBias = i2609[5]
  i2608.shadowCascades = i2609[6]
  i2608.shadowDistance = i2609[7]
  i2608.shadowmaskMode = i2609[8]
  i2608.shadowProjection = i2609[9]
  i2608.shadowResolution = i2609[10]
  i2608.softParticles = !!i2609[11]
  i2608.softVegetation = !!i2609[12]
  i2608.activeColorSpace = i2609[13]
  i2608.desiredColorSpace = i2609[14]
  i2608.masterTextureLimit = i2609[15]
  i2608.maxQueuedFrames = i2609[16]
  i2608.particleRaycastBudget = i2609[17]
  i2608.pixelLightCount = i2609[18]
  i2608.realtimeReflectionProbes = !!i2609[19]
  i2608.shadowCascade2Split = i2609[20]
  i2608.shadowCascade4Split = new pc.Vec3( i2609[21], i2609[22], i2609[23] )
  i2608.streamingMipmapsActive = !!i2609[24]
  i2608.vSyncCount = i2609[25]
  i2608.asyncUploadBufferSize = i2609[26]
  i2608.asyncUploadTimeSlice = i2609[27]
  i2608.billboardsFaceCameraPosition = !!i2609[28]
  i2608.shadowNearPlaneOffset = i2609[29]
  i2608.streamingMipmapsMemoryBudget = i2609[30]
  i2608.maximumLODLevel = i2609[31]
  i2608.streamingMipmapsAddAllCameras = !!i2609[32]
  i2608.streamingMipmapsMaxLevelReduction = i2609[33]
  i2608.streamingMipmapsRenderersPerFrame = i2609[34]
  i2608.resolutionScalingFixedDPIFactor = i2609[35]
  i2608.streamingMipmapsMaxFileIORequests = i2609[36]
  i2608.currentQualityLevel = i2609[37]
  return i2608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i2618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i2619 = data
  i2618.weight = i2619[0]
  i2618.vertices = i2619[1]
  i2618.normals = i2619[2]
  i2618.tangents = i2619[3]
  return i2618
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2620 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2621 = data
  request.r(i2621[0], i2621[1], 0, i2620, 'm_ObjectArgument')
  i2620.m_ObjectArgumentAssemblyTypeName = i2621[2]
  i2620.m_IntArgument = i2621[3]
  i2620.m_FloatArgument = i2621[4]
  i2620.m_StringArgument = i2621[5]
  i2620.m_BoolArgument = !!i2621[6]
  return i2620
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2622 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2623 = data
  i2622.m_GlyphIndex = i2623[0]
  i2622.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2623[1], i2622.m_GlyphValueRecord)
  return i2622
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2624 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2625 = data
  i2624.m_XCoordinate = i2625[0]
  i2624.m_YCoordinate = i2625[1]
  return i2624
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2626 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2627 = data
  i2626.m_XPositionAdjustment = i2627[0]
  i2626.m_YPositionAdjustment = i2627[1]
  return i2626
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2628 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2629 = data
  i2628.xPlacement = i2629[0]
  i2628.yPlacement = i2629[1]
  i2628.xAdvance = i2629[2]
  i2628.yAdvance = i2629[3]
  return i2628
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2630 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2631 = data
  i2630.m_XPlacement = i2631[0]
  i2630.m_YPlacement = i2631[1]
  i2630.m_XAdvance = i2631[2]
  i2630.m_YAdvance = i2631[3]
  return i2630
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[25],"54":[2],"55":[56],"57":[56],"58":[56],"59":[56],"60":[56],"61":[56],"62":[63],"64":[63],"65":[63],"66":[63],"67":[63],"68":[63],"69":[63],"70":[63],"71":[63],"72":[63],"73":[63],"74":[63],"75":[63],"76":[2],"77":[29],"78":[79],"80":[79],"9":[8],"81":[82],"83":[8],"84":[12,8],"30":[29],"22":[12,8],"85":[86,29],"87":[29,28],"88":[29],"89":[56],"90":[63],"91":[82],"92":[93],"94":[8],"95":[12,8],"96":[29],"97":[12,8],"98":[8],"99":[8],"100":[29,8],"13":[8,12],"101":[102],"103":[102],"104":[102],"105":[8],"106":[8],"11":[9],"18":[12,8],"107":[8],"10":[9],"108":[8],"109":[8],"110":[8],"111":[8],"112":[8],"113":[8],"114":[8],"115":[8],"116":[8],"117":[12,8],"118":[8],"119":[8],"120":[8],"121":[8],"122":[12,8],"123":[8],"124":[5],"125":[5],"6":[5],"126":[5],"127":[2],"128":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","AnimationController","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonDataAsset","UnityEngine.SpriteRenderer","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","GameController","UnityEngine.GameObject","LunaController","AudioController","UnityEngine.AudioClip","UnityEngine.AudioSource","UnityEngine.Cubemap","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonMecanim","UnityEngine.Animator","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.SkeletonRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.76f1";

Deserializers.productName = "PEOP_Luna-PEOP_V34";

Deserializers.lunaInitializationTime = "06/15/2026 03:25:00";

Deserializers.lunaDaysRunning = "1.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "PEOP_V34_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

Deserializers.projectId = "0e787593107211e4daa054ef28fc18dc";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1855";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5383";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_LunaPEOP_V34";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "1edf9c7b-acf3-40c7-bac6-69cabd20ddf2";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

