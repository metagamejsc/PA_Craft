var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i4882 = root || request.c( 'UnityEngine.JointSpring' )
  var i4883 = data
  i4882.spring = i4883[0]
  i4882.damper = i4883[1]
  i4882.targetPosition = i4883[2]
  return i4882
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i4884 = root || request.c( 'UnityEngine.JointMotor' )
  var i4885 = data
  i4884.m_TargetVelocity = i4885[0]
  i4884.m_Force = i4885[1]
  i4884.m_FreeSpin = i4885[2]
  return i4884
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i4886 = root || request.c( 'UnityEngine.JointLimits' )
  var i4887 = data
  i4886.m_Min = i4887[0]
  i4886.m_Max = i4887[1]
  i4886.m_Bounciness = i4887[2]
  i4886.m_BounceMinVelocity = i4887[3]
  i4886.m_ContactDistance = i4887[4]
  i4886.minBounce = i4887[5]
  i4886.maxBounce = i4887[6]
  return i4886
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i4888 = root || request.c( 'UnityEngine.JointDrive' )
  var i4889 = data
  i4888.m_PositionSpring = i4889[0]
  i4888.m_PositionDamper = i4889[1]
  i4888.m_MaximumForce = i4889[2]
  i4888.m_UseAcceleration = i4889[3]
  return i4888
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i4890 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i4891 = data
  i4890.m_Spring = i4891[0]
  i4890.m_Damper = i4891[1]
  return i4890
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i4892 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i4893 = data
  i4892.m_Limit = i4893[0]
  i4892.m_Bounciness = i4893[1]
  i4892.m_ContactDistance = i4893[2]
  return i4892
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i4894 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i4895 = data
  i4894.m_ExtremumSlip = i4895[0]
  i4894.m_ExtremumValue = i4895[1]
  i4894.m_AsymptoteSlip = i4895[2]
  i4894.m_AsymptoteValue = i4895[3]
  i4894.m_Stiffness = i4895[4]
  return i4894
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i4896 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i4897 = data
  i4896.m_LowerAngle = i4897[0]
  i4896.m_UpperAngle = i4897[1]
  return i4896
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i4898 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i4899 = data
  i4898.m_MotorSpeed = i4899[0]
  i4898.m_MaximumMotorTorque = i4899[1]
  return i4898
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i4900 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i4901 = data
  i4900.m_DampingRatio = i4901[0]
  i4900.m_Frequency = i4901[1]
  i4900.m_Angle = i4901[2]
  return i4900
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i4902 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i4903 = data
  i4902.m_LowerTranslation = i4903[0]
  i4902.m_UpperTranslation = i4903[1]
  return i4902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i4904 = root || new pc.UnityMaterial()
  var i4905 = data
  i4904.name = i4905[0]
  request.r(i4905[1], i4905[2], 0, i4904, 'shader')
  i4904.renderQueue = i4905[3]
  i4904.enableInstancing = !!i4905[4]
  var i4907 = i4905[5]
  var i4906 = []
  for(var i = 0; i < i4907.length; i += 1) {
    i4906.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i4907[i + 0]) );
  }
  i4904.floatParameters = i4906
  var i4909 = i4905[6]
  var i4908 = []
  for(var i = 0; i < i4909.length; i += 1) {
    i4908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i4909[i + 0]) );
  }
  i4904.colorParameters = i4908
  var i4911 = i4905[7]
  var i4910 = []
  for(var i = 0; i < i4911.length; i += 1) {
    i4910.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i4911[i + 0]) );
  }
  i4904.vectorParameters = i4910
  var i4913 = i4905[8]
  var i4912 = []
  for(var i = 0; i < i4913.length; i += 1) {
    i4912.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i4913[i + 0]) );
  }
  i4904.textureParameters = i4912
  var i4915 = i4905[9]
  var i4914 = []
  for(var i = 0; i < i4915.length; i += 1) {
    i4914.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i4915[i + 0]) );
  }
  i4904.materialFlags = i4914
  return i4904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i4918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i4919 = data
  i4918.name = i4919[0]
  i4918.value = i4919[1]
  return i4918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i4922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i4923 = data
  i4922.name = i4923[0]
  i4922.value = new pc.Color(i4923[1], i4923[2], i4923[3], i4923[4])
  return i4922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i4926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i4927 = data
  i4926.name = i4927[0]
  i4926.value = new pc.Vec4( i4927[1], i4927[2], i4927[3], i4927[4] )
  return i4926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i4930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i4931 = data
  i4930.name = i4931[0]
  request.r(i4931[1], i4931[2], 0, i4930, 'value')
  return i4930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i4934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i4935 = data
  i4934.name = i4935[0]
  i4934.enabled = !!i4935[1]
  return i4934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i4936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i4937 = data
  i4936.name = i4937[0]
  i4936.width = i4937[1]
  i4936.height = i4937[2]
  i4936.mipmapCount = i4937[3]
  i4936.anisoLevel = i4937[4]
  i4936.filterMode = i4937[5]
  i4936.hdr = !!i4937[6]
  i4936.format = i4937[7]
  i4936.wrapMode = i4937[8]
  i4936.alphaIsTransparency = !!i4937[9]
  i4936.alphaSource = i4937[10]
  i4936.graphicsFormat = i4937[11]
  i4936.sRGBTexture = !!i4937[12]
  i4936.desiredColorSpace = i4937[13]
  i4936.wrapU = i4937[14]
  i4936.wrapV = i4937[15]
  return i4936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i4938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i4939 = data
  i4938.name = i4939[0]
  i4938.index = i4939[1]
  i4938.startup = !!i4939[2]
  return i4938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i4940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i4941 = data
  i4940.aspect = i4941[0]
  i4940.orthographic = !!i4941[1]
  i4940.orthographicSize = i4941[2]
  i4940.backgroundColor = new pc.Color(i4941[3], i4941[4], i4941[5], i4941[6])
  i4940.nearClipPlane = i4941[7]
  i4940.farClipPlane = i4941[8]
  i4940.fieldOfView = i4941[9]
  i4940.depth = i4941[10]
  i4940.clearFlags = i4941[11]
  i4940.cullingMask = i4941[12]
  i4940.rect = i4941[13]
  request.r(i4941[14], i4941[15], 0, i4940, 'targetTexture')
  i4940.usePhysicalProperties = !!i4941[16]
  i4940.focalLength = i4941[17]
  i4940.sensorSize = new pc.Vec2( i4941[18], i4941[19] )
  i4940.lensShift = new pc.Vec2( i4941[20], i4941[21] )
  i4940.gateFit = i4941[22]
  i4940.commandBufferCount = i4941[23]
  i4940.cameraType = i4941[24]
  i4940.enabled = !!i4941[25]
  return i4940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i4942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i4943 = data
  i4942.name = i4943[0]
  i4942.tagId = i4943[1]
  i4942.enabled = !!i4943[2]
  i4942.isStatic = !!i4943[3]
  i4942.layer = i4943[4]
  return i4942
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i4944 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i4945 = data
  request.r(i4945[0], i4945[1], 0, i4944, 'm_FirstSelected')
  i4944.m_sendNavigationEvents = !!i4945[2]
  i4944.m_DragThreshold = i4945[3]
  return i4944
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i4946 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i4947 = data
  i4946.m_HorizontalAxis = i4947[0]
  i4946.m_VerticalAxis = i4947[1]
  i4946.m_SubmitButton = i4947[2]
  i4946.m_CancelButton = i4947[3]
  i4946.m_InputActionsPerSecond = i4947[4]
  i4946.m_RepeatDelay = i4947[5]
  i4946.m_ForceModuleActive = !!i4947[6]
  i4946.m_SendPointerHoverToParent = !!i4947[7]
  return i4946
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i4948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i4949 = data
  i4948.pivot = new pc.Vec2( i4949[0], i4949[1] )
  i4948.anchorMin = new pc.Vec2( i4949[2], i4949[3] )
  i4948.anchorMax = new pc.Vec2( i4949[4], i4949[5] )
  i4948.sizeDelta = new pc.Vec2( i4949[6], i4949[7] )
  i4948.anchoredPosition3D = new pc.Vec3( i4949[8], i4949[9], i4949[10] )
  i4948.rotation = new pc.Quat(i4949[11], i4949[12], i4949[13], i4949[14])
  i4948.scale = new pc.Vec3( i4949[15], i4949[16], i4949[17] )
  return i4948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i4950 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i4951 = data
  i4950.planeDistance = i4951[0]
  i4950.referencePixelsPerUnit = i4951[1]
  i4950.isFallbackOverlay = !!i4951[2]
  i4950.renderMode = i4951[3]
  i4950.renderOrder = i4951[4]
  i4950.sortingLayerName = i4951[5]
  i4950.sortingOrder = i4951[6]
  i4950.scaleFactor = i4951[7]
  request.r(i4951[8], i4951[9], 0, i4950, 'worldCamera')
  i4950.overrideSorting = !!i4951[10]
  i4950.pixelPerfect = !!i4951[11]
  i4950.targetDisplay = i4951[12]
  i4950.overridePixelPerfect = !!i4951[13]
  i4950.enabled = !!i4951[14]
  return i4950
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i4952 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i4953 = data
  i4952.m_UiScaleMode = i4953[0]
  i4952.m_ReferencePixelsPerUnit = i4953[1]
  i4952.m_ScaleFactor = i4953[2]
  i4952.m_ReferenceResolution = new pc.Vec2( i4953[3], i4953[4] )
  i4952.m_ScreenMatchMode = i4953[5]
  i4952.m_MatchWidthOrHeight = i4953[6]
  i4952.m_PhysicalUnit = i4953[7]
  i4952.m_FallbackScreenDPI = i4953[8]
  i4952.m_DefaultSpriteDPI = i4953[9]
  i4952.m_DynamicPixelsPerUnit = i4953[10]
  i4952.m_PresetInfoIsWorld = !!i4953[11]
  return i4952
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i4954 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i4955 = data
  i4954.m_IgnoreReversedGraphics = !!i4955[0]
  i4954.m_BlockingObjects = i4955[1]
  i4954.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i4955[2] )
  return i4954
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i4956 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i4957 = data
  i4956.cullTransparentMesh = !!i4957[0]
  return i4956
}

