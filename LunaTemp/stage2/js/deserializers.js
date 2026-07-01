var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i610 = root || request.c( 'UnityEngine.JointSpring' )
  var i611 = data
  i610.spring = i611[0]
  i610.damper = i611[1]
  i610.targetPosition = i611[2]
  return i610
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i612 = root || request.c( 'UnityEngine.JointMotor' )
  var i613 = data
  i612.m_TargetVelocity = i613[0]
  i612.m_Force = i613[1]
  i612.m_FreeSpin = i613[2]
  return i612
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i614 = root || request.c( 'UnityEngine.JointLimits' )
  var i615 = data
  i614.m_Min = i615[0]
  i614.m_Max = i615[1]
  i614.m_Bounciness = i615[2]
  i614.m_BounceMinVelocity = i615[3]
  i614.m_ContactDistance = i615[4]
  i614.minBounce = i615[5]
  i614.maxBounce = i615[6]
  return i614
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i616 = root || request.c( 'UnityEngine.JointDrive' )
  var i617 = data
  i616.m_PositionSpring = i617[0]
  i616.m_PositionDamper = i617[1]
  i616.m_MaximumForce = i617[2]
  i616.m_UseAcceleration = i617[3]
  return i616
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i618 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i619 = data
  i618.m_Spring = i619[0]
  i618.m_Damper = i619[1]
  return i618
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i620 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i621 = data
  i620.m_Limit = i621[0]
  i620.m_Bounciness = i621[1]
  i620.m_ContactDistance = i621[2]
  return i620
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i622 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i623 = data
  i622.m_ExtremumSlip = i623[0]
  i622.m_ExtremumValue = i623[1]
  i622.m_AsymptoteSlip = i623[2]
  i622.m_AsymptoteValue = i623[3]
  i622.m_Stiffness = i623[4]
  return i622
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i624 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i625 = data
  i624.m_LowerAngle = i625[0]
  i624.m_UpperAngle = i625[1]
  return i624
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i626 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i627 = data
  i626.m_MotorSpeed = i627[0]
  i626.m_MaximumMotorTorque = i627[1]
  return i626
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i628 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i629 = data
  i628.m_DampingRatio = i629[0]
  i628.m_Frequency = i629[1]
  i628.m_Angle = i629[2]
  return i628
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i630 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i631 = data
  i630.m_LowerTranslation = i631[0]
  i630.m_UpperTranslation = i631[1]
  return i630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i632 = root || new pc.UnityMaterial()
  var i633 = data
  i632.name = i633[0]
  request.r(i633[1], i633[2], 0, i632, 'shader')
  i632.renderQueue = i633[3]
  i632.enableInstancing = !!i633[4]
  var i635 = i633[5]
  var i634 = []
  for(var i = 0; i < i635.length; i += 1) {
    i634.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i635[i + 0]) );
  }
  i632.floatParameters = i634
  var i637 = i633[6]
  var i636 = []
  for(var i = 0; i < i637.length; i += 1) {
    i636.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i637[i + 0]) );
  }
  i632.colorParameters = i636
  var i639 = i633[7]
  var i638 = []
  for(var i = 0; i < i639.length; i += 1) {
    i638.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i639[i + 0]) );
  }
  i632.vectorParameters = i638
  var i641 = i633[8]
  var i640 = []
  for(var i = 0; i < i641.length; i += 1) {
    i640.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i641[i + 0]) );
  }
  i632.textureParameters = i640
  var i643 = i633[9]
  var i642 = []
  for(var i = 0; i < i643.length; i += 1) {
    i642.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i643[i + 0]) );
  }
  i632.materialFlags = i642
  return i632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i647 = data
  i646.name = i647[0]
  i646.value = i647[1]
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i650 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i651 = data
  i650.name = i651[0]
  i650.value = new pc.Color(i651[1], i651[2], i651[3], i651[4])
  return i650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i655 = data
  i654.name = i655[0]
  i654.value = new pc.Vec4( i655[1], i655[2], i655[3], i655[4] )
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i659 = data
  i658.name = i659[0]
  request.r(i659[1], i659[2], 0, i658, 'value')
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i663 = data
  i662.name = i663[0]
  i662.enabled = !!i663[1]
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i664 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i665 = data
  i664.name = i665[0]
  i664.width = i665[1]
  i664.height = i665[2]
  i664.mipmapCount = i665[3]
  i664.anisoLevel = i665[4]
  i664.filterMode = i665[5]
  i664.hdr = !!i665[6]
  i664.format = i665[7]
  i664.wrapMode = i665[8]
  i664.alphaIsTransparency = !!i665[9]
  i664.alphaSource = i665[10]
  i664.graphicsFormat = i665[11]
  i664.sRGBTexture = !!i665[12]
  i664.desiredColorSpace = i665[13]
  i664.wrapU = i665[14]
  i664.wrapV = i665[15]
  return i664
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i667 = data
  i666.name = i667[0]
  i666.halfPrecision = !!i667[1]
  i666.useSimplification = !!i667[2]
  i666.useUInt32IndexFormat = !!i667[3]
  i666.vertexCount = i667[4]
  i666.aabb = i667[5]
  var i669 = i667[6]
  var i668 = []
  for(var i = 0; i < i669.length; i += 1) {
    i668.push( !!i669[i + 0] );
  }
  i666.streams = i668
  i666.vertices = i667[7]
  var i671 = i667[8]
  var i670 = []
  for(var i = 0; i < i671.length; i += 1) {
    i670.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i671[i + 0]) );
  }
  i666.subMeshes = i670
  var i673 = i667[9]
  var i672 = []
  for(var i = 0; i < i673.length; i += 16) {
    i672.push( new pc.Mat4().setData(i673[i + 0], i673[i + 1], i673[i + 2], i673[i + 3],  i673[i + 4], i673[i + 5], i673[i + 6], i673[i + 7],  i673[i + 8], i673[i + 9], i673[i + 10], i673[i + 11],  i673[i + 12], i673[i + 13], i673[i + 14], i673[i + 15]) );
  }
  i666.bindposes = i672
  var i675 = i667[10]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i675[i + 0]) );
  }
  i666.blendShapes = i674
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i680 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i681 = data
  i680.triangles = i681[0]
  return i680
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i687 = data
  i686.name = i687[0]
  var i689 = i687[1]
  var i688 = []
  for(var i = 0; i < i689.length; i += 1) {
    i688.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i689[i + 0]) );
  }
  i686.frames = i688
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i691 = data
  i690.name = i691[0]
  i690.atlasId = i691[1]
  i690.mipmapCount = i691[2]
  i690.hdr = !!i691[3]
  i690.size = i691[4]
  i690.anisoLevel = i691[5]
  i690.filterMode = i691[6]
  var i693 = i691[7]
  var i692 = []
  for(var i = 0; i < i693.length; i += 4) {
    i692.push( UnityEngine.Rect.MinMaxRect(i693[i + 0], i693[i + 1], i693[i + 2], i693[i + 3]) );
  }
  i690.rects = i692
  i690.wrapU = i691[8]
  i690.wrapV = i691[9]
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i697 = data
  i696.name = i697[0]
  i696.index = i697[1]
  i696.startup = !!i697[2]
  return i696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i699 = data
  i698.aspect = i699[0]
  i698.orthographic = !!i699[1]
  i698.orthographicSize = i699[2]
  i698.backgroundColor = new pc.Color(i699[3], i699[4], i699[5], i699[6])
  i698.nearClipPlane = i699[7]
  i698.farClipPlane = i699[8]
  i698.fieldOfView = i699[9]
  i698.depth = i699[10]
  i698.clearFlags = i699[11]
  i698.cullingMask = i699[12]
  i698.rect = i699[13]
  request.r(i699[14], i699[15], 0, i698, 'targetTexture')
  i698.usePhysicalProperties = !!i699[16]
  i698.focalLength = i699[17]
  i698.sensorSize = new pc.Vec2( i699[18], i699[19] )
  i698.lensShift = new pc.Vec2( i699[20], i699[21] )
  i698.gateFit = i699[22]
  i698.commandBufferCount = i699[23]
  i698.cameraType = i699[24]
  i698.enabled = !!i699[25]
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i701 = data
  i700.name = i701[0]
  i700.tagId = i701[1]
  i700.enabled = !!i701[2]
  i700.isStatic = !!i701[3]
  i700.layer = i701[4]
  return i700
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i702 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i703 = data
  request.r(i703[0], i703[1], 0, i702, 'm_FirstSelected')
  i702.m_sendNavigationEvents = !!i703[2]
  i702.m_DragThreshold = i703[3]
  return i702
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i704 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i705 = data
  i704.m_HorizontalAxis = i705[0]
  i704.m_VerticalAxis = i705[1]
  i704.m_SubmitButton = i705[2]
  i704.m_CancelButton = i705[3]
  i704.m_InputActionsPerSecond = i705[4]
  i704.m_RepeatDelay = i705[5]
  i704.m_ForceModuleActive = !!i705[6]
  i704.m_SendPointerHoverToParent = !!i705[7]
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i707 = data
  i706.type = i707[0]
  i706.color = new pc.Color(i707[1], i707[2], i707[3], i707[4])
  i706.cullingMask = i707[5]
  i706.intensity = i707[6]
  i706.range = i707[7]
  i706.spotAngle = i707[8]
  i706.shadows = i707[9]
  i706.shadowNormalBias = i707[10]
  i706.shadowBias = i707[11]
  i706.shadowStrength = i707[12]
  i706.shadowResolution = i707[13]
  i706.lightmapBakeType = i707[14]
  i706.renderMode = i707[15]
  request.r(i707[16], i707[17], 0, i706, 'cookie')
  i706.cookieSize = i707[18]
  i706.shadowNearPlane = i707[19]
  i706.occlusionMaskChannel = i707[20]
  i706.isBaked = !!i707[21]
  i706.mixedLightingMode = i707[22]
  i706.enabled = !!i707[23]
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i709 = data
  i708.pivot = new pc.Vec2( i709[0], i709[1] )
  i708.anchorMin = new pc.Vec2( i709[2], i709[3] )
  i708.anchorMax = new pc.Vec2( i709[4], i709[5] )
  i708.sizeDelta = new pc.Vec2( i709[6], i709[7] )
  i708.anchoredPosition3D = new pc.Vec3( i709[8], i709[9], i709[10] )
  i708.rotation = new pc.Quat(i709[11], i709[12], i709[13], i709[14])
  i708.scale = new pc.Vec3( i709[15], i709[16], i709[17] )
  return i708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i711 = data
  i710.planeDistance = i711[0]
  i710.referencePixelsPerUnit = i711[1]
  i710.isFallbackOverlay = !!i711[2]
  i710.renderMode = i711[3]
  i710.renderOrder = i711[4]
  i710.sortingLayerName = i711[5]
  i710.sortingOrder = i711[6]
  i710.scaleFactor = i711[7]
  request.r(i711[8], i711[9], 0, i710, 'worldCamera')
  i710.overrideSorting = !!i711[10]
  i710.pixelPerfect = !!i711[11]
  i710.targetDisplay = i711[12]
  i710.overridePixelPerfect = !!i711[13]
  i710.enabled = !!i711[14]
  return i710
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i712 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i713 = data
  i712.m_UiScaleMode = i713[0]
  i712.m_ReferencePixelsPerUnit = i713[1]
  i712.m_ScaleFactor = i713[2]
  i712.m_ReferenceResolution = new pc.Vec2( i713[3], i713[4] )
  i712.m_ScreenMatchMode = i713[5]
  i712.m_MatchWidthOrHeight = i713[6]
  i712.m_PhysicalUnit = i713[7]
  i712.m_FallbackScreenDPI = i713[8]
  i712.m_DefaultSpriteDPI = i713[9]
  i712.m_DynamicPixelsPerUnit = i713[10]
  i712.m_PresetInfoIsWorld = !!i713[11]
  return i712
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i714 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i715 = data
  i714.m_IgnoreReversedGraphics = !!i715[0]
  i714.m_BlockingObjects = i715[1]
  i714.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i715[2] )
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i717 = data
  i716.cullTransparentMesh = !!i717[0]
  return i716
}

