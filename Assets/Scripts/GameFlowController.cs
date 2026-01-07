using System.Collections;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;

public class GameFlowController : MonoBehaviour
{
    public VideoPlayer videoPlayer;
    public GameObject weaponSelectionPanel;
    public GameObject ctaPanel;
    public Image selectedWeaponImage;
    public Sprite[] weaponSprites;

    private void Start()
    {
        weaponSelectionPanel.SetActive(false);
        ctaPanel.SetActive(false);
        StartCoroutine(ShowWeaponOptionsAfterDelay(LunaManager.ins.timeShowSelectWeapon));
    }

    IEnumerator ShowWeaponOptionsAfterDelay(float delay)
    {
        yield return new WaitForSeconds(delay);
        weaponSelectionPanel.SetActive(true);
    }

    public void OnWeaponSelected(int weaponIndex)
    {
        weaponSelectionPanel.SetActive(false);
        ctaPanel.SetActive(true);
        selectedWeaponImage.sprite = weaponSprites[weaponIndex];
    }

    public void OnCTAButtonClicked()
    {
        //Application.OpenURL("https://yourstorelink.com"); // link store
    }
}