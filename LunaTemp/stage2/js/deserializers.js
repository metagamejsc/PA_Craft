var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2180 = root || request.c( 'UnityEngine.JointSpring' )
  var i2181 = data
  i2180.spring = i2181[0]
  i2180.damper = i2181[1]
  i2180.targetPosition = i2181[2]
  return i2180
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2182 = root || request.c( 'UnityEngine.JointMotor' )
  var i2183 = data
  i2182.m_TargetVelocity = i2183[0]
  i2182.m_Force = i2183[1]
  i2182.m_FreeSpin = i2183[2]
  return i2182
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2184 = root || request.c( 'UnityEngine.JointLimits' )
  var i2185 = data
  i2184.m_Min = i2185[0]
  i2184.m_Max = i2185[1]
  i2184.m_Bounciness = i2185[2]
  i2184.m_BounceMinVelocity = i2185[3]
  i2184.m_ContactDistance = i2185[4]
  i2184.minBounce = i2185[5]
  i2184.maxBounce = i2185[6]
  return i2184
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2186 = root || request.c( 'UnityEngine.JointDrive' )
  var i2187 = data
  i2186.m_PositionSpring = i2187[0]
  i2186.m_PositionDamper = i2187[1]
  i2186.m_MaximumForce = i2187[2]
  i2186.m_UseAcceleration = i2187[3]
  return i2186
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2188 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2189 = data
  i2188.m_Spring = i2189[0]
  i2188.m_Damper = i2189[1]
  return i2188
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2190 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2191 = data
  i2190.m_Limit = i2191[0]
  i2190.m_Bounciness = i2191[1]
  i2190.m_ContactDistance = i2191[2]
  return i2190
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2192 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2193 = data
  i2192.m_ExtremumSlip = i2193[0]
  i2192.m_ExtremumValue = i2193[1]
  i2192.m_AsymptoteSlip = i2193[2]
  i2192.m_AsymptoteValue = i2193[3]
  i2192.m_Stiffness = i2193[4]
  return i2192
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2194 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2195 = data
  i2194.m_LowerAngle = i2195[0]
  i2194.m_UpperAngle = i2195[1]
  return i2194
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2196 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2197 = data
  i2196.m_MotorSpeed = i2197[0]
  i2196.m_MaximumMotorTorque = i2197[1]
  return i2196
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2198 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2199 = data
  i2198.m_DampingRatio = i2199[0]
  i2198.m_Frequency = i2199[1]
  i2198.m_Angle = i2199[2]
  return i2198
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2200 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2201 = data
  i2200.m_LowerTranslation = i2201[0]
  i2200.m_UpperTranslation = i2201[1]
  return i2200
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2202 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2203 = data
  i2202.name = i2203[0]
  i2202.width = i2203[1]
  i2202.height = i2203[2]
  i2202.mipmapCount = i2203[3]
  i2202.anisoLevel = i2203[4]
  i2202.filterMode = i2203[5]
  i2202.hdr = !!i2203[6]
  i2202.format = i2203[7]
  i2202.wrapMode = i2203[8]
  i2202.alphaIsTransparency = !!i2203[9]
  i2202.alphaSource = i2203[10]
  i2202.graphicsFormat = i2203[11]
  i2202.sRGBTexture = !!i2203[12]
  i2202.desiredColorSpace = i2203[13]
  i2202.wrapU = i2203[14]
  i2202.wrapV = i2203[15]
  return i2202
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2204 = root || new pc.UnityMaterial()
  var i2205 = data
  i2204.name = i2205[0]
  request.r(i2205[1], i2205[2], 0, i2204, 'shader')
  i2204.renderQueue = i2205[3]
  i2204.enableInstancing = !!i2205[4]
  var i2207 = i2205[5]
  var i2206 = []
  for(var i = 0; i < i2207.length; i += 1) {
    i2206.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2207[i + 0]) );
  }
  i2204.floatParameters = i2206
  var i2209 = i2205[6]
  var i2208 = []
  for(var i = 0; i < i2209.length; i += 1) {
    i2208.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2209[i + 0]) );
  }
  i2204.colorParameters = i2208
  var i2211 = i2205[7]
  var i2210 = []
  for(var i = 0; i < i2211.length; i += 1) {
    i2210.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2211[i + 0]) );
  }
  i2204.vectorParameters = i2210
  var i2213 = i2205[8]
  var i2212 = []
  for(var i = 0; i < i2213.length; i += 1) {
    i2212.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2213[i + 0]) );
  }
  i2204.textureParameters = i2212
  var i2215 = i2205[9]
  var i2214 = []
  for(var i = 0; i < i2215.length; i += 1) {
    i2214.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2215[i + 0]) );
  }
  i2204.materialFlags = i2214
  return i2204
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2218 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2219 = data
  i2218.name = i2219[0]
  i2218.value = i2219[1]
  return i2218
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2223 = data
  i2222.name = i2223[0]
  i2222.value = new pc.Color(i2223[1], i2223[2], i2223[3], i2223[4])
  return i2222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2226 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2227 = data
  i2226.name = i2227[0]
  i2226.value = new pc.Vec4( i2227[1], i2227[2], i2227[3], i2227[4] )
  return i2226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2231 = data
  i2230.name = i2231[0]
  request.r(i2231[1], i2231[2], 0, i2230, 'value')
  return i2230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2234 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2235 = data
  i2234.name = i2235[0]
  i2234.enabled = !!i2235[1]
  return i2234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2237 = data
  i2236.name = i2237[0]
  i2236.index = i2237[1]
  i2236.startup = !!i2237[2]
  return i2236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2239 = data
  i2238.aspect = i2239[0]
  i2238.orthographic = !!i2239[1]
  i2238.orthographicSize = i2239[2]
  i2238.backgroundColor = new pc.Color(i2239[3], i2239[4], i2239[5], i2239[6])
  i2238.nearClipPlane = i2239[7]
  i2238.farClipPlane = i2239[8]
  i2238.fieldOfView = i2239[9]
  i2238.depth = i2239[10]
  i2238.clearFlags = i2239[11]
  i2238.cullingMask = i2239[12]
  i2238.rect = i2239[13]
  request.r(i2239[14], i2239[15], 0, i2238, 'targetTexture')
  i2238.usePhysicalProperties = !!i2239[16]
  i2238.focalLength = i2239[17]
  i2238.sensorSize = new pc.Vec2( i2239[18], i2239[19] )
  i2238.lensShift = new pc.Vec2( i2239[20], i2239[21] )
  i2238.gateFit = i2239[22]
  i2238.commandBufferCount = i2239[23]
  i2238.cameraType = i2239[24]
  i2238.enabled = !!i2239[25]
  return i2238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2241 = data
  i2240.name = i2241[0]
  i2240.tagId = i2241[1]
  i2240.enabled = !!i2241[2]
  i2240.isStatic = !!i2241[3]
  i2240.layer = i2241[4]
  return i2240
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2242 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2243 = data
  request.r(i2243[0], i2243[1], 0, i2242, 'm_FirstSelected')
  i2242.m_sendNavigationEvents = !!i2243[2]
  i2242.m_DragThreshold = i2243[3]
  return i2242
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2244 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2245 = data
  i2244.m_HorizontalAxis = i2245[0]
  i2244.m_VerticalAxis = i2245[1]
  i2244.m_SubmitButton = i2245[2]
  i2244.m_CancelButton = i2245[3]
  i2244.m_InputActionsPerSecond = i2245[4]
  i2244.m_RepeatDelay = i2245[5]
  i2244.m_ForceModuleActive = !!i2245[6]
  i2244.m_SendPointerHoverToParent = !!i2245[7]
  return i2244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2247 = data
  i2246.pivot = new pc.Vec2( i2247[0], i2247[1] )
  i2246.anchorMin = new pc.Vec2( i2247[2], i2247[3] )
  i2246.anchorMax = new pc.Vec2( i2247[4], i2247[5] )
  i2246.sizeDelta = new pc.Vec2( i2247[6], i2247[7] )
  i2246.anchoredPosition3D = new pc.Vec3( i2247[8], i2247[9], i2247[10] )
  i2246.rotation = new pc.Quat(i2247[11], i2247[12], i2247[13], i2247[14])
  i2246.scale = new pc.Vec3( i2247[15], i2247[16], i2247[17] )
  return i2246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2249 = data
  i2248.planeDistance = i2249[0]
  i2248.referencePixelsPerUnit = i2249[1]
  i2248.isFallbackOverlay = !!i2249[2]
  i2248.renderMode = i2249[3]
  i2248.renderOrder = i2249[4]
  i2248.sortingLayerName = i2249[5]
  i2248.sortingOrder = i2249[6]
  i2248.scaleFactor = i2249[7]
  request.r(i2249[8], i2249[9], 0, i2248, 'worldCamera')
  i2248.overrideSorting = !!i2249[10]
  i2248.pixelPerfect = !!i2249[11]
  i2248.targetDisplay = i2249[12]
  i2248.overridePixelPerfect = !!i2249[13]
  i2248.enabled = !!i2249[14]
  return i2248
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2250 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2251 = data
  i2250.m_UiScaleMode = i2251[0]
  i2250.m_ReferencePixelsPerUnit = i2251[1]
  i2250.m_ScaleFactor = i2251[2]
  i2250.m_ReferenceResolution = new pc.Vec2( i2251[3], i2251[4] )
  i2250.m_ScreenMatchMode = i2251[5]
  i2250.m_MatchWidthOrHeight = i2251[6]
  i2250.m_PhysicalUnit = i2251[7]
  i2250.m_FallbackScreenDPI = i2251[8]
  i2250.m_DefaultSpriteDPI = i2251[9]
  i2250.m_DynamicPixelsPerUnit = i2251[10]
  i2250.m_PresetInfoIsWorld = !!i2251[11]
  return i2250
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2252 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2253 = data
  i2252.m_IgnoreReversedGraphics = !!i2253[0]
  i2252.m_BlockingObjects = i2253[1]
  i2252.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2253[2] )
  return i2252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2254 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2255 = data
  i2254.cullTransparentMesh = !!i2255[0]
  return i2254
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2256 = root || request.c( 'UnityEngine.UI.Image' )
  var i2257 = data
  request.r(i2257[0], i2257[1], 0, i2256, 'm_Sprite')
  i2256.m_Type = i2257[2]
  i2256.m_PreserveAspect = !!i2257[3]
  i2256.m_FillCenter = !!i2257[4]
  i2256.m_FillMethod = i2257[5]
  i2256.m_FillAmount = i2257[6]
  i2256.m_FillClockwise = !!i2257[7]
  i2256.m_FillOrigin = i2257[8]
  i2256.m_UseSpriteMesh = !!i2257[9]
  i2256.m_PixelsPerUnitMultiplier = i2257[10]
  request.r(i2257[11], i2257[12], 0, i2256, 'm_Material')
  i2256.m_Maskable = !!i2257[13]
  i2256.m_Color = new pc.Color(i2257[14], i2257[15], i2257[16], i2257[17])
  i2256.m_RaycastTarget = !!i2257[18]
  i2256.m_RaycastPadding = new pc.Vec4( i2257[19], i2257[20], i2257[21], i2257[22] )
  return i2256
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i2258 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i2259 = data
  i2258.m_AspectMode = i2259[0]
  i2258.m_AspectRatio = i2259[1]
  return i2258
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2260 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2261 = data
  i2260.m_hasFontAssetChanged = !!i2261[0]
  request.r(i2261[1], i2261[2], 0, i2260, 'm_baseMaterial')
  i2260.m_maskOffset = new pc.Vec4( i2261[3], i2261[4], i2261[5], i2261[6] )
  i2260.m_text = i2261[7]
  i2260.m_isRightToLeft = !!i2261[8]
  request.r(i2261[9], i2261[10], 0, i2260, 'm_fontAsset')
  request.r(i2261[11], i2261[12], 0, i2260, 'm_sharedMaterial')
  var i2263 = i2261[13]
  var i2262 = []
  for(var i = 0; i < i2263.length; i += 2) {
  request.r(i2263[i + 0], i2263[i + 1], 2, i2262, '')
  }
  i2260.m_fontSharedMaterials = i2262
  request.r(i2261[14], i2261[15], 0, i2260, 'm_fontMaterial')
  var i2265 = i2261[16]
  var i2264 = []
  for(var i = 0; i < i2265.length; i += 2) {
  request.r(i2265[i + 0], i2265[i + 1], 2, i2264, '')
  }
  i2260.m_fontMaterials = i2264
  i2260.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2261[17], i2261[18], i2261[19], i2261[20])
  i2260.m_fontColor = new pc.Color(i2261[21], i2261[22], i2261[23], i2261[24])
  i2260.m_enableVertexGradient = !!i2261[25]
  i2260.m_colorMode = i2261[26]
  i2260.m_fontColorGradient = request.d('TMPro.VertexGradient', i2261[27], i2260.m_fontColorGradient)
  request.r(i2261[28], i2261[29], 0, i2260, 'm_fontColorGradientPreset')
  request.r(i2261[30], i2261[31], 0, i2260, 'm_spriteAsset')
  i2260.m_tintAllSprites = !!i2261[32]
  request.r(i2261[33], i2261[34], 0, i2260, 'm_StyleSheet')
  i2260.m_TextStyleHashCode = i2261[35]
  i2260.m_overrideHtmlColors = !!i2261[36]
  i2260.m_faceColor = UnityEngine.Color32.ConstructColor(i2261[37], i2261[38], i2261[39], i2261[40])
  i2260.m_fontSize = i2261[41]
  i2260.m_fontSizeBase = i2261[42]
  i2260.m_fontWeight = i2261[43]
  i2260.m_enableAutoSizing = !!i2261[44]
  i2260.m_fontSizeMin = i2261[45]
  i2260.m_fontSizeMax = i2261[46]
  i2260.m_fontStyle = i2261[47]
  i2260.m_HorizontalAlignment = i2261[48]
  i2260.m_VerticalAlignment = i2261[49]
  i2260.m_textAlignment = i2261[50]
  i2260.m_characterSpacing = i2261[51]
  i2260.m_characterHorizontalScale = i2261[52]
  i2260.m_wordSpacing = i2261[53]
  i2260.m_lineSpacing = i2261[54]
  i2260.m_lineSpacingMax = i2261[55]
  i2260.m_paragraphSpacing = i2261[56]
  i2260.m_charWidthMaxAdj = i2261[57]
  i2260.m_TextWrappingMode = i2261[58]
  i2260.m_wordWrappingRatios = i2261[59]
  i2260.m_overflowMode = i2261[60]
  request.r(i2261[61], i2261[62], 0, i2260, 'm_linkedTextComponent')
  request.r(i2261[63], i2261[64], 0, i2260, 'parentLinkedComponent')
  i2260.m_enableKerning = !!i2261[65]
  var i2267 = i2261[66]
  var i2266 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2267.length; i += 1) {
    i2266.add(i2267[i + 0]);
  }
  i2260.m_ActiveFontFeatures = i2266
  i2260.m_enableExtraPadding = !!i2261[67]
  i2260.checkPaddingRequired = !!i2261[68]
  i2260.m_isRichText = !!i2261[69]
  i2260.m_parseCtrlCharacters = !!i2261[70]
  i2260.m_isOrthographic = !!i2261[71]
  i2260.m_isCullingEnabled = !!i2261[72]
  i2260.m_horizontalMapping = i2261[73]
  i2260.m_verticalMapping = i2261[74]
  i2260.m_uvLineOffset = i2261[75]
  i2260.m_geometrySortingOrder = i2261[76]
  i2260.m_IsTextObjectScaleStatic = !!i2261[77]
  i2260.m_VertexBufferAutoSizeReduction = !!i2261[78]
  i2260.m_useMaxVisibleDescender = !!i2261[79]
  i2260.m_pageToDisplay = i2261[80]
  i2260.m_margin = new pc.Vec4( i2261[81], i2261[82], i2261[83], i2261[84] )
  i2260.m_isUsingLegacyAnimationComponent = !!i2261[85]
  i2260.m_isVolumetricText = !!i2261[86]
  request.r(i2261[87], i2261[88], 0, i2260, 'm_Material')
  i2260.m_EmojiFallbackSupport = !!i2261[89]
  i2260.m_Maskable = !!i2261[90]
  i2260.m_Color = new pc.Color(i2261[91], i2261[92], i2261[93], i2261[94])
  i2260.m_RaycastTarget = !!i2261[95]
  i2260.m_RaycastPadding = new pc.Vec4( i2261[96], i2261[97], i2261[98], i2261[99] )
  return i2260
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2270 = root || request.c( 'TMPro.VertexGradient' )
  var i2271 = data
  i2270.topLeft = new pc.Color(i2271[0], i2271[1], i2271[2], i2271[3])
  i2270.topRight = new pc.Color(i2271[4], i2271[5], i2271[6], i2271[7])
  i2270.bottomLeft = new pc.Color(i2271[8], i2271[9], i2271[10], i2271[11])
  i2270.bottomRight = new pc.Color(i2271[12], i2271[13], i2271[14], i2271[15])
  return i2270
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i2274 = root || request.c( 'UnityEngine.UI.Text' )
  var i2275 = data
  i2274.m_FontData = request.d('UnityEngine.UI.FontData', i2275[0], i2274.m_FontData)
  i2274.m_Text = i2275[1]
  request.r(i2275[2], i2275[3], 0, i2274, 'm_Material')
  i2274.m_Maskable = !!i2275[4]
  i2274.m_Color = new pc.Color(i2275[5], i2275[6], i2275[7], i2275[8])
  i2274.m_RaycastTarget = !!i2275[9]
  i2274.m_RaycastPadding = new pc.Vec4( i2275[10], i2275[11], i2275[12], i2275[13] )
  return i2274
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i2276 = root || request.c( 'UnityEngine.UI.FontData' )
  var i2277 = data
  request.r(i2277[0], i2277[1], 0, i2276, 'm_Font')
  i2276.m_FontSize = i2277[2]
  i2276.m_FontStyle = i2277[3]
  i2276.m_BestFit = !!i2277[4]
  i2276.m_MinSize = i2277[5]
  i2276.m_MaxSize = i2277[6]
  i2276.m_Alignment = i2277[7]
  i2276.m_AlignByGeometry = !!i2277[8]
  i2276.m_RichText = !!i2277[9]
  i2276.m_HorizontalOverflow = i2277[10]
  i2276.m_VerticalOverflow = i2277[11]
  i2276.m_LineSpacing = i2277[12]
  return i2276
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i2278 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i2279 = data
  request.r(i2279[0], i2279[1], 0, i2278, 'm_Texture')
  i2278.m_UVRect = UnityEngine.Rect.MinMaxRect(i2279[2], i2279[3], i2279[4], i2279[5])
  request.r(i2279[6], i2279[7], 0, i2278, 'm_Material')
  i2278.m_Maskable = !!i2279[8]
  i2278.m_Color = new pc.Color(i2279[9], i2279[10], i2279[11], i2279[12])
  i2278.m_RaycastTarget = !!i2279[13]
  i2278.m_RaycastPadding = new pc.Vec4( i2279[14], i2279[15], i2279[16], i2279[17] )
  return i2278
}

