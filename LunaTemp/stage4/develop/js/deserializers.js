var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i406 = root || request.c( 'UnityEngine.JointSpring' )
  var i407 = data
  i406.spring = i407[0]
  i406.damper = i407[1]
  i406.targetPosition = i407[2]
  return i406
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i408 = root || request.c( 'UnityEngine.JointMotor' )
  var i409 = data
  i408.m_TargetVelocity = i409[0]
  i408.m_Force = i409[1]
  i408.m_FreeSpin = i409[2]
  return i408
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i410 = root || request.c( 'UnityEngine.JointLimits' )
  var i411 = data
  i410.m_Min = i411[0]
  i410.m_Max = i411[1]
  i410.m_Bounciness = i411[2]
  i410.m_BounceMinVelocity = i411[3]
  i410.m_ContactDistance = i411[4]
  i410.minBounce = i411[5]
  i410.maxBounce = i411[6]
  return i410
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i412 = root || request.c( 'UnityEngine.JointDrive' )
  var i413 = data
  i412.m_PositionSpring = i413[0]
  i412.m_PositionDamper = i413[1]
  i412.m_MaximumForce = i413[2]
  i412.m_UseAcceleration = i413[3]
  return i412
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i414 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i415 = data
  i414.m_Spring = i415[0]
  i414.m_Damper = i415[1]
  return i414
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i416 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i417 = data
  i416.m_Limit = i417[0]
  i416.m_Bounciness = i417[1]
  i416.m_ContactDistance = i417[2]
  return i416
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i418 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i419 = data
  i418.m_ExtremumSlip = i419[0]
  i418.m_ExtremumValue = i419[1]
  i418.m_AsymptoteSlip = i419[2]
  i418.m_AsymptoteValue = i419[3]
  i418.m_Stiffness = i419[4]
  return i418
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i420 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i421 = data
  i420.m_LowerAngle = i421[0]
  i420.m_UpperAngle = i421[1]
  return i420
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i422 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i423 = data
  i422.m_MotorSpeed = i423[0]
  i422.m_MaximumMotorTorque = i423[1]
  return i422
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i424 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i425 = data
  i424.m_DampingRatio = i425[0]
  i424.m_Frequency = i425[1]
  i424.m_Angle = i425[2]
  return i424
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i426 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i427 = data
  i426.m_LowerTranslation = i427[0]
  i426.m_UpperTranslation = i427[1]
  return i426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i429 = data
  i428.name = i429[0]
  i428.width = i429[1]
  i428.height = i429[2]
  i428.mipmapCount = i429[3]
  i428.anisoLevel = i429[4]
  i428.filterMode = i429[5]
  i428.hdr = !!i429[6]
  i428.format = i429[7]
  i428.wrapMode = i429[8]
  i428.alphaIsTransparency = !!i429[9]
  i428.alphaSource = i429[10]
  i428.graphicsFormat = i429[11]
  i428.sRGBTexture = !!i429[12]
  i428.desiredColorSpace = i429[13]
  i428.wrapU = i429[14]
  i428.wrapV = i429[15]
  return i428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i430 = root || new pc.UnityMaterial()
  var i431 = data
  i430.name = i431[0]
  request.r(i431[1], i431[2], 0, i430, 'shader')
  i430.renderQueue = i431[3]
  i430.enableInstancing = !!i431[4]
  var i433 = i431[5]
  var i432 = []
  for(var i = 0; i < i433.length; i += 1) {
    i432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i433[i + 0]) );
  }
  i430.floatParameters = i432
  var i435 = i431[6]
  var i434 = []
  for(var i = 0; i < i435.length; i += 1) {
    i434.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i435[i + 0]) );
  }
  i430.colorParameters = i434
  var i437 = i431[7]
  var i436 = []
  for(var i = 0; i < i437.length; i += 1) {
    i436.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i437[i + 0]) );
  }
  i430.vectorParameters = i436
  var i439 = i431[8]
  var i438 = []
  for(var i = 0; i < i439.length; i += 1) {
    i438.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i439[i + 0]) );
  }
  i430.textureParameters = i438
  var i441 = i431[9]
  var i440 = []
  for(var i = 0; i < i441.length; i += 1) {
    i440.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i441[i + 0]) );
  }
  i430.materialFlags = i440
  return i430
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i445 = data
  i444.name = i445[0]
  i444.value = i445[1]
  return i444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i449 = data
  i448.name = i449[0]
  i448.value = new pc.Color(i449[1], i449[2], i449[3], i449[4])
  return i448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i453 = data
  i452.name = i453[0]
  i452.value = new pc.Vec4( i453[1], i453[2], i453[3], i453[4] )
  return i452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i456 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i457 = data
  i456.name = i457[0]
  request.r(i457[1], i457[2], 0, i456, 'value')
  return i456
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i461 = data
  i460.name = i461[0]
  i460.enabled = !!i461[1]
  return i460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i463 = data
  i462.name = i463[0]
  i462.halfPrecision = !!i463[1]
  i462.useSimplification = !!i463[2]
  i462.useUInt32IndexFormat = !!i463[3]
  i462.vertexCount = i463[4]
  i462.aabb = i463[5]
  var i465 = i463[6]
  var i464 = []
  for(var i = 0; i < i465.length; i += 1) {
    i464.push( !!i465[i + 0] );
  }
  i462.streams = i464
  i462.vertices = i463[7]
  var i467 = i463[8]
  var i466 = []
  for(var i = 0; i < i467.length; i += 1) {
    i466.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i467[i + 0]) );
  }
  i462.subMeshes = i466
  var i469 = i463[9]
  var i468 = []
  for(var i = 0; i < i469.length; i += 16) {
    i468.push( new pc.Mat4().setData(i469[i + 0], i469[i + 1], i469[i + 2], i469[i + 3],  i469[i + 4], i469[i + 5], i469[i + 6], i469[i + 7],  i469[i + 8], i469[i + 9], i469[i + 10], i469[i + 11],  i469[i + 12], i469[i + 13], i469[i + 14], i469[i + 15]) );
  }
  i462.bindposes = i468
  var i471 = i463[10]
  var i470 = []
  for(var i = 0; i < i471.length; i += 1) {
    i470.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i471[i + 0]) );
  }
  i462.blendShapes = i470
  return i462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i477 = data
  i476.triangles = i477[0]
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i483 = data
  i482.name = i483[0]
  var i485 = i483[1]
  var i484 = []
  for(var i = 0; i < i485.length; i += 1) {
    i484.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i485[i + 0]) );
  }
  i482.frames = i484
  return i482
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i487 = data
  i486.position = new pc.Vec3( i487[0], i487[1], i487[2] )
  i486.scale = new pc.Vec3( i487[3], i487[4], i487[5] )
  i486.rotation = new pc.Quat(i487[6], i487[7], i487[8], i487[9])
  return i486
}

