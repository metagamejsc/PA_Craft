using UnityEngine;

public class PlayerOnBoatLookMoveDir : MonoBehaviour
{
    public BoatController boatController;
    public float rotateSpeed = 10f;

    private void Update()
    {
        if (boatController == null) return;

        Vector3 moveDir = boatController.LastMoveDirection;
        moveDir.y = 0f;

        if (moveDir.sqrMagnitude > 0.001f)
        {
            Quaternion targetRotation = Quaternion.LookRotation(moveDir);
            transform.rotation = Quaternion.Lerp(transform.rotation, targetRotation, rotateSpeed * Time.deltaTime);
        }
    }
}