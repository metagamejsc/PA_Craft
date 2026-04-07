using UnityEngine;
using UnityEngine.UI;

[DisallowMultipleComponent]
public class AutoFightInventoryItem : MonoBehaviour
{
    [SerializeField] private Button button;
    [SerializeField] private Graphic highlightGraphic;
    [SerializeField] private GameObject weaponPrefab;
    [SerializeField] private float damageBonus;
    [SerializeField] private Vector3 equipLocalPosition;
    [SerializeField] private Vector3 equipLocalEulerAngles;
    [SerializeField] private Vector3 equipLocalScale = Vector3.one;
    [SerializeField] private Color normalColor = Color.white;
    [SerializeField] private Color highlightedColor = new Color(1f, 0.9f, 0.3f, 1f);
    [SerializeField] private float selectedScaleMultiplier = 1.08f;

    private Vector3 defaultScale = Vector3.one;

    public Button Button => button;
    public GameObject WeaponPrefab => weaponPrefab;
    public float DamageBonus => damageBonus;
    public Vector3 EquipLocalPosition => equipLocalPosition;
    public Vector3 EquipLocalEulerAngles => equipLocalEulerAngles;
    public Vector3 EquipLocalScale => equipLocalScale;

    private void Awake()
    {
        if (button == null)
        {
            button = GetComponent<Button>();
        }

        if (highlightGraphic == null && button != null)
        {
            highlightGraphic = button.targetGraphic;
        }

        defaultScale = transform.localScale;
        SetHighlighted(false);
    }

    public void SetHighlighted(bool isHighlighted)
    {
        transform.localScale = isHighlighted
            ? defaultScale * selectedScaleMultiplier
            : defaultScale;

        if (highlightGraphic != null)
        {
            highlightGraphic.color = isHighlighted ? highlightedColor : normalColor;
        }
    }

    public void SetInteractable(bool isInteractable)
    {
        if (button != null)
        {
            button.interactable = isInteractable;
        }
    }
}
