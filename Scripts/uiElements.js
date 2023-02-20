function PlayButtonAnimation(elementId)
{
    const buttonId = document.getElementById(elementId);

    buttonId.style.animation = "";
    setTimeout(() => {
        buttonId.style.animation = "buttonHappyAdaptive 0.333s forwards";
    }, 32);
}