Deserializers["BulletController"] = function (request, data, root) {
  var i488 = root || request.c( 'BulletController' )
  var i489 = data
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i491 = data
  request.r(i491[0], i491[1], 0, i490, 'sharedMesh')
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i493 = data
  request.r(i493[0], i493[1], 0, i492, 'additionalVertexStreams')
  i492.enabled = !!i493[2]
  request.r(i493[3], i493[4], 0, i492, 'sharedMaterial')
  var i495 = i493[5]
  var i494 = []
  for(var i = 0; i < i495.length; i += 2) {
  request.r(i495[i + 0], i495[i + 1], 2, i494, '')
  }
  i492.sharedMaterials = i494
  i492.receiveShadows = !!i493[6]
  i492.shadowCastingMode = i493[7]
  i492.sortingLayerID = i493[8]
  i492.sortingOrder = i493[9]
  i492.lightmapIndex = i493[10]
  i492.lightmapSceneIndex = i493[11]
  i492.lightmapScaleOffset = new pc.Vec4( i493[12], i493[13], i493[14], i493[15] )
  i492.lightProbeUsage = i493[16]
  i492.reflectionProbeUsage = i493[17]
  return i492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i499 = data
  i498.name = i499[0]
  i498.tagId = i499[1]
  i498.enabled = !!i499[2]
  i498.isStatic = !!i499[3]
  i498.layer = i499[4]
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystem"] = function (request, data, root) {
  var i500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystem' )
  var i501 = data
  i500.main = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule', i501[0], i500.main)
  i500.colorBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule', i501[1], i500.colorBySpeed)
  i500.colorOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule', i501[2], i500.colorOverLifetime)
  i500.emission = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule', i501[3], i500.emission)
  i500.rotationBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule', i501[4], i500.rotationBySpeed)
  i500.rotationOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule', i501[5], i500.rotationOverLifetime)
  i500.shape = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule', i501[6], i500.shape)
  i500.sizeBySpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule', i501[7], i500.sizeBySpeed)
  i500.sizeOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule', i501[8], i500.sizeOverLifetime)
  i500.textureSheetAnimation = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule', i501[9], i500.textureSheetAnimation)
  i500.velocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule', i501[10], i500.velocityOverLifetime)
  i500.noise = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule', i501[11], i500.noise)
  i500.inheritVelocity = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule', i501[12], i500.inheritVelocity)
  i500.forceOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule', i501[13], i500.forceOverLifetime)
  i500.limitVelocityOverLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule', i501[14], i500.limitVelocityOverLifetime)
  i500.useAutoRandomSeed = !!i501[15]
  i500.randomSeed = i501[16]
  return i500
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.MainModule"] = function (request, data, root) {
  var i502 = root || new pc.ParticleSystemMain()
  var i503 = data
  i502.duration = i503[0]
  i502.loop = !!i503[1]
  i502.prewarm = !!i503[2]
  i502.startDelay = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[3], i502.startDelay)
  i502.startLifetime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[4], i502.startLifetime)
  i502.startSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[5], i502.startSpeed)
  i502.startSize3D = !!i503[6]
  i502.startSizeX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[7], i502.startSizeX)
  i502.startSizeY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[8], i502.startSizeY)
  i502.startSizeZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[9], i502.startSizeZ)
  i502.startRotation3D = !!i503[10]
  i502.startRotationX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[11], i502.startRotationX)
  i502.startRotationY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[12], i502.startRotationY)
  i502.startRotationZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[13], i502.startRotationZ)
  i502.startColor = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i503[14], i502.startColor)
  i502.gravityModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i503[15], i502.gravityModifier)
  i502.simulationSpace = i503[16]
  request.r(i503[17], i503[18], 0, i502, 'customSimulationSpace')
  i502.simulationSpeed = i503[19]
  i502.useUnscaledTime = !!i503[20]
  i502.scalingMode = i503[21]
  i502.playOnAwake = !!i503[22]
  i502.maxParticles = i503[23]
  i502.emitterVelocityMode = i503[24]
  i502.stopAction = i503[25]
  return i502
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve"] = function (request, data, root) {
  var i504 = root || new pc.MinMaxCurve()
  var i505 = data
  i504.mode = i505[0]
  i504.curveMin = new pc.AnimationCurve( { keys_flow: i505[1] } )
  i504.curveMax = new pc.AnimationCurve( { keys_flow: i505[2] } )
  i504.curveMultiplier = i505[3]
  i504.constantMin = i505[4]
  i504.constantMax = i505[5]
  return i504
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient"] = function (request, data, root) {
  var i506 = root || new pc.MinMaxGradient()
  var i507 = data
  i506.mode = i507[0]
  i506.gradientMin = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i507[1], i506.gradientMin)
  i506.gradientMax = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient', i507[2], i506.gradientMax)
  i506.colorMin = new pc.Color(i507[3], i507[4], i507[5], i507[6])
  i506.colorMax = new pc.Color(i507[7], i507[8], i507[9], i507[10])
  return i506
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient"] = function (request, data, root) {
  var i508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Gradient' )
  var i509 = data
  i508.mode = i509[0]
  var i511 = i509[1]
  var i510 = []
  for(var i = 0; i < i511.length; i += 1) {
    i510.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey', i511[i + 0]) );
  }
  i508.colorKeys = i510
  var i513 = i509[2]
  var i512 = []
  for(var i = 0; i < i513.length; i += 1) {
    i512.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey', i513[i + 0]) );
  }
  i508.alphaKeys = i512
  return i508
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorBySpeedModule"] = function (request, data, root) {
  var i514 = root || new pc.ParticleSystemColorBySpeed()
  var i515 = data
  i514.enabled = !!i515[0]
  i514.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i515[1], i514.color)
  i514.range = new pc.Vec2( i515[2], i515[3] )
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey"] = function (request, data, root) {
  var i518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientColorKey' )
  var i519 = data
  i518.color = new pc.Color(i519[0], i519[1], i519[2], i519[3])
  i518.time = i519[4]
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Data.GradientAlphaKey' )
  var i523 = data
  i522.alpha = i523[0]
  i522.time = i523[1]
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ColorOverLifetimeModule"] = function (request, data, root) {
  var i524 = root || new pc.ParticleSystemColorOverLifetime()
  var i525 = data
  i524.enabled = !!i525[0]
  i524.color = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxGradient', i525[1], i524.color)
  return i524
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.EmissionModule"] = function (request, data, root) {
  var i526 = root || new pc.ParticleSystemEmitter()
  var i527 = data
  i526.enabled = !!i527[0]
  i526.rateOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i527[1], i526.rateOverTime)
  i526.rateOverDistance = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i527[2], i526.rateOverDistance)
  var i529 = i527[3]
  var i528 = []
  for(var i = 0; i < i529.length; i += 1) {
    i528.push( request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst', i529[i + 0]) );
  }
  i526.bursts = i528
  return i526
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.Burst"] = function (request, data, root) {
  var i532 = root || new pc.ParticleSystemBurst()
  var i533 = data
  i532.count = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i533[0], i532.count)
  i532.cycleCount = i533[1]
  i532.minCount = i533[2]
  i532.maxCount = i533[3]
  i532.repeatInterval = i533[4]
  i532.time = i533[5]
  return i532
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationBySpeedModule"] = function (request, data, root) {
  var i534 = root || new pc.ParticleSystemRotationBySpeed()
  var i535 = data
  i534.enabled = !!i535[0]
  i534.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i535[1], i534.x)
  i534.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i535[2], i534.y)
  i534.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i535[3], i534.z)
  i534.separateAxes = !!i535[4]
  i534.range = new pc.Vec2( i535[5], i535[6] )
  return i534
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.RotationOverLifetimeModule"] = function (request, data, root) {
  var i536 = root || new pc.ParticleSystemRotationOverLifetime()
  var i537 = data
  i536.enabled = !!i537[0]
  i536.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i537[1], i536.x)
  i536.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i537[2], i536.y)
  i536.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i537[3], i536.z)
  i536.separateAxes = !!i537[4]
  return i536
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ShapeModule"] = function (request, data, root) {
  var i538 = root || new pc.ParticleSystemShape()
  var i539 = data
  i538.enabled = !!i539[0]
  i538.shapeType = i539[1]
  i538.randomDirectionAmount = i539[2]
  i538.sphericalDirectionAmount = i539[3]
  i538.randomPositionAmount = i539[4]
  i538.alignToDirection = !!i539[5]
  i538.radius = i539[6]
  i538.radiusMode = i539[7]
  i538.radiusSpread = i539[8]
  i538.radiusSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i539[9], i538.radiusSpeed)
  i538.radiusThickness = i539[10]
  i538.angle = i539[11]
  i538.length = i539[12]
  i538.boxThickness = new pc.Vec3( i539[13], i539[14], i539[15] )
  i538.meshShapeType = i539[16]
  request.r(i539[17], i539[18], 0, i538, 'mesh')
  request.r(i539[19], i539[20], 0, i538, 'meshRenderer')
  request.r(i539[21], i539[22], 0, i538, 'skinnedMeshRenderer')
  i538.useMeshMaterialIndex = !!i539[23]
  i538.meshMaterialIndex = i539[24]
  i538.useMeshColors = !!i539[25]
  i538.normalOffset = i539[26]
  i538.arc = i539[27]
  i538.arcMode = i539[28]
  i538.arcSpread = i539[29]
  i538.arcSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i539[30], i538.arcSpeed)
  i538.donutRadius = i539[31]
  i538.position = new pc.Vec3( i539[32], i539[33], i539[34] )
  i538.rotation = new pc.Vec3( i539[35], i539[36], i539[37] )
  i538.scale = new pc.Vec3( i539[38], i539[39], i539[40] )
  return i538
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeBySpeedModule"] = function (request, data, root) {
  var i540 = root || new pc.ParticleSystemSizeBySpeed()
  var i541 = data
  i540.enabled = !!i541[0]
  i540.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i541[1], i540.x)
  i540.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i541[2], i540.y)
  i540.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i541[3], i540.z)
  i540.separateAxes = !!i541[4]
  i540.range = new pc.Vec2( i541[5], i541[6] )
  return i540
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.SizeOverLifetimeModule"] = function (request, data, root) {
  var i542 = root || new pc.ParticleSystemSizeOverLifetime()
  var i543 = data
  i542.enabled = !!i543[0]
  i542.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i543[1], i542.x)
  i542.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i543[2], i542.y)
  i542.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i543[3], i542.z)
  i542.separateAxes = !!i543[4]
  return i542
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.TextureSheetAnimationModule"] = function (request, data, root) {
  var i544 = root || new pc.ParticleSystemTextureSheetAnimation()
  var i545 = data
  i544.enabled = !!i545[0]
  i544.mode = i545[1]
  i544.animation = i545[2]
  i544.numTilesX = i545[3]
  i544.numTilesY = i545[4]
  i544.useRandomRow = !!i545[5]
  i544.frameOverTime = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i545[6], i544.frameOverTime)
  i544.startFrame = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i545[7], i544.startFrame)
  i544.cycleCount = i545[8]
  i544.rowIndex = i545[9]
  i544.flipU = i545[10]
  i544.flipV = i545[11]
  i544.spriteCount = i545[12]
  var i547 = i545[13]
  var i546 = []
  for(var i = 0; i < i547.length; i += 2) {
  request.r(i547[i + 0], i547[i + 1], 2, i546, '')
  }
  i544.sprites = i546
  return i544
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.VelocityOverLifetimeModule"] = function (request, data, root) {
  var i550 = root || new pc.ParticleSystemVelocityOverLifetime()
  var i551 = data
  i550.enabled = !!i551[0]
  i550.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[1], i550.x)
  i550.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[2], i550.y)
  i550.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[3], i550.z)
  i550.radial = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[4], i550.radial)
  i550.speedModifier = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[5], i550.speedModifier)
  i550.space = i551[6]
  i550.orbitalX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[7], i550.orbitalX)
  i550.orbitalY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[8], i550.orbitalY)
  i550.orbitalZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[9], i550.orbitalZ)
  i550.orbitalOffsetX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[10], i550.orbitalOffsetX)
  i550.orbitalOffsetY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[11], i550.orbitalOffsetY)
  i550.orbitalOffsetZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i551[12], i550.orbitalOffsetZ)
  return i550
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.NoiseModule"] = function (request, data, root) {
  var i552 = root || new pc.ParticleSystemNoise()
  var i553 = data
  i552.enabled = !!i553[0]
  i552.separateAxes = !!i553[1]
  i552.strengthX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[2], i552.strengthX)
  i552.strengthY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[3], i552.strengthY)
  i552.strengthZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[4], i552.strengthZ)
  i552.frequency = i553[5]
  i552.damping = !!i553[6]
  i552.octaveCount = i553[7]
  i552.octaveMultiplier = i553[8]
  i552.octaveScale = i553[9]
  i552.quality = i553[10]
  i552.scrollSpeed = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[11], i552.scrollSpeed)
  i552.scrollSpeedMultiplier = i553[12]
  i552.remapEnabled = !!i553[13]
  i552.remapX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[14], i552.remapX)
  i552.remapY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[15], i552.remapY)
  i552.remapZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[16], i552.remapZ)
  i552.positionAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[17], i552.positionAmount)
  i552.rotationAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[18], i552.rotationAmount)
  i552.sizeAmount = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i553[19], i552.sizeAmount)
  return i552
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.InheritVelocityModule"] = function (request, data, root) {
  var i554 = root || new pc.ParticleSystemInheritVelocity()
  var i555 = data
  i554.enabled = !!i555[0]
  i554.mode = i555[1]
  i554.curve = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i555[2], i554.curve)
  return i554
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.ForceOverLifetimeModule"] = function (request, data, root) {
  var i556 = root || new pc.ParticleSystemForceOverLifetime()
  var i557 = data
  i556.enabled = !!i557[0]
  i556.x = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i557[1], i556.x)
  i556.y = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i557[2], i556.y)
  i556.z = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i557[3], i556.z)
  i556.space = i557[4]
  i556.randomized = !!i557[5]
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.ParticleSystemModules.LimitVelocityOverLifetimeModule"] = function (request, data, root) {
  var i558 = root || new pc.ParticleSystemLimitVelocityOverLifetime()
  var i559 = data
  i558.enabled = !!i559[0]
  i558.limit = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i559[1], i558.limit)
  i558.limitX = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i559[2], i558.limitX)
  i558.limitY = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i559[3], i558.limitY)
  i558.limitZ = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i559[4], i558.limitZ)
  i558.dampen = i559[5]
  i558.separateAxes = !!i559[6]
  i558.space = i559[7]
  i558.drag = request.d('Luna.Unity.DTO.UnityEngine.ParticleSystemTypes.MinMaxCurve', i559[8], i558.drag)
  i558.multiplyDragByParticleSize = !!i559[9]
  i558.multiplyDragByParticleVelocity = !!i559[10]
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer"] = function (request, data, root) {
  var i560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.ParticleSystemRenderer' )
  var i561 = data
  request.r(i561[0], i561[1], 0, i560, 'mesh')
  i560.meshCount = i561[2]
  i560.activeVertexStreamsCount = i561[3]
  i560.alignment = i561[4]
  i560.renderMode = i561[5]
  i560.sortMode = i561[6]
  i560.lengthScale = i561[7]
  i560.velocityScale = i561[8]
  i560.cameraVelocityScale = i561[9]
  i560.normalDirection = i561[10]
  i560.sortingFudge = i561[11]
  i560.minParticleSize = i561[12]
  i560.maxParticleSize = i561[13]
  i560.pivot = new pc.Vec3( i561[14], i561[15], i561[16] )
  request.r(i561[17], i561[18], 0, i560, 'trailMaterial')
  i560.applyActiveColorSpace = !!i561[19]
  i560.enabled = !!i561[20]
  request.r(i561[21], i561[22], 0, i560, 'sharedMaterial')
  var i563 = i561[23]
  var i562 = []
  for(var i = 0; i < i563.length; i += 2) {
  request.r(i563[i + 0], i563[i + 1], 2, i562, '')
  }
  i560.sharedMaterials = i562
  i560.receiveShadows = !!i561[24]
  i560.shadowCastingMode = i561[25]
  i560.sortingLayerID = i561[26]
  i560.sortingOrder = i561[27]
  i560.lightmapIndex = i561[28]
  i560.lightmapSceneIndex = i561[29]
  i560.lightmapScaleOffset = new pc.Vec4( i561[30], i561[31], i561[32], i561[33] )
  i560.lightProbeUsage = i561[34]
  i560.reflectionProbeUsage = i561[35]
  return i560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SpriteRenderer' )
  var i565 = data
  i564.color = new pc.Color(i565[0], i565[1], i565[2], i565[3])
  request.r(i565[4], i565[5], 0, i564, 'sprite')
  i564.flipX = !!i565[6]
  i564.flipY = !!i565[7]
  i564.drawMode = i565[8]
  i564.size = new pc.Vec2( i565[9], i565[10] )
  i564.tileMode = i565[11]
  i564.adaptiveModeThreshold = i565[12]
  i564.maskInteraction = i565[13]
  i564.spriteSortPoint = i565[14]
  i564.enabled = !!i565[15]
  request.r(i565[16], i565[17], 0, i564, 'sharedMaterial')
  var i567 = i565[18]
  var i566 = []
  for(var i = 0; i < i567.length; i += 2) {
  request.r(i567[i + 0], i567[i + 1], 2, i566, '')
  }
  i564.sharedMaterials = i566
  i564.receiveShadows = !!i565[19]
  i564.shadowCastingMode = i565[20]
  i564.sortingLayerID = i565[21]
  i564.sortingOrder = i565[22]
  i564.lightmapIndex = i565[23]
  i564.lightmapSceneIndex = i565[24]
  i564.lightmapScaleOffset = new pc.Vec4( i565[25], i565[26], i565[27], i565[28] )
  i564.lightProbeUsage = i565[29]
  i564.reflectionProbeUsage = i565[30]
  return i564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i569 = data
  i568.name = i569[0]
  i568.atlasId = i569[1]
  i568.mipmapCount = i569[2]
  i568.hdr = !!i569[3]
  i568.size = i569[4]
  i568.anisoLevel = i569[5]
  i568.filterMode = i569[6]
  var i571 = i569[7]
  var i570 = []
  for(var i = 0; i < i571.length; i += 4) {
    i570.push( UnityEngine.Rect.MinMaxRect(i571[i + 0], i571[i + 1], i571[i + 2], i571[i + 3]) );
  }
  i568.rects = i570
  i568.wrapU = i569[8]
  i568.wrapV = i569[9]
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i575 = data
  i574.name = i575[0]
  i574.index = i575[1]
  i574.startup = !!i575[2]
  return i574
}

