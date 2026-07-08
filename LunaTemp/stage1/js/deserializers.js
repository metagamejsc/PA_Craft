var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i810 = root || request.c( 'UnityEngine.JointSpring' )
  var i811 = data
  i810.spring = i811[0]
  i810.damper = i811[1]
  i810.targetPosition = i811[2]
  return i810
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i812 = root || request.c( 'UnityEngine.JointMotor' )
  var i813 = data
  i812.m_TargetVelocity = i813[0]
  i812.m_Force = i813[1]
  i812.m_FreeSpin = i813[2]
  return i812
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i814 = root || request.c( 'UnityEngine.JointLimits' )
  var i815 = data
  i814.m_Min = i815[0]
  i814.m_Max = i815[1]
  i814.m_Bounciness = i815[2]
  i814.m_BounceMinVelocity = i815[3]
  i814.m_ContactDistance = i815[4]
  i814.minBounce = i815[5]
  i814.maxBounce = i815[6]
  return i814
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i816 = root || request.c( 'UnityEngine.JointDrive' )
  var i817 = data
  i816.m_PositionSpring = i817[0]
  i816.m_PositionDamper = i817[1]
  i816.m_MaximumForce = i817[2]
  i816.m_UseAcceleration = i817[3]
  return i816
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i818 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i819 = data
  i818.m_Spring = i819[0]
  i818.m_Damper = i819[1]
  return i818
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i820 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i821 = data
  i820.m_Limit = i821[0]
  i820.m_Bounciness = i821[1]
  i820.m_ContactDistance = i821[2]
  return i820
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i822 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i823 = data
  i822.m_ExtremumSlip = i823[0]
  i822.m_ExtremumValue = i823[1]
  i822.m_AsymptoteSlip = i823[2]
  i822.m_AsymptoteValue = i823[3]
  i822.m_Stiffness = i823[4]
  return i822
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i825 = data
  i824.m_LowerAngle = i825[0]
  i824.m_UpperAngle = i825[1]
  return i824
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i826 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i827 = data
  i826.m_MotorSpeed = i827[0]
  i826.m_MaximumMotorTorque = i827[1]
  return i826
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i828 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i829 = data
  i828.m_DampingRatio = i829[0]
  i828.m_Frequency = i829[1]
  i828.m_Angle = i829[2]
  return i828
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i831 = data
  i830.m_LowerTranslation = i831[0]
  i830.m_UpperTranslation = i831[1]
  return i830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i832 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i833 = data
  i832.name = i833[0]
  i832.width = i833[1]
  i832.height = i833[2]
  i832.mipmapCount = i833[3]
  i832.anisoLevel = i833[4]
  i832.filterMode = i833[5]
  i832.hdr = !!i833[6]
  i832.format = i833[7]
  i832.wrapMode = i833[8]
  i832.alphaIsTransparency = !!i833[9]
  i832.alphaSource = i833[10]
  i832.graphicsFormat = i833[11]
  i832.sRGBTexture = !!i833[12]
  i832.desiredColorSpace = i833[13]
  i832.wrapU = i833[14]
  i832.wrapV = i833[15]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i835 = data
  i834.name = i835[0]
  i834.index = i835[1]
  i834.startup = !!i835[2]
  return i834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i837 = data
  i836.aspect = i837[0]
  i836.orthographic = !!i837[1]
  i836.orthographicSize = i837[2]
  i836.backgroundColor = new pc.Color(i837[3], i837[4], i837[5], i837[6])
  i836.nearClipPlane = i837[7]
  i836.farClipPlane = i837[8]
  i836.fieldOfView = i837[9]
  i836.depth = i837[10]
  i836.clearFlags = i837[11]
  i836.cullingMask = i837[12]
  i836.rect = i837[13]
  request.r(i837[14], i837[15], 0, i836, 'targetTexture')
  i836.usePhysicalProperties = !!i837[16]
  i836.focalLength = i837[17]
  i836.sensorSize = new pc.Vec2( i837[18], i837[19] )
  i836.lensShift = new pc.Vec2( i837[20], i837[21] )
  i836.gateFit = i837[22]
  i836.commandBufferCount = i837[23]
  i836.cameraType = i837[24]
  i836.enabled = !!i837[25]
  return i836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i839 = data
  i838.name = i839[0]
  i838.tagId = i839[1]
  i838.enabled = !!i839[2]
  i838.isStatic = !!i839[3]
  i838.layer = i839[4]
  return i838
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i841 = data
  request.r(i841[0], i841[1], 0, i840, 'm_FirstSelected')
  i840.m_sendNavigationEvents = !!i841[2]
  i840.m_DragThreshold = i841[3]
  return i840
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i843 = data
  i842.m_HorizontalAxis = i843[0]
  i842.m_VerticalAxis = i843[1]
  i842.m_SubmitButton = i843[2]
  i842.m_CancelButton = i843[3]
  i842.m_InputActionsPerSecond = i843[4]
  i842.m_RepeatDelay = i843[5]
  i842.m_ForceModuleActive = !!i843[6]
  i842.m_SendPointerHoverToParent = !!i843[7]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i845 = data
  i844.pivot = new pc.Vec2( i845[0], i845[1] )
  i844.anchorMin = new pc.Vec2( i845[2], i845[3] )
  i844.anchorMax = new pc.Vec2( i845[4], i845[5] )
  i844.sizeDelta = new pc.Vec2( i845[6], i845[7] )
  i844.anchoredPosition3D = new pc.Vec3( i845[8], i845[9], i845[10] )
  i844.rotation = new pc.Quat(i845[11], i845[12], i845[13], i845[14])
  i844.scale = new pc.Vec3( i845[15], i845[16], i845[17] )
  return i844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i847 = data
  i846.planeDistance = i847[0]
  i846.referencePixelsPerUnit = i847[1]
  i846.isFallbackOverlay = !!i847[2]
  i846.renderMode = i847[3]
  i846.renderOrder = i847[4]
  i846.sortingLayerName = i847[5]
  i846.sortingOrder = i847[6]
  i846.scaleFactor = i847[7]
  request.r(i847[8], i847[9], 0, i846, 'worldCamera')
  i846.overrideSorting = !!i847[10]
  i846.pixelPerfect = !!i847[11]
  i846.targetDisplay = i847[12]
  i846.overridePixelPerfect = !!i847[13]
  i846.enabled = !!i847[14]
  return i846
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i848 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i849 = data
  i848.m_UiScaleMode = i849[0]
  i848.m_ReferencePixelsPerUnit = i849[1]
  i848.m_ScaleFactor = i849[2]
  i848.m_ReferenceResolution = new pc.Vec2( i849[3], i849[4] )
  i848.m_ScreenMatchMode = i849[5]
  i848.m_MatchWidthOrHeight = i849[6]
  i848.m_PhysicalUnit = i849[7]
  i848.m_FallbackScreenDPI = i849[8]
  i848.m_DefaultSpriteDPI = i849[9]
  i848.m_DynamicPixelsPerUnit = i849[10]
  i848.m_PresetInfoIsWorld = !!i849[11]
  return i848
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i850 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i851 = data
  i850.m_IgnoreReversedGraphics = !!i851[0]
  i850.m_BlockingObjects = i851[1]
  i850.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i851[2] )
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i852 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i853 = data
  i852.cullTransparentMesh = !!i853[0]
  return i852
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.UI.Image' )
  var i855 = data
  request.r(i855[0], i855[1], 0, i854, 'm_Sprite')
  i854.m_Type = i855[2]
  i854.m_PreserveAspect = !!i855[3]
  i854.m_FillCenter = !!i855[4]
  i854.m_FillMethod = i855[5]
  i854.m_FillAmount = i855[6]
  i854.m_FillClockwise = !!i855[7]
  i854.m_FillOrigin = i855[8]
  i854.m_UseSpriteMesh = !!i855[9]
  i854.m_PixelsPerUnitMultiplier = i855[10]
  request.r(i855[11], i855[12], 0, i854, 'm_Material')
  i854.m_Maskable = !!i855[13]
  i854.m_Color = new pc.Color(i855[14], i855[15], i855[16], i855[17])
  i854.m_RaycastTarget = !!i855[18]
  i854.m_RaycastPadding = new pc.Vec4( i855[19], i855[20], i855[21], i855[22] )
  return i854
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i856 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i857 = data
  i856.m_AspectMode = i857[0]
  i856.m_AspectRatio = i857[1]
  return i856
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i858 = root || request.c( 'UnityEngine.UI.Text' )
  var i859 = data
  i858.m_FontData = request.d('UnityEngine.UI.FontData', i859[0], i858.m_FontData)
  i858.m_Text = i859[1]
  request.r(i859[2], i859[3], 0, i858, 'm_Material')
  i858.m_Maskable = !!i859[4]
  i858.m_Color = new pc.Color(i859[5], i859[6], i859[7], i859[8])
  i858.m_RaycastTarget = !!i859[9]
  i858.m_RaycastPadding = new pc.Vec4( i859[10], i859[11], i859[12], i859[13] )
  return i858
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i860 = root || request.c( 'UnityEngine.UI.FontData' )
  var i861 = data
  request.r(i861[0], i861[1], 0, i860, 'm_Font')
  i860.m_FontSize = i861[2]
  i860.m_FontStyle = i861[3]
  i860.m_BestFit = !!i861[4]
  i860.m_MinSize = i861[5]
  i860.m_MaxSize = i861[6]
  i860.m_Alignment = i861[7]
  i860.m_AlignByGeometry = !!i861[8]
  i860.m_RichText = !!i861[9]
  i860.m_HorizontalOverflow = i861[10]
  i860.m_VerticalOverflow = i861[11]
  i860.m_LineSpacing = i861[12]
  return i860
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i862 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i863 = data
  i862.targetIsSelf = !!i863[0]
  request.r(i863[1], i863[2], 0, i862, 'targetGO')
  i862.tweenTargetIsTargetGO = !!i863[3]
  i862.delay = i863[4]
  i862.duration = i863[5]
  i862.easeType = i863[6]
  i862.easeCurve = new pc.AnimationCurve( { keys_flow: i863[7] } )
  i862.loopType = i863[8]
  i862.loops = i863[9]
  i862.id = i863[10]
  i862.isRelative = !!i863[11]
  i862.isFrom = !!i863[12]
  i862.isIndependentUpdate = !!i863[13]
  i862.autoKill = !!i863[14]
  i862.autoGenerate = !!i863[15]
  i862.isActive = !!i863[16]
  i862.isValid = !!i863[17]
  request.r(i863[18], i863[19], 0, i862, 'target')
  i862.animationType = i863[20]
  i862.targetType = i863[21]
  i862.forcedTargetType = i863[22]
  i862.autoPlay = !!i863[23]
  i862.useTargetAsV3 = !!i863[24]
  i862.endValueFloat = i863[25]
  i862.endValueV3 = new pc.Vec3( i863[26], i863[27], i863[28] )
  i862.endValueV2 = new pc.Vec2( i863[29], i863[30] )
  i862.endValueColor = new pc.Color(i863[31], i863[32], i863[33], i863[34])
  i862.endValueString = i863[35]
  i862.endValueRect = UnityEngine.Rect.MinMaxRect(i863[36], i863[37], i863[38], i863[39])
  request.r(i863[40], i863[41], 0, i862, 'endValueTransform')
  i862.optionalBool0 = !!i863[42]
  i862.optionalBool1 = !!i863[43]
  i862.optionalFloat0 = i863[44]
  i862.optionalInt0 = i863[45]
  i862.optionalRotationMode = i863[46]
  i862.optionalScrambleMode = i863[47]
  i862.optionalShakeRandomnessMode = i863[48]
  i862.optionalString = i863[49]
  i862.updateType = i863[50]
  i862.isSpeedBased = !!i863[51]
  i862.hasOnStart = !!i863[52]
  i862.hasOnPlay = !!i863[53]
  i862.hasOnUpdate = !!i863[54]
  i862.hasOnStepComplete = !!i863[55]
  i862.hasOnComplete = !!i863[56]
  i862.hasOnTweenCreated = !!i863[57]
  i862.hasOnRewind = !!i863[58]
  i862.onStart = request.d('UnityEngine.Events.UnityEvent', i863[59], i862.onStart)
  i862.onPlay = request.d('UnityEngine.Events.UnityEvent', i863[60], i862.onPlay)
  i862.onUpdate = request.d('UnityEngine.Events.UnityEvent', i863[61], i862.onUpdate)
  i862.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i863[62], i862.onStepComplete)
  i862.onComplete = request.d('UnityEngine.Events.UnityEvent', i863[63], i862.onComplete)
  i862.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i863[64], i862.onTweenCreated)
  i862.onRewind = request.d('UnityEngine.Events.UnityEvent', i863[65], i862.onRewind)
  return i862
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i864 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i865 = data
  i864.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i865[0], i864.m_PersistentCalls)
  return i864
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i866 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i867 = data
  var i869 = i867[0]
  var i868 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i869.length; i += 1) {
    i868.add(request.d('UnityEngine.Events.PersistentCall', i869[i + 0]));
  }
  i866.m_Calls = i868
  return i866
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i873 = data
  request.r(i873[0], i873[1], 0, i872, 'm_Target')
  i872.m_TargetAssemblyTypeName = i873[2]
  i872.m_MethodName = i873[3]
  i872.m_Mode = i873[4]
  i872.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i873[5], i872.m_Arguments)
  i872.m_CallState = i873[6]
  return i872
}

