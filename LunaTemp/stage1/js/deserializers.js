var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1218 = root || request.c( 'UnityEngine.JointSpring' )
  var i1219 = data
  i1218.spring = i1219[0]
  i1218.damper = i1219[1]
  i1218.targetPosition = i1219[2]
  return i1218
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1220 = root || request.c( 'UnityEngine.JointMotor' )
  var i1221 = data
  i1220.m_TargetVelocity = i1221[0]
  i1220.m_Force = i1221[1]
  i1220.m_FreeSpin = i1221[2]
  return i1220
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1222 = root || request.c( 'UnityEngine.JointLimits' )
  var i1223 = data
  i1222.m_Min = i1223[0]
  i1222.m_Max = i1223[1]
  i1222.m_Bounciness = i1223[2]
  i1222.m_BounceMinVelocity = i1223[3]
  i1222.m_ContactDistance = i1223[4]
  i1222.minBounce = i1223[5]
  i1222.maxBounce = i1223[6]
  return i1222
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1224 = root || request.c( 'UnityEngine.JointDrive' )
  var i1225 = data
  i1224.m_PositionSpring = i1225[0]
  i1224.m_PositionDamper = i1225[1]
  i1224.m_MaximumForce = i1225[2]
  i1224.m_UseAcceleration = i1225[3]
  return i1224
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1226 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1227 = data
  i1226.m_Spring = i1227[0]
  i1226.m_Damper = i1227[1]
  return i1226
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1228 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1229 = data
  i1228.m_Limit = i1229[0]
  i1228.m_Bounciness = i1229[1]
  i1228.m_ContactDistance = i1229[2]
  return i1228
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1230 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1231 = data
  i1230.m_ExtremumSlip = i1231[0]
  i1230.m_ExtremumValue = i1231[1]
  i1230.m_AsymptoteSlip = i1231[2]
  i1230.m_AsymptoteValue = i1231[3]
  i1230.m_Stiffness = i1231[4]
  return i1230
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1232 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1233 = data
  i1232.m_LowerAngle = i1233[0]
  i1232.m_UpperAngle = i1233[1]
  return i1232
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1234 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1235 = data
  i1234.m_MotorSpeed = i1235[0]
  i1234.m_MaximumMotorTorque = i1235[1]
  return i1234
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1236 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1237 = data
  i1236.m_DampingRatio = i1237[0]
  i1236.m_Frequency = i1237[1]
  i1236.m_Angle = i1237[2]
  return i1236
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1238 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1239 = data
  i1238.m_LowerTranslation = i1239[0]
  i1238.m_UpperTranslation = i1239[1]
  return i1238
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1240 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1241 = data
  i1240.name = i1241[0]
  i1240.width = i1241[1]
  i1240.height = i1241[2]
  i1240.mipmapCount = i1241[3]
  i1240.anisoLevel = i1241[4]
  i1240.filterMode = i1241[5]
  i1240.hdr = !!i1241[6]
  i1240.format = i1241[7]
  i1240.wrapMode = i1241[8]
  i1240.alphaIsTransparency = !!i1241[9]
  i1240.alphaSource = i1241[10]
  i1240.graphicsFormat = i1241[11]
  i1240.sRGBTexture = !!i1241[12]
  i1240.desiredColorSpace = i1241[13]
  i1240.wrapU = i1241[14]
  i1240.wrapV = i1241[15]
  return i1240
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1242 = root || new pc.UnityMaterial()
  var i1243 = data
  i1242.name = i1243[0]
  request.r(i1243[1], i1243[2], 0, i1242, 'shader')
  i1242.renderQueue = i1243[3]
  i1242.enableInstancing = !!i1243[4]
  var i1245 = i1243[5]
  var i1244 = []
  for(var i = 0; i < i1245.length; i += 1) {
    i1244.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1245[i + 0]) );
  }
  i1242.floatParameters = i1244
  var i1247 = i1243[6]
  var i1246 = []
  for(var i = 0; i < i1247.length; i += 1) {
    i1246.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1247[i + 0]) );
  }
  i1242.colorParameters = i1246
  var i1249 = i1243[7]
  var i1248 = []
  for(var i = 0; i < i1249.length; i += 1) {
    i1248.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1249[i + 0]) );
  }
  i1242.vectorParameters = i1248
  var i1251 = i1243[8]
  var i1250 = []
  for(var i = 0; i < i1251.length; i += 1) {
    i1250.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1251[i + 0]) );
  }
  i1242.textureParameters = i1250
  var i1253 = i1243[9]
  var i1252 = []
  for(var i = 0; i < i1253.length; i += 1) {
    i1252.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1253[i + 0]) );
  }
  i1242.materialFlags = i1252
  return i1242
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1256 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1257 = data
  i1256.name = i1257[0]
  i1256.value = i1257[1]
  return i1256
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1260 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1261 = data
  i1260.name = i1261[0]
  i1260.value = new pc.Color(i1261[1], i1261[2], i1261[3], i1261[4])
  return i1260
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1264 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1265 = data
  i1264.name = i1265[0]
  i1264.value = new pc.Vec4( i1265[1], i1265[2], i1265[3], i1265[4] )
  return i1264
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1268 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1269 = data
  i1268.name = i1269[0]
  request.r(i1269[1], i1269[2], 0, i1268, 'value')
  return i1268
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1272 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1273 = data
  i1272.name = i1273[0]
  i1272.enabled = !!i1273[1]
  return i1272
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1274 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1275 = data
  i1274.name = i1275[0]
  i1274.halfPrecision = !!i1275[1]
  i1274.useSimplification = !!i1275[2]
  i1274.useUInt32IndexFormat = !!i1275[3]
  i1274.vertexCount = i1275[4]
  i1274.aabb = i1275[5]
  var i1277 = i1275[6]
  var i1276 = []
  for(var i = 0; i < i1277.length; i += 1) {
    i1276.push( !!i1277[i + 0] );
  }
  i1274.streams = i1276
  i1274.vertices = i1275[7]
  var i1279 = i1275[8]
  var i1278 = []
  for(var i = 0; i < i1279.length; i += 1) {
    i1278.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1279[i + 0]) );
  }
  i1274.subMeshes = i1278
  var i1281 = i1275[9]
  var i1280 = []
  for(var i = 0; i < i1281.length; i += 16) {
    i1280.push( new pc.Mat4().setData(i1281[i + 0], i1281[i + 1], i1281[i + 2], i1281[i + 3],  i1281[i + 4], i1281[i + 5], i1281[i + 6], i1281[i + 7],  i1281[i + 8], i1281[i + 9], i1281[i + 10], i1281[i + 11],  i1281[i + 12], i1281[i + 13], i1281[i + 14], i1281[i + 15]) );
  }
  i1274.bindposes = i1280
  var i1283 = i1275[10]
  var i1282 = []
  for(var i = 0; i < i1283.length; i += 1) {
    i1282.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1283[i + 0]) );
  }
  i1274.blendShapes = i1282
  return i1274
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1288 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1289 = data
  i1288.triangles = i1289[0]
  return i1288
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1294 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1295 = data
  i1294.name = i1295[0]
  var i1297 = i1295[1]
  var i1296 = []
  for(var i = 0; i < i1297.length; i += 1) {
    i1296.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1297[i + 0]) );
  }
  i1294.frames = i1296
  return i1294
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i1298 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i1299 = data
  i1298.position = new pc.Vec3( i1299[0], i1299[1], i1299[2] )
  i1298.scale = new pc.Vec3( i1299[3], i1299[4], i1299[5] )
  i1298.rotation = new pc.Quat(i1299[6], i1299[7], i1299[8], i1299[9])
  return i1298
}

