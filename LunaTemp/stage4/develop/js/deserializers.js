var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2202 = root || request.c( 'UnityEngine.JointSpring' )
  var i2203 = data
  i2202.spring = i2203[0]
  i2202.damper = i2203[1]
  i2202.targetPosition = i2203[2]
  return i2202
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2204 = root || request.c( 'UnityEngine.JointMotor' )
  var i2205 = data
  i2204.m_TargetVelocity = i2205[0]
  i2204.m_Force = i2205[1]
  i2204.m_FreeSpin = i2205[2]
  return i2204
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2206 = root || request.c( 'UnityEngine.JointLimits' )
  var i2207 = data
  i2206.m_Min = i2207[0]
  i2206.m_Max = i2207[1]
  i2206.m_Bounciness = i2207[2]
  i2206.m_BounceMinVelocity = i2207[3]
  i2206.m_ContactDistance = i2207[4]
  i2206.minBounce = i2207[5]
  i2206.maxBounce = i2207[6]
  return i2206
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2208 = root || request.c( 'UnityEngine.JointDrive' )
  var i2209 = data
  i2208.m_PositionSpring = i2209[0]
  i2208.m_PositionDamper = i2209[1]
  i2208.m_MaximumForce = i2209[2]
  i2208.m_UseAcceleration = i2209[3]
  return i2208
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2210 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2211 = data
  i2210.m_Spring = i2211[0]
  i2210.m_Damper = i2211[1]
  return i2210
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2212 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2213 = data
  i2212.m_Limit = i2213[0]
  i2212.m_Bounciness = i2213[1]
  i2212.m_ContactDistance = i2213[2]
  return i2212
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2214 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2215 = data
  i2214.m_ExtremumSlip = i2215[0]
  i2214.m_ExtremumValue = i2215[1]
  i2214.m_AsymptoteSlip = i2215[2]
  i2214.m_AsymptoteValue = i2215[3]
  i2214.m_Stiffness = i2215[4]
  return i2214
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2216 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2217 = data
  i2216.m_LowerAngle = i2217[0]
  i2216.m_UpperAngle = i2217[1]
  return i2216
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2218 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2219 = data
  i2218.m_MotorSpeed = i2219[0]
  i2218.m_MaximumMotorTorque = i2219[1]
  return i2218
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2220 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2221 = data
  i2220.m_DampingRatio = i2221[0]
  i2220.m_Frequency = i2221[1]
  i2220.m_Angle = i2221[2]
  return i2220
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2222 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2223 = data
  i2222.m_LowerTranslation = i2223[0]
  i2222.m_UpperTranslation = i2223[1]
  return i2222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2224 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2225 = data
  i2224.name = i2225[0]
  i2224.width = i2225[1]
  i2224.height = i2225[2]
  i2224.mipmapCount = i2225[3]
  i2224.anisoLevel = i2225[4]
  i2224.filterMode = i2225[5]
  i2224.hdr = !!i2225[6]
  i2224.format = i2225[7]
  i2224.wrapMode = i2225[8]
  i2224.alphaIsTransparency = !!i2225[9]
  i2224.alphaSource = i2225[10]
  i2224.graphicsFormat = i2225[11]
  i2224.sRGBTexture = !!i2225[12]
  i2224.desiredColorSpace = i2225[13]
  i2224.wrapU = i2225[14]
  i2224.wrapV = i2225[15]
  return i2224
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2226 = root || new pc.UnityMaterial()
  var i2227 = data
  i2226.name = i2227[0]
  request.r(i2227[1], i2227[2], 0, i2226, 'shader')
  i2226.renderQueue = i2227[3]
  i2226.enableInstancing = !!i2227[4]
  var i2229 = i2227[5]
  var i2228 = []
  for(var i = 0; i < i2229.length; i += 1) {
    i2228.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2229[i + 0]) );
  }
  i2226.floatParameters = i2228
  var i2231 = i2227[6]
  var i2230 = []
  for(var i = 0; i < i2231.length; i += 1) {
    i2230.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2231[i + 0]) );
  }
  i2226.colorParameters = i2230
  var i2233 = i2227[7]
  var i2232 = []
  for(var i = 0; i < i2233.length; i += 1) {
    i2232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2233[i + 0]) );
  }
  i2226.vectorParameters = i2232
  var i2235 = i2227[8]
  var i2234 = []
  for(var i = 0; i < i2235.length; i += 1) {
    i2234.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2235[i + 0]) );
  }
  i2226.textureParameters = i2234
  var i2237 = i2227[9]
  var i2236 = []
  for(var i = 0; i < i2237.length; i += 1) {
    i2236.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2237[i + 0]) );
  }
  i2226.materialFlags = i2236
  return i2226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2241 = data
  i2240.name = i2241[0]
  i2240.value = i2241[1]
  return i2240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2245 = data
  i2244.name = i2245[0]
  i2244.value = new pc.Color(i2245[1], i2245[2], i2245[3], i2245[4])
  return i2244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2248 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2249 = data
  i2248.name = i2249[0]
  i2248.value = new pc.Vec4( i2249[1], i2249[2], i2249[3], i2249[4] )
  return i2248
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2252 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2253 = data
  i2252.name = i2253[0]
  request.r(i2253[1], i2253[2], 0, i2252, 'value')
  return i2252
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2257 = data
  i2256.name = i2257[0]
  i2256.enabled = !!i2257[1]
  return i2256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2258 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2259 = data
  i2258.name = i2259[0]
  i2258.index = i2259[1]
  i2258.startup = !!i2259[2]
  return i2258
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2261 = data
  i2260.aspect = i2261[0]
  i2260.orthographic = !!i2261[1]
  i2260.orthographicSize = i2261[2]
  i2260.backgroundColor = new pc.Color(i2261[3], i2261[4], i2261[5], i2261[6])
  i2260.nearClipPlane = i2261[7]
  i2260.farClipPlane = i2261[8]
  i2260.fieldOfView = i2261[9]
  i2260.depth = i2261[10]
  i2260.clearFlags = i2261[11]
  i2260.cullingMask = i2261[12]
  i2260.rect = i2261[13]
  request.r(i2261[14], i2261[15], 0, i2260, 'targetTexture')
  i2260.usePhysicalProperties = !!i2261[16]
  i2260.focalLength = i2261[17]
  i2260.sensorSize = new pc.Vec2( i2261[18], i2261[19] )
  i2260.lensShift = new pc.Vec2( i2261[20], i2261[21] )
  i2260.gateFit = i2261[22]
  i2260.commandBufferCount = i2261[23]
  i2260.cameraType = i2261[24]
  i2260.enabled = !!i2261[25]
  return i2260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2262 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2263 = data
  i2262.name = i2263[0]
  i2262.tagId = i2263[1]
  i2262.enabled = !!i2263[2]
  i2262.isStatic = !!i2263[3]
  i2262.layer = i2263[4]
  return i2262
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i2264 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i2265 = data
  request.r(i2265[0], i2265[1], 0, i2264, 'm_FirstSelected')
  i2264.m_sendNavigationEvents = !!i2265[2]
  i2264.m_DragThreshold = i2265[3]
  return i2264
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i2266 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i2267 = data
  i2266.m_HorizontalAxis = i2267[0]
  i2266.m_VerticalAxis = i2267[1]
  i2266.m_SubmitButton = i2267[2]
  i2266.m_CancelButton = i2267[3]
  i2266.m_InputActionsPerSecond = i2267[4]
  i2266.m_RepeatDelay = i2267[5]
  i2266.m_ForceModuleActive = !!i2267[6]
  i2266.m_SendPointerHoverToParent = !!i2267[7]
  return i2266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2269 = data
  i2268.pivot = new pc.Vec2( i2269[0], i2269[1] )
  i2268.anchorMin = new pc.Vec2( i2269[2], i2269[3] )
  i2268.anchorMax = new pc.Vec2( i2269[4], i2269[5] )
  i2268.sizeDelta = new pc.Vec2( i2269[6], i2269[7] )
  i2268.anchoredPosition3D = new pc.Vec3( i2269[8], i2269[9], i2269[10] )
  i2268.rotation = new pc.Quat(i2269[11], i2269[12], i2269[13], i2269[14])
  i2268.scale = new pc.Vec3( i2269[15], i2269[16], i2269[17] )
  return i2268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i2270 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i2271 = data
  i2270.planeDistance = i2271[0]
  i2270.referencePixelsPerUnit = i2271[1]
  i2270.isFallbackOverlay = !!i2271[2]
  i2270.renderMode = i2271[3]
  i2270.renderOrder = i2271[4]
  i2270.sortingLayerName = i2271[5]
  i2270.sortingOrder = i2271[6]
  i2270.scaleFactor = i2271[7]
  request.r(i2271[8], i2271[9], 0, i2270, 'worldCamera')
  i2270.overrideSorting = !!i2271[10]
  i2270.pixelPerfect = !!i2271[11]
  i2270.targetDisplay = i2271[12]
  i2270.overridePixelPerfect = !!i2271[13]
  i2270.enabled = !!i2271[14]
  return i2270
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i2272 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i2273 = data
  i2272.m_UiScaleMode = i2273[0]
  i2272.m_ReferencePixelsPerUnit = i2273[1]
  i2272.m_ScaleFactor = i2273[2]
  i2272.m_ReferenceResolution = new pc.Vec2( i2273[3], i2273[4] )
  i2272.m_ScreenMatchMode = i2273[5]
  i2272.m_MatchWidthOrHeight = i2273[6]
  i2272.m_PhysicalUnit = i2273[7]
  i2272.m_FallbackScreenDPI = i2273[8]
  i2272.m_DefaultSpriteDPI = i2273[9]
  i2272.m_DynamicPixelsPerUnit = i2273[10]
  i2272.m_PresetInfoIsWorld = !!i2273[11]
  return i2272
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i2274 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i2275 = data
  i2274.m_IgnoreReversedGraphics = !!i2275[0]
  i2274.m_BlockingObjects = i2275[1]
  i2274.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i2275[2] )
  return i2274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2277 = data
  i2276.cullTransparentMesh = !!i2277[0]
  return i2276
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i2278 = root || request.c( 'UnityEngine.UI.Image' )
  var i2279 = data
  request.r(i2279[0], i2279[1], 0, i2278, 'm_Sprite')
  i2278.m_Type = i2279[2]
  i2278.m_PreserveAspect = !!i2279[3]
  i2278.m_FillCenter = !!i2279[4]
  i2278.m_FillMethod = i2279[5]
  i2278.m_FillAmount = i2279[6]
  i2278.m_FillClockwise = !!i2279[7]
  i2278.m_FillOrigin = i2279[8]
  i2278.m_UseSpriteMesh = !!i2279[9]
  i2278.m_PixelsPerUnitMultiplier = i2279[10]
  request.r(i2279[11], i2279[12], 0, i2278, 'm_Material')
  i2278.m_Maskable = !!i2279[13]
  i2278.m_Color = new pc.Color(i2279[14], i2279[15], i2279[16], i2279[17])
  i2278.m_RaycastTarget = !!i2279[18]
  i2278.m_RaycastPadding = new pc.Vec4( i2279[19], i2279[20], i2279[21], i2279[22] )
  return i2278
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i2280 = root || request.c( 'UnityEngine.UI.Mask' )
  var i2281 = data
  i2280.m_ShowMaskGraphic = !!i2281[0]
  return i2280
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i2282 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i2283 = data
  i2282.targetIsSelf = !!i2283[0]
  request.r(i2283[1], i2283[2], 0, i2282, 'targetGO')
  i2282.tweenTargetIsTargetGO = !!i2283[3]
  i2282.delay = i2283[4]
  i2282.duration = i2283[5]
  i2282.easeType = i2283[6]
  i2282.easeCurve = new pc.AnimationCurve( { keys_flow: i2283[7] } )
  i2282.loopType = i2283[8]
  i2282.loops = i2283[9]
  i2282.id = i2283[10]
  i2282.isRelative = !!i2283[11]
  i2282.isFrom = !!i2283[12]
  i2282.isIndependentUpdate = !!i2283[13]
  i2282.autoKill = !!i2283[14]
  i2282.autoGenerate = !!i2283[15]
  i2282.isActive = !!i2283[16]
  i2282.isValid = !!i2283[17]
  request.r(i2283[18], i2283[19], 0, i2282, 'target')
  i2282.animationType = i2283[20]
  i2282.targetType = i2283[21]
  i2282.forcedTargetType = i2283[22]
  i2282.autoPlay = !!i2283[23]
  i2282.useTargetAsV3 = !!i2283[24]
  i2282.endValueFloat = i2283[25]
  i2282.endValueV3 = new pc.Vec3( i2283[26], i2283[27], i2283[28] )
  i2282.endValueV2 = new pc.Vec2( i2283[29], i2283[30] )
  i2282.endValueColor = new pc.Color(i2283[31], i2283[32], i2283[33], i2283[34])
  i2282.endValueString = i2283[35]
  i2282.endValueRect = UnityEngine.Rect.MinMaxRect(i2283[36], i2283[37], i2283[38], i2283[39])
  request.r(i2283[40], i2283[41], 0, i2282, 'endValueTransform')
  i2282.optionalBool0 = !!i2283[42]
  i2282.optionalBool1 = !!i2283[43]
  i2282.optionalFloat0 = i2283[44]
  i2282.optionalInt0 = i2283[45]
  i2282.optionalRotationMode = i2283[46]
  i2282.optionalScrambleMode = i2283[47]
  i2282.optionalShakeRandomnessMode = i2283[48]
  i2282.optionalString = i2283[49]
  i2282.updateType = i2283[50]
  i2282.isSpeedBased = !!i2283[51]
  i2282.hasOnStart = !!i2283[52]
  i2282.hasOnPlay = !!i2283[53]
  i2282.hasOnUpdate = !!i2283[54]
  i2282.hasOnStepComplete = !!i2283[55]
  i2282.hasOnComplete = !!i2283[56]
  i2282.hasOnTweenCreated = !!i2283[57]
  i2282.hasOnRewind = !!i2283[58]
  i2282.onStart = request.d('UnityEngine.Events.UnityEvent', i2283[59], i2282.onStart)
  i2282.onPlay = request.d('UnityEngine.Events.UnityEvent', i2283[60], i2282.onPlay)
  i2282.onUpdate = request.d('UnityEngine.Events.UnityEvent', i2283[61], i2282.onUpdate)
  i2282.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i2283[62], i2282.onStepComplete)
  i2282.onComplete = request.d('UnityEngine.Events.UnityEvent', i2283[63], i2282.onComplete)
  i2282.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i2283[64], i2282.onTweenCreated)
  i2282.onRewind = request.d('UnityEngine.Events.UnityEvent', i2283[65], i2282.onRewind)
  return i2282
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i2284 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i2285 = data
  i2284.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2285[0], i2284.m_PersistentCalls)
  return i2284
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i2286 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i2287 = data
  var i2289 = i2287[0]
  var i2288 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i2289.length; i += 1) {
    i2288.add(request.d('UnityEngine.Events.PersistentCall', i2289[i + 0]));
  }
  i2286.m_Calls = i2288
  return i2286
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i2292 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i2293 = data
  request.r(i2293[0], i2293[1], 0, i2292, 'm_Target')
  i2292.m_TargetAssemblyTypeName = i2293[2]
  i2292.m_MethodName = i2293[3]
  i2292.m_Mode = i2293[4]
  i2292.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i2293[5], i2292.m_Arguments)
  i2292.m_CallState = i2293[6]
  return i2292
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i2294 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i2295 = data
  i2294.m_hasFontAssetChanged = !!i2295[0]
  request.r(i2295[1], i2295[2], 0, i2294, 'm_baseMaterial')
  i2294.m_maskOffset = new pc.Vec4( i2295[3], i2295[4], i2295[5], i2295[6] )
  i2294.m_text = i2295[7]
  i2294.m_isRightToLeft = !!i2295[8]
  request.r(i2295[9], i2295[10], 0, i2294, 'm_fontAsset')
  request.r(i2295[11], i2295[12], 0, i2294, 'm_sharedMaterial')
  var i2297 = i2295[13]
  var i2296 = []
  for(var i = 0; i < i2297.length; i += 2) {
  request.r(i2297[i + 0], i2297[i + 1], 2, i2296, '')
  }
  i2294.m_fontSharedMaterials = i2296
  request.r(i2295[14], i2295[15], 0, i2294, 'm_fontMaterial')
  var i2299 = i2295[16]
  var i2298 = []
  for(var i = 0; i < i2299.length; i += 2) {
  request.r(i2299[i + 0], i2299[i + 1], 2, i2298, '')
  }
  i2294.m_fontMaterials = i2298
  i2294.m_fontColor32 = UnityEngine.Color32.ConstructColor(i2295[17], i2295[18], i2295[19], i2295[20])
  i2294.m_fontColor = new pc.Color(i2295[21], i2295[22], i2295[23], i2295[24])
  i2294.m_enableVertexGradient = !!i2295[25]
  i2294.m_colorMode = i2295[26]
  i2294.m_fontColorGradient = request.d('TMPro.VertexGradient', i2295[27], i2294.m_fontColorGradient)
  request.r(i2295[28], i2295[29], 0, i2294, 'm_fontColorGradientPreset')
  request.r(i2295[30], i2295[31], 0, i2294, 'm_spriteAsset')
  i2294.m_tintAllSprites = !!i2295[32]
  request.r(i2295[33], i2295[34], 0, i2294, 'm_StyleSheet')
  i2294.m_TextStyleHashCode = i2295[35]
  i2294.m_overrideHtmlColors = !!i2295[36]
  i2294.m_faceColor = UnityEngine.Color32.ConstructColor(i2295[37], i2295[38], i2295[39], i2295[40])
  i2294.m_fontSize = i2295[41]
  i2294.m_fontSizeBase = i2295[42]
  i2294.m_fontWeight = i2295[43]
  i2294.m_enableAutoSizing = !!i2295[44]
  i2294.m_fontSizeMin = i2295[45]
  i2294.m_fontSizeMax = i2295[46]
  i2294.m_fontStyle = i2295[47]
  i2294.m_HorizontalAlignment = i2295[48]
  i2294.m_VerticalAlignment = i2295[49]
  i2294.m_textAlignment = i2295[50]
  i2294.m_characterSpacing = i2295[51]
  i2294.m_characterHorizontalScale = i2295[52]
  i2294.m_wordSpacing = i2295[53]
  i2294.m_lineSpacing = i2295[54]
  i2294.m_lineSpacingMax = i2295[55]
  i2294.m_paragraphSpacing = i2295[56]
  i2294.m_charWidthMaxAdj = i2295[57]
  i2294.m_TextWrappingMode = i2295[58]
  i2294.m_wordWrappingRatios = i2295[59]
  i2294.m_overflowMode = i2295[60]
  request.r(i2295[61], i2295[62], 0, i2294, 'm_linkedTextComponent')
  request.r(i2295[63], i2295[64], 0, i2294, 'parentLinkedComponent')
  i2294.m_enableKerning = !!i2295[65]
  var i2301 = i2295[66]
  var i2300 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2301.length; i += 1) {
    i2300.add(i2301[i + 0]);
  }
  i2294.m_ActiveFontFeatures = i2300
  i2294.m_enableExtraPadding = !!i2295[67]
  i2294.checkPaddingRequired = !!i2295[68]
  i2294.m_isRichText = !!i2295[69]
  i2294.m_parseCtrlCharacters = !!i2295[70]
  i2294.m_isOrthographic = !!i2295[71]
  i2294.m_isCullingEnabled = !!i2295[72]
  i2294.m_horizontalMapping = i2295[73]
  i2294.m_verticalMapping = i2295[74]
  i2294.m_uvLineOffset = i2295[75]
  i2294.m_geometrySortingOrder = i2295[76]
  i2294.m_IsTextObjectScaleStatic = !!i2295[77]
  i2294.m_VertexBufferAutoSizeReduction = !!i2295[78]
  i2294.m_useMaxVisibleDescender = !!i2295[79]
  i2294.m_pageToDisplay = i2295[80]
  i2294.m_margin = new pc.Vec4( i2295[81], i2295[82], i2295[83], i2295[84] )
  i2294.m_isUsingLegacyAnimationComponent = !!i2295[85]
  i2294.m_isVolumetricText = !!i2295[86]
  request.r(i2295[87], i2295[88], 0, i2294, 'm_Material')
  i2294.m_EmojiFallbackSupport = !!i2295[89]
  i2294.m_Maskable = !!i2295[90]
  i2294.m_Color = new pc.Color(i2295[91], i2295[92], i2295[93], i2295[94])
  i2294.m_RaycastTarget = !!i2295[95]
  i2294.m_RaycastPadding = new pc.Vec4( i2295[96], i2295[97], i2295[98], i2295[99] )
  return i2294
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i2304 = root || request.c( 'TMPro.VertexGradient' )
  var i2305 = data
  i2304.topLeft = new pc.Color(i2305[0], i2305[1], i2305[2], i2305[3])
  i2304.topRight = new pc.Color(i2305[4], i2305[5], i2305[6], i2305[7])
  i2304.bottomLeft = new pc.Color(i2305[8], i2305[9], i2305[10], i2305[11])
  i2304.bottomRight = new pc.Color(i2305[12], i2305[13], i2305[14], i2305[15])
  return i2304
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i2308 = root || request.c( 'UnityEngine.UI.Button' )
  var i2309 = data
  i2308.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i2309[0], i2308.m_OnClick)
  i2308.m_Navigation = request.d('UnityEngine.UI.Navigation', i2309[1], i2308.m_Navigation)
  i2308.m_Transition = i2309[2]
  i2308.m_Colors = request.d('UnityEngine.UI.ColorBlock', i2309[3], i2308.m_Colors)
  i2308.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i2309[4], i2308.m_SpriteState)
  i2308.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i2309[5], i2308.m_AnimationTriggers)
  i2308.m_Interactable = !!i2309[6]
  request.r(i2309[7], i2309[8], 0, i2308, 'm_TargetGraphic')
  return i2308
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i2310 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i2311 = data
  i2310.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i2311[0], i2310.m_PersistentCalls)
  return i2310
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i2312 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i2313 = data
  i2312.m_Mode = i2313[0]
  i2312.m_WrapAround = !!i2313[1]
  request.r(i2313[2], i2313[3], 0, i2312, 'm_SelectOnUp')
  request.r(i2313[4], i2313[5], 0, i2312, 'm_SelectOnDown')
  request.r(i2313[6], i2313[7], 0, i2312, 'm_SelectOnLeft')
  request.r(i2313[8], i2313[9], 0, i2312, 'm_SelectOnRight')
  return i2312
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i2314 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i2315 = data
  i2314.m_NormalColor = new pc.Color(i2315[0], i2315[1], i2315[2], i2315[3])
  i2314.m_HighlightedColor = new pc.Color(i2315[4], i2315[5], i2315[6], i2315[7])
  i2314.m_PressedColor = new pc.Color(i2315[8], i2315[9], i2315[10], i2315[11])
  i2314.m_SelectedColor = new pc.Color(i2315[12], i2315[13], i2315[14], i2315[15])
  i2314.m_DisabledColor = new pc.Color(i2315[16], i2315[17], i2315[18], i2315[19])
  i2314.m_ColorMultiplier = i2315[20]
  i2314.m_FadeDuration = i2315[21]
  return i2314
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i2316 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i2317 = data
  request.r(i2317[0], i2317[1], 0, i2316, 'm_HighlightedSprite')
  request.r(i2317[2], i2317[3], 0, i2316, 'm_PressedSprite')
  request.r(i2317[4], i2317[5], 0, i2316, 'm_SelectedSprite')
  request.r(i2317[6], i2317[7], 0, i2316, 'm_DisabledSprite')
  return i2316
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i2318 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i2319 = data
  i2318.m_NormalTrigger = i2319[0]
  i2318.m_HighlightedTrigger = i2319[1]
  i2318.m_PressedTrigger = i2319[2]
  i2318.m_SelectedTrigger = i2319[3]
  i2318.m_DisabledTrigger = i2319[4]
  return i2318
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i2320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i2321 = data
  request.r(i2321[0], i2321[1], 0, i2320, 'clip')
  request.r(i2321[2], i2321[3], 0, i2320, 'outputAudioMixerGroup')
  i2320.playOnAwake = !!i2321[4]
  i2320.loop = !!i2321[5]
  i2320.time = i2321[6]
  i2320.volume = i2321[7]
  i2320.pitch = i2321[8]
  i2320.enabled = !!i2321[9]
  return i2320
}

