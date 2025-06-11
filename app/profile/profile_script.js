
async function handleProfile(){
    let loginData = await getLoginStatus();
    const userID = loginData.userID;
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
    let loginData = await getLoginStatus();
    const userID = loginData.userID;
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
function CreateChangePsswdField() {
  const editPsswdDiv = document.getElementById("ChangePsswdDiv");

  if (editPsswdDiv.classList.contains("show")) {
    editPsswdDiv.classList.remove("show");
    editPsswdDiv.classList.add("hidden");
  } else {
    editPsswdDiv.classList.remove("hidden");
    editPsswdDiv.classList.add("show");
  }
}

async function CheckUserPasswd(){
    const oldUserPsswd = document.getElementById("UserOldPsswd");
    let loginData = await getLoginStatus();
    const userID = loginData.userID;
    const newUserPsswd = document.getElementById("UserNewPsswd");
    if(oldUserPsswd.value.trim() !== "" && newUserPsswd.value.trim() !== ""){

        const formData = new FormData();
        formData.append("userID", userID);
        formData.append("password", oldUserPsswd.value);

            let response = await fetch("../api/auth/check_user_passwd.php", {
                method: "POST",
                body: formData,
            })
            response = await response.json();
            if(!response.success){
                alert(response.error);
            }
            else{
               await UpdatePassword();
               alert("Password updated");
            }
    }else{
        alert("old- or new password is empty");
    }
}

async function UpdatePassword(){
    const newUserPsswd = document.getElementById("UserNewPsswd");
    let loginData = await getLoginStatus();
    const userID = loginData.userID;

    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("password", newUserPsswd.value);

    try{
        let response = await fetch("../api/auth/update_user_passwd.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(!response.success){
            alert(response.error);
        }
        else{
            alert("Password updated");
        }
    }catch(error){
        console.error("Login failed: ", error);
    }
}