Deserializers["UnityEngine.EventSystems.EventSystem"] = function (request, data, root) {
  var i576 = root || request.c( 'UnityEngine.EventSystems.EventSystem' )
  var i577 = data
  request.r(i577[0], i577[1], 0, i576, 'm_FirstSelected')
  i576.m_sendNavigationEvents = !!i577[2]
  i576.m_DragThreshold = i577[3]
  return i576
}

Deserializers["UnityEngine.EventSystems.StandaloneInputModule"] = function (request, data, root) {
  var i578 = root || request.c( 'UnityEngine.EventSystems.StandaloneInputModule' )
  var i579 = data
  i578.m_HorizontalAxis = i579[0]
  i578.m_VerticalAxis = i579[1]
  i578.m_SubmitButton = i579[2]
  i578.m_CancelButton = i579[3]
  i578.m_InputActionsPerSecond = i579[4]
  i578.m_RepeatDelay = i579[5]
  i578.m_ForceModuleActive = !!i579[6]
  i578.m_SendPointerHoverToParent = !!i579[7]
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i581 = data
  i580.type = i581[0]
  i580.color = new pc.Color(i581[1], i581[2], i581[3], i581[4])
  i580.cullingMask = i581[5]
  i580.intensity = i581[6]
  i580.range = i581[7]
  i580.spotAngle = i581[8]
  i580.shadows = i581[9]
  i580.shadowNormalBias = i581[10]
  i580.shadowBias = i581[11]
  i580.shadowStrength = i581[12]
  i580.shadowResolution = i581[13]
  i580.lightmapBakeType = i581[14]
  i580.renderMode = i581[15]
  request.r(i581[16], i581[17], 0, i580, 'cookie')
  i580.cookieSize = i581[18]
  i580.shadowNearPlane = i581[19]
  i580.occlusionMaskChannel = i581[20]
  i580.isBaked = !!i581[21]
  i580.mixedLightingMode = i581[22]
  i580.enabled = !!i581[23]
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i583 = data
  i582.pivot = new pc.Vec2( i583[0], i583[1] )
  i582.anchorMin = new pc.Vec2( i583[2], i583[3] )
  i582.anchorMax = new pc.Vec2( i583[4], i583[5] )
  i582.sizeDelta = new pc.Vec2( i583[6], i583[7] )
  i582.anchoredPosition3D = new pc.Vec3( i583[8], i583[9], i583[10] )
  i582.rotation = new pc.Quat(i583[11], i583[12], i583[13], i583[14])
  i582.scale = new pc.Vec3( i583[15], i583[16], i583[17] )
  return i582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Canvas"] = function (request, data, root) {
  var i584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Canvas' )
  var i585 = data
  i584.planeDistance = i585[0]
  i584.referencePixelsPerUnit = i585[1]
  i584.isFallbackOverlay = !!i585[2]
  i584.renderMode = i585[3]
  i584.renderOrder = i585[4]
  i584.sortingLayerName = i585[5]
  i584.sortingOrder = i585[6]
  i584.scaleFactor = i585[7]
  request.r(i585[8], i585[9], 0, i584, 'worldCamera')
  i584.overrideSorting = !!i585[10]
  i584.pixelPerfect = !!i585[11]
  i584.targetDisplay = i585[12]
  i584.overridePixelPerfect = !!i585[13]
  i584.enabled = !!i585[14]
  return i584
}

