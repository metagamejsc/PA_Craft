var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i822 = root || request.c( 'UnityEngine.JointSpring' )
  var i823 = data
  i822.spring = i823[0]
  i822.damper = i823[1]
  i822.targetPosition = i823[2]
  return i822
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.JointMotor' )
  var i825 = data
  i824.m_TargetVelocity = i825[0]
  i824.m_Force = i825[1]
  i824.m_FreeSpin = i825[2]
  return i824
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i826 = root || request.c( 'UnityEngine.JointLimits' )
  var i827 = data
  i826.m_Min = i827[0]
  i826.m_Max = i827[1]
  i826.m_Bounciness = i827[2]
  i826.m_BounceMinVelocity = i827[3]
  i826.m_ContactDistance = i827[4]
  i826.minBounce = i827[5]
  i826.maxBounce = i827[6]
  return i826
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i828 = root || request.c( 'UnityEngine.JointDrive' )
  var i829 = data
  i828.m_PositionSpring = i829[0]
  i828.m_PositionDamper = i829[1]
  i828.m_MaximumForce = i829[2]
  i828.m_UseAcceleration = i829[3]
  return i828
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i831 = data
  i830.m_Spring = i831[0]
  i830.m_Damper = i831[1]
  return i830
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i833 = data
  i832.m_Limit = i833[0]
  i832.m_Bounciness = i833[1]
  i832.m_ContactDistance = i833[2]
  return i832
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i835 = data
  i834.m_ExtremumSlip = i835[0]
  i834.m_ExtremumValue = i835[1]
  i834.m_AsymptoteSlip = i835[2]
  i834.m_AsymptoteValue = i835[3]
  i834.m_Stiffness = i835[4]
  return i834
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i836 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i837 = data
  i836.m_LowerAngle = i837[0]
  i836.m_UpperAngle = i837[1]
  return i836
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i839 = data
  i838.m_MotorSpeed = i839[0]
  i838.m_MaximumMotorTorque = i839[1]
  return i838
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i841 = data
  i840.m_DampingRatio = i841[0]
  i840.m_Frequency = i841[1]
  i840.m_Angle = i841[2]
  return i840
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i843 = data
  i842.m_LowerTranslation = i843[0]
  i842.m_UpperTranslation = i843[1]
  return i842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i845 = data
  i844.name = i845[0]
  i844.width = i845[1]
  i844.height = i845[2]
  i844.mipmapCount = i845[3]
  i844.anisoLevel = i845[4]
  i844.filterMode = i845[5]
  i844.hdr = !!i845[6]
  i844.format = i845[7]
  i844.wrapMode = i845[8]
  i844.alphaIsTransparency = !!i845[9]
  i844.alphaSource = i845[10]
  i844.graphicsFormat = i845[11]
  i844.sRGBTexture = !!i845[12]
  i844.desiredColorSpace = i845[13]
  i844.wrapU = i845[14]
  i844.wrapV = i845[15]
  return i844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i847 = data
  i846.name = i847[0]
  i846.index = i847[1]
  i846.startup = !!i847[2]
  return i846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i848 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i849 = data
  i848.aspect = i849[0]
  i848.orthographic = !!i849[1]
  i848.orthographicSize = i849[2]
  i848.backgroundColor = new pc.Color(i849[3], i849[4], i849[5], i849[6])
  i848.nearClipPlane = i849[7]
  i848.farClipPlane = i849[8]
  i848.fieldOfView = i849[9]
  i848.depth = i849[10]
  i848.clearFlags = i849[11]
  i848.cullingMask = i849[12]
  i848.rect = i849[13]
  request.r(i849[14], i849[15], 0, i848, 'targetTexture')
  i848.usePhysicalProperties = !!i849[16]
  i848.focalLength = i849[17]
  i848.sensorSize = new pc.Vec2( i849[18], i849[19] )
  i848.lensShift = new pc.Vec2( i849[20], i849[21] )
  i848.gateFit = i849[22]
  i848.commandBufferCount = i849[23]
  i848.cameraType = i849[24]
  i848.enabled = !!i849[25]
  return i848
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i851 = data
  i850.name = i851[0]
  i850.tagId = i851[1]
  i850.enabled = !!i851[2]
  i850.isStatic = !!i851[3]
  i850.layer = i851[4]
  return i850
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i852 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i853 = data
  request.r(i853[0], i853[1], 0, i852, 'm_FirstSelected')
  i852.m_sendNavigationEvents = !!i853[2]
  i852.m_DragThreshold = i853[3]
  return i852
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i854 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i855 = data
  i854.m_HorizontalAxis = i855[0]
  i854.m_VerticalAxis = i855[1]
  i854.m_SubmitButton = i855[2]
  i854.m_CancelButton = i855[3]
  i854.m_InputActionsPerSecond = i855[4]
  i854.m_RepeatDelay = i855[5]
  i854.m_ForceModuleActive = !!i855[6]
  i854.m_SendPointerHoverToParent = !!i855[7]
  return i854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i856 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i857 = data
  i856.pivot = new pc.Vec2( i857[0], i857[1] )
  i856.anchorMin = new pc.Vec2( i857[2], i857[3] )
  i856.anchorMax = new pc.Vec2( i857[4], i857[5] )
  i856.sizeDelta = new pc.Vec2( i857[6], i857[7] )
  i856.anchoredPosition3D = new pc.Vec3( i857[8], i857[9], i857[10] )
  i856.rotation = new pc.Quat(i857[11], i857[12], i857[13], i857[14])
  i856.scale = new pc.Vec3( i857[15], i857[16], i857[17] )
  return i856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i859 = data
  i858.planeDistance = i859[0]
  i858.referencePixelsPerUnit = i859[1]
  i858.isFallbackOverlay = !!i859[2]
  i858.renderMode = i859[3]
  i858.renderOrder = i859[4]
  i858.sortingLayerName = i859[5]
  i858.sortingOrder = i859[6]
  i858.scaleFactor = i859[7]
  request.r(i859[8], i859[9], 0, i858, 'worldCamera')
  i858.overrideSorting = !!i859[10]
  i858.pixelPerfect = !!i859[11]
  i858.targetDisplay = i859[12]
  i858.overridePixelPerfect = !!i859[13]
  i858.enabled = !!i859[14]
  return i858
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i860 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i861 = data
  i860.m_UiScaleMode = i861[0]
  i860.m_ReferencePixelsPerUnit = i861[1]
  i860.m_ScaleFactor = i861[2]
  i860.m_ReferenceResolution = new pc.Vec2( i861[3], i861[4] )
  i860.m_ScreenMatchMode = i861[5]
  i860.m_MatchWidthOrHeight = i861[6]
  i860.m_PhysicalUnit = i861[7]
  i860.m_FallbackScreenDPI = i861[8]
  i860.m_DefaultSpriteDPI = i861[9]
  i860.m_DynamicPixelsPerUnit = i861[10]
  i860.m_PresetInfoIsWorld = !!i861[11]
  return i860
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i862 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i863 = data
  i862.m_IgnoreReversedGraphics = !!i863[0]
  i862.m_BlockingObjects = i863[1]
  i862.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i863[2] )
  return i862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i865 = data
  i864.cullTransparentMesh = !!i865[0]
  return i864
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i866 = root || request.c( 'UnityEngine.UI.Image' )
  var i867 = data
  request.r(i867[0], i867[1], 0, i866, 'm_Sprite')
  i866.m_Type = i867[2]
  i866.m_PreserveAspect = !!i867[3]
  i866.m_FillCenter = !!i867[4]
  i866.m_FillMethod = i867[5]
  i866.m_FillAmount = i867[6]
  i866.m_FillClockwise = !!i867[7]
  i866.m_FillOrigin = i867[8]
  i866.m_UseSpriteMesh = !!i867[9]
  i866.m_PixelsPerUnitMultiplier = i867[10]
  request.r(i867[11], i867[12], 0, i866, 'm_Material')
  i866.m_Maskable = !!i867[13]
  i866.m_Color = new pc.Color(i867[14], i867[15], i867[16], i867[17])
  i866.m_RaycastTarget = !!i867[18]
  i866.m_RaycastPadding = new pc.Vec4( i867[19], i867[20], i867[21], i867[22] )
  return i866
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i868 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i869 = data
  i868.m_AspectMode = i869[0]
  i868.m_AspectRatio = i869[1]
  return i868
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i870 = root || request.c( 'UnityEngine.UI.Text' )
  var i871 = data
  i870.m_FontData = request.d('UnityEngine.UI.FontData', i871[0], i870.m_FontData)
  i870.m_Text = i871[1]
  request.r(i871[2], i871[3], 0, i870, 'm_Material')
  i870.m_Maskable = !!i871[4]
  i870.m_Color = new pc.Color(i871[5], i871[6], i871[7], i871[8])
  i870.m_RaycastTarget = !!i871[9]
  i870.m_RaycastPadding = new pc.Vec4( i871[10], i871[11], i871[12], i871[13] )
  return i870
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i872 = root || request.c( 'UnityEngine.UI.FontData' )
  var i873 = data
  request.r(i873[0], i873[1], 0, i872, 'm_Font')
  i872.m_FontSize = i873[2]
  i872.m_FontStyle = i873[3]
  i872.m_BestFit = !!i873[4]
  i872.m_MinSize = i873[5]
  i872.m_MaxSize = i873[6]
  i872.m_Alignment = i873[7]
  i872.m_AlignByGeometry = !!i873[8]
  i872.m_RichText = !!i873[9]
  i872.m_HorizontalOverflow = i873[10]
  i872.m_VerticalOverflow = i873[11]
  i872.m_LineSpacing = i873[12]
  return i872
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i874 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i875 = data
  i874.targetIsSelf = !!i875[0]
  request.r(i875[1], i875[2], 0, i874, 'targetGO')
  i874.tweenTargetIsTargetGO = !!i875[3]
  i874.delay = i875[4]
  i874.duration = i875[5]
  i874.easeType = i875[6]
  i874.easeCurve = new pc.AnimationCurve( { keys_flow: i875[7] } )
  i874.loopType = i875[8]
  i874.loops = i875[9]
  i874.id = i875[10]
  i874.isRelative = !!i875[11]
  i874.isFrom = !!i875[12]
  i874.isIndependentUpdate = !!i875[13]
  i874.autoKill = !!i875[14]
  i874.autoGenerate = !!i875[15]
  i874.isActive = !!i875[16]
  i874.isValid = !!i875[17]
  request.r(i875[18], i875[19], 0, i874, 'target')
  i874.animationType = i875[20]
  i874.targetType = i875[21]
  i874.forcedTargetType = i875[22]
  i874.autoPlay = !!i875[23]
  i874.useTargetAsV3 = !!i875[24]
  i874.endValueFloat = i875[25]
  i874.endValueV3 = new pc.Vec3( i875[26], i875[27], i875[28] )
  i874.endValueV2 = new pc.Vec2( i875[29], i875[30] )
  i874.endValueColor = new pc.Color(i875[31], i875[32], i875[33], i875[34])
  i874.endValueString = i875[35]
  i874.endValueRect = UnityEngine.Rect.MinMaxRect(i875[36], i875[37], i875[38], i875[39])
  request.r(i875[40], i875[41], 0, i874, 'endValueTransform')
  i874.optionalBool0 = !!i875[42]
  i874.optionalBool1 = !!i875[43]
  i874.optionalFloat0 = i875[44]
  i874.optionalInt0 = i875[45]
  i874.optionalRotationMode = i875[46]
  i874.optionalScrambleMode = i875[47]
  i874.optionalShakeRandomnessMode = i875[48]
  i874.optionalString = i875[49]
  i874.updateType = i875[50]
  i874.isSpeedBased = !!i875[51]
  i874.hasOnStart = !!i875[52]
  i874.hasOnPlay = !!i875[53]
  i874.hasOnUpdate = !!i875[54]
  i874.hasOnStepComplete = !!i875[55]
  i874.hasOnComplete = !!i875[56]
  i874.hasOnTweenCreated = !!i875[57]
  i874.hasOnRewind = !!i875[58]
  i874.onStart = request.d('UnityEngine.Events.UnityEvent', i875[59], i874.onStart)
  i874.onPlay = request.d('UnityEngine.Events.UnityEvent', i875[60], i874.onPlay)
  i874.onUpdate = request.d('UnityEngine.Events.UnityEvent', i875[61], i874.onUpdate)
  i874.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i875[62], i874.onStepComplete)
  i874.onComplete = request.d('UnityEngine.Events.UnityEvent', i875[63], i874.onComplete)
  i874.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i875[64], i874.onTweenCreated)
  i874.onRewind = request.d('UnityEngine.Events.UnityEvent', i875[65], i874.onRewind)
  return i874
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i876 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i877 = data
  i876.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i877[0], i876.m_PersistentCalls)
  return i876
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i878 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i879 = data
  var i881 = i879[0]
  var i880 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i881.length; i += 1) {
    i880.add(request.d('UnityEngine.Events.PersistentCall', i881[i + 0]));
  }
  i878.m_Calls = i880
  return i878
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i884 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i885 = data
  request.r(i885[0], i885[1], 0, i884, 'm_Target')
  i884.m_TargetAssemblyTypeName = i885[2]
  i884.m_MethodName = i885[3]
  i884.m_Mode = i885[4]
  i884.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i885[5], i884.m_Arguments)
  i884.m_CallState = i885[6]
  return i884
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i886 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i887 = data
  request.r(i887[0], i887[1], 0, i886, 'm_Texture')
  i886.m_UVRect = UnityEngine.Rect.MinMaxRect(i887[2], i887[3], i887[4], i887[5])
  request.r(i887[6], i887[7], 0, i886, 'm_Material')
  i886.m_Maskable = !!i887[8]
  i886.m_Color = new pc.Color(i887[9], i887[10], i887[11], i887[12])
  i886.m_RaycastTarget = !!i887[13]
  i886.m_RaycastPadding = new pc.Vec4( i887[14], i887[15], i887[16], i887[17] )
  return i886
}