Deserializers["TutController"] = function (request, data, root) {
  var i2280 = root || request.c( 'TutController' )
  var i2281 = data
  var i2283 = i2281[0]
  var i2282 = new (System.Collections.Generic.List$1(Bridge.ns('Option')))
  for(var i = 0; i < i2283.length; i += 1) {
    i2282.add(request.d('Option', i2283[i + 0]));
  }
  i2280.options = i2282
  i2280.fromScale = i2281[1]
  i2280.toScale = i2281[2]
  i2280.scaleTime = i2281[3]
  i2280.moveTime = i2281[4]
  return i2280
}

Deserializers["Option"] = function (request, data, root) {
  var i2286 = root || request.c( 'Option' )
  var i2287 = data
  i2286.Position = new pc.Vec3( i2287[0], i2287[1], i2287[2] )
  request.r(i2287[3], i2287[4], 0, i2286, 'Demo')
  return i2286
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2288 = root || request.c( 'UnityEngine.UI.Button' )
  var i2289 = data
  i2288.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2289[0], i2288.m_OnClick)
  i2288.m_Navigation = request.d('UnityEngine.UI.Navigation', i2289[1], i2288.m_Navigation)
  i2288.m_Transition = i2289[2]
  i2288.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2289[3], i2288.m_Colors)
  i2288.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2289[4], i2288.m_SpriteState)
  i2288.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2289[5], i2288.m_AnimationTriggers)
  i2288.m_Interactable = !!i2289[6]
  request.r(i2289[7], i2289[8], 0, i2288, 'm_TargetGraphic')
  return i2288
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2290 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2291 = data
  i2290.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2291[0], i2290.m_PersistentCalls)
  return i2290
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2292 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2293 = data
  var i2295 = i2293[0]
  var i2294 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2295.length; i += 1) {
    i2294.add(request.d('UnityEngine.Events.PersistentCall', i2295[i + 0]));
  }
  i2292.m_Calls = i2294
  return i2292
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2298 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2299 = data
  request.r(i2299[0], i2299[1], 0, i2298, 'm_Target')
  i2298.m_TargetAssemblyTypeName = i2299[2]
  i2298.m_MethodName = i2299[3]
  i2298.m_Mode = i2299[4]
  i2298.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2299[5], i2298.m_Arguments)
  i2298.m_CallState = i2299[6]
  return i2298
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2300 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2301 = data
  i2300.m_Mode = i2301[0]
  i2300.m_WrapAround = !!i2301[1]
  request.r(i2301[2], i2301[3], 0, i2300, 'm_SelectOnUp')
  request.r(i2301[4], i2301[5], 0, i2300, 'm_SelectOnDown')
  request.r(i2301[6], i2301[7], 0, i2300, 'm_SelectOnLeft')
  request.r(i2301[8], i2301[9], 0, i2300, 'm_SelectOnRight')
  return i2300
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2302 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2303 = data
  i2302.m_NormalColor = new pc.Color(i2303[0], i2303[1], i2303[2], i2303[3])
  i2302.m_HighlightedColor = new pc.Color(i2303[4], i2303[5], i2303[6], i2303[7])
  i2302.m_PressedColor = new pc.Color(i2303[8], i2303[9], i2303[10], i2303[11])
  i2302.m_SelectedColor = new pc.Color(i2303[12], i2303[13], i2303[14], i2303[15])
  i2302.m_DisabledColor = new pc.Color(i2303[16], i2303[17], i2303[18], i2303[19])
  i2302.m_ColorMultiplier = i2303[20]
  i2302.m_FadeDuration = i2303[21]
  return i2302
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2304 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2305 = data
  request.r(i2305[0], i2305[1], 0, i2304, 'm_HighlightedSprite')
  request.r(i2305[2], i2305[3], 0, i2304, 'm_PressedSprite')
  request.r(i2305[4], i2305[5], 0, i2304, 'm_SelectedSprite')
  request.r(i2305[6], i2305[7], 0, i2304, 'm_DisabledSprite')
  return i2304
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2306 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2307 = data
  i2306.m_NormalTrigger = i2307[0]
  i2306.m_HighlightedTrigger = i2307[1]
  i2306.m_PressedTrigger = i2307[2]
  i2306.m_SelectedTrigger = i2307[3]
  i2306.m_DisabledTrigger = i2307[4]
  return i2306
}

