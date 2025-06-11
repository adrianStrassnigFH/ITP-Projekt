

// ALL PAGES: "PAGE_KEY": ["PATH_TO_WEBSITE", "PATH_TO_SCRIPT"|null, "TITLE"], isModule
const pages_dictionary = {
    "homepage": ["homepage/homepage.html","homepage/homepage_script.js","Homepage",false],
    "faq": ["faq/faq.html","faq/faq_script.js","FAQ",false],
    "impressum": ["impressum/impressum.html",null,"Impressum",false],
    "login": ["login/login.html","login/login_script.js","Login",false],
    "register": ["register/register.html","register/register_script.js","Register",false],
    "profile": ["profile/profile.html","profile/profile_script.js","Profile"],
    "game1": ["game_1/index.html", "game_1/src/main.js", "Minesweeper", true],
    "game2": ["game_2/index.html", "game_2/index.js", "FlappyBird", true],
    "manageUsers":["users/users.html","users/users_script.js","Manage Users",false]
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

        }else{
            entry.target.classList.remove("show");
        }
    })
})
//
// ---------------------dynamic loading of the page-----------------------------------------------

function loadPage(pageKey){

    if(pages_dictionary[pageKey] === undefined){
        console.error("Page key is missing");
        return;
    }

    document.title = pages_dictionary[pageKey][2];
    fetch(pages_dictionary[pageKey][0])
    .then(response => response.text())
    .then(html => {
        document.getElementById("content").innerHTML = html;

        if(pages_dictionary[pageKey][1] !== undefined && pages_dictionary[pageKey][1] !== null) {
            if (pages_dictionary[pageKey][3]) {
                import("./" + pages_dictionary[pageKey][1] + '?v=' + new Date().getTime())
                    .then(module => {
                    })
                    .catch(err => console.error("Module failed to load", err));
            } else {
                const script = document.createElement("script");
                script.src = pages_dictionary[pageKey][1];
                script.setAttribute("data-dynamic", "true");
                document.body.appendChild(script);
            }
        }
        animation();
    })
    .catch(error => {
        document.getElementById("content").innerHTML = "<p>Page not found.</p>";
        });
}


function animation(){
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(el => observer.observe(el));

}

function login(){
    updateNavbar();
    loadPage("homepage")
}

async function logout(){
    await fetch('/api/auth/logout.php');
    loadPage("homepage")
    location.reload(); 
}

async function getLoginStatus(){
    let resp = await fetch("/api/auth/get_login_status.php");
    return await resp.json();
}

async function updateNavbar(){
    let loginData = await getLoginStatus();
    if(!loginData.status) return;

    let loginLink = document.getElementById("login-link");
    loginLink.innerText = "Profile";
    loginLink.onclick = () => {loadPage("profile")}

    let navBar = document.getElementById("navbar-links");

    let logoutLinkLi = document.createElement("li");
    logoutLinkLi.classList.add("nav-item");
    let logoutLink = document.createElement("a");
    logoutLink.classList.add("nav-link");
    logoutLink.innerText = "Logout";
    logoutLink.href = "#";
    logoutLink.onclick = () => {
        logout();
    }

    logoutLinkLi.appendChild(logoutLink);

    if(loginData.isAdmin){
        let manageUsersLi = document.createElement("li");
        manageUsersLi.classList.add("nav-item");
        let manageUsersLink = document.createElement("a");
        manageUsersLink.classList.add("nav-link");
        manageUsersLink.innerText = "Users";
        manageUsersLink.href = "#";
        manageUsersLink.onclick = () => {
            loadPage("manageUsers");
        }

        manageUsersLi.appendChild(manageUsersLink);
        navBar.appendChild(manageUsersLi);
    }

    navBar.appendChild(logoutLinkLi);
}

function uploadScore(userID, gameID, difficultyID, score){
    let formData = new FormData();
    formData.append("userID",userID);
    formData.append("gameID",gameID);
    formData.append("difficultyID",difficultyID);
    formData.append("score", score);
    fetch("../../api/scores/upload_game_score.php", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
        })
}


loadPage("homepage");
updateNavbar();
