using UnityEngine;

public class DragRotatePreview : MonoBehaviour
{
    public float rotationSpeed = 5f;

    private bool isDragging;
    private Vector3 lastMousePosition;

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            isDragging = true;
            lastMousePosition = Input.mousePosition;
        }

        if (Input.GetMouseButtonUp(0))
        {
            isDragging = false;
        }

        if (isDragging)
        {
            Vector3 delta = Input.mousePosition - lastMousePosition;
            float rotationY = delta.x * rotationSpeed * Time.deltaTime;

            transform.Rotate(Vector3.up, -rotationY, Space.World);

            lastMousePosition = Input.mousePosition;
        }
    }
}