Deserializers["LunaController"] = function (request, data, root) {
  var i2308 = root || request.c( 'LunaController' )
  var i2309 = data
  i2308.TimePlay = i2309[0]
  i2308.LimitTimePlay = !!i2309[1]
  request.r(i2309[2], i2309[3], 0, i2308, 'endCard')
  return i2308
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i2310 = root || request.c( 'LayoutController' )
  var i2311 = data
  request.r(i2311[0], i2311[1], 0, i2310, 'optionV')
  request.r(i2311[2], i2311[3], 0, i2310, 'optionH')
  return i2310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2313 = data
  request.r(i2313[0], i2313[1], 0, i2312, 'clip')
  request.r(i2313[2], i2313[3], 0, i2312, 'outputAudioMixerGroup')
  i2312.playOnAwake = !!i2313[4]
  i2312.loop = !!i2313[5]
  i2312.time = i2313[6]
  i2312.volume = i2313[7]
  i2312.pitch = i2313[8]
  i2312.enabled = !!i2313[9]
  return i2312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2314 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2315 = data
  i2314.ambientIntensity = i2315[0]
  i2314.reflectionIntensity = i2315[1]
  i2314.ambientMode = i2315[2]
  i2314.ambientLight = new pc.Color(i2315[3], i2315[4], i2315[5], i2315[6])
  i2314.ambientSkyColor = new pc.Color(i2315[7], i2315[8], i2315[9], i2315[10])
  i2314.ambientGroundColor = new pc.Color(i2315[11], i2315[12], i2315[13], i2315[14])
  i2314.ambientEquatorColor = new pc.Color(i2315[15], i2315[16], i2315[17], i2315[18])
  i2314.fogColor = new pc.Color(i2315[19], i2315[20], i2315[21], i2315[22])
  i2314.fogEndDistance = i2315[23]
  i2314.fogStartDistance = i2315[24]
  i2314.fogDensity = i2315[25]
  i2314.fog = !!i2315[26]
  request.r(i2315[27], i2315[28], 0, i2314, 'skybox')
  i2314.fogMode = i2315[29]
  var i2317 = i2315[30]
  var i2316 = []
  for(var i = 0; i < i2317.length; i += 1) {
    i2316.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2317[i + 0]) );
  }
  i2314.lightmaps = i2316
  i2314.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2315[31], i2314.lightProbes)
  i2314.lightmapsMode = i2315[32]
  i2314.mixedBakeMode = i2315[33]
  i2314.environmentLightingMode = i2315[34]
  i2314.ambientProbe = new pc.SphericalHarmonicsL2(i2315[35])
  request.r(i2315[36], i2315[37], 0, i2314, 'customReflection')
  request.r(i2315[38], i2315[39], 0, i2314, 'defaultReflection')
  i2314.defaultReflectionMode = i2315[40]
  i2314.defaultReflectionResolution = i2315[41]
  i2314.sunLightObjectId = i2315[42]
  i2314.pixelLightCount = i2315[43]
  i2314.defaultReflectionHDR = !!i2315[44]
  i2314.hasLightDataAsset = !!i2315[45]
  i2314.hasManualGenerate = !!i2315[46]
  return i2314
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2321 = data
  request.r(i2321[0], i2321[1], 0, i2320, 'lightmapColor')
  request.r(i2321[2], i2321[3], 0, i2320, 'lightmapDirection')
  request.r(i2321[4], i2321[5], 0, i2320, 'shadowMask')
  return i2320
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2322 = root || new UnityEngine.LightProbes()
  var i2323 = data
  return i2322
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2331 = data
  var i2333 = i2331[0]
  var i2332 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2333.length; i += 1) {
    i2332.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2333[i + 0]));
  }
  i2330.ShaderCompilationErrors = i2332
  i2330.name = i2331[1]
  i2330.guid = i2331[2]
  var i2335 = i2331[3]
  var i2334 = []
  for(var i = 0; i < i2335.length; i += 1) {
    i2334.push( i2335[i + 0] );
  }
  i2330.shaderDefinedKeywords = i2334
  var i2337 = i2331[4]
  var i2336 = []
  for(var i = 0; i < i2337.length; i += 1) {
    i2336.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2337[i + 0]) );
  }
  i2330.passes = i2336
  var i2339 = i2331[5]
  var i2338 = []
  for(var i = 0; i < i2339.length; i += 1) {
    i2338.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2339[i + 0]) );
  }
  i2330.usePasses = i2338
  var i2341 = i2331[6]
  var i2340 = []
  for(var i = 0; i < i2341.length; i += 1) {
    i2340.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2341[i + 0]) );
  }
  i2330.defaultParameterValues = i2340
  request.r(i2331[7], i2331[8], 0, i2330, 'unityFallbackShader')
  i2330.readDepth = !!i2331[9]
  i2330.hasDepthOnlyPass = !!i2331[10]
  i2330.isCreatedByShaderGraph = !!i2331[11]
  i2330.disableBatching = !!i2331[12]
  i2330.compiled = !!i2331[13]
  return i2330
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2344 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2345 = data
  i2344.shaderName = i2345[0]
  i2344.errorMessage = i2345[1]
  return i2344
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2350 = root || new pc.UnityShaderPass()
  var i2351 = data
  i2350.id = i2351[0]
  i2350.subShaderIndex = i2351[1]
  i2350.name = i2351[2]
  i2350.passType = i2351[3]
  i2350.grabPassTextureName = i2351[4]
  i2350.usePass = !!i2351[5]
  i2350.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[6], i2350.zTest)
  i2350.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[7], i2350.zWrite)
  i2350.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[8], i2350.culling)
  i2350.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2351[9], i2350.blending)
  i2350.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2351[10], i2350.alphaBlending)
  i2350.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[11], i2350.colorWriteMask)
  i2350.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[12], i2350.offsetUnits)
  i2350.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[13], i2350.offsetFactor)
  i2350.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[14], i2350.stencilRef)
  i2350.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[15], i2350.stencilReadMask)
  i2350.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2351[16], i2350.stencilWriteMask)
  i2350.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2351[17], i2350.stencilOp)
  i2350.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2351[18], i2350.stencilOpFront)
  i2350.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2351[19], i2350.stencilOpBack)
  var i2353 = i2351[20]
  var i2352 = []
  for(var i = 0; i < i2353.length; i += 1) {
    i2352.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2353[i + 0]) );
  }
  i2350.tags = i2352
  var i2355 = i2351[21]
  var i2354 = []
  for(var i = 0; i < i2355.length; i += 1) {
    i2354.push( i2355[i + 0] );
  }
  i2350.passDefinedKeywords = i2354
  var i2357 = i2351[22]
  var i2356 = []
  for(var i = 0; i < i2357.length; i += 1) {
    i2356.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2357[i + 0]) );
  }
  i2350.passDefinedKeywordGroups = i2356
  var i2359 = i2351[23]
  var i2358 = []
  for(var i = 0; i < i2359.length; i += 1) {
    i2358.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2359[i + 0]) );
  }
  i2350.variants = i2358
  var i2361 = i2351[24]
  var i2360 = []
  for(var i = 0; i < i2361.length; i += 1) {
    i2360.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2361[i + 0]) );
  }
  i2350.excludedVariants = i2360
  i2350.hasDepthReader = !!i2351[25]
  return i2350
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2362 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2363 = data
  i2362.val = i2363[0]
  i2362.name = i2363[1]
  return i2362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2365 = data
  i2364.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2365[0], i2364.src)
  i2364.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2365[1], i2364.dst)
  i2364.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2365[2], i2364.op)
  return i2364
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2366 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2367 = data
  i2366.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2367[0], i2366.pass)
  i2366.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2367[1], i2366.fail)
  i2366.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2367[2], i2366.zFail)
  i2366.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2367[3], i2366.comp)
  return i2366
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2370 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2371 = data
  i2370.name = i2371[0]
  i2370.value = i2371[1]
  return i2370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2375 = data
  var i2377 = i2375[0]
  var i2376 = []
  for(var i = 0; i < i2377.length; i += 1) {
    i2376.push( i2377[i + 0] );
  }
  i2374.keywords = i2376
  i2374.hasDiscard = !!i2375[1]
  return i2374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2381 = data
  i2380.passId = i2381[0]
  i2380.subShaderIndex = i2381[1]
  var i2383 = i2381[2]
  var i2382 = []
  for(var i = 0; i < i2383.length; i += 1) {
    i2382.push( i2383[i + 0] );
  }
  i2380.keywords = i2382
  i2380.vertexProgram = i2381[3]
  i2380.fragmentProgram = i2381[4]
  i2380.exportedForWebGl2 = !!i2381[5]
  i2380.readDepth = !!i2381[6]
  return i2380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2387 = data
  request.r(i2387[0], i2387[1], 0, i2386, 'shader')
  i2386.pass = i2387[2]
  return i2386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2390 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2391 = data
  i2390.name = i2391[0]
  i2390.type = i2391[1]
  i2390.value = new pc.Vec4( i2391[2], i2391[3], i2391[4], i2391[5] )
  i2390.textureValue = i2391[6]
  i2390.shaderPropertyFlag = i2391[7]
  return i2390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2393 = data
  i2392.name = i2393[0]
  request.r(i2393[1], i2393[2], 0, i2392, 'texture')
  i2392.aabb = i2393[3]
  i2392.vertices = i2393[4]
  i2392.triangles = i2393[5]
  i2392.textureRect = UnityEngine.Rect.MinMaxRect(i2393[6], i2393[7], i2393[8], i2393[9])
  i2392.packedRect = UnityEngine.Rect.MinMaxRect(i2393[10], i2393[11], i2393[12], i2393[13])
  i2392.border = new pc.Vec4( i2393[14], i2393[15], i2393[16], i2393[17] )
  i2392.transparency = i2393[18]
  i2392.bounds = i2393[19]
  i2392.pixelsPerUnit = i2393[20]
  i2392.textureWidth = i2393[21]
  i2392.textureHeight = i2393[22]
  i2392.nativeSize = new pc.Vec2( i2393[23], i2393[24] )
  i2392.pivot = new pc.Vec2( i2393[25], i2393[26] )
  i2392.textureRectOffset = new pc.Vec2( i2393[27], i2393[28] )
  return i2392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2395 = data
  i2394.name = i2395[0]
  return i2394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i2396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i2397 = data
  i2396.name = i2397[0]
  i2396.ascent = i2397[1]
  i2396.originalLineHeight = i2397[2]
  i2396.fontSize = i2397[3]
  var i2399 = i2397[4]
  var i2398 = []
  for(var i = 0; i < i2399.length; i += 1) {
    i2398.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i2399[i + 0]) );
  }
  i2396.characterInfo = i2398
  request.r(i2397[5], i2397[6], 0, i2396, 'texture')
  i2396.originalFontSize = i2397[7]
  return i2396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i2402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i2403 = data
  i2402.index = i2403[0]
  i2402.advance = i2403[1]
  i2402.bearing = i2403[2]
  i2402.glyphWidth = i2403[3]
  i2402.glyphHeight = i2403[4]
  i2402.minX = i2403[5]
  i2402.maxX = i2403[6]
  i2402.minY = i2403[7]
  i2402.maxY = i2403[8]
  i2402.uvBottomLeftX = i2403[9]
  i2402.uvBottomLeftY = i2403[10]
  i2402.uvBottomRightX = i2403[11]
  i2402.uvBottomRightY = i2403[12]
  i2402.uvTopLeftX = i2403[13]
  i2402.uvTopLeftY = i2403[14]
  i2402.uvTopRightX = i2403[15]
  i2402.uvTopRightY = i2403[16]
  return i2402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2405 = data
  i2404.name = i2405[0]
  i2404.bytes64 = i2405[1]
  i2404.data = i2405[2]
  return i2404
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2406 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2407 = data
  i2406.normalStyle = i2407[0]
  i2406.normalSpacingOffset = i2407[1]
  i2406.boldStyle = i2407[2]
  i2406.boldSpacing = i2407[3]
  i2406.italicStyle = i2407[4]
  i2406.tabSize = i2407[5]
  request.r(i2407[6], i2407[7], 0, i2406, 'atlas')
  i2406.m_SourceFontFileGUID = i2407[8]
  i2406.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2407[9], i2406.m_CreationSettings)
  request.r(i2407[10], i2407[11], 0, i2406, 'm_SourceFontFile')
  i2406.m_SourceFontFilePath = i2407[12]
  i2406.m_AtlasPopulationMode = i2407[13]
  i2406.InternalDynamicOS = !!i2407[14]
  var i2409 = i2407[15]
  var i2408 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2409.length; i += 1) {
    i2408.add(request.d('UnityEngine.TextCore.Glyph', i2409[i + 0]));
  }
  i2406.m_GlyphTable = i2408
  var i2411 = i2407[16]
  var i2410 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2411.length; i += 1) {
    i2410.add(request.d('TMPro.TMP_Character', i2411[i + 0]));
  }
  i2406.m_CharacterTable = i2410
  var i2413 = i2407[17]
  var i2412 = []
  for(var i = 0; i < i2413.length; i += 2) {
  request.r(i2413[i + 0], i2413[i + 1], 2, i2412, '')
  }
  i2406.m_AtlasTextures = i2412
  i2406.m_AtlasTextureIndex = i2407[18]
  i2406.m_IsMultiAtlasTexturesEnabled = !!i2407[19]
  i2406.m_GetFontFeatures = !!i2407[20]
  i2406.m_ClearDynamicDataOnBuild = !!i2407[21]
  i2406.m_AtlasWidth = i2407[22]
  i2406.m_AtlasHeight = i2407[23]
  i2406.m_AtlasPadding = i2407[24]
  i2406.m_AtlasRenderMode = i2407[25]
  var i2415 = i2407[26]
  var i2414 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2415.length; i += 1) {
    i2414.add(request.d('UnityEngine.TextCore.GlyphRect', i2415[i + 0]));
  }
  i2406.m_UsedGlyphRects = i2414
  var i2417 = i2407[27]
  var i2416 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2417.length; i += 1) {
    i2416.add(request.d('UnityEngine.TextCore.GlyphRect', i2417[i + 0]));
  }
  i2406.m_FreeGlyphRects = i2416
  i2406.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2407[28], i2406.m_FontFeatureTable)
  i2406.m_ShouldReimportFontFeatures = !!i2407[29]
  var i2419 = i2407[30]
  var i2418 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2419.length; i += 2) {
  request.r(i2419[i + 0], i2419[i + 1], 1, i2418, '')
  }
  i2406.m_FallbackFontAssetTable = i2418
  var i2421 = i2407[31]
  var i2420 = []
  for(var i = 0; i < i2421.length; i += 1) {
    i2420.push( request.d('TMPro.TMP_FontWeightPair', i2421[i + 0]) );
  }
  i2406.m_FontWeightTable = i2420
  var i2423 = i2407[32]
  var i2422 = []
  for(var i = 0; i < i2423.length; i += 1) {
    i2422.push( request.d('TMPro.TMP_FontWeightPair', i2423[i + 0]) );
  }
  i2406.fontWeights = i2422
  i2406.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2407[33], i2406.m_fontInfo)
  var i2425 = i2407[34]
  var i2424 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2425.length; i += 1) {
    i2424.add(request.d('TMPro.TMP_Glyph', i2425[i + 0]));
  }
  i2406.m_glyphInfoList = i2424
  i2406.m_KerningTable = request.d('TMPro.KerningTable', i2407[35], i2406.m_KerningTable)
  var i2427 = i2407[36]
  var i2426 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2427.length; i += 2) {
  request.r(i2427[i + 0], i2427[i + 1], 1, i2426, '')
  }
  i2406.fallbackFontAssets = i2426
  i2406.m_Version = i2407[37]
  i2406.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2407[38], i2406.m_FaceInfo)
  request.r(i2407[39], i2407[40], 0, i2406, 'm_Material')
  return i2406
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2428 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2429 = data
  i2428.sourceFontFileName = i2429[0]
  i2428.sourceFontFileGUID = i2429[1]
  i2428.faceIndex = i2429[2]
  i2428.pointSizeSamplingMode = i2429[3]
  i2428.pointSize = i2429[4]
  i2428.padding = i2429[5]
  i2428.paddingMode = i2429[6]
  i2428.packingMode = i2429[7]
  i2428.atlasWidth = i2429[8]
  i2428.atlasHeight = i2429[9]
  i2428.characterSetSelectionMode = i2429[10]
  i2428.characterSequence = i2429[11]
  i2428.referencedFontAssetGUID = i2429[12]
  i2428.referencedTextAssetGUID = i2429[13]
  i2428.fontStyle = i2429[14]
  i2428.fontStyleModifier = i2429[15]
  i2428.renderMode = i2429[16]
  i2428.includeFontFeatures = !!i2429[17]
  return i2428
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2432 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2433 = data
  i2432.m_Index = i2433[0]
  i2432.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2433[1], i2432.m_Metrics)
  i2432.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2433[2], i2432.m_GlyphRect)
  i2432.m_Scale = i2433[3]
  i2432.m_AtlasIndex = i2433[4]
  i2432.m_ClassDefinitionType = i2433[5]
  return i2432
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2434 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2435 = data
  i2434.m_Width = i2435[0]
  i2434.m_Height = i2435[1]
  i2434.m_HorizontalBearingX = i2435[2]
  i2434.m_HorizontalBearingY = i2435[3]
  i2434.m_HorizontalAdvance = i2435[4]
  return i2434
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2436 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2437 = data
  i2436.m_X = i2437[0]
  i2436.m_Y = i2437[1]
  i2436.m_Width = i2437[2]
  i2436.m_Height = i2437[3]
  return i2436
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2440 = root || request.c( 'TMPro.TMP_Character' )
  var i2441 = data
  i2440.m_ElementType = i2441[0]
  i2440.m_Unicode = i2441[1]
  i2440.m_GlyphIndex = i2441[2]
  i2440.m_Scale = i2441[3]
  return i2440
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2446 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2447 = data
  var i2449 = i2447[0]
  var i2448 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2449.length; i += 1) {
    i2448.add(request.d('TMPro.MultipleSubstitutionRecord', i2449[i + 0]));
  }
  i2446.m_MultipleSubstitutionRecords = i2448
  var i2451 = i2447[1]
  var i2450 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2451.length; i += 1) {
    i2450.add(request.d('TMPro.LigatureSubstitutionRecord', i2451[i + 0]));
  }
  i2446.m_LigatureSubstitutionRecords = i2450
  var i2453 = i2447[2]
  var i2452 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2453.length; i += 1) {
    i2452.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2453[i + 0]));
  }
  i2446.m_GlyphPairAdjustmentRecords = i2452
  var i2455 = i2447[3]
  var i2454 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2455.length; i += 1) {
    i2454.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2455[i + 0]));
  }
  i2446.m_MarkToBaseAdjustmentRecords = i2454
  var i2457 = i2447[4]
  var i2456 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2457.length; i += 1) {
    i2456.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2457[i + 0]));
  }
  i2446.m_MarkToMarkAdjustmentRecords = i2456
  return i2446
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2460 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2461 = data
  i2460.m_TargetGlyphID = i2461[0]
  i2460.m_SubstituteGlyphIDs = i2461[1]
  return i2460
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2464 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2465 = data
  i2464.m_ComponentGlyphIDs = i2465[0]
  i2464.m_LigatureGlyphID = i2465[1]
  return i2464
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2468 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2469 = data
  i2468.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2469[0], i2468.m_FirstAdjustmentRecord)
  i2468.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2469[1], i2468.m_SecondAdjustmentRecord)
  i2468.m_FeatureLookupFlags = i2469[2]
  return i2468
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2472 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2473 = data
  i2472.m_BaseGlyphID = i2473[0]
  i2472.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2473[1], i2472.m_BaseGlyphAnchorPoint)
  i2472.m_MarkGlyphID = i2473[2]
  i2472.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2473[3], i2472.m_MarkPositionAdjustment)
  return i2472
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2476 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2477 = data
  i2476.m_BaseMarkGlyphID = i2477[0]
  i2476.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2477[1], i2476.m_BaseMarkGlyphAnchorPoint)
  i2476.m_CombiningMarkGlyphID = i2477[2]
  i2476.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2477[3], i2476.m_CombiningMarkPositionAdjustment)
  return i2476
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2482 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2483 = data
  request.r(i2483[0], i2483[1], 0, i2482, 'regularTypeface')
  request.r(i2483[2], i2483[3], 0, i2482, 'italicTypeface')
  return i2482
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2484 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2485 = data
  i2484.Name = i2485[0]
  i2484.PointSize = i2485[1]
  i2484.Scale = i2485[2]
  i2484.CharacterCount = i2485[3]
  i2484.LineHeight = i2485[4]
  i2484.Baseline = i2485[5]
  i2484.Ascender = i2485[6]
  i2484.CapHeight = i2485[7]
  i2484.Descender = i2485[8]
  i2484.CenterLine = i2485[9]
  i2484.SuperscriptOffset = i2485[10]
  i2484.SubscriptOffset = i2485[11]
  i2484.SubSize = i2485[12]
  i2484.Underline = i2485[13]
  i2484.UnderlineThickness = i2485[14]
  i2484.strikethrough = i2485[15]
  i2484.strikethroughThickness = i2485[16]
  i2484.TabWidth = i2485[17]
  i2484.Padding = i2485[18]
  i2484.AtlasWidth = i2485[19]
  i2484.AtlasHeight = i2485[20]
  return i2484
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2488 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2489 = data
  i2488.id = i2489[0]
  i2488.x = i2489[1]
  i2488.y = i2489[2]
  i2488.width = i2489[3]
  i2488.height = i2489[4]
  i2488.xOffset = i2489[5]
  i2488.yOffset = i2489[6]
  i2488.xAdvance = i2489[7]
  i2488.scale = i2489[8]
  return i2488
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2490 = root || request.c( 'TMPro.KerningTable' )
  var i2491 = data
  var i2493 = i2491[0]
  var i2492 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2493.length; i += 1) {
    i2492.add(request.d('TMPro.KerningPair', i2493[i + 0]));
  }
  i2490.kerningPairs = i2492
  return i2490
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2496 = root || request.c( 'TMPro.KerningPair' )
  var i2497 = data
  i2496.xOffset = i2497[0]
  i2496.m_FirstGlyph = i2497[1]
  i2496.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2497[2], i2496.m_FirstGlyphAdjustments)
  i2496.m_SecondGlyph = i2497[3]
  i2496.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2497[4], i2496.m_SecondGlyphAdjustments)
  i2496.m_IgnoreSpacingAdjustments = !!i2497[5]
  return i2496
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2498 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2499 = data
  i2498.m_FaceIndex = i2499[0]
  i2498.m_FamilyName = i2499[1]
  i2498.m_StyleName = i2499[2]
  i2498.m_PointSize = i2499[3]
  i2498.m_Scale = i2499[4]
  i2498.m_UnitsPerEM = i2499[5]
  i2498.m_LineHeight = i2499[6]
  i2498.m_AscentLine = i2499[7]
  i2498.m_CapLine = i2499[8]
  i2498.m_MeanLine = i2499[9]
  i2498.m_Baseline = i2499[10]
  i2498.m_DescentLine = i2499[11]
  i2498.m_SuperscriptOffset = i2499[12]
  i2498.m_SuperscriptSize = i2499[13]
  i2498.m_SubscriptOffset = i2499[14]
  i2498.m_SubscriptSize = i2499[15]
  i2498.m_UnderlineOffset = i2499[16]
  i2498.m_UnderlineThickness = i2499[17]
  i2498.m_StrikethroughOffset = i2499[18]
  i2498.m_StrikethroughThickness = i2499[19]
  i2498.m_TabWidth = i2499[20]
  return i2498
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2500 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2501 = data
  i2500.useSafeMode = !!i2501[0]
  i2500.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2501[1], i2500.safeModeOptions)
  i2500.timeScale = i2501[2]
  i2500.unscaledTimeScale = i2501[3]
  i2500.useSmoothDeltaTime = !!i2501[4]
  i2500.maxSmoothUnscaledTime = i2501[5]
  i2500.rewindCallbackMode = i2501[6]
  i2500.showUnityEditorReport = !!i2501[7]
  i2500.logBehaviour = i2501[8]
  i2500.drawGizmos = !!i2501[9]
  i2500.defaultRecyclable = !!i2501[10]
  i2500.defaultAutoPlay = i2501[11]
  i2500.defaultUpdateType = i2501[12]
  i2500.defaultTimeScaleIndependent = !!i2501[13]
  i2500.defaultEaseType = i2501[14]
  i2500.defaultEaseOvershootOrAmplitude = i2501[15]
  i2500.defaultEasePeriod = i2501[16]
  i2500.defaultAutoKill = !!i2501[17]
  i2500.defaultLoopType = i2501[18]
  i2500.debugMode = !!i2501[19]
  i2500.debugStoreTargetId = !!i2501[20]
  i2500.showPreviewPanel = !!i2501[21]
  i2500.storeSettingsLocation = i2501[22]
  i2500.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2501[23], i2500.modules)
  i2500.createASMDEF = !!i2501[24]
  i2500.showPlayingTweens = !!i2501[25]
  i2500.showPausedTweens = !!i2501[26]
  return i2500
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2502 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2503 = data
  i2502.logBehaviour = i2503[0]
  i2502.nestedTweenFailureBehaviour = i2503[1]
  return i2502
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2504 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2505 = data
  i2504.showPanel = !!i2505[0]
  i2504.audioEnabled = !!i2505[1]
  i2504.physicsEnabled = !!i2505[2]
  i2504.physics2DEnabled = !!i2505[3]
  i2504.spriteEnabled = !!i2505[4]
  i2504.uiEnabled = !!i2505[5]
  i2504.textMeshProEnabled = !!i2505[6]
  i2504.tk2DEnabled = !!i2505[7]
  i2504.deAudioEnabled = !!i2505[8]
  i2504.deUnityExtendedEnabled = !!i2505[9]
  i2504.epoOutlineEnabled = !!i2505[10]
  return i2504
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2506 = root || request.c( 'TMPro.TMP_Settings' )
  var i2507 = data
  i2506.assetVersion = i2507[0]
  i2506.m_TextWrappingMode = i2507[1]
  i2506.m_enableKerning = !!i2507[2]
  var i2509 = i2507[3]
  var i2508 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2509.length; i += 1) {
    i2508.add(i2509[i + 0]);
  }
  i2506.m_ActiveFontFeatures = i2508
  i2506.m_enableExtraPadding = !!i2507[4]
  i2506.m_enableTintAllSprites = !!i2507[5]
  i2506.m_enableParseEscapeCharacters = !!i2507[6]
  i2506.m_EnableRaycastTarget = !!i2507[7]
  i2506.m_GetFontFeaturesAtRuntime = !!i2507[8]
  i2506.m_missingGlyphCharacter = i2507[9]
  i2506.m_ClearDynamicDataOnBuild = !!i2507[10]
  i2506.m_warningsDisabled = !!i2507[11]
  request.r(i2507[12], i2507[13], 0, i2506, 'm_defaultFontAsset')
  i2506.m_defaultFontAssetPath = i2507[14]
  i2506.m_defaultFontSize = i2507[15]
  i2506.m_defaultAutoSizeMinRatio = i2507[16]
  i2506.m_defaultAutoSizeMaxRatio = i2507[17]
  i2506.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2507[18], i2507[19] )
  i2506.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2507[20], i2507[21] )
  i2506.m_autoSizeTextContainer = !!i2507[22]
  i2506.m_IsTextObjectScaleStatic = !!i2507[23]
  var i2511 = i2507[24]
  var i2510 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2511.length; i += 2) {
  request.r(i2511[i + 0], i2511[i + 1], 1, i2510, '')
  }
  i2506.m_fallbackFontAssets = i2510
  i2506.m_matchMaterialPreset = !!i2507[25]
  i2506.m_HideSubTextObjects = !!i2507[26]
  request.r(i2507[27], i2507[28], 0, i2506, 'm_defaultSpriteAsset')
  i2506.m_defaultSpriteAssetPath = i2507[29]
  i2506.m_enableEmojiSupport = !!i2507[30]
  i2506.m_MissingCharacterSpriteUnicode = i2507[31]
  var i2513 = i2507[32]
  var i2512 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2513.length; i += 2) {
  request.r(i2513[i + 0], i2513[i + 1], 1, i2512, '')
  }
  i2506.m_EmojiFallbackTextAssets = i2512
  i2506.m_defaultColorGradientPresetsPath = i2507[33]
  request.r(i2507[34], i2507[35], 0, i2506, 'm_defaultStyleSheet')
  i2506.m_StyleSheetsResourcePath = i2507[36]
  request.r(i2507[37], i2507[38], 0, i2506, 'm_leadingCharacters')
  request.r(i2507[39], i2507[40], 0, i2506, 'm_followingCharacters')
  i2506.m_UseModernHangulLineBreakingRules = !!i2507[41]
  return i2506
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2516 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2517 = data
  request.r(i2517[0], i2517[1], 0, i2516, 'spriteSheet')
  var i2519 = i2517[2]
  var i2518 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2519.length; i += 1) {
    i2518.add(request.d('TMPro.TMP_Sprite', i2519[i + 0]));
  }
  i2516.spriteInfoList = i2518
  var i2521 = i2517[3]
  var i2520 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2521.length; i += 2) {
  request.r(i2521[i + 0], i2521[i + 1], 1, i2520, '')
  }
  i2516.fallbackSpriteAssets = i2520
  var i2523 = i2517[4]
  var i2522 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2523.length; i += 1) {
    i2522.add(request.d('TMPro.TMP_SpriteCharacter', i2523[i + 0]));
  }
  i2516.m_SpriteCharacterTable = i2522
  var i2525 = i2517[5]
  var i2524 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2525.length; i += 1) {
    i2524.add(request.d('TMPro.TMP_SpriteGlyph', i2525[i + 0]));
  }
  i2516.m_GlyphTable = i2524
  i2516.m_Version = i2517[6]
  i2516.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2517[7], i2516.m_FaceInfo)
  request.r(i2517[8], i2517[9], 0, i2516, 'm_Material')
  return i2516
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2528 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2529 = data
  i2528.name = i2529[0]
  i2528.hashCode = i2529[1]
  i2528.unicode = i2529[2]
  i2528.pivot = new pc.Vec2( i2529[3], i2529[4] )
  request.r(i2529[5], i2529[6], 0, i2528, 'sprite')
  i2528.id = i2529[7]
  i2528.x = i2529[8]
  i2528.y = i2529[9]
  i2528.width = i2529[10]
  i2528.height = i2529[11]
  i2528.xOffset = i2529[12]
  i2528.yOffset = i2529[13]
  i2528.xAdvance = i2529[14]
  i2528.scale = i2529[15]
  return i2528
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2534 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2535 = data
  i2534.m_Name = i2535[0]
  i2534.m_ElementType = i2535[1]
  i2534.m_Unicode = i2535[2]
  i2534.m_GlyphIndex = i2535[3]
  i2534.m_Scale = i2535[4]
  return i2534
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2538 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2539 = data
  request.r(i2539[0], i2539[1], 0, i2538, 'sprite')
  i2538.m_Index = i2539[2]
  i2538.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2539[3], i2538.m_Metrics)
  i2538.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2539[4], i2538.m_GlyphRect)
  i2538.m_Scale = i2539[5]
  i2538.m_AtlasIndex = i2539[6]
  i2538.m_ClassDefinitionType = i2539[7]
  return i2538
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2540 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2541 = data
  var i2543 = i2541[0]
  var i2542 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2543.length; i += 1) {
    i2542.add(request.d('TMPro.TMP_Style', i2543[i + 0]));
  }
  i2540.m_StyleList = i2542
  return i2540
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2546 = root || request.c( 'TMPro.TMP_Style' )
  var i2547 = data
  i2546.m_Name = i2547[0]
  i2546.m_HashCode = i2547[1]
  i2546.m_OpeningDefinition = i2547[2]
  i2546.m_ClosingDefinition = i2547[3]
  i2546.m_OpeningTagArray = i2547[4]
  i2546.m_ClosingTagArray = i2547[5]
  return i2546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2549 = data
  var i2551 = i2549[0]
  var i2550 = []
  for(var i = 0; i < i2551.length; i += 1) {
    i2550.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2551[i + 0]) );
  }
  i2548.files = i2550
  i2548.componentToPrefabIds = i2549[1]
  return i2548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2555 = data
  i2554.path = i2555[0]
  request.r(i2555[1], i2555[2], 0, i2554, 'unityObject')
  return i2554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2557 = data
  var i2559 = i2557[0]
  var i2558 = []
  for(var i = 0; i < i2559.length; i += 1) {
    i2558.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2559[i + 0]) );
  }
  i2556.scriptsExecutionOrder = i2558
  var i2561 = i2557[1]
  var i2560 = []
  for(var i = 0; i < i2561.length; i += 1) {
    i2560.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2561[i + 0]) );
  }
  i2556.sortingLayers = i2560
  var i2563 = i2557[2]
  var i2562 = []
  for(var i = 0; i < i2563.length; i += 1) {
    i2562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2563[i + 0]) );
  }
  i2556.cullingLayers = i2562
  i2556.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2557[3], i2556.timeSettings)
  i2556.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2557[4], i2556.physicsSettings)
  i2556.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2557[5], i2556.physics2DSettings)
  i2556.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2557[6], i2556.qualitySettings)
  i2556.enableRealtimeShadows = !!i2557[7]
  i2556.enableAutoInstancing = !!i2557[8]
  i2556.enableStaticBatching = !!i2557[9]
  i2556.enableDynamicBatching = !!i2557[10]
  i2556.usePreservativeDynamicBatching = !!i2557[11]
  i2556.lightmapEncodingQuality = i2557[12]
  i2556.desiredColorSpace = i2557[13]
  var i2565 = i2557[14]
  var i2564 = []
  for(var i = 0; i < i2565.length; i += 1) {
    i2564.push( i2565[i + 0] );
  }
  i2556.allTags = i2564
  return i2556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2569 = data
  i2568.name = i2569[0]
  i2568.value = i2569[1]
  return i2568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2573 = data
  i2572.id = i2573[0]
  i2572.name = i2573[1]
  i2572.value = i2573[2]
  return i2572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2577 = data
  i2576.id = i2577[0]
  i2576.name = i2577[1]
  return i2576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2579 = data
  i2578.fixedDeltaTime = i2579[0]
  i2578.maximumDeltaTime = i2579[1]
  i2578.timeScale = i2579[2]
  i2578.maximumParticleTimestep = i2579[3]
  return i2578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2581 = data
  i2580.gravity = new pc.Vec3( i2581[0], i2581[1], i2581[2] )
  i2580.defaultSolverIterations = i2581[3]
  i2580.bounceThreshold = i2581[4]
  i2580.autoSyncTransforms = !!i2581[5]
  i2580.autoSimulation = !!i2581[6]
  var i2583 = i2581[7]
  var i2582 = []
  for(var i = 0; i < i2583.length; i += 1) {
    i2582.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2583[i + 0]) );
  }
  i2580.collisionMatrix = i2582
  return i2580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2587 = data
  i2586.enabled = !!i2587[0]
  i2586.layerId = i2587[1]
  i2586.otherLayerId = i2587[2]
  return i2586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2589 = data
  request.r(i2589[0], i2589[1], 0, i2588, 'material')
  i2588.gravity = new pc.Vec2( i2589[2], i2589[3] )
  i2588.positionIterations = i2589[4]
  i2588.velocityIterations = i2589[5]
  i2588.velocityThreshold = i2589[6]
  i2588.maxLinearCorrection = i2589[7]
  i2588.maxAngularCorrection = i2589[8]
  i2588.maxTranslationSpeed = i2589[9]
  i2588.maxRotationSpeed = i2589[10]
  i2588.baumgarteScale = i2589[11]
  i2588.baumgarteTOIScale = i2589[12]
  i2588.timeToSleep = i2589[13]
  i2588.linearSleepTolerance = i2589[14]
  i2588.angularSleepTolerance = i2589[15]
  i2588.defaultContactOffset = i2589[16]
  i2588.autoSimulation = !!i2589[17]
  i2588.queriesHitTriggers = !!i2589[18]
  i2588.queriesStartInColliders = !!i2589[19]
  i2588.callbacksOnDisable = !!i2589[20]
  i2588.reuseCollisionCallbacks = !!i2589[21]
  i2588.autoSyncTransforms = !!i2589[22]
  var i2591 = i2589[23]
  var i2590 = []
  for(var i = 0; i < i2591.length; i += 1) {
    i2590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2591[i + 0]) );
  }
  i2588.collisionMatrix = i2590
  return i2588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2595 = data
  i2594.enabled = !!i2595[0]
  i2594.layerId = i2595[1]
  i2594.otherLayerId = i2595[2]
  return i2594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2597 = data
  var i2599 = i2597[0]
  var i2598 = []
  for(var i = 0; i < i2599.length; i += 1) {
    i2598.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2599[i + 0]) );
  }
  i2596.qualityLevels = i2598
  var i2601 = i2597[1]
  var i2600 = []
  for(var i = 0; i < i2601.length; i += 1) {
    i2600.push( i2601[i + 0] );
  }
  i2596.names = i2600
  i2596.shadows = i2597[2]
  i2596.anisotropicFiltering = i2597[3]
  i2596.antiAliasing = i2597[4]
  i2596.lodBias = i2597[5]
  i2596.shadowCascades = i2597[6]
  i2596.shadowDistance = i2597[7]
  i2596.shadowmaskMode = i2597[8]
  i2596.shadowProjection = i2597[9]
  i2596.shadowResolution = i2597[10]
  i2596.softParticles = !!i2597[11]
  i2596.softVegetation = !!i2597[12]
  i2596.activeColorSpace = i2597[13]
  i2596.desiredColorSpace = i2597[14]
  i2596.masterTextureLimit = i2597[15]
  i2596.maxQueuedFrames = i2597[16]
  i2596.particleRaycastBudget = i2597[17]
  i2596.pixelLightCount = i2597[18]
  i2596.realtimeReflectionProbes = !!i2597[19]
  i2596.shadowCascade2Split = i2597[20]
  i2596.shadowCascade4Split = new pc.Vec3( i2597[21], i2597[22], i2597[23] )
  i2596.streamingMipmapsActive = !!i2597[24]
  i2596.vSyncCount = i2597[25]
  i2596.asyncUploadBufferSize = i2597[26]
  i2596.asyncUploadTimeSlice = i2597[27]
  i2596.billboardsFaceCameraPosition = !!i2597[28]
  i2596.shadowNearPlaneOffset = i2597[29]
  i2596.streamingMipmapsMemoryBudget = i2597[30]
  i2596.maximumLODLevel = i2597[31]
  i2596.streamingMipmapsAddAllCameras = !!i2597[32]
  i2596.streamingMipmapsMaxLevelReduction = i2597[33]
  i2596.streamingMipmapsRenderersPerFrame = i2597[34]
  i2596.resolutionScalingFixedDPIFactor = i2597[35]
  i2596.streamingMipmapsMaxFileIORequests = i2597[36]
  i2596.currentQualityLevel = i2597[37]
  return i2596
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2604 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2605 = data
  request.r(i2605[0], i2605[1], 0, i2604, 'm_ObjectArgument')
  i2604.m_ObjectArgumentAssemblyTypeName = i2605[2]
  i2604.m_IntArgument = i2605[3]
  i2604.m_FloatArgument = i2605[4]
  i2604.m_StringArgument = i2605[5]
  i2604.m_BoolArgument = !!i2605[6]
  return i2604
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2606 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2607 = data
  i2606.m_GlyphIndex = i2607[0]
  i2606.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2607[1], i2606.m_GlyphValueRecord)
  return i2606
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2608 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2609 = data
  i2608.m_XCoordinate = i2609[0]
  i2608.m_YCoordinate = i2609[1]
  return i2608
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2610 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2611 = data
  i2610.m_XPositionAdjustment = i2611[0]
  i2610.m_YPositionAdjustment = i2611[1]
  return i2610
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2612 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2613 = data
  i2612.xPlacement = i2613[0]
  i2612.yPlacement = i2613[1]
  i2612.xAdvance = i2613[2]
  i2612.yAdvance = i2613[3]
  return i2612
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2614 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2615 = data
  i2614.m_XPlacement = i2615[0]
  i2614.m_YPlacement = i2615[1]
  i2614.m_XAdvance = i2615[2]
  i2614.m_YAdvance = i2615[3]
  return i2614
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

Deserializers.runtimeAnalysisExcludedClassesCount = "1785";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4062";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.CJ_V09";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "fa687f81-b46f-452c-82aa-d45467a766f7";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

