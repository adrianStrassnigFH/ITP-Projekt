function initparallax(){
    let parallax = document.getElementById("welcome-section");
    if(!parallax) return;
    window.addEventListener("scroll", function(){
        let offset = window.scrollY;
        parallax.style.backgroundPositionY = `${offset * 0.8}px`

    })

}

async function updateScoreboard(difficultyID){
    for(let i = 1; i <= 3; i++){
        try{
            const formData = new FormData();
            const scoreContainer = document.getElementById("scores"+i.toString());
            scoreContainer.querySelectorAll('.scoreObj').forEach(el => el.remove());

            formData.append("gameID", i);
            formData.append("difficultyID", difficultyID)

            let response = await fetch("../api/scores/get_game_score.php", {
                method: "POST",
                body: formData,
            })
            response = await response.json();

            if (Array.isArray(response.Scores) && response.Scores.length > 0) {
                response.Scores.forEach(scoreObj => {
                    const div = document.createElement("div");
                    div.classList.add("scoreObj");
                    div.textContent = `${scoreObj.FirstName}: ${scoreObj.Score}`;
                    scoreContainer.appendChild(div);
                });

            } else {
                const div = document.createElement("div");
                div.classList.add("scoreObj");
                div.textContent = `No scores yet`;
                scoreContainer.appendChild(div);
            }

        }catch(error){
            console.error("Scoreboard fetch failed: ", error);
        }
    }

}

let difficultySelect = document.getElementById("difficultySelect");
difficultySelect.addEventListener("change", (event) => {
    updateScoreboard(difficultySelect.value);
})

initparallax();
updateScoreboard(difficultySelect.value);