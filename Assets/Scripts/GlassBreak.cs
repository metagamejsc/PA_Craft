using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlassBreak : MonoBehaviour
{
    public GameObject glassPiece;
    public int numberOfPieces = 10;
    public BoxCollider rangSpawn;
    void Start()
    {
        for (int i = 0; i < numberOfPieces; i++)
        {
            Vector3 randomPos = new Vector3(
                Random.Range(rangSpawn.bounds.min.x, rangSpawn.bounds.max.x),
                Random.Range(rangSpawn.bounds.min.y, rangSpawn.bounds.max.y),
                Random.Range(rangSpawn.bounds.min.z, rangSpawn.bounds.max.z)
            );
            var a= Instantiate(glassPiece, randomPos, Quaternion.Euler(Random.Range(0,360),Random.Range(0,360),Random.Range(0,360)));
            a.transform.parent = this.transform;
            a.transform.localScale = Vector3.one * Random.Range(0.3f,0.6f);
        }
        Destroy(gameObject,2f);
    }
}
