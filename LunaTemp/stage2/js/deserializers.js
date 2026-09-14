var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2100 = root || request.c( 'UnityEngine.JointSpring' )
  var i2101 = data
  i2100.spring = i2101[0]
  i2100.damper = i2101[1]
  i2100.targetPosition = i2101[2]
  return i2100
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2102 = root || request.c( 'UnityEngine.JointMotor' )
  var i2103 = data
  i2102.m_TargetVelocity = i2103[0]
  i2102.m_Force = i2103[1]
  i2102.m_FreeSpin = i2103[2]
  return i2102
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2104 = root || request.c( 'UnityEngine.JointLimits' )
  var i2105 = data
  i2104.m_Min = i2105[0]
  i2104.m_Max = i2105[1]
  i2104.m_Bounciness = i2105[2]
  i2104.m_BounceMinVelocity = i2105[3]
  i2104.m_ContactDistance = i2105[4]
  i2104.minBounce = i2105[5]
  i2104.maxBounce = i2105[6]
  return i2104
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2106 = root || request.c( 'UnityEngine.JointDrive' )
  var i2107 = data
  i2106.m_PositionSpring = i2107[0]
  i2106.m_PositionDamper = i2107[1]
  i2106.m_MaximumForce = i2107[2]
  i2106.m_UseAcceleration = i2107[3]
  return i2106
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2108 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2109 = data
  i2108.m_Spring = i2109[0]
  i2108.m_Damper = i2109[1]
  return i2108
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2110 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2111 = data
  i2110.m_Limit = i2111[0]
  i2110.m_Bounciness = i2111[1]
  i2110.m_ContactDistance = i2111[2]
  return i2110
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2112 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2113 = data
  i2112.m_ExtremumSlip = i2113[0]
  i2112.m_ExtremumValue = i2113[1]
  i2112.m_AsymptoteSlip = i2113[2]
  i2112.m_AsymptoteValue = i2113[3]
  i2112.m_Stiffness = i2113[4]
  return i2112
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2114 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2115 = data
  i2114.m_LowerAngle = i2115[0]
  i2114.m_UpperAngle = i2115[1]
  return i2114
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2116 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2117 = data
  i2116.m_MotorSpeed = i2117[0]
  i2116.m_MaximumMotorTorque = i2117[1]
  return i2116
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2118 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2119 = data
  i2118.m_DampingRatio = i2119[0]
  i2118.m_Frequency = i2119[1]
  i2118.m_Angle = i2119[2]
  return i2118
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2120 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2121 = data
  i2120.m_LowerTranslation = i2121[0]
  i2120.m_UpperTranslation = i2121[1]
  return i2120
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2122 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2123 = data
  i2122.name = i2123[0]
  i2122.width = i2123[1]
  i2122.height = i2123[2]
  i2122.mipmapCount = i2123[3]
  i2122.anisoLevel = i2123[4]
  i2122.filterMode = i2123[5]
  i2122.hdr = !!i2123[6]
  i2122.format = i2123[7]
  i2122.wrapMode = i2123[8]
  i2122.alphaIsTransparency = !!i2123[9]
  i2122.alphaSource = i2123[10]
  i2122.graphicsFormat = i2123[11]
  i2122.sRGBTexture = !!i2123[12]
  i2122.desiredColorSpace = i2123[13]
  i2122.wrapU = i2123[14]
  i2122.wrapV = i2123[15]
  return i2122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2124 = root || new pc.UnityMaterial()
  var i2125 = data
  i2124.name = i2125[0]
  request.r(i2125[1], i2125[2], 0, i2124, 'shader')
  i2124.renderQueue = i2125[3]
  i2124.enableInstancing = !!i2125[4]
  var i2127 = i2125[5]
  var i2126 = []
  for(var i = 0; i < i2127.length; i += 1) {
    i2126.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2127[i + 0]) );
  }
  i2124.floatParameters = i2126
  var i2129 = i2125[6]
  var i2128 = []
  for(var i = 0; i < i2129.length; i += 1) {
    i2128.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2129[i + 0]) );
  }
  i2124.colorParameters = i2128
  var i2131 = i2125[7]
  var i2130 = []
  for(var i = 0; i < i2131.length; i += 1) {
    i2130.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2131[i + 0]) );
  }
  i2124.vectorParameters = i2130
  var i2133 = i2125[8]
  var i2132 = []
  for(var i = 0; i < i2133.length; i += 1) {
    i2132.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2133[i + 0]) );
  }
  i2124.textureParameters = i2132
  var i2135 = i2125[9]
  var i2134 = []
  for(var i = 0; i < i2135.length; i += 1) {
    i2134.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2135[i + 0]) );
  }
  i2124.materialFlags = i2134
  return i2124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2139 = data
  i2138.name = i2139[0]
  i2138.value = i2139[1]
  return i2138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2142 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2143 = data
  i2142.name = i2143[0]
  i2142.value = new pc.Color(i2143[1], i2143[2], i2143[3], i2143[4])
  return i2142
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2146 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2147 = data
  i2146.name = i2147[0]
  i2146.value = new pc.Vec4( i2147[1], i2147[2], i2147[3], i2147[4] )
  return i2146
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2150 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2151 = data
  i2150.name = i2151[0]
  request.r(i2151[1], i2151[2], 0, i2150, 'value')
  return i2150
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2155 = data
  i2154.name = i2155[0]
  i2154.enabled = !!i2155[1]
  return i2154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2157 = data
  i2156.name = i2157[0]
  i2156.index = i2157[1]
  i2156.startup = !!i2157[2]
  return i2156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2158 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2159 = data
  i2158.aspect = i2159[0]
  i2158.orthographic = !!i2159[1]
  i2158.orthographicSize = i2159[2]
  i2158.backgroundColor = new pc.Color(i2159[3], i2159[4], i2159[5], i2159[6])
  i2158.nearClipPlane = i2159[7]
  i2158.farClipPlane = i2159[8]
  i2158.fieldOfView = i2159[9]
  i2158.depth = i2159[10]
  i2158.clearFlags = i2159[11]
  i2158.cullingMask = i2159[12]
  i2158.rect = i2159[13]
  request.r(i2159[14], i2159[15], 0, i2158, 'targetTexture')
  i2158.usePhysicalProperties = !!i2159[16]
  i2158.focalLength = i2159[17]
  i2158.sensorSize = new pc.Vec2( i2159[18], i2159[19] )
  i2158.lensShift = new pc.Vec2( i2159[20], i2159[21] )
  i2158.gateFit = i2159[22]
  i2158.commandBufferCount = i2159[23]
  i2158.cameraType = i2159[24]
  i2158.enabled = !!i2159[25]
  return i2158
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2160 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2161 = data
  i2160.name = i2161[0]
  i2160.tagId = i2161[1]
  i2160.enabled = !!i2161[2]
  i2160.isStatic = !!i2161[3]
  i2160.layer = i2161[4]
  return i2160
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2162 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2163 = data
  request.r(i2163[0], i2163[1], 0, i2162, 'm_FirstSelected')
  i2162.m_sendNavigationEvents = !!i2163[2]
  i2162.m_DragThreshold = i2163[3]
  return i2162
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2164 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2165 = data
  i2164.m_HorizontalAxis = i2165[0]
  i2164.m_VerticalAxis = i2165[1]
  i2164.m_SubmitButton = i2165[2]
  i2164.m_CancelButton = i2165[3]
  i2164.m_InputActionsPerSecond = i2165[4]
  i2164.m_RepeatDelay = i2165[5]
  i2164.m_ForceModuleActive = !!i2165[6]
  i2164.m_SendPointerHoverToParent = !!i2165[7]
  return i2164
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2166 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2167 = data
  i2166.pivot = new pc.Vec2( i2167[0], i2167[1] )
  i2166.anchorMin = new pc.Vec2( i2167[2], i2167[3] )
  i2166.anchorMax = new pc.Vec2( i2167[4], i2167[5] )
  i2166.sizeDelta = new pc.Vec2( i2167[6], i2167[7] )
  i2166.anchoredPosition3D = new pc.Vec3( i2167[8], i2167[9], i2167[10] )
  i2166.rotation = new pc.Quat(i2167[11], i2167[12], i2167[13], i2167[14])
  i2166.scale = new pc.Vec3( i2167[15], i2167[16], i2167[17] )
  return i2166
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2168 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2169 = data
  i2168.planeDistance = i2169[0]
  i2168.referencePixelsPerUnit = i2169[1]
  i2168.isFallbackOverlay = !!i2169[2]
  i2168.renderMode = i2169[3]
  i2168.renderOrder = i2169[4]
  i2168.sortingLayerName = i2169[5]
  i2168.sortingOrder = i2169[6]
  i2168.scaleFactor = i2169[7]
  request.r(i2169[8], i2169[9], 0, i2168, 'worldCamera')
  i2168.overrideSorting = !!i2169[10]
  i2168.pixelPerfect = !!i2169[11]
  i2168.targetDisplay = i2169[12]
  i2168.overridePixelPerfect = !!i2169[13]
  i2168.enabled = !!i2169[14]
  return i2168
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2170 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2171 = data
  i2170.m_UiScaleMode = i2171[0]
  i2170.m_ReferencePixelsPerUnit = i2171[1]
  i2170.m_ScaleFactor = i2171[2]
  i2170.m_ReferenceResolution = new pc.Vec2( i2171[3], i2171[4] )
  i2170.m_ScreenMatchMode = i2171[5]
  i2170.m_MatchWidthOrHeight = i2171[6]
  i2170.m_PhysicalUnit = i2171[7]
  i2170.m_FallbackScreenDPI = i2171[8]
  i2170.m_DefaultSpriteDPI = i2171[9]
  i2170.m_DynamicPixelsPerUnit = i2171[10]
  i2170.m_PresetInfoIsWorld = !!i2171[11]
  return i2170
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2172 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2173 = data
  i2172.m_IgnoreReversedGraphics = !!i2173[0]
  i2172.m_BlockingObjects = i2173[1]
  i2172.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2173[2] )
  return i2172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2174 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2175 = data
  i2174.cullTransparentMesh = !!i2175[0]
  return i2174
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i2176 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i2177 = data
  i2176.m_AspectMode = i2177[0]
  i2176.m_AspectRatio = i2177[1]
  return i2176
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i2178 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i2179 = data
  request.r(i2179[0], i2179[1], 0, i2178, 'm_Texture')
  i2178.m_UVRect = UnityEngine.Rect.MinMaxRect(i2179[2], i2179[3], i2179[4], i2179[5])
  request.r(i2179[6], i2179[7], 0, i2178, 'm_Material')
  i2178.m_Maskable = !!i2179[8]
  i2178.m_Color = new pc.Color(i2179[9], i2179[10], i2179[11], i2179[12])
  i2178.m_RaycastTarget = !!i2179[13]
  i2178.m_RaycastPadding = new pc.Vec4( i2179[14], i2179[15], i2179[16], i2179[17] )
  return i2178
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2180 = root || request.c( 'UnityEngine.UI.Image' )
  var i2181 = data
  request.r(i2181[0], i2181[1], 0, i2180, 'm_Sprite')
  i2180.m_Type = i2181[2]
  i2180.m_PreserveAspect = !!i2181[3]
  i2180.m_FillCenter = !!i2181[4]
  i2180.m_FillMethod = i2181[5]
  i2180.m_FillAmount = i2181[6]
  i2180.m_FillClockwise = !!i2181[7]
  i2180.m_FillOrigin = i2181[8]
  i2180.m_UseSpriteMesh = !!i2181[9]
  i2180.m_PixelsPerUnitMultiplier = i2181[10]
  request.r(i2181[11], i2181[12], 0, i2180, 'm_Material')
  i2180.m_Maskable = !!i2181[13]
  i2180.m_Color = new pc.Color(i2181[14], i2181[15], i2181[16], i2181[17])
  i2180.m_RaycastTarget = !!i2181[18]
  i2180.m_RaycastPadding = new pc.Vec4( i2181[19], i2181[20], i2181[21], i2181[22] )
  return i2180
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2182 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2183 = data
  i2182.m_hasFontAssetChanged = !!i2183[0]
  request.r(i2183[1], i2183[2], 0, i2182, 'm_baseMaterial')
  i2182.m_maskOffset = new pc.Vec4( i2183[3], i2183[4], i2183[5], i2183[6] )
  i2182.m_text = i2183[7]
  i2182.m_isRightToLeft = !!i2183[8]
  request.r(i2183[9], i2183[10], 0, i2182, 'm_fontAsset')
  request.r(i2183[11], i2183[12], 0, i2182, 'm_sharedMaterial')
  var i2185 = i2183[13]
  var i2184 = []
  for(var i = 0; i < i2185.length; i += 2) {
  request.r(i2185[i + 0], i2185[i + 1], 2, i2184, '')
  }
  i2182.m_fontSharedMaterials = i2184
  request.r(i2183[14], i2183[15], 0, i2182, 'm_fontMaterial')
  var i2187 = i2183[16]
  var i2186 = []
  for(var i = 0; i < i2187.length; i += 2) {
  request.r(i2187[i + 0], i2187[i + 1], 2, i2186, '')
  }
  i2182.m_fontMaterials = i2186
  i2182.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2183[17], i2183[18], i2183[19], i2183[20])
  i2182.m_fontColor = new pc.Color(i2183[21], i2183[22], i2183[23], i2183[24])
  i2182.m_enableVertexGradient = !!i2183[25]
  i2182.m_colorMode = i2183[26]
  i2182.m_fontColorGradient = request.d('TMPro.VertexGradient', i2183[27], i2182.m_fontColorGradient)
  request.r(i2183[28], i2183[29], 0, i2182, 'm_fontColorGradientPreset')
  request.r(i2183[30], i2183[31], 0, i2182, 'm_spriteAsset')
  i2182.m_tintAllSprites = !!i2183[32]
  request.r(i2183[33], i2183[34], 0, i2182, 'm_StyleSheet')
  i2182.m_TextStyleHashCode = i2183[35]
  i2182.m_overrideHtmlColors = !!i2183[36]
  i2182.m_faceColor = UnityEngine.Color32.ConstructColor(i2183[37], i2183[38], i2183[39], i2183[40])
  i2182.m_fontSize = i2183[41]
  i2182.m_fontSizeBase = i2183[42]
  i2182.m_fontWeight = i2183[43]
  i2182.m_enableAutoSizing = !!i2183[44]
  i2182.m_fontSizeMin = i2183[45]
  i2182.m_fontSizeMax = i2183[46]
  i2182.m_fontStyle = i2183[47]
  i2182.m_HorizontalAlignment = i2183[48]
  i2182.m_VerticalAlignment = i2183[49]
  i2182.m_textAlignment = i2183[50]
  i2182.m_characterSpacing = i2183[51]
  i2182.m_characterHorizontalScale = i2183[52]
  i2182.m_wordSpacing = i2183[53]
  i2182.m_lineSpacing = i2183[54]
  i2182.m_lineSpacingMax = i2183[55]
  i2182.m_paragraphSpacing = i2183[56]
  i2182.m_charWidthMaxAdj = i2183[57]
  i2182.m_TextWrappingMode = i2183[58]
  i2182.m_wordWrappingRatios = i2183[59]
  i2182.m_overflowMode = i2183[60]
  request.r(i2183[61], i2183[62], 0, i2182, 'm_linkedTextComponent')
  request.r(i2183[63], i2183[64], 0, i2182, 'parentLinkedComponent')
  i2182.m_enableKerning = !!i2183[65]
  var i2189 = i2183[66]
  var i2188 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2189.length; i += 1) {
    i2188.add(i2189[i + 0]);
  }
  i2182.m_ActiveFontFeatures = i2188
  i2182.m_enableExtraPadding = !!i2183[67]
  i2182.checkPaddingRequired = !!i2183[68]
  i2182.m_isRichText = !!i2183[69]
  i2182.m_parseCtrlCharacters = !!i2183[70]
  i2182.m_isOrthographic = !!i2183[71]
  i2182.m_isCullingEnabled = !!i2183[72]
  i2182.m_horizontalMapping = i2183[73]
  i2182.m_verticalMapping = i2183[74]
  i2182.m_uvLineOffset = i2183[75]
  i2182.m_geometrySortingOrder = i2183[76]
  i2182.m_IsTextObjectScaleStatic = !!i2183[77]
  i2182.m_VertexBufferAutoSizeReduction = !!i2183[78]
  i2182.m_useMaxVisibleDescender = !!i2183[79]
  i2182.m_pageToDisplay = i2183[80]
  i2182.m_margin = new pc.Vec4( i2183[81], i2183[82], i2183[83], i2183[84] )
  i2182.m_isUsingLegacyAnimationComponent = !!i2183[85]
  i2182.m_isVolumetricText = !!i2183[86]
  request.r(i2183[87], i2183[88], 0, i2182, 'm_Material')
  i2182.m_EmojiFallbackSupport = !!i2183[89]
  i2182.m_Maskable = !!i2183[90]
  i2182.m_Color = new pc.Color(i2183[91], i2183[92], i2183[93], i2183[94])
  i2182.m_RaycastTarget = !!i2183[95]
  i2182.m_RaycastPadding = new pc.Vec4( i2183[96], i2183[97], i2183[98], i2183[99] )
  return i2182
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2192 = root || request.c( 'TMPro.VertexGradient' )
  var i2193 = data
  i2192.topLeft = new pc.Color(i2193[0], i2193[1], i2193[2], i2193[3])
  i2192.topRight = new pc.Color(i2193[4], i2193[5], i2193[6], i2193[7])
  i2192.bottomLeft = new pc.Color(i2193[8], i2193[9], i2193[10], i2193[11])
  i2192.bottomRight = new pc.Color(i2193[12], i2193[13], i2193[14], i2193[15])
  return i2192
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i2196 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i2197 = data
  i2196.targetIsSelf = !!i2197[0]
  request.r(i2197[1], i2197[2], 0, i2196, 'targetGO')
  i2196.tweenTargetIsTargetGO = !!i2197[3]
  i2196.delay = i2197[4]
  i2196.duration = i2197[5]
  i2196.easeType = i2197[6]
  i2196.easeCurve = new pc.AnimationCurve( { keys_flow: i2197[7] } )
  i2196.loopType = i2197[8]
  i2196.loops = i2197[9]
  i2196.id = i2197[10]
  i2196.isRelative = !!i2197[11]
  i2196.isFrom = !!i2197[12]
  i2196.isIndependentUpdate = !!i2197[13]
  i2196.autoKill = !!i2197[14]
  i2196.autoGenerate = !!i2197[15]
  i2196.isActive = !!i2197[16]
  i2196.isValid = !!i2197[17]
  request.r(i2197[18], i2197[19], 0, i2196, 'target')
  i2196.animationType = i2197[20]
  i2196.targetType = i2197[21]
  i2196.forcedTargetType = i2197[22]
  i2196.autoPlay = !!i2197[23]
  i2196.useTargetAsV3 = !!i2197[24]
  i2196.endValueFloat = i2197[25]
  i2196.endValueV3 = new pc.Vec3( i2197[26], i2197[27], i2197[28] )
  i2196.endValueV2 = new pc.Vec2( i2197[29], i2197[30] )
  i2196.endValueColor = new pc.Color(i2197[31], i2197[32], i2197[33], i2197[34])
  i2196.endValueString = i2197[35]
  i2196.endValueRect = UnityEngine.Rect.MinMaxRect(i2197[36], i2197[37], i2197[38], i2197[39])
  request.r(i2197[40], i2197[41], 0, i2196, 'endValueTransform')
  i2196.optionalBool0 = !!i2197[42]
  i2196.optionalBool1 = !!i2197[43]
  i2196.optionalFloat0 = i2197[44]
  i2196.optionalInt0 = i2197[45]
  i2196.optionalRotationMode = i2197[46]
  i2196.optionalScrambleMode = i2197[47]
  i2196.optionalShakeRandomnessMode = i2197[48]
  i2196.optionalString = i2197[49]
  i2196.updateType = i2197[50]
  i2196.isSpeedBased = !!i2197[51]
  i2196.hasOnStart = !!i2197[52]
  i2196.hasOnPlay = !!i2197[53]
  i2196.hasOnUpdate = !!i2197[54]
  i2196.hasOnStepComplete = !!i2197[55]
  i2196.hasOnComplete = !!i2197[56]
  i2196.hasOnTweenCreated = !!i2197[57]
  i2196.hasOnRewind = !!i2197[58]
  i2196.onStart = request.d('UnityEngine.Events.UnityEvent', i2197[59], i2196.onStart)
  i2196.onPlay = request.d('UnityEngine.Events.UnityEvent', i2197[60], i2196.onPlay)
  i2196.onUpdate = request.d('UnityEngine.Events.UnityEvent', i2197[61], i2196.onUpdate)
  i2196.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i2197[62], i2196.onStepComplete)
  i2196.onComplete = request.d('UnityEngine.Events.UnityEvent', i2197[63], i2196.onComplete)
  i2196.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i2197[64], i2196.onTweenCreated)
  i2196.onRewind = request.d('UnityEngine.Events.UnityEvent', i2197[65], i2196.onRewind)
  return i2196
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i2198 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i2199 = data
  i2198.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2199[0], i2198.m_PersistentCalls)
  return i2198
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2200 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2201 = data
  var i2203 = i2201[0]
  var i2202 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2203.length; i += 1) {
    i2202.add(request.d('UnityEngine.Events.PersistentCall', i2203[i + 0]));
  }
  i2200.m_Calls = i2202
  return i2200
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2206 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2207 = data
  request.r(i2207[0], i2207[1], 0, i2206, 'm_Target')
  i2206.m_TargetAssemblyTypeName = i2207[2]
  i2206.m_MethodName = i2207[3]
  i2206.m_Mode = i2207[4]
  i2206.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2207[5], i2206.m_Arguments)
  i2206.m_CallState = i2207[6]
  return i2206
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2208 = root || request.c( 'UnityEngine.UI.Button' )
  var i2209 = data
  i2208.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2209[0], i2208.m_OnClick)
  i2208.m_Navigation = request.d('UnityEngine.UI.Navigation', i2209[1], i2208.m_Navigation)
  i2208.m_Transition = i2209[2]
  i2208.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2209[3], i2208.m_Colors)
  i2208.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2209[4], i2208.m_SpriteState)
  i2208.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2209[5], i2208.m_AnimationTriggers)
  i2208.m_Interactable = !!i2209[6]
  request.r(i2209[7], i2209[8], 0, i2208, 'm_TargetGraphic')
  return i2208
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2210 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2211 = data
  i2210.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2211[0], i2210.m_PersistentCalls)
  return i2210
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2212 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2213 = data
  i2212.m_Mode = i2213[0]
  i2212.m_WrapAround = !!i2213[1]
  request.r(i2213[2], i2213[3], 0, i2212, 'm_SelectOnUp')
  request.r(i2213[4], i2213[5], 0, i2212, 'm_SelectOnDown')
  request.r(i2213[6], i2213[7], 0, i2212, 'm_SelectOnLeft')
  request.r(i2213[8], i2213[9], 0, i2212, 'm_SelectOnRight')
  return i2212
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2214 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2215 = data
  i2214.m_NormalColor = new pc.Color(i2215[0], i2215[1], i2215[2], i2215[3])
  i2214.m_HighlightedColor = new pc.Color(i2215[4], i2215[5], i2215[6], i2215[7])
  i2214.m_PressedColor = new pc.Color(i2215[8], i2215[9], i2215[10], i2215[11])
  i2214.m_SelectedColor = new pc.Color(i2215[12], i2215[13], i2215[14], i2215[15])
  i2214.m_DisabledColor = new pc.Color(i2215[16], i2215[17], i2215[18], i2215[19])
  i2214.m_ColorMultiplier = i2215[20]
  i2214.m_FadeDuration = i2215[21]
  return i2214
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2216 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2217 = data
  request.r(i2217[0], i2217[1], 0, i2216, 'm_HighlightedSprite')
  request.r(i2217[2], i2217[3], 0, i2216, 'm_PressedSprite')
  request.r(i2217[4], i2217[5], 0, i2216, 'm_SelectedSprite')
  request.r(i2217[6], i2217[7], 0, i2216, 'm_DisabledSprite')
  return i2216
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2218 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2219 = data
  i2218.m_NormalTrigger = i2219[0]
  i2218.m_HighlightedTrigger = i2219[1]
  i2218.m_PressedTrigger = i2219[2]
  i2218.m_SelectedTrigger = i2219[3]
  i2218.m_DisabledTrigger = i2219[4]
  return i2218
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i2220 = root || request.c( 'LayoutController' )
  var i2221 = data
  request.r(i2221[0], i2221[1], 0, i2220, 'infoUI')
  request.r(i2221[2], i2221[3], 0, i2220, 'eventUI')
  request.r(i2221[4], i2221[5], 0, i2220, 'inventoryUI')
  request.r(i2221[6], i2221[7], 0, i2220, 'moveUI')
  request.r(i2221[8], i2221[9], 0, i2220, 'actionUI')
  return i2220
}

