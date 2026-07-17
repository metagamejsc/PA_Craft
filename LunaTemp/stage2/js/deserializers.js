var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i852 = root || request.c( 'UnityEngine.JointSpring' )
  var i853 = data
  i852.spring = i853[0]
  i852.damper = i853[1]
  i852.targetPosition = i853[2]
  return i852
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.JointMotor' )
  var i855 = data
  i854.m_TargetVelocity = i855[0]
  i854.m_Force = i855[1]
  i854.m_FreeSpin = i855[2]
  return i854
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i856 = root || request.c( 'UnityEngine.JointLimits' )
  var i857 = data
  i856.m_Min = i857[0]
  i856.m_Max = i857[1]
  i856.m_Bounciness = i857[2]
  i856.m_BounceMinVelocity = i857[3]
  i856.m_ContactDistance = i857[4]
  i856.minBounce = i857[5]
  i856.maxBounce = i857[6]
  return i856
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i858 = root || request.c( 'UnityEngine.JointDrive' )
  var i859 = data
  i858.m_PositionSpring = i859[0]
  i858.m_PositionDamper = i859[1]
  i858.m_MaximumForce = i859[2]
  i858.m_UseAcceleration = i859[3]
  return i858
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i860 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i861 = data
  i860.m_Spring = i861[0]
  i860.m_Damper = i861[1]
  return i860
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i862 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i863 = data
  i862.m_Limit = i863[0]
  i862.m_Bounciness = i863[1]
  i862.m_ContactDistance = i863[2]
  return i862
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i864 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i865 = data
  i864.m_ExtremumSlip = i865[0]
  i864.m_ExtremumValue = i865[1]
  i864.m_AsymptoteSlip = i865[2]
  i864.m_AsymptoteValue = i865[3]
  i864.m_Stiffness = i865[4]
  return i864
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i866 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i867 = data
  i866.m_LowerAngle = i867[0]
  i866.m_UpperAngle = i867[1]
  return i866
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i868 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i869 = data
  i868.m_MotorSpeed = i869[0]
  i868.m_MaximumMotorTorque = i869[1]
  return i868
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i870 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i871 = data
  i870.m_DampingRatio = i871[0]
  i870.m_Frequency = i871[1]
  i870.m_Angle = i871[2]
  return i870
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i873 = data
  i872.m_LowerTranslation = i873[0]
  i872.m_UpperTranslation = i873[1]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i875 = data
  i874.name = i875[0]
  i874.width = i875[1]
  i874.height = i875[2]
  i874.mipmapCount = i875[3]
  i874.anisoLevel = i875[4]
  i874.filterMode = i875[5]
  i874.hdr = !!i875[6]
  i874.format = i875[7]
  i874.wrapMode = i875[8]
  i874.alphaIsTransparency = !!i875[9]
  i874.alphaSource = i875[10]
  i874.graphicsFormat = i875[11]
  i874.sRGBTexture = !!i875[12]
  i874.desiredColorSpace = i875[13]
  i874.wrapU = i875[14]
  i874.wrapV = i875[15]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i877 = data
  i876.name = i877[0]
  i876.index = i877[1]
  i876.startup = !!i877[2]
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i879 = data
  i878.aspect = i879[0]
  i878.orthographic = !!i879[1]
  i878.orthographicSize = i879[2]
  i878.backgroundColor = new pc.Color(i879[3], i879[4], i879[5], i879[6])
  i878.nearClipPlane = i879[7]
  i878.farClipPlane = i879[8]
  i878.fieldOfView = i879[9]
  i878.depth = i879[10]
  i878.clearFlags = i879[11]
  i878.cullingMask = i879[12]
  i878.rect = i879[13]
  request.r(i879[14], i879[15], 0, i878, 'targetTexture')
  i878.usePhysicalProperties = !!i879[16]
  i878.focalLength = i879[17]
  i878.sensorSize = new pc.Vec2( i879[18], i879[19] )
  i878.lensShift = new pc.Vec2( i879[20], i879[21] )
  i878.gateFit = i879[22]
  i878.commandBufferCount = i879[23]
  i878.cameraType = i879[24]
  i878.enabled = !!i879[25]
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i881 = data
  i880.name = i881[0]
  i880.tagId = i881[1]
  i880.enabled = !!i881[2]
  i880.isStatic = !!i881[3]
  i880.layer = i881[4]
  return i880
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i882 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i883 = data
  request.r(i883[0], i883[1], 0, i882, 'm_FirstSelected')
  i882.m_sendNavigationEvents = !!i883[2]
  i882.m_DragThreshold = i883[3]
  return i882
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i884 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i885 = data
  i884.m_HorizontalAxis = i885[0]
  i884.m_VerticalAxis = i885[1]
  i884.m_SubmitButton = i885[2]
  i884.m_CancelButton = i885[3]
  i884.m_InputActionsPerSecond = i885[4]
  i884.m_RepeatDelay = i885[5]
  i884.m_ForceModuleActive = !!i885[6]
  i884.m_SendPointerHoverToParent = !!i885[7]
  return i884
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i887 = data
  i886.pivot = new pc.Vec2( i887[0], i887[1] )
  i886.anchorMin = new pc.Vec2( i887[2], i887[3] )
  i886.anchorMax = new pc.Vec2( i887[4], i887[5] )
  i886.sizeDelta = new pc.Vec2( i887[6], i887[7] )
  i886.anchoredPosition3D = new pc.Vec3( i887[8], i887[9], i887[10] )
  i886.rotation = new pc.Quat(i887[11], i887[12], i887[13], i887[14])
  i886.scale = new pc.Vec3( i887[15], i887[16], i887[17] )
  return i886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i889 = data
  i888.planeDistance = i889[0]
  i888.referencePixelsPerUnit = i889[1]
  i888.isFallbackOverlay = !!i889[2]
  i888.renderMode = i889[3]
  i888.renderOrder = i889[4]
  i888.sortingLayerName = i889[5]
  i888.sortingOrder = i889[6]
  i888.scaleFactor = i889[7]
  request.r(i889[8], i889[9], 0, i888, 'worldCamera')
  i888.overrideSorting = !!i889[10]
  i888.pixelPerfect = !!i889[11]
  i888.targetDisplay = i889[12]
  i888.overridePixelPerfect = !!i889[13]
  i888.enabled = !!i889[14]
  return i888
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i890 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i891 = data
  i890.m_UiScaleMode = i891[0]
  i890.m_ReferencePixelsPerUnit = i891[1]
  i890.m_ScaleFactor = i891[2]
  i890.m_ReferenceResolution = new pc.Vec2( i891[3], i891[4] )
  i890.m_ScreenMatchMode = i891[5]
  i890.m_MatchWidthOrHeight = i891[6]
  i890.m_PhysicalUnit = i891[7]
  i890.m_FallbackScreenDPI = i891[8]
  i890.m_DefaultSpriteDPI = i891[9]
  i890.m_DynamicPixelsPerUnit = i891[10]
  i890.m_PresetInfoIsWorld = !!i891[11]
  return i890
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i892 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i893 = data
  i892.m_IgnoreReversedGraphics = !!i893[0]
  i892.m_BlockingObjects = i893[1]
  i892.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i893[2] )
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i895 = data
  i894.cullTransparentMesh = !!i895[0]
  return i894
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.Image' )
  var i897 = data
  request.r(i897[0], i897[1], 0, i896, 'm_Sprite')
  i896.m_Type = i897[2]
  i896.m_PreserveAspect = !!i897[3]
  i896.m_FillCenter = !!i897[4]
  i896.m_FillMethod = i897[5]
  i896.m_FillAmount = i897[6]
  i896.m_FillClockwise = !!i897[7]
  i896.m_FillOrigin = i897[8]
  i896.m_UseSpriteMesh = !!i897[9]
  i896.m_PixelsPerUnitMultiplier = i897[10]
  request.r(i897[11], i897[12], 0, i896, 'm_Material')
  i896.m_Maskable = !!i897[13]
  i896.m_Color = new pc.Color(i897[14], i897[15], i897[16], i897[17])
  i896.m_RaycastTarget = !!i897[18]
  i896.m_RaycastPadding = new pc.Vec4( i897[19], i897[20], i897[21], i897[22] )
  return i896
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i899 = data
  i898.m_AspectMode = i899[0]
  i898.m_AspectRatio = i899[1]
  return i898
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i900 = root || request.c( 'UnityEngine.UI.Text' )
  var i901 = data
  i900.m_FontData = request.d('UnityEngine.UI.FontData', i901[0], i900.m_FontData)
  i900.m_Text = i901[1]
  request.r(i901[2], i901[3], 0, i900, 'm_Material')
  i900.m_Maskable = !!i901[4]
  i900.m_Color = new pc.Color(i901[5], i901[6], i901[7], i901[8])
  i900.m_RaycastTarget = !!i901[9]
  i900.m_RaycastPadding = new pc.Vec4( i901[10], i901[11], i901[12], i901[13] )
  return i900
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i902 = root || request.c( 'UnityEngine.UI.FontData' )
  var i903 = data
  request.r(i903[0], i903[1], 0, i902, 'm_Font')
  i902.m_FontSize = i903[2]
  i902.m_FontStyle = i903[3]
  i902.m_BestFit = !!i903[4]
  i902.m_MinSize = i903[5]
  i902.m_MaxSize = i903[6]
  i902.m_Alignment = i903[7]
  i902.m_AlignByGeometry = !!i903[8]
  i902.m_RichText = !!i903[9]
  i902.m_HorizontalOverflow = i903[10]
  i902.m_VerticalOverflow = i903[11]
  i902.m_LineSpacing = i903[12]
  return i902
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i904 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i905 = data
  i904.targetIsSelf = !!i905[0]
  request.r(i905[1], i905[2], 0, i904, 'targetGO')
  i904.tweenTargetIsTargetGO = !!i905[3]
  i904.delay = i905[4]
  i904.duration = i905[5]
  i904.easeType = i905[6]
  i904.easeCurve = new pc.AnimationCurve( { keys_flow: i905[7] } )
  i904.loopType = i905[8]
  i904.loops = i905[9]
  i904.id = i905[10]
  i904.isRelative = !!i905[11]
  i904.isFrom = !!i905[12]
  i904.isIndependentUpdate = !!i905[13]
  i904.autoKill = !!i905[14]
  i904.autoGenerate = !!i905[15]
  i904.isActive = !!i905[16]
  i904.isValid = !!i905[17]
  request.r(i905[18], i905[19], 0, i904, 'target')
  i904.animationType = i905[20]
  i904.targetType = i905[21]
  i904.forcedTargetType = i905[22]
  i904.autoPlay = !!i905[23]
  i904.useTargetAsV3 = !!i905[24]
  i904.endValueFloat = i905[25]
  i904.endValueV3 = new pc.Vec3( i905[26], i905[27], i905[28] )
  i904.endValueV2 = new pc.Vec2( i905[29], i905[30] )
  i904.endValueColor = new pc.Color(i905[31], i905[32], i905[33], i905[34])
  i904.endValueString = i905[35]
  i904.endValueRect = UnityEngine.Rect.MinMaxRect(i905[36], i905[37], i905[38], i905[39])
  request.r(i905[40], i905[41], 0, i904, 'endValueTransform')
  i904.optionalBool0 = !!i905[42]
  i904.optionalBool1 = !!i905[43]
  i904.optionalFloat0 = i905[44]
  i904.optionalInt0 = i905[45]
  i904.optionalRotationMode = i905[46]
  i904.optionalScrambleMode = i905[47]
  i904.optionalShakeRandomnessMode = i905[48]
  i904.optionalString = i905[49]
  i904.updateType = i905[50]
  i904.isSpeedBased = !!i905[51]
  i904.hasOnStart = !!i905[52]
  i904.hasOnPlay = !!i905[53]
  i904.hasOnUpdate = !!i905[54]
  i904.hasOnStepComplete = !!i905[55]
  i904.hasOnComplete = !!i905[56]
  i904.hasOnTweenCreated = !!i905[57]
  i904.hasOnRewind = !!i905[58]
  i904.onStart = request.d('UnityEngine.Events.UnityEvent', i905[59], i904.onStart)
  i904.onPlay = request.d('UnityEngine.Events.UnityEvent', i905[60], i904.onPlay)
  i904.onUpdate = request.d('UnityEngine.Events.UnityEvent', i905[61], i904.onUpdate)
  i904.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i905[62], i904.onStepComplete)
  i904.onComplete = request.d('UnityEngine.Events.UnityEvent', i905[63], i904.onComplete)
  i904.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i905[64], i904.onTweenCreated)
  i904.onRewind = request.d('UnityEngine.Events.UnityEvent', i905[65], i904.onRewind)
  return i904
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i906 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i907 = data
  i906.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i907[0], i906.m_PersistentCalls)
  return i906
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i908 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i909 = data
  var i911 = i909[0]
  var i910 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i911.length; i += 1) {
    i910.add(request.d('UnityEngine.Events.PersistentCall', i911[i + 0]));
  }
  i908.m_Calls = i910
  return i908
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i914 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i915 = data
  request.r(i915[0], i915[1], 0, i914, 'm_Target')
  i914.m_TargetAssemblyTypeName = i915[2]
  i914.m_MethodName = i915[3]
  i914.m_Mode = i915[4]
  i914.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i915[5], i914.m_Arguments)
  i914.m_CallState = i915[6]
  return i914
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i916 = root || request.c( 'UnityEngine.UI.Button' )
  var i917 = data
  i916.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i917[0], i916.m_OnClick)
  i916.m_Navigation = request.d('UnityEngine.UI.Navigation', i917[1], i916.m_Navigation)
  i916.m_Transition = i917[2]
  i916.m_Colors = request.d('UnityEngine.UI.ColorBlock', i917[3], i916.m_Colors)
  i916.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i917[4], i916.m_SpriteState)
  i916.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i917[5], i916.m_AnimationTriggers)
  i916.m_Interactable = !!i917[6]
  request.r(i917[7], i917[8], 0, i916, 'm_TargetGraphic')
  return i916
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i918 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i919 = data
  i918.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i919[0], i918.m_PersistentCalls)
  return i918
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i920 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i921 = data
  i920.m_Mode = i921[0]
  i920.m_WrapAround = !!i921[1]
  request.r(i921[2], i921[3], 0, i920, 'm_SelectOnUp')
  request.r(i921[4], i921[5], 0, i920, 'm_SelectOnDown')
  request.r(i921[6], i921[7], 0, i920, 'm_SelectOnLeft')
  request.r(i921[8], i921[9], 0, i920, 'm_SelectOnRight')
  return i920
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i922 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i923 = data
  i922.m_NormalColor = new pc.Color(i923[0], i923[1], i923[2], i923[3])
  i922.m_HighlightedColor = new pc.Color(i923[4], i923[5], i923[6], i923[7])
  i922.m_PressedColor = new pc.Color(i923[8], i923[9], i923[10], i923[11])
  i922.m_SelectedColor = new pc.Color(i923[12], i923[13], i923[14], i923[15])
  i922.m_DisabledColor = new pc.Color(i923[16], i923[17], i923[18], i923[19])
  i922.m_ColorMultiplier = i923[20]
  i922.m_FadeDuration = i923[21]
  return i922
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i924 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i925 = data
  request.r(i925[0], i925[1], 0, i924, 'm_HighlightedSprite')
  request.r(i925[2], i925[3], 0, i924, 'm_PressedSprite')
  request.r(i925[4], i925[5], 0, i924, 'm_SelectedSprite')
  request.r(i925[6], i925[7], 0, i924, 'm_DisabledSprite')
  return i924
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i926 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i927 = data
  i926.m_NormalTrigger = i927[0]
  i926.m_HighlightedTrigger = i927[1]
  i926.m_PressedTrigger = i927[2]
  i926.m_SelectedTrigger = i927[3]
  i926.m_DisabledTrigger = i927[4]
  return i926
}

