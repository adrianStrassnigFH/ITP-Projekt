//
// ---------------------dynamic loading of the page-----------------------------------------------

function loadPage(page){
    //go to the directory and choose the
    fetch("./"+page+"/"+page+".php")
    .then(response => response.text())
    .then(html => {
        document.getElementById("content").innerHTML = html;
        initparallax()
        animation()
        })
    .catch(error => {
        document.getElementById("content").innerHTML = "<p>Page not found.</p>";
        });
}
loadPage("homepage");

//--------------------------------------------------------------------------------------------------------

//-------------------------------------scrolling effect on the mainpage-------------------------------------------------

function initparallax(){
    let parallax = document.getElementById("welcome-section");
    if(parallax){
        window.addEventListener("scroll", function(){
            let offset = window.scrollY;
            parallax.style.backgroundPositionY = `${offset * 0.8}px`

        })
    }else{
        console.error("welcome-section not found");
    }
}
loadPage("homepage");
//-----------------------------------------------------------------------------------------------------------------------------------------------------

//-------animation effect, which checks if the element is on the screen, than starts an animation-------------------------------------------------------

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }else{
            entry.target.classList.remove("show");
        }
    })
})
function animation(){
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(el => observer.observe(el));

}
//------------------------------------------------------------------------------------------------------------------------------------------------------------

//-----------------FAQ animations(needs fix(either here or in the css(deleted the animation part))--------------------------------------------------------------------------------------------
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------LOGIN AND REGISTER------------------------------------------
function switchLogin(currentForm){
    if(currentForm === 'login'){
        document.getElementById("login").setAttribute("hidden", "");
        document.getElementById("register").removeAttribute("hidden");
    }
    if(currentForm === 'register'){
        document.getElementById("register").setAttribute("hidden", "");
        document.getElementById("login").removeAttribute("hidden");
    }
}
