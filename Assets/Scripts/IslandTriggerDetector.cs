using UnityEngine;

public class IslandTriggerDetector : MonoBehaviour
{
    public TerrainGenerator2 terrainGenerator; // Tham chiếu đến TerrainGenerator
    public ParticleSystem particleSystem;

    private void OnTriggerEnter(Collider other)
    {
        // Kiểm tra nếu object va chạm là player (giả sử tag của player là "Player")
        if (other.CompareTag("Player"))
        {
            Debug.Log($"{this.name} triggered by Player");
            // Gọi hành động từ TerrainGenerator
            particleSystem.transform.position=other.transform.position+other.transform.forward*2;
            particleSystem.Play();
            //AudioManager.ins.PlayFireworkSound();
            terrainGenerator?.OnPlayerEnterIsland2?.Invoke();
            // Hoặc gọi trực tiếp hàm
             terrainGenerator?.PlayerEnteredIsland2();
            
            // Nếu chỉ muốn chạy một lần, bạn có thể disable collider sau khi trigger
            // GetComponent<Collider>().enabled = false;
        }
    }
}