Deserializers["TutController"] = function (request, data, root) {
  var i888 = root || request.c( 'TutController' )
  var i889 = data
  request.r(i889[0], i889[1], 0, i888, 'leftCard')
  request.r(i889[2], i889[3], 0, i888, 'rightCard')
  i888.leftPos = new pc.Vec2( i889[4], i889[5] )
  i888.rightPos = new pc.Vec2( i889[6], i889[7] )
  request.r(i889[8], i889[9], 0, i888, 'tut')
  i888.timeMove = i889[10]
  i888.timeDelay = i889[11]
  return i888
}

Deserializers["UnityEngine.UI.Mask"] = function (request, data, root) {
  var i890 = root || request.c( 'UnityEngine.UI.Mask' )
  var i891 = data
  i890.m_ShowMaskGraphic = !!i891[0]
  return i890
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i892 = root || request.c( 'UnityEngine.UI.Button' )
  var i893 = data
  i892.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i893[0], i892.m_OnClick)
  i892.m_Navigation = request.d('UnityEngine.UI.Navigation', i893[1], i892.m_Navigation)
  i892.m_Transition = i893[2]
  i892.m_Colors = request.d('UnityEngine.UI.ColorBlock', i893[3], i892.m_Colors)
  i892.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i893[4], i892.m_SpriteState)
  i892.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i893[5], i892.m_AnimationTriggers)
  i892.m_Interactable = !!i893[6]
  request.r(i893[7], i893[8], 0, i892, 'm_TargetGraphic')
  return i892
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i894 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i895 = data
  i894.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i895[0], i894.m_PersistentCalls)
  return i894
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i896 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i897 = data
  i896.m_Mode = i897[0]
  i896.m_WrapAround = !!i897[1]
  request.r(i897[2], i897[3], 0, i896, 'm_SelectOnUp')
  request.r(i897[4], i897[5], 0, i896, 'm_SelectOnDown')
  request.r(i897[6], i897[7], 0, i896, 'm_SelectOnLeft')
  request.r(i897[8], i897[9], 0, i896, 'm_SelectOnRight')
  return i896
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i898 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i899 = data
  i898.m_NormalColor = new pc.Color(i899[0], i899[1], i899[2], i899[3])
  i898.m_HighlightedColor = new pc.Color(i899[4], i899[5], i899[6], i899[7])
  i898.m_PressedColor = new pc.Color(i899[8], i899[9], i899[10], i899[11])
  i898.m_SelectedColor = new pc.Color(i899[12], i899[13], i899[14], i899[15])
  i898.m_DisabledColor = new pc.Color(i899[16], i899[17], i899[18], i899[19])
  i898.m_ColorMultiplier = i899[20]
  i898.m_FadeDuration = i899[21]
  return i898
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i900 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i901 = data
  request.r(i901[0], i901[1], 0, i900, 'm_HighlightedSprite')
  request.r(i901[2], i901[3], 0, i900, 'm_PressedSprite')
  request.r(i901[4], i901[5], 0, i900, 'm_SelectedSprite')
  request.r(i901[6], i901[7], 0, i900, 'm_DisabledSprite')
  return i900
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i902 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i903 = data
  i902.m_NormalTrigger = i903[0]
  i902.m_HighlightedTrigger = i903[1]
  i902.m_PressedTrigger = i903[2]
  i902.m_SelectedTrigger = i903[3]
  i902.m_DisabledTrigger = i903[4]
  return i902
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i904 = root || request.c( 'LayoutController' )
  var i905 = data
  request.r(i905[0], i905[1], 0, i904, 'cardParent')
  request.r(i905[2], i905[3], 0, i904, 'leftCard')
  request.r(i905[4], i905[5], 0, i904, 'rightCard')
  i904.origin = new pc.Vec2( i905[6], i905[7] )
  i904.smallSize = new pc.Vec2( i905[8], i905[9] )
  return i904
}

