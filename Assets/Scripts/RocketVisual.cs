using System.Collections.Generic;
using UnityEngine;

public class RocketVisual : MonoBehaviour
{
    [System.Serializable]
    public class RocketPart
    {
        public MeshRenderer renderer;
        [HideInInspector] public Material originalMaterial;
    }

    public List<RocketPart> parts = new List<RocketPart>();
    public Material tutorialMaterial;

    private int currentIndex = 0;

    void Awake()
    {
        parts.Clear();

        // Lấy tất cả child MeshRenderer
        foreach (Transform child in transform)
        {
            MeshRenderer mr = child.GetComponent<MeshRenderer>();
            if (mr != null)
            {
                RocketPart part = new RocketPart
                {
                    renderer = mr,
                    originalMaterial = mr.material
                };

                parts.Add(part);
            }
        }

        SetTutorial();
    }

    public void SetTutorial()
    {
        currentIndex = 0;
        foreach (var part in parts)
        {
            part.renderer.material = tutorialMaterial;
        }
    }
    public void ActivateFullRocket()
    {
        for (int i = 0; i < parts.Count; i++)
        {
            parts[i].renderer.material =
                parts[i].originalMaterial;
        }

        currentIndex = parts.Count;
    }

    public void ActivateNextPart()
    {
        if (currentIndex >= parts.Count) return;

        parts[currentIndex].renderer.material =
            parts[currentIndex].originalMaterial;

        currentIndex++;
    }

    public bool IsFullyActivated()
    {
        return currentIndex >= parts.Count;
    }
}