Deserializers["UnityEngine.UI.CanvasScaler"] = function (request, data, root) {
  var i586 = root || request.c( 'UnityEngine.UI.CanvasScaler' )
  var i587 = data
  i586.m_UiScaleMode = i587[0]
  i586.m_ReferencePixelsPerUnit = i587[1]
  i586.m_ScaleFactor = i587[2]
  i586.m_ReferenceResolution = new pc.Vec2( i587[3], i587[4] )
  i586.m_ScreenMatchMode = i587[5]
  i586.m_MatchWidthOrHeight = i587[6]
  i586.m_PhysicalUnit = i587[7]
  i586.m_FallbackScreenDPI = i587[8]
  i586.m_DefaultSpriteDPI = i587[9]
  i586.m_DynamicPixelsPerUnit = i587[10]
  i586.m_PresetInfoIsWorld = !!i587[11]
  return i586
}

Deserializers["UnityEngine.UI.GraphicRaycaster"] = function (request, data, root) {
  var i588 = root || request.c( 'UnityEngine.UI.GraphicRaycaster' )
  var i589 = data
  i588.m_IgnoreReversedGraphics = !!i589[0]
  i588.m_BlockingObjects = i589[1]
  i588.m_BlockingMask = UnityEngine.LayerMask.FromIntegerValue( i589[2] )
  return i588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i591 = data
  i590.cullTransparentMesh = !!i591[0]
  return i590
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i592 = root || request.c( 'UnityEngine.UI.Text' )
  var i593 = data
  i592.m_FontData = request.d('UnityEngine.UI.FontData', i593[0], i592.m_FontData)
  i592.m_Text = i593[1]
  request.r(i593[2], i593[3], 0, i592, 'm_Material')
  i592.m_Maskable = !!i593[4]
  i592.m_Color = new pc.Color(i593[5], i593[6], i593[7], i593[8])
  i592.m_RaycastTarget = !!i593[9]
  i592.m_RaycastPadding = new pc.Vec4( i593[10], i593[11], i593[12], i593[13] )
  return i592
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i594 = root || request.c( 'UnityEngine.UI.FontData' )
  var i595 = data
  request.r(i595[0], i595[1], 0, i594, 'm_Font')
  i594.m_FontSize = i595[2]
  i594.m_FontStyle = i595[3]
  i594.m_BestFit = !!i595[4]
  i594.m_MinSize = i595[5]
  i594.m_MaxSize = i595[6]
  i594.m_Alignment = i595[7]
  i594.m_AlignByGeometry = !!i595[8]
  i594.m_RichText = !!i595[9]
  i594.m_HorizontalOverflow = i595[10]
  i594.m_VerticalOverflow = i595[11]
  i594.m_LineSpacing = i595[12]
  return i594
}

Deserializers["DG.Tweening.DOTweenAnimation"] = function (request, data, root) {
  var i596 = root || request.c( 'DG.Tweening.DOTweenAnimation' )
  var i597 = data
  i596.targetIsSelf = !!i597[0]
  request.r(i597[1], i597[2], 0, i596, 'targetGO')
  i596.tweenTargetIsTargetGO = !!i597[3]
  i596.delay = i597[4]
  i596.duration = i597[5]
  i596.easeType = i597[6]
  i596.easeCurve = new pc.AnimationCurve( { keys_flow: i597[7] } )
  i596.loopType = i597[8]
  i596.loops = i597[9]
  i596.id = i597[10]
  i596.isRelative = !!i597[11]
  i596.isFrom = !!i597[12]
  i596.isIndependentUpdate = !!i597[13]
  i596.autoKill = !!i597[14]
  i596.autoGenerate = !!i597[15]
  i596.isActive = !!i597[16]
  i596.isValid = !!i597[17]
  request.r(i597[18], i597[19], 0, i596, 'target')
  i596.animationType = i597[20]
  i596.targetType = i597[21]
  i596.forcedTargetType = i597[22]
  i596.autoPlay = !!i597[23]
  i596.useTargetAsV3 = !!i597[24]
  i596.endValueFloat = i597[25]
  i596.endValueV3 = new pc.Vec3( i597[26], i597[27], i597[28] )
  i596.endValueV2 = new pc.Vec2( i597[29], i597[30] )
  i596.endValueColor = new pc.Color(i597[31], i597[32], i597[33], i597[34])
  i596.endValueString = i597[35]
  i596.endValueRect = UnityEngine.Rect.MinMaxRect(i597[36], i597[37], i597[38], i597[39])
  request.r(i597[40], i597[41], 0, i596, 'endValueTransform')
  i596.optionalBool0 = !!i597[42]
  i596.optionalBool1 = !!i597[43]
  i596.optionalFloat0 = i597[44]
  i596.optionalInt0 = i597[45]
  i596.optionalRotationMode = i597[46]
  i596.optionalScrambleMode = i597[47]
  i596.optionalShakeRandomnessMode = i597[48]
  i596.optionalString = i597[49]
  i596.updateType = i597[50]
  i596.isSpeedBased = !!i597[51]
  i596.hasOnStart = !!i597[52]
  i596.hasOnPlay = !!i597[53]
  i596.hasOnUpdate = !!i597[54]
  i596.hasOnStepComplete = !!i597[55]
  i596.hasOnComplete = !!i597[56]
  i596.hasOnTweenCreated = !!i597[57]
  i596.hasOnRewind = !!i597[58]
  i596.onStart = request.d('UnityEngine.Events.UnityEvent', i597[59], i596.onStart)
  i596.onPlay = request.d('UnityEngine.Events.UnityEvent', i597[60], i596.onPlay)
  i596.onUpdate = request.d('UnityEngine.Events.UnityEvent', i597[61], i596.onUpdate)
  i596.onStepComplete = request.d('UnityEngine.Events.UnityEvent', i597[62], i596.onStepComplete)
  i596.onComplete = request.d('UnityEngine.Events.UnityEvent', i597[63], i596.onComplete)
  i596.onTweenCreated = request.d('UnityEngine.Events.UnityEvent', i597[64], i596.onTweenCreated)
  i596.onRewind = request.d('UnityEngine.Events.UnityEvent', i597[65], i596.onRewind)
  return i596
}