Deserializers["TMPro.TextMeshProUGUI"] = function (request, data, root) {
  var i718 = root || request.c( 'TMPro.TextMeshProUGUI' )
  var i719 = data
  i718.m_hasFontAssetChanged = !!i719[0]
  request.r(i719[1], i719[2], 0, i718, 'm_baseMaterial')
  i718.m_maskOffset = new pc.Vec4( i719[3], i719[4], i719[5], i719[6] )
  i718.m_text = i719[7]
  i718.m_isRightToLeft = !!i719[8]
  request.r(i719[9], i719[10], 0, i718, 'm_fontAsset')
  request.r(i719[11], i719[12], 0, i718, 'm_sharedMaterial')
  var i721 = i719[13]
  var i720 = []
  for(var i = 0; i < i721.length; i += 2) {
  request.r(i721[i + 0], i721[i + 1], 2, i720, '')
  }
  i718.m_fontSharedMaterials = i720
  request.r(i719[14], i719[15], 0, i718, 'm_fontMaterial')
  var i723 = i719[16]
  var i722 = []
  for(var i = 0; i < i723.length; i += 2) {
  request.r(i723[i + 0], i723[i + 1], 2, i722, '')
  }
  i718.m_fontMaterials = i722
  i718.m_fontColor32 = UnityEngine.Color32.ConstructColor(i719[17], i719[18], i719[19], i719[20])
  i718.m_fontColor = new pc.Color(i719[21], i719[22], i719[23], i719[24])
  i718.m_enableVertexGradient = !!i719[25]
  i718.m_colorMode = i719[26]
  i718.m_fontColorGradient = request.d('TMPro.VertexGradient', i719[27], i718.m_fontColorGradient)
  request.r(i719[28], i719[29], 0, i718, 'm_fontColorGradientPreset')
  request.r(i719[30], i719[31], 0, i718, 'm_spriteAsset')
  i718.m_tintAllSprites = !!i719[32]
  request.r(i719[33], i719[34], 0, i718, 'm_StyleSheet')
  i718.m_TextStyleHashCode = i719[35]
  i718.m_overrideHtmlColors = !!i719[36]
  i718.m_faceColor = UnityEngine.Color32.ConstructColor(i719[37], i719[38], i719[39], i719[40])
  i718.m_fontSize = i719[41]
  i718.m_fontSizeBase = i719[42]
  i718.m_fontWeight = i719[43]
  i718.m_enableAutoSizing = !!i719[44]
  i718.m_fontSizeMin = i719[45]
  i718.m_fontSizeMax = i719[46]
  i718.m_fontStyle = i719[47]
  i718.m_HorizontalAlignment = i719[48]
  i718.m_VerticalAlignment = i719[49]
  i718.m_textAlignment = i719[50]
  i718.m_characterSpacing = i719[51]
  i718.m_characterHorizontalScale = i719[52]
  i718.m_wordSpacing = i719[53]
  i718.m_lineSpacing = i719[54]
  i718.m_lineSpacingMax = i719[55]
  i718.m_paragraphSpacing = i719[56]
  i718.m_charWidthMaxAdj = i719[57]
  i718.m_TextWrappingMode = i719[58]
  i718.m_wordWrappingRatios = i719[59]
  i718.m_overflowMode = i719[60]
  request.r(i719[61], i719[62], 0, i718, 'm_linkedTextComponent')
  request.r(i719[63], i719[64], 0, i718, 'parentLinkedComponent')
  i718.m_enableKerning = !!i719[65]
  var i725 = i719[66]
  var i724 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i725.length; i += 1) {
    i724.add(i725[i + 0]);
  }
  i718.m_ActiveFontFeatures = i724
  i718.m_enableExtraPadding = !!i719[67]
  i718.checkPaddingRequired = !!i719[68]
  i718.m_isRichText = !!i719[69]
  i718.m_parseCtrlCharacters = !!i719[70]
  i718.m_isOrthographic = !!i719[71]
  i718.m_isCullingEnabled = !!i719[72]
  i718.m_horizontalMapping = i719[73]
  i718.m_verticalMapping = i719[74]
  i718.m_uvLineOffset = i719[75]
  i718.m_geometrySortingOrder = i719[76]
  i718.m_IsTextObjectScaleStatic = !!i719[77]
  i718.m_VertexBufferAutoSizeReduction = !!i719[78]
  i718.m_useMaxVisibleDescender = !!i719[79]
  i718.m_pageToDisplay = i719[80]
  i718.m_margin = new pc.Vec4( i719[81], i719[82], i719[83], i719[84] )
  i718.m_isUsingLegacyAnimationComponent = !!i719[85]
  i718.m_isVolumetricText = !!i719[86]
  request.r(i719[87], i719[88], 0, i718, 'm_Material')
  i718.m_EmojiFallbackSupport = !!i719[89]
  i718.m_Maskable = !!i719[90]
  i718.m_Color = new pc.Color(i719[91], i719[92], i719[93], i719[94])
  i718.m_RaycastTarget = !!i719[95]
  i718.m_RaycastPadding = new pc.Vec4( i719[96], i719[97], i719[98], i719[99] )
  return i718
}

Deserializers["TMPro.VertexGradient"] = function (request, data, root) {
  var i728 = root || request.c( 'TMPro.VertexGradient' )
  var i729 = data
  i728.topLeft = new pc.Color(i729[0], i729[1], i729[2], i729[3])
  i728.topRight = new pc.Color(i729[4], i729[5], i729[6], i729[7])
  i728.bottomLeft = new pc.Color(i729[8], i729[9], i729[10], i729[11])
  i728.bottomRight = new pc.Color(i729[12], i729[13], i729[14], i729[15])
  return i728
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i732 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i733 = data
  i732.targetIsSelf = !!i733[0]
  request.r(i733[1], i733[2], 0, i732, 'targetGO')
  i732.tweenTargetIsTargetGO = !!i733[3]
  i732.delay = i733[4]
  i732.duration = i733[5]
  i732.easeType = i733[6]
  i732.easeCurve = new pc.AnimationCurve( { keys_flow: i733[7] } )
  i732.loopType = i733[8]
  i732.loops = i733[9]
  i732.id = i733[10]
  i732.isRelative = !!i733[11]
  i732.isFrom = !!i733[12]
  i732.isIndependentUpdate = !!i733[13]
  i732.autoKill = !!i733[14]
  i732.autoGenerate = !!i733[15]
  i732.isActive = !!i733[16]
  i732.isValid = !!i733[17]
  request.r(i733[18], i733[19], 0, i732, 'target')
  i732.animationType = i733[20]
  i732.targetType = i733[21]
  i732.forcedTargetType = i733[22]
  i732.autoPlay = !!i733[23]
  i732.useTargetAsV3 = !!i733[24]
  i732.endValueFloat = i733[25]
  i732.endValueV3 = new pc.Vec3( i733[26], i733[27], i733[28] )
  i732.endValueV2 = new pc.Vec2( i733[29], i733[30] )
  i732.endValueColor = new pc.Color(i733[31], i733[32], i733[33], i733[34])
  i732.endValueString = i733[35]
  i732.endValueRect = UnityEngine.Rect.MinMaxRect(i733[36], i733[37], i733[38], i733[39])
  request.r(i733[40], i733[41], 0, i732, 'endValueTransform')
  i732.optionalBool0 = !!i733[42]
  i732.optionalBool1 = !!i733[43]
  i732.optionalFloat0 = i733[44]
  i732.optionalInt0 = i733[45]
  i732.optionalRotationMode = i733[46]
  i732.optionalScrambleMode = i733[47]
  i732.optionalShakeRandomnessMode = i733[48]
  i732.optionalString = i733[49]
  i732.updateType = i733[50]
  i732.isSpeedBased = !!i733[51]
  i732.hasOnStart = !!i733[52]
  i732.hasOnPlay = !!i733[53]
  i732.hasOnUpdate = !!i733[54]
  i732.hasOnStepComplete = !!i733[55]
  i732.hasOnComplete = !!i733[56]
  i732.hasOnTweenCreated = !!i733[57]
  i732.hasOnRewind = !!i733[58]
  i732.onStart = request.d('UnityEngine.Events.UnityEvent', i733[59], i732.onStart)
  i732.onPlay = request.d('UnityEngine.Events.UnityEvent', i733[60], i732.onPlay)
  i732.onUpdate = request.d('UnityEngine.Events.UnityEvent', i733[61], i732.onUpdate)
  i732.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i733[62], i732.onStepComplete)
  i732.onComplete = request.d('UnityEngine.Events.UnityEvent', i733[63], i732.onComplete)
  i732.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i733[64], i732.onTweenCreated)
  i732.onRewind = request.d('UnityEngine.Events.UnityEvent', i733[65], i732.onRewind)
  return i732
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i734 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i735 = data
  i734.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i735[0], i734.m_PersistentCalls)
  return i734
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i736 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i737 = data
  var i739 = i737[0]
  var i738 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i739.length; i += 1) {
    i738.add(request.d('UnityEngine.Events.PersistentCall', i739[i + 0]));
  }
  i736.m_Calls = i738
  return i736
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i742 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i743 = data
  request.r(i743[0], i743[1], 0, i742, 'm_Target')
  i742.m_TargetAssemblyTypeName = i743[2]
  i742.m_MethodName = i743[3]
  i742.m_Mode = i743[4]
  i742.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i743[5], i742.m_Arguments)
  i742.m_CallState = i743[6]
  return i742
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i744 = root || request.c( 'UnityEngine.UI.Image' )
  var i745 = data
  request.r(i745[0], i745[1], 0, i744, 'm_Sprite')
  i744.m_Type = i745[2]
  i744.m_PreserveAspect = !!i745[3]
  i744.m_FillCenter = !!i745[4]
  i744.m_FillMethod = i745[5]
  i744.m_FillAmount = i745[6]
  i744.m_FillClockwise = !!i745[7]
  i744.m_FillOrigin = i745[8]
  i744.m_UseSpriteMesh = !!i745[9]
  i744.m_PixelsPerUnitMultiplier = i745[10]
  request.r(i745[11], i745[12], 0, i744, 'm_Material')
  i744.m_Maskable = !!i745[13]
  i744.m_Color = new pc.Color(i745[14], i745[15], i745[16], i745[17])
  i744.m_RaycastTarget = !!i745[18]
  i744.m_RaycastPadding = new pc.Vec4( i745[19], i745[20], i745[21], i745[22] )
  return i744
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i746 = root || request.c( 'UnityEngine.UI.Button' )
  var i747 = data
  i746.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i747[0], i746.m_OnClick)
  i746.m_Navigation = request.d('UnityEngine.UI.Navigation', i747[1], i746.m_Navigation)
  i746.m_Transition = i747[2]
  i746.m_Colors = request.d('UnityEngine.UI.ColorBlock', i747[3], i746.m_Colors)
  i746.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i747[4], i746.m_SpriteState)
  i746.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i747[5], i746.m_AnimationTriggers)
  i746.m_Interactable = !!i747[6]
  request.r(i747[7], i747[8], 0, i746, 'm_TargetGraphic')
  return i746
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i748 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i749 = data
  i748.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i749[0], i748.m_PersistentCalls)
  return i748
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i750 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i751 = data
  i750.m_Mode = i751[0]
  i750.m_WrapAround = !!i751[1]
  request.r(i751[2], i751[3], 0, i750, 'm_SelectOnUp')
  request.r(i751[4], i751[5], 0, i750, 'm_SelectOnDown')
  request.r(i751[6], i751[7], 0, i750, 'm_SelectOnLeft')
  request.r(i751[8], i751[9], 0, i750, 'm_SelectOnRight')
  return i750
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i752 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i753 = data
  i752.m_NormalColor = new pc.Color(i753[0], i753[1], i753[2], i753[3])
  i752.m_HighlightedColor = new pc.Color(i753[4], i753[5], i753[6], i753[7])
  i752.m_PressedColor = new pc.Color(i753[8], i753[9], i753[10], i753[11])
  i752.m_SelectedColor = new pc.Color(i753[12], i753[13], i753[14], i753[15])
  i752.m_DisabledColor = new pc.Color(i753[16], i753[17], i753[18], i753[19])
  i752.m_ColorMultiplier = i753[20]
  i752.m_FadeDuration = i753[21]
  return i752
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i754 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i755 = data
  request.r(i755[0], i755[1], 0, i754, 'm_HighlightedSprite')
  request.r(i755[2], i755[3], 0, i754, 'm_PressedSprite')
  request.r(i755[4], i755[5], 0, i754, 'm_SelectedSprite')
  request.r(i755[6], i755[7], 0, i754, 'm_DisabledSprite')
  return i754
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i756 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i757 = data
  i756.m_NormalTrigger = i757[0]
  i756.m_HighlightedTrigger = i757[1]
  i756.m_PressedTrigger = i757[2]
  i756.m_SelectedTrigger = i757[3]
  i756.m_DisabledTrigger = i757[4]
  return i756
}

