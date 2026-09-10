var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i3780 = root || request.c( 'UnityEngine.JointSpring' )
  var i3781 = data
  i3780.spring = i3781[0]
  i3780.damper = i3781[1]
  i3780.targetPosition = i3781[2]
  return i3780
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i3782 = root || request.c( 'UnityEngine.JointMotor' )
  var i3783 = data
  i3782.m_TargetVelocity = i3783[0]
  i3782.m_Force = i3783[1]
  i3782.m_FreeSpin = i3783[2]
  return i3782
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i3784 = root || request.c( 'UnityEngine.JointLimits' )
  var i3785 = data
  i3784.m_Min = i3785[0]
  i3784.m_Max = i3785[1]
  i3784.m_Bounciness = i3785[2]
  i3784.m_BounceMinVelocity = i3785[3]
  i3784.m_ContactDistance = i3785[4]
  i3784.minBounce = i3785[5]
  i3784.maxBounce = i3785[6]
  return i3784
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i3786 = root || request.c( 'UnityEngine.JointDrive' )
  var i3787 = data
  i3786.m_PositionSpring = i3787[0]
  i3786.m_PositionDamper = i3787[1]
  i3786.m_MaximumForce = i3787[2]
  i3786.m_UseAcceleration = i3787[3]
  return i3786
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i3788 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i3789 = data
  i3788.m_Spring = i3789[0]
  i3788.m_Damper = i3789[1]
  return i3788
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i3790 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i3791 = data
  i3790.m_Limit = i3791[0]
  i3790.m_Bounciness = i3791[1]
  i3790.m_ContactDistance = i3791[2]
  return i3790
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i3792 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i3793 = data
  i3792.m_ExtremumSlip = i3793[0]
  i3792.m_ExtremumValue = i3793[1]
  i3792.m_AsymptoteSlip = i3793[2]
  i3792.m_AsymptoteValue = i3793[3]
  i3792.m_Stiffness = i3793[4]
  return i3792
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i3794 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i3795 = data
  i3794.m_LowerAngle = i3795[0]
  i3794.m_UpperAngle = i3795[1]
  return i3794
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i3796 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i3797 = data
  i3796.m_MotorSpeed = i3797[0]
  i3796.m_MaximumMotorTorque = i3797[1]
  return i3796
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i3798 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i3799 = data
  i3798.m_DampingRatio = i3799[0]
  i3798.m_Frequency = i3799[1]
  i3798.m_Angle = i3799[2]
  return i3798
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i3800 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i3801 = data
  i3800.m_LowerTranslation = i3801[0]
  i3800.m_UpperTranslation = i3801[1]
  return i3800
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i3802 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i3803 = data
  i3802.name = i3803[0]
  i3802.width = i3803[1]
  i3802.height = i3803[2]
  i3802.mipmapCount = i3803[3]
  i3802.anisoLevel = i3803[4]
  i3802.filterMode = i3803[5]
  i3802.hdr = !!i3803[6]
  i3802.format = i3803[7]
  i3802.wrapMode = i3803[8]
  i3802.alphaIsTransparency = !!i3803[9]
  i3802.alphaSource = i3803[10]
  i3802.graphicsFormat = i3803[11]
  i3802.sRGBTexture = !!i3803[12]
  i3802.desiredColorSpace = i3803[13]
  i3802.wrapU = i3803[14]
  i3802.wrapV = i3803[15]
  return i3802
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i3804 = root || new pc.UnityMaterial()
  var i3805 = data
  i3804.name = i3805[0]
  request.r(i3805[1], i3805[2], 0, i3804, 'shader')
  i3804.renderQueue = i3805[3]
  i3804.enableInstancing = !!i3805[4]
  var i3807 = i3805[5]
  var i3806 = []
  for(var i = 0; i < i3807.length; i += 1) {
    i3806.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i3807[i + 0]) );
  }
  i3804.floatParameters = i3806
  var i3809 = i3805[6]
  var i3808 = []
  for(var i = 0; i < i3809.length; i += 1) {
    i3808.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i3809[i + 0]) );
  }
  i3804.colorParameters = i3808
  var i3811 = i3805[7]
  var i3810 = []
  for(var i = 0; i < i3811.length; i += 1) {
    i3810.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i3811[i + 0]) );
  }
  i3804.vectorParameters = i3810
  var i3813 = i3805[8]
  var i3812 = []
  for(var i = 0; i < i3813.length; i += 1) {
    i3812.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i3813[i + 0]) );
  }
  i3804.textureParameters = i3812
  var i3815 = i3805[9]
  var i3814 = []
  for(var i = 0; i < i3815.length; i += 1) {
    i3814.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i3815[i + 0]) );
  }
  i3804.materialFlags = i3814
  return i3804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i3818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i3819 = data
  i3818.name = i3819[0]
  i3818.value = i3819[1]
  return i3818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i3822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i3823 = data
  i3822.name = i3823[0]
  i3822.value = new pc.Color(i3823[1], i3823[2], i3823[3], i3823[4])
  return i3822
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i3826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i3827 = data
  i3826.name = i3827[0]
  i3826.value = new pc.Vec4( i3827[1], i3827[2], i3827[3], i3827[4] )
  return i3826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i3830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i3831 = data
  i3830.name = i3831[0]
  request.r(i3831[1], i3831[2], 0, i3830, 'value')
  return i3830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i3834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i3835 = data
  i3834.name = i3835[0]
  i3834.enabled = !!i3835[1]
  return i3834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i3836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i3837 = data
  i3836.name = i3837[0]
  i3836.index = i3837[1]
  i3836.startup = !!i3837[2]
  return i3836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i3838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i3839 = data
  i3838.aspect = i3839[0]
  i3838.orthographic = !!i3839[1]
  i3838.orthographicSize = i3839[2]
  i3838.backgroundColor = new pc.Color(i3839[3], i3839[4], i3839[5], i3839[6])
  i3838.nearClipPlane = i3839[7]
  i3838.farClipPlane = i3839[8]
  i3838.fieldOfView = i3839[9]
  i3838.depth = i3839[10]
  i3838.clearFlags = i3839[11]
  i3838.cullingMask = i3839[12]
  i3838.rect = i3839[13]
  request.r(i3839[14], i3839[15], 0, i3838, 'targetTexture')
  i3838.usePhysicalProperties = !!i3839[16]
  i3838.focalLength = i3839[17]
  i3838.sensorSize = new pc.Vec2( i3839[18], i3839[19] )
  i3838.lensShift = new pc.Vec2( i3839[20], i3839[21] )
  i3838.gateFit = i3839[22]
  i3838.commandBufferCount = i3839[23]
  i3838.cameraType = i3839[24]
  i3838.enabled = !!i3839[25]
  return i3838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i3840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i3841 = data
  i3840.name = i3841[0]
  i3840.tagId = i3841[1]
  i3840.enabled = !!i3841[2]
  i3840.isStatic = !!i3841[3]
  i3840.layer = i3841[4]
  return i3840
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i3842 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i3843 = data
  request.r(i3843[0], i3843[1], 0, i3842, 'm_FirstSelected')
  i3842.m_sendNavigationEvents = !!i3843[2]
  i3842.m_DragThreshold = i3843[3]
  return i3842
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i3844 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i3845 = data
  i3844.m_HorizontalAxis = i3845[0]
  i3844.m_VerticalAxis = i3845[1]
  i3844.m_SubmitButton = i3845[2]
  i3844.m_CancelButton = i3845[3]
  i3844.m_InputActionsPerSecond = i3845[4]
  i3844.m_RepeatDelay = i3845[5]
  i3844.m_ForceModuleActive = !!i3845[6]
  i3844.m_SendPointerHoverToParent = !!i3845[7]
  return i3844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i3846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i3847 = data
  i3846.pivot = new pc.Vec2( i3847[0], i3847[1] )
  i3846.anchorMin = new pc.Vec2( i3847[2], i3847[3] )
  i3846.anchorMax = new pc.Vec2( i3847[4], i3847[5] )
  i3846.sizeDelta = new pc.Vec2( i3847[6], i3847[7] )
  i3846.anchoredPosition3D = new pc.Vec3( i3847[8], i3847[9], i3847[10] )
  i3846.rotation = new pc.Quat(i3847[11], i3847[12], i3847[13], i3847[14])
  i3846.scale = new pc.Vec3( i3847[15], i3847[16], i3847[17] )
  return i3846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i3848 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i3849 = data
  i3848.planeDistance = i3849[0]
  i3848.referencePixelsPerUnit = i3849[1]
  i3848.isFallbackOverlay = !!i3849[2]
  i3848.renderMode = i3849[3]
  i3848.renderOrder = i3849[4]
  i3848.sortingLayerName = i3849[5]
  i3848.sortingOrder = i3849[6]
  i3848.scaleFactor = i3849[7]
  request.r(i3849[8], i3849[9], 0, i3848, 'worldCamera')
  i3848.overrideSorting = !!i3849[10]
  i3848.pixelPerfect = !!i3849[11]
  i3848.targetDisplay = i3849[12]
  i3848.overridePixelPerfect = !!i3849[13]
  i3848.enabled = !!i3849[14]
  return i3848
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i3850 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i3851 = data
  i3850.m_UiScaleMode = i3851[0]
  i3850.m_ReferencePixelsPerUnit = i3851[1]
  i3850.m_ScaleFactor = i3851[2]
  i3850.m_ReferenceResolution = new pc.Vec2( i3851[3], i3851[4] )
  i3850.m_ScreenMatchMode = i3851[5]
  i3850.m_MatchWidthOrHeight = i3851[6]
  i3850.m_PhysicalUnit = i3851[7]
  i3850.m_FallbackScreenDPI = i3851[8]
  i3850.m_DefaultSpriteDPI = i3851[9]
  i3850.m_DynamicPixelsPerUnit = i3851[10]
  i3850.m_PresetInfoIsWorld = !!i3851[11]
  return i3850
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i3852 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i3853 = data
  i3852.m_IgnoreReversedGraphics = !!i3853[0]
  i3852.m_BlockingObjects = i3853[1]
  i3852.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i3853[2] )
  return i3852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i3854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i3855 = data
  i3854.cullTransparentMesh = !!i3855[0]
  return i3854
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i3856 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i3857 = data
  i3856.m_AspectMode = i3857[0]
  i3856.m_AspectRatio = i3857[1]
  return i3856
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i3858 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i3859 = data
  request.r(i3859[0], i3859[1], 0, i3858, 'm_Texture')
  i3858.m_UVRect = UnityEngine.Rect.MinMaxRect(i3859[2], i3859[3], i3859[4], i3859[5])
  request.r(i3859[6], i3859[7], 0, i3858, 'm_Material')
  i3858.m_Maskable = !!i3859[8]
  i3858.m_Color = new pc.Color(i3859[9], i3859[10], i3859[11], i3859[12])
  i3858.m_RaycastTarget = !!i3859[13]
  i3858.m_RaycastPadding = new pc.Vec4( i3859[14], i3859[15], i3859[16], i3859[17] )
  return i3858
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i3860 = root || request.c( 'UnityEngine.UI.Image' )
  var i3861 = data
  request.r(i3861[0], i3861[1], 0, i3860, 'm_Sprite')
  i3860.m_Type = i3861[2]
  i3860.m_PreserveAspect = !!i3861[3]
  i3860.m_FillCenter = !!i3861[4]
  i3860.m_FillMethod = i3861[5]
  i3860.m_FillAmount = i3861[6]
  i3860.m_FillClockwise = !!i3861[7]
  i3860.m_FillOrigin = i3861[8]
  i3860.m_UseSpriteMesh = !!i3861[9]
  i3860.m_PixelsPerUnitMultiplier = i3861[10]
  request.r(i3861[11], i3861[12], 0, i3860, 'm_Material')
  i3860.m_Maskable = !!i3861[13]
  i3860.m_Color = new pc.Color(i3861[14], i3861[15], i3861[16], i3861[17])
  i3860.m_RaycastTarget = !!i3861[18]
  i3860.m_RaycastPadding = new pc.Vec4( i3861[19], i3861[20], i3861[21], i3861[22] )
  return i3860
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i3862 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i3863 = data
  i3862.m_hasFontAssetChanged = !!i3863[0]
  request.r(i3863[1], i3863[2], 0, i3862, 'm_baseMaterial')
  i3862.m_maskOffset = new pc.Vec4( i3863[3], i3863[4], i3863[5], i3863[6] )
  i3862.m_text = i3863[7]
  i3862.m_isRightToLeft = !!i3863[8]
  request.r(i3863[9], i3863[10], 0, i3862, 'm_fontAsset')
  request.r(i3863[11], i3863[12], 0, i3862, 'm_sharedMaterial')
  var i3865 = i3863[13]
  var i3864 = []
  for(var i = 0; i < i3865.length; i += 2) {
  request.r(i3865[i + 0], i3865[i + 1], 2, i3864, '')
  }
  i3862.m_fontSharedMaterials = i3864
  request.r(i3863[14], i3863[15], 0, i3862, 'm_fontMaterial')
  var i3867 = i3863[16]
  var i3866 = []
  for(var i = 0; i < i3867.length; i += 2) {
  request.r(i3867[i + 0], i3867[i + 1], 2, i3866, '')
  }
  i3862.m_fontMaterials = i3866
  i3862.m_fontColor32 = UnityEngine.Color32.ConstructColor(i3863[17], i3863[18], i3863[19], i3863[20])
  i3862.m_fontColor = new pc.Color(i3863[21], i3863[22], i3863[23], i3863[24])
  i3862.m_enableVertexGradient = !!i3863[25]
  i3862.m_colorMode = i3863[26]
  i3862.m_fontColorGradient = request.d('TMPro.VertexGradient', i3863[27], i3862.m_fontColorGradient)
  request.r(i3863[28], i3863[29], 0, i3862, 'm_fontColorGradientPreset')
  request.r(i3863[30], i3863[31], 0, i3862, 'm_spriteAsset')
  i3862.m_tintAllSprites = !!i3863[32]
  request.r(i3863[33], i3863[34], 0, i3862, 'm_StyleSheet')
  i3862.m_TextStyleHashCode = i3863[35]
  i3862.m_overrideHtmlColors = !!i3863[36]
  i3862.m_faceColor = UnityEngine.Color32.ConstructColor(i3863[37], i3863[38], i3863[39], i3863[40])
  i3862.m_fontSize = i3863[41]
  i3862.m_fontSizeBase = i3863[42]
  i3862.m_fontWeight = i3863[43]
  i3862.m_enableAutoSizing = !!i3863[44]
  i3862.m_fontSizeMin = i3863[45]
  i3862.m_fontSizeMax = i3863[46]
  i3862.m_fontStyle = i3863[47]
  i3862.m_HorizontalAlignment = i3863[48]
  i3862.m_VerticalAlignment = i3863[49]
  i3862.m_textAlignment = i3863[50]
  i3862.m_characterSpacing = i3863[51]
  i3862.m_characterHorizontalScale = i3863[52]
  i3862.m_wordSpacing = i3863[53]
  i3862.m_lineSpacing = i3863[54]
  i3862.m_lineSpacingMax = i3863[55]
  i3862.m_paragraphSpacing = i3863[56]
  i3862.m_charWidthMaxAdj = i3863[57]
  i3862.m_TextWrappingMode = i3863[58]
  i3862.m_wordWrappingRatios = i3863[59]
  i3862.m_overflowMode = i3863[60]
  request.r(i3863[61], i3863[62], 0, i3862, 'm_linkedTextComponent')
  request.r(i3863[63], i3863[64], 0, i3862, 'parentLinkedComponent')
  i3862.m_enableKerning = !!i3863[65]
  var i3869 = i3863[66]
  var i3868 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i3869.length; i += 1) {
    i3868.add(i3869[i + 0]);
  }
  i3862.m_ActiveFontFeatures = i3868
  i3862.m_enableExtraPadding = !!i3863[67]
  i3862.checkPaddingRequired = !!i3863[68]
  i3862.m_isRichText = !!i3863[69]
  i3862.m_parseCtrlCharacters = !!i3863[70]
  i3862.m_isOrthographic = !!i3863[71]
  i3862.m_isCullingEnabled = !!i3863[72]
  i3862.m_horizontalMapping = i3863[73]
  i3862.m_verticalMapping = i3863[74]
  i3862.m_uvLineOffset = i3863[75]
  i3862.m_geometrySortingOrder = i3863[76]
  i3862.m_IsTextObjectScaleStatic = !!i3863[77]
  i3862.m_VertexBufferAutoSizeReduction = !!i3863[78]
  i3862.m_useMaxVisibleDescender = !!i3863[79]
  i3862.m_pageToDisplay = i3863[80]
  i3862.m_margin = new pc.Vec4( i3863[81], i3863[82], i3863[83], i3863[84] )
  i3862.m_isUsingLegacyAnimationComponent = !!i3863[85]
  i3862.m_isVolumetricText = !!i3863[86]
  request.r(i3863[87], i3863[88], 0, i3862, 'm_Material')
  i3862.m_EmojiFallbackSupport = !!i3863[89]
  i3862.m_Maskable = !!i3863[90]
  i3862.m_Color = new pc.Color(i3863[91], i3863[92], i3863[93], i3863[94])
  i3862.m_RaycastTarget = !!i3863[95]
  i3862.m_RaycastPadding = new pc.Vec4( i3863[96], i3863[97], i3863[98], i3863[99] )
  return i3862
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i3872 = root || request.c( 'TMPro.VertexGradient' )
  var i3873 = data
  i3872.topLeft = new pc.Color(i3873[0], i3873[1], i3873[2], i3873[3])
  i3872.topRight = new pc.Color(i3873[4], i3873[5], i3873[6], i3873[7])
  i3872.bottomLeft = new pc.Color(i3873[8], i3873[9], i3873[10], i3873[11])
  i3872.bottomRight = new pc.Color(i3873[12], i3873[13], i3873[14], i3873[15])
  return i3872
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i3876 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i3877 = data
  i3876.targetIsSelf = !!i3877[0]
  request.r(i3877[1], i3877[2], 0, i3876, 'targetGO')
  i3876.tweenTargetIsTargetGO = !!i3877[3]
  i3876.delay = i3877[4]
  i3876.duration = i3877[5]
  i3876.easeType = i3877[6]
  i3876.easeCurve = new pc.AnimationCurve( { keys_flow: i3877[7] } )
  i3876.loopType = i3877[8]
  i3876.loops = i3877[9]
  i3876.id = i3877[10]
  i3876.isRelative = !!i3877[11]
  i3876.isFrom = !!i3877[12]
  i3876.isIndependentUpdate = !!i3877[13]
  i3876.autoKill = !!i3877[14]
  i3876.autoGenerate = !!i3877[15]
  i3876.isActive = !!i3877[16]
  i3876.isValid = !!i3877[17]
  request.r(i3877[18], i3877[19], 0, i3876, 'target')
  i3876.animationType = i3877[20]
  i3876.targetType = i3877[21]
  i3876.forcedTargetType = i3877[22]
  i3876.autoPlay = !!i3877[23]
  i3876.useTargetAsV3 = !!i3877[24]
  i3876.endValueFloat = i3877[25]
  i3876.endValueV3 = new pc.Vec3( i3877[26], i3877[27], i3877[28] )
  i3876.endValueV2 = new pc.Vec2( i3877[29], i3877[30] )
  i3876.endValueColor = new pc.Color(i3877[31], i3877[32], i3877[33], i3877[34])
  i3876.endValueString = i3877[35]
  i3876.endValueRect = UnityEngine.Rect.MinMaxRect(i3877[36], i3877[37], i3877[38], i3877[39])
  request.r(i3877[40], i3877[41], 0, i3876, 'endValueTransform')
  i3876.optionalBool0 = !!i3877[42]
  i3876.optionalBool1 = !!i3877[43]
  i3876.optionalFloat0 = i3877[44]
  i3876.optionalInt0 = i3877[45]
  i3876.optionalRotationMode = i3877[46]
  i3876.optionalScrambleMode = i3877[47]
  i3876.optionalShakeRandomnessMode = i3877[48]
  i3876.optionalString = i3877[49]
  i3876.updateType = i3877[50]
  i3876.isSpeedBased = !!i3877[51]
  i3876.hasOnStart = !!i3877[52]
  i3876.hasOnPlay = !!i3877[53]
  i3876.hasOnUpdate = !!i3877[54]
  i3876.hasOnStepComplete = !!i3877[55]
  i3876.hasOnComplete = !!i3877[56]
  i3876.hasOnTweenCreated = !!i3877[57]
  i3876.hasOnRewind = !!i3877[58]
  i3876.onStart = request.d('UnityEngine.Events.UnityEvent', i3877[59], i3876.onStart)
  i3876.onPlay = request.d('UnityEngine.Events.UnityEvent', i3877[60], i3876.onPlay)
  i3876.onUpdate = request.d('UnityEngine.Events.UnityEvent', i3877[61], i3876.onUpdate)
  i3876.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i3877[62], i3876.onStepComplete)
  i3876.onComplete = request.d('UnityEngine.Events.UnityEvent', i3877[63], i3876.onComplete)
  i3876.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i3877[64], i3876.onTweenCreated)
  i3876.onRewind = request.d('UnityEngine.Events.UnityEvent', i3877[65], i3876.onRewind)
  return i3876
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i3878 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i3879 = data
  i3878.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i3879[0], i3878.m_PersistentCalls)
  return i3878
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i3880 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i3881 = data
  var i3883 = i3881[0]
  var i3882 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i3883.length; i += 1) {
    i3882.add(request.d('UnityEngine.Events.PersistentCall', i3883[i + 0]));
  }
  i3880.m_Calls = i3882
  return i3880
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i3886 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i3887 = data
  request.r(i3887[0], i3887[1], 0, i3886, 'm_Target')
  i3886.m_TargetAssemblyTypeName = i3887[2]
  i3886.m_MethodName = i3887[3]
  i3886.m_Mode = i3887[4]
  i3886.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i3887[5], i3886.m_Arguments)
  i3886.m_CallState = i3887[6]
  return i3886
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i3888 = root || request.c( 'UnityEngine.UI.Button' )
  var i3889 = data
  i3888.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i3889[0], i3888.m_OnClick)
  i3888.m_Navigation = request.d('UnityEngine.UI.Navigation', i3889[1], i3888.m_Navigation)
  i3888.m_Transition = i3889[2]
  i3888.m_Colors = request.d('UnityEngine.UI.ColorBlock', i3889[3], i3888.m_Colors)
  i3888.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i3889[4], i3888.m_SpriteState)
  i3888.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i3889[5], i3888.m_AnimationTriggers)
  i3888.m_Interactable = !!i3889[6]
  request.r(i3889[7], i3889[8], 0, i3888, 'm_TargetGraphic')
  return i3888
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i3890 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i3891 = data
  i3890.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i3891[0], i3890.m_PersistentCalls)
  return i3890
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i3892 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i3893 = data
  i3892.m_Mode = i3893[0]
  i3892.m_WrapAround = !!i3893[1]
  request.r(i3893[2], i3893[3], 0, i3892, 'm_SelectOnUp')
  request.r(i3893[4], i3893[5], 0, i3892, 'm_SelectOnDown')
  request.r(i3893[6], i3893[7], 0, i3892, 'm_SelectOnLeft')
  request.r(i3893[8], i3893[9], 0, i3892, 'm_SelectOnRight')
  return i3892
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i3894 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i3895 = data
  i3894.m_NormalColor = new pc.Color(i3895[0], i3895[1], i3895[2], i3895[3])
  i3894.m_HighlightedColor = new pc.Color(i3895[4], i3895[5], i3895[6], i3895[7])
  i3894.m_PressedColor = new pc.Color(i3895[8], i3895[9], i3895[10], i3895[11])
  i3894.m_SelectedColor = new pc.Color(i3895[12], i3895[13], i3895[14], i3895[15])
  i3894.m_DisabledColor = new pc.Color(i3895[16], i3895[17], i3895[18], i3895[19])
  i3894.m_ColorMultiplier = i3895[20]
  i3894.m_FadeDuration = i3895[21]
  return i3894
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i3896 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i3897 = data
  request.r(i3897[0], i3897[1], 0, i3896, 'm_HighlightedSprite')
  request.r(i3897[2], i3897[3], 0, i3896, 'm_PressedSprite')
  request.r(i3897[4], i3897[5], 0, i3896, 'm_SelectedSprite')
  request.r(i3897[6], i3897[7], 0, i3896, 'm_DisabledSprite')
  return i3896
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i3898 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i3899 = data
  i3898.m_NormalTrigger = i3899[0]
  i3898.m_HighlightedTrigger = i3899[1]
  i3898.m_PressedTrigger = i3899[2]
  i3898.m_SelectedTrigger = i3899[3]
  i3898.m_DisabledTrigger = i3899[4]
  return i3898
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i3900 = root || request.c( 'LayoutController' )
  var i3901 = data
  request.r(i3901[0], i3901[1], 0, i3900, 'infoUI')
  request.r(i3901[2], i3901[3], 0, i3900, 'eventUI')
  request.r(i3901[4], i3901[5], 0, i3900, 'inventoryUI')
  request.r(i3901[6], i3901[7], 0, i3900, 'moveUI')
  request.r(i3901[8], i3901[9], 0, i3900, 'actionUI')
  return i3900
}