Deserializers["UnityEngine.Events.UnityEvent"] = function (request, data, root) {
  var i598 = root || request.c( 'UnityEngine.Events.UnityEvent' )
  var i599 = data
  i598.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i599[0], i598.m_PersistentCalls)
  return i598
}

Deserializers["UnityEngine.Events.PersistentCallGroup"] = function (request, data, root) {
  var i600 = root || request.c( 'UnityEngine.Events.PersistentCallGroup' )
  var i601 = data
  var i603 = i601[0]
  var i602 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.Events.PersistentCall')))
  for(var i = 0; i < i603.length; i += 1) {
    i602.add(request.d('UnityEngine.Events.PersistentCall', i603[i + 0]));
  }
  i600.m_Calls = i602
  return i600
}

Deserializers["UnityEngine.Events.PersistentCall"] = function (request, data, root) {
  var i606 = root || request.c( 'UnityEngine.Events.PersistentCall' )
  var i607 = data
  request.r(i607[0], i607[1], 0, i606, 'm_Target')
  i606.m_TargetAssemblyTypeName = i607[2]
  i606.m_MethodName = i607[3]
  i606.m_Mode = i607[4]
  i606.m_Arguments = request.d('UnityEngine.Events.ArgumentCache', i607[5], i606.m_Arguments)
  i606.m_CallState = i607[6]
  return i606
}

Deserializers["UnityEngine.UI.Image"] = function (request, data, root) {
  var i608 = root || request.c( 'UnityEngine.UI.Image' )
  var i609 = data
  request.r(i609[0], i609[1], 0, i608, 'm_Sprite')
  i608.m_Type = i609[2]
  i608.m_PreserveAspect = !!i609[3]
  i608.m_FillCenter = !!i609[4]
  i608.m_FillMethod = i609[5]
  i608.m_FillAmount = i609[6]
  i608.m_FillClockwise = !!i609[7]
  i608.m_FillOrigin = i609[8]
  i608.m_UseSpriteMesh = !!i609[9]
  i608.m_PixelsPerUnitMultiplier = i609[10]
  request.r(i609[11], i609[12], 0, i608, 'm_Material')
  i608.m_Maskable = !!i609[13]
  i608.m_Color = new pc.Color(i609[14], i609[15], i609[16], i609[17])
  i608.m_RaycastTarget = !!i609[18]
  i608.m_RaycastPadding = new pc.Vec4( i609[19], i609[20], i609[21], i609[22] )
  return i608
}

Deserializers["UnityEngine.UI.Button"] = function (request, data, root) {
  var i610 = root || request.c( 'UnityEngine.UI.Button' )
  var i611 = data
  i610.m_OnClick = request.d('UnityEngine.UI.Button+ButtonClickedEvent', i611[0], i610.m_OnClick)
  i610.m_Navigation = request.d('UnityEngine.UI.Navigation', i611[1], i610.m_Navigation)
  i610.m_Transition = i611[2]
  i610.m_Colors = request.d('UnityEngine.UI.ColorBlock', i611[3], i610.m_Colors)
  i610.m_SpriteState = request.d('UnityEngine.UI.SpriteState', i611[4], i610.m_SpriteState)
  i610.m_AnimationTriggers = request.d('UnityEngine.UI.AnimationTriggers', i611[5], i610.m_AnimationTriggers)
  i610.m_Interactable = !!i611[6]
  request.r(i611[7], i611[8], 0, i610, 'm_TargetGraphic')
  return i610
}

Deserializers["UnityEngine.UI.Button+ButtonClickedEvent"] = function (request, data, root) {
  var i612 = root || request.c( 'UnityEngine.UI.Button+ButtonClickedEvent' )
  var i613 = data
  i612.m_PersistentCalls = request.d('UnityEngine.Events.PersistentCallGroup', i613[0], i612.m_PersistentCalls)
  return i612
}

Deserializers["UnityEngine.UI.Navigation"] = function (request, data, root) {
  var i614 = root || request.c( 'UnityEngine.UI.Navigation' )
  var i615 = data
  i614.m_Mode = i615[0]
  i614.m_WrapAround = !!i615[1]
  request.r(i615[2], i615[3], 0, i614, 'm_SelectOnUp')
  request.r(i615[4], i615[5], 0, i614, 'm_SelectOnDown')
  request.r(i615[6], i615[7], 0, i614, 'm_SelectOnLeft')
  request.r(i615[8], i615[9], 0, i614, 'm_SelectOnRight')
  return i614
}

Deserializers["UnityEngine.UI.ColorBlock"] = function (request, data, root) {
  var i616 = root || request.c( 'UnityEngine.UI.ColorBlock' )
  var i617 = data
  i616.m_NormalColor = new pc.Color(i617[0], i617[1], i617[2], i617[3])
  i616.m_HighlightedColor = new pc.Color(i617[4], i617[5], i617[6], i617[7])
  i616.m_PressedColor = new pc.Color(i617[8], i617[9], i617[10], i617[11])
  i616.m_SelectedColor = new pc.Color(i617[12], i617[13], i617[14], i617[15])
  i616.m_DisabledColor = new pc.Color(i617[16], i617[17], i617[18], i617[19])
  i616.m_ColorMultiplier = i617[20]
  i616.m_FadeDuration = i617[21]
  return i616
}

Deserializers["UnityEngine.UI.SpriteState"] = function (request, data, root) {
  var i618 = root || request.c( 'UnityEngine.UI.SpriteState' )
  var i619 = data
  request.r(i619[0], i619[1], 0, i618, 'm_HighlightedSprite')
  request.r(i619[2], i619[3], 0, i618, 'm_PressedSprite')
  request.r(i619[4], i619[5], 0, i618, 'm_SelectedSprite')
  request.r(i619[6], i619[7], 0, i618, 'm_DisabledSprite')
  return i618
}

Deserializers["UnityEngine.UI.AnimationTriggers"] = function (request, data, root) {
  var i620 = root || request.c( 'UnityEngine.UI.AnimationTriggers' )
  var i621 = data
  i620.m_NormalTrigger = i621[0]
  i620.m_HighlightedTrigger = i621[1]
  i620.m_PressedTrigger = i621[2]
  i620.m_SelectedTrigger = i621[3]
  i620.m_DisabledTrigger = i621[4]
  return i620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.AudioSource"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.AudioSource' )
  var i623 = data
  request.r(i623[0], i623[1], 0, i622, 'clip')
  request.r(i623[2], i623[3], 0, i622, 'outputAudioMixerGroup')
  i622.playOnAwake = !!i623[4]
  i622.loop = !!i623[5]
  i622.time = i623[6]
  i622.volume = i623[7]
  i622.pitch = i623[8]
  i622.enabled = !!i623[9]
  return i622
}