Deserializers["LunaController"] = function (request, data, root) {
  var i906 = root || request.c( 'LunaController' )
  var i907 = data
  i906.TimePlay = i907[0]
  i906.LimitTimePlay = !!i907[1]
  i906.UsePixelArt = !!i907[2]
  request.r(i907[3], i907[4], 0, i906, 'BGM')
  request.r(i907[5], i907[6], 0, i906, 'normalLeft')
  request.r(i907[7], i907[8], 0, i906, 'pixelLeft')
  request.r(i907[9], i907[10], 0, i906, 'normalRight')
  request.r(i907[11], i907[12], 0, i906, 'pixelRight')
  request.r(i907[13], i907[14], 0, i906, 'musicSource')
  request.r(i907[15], i907[16], 0, i906, 'endCard')
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i908 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i909 = data
  request.r(i909[0], i909[1], 0, i908, 'clip')
  request.r(i909[2], i909[3], 0, i908, 'outputAudioMixerGroup')
  i908.playOnAwake = !!i909[4]
  i908.loop = !!i909[5]
  i908.time = i909[6]
  i908.volume = i909[7]
  i908.pitch = i909[8]
  i908.enabled = !!i909[9]
  return i908
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i911 = data
  i910.ambientIntensity = i911[0]
  i910.reflectionIntensity = i911[1]
  i910.ambientMode = i911[2]
  i910.ambientLight = new pc.Color(i911[3], i911[4], i911[5], i911[6])
  i910.ambientSkyColor = new pc.Color(i911[7], i911[8], i911[9], i911[10])
  i910.ambientGroundColor = new pc.Color(i911[11], i911[12], i911[13], i911[14])
  i910.ambientEquatorColor = new pc.Color(i911[15], i911[16], i911[17], i911[18])
  i910.fogColor = new pc.Color(i911[19], i911[20], i911[21], i911[22])
  i910.fogEndDistance = i911[23]
  i910.fogStartDistance = i911[24]
  i910.fogDensity = i911[25]
  i910.fog = !!i911[26]
  request.r(i911[27], i911[28], 0, i910, 'skybox')
  i910.fogMode = i911[29]
  var i913 = i911[30]
  var i912 = []
  for(var i = 0; i < i913.length; i += 1) {
    i912.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i913[i + 0]) );
  }
  i910.lightmaps = i912
  i910.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i911[31], i910.lightProbes)
  i910.lightmapsMode = i911[32]
  i910.mixedBakeMode = i911[33]
  i910.environmentLightingMode = i911[34]
  i910.ambientProbe = new pc.SphericalHarmonicsL2(i911[35])
  request.r(i911[36], i911[37], 0, i910, 'customReflection')
  request.r(i911[38], i911[39], 0, i910, 'defaultReflection')
  i910.defaultReflectionMode = i911[40]
  i910.defaultReflectionResolution = i911[41]
  i910.sunLightObjectId = i911[42]
  i910.pixelLightCount = i911[43]
  i910.defaultReflectionHDR = !!i911[44]
  i910.hasLightDataAsset = !!i911[45]
  i910.hasManualGenerate = !!i911[46]
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i916 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i917 = data
  request.r(i917[0], i917[1], 0, i916, 'lightmapColor')
  request.r(i917[2], i917[3], 0, i916, 'lightmapDirection')
  request.r(i917[4], i917[5], 0, i916, 'shadowMask')
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i918 = root || new UnityEngine.LightProbes()
  var i919 = data
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i926 = root || new pc.UnityMaterial()
  var i927 = data
  i926.name = i927[0]
  request.r(i927[1], i927[2], 0, i926, 'shader')
  i926.renderQueue = i927[3]
  i926.enableInstancing = !!i927[4]
  var i929 = i927[5]
  var i928 = []
  for(var i = 0; i < i929.length; i += 1) {
    i928.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i929[i + 0]) );
  }
  i926.floatParameters = i928
  var i931 = i927[6]
  var i930 = []
  for(var i = 0; i < i931.length; i += 1) {
    i930.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i931[i + 0]) );
  }
  i926.colorParameters = i930
  var i933 = i927[7]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i933[i + 0]) );
  }
  i926.vectorParameters = i932
  var i935 = i927[8]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i935[i + 0]) );
  }
  i926.textureParameters = i934
  var i937 = i927[9]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i937[i + 0]) );
  }
  i926.materialFlags = i936
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i941 = data
  i940.name = i941[0]
  i940.value = i941[1]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i945 = data
  i944.name = i945[0]
  i944.value = new pc.Color(i945[1], i945[2], i945[3], i945[4])
  return i944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i949 = data
  i948.name = i949[0]
  i948.value = new pc.Vec4( i949[1], i949[2], i949[3], i949[4] )
  return i948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i953 = data
  i952.name = i953[0]
  request.r(i953[1], i953[2], 0, i952, 'value')
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i957 = data
  i956.name = i957[0]
  i956.enabled = !!i957[1]
  return i956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i959 = data
  var i961 = i959[0]
  var i960 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i961.length; i += 1) {
    i960.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i961[i + 0]));
  }
  i958.ShaderCompilationErrors = i960
  i958.name = i959[1]
  i958.guid = i959[2]
  var i963 = i959[3]
  var i962 = []
  for(var i = 0; i < i963.length; i += 1) {
    i962.push( i963[i + 0] );
  }
  i958.shaderDefinedKeywords = i962
  var i965 = i959[4]
  var i964 = []
  for(var i = 0; i < i965.length; i += 1) {
    i964.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i965[i + 0]) );
  }
  i958.passes = i964
  var i967 = i959[5]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i967[i + 0]) );
  }
  i958.usePasses = i966
  var i969 = i959[6]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i969[i + 0]) );
  }
  i958.defaultParameterValues = i968
  request.r(i959[7], i959[8], 0, i958, 'unityFallbackShader')
  i958.readDepth = !!i959[9]
  i958.hasDepthOnlyPass = !!i959[10]
  i958.isCreatedByShaderGraph = !!i959[11]
  i958.disableBatching = !!i959[12]
  i958.compiled = !!i959[13]
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i973 = data
  i972.shaderName = i973[0]
  i972.errorMessage = i973[1]
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i978 = root || new pc.UnityShaderPass()
  var i979 = data
  i978.id = i979[0]
  i978.subShaderIndex = i979[1]
  i978.name = i979[2]
  i978.passType = i979[3]
  i978.grabPassTextureName = i979[4]
  i978.usePass = !!i979[5]
  i978.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[6], i978.zTest)
  i978.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[7], i978.zWrite)
  i978.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[8], i978.culling)
  i978.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i979[9], i978.blending)
  i978.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i979[10], i978.alphaBlending)
  i978.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[11], i978.colorWriteMask)
  i978.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[12], i978.offsetUnits)
  i978.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[13], i978.offsetFactor)
  i978.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[14], i978.stencilRef)
  i978.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[15], i978.stencilReadMask)
  i978.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i979[16], i978.stencilWriteMask)
  i978.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i979[17], i978.stencilOp)
  i978.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i979[18], i978.stencilOpFront)
  i978.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i979[19], i978.stencilOpBack)
  var i981 = i979[20]
  var i980 = []
  for(var i = 0; i < i981.length; i += 1) {
    i980.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i981[i + 0]) );
  }
  i978.tags = i980
  var i983 = i979[21]
  var i982 = []
  for(var i = 0; i < i983.length; i += 1) {
    i982.push( i983[i + 0] );
  }
  i978.passDefinedKeywords = i982
  var i985 = i979[22]
  var i984 = []
  for(var i = 0; i < i985.length; i += 1) {
    i984.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i985[i + 0]) );
  }
  i978.passDefinedKeywordGroups = i984
  var i987 = i979[23]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i987[i + 0]) );
  }
  i978.variants = i986
  var i989 = i979[24]
  var i988 = []
  for(var i = 0; i < i989.length; i += 1) {
    i988.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i989[i + 0]) );
  }
  i978.excludedVariants = i988
  i978.hasDepthReader = !!i979[25]
  return i978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i990 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i991 = data
  i990.val = i991[0]
  i990.name = i991[1]
  return i990
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i992 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i993 = data
  i992.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i993[0], i992.src)
  i992.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i993[1], i992.dst)
  i992.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i993[2], i992.op)
  return i992
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i995 = data
  i994.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i995[0], i994.pass)
  i994.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i995[1], i994.fail)
  i994.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i995[2], i994.zFail)
  i994.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i995[3], i994.comp)
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i999 = data
  i998.name = i999[0]
  i998.value = i999[1]
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1003 = data
  var i1005 = i1003[0]
  var i1004 = []
  for(var i = 0; i < i1005.length; i += 1) {
    i1004.push( i1005[i + 0] );
  }
  i1002.keywords = i1004
  i1002.hasDiscard = !!i1003[1]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1009 = data
  i1008.passId = i1009[0]
  i1008.subShaderIndex = i1009[1]
  var i1011 = i1009[2]
  var i1010 = []
  for(var i = 0; i < i1011.length; i += 1) {
    i1010.push( i1011[i + 0] );
  }
  i1008.keywords = i1010
  i1008.vertexProgram = i1009[3]
  i1008.fragmentProgram = i1009[4]
  i1008.exportedForWebGl2 = !!i1009[5]
  i1008.readDepth = !!i1009[6]
  return i1008
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1014 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1015 = data
  request.r(i1015[0], i1015[1], 0, i1014, 'shader')
  i1014.pass = i1015[2]
  return i1014
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1019 = data
  i1018.name = i1019[0]
  i1018.type = i1019[1]
  i1018.value = new pc.Vec4( i1019[2], i1019[3], i1019[4], i1019[5] )
  i1018.textureValue = i1019[6]
  i1018.shaderPropertyFlag = i1019[7]
  return i1018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1020 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1021 = data
  i1020.name = i1021[0]
  request.r(i1021[1], i1021[2], 0, i1020, 'texture')
  i1020.aabb = i1021[3]
  i1020.vertices = i1021[4]
  i1020.triangles = i1021[5]
  i1020.textureRect = UnityEngine.Rect.MinMaxRect(i1021[6], i1021[7], i1021[8], i1021[9])
  i1020.packedRect = UnityEngine.Rect.MinMaxRect(i1021[10], i1021[11], i1021[12], i1021[13])
  i1020.border = new pc.Vec4( i1021[14], i1021[15], i1021[16], i1021[17] )
  i1020.transparency = i1021[18]
  i1020.bounds = i1021[19]
  i1020.pixelsPerUnit = i1021[20]
  i1020.textureWidth = i1021[21]
  i1020.textureHeight = i1021[22]
  i1020.nativeSize = new pc.Vec2( i1021[23], i1021[24] )
  i1020.pivot = new pc.Vec2( i1021[25], i1021[26] )
  i1020.textureRectOffset = new pc.Vec2( i1021[27], i1021[28] )
  return i1020
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1023 = data
  i1022.name = i1023[0]
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1024 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1025 = data
  i1024.name = i1025[0]
  i1024.ascent = i1025[1]
  i1024.originalLineHeight = i1025[2]
  i1024.fontSize = i1025[3]
  var i1027 = i1025[4]
  var i1026 = []
  for(var i = 0; i < i1027.length; i += 1) {
    i1026.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1027[i + 0]) );
  }
  i1024.characterInfo = i1026
  request.r(i1025[5], i1025[6], 0, i1024, 'texture')
  i1024.originalFontSize = i1025[7]
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1030 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1031 = data
  i1030.index = i1031[0]
  i1030.advance = i1031[1]
  i1030.bearing = i1031[2]
  i1030.glyphWidth = i1031[3]
  i1030.glyphHeight = i1031[4]
  i1030.minX = i1031[5]
  i1030.maxX = i1031[6]
  i1030.minY = i1031[7]
  i1030.maxY = i1031[8]
  i1030.uvBottomLeftX = i1031[9]
  i1030.uvBottomLeftY = i1031[10]
  i1030.uvBottomRightX = i1031[11]
  i1030.uvBottomRightY = i1031[12]
  i1030.uvTopLeftX = i1031[13]
  i1030.uvTopLeftY = i1031[14]
  i1030.uvTopRightX = i1031[15]
  i1030.uvTopRightY = i1031[16]
  return i1030
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1032 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1033 = data
  i1032.useSafeMode = !!i1033[0]
  i1032.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1033[1], i1032.safeModeOptions)
  i1032.timeScale = i1033[2]
  i1032.unscaledTimeScale = i1033[3]
  i1032.useSmoothDeltaTime = !!i1033[4]
  i1032.maxSmoothUnscaledTime = i1033[5]
  i1032.rewindCallbackMode = i1033[6]
  i1032.showUnityEditorReport = !!i1033[7]
  i1032.logBehaviour = i1033[8]
  i1032.drawGizmos = !!i1033[9]
  i1032.defaultRecyclable = !!i1033[10]
  i1032.defaultAutoPlay = i1033[11]
  i1032.defaultUpdateType = i1033[12]
  i1032.defaultTimeScaleIndependent = !!i1033[13]
  i1032.defaultEaseType = i1033[14]
  i1032.defaultEaseOvershootOrAmplitude = i1033[15]
  i1032.defaultEasePeriod = i1033[16]
  i1032.defaultAutoKill = !!i1033[17]
  i1032.defaultLoopType = i1033[18]
  i1032.debugMode = !!i1033[19]
  i1032.debugStoreTargetId = !!i1033[20]
  i1032.showPreviewPanel = !!i1033[21]
  i1032.storeSettingsLocation = i1033[22]
  i1032.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1033[23], i1032.modules)
  i1032.createASMDEF = !!i1033[24]
  i1032.showPlayingTweens = !!i1033[25]
  i1032.showPausedTweens = !!i1033[26]
  return i1032
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1034 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1035 = data
  i1034.logBehaviour = i1035[0]
  i1034.nestedTweenFailureBehaviour = i1035[1]
  return i1034
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1036 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1037 = data
  i1036.showPanel = !!i1037[0]
  i1036.audioEnabled = !!i1037[1]
  i1036.physicsEnabled = !!i1037[2]
  i1036.physics2DEnabled = !!i1037[3]
  i1036.spriteEnabled = !!i1037[4]
  i1036.uiEnabled = !!i1037[5]
  i1036.textMeshProEnabled = !!i1037[6]
  i1036.tk2DEnabled = !!i1037[7]
  i1036.deAudioEnabled = !!i1037[8]
  i1036.deUnityExtendedEnabled = !!i1037[9]
  i1036.epoOutlineEnabled = !!i1037[10]
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1038 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1039 = data
  var i1041 = i1039[0]
  var i1040 = []
  for(var i = 0; i < i1041.length; i += 1) {
    i1040.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1041[i + 0]) );
  }
  i1038.files = i1040
  i1038.componentToPrefabIds = i1039[1]
  return i1038
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1045 = data
  i1044.path = i1045[0]
  request.r(i1045[1], i1045[2], 0, i1044, 'unityObject')
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1046 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1047 = data
  var i1049 = i1047[0]
  var i1048 = []
  for(var i = 0; i < i1049.length; i += 1) {
    i1048.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1049[i + 0]) );
  }
  i1046.scriptsExecutionOrder = i1048
  var i1051 = i1047[1]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 1) {
    i1050.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1051[i + 0]) );
  }
  i1046.sortingLayers = i1050
  var i1053 = i1047[2]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 1) {
    i1052.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1053[i + 0]) );
  }
  i1046.cullingLayers = i1052
  i1046.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1047[3], i1046.timeSettings)
  i1046.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1047[4], i1046.physicsSettings)
  i1046.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1047[5], i1046.physics2DSettings)
  i1046.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1047[6], i1046.qualitySettings)
  i1046.enableRealtimeShadows = !!i1047[7]
  i1046.enableAutoInstancing = !!i1047[8]
  i1046.enableStaticBatching = !!i1047[9]
  i1046.enableDynamicBatching = !!i1047[10]
  i1046.usePreservativeDynamicBatching = !!i1047[11]
  i1046.lightmapEncodingQuality = i1047[12]
  i1046.desiredColorSpace = i1047[13]
  var i1055 = i1047[14]
  var i1054 = []
  for(var i = 0; i < i1055.length; i += 1) {
    i1054.push( i1055[i + 0] );
  }
  i1046.allTags = i1054
  return i1046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1059 = data
  i1058.name = i1059[0]
  i1058.value = i1059[1]
  return i1058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1063 = data
  i1062.id = i1063[0]
  i1062.name = i1063[1]
  i1062.value = i1063[2]
  return i1062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1067 = data
  i1066.id = i1067[0]
  i1066.name = i1067[1]
  return i1066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1069 = data
  i1068.fixedDeltaTime = i1069[0]
  i1068.maximumDeltaTime = i1069[1]
  i1068.timeScale = i1069[2]
  i1068.maximumParticleTimestep = i1069[3]
  return i1068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1071 = data
  i1070.gravity = new pc.Vec3( i1071[0], i1071[1], i1071[2] )
  i1070.defaultSolverIterations = i1071[3]
  i1070.bounceThreshold = i1071[4]
  i1070.autoSyncTransforms = !!i1071[5]
  i1070.autoSimulation = !!i1071[6]
  var i1073 = i1071[7]
  var i1072 = []
  for(var i = 0; i < i1073.length; i += 1) {
    i1072.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1073[i + 0]) );
  }
  i1070.collisionMatrix = i1072
  return i1070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1077 = data
  i1076.enabled = !!i1077[0]
  i1076.layerId = i1077[1]
  i1076.otherLayerId = i1077[2]
  return i1076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1078 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1079 = data
  request.r(i1079[0], i1079[1], 0, i1078, 'material')
  i1078.gravity = new pc.Vec2( i1079[2], i1079[3] )
  i1078.positionIterations = i1079[4]
  i1078.velocityIterations = i1079[5]
  i1078.velocityThreshold = i1079[6]
  i1078.maxLinearCorrection = i1079[7]
  i1078.maxAngularCorrection = i1079[8]
  i1078.maxTranslationSpeed = i1079[9]
  i1078.maxRotationSpeed = i1079[10]
  i1078.baumgarteScale = i1079[11]
  i1078.baumgarteTOIScale = i1079[12]
  i1078.timeToSleep = i1079[13]
  i1078.linearSleepTolerance = i1079[14]
  i1078.angularSleepTolerance = i1079[15]
  i1078.defaultContactOffset = i1079[16]
  i1078.autoSimulation = !!i1079[17]
  i1078.queriesHitTriggers = !!i1079[18]
  i1078.queriesStartInColliders = !!i1079[19]
  i1078.callbacksOnDisable = !!i1079[20]
  i1078.reuseCollisionCallbacks = !!i1079[21]
  i1078.autoSyncTransforms = !!i1079[22]
  var i1081 = i1079[23]
  var i1080 = []
  for(var i = 0; i < i1081.length; i += 1) {
    i1080.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1081[i + 0]) );
  }
  i1078.collisionMatrix = i1080
  return i1078
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1085 = data
  i1084.enabled = !!i1085[0]
  i1084.layerId = i1085[1]
  i1084.otherLayerId = i1085[2]
  return i1084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1087 = data
  var i1089 = i1087[0]
  var i1088 = []
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1089[i + 0]) );
  }
  i1086.qualityLevels = i1088
  var i1091 = i1087[1]
  var i1090 = []
  for(var i = 0; i < i1091.length; i += 1) {
    i1090.push( i1091[i + 0] );
  }
  i1086.names = i1090
  i1086.shadows = i1087[2]
  i1086.anisotropicFiltering = i1087[3]
  i1086.antiAliasing = i1087[4]
  i1086.lodBias = i1087[5]
  i1086.shadowCascades = i1087[6]
  i1086.shadowDistance = i1087[7]
  i1086.shadowmaskMode = i1087[8]
  i1086.shadowProjection = i1087[9]
  i1086.shadowResolution = i1087[10]
  i1086.softParticles = !!i1087[11]
  i1086.softVegetation = !!i1087[12]
  i1086.activeColorSpace = i1087[13]
  i1086.desiredColorSpace = i1087[14]
  i1086.masterTextureLimit = i1087[15]
  i1086.maxQueuedFrames = i1087[16]
  i1086.particleRaycastBudget = i1087[17]
  i1086.pixelLightCount = i1087[18]
  i1086.realtimeReflectionProbes = !!i1087[19]
  i1086.shadowCascade2Split = i1087[20]
  i1086.shadowCascade4Split = new pc.Vec3( i1087[21], i1087[22], i1087[23] )
  i1086.streamingMipmapsActive = !!i1087[24]
  i1086.vSyncCount = i1087[25]
  i1086.asyncUploadBufferSize = i1087[26]
  i1086.asyncUploadTimeSlice = i1087[27]
  i1086.billboardsFaceCameraPosition = !!i1087[28]
  i1086.shadowNearPlaneOffset = i1087[29]
  i1086.streamingMipmapsMemoryBudget = i1087[30]
  i1086.maximumLODLevel = i1087[31]
  i1086.streamingMipmapsAddAllCameras = !!i1087[32]
  i1086.streamingMipmapsMaxLevelReduction = i1087[33]
  i1086.streamingMipmapsRenderersPerFrame = i1087[34]
  i1086.resolutionScalingFixedDPIFactor = i1087[35]
  i1086.streamingMipmapsMaxFileIORequests = i1087[36]
  i1086.currentQualityLevel = i1087[37]
  return i1086
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1094 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1095 = data
  request.r(i1095[0], i1095[1], 0, i1094, 'm_ObjectArgument')
  i1094.m_ObjectArgumentAssemblyTypeName = i1095[2]
  i1094.m_IntArgument = i1095[3]
  i1094.m_FloatArgument = i1095[4]
  i1094.m_StringArgument = i1095[5]
  i1094.m_BoolArgument = !!i1095[6]
  return i1094
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"29":[30],"31":[30],"32":[30],"33":[30],"34":[30],"35":[30],"36":[37],"38":[0],"39":[40],"41":[40],"42":[40],"43":[40],"44":[40],"45":[40],"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[47],"54":[47],"55":[47],"56":[47],"57":[47],"58":[47],"59":[47],"60":[0],"61":[62],"63":[64],"65":[64],"6":[5],"66":[67],"68":[0],"69":[70],"71":[5],"72":[9,5],"73":[62],"74":[9,5],"75":[5],"76":[5],"77":[62,5],"78":[5,9],"79":[80],"81":[80],"82":[80],"83":[5],"84":[5],"8":[6],"10":[9,5],"12":[5],"7":[6],"85":[5],"86":[5],"87":[5],"88":[5],"89":[5],"90":[5],"91":[5],"20":[5],"92":[5],"17":[9,5],"93":[5],"94":[5],"95":[5],"96":[5],"13":[9,5],"97":[5],"98":[3],"99":[3],"4":[3],"100":[3],"101":[0],"102":[0]}

Deserializers.types = ["UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.RawImage","UnityEngine.Texture2D","TutController","UnityEngine.UI.Mask","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AudioSource","UnityEngine.Shader","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "08/04/2026 03:57:56";

Deserializers.lunaDaysRunning = "8.2";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "RBP_V01_DungNV_TamNTM";

Deserializers.lunaAppID = "41891";

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

Deserializers.buildID = "f7e64bd7-802d-420c-ac70-afc2592313ca";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