Deserializers["BulletController"] = function (request, data, root) {
  var i1300 = root || request.c( 'BulletController' )
  var i1301 = data
  return i1300
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1302 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1303 = data
  request.r(i1303[0], i1303[1], 0, i1302, 'sharedMesh')
  return i1302
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1304 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1305 = data
  request.r(i1305[0], i1305[1], 0, i1304, 'additionalVertexStreams')
  i1304.enabled = !!i1305[2]
  request.r(i1305[3], i1305[4], 0, i1304, 'sharedMaterial')
  var i1307 = i1305[5]
  var i1306 = []
  for(var i = 0; i < i1307.length; i += 2) {
  request.r(i1307[i + 0], i1307[i + 1], 2, i1306, '')
  }
  i1304.sharedMaterials = i1306
  i1304.receiveShadows = !!i1305[6]
  i1304.shadowCastingMode = i1305[7]
  i1304.sortingLayerID = i1305[8]
  i1304.sortingOrder = i1305[9]
  i1304.lightmapIndex = i1305[10]
  i1304.lightmapSceneIndex = i1305[11]
  i1304.lightmapScaleOffset = new pc.Vec4( i1305[12], i1305[13], i1305[14], i1305[15] )
  i1304.lightProbeUsage = i1305[16]
  i1304.reflectionProbeUsage = i1305[17]
  return i1304
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1310 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1311 = data
  i1310.name = i1311[0]
  i1310.tagId = i1311[1]
  i1310.enabled = !!i1311[2]
  i1310.isStatic = !!i1311[3]
  i1310.layer = i1311[4]
  return i1310
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i1312 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i1313 = data
  i1312.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i1313[0], i1312.main)
  i1312.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i1313[1], i1312.colorBySpeed)
  i1312.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i1313[2], i1312.colorOverLifetime)
  i1312.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i1313[3], i1312.emission)
  i1312.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i1313[4], i1312.rotationBySpeed)
  i1312.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i1313[5], i1312.rotationOverLifetime)
  i1312.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i1313[6], i1312.shape)
  i1312.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i1313[7], i1312.sizeBySpeed)
  i1312.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i1313[8], i1312.sizeOverLifetime)
  i1312.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i1313[9], i1312.textureSheetAnimation)
  i1312.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i1313[10], i1312.velocityOverLifetime)
  i1312.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i1313[11], i1312.noise)
  i1312.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i1313[12], i1312.inheritVelocity)
  i1312.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i1313[13], i1312.forceOverLifetime)
  i1312.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i1313[14], i1312.limitVelocityOverLifetime)
  i1312.useAutoRandomSeed = !!i1313[15]
  i1312.randomSeed = i1313[16]
  return i1312
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i1314 = root || new pc.ParticleSystemMain()
  var i1315 = data
  i1314.duration = i1315[0]
  i1314.loop = !!i1315[1]
  i1314.prewarm = !!i1315[2]
  i1314.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[3], i1314.startDelay)
  i1314.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[4], i1314.startLifetime)
  i1314.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[5], i1314.startSpeed)
  i1314.startSize3D = !!i1315[6]
  i1314.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[7], i1314.startSizeX)
  i1314.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[8], i1314.startSizeY)
  i1314.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[9], i1314.startSizeZ)
  i1314.startRotation3D = !!i1315[10]
  i1314.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[11], i1314.startRotationX)
  i1314.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[12], i1314.startRotationY)
  i1314.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[13], i1314.startRotationZ)
  i1314.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1315[14], i1314.startColor)
  i1314.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1315[15], i1314.gravityModifier)
  i1314.simulationSpace = i1315[16]
  request.r(i1315[17], i1315[18], 0, i1314, 'customSimulationSpace')
  i1314.simulationSpeed = i1315[19]
  i1314.useUnscaledTime = !!i1315[20]
  i1314.scalingMode = i1315[21]
  i1314.playOnAwake = !!i1315[22]
  i1314.maxParticles = i1315[23]
  i1314.emitterVelocityMode = i1315[24]
  i1314.stopAction = i1315[25]
  return i1314
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i1316 = root || new pc.MinMaxCurve()
  var i1317 = data
  i1316.mode = i1317[0]
  i1316.curveMin = new pc.AnimationCurve( { keys_flow: i1317[1] } )
  i1316.curveMax = new pc.AnimationCurve( { keys_flow: i1317[2] } )
  i1316.curveMultiplier = i1317[3]
  i1316.constantMin = i1317[4]
  i1316.constantMax = i1317[5]
  return i1316
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i1318 = root || new pc.MinMaxGradient()
  var i1319 = data
  i1318.mode = i1319[0]
  i1318.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1319[1], i1318.gradientMin)
  i1318.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i1319[2], i1318.gradientMax)
  i1318.colorMin = new pc.Color(i1319[3], i1319[4], i1319[5], i1319[6])
  i1318.colorMax = new pc.Color(i1319[7], i1319[8], i1319[9], i1319[10])
  return i1318
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i1320 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i1321 = data
  i1320.mode = i1321[0]
  var i1323 = i1321[1]
  var i1322 = []
  for(var i = 0; i < i1323.length; i += 1) {
    i1322.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i1323[i + 0]) );
  }
  i1320.colorKeys = i1322
  var i1325 = i1321[2]
  var i1324 = []
  for(var i = 0; i < i1325.length; i += 1) {
    i1324.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i1325[i + 0]) );
  }
  i1320.alphaKeys = i1324
  return i1320
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i1326 = root || new pc.ParticleSystemColorBySpeed()
  var i1327 = data
  i1326.enabled = !!i1327[0]
  i1326.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1327[1], i1326.color)
  i1326.range = new pc.Vec2( i1327[2], i1327[3] )
  return i1326
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i1330 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i1331 = data
  i1330.color = new pc.Color(i1331[0], i1331[1], i1331[2], i1331[3])
  i1330.time = i1331[4]
  return i1330
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i1334 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i1335 = data
  i1334.alpha = i1335[0]
  i1334.time = i1335[1]
  return i1334
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i1336 = root || new pc.ParticleSystemColorOverLifetime()
  var i1337 = data
  i1336.enabled = !!i1337[0]
  i1336.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i1337[1], i1336.color)
  return i1336
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i1338 = root || new pc.ParticleSystemEmitter()
  var i1339 = data
  i1338.enabled = !!i1339[0]
  i1338.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1339[1], i1338.rateOverTime)
  i1338.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1339[2], i1338.rateOverDistance)
  var i1341 = i1339[3]
  var i1340 = []
  for(var i = 0; i < i1341.length; i += 1) {
    i1340.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i1341[i + 0]) );
  }
  i1338.bursts = i1340
  return i1338
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i1344 = root || new pc.ParticleSystemBurst()
  var i1345 = data
  i1344.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1345[0], i1344.count)
  i1344.cycleCount = i1345[1]
  i1344.minCount = i1345[2]
  i1344.maxCount = i1345[3]
  i1344.repeatInterval = i1345[4]
  i1344.time = i1345[5]
  return i1344
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i1346 = root || new pc.ParticleSystemRotationBySpeed()
  var i1347 = data
  i1346.enabled = !!i1347[0]
  i1346.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1347[1], i1346.x)
  i1346.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1347[2], i1346.y)
  i1346.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1347[3], i1346.z)
  i1346.separateAxes = !!i1347[4]
  i1346.range = new pc.Vec2( i1347[5], i1347[6] )
  return i1346
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i1348 = root || new pc.ParticleSystemRotationOverLifetime()
  var i1349 = data
  i1348.enabled = !!i1349[0]
  i1348.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1349[1], i1348.x)
  i1348.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1349[2], i1348.y)
  i1348.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1349[3], i1348.z)
  i1348.separateAxes = !!i1349[4]
  return i1348
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i1350 = root || new pc.ParticleSystemShape()
  var i1351 = data
  i1350.enabled = !!i1351[0]
  i1350.shapeType = i1351[1]
  i1350.randomDirectionAmount = i1351[2]
  i1350.sphericalDirectionAmount = i1351[3]
  i1350.randomPositionAmount = i1351[4]
  i1350.alignToDirection = !!i1351[5]
  i1350.radius = i1351[6]
  i1350.radiusMode = i1351[7]
  i1350.radiusSpread = i1351[8]
  i1350.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1351[9], i1350.radiusSpeed)
  i1350.radiusThickness = i1351[10]
  i1350.angle = i1351[11]
  i1350.length = i1351[12]
  i1350.boxThickness = new pc.Vec3( i1351[13], i1351[14], i1351[15] )
  i1350.meshShapeType = i1351[16]
  request.r(i1351[17], i1351[18], 0, i1350, 'mesh')
  request.r(i1351[19], i1351[20], 0, i1350, 'meshRenderer')
  request.r(i1351[21], i1351[22], 0, i1350, 'skinnedMeshRenderer')
  i1350.useMeshMaterialIndex = !!i1351[23]
  i1350.meshMaterialIndex = i1351[24]
  i1350.useMeshColors = !!i1351[25]
  i1350.normalOffset = i1351[26]
  i1350.arc = i1351[27]
  i1350.arcMode = i1351[28]
  i1350.arcSpread = i1351[29]
  i1350.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1351[30], i1350.arcSpeed)
  i1350.donutRadius = i1351[31]
  i1350.position = new pc.Vec3( i1351[32], i1351[33], i1351[34] )
  i1350.rotation = new pc.Vec3( i1351[35], i1351[36], i1351[37] )
  i1350.scale = new pc.Vec3( i1351[38], i1351[39], i1351[40] )
  return i1350
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i1352 = root || new pc.ParticleSystemSizeBySpeed()
  var i1353 = data
  i1352.enabled = !!i1353[0]
  i1352.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1353[1], i1352.x)
  i1352.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1353[2], i1352.y)
  i1352.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1353[3], i1352.z)
  i1352.separateAxes = !!i1353[4]
  i1352.range = new pc.Vec2( i1353[5], i1353[6] )
  return i1352
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i1354 = root || new pc.ParticleSystemSizeOverLifetime()
  var i1355 = data
  i1354.enabled = !!i1355[0]
  i1354.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1355[1], i1354.x)
  i1354.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1355[2], i1354.y)
  i1354.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1355[3], i1354.z)
  i1354.separateAxes = !!i1355[4]
  return i1354
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i1356 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i1357 = data
  i1356.enabled = !!i1357[0]
  i1356.mode = i1357[1]
  i1356.animation = i1357[2]
  i1356.numTilesX = i1357[3]
  i1356.numTilesY = i1357[4]
  i1356.useRandomRow = !!i1357[5]
  i1356.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1357[6], i1356.frameOverTime)
  i1356.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1357[7], i1356.startFrame)
  i1356.cycleCount = i1357[8]
  i1356.rowIndex = i1357[9]
  i1356.flipU = i1357[10]
  i1356.flipV = i1357[11]
  i1356.spriteCount = i1357[12]
  var i1359 = i1357[13]
  var i1358 = []
  for(var i = 0; i < i1359.length; i += 2) {
  request.r(i1359[i + 0], i1359[i + 1], 2, i1358, '')
  }
  i1356.sprites = i1358
  return i1356
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i1362 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i1363 = data
  i1362.enabled = !!i1363[0]
  i1362.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[1], i1362.x)
  i1362.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[2], i1362.y)
  i1362.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[3], i1362.z)
  i1362.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[4], i1362.radial)
  i1362.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[5], i1362.speedModifier)
  i1362.space = i1363[6]
  i1362.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[7], i1362.orbitalX)
  i1362.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[8], i1362.orbitalY)
  i1362.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[9], i1362.orbitalZ)
  i1362.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[10], i1362.orbitalOffsetX)
  i1362.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[11], i1362.orbitalOffsetY)
  i1362.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1363[12], i1362.orbitalOffsetZ)
  return i1362
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i1364 = root || new pc.ParticleSystemNoise()
  var i1365 = data
  i1364.enabled = !!i1365[0]
  i1364.separateAxes = !!i1365[1]
  i1364.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[2], i1364.strengthX)
  i1364.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[3], i1364.strengthY)
  i1364.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[4], i1364.strengthZ)
  i1364.frequency = i1365[5]
  i1364.damping = !!i1365[6]
  i1364.octaveCount = i1365[7]
  i1364.octaveMultiplier = i1365[8]
  i1364.octaveScale = i1365[9]
  i1364.quality = i1365[10]
  i1364.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[11], i1364.scrollSpeed)
  i1364.scrollSpeedMultiplier = i1365[12]
  i1364.remapEnabled = !!i1365[13]
  i1364.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[14], i1364.remapX)
  i1364.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[15], i1364.remapY)
  i1364.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[16], i1364.remapZ)
  i1364.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[17], i1364.positionAmount)
  i1364.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[18], i1364.rotationAmount)
  i1364.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1365[19], i1364.sizeAmount)
  return i1364
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i1366 = root || new pc.ParticleSystemInheritVelocity()
  var i1367 = data
  i1366.enabled = !!i1367[0]
  i1366.mode = i1367[1]
  i1366.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1367[2], i1366.curve)
  return i1366
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i1368 = root || new pc.ParticleSystemForceOverLifetime()
  var i1369 = data
  i1368.enabled = !!i1369[0]
  i1368.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1369[1], i1368.x)
  i1368.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1369[2], i1368.y)
  i1368.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1369[3], i1368.z)
  i1368.space = i1369[4]
  i1368.randomized = !!i1369[5]
  return i1368
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i1370 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i1371 = data
  i1370.enabled = !!i1371[0]
  i1370.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1371[1], i1370.limit)
  i1370.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1371[2], i1370.limitX)
  i1370.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1371[3], i1370.limitY)
  i1370.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1371[4], i1370.limitZ)
  i1370.dampen = i1371[5]
  i1370.separateAxes = !!i1371[6]
  i1370.space = i1371[7]
  i1370.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i1371[8], i1370.drag)
  i1370.multiplyDragByParticleSize = !!i1371[9]
  i1370.multiplyDragByParticleVelocity = !!i1371[10]
  return i1370
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i1372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i1373 = data
  request.r(i1373[0], i1373[1], 0, i1372, 'mesh')
  i1372.meshCount = i1373[2]
  i1372.activeVertexStreamsCount = i1373[3]
  i1372.alignment = i1373[4]
  i1372.renderMode = i1373[5]
  i1372.sortMode = i1373[6]
  i1372.lengthScale = i1373[7]
  i1372.velocityScale = i1373[8]
  i1372.cameraVelocityScale = i1373[9]
  i1372.normalDirection = i1373[10]
  i1372.sortingFudge = i1373[11]
  i1372.minParticleSize = i1373[12]
  i1372.maxParticleSize = i1373[13]
  i1372.pivot = new pc.Vec3( i1373[14], i1373[15], i1373[16] )
  request.r(i1373[17], i1373[18], 0, i1372, 'trailMaterial')
  i1372.applyActiveColorSpace = !!i1373[19]
  i1372.enabled = !!i1373[20]
  request.r(i1373[21], i1373[22], 0, i1372, 'sharedMaterial')
  var i1375 = i1373[23]
  var i1374 = []
  for(var i = 0; i < i1375.length; i += 2) {
  request.r(i1375[i + 0], i1375[i + 1], 2, i1374, '')
  }
  i1372.sharedMaterials = i1374
  i1372.receiveShadows = !!i1373[24]
  i1372.shadowCastingMode = i1373[25]
  i1372.sortingLayerID = i1373[26]
  i1372.sortingOrder = i1373[27]
  i1372.lightmapIndex = i1373[28]
  i1372.lightmapSceneIndex = i1373[29]
  i1372.lightmapScaleOffset = new pc.Vec4( i1373[30], i1373[31], i1373[32], i1373[33] )
  i1372.lightProbeUsage = i1373[34]
  i1372.reflectionProbeUsage = i1373[35]
  return i1372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i1376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i1377 = data
  i1376.color = new pc.Color(i1377[0], i1377[1], i1377[2], i1377[3])
  request.r(i1377[4], i1377[5], 0, i1376, 'sprite')
  i1376.flipX = !!i1377[6]
  i1376.flipY = !!i1377[7]
  i1376.drawMode = i1377[8]
  i1376.size = new pc.Vec2( i1377[9], i1377[10] )
  i1376.tileMode = i1377[11]
  i1376.adaptiveModeThreshold = i1377[12]
  i1376.maskInteraction = i1377[13]
  i1376.spriteSortPoint = i1377[14]
  i1376.enabled = !!i1377[15]
  request.r(i1377[16], i1377[17], 0, i1376, 'sharedMaterial')
  var i1379 = i1377[18]
  var i1378 = []
  for(var i = 0; i < i1379.length; i += 2) {
  request.r(i1379[i + 0], i1379[i + 1], 2, i1378, '')
  }
  i1376.sharedMaterials = i1378
  i1376.receiveShadows = !!i1377[19]
  i1376.shadowCastingMode = i1377[20]
  i1376.sortingLayerID = i1377[21]
  i1376.sortingOrder = i1377[22]
  i1376.lightmapIndex = i1377[23]
  i1376.lightmapSceneIndex = i1377[24]
  i1376.lightmapScaleOffset = new pc.Vec4( i1377[25], i1377[26], i1377[27], i1377[28] )
  i1376.lightProbeUsage = i1377[29]
  i1376.reflectionProbeUsage = i1377[30]
  return i1376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1381 = data
  i1380.name = i1381[0]
  i1380.atlasId = i1381[1]
  i1380.mipmapCount = i1381[2]
  i1380.hdr = !!i1381[3]
  i1380.size = i1381[4]
  i1380.anisoLevel = i1381[5]
  i1380.filterMode = i1381[6]
  var i1383 = i1381[7]
  var i1382 = []
  for(var i = 0; i < i1383.length; i += 4) {
    i1382.push( UnityEngine.Rect.MinMaxRect(i1383[i + 0], i1383[i + 1], i1383[i + 2], i1383[i + 3]) );
  }
  i1380.rects = i1382
  i1380.wrapU = i1381[8]
  i1380.wrapV = i1381[9]
  return i1380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1387 = data
  i1386.name = i1387[0]
  i1386.index = i1387[1]
  i1386.startup = !!i1387[2]
  return i1386
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i1388 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i1389 = data
  request.r(i1389[0], i1389[1], 0, i1388, 'm_FirstSelected')
  i1388.m_sendNavigationEvents = !!i1389[2]
  i1388.m_DragThreshold = i1389[3]
  return i1388
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i1390 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i1391 = data
  i1390.m_HorizontalAxis = i1391[0]
  i1390.m_VerticalAxis = i1391[1]
  i1390.m_SubmitButton = i1391[2]
  i1390.m_CancelButton = i1391[3]
  i1390.m_InputActionsPerSecond = i1391[4]
  i1390.m_RepeatDelay = i1391[5]
  i1390.m_ForceModuleActive = !!i1391[6]
  i1390.m_SendPointerHoverToParent = !!i1391[7]
  return i1390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1393 = data
  i1392.type = i1393[0]
  i1392.color = new pc.Color(i1393[1], i1393[2], i1393[3], i1393[4])
  i1392.cullingMask = i1393[5]
  i1392.intensity = i1393[6]
  i1392.range = i1393[7]
  i1392.spotAngle = i1393[8]
  i1392.shadows = i1393[9]
  i1392.shadowNormalBias = i1393[10]
  i1392.shadowBias = i1393[11]
  i1392.shadowStrength = i1393[12]
  i1392.shadowResolution = i1393[13]
  i1392.lightmapBakeType = i1393[14]
  i1392.renderMode = i1393[15]
  request.r(i1393[16], i1393[17], 0, i1392, 'cookie')
  i1392.cookieSize = i1393[18]
  i1392.shadowNearPlane = i1393[19]
  i1392.occlusionMaskChannel = i1393[20]
  i1392.isBaked = !!i1393[21]
  i1392.mixedLightingMode = i1393[22]
  i1392.enabled = !!i1393[23]
  return i1392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1395 = data
  i1394.pivot = new pc.Vec2( i1395[0], i1395[1] )
  i1394.anchorMin = new pc.Vec2( i1395[2], i1395[3] )
  i1394.anchorMax = new pc.Vec2( i1395[4], i1395[5] )
  i1394.sizeDelta = new pc.Vec2( i1395[6], i1395[7] )
  i1394.anchoredPosition3D = new pc.Vec3( i1395[8], i1395[9], i1395[10] )
  i1394.rotation = new pc.Quat(i1395[11], i1395[12], i1395[13], i1395[14])
  i1394.scale = new pc.Vec3( i1395[15], i1395[16], i1395[17] )
  return i1394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i1396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i1397 = data
  i1396.planeDistance = i1397[0]
  i1396.referencePixelsPerUnit = i1397[1]
  i1396.isFallbackOverlay = !!i1397[2]
  i1396.renderMode = i1397[3]
  i1396.renderOrder = i1397[4]
  i1396.sortingLayerName = i1397[5]
  i1396.sortingOrder = i1397[6]
  i1396.scaleFactor = i1397[7]
  request.r(i1397[8], i1397[9], 0, i1396, 'worldCamera')
  i1396.overrideSorting = !!i1397[10]
  i1396.pixelPerfect = !!i1397[11]
  i1396.targetDisplay = i1397[12]
  i1396.overridePixelPerfect = !!i1397[13]
  i1396.enabled = !!i1397[14]
  return i1396
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i1398 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i1399 = data
  i1398.m_UiScaleMode = i1399[0]
  i1398.m_ReferencePixelsPerUnit = i1399[1]
  i1398.m_ScaleFactor = i1399[2]
  i1398.m_ReferenceResolution = new pc.Vec2( i1399[3], i1399[4] )
  i1398.m_ScreenMatchMode = i1399[5]
  i1398.m_MatchWidthOrHeight = i1399[6]
  i1398.m_PhysicalUnit = i1399[7]
  i1398.m_FallbackScreenDPI = i1399[8]
  i1398.m_DefaultSpriteDPI = i1399[9]
  i1398.m_DynamicPixelsPerUnit = i1399[10]
  i1398.m_PresetInfoIsWorld = !!i1399[11]
  return i1398
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i1400 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i1401 = data
  i1400.m_IgnoreReversedGraphics = !!i1401[0]
  i1400.m_BlockingObjects = i1401[1]
  i1400.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i1401[2] )
  return i1400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1403 = data
  i1402.cullTransparentMesh = !!i1403[0]
  return i1402
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1404 = root || request.c( 'UnityEngine.UI.Text' )
  var i1405 = data
  i1404.m_FontData = request.d('UnityEngine.UI.FontData', i1405[0], i1404.m_FontData)
  i1404.m_Text = i1405[1]
  request.r(i1405[2], i1405[3], 0, i1404, 'm_Material')
  i1404.m_Maskable = !!i1405[4]
  i1404.m_Color = new pc.Color(i1405[5], i1405[6], i1405[7], i1405[8])
  i1404.m_RaycastTarget = !!i1405[9]
  i1404.m_RaycastPadding = new pc.Vec4( i1405[10], i1405[11], i1405[12], i1405[13] )
  return i1404
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1406 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1407 = data
  request.r(i1407[0], i1407[1], 0, i1406, 'm_Font')
  i1406.m_FontSize = i1407[2]
  i1406.m_FontStyle = i1407[3]
  i1406.m_BestFit = !!i1407[4]
  i1406.m_MinSize = i1407[5]
  i1406.m_MaxSize = i1407[6]
  i1406.m_Alignment = i1407[7]
  i1406.m_AlignByGeometry = !!i1407[8]
  i1406.m_RichText = !!i1407[9]
  i1406.m_HorizontalOverflow = i1407[10]
  i1406.m_VerticalOverflow = i1407[11]
  i1406.m_LineSpacing = i1407[12]
  return i1406
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i1408 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i1409 = data
  i1408.targetIsSelf = !!i1409[0]
  request.r(i1409[1], i1409[2], 0, i1408, 'targetGO')
  i1408.tweenTargetIsTargetGO = !!i1409[3]
  i1408.delay = i1409[4]
  i1408.duration = i1409[5]
  i1408.easeType = i1409[6]
  i1408.easeCurve = new pc.AnimationCurve( { keys_flow: i1409[7] } )
  i1408.loopType = i1409[8]
  i1408.loops = i1409[9]
  i1408.id = i1409[10]
  i1408.isRelative = !!i1409[11]
  i1408.isFrom = !!i1409[12]
  i1408.isIndependentUpdate = !!i1409[13]
  i1408.autoKill = !!i1409[14]
  i1408.autoGenerate = !!i1409[15]
  i1408.isActive = !!i1409[16]
  i1408.isValid = !!i1409[17]
  request.r(i1409[18], i1409[19], 0, i1408, 'target')
  i1408.animationType = i1409[20]
  i1408.targetType = i1409[21]
  i1408.forcedTargetType = i1409[22]
  i1408.autoPlay = !!i1409[23]
  i1408.useTargetAsV3 = !!i1409[24]
  i1408.endValueFloat = i1409[25]
  i1408.endValueV3 = new pc.Vec3( i1409[26], i1409[27], i1409[28] )
  i1408.endValueV2 = new pc.Vec2( i1409[29], i1409[30] )
  i1408.endValueColor = new pc.Color(i1409[31], i1409[32], i1409[33], i1409[34])
  i1408.endValueString = i1409[35]
  i1408.endValueRect = UnityEngine.Rect.MinMaxRect(i1409[36], i1409[37], i1409[38], i1409[39])
  request.r(i1409[40], i1409[41], 0, i1408, 'endValueTransform')
  i1408.optionalBool0 = !!i1409[42]
  i1408.optionalBool1 = !!i1409[43]
  i1408.optionalFloat0 = i1409[44]
  i1408.optionalInt0 = i1409[45]
  i1408.optionalRotationMode = i1409[46]
  i1408.optionalScrambleMode = i1409[47]
  i1408.optionalShakeRandomnessMode = i1409[48]
  i1408.optionalString = i1409[49]
  i1408.updateType = i1409[50]
  i1408.isSpeedBased = !!i1409[51]
  i1408.hasOnStart = !!i1409[52]
  i1408.hasOnPlay = !!i1409[53]
  i1408.hasOnUpdate = !!i1409[54]
  i1408.hasOnStepComplete = !!i1409[55]
  i1408.hasOnComplete = !!i1409[56]
  i1408.hasOnTweenCreated = !!i1409[57]
  i1408.hasOnRewind = !!i1409[58]
  i1408.onStart = request.d('UnityEngine.Events.UnityEvent', i1409[59], i1408.onStart)
  i1408.onPlay = request.d('UnityEngine.Events.UnityEvent', i1409[60], i1408.onPlay)
  i1408.onUpdate = request.d('UnityEngine.Events.UnityEvent', i1409[61], i1408.onUpdate)
  i1408.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i1409[62], i1408.onStepComplete)
  i1408.onComplete = request.d('UnityEngine.Events.UnityEvent', i1409[63], i1408.onComplete)
  i1408.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i1409[64], i1408.onTweenCreated)
  i1408.onRewind = request.d('UnityEngine.Events.UnityEvent', i1409[65], i1408.onRewind)
  return i1408
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i1410 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i1411 = data
  i1410.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1411[0], i1410.m_PersistentCalls)
  return i1410
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i1412 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i1413 = data
  var i1415 = i1413[0]
  var i1414 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i1415.length; i += 1) {
    i1414.add(request.d('UnityEngine.Events.PersistentCall', i1415[i + 0]));
  }
  i1412.m_Calls = i1414
  return i1412
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i1418 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i1419 = data
  request.r(i1419[0], i1419[1], 0, i1418, 'm_Target')
  i1418.m_TargetAssemblyTypeName = i1419[2]
  i1418.m_MethodName = i1419[3]
  i1418.m_Mode = i1419[4]
  i1418.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i1419[5], i1418.m_Arguments)
  i1418.m_CallState = i1419[6]
  return i1418
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i1420 = root || request.c( 'UnityEngine.UI.Image' )
  var i1421 = data
  request.r(i1421[0], i1421[1], 0, i1420, 'm_Sprite')
  i1420.m_Type = i1421[2]
  i1420.m_PreserveAspect = !!i1421[3]
  i1420.m_FillCenter = !!i1421[4]
  i1420.m_FillMethod = i1421[5]
  i1420.m_FillAmount = i1421[6]
  i1420.m_FillClockwise = !!i1421[7]
  i1420.m_FillOrigin = i1421[8]
  i1420.m_UseSpriteMesh = !!i1421[9]
  i1420.m_PixelsPerUnitMultiplier = i1421[10]
  request.r(i1421[11], i1421[12], 0, i1420, 'm_Material')
  i1420.m_Maskable = !!i1421[13]
  i1420.m_Color = new pc.Color(i1421[14], i1421[15], i1421[16], i1421[17])
  i1420.m_RaycastTarget = !!i1421[18]
  i1420.m_RaycastPadding = new pc.Vec4( i1421[19], i1421[20], i1421[21], i1421[22] )
  return i1420
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.UI.Button' )
  var i1423 = data
  i1422.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i1423[0], i1422.m_OnClick)
  i1422.m_Navigation = request.d('UnityEngine.UI.Navigation', i1423[1], i1422.m_Navigation)
  i1422.m_Transition = i1423[2]
  i1422.m_Colors = request.d('UnityEngine.UI.ColorBlock', i1423[3], i1422.m_Colors)
  i1422.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i1423[4], i1422.m_SpriteState)
  i1422.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i1423[5], i1422.m_AnimationTriggers)
  i1422.m_Interactable = !!i1423[6]
  request.r(i1423[7], i1423[8], 0, i1422, 'm_TargetGraphic')
  return i1422
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i1424 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i1425 = data
  i1424.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i1425[0], i1424.m_PersistentCalls)
  return i1424
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i1426 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i1427 = data
  i1426.m_Mode = i1427[0]
  i1426.m_WrapAround = !!i1427[1]
  request.r(i1427[2], i1427[3], 0, i1426, 'm_SelectOnUp')
  request.r(i1427[4], i1427[5], 0, i1426, 'm_SelectOnDown')
  request.r(i1427[6], i1427[7], 0, i1426, 'm_SelectOnLeft')
  request.r(i1427[8], i1427[9], 0, i1426, 'm_SelectOnRight')
  return i1426
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i1428 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i1429 = data
  i1428.m_NormalColor = new pc.Color(i1429[0], i1429[1], i1429[2], i1429[3])
  i1428.m_HighlightedColor = new pc.Color(i1429[4], i1429[5], i1429[6], i1429[7])
  i1428.m_PressedColor = new pc.Color(i1429[8], i1429[9], i1429[10], i1429[11])
  i1428.m_SelectedColor = new pc.Color(i1429[12], i1429[13], i1429[14], i1429[15])
  i1428.m_DisabledColor = new pc.Color(i1429[16], i1429[17], i1429[18], i1429[19])
  i1428.m_ColorMultiplier = i1429[20]
  i1428.m_FadeDuration = i1429[21]
  return i1428
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i1430 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i1431 = data
  request.r(i1431[0], i1431[1], 0, i1430, 'm_HighlightedSprite')
  request.r(i1431[2], i1431[3], 0, i1430, 'm_PressedSprite')
  request.r(i1431[4], i1431[5], 0, i1430, 'm_SelectedSprite')
  request.r(i1431[6], i1431[7], 0, i1430, 'm_DisabledSprite')
  return i1430
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i1433 = data
  i1432.m_NormalTrigger = i1433[0]
  i1432.m_HighlightedTrigger = i1433[1]
  i1432.m_PressedTrigger = i1433[2]
  i1432.m_SelectedTrigger = i1433[3]
  i1432.m_DisabledTrigger = i1433[4]
  return i1432
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i1434 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i1435 = data
  request.r(i1435[0], i1435[1], 0, i1434, 'clip')
  request.r(i1435[2], i1435[3], 0, i1434, 'outputAudioMixerGroup')
  i1434.playOnAwake = !!i1435[4]
  i1434.loop = !!i1435[5]
  i1434.time = i1435[6]
  i1434.volume = i1435[7]
  i1434.pitch = i1435[8]
  i1434.enabled = !!i1435[9]
  return i1434
}

