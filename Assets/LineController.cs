using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

public class LineController : MonoBehaviour
{
    public static LineController ins;
    public Line linePrefab;
    public List<Line> lstLine=new List<Line>();
    public int stepHasZombie;
    public int numberLine;
    public float speedLine=>LunaManager.ins.playerSpeed;
    public Transform player;
    public Tween dOTween;
    
    public void Awake()
    {
        ins = this;
    }
    private void Start()
    {
        CreateLine();
    }

    public void StartMoving()
    {
        dOTween=transform.DOMoveZ(-speedLine, 1f).SetEase(Ease.Linear).SetLoops(-1, LoopType.Incremental);
    }
    public void StopLine()
    {
        dOTween.Pause();
    }
    public void CreateLine()
    {
        for (int i = 0; i < numberLine; i++)
        {
            Line line = Instantiate(linePrefab, transform);
            line.transform.localPosition = new Vector3(0, 0, i * 1f);
            line.name = "Line " + (i + 1);
            line.id = i + 1;
            line.isLeft = false;
            line.isRight = false;
            if (i<=5)
            {
                line.ActiveZombie();
                lstLine.Add(line);
                continue;
            }
            if (i % stepHasZombie == 0)
            {
                int rand = Random.Range(0, 2);
                if (rand == 0)
                {
                    line.isLeft = true;
                }
                else if (rand == 1)
                {
                    line.isRight = true;
                }
            }
            line.ActiveZombie();
            lstLine.Add(line);
        }
    }
    
    public void SpawnNewLine()
    {
        if (lstLine[0].transform.position.z<player.position.z-3)
        {
            var a=Instantiate(linePrefab, transform);
            a.transform.localPosition = new Vector3(0, 0, lstLine[lstLine.Count - 1].transform.localPosition.z + 1f);
            a.id= lstLine[lstLine.Count - 1].id + 1;
            a.name = "Line " + (a.id + 1);
            a.isLeft = false;
            a.isRight = false;
            if (a.id % stepHasZombie == 0)
            {
                int rand = Random.Range(0, 2);
                if (rand == 0)
                {
                    a.isLeft = true;
                }
                else if (rand == 1)
                {
                    a.isRight = true;
                }
            }
            a.ActiveZombie();
            lstLine.Add(a);
            lstLine[0].gameObject.SetActive(false);
            lstLine.RemoveAt(0);
        }
    }
    public void LateUpdate()
    {
        SpawnNewLine();
    }
}