Deserializers["AnimationController"] = function (request, data, root) {
  var i758 = root || request.c( 'AnimationController' )
  var i759 = data
  request.r(i759[0], i759[1], 0, i758, 'left')
  request.r(i759[2], i759[3], 0, i758, 'right')
  i758.key = i759[4]
  return i758
}

Deserializers["Spine.Unity.SkeletonGraphic"] = function (request, data, root) {
  var i760 = root || request.c( 'Spine.Unity.SkeletonGraphic' )
  var i761 = data
  request.r(i761[0], i761[1], 0, i760, 'skeletonDataAsset')
  request.r(i761[2], i761[3], 0, i760, 'additiveMaterial')
  request.r(i761[4], i761[5], 0, i760, 'multiplyMaterial')
  request.r(i761[6], i761[7], 0, i760, 'screenMaterial')
  i760.forceAdditiveMaterial = !!i761[8]
  i760.initialSkinName = i761[9]
  i760.initialFlipX = !!i761[10]
  i760.initialFlipY = !!i761[11]
  i760.startingAnimation = i761[12]
  i760.startingLoop = !!i761[13]
  i760.timeScale = i761[14]
  i760.freeze = !!i761[15]
  i760.layoutScaleMode = i761[16]
  i760.updateWhenInvisible = i761[17]
  i760.allowMultipleCanvasRenderers = !!i761[18]
  var i763 = i761[19]
  var i762 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.CanvasRenderer')))
  for(var i = 0; i < i763.length; i += 2) {
  request.r(i763[i + 0], i763[i + 1], 1, i762, '')
  }
  i760.canvasRenderers = i762
  i760.enableSeparatorSlots = !!i761[20]
  i760.updateSeparatorPartLocation = !!i761[21]
  i760.updateSeparatorPartScale = !!i761[22]
  i760.disableMeshAssignmentOnOverride = !!i761[23]
  i760.m_SkeletonColor = new pc.Color(i761[24], i761[25], i761[26], i761[27])
  i760.referenceSize = new pc.Vec2( i761[28], i761[29] )
  i760.pivotOffset = new pc.Vec2( i761[30], i761[31] )
  i760.referenceScale = i761[32]
  i760.layoutScale = i761[33]
  i760.rectTransformSize = new pc.Vec2( i761[34], i761[35] )
  i760.editReferenceRect = !!i761[36]
  var i765 = i761[37]
  var i764 = []
  for(var i = 0; i < i765.length; i += 1) {
    i764.push( i765[i + 0] );
  }
  i760.separatorSlotNames = i764
  var i767 = i761[38]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Transform')))
  for(var i = 0; i < i767.length; i += 2) {
  request.r(i767[i + 0], i767[i + 1], 1, i766, '')
  }
  i760.separatorParts = i766
  i760.physicsPositionInheritanceFactor = new pc.Vec2( i761[39], i761[40] )
  i760.physicsRotationInheritanceFactor = i761[41]
  request.r(i761[42], i761[43], 0, i760, 'physicsMovementRelativeTo')
  i760.meshGenerator = request.d('Spine.Unity.MeshGenerator', i761[44], i760.meshGenerator)
  i760.updateTiming = i761[45]
  i760.unscaledTime = !!i761[46]
  request.r(i761[47], i761[48], 0, i760, 'm_Material')
  i760.m_Maskable = !!i761[49]
  i760.m_Color = new pc.Color(i761[50], i761[51], i761[52], i761[53])
  i760.m_RaycastTarget = !!i761[54]
  i760.m_RaycastPadding = new pc.Vec4( i761[55], i761[56], i761[57], i761[58] )
  return i760
}

Deserializers["Spine.Unity.MeshGenerator"] = function (request, data, root) {
  var i774 = root || request.c( 'Spine.Unity.MeshGenerator' )
  var i775 = data
  i774.settings = request.d('Spine.Unity.MeshGenerator+Settings', i775[0], i774.settings)
  return i774
}

Deserializers["Spine.Unity.MeshGenerator+Settings"] = function (request, data, root) {
  var i776 = root || request.c( 'Spine.Unity.MeshGenerator+Settings' )
  var i777 = data
  i776.useClipping = !!i777[0]
  i776.zSpacing = i777[1]
  i776.tintBlack = !!i777[2]
  i776.canvasGroupCompatible = !!i777[3]
  i776.pmaVertexColors = !!i777[4]
  i776.addNormals = !!i777[5]
  i776.calculateTangents = !!i777[6]
  i776.immutableTriangles = !!i777[7]
  return i776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i779 = data
  i778.color = new pc.Color(i779[0], i779[1], i779[2], i779[3])
  request.r(i779[4], i779[5], 0, i778, 'sprite')
  i778.flipX = !!i779[6]
  i778.flipY = !!i779[7]
  i778.drawMode = i779[8]
  i778.size = new pc.Vec2( i779[9], i779[10] )
  i778.tileMode = i779[11]
  i778.adaptiveModeThreshold = i779[12]
  i778.maskInteraction = i779[13]
  i778.spriteSortPoint = i779[14]
  i778.enabled = !!i779[15]
  request.r(i779[16], i779[17], 0, i778, 'sharedMaterial')
  var i781 = i779[18]
  var i780 = []
  for(var i = 0; i < i781.length; i += 2) {
  request.r(i781[i + 0], i781[i + 1], 2, i780, '')
  }
  i778.sharedMaterials = i780
  i778.receiveShadows = !!i779[19]
  i778.shadowCastingMode = i779[20]
  i778.sortingLayerID = i779[21]
  i778.sortingOrder = i779[22]
  i778.lightmapIndex = i779[23]
  i778.lightmapSceneIndex = i779[24]
  i778.lightmapScaleOffset = new pc.Vec4( i779[25], i779[26], i779[27], i779[28] )
  i778.lightProbeUsage = i779[29]
  i778.reflectionProbeUsage = i779[30]
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i783 = data
  request.r(i783[0], i783[1], 0, i782, 'sharedMesh')
  var i785 = i783[2]
  var i784 = []
  for(var i = 0; i < i785.length; i += 2) {
  request.r(i785[i + 0], i785[i + 1], 2, i784, '')
  }
  i782.bones = i784
  i782.updateWhenOffscreen = !!i783[3]
  i782.localBounds = i783[4]
  request.r(i783[5], i783[6], 0, i782, 'rootBone')
  var i787 = i783[7]
  var i786 = []
  for(var i = 0; i < i787.length; i += 1) {
    i786.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i787[i + 0]) );
  }
  i782.blendShapesWeights = i786
  i782.enabled = !!i783[8]
  request.r(i783[9], i783[10], 0, i782, 'sharedMaterial')
  var i789 = i783[11]
  var i788 = []
  for(var i = 0; i < i789.length; i += 2) {
  request.r(i789[i + 0], i789[i + 1], 2, i788, '')
  }
  i782.sharedMaterials = i788
  i782.receiveShadows = !!i783[12]
  i782.shadowCastingMode = i783[13]
  i782.sortingLayerID = i783[14]
  i782.sortingOrder = i783[15]
  i782.lightmapIndex = i783[16]
  i782.lightmapSceneIndex = i783[17]
  i782.lightmapScaleOffset = new pc.Vec4( i783[18], i783[19], i783[20], i783[21] )
  i782.lightProbeUsage = i783[22]
  i782.reflectionProbeUsage = i783[23]
  return i782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i795 = data
  i794.weight = i795[0]
  return i794
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i797 = data
  request.r(i797[0], i797[1], 0, i796, 'sharedMesh')
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i798 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i799 = data
  request.r(i799[0], i799[1], 0, i798, 'additionalVertexStreams')
  i798.enabled = !!i799[2]
  request.r(i799[3], i799[4], 0, i798, 'sharedMaterial')
  var i801 = i799[5]
  var i800 = []
  for(var i = 0; i < i801.length; i += 2) {
  request.r(i801[i + 0], i801[i + 1], 2, i800, '')
  }
  i798.sharedMaterials = i800
  i798.receiveShadows = !!i799[6]
  i798.shadowCastingMode = i799[7]
  i798.sortingLayerID = i799[8]
  i798.sortingOrder = i799[9]
  i798.lightmapIndex = i799[10]
  i798.lightmapSceneIndex = i799[11]
  i798.lightmapScaleOffset = new pc.Vec4( i799[12], i799[13], i799[14], i799[15] )
  i798.lightProbeUsage = i799[16]
  i798.reflectionProbeUsage = i799[17]
  return i798
}

Deserializers["Spine.Unity.SkeletonAnimation"] = function (request, data, root) {
  var i802 = root || request.c( 'Spine.Unity.SkeletonAnimation' )
  var i803 = data
  i802.loop = !!i803[0]
  i802.timeScale = i803[1]
  request.r(i803[2], i803[3], 0, i802, 'skeletonDataAsset')
  i802.initialSkinName = i803[4]
  i802.fixPrefabOverrideViaMeshFilter = i803[5]
  i802.initialFlipX = !!i803[6]
  i802.initialFlipY = !!i803[7]
  i802.updateWhenInvisible = i803[8]
  i802.zSpacing = i803[9]
  i802.useClipping = !!i803[10]
  i802.immutableTriangles = !!i803[11]
  i802.pmaVertexColors = !!i803[12]
  i802.clearStateOnDisable = !!i803[13]
  i802.tintBlack = !!i803[14]
  i802.singleSubmesh = !!i803[15]
  i802.fixDrawOrder = !!i803[16]
  i802.addNormals = !!i803[17]
  i802.calculateTangents = !!i803[18]
  i802.maskInteraction = i803[19]
  i802.maskMaterials = request.d('Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials', i803[20], i802.maskMaterials)
  i802.disableRenderingOnOverride = !!i803[21]
  i802.updateTiming = i803[22]
  i802.unscaledTime = !!i803[23]
  i802._animationName = i803[24]
  var i805 = i803[25]
  var i804 = []
  for(var i = 0; i < i805.length; i += 1) {
    i804.push( i805[i + 0] );
  }
  i802.separatorSlotNames = i804
  i802.physicsPositionInheritanceFactor = new pc.Vec2( i803[26], i803[27] )
  i802.physicsRotationInheritanceFactor = i803[28]
  request.r(i803[29], i803[30], 0, i802, 'physicsMovementRelativeTo')
  return i802
}

