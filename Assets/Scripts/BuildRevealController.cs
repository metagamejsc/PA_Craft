using System.Collections.Generic;
using UnityEngine;

public class BuildRevealController : MonoBehaviour
{
    private static readonly int RevealBottomId = Shader.PropertyToID("_RevealBottom");
    private static readonly int RevealTopId = Shader.PropertyToID("_RevealTop");
    private static readonly int MainTexId = Shader.PropertyToID("_MainTex");
    private static readonly int ColorId = Shader.PropertyToID("_Color");
    private static readonly int MetallicId = Shader.PropertyToID("_Metallic");
    private static readonly int GlossinessId = Shader.PropertyToID("_Glossiness");

    [SerializeField] private int totalSteps = 10;
    [SerializeField] private int startVisibleSteps = 1;
    [SerializeField] private Shader revealShader;

    private readonly List<Material> revealMaterials = new List<Material>();
    private int currentStep;
    private float localBottom;
    private float localHeight = 1f;
    private bool initialized;

    public bool IsComplete => currentStep >= totalSteps;
    public int CurrentStep => currentStep;
    public int TotalSteps => totalSteps;

    private void Awake()
    {
        Initialize();
    }

    private void LateUpdate()
    {
        if (!transform.hasChanged)
        {
            return;
        }

        ApplyReveal();
        transform.hasChanged = false;
    }

    public void Initialize()
    {
        if (initialized)
        {
            ApplyReveal();
            return;
        }

        totalSteps = Mathf.Max(1, totalSteps);
        startVisibleSteps = Mathf.Clamp(startVisibleSteps, 0, totalSteps);

        CacheLocalHeight();
        SetupRevealMaterials();
        SetStep(startVisibleSteps);
        initialized = true;
    }

    public bool RevealNextStep()
    {
        SetStep(currentStep + 1);
        return IsComplete;
    }

    public void Configure(int steps, int visibleSteps)
    {
        totalSteps = Mathf.Max(1, steps);
        startVisibleSteps = Mathf.Clamp(visibleSteps, 0, totalSteps);
        initialized = false;
        Initialize();
    }

    public void SetStep(int step)
    {
        currentStep = Mathf.Clamp(step, 0, totalSteps);
        ApplyReveal();
    }

    private void CacheLocalHeight()
    {
        Renderer[] renderers = GetComponentsInChildren<Renderer>(true);
        bool hasBounds = false;
        float minY = 0f;
        float maxY = 0f;

        foreach (Renderer rendererItem in renderers)
        {
            Bounds bounds = rendererItem.bounds;
            float rendererMinY = transform.InverseTransformPoint(bounds.min).y;
            float rendererMaxY = transform.InverseTransformPoint(bounds.max).y;

            if (!hasBounds)
            {
                minY = rendererMinY;
                maxY = rendererMaxY;
                hasBounds = true;
                continue;
            }

            minY = Mathf.Min(minY, rendererMinY);
            maxY = Mathf.Max(maxY, rendererMaxY);
        }

        localBottom = minY;
        localHeight = Mathf.Max(0.01f, maxY - minY);
    }

    private void SetupRevealMaterials()
    {
        revealMaterials.Clear();

        Shader shaderToUse = revealShader != null ? revealShader : Shader.Find("Custom/BuildVerticalReveal");
        if (shaderToUse == null)
        {
            Debug.LogWarning("Build reveal shader was not found. Model will stay fully visible.", this);
            return;
        }

        Renderer[] renderers = GetComponentsInChildren<Renderer>(true);
        foreach (Renderer rendererItem in renderers)
        {
            Material[] sourceMaterials = rendererItem.materials;
            for (int i = 0; i < sourceMaterials.Length; i++)
            {
                Material source = sourceMaterials[i];
                Material revealMaterial = new Material(source)
                {
                    shader = shaderToUse
                };

                CopyCommonMaterialProperties(source, revealMaterial);
                sourceMaterials[i] = revealMaterial;
                revealMaterials.Add(revealMaterial);
            }

            rendererItem.materials = sourceMaterials;
        }
    }

    private void CopyCommonMaterialProperties(Material source, Material target)
    {
        if (source.HasProperty(MainTexId) && target.HasProperty(MainTexId))
        {
            target.SetTexture(MainTexId, source.GetTexture(MainTexId));
            target.SetTextureScale(MainTexId, source.GetTextureScale(MainTexId));
            target.SetTextureOffset(MainTexId, source.GetTextureOffset(MainTexId));
        }

        if (source.HasProperty(ColorId) && target.HasProperty(ColorId))
        {
            target.SetColor(ColorId, source.GetColor(ColorId));
        }

        if (source.HasProperty(MetallicId) && target.HasProperty(MetallicId))
        {
            target.SetFloat(MetallicId, source.GetFloat(MetallicId));
        }

        if (source.HasProperty(GlossinessId) && target.HasProperty(GlossinessId))
        {
            target.SetFloat(GlossinessId, source.GetFloat(GlossinessId));
        }
    }

    private void ApplyReveal()
    {
        if (revealMaterials.Count == 0)
        {
            return;
        }

        float visibleRatio = (float)currentStep / totalSteps;
        float worldBottom = transform.TransformPoint(new Vector3(0f, localBottom, 0f)).y;
        float worldTop = transform.TransformPoint(new Vector3(0f, localBottom + localHeight * visibleRatio, 0f)).y;

        if (worldTop < worldBottom)
        {
            float temp = worldBottom;
            worldBottom = worldTop;
            worldTop = temp;
        }

        foreach (Material material in revealMaterials)
        {
            material.SetFloat(RevealBottomId, worldBottom - 0.01f);
            material.SetFloat(RevealTopId, worldTop);
        }
    }
}
