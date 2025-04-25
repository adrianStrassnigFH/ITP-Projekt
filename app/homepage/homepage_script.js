function initparallax(){
    let parallax = document.getElementById("welcome-section");
    if(!parallax) return;
    window.addEventListener("scroll", function(){
        let offset = window.scrollY;
        parallax.style.backgroundPositionY = `${offset * 0.8}px`

    })

}

initparallax();