Deserializers["PlayerController"] = function (request, data, root) {
  var i1436 = root || request.c( 'PlayerController' )
  var i1437 = data
  request.r(i1437[0], i1437[1], 0, i1436, 'shootBtn')
  request.r(i1437[2], i1437[3], 0, i1436, 'point1')
  request.r(i1437[4], i1437[5], 0, i1436, 'point2')
  i1436.maxRotateAngleX = i1437[6]
  i1436.maxRotateAngleY = i1437[7]
  i1436.rotateSpeed = i1437[8]
  request.r(i1437[9], i1437[10], 0, i1436, 'player')
  i1436.startAngle = new pc.Vec3( i1437[11], i1437[12], i1437[13] )
  request.r(i1437[14], i1437[15], 0, i1436, 'shootVFX')
  request.r(i1437[16], i1437[17], 0, i1436, 'bulletPrefab')
  i1436.bulletSpeed = i1437[18]
  request.r(i1437[19], i1437[20], 0, i1436, 'tut')
  request.r(i1437[21], i1437[22], 0, i1436, 'hitVFXPrefab')
  return i1436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1439 = data
  request.r(i1439[0], i1439[1], 0, i1438, 'sharedMesh')
  var i1441 = i1439[2]
  var i1440 = []
  for(var i = 0; i < i1441.length; i += 2) {
  request.r(i1441[i + 0], i1441[i + 1], 2, i1440, '')
  }
  i1438.bones = i1440
  i1438.updateWhenOffscreen = !!i1439[3]
  i1438.localBounds = i1439[4]
  request.r(i1439[5], i1439[6], 0, i1438, 'rootBone')
  var i1443 = i1439[7]
  var i1442 = []
  for(var i = 0; i < i1443.length; i += 1) {
    i1442.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1443[i + 0]) );
  }
  i1438.blendShapesWeights = i1442
  i1438.enabled = !!i1439[8]
  request.r(i1439[9], i1439[10], 0, i1438, 'sharedMaterial')
  var i1445 = i1439[11]
  var i1444 = []
  for(var i = 0; i < i1445.length; i += 2) {
  request.r(i1445[i + 0], i1445[i + 1], 2, i1444, '')
  }
  i1438.sharedMaterials = i1444
  i1438.receiveShadows = !!i1439[12]
  i1438.shadowCastingMode = i1439[13]
  i1438.sortingLayerID = i1439[14]
  i1438.sortingOrder = i1439[15]
  i1438.lightmapIndex = i1439[16]
  i1438.lightmapSceneIndex = i1439[17]
  i1438.lightmapScaleOffset = new pc.Vec4( i1439[18], i1439[19], i1439[20], i1439[21] )
  i1438.lightProbeUsage = i1439[22]
  i1438.reflectionProbeUsage = i1439[23]
  return i1438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1451 = data
  i1450.weight = i1451[0]
  return i1450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1453 = data
  i1452.aspect = i1453[0]
  i1452.orthographic = !!i1453[1]
  i1452.orthographicSize = i1453[2]
  i1452.backgroundColor = new pc.Color(i1453[3], i1453[4], i1453[5], i1453[6])
  i1452.nearClipPlane = i1453[7]
  i1452.farClipPlane = i1453[8]
  i1452.fieldOfView = i1453[9]
  i1452.depth = i1453[10]
  i1452.clearFlags = i1453[11]
  i1452.cullingMask = i1453[12]
  i1452.rect = i1453[13]
  request.r(i1453[14], i1453[15], 0, i1452, 'targetTexture')
  i1452.usePhysicalProperties = !!i1453[16]
  i1452.focalLength = i1453[17]
  i1452.sensorSize = new pc.Vec2( i1453[18], i1453[19] )
  i1452.lensShift = new pc.Vec2( i1453[20], i1453[21] )
  i1452.gateFit = i1453[22]
  i1452.commandBufferCount = i1453[23]
  i1452.cameraType = i1453[24]
  i1452.enabled = !!i1453[25]
  return i1452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1454 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1455 = data
  i1454.center = new pc.Vec3( i1455[0], i1455[1], i1455[2] )
  i1454.size = new pc.Vec3( i1455[3], i1455[4], i1455[5] )
  i1454.enabled = !!i1455[6]
  i1454.isTrigger = !!i1455[7]
  request.r(i1455[8], i1455[9], 0, i1454, 'material')
  return i1454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider2D"] = function (request, data, root) {
  var i1456 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider2D' )
  var i1457 = data
  i1456.usedByComposite = !!i1457[0]
  i1456.autoTiling = !!i1457[1]
  i1456.size = new pc.Vec2( i1457[2], i1457[3] )
  i1456.edgeRadius = i1457[4]
  i1456.enabled = !!i1457[5]
  i1456.isTrigger = !!i1457[6]
  i1456.usedByEffector = !!i1457[7]
  i1456.density = i1457[8]
  i1456.offset = new pc.Vec2( i1457[9], i1457[10] )
  request.r(i1457[11], i1457[12], 0, i1456, 'material')
  return i1456
}

