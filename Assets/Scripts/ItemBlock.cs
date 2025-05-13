using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ItemBlock : ScriptableObject
{
    public BlockType blockType;
    public int count;
    public Sprite sprite;
    
    public void AddBlock(int amount)
    {
        count += amount;
    }
}