Deserializers["Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials"] = function (request, data, root) {
  var i806 = root || request.c( 'Spine.Unity.SkeletonRenderer+SpriteMaskInteractionMaterials' )
  var i807 = data
  var i809 = i807[0]
  var i808 = []
  for(var i = 0; i < i809.length; i += 2) {
  request.r(i809[i + 0], i809[i + 1], 2, i808, '')
  }
  i806.materialsMaskDisabled = i808
  var i811 = i807[1]
  var i810 = []
  for(var i = 0; i < i811.length; i += 2) {
  request.r(i811[i + 0], i811[i + 1], 2, i810, '')
  }
  i806.materialsInsideMask = i810
  var i813 = i807[2]
  var i812 = []
  for(var i = 0; i < i813.length; i += 2) {
  request.r(i813[i + 0], i813[i + 1], 2, i812, '')
  }
  i806.materialsOutsideMask = i812
  return i806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i815 = data
  i814.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i815[0], i814.main)
  i814.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i815[1], i814.colorBySpeed)
  i814.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i815[2], i814.colorOverLifetime)
  i814.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i815[3], i814.emission)
  i814.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i815[4], i814.rotationBySpeed)
  i814.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i815[5], i814.rotationOverLifetime)
  i814.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i815[6], i814.shape)
  i814.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i815[7], i814.sizeBySpeed)
  i814.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i815[8], i814.sizeOverLifetime)
  i814.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i815[9], i814.textureSheetAnimation)
  i814.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i815[10], i814.velocityOverLifetime)
  i814.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i815[11], i814.noise)
  i814.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i815[12], i814.inheritVelocity)
  i814.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i815[13], i814.forceOverLifetime)
  i814.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i815[14], i814.limitVelocityOverLifetime)
  i814.useAutoRandomSeed = !!i815[15]
  i814.randomSeed = i815[16]
  return i814
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i816 = root || new pc.ParticleSystemMain()
  var i817 = data
  i816.duration = i817[0]
  i816.loop = !!i817[1]
  i816.prewarm = !!i817[2]
  i816.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[3], i816.startDelay)
  i816.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[4], i816.startLifetime)
  i816.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[5], i816.startSpeed)
  i816.startSize3D = !!i817[6]
  i816.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[7], i816.startSizeX)
  i816.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[8], i816.startSizeY)
  i816.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[9], i816.startSizeZ)
  i816.startRotation3D = !!i817[10]
  i816.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[11], i816.startRotationX)
  i816.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[12], i816.startRotationY)
  i816.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[13], i816.startRotationZ)
  i816.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i817[14], i816.startColor)
  i816.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i817[15], i816.gravityModifier)
  i816.simulationSpace = i817[16]
  request.r(i817[17], i817[18], 0, i816, 'customSimulationSpace')
  i816.simulationSpeed = i817[19]
  i816.useUnscaledTime = !!i817[20]
  i816.scalingMode = i817[21]
  i816.playOnAwake = !!i817[22]
  i816.maxParticles = i817[23]
  i816.emitterVelocityMode = i817[24]
  i816.stopAction = i817[25]
  return i816
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i818 = root || new pc.MinMaxCurve()
  var i819 = data
  i818.mode = i819[0]
  i818.curveMin = new pc.AnimationCurve( { keys_flow: i819[1] } )
  i818.curveMax = new pc.AnimationCurve( { keys_flow: i819[2] } )
  i818.curveMultiplier = i819[3]
  i818.constantMin = i819[4]
  i818.constantMax = i819[5]
  return i818
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i820 = root || new pc.MinMaxGradient()
  var i821 = data
  i820.mode = i821[0]
  i820.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i821[1], i820.gradientMin)
  i820.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i821[2], i820.gradientMax)
  i820.colorMin = new pc.Color(i821[3], i821[4], i821[5], i821[6])
  i820.colorMax = new pc.Color(i821[7], i821[8], i821[9], i821[10])
  return i820
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i822 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i823 = data
  i822.mode = i823[0]
  var i825 = i823[1]
  var i824 = []
  for(var i = 0; i < i825.length; i += 1) {
    i824.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i825[i + 0]) );
  }
  i822.colorKeys = i824
  var i827 = i823[2]
  var i826 = []
  for(var i = 0; i < i827.length; i += 1) {
    i826.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i827[i + 0]) );
  }
  i822.alphaKeys = i826
  return i822
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i828 = root || new pc.ParticleSystemColorBySpeed()
  var i829 = data
  i828.enabled = !!i829[0]
  i828.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i829[1], i828.color)
  i828.range = new pc.Vec2( i829[2], i829[3] )
  return i828
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i832 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i833 = data
  i832.color = new pc.Color(i833[0], i833[1], i833[2], i833[3])
  i832.time = i833[4]
  return i832
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i837 = data
  i836.alpha = i837[0]
  i836.time = i837[1]
  return i836
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i838 = root || new pc.ParticleSystemColorOverLifetime()
  var i839 = data
  i838.enabled = !!i839[0]
  i838.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i839[1], i838.color)
  return i838
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i840 = root || new pc.ParticleSystemEmitter()
  var i841 = data
  i840.enabled = !!i841[0]
  i840.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i841[1], i840.rateOverTime)
  i840.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i841[2], i840.rateOverDistance)
  var i843 = i841[3]
  var i842 = []
  for(var i = 0; i < i843.length; i += 1) {
    i842.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i843[i + 0]) );
  }
  i840.bursts = i842
  return i840
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i846 = root || new pc.ParticleSystemBurst()
  var i847 = data
  i846.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i847[0], i846.count)
  i846.cycleCount = i847[1]
  i846.minCount = i847[2]
  i846.maxCount = i847[3]
  i846.repeatInterval = i847[4]
  i846.time = i847[5]
  return i846
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i848 = root || new pc.ParticleSystemRotationBySpeed()
  var i849 = data
  i848.enabled = !!i849[0]
  i848.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i849[1], i848.x)
  i848.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i849[2], i848.y)
  i848.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i849[3], i848.z)
  i848.separateAxes = !!i849[4]
  i848.range = new pc.Vec2( i849[5], i849[6] )
  return i848
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i850 = root || new pc.ParticleSystemRotationOverLifetime()
  var i851 = data
  i850.enabled = !!i851[0]
  i850.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i851[1], i850.x)
  i850.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i851[2], i850.y)
  i850.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i851[3], i850.z)
  i850.separateAxes = !!i851[4]
  return i850
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i852 = root || new pc.ParticleSystemShape()
  var i853 = data
  i852.enabled = !!i853[0]
  i852.shapeType = i853[1]
  i852.randomDirectionAmount = i853[2]
  i852.sphericalDirectionAmount = i853[3]
  i852.randomPositionAmount = i853[4]
  i852.alignToDirection = !!i853[5]
  i852.radius = i853[6]
  i852.radiusMode = i853[7]
  i852.radiusSpread = i853[8]
  i852.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i853[9], i852.radiusSpeed)
  i852.radiusThickness = i853[10]
  i852.angle = i853[11]
  i852.length = i853[12]
  i852.boxThickness = new pc.Vec3( i853[13], i853[14], i853[15] )
  i852.meshShapeType = i853[16]
  request.r(i853[17], i853[18], 0, i852, 'mesh')
  request.r(i853[19], i853[20], 0, i852, 'meshRenderer')
  request.r(i853[21], i853[22], 0, i852, 'skinnedMeshRenderer')
  i852.useMeshMaterialIndex = !!i853[23]
  i852.meshMaterialIndex = i853[24]
  i852.useMeshColors = !!i853[25]
  i852.normalOffset = i853[26]
  i852.arc = i853[27]
  i852.arcMode = i853[28]
  i852.arcSpread = i853[29]
  i852.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i853[30], i852.arcSpeed)
  i852.donutRadius = i853[31]
  i852.position = new pc.Vec3( i853[32], i853[33], i853[34] )
  i852.rotation = new pc.Vec3( i853[35], i853[36], i853[37] )
  i852.scale = new pc.Vec3( i853[38], i853[39], i853[40] )
  return i852
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i854 = root || new pc.ParticleSystemSizeBySpeed()
  var i855 = data
  i854.enabled = !!i855[0]
  i854.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i855[1], i854.x)
  i854.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i855[2], i854.y)
  i854.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i855[3], i854.z)
  i854.separateAxes = !!i855[4]
  i854.range = new pc.Vec2( i855[5], i855[6] )
  return i854
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i856 = root || new pc.ParticleSystemSizeOverLifetime()
  var i857 = data
  i856.enabled = !!i857[0]
  i856.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i857[1], i856.x)
  i856.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i857[2], i856.y)
  i856.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i857[3], i856.z)
  i856.separateAxes = !!i857[4]
  return i856
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i858 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i859 = data
  i858.enabled = !!i859[0]
  i858.mode = i859[1]
  i858.animation = i859[2]
  i858.numTilesX = i859[3]
  i858.numTilesY = i859[4]
  i858.useRandomRow = !!i859[5]
  i858.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i859[6], i858.frameOverTime)
  i858.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i859[7], i858.startFrame)
  i858.cycleCount = i859[8]
  i858.rowIndex = i859[9]
  i858.flipU = i859[10]
  i858.flipV = i859[11]
  i858.spriteCount = i859[12]
  var i861 = i859[13]
  var i860 = []
  for(var i = 0; i < i861.length; i += 2) {
  request.r(i861[i + 0], i861[i + 1], 2, i860, '')
  }
  i858.sprites = i860
  return i858
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i864 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i865 = data
  i864.enabled = !!i865[0]
  i864.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[1], i864.x)
  i864.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[2], i864.y)
  i864.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[3], i864.z)
  i864.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[4], i864.radial)
  i864.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[5], i864.speedModifier)
  i864.space = i865[6]
  i864.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[7], i864.orbitalX)
  i864.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[8], i864.orbitalY)
  i864.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[9], i864.orbitalZ)
  i864.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[10], i864.orbitalOffsetX)
  i864.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[11], i864.orbitalOffsetY)
  i864.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i865[12], i864.orbitalOffsetZ)
  return i864
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i866 = root || new pc.ParticleSystemNoise()
  var i867 = data
  i866.enabled = !!i867[0]
  i866.separateAxes = !!i867[1]
  i866.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[2], i866.strengthX)
  i866.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[3], i866.strengthY)
  i866.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[4], i866.strengthZ)
  i866.frequency = i867[5]
  i866.damping = !!i867[6]
  i866.octaveCount = i867[7]
  i866.octaveMultiplier = i867[8]
  i866.octaveScale = i867[9]
  i866.quality = i867[10]
  i866.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[11], i866.scrollSpeed)
  i866.scrollSpeedMultiplier = i867[12]
  i866.remapEnabled = !!i867[13]
  i866.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[14], i866.remapX)
  i866.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[15], i866.remapY)
  i866.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[16], i866.remapZ)
  i866.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[17], i866.positionAmount)
  i866.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[18], i866.rotationAmount)
  i866.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i867[19], i866.sizeAmount)
  return i866
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i868 = root || new pc.ParticleSystemInheritVelocity()
  var i869 = data
  i868.enabled = !!i869[0]
  i868.mode = i869[1]
  i868.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i869[2], i868.curve)
  return i868
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i870 = root || new pc.ParticleSystemForceOverLifetime()
  var i871 = data
  i870.enabled = !!i871[0]
  i870.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i871[1], i870.x)
  i870.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i871[2], i870.y)
  i870.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i871[3], i870.z)
  i870.space = i871[4]
  i870.randomized = !!i871[5]
  return i870
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i872 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i873 = data
  i872.enabled = !!i873[0]
  i872.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i873[1], i872.limit)
  i872.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i873[2], i872.limitX)
  i872.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i873[3], i872.limitY)
  i872.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i873[4], i872.limitZ)
  i872.dampen = i873[5]
  i872.separateAxes = !!i873[6]
  i872.space = i873[7]
  i872.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i873[8], i872.drag)
  i872.multiplyDragByParticleSize = !!i873[9]
  i872.multiplyDragByParticleVelocity = !!i873[10]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i875 = data
  request.r(i875[0], i875[1], 0, i874, 'mesh')
  i874.meshCount = i875[2]
  i874.activeVertexStreamsCount = i875[3]
  i874.alignment = i875[4]
  i874.renderMode = i875[5]
  i874.sortMode = i875[6]
  i874.lengthScale = i875[7]
  i874.velocityScale = i875[8]
  i874.cameraVelocityScale = i875[9]
  i874.normalDirection = i875[10]
  i874.sortingFudge = i875[11]
  i874.minParticleSize = i875[12]
  i874.maxParticleSize = i875[13]
  i874.pivot = new pc.Vec3( i875[14], i875[15], i875[16] )
  request.r(i875[17], i875[18], 0, i874, 'trailMaterial')
  i874.applyActiveColorSpace = !!i875[19]
  i874.enabled = !!i875[20]
  request.r(i875[21], i875[22], 0, i874, 'sharedMaterial')
  var i877 = i875[23]
  var i876 = []
  for(var i = 0; i < i877.length; i += 2) {
  request.r(i877[i + 0], i877[i + 1], 2, i876, '')
  }
  i874.sharedMaterials = i876
  i874.receiveShadows = !!i875[24]
  i874.shadowCastingMode = i875[25]
  i874.sortingLayerID = i875[26]
  i874.sortingOrder = i875[27]
  i874.lightmapIndex = i875[28]
  i874.lightmapSceneIndex = i875[29]
  i874.lightmapScaleOffset = new pc.Vec4( i875[30], i875[31], i875[32], i875[33] )
  i874.lightProbeUsage = i875[34]
  i874.reflectionProbeUsage = i875[35]
  return i874
}