Deserializers["TutController"] = function (request, data, root) {
  var i928 = root || request.c( 'TutController' )
  var i929 = data
  request.r(i929[0], i929[1], 0, i928, 'optionL')
  request.r(i929[2], i929[3], 0, i928, 'optionR')
  i928.posL = new pc.Vec3( i929[4], i929[5], i929[6] )
  i928.posR = new pc.Vec3( i929[7], i929[8], i929[9] )
  i928.fromScale = i929[10]
  i928.toScale = i929[11]
  i928.scaleTime = i929[12]
  i928.moveTime = i929[13]
  return i928
}

Deserializers["LunaController"] = function (request, data, root) {
  var i930 = root || request.c( 'LunaController' )
  var i931 = data
  i930.TimePlay = i931[0]
  i930.LimitTimePlay = !!i931[1]
  request.r(i931[2], i931[3], 0, i930, 'BGM')
  request.r(i931[4], i931[5], 0, i930, 'musicSource')
  request.r(i931[6], i931[7], 0, i930, 'CTA')
  request.r(i931[8], i931[9], 0, i930, 'endCard')
  return i930
}

Deserializers["GameController"] = function (request, data, root) {
  var i932 = root || request.c( 'GameController' )
  var i933 = data
  request.r(i933[0], i933[1], 0, i932, 'phase1')
  request.r(i933[2], i933[3], 0, i932, 'click1')
  request.r(i933[4], i933[5], 0, i932, 'phase2')
  i932.defaultColor = new pc.Color(i933[6], i933[7], i933[8], i933[9])
  i932.selectedColor = new pc.Color(i933[10], i933[11], i933[12], i933[13])
  request.r(i933[14], i933[15], 0, i932, 'click2')
  request.r(i933[16], i933[17], 0, i932, 'tut2')
  var i935 = i933[18]
  var i934 = new (System.Collections.Generic.List$1(Bridge.ns('ModelOption')))
  for(var i = 0; i < i935.length; i += 1) {
    i934.add(request.d('ModelOption', i935[i + 0]));
  }
  i932.models = i934
  var i937 = i933[19]
  var i936 = new (System.Collections.Generic.List$1(Bridge.ns('ItemOption')))
  for(var i = 0; i < i937.length; i += 1) {
    i936.add(request.d('ItemOption', i937[i + 0]));
  }
  i932.items = i936
  return i932
}