Deserializers["LunaController"] = function (request, data, root) {
  var i2222 = root || request.c( 'LunaController' )
  var i2223 = data
  i2222.LimitTimePlay = !!i2223[0]
  i2222.TimePlay = i2223[1]
  request.r(i2223[2], i2223[3], 0, i2222, 'BGTex')
  request.r(i2223[4], i2223[5], 0, i2222, 'BGM')
  request.r(i2223[6], i2223[7], 0, i2222, 'BGImage')
  request.r(i2223[8], i2223[9], 0, i2222, 'musicSource')
  request.r(i2223[10], i2223[11], 0, i2222, 'endCard')
  return i2222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2224 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2225 = data
  request.r(i2225[0], i2225[1], 0, i2224, 'clip')
  request.r(i2225[2], i2225[3], 0, i2224, 'outputAudioMixerGroup')
  i2224.playOnAwake = !!i2225[4]
  i2224.loop = !!i2225[5]
  i2224.time = i2225[6]
  i2224.volume = i2225[7]
  i2224.pitch = i2225[8]
  i2224.enabled = !!i2225[9]
  return i2224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2227 = data
  i2226.ambientIntensity = i2227[0]
  i2226.reflectionIntensity = i2227[1]
  i2226.ambientMode = i2227[2]
  i2226.ambientLight = new pc.Color(i2227[3], i2227[4], i2227[5], i2227[6])
  i2226.ambientSkyColor = new pc.Color(i2227[7], i2227[8], i2227[9], i2227[10])
  i2226.ambientGroundColor = new pc.Color(i2227[11], i2227[12], i2227[13], i2227[14])
  i2226.ambientEquatorColor = new pc.Color(i2227[15], i2227[16], i2227[17], i2227[18])
  i2226.fogColor = new pc.Color(i2227[19], i2227[20], i2227[21], i2227[22])
  i2226.fogEndDistance = i2227[23]
  i2226.fogStartDistance = i2227[24]
  i2226.fogDensity = i2227[25]
  i2226.fog = !!i2227[26]
  request.r(i2227[27], i2227[28], 0, i2226, 'skybox')
  i2226.fogMode = i2227[29]
  var i2229 = i2227[30]
  var i2228 = []
  for(var i = 0; i < i2229.length; i += 1) {
    i2228.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2229[i + 0]) );
  }
  i2226.lightmaps = i2228
  i2226.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2227[31], i2226.lightProbes)
  i2226.lightmapsMode = i2227[32]
  i2226.mixedBakeMode = i2227[33]
  i2226.environmentLightingMode = i2227[34]
  i2226.ambientProbe = new pc.SphericalHarmonicsL2(i2227[35])
  request.r(i2227[36], i2227[37], 0, i2226, 'customReflection')
  request.r(i2227[38], i2227[39], 0, i2226, 'defaultReflection')
  i2226.defaultReflectionMode = i2227[40]
  i2226.defaultReflectionResolution = i2227[41]
  i2226.sunLightObjectId = i2227[42]
  i2226.pixelLightCount = i2227[43]
  i2226.defaultReflectionHDR = !!i2227[44]
  i2226.hasLightDataAsset = !!i2227[45]
  i2226.hasManualGenerate = !!i2227[46]
  return i2226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2232 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2233 = data
  request.r(i2233[0], i2233[1], 0, i2232, 'lightmapColor')
  request.r(i2233[2], i2233[3], 0, i2232, 'lightmapDirection')
  request.r(i2233[4], i2233[5], 0, i2232, 'shadowMask')
  return i2232
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2234 = root || new UnityEngine.LightProbes()
  var i2235 = data
  return i2234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2243 = data
  var i2245 = i2243[0]
  var i2244 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2245.length; i += 1) {
    i2244.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2245[i + 0]));
  }
  i2242.ShaderCompilationErrors = i2244
  i2242.name = i2243[1]
  i2242.guid = i2243[2]
  var i2247 = i2243[3]
  var i2246 = []
  for(var i = 0; i < i2247.length; i += 1) {
    i2246.push( i2247[i + 0] );
  }
  i2242.shaderDefinedKeywords = i2246
  var i2249 = i2243[4]
  var i2248 = []
  for(var i = 0; i < i2249.length; i += 1) {
    i2248.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2249[i + 0]) );
  }
  i2242.passes = i2248
  var i2251 = i2243[5]
  var i2250 = []
  for(var i = 0; i < i2251.length; i += 1) {
    i2250.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2251[i + 0]) );
  }
  i2242.usePasses = i2250
  var i2253 = i2243[6]
  var i2252 = []
  for(var i = 0; i < i2253.length; i += 1) {
    i2252.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2253[i + 0]) );
  }
  i2242.defaultParameterValues = i2252
  request.r(i2243[7], i2243[8], 0, i2242, 'unityFallbackShader')
  i2242.readDepth = !!i2243[9]
  i2242.hasDepthOnlyPass = !!i2243[10]
  i2242.isCreatedByShaderGraph = !!i2243[11]
  i2242.disableBatching = !!i2243[12]
  i2242.compiled = !!i2243[13]
  return i2242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2257 = data
  i2256.shaderName = i2257[0]
  i2256.errorMessage = i2257[1]
  return i2256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2262 = root || new pc.UnityShaderPass()
  var i2263 = data
  i2262.id = i2263[0]
  i2262.subShaderIndex = i2263[1]
  i2262.name = i2263[2]
  i2262.passType = i2263[3]
  i2262.grabPassTextureName = i2263[4]
  i2262.usePass = !!i2263[5]
  i2262.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[6], i2262.zTest)
  i2262.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[7], i2262.zWrite)
  i2262.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[8], i2262.culling)
  i2262.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2263[9], i2262.blending)
  i2262.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2263[10], i2262.alphaBlending)
  i2262.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[11], i2262.colorWriteMask)
  i2262.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[12], i2262.offsetUnits)
  i2262.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[13], i2262.offsetFactor)
  i2262.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[14], i2262.stencilRef)
  i2262.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[15], i2262.stencilReadMask)
  i2262.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2263[16], i2262.stencilWriteMask)
  i2262.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2263[17], i2262.stencilOp)
  i2262.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2263[18], i2262.stencilOpFront)
  i2262.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2263[19], i2262.stencilOpBack)
  var i2265 = i2263[20]
  var i2264 = []
  for(var i = 0; i < i2265.length; i += 1) {
    i2264.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2265[i + 0]) );
  }
  i2262.tags = i2264
  var i2267 = i2263[21]
  var i2266 = []
  for(var i = 0; i < i2267.length; i += 1) {
    i2266.push( i2267[i + 0] );
  }
  i2262.passDefinedKeywords = i2266
  var i2269 = i2263[22]
  var i2268 = []
  for(var i = 0; i < i2269.length; i += 1) {
    i2268.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2269[i + 0]) );
  }
  i2262.passDefinedKeywordGroups = i2268
  var i2271 = i2263[23]
  var i2270 = []
  for(var i = 0; i < i2271.length; i += 1) {
    i2270.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2271[i + 0]) );
  }
  i2262.variants = i2270
  var i2273 = i2263[24]
  var i2272 = []
  for(var i = 0; i < i2273.length; i += 1) {
    i2272.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2273[i + 0]) );
  }
  i2262.excludedVariants = i2272
  i2262.hasDepthReader = !!i2263[25]
  return i2262
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2275 = data
  i2274.val = i2275[0]
  i2274.name = i2275[1]
  return i2274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2277 = data
  i2276.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2277[0], i2276.src)
  i2276.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2277[1], i2276.dst)
  i2276.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2277[2], i2276.op)
  return i2276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2279 = data
  i2278.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2279[0], i2278.pass)
  i2278.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2279[1], i2278.fail)
  i2278.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2279[2], i2278.zFail)
  i2278.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2279[3], i2278.comp)
  return i2278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2283 = data
  i2282.name = i2283[0]
  i2282.value = i2283[1]
  return i2282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2286 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2287 = data
  var i2289 = i2287[0]
  var i2288 = []
  for(var i = 0; i < i2289.length; i += 1) {
    i2288.push( i2289[i + 0] );
  }
  i2286.keywords = i2288
  i2286.hasDiscard = !!i2287[1]
  return i2286
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2292 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2293 = data
  i2292.passId = i2293[0]
  i2292.subShaderIndex = i2293[1]
  var i2295 = i2293[2]
  var i2294 = []
  for(var i = 0; i < i2295.length; i += 1) {
    i2294.push( i2295[i + 0] );
  }
  i2292.keywords = i2294
  i2292.vertexProgram = i2293[3]
  i2292.fragmentProgram = i2293[4]
  i2292.exportedForWebGl2 = !!i2293[5]
  i2292.readDepth = !!i2293[6]
  return i2292
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2299 = data
  request.r(i2299[0], i2299[1], 0, i2298, 'shader')
  i2298.pass = i2299[2]
  return i2298
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2303 = data
  i2302.name = i2303[0]
  i2302.type = i2303[1]
  i2302.value = new pc.Vec4( i2303[2], i2303[3], i2303[4], i2303[5] )
  i2302.textureValue = i2303[6]
  i2302.shaderPropertyFlag = i2303[7]
  return i2302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2305 = data
  i2304.name = i2305[0]
  request.r(i2305[1], i2305[2], 0, i2304, 'texture')
  i2304.aabb = i2305[3]
  i2304.vertices = i2305[4]
  i2304.triangles = i2305[5]
  i2304.textureRect = UnityEngine.Rect.MinMaxRect(i2305[6], i2305[7], i2305[8], i2305[9])
  i2304.packedRect = UnityEngine.Rect.MinMaxRect(i2305[10], i2305[11], i2305[12], i2305[13])
  i2304.border = new pc.Vec4( i2305[14], i2305[15], i2305[16], i2305[17] )
  i2304.transparency = i2305[18]
  i2304.bounds = i2305[19]
  i2304.pixelsPerUnit = i2305[20]
  i2304.textureWidth = i2305[21]
  i2304.textureHeight = i2305[22]
  i2304.nativeSize = new pc.Vec2( i2305[23], i2305[24] )
  i2304.pivot = new pc.Vec2( i2305[25], i2305[26] )
  i2304.textureRectOffset = new pc.Vec2( i2305[27], i2305[28] )
  return i2304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2307 = data
  i2306.name = i2307[0]
  return i2306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2309 = data
  i2308.name = i2309[0]
  i2308.bytes64 = i2309[1]
  i2308.data = i2309[2]
  return i2308
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2310 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2311 = data
  i2310.normalStyle = i2311[0]
  i2310.normalSpacingOffset = i2311[1]
  i2310.boldStyle = i2311[2]
  i2310.boldSpacing = i2311[3]
  i2310.italicStyle = i2311[4]
  i2310.tabSize = i2311[5]
  request.r(i2311[6], i2311[7], 0, i2310, 'atlas')
  i2310.m_SourceFontFileGUID = i2311[8]
  i2310.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2311[9], i2310.m_CreationSettings)
  request.r(i2311[10], i2311[11], 0, i2310, 'm_SourceFontFile')
  i2310.m_SourceFontFilePath = i2311[12]
  i2310.m_AtlasPopulationMode = i2311[13]
  i2310.InternalDynamicOS = !!i2311[14]
  var i2313 = i2311[15]
  var i2312 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2313.length; i += 1) {
    i2312.add(request.d('UnityEngine.TextCore.Glyph', i2313[i + 0]));
  }
  i2310.m_GlyphTable = i2312
  var i2315 = i2311[16]
  var i2314 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2315.length; i += 1) {
    i2314.add(request.d('TMPro.TMP_Character', i2315[i + 0]));
  }
  i2310.m_CharacterTable = i2314
  var i2317 = i2311[17]
  var i2316 = []
  for(var i = 0; i < i2317.length; i += 2) {
  request.r(i2317[i + 0], i2317[i + 1], 2, i2316, '')
  }
  i2310.m_AtlasTextures = i2316
  i2310.m_AtlasTextureIndex = i2311[18]
  i2310.m_IsMultiAtlasTexturesEnabled = !!i2311[19]
  i2310.m_GetFontFeatures = !!i2311[20]
  i2310.m_ClearDynamicDataOnBuild = !!i2311[21]
  i2310.m_AtlasWidth = i2311[22]
  i2310.m_AtlasHeight = i2311[23]
  i2310.m_AtlasPadding = i2311[24]
  i2310.m_AtlasRenderMode = i2311[25]
  var i2319 = i2311[26]
  var i2318 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2319.length; i += 1) {
    i2318.add(request.d('UnityEngine.TextCore.GlyphRect', i2319[i + 0]));
  }
  i2310.m_UsedGlyphRects = i2318
  var i2321 = i2311[27]
  var i2320 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2321.length; i += 1) {
    i2320.add(request.d('UnityEngine.TextCore.GlyphRect', i2321[i + 0]));
  }
  i2310.m_FreeGlyphRects = i2320
  i2310.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2311[28], i2310.m_FontFeatureTable)
  i2310.m_ShouldReimportFontFeatures = !!i2311[29]
  var i2323 = i2311[30]
  var i2322 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2323.length; i += 2) {
  request.r(i2323[i + 0], i2323[i + 1], 1, i2322, '')
  }
  i2310.m_FallbackFontAssetTable = i2322
  var i2325 = i2311[31]
  var i2324 = []
  for(var i = 0; i < i2325.length; i += 1) {
    i2324.push( request.d('TMPro.TMP_FontWeightPair', i2325[i + 0]) );
  }
  i2310.m_FontWeightTable = i2324
  var i2327 = i2311[32]
  var i2326 = []
  for(var i = 0; i < i2327.length; i += 1) {
    i2326.push( request.d('TMPro.TMP_FontWeightPair', i2327[i + 0]) );
  }
  i2310.fontWeights = i2326
  i2310.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2311[33], i2310.m_fontInfo)
  var i2329 = i2311[34]
  var i2328 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2329.length; i += 1) {
    i2328.add(request.d('TMPro.TMP_Glyph', i2329[i + 0]));
  }
  i2310.m_glyphInfoList = i2328
  i2310.m_KerningTable = request.d('TMPro.KerningTable', i2311[35], i2310.m_KerningTable)
  var i2331 = i2311[36]
  var i2330 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2331.length; i += 2) {
  request.r(i2331[i + 0], i2331[i + 1], 1, i2330, '')
  }
  i2310.fallbackFontAssets = i2330
  i2310.m_Version = i2311[37]
  i2310.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2311[38], i2310.m_FaceInfo)
  request.r(i2311[39], i2311[40], 0, i2310, 'm_Material')
  return i2310
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2332 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2333 = data
  i2332.sourceFontFileName = i2333[0]
  i2332.sourceFontFileGUID = i2333[1]
  i2332.faceIndex = i2333[2]
  i2332.pointSizeSamplingMode = i2333[3]
  i2332.pointSize = i2333[4]
  i2332.padding = i2333[5]
  i2332.paddingMode = i2333[6]
  i2332.packingMode = i2333[7]
  i2332.atlasWidth = i2333[8]
  i2332.atlasHeight = i2333[9]
  i2332.characterSetSelectionMode = i2333[10]
  i2332.characterSequence = i2333[11]
  i2332.referencedFontAssetGUID = i2333[12]
  i2332.referencedTextAssetGUID = i2333[13]
  i2332.fontStyle = i2333[14]
  i2332.fontStyleModifier = i2333[15]
  i2332.renderMode = i2333[16]
  i2332.includeFontFeatures = !!i2333[17]
  return i2332
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2336 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2337 = data
  i2336.m_Index = i2337[0]
  i2336.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2337[1], i2336.m_Metrics)
  i2336.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2337[2], i2336.m_GlyphRect)
  i2336.m_Scale = i2337[3]
  i2336.m_AtlasIndex = i2337[4]
  i2336.m_ClassDefinitionType = i2337[5]
  return i2336
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2338 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2339 = data
  i2338.m_Width = i2339[0]
  i2338.m_Height = i2339[1]
  i2338.m_HorizontalBearingX = i2339[2]
  i2338.m_HorizontalBearingY = i2339[3]
  i2338.m_HorizontalAdvance = i2339[4]
  return i2338
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2340 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2341 = data
  i2340.m_X = i2341[0]
  i2340.m_Y = i2341[1]
  i2340.m_Width = i2341[2]
  i2340.m_Height = i2341[3]
  return i2340
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2344 = root || request.c( 'TMPro.TMP_Character' )
  var i2345 = data
  i2344.m_ElementType = i2345[0]
  i2344.m_Unicode = i2345[1]
  i2344.m_GlyphIndex = i2345[2]
  i2344.m_Scale = i2345[3]
  return i2344
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2350 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2351 = data
  var i2353 = i2351[0]
  var i2352 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2353.length; i += 1) {
    i2352.add(request.d('TMPro.MultipleSubstitutionRecord', i2353[i + 0]));
  }
  i2350.m_MultipleSubstitutionRecords = i2352
  var i2355 = i2351[1]
  var i2354 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2355.length; i += 1) {
    i2354.add(request.d('TMPro.LigatureSubstitutionRecord', i2355[i + 0]));
  }
  i2350.m_LigatureSubstitutionRecords = i2354
  var i2357 = i2351[2]
  var i2356 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2357.length; i += 1) {
    i2356.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2357[i + 0]));
  }
  i2350.m_GlyphPairAdjustmentRecords = i2356
  var i2359 = i2351[3]
  var i2358 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2359.length; i += 1) {
    i2358.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2359[i + 0]));
  }
  i2350.m_MarkToBaseAdjustmentRecords = i2358
  var i2361 = i2351[4]
  var i2360 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2361.length; i += 1) {
    i2360.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2361[i + 0]));
  }
  i2350.m_MarkToMarkAdjustmentRecords = i2360
  return i2350
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2364 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2365 = data
  i2364.m_TargetGlyphID = i2365[0]
  i2364.m_SubstituteGlyphIDs = i2365[1]
  return i2364
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2368 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2369 = data
  i2368.m_ComponentGlyphIDs = i2369[0]
  i2368.m_LigatureGlyphID = i2369[1]
  return i2368
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2372 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2373 = data
  i2372.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2373[0], i2372.m_FirstAdjustmentRecord)
  i2372.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2373[1], i2372.m_SecondAdjustmentRecord)
  i2372.m_FeatureLookupFlags = i2373[2]
  return i2372
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2376 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2377 = data
  i2376.m_BaseGlyphID = i2377[0]
  i2376.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2377[1], i2376.m_BaseGlyphAnchorPoint)
  i2376.m_MarkGlyphID = i2377[2]
  i2376.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2377[3], i2376.m_MarkPositionAdjustment)
  return i2376
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2380 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2381 = data
  i2380.m_BaseMarkGlyphID = i2381[0]
  i2380.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2381[1], i2380.m_BaseMarkGlyphAnchorPoint)
  i2380.m_CombiningMarkGlyphID = i2381[2]
  i2380.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2381[3], i2380.m_CombiningMarkPositionAdjustment)
  return i2380
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2386 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2387 = data
  request.r(i2387[0], i2387[1], 0, i2386, 'regularTypeface')
  request.r(i2387[2], i2387[3], 0, i2386, 'italicTypeface')
  return i2386
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2388 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2389 = data
  i2388.Name = i2389[0]
  i2388.PointSize = i2389[1]
  i2388.Scale = i2389[2]
  i2388.CharacterCount = i2389[3]
  i2388.LineHeight = i2389[4]
  i2388.Baseline = i2389[5]
  i2388.Ascender = i2389[6]
  i2388.CapHeight = i2389[7]
  i2388.Descender = i2389[8]
  i2388.CenterLine = i2389[9]
  i2388.SuperscriptOffset = i2389[10]
  i2388.SubscriptOffset = i2389[11]
  i2388.SubSize = i2389[12]
  i2388.Underline = i2389[13]
  i2388.UnderlineThickness = i2389[14]
  i2388.strikethrough = i2389[15]
  i2388.strikethroughThickness = i2389[16]
  i2388.TabWidth = i2389[17]
  i2388.Padding = i2389[18]
  i2388.AtlasWidth = i2389[19]
  i2388.AtlasHeight = i2389[20]
  return i2388
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2392 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2393 = data
  i2392.id = i2393[0]
  i2392.x = i2393[1]
  i2392.y = i2393[2]
  i2392.width = i2393[3]
  i2392.height = i2393[4]
  i2392.xOffset = i2393[5]
  i2392.yOffset = i2393[6]
  i2392.xAdvance = i2393[7]
  i2392.scale = i2393[8]
  return i2392
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2394 = root || request.c( 'TMPro.KerningTable' )
  var i2395 = data
  var i2397 = i2395[0]
  var i2396 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2397.length; i += 1) {
    i2396.add(request.d('TMPro.KerningPair', i2397[i + 0]));
  }
  i2394.kerningPairs = i2396
  return i2394
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2400 = root || request.c( 'TMPro.KerningPair' )
  var i2401 = data
  i2400.xOffset = i2401[0]
  i2400.m_FirstGlyph = i2401[1]
  i2400.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2401[2], i2400.m_FirstGlyphAdjustments)
  i2400.m_SecondGlyph = i2401[3]
  i2400.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2401[4], i2400.m_SecondGlyphAdjustments)
  i2400.m_IgnoreSpacingAdjustments = !!i2401[5]
  return i2400
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2402 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2403 = data
  i2402.m_FaceIndex = i2403[0]
  i2402.m_FamilyName = i2403[1]
  i2402.m_StyleName = i2403[2]
  i2402.m_PointSize = i2403[3]
  i2402.m_Scale = i2403[4]
  i2402.m_UnitsPerEM = i2403[5]
  i2402.m_LineHeight = i2403[6]
  i2402.m_AscentLine = i2403[7]
  i2402.m_CapLine = i2403[8]
  i2402.m_MeanLine = i2403[9]
  i2402.m_Baseline = i2403[10]
  i2402.m_DescentLine = i2403[11]
  i2402.m_SuperscriptOffset = i2403[12]
  i2402.m_SuperscriptSize = i2403[13]
  i2402.m_SubscriptOffset = i2403[14]
  i2402.m_SubscriptSize = i2403[15]
  i2402.m_UnderlineOffset = i2403[16]
  i2402.m_UnderlineThickness = i2403[17]
  i2402.m_StrikethroughOffset = i2403[18]
  i2402.m_StrikethroughThickness = i2403[19]
  i2402.m_TabWidth = i2403[20]
  return i2402
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2404 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2405 = data
  i2404.useSafeMode = !!i2405[0]
  i2404.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2405[1], i2404.safeModeOptions)
  i2404.timeScale = i2405[2]
  i2404.unscaledTimeScale = i2405[3]
  i2404.useSmoothDeltaTime = !!i2405[4]
  i2404.maxSmoothUnscaledTime = i2405[5]
  i2404.rewindCallbackMode = i2405[6]
  i2404.showUnityEditorReport = !!i2405[7]
  i2404.logBehaviour = i2405[8]
  i2404.drawGizmos = !!i2405[9]
  i2404.defaultRecyclable = !!i2405[10]
  i2404.defaultAutoPlay = i2405[11]
  i2404.defaultUpdateType = i2405[12]
  i2404.defaultTimeScaleIndependent = !!i2405[13]
  i2404.defaultEaseType = i2405[14]
  i2404.defaultEaseOvershootOrAmplitude = i2405[15]
  i2404.defaultEasePeriod = i2405[16]
  i2404.defaultAutoKill = !!i2405[17]
  i2404.defaultLoopType = i2405[18]
  i2404.debugMode = !!i2405[19]
  i2404.debugStoreTargetId = !!i2405[20]
  i2404.showPreviewPanel = !!i2405[21]
  i2404.storeSettingsLocation = i2405[22]
  i2404.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2405[23], i2404.modules)
  i2404.createASMDEF = !!i2405[24]
  i2404.showPlayingTweens = !!i2405[25]
  i2404.showPausedTweens = !!i2405[26]
  return i2404
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2406 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2407 = data
  i2406.logBehaviour = i2407[0]
  i2406.nestedTweenFailureBehaviour = i2407[1]
  return i2406
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2408 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2409 = data
  i2408.showPanel = !!i2409[0]
  i2408.audioEnabled = !!i2409[1]
  i2408.physicsEnabled = !!i2409[2]
  i2408.physics2DEnabled = !!i2409[3]
  i2408.spriteEnabled = !!i2409[4]
  i2408.uiEnabled = !!i2409[5]
  i2408.textMeshProEnabled = !!i2409[6]
  i2408.tk2DEnabled = !!i2409[7]
  i2408.deAudioEnabled = !!i2409[8]
  i2408.deUnityExtendedEnabled = !!i2409[9]
  i2408.epoOutlineEnabled = !!i2409[10]
  return i2408
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2410 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2411 = data
  request.r(i2411[0], i2411[1], 0, i2410, 'spriteSheet')
  var i2413 = i2411[2]
  var i2412 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2413.length; i += 1) {
    i2412.add(request.d('TMPro.TMP_Sprite', i2413[i + 0]));
  }
  i2410.spriteInfoList = i2412
  var i2415 = i2411[3]
  var i2414 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2415.length; i += 2) {
  request.r(i2415[i + 0], i2415[i + 1], 1, i2414, '')
  }
  i2410.fallbackSpriteAssets = i2414
  var i2417 = i2411[4]
  var i2416 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2417.length; i += 1) {
    i2416.add(request.d('TMPro.TMP_SpriteCharacter', i2417[i + 0]));
  }
  i2410.m_SpriteCharacterTable = i2416
  var i2419 = i2411[5]
  var i2418 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2419.length; i += 1) {
    i2418.add(request.d('TMPro.TMP_SpriteGlyph', i2419[i + 0]));
  }
  i2410.m_GlyphTable = i2418
  i2410.m_Version = i2411[6]
  i2410.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2411[7], i2410.m_FaceInfo)
  request.r(i2411[8], i2411[9], 0, i2410, 'm_Material')
  return i2410
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2422 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2423 = data
  i2422.name = i2423[0]
  i2422.hashCode = i2423[1]
  i2422.unicode = i2423[2]
  i2422.pivot = new pc.Vec2( i2423[3], i2423[4] )
  request.r(i2423[5], i2423[6], 0, i2422, 'sprite')
  i2422.id = i2423[7]
  i2422.x = i2423[8]
  i2422.y = i2423[9]
  i2422.width = i2423[10]
  i2422.height = i2423[11]
  i2422.xOffset = i2423[12]
  i2422.yOffset = i2423[13]
  i2422.xAdvance = i2423[14]
  i2422.scale = i2423[15]
  return i2422
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2428 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2429 = data
  i2428.m_Name = i2429[0]
  i2428.m_ElementType = i2429[1]
  i2428.m_Unicode = i2429[2]
  i2428.m_GlyphIndex = i2429[3]
  i2428.m_Scale = i2429[4]
  return i2428
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2432 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2433 = data
  request.r(i2433[0], i2433[1], 0, i2432, 'sprite')
  i2432.m_Index = i2433[2]
  i2432.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2433[3], i2432.m_Metrics)
  i2432.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2433[4], i2432.m_GlyphRect)
  i2432.m_Scale = i2433[5]
  i2432.m_AtlasIndex = i2433[6]
  i2432.m_ClassDefinitionType = i2433[7]
  return i2432
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2434 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2435 = data
  var i2437 = i2435[0]
  var i2436 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2437.length; i += 1) {
    i2436.add(request.d('TMPro.TMP_Style', i2437[i + 0]));
  }
  i2434.m_StyleList = i2436
  return i2434
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2440 = root || request.c( 'TMPro.TMP_Style' )
  var i2441 = data
  i2440.m_Name = i2441[0]
  i2440.m_HashCode = i2441[1]
  i2440.m_OpeningDefinition = i2441[2]
  i2440.m_ClosingDefinition = i2441[3]
  i2440.m_OpeningTagArray = i2441[4]
  i2440.m_ClosingTagArray = i2441[5]
  return i2440
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2442 = root || request.c( 'TMPro.TMP_Settings' )
  var i2443 = data
  i2442.assetVersion = i2443[0]
  i2442.m_TextWrappingMode = i2443[1]
  i2442.m_enableKerning = !!i2443[2]
  var i2445 = i2443[3]
  var i2444 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2445.length; i += 1) {
    i2444.add(i2445[i + 0]);
  }
  i2442.m_ActiveFontFeatures = i2444
  i2442.m_enableExtraPadding = !!i2443[4]
  i2442.m_enableTintAllSprites = !!i2443[5]
  i2442.m_enableParseEscapeCharacters = !!i2443[6]
  i2442.m_EnableRaycastTarget = !!i2443[7]
  i2442.m_GetFontFeaturesAtRuntime = !!i2443[8]
  i2442.m_missingGlyphCharacter = i2443[9]
  i2442.m_ClearDynamicDataOnBuild = !!i2443[10]
  i2442.m_warningsDisabled = !!i2443[11]
  request.r(i2443[12], i2443[13], 0, i2442, 'm_defaultFontAsset')
  i2442.m_defaultFontAssetPath = i2443[14]
  i2442.m_defaultFontSize = i2443[15]
  i2442.m_defaultAutoSizeMinRatio = i2443[16]
  i2442.m_defaultAutoSizeMaxRatio = i2443[17]
  i2442.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2443[18], i2443[19] )
  i2442.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2443[20], i2443[21] )
  i2442.m_autoSizeTextContainer = !!i2443[22]
  i2442.m_IsTextObjectScaleStatic = !!i2443[23]
  var i2447 = i2443[24]
  var i2446 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2447.length; i += 2) {
  request.r(i2447[i + 0], i2447[i + 1], 1, i2446, '')
  }
  i2442.m_fallbackFontAssets = i2446
  i2442.m_matchMaterialPreset = !!i2443[25]
  i2442.m_HideSubTextObjects = !!i2443[26]
  request.r(i2443[27], i2443[28], 0, i2442, 'm_defaultSpriteAsset')
  i2442.m_defaultSpriteAssetPath = i2443[29]
  i2442.m_enableEmojiSupport = !!i2443[30]
  i2442.m_MissingCharacterSpriteUnicode = i2443[31]
  var i2449 = i2443[32]
  var i2448 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2449.length; i += 2) {
  request.r(i2449[i + 0], i2449[i + 1], 1, i2448, '')
  }
  i2442.m_EmojiFallbackTextAssets = i2448
  i2442.m_defaultColorGradientPresetsPath = i2443[33]
  request.r(i2443[34], i2443[35], 0, i2442, 'm_defaultStyleSheet')
  i2442.m_StyleSheetsResourcePath = i2443[36]
  request.r(i2443[37], i2443[38], 0, i2442, 'm_leadingCharacters')
  request.r(i2443[39], i2443[40], 0, i2442, 'm_followingCharacters')
  i2442.m_UseModernHangulLineBreakingRules = !!i2443[41]
  return i2442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2453 = data
  var i2455 = i2453[0]
  var i2454 = []
  for(var i = 0; i < i2455.length; i += 1) {
    i2454.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2455[i + 0]) );
  }
  i2452.files = i2454
  i2452.componentToPrefabIds = i2453[1]
  return i2452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2459 = data
  i2458.path = i2459[0]
  request.r(i2459[1], i2459[2], 0, i2458, 'unityObject')
  return i2458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2461 = data
  var i2463 = i2461[0]
  var i2462 = []
  for(var i = 0; i < i2463.length; i += 1) {
    i2462.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2463[i + 0]) );
  }
  i2460.scriptsExecutionOrder = i2462
  var i2465 = i2461[1]
  var i2464 = []
  for(var i = 0; i < i2465.length; i += 1) {
    i2464.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2465[i + 0]) );
  }
  i2460.sortingLayers = i2464
  var i2467 = i2461[2]
  var i2466 = []
  for(var i = 0; i < i2467.length; i += 1) {
    i2466.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2467[i + 0]) );
  }
  i2460.cullingLayers = i2466
  i2460.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2461[3], i2460.timeSettings)
  i2460.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2461[4], i2460.physicsSettings)
  i2460.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2461[5], i2460.physics2DSettings)
  i2460.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2461[6], i2460.qualitySettings)
  i2460.enableRealtimeShadows = !!i2461[7]
  i2460.enableAutoInstancing = !!i2461[8]
  i2460.enableStaticBatching = !!i2461[9]
  i2460.enableDynamicBatching = !!i2461[10]
  i2460.usePreservativeDynamicBatching = !!i2461[11]
  i2460.lightmapEncodingQuality = i2461[12]
  i2460.desiredColorSpace = i2461[13]
  var i2469 = i2461[14]
  var i2468 = []
  for(var i = 0; i < i2469.length; i += 1) {
    i2468.push( i2469[i + 0] );
  }
  i2460.allTags = i2468
  return i2460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2473 = data
  i2472.name = i2473[0]
  i2472.value = i2473[1]
  return i2472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2477 = data
  i2476.id = i2477[0]
  i2476.name = i2477[1]
  i2476.value = i2477[2]
  return i2476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2480 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2481 = data
  i2480.id = i2481[0]
  i2480.name = i2481[1]
  return i2480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2483 = data
  i2482.fixedDeltaTime = i2483[0]
  i2482.maximumDeltaTime = i2483[1]
  i2482.timeScale = i2483[2]
  i2482.maximumParticleTimestep = i2483[3]
  return i2482
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2485 = data
  i2484.gravity = new pc.Vec3( i2485[0], i2485[1], i2485[2] )
  i2484.defaultSolverIterations = i2485[3]
  i2484.bounceThreshold = i2485[4]
  i2484.autoSyncTransforms = !!i2485[5]
  i2484.autoSimulation = !!i2485[6]
  var i2487 = i2485[7]
  var i2486 = []
  for(var i = 0; i < i2487.length; i += 1) {
    i2486.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2487[i + 0]) );
  }
  i2484.collisionMatrix = i2486
  return i2484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2491 = data
  i2490.enabled = !!i2491[0]
  i2490.layerId = i2491[1]
  i2490.otherLayerId = i2491[2]
  return i2490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2493 = data
  request.r(i2493[0], i2493[1], 0, i2492, 'material')
  i2492.gravity = new pc.Vec2( i2493[2], i2493[3] )
  i2492.positionIterations = i2493[4]
  i2492.velocityIterations = i2493[5]
  i2492.velocityThreshold = i2493[6]
  i2492.maxLinearCorrection = i2493[7]
  i2492.maxAngularCorrection = i2493[8]
  i2492.maxTranslationSpeed = i2493[9]
  i2492.maxRotationSpeed = i2493[10]
  i2492.baumgarteScale = i2493[11]
  i2492.baumgarteTOIScale = i2493[12]
  i2492.timeToSleep = i2493[13]
  i2492.linearSleepTolerance = i2493[14]
  i2492.angularSleepTolerance = i2493[15]
  i2492.defaultContactOffset = i2493[16]
  i2492.autoSimulation = !!i2493[17]
  i2492.queriesHitTriggers = !!i2493[18]
  i2492.queriesStartInColliders = !!i2493[19]
  i2492.callbacksOnDisable = !!i2493[20]
  i2492.reuseCollisionCallbacks = !!i2493[21]
  i2492.autoSyncTransforms = !!i2493[22]
  var i2495 = i2493[23]
  var i2494 = []
  for(var i = 0; i < i2495.length; i += 1) {
    i2494.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2495[i + 0]) );
  }
  i2492.collisionMatrix = i2494
  return i2492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2499 = data
  i2498.enabled = !!i2499[0]
  i2498.layerId = i2499[1]
  i2498.otherLayerId = i2499[2]
  return i2498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2501 = data
  var i2503 = i2501[0]
  var i2502 = []
  for(var i = 0; i < i2503.length; i += 1) {
    i2502.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2503[i + 0]) );
  }
  i2500.qualityLevels = i2502
  var i2505 = i2501[1]
  var i2504 = []
  for(var i = 0; i < i2505.length; i += 1) {
    i2504.push( i2505[i + 0] );
  }
  i2500.names = i2504
  i2500.shadows = i2501[2]
  i2500.anisotropicFiltering = i2501[3]
  i2500.antiAliasing = i2501[4]
  i2500.lodBias = i2501[5]
  i2500.shadowCascades = i2501[6]
  i2500.shadowDistance = i2501[7]
  i2500.shadowmaskMode = i2501[8]
  i2500.shadowProjection = i2501[9]
  i2500.shadowResolution = i2501[10]
  i2500.softParticles = !!i2501[11]
  i2500.softVegetation = !!i2501[12]
  i2500.activeColorSpace = i2501[13]
  i2500.desiredColorSpace = i2501[14]
  i2500.masterTextureLimit = i2501[15]
  i2500.maxQueuedFrames = i2501[16]
  i2500.particleRaycastBudget = i2501[17]
  i2500.pixelLightCount = i2501[18]
  i2500.realtimeReflectionProbes = !!i2501[19]
  i2500.shadowCascade2Split = i2501[20]
  i2500.shadowCascade4Split = new pc.Vec3( i2501[21], i2501[22], i2501[23] )
  i2500.streamingMipmapsActive = !!i2501[24]
  i2500.vSyncCount = i2501[25]
  i2500.asyncUploadBufferSize = i2501[26]
  i2500.asyncUploadTimeSlice = i2501[27]
  i2500.billboardsFaceCameraPosition = !!i2501[28]
  i2500.shadowNearPlaneOffset = i2501[29]
  i2500.streamingMipmapsMemoryBudget = i2501[30]
  i2500.maximumLODLevel = i2501[31]
  i2500.streamingMipmapsAddAllCameras = !!i2501[32]
  i2500.streamingMipmapsMaxLevelReduction = i2501[33]
  i2500.streamingMipmapsRenderersPerFrame = i2501[34]
  i2500.resolutionScalingFixedDPIFactor = i2501[35]
  i2500.streamingMipmapsMaxFileIORequests = i2501[36]
  i2500.currentQualityLevel = i2501[37]
  return i2500
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2508 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2509 = data
  request.r(i2509[0], i2509[1], 0, i2508, 'm_ObjectArgument')
  i2508.m_ObjectArgumentAssemblyTypeName = i2509[2]
  i2508.m_IntArgument = i2509[3]
  i2508.m_FloatArgument = i2509[4]
  i2508.m_StringArgument = i2509[5]
  i2508.m_BoolArgument = !!i2509[6]
  return i2508
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2510 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2511 = data
  i2510.m_GlyphIndex = i2511[0]
  i2510.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2511[1], i2510.m_GlyphValueRecord)
  return i2510
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2512 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2513 = data
  i2512.m_XCoordinate = i2513[0]
  i2512.m_YCoordinate = i2513[1]
  return i2512
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2514 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2515 = data
  i2514.m_XPositionAdjustment = i2515[0]
  i2514.m_YPositionAdjustment = i2515[1]
  return i2514
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2516 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2517 = data
  i2516.xPlacement = i2517[0]
  i2516.yPlacement = i2517[1]
  i2516.xAdvance = i2517[2]
  i2516.yAdvance = i2517[3]
  return i2516
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2518 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2519 = data
  i2518.m_XPlacement = i2519[0]
  i2518.m_YPlacement = i2519[1]
  i2518.m_XAdvance = i2519[2]
  i2518.m_YAdvance = i2519[3]
  return i2518
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"31":[32],"33":[32],"34":[32],"35":[32],"36":[32],"37":[32],"38":[39],"40":[2],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[2],"63":[64],"65":[66],"67":[66],"8":[7],"68":[69],"70":[2],"71":[72],"73":[7],"74":[11,7],"75":[64],"76":[11,7],"77":[7],"78":[7],"79":[64,7],"16":[7,11],"80":[81],"82":[81],"83":[81],"84":[7],"85":[7],"10":[8],"14":[11,7],"12":[7],"9":[8],"86":[7],"87":[7],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"13":[11,7],"95":[7],"96":[7],"97":[7],"98":[7],"99":[11,7],"100":[7],"101":[5],"102":[5],"6":[5],"103":[5],"104":[2],"105":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","UnityEngine.UI.Image","UnityEngine.Sprite","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","TMPro.TMP_Settings","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "CBBW3_V08";

Deserializers.lunaInitializationTime = "09/14/2026 01:43:13";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CBBW2_V24_YenTTH_TamNTM";

Deserializers.lunaAppID = "39768";

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

Deserializers.buildID = "204cd4f9-9be1-447b-89d7-fabea4827936";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

