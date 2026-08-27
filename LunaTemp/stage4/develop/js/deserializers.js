var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i4110 = root || request.c( 'UnityEngine.JointSpring' )
  var i4111 = data
  i4110.spring = i4111[0]
  i4110.damper = i4111[1]
  i4110.targetPosition = i4111[2]
  return i4110
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i4112 = root || request.c( 'UnityEngine.JointMotor' )
  var i4113 = data
  i4112.m_TargetVelocity = i4113[0]
  i4112.m_Force = i4113[1]
  i4112.m_FreeSpin = i4113[2]
  return i4112
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i4114 = root || request.c( 'UnityEngine.JointLimits' )
  var i4115 = data
  i4114.m_Min = i4115[0]
  i4114.m_Max = i4115[1]
  i4114.m_Bounciness = i4115[2]
  i4114.m_BounceMinVelocity = i4115[3]
  i4114.m_ContactDistance = i4115[4]
  i4114.minBounce = i4115[5]
  i4114.maxBounce = i4115[6]
  return i4114
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i4116 = root || request.c( 'UnityEngine.JointDrive' )
  var i4117 = data
  i4116.m_PositionSpring = i4117[0]
  i4116.m_PositionDamper = i4117[1]
  i4116.m_MaximumForce = i4117[2]
  i4116.m_UseAcceleration = i4117[3]
  return i4116
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i4118 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i4119 = data
  i4118.m_Spring = i4119[0]
  i4118.m_Damper = i4119[1]
  return i4118
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i4120 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i4121 = data
  i4120.m_Limit = i4121[0]
  i4120.m_Bounciness = i4121[1]
  i4120.m_ContactDistance = i4121[2]
  return i4120
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i4122 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i4123 = data
  i4122.m_ExtremumSlip = i4123[0]
  i4122.m_ExtremumValue = i4123[1]
  i4122.m_AsymptoteSlip = i4123[2]
  i4122.m_AsymptoteValue = i4123[3]
  i4122.m_Stiffness = i4123[4]
  return i4122
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i4124 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i4125 = data
  i4124.m_LowerAngle = i4125[0]
  i4124.m_UpperAngle = i4125[1]
  return i4124
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i4126 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i4127 = data
  i4126.m_MotorSpeed = i4127[0]
  i4126.m_MaximumMotorTorque = i4127[1]
  return i4126
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i4128 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i4129 = data
  i4128.m_DampingRatio = i4129[0]
  i4128.m_Frequency = i4129[1]
  i4128.m_Angle = i4129[2]
  return i4128
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i4130 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i4131 = data
  i4130.m_LowerTranslation = i4131[0]
  i4130.m_UpperTranslation = i4131[1]
  return i4130
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i4132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i4133 = data
  i4132.name = i4133[0]
  i4132.width = i4133[1]
  i4132.height = i4133[2]
  i4132.mipmapCount = i4133[3]
  i4132.anisoLevel = i4133[4]
  i4132.filterMode = i4133[5]
  i4132.hdr = !!i4133[6]
  i4132.format = i4133[7]
  i4132.wrapMode = i4133[8]
  i4132.alphaIsTransparency = !!i4133[9]
  i4132.alphaSource = i4133[10]
  i4132.graphicsFormat = i4133[11]
  i4132.sRGBTexture = !!i4133[12]
  i4132.desiredColorSpace = i4133[13]
  i4132.wrapU = i4133[14]
  i4132.wrapV = i4133[15]
  return i4132
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i4134 = root || new pc.UnityMaterial()
  var i4135 = data
  i4134.name = i4135[0]
  request.r(i4135[1], i4135[2], 0, i4134, 'shader')
  i4134.renderQueue = i4135[3]
  i4134.enableInstancing = !!i4135[4]
  var i4137 = i4135[5]
  var i4136 = []
  for(var i = 0; i < i4137.length; i += 1) {
    i4136.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i4137[i + 0]) );
  }
  i4134.floatParameters = i4136
  var i4139 = i4135[6]
  var i4138 = []
  for(var i = 0; i < i4139.length; i += 1) {
    i4138.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i4139[i + 0]) );
  }
  i4134.colorParameters = i4138
  var i4141 = i4135[7]
  var i4140 = []
  for(var i = 0; i < i4141.length; i += 1) {
    i4140.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i4141[i + 0]) );
  }
  i4134.vectorParameters = i4140
  var i4143 = i4135[8]
  var i4142 = []
  for(var i = 0; i < i4143.length; i += 1) {
    i4142.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i4143[i + 0]) );
  }
  i4134.textureParameters = i4142
  var i4145 = i4135[9]
  var i4144 = []
  for(var i = 0; i < i4145.length; i += 1) {
    i4144.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i4145[i + 0]) );
  }
  i4134.materialFlags = i4144
  return i4134
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i4148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i4149 = data
  i4148.name = i4149[0]
  i4148.value = i4149[1]
  return i4148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i4152 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i4153 = data
  i4152.name = i4153[0]
  i4152.value = new pc.Color(i4153[1], i4153[2], i4153[3], i4153[4])
  return i4152
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i4156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i4157 = data
  i4156.name = i4157[0]
  i4156.value = new pc.Vec4( i4157[1], i4157[2], i4157[3], i4157[4] )
  return i4156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i4160 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i4161 = data
  i4160.name = i4161[0]
  request.r(i4161[1], i4161[2], 0, i4160, 'value')
  return i4160
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i4164 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i4165 = data
  i4164.name = i4165[0]
  i4164.enabled = !!i4165[1]
  return i4164
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i4166 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i4167 = data
  i4166.name = i4167[0]
  i4166.index = i4167[1]
  i4166.startup = !!i4167[2]
  return i4166
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i4168 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i4169 = data
  i4168.aspect = i4169[0]
  i4168.orthographic = !!i4169[1]
  i4168.orthographicSize = i4169[2]
  i4168.backgroundColor = new pc.Color(i4169[3], i4169[4], i4169[5], i4169[6])
  i4168.nearClipPlane = i4169[7]
  i4168.farClipPlane = i4169[8]
  i4168.fieldOfView = i4169[9]
  i4168.depth = i4169[10]
  i4168.clearFlags = i4169[11]
  i4168.cullingMask = i4169[12]
  i4168.rect = i4169[13]
  request.r(i4169[14], i4169[15], 0, i4168, 'targetTexture')
  i4168.usePhysicalProperties = !!i4169[16]
  i4168.focalLength = i4169[17]
  i4168.sensorSize = new pc.Vec2( i4169[18], i4169[19] )
  i4168.lensShift = new pc.Vec2( i4169[20], i4169[21] )
  i4168.gateFit = i4169[22]
  i4168.commandBufferCount = i4169[23]
  i4168.cameraType = i4169[24]
  i4168.enabled = !!i4169[25]
  return i4168
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i4170 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i4171 = data
  i4170.name = i4171[0]
  i4170.tagId = i4171[1]
  i4170.enabled = !!i4171[2]
  i4170.isStatic = !!i4171[3]
  i4170.layer = i4171[4]
  return i4170
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i4172 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i4173 = data
  request.r(i4173[0], i4173[1], 0, i4172, 'm_FirstSelected')
  i4172.m_sendNavigationEvents = !!i4173[2]
  i4172.m_DragThreshold = i4173[3]
  return i4172
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i4174 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i4175 = data
  i4174.m_HorizontalAxis = i4175[0]
  i4174.m_VerticalAxis = i4175[1]
  i4174.m_SubmitButton = i4175[2]
  i4174.m_CancelButton = i4175[3]
  i4174.m_InputActionsPerSecond = i4175[4]
  i4174.m_RepeatDelay = i4175[5]
  i4174.m_ForceModuleActive = !!i4175[6]
  i4174.m_SendPointerHoverToParent = !!i4175[7]
  return i4174
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i4176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i4177 = data
  i4176.pivot = new pc.Vec2( i4177[0], i4177[1] )
  i4176.anchorMin = new pc.Vec2( i4177[2], i4177[3] )
  i4176.anchorMax = new pc.Vec2( i4177[4], i4177[5] )
  i4176.sizeDelta = new pc.Vec2( i4177[6], i4177[7] )
  i4176.anchoredPosition3D = new pc.Vec3( i4177[8], i4177[9], i4177[10] )
  i4176.rotation = new pc.Quat(i4177[11], i4177[12], i4177[13], i4177[14])
  i4176.scale = new pc.Vec3( i4177[15], i4177[16], i4177[17] )
  return i4176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i4178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i4179 = data
  i4178.planeDistance = i4179[0]
  i4178.referencePixelsPerUnit = i4179[1]
  i4178.isFallbackOverlay = !!i4179[2]
  i4178.renderMode = i4179[3]
  i4178.renderOrder = i4179[4]
  i4178.sortingLayerName = i4179[5]
  i4178.sortingOrder = i4179[6]
  i4178.scaleFactor = i4179[7]
  request.r(i4179[8], i4179[9], 0, i4178, 'worldCamera')
  i4178.overrideSorting = !!i4179[10]
  i4178.pixelPerfect = !!i4179[11]
  i4178.targetDisplay = i4179[12]
  i4178.overridePixelPerfect = !!i4179[13]
  i4178.enabled = !!i4179[14]
  return i4178
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i4180 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i4181 = data
  i4180.m_UiScaleMode = i4181[0]
  i4180.m_ReferencePixelsPerUnit = i4181[1]
  i4180.m_ScaleFactor = i4181[2]
  i4180.m_ReferenceResolution = new pc.Vec2( i4181[3], i4181[4] )
  i4180.m_ScreenMatchMode = i4181[5]
  i4180.m_MatchWidthOrHeight = i4181[6]
  i4180.m_PhysicalUnit = i4181[7]
  i4180.m_FallbackScreenDPI = i4181[8]
  i4180.m_DefaultSpriteDPI = i4181[9]
  i4180.m_DynamicPixelsPerUnit = i4181[10]
  i4180.m_PresetInfoIsWorld = !!i4181[11]
  return i4180
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i4182 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i4183 = data
  i4182.m_IgnoreReversedGraphics = !!i4183[0]
  i4182.m_BlockingObjects = i4183[1]
  i4182.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i4183[2] )
  return i4182
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i4184 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i4185 = data
  i4184.cullTransparentMesh = !!i4185[0]
  return i4184
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i4186 = root || request.c( 'UnityEngine.UI.Image' )
  var i4187 = data
  request.r(i4187[0], i4187[1], 0, i4186, 'm_Sprite')
  i4186.m_Type = i4187[2]
  i4186.m_PreserveAspect = !!i4187[3]
  i4186.m_FillCenter = !!i4187[4]
  i4186.m_FillMethod = i4187[5]
  i4186.m_FillAmount = i4187[6]
  i4186.m_FillClockwise = !!i4187[7]
  i4186.m_FillOrigin = i4187[8]
  i4186.m_UseSpriteMesh = !!i4187[9]
  i4186.m_PixelsPerUnitMultiplier = i4187[10]
  request.r(i4187[11], i4187[12], 0, i4186, 'm_Material')
  i4186.m_Maskable = !!i4187[13]
  i4186.m_Color = new pc.Color(i4187[14], i4187[15], i4187[16], i4187[17])
  i4186.m_RaycastTarget = !!i4187[18]
  i4186.m_RaycastPadding = new pc.Vec4( i4187[19], i4187[20], i4187[21], i4187[22] )
  return i4186
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i4188 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i4189 = data
  i4188.m_AspectMode = i4189[0]
  i4188.m_AspectRatio = i4189[1]
  return i4188
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i4190 = root || request.c( 'UnityEngine.UI.Text' )
  var i4191 = data
  i4190.m_FontData = request.d('UnityEngine.UI.FontData', i4191[0], i4190.m_FontData)
  i4190.m_Text = i4191[1]
  request.r(i4191[2], i4191[3], 0, i4190, 'm_Material')
  i4190.m_Maskable = !!i4191[4]
  i4190.m_Color = new pc.Color(i4191[5], i4191[6], i4191[7], i4191[8])
  i4190.m_RaycastTarget = !!i4191[9]
  i4190.m_RaycastPadding = new pc.Vec4( i4191[10], i4191[11], i4191[12], i4191[13] )
  return i4190
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i4192 = root || request.c( 'UnityEngine.UI.FontData' )
  var i4193 = data
  request.r(i4193[0], i4193[1], 0, i4192, 'm_Font')
  i4192.m_FontSize = i4193[2]
  i4192.m_FontStyle = i4193[3]
  i4192.m_BestFit = !!i4193[4]
  i4192.m_MinSize = i4193[5]
  i4192.m_MaxSize = i4193[6]
  i4192.m_Alignment = i4193[7]
  i4192.m_AlignByGeometry = !!i4193[8]
  i4192.m_RichText = !!i4193[9]
  i4192.m_HorizontalOverflow = i4193[10]
  i4192.m_VerticalOverflow = i4193[11]
  i4192.m_LineSpacing = i4193[12]
  return i4192
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i4194 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i4195 = data
  i4194.targetIsSelf = !!i4195[0]
  request.r(i4195[1], i4195[2], 0, i4194, 'targetGO')
  i4194.tweenTargetIsTargetGO = !!i4195[3]
  i4194.delay = i4195[4]
  i4194.duration = i4195[5]
  i4194.easeType = i4195[6]
  i4194.easeCurve = new pc.AnimationCurve( { keys_flow: i4195[7] } )
  i4194.loopType = i4195[8]
  i4194.loops = i4195[9]
  i4194.id = i4195[10]
  i4194.isRelative = !!i4195[11]
  i4194.isFrom = !!i4195[12]
  i4194.isIndependentUpdate = !!i4195[13]
  i4194.autoKill = !!i4195[14]
  i4194.autoGenerate = !!i4195[15]
  i4194.isActive = !!i4195[16]
  i4194.isValid = !!i4195[17]
  request.r(i4195[18], i4195[19], 0, i4194, 'target')
  i4194.animationType = i4195[20]
  i4194.targetType = i4195[21]
  i4194.forcedTargetType = i4195[22]
  i4194.autoPlay = !!i4195[23]
  i4194.useTargetAsV3 = !!i4195[24]
  i4194.endValueFloat = i4195[25]
  i4194.endValueV3 = new pc.Vec3( i4195[26], i4195[27], i4195[28] )
  i4194.endValueV2 = new pc.Vec2( i4195[29], i4195[30] )
  i4194.endValueColor = new pc.Color(i4195[31], i4195[32], i4195[33], i4195[34])
  i4194.endValueString = i4195[35]
  i4194.endValueRect = UnityEngine.Rect.MinMaxRect(i4195[36], i4195[37], i4195[38], i4195[39])
  request.r(i4195[40], i4195[41], 0, i4194, 'endValueTransform')
  i4194.optionalBool0 = !!i4195[42]
  i4194.optionalBool1 = !!i4195[43]
  i4194.optionalFloat0 = i4195[44]
  i4194.optionalInt0 = i4195[45]
  i4194.optionalRotationMode = i4195[46]
  i4194.optionalScrambleMode = i4195[47]
  i4194.optionalShakeRandomnessMode = i4195[48]
  i4194.optionalString = i4195[49]
  i4194.updateType = i4195[50]
  i4194.isSpeedBased = !!i4195[51]
  i4194.hasOnStart = !!i4195[52]
  i4194.hasOnPlay = !!i4195[53]
  i4194.hasOnUpdate = !!i4195[54]
  i4194.hasOnStepComplete = !!i4195[55]
  i4194.hasOnComplete = !!i4195[56]
  i4194.hasOnTweenCreated = !!i4195[57]
  i4194.hasOnRewind = !!i4195[58]
  i4194.onStart = request.d('UnityEngine.Events.UnityEvent', i4195[59], i4194.onStart)
  i4194.onPlay = request.d('UnityEngine.Events.UnityEvent', i4195[60], i4194.onPlay)
  i4194.onUpdate = request.d('UnityEngine.Events.UnityEvent', i4195[61], i4194.onUpdate)
  i4194.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i4195[62], i4194.onStepComplete)
  i4194.onComplete = request.d('UnityEngine.Events.UnityEvent', i4195[63], i4194.onComplete)
  i4194.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i4195[64], i4194.onTweenCreated)
  i4194.onRewind = request.d('UnityEngine.Events.UnityEvent', i4195[65], i4194.onRewind)
  return i4194
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i4196 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i4197 = data
  i4196.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4197[0], i4196.m_PersistentCalls)
  return i4196
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i4198 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i4199 = data
  var i4201 = i4199[0]
  var i4200 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i4201.length; i += 1) {
    i4200.add(request.d('UnityEngine.Events.PersistentCall', i4201[i + 0]));
  }
  i4198.m_Calls = i4200
  return i4198
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i4204 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i4205 = data
  request.r(i4205[0], i4205[1], 0, i4204, 'm_Target')
  i4204.m_TargetAssemblyTypeName = i4205[2]
  i4204.m_MethodName = i4205[3]
  i4204.m_Mode = i4205[4]
  i4204.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i4205[5], i4204.m_Arguments)
  i4204.m_CallState = i4205[6]
  return i4204
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i4206 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i4207 = data
  request.r(i4207[0], i4207[1], 0, i4206, 'm_Texture')
  i4206.m_UVRect = UnityEngine.Rect.MinMaxRect(i4207[2], i4207[3], i4207[4], i4207[5])
  request.r(i4207[6], i4207[7], 0, i4206, 'm_Material')
  i4206.m_Maskable = !!i4207[8]
  i4206.m_Color = new pc.Color(i4207[9], i4207[10], i4207[11], i4207[12])
  i4206.m_RaycastTarget = !!i4207[13]
  i4206.m_RaycastPadding = new pc.Vec4( i4207[14], i4207[15], i4207[16], i4207[17] )
  return i4206
}