Deserializers["ModelOption"] = function (request, data, root) {
  var i940 = root || request.c( 'ModelOption' )
  var i941 = data
  request.r(i941[0], i941[1], 0, i940, 'Button')
  request.r(i941[2], i941[3], 0, i940, 'Model')
  return i940
}

Deserializers["ItemOption"] = function (request, data, root) {
  var i944 = root || request.c( 'ItemOption' )
  var i945 = data
  request.r(i945[0], i945[1], 0, i944, 'Button')
  request.r(i945[2], i945[3], 0, i944, 'Item')
  request.r(i945[4], i945[5], 0, i944, 'BG')
  return i944
}

Deserializers["AudioController"] = function (request, data, root) {
  var i946 = root || request.c( 'AudioController' )
  var i947 = data
  request.r(i947[0], i947[1], 0, i946, 'poolParent')
  i946.startSize = i947[2]
  return i946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i949 = data
  request.r(i949[0], i949[1], 0, i948, 'clip')
  request.r(i949[2], i949[3], 0, i948, 'outputAudioMixerGroup')
  i948.playOnAwake = !!i949[4]
  i948.loop = !!i949[5]
  i948.time = i949[6]
  i948.volume = i949[7]
  i948.pitch = i949[8]
  i948.enabled = !!i949[9]
  return i948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i950 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i951 = data
  i950.ambientIntensity = i951[0]
  i950.reflectionIntensity = i951[1]
  i950.ambientMode = i951[2]
  i950.ambientLight = new pc.Color(i951[3], i951[4], i951[5], i951[6])
  i950.ambientSkyColor = new pc.Color(i951[7], i951[8], i951[9], i951[10])
  i950.ambientGroundColor = new pc.Color(i951[11], i951[12], i951[13], i951[14])
  i950.ambientEquatorColor = new pc.Color(i951[15], i951[16], i951[17], i951[18])
  i950.fogColor = new pc.Color(i951[19], i951[20], i951[21], i951[22])
  i950.fogEndDistance = i951[23]
  i950.fogStartDistance = i951[24]
  i950.fogDensity = i951[25]
  i950.fog = !!i951[26]
  request.r(i951[27], i951[28], 0, i950, 'skybox')
  i950.fogMode = i951[29]
  var i953 = i951[30]
  var i952 = []
  for(var i = 0; i < i953.length; i += 1) {
    i952.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i953[i + 0]) );
  }
  i950.lightmaps = i952
  i950.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i951[31], i950.lightProbes)
  i950.lightmapsMode = i951[32]
  i950.mixedBakeMode = i951[33]
  i950.environmentLightingMode = i951[34]
  i950.ambientProbe = new pc.SphericalHarmonicsL2(i951[35])
  request.r(i951[36], i951[37], 0, i950, 'customReflection')
  request.r(i951[38], i951[39], 0, i950, 'defaultReflection')
  i950.defaultReflectionMode = i951[40]
  i950.defaultReflectionResolution = i951[41]
  i950.sunLightObjectId = i951[42]
  i950.pixelLightCount = i951[43]
  i950.defaultReflectionHDR = !!i951[44]
  i950.hasLightDataAsset = !!i951[45]
  i950.hasManualGenerate = !!i951[46]
  return i950
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i957 = data
  request.r(i957[0], i957[1], 0, i956, 'lightmapColor')
  request.r(i957[2], i957[3], 0, i956, 'lightmapDirection')
  request.r(i957[4], i957[5], 0, i956, 'shadowMask')
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i958 = root || new UnityEngine.LightProbes()
  var i959 = data
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i966 = root || new pc.UnityMaterial()
  var i967 = data
  i966.name = i967[0]
  request.r(i967[1], i967[2], 0, i966, 'shader')
  i966.renderQueue = i967[3]
  i966.enableInstancing = !!i967[4]
  var i969 = i967[5]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i969[i + 0]) );
  }
  i966.floatParameters = i968
  var i971 = i967[6]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i971[i + 0]) );
  }
  i966.colorParameters = i970
  var i973 = i967[7]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i973[i + 0]) );
  }
  i966.vectorParameters = i972
  var i975 = i967[8]
  var i974 = []
  for(var i = 0; i < i975.length; i += 1) {
    i974.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i975[i + 0]) );
  }
  i966.textureParameters = i974
  var i977 = i967[9]
  var i976 = []
  for(var i = 0; i < i977.length; i += 1) {
    i976.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i977[i + 0]) );
  }
  i966.materialFlags = i976
  return i966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i980 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i981 = data
  i980.name = i981[0]
  i980.value = i981[1]
  return i980
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i985 = data
  i984.name = i985[0]
  i984.value = new pc.Color(i985[1], i985[2], i985[3], i985[4])
  return i984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i989 = data
  i988.name = i989[0]
  i988.value = new pc.Vec4( i989[1], i989[2], i989[3], i989[4] )
  return i988
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i993 = data
  i992.name = i993[0]
  request.r(i993[1], i993[2], 0, i992, 'value')
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i997 = data
  i996.name = i997[0]
  i996.enabled = !!i997[1]
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i999 = data
  var i1001 = i999[0]
  var i1000 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1001.length; i += 1) {
    i1000.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1001[i + 0]));
  }
  i998.ShaderCompilationErrors = i1000
  i998.name = i999[1]
  i998.guid = i999[2]
  var i1003 = i999[3]
  var i1002 = []
  for(var i = 0; i < i1003.length; i += 1) {
    i1002.push( i1003[i + 0] );
  }
  i998.shaderDefinedKeywords = i1002
  var i1005 = i999[4]
  var i1004 = []
  for(var i = 0; i < i1005.length; i += 1) {
    i1004.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1005[i + 0]) );
  }
  i998.passes = i1004
  var i1007 = i999[5]
  var i1006 = []
  for(var i = 0; i < i1007.length; i += 1) {
    i1006.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1007[i + 0]) );
  }
  i998.usePasses = i1006
  var i1009 = i999[6]
  var i1008 = []
  for(var i = 0; i < i1009.length; i += 1) {
    i1008.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1009[i + 0]) );
  }
  i998.defaultParameterValues = i1008
  request.r(i999[7], i999[8], 0, i998, 'unityFallbackShader')
  i998.readDepth = !!i999[9]
  i998.hasDepthOnlyPass = !!i999[10]
  i998.isCreatedByShaderGraph = !!i999[11]
  i998.disableBatching = !!i999[12]
  i998.compiled = !!i999[13]
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1013 = data
  i1012.shaderName = i1013[0]
  i1012.errorMessage = i1013[1]
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1018 = root || new pc.UnityShaderPass()
  var i1019 = data
  i1018.id = i1019[0]
  i1018.subShaderIndex = i1019[1]
  i1018.name = i1019[2]
  i1018.passType = i1019[3]
  i1018.grabPassTextureName = i1019[4]
  i1018.usePass = !!i1019[5]
  i1018.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[6], i1018.zTest)
  i1018.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[7], i1018.zWrite)
  i1018.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[8], i1018.culling)
  i1018.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1019[9], i1018.blending)
  i1018.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1019[10], i1018.alphaBlending)
  i1018.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[11], i1018.colorWriteMask)
  i1018.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[12], i1018.offsetUnits)
  i1018.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[13], i1018.offsetFactor)
  i1018.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[14], i1018.stencilRef)
  i1018.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[15], i1018.stencilReadMask)
  i1018.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1019[16], i1018.stencilWriteMask)
  i1018.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1019[17], i1018.stencilOp)
  i1018.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1019[18], i1018.stencilOpFront)
  i1018.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1019[19], i1018.stencilOpBack)
  var i1021 = i1019[20]
  var i1020 = []
  for(var i = 0; i < i1021.length; i += 1) {
    i1020.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1021[i + 0]) );
  }
  i1018.tags = i1020
  var i1023 = i1019[21]
  var i1022 = []
  for(var i = 0; i < i1023.length; i += 1) {
    i1022.push( i1023[i + 0] );
  }
  i1018.passDefinedKeywords = i1022
  var i1025 = i1019[22]
  var i1024 = []
  for(var i = 0; i < i1025.length; i += 1) {
    i1024.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1025[i + 0]) );
  }
  i1018.passDefinedKeywordGroups = i1024
  var i1027 = i1019[23]
  var i1026 = []
  for(var i = 0; i < i1027.length; i += 1) {
    i1026.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1027[i + 0]) );
  }
  i1018.variants = i1026
  var i1029 = i1019[24]
  var i1028 = []
  for(var i = 0; i < i1029.length; i += 1) {
    i1028.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1029[i + 0]) );
  }
  i1018.excludedVariants = i1028
  i1018.hasDepthReader = !!i1019[25]
  return i1018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1031 = data
  i1030.val = i1031[0]
  i1030.name = i1031[1]
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1033 = data
  i1032.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1033[0], i1032.src)
  i1032.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1033[1], i1032.dst)
  i1032.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1033[2], i1032.op)
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1035 = data
  i1034.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1035[0], i1034.pass)
  i1034.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1035[1], i1034.fail)
  i1034.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1035[2], i1034.zFail)
  i1034.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1035[3], i1034.comp)
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1039 = data
  i1038.name = i1039[0]
  i1038.value = i1039[1]
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1043 = data
  var i1045 = i1043[0]
  var i1044 = []
  for(var i = 0; i < i1045.length; i += 1) {
    i1044.push( i1045[i + 0] );
  }
  i1042.keywords = i1044
  i1042.hasDiscard = !!i1043[1]
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1048 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1049 = data
  i1048.passId = i1049[0]
  i1048.subShaderIndex = i1049[1]
  var i1051 = i1049[2]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 1) {
    i1050.push( i1051[i + 0] );
  }
  i1048.keywords = i1050
  i1048.vertexProgram = i1049[3]
  i1048.fragmentProgram = i1049[4]
  i1048.exportedForWebGl2 = !!i1049[5]
  i1048.readDepth = !!i1049[6]
  return i1048
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1055 = data
  request.r(i1055[0], i1055[1], 0, i1054, 'shader')
  i1054.pass = i1055[2]
  return i1054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1059 = data
  i1058.name = i1059[0]
  i1058.type = i1059[1]
  i1058.value = new pc.Vec4( i1059[2], i1059[3], i1059[4], i1059[5] )
  i1058.textureValue = i1059[6]
  i1058.shaderPropertyFlag = i1059[7]
  return i1058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1061 = data
  i1060.name = i1061[0]
  request.r(i1061[1], i1061[2], 0, i1060, 'texture')
  i1060.aabb = i1061[3]
  i1060.vertices = i1061[4]
  i1060.triangles = i1061[5]
  i1060.textureRect = UnityEngine.Rect.MinMaxRect(i1061[6], i1061[7], i1061[8], i1061[9])
  i1060.packedRect = UnityEngine.Rect.MinMaxRect(i1061[10], i1061[11], i1061[12], i1061[13])
  i1060.border = new pc.Vec4( i1061[14], i1061[15], i1061[16], i1061[17] )
  i1060.transparency = i1061[18]
  i1060.bounds = i1061[19]
  i1060.pixelsPerUnit = i1061[20]
  i1060.textureWidth = i1061[21]
  i1060.textureHeight = i1061[22]
  i1060.nativeSize = new pc.Vec2( i1061[23], i1061[24] )
  i1060.pivot = new pc.Vec2( i1061[25], i1061[26] )
  i1060.textureRectOffset = new pc.Vec2( i1061[27], i1061[28] )
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1063 = data
  i1062.name = i1063[0]
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1065 = data
  i1064.name = i1065[0]
  i1064.ascent = i1065[1]
  i1064.originalLineHeight = i1065[2]
  i1064.fontSize = i1065[3]
  var i1067 = i1065[4]
  var i1066 = []
  for(var i = 0; i < i1067.length; i += 1) {
    i1066.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1067[i + 0]) );
  }
  i1064.characterInfo = i1066
  request.r(i1065[5], i1065[6], 0, i1064, 'texture')
  i1064.originalFontSize = i1065[7]
  return i1064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1071 = data
  i1070.index = i1071[0]
  i1070.advance = i1071[1]
  i1070.bearing = i1071[2]
  i1070.glyphWidth = i1071[3]
  i1070.glyphHeight = i1071[4]
  i1070.minX = i1071[5]
  i1070.maxX = i1071[6]
  i1070.minY = i1071[7]
  i1070.maxY = i1071[8]
  i1070.uvBottomLeftX = i1071[9]
  i1070.uvBottomLeftY = i1071[10]
  i1070.uvBottomRightX = i1071[11]
  i1070.uvBottomRightY = i1071[12]
  i1070.uvTopLeftX = i1071[13]
  i1070.uvTopLeftY = i1071[14]
  i1070.uvTopRightX = i1071[15]
  i1070.uvTopRightY = i1071[16]
  return i1070
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1072 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1073 = data
  i1072.useSafeMode = !!i1073[0]
  i1072.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1073[1], i1072.safeModeOptions)
  i1072.timeScale = i1073[2]
  i1072.unscaledTimeScale = i1073[3]
  i1072.useSmoothDeltaTime = !!i1073[4]
  i1072.maxSmoothUnscaledTime = i1073[5]
  i1072.rewindCallbackMode = i1073[6]
  i1072.showUnityEditorReport = !!i1073[7]
  i1072.logBehaviour = i1073[8]
  i1072.drawGizmos = !!i1073[9]
  i1072.defaultRecyclable = !!i1073[10]
  i1072.defaultAutoPlay = i1073[11]
  i1072.defaultUpdateType = i1073[12]
  i1072.defaultTimeScaleIndependent = !!i1073[13]
  i1072.defaultEaseType = i1073[14]
  i1072.defaultEaseOvershootOrAmplitude = i1073[15]
  i1072.defaultEasePeriod = i1073[16]
  i1072.defaultAutoKill = !!i1073[17]
  i1072.defaultLoopType = i1073[18]
  i1072.debugMode = !!i1073[19]
  i1072.debugStoreTargetId = !!i1073[20]
  i1072.showPreviewPanel = !!i1073[21]
  i1072.storeSettingsLocation = i1073[22]
  i1072.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1073[23], i1072.modules)
  i1072.createASMDEF = !!i1073[24]
  i1072.showPlayingTweens = !!i1073[25]
  i1072.showPausedTweens = !!i1073[26]
  return i1072
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1074 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1075 = data
  i1074.logBehaviour = i1075[0]
  i1074.nestedTweenFailureBehaviour = i1075[1]
  return i1074
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1076 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1077 = data
  i1076.showPanel = !!i1077[0]
  i1076.audioEnabled = !!i1077[1]
  i1076.physicsEnabled = !!i1077[2]
  i1076.physics2DEnabled = !!i1077[3]
  i1076.spriteEnabled = !!i1077[4]
  i1076.uiEnabled = !!i1077[5]
  i1076.textMeshProEnabled = !!i1077[6]
  i1076.tk2DEnabled = !!i1077[7]
  i1076.deAudioEnabled = !!i1077[8]
  i1076.deUnityExtendedEnabled = !!i1077[9]
  i1076.epoOutlineEnabled = !!i1077[10]
  return i1076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1078 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1079 = data
  var i1081 = i1079[0]
  var i1080 = []
  for(var i = 0; i < i1081.length; i += 1) {
    i1080.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1081[i + 0]) );
  }
  i1078.files = i1080
  i1078.componentToPrefabIds = i1079[1]
  return i1078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1085 = data
  i1084.path = i1085[0]
  request.r(i1085[1], i1085[2], 0, i1084, 'unityObject')
  return i1084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1087 = data
  var i1089 = i1087[0]
  var i1088 = []
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1089[i + 0]) );
  }
  i1086.scriptsExecutionOrder = i1088
  var i1091 = i1087[1]
  var i1090 = []
  for(var i = 0; i < i1091.length; i += 1) {
    i1090.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1091[i + 0]) );
  }
  i1086.sortingLayers = i1090
  var i1093 = i1087[2]
  var i1092 = []
  for(var i = 0; i < i1093.length; i += 1) {
    i1092.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1093[i + 0]) );
  }
  i1086.cullingLayers = i1092
  i1086.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1087[3], i1086.timeSettings)
  i1086.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1087[4], i1086.physicsSettings)
  i1086.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1087[5], i1086.physics2DSettings)
  i1086.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1087[6], i1086.qualitySettings)
  i1086.enableRealtimeShadows = !!i1087[7]
  i1086.enableAutoInstancing = !!i1087[8]
  i1086.enableStaticBatching = !!i1087[9]
  i1086.enableDynamicBatching = !!i1087[10]
  i1086.usePreservativeDynamicBatching = !!i1087[11]
  i1086.lightmapEncodingQuality = i1087[12]
  i1086.desiredColorSpace = i1087[13]
  var i1095 = i1087[14]
  var i1094 = []
  for(var i = 0; i < i1095.length; i += 1) {
    i1094.push( i1095[i + 0] );
  }
  i1086.allTags = i1094
  return i1086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1098 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1099 = data
  i1098.name = i1099[0]
  i1098.value = i1099[1]
  return i1098
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1102 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1103 = data
  i1102.id = i1103[0]
  i1102.name = i1103[1]
  i1102.value = i1103[2]
  return i1102
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1106 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1107 = data
  i1106.id = i1107[0]
  i1106.name = i1107[1]
  return i1106
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1108 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1109 = data
  i1108.fixedDeltaTime = i1109[0]
  i1108.maximumDeltaTime = i1109[1]
  i1108.timeScale = i1109[2]
  i1108.maximumParticleTimestep = i1109[3]
  return i1108
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1110 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1111 = data
  i1110.gravity = new pc.Vec3( i1111[0], i1111[1], i1111[2] )
  i1110.defaultSolverIterations = i1111[3]
  i1110.bounceThreshold = i1111[4]
  i1110.autoSyncTransforms = !!i1111[5]
  i1110.autoSimulation = !!i1111[6]
  var i1113 = i1111[7]
  var i1112 = []
  for(var i = 0; i < i1113.length; i += 1) {
    i1112.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1113[i + 0]) );
  }
  i1110.collisionMatrix = i1112
  return i1110
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1116 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1117 = data
  i1116.enabled = !!i1117[0]
  i1116.layerId = i1117[1]
  i1116.otherLayerId = i1117[2]
  return i1116
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1118 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1119 = data
  request.r(i1119[0], i1119[1], 0, i1118, 'material')
  i1118.gravity = new pc.Vec2( i1119[2], i1119[3] )
  i1118.positionIterations = i1119[4]
  i1118.velocityIterations = i1119[5]
  i1118.velocityThreshold = i1119[6]
  i1118.maxLinearCorrection = i1119[7]
  i1118.maxAngularCorrection = i1119[8]
  i1118.maxTranslationSpeed = i1119[9]
  i1118.maxRotationSpeed = i1119[10]
  i1118.baumgarteScale = i1119[11]
  i1118.baumgarteTOIScale = i1119[12]
  i1118.timeToSleep = i1119[13]
  i1118.linearSleepTolerance = i1119[14]
  i1118.angularSleepTolerance = i1119[15]
  i1118.defaultContactOffset = i1119[16]
  i1118.autoSimulation = !!i1119[17]
  i1118.queriesHitTriggers = !!i1119[18]
  i1118.queriesStartInColliders = !!i1119[19]
  i1118.callbacksOnDisable = !!i1119[20]
  i1118.reuseCollisionCallbacks = !!i1119[21]
  i1118.autoSyncTransforms = !!i1119[22]
  var i1121 = i1119[23]
  var i1120 = []
  for(var i = 0; i < i1121.length; i += 1) {
    i1120.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1121[i + 0]) );
  }
  i1118.collisionMatrix = i1120
  return i1118
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1124 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1125 = data
  i1124.enabled = !!i1125[0]
  i1124.layerId = i1125[1]
  i1124.otherLayerId = i1125[2]
  return i1124
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1126 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1127 = data
  var i1129 = i1127[0]
  var i1128 = []
  for(var i = 0; i < i1129.length; i += 1) {
    i1128.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1129[i + 0]) );
  }
  i1126.qualityLevels = i1128
  var i1131 = i1127[1]
  var i1130 = []
  for(var i = 0; i < i1131.length; i += 1) {
    i1130.push( i1131[i + 0] );
  }
  i1126.names = i1130
  i1126.shadows = i1127[2]
  i1126.anisotropicFiltering = i1127[3]
  i1126.antiAliasing = i1127[4]
  i1126.lodBias = i1127[5]
  i1126.shadowCascades = i1127[6]
  i1126.shadowDistance = i1127[7]
  i1126.shadowmaskMode = i1127[8]
  i1126.shadowProjection = i1127[9]
  i1126.shadowResolution = i1127[10]
  i1126.softParticles = !!i1127[11]
  i1126.softVegetation = !!i1127[12]
  i1126.activeColorSpace = i1127[13]
  i1126.desiredColorSpace = i1127[14]
  i1126.masterTextureLimit = i1127[15]
  i1126.maxQueuedFrames = i1127[16]
  i1126.particleRaycastBudget = i1127[17]
  i1126.pixelLightCount = i1127[18]
  i1126.realtimeReflectionProbes = !!i1127[19]
  i1126.shadowCascade2Split = i1127[20]
  i1126.shadowCascade4Split = new pc.Vec3( i1127[21], i1127[22], i1127[23] )
  i1126.streamingMipmapsActive = !!i1127[24]
  i1126.vSyncCount = i1127[25]
  i1126.asyncUploadBufferSize = i1127[26]
  i1126.asyncUploadTimeSlice = i1127[27]
  i1126.billboardsFaceCameraPosition = !!i1127[28]
  i1126.shadowNearPlaneOffset = i1127[29]
  i1126.streamingMipmapsMemoryBudget = i1127[30]
  i1126.maximumLODLevel = i1127[31]
  i1126.streamingMipmapsAddAllCameras = !!i1127[32]
  i1126.streamingMipmapsMaxLevelReduction = i1127[33]
  i1126.streamingMipmapsRenderersPerFrame = i1127[34]
  i1126.resolutionScalingFixedDPIFactor = i1127[35]
  i1126.streamingMipmapsMaxFileIORequests = i1127[36]
  i1126.currentQualityLevel = i1127[37]
  return i1126
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1134 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1135 = data
  request.r(i1135[0], i1135[1], 0, i1134, 'm_ObjectArgument')
  i1134.m_ObjectArgumentAssemblyTypeName = i1135[2]
  i1134.m_IntArgument = i1135[3]
  i1134.m_FloatArgument = i1135[4]
  i1134.m_StringArgument = i1135[5]
  i1134.m_BoolArgument = !!i1135[6]
  return i1134
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"29":[30],"31":[30],"32":[30],"33":[30],"34":[30],"35":[30],"36":[37],"38":[0],"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[47],"54":[47],"55":[47],"56":[47],"57":[47],"58":[47],"59":[47],"60":[0],"61":[62],"63":[64],"65":[64],"6":[5],"66":[67],"68":[0],"69":[70],"71":[5],"72":[9,5],"73":[62],"74":[9,5],"75":[5],"76":[5],"77":[62,5],"78":[5,9],"79":[80],"81":[80],"82":[80],"83":[5],"84":[5],"8":[6],"10":[9,5],"12":[5],"7":[6],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"91":[5],"92":[5],"93":[5],"94":[9,5],"95":[5],"96":[5],"97":[5],"98":[5],"13":[9,5],"99":[5],"100":[3],"101":[3],"4":[3],"102":[3],"103":[0],"104":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Button","TutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","GameController","UnityEngine.GameObject","AudioController","UnityEngine.Transform","UnityEngine.Shader","UnityEngine.Texture2D","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "UAC_V68";

Deserializers.lunaInitializationTime = "07/17/2026 09:47:13";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "UAC_V68_ThuLH_TamNTM";

Deserializers.lunaAppID = "29023";

Deserializers.projectId = "041b8dc990308184fbd8ff9a02872cac";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "True";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1838";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3860";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.UAC_V68";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "906b6aef-1e55-4fad-9965-d1a23f9ec2c7";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

