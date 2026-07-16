var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i3038 = root || request.c( 'UnityEngine.JointSpring' )
  var i3039 = data
  i3038.spring = i3039[0]
  i3038.damper = i3039[1]
  i3038.targetPosition = i3039[2]
  return i3038
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i3040 = root || request.c( 'UnityEngine.JointMotor' )
  var i3041 = data
  i3040.m_TargetVelocity = i3041[0]
  i3040.m_Force = i3041[1]
  i3040.m_FreeSpin = i3041[2]
  return i3040
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i3042 = root || request.c( 'UnityEngine.JointLimits' )
  var i3043 = data
  i3042.m_Min = i3043[0]
  i3042.m_Max = i3043[1]
  i3042.m_Bounciness = i3043[2]
  i3042.m_BounceMinVelocity = i3043[3]
  i3042.m_ContactDistance = i3043[4]
  i3042.minBounce = i3043[5]
  i3042.maxBounce = i3043[6]
  return i3042
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i3044 = root || request.c( 'UnityEngine.JointDrive' )
  var i3045 = data
  i3044.m_PositionSpring = i3045[0]
  i3044.m_PositionDamper = i3045[1]
  i3044.m_MaximumForce = i3045[2]
  i3044.m_UseAcceleration = i3045[3]
  return i3044
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i3046 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i3047 = data
  i3046.m_Spring = i3047[0]
  i3046.m_Damper = i3047[1]
  return i3046
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i3048 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i3049 = data
  i3048.m_Limit = i3049[0]
  i3048.m_Bounciness = i3049[1]
  i3048.m_ContactDistance = i3049[2]
  return i3048
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i3050 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i3051 = data
  i3050.m_ExtremumSlip = i3051[0]
  i3050.m_ExtremumValue = i3051[1]
  i3050.m_AsymptoteSlip = i3051[2]
  i3050.m_AsymptoteValue = i3051[3]
  i3050.m_Stiffness = i3051[4]
  return i3050
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i3052 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i3053 = data
  i3052.m_LowerAngle = i3053[0]
  i3052.m_UpperAngle = i3053[1]
  return i3052
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i3054 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i3055 = data
  i3054.m_MotorSpeed = i3055[0]
  i3054.m_MaximumMotorTorque = i3055[1]
  return i3054
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i3056 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i3057 = data
  i3056.m_DampingRatio = i3057[0]
  i3056.m_Frequency = i3057[1]
  i3056.m_Angle = i3057[2]
  return i3056
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i3058 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i3059 = data
  i3058.m_LowerTranslation = i3059[0]
  i3058.m_UpperTranslation = i3059[1]
  return i3058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i3060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i3061 = data
  i3060.name = i3061[0]
  i3060.width = i3061[1]
  i3060.height = i3061[2]
  i3060.mipmapCount = i3061[3]
  i3060.anisoLevel = i3061[4]
  i3060.filterMode = i3061[5]
  i3060.hdr = !!i3061[6]
  i3060.format = i3061[7]
  i3060.wrapMode = i3061[8]
  i3060.alphaIsTransparency = !!i3061[9]
  i3060.alphaSource = i3061[10]
  i3060.graphicsFormat = i3061[11]
  i3060.sRGBTexture = !!i3061[12]
  i3060.desiredColorSpace = i3061[13]
  i3060.wrapU = i3061[14]
  i3060.wrapV = i3061[15]
  return i3060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i3062 = root || new pc.UnityMaterial()
  var i3063 = data
  i3062.name = i3063[0]
  request.r(i3063[1], i3063[2], 0, i3062, 'shader')
  i3062.renderQueue = i3063[3]
  i3062.enableInstancing = !!i3063[4]
  var i3065 = i3063[5]
  var i3064 = []
  for(var i = 0; i < i3065.length; i += 1) {
    i3064.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i3065[i + 0]) );
  }
  i3062.floatParameters = i3064
  var i3067 = i3063[6]
  var i3066 = []
  for(var i = 0; i < i3067.length; i += 1) {
    i3066.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i3067[i + 0]) );
  }
  i3062.colorParameters = i3066
  var i3069 = i3063[7]
  var i3068 = []
  for(var i = 0; i < i3069.length; i += 1) {
    i3068.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i3069[i + 0]) );
  }
  i3062.vectorParameters = i3068
  var i3071 = i3063[8]
  var i3070 = []
  for(var i = 0; i < i3071.length; i += 1) {
    i3070.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i3071[i + 0]) );
  }
  i3062.textureParameters = i3070
  var i3073 = i3063[9]
  var i3072 = []
  for(var i = 0; i < i3073.length; i += 1) {
    i3072.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i3073[i + 0]) );
  }
  i3062.materialFlags = i3072
  return i3062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i3076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i3077 = data
  i3076.name = i3077[0]
  i3076.value = i3077[1]
  return i3076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i3080 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i3081 = data
  i3080.name = i3081[0]
  i3080.value = new pc.Color(i3081[1], i3081[2], i3081[3], i3081[4])
  return i3080
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i3084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i3085 = data
  i3084.name = i3085[0]
  i3084.value = new pc.Vec4( i3085[1], i3085[2], i3085[3], i3085[4] )
  return i3084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i3088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i3089 = data
  i3088.name = i3089[0]
  request.r(i3089[1], i3089[2], 0, i3088, 'value')
  return i3088
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i3092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i3093 = data
  i3092.name = i3093[0]
  i3092.enabled = !!i3093[1]
  return i3092
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i3094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i3095 = data
  i3094.name = i3095[0]
  i3094.index = i3095[1]
  i3094.startup = !!i3095[2]
  return i3094
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i3096 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i3097 = data
  i3096.aspect = i3097[0]
  i3096.orthographic = !!i3097[1]
  i3096.orthographicSize = i3097[2]
  i3096.backgroundColor = new pc.Color(i3097[3], i3097[4], i3097[5], i3097[6])
  i3096.nearClipPlane = i3097[7]
  i3096.farClipPlane = i3097[8]
  i3096.fieldOfView = i3097[9]
  i3096.depth = i3097[10]
  i3096.clearFlags = i3097[11]
  i3096.cullingMask = i3097[12]
  i3096.rect = i3097[13]
  request.r(i3097[14], i3097[15], 0, i3096, 'targetTexture')
  i3096.usePhysicalProperties = !!i3097[16]
  i3096.focalLength = i3097[17]
  i3096.sensorSize = new pc.Vec2( i3097[18], i3097[19] )
  i3096.lensShift = new pc.Vec2( i3097[20], i3097[21] )
  i3096.gateFit = i3097[22]
  i3096.commandBufferCount = i3097[23]
  i3096.cameraType = i3097[24]
  i3096.enabled = !!i3097[25]
  return i3096
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i3098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i3099 = data
  i3098.name = i3099[0]
  i3098.tagId = i3099[1]
  i3098.enabled = !!i3099[2]
  i3098.isStatic = !!i3099[3]
  i3098.layer = i3099[4]
  return i3098
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i3100 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i3101 = data
  request.r(i3101[0], i3101[1], 0, i3100, 'm_FirstSelected')
  i3100.m_sendNavigationEvents = !!i3101[2]
  i3100.m_DragThreshold = i3101[3]
  return i3100
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i3102 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i3103 = data
  i3102.m_HorizontalAxis = i3103[0]
  i3102.m_VerticalAxis = i3103[1]
  i3102.m_SubmitButton = i3103[2]
  i3102.m_CancelButton = i3103[3]
  i3102.m_InputActionsPerSecond = i3103[4]
  i3102.m_RepeatDelay = i3103[5]
  i3102.m_ForceModuleActive = !!i3103[6]
  i3102.m_SendPointerHoverToParent = !!i3103[7]
  return i3102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i3104 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i3105 = data
  i3104.pivot = new pc.Vec2( i3105[0], i3105[1] )
  i3104.anchorMin = new pc.Vec2( i3105[2], i3105[3] )
  i3104.anchorMax = new pc.Vec2( i3105[4], i3105[5] )
  i3104.sizeDelta = new pc.Vec2( i3105[6], i3105[7] )
  i3104.anchoredPosition3D = new pc.Vec3( i3105[8], i3105[9], i3105[10] )
  i3104.rotation = new pc.Quat(i3105[11], i3105[12], i3105[13], i3105[14])
  i3104.scale = new pc.Vec3( i3105[15], i3105[16], i3105[17] )
  return i3104
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i3106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i3107 = data
  i3106.planeDistance = i3107[0]
  i3106.referencePixelsPerUnit = i3107[1]
  i3106.isFallbackOverlay = !!i3107[2]
  i3106.renderMode = i3107[3]
  i3106.renderOrder = i3107[4]
  i3106.sortingLayerName = i3107[5]
  i3106.sortingOrder = i3107[6]
  i3106.scaleFactor = i3107[7]
  request.r(i3107[8], i3107[9], 0, i3106, 'worldCamera')
  i3106.overrideSorting = !!i3107[10]
  i3106.pixelPerfect = !!i3107[11]
  i3106.targetDisplay = i3107[12]
  i3106.overridePixelPerfect = !!i3107[13]
  i3106.enabled = !!i3107[14]
  return i3106
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i3108 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i3109 = data
  i3108.m_UiScaleMode = i3109[0]
  i3108.m_ReferencePixelsPerUnit = i3109[1]
  i3108.m_ScaleFactor = i3109[2]
  i3108.m_ReferenceResolution = new pc.Vec2( i3109[3], i3109[4] )
  i3108.m_ScreenMatchMode = i3109[5]
  i3108.m_MatchWidthOrHeight = i3109[6]
  i3108.m_PhysicalUnit = i3109[7]
  i3108.m_FallbackScreenDPI = i3109[8]
  i3108.m_DefaultSpriteDPI = i3109[9]
  i3108.m_DynamicPixelsPerUnit = i3109[10]
  i3108.m_PresetInfoIsWorld = !!i3109[11]
  return i3108
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i3110 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i3111 = data
  i3110.m_IgnoreReversedGraphics = !!i3111[0]
  i3110.m_BlockingObjects = i3111[1]
  i3110.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i3111[2] )
  return i3110
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i3112 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i3113 = data
  i3112.cullTransparentMesh = !!i3113[0]
  return i3112
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i3114 = root || request.c( 'UnityEngine.UI.Image' )
  var i3115 = data
  request.r(i3115[0], i3115[1], 0, i3114, 'm_Sprite')
  i3114.m_Type = i3115[2]
  i3114.m_PreserveAspect = !!i3115[3]
  i3114.m_FillCenter = !!i3115[4]
  i3114.m_FillMethod = i3115[5]
  i3114.m_FillAmount = i3115[6]
  i3114.m_FillClockwise = !!i3115[7]
  i3114.m_FillOrigin = i3115[8]
  i3114.m_UseSpriteMesh = !!i3115[9]
  i3114.m_PixelsPerUnitMultiplier = i3115[10]
  request.r(i3115[11], i3115[12], 0, i3114, 'm_Material')
  i3114.m_Maskable = !!i3115[13]
  i3114.m_Color = new pc.Color(i3115[14], i3115[15], i3115[16], i3115[17])
  i3114.m_RaycastTarget = !!i3115[18]
  i3114.m_RaycastPadding = new pc.Vec4( i3115[19], i3115[20], i3115[21], i3115[22] )
  return i3114
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i3116 = root || request.c( 'UnityEngine.UI.Mask' )
  var i3117 = data
  i3116.m_ShowMaskGraphic = !!i3117[0]
  return i3116
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i3118 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i3119 = data
  i3118.targetIsSelf = !!i3119[0]
  request.r(i3119[1], i3119[2], 0, i3118, 'targetGO')
  i3118.tweenTargetIsTargetGO = !!i3119[3]
  i3118.delay = i3119[4]
  i3118.duration = i3119[5]
  i3118.easeType = i3119[6]
  i3118.easeCurve = new pc.AnimationCurve( { keys_flow: i3119[7] } )
  i3118.loopType = i3119[8]
  i3118.loops = i3119[9]
  i3118.id = i3119[10]
  i3118.isRelative = !!i3119[11]
  i3118.isFrom = !!i3119[12]
  i3118.isIndependentUpdate = !!i3119[13]
  i3118.autoKill = !!i3119[14]
  i3118.autoGenerate = !!i3119[15]
  i3118.isActive = !!i3119[16]
  i3118.isValid = !!i3119[17]
  request.r(i3119[18], i3119[19], 0, i3118, 'target')
  i3118.animationType = i3119[20]
  i3118.targetType = i3119[21]
  i3118.forcedTargetType = i3119[22]
  i3118.autoPlay = !!i3119[23]
  i3118.useTargetAsV3 = !!i3119[24]
  i3118.endValueFloat = i3119[25]
  i3118.endValueV3 = new pc.Vec3( i3119[26], i3119[27], i3119[28] )
  i3118.endValueV2 = new pc.Vec2( i3119[29], i3119[30] )
  i3118.endValueColor = new pc.Color(i3119[31], i3119[32], i3119[33], i3119[34])
  i3118.endValueString = i3119[35]
  i3118.endValueRect = UnityEngine.Rect.MinMaxRect(i3119[36], i3119[37], i3119[38], i3119[39])
  request.r(i3119[40], i3119[41], 0, i3118, 'endValueTransform')
  i3118.optionalBool0 = !!i3119[42]
  i3118.optionalBool1 = !!i3119[43]
  i3118.optionalFloat0 = i3119[44]
  i3118.optionalInt0 = i3119[45]
  i3118.optionalRotationMode = i3119[46]
  i3118.optionalScrambleMode = i3119[47]
  i3118.optionalShakeRandomnessMode = i3119[48]
  i3118.optionalString = i3119[49]
  i3118.updateType = i3119[50]
  i3118.isSpeedBased = !!i3119[51]
  i3118.hasOnStart = !!i3119[52]
  i3118.hasOnPlay = !!i3119[53]
  i3118.hasOnUpdate = !!i3119[54]
  i3118.hasOnStepComplete = !!i3119[55]
  i3118.hasOnComplete = !!i3119[56]
  i3118.hasOnTweenCreated = !!i3119[57]
  i3118.hasOnRewind = !!i3119[58]
  i3118.onStart = request.d('UnityEngine.Events.UnityEvent', i3119[59], i3118.onStart)
  i3118.onPlay = request.d('UnityEngine.Events.UnityEvent', i3119[60], i3118.onPlay)
  i3118.onUpdate = request.d('UnityEngine.Events.UnityEvent', i3119[61], i3118.onUpdate)
  i3118.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i3119[62], i3118.onStepComplete)
  i3118.onComplete = request.d('UnityEngine.Events.UnityEvent', i3119[63], i3118.onComplete)
  i3118.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i3119[64], i3118.onTweenCreated)
  i3118.onRewind = request.d('UnityEngine.Events.UnityEvent', i3119[65], i3118.onRewind)
  return i3118
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i3120 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i3121 = data
  i3120.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i3121[0], i3120.m_PersistentCalls)
  return i3120
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i3122 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i3123 = data
  var i3125 = i3123[0]
  var i3124 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i3125.length; i += 1) {
    i3124.add(request.d('UnityEngine.Events.PersistentCall', i3125[i + 0]));
  }
  i3122.m_Calls = i3124
  return i3122
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i3128 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i3129 = data
  request.r(i3129[0], i3129[1], 0, i3128, 'm_Target')
  i3128.m_TargetAssemblyTypeName = i3129[2]
  i3128.m_MethodName = i3129[3]
  i3128.m_Mode = i3129[4]
  i3128.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i3129[5], i3128.m_Arguments)
  i3128.m_CallState = i3129[6]
  return i3128
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i3130 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i3131 = data
  i3130.m_hasFontAssetChanged = !!i3131[0]
  request.r(i3131[1], i3131[2], 0, i3130, 'm_baseMaterial')
  i3130.m_maskOffset = new pc.Vec4( i3131[3], i3131[4], i3131[5], i3131[6] )
  i3130.m_text = i3131[7]
  i3130.m_isRightToLeft = !!i3131[8]
  request.r(i3131[9], i3131[10], 0, i3130, 'm_fontAsset')
  request.r(i3131[11], i3131[12], 0, i3130, 'm_sharedMaterial')
  var i3133 = i3131[13]
  var i3132 = []
  for(var i = 0; i < i3133.length; i += 2) {
  request.r(i3133[i + 0], i3133[i + 1], 2, i3132, '')
  }
  i3130.m_fontSharedMaterials = i3132
  request.r(i3131[14], i3131[15], 0, i3130, 'm_fontMaterial')
  var i3135 = i3131[16]
  var i3134 = []
  for(var i = 0; i < i3135.length; i += 2) {
  request.r(i3135[i + 0], i3135[i + 1], 2, i3134, '')
  }
  i3130.m_fontMaterials = i3134
  i3130.m_fontColor32 = UnityEngine.Color32.ConstructColor(i3131[17], i3131[18], i3131[19], i3131[20])
  i3130.m_fontColor = new pc.Color(i3131[21], i3131[22], i3131[23], i3131[24])
  i3130.m_enableVertexGradient = !!i3131[25]
  i3130.m_colorMode = i3131[26]
  i3130.m_fontColorGradient = request.d('TMPro.VertexGradient', i3131[27], i3130.m_fontColorGradient)
  request.r(i3131[28], i3131[29], 0, i3130, 'm_fontColorGradientPreset')
  request.r(i3131[30], i3131[31], 0, i3130, 'm_spriteAsset')
  i3130.m_tintAllSprites = !!i3131[32]
  request.r(i3131[33], i3131[34], 0, i3130, 'm_StyleSheet')
  i3130.m_TextStyleHashCode = i3131[35]
  i3130.m_overrideHtmlColors = !!i3131[36]
  i3130.m_faceColor = UnityEngine.Color32.ConstructColor(i3131[37], i3131[38], i3131[39], i3131[40])
  i3130.m_fontSize = i3131[41]
  i3130.m_fontSizeBase = i3131[42]
  i3130.m_fontWeight = i3131[43]
  i3130.m_enableAutoSizing = !!i3131[44]
  i3130.m_fontSizeMin = i3131[45]
  i3130.m_fontSizeMax = i3131[46]
  i3130.m_fontStyle = i3131[47]
  i3130.m_HorizontalAlignment = i3131[48]
  i3130.m_VerticalAlignment = i3131[49]
  i3130.m_textAlignment = i3131[50]
  i3130.m_characterSpacing = i3131[51]
  i3130.m_characterHorizontalScale = i3131[52]
  i3130.m_wordSpacing = i3131[53]
  i3130.m_lineSpacing = i3131[54]
  i3130.m_lineSpacingMax = i3131[55]
  i3130.m_paragraphSpacing = i3131[56]
  i3130.m_charWidthMaxAdj = i3131[57]
  i3130.m_TextWrappingMode = i3131[58]
  i3130.m_wordWrappingRatios = i3131[59]
  i3130.m_overflowMode = i3131[60]
  request.r(i3131[61], i3131[62], 0, i3130, 'm_linkedTextComponent')
  request.r(i3131[63], i3131[64], 0, i3130, 'parentLinkedComponent')
  i3130.m_enableKerning = !!i3131[65]
  var i3137 = i3131[66]
  var i3136 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i3137.length; i += 1) {
    i3136.add(i3137[i + 0]);
  }
  i3130.m_ActiveFontFeatures = i3136
  i3130.m_enableExtraPadding = !!i3131[67]
  i3130.checkPaddingRequired = !!i3131[68]
  i3130.m_isRichText = !!i3131[69]
  i3130.m_parseCtrlCharacters = !!i3131[70]
  i3130.m_isOrthographic = !!i3131[71]
  i3130.m_isCullingEnabled = !!i3131[72]
  i3130.m_horizontalMapping = i3131[73]
  i3130.m_verticalMapping = i3131[74]
  i3130.m_uvLineOffset = i3131[75]
  i3130.m_geometrySortingOrder = i3131[76]
  i3130.m_IsTextObjectScaleStatic = !!i3131[77]
  i3130.m_VertexBufferAutoSizeReduction = !!i3131[78]
  i3130.m_useMaxVisibleDescender = !!i3131[79]
  i3130.m_pageToDisplay = i3131[80]
  i3130.m_margin = new pc.Vec4( i3131[81], i3131[82], i3131[83], i3131[84] )
  i3130.m_isUsingLegacyAnimationComponent = !!i3131[85]
  i3130.m_isVolumetricText = !!i3131[86]
  request.r(i3131[87], i3131[88], 0, i3130, 'm_Material')
  i3130.m_EmojiFallbackSupport = !!i3131[89]
  i3130.m_Maskable = !!i3131[90]
  i3130.m_Color = new pc.Color(i3131[91], i3131[92], i3131[93], i3131[94])
  i3130.m_RaycastTarget = !!i3131[95]
  i3130.m_RaycastPadding = new pc.Vec4( i3131[96], i3131[97], i3131[98], i3131[99] )
  return i3130
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i3140 = root || request.c( 'TMPro.VertexGradient' )
  var i3141 = data
  i3140.topLeft = new pc.Color(i3141[0], i3141[1], i3141[2], i3141[3])
  i3140.topRight = new pc.Color(i3141[4], i3141[5], i3141[6], i3141[7])
  i3140.bottomLeft = new pc.Color(i3141[8], i3141[9], i3141[10], i3141[11])
  i3140.bottomRight = new pc.Color(i3141[12], i3141[13], i3141[14], i3141[15])
  return i3140
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i3144 = root || request.c( 'UnityEngine.UI.Button' )
  var i3145 = data
  i3144.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i3145[0], i3144.m_OnClick)
  i3144.m_Navigation = request.d('UnityEngine.UI.Navigation', i3145[1], i3144.m_Navigation)
  i3144.m_Transition = i3145[2]
  i3144.m_Colors = request.d('UnityEngine.UI.ColorBlock', i3145[3], i3144.m_Colors)
  i3144.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i3145[4], i3144.m_SpriteState)
  i3144.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i3145[5], i3144.m_AnimationTriggers)
  i3144.m_Interactable = !!i3145[6]
  request.r(i3145[7], i3145[8], 0, i3144, 'm_TargetGraphic')
  return i3144
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i3146 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i3147 = data
  i3146.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i3147[0], i3146.m_PersistentCalls)
  return i3146
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i3148 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i3149 = data
  i3148.m_Mode = i3149[0]
  i3148.m_WrapAround = !!i3149[1]
  request.r(i3149[2], i3149[3], 0, i3148, 'm_SelectOnUp')
  request.r(i3149[4], i3149[5], 0, i3148, 'm_SelectOnDown')
  request.r(i3149[6], i3149[7], 0, i3148, 'm_SelectOnLeft')
  request.r(i3149[8], i3149[9], 0, i3148, 'm_SelectOnRight')
  return i3148
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i3150 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i3151 = data
  i3150.m_NormalColor = new pc.Color(i3151[0], i3151[1], i3151[2], i3151[3])
  i3150.m_HighlightedColor = new pc.Color(i3151[4], i3151[5], i3151[6], i3151[7])
  i3150.m_PressedColor = new pc.Color(i3151[8], i3151[9], i3151[10], i3151[11])
  i3150.m_SelectedColor = new pc.Color(i3151[12], i3151[13], i3151[14], i3151[15])
  i3150.m_DisabledColor = new pc.Color(i3151[16], i3151[17], i3151[18], i3151[19])
  i3150.m_ColorMultiplier = i3151[20]
  i3150.m_FadeDuration = i3151[21]
  return i3150
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i3152 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i3153 = data
  request.r(i3153[0], i3153[1], 0, i3152, 'm_HighlightedSprite')
  request.r(i3153[2], i3153[3], 0, i3152, 'm_PressedSprite')
  request.r(i3153[4], i3153[5], 0, i3152, 'm_SelectedSprite')
  request.r(i3153[6], i3153[7], 0, i3152, 'm_DisabledSprite')
  return i3152
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i3154 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i3155 = data
  i3154.m_NormalTrigger = i3155[0]
  i3154.m_HighlightedTrigger = i3155[1]
  i3154.m_PressedTrigger = i3155[2]
  i3154.m_SelectedTrigger = i3155[3]
  i3154.m_DisabledTrigger = i3155[4]
  return i3154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i3156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i3157 = data
  request.r(i3157[0], i3157[1], 0, i3156, 'clip')
  request.r(i3157[2], i3157[3], 0, i3156, 'outputAudioMixerGroup')
  i3156.playOnAwake = !!i3157[4]
  i3156.loop = !!i3157[5]
  i3156.time = i3157[6]
  i3156.volume = i3157[7]
  i3156.pitch = i3157[8]
  i3156.enabled = !!i3157[9]
  return i3156
}

