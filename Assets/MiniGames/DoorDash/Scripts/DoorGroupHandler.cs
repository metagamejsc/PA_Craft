using System.Collections.Generic;
using UnityEngine;

namespace Minigames.DoorDash
{
    public class DoorGroupHandler : MonoBehaviour
    {
        [SerializeField] private int passDoorAmount;

        private void Start()
        {
            InitDoors();
        }

        private void InitDoors()
        {
            var doors = GetComponentsInChildren<DoorHandler>();
            List<DoorHandler> availableDoors = new List<DoorHandler>(doors);

            for (int i = 0; i < passDoorAmount; i++)
            {
                int randNum = Random.Range(0, availableDoors.Count);
                availableDoors[randNum].ActiveDoor();
                availableDoors.RemoveAt(randNum);
            }

            foreach (DoorHandler door in availableDoors)
            {
                door.DeActiveDoor();
            }
        }
    }
}