Deserializers["GameController"] = function (request, data, root) {
  var i878 = root || request.c( 'GameController' )
  var i879 = data
  i878.OnClick = request.d('System.Action', i879[0], i878.OnClick)
  i878.left = request.d('Option', i879[1], i878.left)
  i878.right = request.d('Option', i879[2], i878.right)
  request.r(i879[3], i879[4], 0, i878, 'effect')
  request.r(i879[5], i879[6], 0, i878, 'Tut')
  i878.stop = !!i879[7]
  return i878
}

Deserializers["System.Action"] = function (request, data, root) {
  var i880 = root || request.c( 'System.Action' )
  var i881 = data
  return i880
}

Deserializers["Option"] = function (request, data, root) {
  var i882 = root || request.c( 'Option' )
  var i883 = data
  request.r(i883[0], i883[1], 0, i882, 'Button')
  request.r(i883[2], i883[3], 0, i882, 'Item')
  request.r(i883[4], i883[5], 0, i882, 'Anim')
  return i882
}

Deserializers["LunaController"] = function (request, data, root) {
  var i884 = root || request.c( 'LunaController' )
  var i885 = data
  i884.ShowEndCard = !!i885[0]
  i884.UseMaxClick = !!i885[1]
  i884.MaxClick = i885[2]
  i884.TimePlay = i885[3]
  var i887 = i885[4]
  var i886 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.UI.Button')))
  for(var i = 0; i < i887.length; i += 2) {
  request.r(i887[i + 0], i887[i + 1], 1, i886, '')
  }
  i884.CTA = i886
  request.r(i885[5], i885[6], 0, i884, 'endCard')
  return i884
}