Deserializers["TutController"] = function (request, data, root) {
  var i874 = root || request.c( 'TutController' )
  var i875 = data
  request.r(i875[0], i875[1], 0, i874, 'leftCard')
  request.r(i875[2], i875[3], 0, i874, 'rightCard')
  i874.leftPos = new pc.Vec2( i875[4], i875[5] )
  i874.rightPos = new pc.Vec2( i875[6], i875[7] )
  request.r(i875[8], i875[9], 0, i874, 'tut')
  i874.timeMove = i875[10]
  i874.timeDelay = i875[11]
  return i874
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i876 = root || request.c( 'UnityEngine.UI.Button' )
  var i877 = data
  i876.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i877[0], i876.m_OnClick)
  i876.m_Navigation = request.d('UnityEngine.UI.Navigation', i877[1], i876.m_Navigation)
  i876.m_Transition = i877[2]
  i876.m_Colors = request.d('UnityEngine.UI.ColorBlock', i877[3], i876.m_Colors)
  i876.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i877[4], i876.m_SpriteState)
  i876.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i877[5], i876.m_AnimationTriggers)
  i876.m_Interactable = !!i877[6]
  request.r(i877[7], i877[8], 0, i876, 'm_TargetGraphic')
  return i876
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i879 = data
  i878.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i879[0], i878.m_PersistentCalls)
  return i878
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i880 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i881 = data
  i880.m_Mode = i881[0]
  i880.m_WrapAround = !!i881[1]
  request.r(i881[2], i881[3], 0, i880, 'm_SelectOnUp')
  request.r(i881[4], i881[5], 0, i880, 'm_SelectOnDown')
  request.r(i881[6], i881[7], 0, i880, 'm_SelectOnLeft')
  request.r(i881[8], i881[9], 0, i880, 'm_SelectOnRight')
  return i880
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i882 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i883 = data
  i882.m_NormalColor = new pc.Color(i883[0], i883[1], i883[2], i883[3])
  i882.m_HighlightedColor = new pc.Color(i883[4], i883[5], i883[6], i883[7])
  i882.m_PressedColor = new pc.Color(i883[8], i883[9], i883[10], i883[11])
  i882.m_SelectedColor = new pc.Color(i883[12], i883[13], i883[14], i883[15])
  i882.m_DisabledColor = new pc.Color(i883[16], i883[17], i883[18], i883[19])
  i882.m_ColorMultiplier = i883[20]
  i882.m_FadeDuration = i883[21]
  return i882
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i884 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i885 = data
  request.r(i885[0], i885[1], 0, i884, 'm_HighlightedSprite')
  request.r(i885[2], i885[3], 0, i884, 'm_PressedSprite')
  request.r(i885[4], i885[5], 0, i884, 'm_SelectedSprite')
  request.r(i885[6], i885[7], 0, i884, 'm_DisabledSprite')
  return i884
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i886 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i887 = data
  i886.m_NormalTrigger = i887[0]
  i886.m_HighlightedTrigger = i887[1]
  i886.m_PressedTrigger = i887[2]
  i886.m_SelectedTrigger = i887[3]
  i886.m_DisabledTrigger = i887[4]
  return i886
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i888 = root || request.c( 'LayoutController' )
  var i889 = data
  request.r(i889[0], i889[1], 0, i888, 'cardParent')
  request.r(i889[2], i889[3], 0, i888, 'leftCard')
  request.r(i889[4], i889[5], 0, i888, 'rightCard')
  i888.origin = new pc.Vec2( i889[6], i889[7] )
  i888.smallSize = new pc.Vec2( i889[8], i889[9] )
  return i888
}