Deserializers["UnityEngine.UI.AspectRatioFitter"] = function (request, data, root) {
  var i4958 = root || request.c( 'UnityEngine.UI.AspectRatioFitter' )
  var i4959 = data
  i4958.m_AspectMode = i4959[0]
  i4958.m_AspectRatio = i4959[1]
  return i4958
}

Deserializers["UnityEngine.UI.RawImage"] = function (request, data, root) {
  var i4960 = root || request.c( 'UnityEngine.UI.RawImage' )
  var i4961 = data
  request.r(i4961[0], i4961[1], 0, i4960, 'm_Texture')
  i4960.m_UVRect = UnityEngine.Rect.MinMaxRect(i4961[2], i4961[3], i4961[4], i4961[5])
  request.r(i4961[6], i4961[7], 0, i4960, 'm_Material')
  i4960.m_Maskable = !!i4961[8]
  i4960.m_Color = new pc.Color(i4961[9], i4961[10], i4961[11], i4961[12])
  i4960.m_RaycastTarget = !!i4961[13]
  i4960.m_RaycastPadding = new pc.Vec4( i4961[14], i4961[15], i4961[16], i4961[17] )
  return i4960
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i4962 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i4963 = data
  i4962.m_hasFontAssetChanged = !!i4963[0]
  request.r(i4963[1], i4963[2], 0, i4962, 'm_baseMaterial')
  i4962.m_maskOffset = new pc.Vec4( i4963[3], i4963[4], i4963[5], i4963[6] )
  i4962.m_text = i4963[7]
  i4962.m_isRightToLeft = !!i4963[8]
  request.r(i4963[9], i4963[10], 0, i4962, 'm_fontAsset')
  request.r(i4963[11], i4963[12], 0, i4962, 'm_sharedMaterial')
  var i4965 = i4963[13]
  var i4964 = []
  for(var i = 0; i < i4965.length; i += 2) {
  request.r(i4965[i + 0], i4965[i + 1], 2, i4964, '')
  }
  i4962.m_fontSharedMaterials = i4964
  request.r(i4963[14], i4963[15], 0, i4962, 'm_fontMaterial')
  var i4967 = i4963[16]
  var i4966 = []
  for(var i = 0; i < i4967.length; i += 2) {
  request.r(i4967[i + 0], i4967[i + 1], 2, i4966, '')
  }
  i4962.m_fontMaterials = i4966
  i4962.m_fontColor32 = UnityEngine.Color32.ConstructColor(i4963[17], i4963[18], i4963[19], i4963[20])
  i4962.m_fontColor = new pc.Color(i4963[21], i4963[22], i4963[23], i4963[24])
  i4962.m_enableVertexGradient = !!i4963[25]
  i4962.m_colorMode = i4963[26]
  i4962.m_fontColorGradient = request.d('TMPro.VertexGradient', i4963[27], i4962.m_fontColorGradient)
  request.r(i4963[28], i4963[29], 0, i4962, 'm_fontColorGradientPreset')
  request.r(i4963[30], i4963[31], 0, i4962, 'm_spriteAsset')
  i4962.m_tintAllSprites = !!i4963[32]
  request.r(i4963[33], i4963[34], 0, i4962, 'm_StyleSheet')
  i4962.m_TextStyleHashCode = i4963[35]
  i4962.m_overrideHtmlColors = !!i4963[36]
  i4962.m_faceColor = UnityEngine.Color32.ConstructColor(i4963[37], i4963[38], i4963[39], i4963[40])
  i4962.m_fontSize = i4963[41]
  i4962.m_fontSizeBase = i4963[42]
  i4962.m_fontWeight = i4963[43]
  i4962.m_enableAutoSizing = !!i4963[44]
  i4962.m_fontSizeMin = i4963[45]
  i4962.m_fontSizeMax = i4963[46]
  i4962.m_fontStyle = i4963[47]
  i4962.m_HorizontalAlignment = i4963[48]
  i4962.m_VerticalAlignment = i4963[49]
  i4962.m_textAlignment = i4963[50]
  i4962.m_characterSpacing = i4963[51]
  i4962.m_characterHorizontalScale = i4963[52]
  i4962.m_wordSpacing = i4963[53]
  i4962.m_lineSpacing = i4963[54]
  i4962.m_lineSpacingMax = i4963[55]
  i4962.m_paragraphSpacing = i4963[56]
  i4962.m_charWidthMaxAdj = i4963[57]
  i4962.m_TextWrappingMode = i4963[58]
  i4962.m_wordWrappingRatios = i4963[59]
  i4962.m_overflowMode = i4963[60]
  request.r(i4963[61], i4963[62], 0, i4962, 'm_linkedTextComponent')
  request.r(i4963[63], i4963[64], 0, i4962, 'parentLinkedComponent')
  i4962.m_enableKerning = !!i4963[65]
  var i4969 = i4963[66]
  var i4968 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i4969.length; i += 1) {
    i4968.add(i4969[i + 0]);
  }
  i4962.m_ActiveFontFeatures = i4968
  i4962.m_enableExtraPadding = !!i4963[67]
  i4962.checkPaddingRequired = !!i4963[68]
  i4962.m_isRichText = !!i4963[69]
  i4962.m_parseCtrlCharacters = !!i4963[70]
  i4962.m_isOrthographic = !!i4963[71]
  i4962.m_isCullingEnabled = !!i4963[72]
  i4962.m_horizontalMapping = i4963[73]
  i4962.m_verticalMapping = i4963[74]
  i4962.m_uvLineOffset = i4963[75]
  i4962.m_geometrySortingOrder = i4963[76]
  i4962.m_IsTextObjectScaleStatic = !!i4963[77]
  i4962.m_VertexBufferAutoSizeReduction = !!i4963[78]
  i4962.m_useMaxVisibleDescender = !!i4963[79]
  i4962.m_pageToDisplay = i4963[80]
  i4962.m_margin = new pc.Vec4( i4963[81], i4963[82], i4963[83], i4963[84] )
  i4962.m_isUsingLegacyAnimationComponent = !!i4963[85]
  i4962.m_isVolumetricText = !!i4963[86]
  request.r(i4963[87], i4963[88], 0, i4962, 'm_Material')
  i4962.m_EmojiFallbackSupport = !!i4963[89]
  i4962.m_Maskable = !!i4963[90]
  i4962.m_Color = new pc.Color(i4963[91], i4963[92], i4963[93], i4963[94])
  i4962.m_RaycastTarget = !!i4963[95]
  i4962.m_RaycastPadding = new pc.Vec4( i4963[96], i4963[97], i4963[98], i4963[99] )
  return i4962
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i4972 = root || request.c( 'TMPro.VertexGradient' )
  var i4973 = data
  i4972.topLeft = new pc.Color(i4973[0], i4973[1], i4973[2], i4973[3])
  i4972.topRight = new pc.Color(i4973[4], i4973[5], i4973[6], i4973[7])
  i4972.bottomLeft = new pc.Color(i4973[8], i4973[9], i4973[10], i4973[11])
  i4972.bottomRight = new pc.Color(i4973[12], i4973[13], i4973[14], i4973[15])
  return i4972
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i4976 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i4977 = data
  i4976.targetIsSelf = !!i4977[0]
  request.r(i4977[1], i4977[2], 0, i4976, 'targetGO')
  i4976.tweenTargetIsTargetGO = !!i4977[3]
  i4976.delay = i4977[4]
  i4976.duration = i4977[5]
  i4976.easeType = i4977[6]
  i4976.easeCurve = new pc.AnimationCurve( { keys_flow: i4977[7] } )
  i4976.loopType = i4977[8]
  i4976.loops = i4977[9]
  i4976.id = i4977[10]
  i4976.isRelative = !!i4977[11]
  i4976.isFrom = !!i4977[12]
  i4976.isIndependentUpdate = !!i4977[13]
  i4976.autoKill = !!i4977[14]
  i4976.autoGenerate = !!i4977[15]
  i4976.isActive = !!i4977[16]
  i4976.isValid = !!i4977[17]
  request.r(i4977[18], i4977[19], 0, i4976, 'target')
  i4976.animationType = i4977[20]
  i4976.targetType = i4977[21]
  i4976.forcedTargetType = i4977[22]
  i4976.autoPlay = !!i4977[23]
  i4976.useTargetAsV3 = !!i4977[24]
  i4976.endValueFloat = i4977[25]
  i4976.endValueV3 = new pc.Vec3( i4977[26], i4977[27], i4977[28] )
  i4976.endValueV2 = new pc.Vec2( i4977[29], i4977[30] )
  i4976.endValueColor = new pc.Color(i4977[31], i4977[32], i4977[33], i4977[34])
  i4976.endValueString = i4977[35]
  i4976.endValueRect = UnityEngine.Rect.MinMaxRect(i4977[36], i4977[37], i4977[38], i4977[39])
  request.r(i4977[40], i4977[41], 0, i4976, 'endValueTransform')
  i4976.optionalBool0 = !!i4977[42]
  i4976.optionalBool1 = !!i4977[43]
  i4976.optionalFloat0 = i4977[44]
  i4976.optionalInt0 = i4977[45]
  i4976.optionalRotationMode = i4977[46]
  i4976.optionalScrambleMode = i4977[47]
  i4976.optionalShakeRandomnessMode = i4977[48]
  i4976.optionalString = i4977[49]
  i4976.updateType = i4977[50]
  i4976.isSpeedBased = !!i4977[51]
  i4976.hasOnStart = !!i4977[52]
  i4976.hasOnPlay = !!i4977[53]
  i4976.hasOnUpdate = !!i4977[54]
  i4976.hasOnStepComplete = !!i4977[55]
  i4976.hasOnComplete = !!i4977[56]
  i4976.hasOnTweenCreated = !!i4977[57]
  i4976.hasOnRewind = !!i4977[58]
  i4976.onStart = request.d('UnityEngine.Events.UnityEvent', i4977[59], i4976.onStart)
  i4976.onPlay = request.d('UnityEngine.Events.UnityEvent', i4977[60], i4976.onPlay)
  i4976.onUpdate = request.d('UnityEngine.Events.UnityEvent', i4977[61], i4976.onUpdate)
  i4976.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i4977[62], i4976.onStepComplete)
  i4976.onComplete = request.d('UnityEngine.Events.UnityEvent', i4977[63], i4976.onComplete)
  i4976.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i4977[64], i4976.onTweenCreated)
  i4976.onRewind = request.d('UnityEngine.Events.UnityEvent', i4977[65], i4976.onRewind)
  return i4976
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i4978 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i4979 = data
  i4978.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4979[0], i4978.m_PersistentCalls)
  return i4978
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i4980 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i4981 = data
  var i4983 = i4981[0]
  var i4982 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i4983.length; i += 1) {
    i4982.add(request.d('UnityEngine.Events.PersistentCall', i4983[i + 0]));
  }
  i4980.m_Calls = i4982
  return i4980
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i4986 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i4987 = data
  request.r(i4987[0], i4987[1], 0, i4986, 'm_Target')
  i4986.m_TargetAssemblyTypeName = i4987[2]
  i4986.m_MethodName = i4987[3]
  i4986.m_Mode = i4987[4]
  i4986.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i4987[5], i4986.m_Arguments)
  i4986.m_CallState = i4987[6]
  return i4986
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i4988 = root || request.c( 'UnityEngine.UI.Image' )
  var i4989 = data
  request.r(i4989[0], i4989[1], 0, i4988, 'm_Sprite')
  i4988.m_Type = i4989[2]
  i4988.m_PreserveAspect = !!i4989[3]
  i4988.m_FillCenter = !!i4989[4]
  i4988.m_FillMethod = i4989[5]
  i4988.m_FillAmount = i4989[6]
  i4988.m_FillClockwise = !!i4989[7]
  i4988.m_FillOrigin = i4989[8]
  i4988.m_UseSpriteMesh = !!i4989[9]
  i4988.m_PixelsPerUnitMultiplier = i4989[10]
  request.r(i4989[11], i4989[12], 0, i4988, 'm_Material')
  i4988.m_Maskable = !!i4989[13]
  i4988.m_Color = new pc.Color(i4989[14], i4989[15], i4989[16], i4989[17])
  i4988.m_RaycastTarget = !!i4989[18]
  i4988.m_RaycastPadding = new pc.Vec4( i4989[19], i4989[20], i4989[21], i4989[22] )
  return i4988
}