Deserializers["AudioController"] = function (request, data, root) {
  var i890 = root || request.c( 'AudioController' )
  var i891 = data
  i890.MVolume = i891[0]
  request.r(i891[1], i891[2], 0, i890, 'BGM')
  request.r(i891[3], i891[4], 0, i890, 'clickClip')
  request.r(i891[5], i891[6], 0, i890, 'effectClip')
  request.r(i891[7], i891[8], 0, i890, 'musicSource')
  request.r(i891[9], i891[10], 0, i890, 'poolParent')
  i890.startPoolSize = i891[11]
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

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i911 = data
  var i913 = i911[0]
  var i912 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i913.length; i += 1) {
    i912.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i913[i + 0]));
  }
  i910.ShaderCompilationErrors = i912
  i910.name = i911[1]
  i910.guid = i911[2]
  var i915 = i911[3]
  var i914 = []
  for(var i = 0; i < i915.length; i += 1) {
    i914.push( i915[i + 0] );
  }
  i910.shaderDefinedKeywords = i914
  var i917 = i911[4]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i917[i + 0]) );
  }
  i910.passes = i916
  var i919 = i911[5]
  var i918 = []
  for(var i = 0; i < i919.length; i += 1) {
    i918.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i919[i + 0]) );
  }
  i910.usePasses = i918
  var i921 = i911[6]
  var i920 = []
  for(var i = 0; i < i921.length; i += 1) {
    i920.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i921[i + 0]) );
  }
  i910.defaultParameterValues = i920
  request.r(i911[7], i911[8], 0, i910, 'unityFallbackShader')
  i910.readDepth = !!i911[9]
  i910.hasDepthOnlyPass = !!i911[10]
  i910.isCreatedByShaderGraph = !!i911[11]
  i910.disableBatching = !!i911[12]
  i910.compiled = !!i911[13]
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i924 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i925 = data
  i924.shaderName = i925[0]
  i924.errorMessage = i925[1]
  return i924
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i928 = root || new pc.UnityShaderPass()
  var i929 = data
  i928.id = i929[0]
  i928.subShaderIndex = i929[1]
  i928.name = i929[2]
  i928.passType = i929[3]
  i928.grabPassTextureName = i929[4]
  i928.usePass = !!i929[5]
  i928.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[6], i928.zTest)
  i928.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[7], i928.zWrite)
  i928.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[8], i928.culling)
  i928.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i929[9], i928.blending)
  i928.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i929[10], i928.alphaBlending)
  i928.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[11], i928.colorWriteMask)
  i928.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[12], i928.offsetUnits)
  i928.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[13], i928.offsetFactor)
  i928.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[14], i928.stencilRef)
  i928.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[15], i928.stencilReadMask)
  i928.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i929[16], i928.stencilWriteMask)
  i928.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i929[17], i928.stencilOp)
  i928.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i929[18], i928.stencilOpFront)
  i928.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i929[19], i928.stencilOpBack)
  var i931 = i929[20]
  var i930 = []
  for(var i = 0; i < i931.length; i += 1) {
    i930.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i931[i + 0]) );
  }
  i928.tags = i930
  var i933 = i929[21]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( i933[i + 0] );
  }
  i928.passDefinedKeywords = i932
  var i935 = i929[22]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i935[i + 0]) );
  }
  i928.passDefinedKeywordGroups = i934
  var i937 = i929[23]
  var i936 = []
  for(var i = 0; i < i937.length; i += 1) {
    i936.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i937[i + 0]) );
  }
  i928.variants = i936
  var i939 = i929[24]
  var i938 = []
  for(var i = 0; i < i939.length; i += 1) {
    i938.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i939[i + 0]) );
  }
  i928.excludedVariants = i938
  i928.hasDepthReader = !!i929[25]
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i941 = data
  i940.val = i941[0]
  i940.name = i941[1]
  return i940
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i942 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i943 = data
  i942.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i943[0], i942.src)
  i942.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i943[1], i942.dst)
  i942.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i943[2], i942.op)
  return i942
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i944 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i945 = data
  i944.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i945[0], i944.pass)
  i944.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i945[1], i944.fail)
  i944.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i945[2], i944.zFail)
  i944.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i945[3], i944.comp)
  return i944
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i948 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i949 = data
  i948.name = i949[0]
  i948.value = i949[1]
  return i948
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i953 = data
  var i955 = i953[0]
  var i954 = []
  for(var i = 0; i < i955.length; i += 1) {
    i954.push( i955[i + 0] );
  }
  i952.keywords = i954
  i952.hasDiscard = !!i953[1]
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i959 = data
  i958.passId = i959[0]
  i958.subShaderIndex = i959[1]
  var i961 = i959[2]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( i961[i + 0] );
  }
  i958.keywords = i960
  i958.vertexProgram = i959[3]
  i958.fragmentProgram = i959[4]
  i958.exportedForWebGl2 = !!i959[5]
  i958.readDepth = !!i959[6]
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i964 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i965 = data
  request.r(i965[0], i965[1], 0, i964, 'shader')
  i964.pass = i965[2]
  return i964
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i968 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i969 = data
  i968.name = i969[0]
  i968.type = i969[1]
  i968.value = new pc.Vec4( i969[2], i969[3], i969[4], i969[5] )
  i968.textureValue = i969[6]
  i968.shaderPropertyFlag = i969[7]
  return i968
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i970 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i971 = data
  i970.name = i971[0]
  request.r(i971[1], i971[2], 0, i970, 'texture')
  i970.aabb = i971[3]
  i970.vertices = i971[4]
  i970.triangles = i971[5]
  i970.textureRect = UnityEngine.Rect.MinMaxRect(i971[6], i971[7], i971[8], i971[9])
  i970.packedRect = UnityEngine.Rect.MinMaxRect(i971[10], i971[11], i971[12], i971[13])
  i970.border = new pc.Vec4( i971[14], i971[15], i971[16], i971[17] )
  i970.transparency = i971[18]
  i970.bounds = i971[19]
  i970.pixelsPerUnit = i971[20]
  i970.textureWidth = i971[21]
  i970.textureHeight = i971[22]
  i970.nativeSize = new pc.Vec2( i971[23], i971[24] )
  i970.pivot = new pc.Vec2( i971[25], i971[26] )
  i970.textureRectOffset = new pc.Vec2( i971[27], i971[28] )
  return i970
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i972 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i973 = data
  i972.name = i973[0]
  return i972
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i974 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i975 = data
  i974.name = i975[0]
  i974.bytes64 = i975[1]
  i974.data = i975[2]
  return i974
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i976 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i977 = data
  i976.normalStyle = i977[0]
  i976.normalSpacingOffset = i977[1]
  i976.boldStyle = i977[2]
  i976.boldSpacing = i977[3]
  i976.italicStyle = i977[4]
  i976.tabSize = i977[5]
  request.r(i977[6], i977[7], 0, i976, 'atlas')
  i976.m_SourceFontFileGUID = i977[8]
  i976.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i977[9], i976.m_CreationSettings)
  request.r(i977[10], i977[11], 0, i976, 'm_SourceFontFile')
  i976.m_SourceFontFilePath = i977[12]
  i976.m_AtlasPopulationMode = i977[13]
  i976.InternalDynamicOS = !!i977[14]
  var i979 = i977[15]
  var i978 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i979.length; i += 1) {
    i978.add(request.d('UnityEngine.TextCore.Glyph', i979[i + 0]));
  }
  i976.m_GlyphTable = i978
  var i981 = i977[16]
  var i980 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i981.length; i += 1) {
    i980.add(request.d('TMPro.TMP_Character', i981[i + 0]));
  }
  i976.m_CharacterTable = i980
  var i983 = i977[17]
  var i982 = []
  for(var i = 0; i < i983.length; i += 2) {
  request.r(i983[i + 0], i983[i + 1], 2, i982, '')
  }
  i976.m_AtlasTextures = i982
  i976.m_AtlasTextureIndex = i977[18]
  i976.m_IsMultiAtlasTexturesEnabled = !!i977[19]
  i976.m_GetFontFeatures = !!i977[20]
  i976.m_ClearDynamicDataOnBuild = !!i977[21]
  i976.m_AtlasWidth = i977[22]
  i976.m_AtlasHeight = i977[23]
  i976.m_AtlasPadding = i977[24]
  i976.m_AtlasRenderMode = i977[25]
  var i985 = i977[26]
  var i984 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i985.length; i += 1) {
    i984.add(request.d('UnityEngine.TextCore.GlyphRect', i985[i + 0]));
  }
  i976.m_UsedGlyphRects = i984
  var i987 = i977[27]
  var i986 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i987.length; i += 1) {
    i986.add(request.d('UnityEngine.TextCore.GlyphRect', i987[i + 0]));
  }
  i976.m_FreeGlyphRects = i986
  i976.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i977[28], i976.m_FontFeatureTable)
  i976.m_ShouldReimportFontFeatures = !!i977[29]
  var i989 = i977[30]
  var i988 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i989.length; i += 2) {
  request.r(i989[i + 0], i989[i + 1], 1, i988, '')
  }
  i976.m_FallbackFontAssetTable = i988
  var i991 = i977[31]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( request.d('TMPro.TMP_FontWeightPair', i991[i + 0]) );
  }
  i976.m_FontWeightTable = i990
  var i993 = i977[32]
  var i992 = []
  for(var i = 0; i < i993.length; i += 1) {
    i992.push( request.d('TMPro.TMP_FontWeightPair', i993[i + 0]) );
  }
  i976.fontWeights = i992
  i976.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i977[33], i976.m_fontInfo)
  var i995 = i977[34]
  var i994 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i995.length; i += 1) {
    i994.add(request.d('TMPro.TMP_Glyph', i995[i + 0]));
  }
  i976.m_glyphInfoList = i994
  i976.m_KerningTable = request.d('TMPro.KerningTable', i977[35], i976.m_KerningTable)
  var i997 = i977[36]
  var i996 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i997.length; i += 2) {
  request.r(i997[i + 0], i997[i + 1], 1, i996, '')
  }
  i976.fallbackFontAssets = i996
  i976.m_Version = i977[37]
  i976.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i977[38], i976.m_FaceInfo)
  request.r(i977[39], i977[40], 0, i976, 'm_Material')
  return i976
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i998 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i999 = data
  i998.sourceFontFileName = i999[0]
  i998.sourceFontFileGUID = i999[1]
  i998.faceIndex = i999[2]
  i998.pointSizeSamplingMode = i999[3]
  i998.pointSize = i999[4]
  i998.padding = i999[5]
  i998.paddingMode = i999[6]
  i998.packingMode = i999[7]
  i998.atlasWidth = i999[8]
  i998.atlasHeight = i999[9]
  i998.characterSetSelectionMode = i999[10]
  i998.characterSequence = i999[11]
  i998.referencedFontAssetGUID = i999[12]
  i998.referencedTextAssetGUID = i999[13]
  i998.fontStyle = i999[14]
  i998.fontStyleModifier = i999[15]
  i998.renderMode = i999[16]
  i998.includeFontFeatures = !!i999[17]
  return i998
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1002 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1003 = data
  i1002.m_Index = i1003[0]
  i1002.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1003[1], i1002.m_Metrics)
  i1002.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1003[2], i1002.m_GlyphRect)
  i1002.m_Scale = i1003[3]
  i1002.m_AtlasIndex = i1003[4]
  i1002.m_ClassDefinitionType = i1003[5]
  return i1002
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1004 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1005 = data
  i1004.m_Width = i1005[0]
  i1004.m_Height = i1005[1]
  i1004.m_HorizontalBearingX = i1005[2]
  i1004.m_HorizontalBearingY = i1005[3]
  i1004.m_HorizontalAdvance = i1005[4]
  return i1004
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1006 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1007 = data
  i1006.m_X = i1007[0]
  i1006.m_Y = i1007[1]
  i1006.m_Width = i1007[2]
  i1006.m_Height = i1007[3]
  return i1006
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1010 = root || request.c( 'TMPro.TMP_Character' )
  var i1011 = data
  i1010.m_ElementType = i1011[0]
  i1010.m_Unicode = i1011[1]
  i1010.m_GlyphIndex = i1011[2]
  i1010.m_Scale = i1011[3]
  return i1010
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1016 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1017 = data
  var i1019 = i1017[0]
  var i1018 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1019.length; i += 1) {
    i1018.add(request.d('TMPro.MultipleSubstitutionRecord', i1019[i + 0]));
  }
  i1016.m_MultipleSubstitutionRecords = i1018
  var i1021 = i1017[1]
  var i1020 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1021.length; i += 1) {
    i1020.add(request.d('TMPro.LigatureSubstitutionRecord', i1021[i + 0]));
  }
  i1016.m_LigatureSubstitutionRecords = i1020
  var i1023 = i1017[2]
  var i1022 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1023.length; i += 1) {
    i1022.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1023[i + 0]));
  }
  i1016.m_GlyphPairAdjustmentRecords = i1022
  var i1025 = i1017[3]
  var i1024 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1025.length; i += 1) {
    i1024.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1025[i + 0]));
  }
  i1016.m_MarkToBaseAdjustmentRecords = i1024
  var i1027 = i1017[4]
  var i1026 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1027.length; i += 1) {
    i1026.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1027[i + 0]));
  }
  i1016.m_MarkToMarkAdjustmentRecords = i1026
  return i1016
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1030 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1031 = data
  i1030.m_TargetGlyphID = i1031[0]
  i1030.m_SubstituteGlyphIDs = i1031[1]
  return i1030
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1034 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1035 = data
  i1034.m_ComponentGlyphIDs = i1035[0]
  i1034.m_LigatureGlyphID = i1035[1]
  return i1034
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1038 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1039 = data
  i1038.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1039[0], i1038.m_FirstAdjustmentRecord)
  i1038.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1039[1], i1038.m_SecondAdjustmentRecord)
  i1038.m_FeatureLookupFlags = i1039[2]
  return i1038
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1042 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1043 = data
  i1042.m_BaseGlyphID = i1043[0]
  i1042.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1043[1], i1042.m_BaseGlyphAnchorPoint)
  i1042.m_MarkGlyphID = i1043[2]
  i1042.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1043[3], i1042.m_MarkPositionAdjustment)
  return i1042
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1046 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1047 = data
  i1046.m_BaseMarkGlyphID = i1047[0]
  i1046.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1047[1], i1046.m_BaseMarkGlyphAnchorPoint)
  i1046.m_CombiningMarkGlyphID = i1047[2]
  i1046.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1047[3], i1046.m_CombiningMarkPositionAdjustment)
  return i1046
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1052 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1053 = data
  request.r(i1053[0], i1053[1], 0, i1052, 'regularTypeface')
  request.r(i1053[2], i1053[3], 0, i1052, 'italicTypeface')
  return i1052
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1054 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1055 = data
  i1054.Name = i1055[0]
  i1054.PointSize = i1055[1]
  i1054.Scale = i1055[2]
  i1054.CharacterCount = i1055[3]
  i1054.LineHeight = i1055[4]
  i1054.Baseline = i1055[5]
  i1054.Ascender = i1055[6]
  i1054.CapHeight = i1055[7]
  i1054.Descender = i1055[8]
  i1054.CenterLine = i1055[9]
  i1054.SuperscriptOffset = i1055[10]
  i1054.SubscriptOffset = i1055[11]
  i1054.SubSize = i1055[12]
  i1054.Underline = i1055[13]
  i1054.UnderlineThickness = i1055[14]
  i1054.strikethrough = i1055[15]
  i1054.strikethroughThickness = i1055[16]
  i1054.TabWidth = i1055[17]
  i1054.Padding = i1055[18]
  i1054.AtlasWidth = i1055[19]
  i1054.AtlasHeight = i1055[20]
  return i1054
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1058 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1059 = data
  i1058.id = i1059[0]
  i1058.x = i1059[1]
  i1058.y = i1059[2]
  i1058.width = i1059[3]
  i1058.height = i1059[4]
  i1058.xOffset = i1059[5]
  i1058.yOffset = i1059[6]
  i1058.xAdvance = i1059[7]
  i1058.scale = i1059[8]
  return i1058
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1060 = root || request.c( 'TMPro.KerningTable' )
  var i1061 = data
  var i1063 = i1061[0]
  var i1062 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1063.length; i += 1) {
    i1062.add(request.d('TMPro.KerningPair', i1063[i + 0]));
  }
  i1060.kerningPairs = i1062
  return i1060
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1066 = root || request.c( 'TMPro.KerningPair' )
  var i1067 = data
  i1066.xOffset = i1067[0]
  i1066.m_FirstGlyph = i1067[1]
  i1066.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1067[2], i1066.m_FirstGlyphAdjustments)
  i1066.m_SecondGlyph = i1067[3]
  i1066.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1067[4], i1066.m_SecondGlyphAdjustments)
  i1066.m_IgnoreSpacingAdjustments = !!i1067[5]
  return i1066
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1068 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1069 = data
  i1068.m_FaceIndex = i1069[0]
  i1068.m_FamilyName = i1069[1]
  i1068.m_StyleName = i1069[2]
  i1068.m_PointSize = i1069[3]
  i1068.m_Scale = i1069[4]
  i1068.m_UnitsPerEM = i1069[5]
  i1068.m_LineHeight = i1069[6]
  i1068.m_AscentLine = i1069[7]
  i1068.m_CapLine = i1069[8]
  i1068.m_MeanLine = i1069[9]
  i1068.m_Baseline = i1069[10]
  i1068.m_DescentLine = i1069[11]
  i1068.m_SuperscriptOffset = i1069[12]
  i1068.m_SuperscriptSize = i1069[13]
  i1068.m_SubscriptOffset = i1069[14]
  i1068.m_SubscriptSize = i1069[15]
  i1068.m_UnderlineOffset = i1069[16]
  i1068.m_UnderlineThickness = i1069[17]
  i1068.m_StrikethroughOffset = i1069[18]
  i1068.m_StrikethroughThickness = i1069[19]
  i1068.m_TabWidth = i1069[20]
  return i1068
}

Deserializers["Spine.Unity.SkeletonDataAsset"] = function (request, data, root) {
  var i1070 = root || request.c( 'Spine.Unity.SkeletonDataAsset' )
  var i1071 = data
  var i1073 = i1071[0]
  var i1072 = []
  for(var i = 0; i < i1073.length; i += 2) {
  request.r(i1073[i + 0], i1073[i + 1], 2, i1072, '')
  }
  i1070.atlasAssets = i1072
  i1070.scale = i1071[1]
  request.r(i1071[2], i1071[3], 0, i1070, 'skeletonJSON')
  i1070.isUpgradingBlendModeMaterials = !!i1071[4]
  i1070.blendModeMaterials = request.d('Spine.Unity.BlendModeMaterials', i1071[5], i1070.blendModeMaterials)
  var i1075 = i1071[6]
  var i1074 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.SkeletonDataModifierAsset')))
  for(var i = 0; i < i1075.length; i += 2) {
  request.r(i1075[i + 0], i1075[i + 1], 1, i1074, '')
  }
  i1070.skeletonDataModifiers = i1074
  var i1077 = i1071[7]
  var i1076 = []
  for(var i = 0; i < i1077.length; i += 1) {
    i1076.push( i1077[i + 0] );
  }
  i1070.fromAnimation = i1076
  var i1079 = i1071[8]
  var i1078 = []
  for(var i = 0; i < i1079.length; i += 1) {
    i1078.push( i1079[i + 0] );
  }
  i1070.toAnimation = i1078
  i1070.duration = i1071[9]
  i1070.defaultMix = i1071[10]
  request.r(i1071[11], i1071[12], 0, i1070, 'controller')
  return i1070
}