Deserializers["GameController"] = function (request, data, root) {
  var i1458 = root || request.c( 'GameController' )
  var i1459 = data
  i1458.MaxShoot = i1459[0]
  i1458.OnEnd = request.d('System.Action', i1459[1], i1458.OnEnd)
  request.r(i1459[2], i1459[3], 0, i1458, 'currentShootText')
  request.r(i1459[4], i1459[5], 0, i1458, 'winScene')
  request.r(i1459[6], i1459[7], 0, i1458, 'lossScene')
  request.r(i1459[8], i1459[9], 0, i1458, 'camera0')
  request.r(i1459[10], i1459[11], 0, i1458, 'camera1')
  request.r(i1459[12], i1459[13], 0, i1458, 'mainCamera')
  request.r(i1459[14], i1459[15], 0, i1458, 'UI')
  request.r(i1459[16], i1459[17], 0, i1458, 'panel')
  return i1458
}

Deserializers["System.Action"] = function (request, data, root) {
  var i1460 = root || request.c( 'System.Action' )
  var i1461 = data
  return i1460
}

Deserializers["AudioController"] = function (request, data, root) {
  var i1462 = root || request.c( 'AudioController' )
  var i1463 = data
  request.r(i1463[0], i1463[1], 0, i1462, 'BGM')
  request.r(i1463[2], i1463[3], 0, i1462, 'musicSource')
  request.r(i1463[4], i1463[5], 0, i1462, 'shootSFX')
  request.r(i1463[6], i1463[7], 0, i1462, 'hitSFX')
  request.r(i1463[8], i1463[9], 0, i1462, 'pool')
  i1462.startSize = i1463[10]
  return i1462
}