Deserializers["PlayerController"] = function (request, data, root) {
  var i624 = root || request.c( 'PlayerController' )
  var i625 = data
  request.r(i625[0], i625[1], 0, i624, 'shootBtn')
  request.r(i625[2], i625[3], 0, i624, 'point1')
  request.r(i625[4], i625[5], 0, i624, 'point2')
  i624.maxRotateAngleX = i625[6]
  i624.maxRotateAngleY = i625[7]
  i624.rotateSpeed = i625[8]
  request.r(i625[9], i625[10], 0, i624, 'player')
  i624.startAngle = new pc.Vec3( i625[11], i625[12], i625[13] )
  request.r(i625[14], i625[15], 0, i624, 'shootVFX')
  request.r(i625[16], i625[17], 0, i624, 'bulletPrefab')
  i624.bulletSpeed = i625[18]
  request.r(i625[19], i625[20], 0, i624, 'tut')
  request.r(i625[21], i625[22], 0, i624, 'hitVFXPrefab')
  return i624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i627 = data
  request.r(i627[0], i627[1], 0, i626, 'sharedMesh')
  var i629 = i627[2]
  var i628 = []
  for(var i = 0; i < i629.length; i += 2) {
  request.r(i629[i + 0], i629[i + 1], 2, i628, '')
  }
  i626.bones = i628
  i626.updateWhenOffscreen = !!i627[3]
  i626.localBounds = i627[4]
  request.r(i627[5], i627[6], 0, i626, 'rootBone')
  var i631 = i627[7]
  var i630 = []
  for(var i = 0; i < i631.length; i += 1) {
    i630.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i631[i + 0]) );
  }
  i626.blendShapesWeights = i630
  i626.enabled = !!i627[8]
  request.r(i627[9], i627[10], 0, i626, 'sharedMaterial')
  var i633 = i627[11]
  var i632 = []
  for(var i = 0; i < i633.length; i += 2) {
  request.r(i633[i + 0], i633[i + 1], 2, i632, '')
  }
  i626.sharedMaterials = i632
  i626.receiveShadows = !!i627[12]
  i626.shadowCastingMode = i627[13]
  i626.sortingLayerID = i627[14]
  i626.sortingOrder = i627[15]
  i626.lightmapIndex = i627[16]
  i626.lightmapSceneIndex = i627[17]
  i626.lightmapScaleOffset = new pc.Vec4( i627[18], i627[19], i627[20], i627[21] )
  i626.lightProbeUsage = i627[22]
  i626.reflectionProbeUsage = i627[23]
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i639 = data
  i638.weight = i639[0]
  return i638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i641 = data
  i640.aspect = i641[0]
  i640.orthographic = !!i641[1]
  i640.orthographicSize = i641[2]
  i640.backgroundColor = new pc.Color(i641[3], i641[4], i641[5], i641[6])
  i640.nearClipPlane = i641[7]
  i640.farClipPlane = i641[8]
  i640.fieldOfView = i641[9]
  i640.depth = i641[10]
  i640.clearFlags = i641[11]
  i640.cullingMask = i641[12]
  i640.rect = i641[13]
  request.r(i641[14], i641[15], 0, i640, 'targetTexture')
  i640.usePhysicalProperties = !!i641[16]
  i640.focalLength = i641[17]
  i640.sensorSize = new pc.Vec2( i641[18], i641[19] )
  i640.lensShift = new pc.Vec2( i641[20], i641[21] )
  i640.gateFit = i641[22]
  i640.commandBufferCount = i641[23]
  i640.cameraType = i641[24]
  i640.enabled = !!i641[25]
  return i640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i643 = data
  i642.center = new pc.Vec3( i643[0], i643[1], i643[2] )
  i642.size = new pc.Vec3( i643[3], i643[4], i643[5] )
  i642.enabled = !!i643[6]
  i642.isTrigger = !!i643[7]
  request.r(i643[8], i643[9], 0, i642, 'material')
  return i642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider2D"] = function (request, data, root) {
  var i644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider2D' )
  var i645 = data
  i644.usedByComposite = !!i645[0]
  i644.autoTiling = !!i645[1]
  i644.size = new pc.Vec2( i645[2], i645[3] )
  i644.edgeRadius = i645[4]
  i644.enabled = !!i645[5]
  i644.isTrigger = !!i645[6]
  i644.usedByEffector = !!i645[7]
  i644.density = i645[8]
  i644.offset = new pc.Vec2( i645[9], i645[10] )
  request.r(i645[11], i645[12], 0, i644, 'material')
  return i644
}

Deserializers["GameController"] = function (request, data, root) {
  var i646 = root || request.c( 'GameController' )
  var i647 = data
  i646.MaxShoot = i647[0]
  i646.OnEnd = request.d('System.Action', i647[1], i646.OnEnd)
  request.r(i647[2], i647[3], 0, i646, 'currentShootText')
  request.r(i647[4], i647[5], 0, i646, 'winScene')
  request.r(i647[6], i647[7], 0, i646, 'lossScene')
  request.r(i647[8], i647[9], 0, i646, 'camera0')
  request.r(i647[10], i647[11], 0, i646, 'camera1')
  request.r(i647[12], i647[13], 0, i646, 'mainCamera')
  request.r(i647[14], i647[15], 0, i646, 'UI')
  request.r(i647[16], i647[17], 0, i646, 'panel')
  return i646
}

Deserializers["System.Action"] = function (request, data, root) {
  var i648 = root || request.c( 'System.Action' )
  var i649 = data
  return i648
}

Deserializers["AudioController"] = function (request, data, root) {
  var i650 = root || request.c( 'AudioController' )
  var i651 = data
  request.r(i651[0], i651[1], 0, i650, 'BGM')
  request.r(i651[2], i651[3], 0, i650, 'musicSource')
  request.r(i651[4], i651[5], 0, i650, 'shootSFX')
  request.r(i651[6], i651[7], 0, i650, 'hitSFX')
  request.r(i651[8], i651[9], 0, i650, 'pool')
  i650.startSize = i651[10]
  return i650
}