Deserializers["Spine.Unity.BlendModeMaterials"] = function (request, data, root) {
  var i1082 = root || request.c( 'Spine.Unity.BlendModeMaterials' )
  var i1083 = data
  i1082.applyAdditiveMaterial = !!i1083[0]
  var i1085 = i1083[1]
  var i1084 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1085.length; i += 1) {
    i1084.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1085[i + 0]));
  }
  i1082.additiveMaterials = i1084
  var i1087 = i1083[2]
  var i1086 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1087.length; i += 1) {
    i1086.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1087[i + 0]));
  }
  i1082.multiplyMaterials = i1086
  var i1089 = i1083[3]
  var i1088 = new (System.Collections.Generic.List$1(Bridge.ns('Spine.Unity.BlendModeMaterials+ReplacementMaterial')))
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.add(request.d('Spine.Unity.BlendModeMaterials+ReplacementMaterial', i1089[i + 0]));
  }
  i1082.screenMaterials = i1088
  i1082.requiresBlendModeMaterials = !!i1083[4]
  return i1082
}

Deserializers["Spine.Unity.BlendModeMaterials+ReplacementMaterial"] = function (request, data, root) {
  var i1092 = root || request.c( 'Spine.Unity.BlendModeMaterials+ReplacementMaterial' )
  var i1093 = data
  i1092.pageName = i1093[0]
  request.r(i1093[1], i1093[2], 0, i1092, 'material')
  return i1092
}