Deserializers["LunaController"] = function (request, data, root) {
  var i3902 = root || request.c( 'LunaController' )
  var i3903 = data
  i3902.LimitTimePlay = !!i3903[0]
  i3902.TimePlay = i3903[1]
  request.r(i3903[2], i3903[3], 0, i3902, 'BGTex')
  request.r(i3903[4], i3903[5], 0, i3902, 'BGM')
  request.r(i3903[6], i3903[7], 0, i3902, 'BGImage')
  request.r(i3903[8], i3903[9], 0, i3902, 'musicSource')
  request.r(i3903[10], i3903[11], 0, i3902, 'endCard')
  return i3902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i3904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i3905 = data
  request.r(i3905[0], i3905[1], 0, i3904, 'clip')
  request.r(i3905[2], i3905[3], 0, i3904, 'outputAudioMixerGroup')
  i3904.playOnAwake = !!i3905[4]
  i3904.loop = !!i3905[5]
  i3904.time = i3905[6]
  i3904.volume = i3905[7]
  i3904.pitch = i3905[8]
  i3904.enabled = !!i3905[9]
  return i3904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i3906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i3907 = data
  i3906.ambientIntensity = i3907[0]
  i3906.reflectionIntensity = i3907[1]
  i3906.ambientMode = i3907[2]
  i3906.ambientLight = new pc.Color(i3907[3], i3907[4], i3907[5], i3907[6])
  i3906.ambientSkyColor = new pc.Color(i3907[7], i3907[8], i3907[9], i3907[10])
  i3906.ambientGroundColor = new pc.Color(i3907[11], i3907[12], i3907[13], i3907[14])
  i3906.ambientEquatorColor = new pc.Color(i3907[15], i3907[16], i3907[17], i3907[18])
  i3906.fogColor = new pc.Color(i3907[19], i3907[20], i3907[21], i3907[22])
  i3906.fogEndDistance = i3907[23]
  i3906.fogStartDistance = i3907[24]
  i3906.fogDensity = i3907[25]
  i3906.fog = !!i3907[26]
  request.r(i3907[27], i3907[28], 0, i3906, 'skybox')
  i3906.fogMode = i3907[29]
  var i3909 = i3907[30]
  var i3908 = []
  for(var i = 0; i < i3909.length; i += 1) {
    i3908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i3909[i + 0]) );
  }
  i3906.lightmaps = i3908
  i3906.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i3907[31], i3906.lightProbes)
  i3906.lightmapsMode = i3907[32]
  i3906.mixedBakeMode = i3907[33]
  i3906.environmentLightingMode = i3907[34]
  i3906.ambientProbe = new pc.SphericalHarmonicsL2(i3907[35])
  request.r(i3907[36], i3907[37], 0, i3906, 'customReflection')
  request.r(i3907[38], i3907[39], 0, i3906, 'defaultReflection')
  i3906.defaultReflectionMode = i3907[40]
  i3906.defaultReflectionResolution = i3907[41]
  i3906.sunLightObjectId = i3907[42]
  i3906.pixelLightCount = i3907[43]
  i3906.defaultReflectionHDR = !!i3907[44]
  i3906.hasLightDataAsset = !!i3907[45]
  i3906.hasManualGenerate = !!i3907[46]
  return i3906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i3912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i3913 = data
  request.r(i3913[0], i3913[1], 0, i3912, 'lightmapColor')
  request.r(i3913[2], i3913[3], 0, i3912, 'lightmapDirection')
  request.r(i3913[4], i3913[5], 0, i3912, 'shadowMask')
  return i3912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i3914 = root || new UnityEngine.LightProbes()
  var i3915 = data
  return i3914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i3922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i3923 = data
  var i3925 = i3923[0]
  var i3924 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i3925.length; i += 1) {
    i3924.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i3925[i + 0]));
  }
  i3922.ShaderCompilationErrors = i3924
  i3922.name = i3923[1]
  i3922.guid = i3923[2]
  var i3927 = i3923[3]
  var i3926 = []
  for(var i = 0; i < i3927.length; i += 1) {
    i3926.push( i3927[i + 0] );
  }
  i3922.shaderDefinedKeywords = i3926
  var i3929 = i3923[4]
  var i3928 = []
  for(var i = 0; i < i3929.length; i += 1) {
    i3928.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i3929[i + 0]) );
  }
  i3922.passes = i3928
  var i3931 = i3923[5]
  var i3930 = []
  for(var i = 0; i < i3931.length; i += 1) {
    i3930.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i3931[i + 0]) );
  }
  i3922.usePasses = i3930
  var i3933 = i3923[6]
  var i3932 = []
  for(var i = 0; i < i3933.length; i += 1) {
    i3932.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i3933[i + 0]) );
  }
  i3922.defaultParameterValues = i3932
  request.r(i3923[7], i3923[8], 0, i3922, 'unityFallbackShader')
  i3922.readDepth = !!i3923[9]
  i3922.hasDepthOnlyPass = !!i3923[10]
  i3922.isCreatedByShaderGraph = !!i3923[11]
  i3922.disableBatching = !!i3923[12]
  i3922.compiled = !!i3923[13]
  return i3922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i3936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i3937 = data
  i3936.shaderName = i3937[0]
  i3936.errorMessage = i3937[1]
  return i3936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i3942 = root || new pc.UnityShaderPass()
  var i3943 = data
  i3942.id = i3943[0]
  i3942.subShaderIndex = i3943[1]
  i3942.name = i3943[2]
  i3942.passType = i3943[3]
  i3942.grabPassTextureName = i3943[4]
  i3942.usePass = !!i3943[5]
  i3942.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[6], i3942.zTest)
  i3942.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[7], i3942.zWrite)
  i3942.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[8], i3942.culling)
  i3942.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3943[9], i3942.blending)
  i3942.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i3943[10], i3942.alphaBlending)
  i3942.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[11], i3942.colorWriteMask)
  i3942.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[12], i3942.offsetUnits)
  i3942.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[13], i3942.offsetFactor)
  i3942.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[14], i3942.stencilRef)
  i3942.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[15], i3942.stencilReadMask)
  i3942.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3943[16], i3942.stencilWriteMask)
  i3942.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3943[17], i3942.stencilOp)
  i3942.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3943[18], i3942.stencilOpFront)
  i3942.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i3943[19], i3942.stencilOpBack)
  var i3945 = i3943[20]
  var i3944 = []
  for(var i = 0; i < i3945.length; i += 1) {
    i3944.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i3945[i + 0]) );
  }
  i3942.tags = i3944
  var i3947 = i3943[21]
  var i3946 = []
  for(var i = 0; i < i3947.length; i += 1) {
    i3946.push( i3947[i + 0] );
  }
  i3942.passDefinedKeywords = i3946
  var i3949 = i3943[22]
  var i3948 = []
  for(var i = 0; i < i3949.length; i += 1) {
    i3948.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i3949[i + 0]) );
  }
  i3942.passDefinedKeywordGroups = i3948
  var i3951 = i3943[23]
  var i3950 = []
  for(var i = 0; i < i3951.length; i += 1) {
    i3950.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3951[i + 0]) );
  }
  i3942.variants = i3950
  var i3953 = i3943[24]
  var i3952 = []
  for(var i = 0; i < i3953.length; i += 1) {
    i3952.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i3953[i + 0]) );
  }
  i3942.excludedVariants = i3952
  i3942.hasDepthReader = !!i3943[25]
  return i3942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i3954 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i3955 = data
  i3954.val = i3955[0]
  i3954.name = i3955[1]
  return i3954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i3956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i3957 = data
  i3956.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3957[0], i3956.src)
  i3956.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3957[1], i3956.dst)
  i3956.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3957[2], i3956.op)
  return i3956
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i3958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i3959 = data
  i3958.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3959[0], i3958.pass)
  i3958.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3959[1], i3958.fail)
  i3958.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3959[2], i3958.zFail)
  i3958.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i3959[3], i3958.comp)
  return i3958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i3962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i3963 = data
  i3962.name = i3963[0]
  i3962.value = i3963[1]
  return i3962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i3966 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i3967 = data
  var i3969 = i3967[0]
  var i3968 = []
  for(var i = 0; i < i3969.length; i += 1) {
    i3968.push( i3969[i + 0] );
  }
  i3966.keywords = i3968
  i3966.hasDiscard = !!i3967[1]
  return i3966
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i3972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i3973 = data
  i3972.passId = i3973[0]
  i3972.subShaderIndex = i3973[1]
  var i3975 = i3973[2]
  var i3974 = []
  for(var i = 0; i < i3975.length; i += 1) {
    i3974.push( i3975[i + 0] );
  }
  i3972.keywords = i3974
  i3972.vertexProgram = i3973[3]
  i3972.fragmentProgram = i3973[4]
  i3972.exportedForWebGl2 = !!i3973[5]
  i3972.readDepth = !!i3973[6]
  return i3972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i3978 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i3979 = data
  request.r(i3979[0], i3979[1], 0, i3978, 'shader')
  i3978.pass = i3979[2]
  return i3978
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i3982 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i3983 = data
  i3982.name = i3983[0]
  i3982.type = i3983[1]
  i3982.value = new pc.Vec4( i3983[2], i3983[3], i3983[4], i3983[5] )
  i3982.textureValue = i3983[6]
  i3982.shaderPropertyFlag = i3983[7]
  return i3982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i3984 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i3985 = data
  i3984.name = i3985[0]
  request.r(i3985[1], i3985[2], 0, i3984, 'texture')
  i3984.aabb = i3985[3]
  i3984.vertices = i3985[4]
  i3984.triangles = i3985[5]
  i3984.textureRect = UnityEngine.Rect.MinMaxRect(i3985[6], i3985[7], i3985[8], i3985[9])
  i3984.packedRect = UnityEngine.Rect.MinMaxRect(i3985[10], i3985[11], i3985[12], i3985[13])
  i3984.border = new pc.Vec4( i3985[14], i3985[15], i3985[16], i3985[17] )
  i3984.transparency = i3985[18]
  i3984.bounds = i3985[19]
  i3984.pixelsPerUnit = i3985[20]
  i3984.textureWidth = i3985[21]
  i3984.textureHeight = i3985[22]
  i3984.nativeSize = new pc.Vec2( i3985[23], i3985[24] )
  i3984.pivot = new pc.Vec2( i3985[25], i3985[26] )
  i3984.textureRectOffset = new pc.Vec2( i3985[27], i3985[28] )
  return i3984
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i3986 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i3987 = data
  i3986.name = i3987[0]
  return i3986
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i3988 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i3989 = data
  i3988.name = i3989[0]
  i3988.bytes64 = i3989[1]
  i3988.data = i3989[2]
  return i3988
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i3990 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i3991 = data
  i3990.normalStyle = i3991[0]
  i3990.normalSpacingOffset = i3991[1]
  i3990.boldStyle = i3991[2]
  i3990.boldSpacing = i3991[3]
  i3990.italicStyle = i3991[4]
  i3990.tabSize = i3991[5]
  request.r(i3991[6], i3991[7], 0, i3990, 'atlas')
  i3990.m_SourceFontFileGUID = i3991[8]
  i3990.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i3991[9], i3990.m_CreationSettings)
  request.r(i3991[10], i3991[11], 0, i3990, 'm_SourceFontFile')
  i3990.m_SourceFontFilePath = i3991[12]
  i3990.m_AtlasPopulationMode = i3991[13]
  i3990.InternalDynamicOS = !!i3991[14]
  var i3993 = i3991[15]
  var i3992 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i3993.length; i += 1) {
    i3992.add(request.d('UnityEngine.TextCore.Glyph', i3993[i + 0]));
  }
  i3990.m_GlyphTable = i3992
  var i3995 = i3991[16]
  var i3994 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i3995.length; i += 1) {
    i3994.add(request.d('TMPro.TMP_Character', i3995[i + 0]));
  }
  i3990.m_CharacterTable = i3994
  var i3997 = i3991[17]
  var i3996 = []
  for(var i = 0; i < i3997.length; i += 2) {
  request.r(i3997[i + 0], i3997[i + 1], 2, i3996, '')
  }
  i3990.m_AtlasTextures = i3996
  i3990.m_AtlasTextureIndex = i3991[18]
  i3990.m_IsMultiAtlasTexturesEnabled = !!i3991[19]
  i3990.m_GetFontFeatures = !!i3991[20]
  i3990.m_ClearDynamicDataOnBuild = !!i3991[21]
  i3990.m_AtlasWidth = i3991[22]
  i3990.m_AtlasHeight = i3991[23]
  i3990.m_AtlasPadding = i3991[24]
  i3990.m_AtlasRenderMode = i3991[25]
  var i3999 = i3991[26]
  var i3998 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i3999.length; i += 1) {
    i3998.add(request.d('UnityEngine.TextCore.GlyphRect', i3999[i + 0]));
  }
  i3990.m_UsedGlyphRects = i3998
  var i4001 = i3991[27]
  var i4000 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i4001.length; i += 1) {
    i4000.add(request.d('UnityEngine.TextCore.GlyphRect', i4001[i + 0]));
  }
  i3990.m_FreeGlyphRects = i4000
  i3990.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i3991[28], i3990.m_FontFeatureTable)
  i3990.m_ShouldReimportFontFeatures = !!i3991[29]
  var i4003 = i3991[30]
  var i4002 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4003.length; i += 2) {
  request.r(i4003[i + 0], i4003[i + 1], 1, i4002, '')
  }
  i3990.m_FallbackFontAssetTable = i4002
  var i4005 = i3991[31]
  var i4004 = []
  for(var i = 0; i < i4005.length; i += 1) {
    i4004.push( request.d('TMPro.TMP_FontWeightPair', i4005[i + 0]) );
  }
  i3990.m_FontWeightTable = i4004
  var i4007 = i3991[32]
  var i4006 = []
  for(var i = 0; i < i4007.length; i += 1) {
    i4006.push( request.d('TMPro.TMP_FontWeightPair', i4007[i + 0]) );
  }
  i3990.fontWeights = i4006
  i3990.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i3991[33], i3990.m_fontInfo)
  var i4009 = i3991[34]
  var i4008 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i4009.length; i += 1) {
    i4008.add(request.d('TMPro.TMP_Glyph', i4009[i + 0]));
  }
  i3990.m_glyphInfoList = i4008
  i3990.m_KerningTable = request.d('TMPro.KerningTable', i3991[35], i3990.m_KerningTable)
  var i4011 = i3991[36]
  var i4010 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4011.length; i += 2) {
  request.r(i4011[i + 0], i4011[i + 1], 1, i4010, '')
  }
  i3990.fallbackFontAssets = i4010
  i3990.m_Version = i3991[37]
  i3990.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i3991[38], i3990.m_FaceInfo)
  request.r(i3991[39], i3991[40], 0, i3990, 'm_Material')
  return i3990
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i4012 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i4013 = data
  i4012.sourceFontFileName = i4013[0]
  i4012.sourceFontFileGUID = i4013[1]
  i4012.faceIndex = i4013[2]
  i4012.pointSizeSamplingMode = i4013[3]
  i4012.pointSize = i4013[4]
  i4012.padding = i4013[5]
  i4012.paddingMode = i4013[6]
  i4012.packingMode = i4013[7]
  i4012.atlasWidth = i4013[8]
  i4012.atlasHeight = i4013[9]
  i4012.characterSetSelectionMode = i4013[10]
  i4012.characterSequence = i4013[11]
  i4012.referencedFontAssetGUID = i4013[12]
  i4012.referencedTextAssetGUID = i4013[13]
  i4012.fontStyle = i4013[14]
  i4012.fontStyleModifier = i4013[15]
  i4012.renderMode = i4013[16]
  i4012.includeFontFeatures = !!i4013[17]
  return i4012
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i4016 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i4017 = data
  i4016.m_Index = i4017[0]
  i4016.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4017[1], i4016.m_Metrics)
  i4016.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4017[2], i4016.m_GlyphRect)
  i4016.m_Scale = i4017[3]
  i4016.m_AtlasIndex = i4017[4]
  i4016.m_ClassDefinitionType = i4017[5]
  return i4016
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i4018 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i4019 = data
  i4018.m_Width = i4019[0]
  i4018.m_Height = i4019[1]
  i4018.m_HorizontalBearingX = i4019[2]
  i4018.m_HorizontalBearingY = i4019[3]
  i4018.m_HorizontalAdvance = i4019[4]
  return i4018
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i4020 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i4021 = data
  i4020.m_X = i4021[0]
  i4020.m_Y = i4021[1]
  i4020.m_Width = i4021[2]
  i4020.m_Height = i4021[3]
  return i4020
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i4024 = root || request.c( 'TMPro.TMP_Character' )
  var i4025 = data
  i4024.m_ElementType = i4025[0]
  i4024.m_Unicode = i4025[1]
  i4024.m_GlyphIndex = i4025[2]
  i4024.m_Scale = i4025[3]
  return i4024
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i4030 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i4031 = data
  var i4033 = i4031[0]
  var i4032 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i4033.length; i += 1) {
    i4032.add(request.d('TMPro.MultipleSubstitutionRecord', i4033[i + 0]));
  }
  i4030.m_MultipleSubstitutionRecords = i4032
  var i4035 = i4031[1]
  var i4034 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i4035.length; i += 1) {
    i4034.add(request.d('TMPro.LigatureSubstitutionRecord', i4035[i + 0]));
  }
  i4030.m_LigatureSubstitutionRecords = i4034
  var i4037 = i4031[2]
  var i4036 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i4037.length; i += 1) {
    i4036.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i4037[i + 0]));
  }
  i4030.m_GlyphPairAdjustmentRecords = i4036
  var i4039 = i4031[3]
  var i4038 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i4039.length; i += 1) {
    i4038.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i4039[i + 0]));
  }
  i4030.m_MarkToBaseAdjustmentRecords = i4038
  var i4041 = i4031[4]
  var i4040 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i4041.length; i += 1) {
    i4040.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i4041[i + 0]));
  }
  i4030.m_MarkToMarkAdjustmentRecords = i4040
  return i4030
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i4044 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i4045 = data
  i4044.m_TargetGlyphID = i4045[0]
  i4044.m_SubstituteGlyphIDs = i4045[1]
  return i4044
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i4048 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i4049 = data
  i4048.m_ComponentGlyphIDs = i4049[0]
  i4048.m_LigatureGlyphID = i4049[1]
  return i4048
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i4052 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i4053 = data
  i4052.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4053[0], i4052.m_FirstAdjustmentRecord)
  i4052.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i4053[1], i4052.m_SecondAdjustmentRecord)
  i4052.m_FeatureLookupFlags = i4053[2]
  return i4052
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i4056 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i4057 = data
  i4056.m_BaseGlyphID = i4057[0]
  i4056.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4057[1], i4056.m_BaseGlyphAnchorPoint)
  i4056.m_MarkGlyphID = i4057[2]
  i4056.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4057[3], i4056.m_MarkPositionAdjustment)
  return i4056
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i4060 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i4061 = data
  i4060.m_BaseMarkGlyphID = i4061[0]
  i4060.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i4061[1], i4060.m_BaseMarkGlyphAnchorPoint)
  i4060.m_CombiningMarkGlyphID = i4061[2]
  i4060.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i4061[3], i4060.m_CombiningMarkPositionAdjustment)
  return i4060
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i4066 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i4067 = data
  request.r(i4067[0], i4067[1], 0, i4066, 'regularTypeface')
  request.r(i4067[2], i4067[3], 0, i4066, 'italicTypeface')
  return i4066
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i4068 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i4069 = data
  i4068.Name = i4069[0]
  i4068.PointSize = i4069[1]
  i4068.Scale = i4069[2]
  i4068.CharacterCount = i4069[3]
  i4068.LineHeight = i4069[4]
  i4068.Baseline = i4069[5]
  i4068.Ascender = i4069[6]
  i4068.CapHeight = i4069[7]
  i4068.Descender = i4069[8]
  i4068.CenterLine = i4069[9]
  i4068.SuperscriptOffset = i4069[10]
  i4068.SubscriptOffset = i4069[11]
  i4068.SubSize = i4069[12]
  i4068.Underline = i4069[13]
  i4068.UnderlineThickness = i4069[14]
  i4068.strikethrough = i4069[15]
  i4068.strikethroughThickness = i4069[16]
  i4068.TabWidth = i4069[17]
  i4068.Padding = i4069[18]
  i4068.AtlasWidth = i4069[19]
  i4068.AtlasHeight = i4069[20]
  return i4068
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i4072 = root || request.c( 'TMPro.TMP_Glyph' )
  var i4073 = data
  i4072.id = i4073[0]
  i4072.x = i4073[1]
  i4072.y = i4073[2]
  i4072.width = i4073[3]
  i4072.height = i4073[4]
  i4072.xOffset = i4073[5]
  i4072.yOffset = i4073[6]
  i4072.xAdvance = i4073[7]
  i4072.scale = i4073[8]
  return i4072
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i4074 = root || request.c( 'TMPro.KerningTable' )
  var i4075 = data
  var i4077 = i4075[0]
  var i4076 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i4077.length; i += 1) {
    i4076.add(request.d('TMPro.KerningPair', i4077[i + 0]));
  }
  i4074.kerningPairs = i4076
  return i4074
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i4080 = root || request.c( 'TMPro.KerningPair' )
  var i4081 = data
  i4080.xOffset = i4081[0]
  i4080.m_FirstGlyph = i4081[1]
  i4080.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4081[2], i4080.m_FirstGlyphAdjustments)
  i4080.m_SecondGlyph = i4081[3]
  i4080.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i4081[4], i4080.m_SecondGlyphAdjustments)
  i4080.m_IgnoreSpacingAdjustments = !!i4081[5]
  return i4080
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i4082 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i4083 = data
  i4082.m_FaceIndex = i4083[0]
  i4082.m_FamilyName = i4083[1]
  i4082.m_StyleName = i4083[2]
  i4082.m_PointSize = i4083[3]
  i4082.m_Scale = i4083[4]
  i4082.m_UnitsPerEM = i4083[5]
  i4082.m_LineHeight = i4083[6]
  i4082.m_AscentLine = i4083[7]
  i4082.m_CapLine = i4083[8]
  i4082.m_MeanLine = i4083[9]
  i4082.m_Baseline = i4083[10]
  i4082.m_DescentLine = i4083[11]
  i4082.m_SuperscriptOffset = i4083[12]
  i4082.m_SuperscriptSize = i4083[13]
  i4082.m_SubscriptOffset = i4083[14]
  i4082.m_SubscriptSize = i4083[15]
  i4082.m_UnderlineOffset = i4083[16]
  i4082.m_UnderlineThickness = i4083[17]
  i4082.m_StrikethroughOffset = i4083[18]
  i4082.m_StrikethroughThickness = i4083[19]
  i4082.m_TabWidth = i4083[20]
  return i4082
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i4084 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i4085 = data
  i4084.useSafeMode = !!i4085[0]
  i4084.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i4085[1], i4084.safeModeOptions)
  i4084.timeScale = i4085[2]
  i4084.unscaledTimeScale = i4085[3]
  i4084.useSmoothDeltaTime = !!i4085[4]
  i4084.maxSmoothUnscaledTime = i4085[5]
  i4084.rewindCallbackMode = i4085[6]
  i4084.showUnityEditorReport = !!i4085[7]
  i4084.logBehaviour = i4085[8]
  i4084.drawGizmos = !!i4085[9]
  i4084.defaultRecyclable = !!i4085[10]
  i4084.defaultAutoPlay = i4085[11]
  i4084.defaultUpdateType = i4085[12]
  i4084.defaultTimeScaleIndependent = !!i4085[13]
  i4084.defaultEaseType = i4085[14]
  i4084.defaultEaseOvershootOrAmplitude = i4085[15]
  i4084.defaultEasePeriod = i4085[16]
  i4084.defaultAutoKill = !!i4085[17]
  i4084.defaultLoopType = i4085[18]
  i4084.debugMode = !!i4085[19]
  i4084.debugStoreTargetId = !!i4085[20]
  i4084.showPreviewPanel = !!i4085[21]
  i4084.storeSettingsLocation = i4085[22]
  i4084.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i4085[23], i4084.modules)
  i4084.createASMDEF = !!i4085[24]
  i4084.showPlayingTweens = !!i4085[25]
  i4084.showPausedTweens = !!i4085[26]
  return i4084
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i4086 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i4087 = data
  i4086.logBehaviour = i4087[0]
  i4086.nestedTweenFailureBehaviour = i4087[1]
  return i4086
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i4088 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i4089 = data
  i4088.showPanel = !!i4089[0]
  i4088.audioEnabled = !!i4089[1]
  i4088.physicsEnabled = !!i4089[2]
  i4088.physics2DEnabled = !!i4089[3]
  i4088.spriteEnabled = !!i4089[4]
  i4088.uiEnabled = !!i4089[5]
  i4088.textMeshProEnabled = !!i4089[6]
  i4088.tk2DEnabled = !!i4089[7]
  i4088.deAudioEnabled = !!i4089[8]
  i4088.deUnityExtendedEnabled = !!i4089[9]
  i4088.epoOutlineEnabled = !!i4089[10]
  return i4088
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i4090 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i4091 = data
  request.r(i4091[0], i4091[1], 0, i4090, 'spriteSheet')
  var i4093 = i4091[2]
  var i4092 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i4093.length; i += 1) {
    i4092.add(request.d('TMPro.TMP_Sprite', i4093[i + 0]));
  }
  i4090.spriteInfoList = i4092
  var i4095 = i4091[3]
  var i4094 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i4095.length; i += 2) {
  request.r(i4095[i + 0], i4095[i + 1], 1, i4094, '')
  }
  i4090.fallbackSpriteAssets = i4094
  var i4097 = i4091[4]
  var i4096 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i4097.length; i += 1) {
    i4096.add(request.d('TMPro.TMP_SpriteCharacter', i4097[i + 0]));
  }
  i4090.m_SpriteCharacterTable = i4096
  var i4099 = i4091[5]
  var i4098 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i4099.length; i += 1) {
    i4098.add(request.d('TMPro.TMP_SpriteGlyph', i4099[i + 0]));
  }
  i4090.m_GlyphTable = i4098
  i4090.m_Version = i4091[6]
  i4090.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i4091[7], i4090.m_FaceInfo)
  request.r(i4091[8], i4091[9], 0, i4090, 'm_Material')
  return i4090
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i4102 = root || request.c( 'TMPro.TMP_Sprite' )
  var i4103 = data
  i4102.name = i4103[0]
  i4102.hashCode = i4103[1]
  i4102.unicode = i4103[2]
  i4102.pivot = new pc.Vec2( i4103[3], i4103[4] )
  request.r(i4103[5], i4103[6], 0, i4102, 'sprite')
  i4102.id = i4103[7]
  i4102.x = i4103[8]
  i4102.y = i4103[9]
  i4102.width = i4103[10]
  i4102.height = i4103[11]
  i4102.xOffset = i4103[12]
  i4102.yOffset = i4103[13]
  i4102.xAdvance = i4103[14]
  i4102.scale = i4103[15]
  return i4102
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i4108 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i4109 = data
  i4108.m_Name = i4109[0]
  i4108.m_ElementType = i4109[1]
  i4108.m_Unicode = i4109[2]
  i4108.m_GlyphIndex = i4109[3]
  i4108.m_Scale = i4109[4]
  return i4108
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i4112 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i4113 = data
  request.r(i4113[0], i4113[1], 0, i4112, 'sprite')
  i4112.m_Index = i4113[2]
  i4112.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i4113[3], i4112.m_Metrics)
  i4112.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i4113[4], i4112.m_GlyphRect)
  i4112.m_Scale = i4113[5]
  i4112.m_AtlasIndex = i4113[6]
  i4112.m_ClassDefinitionType = i4113[7]
  return i4112
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i4114 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i4115 = data
  var i4117 = i4115[0]
  var i4116 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i4117.length; i += 1) {
    i4116.add(request.d('TMPro.TMP_Style', i4117[i + 0]));
  }
  i4114.m_StyleList = i4116
  return i4114
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i4120 = root || request.c( 'TMPro.TMP_Style' )
  var i4121 = data
  i4120.m_Name = i4121[0]
  i4120.m_HashCode = i4121[1]
  i4120.m_OpeningDefinition = i4121[2]
  i4120.m_ClosingDefinition = i4121[3]
  i4120.m_OpeningTagArray = i4121[4]
  i4120.m_ClosingTagArray = i4121[5]
  return i4120
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i4122 = root || request.c( 'TMPro.TMP_Settings' )
  var i4123 = data
  i4122.assetVersion = i4123[0]
  i4122.m_TextWrappingMode = i4123[1]
  i4122.m_enableKerning = !!i4123[2]
  var i4125 = i4123[3]
  var i4124 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4125.length; i += 1) {
    i4124.add(i4125[i + 0]);
  }
  i4122.m_ActiveFontFeatures = i4124
  i4122.m_enableExtraPadding = !!i4123[4]
  i4122.m_enableTintAllSprites = !!i4123[5]
  i4122.m_enableParseEscapeCharacters = !!i4123[6]
  i4122.m_EnableRaycastTarget = !!i4123[7]
  i4122.m_GetFontFeaturesAtRuntime = !!i4123[8]
  i4122.m_missingGlyphCharacter = i4123[9]
  i4122.m_ClearDynamicDataOnBuild = !!i4123[10]
  i4122.m_warningsDisabled = !!i4123[11]
  request.r(i4123[12], i4123[13], 0, i4122, 'm_defaultFontAsset')
  i4122.m_defaultFontAssetPath = i4123[14]
  i4122.m_defaultFontSize = i4123[15]
  i4122.m_defaultAutoSizeMinRatio = i4123[16]
  i4122.m_defaultAutoSizeMaxRatio = i4123[17]
  i4122.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i4123[18], i4123[19] )
  i4122.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i4123[20], i4123[21] )
  i4122.m_autoSizeTextContainer = !!i4123[22]
  i4122.m_IsTextObjectScaleStatic = !!i4123[23]
  var i4127 = i4123[24]
  var i4126 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i4127.length; i += 2) {
  request.r(i4127[i + 0], i4127[i + 1], 1, i4126, '')
  }
  i4122.m_fallbackFontAssets = i4126
  i4122.m_matchMaterialPreset = !!i4123[25]
  i4122.m_HideSubTextObjects = !!i4123[26]
  request.r(i4123[27], i4123[28], 0, i4122, 'm_defaultSpriteAsset')
  i4122.m_defaultSpriteAssetPath = i4123[29]
  i4122.m_enableEmojiSupport = !!i4123[30]
  i4122.m_MissingCharacterSpriteUnicode = i4123[31]
  var i4129 = i4123[32]
  var i4128 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i4129.length; i += 2) {
  request.r(i4129[i + 0], i4129[i + 1], 1, i4128, '')
  }
  i4122.m_EmojiFallbackTextAssets = i4128
  i4122.m_defaultColorGradientPresetsPath = i4123[33]
  request.r(i4123[34], i4123[35], 0, i4122, 'm_defaultStyleSheet')
  i4122.m_StyleSheetsResourcePath = i4123[36]
  request.r(i4123[37], i4123[38], 0, i4122, 'm_leadingCharacters')
  request.r(i4123[39], i4123[40], 0, i4122, 'm_followingCharacters')
  i4122.m_UseModernHangulLineBreakingRules = !!i4123[41]
  return i4122
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i4132 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i4133 = data
  var i4135 = i4133[0]
  var i4134 = []
  for(var i = 0; i < i4135.length; i += 1) {
    i4134.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i4135[i + 0]) );
  }
  i4132.files = i4134
  i4132.componentToPrefabIds = i4133[1]
  return i4132
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i4138 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i4139 = data
  i4138.path = i4139[0]
  request.r(i4139[1], i4139[2], 0, i4138, 'unityObject')
  return i4138
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i4140 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i4141 = data
  var i4143 = i4141[0]
  var i4142 = []
  for(var i = 0; i < i4143.length; i += 1) {
    i4142.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i4143[i + 0]) );
  }
  i4140.scriptsExecutionOrder = i4142
  var i4145 = i4141[1]
  var i4144 = []
  for(var i = 0; i < i4145.length; i += 1) {
    i4144.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i4145[i + 0]) );
  }
  i4140.sortingLayers = i4144
  var i4147 = i4141[2]
  var i4146 = []
  for(var i = 0; i < i4147.length; i += 1) {
    i4146.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i4147[i + 0]) );
  }
  i4140.cullingLayers = i4146
  i4140.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i4141[3], i4140.timeSettings)
  i4140.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i4141[4], i4140.physicsSettings)
  i4140.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i4141[5], i4140.physics2DSettings)
  i4140.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4141[6], i4140.qualitySettings)
  i4140.enableRealtimeShadows = !!i4141[7]
  i4140.enableAutoInstancing = !!i4141[8]
  i4140.enableStaticBatching = !!i4141[9]
  i4140.enableDynamicBatching = !!i4141[10]
  i4140.usePreservativeDynamicBatching = !!i4141[11]
  i4140.lightmapEncodingQuality = i4141[12]
  i4140.desiredColorSpace = i4141[13]
  var i4149 = i4141[14]
  var i4148 = []
  for(var i = 0; i < i4149.length; i += 1) {
    i4148.push( i4149[i + 0] );
  }
  i4140.allTags = i4148
  return i4140
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i4152 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i4153 = data
  i4152.name = i4153[0]
  i4152.value = i4153[1]
  return i4152
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i4156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i4157 = data
  i4156.id = i4157[0]
  i4156.name = i4157[1]
  i4156.value = i4157[2]
  return i4156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i4160 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i4161 = data
  i4160.id = i4161[0]
  i4160.name = i4161[1]
  return i4160
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i4162 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i4163 = data
  i4162.fixedDeltaTime = i4163[0]
  i4162.maximumDeltaTime = i4163[1]
  i4162.timeScale = i4163[2]
  i4162.maximumParticleTimestep = i4163[3]
  return i4162
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i4164 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i4165 = data
  i4164.gravity = new pc.Vec3( i4165[0], i4165[1], i4165[2] )
  i4164.defaultSolverIterations = i4165[3]
  i4164.bounceThreshold = i4165[4]
  i4164.autoSyncTransforms = !!i4165[5]
  i4164.autoSimulation = !!i4165[6]
  var i4167 = i4165[7]
  var i4166 = []
  for(var i = 0; i < i4167.length; i += 1) {
    i4166.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i4167[i + 0]) );
  }
  i4164.collisionMatrix = i4166
  return i4164
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i4170 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i4171 = data
  i4170.enabled = !!i4171[0]
  i4170.layerId = i4171[1]
  i4170.otherLayerId = i4171[2]
  return i4170
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i4172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i4173 = data
  request.r(i4173[0], i4173[1], 0, i4172, 'material')
  i4172.gravity = new pc.Vec2( i4173[2], i4173[3] )
  i4172.positionIterations = i4173[4]
  i4172.velocityIterations = i4173[5]
  i4172.velocityThreshold = i4173[6]
  i4172.maxLinearCorrection = i4173[7]
  i4172.maxAngularCorrection = i4173[8]
  i4172.maxTranslationSpeed = i4173[9]
  i4172.maxRotationSpeed = i4173[10]
  i4172.baumgarteScale = i4173[11]
  i4172.baumgarteTOIScale = i4173[12]
  i4172.timeToSleep = i4173[13]
  i4172.linearSleepTolerance = i4173[14]
  i4172.angularSleepTolerance = i4173[15]
  i4172.defaultContactOffset = i4173[16]
  i4172.autoSimulation = !!i4173[17]
  i4172.queriesHitTriggers = !!i4173[18]
  i4172.queriesStartInColliders = !!i4173[19]
  i4172.callbacksOnDisable = !!i4173[20]
  i4172.reuseCollisionCallbacks = !!i4173[21]
  i4172.autoSyncTransforms = !!i4173[22]
  var i4175 = i4173[23]
  var i4174 = []
  for(var i = 0; i < i4175.length; i += 1) {
    i4174.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i4175[i + 0]) );
  }
  i4172.collisionMatrix = i4174
  return i4172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i4178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i4179 = data
  i4178.enabled = !!i4179[0]
  i4178.layerId = i4179[1]
  i4178.otherLayerId = i4179[2]
  return i4178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i4180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i4181 = data
  var i4183 = i4181[0]
  var i4182 = []
  for(var i = 0; i < i4183.length; i += 1) {
    i4182.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i4183[i + 0]) );
  }
  i4180.qualityLevels = i4182
  var i4185 = i4181[1]
  var i4184 = []
  for(var i = 0; i < i4185.length; i += 1) {
    i4184.push( i4185[i + 0] );
  }
  i4180.names = i4184
  i4180.shadows = i4181[2]
  i4180.anisotropicFiltering = i4181[3]
  i4180.antiAliasing = i4181[4]
  i4180.lodBias = i4181[5]
  i4180.shadowCascades = i4181[6]
  i4180.shadowDistance = i4181[7]
  i4180.shadowmaskMode = i4181[8]
  i4180.shadowProjection = i4181[9]
  i4180.shadowResolution = i4181[10]
  i4180.softParticles = !!i4181[11]
  i4180.softVegetation = !!i4181[12]
  i4180.activeColorSpace = i4181[13]
  i4180.desiredColorSpace = i4181[14]
  i4180.masterTextureLimit = i4181[15]
  i4180.maxQueuedFrames = i4181[16]
  i4180.particleRaycastBudget = i4181[17]
  i4180.pixelLightCount = i4181[18]
  i4180.realtimeReflectionProbes = !!i4181[19]
  i4180.shadowCascade2Split = i4181[20]
  i4180.shadowCascade4Split = new pc.Vec3( i4181[21], i4181[22], i4181[23] )
  i4180.streamingMipmapsActive = !!i4181[24]
  i4180.vSyncCount = i4181[25]
  i4180.asyncUploadBufferSize = i4181[26]
  i4180.asyncUploadTimeSlice = i4181[27]
  i4180.billboardsFaceCameraPosition = !!i4181[28]
  i4180.shadowNearPlaneOffset = i4181[29]
  i4180.streamingMipmapsMemoryBudget = i4181[30]
  i4180.maximumLODLevel = i4181[31]
  i4180.streamingMipmapsAddAllCameras = !!i4181[32]
  i4180.streamingMipmapsMaxLevelReduction = i4181[33]
  i4180.streamingMipmapsRenderersPerFrame = i4181[34]
  i4180.resolutionScalingFixedDPIFactor = i4181[35]
  i4180.streamingMipmapsMaxFileIORequests = i4181[36]
  i4180.currentQualityLevel = i4181[37]
  return i4180
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i4188 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i4189 = data
  request.r(i4189[0], i4189[1], 0, i4188, 'm_ObjectArgument')
  i4188.m_ObjectArgumentAssemblyTypeName = i4189[2]
  i4188.m_IntArgument = i4189[3]
  i4188.m_FloatArgument = i4189[4]
  i4188.m_StringArgument = i4189[5]
  i4188.m_BoolArgument = !!i4189[6]
  return i4188
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i4190 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i4191 = data
  i4190.m_GlyphIndex = i4191[0]
  i4190.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i4191[1], i4190.m_GlyphValueRecord)
  return i4190
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i4192 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i4193 = data
  i4192.m_XCoordinate = i4193[0]
  i4192.m_YCoordinate = i4193[1]
  return i4192
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i4194 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i4195 = data
  i4194.m_XPositionAdjustment = i4195[0]
  i4194.m_YPositionAdjustment = i4195[1]
  return i4194
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i4196 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i4197 = data
  i4196.xPlacement = i4197[0]
  i4196.yPlacement = i4197[1]
  i4196.xAdvance = i4197[2]
  i4196.yAdvance = i4197[3]
  return i4196
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i4198 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i4199 = data
  i4198.m_XPlacement = i4199[0]
  i4198.m_YPlacement = i4199[1]
  i4198.m_XAdvance = i4199[2]
  i4198.m_YAdvance = i4199[3]
  return i4198
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

Deserializers.creativeName = "CBBW3_V09_DungNV_TamNTM";

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

Deserializers.buildID = "bee9b248-9be4-448c-a893-df64b0a3777f";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