Deserializers["LunaController"] = function (request, data, root) {
  var i652 = root || request.c( 'LunaController' )
  var i653 = data
  i652.TimePlay = i653[0]
  request.r(i653[1], i653[2], 0, i652, 'endCard')
  return i652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i655 = data
  i654.ambientIntensity = i655[0]
  i654.reflectionIntensity = i655[1]
  i654.ambientMode = i655[2]
  i654.ambientLight = new pc.Color(i655[3], i655[4], i655[5], i655[6])
  i654.ambientSkyColor = new pc.Color(i655[7], i655[8], i655[9], i655[10])
  i654.ambientGroundColor = new pc.Color(i655[11], i655[12], i655[13], i655[14])
  i654.ambientEquatorColor = new pc.Color(i655[15], i655[16], i655[17], i655[18])
  i654.fogColor = new pc.Color(i655[19], i655[20], i655[21], i655[22])
  i654.fogEndDistance = i655[23]
  i654.fogStartDistance = i655[24]
  i654.fogDensity = i655[25]
  i654.fog = !!i655[26]
  request.r(i655[27], i655[28], 0, i654, 'skybox')
  i654.fogMode = i655[29]
  var i657 = i655[30]
  var i656 = []
  for(var i = 0; i < i657.length; i += 1) {
    i656.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i657[i + 0]) );
  }
  i654.lightmaps = i656
  i654.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i655[31], i654.lightProbes)
  i654.lightmapsMode = i655[32]
  i654.mixedBakeMode = i655[33]
  i654.environmentLightingMode = i655[34]
  i654.ambientProbe = new pc.SphericalHarmonicsL2(i655[35])
  request.r(i655[36], i655[37], 0, i654, 'customReflection')
  request.r(i655[38], i655[39], 0, i654, 'defaultReflection')
  i654.defaultReflectionMode = i655[40]
  i654.defaultReflectionResolution = i655[41]
  i654.sunLightObjectId = i655[42]
  i654.pixelLightCount = i655[43]
  i654.defaultReflectionHDR = !!i655[44]
  i654.hasLightDataAsset = !!i655[45]
  i654.hasManualGenerate = !!i655[46]
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i661 = data
  request.r(i661[0], i661[1], 0, i660, 'lightmapColor')
  request.r(i661[2], i661[3], 0, i660, 'lightmapDirection')
  request.r(i661[4], i661[5], 0, i660, 'shadowMask')
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i662 = root || new UnityEngine.LightProbes()
  var i663 = data
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i671 = data
  var i673 = i671[0]
  var i672 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i673.length; i += 1) {
    i672.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i673[i + 0]));
  }
  i670.ShaderCompilationErrors = i672
  i670.name = i671[1]
  i670.guid = i671[2]
  var i675 = i671[3]
  var i674 = []
  for(var i = 0; i < i675.length; i += 1) {
    i674.push( i675[i + 0] );
  }
  i670.shaderDefinedKeywords = i674
  var i677 = i671[4]
  var i676 = []
  for(var i = 0; i < i677.length; i += 1) {
    i676.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i677[i + 0]) );
  }
  i670.passes = i676
  var i679 = i671[5]
  var i678 = []
  for(var i = 0; i < i679.length; i += 1) {
    i678.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i679[i + 0]) );
  }
  i670.usePasses = i678
  var i681 = i671[6]
  var i680 = []
  for(var i = 0; i < i681.length; i += 1) {
    i680.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i681[i + 0]) );
  }
  i670.defaultParameterValues = i680
  request.r(i671[7], i671[8], 0, i670, 'unityFallbackShader')
  i670.readDepth = !!i671[9]
  i670.hasDepthOnlyPass = !!i671[10]
  i670.isCreatedByShaderGraph = !!i671[11]
  i670.disableBatching = !!i671[12]
  i670.compiled = !!i671[13]
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i685 = data
  i684.shaderName = i685[0]
  i684.errorMessage = i685[1]
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i690 = root || new pc.UnityShaderPass()
  var i691 = data
  i690.id = i691[0]
  i690.subShaderIndex = i691[1]
  i690.name = i691[2]
  i690.passType = i691[3]
  i690.grabPassTextureName = i691[4]
  i690.usePass = !!i691[5]
  i690.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[6], i690.zTest)
  i690.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[7], i690.zWrite)
  i690.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[8], i690.culling)
  i690.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i691[9], i690.blending)
  i690.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i691[10], i690.alphaBlending)
  i690.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[11], i690.colorWriteMask)
  i690.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[12], i690.offsetUnits)
  i690.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[13], i690.offsetFactor)
  i690.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[14], i690.stencilRef)
  i690.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[15], i690.stencilReadMask)
  i690.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i691[16], i690.stencilWriteMask)
  i690.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i691[17], i690.stencilOp)
  i690.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i691[18], i690.stencilOpFront)
  i690.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i691[19], i690.stencilOpBack)
  var i693 = i691[20]
  var i692 = []
  for(var i = 0; i < i693.length; i += 1) {
    i692.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i693[i + 0]) );
  }
  i690.tags = i692
  var i695 = i691[21]
  var i694 = []
  for(var i = 0; i < i695.length; i += 1) {
    i694.push( i695[i + 0] );
  }
  i690.passDefinedKeywords = i694
  var i697 = i691[22]
  var i696 = []
  for(var i = 0; i < i697.length; i += 1) {
    i696.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i697[i + 0]) );
  }
  i690.passDefinedKeywordGroups = i696
  var i699 = i691[23]
  var i698 = []
  for(var i = 0; i < i699.length; i += 1) {
    i698.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i699[i + 0]) );
  }
  i690.variants = i698
  var i701 = i691[24]
  var i700 = []
  for(var i = 0; i < i701.length; i += 1) {
    i700.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i701[i + 0]) );
  }
  i690.excludedVariants = i700
  i690.hasDepthReader = !!i691[25]
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i702 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i703 = data
  i702.val = i703[0]
  i702.name = i703[1]
  return i702
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i704 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i705 = data
  i704.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i705[0], i704.src)
  i704.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i705[1], i704.dst)
  i704.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i705[2], i704.op)
  return i704
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i707 = data
  i706.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i707[0], i706.pass)
  i706.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i707[1], i706.fail)
  i706.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i707[2], i706.zFail)
  i706.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i707[3], i706.comp)
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i711 = data
  i710.name = i711[0]
  i710.value = i711[1]
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i715 = data
  var i717 = i715[0]
  var i716 = []
  for(var i = 0; i < i717.length; i += 1) {
    i716.push( i717[i + 0] );
  }
  i714.keywords = i716
  i714.hasDiscard = !!i715[1]
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i721 = data
  i720.passId = i721[0]
  i720.subShaderIndex = i721[1]
  var i723 = i721[2]
  var i722 = []
  for(var i = 0; i < i723.length; i += 1) {
    i722.push( i723[i + 0] );
  }
  i720.keywords = i722
  i720.vertexProgram = i721[3]
  i720.fragmentProgram = i721[4]
  i720.exportedForWebGl2 = !!i721[5]
  i720.readDepth = !!i721[6]
  return i720
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i726 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i727 = data
  request.r(i727[0], i727[1], 0, i726, 'shader')
  i726.pass = i727[2]
  return i726
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i731 = data
  i730.name = i731[0]
  i730.type = i731[1]
  i730.value = new pc.Vec4( i731[2], i731[3], i731[4], i731[5] )
  i730.textureValue = i731[6]
  i730.shaderPropertyFlag = i731[7]
  return i730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Sprite"] = function (request, data, root) {
  var i732 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Sprite' )
  var i733 = data
  i732.name = i733[0]
  request.r(i733[1], i733[2], 0, i732, 'texture')
  i732.aabb = i733[3]
  i732.vertices = i733[4]
  i732.triangles = i733[5]
  i732.textureRect = UnityEngine.Rect.MinMaxRect(i733[6], i733[7], i733[8], i733[9])
  i732.packedRect = UnityEngine.Rect.MinMaxRect(i733[10], i733[11], i733[12], i733[13])
  i732.border = new pc.Vec4( i733[14], i733[15], i733[16], i733[17] )
  i732.transparency = i733[18]
  i732.bounds = i733[19]
  i732.pixelsPerUnit = i733[20]
  i732.textureWidth = i733[21]
  i732.textureHeight = i733[22]
  i732.nativeSize = new pc.Vec2( i733[23], i733[24] )
  i732.pivot = new pc.Vec2( i733[25], i733[26] )
  i732.textureRectOffset = new pc.Vec2( i733[27], i733[28] )
  return i732
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i734 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i735 = data
  i734.name = i735[0]
  return i734
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i737 = data
  i736.name = i737[0]
  i736.ascent = i737[1]
  i736.originalLineHeight = i737[2]
  i736.fontSize = i737[3]
  var i739 = i737[4]
  var i738 = []
  for(var i = 0; i < i739.length; i += 1) {
    i738.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i739[i + 0]) );
  }
  i736.characterInfo = i738
  request.r(i737[5], i737[6], 0, i736, 'texture')
  i736.originalFontSize = i737[7]
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i742 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i743 = data
  i742.index = i743[0]
  i742.advance = i743[1]
  i742.bearing = i743[2]
  i742.glyphWidth = i743[3]
  i742.glyphHeight = i743[4]
  i742.minX = i743[5]
  i742.maxX = i743[6]
  i742.minY = i743[7]
  i742.maxY = i743[8]
  i742.uvBottomLeftX = i743[9]
  i742.uvBottomLeftY = i743[10]
  i742.uvBottomRightX = i743[11]
  i742.uvBottomRightY = i743[12]
  i742.uvTopLeftX = i743[13]
  i742.uvTopLeftY = i743[14]
  i742.uvTopRightX = i743[15]
  i742.uvTopRightY = i743[16]
  return i742
}

Deserializers["DG.Tweening.Core.DOTweenSettings"] = function (request, data, root) {
  var i744 = root || request.c( 'DG.Tweening.Core.DOTweenSettings' )
  var i745 = data
  i744.useSafeMode = !!i745[0]
  i744.safeModeOptions = request.d('DG.Tweening.Core.DOTweenSettings+SafeModeOptions', i745[1], i744.safeModeOptions)
  i744.timeScale = i745[2]
  i744.unscaledTimeScale = i745[3]
  i744.useSmoothDeltaTime = !!i745[4]
  i744.maxSmoothUnscaledTime = i745[5]
  i744.rewindCallbackMode = i745[6]
  i744.showUnityEditorReport = !!i745[7]
  i744.logBehaviour = i745[8]
  i744.drawGizmos = !!i745[9]
  i744.defaultRecyclable = !!i745[10]
  i744.defaultAutoPlay = i745[11]
  i744.defaultUpdateType = i745[12]
  i744.defaultTimeScaleIndependent = !!i745[13]
  i744.defaultEaseType = i745[14]
  i744.defaultEaseOvershootOrAmplitude = i745[15]
  i744.defaultEasePeriod = i745[16]
  i744.defaultAutoKill = !!i745[17]
  i744.defaultLoopType = i745[18]
  i744.debugMode = !!i745[19]
  i744.debugStoreTargetId = !!i745[20]
  i744.showPreviewPanel = !!i745[21]
  i744.storeSettingsLocation = i745[22]
  i744.modules = request.d('DG.Tweening.Core.DOTweenSettings+ModulesSetup', i745[23], i744.modules)
  i744.createASMDEF = !!i745[24]
  i744.showPlayingTweens = !!i745[25]
  i744.showPausedTweens = !!i745[26]
  return i744
}

Deserializers["DG.Tweening.Core.DOTweenSettings+SafeModeOptions"] = function (request, data, root) {
  var i746 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+SafeModeOptions' )
  var i747 = data
  i746.logBehaviour = i747[0]
  i746.nestedTweenFailureBehaviour = i747[1]
  return i746
}