Deserializers["LunaController"] = function (request, data, root) {
  var i3158 = root || request.c( 'LunaController' )
  var i3159 = data
  i3158.TimePlay = i3159[0]
  i3158.LimitTimePlay = !!i3159[1]
  i3158.BGColor = new pc.Color(i3159[2], i3159[3], i3159[4], i3159[5])
  request.r(i3159[6], i3159[7], 0, i3158, 'BGImage')
  request.r(i3159[8], i3159[9], 0, i3158, 'endCard')
  return i3158
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i3160 = root || request.c( 'LayoutController' )
  var i3161 = data
  request.r(i3161[0], i3161[1], 0, i3160, 'logo1')
  request.r(i3161[2], i3161[3], 0, i3160, 'logo2')
  request.r(i3161[4], i3161[5], 0, i3160, 'CTA1')
  request.r(i3161[6], i3161[7], 0, i3160, 'CTA2')
  request.r(i3161[8], i3161[9], 0, i3160, 'CTA3')
  return i3160
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i3162 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i3163 = data
  i3162.ambientIntensity = i3163[0]
  i3162.reflectionIntensity = i3163[1]
  i3162.ambientMode = i3163[2]
  i3162.ambientLight = new pc.Color(i3163[3], i3163[4], i3163[5], i3163[6])
  i3162.ambientSkyColor = new pc.Color(i3163[7], i3163[8], i3163[9], i3163[10])
  i3162.ambientGroundColor = new pc.Color(i3163[11], i3163[12], i3163[13], i3163[14])
  i3162.ambientEquatorColor = new pc.Color(i3163[15], i3163[16], i3163[17], i3163[18])
  i3162.fogColor = new pc.Color(i3163[19], i3163[20], i3163[21], i3163[22])
  i3162.fogEndDistance = i3163[23]
  i3162.fogStartDistance = i3163[24]
  i3162.fogDensity = i3163[25]
  i3162.fog = !!i3163[26]
  request.r(i3163[27], i3163[28], 0, i3162, 'skybox')
  i3162.fogMode = i3163[29]
  var i3165 = i3163[30]
  var i3164 = []
  for(var i = 0; i < i3165.length; i += 1) {
    i3164.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i3165[i + 0]) );
  }
  i3162.lightmaps = i3164
  i3162.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i3163[31], i3162.lightProbes)
  i3162.lightmapsMode = i3163[32]
  i3162.mixedBakeMode = i3163[33]
  i3162.environmentLightingMode = i3163[34]
  i3162.ambientProbe = new pc.SphericalHarmonicsL2(i3163[35])
  request.r(i3163[36], i3163[37], 0, i3162, 'customReflection')
  request.r(i3163[38], i3163[39], 0, i3162, 'defaultReflection')
  i3162.defaultReflectionMode = i3163[40]
  i3162.defaultReflectionResolution = i3163[41]
  i3162.sunLightObjectId = i3163[42]
  i3162.pixelLightCount = i3163[43]
  i3162.defaultReflectionHDR = !!i3163[44]
  i3162.hasLightDataAsset = !!i3163[45]
  i3162.hasManualGenerate = !!i3163[46]
  return i3162
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i3168 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i3169 = data
  request.r(i3169[0], i3169[1], 0, i3168, 'lightmapColor')
  request.r(i3169[2], i3169[3], 0, i3168, 'lightmapDirection')
  request.r(i3169[4], i3169[5], 0, i3168, 'shadowMask')
  return i3168
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i3170 = root || new UnityEngine.LightProbes()
  var i3171 = data
  return i3170
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i3178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i3179 = data
  var i3181 = i3179[0]
  var i3180 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i3181.length; i += 1) {
    i3180.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i3181[i + 0]));
  }
  i3178.ShaderCompilationErrors = i3180
  i3178.name = i3179[1]
  i3178.guid = i3179[2]
  var i3183 = i3179[3]
  var i3182 = []
  for(var i = 0; i < i3183.length; i += 1) {
    i3182.push( i3183[i + 0] );
  }
  i3178.shaderDefinedKeywords = i3182
  var i3185 = i3179[4]
  var i3184 = []
  for(var i = 0; i < i3185.length; i += 1) {
    i3184.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i3185[i + 0]) );
  }
  i3178.passes = i3184
  var i3187 = i3179[5]
  var i3186 = []
  for(var i = 0; i < i3187.length; i += 1) {
    i3186.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i3187[i + 0]) );
  }
  i3178.usePasses = i3186
  var i3189 = i3179[6]
  var i3188 = []
  for(var i = 0; i < i3189.length; i += 1) {
    i3188.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i3189[i + 0]) );
  }
  i3178.defaultParameterValues = i3188
  request.r(i3179[7], i3179[8], 0, i3178, 'unityFallbackShader')
  i3178.readDepth = !!i3179[9]
  i3178.hasDepthOnlyPass = !!i3179[10]
  i3178.isCreatedByShaderGraph = !!i3179[11]
  i3178.disableBatching = !!i3179[12]
  i3178.compiled = !!i3179[13]
  return i3178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i3192 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i3193 = data
  i3192.shaderName = i3193[0]
  i3192.errorMessage = i3193[1]
  return i3192
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i3198 = root || new pc.UnityShaderPass()
  var i3199 = data
  i3198.id = i3199[0]
  i3198.subShaderIndex = i3199[1]
  i3198.name = i3199[2]
  i3198.passType = i3199[3]
  i3198.grabPassTextureName = i3199[4]
  i3198.usePass = !!i3199[5]
  i3198.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[6], i3198.zTest)
  i3198.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[7], i3198.zWrite)
  i3198.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[8], i3198.culling)
  i3198.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3199[9], i3198.blending)
  i3198.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3199[10], i3198.alphaBlending)
  i3198.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[11], i3198.colorWriteMask)
  i3198.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[12], i3198.offsetUnits)
  i3198.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[13], i3198.offsetFactor)
  i3198.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[14], i3198.stencilRef)
  i3198.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[15], i3198.stencilReadMask)
  i3198.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3199[16], i3198.stencilWriteMask)
  i3198.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3199[17], i3198.stencilOp)
  i3198.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3199[18], i3198.stencilOpFront)
  i3198.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3199[19], i3198.stencilOpBack)
  var i3201 = i3199[20]
  var i3200 = []
  for(var i = 0; i < i3201.length; i += 1) {
    i3200.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i3201[i + 0]) );
  }
  i3198.tags = i3200
  var i3203 = i3199[21]
  var i3202 = []
  for(var i = 0; i < i3203.length; i += 1) {
    i3202.push( i3203[i + 0] );
  }
  i3198.passDefinedKeywords = i3202
  var i3205 = i3199[22]
  var i3204 = []
  for(var i = 0; i < i3205.length; i += 1) {
    i3204.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i3205[i + 0]) );
  }
  i3198.passDefinedKeywordGroups = i3204
  var i3207 = i3199[23]
  var i3206 = []
  for(var i = 0; i < i3207.length; i += 1) {
    i3206.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3207[i + 0]) );
  }
  i3198.variants = i3206
  var i3209 = i3199[24]
  var i3208 = []
  for(var i = 0; i < i3209.length; i += 1) {
    i3208.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3209[i + 0]) );
  }
  i3198.excludedVariants = i3208
  i3198.hasDepthReader = !!i3199[25]
  return i3198
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i3210 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i3211 = data
  i3210.val = i3211[0]
  i3210.name = i3211[1]
  return i3210
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i3212 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i3213 = data
  i3212.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3213[0], i3212.src)
  i3212.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3213[1], i3212.dst)
  i3212.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3213[2], i3212.op)
  return i3212
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i3214 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i3215 = data
  i3214.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3215[0], i3214.pass)
  i3214.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3215[1], i3214.fail)
  i3214.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3215[2], i3214.zFail)
  i3214.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3215[3], i3214.comp)
  return i3214
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i3218 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i3219 = data
  i3218.name = i3219[0]
  i3218.value = i3219[1]
  return i3218
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i3222 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i3223 = data
  var i3225 = i3223[0]
  var i3224 = []
  for(var i = 0; i < i3225.length; i += 1) {
    i3224.push( i3225[i + 0] );
  }
  i3222.keywords = i3224
  i3222.hasDiscard = !!i3223[1]
  return i3222
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i3228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i3229 = data
  i3228.passId = i3229[0]
  i3228.subShaderIndex = i3229[1]
  var i3231 = i3229[2]
  var i3230 = []
  for(var i = 0; i < i3231.length; i += 1) {
    i3230.push( i3231[i + 0] );
  }
  i3228.keywords = i3230
  i3228.vertexProgram = i3229[3]
  i3228.fragmentProgram = i3229[4]
  i3228.exportedForWebGl2 = !!i3229[5]
  i3228.readDepth = !!i3229[6]
  return i3228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i3234 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i3235 = data
  request.r(i3235[0], i3235[1], 0, i3234, 'shader')
  i3234.pass = i3235[2]
  return i3234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i3238 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i3239 = data
  i3238.name = i3239[0]
  i3238.type = i3239[1]
  i3238.value = new pc.Vec4( i3239[2], i3239[3], i3239[4], i3239[5] )
  i3238.textureValue = i3239[6]
  i3238.shaderPropertyFlag = i3239[7]
  return i3238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i3240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i3241 = data
  i3240.name = i3241[0]
  request.r(i3241[1], i3241[2], 0, i3240, 'texture')
  i3240.aabb = i3241[3]
  i3240.vertices = i3241[4]
  i3240.triangles = i3241[5]
  i3240.textureRect = UnityEngine.Rect.MinMaxRect(i3241[6], i3241[7], i3241[8], i3241[9])
  i3240.packedRect = UnityEngine.Rect.MinMaxRect(i3241[10], i3241[11], i3241[12], i3241[13])
  i3240.border = new pc.Vec4( i3241[14], i3241[15], i3241[16], i3241[17] )
  i3240.transparency = i3241[18]
  i3240.bounds = i3241[19]
  i3240.pixelsPerUnit = i3241[20]
  i3240.textureWidth = i3241[21]
  i3240.textureHeight = i3241[22]
  i3240.nativeSize = new pc.Vec2( i3241[23], i3241[24] )
  i3240.pivot = new pc.Vec2( i3241[25], i3241[26] )
  i3240.textureRectOffset = new pc.Vec2( i3241[27], i3241[28] )
  return i3240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i3242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i3243 = data
  i3242.name = i3243[0]
  return i3242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i3244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i3245 = data
  i3244.name = i3245[0]
  i3244.bytes64 = i3245[1]
  i3244.data = i3245[2]
  return i3244
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i3246 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i3247 = data
  i3246.normalStyle = i3247[0]
  i3246.normalSpacingOffset = i3247[1]
  i3246.boldStyle = i3247[2]
  i3246.boldSpacing = i3247[3]
  i3246.italicStyle = i3247[4]
  i3246.tabSize = i3247[5]
  request.r(i3247[6], i3247[7], 0, i3246, 'atlas')
  i3246.m_SourceFontFileGUID = i3247[8]
  i3246.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i3247[9], i3246.m_CreationSettings)
  request.r(i3247[10], i3247[11], 0, i3246, 'm_SourceFontFile')
  i3246.m_SourceFontFilePath = i3247[12]
  i3246.m_AtlasPopulationMode = i3247[13]
  i3246.InternalDynamicOS = !!i3247[14]
  var i3249 = i3247[15]
  var i3248 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i3249.length; i += 1) {
    i3248.add(request.d('UnityEngine.TextCore.Glyph', i3249[i + 0]));
  }
  i3246.m_GlyphTable = i3248
  var i3251 = i3247[16]
  var i3250 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i3251.length; i += 1) {
    i3250.add(request.d('TMPro.TMP_Character', i3251[i + 0]));
  }
  i3246.m_CharacterTable = i3250
  var i3253 = i3247[17]
  var i3252 = []
  for(var i = 0; i < i3253.length; i += 2) {
  request.r(i3253[i + 0], i3253[i + 1], 2, i3252, '')
  }
  i3246.m_AtlasTextures = i3252
  i3246.m_AtlasTextureIndex = i3247[18]
  i3246.m_IsMultiAtlasTexturesEnabled = !!i3247[19]
  i3246.m_GetFontFeatures = !!i3247[20]
  i3246.m_ClearDynamicDataOnBuild = !!i3247[21]
  i3246.m_AtlasWidth = i3247[22]
  i3246.m_AtlasHeight = i3247[23]
  i3246.m_AtlasPadding = i3247[24]
  i3246.m_AtlasRenderMode = i3247[25]
  var i3255 = i3247[26]
  var i3254 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i3255.length; i += 1) {
    i3254.add(request.d('UnityEngine.TextCore.GlyphRect', i3255[i + 0]));
  }
  i3246.m_UsedGlyphRects = i3254
  var i3257 = i3247[27]
  var i3256 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i3257.length; i += 1) {
    i3256.add(request.d('UnityEngine.TextCore.GlyphRect', i3257[i + 0]));
  }
  i3246.m_FreeGlyphRects = i3256
  i3246.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i3247[28], i3246.m_FontFeatureTable)
  i3246.m_ShouldReimportFontFeatures = !!i3247[29]
  var i3259 = i3247[30]
  var i3258 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3259.length; i += 2) {
  request.r(i3259[i + 0], i3259[i + 1], 1, i3258, '')
  }
  i3246.m_FallbackFontAssetTable = i3258
  var i3261 = i3247[31]
  var i3260 = []
  for(var i = 0; i < i3261.length; i += 1) {
    i3260.push( request.d('TMPro.TMP_FontWeightPair', i3261[i + 0]) );
  }
  i3246.m_FontWeightTable = i3260
  var i3263 = i3247[32]
  var i3262 = []
  for(var i = 0; i < i3263.length; i += 1) {
    i3262.push( request.d('TMPro.TMP_FontWeightPair', i3263[i + 0]) );
  }
  i3246.fontWeights = i3262
  i3246.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i3247[33], i3246.m_fontInfo)
  var i3265 = i3247[34]
  var i3264 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i3265.length; i += 1) {
    i3264.add(request.d('TMPro.TMP_Glyph', i3265[i + 0]));
  }
  i3246.m_glyphInfoList = i3264
  i3246.m_KerningTable = request.d('TMPro.KerningTable', i3247[35], i3246.m_KerningTable)
  var i3267 = i3247[36]
  var i3266 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3267.length; i += 2) {
  request.r(i3267[i + 0], i3267[i + 1], 1, i3266, '')
  }
  i3246.fallbackFontAssets = i3266
  i3246.m_Version = i3247[37]
  i3246.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i3247[38], i3246.m_FaceInfo)
  request.r(i3247[39], i3247[40], 0, i3246, 'm_Material')
  return i3246
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i3268 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i3269 = data
  i3268.sourceFontFileName = i3269[0]
  i3268.sourceFontFileGUID = i3269[1]
  i3268.faceIndex = i3269[2]
  i3268.pointSizeSamplingMode = i3269[3]
  i3268.pointSize = i3269[4]
  i3268.padding = i3269[5]
  i3268.paddingMode = i3269[6]
  i3268.packingMode = i3269[7]
  i3268.atlasWidth = i3269[8]
  i3268.atlasHeight = i3269[9]
  i3268.characterSetSelectionMode = i3269[10]
  i3268.characterSequence = i3269[11]
  i3268.referencedFontAssetGUID = i3269[12]
  i3268.referencedTextAssetGUID = i3269[13]
  i3268.fontStyle = i3269[14]
  i3268.fontStyleModifier = i3269[15]
  i3268.renderMode = i3269[16]
  i3268.includeFontFeatures = !!i3269[17]
  return i3268
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i3272 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i3273 = data
  i3272.m_Index = i3273[0]
  i3272.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i3273[1], i3272.m_Metrics)
  i3272.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i3273[2], i3272.m_GlyphRect)
  i3272.m_Scale = i3273[3]
  i3272.m_AtlasIndex = i3273[4]
  i3272.m_ClassDefinitionType = i3273[5]
  return i3272
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i3274 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i3275 = data
  i3274.m_Width = i3275[0]
  i3274.m_Height = i3275[1]
  i3274.m_HorizontalBearingX = i3275[2]
  i3274.m_HorizontalBearingY = i3275[3]
  i3274.m_HorizontalAdvance = i3275[4]
  return i3274
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i3276 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i3277 = data
  i3276.m_X = i3277[0]
  i3276.m_Y = i3277[1]
  i3276.m_Width = i3277[2]
  i3276.m_Height = i3277[3]
  return i3276
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i3280 = root || request.c( 'TMPro.TMP_Character' )
  var i3281 = data
  i3280.m_ElementType = i3281[0]
  i3280.m_Unicode = i3281[1]
  i3280.m_GlyphIndex = i3281[2]
  i3280.m_Scale = i3281[3]
  return i3280
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i3286 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i3287 = data
  var i3289 = i3287[0]
  var i3288 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i3289.length; i += 1) {
    i3288.add(request.d('TMPro.MultipleSubstitutionRecord', i3289[i + 0]));
  }
  i3286.m_MultipleSubstitutionRecords = i3288
  var i3291 = i3287[1]
  var i3290 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i3291.length; i += 1) {
    i3290.add(request.d('TMPro.LigatureSubstitutionRecord', i3291[i + 0]));
  }
  i3286.m_LigatureSubstitutionRecords = i3290
  var i3293 = i3287[2]
  var i3292 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i3293.length; i += 1) {
    i3292.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i3293[i + 0]));
  }
  i3286.m_GlyphPairAdjustmentRecords = i3292
  var i3295 = i3287[3]
  var i3294 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i3295.length; i += 1) {
    i3294.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i3295[i + 0]));
  }
  i3286.m_MarkToBaseAdjustmentRecords = i3294
  var i3297 = i3287[4]
  var i3296 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i3297.length; i += 1) {
    i3296.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i3297[i + 0]));
  }
  i3286.m_MarkToMarkAdjustmentRecords = i3296
  return i3286
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i3300 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i3301 = data
  i3300.m_TargetGlyphID = i3301[0]
  i3300.m_SubstituteGlyphIDs = i3301[1]
  return i3300
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i3304 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i3305 = data
  i3304.m_ComponentGlyphIDs = i3305[0]
  i3304.m_LigatureGlyphID = i3305[1]
  return i3304
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i3308 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i3309 = data
  i3308.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i3309[0], i3308.m_FirstAdjustmentRecord)
  i3308.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i3309[1], i3308.m_SecondAdjustmentRecord)
  i3308.m_FeatureLookupFlags = i3309[2]
  return i3308
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i3312 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i3313 = data
  i3312.m_BaseGlyphID = i3313[0]
  i3312.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i3313[1], i3312.m_BaseGlyphAnchorPoint)
  i3312.m_MarkGlyphID = i3313[2]
  i3312.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i3313[3], i3312.m_MarkPositionAdjustment)
  return i3312
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i3316 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i3317 = data
  i3316.m_BaseMarkGlyphID = i3317[0]
  i3316.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i3317[1], i3316.m_BaseMarkGlyphAnchorPoint)
  i3316.m_CombiningMarkGlyphID = i3317[2]
  i3316.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i3317[3], i3316.m_CombiningMarkPositionAdjustment)
  return i3316
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i3322 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i3323 = data
  request.r(i3323[0], i3323[1], 0, i3322, 'regularTypeface')
  request.r(i3323[2], i3323[3], 0, i3322, 'italicTypeface')
  return i3322
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i3324 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i3325 = data
  i3324.Name = i3325[0]
  i3324.PointSize = i3325[1]
  i3324.Scale = i3325[2]
  i3324.CharacterCount = i3325[3]
  i3324.LineHeight = i3325[4]
  i3324.Baseline = i3325[5]
  i3324.Ascender = i3325[6]
  i3324.CapHeight = i3325[7]
  i3324.Descender = i3325[8]
  i3324.CenterLine = i3325[9]
  i3324.SuperscriptOffset = i3325[10]
  i3324.SubscriptOffset = i3325[11]
  i3324.SubSize = i3325[12]
  i3324.Underline = i3325[13]
  i3324.UnderlineThickness = i3325[14]
  i3324.strikethrough = i3325[15]
  i3324.strikethroughThickness = i3325[16]
  i3324.TabWidth = i3325[17]
  i3324.Padding = i3325[18]
  i3324.AtlasWidth = i3325[19]
  i3324.AtlasHeight = i3325[20]
  return i3324
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i3328 = root || request.c( 'TMPro.TMP_Glyph' )
  var i3329 = data
  i3328.id = i3329[0]
  i3328.x = i3329[1]
  i3328.y = i3329[2]
  i3328.width = i3329[3]
  i3328.height = i3329[4]
  i3328.xOffset = i3329[5]
  i3328.yOffset = i3329[6]
  i3328.xAdvance = i3329[7]
  i3328.scale = i3329[8]
  return i3328
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i3330 = root || request.c( 'TMPro.KerningTable' )
  var i3331 = data
  var i3333 = i3331[0]
  var i3332 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i3333.length; i += 1) {
    i3332.add(request.d('TMPro.KerningPair', i3333[i + 0]));
  }
  i3330.kerningPairs = i3332
  return i3330
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i3336 = root || request.c( 'TMPro.KerningPair' )
  var i3337 = data
  i3336.xOffset = i3337[0]
  i3336.m_FirstGlyph = i3337[1]
  i3336.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i3337[2], i3336.m_FirstGlyphAdjustments)
  i3336.m_SecondGlyph = i3337[3]
  i3336.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i3337[4], i3336.m_SecondGlyphAdjustments)
  i3336.m_IgnoreSpacingAdjustments = !!i3337[5]
  return i3336
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i3338 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i3339 = data
  i3338.m_FaceIndex = i3339[0]
  i3338.m_FamilyName = i3339[1]
  i3338.m_StyleName = i3339[2]
  i3338.m_PointSize = i3339[3]
  i3338.m_Scale = i3339[4]
  i3338.m_UnitsPerEM = i3339[5]
  i3338.m_LineHeight = i3339[6]
  i3338.m_AscentLine = i3339[7]
  i3338.m_CapLine = i3339[8]
  i3338.m_MeanLine = i3339[9]
  i3338.m_Baseline = i3339[10]
  i3338.m_DescentLine = i3339[11]
  i3338.m_SuperscriptOffset = i3339[12]
  i3338.m_SuperscriptSize = i3339[13]
  i3338.m_SubscriptOffset = i3339[14]
  i3338.m_SubscriptSize = i3339[15]
  i3338.m_UnderlineOffset = i3339[16]
  i3338.m_UnderlineThickness = i3339[17]
  i3338.m_StrikethroughOffset = i3339[18]
  i3338.m_StrikethroughThickness = i3339[19]
  i3338.m_TabWidth = i3339[20]
  return i3338
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i3340 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i3341 = data
  i3340.useSafeMode = !!i3341[0]
  i3340.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i3341[1], i3340.safeModeOptions)
  i3340.timeScale = i3341[2]
  i3340.unscaledTimeScale = i3341[3]
  i3340.useSmoothDeltaTime = !!i3341[4]
  i3340.maxSmoothUnscaledTime = i3341[5]
  i3340.rewindCallbackMode = i3341[6]
  i3340.showUnityEditorReport = !!i3341[7]
  i3340.logBehaviour = i3341[8]
  i3340.drawGizmos = !!i3341[9]
  i3340.defaultRecyclable = !!i3341[10]
  i3340.defaultAutoPlay = i3341[11]
  i3340.defaultUpdateType = i3341[12]
  i3340.defaultTimeScaleIndependent = !!i3341[13]
  i3340.defaultEaseType = i3341[14]
  i3340.defaultEaseOvershootOrAmplitude = i3341[15]
  i3340.defaultEasePeriod = i3341[16]
  i3340.defaultAutoKill = !!i3341[17]
  i3340.defaultLoopType = i3341[18]
  i3340.debugMode = !!i3341[19]
  i3340.debugStoreTargetId = !!i3341[20]
  i3340.showPreviewPanel = !!i3341[21]
  i3340.storeSettingsLocation = i3341[22]
  i3340.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i3341[23], i3340.modules)
  i3340.createASMDEF = !!i3341[24]
  i3340.showPlayingTweens = !!i3341[25]
  i3340.showPausedTweens = !!i3341[26]
  return i3340
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i3342 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i3343 = data
  i3342.logBehaviour = i3343[0]
  i3342.nestedTweenFailureBehaviour = i3343[1]
  return i3342
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i3344 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i3345 = data
  i3344.showPanel = !!i3345[0]
  i3344.audioEnabled = !!i3345[1]
  i3344.physicsEnabled = !!i3345[2]
  i3344.physics2DEnabled = !!i3345[3]
  i3344.spriteEnabled = !!i3345[4]
  i3344.uiEnabled = !!i3345[5]
  i3344.textMeshProEnabled = !!i3345[6]
  i3344.tk2DEnabled = !!i3345[7]
  i3344.deAudioEnabled = !!i3345[8]
  i3344.deUnityExtendedEnabled = !!i3345[9]
  i3344.epoOutlineEnabled = !!i3345[10]
  return i3344
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i3346 = root || request.c( 'TMPro.TMP_Settings' )
  var i3347 = data
  i3346.assetVersion = i3347[0]
  i3346.m_TextWrappingMode = i3347[1]
  i3346.m_enableKerning = !!i3347[2]
  var i3349 = i3347[3]
  var i3348 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i3349.length; i += 1) {
    i3348.add(i3349[i + 0]);
  }
  i3346.m_ActiveFontFeatures = i3348
  i3346.m_enableExtraPadding = !!i3347[4]
  i3346.m_enableTintAllSprites = !!i3347[5]
  i3346.m_enableParseEscapeCharacters = !!i3347[6]
  i3346.m_EnableRaycastTarget = !!i3347[7]
  i3346.m_GetFontFeaturesAtRuntime = !!i3347[8]
  i3346.m_missingGlyphCharacter = i3347[9]
  i3346.m_ClearDynamicDataOnBuild = !!i3347[10]
  i3346.m_warningsDisabled = !!i3347[11]
  request.r(i3347[12], i3347[13], 0, i3346, 'm_defaultFontAsset')
  i3346.m_defaultFontAssetPath = i3347[14]
  i3346.m_defaultFontSize = i3347[15]
  i3346.m_defaultAutoSizeMinRatio = i3347[16]
  i3346.m_defaultAutoSizeMaxRatio = i3347[17]
  i3346.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i3347[18], i3347[19] )
  i3346.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i3347[20], i3347[21] )
  i3346.m_autoSizeTextContainer = !!i3347[22]
  i3346.m_IsTextObjectScaleStatic = !!i3347[23]
  var i3351 = i3347[24]
  var i3350 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i3351.length; i += 2) {
  request.r(i3351[i + 0], i3351[i + 1], 1, i3350, '')
  }
  i3346.m_fallbackFontAssets = i3350
  i3346.m_matchMaterialPreset = !!i3347[25]
  i3346.m_HideSubTextObjects = !!i3347[26]
  request.r(i3347[27], i3347[28], 0, i3346, 'm_defaultSpriteAsset')
  i3346.m_defaultSpriteAssetPath = i3347[29]
  i3346.m_enableEmojiSupport = !!i3347[30]
  i3346.m_MissingCharacterSpriteUnicode = i3347[31]
  var i3353 = i3347[32]
  var i3352 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i3353.length; i += 2) {
  request.r(i3353[i + 0], i3353[i + 1], 1, i3352, '')
  }
  i3346.m_EmojiFallbackTextAssets = i3352
  i3346.m_defaultColorGradientPresetsPath = i3347[33]
  request.r(i3347[34], i3347[35], 0, i3346, 'm_defaultStyleSheet')
  i3346.m_StyleSheetsResourcePath = i3347[36]
  request.r(i3347[37], i3347[38], 0, i3346, 'm_leadingCharacters')
  request.r(i3347[39], i3347[40], 0, i3346, 'm_followingCharacters')
  i3346.m_UseModernHangulLineBreakingRules = !!i3347[41]
  return i3346
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i3356 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i3357 = data
  request.r(i3357[0], i3357[1], 0, i3356, 'spriteSheet')
  var i3359 = i3357[2]
  var i3358 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i3359.length; i += 1) {
    i3358.add(request.d('TMPro.TMP_Sprite', i3359[i + 0]));
  }
  i3356.spriteInfoList = i3358
  var i3361 = i3357[3]
  var i3360 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i3361.length; i += 2) {
  request.r(i3361[i + 0], i3361[i + 1], 1, i3360, '')
  }
  i3356.fallbackSpriteAssets = i3360
  var i3363 = i3357[4]
  var i3362 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i3363.length; i += 1) {
    i3362.add(request.d('TMPro.TMP_SpriteCharacter', i3363[i + 0]));
  }
  i3356.m_SpriteCharacterTable = i3362
  var i3365 = i3357[5]
  var i3364 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i3365.length; i += 1) {
    i3364.add(request.d('TMPro.TMP_SpriteGlyph', i3365[i + 0]));
  }
  i3356.m_GlyphTable = i3364
  i3356.m_Version = i3357[6]
  i3356.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i3357[7], i3356.m_FaceInfo)
  request.r(i3357[8], i3357[9], 0, i3356, 'm_Material')
  return i3356
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i3368 = root || request.c( 'TMPro.TMP_Sprite' )
  var i3369 = data
  i3368.name = i3369[0]
  i3368.hashCode = i3369[1]
  i3368.unicode = i3369[2]
  i3368.pivot = new pc.Vec2( i3369[3], i3369[4] )
  request.r(i3369[5], i3369[6], 0, i3368, 'sprite')
  i3368.id = i3369[7]
  i3368.x = i3369[8]
  i3368.y = i3369[9]
  i3368.width = i3369[10]
  i3368.height = i3369[11]
  i3368.xOffset = i3369[12]
  i3368.yOffset = i3369[13]
  i3368.xAdvance = i3369[14]
  i3368.scale = i3369[15]
  return i3368
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i3374 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i3375 = data
  i3374.m_Name = i3375[0]
  i3374.m_ElementType = i3375[1]
  i3374.m_Unicode = i3375[2]
  i3374.m_GlyphIndex = i3375[3]
  i3374.m_Scale = i3375[4]
  return i3374
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i3378 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i3379 = data
  request.r(i3379[0], i3379[1], 0, i3378, 'sprite')
  i3378.m_Index = i3379[2]
  i3378.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i3379[3], i3378.m_Metrics)
  i3378.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i3379[4], i3378.m_GlyphRect)
  i3378.m_Scale = i3379[5]
  i3378.m_AtlasIndex = i3379[6]
  i3378.m_ClassDefinitionType = i3379[7]
  return i3378
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i3380 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i3381 = data
  var i3383 = i3381[0]
  var i3382 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i3383.length; i += 1) {
    i3382.add(request.d('TMPro.TMP_Style', i3383[i + 0]));
  }
  i3380.m_StyleList = i3382
  return i3380
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i3386 = root || request.c( 'TMPro.TMP_Style' )
  var i3387 = data
  i3386.m_Name = i3387[0]
  i3386.m_HashCode = i3387[1]
  i3386.m_OpeningDefinition = i3387[2]
  i3386.m_ClosingDefinition = i3387[3]
  i3386.m_OpeningTagArray = i3387[4]
  i3386.m_ClosingTagArray = i3387[5]
  return i3386
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i3388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i3389 = data
  var i3391 = i3389[0]
  var i3390 = []
  for(var i = 0; i < i3391.length; i += 1) {
    i3390.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i3391[i + 0]) );
  }
  i3388.files = i3390
  i3388.componentToPrefabIds = i3389[1]
  return i3388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i3394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i3395 = data
  i3394.path = i3395[0]
  request.r(i3395[1], i3395[2], 0, i3394, 'unityObject')
  return i3394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i3396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i3397 = data
  var i3399 = i3397[0]
  var i3398 = []
  for(var i = 0; i < i3399.length; i += 1) {
    i3398.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i3399[i + 0]) );
  }
  i3396.scriptsExecutionOrder = i3398
  var i3401 = i3397[1]
  var i3400 = []
  for(var i = 0; i < i3401.length; i += 1) {
    i3400.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i3401[i + 0]) );
  }
  i3396.sortingLayers = i3400
  var i3403 = i3397[2]
  var i3402 = []
  for(var i = 0; i < i3403.length; i += 1) {
    i3402.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i3403[i + 0]) );
  }
  i3396.cullingLayers = i3402
  i3396.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i3397[3], i3396.timeSettings)
  i3396.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i3397[4], i3396.physicsSettings)
  i3396.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i3397[5], i3396.physics2DSettings)
  i3396.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3397[6], i3396.qualitySettings)
  i3396.enableRealtimeShadows = !!i3397[7]
  i3396.enableAutoInstancing = !!i3397[8]
  i3396.enableStaticBatching = !!i3397[9]
  i3396.enableDynamicBatching = !!i3397[10]
  i3396.usePreservativeDynamicBatching = !!i3397[11]
  i3396.lightmapEncodingQuality = i3397[12]
  i3396.desiredColorSpace = i3397[13]
  var i3405 = i3397[14]
  var i3404 = []
  for(var i = 0; i < i3405.length; i += 1) {
    i3404.push( i3405[i + 0] );
  }
  i3396.allTags = i3404
  return i3396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i3408 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i3409 = data
  i3408.name = i3409[0]
  i3408.value = i3409[1]
  return i3408
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i3412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i3413 = data
  i3412.id = i3413[0]
  i3412.name = i3413[1]
  i3412.value = i3413[2]
  return i3412
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i3416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i3417 = data
  i3416.id = i3417[0]
  i3416.name = i3417[1]
  return i3416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i3418 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i3419 = data
  i3418.fixedDeltaTime = i3419[0]
  i3418.maximumDeltaTime = i3419[1]
  i3418.timeScale = i3419[2]
  i3418.maximumParticleTimestep = i3419[3]
  return i3418
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i3420 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i3421 = data
  i3420.gravity = new pc.Vec3( i3421[0], i3421[1], i3421[2] )
  i3420.defaultSolverIterations = i3421[3]
  i3420.bounceThreshold = i3421[4]
  i3420.autoSyncTransforms = !!i3421[5]
  i3420.autoSimulation = !!i3421[6]
  var i3423 = i3421[7]
  var i3422 = []
  for(var i = 0; i < i3423.length; i += 1) {
    i3422.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i3423[i + 0]) );
  }
  i3420.collisionMatrix = i3422
  return i3420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i3426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i3427 = data
  i3426.enabled = !!i3427[0]
  i3426.layerId = i3427[1]
  i3426.otherLayerId = i3427[2]
  return i3426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i3428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i3429 = data
  request.r(i3429[0], i3429[1], 0, i3428, 'material')
  i3428.gravity = new pc.Vec2( i3429[2], i3429[3] )
  i3428.positionIterations = i3429[4]
  i3428.velocityIterations = i3429[5]
  i3428.velocityThreshold = i3429[6]
  i3428.maxLinearCorrection = i3429[7]
  i3428.maxAngularCorrection = i3429[8]
  i3428.maxTranslationSpeed = i3429[9]
  i3428.maxRotationSpeed = i3429[10]
  i3428.baumgarteScale = i3429[11]
  i3428.baumgarteTOIScale = i3429[12]
  i3428.timeToSleep = i3429[13]
  i3428.linearSleepTolerance = i3429[14]
  i3428.angularSleepTolerance = i3429[15]
  i3428.defaultContactOffset = i3429[16]
  i3428.autoSimulation = !!i3429[17]
  i3428.queriesHitTriggers = !!i3429[18]
  i3428.queriesStartInColliders = !!i3429[19]
  i3428.callbacksOnDisable = !!i3429[20]
  i3428.reuseCollisionCallbacks = !!i3429[21]
  i3428.autoSyncTransforms = !!i3429[22]
  var i3431 = i3429[23]
  var i3430 = []
  for(var i = 0; i < i3431.length; i += 1) {
    i3430.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i3431[i + 0]) );
  }
  i3428.collisionMatrix = i3430
  return i3428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i3434 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i3435 = data
  i3434.enabled = !!i3435[0]
  i3434.layerId = i3435[1]
  i3434.otherLayerId = i3435[2]
  return i3434
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i3436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i3437 = data
  var i3439 = i3437[0]
  var i3438 = []
  for(var i = 0; i < i3439.length; i += 1) {
    i3438.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i3439[i + 0]) );
  }
  i3436.qualityLevels = i3438
  var i3441 = i3437[1]
  var i3440 = []
  for(var i = 0; i < i3441.length; i += 1) {
    i3440.push( i3441[i + 0] );
  }
  i3436.names = i3440
  i3436.shadows = i3437[2]
  i3436.anisotropicFiltering = i3437[3]
  i3436.antiAliasing = i3437[4]
  i3436.lodBias = i3437[5]
  i3436.shadowCascades = i3437[6]
  i3436.shadowDistance = i3437[7]
  i3436.shadowmaskMode = i3437[8]
  i3436.shadowProjection = i3437[9]
  i3436.shadowResolution = i3437[10]
  i3436.softParticles = !!i3437[11]
  i3436.softVegetation = !!i3437[12]
  i3436.activeColorSpace = i3437[13]
  i3436.desiredColorSpace = i3437[14]
  i3436.masterTextureLimit = i3437[15]
  i3436.maxQueuedFrames = i3437[16]
  i3436.particleRaycastBudget = i3437[17]
  i3436.pixelLightCount = i3437[18]
  i3436.realtimeReflectionProbes = !!i3437[19]
  i3436.shadowCascade2Split = i3437[20]
  i3436.shadowCascade4Split = new pc.Vec3( i3437[21], i3437[22], i3437[23] )
  i3436.streamingMipmapsActive = !!i3437[24]
  i3436.vSyncCount = i3437[25]
  i3436.asyncUploadBufferSize = i3437[26]
  i3436.asyncUploadTimeSlice = i3437[27]
  i3436.billboardsFaceCameraPosition = !!i3437[28]
  i3436.shadowNearPlaneOffset = i3437[29]
  i3436.streamingMipmapsMemoryBudget = i3437[30]
  i3436.maximumLODLevel = i3437[31]
  i3436.streamingMipmapsAddAllCameras = !!i3437[32]
  i3436.streamingMipmapsMaxLevelReduction = i3437[33]
  i3436.streamingMipmapsRenderersPerFrame = i3437[34]
  i3436.resolutionScalingFixedDPIFactor = i3437[35]
  i3436.streamingMipmapsMaxFileIORequests = i3437[36]
  i3436.currentQualityLevel = i3437[37]
  return i3436
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i3444 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i3445 = data
  request.r(i3445[0], i3445[1], 0, i3444, 'm_ObjectArgument')
  i3444.m_ObjectArgumentAssemblyTypeName = i3445[2]
  i3444.m_IntArgument = i3445[3]
  i3444.m_FloatArgument = i3445[4]
  i3444.m_StringArgument = i3445[5]
  i3444.m_BoolArgument = !!i3445[6]
  return i3444
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i3446 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i3447 = data
  i3446.m_GlyphIndex = i3447[0]
  i3446.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i3447[1], i3446.m_GlyphValueRecord)
  return i3446
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i3448 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i3449 = data
  i3448.m_XCoordinate = i3449[0]
  i3448.m_YCoordinate = i3449[1]
  return i3448
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i3450 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i3451 = data
  i3450.m_XPositionAdjustment = i3451[0]
  i3450.m_YPositionAdjustment = i3451[1]
  return i3450
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i3452 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i3453 = data
  i3452.xPlacement = i3453[0]
  i3452.yPlacement = i3453[1]
  i3452.xAdvance = i3453[2]
  i3452.yAdvance = i3453[3]
  return i3452
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i3454 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i3455 = data
  i3454.m_XPlacement = i3455[0]
  i3454.m_YPlacement = i3455[1]
  i3454.m_XAdvance = i3455[2]
  i3454.m_YAdvance = i3455[3]
  return i3454
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

Deserializers.creativeName = "PEOP_V36_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1782";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4118";

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

Deserializers.buildID = "c37eb4a5-bf66-433c-b624-7f52e54bc539";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