Deserializers["TutController"] = function (request, data, root) {
  var i4990 = root || request.c( 'TutController' )
  var i4991 = data
  request.r(i4991[0], i4991[1], 0, i4990, 'leftCard')
  request.r(i4991[2], i4991[3], 0, i4990, 'rightCard')
  i4990.leftPos = new pc.Vec2( i4991[4], i4991[5] )
  i4990.rightPos = new pc.Vec2( i4991[6], i4991[7] )
  request.r(i4991[8], i4991[9], 0, i4990, 'tut')
  i4990.timeMove = i4991[10]
  i4990.timeDelay = i4991[11]
  return i4990
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i4992 = root || request.c( 'UnityEngine.UI.Button' )
  var i4993 = data
  i4992.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i4993[0], i4992.m_OnClick)
  i4992.m_Navigation = request.d('UnityEngine.UI.Navigation', i4993[1], i4992.m_Navigation)
  i4992.m_Transition = i4993[2]
  i4992.m_Colors = request.d('UnityEngine.UI.ColorBlock', i4993[3], i4992.m_Colors)
  i4992.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i4993[4], i4992.m_SpriteState)
  i4992.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i4993[5], i4992.m_AnimationTriggers)
  i4992.m_Interactable = !!i4993[6]
  request.r(i4993[7], i4993[8], 0, i4992, 'm_TargetGraphic')
  return i4992
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i4994 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i4995 = data
  i4994.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i4995[0], i4994.m_PersistentCalls)
  return i4994
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i4996 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i4997 = data
  i4996.m_Mode = i4997[0]
  i4996.m_WrapAround = !!i4997[1]
  request.r(i4997[2], i4997[3], 0, i4996, 'm_SelectOnUp')
  request.r(i4997[4], i4997[5], 0, i4996, 'm_SelectOnDown')
  request.r(i4997[6], i4997[7], 0, i4996, 'm_SelectOnLeft')
  request.r(i4997[8], i4997[9], 0, i4996, 'm_SelectOnRight')
  return i4996
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i4998 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i4999 = data
  i4998.m_NormalColor = new pc.Color(i4999[0], i4999[1], i4999[2], i4999[3])
  i4998.m_HighlightedColor = new pc.Color(i4999[4], i4999[5], i4999[6], i4999[7])
  i4998.m_PressedColor = new pc.Color(i4999[8], i4999[9], i4999[10], i4999[11])
  i4998.m_SelectedColor = new pc.Color(i4999[12], i4999[13], i4999[14], i4999[15])
  i4998.m_DisabledColor = new pc.Color(i4999[16], i4999[17], i4999[18], i4999[19])
  i4998.m_ColorMultiplier = i4999[20]
  i4998.m_FadeDuration = i4999[21]
  return i4998
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i5000 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i5001 = data
  request.r(i5001[0], i5001[1], 0, i5000, 'm_HighlightedSprite')
  request.r(i5001[2], i5001[3], 0, i5000, 'm_PressedSprite')
  request.r(i5001[4], i5001[5], 0, i5000, 'm_SelectedSprite')
  request.r(i5001[6], i5001[7], 0, i5000, 'm_DisabledSprite')
  return i5000
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i5002 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i5003 = data
  i5002.m_NormalTrigger = i5003[0]
  i5002.m_HighlightedTrigger = i5003[1]
  i5002.m_PressedTrigger = i5003[2]
  i5002.m_SelectedTrigger = i5003[3]
  i5002.m_DisabledTrigger = i5003[4]
  return i5002
}

Deserializers["LayoutController"] = function (request, data, root) {
  var i5004 = root || request.c( 'LayoutController' )
  var i5005 = data
  request.r(i5005[0], i5005[1], 0, i5004, 'cardP')
  request.r(i5005[2], i5005[3], 0, i5004, 'cardL')
  return i5004
}