Deserializers["LunaController"] = function (request, data, root) {
  var i1464 = root || request.c( 'LunaController' )
  var i1465 = data
  i1464.TimePlay = i1465[0]
  request.r(i1465[1], i1465[2], 0, i1464, 'endCard')
  return i1464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1467 = data
  i1466.ambientIntensity = i1467[0]
  i1466.reflectionIntensity = i1467[1]
  i1466.ambientMode = i1467[2]
  i1466.ambientLight = new pc.Color(i1467[3], i1467[4], i1467[5], i1467[6])
  i1466.ambientSkyColor = new pc.Color(i1467[7], i1467[8], i1467[9], i1467[10])
  i1466.ambientGroundColor = new pc.Color(i1467[11], i1467[12], i1467[13], i1467[14])
  i1466.ambientEquatorColor = new pc.Color(i1467[15], i1467[16], i1467[17], i1467[18])
  i1466.fogColor = new pc.Color(i1467[19], i1467[20], i1467[21], i1467[22])
  i1466.fogEndDistance = i1467[23]
  i1466.fogStartDistance = i1467[24]
  i1466.fogDensity = i1467[25]
  i1466.fog = !!i1467[26]
  request.r(i1467[27], i1467[28], 0, i1466, 'skybox')
  i1466.fogMode = i1467[29]
  var i1469 = i1467[30]
  var i1468 = []
  for(var i = 0; i < i1469.length; i += 1) {
    i1468.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1469[i + 0]) );
  }
  i1466.lightmaps = i1468
  i1466.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1467[31], i1466.lightProbes)
  i1466.lightmapsMode = i1467[32]
  i1466.mixedBakeMode = i1467[33]
  i1466.environmentLightingMode = i1467[34]
  i1466.ambientProbe = new pc.SphericalHarmonicsL2(i1467[35])
  request.r(i1467[36], i1467[37], 0, i1466, 'customReflection')
  request.r(i1467[38], i1467[39], 0, i1466, 'defaultReflection')
  i1466.defaultReflectionMode = i1467[40]
  i1466.defaultReflectionResolution = i1467[41]
  i1466.sunLightObjectId = i1467[42]
  i1466.pixelLightCount = i1467[43]
  i1466.defaultReflectionHDR = !!i1467[44]
  i1466.hasLightDataAsset = !!i1467[45]
  i1466.hasManualGenerate = !!i1467[46]
  return i1466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1473 = data
  request.r(i1473[0], i1473[1], 0, i1472, 'lightmapColor')
  request.r(i1473[2], i1473[3], 0, i1472, 'lightmapDirection')
  request.r(i1473[4], i1473[5], 0, i1472, 'shadowMask')
  return i1472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1474 = root || new UnityEngine.LightProbes()
  var i1475 = data
  return i1474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1483 = data
  var i1485 = i1483[0]
  var i1484 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1485.length; i += 1) {
    i1484.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1485[i + 0]));
  }
  i1482.ShaderCompilationErrors = i1484
  i1482.name = i1483[1]
  i1482.guid = i1483[2]
  var i1487 = i1483[3]
  var i1486 = []
  for(var i = 0; i < i1487.length; i += 1) {
    i1486.push( i1487[i + 0] );
  }
  i1482.shaderDefinedKeywords = i1486
  var i1489 = i1483[4]
  var i1488 = []
  for(var i = 0; i < i1489.length; i += 1) {
    i1488.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1489[i + 0]) );
  }
  i1482.passes = i1488
  var i1491 = i1483[5]
  var i1490 = []
  for(var i = 0; i < i1491.length; i += 1) {
    i1490.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1491[i + 0]) );
  }
  i1482.usePasses = i1490
  var i1493 = i1483[6]
  var i1492 = []
  for(var i = 0; i < i1493.length; i += 1) {
    i1492.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1493[i + 0]) );
  }
  i1482.defaultParameterValues = i1492
  request.r(i1483[7], i1483[8], 0, i1482, 'unityFallbackShader')
  i1482.readDepth = !!i1483[9]
  i1482.hasDepthOnlyPass = !!i1483[10]
  i1482.isCreatedByShaderGraph = !!i1483[11]
  i1482.disableBatching = !!i1483[12]
  i1482.compiled = !!i1483[13]
  return i1482
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1497 = data
  i1496.shaderName = i1497[0]
  i1496.errorMessage = i1497[1]
  return i1496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1502 = root || new pc.UnityShaderPass()
  var i1503 = data
  i1502.id = i1503[0]
  i1502.subShaderIndex = i1503[1]
  i1502.name = i1503[2]
  i1502.passType = i1503[3]
  i1502.grabPassTextureName = i1503[4]
  i1502.usePass = !!i1503[5]
  i1502.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[6], i1502.zTest)
  i1502.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[7], i1502.zWrite)
  i1502.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[8], i1502.culling)
  i1502.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1503[9], i1502.blending)
  i1502.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1503[10], i1502.alphaBlending)
  i1502.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[11], i1502.colorWriteMask)
  i1502.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[12], i1502.offsetUnits)
  i1502.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[13], i1502.offsetFactor)
  i1502.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[14], i1502.stencilRef)
  i1502.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[15], i1502.stencilReadMask)
  i1502.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1503[16], i1502.stencilWriteMask)
  i1502.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1503[17], i1502.stencilOp)
  i1502.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1503[18], i1502.stencilOpFront)
  i1502.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1503[19], i1502.stencilOpBack)
  var i1505 = i1503[20]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 1) {
    i1504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1505[i + 0]) );
  }
  i1502.tags = i1504
  var i1507 = i1503[21]
  var i1506 = []
  for(var i = 0; i < i1507.length; i += 1) {
    i1506.push( i1507[i + 0] );
  }
  i1502.passDefinedKeywords = i1506
  var i1509 = i1503[22]
  var i1508 = []
  for(var i = 0; i < i1509.length; i += 1) {
    i1508.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1509[i + 0]) );
  }
  i1502.passDefinedKeywordGroups = i1508
  var i1511 = i1503[23]
  var i1510 = []
  for(var i = 0; i < i1511.length; i += 1) {
    i1510.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1511[i + 0]) );
  }
  i1502.variants = i1510
  var i1513 = i1503[24]
  var i1512 = []
  for(var i = 0; i < i1513.length; i += 1) {
    i1512.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1513[i + 0]) );
  }
  i1502.excludedVariants = i1512
  i1502.hasDepthReader = !!i1503[25]
  return i1502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1515 = data
  i1514.val = i1515[0]
  i1514.name = i1515[1]
  return i1514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1517 = data
  i1516.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1517[0], i1516.src)
  i1516.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1517[1], i1516.dst)
  i1516.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1517[2], i1516.op)
  return i1516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1519 = data
  i1518.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1519[0], i1518.pass)
  i1518.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1519[1], i1518.fail)
  i1518.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1519[2], i1518.zFail)
  i1518.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1519[3], i1518.comp)
  return i1518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1523 = data
  i1522.name = i1523[0]
  i1522.value = i1523[1]
  return i1522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1526 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1527 = data
  var i1529 = i1527[0]
  var i1528 = []
  for(var i = 0; i < i1529.length; i += 1) {
    i1528.push( i1529[i + 0] );
  }
  i1526.keywords = i1528
  i1526.hasDiscard = !!i1527[1]
  return i1526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1533 = data
  i1532.passId = i1533[0]
  i1532.subShaderIndex = i1533[1]
  var i1535 = i1533[2]
  var i1534 = []
  for(var i = 0; i < i1535.length; i += 1) {
    i1534.push( i1535[i + 0] );
  }
  i1532.keywords = i1534
  i1532.vertexProgram = i1533[3]
  i1532.fragmentProgram = i1533[4]
  i1532.exportedForWebGl2 = !!i1533[5]
  i1532.readDepth = !!i1533[6]
  return i1532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1539 = data
  request.r(i1539[0], i1539[1], 0, i1538, 'shader')
  i1538.pass = i1539[2]
  return i1538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1543 = data
  i1542.name = i1543[0]
  i1542.type = i1543[1]
  i1542.value = new pc.Vec4( i1543[2], i1543[3], i1543[4], i1543[5] )
  i1542.textureValue = i1543[6]
  i1542.shaderPropertyFlag = i1543[7]
  return i1542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i1544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i1545 = data
  i1544.name = i1545[0]
  request.r(i1545[1], i1545[2], 0, i1544, 'texture')
  i1544.aabb = i1545[3]
  i1544.vertices = i1545[4]
  i1544.triangles = i1545[5]
  i1544.textureRect = UnityEngine.Rect.MinMaxRect(i1545[6], i1545[7], i1545[8], i1545[9])
  i1544.packedRect = UnityEngine.Rect.MinMaxRect(i1545[10], i1545[11], i1545[12], i1545[13])
  i1544.border = new pc.Vec4( i1545[14], i1545[15], i1545[16], i1545[17] )
  i1544.transparency = i1545[18]
  i1544.bounds = i1545[19]
  i1544.pixelsPerUnit = i1545[20]
  i1544.textureWidth = i1545[21]
  i1544.textureHeight = i1545[22]
  i1544.nativeSize = new pc.Vec2( i1545[23], i1545[24] )
  i1544.pivot = new pc.Vec2( i1545[25], i1545[26] )
  i1544.textureRectOffset = new pc.Vec2( i1545[27], i1545[28] )
  return i1544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1547 = data
  i1546.name = i1547[0]
  return i1546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1549 = data
  i1548.name = i1549[0]
  i1548.ascent = i1549[1]
  i1548.originalLineHeight = i1549[2]
  i1548.fontSize = i1549[3]
  var i1551 = i1549[4]
  var i1550 = []
  for(var i = 0; i < i1551.length; i += 1) {
    i1550.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1551[i + 0]) );
  }
  i1548.characterInfo = i1550
  request.r(i1549[5], i1549[6], 0, i1548, 'texture')
  i1548.originalFontSize = i1549[7]
  return i1548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1555 = data
  i1554.index = i1555[0]
  i1554.advance = i1555[1]
  i1554.bearing = i1555[2]
  i1554.glyphWidth = i1555[3]
  i1554.glyphHeight = i1555[4]
  i1554.minX = i1555[5]
  i1554.maxX = i1555[6]
  i1554.minY = i1555[7]
  i1554.maxY = i1555[8]
  i1554.uvBottomLeftX = i1555[9]
  i1554.uvBottomLeftY = i1555[10]
  i1554.uvBottomRightX = i1555[11]
  i1554.uvBottomRightY = i1555[12]
  i1554.uvTopLeftX = i1555[13]
  i1554.uvTopLeftY = i1555[14]
  i1554.uvTopRightX = i1555[15]
  i1554.uvTopRightY = i1555[16]
  return i1554
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i1556 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i1557 = data
  i1556.useSafeMode = !!i1557[0]
  i1556.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i1557[1], i1556.safeModeOptions)
  i1556.timeScale = i1557[2]
  i1556.unscaledTimeScale = i1557[3]
  i1556.useSmoothDeltaTime = !!i1557[4]
  i1556.maxSmoothUnscaledTime = i1557[5]
  i1556.rewindCallbackMode = i1557[6]
  i1556.showUnityEditorReport = !!i1557[7]
  i1556.logBehaviour = i1557[8]
  i1556.drawGizmos = !!i1557[9]
  i1556.defaultRecyclable = !!i1557[10]
  i1556.defaultAutoPlay = i1557[11]
  i1556.defaultUpdateType = i1557[12]
  i1556.defaultTimeScaleIndependent = !!i1557[13]
  i1556.defaultEaseType = i1557[14]
  i1556.defaultEaseOvershootOrAmplitude = i1557[15]
  i1556.defaultEasePeriod = i1557[16]
  i1556.defaultAutoKill = !!i1557[17]
  i1556.defaultLoopType = i1557[18]
  i1556.debugMode = !!i1557[19]
  i1556.debugStoreTargetId = !!i1557[20]
  i1556.showPreviewPanel = !!i1557[21]
  i1556.storeSettingsLocation = i1557[22]
  i1556.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i1557[23], i1556.modules)
  i1556.createASMDEF = !!i1557[24]
  i1556.showPlayingTweens = !!i1557[25]
  i1556.showPausedTweens = !!i1557[26]
  return i1556
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i1558 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i1559 = data
  i1558.logBehaviour = i1559[0]
  i1558.nestedTweenFailureBehaviour = i1559[1]
  return i1558
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i1560 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i1561 = data
  i1560.showPanel = !!i1561[0]
  i1560.audioEnabled = !!i1561[1]
  i1560.physicsEnabled = !!i1561[2]
  i1560.physics2DEnabled = !!i1561[3]
  i1560.spriteEnabled = !!i1561[4]
  i1560.uiEnabled = !!i1561[5]
  i1560.textMeshProEnabled = !!i1561[6]
  i1560.tk2DEnabled = !!i1561[7]
  i1560.deAudioEnabled = !!i1561[8]
  i1560.deUnityExtendedEnabled = !!i1561[9]
  i1560.epoOutlineEnabled = !!i1561[10]
  return i1560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1563 = data
  var i1565 = i1563[0]
  var i1564 = []
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1565[i + 0]) );
  }
  i1562.files = i1564
  i1562.componentToPrefabIds = i1563[1]
  return i1562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1569 = data
  i1568.path = i1569[0]
  request.r(i1569[1], i1569[2], 0, i1568, 'unityObject')
  return i1568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1571 = data
  var i1573 = i1571[0]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1573[i + 0]) );
  }
  i1570.scriptsExecutionOrder = i1572
  var i1575 = i1571[1]
  var i1574 = []
  for(var i = 0; i < i1575.length; i += 1) {
    i1574.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1575[i + 0]) );
  }
  i1570.sortingLayers = i1574
  var i1577 = i1571[2]
  var i1576 = []
  for(var i = 0; i < i1577.length; i += 1) {
    i1576.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1577[i + 0]) );
  }
  i1570.cullingLayers = i1576
  i1570.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1571[3], i1570.timeSettings)
  i1570.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1571[4], i1570.physicsSettings)
  i1570.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1571[5], i1570.physics2DSettings)
  i1570.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1571[6], i1570.qualitySettings)
  i1570.enableRealtimeShadows = !!i1571[7]
  i1570.enableAutoInstancing = !!i1571[8]
  i1570.enableStaticBatching = !!i1571[9]
  i1570.enableDynamicBatching = !!i1571[10]
  i1570.usePreservativeDynamicBatching = !!i1571[11]
  i1570.lightmapEncodingQuality = i1571[12]
  i1570.desiredColorSpace = i1571[13]
  var i1579 = i1571[14]
  var i1578 = []
  for(var i = 0; i < i1579.length; i += 1) {
    i1578.push( i1579[i + 0] );
  }
  i1570.allTags = i1578
  return i1570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1583 = data
  i1582.name = i1583[0]
  i1582.value = i1583[1]
  return i1582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1587 = data
  i1586.id = i1587[0]
  i1586.name = i1587[1]
  i1586.value = i1587[2]
  return i1586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1591 = data
  i1590.id = i1591[0]
  i1590.name = i1591[1]
  return i1590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1593 = data
  i1592.fixedDeltaTime = i1593[0]
  i1592.maximumDeltaTime = i1593[1]
  i1592.timeScale = i1593[2]
  i1592.maximumParticleTimestep = i1593[3]
  return i1592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1595 = data
  i1594.gravity = new pc.Vec3( i1595[0], i1595[1], i1595[2] )
  i1594.defaultSolverIterations = i1595[3]
  i1594.bounceThreshold = i1595[4]
  i1594.autoSyncTransforms = !!i1595[5]
  i1594.autoSimulation = !!i1595[6]
  var i1597 = i1595[7]
  var i1596 = []
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1597[i + 0]) );
  }
  i1594.collisionMatrix = i1596
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1601 = data
  i1600.enabled = !!i1601[0]
  i1600.layerId = i1601[1]
  i1600.otherLayerId = i1601[2]
  return i1600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1603 = data
  request.r(i1603[0], i1603[1], 0, i1602, 'material')
  i1602.gravity = new pc.Vec2( i1603[2], i1603[3] )
  i1602.positionIterations = i1603[4]
  i1602.velocityIterations = i1603[5]
  i1602.velocityThreshold = i1603[6]
  i1602.maxLinearCorrection = i1603[7]
  i1602.maxAngularCorrection = i1603[8]
  i1602.maxTranslationSpeed = i1603[9]
  i1602.maxRotationSpeed = i1603[10]
  i1602.baumgarteScale = i1603[11]
  i1602.baumgarteTOIScale = i1603[12]
  i1602.timeToSleep = i1603[13]
  i1602.linearSleepTolerance = i1603[14]
  i1602.angularSleepTolerance = i1603[15]
  i1602.defaultContactOffset = i1603[16]
  i1602.autoSimulation = !!i1603[17]
  i1602.queriesHitTriggers = !!i1603[18]
  i1602.queriesStartInColliders = !!i1603[19]
  i1602.callbacksOnDisable = !!i1603[20]
  i1602.reuseCollisionCallbacks = !!i1603[21]
  i1602.autoSyncTransforms = !!i1603[22]
  var i1605 = i1603[23]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1605[i + 0]) );
  }
  i1602.collisionMatrix = i1604
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1609 = data
  i1608.enabled = !!i1609[0]
  i1608.layerId = i1609[1]
  i1608.otherLayerId = i1609[2]
  return i1608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1610 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1611 = data
  var i1613 = i1611[0]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1613[i + 0]) );
  }
  i1610.qualityLevels = i1612
  var i1615 = i1611[1]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( i1615[i + 0] );
  }
  i1610.names = i1614
  i1610.shadows = i1611[2]
  i1610.anisotropicFiltering = i1611[3]
  i1610.antiAliasing = i1611[4]
  i1610.lodBias = i1611[5]
  i1610.shadowCascades = i1611[6]
  i1610.shadowDistance = i1611[7]
  i1610.shadowmaskMode = i1611[8]
  i1610.shadowProjection = i1611[9]
  i1610.shadowResolution = i1611[10]
  i1610.softParticles = !!i1611[11]
  i1610.softVegetation = !!i1611[12]
  i1610.activeColorSpace = i1611[13]
  i1610.desiredColorSpace = i1611[14]
  i1610.masterTextureLimit = i1611[15]
  i1610.maxQueuedFrames = i1611[16]
  i1610.particleRaycastBudget = i1611[17]
  i1610.pixelLightCount = i1611[18]
  i1610.realtimeReflectionProbes = !!i1611[19]
  i1610.shadowCascade2Split = i1611[20]
  i1610.shadowCascade4Split = new pc.Vec3( i1611[21], i1611[22], i1611[23] )
  i1610.streamingMipmapsActive = !!i1611[24]
  i1610.vSyncCount = i1611[25]
  i1610.asyncUploadBufferSize = i1611[26]
  i1610.asyncUploadTimeSlice = i1611[27]
  i1610.billboardsFaceCameraPosition = !!i1611[28]
  i1610.shadowNearPlaneOffset = i1611[29]
  i1610.streamingMipmapsMemoryBudget = i1611[30]
  i1610.maximumLODLevel = i1611[31]
  i1610.streamingMipmapsAddAllCameras = !!i1611[32]
  i1610.streamingMipmapsMaxLevelReduction = i1611[33]
  i1610.streamingMipmapsRenderersPerFrame = i1611[34]
  i1610.resolutionScalingFixedDPIFactor = i1611[35]
  i1610.streamingMipmapsMaxFileIORequests = i1611[36]
  i1610.currentQualityLevel = i1611[37]
  return i1610
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1621 = data
  i1620.weight = i1621[0]
  i1620.vertices = i1621[1]
  i1620.normals = i1621[2]
  i1620.tangents = i1621[3]
  return i1620
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i1622 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i1623 = data
  request.r(i1623[0], i1623[1], 0, i1622, 'm_ObjectArgument')
  i1622.m_ObjectArgumentAssemblyTypeName = i1623[2]
  i1622.m_IntArgument = i1623[3]
  i1622.m_FloatArgument = i1623[4]
  i1622.m_StringArgument = i1623[5]
  i1622.m_BoolArgument = !!i1623[6]
  return i1622
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystem":{"main":0,"colorBySpeed":1,"colorOverLifetime":2,"emission":3,"rotationBySpeed":4,"rotationOverLifetime":5,"shape":6,"sizeBySpeed":7,"sizeOverLifetime":8,"textureSheetAnimation":9,"velocityOverLifetime":10,"noise":11,"inheritVelocity":12,"forceOverLifetime":13,"limitVelocityOverLifetime":14,"useAutoRandomSeed":15,"randomSeed":16},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule":{"duration":0,"loop":1,"prewarm":2,"startDelay":3,"startLifetime":4,"startSpeed":5,"startSize3D":6,"startSizeX":7,"startSizeY":8,"startSizeZ":9,"startRotation3D":10,"startRotationX":11,"startRotationY":12,"startRotationZ":13,"startColor":14,"gravityModifier":15,"simulationSpace":16,"customSimulationSpace":17,"simulationSpeed":19,"useUnscaledTime":20,"scalingMode":21,"playOnAwake":22,"maxParticles":23,"emitterVelocityMode":24,"stopAction":25},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve":{"mode":0,"curveMin":1,"curveMax":2,"curveMultiplier":3,"constantMin":4,"constantMax":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient":{"mode":0,"gradientMin":1,"gradientMax":2,"colorMin":3,"colorMax":7},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient":{"mode":0,"colorKeys":1,"alphaKeys":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule":{"enabled":0,"color":1,"range":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey":{"color":0,"time":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey":{"alpha":0,"time":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule":{"enabled":0,"color":1},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule":{"enabled":0,"rateOverTime":1,"rateOverDistance":2,"bursts":3},"Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst":{"count":0,"cycleCount":1,"minCount":2,"maxCount":3,"repeatInterval":4,"time":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule":{"enabled":0,"shapeType":1,"randomDirectionAmount":2,"sphericalDirectionAmount":3,"randomPositionAmount":4,"alignToDirection":5,"radius":6,"radiusMode":7,"radiusSpread":8,"radiusSpeed":9,"radiusThickness":10,"angle":11,"length":12,"boxThickness":13,"meshShapeType":16,"mesh":17,"meshRenderer":19,"skinnedMeshRenderer":21,"useMeshMaterialIndex":23,"meshMaterialIndex":24,"useMeshColors":25,"normalOffset":26,"arc":27,"arcMode":28,"arcSpread":29,"arcSpeed":30,"donutRadius":31,"position":32,"rotation":35,"scale":38},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4,"range":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"separateAxes":4},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule":{"enabled":0,"mode":1,"animation":2,"numTilesX":3,"numTilesY":4,"useRandomRow":5,"frameOverTime":6,"startFrame":7,"cycleCount":8,"rowIndex":9,"flipU":10,"flipV":11,"spriteCount":12,"sprites":13},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"radial":4,"speedModifier":5,"space":6,"orbitalX":7,"orbitalY":8,"orbitalZ":9,"orbitalOffsetX":10,"orbitalOffsetY":11,"orbitalOffsetZ":12},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule":{"enabled":0,"separateAxes":1,"strengthX":2,"strengthY":3,"strengthZ":4,"frequency":5,"damping":6,"octaveCount":7,"octaveMultiplier":8,"octaveScale":9,"quality":10,"scrollSpeed":11,"scrollSpeedMultiplier":12,"remapEnabled":13,"remapX":14,"remapY":15,"remapZ":16,"positionAmount":17,"rotationAmount":18,"sizeAmount":19},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule":{"enabled":0,"mode":1,"curve":2},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule":{"enabled":0,"x":1,"y":2,"z":3,"space":4,"randomized":5},"Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule":{"enabled":0,"limit":1,"limitX":2,"limitY":3,"limitZ":4,"dampen":5,"separateAxes":6,"space":7,"drag":8,"multiplyDragByParticleSize":9,"multiplyDragByParticleVelocity":10},"Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer":{"mesh":0,"meshCount":2,"activeVertexStreamsCount":3,"alignment":4,"renderMode":5,"sortMode":6,"lengthScale":7,"velocityScale":8,"cameraVelocityScale":9,"normalDirection":10,"sortingFudge":11,"minParticleSize":12,"maxParticleSize":13,"pivot":14,"trailMaterial":17,"applyActiveColorSpace":19,"enabled":20,"sharedMaterial":21,"sharedMaterials":23,"receiveShadows":24,"shadowCastingMode":25,"sortingLayerID":26,"sortingOrder":27,"lightmapIndex":28,"lightmapSceneIndex":29,"lightmapScaleOffset":30,"lightProbeUsage":34,"reflectionProbeUsage":35},"Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer":{"color":0,"sprite":4,"flipX":6,"flipY":7,"drawMode":8,"size":9,"tileMode":11,"adaptiveModeThreshold":12,"maskInteraction":13,"spriteSortPoint":14,"enabled":15,"sharedMaterial":16,"sharedMaterials":18,"receiveShadows":19,"shadowCastingMode":20,"sortingLayerID":21,"sortingOrder":22,"lightmapIndex":23,"lightmapSceneIndex":24,"lightmapScaleOffset":25,"lightProbeUsage":29,"reflectionProbeUsage":30},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.Canvas":{"planeDistance":0,"referencePixelsPerUnit":1,"isFallbackOverlay":2,"renderMode":3,"renderOrder":4,"sortingLayerName":5,"sortingOrder":6,"scaleFactor":7,"worldCamera":8,"overrideSorting":10,"pixelPerfect":11,"targetDisplay":12,"overridePixelPerfect":13,"enabled":14},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.AudioSource":{"clip":0,"outputAudioMixerGroup":2,"playOnAwake":4,"loop":5,"time":6,"volume":7,"pitch":8,"enabled":9},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider2D":{"usedByComposite":0,"autoTiling":1,"size":2,"edgeRadius":4,"enabled":5,"isTrigger":6,"usedByEffector":7,"density":8,"offset":9,"material":11},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Textures.Sprite":{"name":0,"texture":1,"aabb":3,"vertices":4,"triangles":5,"textureRect":6,"packedRect":10,"border":14,"transparency":18,"bounds":19,"pixelsPerUnit":20,"textureWidth":21,"textureHeight":22,"nativeSize":23,"pivot":25,"textureRectOffset":27},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[31],"49":[32],"50":[51],"52":[51],"53":[51],"54":[51],"55":[51],"56":[51],"57":[58],"59":[58],"60":[58],"61":[58],"62":[58],"63":[58],"64":[58],"65":[58],"66":[58],"67":[58],"68":[58],"69":[58],"70":[58],"71":[32],"72":[7],"73":[74],"75":[74],"18":[17],"76":[17],"77":[21,17],"78":[7],"79":[21,17],"80":[17],"81":[17],"82":[7,17],"83":[17,21],"84":[85],"86":[85],"87":[85],"88":[17],"89":[17],"20":[18],"25":[21,17],"90":[17],"19":[18],"91":[17],"92":[17],"93":[17],"94":[17],"95":[17],"96":[17],"97":[17],"98":[17],"99":[17],"100":[21,17],"101":[17],"102":[17],"103":[17],"104":[17],"22":[21,17],"105":[17],"106":[14],"107":[14],"15":[14],"108":[14],"109":[32],"110":[32]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Texture2D","UnityEngine.Transform","UnityEngine.MonoBehaviour","BulletController","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.MeshRenderer","UnityEngine.Material","UnityEngine.ParticleSystem","UnityEngine.Sprite","UnityEngine.ParticleSystemRenderer","UnityEngine.SpriteRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.Light","UnityEngine.RectTransform","UnityEngine.Canvas","UnityEngine.UI.CanvasScaler","UnityEngine.UI.GraphicRaycaster","UnityEngine.CanvasRenderer","UnityEngine.UI.Text","UnityEngine.Font","DG.Tweening.DOTweenAnimation","UnityEngine.UI.Image","UnityEngine.UI.Button","UnityEngine.AudioSource","UnityEngine.AudioClip","PlayerController","UnityEngine.GameObject","UnityEngine.SkinnedMeshRenderer","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.BoxCollider","UnityEngine.BoxCollider2D","GameController","AudioController","LunaController","UnityEngine.Cubemap","DG.Tweening.Core.DOTweenSettings","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.TextMesh","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","Unity.VisualScripting.SceneVariables","Unity.VisualScripting.Variables","Unity.VisualScripting.ScriptMachine","Unity.VisualScripting.StateMachine","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.ScrollRect","UnityEngine.UI.Scrollbar","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.76f1";

Deserializers.productName = "UAC_Luna-UAC_V55";

Deserializers.lunaInitializationTime = "06/18/2026 04:09:08";

Deserializers.lunaDaysRunning = "4.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "UAC_V57_ThuLH_TamNTM";

Deserializers.lunaAppID = "29023";

Deserializers.projectId = "55e0f2d8a9b0f444abb8ceff2a81de0c";

Deserializers.packagesInfo = "com.unity.timeline: 1.8.12\ncom.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1794";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4115";

Deserializers.runtimeAnalysisExcludedModules = "mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "False";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "Android";

Deserializers.applicationIdentifier = "com.DefaultCompany.UAC_LunaUAC_V55";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = true;

Deserializers.buildID = "39e46d5b-90d4-43c7-bf69-afb6b2f9e932";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