Deserializers["DG.Tweening.Core.DOTweenSettings+ModulesSetup"] = function (request, data, root) {
  var i748 = root || request.c( 'DG.Tweening.Core.DOTweenSettings+ModulesSetup' )
  var i749 = data
  i748.showPanel = !!i749[0]
  i748.audioEnabled = !!i749[1]
  i748.physicsEnabled = !!i749[2]
  i748.physics2DEnabled = !!i749[3]
  i748.spriteEnabled = !!i749[4]
  i748.uiEnabled = !!i749[5]
  i748.textMeshProEnabled = !!i749[6]
  i748.tk2DEnabled = !!i749[7]
  i748.deAudioEnabled = !!i749[8]
  i748.deUnityExtendedEnabled = !!i749[9]
  i748.epoOutlineEnabled = !!i749[10]
  return i748
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i750 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i751 = data
  var i753 = i751[0]
  var i752 = []
  for(var i = 0; i < i753.length; i += 1) {
    i752.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i753[i + 0]) );
  }
  i750.files = i752
  i750.componentToPrefabIds = i751[1]
  return i750
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i756 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i757 = data
  i756.path = i757[0]
  request.r(i757[1], i757[2], 0, i756, 'unityObject')
  return i756
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i758 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i759 = data
  var i761 = i759[0]
  var i760 = []
  for(var i = 0; i < i761.length; i += 1) {
    i760.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i761[i + 0]) );
  }
  i758.scriptsExecutionOrder = i760
  var i763 = i759[1]
  var i762 = []
  for(var i = 0; i < i763.length; i += 1) {
    i762.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i763[i + 0]) );
  }
  i758.sortingLayers = i762
  var i765 = i759[2]
  var i764 = []
  for(var i = 0; i < i765.length; i += 1) {
    i764.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i765[i + 0]) );
  }
  i758.cullingLayers = i764
  i758.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i759[3], i758.timeSettings)
  i758.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i759[4], i758.physicsSettings)
  i758.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i759[5], i758.physics2DSettings)
  i758.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i759[6], i758.qualitySettings)
  i758.enableRealtimeShadows = !!i759[7]
  i758.enableAutoInstancing = !!i759[8]
  i758.enableStaticBatching = !!i759[9]
  i758.enableDynamicBatching = !!i759[10]
  i758.usePreservativeDynamicBatching = !!i759[11]
  i758.lightmapEncodingQuality = i759[12]
  i758.desiredColorSpace = i759[13]
  var i767 = i759[14]
  var i766 = []
  for(var i = 0; i < i767.length; i += 1) {
    i766.push( i767[i + 0] );
  }
  i758.allTags = i766
  return i758
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i771 = data
  i770.name = i771[0]
  i770.value = i771[1]
  return i770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i775 = data
  i774.id = i775[0]
  i774.name = i775[1]
  i774.value = i775[2]
  return i774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i779 = data
  i778.id = i779[0]
  i778.name = i779[1]
  return i778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i780 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i781 = data
  i780.fixedDeltaTime = i781[0]
  i780.maximumDeltaTime = i781[1]
  i780.timeScale = i781[2]
  i780.maximumParticleTimestep = i781[3]
  return i780
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i782 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i783 = data
  i782.gravity = new pc.Vec3( i783[0], i783[1], i783[2] )
  i782.defaultSolverIterations = i783[3]
  i782.bounceThreshold = i783[4]
  i782.autoSyncTransforms = !!i783[5]
  i782.autoSimulation = !!i783[6]
  var i785 = i783[7]
  var i784 = []
  for(var i = 0; i < i785.length; i += 1) {
    i784.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i785[i + 0]) );
  }
  i782.collisionMatrix = i784
  return i782
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i788 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i789 = data
  i788.enabled = !!i789[0]
  i788.layerId = i789[1]
  i788.otherLayerId = i789[2]
  return i788
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i790 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i791 = data
  request.r(i791[0], i791[1], 0, i790, 'material')
  i790.gravity = new pc.Vec2( i791[2], i791[3] )
  i790.positionIterations = i791[4]
  i790.velocityIterations = i791[5]
  i790.velocityThreshold = i791[6]
  i790.maxLinearCorrection = i791[7]
  i790.maxAngularCorrection = i791[8]
  i790.maxTranslationSpeed = i791[9]
  i790.maxRotationSpeed = i791[10]
  i790.baumgarteScale = i791[11]
  i790.baumgarteTOIScale = i791[12]
  i790.timeToSleep = i791[13]
  i790.linearSleepTolerance = i791[14]
  i790.angularSleepTolerance = i791[15]
  i790.defaultContactOffset = i791[16]
  i790.autoSimulation = !!i791[17]
  i790.queriesHitTriggers = !!i791[18]
  i790.queriesStartInColliders = !!i791[19]
  i790.callbacksOnDisable = !!i791[20]
  i790.reuseCollisionCallbacks = !!i791[21]
  i790.autoSyncTransforms = !!i791[22]
  var i793 = i791[23]
  var i792 = []
  for(var i = 0; i < i793.length; i += 1) {
    i792.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i793[i + 0]) );
  }
  i790.collisionMatrix = i792
  return i790
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i796 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i797 = data
  i796.enabled = !!i797[0]
  i796.layerId = i797[1]
  i796.otherLayerId = i797[2]
  return i796
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i798 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i799 = data
  var i801 = i799[0]
  var i800 = []
  for(var i = 0; i < i801.length; i += 1) {
    i800.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i801[i + 0]) );
  }
  i798.qualityLevels = i800
  var i803 = i799[1]
  var i802 = []
  for(var i = 0; i < i803.length; i += 1) {
    i802.push( i803[i + 0] );
  }
  i798.names = i802
  i798.shadows = i799[2]
  i798.anisotropicFiltering = i799[3]
  i798.antiAliasing = i799[4]
  i798.lodBias = i799[5]
  i798.shadowCascades = i799[6]
  i798.shadowDistance = i799[7]
  i798.shadowmaskMode = i799[8]
  i798.shadowProjection = i799[9]
  i798.shadowResolution = i799[10]
  i798.softParticles = !!i799[11]
  i798.softVegetation = !!i799[12]
  i798.activeColorSpace = i799[13]
  i798.desiredColorSpace = i799[14]
  i798.masterTextureLimit = i799[15]
  i798.maxQueuedFrames = i799[16]
  i798.particleRaycastBudget = i799[17]
  i798.pixelLightCount = i799[18]
  i798.realtimeReflectionProbes = !!i799[19]
  i798.shadowCascade2Split = i799[20]
  i798.shadowCascade4Split = new pc.Vec3( i799[21], i799[22], i799[23] )
  i798.streamingMipmapsActive = !!i799[24]
  i798.vSyncCount = i799[25]
  i798.asyncUploadBufferSize = i799[26]
  i798.asyncUploadTimeSlice = i799[27]
  i798.billboardsFaceCameraPosition = !!i799[28]
  i798.shadowNearPlaneOffset = i799[29]
  i798.streamingMipmapsMemoryBudget = i799[30]
  i798.maximumLODLevel = i799[31]
  i798.streamingMipmapsAddAllCameras = !!i799[32]
  i798.streamingMipmapsMaxLevelReduction = i799[33]
  i798.streamingMipmapsRenderersPerFrame = i799[34]
  i798.resolutionScalingFixedDPIFactor = i799[35]
  i798.streamingMipmapsMaxFileIORequests = i799[36]
  i798.currentQualityLevel = i799[37]
  return i798
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i808 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i809 = data
  i808.weight = i809[0]
  i808.vertices = i809[1]
  i808.normals = i809[2]
  i808.tangents = i809[3]
  return i808
}

Deserializers["UnityEngine.Events.ArgumentCache"] = function (request, data, root) {
  var i810 = root || request.c( 'UnityEngine.Events.ArgumentCache' )
  var i811 = data
  request.r(i811[0], i811[1], 0, i810, 'm_ObjectArgument')
  i810.m_ObjectArgumentAssemblyTypeName = i811[2]
  i810.m_IntArgument = i811[3]
  i810.m_FloatArgument = i811[4]
  i810.m_StringArgument = i811[5]
  i810.m_BoolArgument = !!i811[6]
  return i810
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

Deserializers.runtimeAnalysisExcludedMethodsCount = "4118";

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

Deserializers.buildID = "9026ff98-7b5c-4b09-a6cc-d4c82826177f";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["Unity","VisualScripting","RuntimeVSUsageUtility","RuntimeInitializeOnLoadBeforeSceneLoad"],["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["UnityEngine","Timeline","AnimatorBindingCache","ResetStaticsOnLoad"],["UnityEngine","Timeline","TrackAsset","ResetStaticsOnLoad"],["UnityEngine","Timeline","AnimationPreviewUtilities","ResetStaticsOnLoad"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