Deserializers["LunaController"] = function (request, data, root) {
  var i5006 = root || request.c( 'LunaController' )
  var i5007 = data
  i5006.TimePlay = i5007[0]
  i5006.LimitTimePlay = !!i5007[1]
  request.r(i5007[2], i5007[3], 0, i5006, 'BGTex')
  request.r(i5007[4], i5007[5], 0, i5006, 'BGM')
  i5006.HeaderText = i5007[6]
  i5006.HeaderTextColor = new pc.Color(i5007[7], i5007[8], i5007[9], i5007[10])
  request.r(i5007[11], i5007[12], 0, i5006, 'MainOption1Tex')
  i5006.BGOption1Color = new pc.Color(i5007[13], i5007[14], i5007[15], i5007[16])
  i5006.Option1Name = i5007[17]
  i5006.Option1NameColor = new pc.Color(i5007[18], i5007[19], i5007[20], i5007[21])
  request.r(i5007[22], i5007[23], 0, i5006, 'MainOption2Tex')
  i5006.BGOption2Color = new pc.Color(i5007[24], i5007[25], i5007[26], i5007[27])
  i5006.Option2Name = i5007[28]
  i5006.Option2NameColor = new pc.Color(i5007[29], i5007[30], i5007[31], i5007[32])
  request.r(i5007[33], i5007[34], 0, i5006, 'BGImage')
  request.r(i5007[35], i5007[36], 0, i5006, 'musicSource')
  request.r(i5007[37], i5007[38], 0, i5006, 'header')
  request.r(i5007[39], i5007[40], 0, i5006, 'BGOption1ImageP')
  request.r(i5007[41], i5007[42], 0, i5006, 'mainOption1ImageP')
  request.r(i5007[43], i5007[44], 0, i5006, 'option1NameTextP')
  request.r(i5007[45], i5007[46], 0, i5006, 'BGOption1ImageL')
  request.r(i5007[47], i5007[48], 0, i5006, 'mainOption1ImageL')
  request.r(i5007[49], i5007[50], 0, i5006, 'option1NameTextL')
  request.r(i5007[51], i5007[52], 0, i5006, 'BGOption2ImageP')
  request.r(i5007[53], i5007[54], 0, i5006, 'mainOption2ImageP')
  request.r(i5007[55], i5007[56], 0, i5006, 'option2NameTextP')
  request.r(i5007[57], i5007[58], 0, i5006, 'BGOption2ImageL')
  request.r(i5007[59], i5007[60], 0, i5006, 'mainOption2ImageL')
  request.r(i5007[61], i5007[62], 0, i5006, 'option2NameTextL')
  request.r(i5007[63], i5007[64], 0, i5006, 'endCard')
  return i5006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i5008 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i5009 = data
  request.r(i5009[0], i5009[1], 0, i5008, 'clip')
  request.r(i5009[2], i5009[3], 0, i5008, 'outputAudioMixerGroup')
  i5008.playOnAwake = !!i5009[4]
  i5008.loop = !!i5009[5]
  i5008.time = i5009[6]
  i5008.volume = i5009[7]
  i5008.pitch = i5009[8]
  i5008.enabled = !!i5009[9]
  return i5008
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i5010 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i5011 = data
  i5010.ambientIntensity = i5011[0]
  i5010.reflectionIntensity = i5011[1]
  i5010.ambientMode = i5011[2]
  i5010.ambientLight = new pc.Color(i5011[3], i5011[4], i5011[5], i5011[6])
  i5010.ambientSkyColor = new pc.Color(i5011[7], i5011[8], i5011[9], i5011[10])
  i5010.ambientGroundColor = new pc.Color(i5011[11], i5011[12], i5011[13], i5011[14])
  i5010.ambientEquatorColor = new pc.Color(i5011[15], i5011[16], i5011[17], i5011[18])
  i5010.fogColor = new pc.Color(i5011[19], i5011[20], i5011[21], i5011[22])
  i5010.fogEndDistance = i5011[23]
  i5010.fogStartDistance = i5011[24]
  i5010.fogDensity = i5011[25]
  i5010.fog = !!i5011[26]
  request.r(i5011[27], i5011[28], 0, i5010, 'skybox')
  i5010.fogMode = i5011[29]
  var i5013 = i5011[30]
  var i5012 = []
  for(var i = 0; i < i5013.length; i += 1) {
    i5012.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i5013[i + 0]) );
  }
  i5010.lightmaps = i5012
  i5010.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i5011[31], i5010.lightProbes)
  i5010.lightmapsMode = i5011[32]
  i5010.mixedBakeMode = i5011[33]
  i5010.environmentLightingMode = i5011[34]
  i5010.ambientProbe = new pc.SphericalHarmonicsL2(i5011[35])
  request.r(i5011[36], i5011[37], 0, i5010, 'customReflection')
  request.r(i5011[38], i5011[39], 0, i5010, 'defaultReflection')
  i5010.defaultReflectionMode = i5011[40]
  i5010.defaultReflectionResolution = i5011[41]
  i5010.sunLightObjectId = i5011[42]
  i5010.pixelLightCount = i5011[43]
  i5010.defaultReflectionHDR = !!i5011[44]
  i5010.hasLightDataAsset = !!i5011[45]
  i5010.hasManualGenerate = !!i5011[46]
  return i5010
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i5016 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i5017 = data
  request.r(i5017[0], i5017[1], 0, i5016, 'lightmapColor')
  request.r(i5017[2], i5017[3], 0, i5016, 'lightmapDirection')
  request.r(i5017[4], i5017[5], 0, i5016, 'shadowMask')
  return i5016
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i5018 = root || new UnityEngine.LightProbes()
  var i5019 = data
  return i5018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i5026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i5027 = data
  var i5029 = i5027[0]
  var i5028 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i5029.length; i += 1) {
    i5028.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i5029[i + 0]));
  }
  i5026.ShaderCompilationErrors = i5028
  i5026.name = i5027[1]
  i5026.guid = i5027[2]
  var i5031 = i5027[3]
  var i5030 = []
  for(var i = 0; i < i5031.length; i += 1) {
    i5030.push( i5031[i + 0] );
  }
  i5026.shaderDefinedKeywords = i5030
  var i5033 = i5027[4]
  var i5032 = []
  for(var i = 0; i < i5033.length; i += 1) {
    i5032.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i5033[i + 0]) );
  }
  i5026.passes = i5032
  var i5035 = i5027[5]
  var i5034 = []
  for(var i = 0; i < i5035.length; i += 1) {
    i5034.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i5035[i + 0]) );
  }
  i5026.usePasses = i5034
  var i5037 = i5027[6]
  var i5036 = []
  for(var i = 0; i < i5037.length; i += 1) {
    i5036.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i5037[i + 0]) );
  }
  i5026.defaultParameterValues = i5036
  request.r(i5027[7], i5027[8], 0, i5026, 'unityFallbackShader')
  i5026.readDepth = !!i5027[9]
  i5026.hasDepthOnlyPass = !!i5027[10]
  i5026.isCreatedByShaderGraph = !!i5027[11]
  i5026.disableBatching = !!i5027[12]
  i5026.compiled = !!i5027[13]
  return i5026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i5040 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i5041 = data
  i5040.shaderName = i5041[0]
  i5040.errorMessage = i5041[1]
  return i5040
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i5046 = root || new pc.UnityShaderPass()
  var i5047 = data
  i5046.id = i5047[0]
  i5046.subShaderIndex = i5047[1]
  i5046.name = i5047[2]
  i5046.passType = i5047[3]
  i5046.grabPassTextureName = i5047[4]
  i5046.usePass = !!i5047[5]
  i5046.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[6], i5046.zTest)
  i5046.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[7], i5046.zWrite)
  i5046.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[8], i5046.culling)
  i5046.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i5047[9], i5046.blending)
  i5046.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i5047[10], i5046.alphaBlending)
  i5046.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[11], i5046.colorWriteMask)
  i5046.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[12], i5046.offsetUnits)
  i5046.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[13], i5046.offsetFactor)
  i5046.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[14], i5046.stencilRef)
  i5046.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[15], i5046.stencilReadMask)
  i5046.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5047[16], i5046.stencilWriteMask)
  i5046.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i5047[17], i5046.stencilOp)
  i5046.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i5047[18], i5046.stencilOpFront)
  i5046.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i5047[19], i5046.stencilOpBack)
  var i5049 = i5047[20]
  var i5048 = []
  for(var i = 0; i < i5049.length; i += 1) {
    i5048.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i5049[i + 0]) );
  }
  i5046.tags = i5048
  var i5051 = i5047[21]
  var i5050 = []
  for(var i = 0; i < i5051.length; i += 1) {
    i5050.push( i5051[i + 0] );
  }
  i5046.passDefinedKeywords = i5050
  var i5053 = i5047[22]
  var i5052 = []
  for(var i = 0; i < i5053.length; i += 1) {
    i5052.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i5053[i + 0]) );
  }
  i5046.passDefinedKeywordGroups = i5052
  var i5055 = i5047[23]
  var i5054 = []
  for(var i = 0; i < i5055.length; i += 1) {
    i5054.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i5055[i + 0]) );
  }
  i5046.variants = i5054
  var i5057 = i5047[24]
  var i5056 = []
  for(var i = 0; i < i5057.length; i += 1) {
    i5056.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i5057[i + 0]) );
  }
  i5046.excludedVariants = i5056
  i5046.hasDepthReader = !!i5047[25]
  return i5046
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i5058 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i5059 = data
  i5058.val = i5059[0]
  i5058.name = i5059[1]
  return i5058
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i5060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i5061 = data
  i5060.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5061[0], i5060.src)
  i5060.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5061[1], i5060.dst)
  i5060.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5061[2], i5060.op)
  return i5060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i5062 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i5063 = data
  i5062.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5063[0], i5062.pass)
  i5062.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5063[1], i5062.fail)
  i5062.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5063[2], i5062.zFail)
  i5062.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i5063[3], i5062.comp)
  return i5062
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i5066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i5067 = data
  i5066.name = i5067[0]
  i5066.value = i5067[1]
  return i5066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i5070 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i5071 = data
  var i5073 = i5071[0]
  var i5072 = []
  for(var i = 0; i < i5073.length; i += 1) {
    i5072.push( i5073[i + 0] );
  }
  i5070.keywords = i5072
  i5070.hasDiscard = !!i5071[1]
  return i5070
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i5076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i5077 = data
  i5076.passId = i5077[0]
  i5076.subShaderIndex = i5077[1]
  var i5079 = i5077[2]
  var i5078 = []
  for(var i = 0; i < i5079.length; i += 1) {
    i5078.push( i5079[i + 0] );
  }
  i5076.keywords = i5078
  i5076.vertexProgram = i5077[3]
  i5076.fragmentProgram = i5077[4]
  i5076.exportedForWebGl2 = !!i5077[5]
  i5076.readDepth = !!i5077[6]
  return i5076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i5082 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i5083 = data
  request.r(i5083[0], i5083[1], 0, i5082, 'shader')
  i5082.pass = i5083[2]
  return i5082
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i5086 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i5087 = data
  i5086.name = i5087[0]
  i5086.type = i5087[1]
  i5086.value = new pc.Vec4( i5087[2], i5087[3], i5087[4], i5087[5] )
  i5086.textureValue = i5087[6]
  i5086.shaderPropertyFlag = i5087[7]
  return i5086
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i5088 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i5089 = data
  i5088.name = i5089[0]
  request.r(i5089[1], i5089[2], 0, i5088, 'texture')
  i5088.aabb = i5089[3]
  i5088.vertices = i5089[4]
  i5088.triangles = i5089[5]
  i5088.textureRect = UnityEngine.Rect.MinMaxRect(i5089[6], i5089[7], i5089[8], i5089[9])
  i5088.packedRect = UnityEngine.Rect.MinMaxRect(i5089[10], i5089[11], i5089[12], i5089[13])
  i5088.border = new pc.Vec4( i5089[14], i5089[15], i5089[16], i5089[17] )
  i5088.transparency = i5089[18]
  i5088.bounds = i5089[19]
  i5088.pixelsPerUnit = i5089[20]
  i5088.textureWidth = i5089[21]
  i5088.textureHeight = i5089[22]
  i5088.nativeSize = new pc.Vec2( i5089[23], i5089[24] )
  i5088.pivot = new pc.Vec2( i5089[25], i5089[26] )
  i5088.textureRectOffset = new pc.Vec2( i5089[27], i5089[28] )
  return i5088
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i5090 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i5091 = data
  i5090.name = i5091[0]
  return i5090
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i5092 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i5093 = data
  i5092.name = i5093[0]
  i5092.bytes64 = i5093[1]
  i5092.data = i5093[2]
  return i5092
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i5094 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i5095 = data
  i5094.normalStyle = i5095[0]
  i5094.normalSpacingOffset = i5095[1]
  i5094.boldStyle = i5095[2]
  i5094.boldSpacing = i5095[3]
  i5094.italicStyle = i5095[4]
  i5094.tabSize = i5095[5]
  request.r(i5095[6], i5095[7], 0, i5094, 'atlas')
  i5094.m_SourceFontFileGUID = i5095[8]
  i5094.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i5095[9], i5094.m_CreationSettings)
  request.r(i5095[10], i5095[11], 0, i5094, 'm_SourceFontFile')
  i5094.m_SourceFontFilePath = i5095[12]
  i5094.m_AtlasPopulationMode = i5095[13]
  i5094.InternalDynamicOS = !!i5095[14]
  var i5097 = i5095[15]
  var i5096 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i5097.length; i += 1) {
    i5096.add(request.d('UnityEngine.TextCore.Glyph', i5097[i + 0]));
  }
  i5094.m_GlyphTable = i5096
  var i5099 = i5095[16]
  var i5098 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i5099.length; i += 1) {
    i5098.add(request.d('TMPro.TMP_Character', i5099[i + 0]));
  }
  i5094.m_CharacterTable = i5098
  var i5101 = i5095[17]
  var i5100 = []
  for(var i = 0; i < i5101.length; i += 2) {
  request.r(i5101[i + 0], i5101[i + 1], 2, i5100, '')
  }
  i5094.m_AtlasTextures = i5100
  i5094.m_AtlasTextureIndex = i5095[18]
  i5094.m_IsMultiAtlasTexturesEnabled = !!i5095[19]
  i5094.m_GetFontFeatures = !!i5095[20]
  i5094.m_ClearDynamicDataOnBuild = !!i5095[21]
  i5094.m_AtlasWidth = i5095[22]
  i5094.m_AtlasHeight = i5095[23]
  i5094.m_AtlasPadding = i5095[24]
  i5094.m_AtlasRenderMode = i5095[25]
  var i5103 = i5095[26]
  var i5102 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i5103.length; i += 1) {
    i5102.add(request.d('UnityEngine.TextCore.GlyphRect', i5103[i + 0]));
  }
  i5094.m_UsedGlyphRects = i5102
  var i5105 = i5095[27]
  var i5104 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i5105.length; i += 1) {
    i5104.add(request.d('UnityEngine.TextCore.GlyphRect', i5105[i + 0]));
  }
  i5094.m_FreeGlyphRects = i5104
  i5094.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i5095[28], i5094.m_FontFeatureTable)
  i5094.m_ShouldReimportFontFeatures = !!i5095[29]
  var i5107 = i5095[30]
  var i5106 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i5107.length; i += 2) {
  request.r(i5107[i + 0], i5107[i + 1], 1, i5106, '')
  }
  i5094.m_FallbackFontAssetTable = i5106
  var i5109 = i5095[31]
  var i5108 = []
  for(var i = 0; i < i5109.length; i += 1) {
    i5108.push( request.d('TMPro.TMP_FontWeightPair', i5109[i + 0]) );
  }
  i5094.m_FontWeightTable = i5108
  var i5111 = i5095[32]
  var i5110 = []
  for(var i = 0; i < i5111.length; i += 1) {
    i5110.push( request.d('TMPro.TMP_FontWeightPair', i5111[i + 0]) );
  }
  i5094.fontWeights = i5110
  i5094.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i5095[33], i5094.m_fontInfo)
  var i5113 = i5095[34]
  var i5112 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i5113.length; i += 1) {
    i5112.add(request.d('TMPro.TMP_Glyph', i5113[i + 0]));
  }
  i5094.m_glyphInfoList = i5112
  i5094.m_KerningTable = request.d('TMPro.KerningTable', i5095[35], i5094.m_KerningTable)
  var i5115 = i5095[36]
  var i5114 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i5115.length; i += 2) {
  request.r(i5115[i + 0], i5115[i + 1], 1, i5114, '')
  }
  i5094.fallbackFontAssets = i5114
  i5094.m_Version = i5095[37]
  i5094.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i5095[38], i5094.m_FaceInfo)
  request.r(i5095[39], i5095[40], 0, i5094, 'm_Material')
  return i5094
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i5116 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i5117 = data
  i5116.sourceFontFileName = i5117[0]
  i5116.sourceFontFileGUID = i5117[1]
  i5116.faceIndex = i5117[2]
  i5116.pointSizeSamplingMode = i5117[3]
  i5116.pointSize = i5117[4]
  i5116.padding = i5117[5]
  i5116.paddingMode = i5117[6]
  i5116.packingMode = i5117[7]
  i5116.atlasWidth = i5117[8]
  i5116.atlasHeight = i5117[9]
  i5116.characterSetSelectionMode = i5117[10]
  i5116.characterSequence = i5117[11]
  i5116.referencedFontAssetGUID = i5117[12]
  i5116.referencedTextAssetGUID = i5117[13]
  i5116.fontStyle = i5117[14]
  i5116.fontStyleModifier = i5117[15]
  i5116.renderMode = i5117[16]
  i5116.includeFontFeatures = !!i5117[17]
  return i5116
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i5120 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i5121 = data
  i5120.m_Index = i5121[0]
  i5120.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i5121[1], i5120.m_Metrics)
  i5120.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i5121[2], i5120.m_GlyphRect)
  i5120.m_Scale = i5121[3]
  i5120.m_AtlasIndex = i5121[4]
  i5120.m_ClassDefinitionType = i5121[5]
  return i5120
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i5122 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i5123 = data
  i5122.m_Width = i5123[0]
  i5122.m_Height = i5123[1]
  i5122.m_HorizontalBearingX = i5123[2]
  i5122.m_HorizontalBearingY = i5123[3]
  i5122.m_HorizontalAdvance = i5123[4]
  return i5122
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i5124 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i5125 = data
  i5124.m_X = i5125[0]
  i5124.m_Y = i5125[1]
  i5124.m_Width = i5125[2]
  i5124.m_Height = i5125[3]
  return i5124
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i5128 = root || request.c( 'TMPro.TMP_Character' )
  var i5129 = data
  i5128.m_ElementType = i5129[0]
  i5128.m_Unicode = i5129[1]
  i5128.m_GlyphIndex = i5129[2]
  i5128.m_Scale = i5129[3]
  return i5128
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i5134 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i5135 = data
  var i5137 = i5135[0]
  var i5136 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i5137.length; i += 1) {
    i5136.add(request.d('TMPro.MultipleSubstitutionRecord', i5137[i + 0]));
  }
  i5134.m_MultipleSubstitutionRecords = i5136
  var i5139 = i5135[1]
  var i5138 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i5139.length; i += 1) {
    i5138.add(request.d('TMPro.LigatureSubstitutionRecord', i5139[i + 0]));
  }
  i5134.m_LigatureSubstitutionRecords = i5138
  var i5141 = i5135[2]
  var i5140 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i5141.length; i += 1) {
    i5140.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i5141[i + 0]));
  }
  i5134.m_GlyphPairAdjustmentRecords = i5140
  var i5143 = i5135[3]
  var i5142 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i5143.length; i += 1) {
    i5142.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i5143[i + 0]));
  }
  i5134.m_MarkToBaseAdjustmentRecords = i5142
  var i5145 = i5135[4]
  var i5144 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i5145.length; i += 1) {
    i5144.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i5145[i + 0]));
  }
  i5134.m_MarkToMarkAdjustmentRecords = i5144
  return i5134
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i5148 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i5149 = data
  i5148.m_TargetGlyphID = i5149[0]
  i5148.m_SubstituteGlyphIDs = i5149[1]
  return i5148
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i5152 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i5153 = data
  i5152.m_ComponentGlyphIDs = i5153[0]
  i5152.m_LigatureGlyphID = i5153[1]
  return i5152
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i5156 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i5157 = data
  i5156.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i5157[0], i5156.m_FirstAdjustmentRecord)
  i5156.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i5157[1], i5156.m_SecondAdjustmentRecord)
  i5156.m_FeatureLookupFlags = i5157[2]
  return i5156
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i5160 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i5161 = data
  i5160.m_BaseGlyphID = i5161[0]
  i5160.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i5161[1], i5160.m_BaseGlyphAnchorPoint)
  i5160.m_MarkGlyphID = i5161[2]
  i5160.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i5161[3], i5160.m_MarkPositionAdjustment)
  return i5160
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i5164 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i5165 = data
  i5164.m_BaseMarkGlyphID = i5165[0]
  i5164.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i5165[1], i5164.m_BaseMarkGlyphAnchorPoint)
  i5164.m_CombiningMarkGlyphID = i5165[2]
  i5164.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i5165[3], i5164.m_CombiningMarkPositionAdjustment)
  return i5164
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i5170 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i5171 = data
  request.r(i5171[0], i5171[1], 0, i5170, 'regularTypeface')
  request.r(i5171[2], i5171[3], 0, i5170, 'italicTypeface')
  return i5170
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i5172 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i5173 = data
  i5172.Name = i5173[0]
  i5172.PointSize = i5173[1]
  i5172.Scale = i5173[2]
  i5172.CharacterCount = i5173[3]
  i5172.LineHeight = i5173[4]
  i5172.Baseline = i5173[5]
  i5172.Ascender = i5173[6]
  i5172.CapHeight = i5173[7]
  i5172.Descender = i5173[8]
  i5172.CenterLine = i5173[9]
  i5172.SuperscriptOffset = i5173[10]
  i5172.SubscriptOffset = i5173[11]
  i5172.SubSize = i5173[12]
  i5172.Underline = i5173[13]
  i5172.UnderlineThickness = i5173[14]
  i5172.strikethrough = i5173[15]
  i5172.strikethroughThickness = i5173[16]
  i5172.TabWidth = i5173[17]
  i5172.Padding = i5173[18]
  i5172.AtlasWidth = i5173[19]
  i5172.AtlasHeight = i5173[20]
  return i5172
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i5176 = root || request.c( 'TMPro.TMP_Glyph' )
  var i5177 = data
  i5176.id = i5177[0]
  i5176.x = i5177[1]
  i5176.y = i5177[2]
  i5176.width = i5177[3]
  i5176.height = i5177[4]
  i5176.xOffset = i5177[5]
  i5176.yOffset = i5177[6]
  i5176.xAdvance = i5177[7]
  i5176.scale = i5177[8]
  return i5176
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i5178 = root || request.c( 'TMPro.KerningTable' )
  var i5179 = data
  var i5181 = i5179[0]
  var i5180 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i5181.length; i += 1) {
    i5180.add(request.d('TMPro.KerningPair', i5181[i + 0]));
  }
  i5178.kerningPairs = i5180
  return i5178
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i5184 = root || request.c( 'TMPro.KerningPair' )
  var i5185 = data
  i5184.xOffset = i5185[0]
  i5184.m_FirstGlyph = i5185[1]
  i5184.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i5185[2], i5184.m_FirstGlyphAdjustments)
  i5184.m_SecondGlyph = i5185[3]
  i5184.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i5185[4], i5184.m_SecondGlyphAdjustments)
  i5184.m_IgnoreSpacingAdjustments = !!i5185[5]
  return i5184
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i5186 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i5187 = data
  i5186.m_FaceIndex = i5187[0]
  i5186.m_FamilyName = i5187[1]
  i5186.m_StyleName = i5187[2]
  i5186.m_PointSize = i5187[3]
  i5186.m_Scale = i5187[4]
  i5186.m_UnitsPerEM = i5187[5]
  i5186.m_LineHeight = i5187[6]
  i5186.m_AscentLine = i5187[7]
  i5186.m_CapLine = i5187[8]
  i5186.m_MeanLine = i5187[9]
  i5186.m_Baseline = i5187[10]
  i5186.m_DescentLine = i5187[11]
  i5186.m_SuperscriptOffset = i5187[12]
  i5186.m_SuperscriptSize = i5187[13]
  i5186.m_SubscriptOffset = i5187[14]
  i5186.m_SubscriptSize = i5187[15]
  i5186.m_UnderlineOffset = i5187[16]
  i5186.m_UnderlineThickness = i5187[17]
  i5186.m_StrikethroughOffset = i5187[18]
  i5186.m_StrikethroughThickness = i5187[19]
  i5186.m_TabWidth = i5187[20]
  return i5186
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i5188 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i5189 = data
  i5188.useSafeMode = !!i5189[0]
  i5188.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i5189[1], i5188.safeModeOptions)
  i5188.timeScale = i5189[2]
  i5188.unscaledTimeScale = i5189[3]
  i5188.useSmoothDeltaTime = !!i5189[4]
  i5188.maxSmoothUnscaledTime = i5189[5]
  i5188.rewindCallbackMode = i5189[6]
  i5188.showUnityEditorReport = !!i5189[7]
  i5188.logBehaviour = i5189[8]
  i5188.drawGizmos = !!i5189[9]
  i5188.defaultRecyclable = !!i5189[10]
  i5188.defaultAutoPlay = i5189[11]
  i5188.defaultUpdateType = i5189[12]
  i5188.defaultTimeScaleIndependent = !!i5189[13]
  i5188.defaultEaseType = i5189[14]
  i5188.defaultEaseOvershootOrAmplitude = i5189[15]
  i5188.defaultEasePeriod = i5189[16]
  i5188.defaultAutoKill = !!i5189[17]
  i5188.defaultLoopType = i5189[18]
  i5188.debugMode = !!i5189[19]
  i5188.debugStoreTargetId = !!i5189[20]
  i5188.showPreviewPanel = !!i5189[21]
  i5188.storeSettingsLocation = i5189[22]
  i5188.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i5189[23], i5188.modules)
  i5188.createASMDEF = !!i5189[24]
  i5188.showPlayingTweens = !!i5189[25]
  i5188.showPausedTweens = !!i5189[26]
  return i5188
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i5190 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i5191 = data
  i5190.logBehaviour = i5191[0]
  i5190.nestedTweenFailureBehaviour = i5191[1]
  return i5190
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i5192 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i5193 = data
  i5192.showPanel = !!i5193[0]
  i5192.audioEnabled = !!i5193[1]
  i5192.physicsEnabled = !!i5193[2]
  i5192.physics2DEnabled = !!i5193[3]
  i5192.spriteEnabled = !!i5193[4]
  i5192.uiEnabled = !!i5193[5]
  i5192.textMeshProEnabled = !!i5193[6]
  i5192.tk2DEnabled = !!i5193[7]
  i5192.deAudioEnabled = !!i5193[8]
  i5192.deUnityExtendedEnabled = !!i5193[9]
  i5192.epoOutlineEnabled = !!i5193[10]
  return i5192
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i5194 = root || request.c( 'TMPro.TMP_Settings' )
  var i5195 = data
  i5194.assetVersion = i5195[0]
  i5194.m_TextWrappingMode = i5195[1]
  i5194.m_enableKerning = !!i5195[2]
  var i5197 = i5195[3]
  var i5196 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i5197.length; i += 1) {
    i5196.add(i5197[i + 0]);
  }
  i5194.m_ActiveFontFeatures = i5196
  i5194.m_enableExtraPadding = !!i5195[4]
  i5194.m_enableTintAllSprites = !!i5195[5]
  i5194.m_enableParseEscapeCharacters = !!i5195[6]
  i5194.m_EnableRaycastTarget = !!i5195[7]
  i5194.m_GetFontFeaturesAtRuntime = !!i5195[8]
  i5194.m_missingGlyphCharacter = i5195[9]
  i5194.m_ClearDynamicDataOnBuild = !!i5195[10]
  i5194.m_warningsDisabled = !!i5195[11]
  request.r(i5195[12], i5195[13], 0, i5194, 'm_defaultFontAsset')
  i5194.m_defaultFontAssetPath = i5195[14]
  i5194.m_defaultFontSize = i5195[15]
  i5194.m_defaultAutoSizeMinRatio = i5195[16]
  i5194.m_defaultAutoSizeMaxRatio = i5195[17]
  i5194.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i5195[18], i5195[19] )
  i5194.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i5195[20], i5195[21] )
  i5194.m_autoSizeTextContainer = !!i5195[22]
  i5194.m_IsTextObjectScaleStatic = !!i5195[23]
  var i5199 = i5195[24]
  var i5198 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i5199.length; i += 2) {
  request.r(i5199[i + 0], i5199[i + 1], 1, i5198, '')
  }
  i5194.m_fallbackFontAssets = i5198
  i5194.m_matchMaterialPreset = !!i5195[25]
  i5194.m_HideSubTextObjects = !!i5195[26]
  request.r(i5195[27], i5195[28], 0, i5194, 'm_defaultSpriteAsset')
  i5194.m_defaultSpriteAssetPath = i5195[29]
  i5194.m_enableEmojiSupport = !!i5195[30]
  i5194.m_MissingCharacterSpriteUnicode = i5195[31]
  var i5201 = i5195[32]
  var i5200 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i5201.length; i += 2) {
  request.r(i5201[i + 0], i5201[i + 1], 1, i5200, '')
  }
  i5194.m_EmojiFallbackTextAssets = i5200
  i5194.m_defaultColorGradientPresetsPath = i5195[33]
  request.r(i5195[34], i5195[35], 0, i5194, 'm_defaultStyleSheet')
  i5194.m_StyleSheetsResourcePath = i5195[36]
  request.r(i5195[37], i5195[38], 0, i5194, 'm_leadingCharacters')
  request.r(i5195[39], i5195[40], 0, i5194, 'm_followingCharacters')
  i5194.m_UseModernHangulLineBreakingRules = !!i5195[41]
  return i5194
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i5204 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i5205 = data
  request.r(i5205[0], i5205[1], 0, i5204, 'spriteSheet')
  var i5207 = i5205[2]
  var i5206 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i5207.length; i += 1) {
    i5206.add(request.d('TMPro.TMP_Sprite', i5207[i + 0]));
  }
  i5204.spriteInfoList = i5206
  var i5209 = i5205[3]
  var i5208 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i5209.length; i += 2) {
  request.r(i5209[i + 0], i5209[i + 1], 1, i5208, '')
  }
  i5204.fallbackSpriteAssets = i5208
  var i5211 = i5205[4]
  var i5210 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i5211.length; i += 1) {
    i5210.add(request.d('TMPro.TMP_SpriteCharacter', i5211[i + 0]));
  }
  i5204.m_SpriteCharacterTable = i5210
  var i5213 = i5205[5]
  var i5212 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i5213.length; i += 1) {
    i5212.add(request.d('TMPro.TMP_SpriteGlyph', i5213[i + 0]));
  }
  i5204.m_GlyphTable = i5212
  i5204.m_Version = i5205[6]
  i5204.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i5205[7], i5204.m_FaceInfo)
  request.r(i5205[8], i5205[9], 0, i5204, 'm_Material')
  return i5204
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i5216 = root || request.c( 'TMPro.TMP_Sprite' )
  var i5217 = data
  i5216.name = i5217[0]
  i5216.hashCode = i5217[1]
  i5216.unicode = i5217[2]
  i5216.pivot = new pc.Vec2( i5217[3], i5217[4] )
  request.r(i5217[5], i5217[6], 0, i5216, 'sprite')
  i5216.id = i5217[7]
  i5216.x = i5217[8]
  i5216.y = i5217[9]
  i5216.width = i5217[10]
  i5216.height = i5217[11]
  i5216.xOffset = i5217[12]
  i5216.yOffset = i5217[13]
  i5216.xAdvance = i5217[14]
  i5216.scale = i5217[15]
  return i5216
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i5222 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i5223 = data
  i5222.m_Name = i5223[0]
  i5222.m_ElementType = i5223[1]
  i5222.m_Unicode = i5223[2]
  i5222.m_GlyphIndex = i5223[3]
  i5222.m_Scale = i5223[4]
  return i5222
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i5226 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i5227 = data
  request.r(i5227[0], i5227[1], 0, i5226, 'sprite')
  i5226.m_Index = i5227[2]
  i5226.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i5227[3], i5226.m_Metrics)
  i5226.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i5227[4], i5226.m_GlyphRect)
  i5226.m_Scale = i5227[5]
  i5226.m_AtlasIndex = i5227[6]
  i5226.m_ClassDefinitionType = i5227[7]
  return i5226
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i5228 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i5229 = data
  var i5231 = i5229[0]
  var i5230 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i5231.length; i += 1) {
    i5230.add(request.d('TMPro.TMP_Style', i5231[i + 0]));
  }
  i5228.m_StyleList = i5230
  return i5228
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i5234 = root || request.c( 'TMPro.TMP_Style' )
  var i5235 = data
  i5234.m_Name = i5235[0]
  i5234.m_HashCode = i5235[1]
  i5234.m_OpeningDefinition = i5235[2]
  i5234.m_ClosingDefinition = i5235[3]
  i5234.m_OpeningTagArray = i5235[4]
  i5234.m_ClosingTagArray = i5235[5]
  return i5234
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i5236 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i5237 = data
  var i5239 = i5237[0]
  var i5238 = []
  for(var i = 0; i < i5239.length; i += 1) {
    i5238.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i5239[i + 0]) );
  }
  i5236.files = i5238
  i5236.componentToPrefabIds = i5237[1]
  return i5236
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i5242 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i5243 = data
  i5242.path = i5243[0]
  request.r(i5243[1], i5243[2], 0, i5242, 'unityObject')
  return i5242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i5244 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i5245 = data
  var i5247 = i5245[0]
  var i5246 = []
  for(var i = 0; i < i5247.length; i += 1) {
    i5246.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i5247[i + 0]) );
  }
  i5244.scriptsExecutionOrder = i5246
  var i5249 = i5245[1]
  var i5248 = []
  for(var i = 0; i < i5249.length; i += 1) {
    i5248.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i5249[i + 0]) );
  }
  i5244.sortingLayers = i5248
  var i5251 = i5245[2]
  var i5250 = []
  for(var i = 0; i < i5251.length; i += 1) {
    i5250.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i5251[i + 0]) );
  }
  i5244.cullingLayers = i5250
  i5244.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i5245[3], i5244.timeSettings)
  i5244.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i5245[4], i5244.physicsSettings)
  i5244.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i5245[5], i5244.physics2DSettings)
  i5244.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i5245[6], i5244.qualitySettings)
  i5244.enableRealtimeShadows = !!i5245[7]
  i5244.enableAutoInstancing = !!i5245[8]
  i5244.enableStaticBatching = !!i5245[9]
  i5244.enableDynamicBatching = !!i5245[10]
  i5244.usePreservativeDynamicBatching = !!i5245[11]
  i5244.lightmapEncodingQuality = i5245[12]
  i5244.desiredColorSpace = i5245[13]
  var i5253 = i5245[14]
  var i5252 = []
  for(var i = 0; i < i5253.length; i += 1) {
    i5252.push( i5253[i + 0] );
  }
  i5244.allTags = i5252
  return i5244
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i5256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i5257 = data
  i5256.name = i5257[0]
  i5256.value = i5257[1]
  return i5256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i5260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i5261 = data
  i5260.id = i5261[0]
  i5260.name = i5261[1]
  i5260.value = i5261[2]
  return i5260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i5264 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i5265 = data
  i5264.id = i5265[0]
  i5264.name = i5265[1]
  return i5264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i5266 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i5267 = data
  i5266.fixedDeltaTime = i5267[0]
  i5266.maximumDeltaTime = i5267[1]
  i5266.timeScale = i5267[2]
  i5266.maximumParticleTimestep = i5267[3]
  return i5266
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i5268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i5269 = data
  i5268.gravity = new pc.Vec3( i5269[0], i5269[1], i5269[2] )
  i5268.defaultSolverIterations = i5269[3]
  i5268.bounceThreshold = i5269[4]
  i5268.autoSyncTransforms = !!i5269[5]
  i5268.autoSimulation = !!i5269[6]
  var i5271 = i5269[7]
  var i5270 = []
  for(var i = 0; i < i5271.length; i += 1) {
    i5270.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i5271[i + 0]) );
  }
  i5268.collisionMatrix = i5270
  return i5268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i5274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i5275 = data
  i5274.enabled = !!i5275[0]
  i5274.layerId = i5275[1]
  i5274.otherLayerId = i5275[2]
  return i5274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i5276 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i5277 = data
  request.r(i5277[0], i5277[1], 0, i5276, 'material')
  i5276.gravity = new pc.Vec2( i5277[2], i5277[3] )
  i5276.positionIterations = i5277[4]
  i5276.velocityIterations = i5277[5]
  i5276.velocityThreshold = i5277[6]
  i5276.maxLinearCorrection = i5277[7]
  i5276.maxAngularCorrection = i5277[8]
  i5276.maxTranslationSpeed = i5277[9]
  i5276.maxRotationSpeed = i5277[10]
  i5276.baumgarteScale = i5277[11]
  i5276.baumgarteTOIScale = i5277[12]
  i5276.timeToSleep = i5277[13]
  i5276.linearSleepTolerance = i5277[14]
  i5276.angularSleepTolerance = i5277[15]
  i5276.defaultContactOffset = i5277[16]
  i5276.autoSimulation = !!i5277[17]
  i5276.queriesHitTriggers = !!i5277[18]
  i5276.queriesStartInColliders = !!i5277[19]
  i5276.callbacksOnDisable = !!i5277[20]
  i5276.reuseCollisionCallbacks = !!i5277[21]
  i5276.autoSyncTransforms = !!i5277[22]
  var i5279 = i5277[23]
  var i5278 = []
  for(var i = 0; i < i5279.length; i += 1) {
    i5278.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i5279[i + 0]) );
  }
  i5276.collisionMatrix = i5278
  return i5276
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i5282 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i5283 = data
  i5282.enabled = !!i5283[0]
  i5282.layerId = i5283[1]
  i5282.otherLayerId = i5283[2]
  return i5282
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i5284 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i5285 = data
  var i5287 = i5285[0]
  var i5286 = []
  for(var i = 0; i < i5287.length; i += 1) {
    i5286.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i5287[i + 0]) );
  }
  i5284.qualityLevels = i5286
  var i5289 = i5285[1]
  var i5288 = []
  for(var i = 0; i < i5289.length; i += 1) {
    i5288.push( i5289[i + 0] );
  }
  i5284.names = i5288
  i5284.shadows = i5285[2]
  i5284.anisotropicFiltering = i5285[3]
  i5284.antiAliasing = i5285[4]
  i5284.lodBias = i5285[5]
  i5284.shadowCascades = i5285[6]
  i5284.shadowDistance = i5285[7]
  i5284.shadowmaskMode = i5285[8]
  i5284.shadowProjection = i5285[9]
  i5284.shadowResolution = i5285[10]
  i5284.softParticles = !!i5285[11]
  i5284.softVegetation = !!i5285[12]
  i5284.activeColorSpace = i5285[13]
  i5284.desiredColorSpace = i5285[14]
  i5284.masterTextureLimit = i5285[15]
  i5284.maxQueuedFrames = i5285[16]
  i5284.particleRaycastBudget = i5285[17]
  i5284.pixelLightCount = i5285[18]
  i5284.realtimeReflectionProbes = !!i5285[19]
  i5284.shadowCascade2Split = i5285[20]
  i5284.shadowCascade4Split = new pc.Vec3( i5285[21], i5285[22], i5285[23] )
  i5284.streamingMipmapsActive = !!i5285[24]
  i5284.vSyncCount = i5285[25]
  i5284.asyncUploadBufferSize = i5285[26]
  i5284.asyncUploadTimeSlice = i5285[27]
  i5284.billboardsFaceCameraPosition = !!i5285[28]
  i5284.shadowNearPlaneOffset = i5285[29]
  i5284.streamingMipmapsMemoryBudget = i5285[30]
  i5284.maximumLODLevel = i5285[31]
  i5284.streamingMipmapsAddAllCameras = !!i5285[32]
  i5284.streamingMipmapsMaxLevelReduction = i5285[33]
  i5284.streamingMipmapsRenderersPerFrame = i5285[34]
  i5284.resolutionScalingFixedDPIFactor = i5285[35]
  i5284.streamingMipmapsMaxFileIORequests = i5285[36]
  i5284.currentQualityLevel = i5285[37]
  return i5284
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i5292 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i5293 = data
  request.r(i5293[0], i5293[1], 0, i5292, 'm_ObjectArgument')
  i5292.m_ObjectArgumentAssemblyTypeName = i5293[2]
  i5292.m_IntArgument = i5293[3]
  i5292.m_FloatArgument = i5293[4]
  i5292.m_StringArgument = i5293[5]
  i5292.m_BoolArgument = !!i5293[6]
  return i5292
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i5294 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i5295 = data
  i5294.m_GlyphIndex = i5295[0]
  i5294.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i5295[1], i5294.m_GlyphValueRecord)
  return i5294
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i5296 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i5297 = data
  i5296.m_XCoordinate = i5297[0]
  i5296.m_YCoordinate = i5297[1]
  return i5296
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i5298 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i5299 = data
  i5298.m_XPositionAdjustment = i5299[0]
  i5298.m_YPositionAdjustment = i5299[1]
  return i5298
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i5300 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i5301 = data
  i5300.xPlacement = i5301[0]
  i5300.yPlacement = i5301[1]
  i5300.xAdvance = i5301[2]
  i5300.yAdvance = i5301[3]
  return i5300
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i5302 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i5303 = data
  i5302.m_XPlacement = i5303[0]
  i5302.m_YPlacement = i5303[1]
  i5302.m_XAdvance = i5303[2]
  i5302.m_YAdvance = i5303[3]
  return i5302
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[40],"41":[2],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[2],"64":[65],"66":[67],"68":[67],"8":[7],"69":[70],"71":[2],"72":[73],"74":[7],"75":[11,7],"76":[65],"77":[11,7],"78":[7],"79":[7],"80":[65,7],"14":[7,11],"81":[82],"83":[82],"84":[82],"85":[7],"86":[7],"10":[8],"19":[11,7],"12":[7],"9":[8],"87":[7],"88":[7],"89":[7],"90":[7],"91":[7],"92":[7],"93":[7],"94":[7],"95":[7],"13":[11,7],"96":[7],"97":[7],"98":[7],"99":[7],"100":[11,7],"101":[7],"102":[5],"103":[5],"6":[5],"104":[5],"105":[2],"106":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.RawImage","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.Sprite","TutController","UnityEngine.UI.Button","LayoutController","LunaController","UnityEngine.AudioClip","UnityEngine.AudioSource","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.MeshRenderer","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.U2D.Animation.SpriteSkin","UnityEngine.SpriteRenderer","UnityEngine.U2D.PixelPerfectCamera","UnityEngine.U2D.SpriteShapeController","UnityEngine.U2D.SpriteShapeRenderer","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.78f1";

Deserializers.productName = "PEOP_V35";

Deserializers.lunaInitializationTime = "09/03/2026 04:07:34";

Deserializers.lunaDaysRunning = "0.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "CWBC_V07_NgocBTU_TamNTM";

Deserializers.lunaAppID = "33333";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1774";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4090";

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

Deserializers.buildID = "bae398ed-378b-4657-a8b9-958b2564d22c";

Deserializers.runtimeInitializeOnLoadInfos = [[["Unity","PerformanceTesting","PerformanceTest","ResetStaticsOnLoad"],["UnityEngine","U2D","Animation","GpuDeformationSystem","CreateFallbackBuffer"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"],["$BurstDirectCallInitializer","Initialize"]],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Unity","PerformanceTesting","Data","RunSettings","ResetStaticsOnLoad"],["Unity","PerformanceTesting","PlayerCallbacks","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