Deserializers["LunaController"] = function (request, data, root) {
  var i2322 = root || request.c( 'LunaController' )
  var i2323 = data
  i2322.TimePlay = i2323[0]
  i2322.LimitTimePlay = !!i2323[1]
  i2322.BGColor = new pc.Color(i2323[2], i2323[3], i2323[4], i2323[5])
  request.r(i2323[6], i2323[7], 0, i2322, 'BGImage')
  request.r(i2323[8], i2323[9], 0, i2322, 'endCard')
  return i2322
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i2324 = root || request.c( 'LayoutController' )
  var i2325 = data
  request.r(i2325[0], i2325[1], 0, i2324, 'logo1')
  request.r(i2325[2], i2325[3], 0, i2324, 'logo2')
  request.r(i2325[4], i2325[5], 0, i2324, 'CTA1')
  request.r(i2325[6], i2325[7], 0, i2324, 'CTA2')
  request.r(i2325[8], i2325[9], 0, i2324, 'CTA3')
  return i2324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2327 = data
  i2326.ambientIntensity = i2327[0]
  i2326.reflectionIntensity = i2327[1]
  i2326.ambientMode = i2327[2]
  i2326.ambientLight = new pc.Color(i2327[3], i2327[4], i2327[5], i2327[6])
  i2326.ambientSkyColor = new pc.Color(i2327[7], i2327[8], i2327[9], i2327[10])
  i2326.ambientGroundColor = new pc.Color(i2327[11], i2327[12], i2327[13], i2327[14])
  i2326.ambientEquatorColor = new pc.Color(i2327[15], i2327[16], i2327[17], i2327[18])
  i2326.fogColor = new pc.Color(i2327[19], i2327[20], i2327[21], i2327[22])
  i2326.fogEndDistance = i2327[23]
  i2326.fogStartDistance = i2327[24]
  i2326.fogDensity = i2327[25]
  i2326.fog = !!i2327[26]
  request.r(i2327[27], i2327[28], 0, i2326, 'skybox')
  i2326.fogMode = i2327[29]
  var i2329 = i2327[30]
  var i2328 = []
  for(var i = 0; i < i2329.length; i += 1) {
    i2328.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2329[i + 0]) );
  }
  i2326.lightmaps = i2328
  i2326.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2327[31], i2326.lightProbes)
  i2326.lightmapsMode = i2327[32]
  i2326.mixedBakeMode = i2327[33]
  i2326.environmentLightingMode = i2327[34]
  i2326.ambientProbe = new pc.SphericalHarmonicsL2(i2327[35])
  request.r(i2327[36], i2327[37], 0, i2326, 'customReflection')
  request.r(i2327[38], i2327[39], 0, i2326, 'defaultReflection')
  i2326.defaultReflectionMode = i2327[40]
  i2326.defaultReflectionResolution = i2327[41]
  i2326.sunLightObjectId = i2327[42]
  i2326.pixelLightCount = i2327[43]
  i2326.defaultReflectionHDR = !!i2327[44]
  i2326.hasLightDataAsset = !!i2327[45]
  i2326.hasManualGenerate = !!i2327[46]
  return i2326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2332 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2333 = data
  request.r(i2333[0], i2333[1], 0, i2332, 'lightmapColor')
  request.r(i2333[2], i2333[3], 0, i2332, 'lightmapDirection')
  request.r(i2333[4], i2333[5], 0, i2332, 'shadowMask')
  return i2332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2334 = root || new UnityEngine.LightProbes()
  var i2335 = data
  return i2334
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2342 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2343 = data
  var i2345 = i2343[0]
  var i2344 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2345.length; i += 1) {
    i2344.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2345[i + 0]));
  }
  i2342.ShaderCompilationErrors = i2344
  i2342.name = i2343[1]
  i2342.guid = i2343[2]
  var i2347 = i2343[3]
  var i2346 = []
  for(var i = 0; i < i2347.length; i += 1) {
    i2346.push( i2347[i + 0] );
  }
  i2342.shaderDefinedKeywords = i2346
  var i2349 = i2343[4]
  var i2348 = []
  for(var i = 0; i < i2349.length; i += 1) {
    i2348.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2349[i + 0]) );
  }
  i2342.passes = i2348
  var i2351 = i2343[5]
  var i2350 = []
  for(var i = 0; i < i2351.length; i += 1) {
    i2350.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2351[i + 0]) );
  }
  i2342.usePasses = i2350
  var i2353 = i2343[6]
  var i2352 = []
  for(var i = 0; i < i2353.length; i += 1) {
    i2352.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2353[i + 0]) );
  }
  i2342.defaultParameterValues = i2352
  request.r(i2343[7], i2343[8], 0, i2342, 'unityFallbackShader')
  i2342.readDepth = !!i2343[9]
  i2342.hasDepthOnlyPass = !!i2343[10]
  i2342.isCreatedByShaderGraph = !!i2343[11]
  i2342.disableBatching = !!i2343[12]
  i2342.compiled = !!i2343[13]
  return i2342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2357 = data
  i2356.shaderName = i2357[0]
  i2356.errorMessage = i2357[1]
  return i2356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2362 = root || new pc.UnityShaderPass()
  var i2363 = data
  i2362.id = i2363[0]
  i2362.subShaderIndex = i2363[1]
  i2362.name = i2363[2]
  i2362.passType = i2363[3]
  i2362.grabPassTextureName = i2363[4]
  i2362.usePass = !!i2363[5]
  i2362.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[6], i2362.zTest)
  i2362.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[7], i2362.zWrite)
  i2362.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[8], i2362.culling)
  i2362.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2363[9], i2362.blending)
  i2362.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2363[10], i2362.alphaBlending)
  i2362.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[11], i2362.colorWriteMask)
  i2362.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[12], i2362.offsetUnits)
  i2362.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[13], i2362.offsetFactor)
  i2362.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[14], i2362.stencilRef)
  i2362.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[15], i2362.stencilReadMask)
  i2362.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2363[16], i2362.stencilWriteMask)
  i2362.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2363[17], i2362.stencilOp)
  i2362.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2363[18], i2362.stencilOpFront)
  i2362.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2363[19], i2362.stencilOpBack)
  var i2365 = i2363[20]
  var i2364 = []
  for(var i = 0; i < i2365.length; i += 1) {
    i2364.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2365[i + 0]) );
  }
  i2362.tags = i2364
  var i2367 = i2363[21]
  var i2366 = []
  for(var i = 0; i < i2367.length; i += 1) {
    i2366.push( i2367[i + 0] );
  }
  i2362.passDefinedKeywords = i2366
  var i2369 = i2363[22]
  var i2368 = []
  for(var i = 0; i < i2369.length; i += 1) {
    i2368.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2369[i + 0]) );
  }
  i2362.passDefinedKeywordGroups = i2368
  var i2371 = i2363[23]
  var i2370 = []
  for(var i = 0; i < i2371.length; i += 1) {
    i2370.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2371[i + 0]) );
  }
  i2362.variants = i2370
  var i2373 = i2363[24]
  var i2372 = []
  for(var i = 0; i < i2373.length; i += 1) {
    i2372.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2373[i + 0]) );
  }
  i2362.excludedVariants = i2372
  i2362.hasDepthReader = !!i2363[25]
  return i2362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2375 = data
  i2374.val = i2375[0]
  i2374.name = i2375[1]
  return i2374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2377 = data
  i2376.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[0], i2376.src)
  i2376.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[1], i2376.dst)
  i2376.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2377[2], i2376.op)
  return i2376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2378 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2379 = data
  i2378.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2379[0], i2378.pass)
  i2378.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2379[1], i2378.fail)
  i2378.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2379[2], i2378.zFail)
  i2378.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2379[3], i2378.comp)
  return i2378
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2382 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2383 = data
  i2382.name = i2383[0]
  i2382.value = i2383[1]
  return i2382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2387 = data
  var i2389 = i2387[0]
  var i2388 = []
  for(var i = 0; i < i2389.length; i += 1) {
    i2388.push( i2389[i + 0] );
  }
  i2386.keywords = i2388
  i2386.hasDiscard = !!i2387[1]
  return i2386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2393 = data
  i2392.passId = i2393[0]
  i2392.subShaderIndex = i2393[1]
  var i2395 = i2393[2]
  var i2394 = []
  for(var i = 0; i < i2395.length; i += 1) {
    i2394.push( i2395[i + 0] );
  }
  i2392.keywords = i2394
  i2392.vertexProgram = i2393[3]
  i2392.fragmentProgram = i2393[4]
  i2392.exportedForWebGl2 = !!i2393[5]
  i2392.readDepth = !!i2393[6]
  return i2392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2398 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2399 = data
  request.r(i2399[0], i2399[1], 0, i2398, 'shader')
  i2398.pass = i2399[2]
  return i2398
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2403 = data
  i2402.name = i2403[0]
  i2402.type = i2403[1]
  i2402.value = new pc.Vec4( i2403[2], i2403[3], i2403[4], i2403[5] )
  i2402.textureValue = i2403[6]
  i2402.shaderPropertyFlag = i2403[7]
  return i2402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i2404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i2405 = data
  i2404.name = i2405[0]
  request.r(i2405[1], i2405[2], 0, i2404, 'texture')
  i2404.aabb = i2405[3]
  i2404.vertices = i2405[4]
  i2404.triangles = i2405[5]
  i2404.textureRect = UnityEngine.Rect.MinMaxRect(i2405[6], i2405[7], i2405[8], i2405[9])
  i2404.packedRect = UnityEngine.Rect.MinMaxRect(i2405[10], i2405[11], i2405[12], i2405[13])
  i2404.border = new pc.Vec4( i2405[14], i2405[15], i2405[16], i2405[17] )
  i2404.transparency = i2405[18]
  i2404.bounds = i2405[19]
  i2404.pixelsPerUnit = i2405[20]
  i2404.textureWidth = i2405[21]
  i2404.textureHeight = i2405[22]
  i2404.nativeSize = new pc.Vec2( i2405[23], i2405[24] )
  i2404.pivot = new pc.Vec2( i2405[25], i2405[26] )
  i2404.textureRectOffset = new pc.Vec2( i2405[27], i2405[28] )
  return i2404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2406 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2407 = data
  i2406.name = i2407[0]
  return i2406
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2408 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2409 = data
  i2408.name = i2409[0]
  i2408.bytes64 = i2409[1]
  i2408.data = i2409[2]
  return i2408
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2410 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2411 = data
  i2410.normalStyle = i2411[0]
  i2410.normalSpacingOffset = i2411[1]
  i2410.boldStyle = i2411[2]
  i2410.boldSpacing = i2411[3]
  i2410.italicStyle = i2411[4]
  i2410.tabSize = i2411[5]
  request.r(i2411[6], i2411[7], 0, i2410, 'atlas')
  i2410.m_SourceFontFileGUID = i2411[8]
  i2410.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2411[9], i2410.m_CreationSettings)
  request.r(i2411[10], i2411[11], 0, i2410, 'm_SourceFontFile')
  i2410.m_SourceFontFilePath = i2411[12]
  i2410.m_AtlasPopulationMode = i2411[13]
  i2410.InternalDynamicOS = !!i2411[14]
  var i2413 = i2411[15]
  var i2412 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2413.length; i += 1) {
    i2412.add(request.d('UnityEngine.TextCore.Glyph', i2413[i + 0]));
  }
  i2410.m_GlyphTable = i2412
  var i2415 = i2411[16]
  var i2414 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2415.length; i += 1) {
    i2414.add(request.d('TMPro.TMP_Character', i2415[i + 0]));
  }
  i2410.m_CharacterTable = i2414
  var i2417 = i2411[17]
  var i2416 = []
  for(var i = 0; i < i2417.length; i += 2) {
  request.r(i2417[i + 0], i2417[i + 1], 2, i2416, '')
  }
  i2410.m_AtlasTextures = i2416
  i2410.m_AtlasTextureIndex = i2411[18]
  i2410.m_IsMultiAtlasTexturesEnabled = !!i2411[19]
  i2410.m_GetFontFeatures = !!i2411[20]
  i2410.m_ClearDynamicDataOnBuild = !!i2411[21]
  i2410.m_AtlasWidth = i2411[22]
  i2410.m_AtlasHeight = i2411[23]
  i2410.m_AtlasPadding = i2411[24]
  i2410.m_AtlasRenderMode = i2411[25]
  var i2419 = i2411[26]
  var i2418 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2419.length; i += 1) {
    i2418.add(request.d('UnityEngine.TextCore.GlyphRect', i2419[i + 0]));
  }
  i2410.m_UsedGlyphRects = i2418
  var i2421 = i2411[27]
  var i2420 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2421.length; i += 1) {
    i2420.add(request.d('UnityEngine.TextCore.GlyphRect', i2421[i + 0]));
  }
  i2410.m_FreeGlyphRects = i2420
  i2410.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2411[28], i2410.m_FontFeatureTable)
  i2410.m_ShouldReimportFontFeatures = !!i2411[29]
  var i2423 = i2411[30]
  var i2422 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2423.length; i += 2) {
  request.r(i2423[i + 0], i2423[i + 1], 1, i2422, '')
  }
  i2410.m_FallbackFontAssetTable = i2422
  var i2425 = i2411[31]
  var i2424 = []
  for(var i = 0; i < i2425.length; i += 1) {
    i2424.push( request.d('TMPro.TMP_FontWeightPair', i2425[i + 0]) );
  }
  i2410.m_FontWeightTable = i2424
  var i2427 = i2411[32]
  var i2426 = []
  for(var i = 0; i < i2427.length; i += 1) {
    i2426.push( request.d('TMPro.TMP_FontWeightPair', i2427[i + 0]) );
  }
  i2410.fontWeights = i2426
  i2410.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2411[33], i2410.m_fontInfo)
  var i2429 = i2411[34]
  var i2428 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2429.length; i += 1) {
    i2428.add(request.d('TMPro.TMP_Glyph', i2429[i + 0]));
  }
  i2410.m_glyphInfoList = i2428
  i2410.m_KerningTable = request.d('TMPro.KerningTable', i2411[35], i2410.m_KerningTable)
  var i2431 = i2411[36]
  var i2430 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2431.length; i += 2) {
  request.r(i2431[i + 0], i2431[i + 1], 1, i2430, '')
  }
  i2410.fallbackFontAssets = i2430
  i2410.m_Version = i2411[37]
  i2410.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2411[38], i2410.m_FaceInfo)
  request.r(i2411[39], i2411[40], 0, i2410, 'm_Material')
  return i2410
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2432 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2433 = data
  i2432.sourceFontFileName = i2433[0]
  i2432.sourceFontFileGUID = i2433[1]
  i2432.faceIndex = i2433[2]
  i2432.pointSizeSamplingMode = i2433[3]
  i2432.pointSize = i2433[4]
  i2432.padding = i2433[5]
  i2432.paddingMode = i2433[6]
  i2432.packingMode = i2433[7]
  i2432.atlasWidth = i2433[8]
  i2432.atlasHeight = i2433[9]
  i2432.characterSetSelectionMode = i2433[10]
  i2432.characterSequence = i2433[11]
  i2432.referencedFontAssetGUID = i2433[12]
  i2432.referencedTextAssetGUID = i2433[13]
  i2432.fontStyle = i2433[14]
  i2432.fontStyleModifier = i2433[15]
  i2432.renderMode = i2433[16]
  i2432.includeFontFeatures = !!i2433[17]
  return i2432
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2436 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2437 = data
  i2436.m_Index = i2437[0]
  i2436.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2437[1], i2436.m_Metrics)
  i2436.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2437[2], i2436.m_GlyphRect)
  i2436.m_Scale = i2437[3]
  i2436.m_AtlasIndex = i2437[4]
  i2436.m_ClassDefinitionType = i2437[5]
  return i2436
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2438 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2439 = data
  i2438.m_Width = i2439[0]
  i2438.m_Height = i2439[1]
  i2438.m_HorizontalBearingX = i2439[2]
  i2438.m_HorizontalBearingY = i2439[3]
  i2438.m_HorizontalAdvance = i2439[4]
  return i2438
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2440 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2441 = data
  i2440.m_X = i2441[0]
  i2440.m_Y = i2441[1]
  i2440.m_Width = i2441[2]
  i2440.m_Height = i2441[3]
  return i2440
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2444 = root || request.c( 'TMPro.TMP_Character' )
  var i2445 = data
  i2444.m_ElementType = i2445[0]
  i2444.m_Unicode = i2445[1]
  i2444.m_GlyphIndex = i2445[2]
  i2444.m_Scale = i2445[3]
  return i2444
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2450 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2451 = data
  var i2453 = i2451[0]
  var i2452 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2453.length; i += 1) {
    i2452.add(request.d('TMPro.MultipleSubstitutionRecord', i2453[i + 0]));
  }
  i2450.m_MultipleSubstitutionRecords = i2452
  var i2455 = i2451[1]
  var i2454 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2455.length; i += 1) {
    i2454.add(request.d('TMPro.LigatureSubstitutionRecord', i2455[i + 0]));
  }
  i2450.m_LigatureSubstitutionRecords = i2454
  var i2457 = i2451[2]
  var i2456 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2457.length; i += 1) {
    i2456.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2457[i + 0]));
  }
  i2450.m_GlyphPairAdjustmentRecords = i2456
  var i2459 = i2451[3]
  var i2458 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2459.length; i += 1) {
    i2458.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2459[i + 0]));
  }
  i2450.m_MarkToBaseAdjustmentRecords = i2458
  var i2461 = i2451[4]
  var i2460 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2461.length; i += 1) {
    i2460.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2461[i + 0]));
  }
  i2450.m_MarkToMarkAdjustmentRecords = i2460
  return i2450
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2464 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2465 = data
  i2464.m_TargetGlyphID = i2465[0]
  i2464.m_SubstituteGlyphIDs = i2465[1]
  return i2464
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2468 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2469 = data
  i2468.m_ComponentGlyphIDs = i2469[0]
  i2468.m_LigatureGlyphID = i2469[1]
  return i2468
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2472 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2473 = data
  i2472.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2473[0], i2472.m_FirstAdjustmentRecord)
  i2472.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2473[1], i2472.m_SecondAdjustmentRecord)
  i2472.m_FeatureLookupFlags = i2473[2]
  return i2472
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2476 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2477 = data
  i2476.m_BaseGlyphID = i2477[0]
  i2476.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2477[1], i2476.m_BaseGlyphAnchorPoint)
  i2476.m_MarkGlyphID = i2477[2]
  i2476.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2477[3], i2476.m_MarkPositionAdjustment)
  return i2476
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2480 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2481 = data
  i2480.m_BaseMarkGlyphID = i2481[0]
  i2480.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2481[1], i2480.m_BaseMarkGlyphAnchorPoint)
  i2480.m_CombiningMarkGlyphID = i2481[2]
  i2480.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2481[3], i2480.m_CombiningMarkPositionAdjustment)
  return i2480
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2486 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2487 = data
  request.r(i2487[0], i2487[1], 0, i2486, 'regularTypeface')
  request.r(i2487[2], i2487[3], 0, i2486, 'italicTypeface')
  return i2486
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2488 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2489 = data
  i2488.Name = i2489[0]
  i2488.PointSize = i2489[1]
  i2488.Scale = i2489[2]
  i2488.CharacterCount = i2489[3]
  i2488.LineHeight = i2489[4]
  i2488.Baseline = i2489[5]
  i2488.Ascender = i2489[6]
  i2488.CapHeight = i2489[7]
  i2488.Descender = i2489[8]
  i2488.CenterLine = i2489[9]
  i2488.SuperscriptOffset = i2489[10]
  i2488.SubscriptOffset = i2489[11]
  i2488.SubSize = i2489[12]
  i2488.Underline = i2489[13]
  i2488.UnderlineThickness = i2489[14]
  i2488.strikethrough = i2489[15]
  i2488.strikethroughThickness = i2489[16]
  i2488.TabWidth = i2489[17]
  i2488.Padding = i2489[18]
  i2488.AtlasWidth = i2489[19]
  i2488.AtlasHeight = i2489[20]
  return i2488
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2492 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2493 = data
  i2492.id = i2493[0]
  i2492.x = i2493[1]
  i2492.y = i2493[2]
  i2492.width = i2493[3]
  i2492.height = i2493[4]
  i2492.xOffset = i2493[5]
  i2492.yOffset = i2493[6]
  i2492.xAdvance = i2493[7]
  i2492.scale = i2493[8]
  return i2492
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2494 = root || request.c( 'TMPro.KerningTable' )
  var i2495 = data
  var i2497 = i2495[0]
  var i2496 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2497.length; i += 1) {
    i2496.add(request.d('TMPro.KerningPair', i2497[i + 0]));
  }
  i2494.kerningPairs = i2496
  return i2494
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2500 = root || request.c( 'TMPro.KerningPair' )
  var i2501 = data
  i2500.xOffset = i2501[0]
  i2500.m_FirstGlyph = i2501[1]
  i2500.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2501[2], i2500.m_FirstGlyphAdjustments)
  i2500.m_SecondGlyph = i2501[3]
  i2500.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2501[4], i2500.m_SecondGlyphAdjustments)
  i2500.m_IgnoreSpacingAdjustments = !!i2501[5]
  return i2500
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2502 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2503 = data
  i2502.m_FaceIndex = i2503[0]
  i2502.m_FamilyName = i2503[1]
  i2502.m_StyleName = i2503[2]
  i2502.m_PointSize = i2503[3]
  i2502.m_Scale = i2503[4]
  i2502.m_UnitsPerEM = i2503[5]
  i2502.m_LineHeight = i2503[6]
  i2502.m_AscentLine = i2503[7]
  i2502.m_CapLine = i2503[8]
  i2502.m_MeanLine = i2503[9]
  i2502.m_Baseline = i2503[10]
  i2502.m_DescentLine = i2503[11]
  i2502.m_SuperscriptOffset = i2503[12]
  i2502.m_SuperscriptSize = i2503[13]
  i2502.m_SubscriptOffset = i2503[14]
  i2502.m_SubscriptSize = i2503[15]
  i2502.m_UnderlineOffset = i2503[16]
  i2502.m_UnderlineThickness = i2503[17]
  i2502.m_StrikethroughOffset = i2503[18]
  i2502.m_StrikethroughThickness = i2503[19]
  i2502.m_TabWidth = i2503[20]
  return i2502
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i2504 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i2505 = data
  i2504.useSafeMode = !!i2505[0]
  i2504.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i2505[1], i2504.safeModeOptions)
  i2504.timeScale = i2505[2]
  i2504.unscaledTimeScale = i2505[3]
  i2504.useSmoothDeltaTime = !!i2505[4]
  i2504.maxSmoothUnscaledTime = i2505[5]
  i2504.rewindCallbackMode = i2505[6]
  i2504.showUnityEditorReport = !!i2505[7]
  i2504.logBehaviour = i2505[8]
  i2504.drawGizmos = !!i2505[9]
  i2504.defaultRecyclable = !!i2505[10]
  i2504.defaultAutoPlay = i2505[11]
  i2504.defaultUpdateType = i2505[12]
  i2504.defaultTimeScaleIndependent = !!i2505[13]
  i2504.defaultEaseType = i2505[14]
  i2504.defaultEaseOvershootOrAmplitude = i2505[15]
  i2504.defaultEasePeriod = i2505[16]
  i2504.defaultAutoKill = !!i2505[17]
  i2504.defaultLoopType = i2505[18]
  i2504.debugMode = !!i2505[19]
  i2504.debugStoreTargetId = !!i2505[20]
  i2504.showPreviewPanel = !!i2505[21]
  i2504.storeSettingsLocation = i2505[22]
  i2504.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i2505[23], i2504.modules)
  i2504.createASMDEF = !!i2505[24]
  i2504.showPlayingTweens = !!i2505[25]
  i2504.showPausedTweens = !!i2505[26]
  return i2504
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i2506 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i2507 = data
  i2506.logBehaviour = i2507[0]
  i2506.nestedTweenFailureBehaviour = i2507[1]
  return i2506
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i2508 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i2509 = data
  i2508.showPanel = !!i2509[0]
  i2508.audioEnabled = !!i2509[1]
  i2508.physicsEnabled = !!i2509[2]
  i2508.physics2DEnabled = !!i2509[3]
  i2508.spriteEnabled = !!i2509[4]
  i2508.uiEnabled = !!i2509[5]
  i2508.textMeshProEnabled = !!i2509[6]
  i2508.tk2DEnabled = !!i2509[7]
  i2508.deAudioEnabled = !!i2509[8]
  i2508.deUnityExtendedEnabled = !!i2509[9]
  i2508.epoOutlineEnabled = !!i2509[10]
  return i2508
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2510 = root || request.c( 'TMPro.TMP_Settings' )
  var i2511 = data
  i2510.assetVersion = i2511[0]
  i2510.m_TextWrappingMode = i2511[1]
  i2510.m_enableKerning = !!i2511[2]
  var i2513 = i2511[3]
  var i2512 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2513.length; i += 1) {
    i2512.add(i2513[i + 0]);
  }
  i2510.m_ActiveFontFeatures = i2512
  i2510.m_enableExtraPadding = !!i2511[4]
  i2510.m_enableTintAllSprites = !!i2511[5]
  i2510.m_enableParseEscapeCharacters = !!i2511[6]
  i2510.m_EnableRaycastTarget = !!i2511[7]
  i2510.m_GetFontFeaturesAtRuntime = !!i2511[8]
  i2510.m_missingGlyphCharacter = i2511[9]
  i2510.m_ClearDynamicDataOnBuild = !!i2511[10]
  i2510.m_warningsDisabled = !!i2511[11]
  request.r(i2511[12], i2511[13], 0, i2510, 'm_defaultFontAsset')
  i2510.m_defaultFontAssetPath = i2511[14]
  i2510.m_defaultFontSize = i2511[15]
  i2510.m_defaultAutoSizeMinRatio = i2511[16]
  i2510.m_defaultAutoSizeMaxRatio = i2511[17]
  i2510.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2511[18], i2511[19] )
  i2510.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2511[20], i2511[21] )
  i2510.m_autoSizeTextContainer = !!i2511[22]
  i2510.m_IsTextObjectScaleStatic = !!i2511[23]
  var i2515 = i2511[24]
  var i2514 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2515.length; i += 2) {
  request.r(i2515[i + 0], i2515[i + 1], 1, i2514, '')
  }
  i2510.m_fallbackFontAssets = i2514
  i2510.m_matchMaterialPreset = !!i2511[25]
  i2510.m_HideSubTextObjects = !!i2511[26]
  request.r(i2511[27], i2511[28], 0, i2510, 'm_defaultSpriteAsset')
  i2510.m_defaultSpriteAssetPath = i2511[29]
  i2510.m_enableEmojiSupport = !!i2511[30]
  i2510.m_MissingCharacterSpriteUnicode = i2511[31]
  var i2517 = i2511[32]
  var i2516 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2517.length; i += 2) {
  request.r(i2517[i + 0], i2517[i + 1], 1, i2516, '')
  }
  i2510.m_EmojiFallbackTextAssets = i2516
  i2510.m_defaultColorGradientPresetsPath = i2511[33]
  request.r(i2511[34], i2511[35], 0, i2510, 'm_defaultStyleSheet')
  i2510.m_StyleSheetsResourcePath = i2511[36]
  request.r(i2511[37], i2511[38], 0, i2510, 'm_leadingCharacters')
  request.r(i2511[39], i2511[40], 0, i2510, 'm_followingCharacters')
  i2510.m_UseModernHangulLineBreakingRules = !!i2511[41]
  return i2510
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2520 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2521 = data
  request.r(i2521[0], i2521[1], 0, i2520, 'spriteSheet')
  var i2523 = i2521[2]
  var i2522 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2523.length; i += 1) {
    i2522.add(request.d('TMPro.TMP_Sprite', i2523[i + 0]));
  }
  i2520.spriteInfoList = i2522
  var i2525 = i2521[3]
  var i2524 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2525.length; i += 2) {
  request.r(i2525[i + 0], i2525[i + 1], 1, i2524, '')
  }
  i2520.fallbackSpriteAssets = i2524
  var i2527 = i2521[4]
  var i2526 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2527.length; i += 1) {
    i2526.add(request.d('TMPro.TMP_SpriteCharacter', i2527[i + 0]));
  }
  i2520.m_SpriteCharacterTable = i2526
  var i2529 = i2521[5]
  var i2528 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2529.length; i += 1) {
    i2528.add(request.d('TMPro.TMP_SpriteGlyph', i2529[i + 0]));
  }
  i2520.m_GlyphTable = i2528
  i2520.m_Version = i2521[6]
  i2520.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2521[7], i2520.m_FaceInfo)
  request.r(i2521[8], i2521[9], 0, i2520, 'm_Material')
  return i2520
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2532 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2533 = data
  i2532.name = i2533[0]
  i2532.hashCode = i2533[1]
  i2532.unicode = i2533[2]
  i2532.pivot = new pc.Vec2( i2533[3], i2533[4] )
  request.r(i2533[5], i2533[6], 0, i2532, 'sprite')
  i2532.id = i2533[7]
  i2532.x = i2533[8]
  i2532.y = i2533[9]
  i2532.width = i2533[10]
  i2532.height = i2533[11]
  i2532.xOffset = i2533[12]
  i2532.yOffset = i2533[13]
  i2532.xAdvance = i2533[14]
  i2532.scale = i2533[15]
  return i2532
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2538 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2539 = data
  i2538.m_Name = i2539[0]
  i2538.m_ElementType = i2539[1]
  i2538.m_Unicode = i2539[2]
  i2538.m_GlyphIndex = i2539[3]
  i2538.m_Scale = i2539[4]
  return i2538
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2542 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2543 = data
  request.r(i2543[0], i2543[1], 0, i2542, 'sprite')
  i2542.m_Index = i2543[2]
  i2542.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2543[3], i2542.m_Metrics)
  i2542.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2543[4], i2542.m_GlyphRect)
  i2542.m_Scale = i2543[5]
  i2542.m_AtlasIndex = i2543[6]
  i2542.m_ClassDefinitionType = i2543[7]
  return i2542
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2544 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2545 = data
  var i2547 = i2545[0]
  var i2546 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2547.length; i += 1) {
    i2546.add(request.d('TMPro.TMP_Style', i2547[i + 0]));
  }
  i2544.m_StyleList = i2546
  return i2544
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2550 = root || request.c( 'TMPro.TMP_Style' )
  var i2551 = data
  i2550.m_Name = i2551[0]
  i2550.m_HashCode = i2551[1]
  i2550.m_OpeningDefinition = i2551[2]
  i2550.m_ClosingDefinition = i2551[3]
  i2550.m_OpeningTagArray = i2551[4]
  i2550.m_ClosingTagArray = i2551[5]
  return i2550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2553 = data
  var i2555 = i2553[0]
  var i2554 = []
  for(var i = 0; i < i2555.length; i += 1) {
    i2554.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2555[i + 0]) );
  }
  i2552.files = i2554
  i2552.componentToPrefabIds = i2553[1]
  return i2552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2559 = data
  i2558.path = i2559[0]
  request.r(i2559[1], i2559[2], 0, i2558, 'unityObject')
  return i2558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2561 = data
  var i2563 = i2561[0]
  var i2562 = []
  for(var i = 0; i < i2563.length; i += 1) {
    i2562.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2563[i + 0]) );
  }
  i2560.scriptsExecutionOrder = i2562
  var i2565 = i2561[1]
  var i2564 = []
  for(var i = 0; i < i2565.length; i += 1) {
    i2564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2565[i + 0]) );
  }
  i2560.sortingLayers = i2564
  var i2567 = i2561[2]
  var i2566 = []
  for(var i = 0; i < i2567.length; i += 1) {
    i2566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2567[i + 0]) );
  }
  i2560.cullingLayers = i2566
  i2560.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2561[3], i2560.timeSettings)
  i2560.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2561[4], i2560.physicsSettings)
  i2560.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2561[5], i2560.physics2DSettings)
  i2560.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2561[6], i2560.qualitySettings)
  i2560.enableRealtimeShadows = !!i2561[7]
  i2560.enableAutoInstancing = !!i2561[8]
  i2560.enableStaticBatching = !!i2561[9]
  i2560.enableDynamicBatching = !!i2561[10]
  i2560.usePreservativeDynamicBatching = !!i2561[11]
  i2560.lightmapEncodingQuality = i2561[12]
  i2560.desiredColorSpace = i2561[13]
  var i2569 = i2561[14]
  var i2568 = []
  for(var i = 0; i < i2569.length; i += 1) {
    i2568.push( i2569[i + 0] );
  }
  i2560.allTags = i2568
  return i2560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2573 = data
  i2572.name = i2573[0]
  i2572.value = i2573[1]
  return i2572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2577 = data
  i2576.id = i2577[0]
  i2576.name = i2577[1]
  i2576.value = i2577[2]
  return i2576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2581 = data
  i2580.id = i2581[0]
  i2580.name = i2581[1]
  return i2580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2583 = data
  i2582.fixedDeltaTime = i2583[0]
  i2582.maximumDeltaTime = i2583[1]
  i2582.timeScale = i2583[2]
  i2582.maximumParticleTimestep = i2583[3]
  return i2582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2585 = data
  i2584.gravity = new pc.Vec3( i2585[0], i2585[1], i2585[2] )
  i2584.defaultSolverIterations = i2585[3]
  i2584.bounceThreshold = i2585[4]
  i2584.autoSyncTransforms = !!i2585[5]
  i2584.autoSimulation = !!i2585[6]
  var i2587 = i2585[7]
  var i2586 = []
  for(var i = 0; i < i2587.length; i += 1) {
    i2586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2587[i + 0]) );
  }
  i2584.collisionMatrix = i2586
  return i2584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2591 = data
  i2590.enabled = !!i2591[0]
  i2590.layerId = i2591[1]
  i2590.otherLayerId = i2591[2]
  return i2590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2593 = data
  request.r(i2593[0], i2593[1], 0, i2592, 'material')
  i2592.gravity = new pc.Vec2( i2593[2], i2593[3] )
  i2592.positionIterations = i2593[4]
  i2592.velocityIterations = i2593[5]
  i2592.velocityThreshold = i2593[6]
  i2592.maxLinearCorrection = i2593[7]
  i2592.maxAngularCorrection = i2593[8]
  i2592.maxTranslationSpeed = i2593[9]
  i2592.maxRotationSpeed = i2593[10]
  i2592.baumgarteScale = i2593[11]
  i2592.baumgarteTOIScale = i2593[12]
  i2592.timeToSleep = i2593[13]
  i2592.linearSleepTolerance = i2593[14]
  i2592.angularSleepTolerance = i2593[15]
  i2592.defaultContactOffset = i2593[16]
  i2592.autoSimulation = !!i2593[17]
  i2592.queriesHitTriggers = !!i2593[18]
  i2592.queriesStartInColliders = !!i2593[19]
  i2592.callbacksOnDisable = !!i2593[20]
  i2592.reuseCollisionCallbacks = !!i2593[21]
  i2592.autoSyncTransforms = !!i2593[22]
  var i2595 = i2593[23]
  var i2594 = []
  for(var i = 0; i < i2595.length; i += 1) {
    i2594.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2595[i + 0]) );
  }
  i2592.collisionMatrix = i2594
  return i2592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2599 = data
  i2598.enabled = !!i2599[0]
  i2598.layerId = i2599[1]
  i2598.otherLayerId = i2599[2]
  return i2598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2601 = data
  var i2603 = i2601[0]
  var i2602 = []
  for(var i = 0; i < i2603.length; i += 1) {
    i2602.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2603[i + 0]) );
  }
  i2600.qualityLevels = i2602
  var i2605 = i2601[1]
  var i2604 = []
  for(var i = 0; i < i2605.length; i += 1) {
    i2604.push( i2605[i + 0] );
  }
  i2600.names = i2604
  i2600.shadows = i2601[2]
  i2600.anisotropicFiltering = i2601[3]
  i2600.antiAliasing = i2601[4]
  i2600.lodBias = i2601[5]
  i2600.shadowCascades = i2601[6]
  i2600.shadowDistance = i2601[7]
  i2600.shadowmaskMode = i2601[8]
  i2600.shadowProjection = i2601[9]
  i2600.shadowResolution = i2601[10]
  i2600.softParticles = !!i2601[11]
  i2600.softVegetation = !!i2601[12]
  i2600.activeColorSpace = i2601[13]
  i2600.desiredColorSpace = i2601[14]
  i2600.masterTextureLimit = i2601[15]
  i2600.maxQueuedFrames = i2601[16]
  i2600.particleRaycastBudget = i2601[17]
  i2600.pixelLightCount = i2601[18]
  i2600.realtimeReflectionProbes = !!i2601[19]
  i2600.shadowCascade2Split = i2601[20]
  i2600.shadowCascade4Split = new pc.Vec3( i2601[21], i2601[22], i2601[23] )
  i2600.streamingMipmapsActive = !!i2601[24]
  i2600.vSyncCount = i2601[25]
  i2600.asyncUploadBufferSize = i2601[26]
  i2600.asyncUploadTimeSlice = i2601[27]
  i2600.billboardsFaceCameraPosition = !!i2601[28]
  i2600.shadowNearPlaneOffset = i2601[29]
  i2600.streamingMipmapsMemoryBudget = i2601[30]
  i2600.maximumLODLevel = i2601[31]
  i2600.streamingMipmapsAddAllCameras = !!i2601[32]
  i2600.streamingMipmapsMaxLevelReduction = i2601[33]
  i2600.streamingMipmapsRenderersPerFrame = i2601[34]
  i2600.resolutionScalingFixedDPIFactor = i2601[35]
  i2600.streamingMipmapsMaxFileIORequests = i2601[36]
  i2600.currentQualityLevel = i2601[37]
  return i2600
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i2608 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i2609 = data
  request.r(i2609[0], i2609[1], 0, i2608, 'm_ObjectArgument')
  i2608.m_ObjectArgumentAssemblyTypeName = i2609[2]
  i2608.m_IntArgument = i2609[3]
  i2608.m_FloatArgument = i2609[4]
  i2608.m_StringArgument = i2609[5]
  i2608.m_BoolArgument = !!i2609[6]
  return i2608
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2610 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2611 = data
  i2610.m_GlyphIndex = i2611[0]
  i2610.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2611[1], i2610.m_GlyphValueRecord)
  return i2610
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2612 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2613 = data
  i2612.m_XCoordinate = i2613[0]
  i2612.m_YCoordinate = i2613[1]
  return i2612
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2614 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2615 = data
  i2614.m_XPositionAdjustment = i2615[0]
  i2614.m_YPositionAdjustment = i2615[1]
  return i2614
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2616 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2617 = data
  i2616.xPlacement = i2617[0]
  i2616.yPlacement = i2617[1]
  i2616.xAdvance = i2617[2]
  i2616.yAdvance = i2617[3]
  return i2616
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2618 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2619 = data
  i2618.m_XPlacement = i2619[0]
  i2618.m_YPlacement = i2619[1]
  i2618.m_XAdvance = i2619[2]
  i2618.m_YAdvance = i2619[3]
  return i2618
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"31":[32],"33":[32],"34":[32],"35":[32],"36":[32],"37":[32],"38":[39],"40":[2],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[2],"63":[64],"65":[66],"67":[66],"8":[7],"68":[69],"70":[2],"71":[72],"73":[7],"74":[11,7],"75":[64],"76":[11,7],"77":[7],"78":[7],"79":[64,7],"17":[7,11],"80":[81],"82":[81],"83":[81],"84":[7],"85":[7],"10":[8],"12":[11,7],"86":[7],"9":[8],"87":[7],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"13":[7],"94":[7],"95":[11,7],"96":[7],"97":[7],"98":[7],"99":[7],"100":[11,7],"101":[7],"102":[5],"103":[5],"6":[5],"104":[5],"105":[2],"106":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.UI.Mask","UnityEngine.Sprite","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.UI.Button","UnityEngine.AudioSource","UnityEngine.AudioClip","LunaController","LayoutController","UnityEngine.GameObject","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V36";

Deserializers.lunaInitializationTime = "07/15/2026 05:59:40";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "39964";

Deserializers.projectId = "5a374f57113aa4541bbbd483dc94070e";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1799";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4160";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_V36";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "6012ba55-ce41-4d54-9492-44d7aca54417";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

