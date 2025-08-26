using UnityEngine;

public class SetMaterial : MonoBehaviour
{
    public Material tileMaterial;
    public Vector3 size = Vector3.one;
    public GameObject cube;
    public bool spawnCube;

    void Start()
    {
        ApplyMaterial();
    }

    [ContextMenu("SetMesh")]
    public void SetMeshSize()
    {
        ApplyMaterial();
        RandomCube();
    }
    void ApplyMaterial()
    {
        Renderer rend = GetComponent<Renderer>();
        if (rend == null || tileMaterial == null) return;

        rend.material = tileMaterial;

        // Quan trọng: Scale texture theo kích thước vật thể
        // Đối với mặt trên/dưới (nằm ngang), texture nên lặp theo X và Z
        float scaleX = size.x;
        float scaleZ = size.z;

        // Đặt scale texture để mặt trên/dưới hiển thị đúng
        rend.material.mainTextureScale = new Vector2(scaleX, scaleZ);
        
        // Nếu bạn dùng texture nhỏ (ví dụ 1x1), muốn lặp nhiều lần
        // → tăng scale lên (ví dụ: nhân thêm factor)
        // Ví dụ: nếu texture 1m x 1m, và object 5m x 3m → scale = (5,3)
    }

    void RandomCube()
    {
        if (spawnCube)
        {
            foreach (Transform VARIABLE in transform)
            {
                Destroy(VARIABLE.gameObject);
            }
            for (int i = 0; i < 60; i++)
            {
                var randomY= Random.Range(-(int)transform.localScale.y/2, (int)transform.localScale.y/2);
                var randomZ= Random.Range(-(int)transform.localScale.z/2, (int)transform.localScale.z/2);
                var cubeObject= Instantiate(cube);
                cubeObject.transform.position= new Vector3(0.1f, randomY, randomZ)+transform.position;
                cubeObject.transform.parent= transform;
            }
        }
    }
}