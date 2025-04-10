using System.Collections;
using UnityEngine;
using System.Collections.Generic;

public class MoveToEmptySlot : MonoBehaviour
{
    [Header("Empty Slot Settings")]
    [SerializeField] private int slotCount = 1;
    [SerializeField] private List<Transform> emptySlots;
    
    private void OnTriggerEnter(Collider other)
    {
        var a = other.GetComponent<MoveByLine>();
        if (a==null)
        {
            return;
        }
        if (other.CompareTag("Player") && other.GetComponent<MoveByLine>().isFinishMove ==false)
        {
            other.GetComponent<MoveByLine>().isFinishMove = true;
            var player= other.GetComponent<BaseCharacter>();
            player.IsFindingEnemy = true;
            Transform emptySlot = GetRandomEmptySlot();
            player.SetIdle();
            if (emptySlot != null)
            {
                StartCoroutine(StartFinding(player));
                MovePlayerToSlot(other.transform, emptySlot);
                //MovePlayerToSlot(other.transform);
            }
            else
            {
                Debug.Log("No empty slots available!");
            }
        }
    }

    // Lấy một ô trống ngẫu nhiên từ danh sách
    private Transform GetRandomEmptySlot()
    {
        List<Transform> availableSlots = new List<Transform>();

        foreach (var slot in emptySlots)
        {
            if (slot.childCount == 0) // Nếu ô trống (không có con)
            {
                availableSlots.Add(slot);
            }
        }

        if (availableSlots.Count > 0)
        {
            int randomIndex = Random.Range(0, availableSlots.Count);
            return availableSlots[randomIndex];
        }

        return null;
    }
    
    private void MovePlayerToSlot(Transform player, Transform targetPosition)
    {
        player.position = targetPosition.position;
        player.parent = targetPosition;
    }
    private void MovePlayerToSlot(Transform player)
    {
        for (int i = 0; i < emptySlots.Count; i++)
        {
            if (emptySlots[i].childCount==0)
            {
                player.position = emptySlots[i].position;
                player.SetParent(emptySlots[i]);
            }
        }
    }
    public IEnumerator StartFinding(BaseCharacter baseCharacter)
    {
        while (GameController.ins.isStartGame == false && baseCharacter.IsFindingEnemy==false)
        {
            yield return new WaitForSeconds(2f);
        }
        baseCharacter.transform.parent = null;
    }
   

    // Vẽ ô trống trong Scene để dễ kiểm tra
    private void OnDrawGizmos()
    {
        Gizmos.color = Color.green;
        foreach (var slot in emptySlots)
        {
            if (slot != null)
            {
                Gizmos.DrawWireSphere(slot.position, 0.3f);
            }
        }
    }
}