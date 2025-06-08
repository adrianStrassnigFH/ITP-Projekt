function initparallax() {
    let parallax = document.getElementById("welcome-section");
    if (!parallax) return;

    // Set initial background properties
    parallax.style.backgroundSize = '100%';
    const initialSize = 100; // Starting at 100% of container

    window.addEventListener("scroll", function() {
        let offset = window.scrollY;

        // Parallax effect (background moves slower than scrolling)
        parallax.style.backgroundPositionY = `${offset * 0.8}px`;

        // Scale effect (background grows as you scroll)
        const scaleAmount = Math.min(offset * 0.01, 50); // Limit to 50% increase
        const newSize = initialSize + scaleAmount;
        parallax.style.backgroundSize = `${newSize}%`;
    });
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

document.getElementById("difficultySelect").addEventListener("change", (event) => {
    updateScoreboard(difficultySelect.value);
})

initparallax();
updateScoreboard(difficultySelect.value);