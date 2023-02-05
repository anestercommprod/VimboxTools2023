// Testing purpose.

const body = document.body;
const contentHolder = document.getElementById('contentHolder');

function InitAnim()
{
    body.style.animation = "bodyAnimFadeIn; animation-duration: 0.333s";
    contentHolder.style.animation = "bodyAnimFadeIn; animation-duration: 0.333s";
}

alert('hi');
console.log('hi');

chrome.runtime.onStartup.addListener(function(){
    const _dur = 0.5;
    const _animName = "bodyAnimFadeIn";
    const _animFillMode = "forwards";
    const contentHolder = document.getElementById("contentHolder");

    document.body.style.animationName = _animName;
    document.body.style.animationDuration = _dur;
    document.body.style.animationFillMode = _animFillMode;
    
    contentHolder.style.animationName = _animName;
    contentHolder.style.animationDuration = _dur;
    contentHolder.style.animationFillMode = _animFillMode;
});