Deserializers["LunaController"] = function (request, data, root) {
  var i890 = root || request.c( 'LunaController' )
  var i891 = data
  i890.TimePlay = i891[0]
  i890.LimitTimePlay = !!i891[1]
  request.r(i891[2], i891[3], 0, i890, 'endCard')
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i892 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i893 = data
  request.r(i893[0], i893[1], 0, i892, 'clip')
  request.r(i893[2], i893[3], 0, i892, 'outputAudioMixerGroup')
  i892.playOnAwake = !!i893[4]
  i892.loop = !!i893[5]
  i892.time = i893[6]
  i892.volume = i893[7]
  i892.pitch = i893[8]
  i892.enabled = !!i893[9]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i895 = data
  i894.ambientIntensity = i895[0]
  i894.reflectionIntensity = i895[1]
  i894.ambientMode = i895[2]
  i894.ambientLight = new pc.Color(i895[3], i895[4], i895[5], i895[6])
  i894.ambientSkyColor = new pc.Color(i895[7], i895[8], i895[9], i895[10])
  i894.ambientGroundColor = new pc.Color(i895[11], i895[12], i895[13], i895[14])
  i894.ambientEquatorColor = new pc.Color(i895[15], i895[16], i895[17], i895[18])
  i894.fogColor = new pc.Color(i895[19], i895[20], i895[21], i895[22])
  i894.fogEndDistance = i895[23]
  i894.fogStartDistance = i895[24]
  i894.fogDensity = i895[25]
  i894.fog = !!i895[26]
  request.r(i895[27], i895[28], 0, i894, 'skybox')
  i894.fogMode = i895[29]
  var i897 = i895[30]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i897[i + 0]) );
  }
  i894.lightmaps = i896
  i894.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i895[31], i894.lightProbes)
  i894.lightmapsMode = i895[32]
  i894.mixedBakeMode = i895[33]
  i894.environmentLightingMode = i895[34]
  i894.ambientProbe = new pc.SphericalHarmonicsL2(i895[35])
  request.r(i895[36], i895[37], 0, i894, 'customReflection')
  request.r(i895[38], i895[39], 0, i894, 'defaultReflection')
  i894.defaultReflectionMode = i895[40]
  i894.defaultReflectionResolution = i895[41]
  i894.sunLightObjectId = i895[42]
  i894.pixelLightCount = i895[43]
  i894.defaultReflectionHDR = !!i895[44]
  i894.hasLightDataAsset = !!i895[45]
  i894.hasManualGenerate = !!i895[46]
  return i894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i900 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i901 = data
  request.r(i901[0], i901[1], 0, i900, 'lightmapColor')
  request.r(i901[2], i901[3], 0, i900, 'lightmapDirection')
  request.r(i901[4], i901[5], 0, i900, 'shadowMask')
  return i900
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i902 = root || new UnityEngine.LightProbes()
  var i903 = data
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i910 = root || new pc.UnityMaterial()
  var i911 = data
  i910.name = i911[0]
  request.r(i911[1], i911[2], 0, i910, 'shader')
  i910.renderQueue = i911[3]
  i910.enableInstancing = !!i911[4]
  var i913 = i911[5]
  var i912 = []
  for(var i = 0; i < i913.length; i += 1) {
    i912.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i913[i + 0]) );
  }
  i910.floatParameters = i912
  var i915 = i911[6]
  var i914 = []
  for(var i = 0; i < i915.length; i += 1) {
    i914.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i915[i + 0]) );
  }
  i910.colorParameters = i914
  var i917 = i911[7]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i917[i + 0]) );
  }
  i910.vectorParameters = i916
  var i919 = i911[8]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i919[i + 0]) );
  }
  i910.textureParameters = i918
  var i921 = i911[9]
  var i920 = []
  for(var i = 0; i < i921.length; i += 1) {
    i920.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i921[i + 0]) );
  }
  i910.materialFlags = i920
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i925 = data
  i924.name = i925[0]
  i924.value = i925[1]
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i929 = data
  i928.name = i929[0]
  i928.value = new pc.Color(i929[1], i929[2], i929[3], i929[4])
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i933 = data
  i932.name = i933[0]
  i932.value = new pc.Vec4( i933[1], i933[2], i933[3], i933[4] )
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i937 = data
  i936.name = i937[0]
  request.r(i937[1], i937[2], 0, i936, 'value')
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i941 = data
  i940.name = i941[0]
  i940.enabled = !!i941[1]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i943 = data
  var i945 = i943[0]
  var i944 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i945.length; i += 1) {
    i944.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i945[i + 0]));
  }
  i942.ShaderCompilationErrors = i944
  i942.name = i943[1]
  i942.guid = i943[2]
  var i947 = i943[3]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( i947[i + 0] );
  }
  i942.shaderDefinedKeywords = i946
  var i949 = i943[4]
  var i948 = []
  for(var i = 0; i < i949.length; i += 1) {
    i948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i949[i + 0]) );
  }
  i942.passes = i948
  var i951 = i943[5]
  var i950 = []
  for(var i = 0; i < i951.length; i += 1) {
    i950.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i951[i + 0]) );
  }
  i942.usePasses = i950
  var i953 = i943[6]
  var i952 = []
  for(var i = 0; i < i953.length; i += 1) {
    i952.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i953[i + 0]) );
  }
  i942.defaultParameterValues = i952
  request.r(i943[7], i943[8], 0, i942, 'unityFallbackShader')
  i942.readDepth = !!i943[9]
  i942.hasDepthOnlyPass = !!i943[10]
  i942.isCreatedByShaderGraph = !!i943[11]
  i942.disableBatching = !!i943[12]
  i942.compiled = !!i943[13]
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i957 = data
  i956.shaderName = i957[0]
  i956.errorMessage = i957[1]
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i962 = root || new pc.UnityShaderPass()
  var i963 = data
  i962.id = i963[0]
  i962.subShaderIndex = i963[1]
  i962.name = i963[2]
  i962.passType = i963[3]
  i962.grabPassTextureName = i963[4]
  i962.usePass = !!i963[5]
  i962.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[6], i962.zTest)
  i962.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[7], i962.zWrite)
  i962.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[8], i962.culling)
  i962.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i963[9], i962.blending)
  i962.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i963[10], i962.alphaBlending)
  i962.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[11], i962.colorWriteMask)
  i962.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[12], i962.offsetUnits)
  i962.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[13], i962.offsetFactor)
  i962.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[14], i962.stencilRef)
  i962.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[15], i962.stencilReadMask)
  i962.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i963[16], i962.stencilWriteMask)
  i962.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i963[17], i962.stencilOp)
  i962.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i963[18], i962.stencilOpFront)
  i962.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i963[19], i962.stencilOpBack)
  var i965 = i963[20]
  var i964 = []
  for(var i = 0; i < i965.length; i += 1) {
    i964.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i965[i + 0]) );
  }
  i962.tags = i964
  var i967 = i963[21]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( i967[i + 0] );
  }
  i962.passDefinedKeywords = i966
  var i969 = i963[22]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i969[i + 0]) );
  }
  i962.passDefinedKeywordGroups = i968
  var i971 = i963[23]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i971[i + 0]) );
  }
  i962.variants = i970
  var i973 = i963[24]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i973[i + 0]) );
  }
  i962.excludedVariants = i972
  i962.hasDepthReader = !!i963[25]
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i975 = data
  i974.val = i975[0]
  i974.name = i975[1]
  return i974
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i977 = data
  i976.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i977[0], i976.src)
  i976.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i977[1], i976.dst)
  i976.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i977[2], i976.op)
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i979 = data
  i978.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[0], i978.pass)
  i978.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[1], i978.fail)
  i978.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[2], i978.zFail)
  i978.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[3], i978.comp)
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i983 = data
  i982.name = i983[0]
  i982.value = i983[1]
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i987 = data
  var i989 = i987[0]
  var i988 = []
  for(var i = 0; i < i989.length; i += 1) {
    i988.push( i989[i + 0] );
  }
  i986.keywords = i988
  i986.hasDiscard = !!i987[1]
  return i986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i993 = data
  i992.passId = i993[0]
  i992.subShaderIndex = i993[1]
  var i995 = i993[2]
  var i994 = []
  for(var i = 0; i < i995.length; i += 1) {
    i994.push( i995[i + 0] );
  }
  i992.keywords = i994
  i992.vertexProgram = i993[3]
  i992.fragmentProgram = i993[4]
  i992.exportedForWebGl2 = !!i993[5]
  i992.readDepth = !!i993[6]
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i999 = data
  request.r(i999[0], i999[1], 0, i998, 'shader')
  i998.pass = i999[2]
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1003 = data
  i1002.name = i1003[0]
  i1002.type = i1003[1]
  i1002.value = new pc.Vec4( i1003[2], i1003[3], i1003[4], i1003[5] )
  i1002.textureValue = i1003[6]
  i1002.shaderPropertyFlag = i1003[7]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1004 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1005 = data
  i1004.name = i1005[0]
  request.r(i1005[1], i1005[2], 0, i1004, 'texture')
  i1004.aabb = i1005[3]
  i1004.vertices = i1005[4]
  i1004.triangles = i1005[5]
  i1004.textureRect = UnityEngine.Rect.MinMaxRect(i1005[6], i1005[7], i1005[8], i1005[9])
  i1004.packedRect = UnityEngine.Rect.MinMaxRect(i1005[10], i1005[11], i1005[12], i1005[13])
  i1004.border = new pc.Vec4( i1005[14], i1005[15], i1005[16], i1005[17] )
  i1004.transparency = i1005[18]
  i1004.bounds = i1005[19]
  i1004.pixelsPerUnit = i1005[20]
  i1004.textureWidth = i1005[21]
  i1004.textureHeight = i1005[22]
  i1004.nativeSize = new pc.Vec2( i1005[23], i1005[24] )
  i1004.pivot = new pc.Vec2( i1005[25], i1005[26] )
  i1004.textureRectOffset = new pc.Vec2( i1005[27], i1005[28] )
  return i1004
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1007 = data
  i1006.name = i1007[0]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1009 = data
  i1008.name = i1009[0]
  i1008.ascent = i1009[1]
  i1008.originalLineHeight = i1009[2]
  i1008.fontSize = i1009[3]
  var i1011 = i1009[4]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 1) {
    i1010.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1011[i + 0]) );
  }
  i1008.characterInfo = i1010
  request.r(i1009[5], i1009[6], 0, i1008, 'texture')
  i1008.originalFontSize = i1009[7]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1014 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1015 = data
  i1014.index = i1015[0]
  i1014.advance = i1015[1]
  i1014.bearing = i1015[2]
  i1014.glyphWidth = i1015[3]
  i1014.glyphHeight = i1015[4]
  i1014.minX = i1015[5]
  i1014.maxX = i1015[6]
  i1014.minY = i1015[7]
  i1014.maxY = i1015[8]
  i1014.uvBottomLeftX = i1015[9]
  i1014.uvBottomLeftY = i1015[10]
  i1014.uvBottomRightX = i1015[11]
  i1014.uvBottomRightY = i1015[12]
  i1014.uvTopLeftX = i1015[13]
  i1014.uvTopLeftY = i1015[14]
  i1014.uvTopRightX = i1015[15]
  i1014.uvTopRightY = i1015[16]
  return i1014
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1016 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1017 = data
  i1016.useSafeMode = !!i1017[0]
  i1016.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1017[1], i1016.safeModeOptions)
  i1016.timeScale = i1017[2]
  i1016.unscaledTimeScale = i1017[3]
  i1016.useSmoothDeltaTime = !!i1017[4]
  i1016.maxSmoothUnscaledTime = i1017[5]
  i1016.rewindCallbackMode = i1017[6]
  i1016.showUnityEditorReport = !!i1017[7]
  i1016.logBehaviour = i1017[8]
  i1016.drawGizmos = !!i1017[9]
  i1016.defaultRecyclable = !!i1017[10]
  i1016.defaultAutoPlay = i1017[11]
  i1016.defaultUpdateType = i1017[12]
  i1016.defaultTimeScaleIndependent = !!i1017[13]
  i1016.defaultEaseType = i1017[14]
  i1016.defaultEaseOvershootOrAmplitude = i1017[15]
  i1016.defaultEasePeriod = i1017[16]
  i1016.defaultAutoKill = !!i1017[17]
  i1016.defaultLoopType = i1017[18]
  i1016.debugMode = !!i1017[19]
  i1016.debugStoreTargetId = !!i1017[20]
  i1016.showPreviewPanel = !!i1017[21]
  i1016.storeSettingsLocation = i1017[22]
  i1016.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1017[23], i1016.modules)
  i1016.createASMDEF = !!i1017[24]
  i1016.showPlayingTweens = !!i1017[25]
  i1016.showPausedTweens = !!i1017[26]
  return i1016
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1018 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1019 = data
  i1018.logBehaviour = i1019[0]
  i1018.nestedTweenFailureBehaviour = i1019[1]
  return i1018
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1020 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1021 = data
  i1020.showPanel = !!i1021[0]
  i1020.audioEnabled = !!i1021[1]
  i1020.physicsEnabled = !!i1021[2]
  i1020.physics2DEnabled = !!i1021[3]
  i1020.spriteEnabled = !!i1021[4]
  i1020.uiEnabled = !!i1021[5]
  i1020.textMeshProEnabled = !!i1021[6]
  i1020.tk2DEnabled = !!i1021[7]
  i1020.deAudioEnabled = !!i1021[8]
  i1020.deUnityExtendedEnabled = !!i1021[9]
  i1020.epoOutlineEnabled = !!i1021[10]
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1023 = data
  var i1025 = i1023[0]
  var i1024 = []
  for(var i = 0; i < i1025.length; i += 1) {
    i1024.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1025[i + 0]) );
  }
  i1022.files = i1024
  i1022.componentToPrefabIds = i1023[1]
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1028 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1029 = data
  i1028.path = i1029[0]
  request.r(i1029[1], i1029[2], 0, i1028, 'unityObject')
  return i1028
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1031 = data
  var i1033 = i1031[0]
  var i1032 = []
  for(var i = 0; i < i1033.length; i += 1) {
    i1032.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1033[i + 0]) );
  }
  i1030.scriptsExecutionOrder = i1032
  var i1035 = i1031[1]
  var i1034 = []
  for(var i = 0; i < i1035.length; i += 1) {
    i1034.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1035[i + 0]) );
  }
  i1030.sortingLayers = i1034
  var i1037 = i1031[2]
  var i1036 = []
  for(var i = 0; i < i1037.length; i += 1) {
    i1036.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1037[i + 0]) );
  }
  i1030.cullingLayers = i1036
  i1030.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1031[3], i1030.timeSettings)
  i1030.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1031[4], i1030.physicsSettings)
  i1030.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1031[5], i1030.physics2DSettings)
  i1030.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1031[6], i1030.qualitySettings)
  i1030.enableRealtimeShadows = !!i1031[7]
  i1030.enableAutoInstancing = !!i1031[8]
  i1030.enableStaticBatching = !!i1031[9]
  i1030.enableDynamicBatching = !!i1031[10]
  i1030.usePreservativeDynamicBatching = !!i1031[11]
  i1030.lightmapEncodingQuality = i1031[12]
  i1030.desiredColorSpace = i1031[13]
  var i1039 = i1031[14]
  var i1038 = []
  for(var i = 0; i < i1039.length; i += 1) {
    i1038.push( i1039[i + 0] );
  }
  i1030.allTags = i1038
  return i1030
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1043 = data
  i1042.name = i1043[0]
  i1042.value = i1043[1]
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1047 = data
  i1046.id = i1047[0]
  i1046.name = i1047[1]
  i1046.value = i1047[2]
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1050 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1051 = data
  i1050.id = i1051[0]
  i1050.name = i1051[1]
  return i1050
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1052 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1053 = data
  i1052.fixedDeltaTime = i1053[0]
  i1052.maximumDeltaTime = i1053[1]
  i1052.timeScale = i1053[2]
  i1052.maximumParticleTimestep = i1053[3]
  return i1052
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1054 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1055 = data
  i1054.gravity = new pc.Vec3( i1055[0], i1055[1], i1055[2] )
  i1054.defaultSolverIterations = i1055[3]
  i1054.bounceThreshold = i1055[4]
  i1054.autoSyncTransforms = !!i1055[5]
  i1054.autoSimulation = !!i1055[6]
  var i1057 = i1055[7]
  var i1056 = []
  for(var i = 0; i < i1057.length; i += 1) {
    i1056.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1057[i + 0]) );
  }
  i1054.collisionMatrix = i1056
  return i1054
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1061 = data
  i1060.enabled = !!i1061[0]
  i1060.layerId = i1061[1]
  i1060.otherLayerId = i1061[2]
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1063 = data
  request.r(i1063[0], i1063[1], 0, i1062, 'material')
  i1062.gravity = new pc.Vec2( i1063[2], i1063[3] )
  i1062.positionIterations = i1063[4]
  i1062.velocityIterations = i1063[5]
  i1062.velocityThreshold = i1063[6]
  i1062.maxLinearCorrection = i1063[7]
  i1062.maxAngularCorrection = i1063[8]
  i1062.maxTranslationSpeed = i1063[9]
  i1062.maxRotationSpeed = i1063[10]
  i1062.baumgarteScale = i1063[11]
  i1062.baumgarteTOIScale = i1063[12]
  i1062.timeToSleep = i1063[13]
  i1062.linearSleepTolerance = i1063[14]
  i1062.angularSleepTolerance = i1063[15]
  i1062.defaultContactOffset = i1063[16]
  i1062.autoSimulation = !!i1063[17]
  i1062.queriesHitTriggers = !!i1063[18]
  i1062.queriesStartInColliders = !!i1063[19]
  i1062.callbacksOnDisable = !!i1063[20]
  i1062.reuseCollisionCallbacks = !!i1063[21]
  i1062.autoSyncTransforms = !!i1063[22]
  var i1065 = i1063[23]
  var i1064 = []
  for(var i = 0; i < i1065.length; i += 1) {
    i1064.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1065[i + 0]) );
  }
  i1062.collisionMatrix = i1064
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1069 = data
  i1068.enabled = !!i1069[0]
  i1068.layerId = i1069[1]
  i1068.otherLayerId = i1069[2]
  return i1068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1071 = data
  var i1073 = i1071[0]
  var i1072 = []
  for(var i = 0; i < i1073.length; i += 1) {
    i1072.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1073[i + 0]) );
  }
  i1070.qualityLevels = i1072
  var i1075 = i1071[1]
  var i1074 = []
  for(var i = 0; i < i1075.length; i += 1) {
    i1074.push( i1075[i + 0] );
  }
  i1070.names = i1074
  i1070.shadows = i1071[2]
  i1070.anisotropicFiltering = i1071[3]
  i1070.antiAliasing = i1071[4]
  i1070.lodBias = i1071[5]
  i1070.shadowCascades = i1071[6]
  i1070.shadowDistance = i1071[7]
  i1070.shadowmaskMode = i1071[8]
  i1070.shadowProjection = i1071[9]
  i1070.shadowResolution = i1071[10]
  i1070.softParticles = !!i1071[11]
  i1070.softVegetation = !!i1071[12]
  i1070.activeColorSpace = i1071[13]
  i1070.desiredColorSpace = i1071[14]
  i1070.masterTextureLimit = i1071[15]
  i1070.maxQueuedFrames = i1071[16]
  i1070.particleRaycastBudget = i1071[17]
  i1070.pixelLightCount = i1071[18]
  i1070.realtimeReflectionProbes = !!i1071[19]
  i1070.shadowCascade2Split = i1071[20]
  i1070.shadowCascade4Split = new pc.Vec3( i1071[21], i1071[22], i1071[23] )
  i1070.streamingMipmapsActive = !!i1071[24]
  i1070.vSyncCount = i1071[25]
  i1070.asyncUploadBufferSize = i1071[26]
  i1070.asyncUploadTimeSlice = i1071[27]
  i1070.billboardsFaceCameraPosition = !!i1071[28]
  i1070.shadowNearPlaneOffset = i1071[29]
  i1070.streamingMipmapsMemoryBudget = i1071[30]
  i1070.maximumLODLevel = i1071[31]
  i1070.streamingMipmapsAddAllCameras = !!i1071[32]
  i1070.streamingMipmapsMaxLevelReduction = i1071[33]
  i1070.streamingMipmapsRenderersPerFrame = i1071[34]
  i1070.resolutionScalingFixedDPIFactor = i1071[35]
  i1070.streamingMipmapsMaxFileIORequests = i1071[36]
  i1070.currentQualityLevel = i1071[37]
  return i1070
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1078 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1079 = data
  request.r(i1079[0], i1079[1], 0, i1078, 'm_ObjectArgument')
  i1078.m_ObjectArgumentAssemblyTypeName = i1079[2]
  i1078.m_IntArgument = i1079[3]
  i1078.m_FloatArgument = i1079[4]
  i1078.m_StringArgument = i1079[5]
  i1078.m_BoolArgument = !!i1079[6]
  return i1078
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"26":[27],"28":[27],"29":[27],"30":[27],"31":[27],"32":[27],"33":[34],"35":[0],"36":[37],"38":[37],"39":[37],"40":[37],"41":[37],"42":[37],"43":[44],"45":[44],"46":[44],"47":[44],"48":[44],"49":[44],"50":[44],"51":[44],"52":[44],"53":[44],"54":[44],"55":[44],"56":[44],"57":[0],"58":[59],"60":[61],"62":[61],"6":[5],"63":[64],"65":[0],"66":[67],"68":[5],"69":[9,5],"70":[59],"71":[9,5],"72":[5],"73":[5],"74":[59,5],"75":[5,9],"76":[77],"78":[77],"79":[77],"80":[5],"81":[5],"8":[6],"10":[9,5],"12":[5],"7":[6],"82":[5],"83":[5],"84":[5],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"91":[9,5],"92":[5],"93":[5],"94":[5],"95":[5],"13":[9,5],"96":[5],"97":[3],"98":[3],"4":[3],"99":[3],"100":[0],"101":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","TutController","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioSource","UnityEngine.AudioClip","UnityEngine.Shader","UnityEngine.Texture2D","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "07/08/2026 10:13:51";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "PEOP_V35_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1846";

Deserializers.runtimeAnalysisExcludedMethodsCount = "3759";

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

Deserializers.buildID = "3d0a339c-139d-4152-93d3-3d3dbe3a698c";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

