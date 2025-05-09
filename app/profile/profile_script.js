
async function handleProfile(){
    const userID = sessionStorage.getItem("userID");
    const formData = new FormData();
    formData.append("userID", userID);
    let userEmail;
    let userFirstName;
    let userLastName;
    let score;
    try{
        let response = await fetch("../api/auth/get_user_data.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(response.success){
            userEmail = response.Email;
            userFirstName = response.FirstName;
            userLastName = response.LastName;
            let UserFirstNameInput = document.getElementById("UserFirstName");
            let UserlastNameInput = document.getElementById("UserLastName");
            let UserEmailInput = document.getElementById("UserEmail");
        
            UserFirstNameInput.value = userFirstName;
            UserlastNameInput.value = userLastName;
            UserEmailInput.value = userEmail;

            const scoreContainer = document.getElementById("ScoreContainer");
            scoreContainer.innerHTML = "";

            if (Array.isArray(response.Scores) && response.Scores.length > 0) {
                response.Scores.forEach(scoreObj => {
                    const div = document.createElement("div");
                    div.classList.add("scoreObj");
                    div.textContent = `${scoreObj.Title}: ${scoreObj.Score}`;
                    scoreContainer.appendChild(div);
                });

            } else {
                scoreContainer.textContent = "No scores found.";
            }
            const favGameSpan = document.getElementById("FavoriteGameSpan");
            favGameSpan.textContent = response.FavoriteGame || "None";
        }
        else{
            alert(response.error);
        }
    }catch(error){
        console.error("Login failed: ", error);
    }
}
handleProfile();

async function EditData(){
    let UserFirstNameInput = document.getElementById("UserFirstName");
    let UserlastNameInput = document.getElementById("UserLastName");
    let UserEmailInput = document.getElementById("UserEmail");
    const userID = sessionStorage.getItem("userID");
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("FirstName", UserFirstNameInput.value);
    formData.append("LastName", UserlastNameInput.value);
    formData.append("Email", UserEmailInput.value);

    try{
        let response = await fetch("../api/auth/update_user_data.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(!response.success){
            alert(response.error);
        }
        else{
            alert("Data updated");
        }
    }catch(error){
        console.error("Login failed: ", error);
    }

}