Deserializers["TutController"] = function (request, data, root) {
  var i4208 = root || request.c( 'TutController' )
  var i4209 = data
  request.r(i4209[0], i4209[1], 0, i4208, 'leftCard')
  request.r(i4209[2], i4209[3], 0, i4208, 'rightCard')
  i4208.leftPos = new pc.Vec2( i4209[4], i4209[5] )
  i4208.rightPos = new pc.Vec2( i4209[6], i4209[7] )
  request.r(i4209[8], i4209[9], 0, i4208, 'tut')
  i4208.timeMove = i4209[10]
  i4208.timeDelay = i4209[11]
  return i4208
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i4210 = root || request.c( 'UnityEngine.UI.Mask' )
  var i4211 = data
  i4210.m_ShowMaskGraphic = !!i4211[0]
  return i4210
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i4212 = root || request.c( 'UnityEngine.UI.Button' )
  var i4213 = data
  i4212.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i4213[0], i4212.m_OnClick)
  i4212.m_Navigation = request.d('UnityEngine.UI.Navigation', i4213[1], i4212.m_Navigation)
  i4212.m_Transition = i4213[2]
  i4212.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4213[3], i4212.m_Colors)
  i4212.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4213[4], i4212.m_SpriteState)
  i4212.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4213[5], i4212.m_AnimationTriggers)
  i4212.m_Interactable = !!i4213[6]
  request.r(i4213[7], i4213[8], 0, i4212, 'm_TargetGraphic')
  return i4212
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i4214 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i4215 = data
  i4214.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4215[0], i4214.m_PersistentCalls)
  return i4214
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i4216 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i4217 = data
  i4216.m_Mode = i4217[0]
  i4216.m_WrapAround = !!i4217[1]
  request.r(i4217[2], i4217[3], 0, i4216, 'm_SelectOnUp')
  request.r(i4217[4], i4217[5], 0, i4216, 'm_SelectOnDown')
  request.r(i4217[6], i4217[7], 0, i4216, 'm_SelectOnLeft')
  request.r(i4217[8], i4217[9], 0, i4216, 'm_SelectOnRight')
  return i4216
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i4218 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i4219 = data
  i4218.m_NormalColor = new pc.Color(i4219[0], i4219[1], i4219[2], i4219[3])
  i4218.m_HighlightedColor = new pc.Color(i4219[4], i4219[5], i4219[6], i4219[7])
  i4218.m_PressedColor = new pc.Color(i4219[8], i4219[9], i4219[10], i4219[11])
  i4218.m_SelectedColor = new pc.Color(i4219[12], i4219[13], i4219[14], i4219[15])
  i4218.m_DisabledColor = new pc.Color(i4219[16], i4219[17], i4219[18], i4219[19])
  i4218.m_ColorMultiplier = i4219[20]
  i4218.m_FadeDuration = i4219[21]
  return i4218
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i4220 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i4221 = data
  request.r(i4221[0], i4221[1], 0, i4220, 'm_HighlightedSprite')
  request.r(i4221[2], i4221[3], 0, i4220, 'm_PressedSprite')
  request.r(i4221[4], i4221[5], 0, i4220, 'm_SelectedSprite')
  request.r(i4221[6], i4221[7], 0, i4220, 'm_DisabledSprite')
  return i4220
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i4222 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i4223 = data
  i4222.m_NormalTrigger = i4223[0]
  i4222.m_HighlightedTrigger = i4223[1]
  i4222.m_PressedTrigger = i4223[2]
  i4222.m_SelectedTrigger = i4223[3]
  i4222.m_DisabledTrigger = i4223[4]
  return i4222
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i4224 = root || request.c( 'LayoutController' )
  var i4225 = data
  request.r(i4225[0], i4225[1], 0, i4224, 'cardParent')
  request.r(i4225[2], i4225[3], 0, i4224, 'leftCard')
  request.r(i4225[4], i4225[5], 0, i4224, 'rightCard')
  i4224.origin = new pc.Vec2( i4225[6], i4225[7] )
  i4224.smallSize = new pc.Vec2( i4225[8], i4225[9] )
  return i4224
}

