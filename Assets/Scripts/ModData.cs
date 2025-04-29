using System.Collections;
using System.Collections.Generic;
using UnityEngine;
[CreateAssetMenu(fileName = "ModData", menuName = "ScriptableObjects/ModData")]
public class ModData : ScriptableObject
{
    public int ID;
    public string type;
    public string nameMod;
    public string des;
    public string percent;
    public string download;
    public string view;
    public string published;
    public Sprite icon;
    public Sprite gallary;
}