Deserializers["Spine.Unity.SpineAtlasAsset"] = function (request, data, root) {
  var i1096 = root || request.c( 'Spine.Unity.SpineAtlasAsset' )
  var i1097 = data
  request.r(i1097[0], i1097[1], 0, i1096, 'atlasFile')
  var i1099 = i1097[2]
  var i1098 = []
  for(var i = 0; i < i1099.length; i += 2) {
  request.r(i1099[i + 0], i1099[i + 1], 2, i1098, '')
  }
  i1096.materials = i1098
  i1096.textureLoadingMode = i1097[3]
  request.r(i1097[4], i1097[5], 0, i1096, 'onDemandTextureLoader')
  return i1096
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1100 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1101 = data
  i1100.useSafeMode = !!i1101[0]
  i1100.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1101[1], i1100.safeModeOptions)
  i1100.timeScale = i1101[2]
  i1100.unscaledTimeScale = i1101[3]
  i1100.useSmoothDeltaTime = !!i1101[4]
  i1100.maxSmoothUnscaledTime = i1101[5]
  i1100.rewindCallbackMode = i1101[6]
  i1100.showUnityEditorReport = !!i1101[7]
  i1100.logBehaviour = i1101[8]
  i1100.drawGizmos = !!i1101[9]
  i1100.defaultRecyclable = !!i1101[10]
  i1100.defaultAutoPlay = i1101[11]
  i1100.defaultUpdateType = i1101[12]
  i1100.defaultTimeScaleIndependent = !!i1101[13]
  i1100.defaultEaseType = i1101[14]
  i1100.defaultEaseOvershootOrAmplitude = i1101[15]
  i1100.defaultEasePeriod = i1101[16]
  i1100.defaultAutoKill = !!i1101[17]
  i1100.defaultLoopType = i1101[18]
  i1100.debugMode = !!i1101[19]
  i1100.debugStoreTargetId = !!i1101[20]
  i1100.showPreviewPanel = !!i1101[21]
  i1100.storeSettingsLocation = i1101[22]
  i1100.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1101[23], i1100.modules)
  i1100.createASMDEF = !!i1101[24]
  i1100.showPlayingTweens = !!i1101[25]
  i1100.showPausedTweens = !!i1101[26]
  return i1100
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1102 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1103 = data
  i1102.logBehaviour = i1103[0]
  i1102.nestedTweenFailureBehaviour = i1103[1]
  return i1102
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1104 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1105 = data
  i1104.showPanel = !!i1105[0]
  i1104.audioEnabled = !!i1105[1]
  i1104.physicsEnabled = !!i1105[2]
  i1104.physics2DEnabled = !!i1105[3]
  i1104.spriteEnabled = !!i1105[4]
  i1104.uiEnabled = !!i1105[5]
  i1104.textMeshProEnabled = !!i1105[6]
  i1104.tk2DEnabled = !!i1105[7]
  i1104.deAudioEnabled = !!i1105[8]
  i1104.deUnityExtendedEnabled = !!i1105[9]
  i1104.epoOutlineEnabled = !!i1105[10]
  return i1104
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1106 = root || request.c( 'TMPro.TMP_Settings' )
  var i1107 = data
  i1106.assetVersion = i1107[0]
  i1106.m_TextWrappingMode = i1107[1]
  i1106.m_enableKerning = !!i1107[2]
  var i1109 = i1107[3]
  var i1108 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1109.length; i += 1) {
    i1108.add(i1109[i + 0]);
  }
  i1106.m_ActiveFontFeatures = i1108
  i1106.m_enableExtraPadding = !!i1107[4]
  i1106.m_enableTintAllSprites = !!i1107[5]
  i1106.m_enableParseEscapeCharacters = !!i1107[6]
  i1106.m_EnableRaycastTarget = !!i1107[7]
  i1106.m_GetFontFeaturesAtRuntime = !!i1107[8]
  i1106.m_missingGlyphCharacter = i1107[9]
  i1106.m_ClearDynamicDataOnBuild = !!i1107[10]
  i1106.m_warningsDisabled = !!i1107[11]
  request.r(i1107[12], i1107[13], 0, i1106, 'm_defaultFontAsset')
  i1106.m_defaultFontAssetPath = i1107[14]
  i1106.m_defaultFontSize = i1107[15]
  i1106.m_defaultAutoSizeMinRatio = i1107[16]
  i1106.m_defaultAutoSizeMaxRatio = i1107[17]
  i1106.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1107[18], i1107[19] )
  i1106.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1107[20], i1107[21] )
  i1106.m_autoSizeTextContainer = !!i1107[22]
  i1106.m_IsTextObjectScaleStatic = !!i1107[23]
  var i1111 = i1107[24]
  var i1110 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1111.length; i += 2) {
  request.r(i1111[i + 0], i1111[i + 1], 1, i1110, '')
  }
  i1106.m_fallbackFontAssets = i1110
  i1106.m_matchMaterialPreset = !!i1107[25]
  i1106.m_HideSubTextObjects = !!i1107[26]
  request.r(i1107[27], i1107[28], 0, i1106, 'm_defaultSpriteAsset')
  i1106.m_defaultSpriteAssetPath = i1107[29]
  i1106.m_enableEmojiSupport = !!i1107[30]
  i1106.m_MissingCharacterSpriteUnicode = i1107[31]
  var i1113 = i1107[32]
  var i1112 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1113.length; i += 2) {
  request.r(i1113[i + 0], i1113[i + 1], 1, i1112, '')
  }
  i1106.m_EmojiFallbackTextAssets = i1112
  i1106.m_defaultColorGradientPresetsPath = i1107[33]
  request.r(i1107[34], i1107[35], 0, i1106, 'm_defaultStyleSheet')
  i1106.m_StyleSheetsResourcePath = i1107[36]
  request.r(i1107[37], i1107[38], 0, i1106, 'm_leadingCharacters')
  request.r(i1107[39], i1107[40], 0, i1106, 'm_followingCharacters')
  i1106.m_UseModernHangulLineBreakingRules = !!i1107[41]
  return i1106
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1116 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1117 = data
  request.r(i1117[0], i1117[1], 0, i1116, 'spriteSheet')
  var i1119 = i1117[2]
  var i1118 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1119.length; i += 1) {
    i1118.add(request.d('TMPro.TMP_Sprite', i1119[i + 0]));
  }
  i1116.spriteInfoList = i1118
  var i1121 = i1117[3]
  var i1120 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1121.length; i += 2) {
  request.r(i1121[i + 0], i1121[i + 1], 1, i1120, '')
  }
  i1116.fallbackSpriteAssets = i1120
  var i1123 = i1117[4]
  var i1122 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1123.length; i += 1) {
    i1122.add(request.d('TMPro.TMP_SpriteCharacter', i1123[i + 0]));
  }
  i1116.m_SpriteCharacterTable = i1122
  var i1125 = i1117[5]
  var i1124 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1125.length; i += 1) {
    i1124.add(request.d('TMPro.TMP_SpriteGlyph', i1125[i + 0]));
  }
  i1116.m_GlyphTable = i1124
  i1116.m_Version = i1117[6]
  i1116.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1117[7], i1116.m_FaceInfo)
  request.r(i1117[8], i1117[9], 0, i1116, 'm_Material')
  return i1116
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1128 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1129 = data
  i1128.name = i1129[0]
  i1128.hashCode = i1129[1]
  i1128.unicode = i1129[2]
  i1128.pivot = new pc.Vec2( i1129[3], i1129[4] )
  request.r(i1129[5], i1129[6], 0, i1128, 'sprite')
  i1128.id = i1129[7]
  i1128.x = i1129[8]
  i1128.y = i1129[9]
  i1128.width = i1129[10]
  i1128.height = i1129[11]
  i1128.xOffset = i1129[12]
  i1128.yOffset = i1129[13]
  i1128.xAdvance = i1129[14]
  i1128.scale = i1129[15]
  return i1128
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1134 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1135 = data
  i1134.m_Name = i1135[0]
  i1134.m_ElementType = i1135[1]
  i1134.m_Unicode = i1135[2]
  i1134.m_GlyphIndex = i1135[3]
  i1134.m_Scale = i1135[4]
  return i1134
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1138 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1139 = data
  request.r(i1139[0], i1139[1], 0, i1138, 'sprite')
  i1138.m_Index = i1139[2]
  i1138.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1139[3], i1138.m_Metrics)
  i1138.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1139[4], i1138.m_GlyphRect)
  i1138.m_Scale = i1139[5]
  i1138.m_AtlasIndex = i1139[6]
  i1138.m_ClassDefinitionType = i1139[7]
  return i1138
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1140 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1141 = data
  var i1143 = i1141[0]
  var i1142 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1143.length; i += 1) {
    i1142.add(request.d('TMPro.TMP_Style', i1143[i + 0]));
  }
  i1140.m_StyleList = i1142
  return i1140
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1146 = root || request.c( 'TMPro.TMP_Style' )
  var i1147 = data
  i1146.m_Name = i1147[0]
  i1146.m_HashCode = i1147[1]
  i1146.m_OpeningDefinition = i1147[2]
  i1146.m_ClosingDefinition = i1147[3]
  i1146.m_OpeningTagArray = i1147[4]
  i1146.m_ClosingTagArray = i1147[5]
  return i1146
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1148 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1149 = data
  var i1151 = i1149[0]
  var i1150 = []
  for(var i = 0; i < i1151.length; i += 1) {
    i1150.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1151[i + 0]) );
  }
  i1148.files = i1150
  i1148.componentToPrefabIds = i1149[1]
  return i1148
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1154 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1155 = data
  i1154.path = i1155[0]
  request.r(i1155[1], i1155[2], 0, i1154, 'unityObject')
  return i1154
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1156 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1157 = data
  var i1159 = i1157[0]
  var i1158 = []
  for(var i = 0; i < i1159.length; i += 1) {
    i1158.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1159[i + 0]) );
  }
  i1156.scriptsExecutionOrder = i1158
  var i1161 = i1157[1]
  var i1160 = []
  for(var i = 0; i < i1161.length; i += 1) {
    i1160.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1161[i + 0]) );
  }
  i1156.sortingLayers = i1160
  var i1163 = i1157[2]
  var i1162 = []
  for(var i = 0; i < i1163.length; i += 1) {
    i1162.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1163[i + 0]) );
  }
  i1156.cullingLayers = i1162
  i1156.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1157[3], i1156.timeSettings)
  i1156.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1157[4], i1156.physicsSettings)
  i1156.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1157[5], i1156.physics2DSettings)
  i1156.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1157[6], i1156.qualitySettings)
  i1156.enableRealtimeShadows = !!i1157[7]
  i1156.enableAutoInstancing = !!i1157[8]
  i1156.enableStaticBatching = !!i1157[9]
  i1156.enableDynamicBatching = !!i1157[10]
  i1156.usePreservativeDynamicBatching = !!i1157[11]
  i1156.lightmapEncodingQuality = i1157[12]
  i1156.desiredColorSpace = i1157[13]
  var i1165 = i1157[14]
  var i1164 = []
  for(var i = 0; i < i1165.length; i += 1) {
    i1164.push( i1165[i + 0] );
  }
  i1156.allTags = i1164
  return i1156
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1168 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1169 = data
  i1168.name = i1169[0]
  i1168.value = i1169[1]
  return i1168
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1172 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1173 = data
  i1172.id = i1173[0]
  i1172.name = i1173[1]
  i1172.value = i1173[2]
  return i1172
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1176 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1177 = data
  i1176.id = i1177[0]
  i1176.name = i1177[1]
  return i1176
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1178 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1179 = data
  i1178.fixedDeltaTime = i1179[0]
  i1178.maximumDeltaTime = i1179[1]
  i1178.timeScale = i1179[2]
  i1178.maximumParticleTimestep = i1179[3]
  return i1178
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1180 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1181 = data
  i1180.gravity = new pc.Vec3( i1181[0], i1181[1], i1181[2] )
  i1180.defaultSolverIterations = i1181[3]
  i1180.bounceThreshold = i1181[4]
  i1180.autoSyncTransforms = !!i1181[5]
  i1180.autoSimulation = !!i1181[6]
  var i1183 = i1181[7]
  var i1182 = []
  for(var i = 0; i < i1183.length; i += 1) {
    i1182.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1183[i + 0]) );
  }
  i1180.collisionMatrix = i1182
  return i1180
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1186 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1187 = data
  i1186.enabled = !!i1187[0]
  i1186.layerId = i1187[1]
  i1186.otherLayerId = i1187[2]
  return i1186
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1188 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1189 = data
  request.r(i1189[0], i1189[1], 0, i1188, 'material')
  i1188.gravity = new pc.Vec2( i1189[2], i1189[3] )
  i1188.positionIterations = i1189[4]
  i1188.velocityIterations = i1189[5]
  i1188.velocityThreshold = i1189[6]
  i1188.maxLinearCorrection = i1189[7]
  i1188.maxAngularCorrection = i1189[8]
  i1188.maxTranslationSpeed = i1189[9]
  i1188.maxRotationSpeed = i1189[10]
  i1188.baumgarteScale = i1189[11]
  i1188.baumgarteTOIScale = i1189[12]
  i1188.timeToSleep = i1189[13]
  i1188.linearSleepTolerance = i1189[14]
  i1188.angularSleepTolerance = i1189[15]
  i1188.defaultContactOffset = i1189[16]
  i1188.autoSimulation = !!i1189[17]
  i1188.queriesHitTriggers = !!i1189[18]
  i1188.queriesStartInColliders = !!i1189[19]
  i1188.callbacksOnDisable = !!i1189[20]
  i1188.reuseCollisionCallbacks = !!i1189[21]
  i1188.autoSyncTransforms = !!i1189[22]
  var i1191 = i1189[23]
  var i1190 = []
  for(var i = 0; i < i1191.length; i += 1) {
    i1190.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1191[i + 0]) );
  }
  i1188.collisionMatrix = i1190
  return i1188
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1194 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1195 = data
  i1194.enabled = !!i1195[0]
  i1194.layerId = i1195[1]
  i1194.otherLayerId = i1195[2]
  return i1194
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1196 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1197 = data
  var i1199 = i1197[0]
  var i1198 = []
  for(var i = 0; i < i1199.length; i += 1) {
    i1198.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1199[i + 0]) );
  }
  i1196.qualityLevels = i1198
  var i1201 = i1197[1]
  var i1200 = []
  for(var i = 0; i < i1201.length; i += 1) {
    i1200.push( i1201[i + 0] );
  }
  i1196.names = i1200
  i1196.shadows = i1197[2]
  i1196.anisotropicFiltering = i1197[3]
  i1196.antiAliasing = i1197[4]
  i1196.lodBias = i1197[5]
  i1196.shadowCascades = i1197[6]
  i1196.shadowDistance = i1197[7]
  i1196.shadowmaskMode = i1197[8]
  i1196.shadowProjection = i1197[9]
  i1196.shadowResolution = i1197[10]
  i1196.softParticles = !!i1197[11]
  i1196.softVegetation = !!i1197[12]
  i1196.activeColorSpace = i1197[13]
  i1196.desiredColorSpace = i1197[14]
  i1196.masterTextureLimit = i1197[15]
  i1196.maxQueuedFrames = i1197[16]
  i1196.particleRaycastBudget = i1197[17]
  i1196.pixelLightCount = i1197[18]
  i1196.realtimeReflectionProbes = !!i1197[19]
  i1196.shadowCascade2Split = i1197[20]
  i1196.shadowCascade4Split = new pc.Vec3( i1197[21], i1197[22], i1197[23] )
  i1196.streamingMipmapsActive = !!i1197[24]
  i1196.vSyncCount = i1197[25]
  i1196.asyncUploadBufferSize = i1197[26]
  i1196.asyncUploadTimeSlice = i1197[27]
  i1196.billboardsFaceCameraPosition = !!i1197[28]
  i1196.shadowNearPlaneOffset = i1197[29]
  i1196.streamingMipmapsMemoryBudget = i1197[30]
  i1196.maximumLODLevel = i1197[31]
  i1196.streamingMipmapsAddAllCameras = !!i1197[32]
  i1196.streamingMipmapsMaxLevelReduction = i1197[33]
  i1196.streamingMipmapsRenderersPerFrame = i1197[34]
  i1196.resolutionScalingFixedDPIFactor = i1197[35]
  i1196.streamingMipmapsMaxFileIORequests = i1197[36]
  i1196.currentQualityLevel = i1197[37]
  return i1196
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1206 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1207 = data
  i1206.weight = i1207[0]
  i1206.vertices = i1207[1]
  i1206.normals = i1207[2]
  i1206.tangents = i1207[3]
  return i1206
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1208 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1209 = data
  request.r(i1209[0], i1209[1], 0, i1208, 'm_ObjectArgument')
  i1208.m_ObjectArgumentAssemblyTypeName = i1209[2]
  i1208.m_IntArgument = i1209[3]
  i1208.m_FloatArgument = i1209[4]
  i1208.m_StringArgument = i1209[5]
  i1208.m_BoolArgument = !!i1209[6]
  return i1208
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1210 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1211 = data
  i1210.m_GlyphIndex = i1211[0]
  i1210.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1211[1], i1210.m_GlyphValueRecord)
  return i1210
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1212 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1213 = data
  i1212.m_XCoordinate = i1213[0]
  i1212.m_YCoordinate = i1213[1]
  return i1212
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1214 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1215 = data
  i1214.m_XPositionAdjustment = i1215[0]
  i1214.m_YPositionAdjustment = i1215[1]
  return i1214
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1216 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1217 = data
  i1216.xPlacement = i1217[0]
  i1216.yPlacement = i1217[1]
  i1216.xAdvance = i1217[2]
  i1216.yAdvance = i1217[3]
  return i1216
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1218 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1219 = data
  i1218.m_XPlacement = i1219[0]
  i1218.m_YPlacement = i1219[1]
  i1218.m_XAdvance = i1219[2]
  i1218.m_YAdvance = i1219[3]
  return i1218
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"46":[47],"48":[47],"49":[47],"50":[47],"51":[47],"52":[47],"53":[25],"54":[2],"55":[56],"57":[56],"58":[56],"59":[56],"60":[56],"61":[56],"62":[63],"64":[63],"65":[63],"66":[63],"67":[63],"68":[63],"69":[63],"70":[63],"71":[63],"72":[63],"73":[63],"74":[63],"75":[63],"76":[2],"77":[29],"78":[79],"80":[79],"9":[8],"81":[82],"83":[8],"84":[12,8],"30":[29],"22":[12,8],"85":[86,29],"87":[29,28],"88":[29],"89":[56],"90":[63],"91":[82],"92":[93],"94":[8],"95":[12,8],"96":[29],"97":[12,8],"98":[8],"99":[8],"100":[29,8],"13":[8,12],"101":[102],"103":[102],"104":[102],"105":[8],"106":[8],"11":[9],"18":[12,8],"107":[8],"10":[9],"108":[8],"109":[8],"110":[8],"111":[8],"112":[8],"113":[8],"114":[8],"115":[8],"116":[8],"117":[12,8],"118":[8],"119":[8],"120":[8],"121":[8],"122":[12,8],"123":[8],"124":[5],"125":[5],"6":[5],"126":[5],"127":[2],"128":[2]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","TMPro.TextMeshProUGUI","TMPro.TMP_FontAsset","UnityEngine.Material","UnityEngine.MonoBehaviour","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.Sprite","UnityEngine.UI.Button","AnimationController","Spine.Unity.SkeletonGraphic","Spine.Unity.SkeletonDataAsset","UnityEngine.SpriteRenderer","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Transform","UnityEngine.MeshFilter","UnityEngine.MeshRenderer","Spine.Unity.SkeletonAnimation","UnityEngine.ParticleSystem","UnityEngine.ParticleSystemRenderer","GameController","UnityEngine.GameObject","LunaController","AudioController","UnityEngine.AudioClip","UnityEngine.AudioSource","UnityEngine.Cubemap","Spine.Unity.SpineAtlasAsset","UnityEngine.TextAsset","DG.Tweening.Core.DOTweenSettings","TMPro.TMP_Settings","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","Spine.Unity.EditorSkeletonPlayer","Spine.Unity.ISkeletonAnimation","Spine.Unity.BoneFollowerGraphic","Spine.Unity.SkeletonSubmeshGraphic","Spine.Unity.SkeletonMecanim","UnityEngine.Animator","Spine.Unity.SkeletonPartsRenderer","Spine.Unity.SkeletonRenderer","Spine.Unity.FollowLocationRigidbody","Spine.Unity.FollowLocationRigidbody2D","Spine.Unity.SkeletonUtility","Spine.Unity.SkeletonUtilityConstraint","Spine.Unity.SkeletonUtilityBone","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Text","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.76f1";

Deserializers.productName = "PEOP_Luna-PEOP_V34";

Deserializers.lunaInitializationTime = "06/15/2026 03:25:00";

Deserializers.lunaDaysRunning = "1.1";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "PEOP_V34_DungNV_TamNTM";

Deserializers.lunaAppID = "35701";

Deserializers.projectId = "0e787593107211e4daa054ef28fc18dc";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1855";

Deserializers.runtimeAnalysisExcludedMethodsCount = "5383";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.PEOP_LunaPEOP_V34";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "612396f1-6a85-4c6d-acd5-bcc65a21a458";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"],["Spine","Unity","AttachmentTools","AtlasUtilities","Init"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