Deserializers["LunaController"] = function (request, data, root) {
  var i4226 = root || request.c( 'LunaController' )
  var i4227 = data
  i4226.TimePlay = i4227[0]
  i4226.LimitTimePlay = !!i4227[1]
  request.r(i4227[2], i4227[3], 0, i4226, 'BGM')
  request.r(i4227[4], i4227[5], 0, i4226, 'musicSource')
  request.r(i4227[6], i4227[7], 0, i4226, 'endCard')
  return i4226
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i4228 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i4229 = data
  request.r(i4229[0], i4229[1], 0, i4228, 'clip')
  request.r(i4229[2], i4229[3], 0, i4228, 'outputAudioMixerGroup')
  i4228.playOnAwake = !!i4229[4]
  i4228.loop = !!i4229[5]
  i4228.time = i4229[6]
  i4228.volume = i4229[7]
  i4228.pitch = i4229[8]
  i4228.enabled = !!i4229[9]
  return i4228
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i4230 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i4231 = data
  i4230.ambientIntensity = i4231[0]
  i4230.reflectionIntensity = i4231[1]
  i4230.ambientMode = i4231[2]
  i4230.ambientLight = new pc.Color(i4231[3], i4231[4], i4231[5], i4231[6])
  i4230.ambientSkyColor = new pc.Color(i4231[7], i4231[8], i4231[9], i4231[10])
  i4230.ambientGroundColor = new pc.Color(i4231[11], i4231[12], i4231[13], i4231[14])
  i4230.ambientEquatorColor = new pc.Color(i4231[15], i4231[16], i4231[17], i4231[18])
  i4230.fogColor = new pc.Color(i4231[19], i4231[20], i4231[21], i4231[22])
  i4230.fogEndDistance = i4231[23]
  i4230.fogStartDistance = i4231[24]
  i4230.fogDensity = i4231[25]
  i4230.fog = !!i4231[26]
  request.r(i4231[27], i4231[28], 0, i4230, 'skybox')
  i4230.fogMode = i4231[29]
  var i4233 = i4231[30]
  var i4232 = []
  for(var i = 0; i < i4233.length; i += 1) {
    i4232.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i4233[i + 0]) );
  }
  i4230.lightmaps = i4232
  i4230.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i4231[31], i4230.lightProbes)
  i4230.lightmapsMode = i4231[32]
  i4230.mixedBakeMode = i4231[33]
  i4230.environmentLightingMode = i4231[34]
  i4230.ambientProbe = new pc.SphericalHarmonicsL2(i4231[35])
  request.r(i4231[36], i4231[37], 0, i4230, 'customReflection')
  request.r(i4231[38], i4231[39], 0, i4230, 'defaultReflection')
  i4230.defaultReflectionMode = i4231[40]
  i4230.defaultReflectionResolution = i4231[41]
  i4230.sunLightObjectId = i4231[42]
  i4230.pixelLightCount = i4231[43]
  i4230.defaultReflectionHDR = !!i4231[44]
  i4230.hasLightDataAsset = !!i4231[45]
  i4230.hasManualGenerate = !!i4231[46]
  return i4230
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i4236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i4237 = data
  request.r(i4237[0], i4237[1], 0, i4236, 'lightmapColor')
  request.r(i4237[2], i4237[3], 0, i4236, 'lightmapDirection')
  request.r(i4237[4], i4237[5], 0, i4236, 'shadowMask')
  return i4236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i4238 = root || new UnityEngine.LightProbes()
  var i4239 = data
  return i4238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i4246 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i4247 = data
  var i4249 = i4247[0]
  var i4248 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i4249.length; i += 1) {
    i4248.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i4249[i + 0]));
  }
  i4246.ShaderCompilationErrors = i4248
  i4246.name = i4247[1]
  i4246.guid = i4247[2]
  var i4251 = i4247[3]
  var i4250 = []
  for(var i = 0; i < i4251.length; i += 1) {
    i4250.push( i4251[i + 0] );
  }
  i4246.shaderDefinedKeywords = i4250
  var i4253 = i4247[4]
  var i4252 = []
  for(var i = 0; i < i4253.length; i += 1) {
    i4252.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i4253[i + 0]) );
  }
  i4246.passes = i4252
  var i4255 = i4247[5]
  var i4254 = []
  for(var i = 0; i < i4255.length; i += 1) {
    i4254.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i4255[i + 0]) );
  }
  i4246.usePasses = i4254
  var i4257 = i4247[6]
  var i4256 = []
  for(var i = 0; i < i4257.length; i += 1) {
    i4256.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i4257[i + 0]) );
  }
  i4246.defaultParameterValues = i4256
  request.r(i4247[7], i4247[8], 0, i4246, 'unityFallbackShader')
  i4246.readDepth = !!i4247[9]
  i4246.hasDepthOnlyPass = !!i4247[10]
  i4246.isCreatedByShaderGraph = !!i4247[11]
  i4246.disableBatching = !!i4247[12]
  i4246.compiled = !!i4247[13]
  return i4246
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i4260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i4261 = data
  i4260.shaderName = i4261[0]
  i4260.errorMessage = i4261[1]
  return i4260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i4266 = root || new pc.UnityShaderPass()
  var i4267 = data
  i4266.id = i4267[0]
  i4266.subShaderIndex = i4267[1]
  i4266.name = i4267[2]
  i4266.passType = i4267[3]
  i4266.grabPassTextureName = i4267[4]
  i4266.usePass = !!i4267[5]
  i4266.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[6], i4266.zTest)
  i4266.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[7], i4266.zWrite)
  i4266.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[8], i4266.culling)
  i4266.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4267[9], i4266.blending)
  i4266.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i4267[10], i4266.alphaBlending)
  i4266.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[11], i4266.colorWriteMask)
  i4266.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[12], i4266.offsetUnits)
  i4266.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[13], i4266.offsetFactor)
  i4266.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[14], i4266.stencilRef)
  i4266.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[15], i4266.stencilReadMask)
  i4266.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4267[16], i4266.stencilWriteMask)
  i4266.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4267[17], i4266.stencilOp)
  i4266.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4267[18], i4266.stencilOpFront)
  i4266.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i4267[19], i4266.stencilOpBack)
  var i4269 = i4267[20]
  var i4268 = []
  for(var i = 0; i < i4269.length; i += 1) {
    i4268.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i4269[i + 0]) );
  }
  i4266.tags = i4268
  var i4271 = i4267[21]
  var i4270 = []
  for(var i = 0; i < i4271.length; i += 1) {
    i4270.push( i4271[i + 0] );
  }
  i4266.passDefinedKeywords = i4270
  var i4273 = i4267[22]
  var i4272 = []
  for(var i = 0; i < i4273.length; i += 1) {
    i4272.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i4273[i + 0]) );
  }
  i4266.passDefinedKeywordGroups = i4272
  var i4275 = i4267[23]
  var i4274 = []
  for(var i = 0; i < i4275.length; i += 1) {
    i4274.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4275[i + 0]) );
  }
  i4266.variants = i4274
  var i4277 = i4267[24]
  var i4276 = []
  for(var i = 0; i < i4277.length; i += 1) {
    i4276.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i4277[i + 0]) );
  }
  i4266.excludedVariants = i4276
  i4266.hasDepthReader = !!i4267[25]
  return i4266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i4278 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i4279 = data
  i4278.val = i4279[0]
  i4278.name = i4279[1]
  return i4278
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i4280 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i4281 = data
  i4280.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4281[0], i4280.src)
  i4280.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4281[1], i4280.dst)
  i4280.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4281[2], i4280.op)
  return i4280
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i4282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i4283 = data
  i4282.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4283[0], i4282.pass)
  i4282.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4283[1], i4282.fail)
  i4282.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4283[2], i4282.zFail)
  i4282.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i4283[3], i4282.comp)
  return i4282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i4286 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i4287 = data
  i4286.name = i4287[0]
  i4286.value = i4287[1]
  return i4286
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i4290 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i4291 = data
  var i4293 = i4291[0]
  var i4292 = []
  for(var i = 0; i < i4293.length; i += 1) {
    i4292.push( i4293[i + 0] );
  }
  i4290.keywords = i4292
  i4290.hasDiscard = !!i4291[1]
  return i4290
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i4296 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i4297 = data
  i4296.passId = i4297[0]
  i4296.subShaderIndex = i4297[1]
  var i4299 = i4297[2]
  var i4298 = []
  for(var i = 0; i < i4299.length; i += 1) {
    i4298.push( i4299[i + 0] );
  }
  i4296.keywords = i4298
  i4296.vertexProgram = i4297[3]
  i4296.fragmentProgram = i4297[4]
  i4296.exportedForWebGl2 = !!i4297[5]
  i4296.readDepth = !!i4297[6]
  return i4296
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i4302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i4303 = data
  request.r(i4303[0], i4303[1], 0, i4302, 'shader')
  i4302.pass = i4303[2]
  return i4302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i4306 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i4307 = data
  i4306.name = i4307[0]
  i4306.type = i4307[1]
  i4306.value = new pc.Vec4( i4307[2], i4307[3], i4307[4], i4307[5] )
  i4306.textureValue = i4307[6]
  i4306.shaderPropertyFlag = i4307[7]
  return i4306
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i4308 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i4309 = data
  i4308.name = i4309[0]
  request.r(i4309[1], i4309[2], 0, i4308, 'texture')
  i4308.aabb = i4309[3]
  i4308.vertices = i4309[4]
  i4308.triangles = i4309[5]
  i4308.textureRect = UnityEngine.Rect.MinMaxRect(i4309[6], i4309[7], i4309[8], i4309[9])
  i4308.packedRect = UnityEngine.Rect.MinMaxRect(i4309[10], i4309[11], i4309[12], i4309[13])
  i4308.border = new pc.Vec4( i4309[14], i4309[15], i4309[16], i4309[17] )
  i4308.transparency = i4309[18]
  i4308.bounds = i4309[19]
  i4308.pixelsPerUnit = i4309[20]
  i4308.textureWidth = i4309[21]
  i4308.textureHeight = i4309[22]
  i4308.nativeSize = new pc.Vec2( i4309[23], i4309[24] )
  i4308.pivot = new pc.Vec2( i4309[25], i4309[26] )
  i4308.textureRectOffset = new pc.Vec2( i4309[27], i4309[28] )
  return i4308
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i4310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i4311 = data
  i4310.name = i4311[0]
  return i4310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i4312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i4313 = data
  i4312.name = i4313[0]
  i4312.ascent = i4313[1]
  i4312.originalLineHeight = i4313[2]
  i4312.fontSize = i4313[3]
  var i4315 = i4313[4]
  var i4314 = []
  for(var i = 0; i < i4315.length; i += 1) {
    i4314.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i4315[i + 0]) );
  }
  i4312.characterInfo = i4314
  request.r(i4313[5], i4313[6], 0, i4312, 'texture')
  i4312.originalFontSize = i4313[7]
  return i4312
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i4318 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i4319 = data
  i4318.index = i4319[0]
  i4318.advance = i4319[1]
  i4318.bearing = i4319[2]
  i4318.glyphWidth = i4319[3]
  i4318.glyphHeight = i4319[4]
  i4318.minX = i4319[5]
  i4318.maxX = i4319[6]
  i4318.minY = i4319[7]
  i4318.maxY = i4319[8]
  i4318.uvBottomLeftX = i4319[9]
  i4318.uvBottomLeftY = i4319[10]
  i4318.uvBottomRightX = i4319[11]
  i4318.uvBottomRightY = i4319[12]
  i4318.uvTopLeftX = i4319[13]
  i4318.uvTopLeftY = i4319[14]
  i4318.uvTopRightX = i4319[15]
  i4318.uvTopRightY = i4319[16]
  return i4318
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i4320 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i4321 = data
  i4320.useSafeMode = !!i4321[0]
  i4320.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i4321[1], i4320.safeModeOptions)
  i4320.timeScale = i4321[2]
  i4320.unscaledTimeScale = i4321[3]
  i4320.useSmoothDeltaTime = !!i4321[4]
  i4320.maxSmoothUnscaledTime = i4321[5]
  i4320.rewindCallbackMode = i4321[6]
  i4320.showUnityEditorReport = !!i4321[7]
  i4320.logBehaviour = i4321[8]
  i4320.drawGizmos = !!i4321[9]
  i4320.defaultRecyclable = !!i4321[10]
  i4320.defaultAutoPlay = i4321[11]
  i4320.defaultUpdateType = i4321[12]
  i4320.defaultTimeScaleIndependent = !!i4321[13]
  i4320.defaultEaseType = i4321[14]
  i4320.defaultEaseOvershootOrAmplitude = i4321[15]
  i4320.defaultEasePeriod = i4321[16]
  i4320.defaultAutoKill = !!i4321[17]
  i4320.defaultLoopType = i4321[18]
  i4320.debugMode = !!i4321[19]
  i4320.debugStoreTargetId = !!i4321[20]
  i4320.showPreviewPanel = !!i4321[21]
  i4320.storeSettingsLocation = i4321[22]
  i4320.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i4321[23], i4320.modules)
  i4320.createASMDEF = !!i4321[24]
  i4320.showPlayingTweens = !!i4321[25]
  i4320.showPausedTweens = !!i4321[26]
  return i4320
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i4322 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i4323 = data
  i4322.logBehaviour = i4323[0]
  i4322.nestedTweenFailureBehaviour = i4323[1]
  return i4322
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i4324 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i4325 = data
  i4324.showPanel = !!i4325[0]
  i4324.audioEnabled = !!i4325[1]
  i4324.physicsEnabled = !!i4325[2]
  i4324.physics2DEnabled = !!i4325[3]
  i4324.spriteEnabled = !!i4325[4]
  i4324.uiEnabled = !!i4325[5]
  i4324.textMeshProEnabled = !!i4325[6]
  i4324.tk2DEnabled = !!i4325[7]
  i4324.deAudioEnabled = !!i4325[8]
  i4324.deUnityExtendedEnabled = !!i4325[9]
  i4324.epoOutlineEnabled = !!i4325[10]
  return i4324
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i4326 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i4327 = data
  var i4329 = i4327[0]
  var i4328 = []
  for(var i = 0; i < i4329.length; i += 1) {
    i4328.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i4329[i + 0]) );
  }
  i4326.files = i4328
  i4326.componentToPrefabIds = i4327[1]
  return i4326
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i4332 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i4333 = data
  i4332.path = i4333[0]
  request.r(i4333[1], i4333[2], 0, i4332, 'unityObject')
  return i4332
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i4334 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i4335 = data
  var i4337 = i4335[0]
  var i4336 = []
  for(var i = 0; i < i4337.length; i += 1) {
    i4336.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i4337[i + 0]) );
  }
  i4334.scriptsExecutionOrder = i4336
  var i4339 = i4335[1]
  var i4338 = []
  for(var i = 0; i < i4339.length; i += 1) {
    i4338.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i4339[i + 0]) );
  }
  i4334.sortingLayers = i4338
  var i4341 = i4335[2]
  var i4340 = []
  for(var i = 0; i < i4341.length; i += 1) {
    i4340.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i4341[i + 0]) );
  }
  i4334.cullingLayers = i4340
  i4334.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i4335[3], i4334.timeSettings)
  i4334.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i4335[4], i4334.physicsSettings)
  i4334.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i4335[5], i4334.physics2DSettings)
  i4334.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4335[6], i4334.qualitySettings)
  i4334.enableRealtimeShadows = !!i4335[7]
  i4334.enableAutoInstancing = !!i4335[8]
  i4334.enableStaticBatching = !!i4335[9]
  i4334.enableDynamicBatching = !!i4335[10]
  i4334.usePreservativeDynamicBatching = !!i4335[11]
  i4334.lightmapEncodingQuality = i4335[12]
  i4334.desiredColorSpace = i4335[13]
  var i4343 = i4335[14]
  var i4342 = []
  for(var i = 0; i < i4343.length; i += 1) {
    i4342.push( i4343[i + 0] );
  }
  i4334.allTags = i4342
  return i4334
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i4346 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i4347 = data
  i4346.name = i4347[0]
  i4346.value = i4347[1]
  return i4346
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i4350 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i4351 = data
  i4350.id = i4351[0]
  i4350.name = i4351[1]
  i4350.value = i4351[2]
  return i4350
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i4354 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i4355 = data
  i4354.id = i4355[0]
  i4354.name = i4355[1]
  return i4354
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i4356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i4357 = data
  i4356.fixedDeltaTime = i4357[0]
  i4356.maximumDeltaTime = i4357[1]
  i4356.timeScale = i4357[2]
  i4356.maximumParticleTimestep = i4357[3]
  return i4356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i4358 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i4359 = data
  i4358.gravity = new pc.Vec3( i4359[0], i4359[1], i4359[2] )
  i4358.defaultSolverIterations = i4359[3]
  i4358.bounceThreshold = i4359[4]
  i4358.autoSyncTransforms = !!i4359[5]
  i4358.autoSimulation = !!i4359[6]
  var i4361 = i4359[7]
  var i4360 = []
  for(var i = 0; i < i4361.length; i += 1) {
    i4360.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i4361[i + 0]) );
  }
  i4358.collisionMatrix = i4360
  return i4358
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i4364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i4365 = data
  i4364.enabled = !!i4365[0]
  i4364.layerId = i4365[1]
  i4364.otherLayerId = i4365[2]
  return i4364
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i4366 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i4367 = data
  request.r(i4367[0], i4367[1], 0, i4366, 'material')
  i4366.gravity = new pc.Vec2( i4367[2], i4367[3] )
  i4366.positionIterations = i4367[4]
  i4366.velocityIterations = i4367[5]
  i4366.velocityThreshold = i4367[6]
  i4366.maxLinearCorrection = i4367[7]
  i4366.maxAngularCorrection = i4367[8]
  i4366.maxTranslationSpeed = i4367[9]
  i4366.maxRotationSpeed = i4367[10]
  i4366.baumgarteScale = i4367[11]
  i4366.baumgarteTOIScale = i4367[12]
  i4366.timeToSleep = i4367[13]
  i4366.linearSleepTolerance = i4367[14]
  i4366.angularSleepTolerance = i4367[15]
  i4366.defaultContactOffset = i4367[16]
  i4366.autoSimulation = !!i4367[17]
  i4366.queriesHitTriggers = !!i4367[18]
  i4366.queriesStartInColliders = !!i4367[19]
  i4366.callbacksOnDisable = !!i4367[20]
  i4366.reuseCollisionCallbacks = !!i4367[21]
  i4366.autoSyncTransforms = !!i4367[22]
  var i4369 = i4367[23]
  var i4368 = []
  for(var i = 0; i < i4369.length; i += 1) {
    i4368.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i4369[i + 0]) );
  }
  i4366.collisionMatrix = i4368
  return i4366
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i4372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i4373 = data
  i4372.enabled = !!i4373[0]
  i4372.layerId = i4373[1]
  i4372.otherLayerId = i4373[2]
  return i4372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i4374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i4375 = data
  var i4377 = i4375[0]
  var i4376 = []
  for(var i = 0; i < i4377.length; i += 1) {
    i4376.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4377[i + 0]) );
  }
  i4374.qualityLevels = i4376
  var i4379 = i4375[1]
  var i4378 = []
  for(var i = 0; i < i4379.length; i += 1) {
    i4378.push( i4379[i + 0] );
  }
  i4374.names = i4378
  i4374.shadows = i4375[2]
  i4374.anisotropicFiltering = i4375[3]
  i4374.antiAliasing = i4375[4]
  i4374.lodBias = i4375[5]
  i4374.shadowCascades = i4375[6]
  i4374.shadowDistance = i4375[7]
  i4374.shadowmaskMode = i4375[8]
  i4374.shadowProjection = i4375[9]
  i4374.shadowResolution = i4375[10]
  i4374.softParticles = !!i4375[11]
  i4374.softVegetation = !!i4375[12]
  i4374.activeColorSpace = i4375[13]
  i4374.desiredColorSpace = i4375[14]
  i4374.masterTextureLimit = i4375[15]
  i4374.maxQueuedFrames = i4375[16]
  i4374.particleRaycastBudget = i4375[17]
  i4374.pixelLightCount = i4375[18]
  i4374.realtimeReflectionProbes = !!i4375[19]
  i4374.shadowCascade2Split = i4375[20]
  i4374.shadowCascade4Split = new pc.Vec3( i4375[21], i4375[22], i4375[23] )
  i4374.streamingMipmapsActive = !!i4375[24]
  i4374.vSyncCount = i4375[25]
  i4374.asyncUploadBufferSize = i4375[26]
  i4374.asyncUploadTimeSlice = i4375[27]
  i4374.billboardsFaceCameraPosition = !!i4375[28]
  i4374.shadowNearPlaneOffset = i4375[29]
  i4374.streamingMipmapsMemoryBudget = i4375[30]
  i4374.maximumLODLevel = i4375[31]
  i4374.streamingMipmapsAddAllCameras = !!i4375[32]
  i4374.streamingMipmapsMaxLevelReduction = i4375[33]
  i4374.streamingMipmapsRenderersPerFrame = i4375[34]
  i4374.resolutionScalingFixedDPIFactor = i4375[35]
  i4374.streamingMipmapsMaxFileIORequests = i4375[36]
  i4374.currentQualityLevel = i4375[37]
  return i4374
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i4382 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i4383 = data
  request.r(i4383[0], i4383[1], 0, i4382, 'm_ObjectArgument')
  i4382.m_ObjectArgumentAssemblyTypeName = i4383[2]
  i4382.m_IntArgument = i4383[3]
  i4382.m_FloatArgument = i4383[4]
  i4382.m_StringArgument = i4383[5]
  i4382.m_BoolArgument = !!i4383[6]
  return i4382
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"29":[30],"31":[30],"32":[30],"33":[30],"34":[30],"35":[30],"36":[37],"38":[1],"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[47],"54":[47],"55":[47],"56":[47],"57":[47],"58":[47],"59":[47],"60":[1],"61":[62],"63":[64],"65":[64],"7":[6],"66":[67],"68":[1],"69":[70],"71":[6],"72":[10,6],"73":[62],"74":[10,6],"75":[6],"76":[6],"77":[62,6],"78":[6,10],"79":[80],"81":[80],"82":[80],"83":[6],"84":[6],"9":[7],"11":[10,6],"13":[6],"8":[7],"85":[6],"86":[6],"87":[6],"88":[6],"89":[6],"90":[6],"91":[6],"22":[6],"92":[6],"19":[10,6],"93":[6],"94":[6],"95":[6],"96":[6],"14":[10,6],"97":[6],"98":[4],"99":[4],"5":[4],"100":[4],"101":[1],"102":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.Material","UnityEngine.UI.RawImage","UnityEngine.Texture2D","TutController","UnityEngine.UI.Mask","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "08/27/2026 08:36:09";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CBBW3_V07_DungNV_TamNTM";

Deserializers.lunaAppID = "40867";

Deserializers.projectId = "51e51bdadb0e0e54d801b4bff97874f2";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1839";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3733";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_V35";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "bd75e4e2-1e1a-411c-ba8c-9049be0c2cbd";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

