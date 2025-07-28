using UnityEngine;
using UnityEngine.EventSystems;

public class PathDragHandler : MonoBehaviour, IBeginDragHandler, IDragHandler, IEndDragHandler
{
    public ForestEscapeGame gameManager;
    public RectTransform pathAZone;
    public RectTransform pathBZone;
    public RectTransform character;

    private Vector2 originalPosition;
    private bool isDragging = false;

    void Start()
    {
        originalPosition = character.anchoredPosition;
    }

    public void OnBeginDrag(PointerEventData eventData)
    {
        isDragging = true;
    }

    public void OnDrag(PointerEventData eventData)
    {
        if (isDragging)
        {
            character.anchoredPosition += eventData.delta;
        }
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        if (isDragging)
        {
            isDragging = false;
            
            // Check which path zone the character is dropped in
            if (IsOverRectTransform(character, pathAZone))
            {
                // Path A selected - safe path
                gameManager.RestartGame(); // hoặc xử lý theo logic game
            }
            else if (IsOverRectTransform(character, pathBZone))
            {
                // Path B selected - dangerous path
                gameManager.GoToStore();
            }
            else
            {
                // Return to original position if not over any zone
                character.anchoredPosition = originalPosition;
            }
        }
    }

    bool IsOverRectTransform(RectTransform element, RectTransform zone)
    {
        Vector2 localPoint;
        RectTransformUtility.ScreenPointToLocalPointInRectangle(
            zone, 
            Input.mousePosition, 
            null, 
            out localPoint
        );
        
        return zone.rect.Contains(localPoint);
    }
}