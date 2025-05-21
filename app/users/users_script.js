
async function editUserData(userID){
    let UserFirstNameInput = document.getElementById('firstName'+userID);
    let UserlastNameInput = document.getElementById("lastName"+userID);
    let UserEmailInput = document.getElementById("email"+userID);
    let UserPasswordInput = document.getElementById("password"+userID);

    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("FirstName", UserFirstNameInput.value);
    formData.append("LastName", UserlastNameInput.value);
    formData.append("Email", UserEmailInput.value);
    formData.append("Password", UserPasswordInput.value)
    try{
        let response = await fetch("../api/admin/update_user_data.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(!response.success){
            alert(response.error);
            loadPage("manageUsers");
        }
        else{
            alert("Data updated");
            loadPage("manageUsers");
        }
    }catch(error){
        console.error("Login failed: ", error);
        loadPage("manageUsers");
    }
}

async function deleteUser(userID){
    if(isLoggedIn() == userID) {
        alert ("You can't delete yourself");
        return;
    }

    const formData = new FormData();
    formData.append("userID", userID);
    try{
        let response = await fetch("../api/admin/delete_user.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(!response.success){
            alert(response.error);
        }
        else{
            alert("User deleted");
            loadPage("manageUsers")
        }
    }catch(error){
        console.error("Update failed: ", error);
    }
}
async function buildUserTable(){
    try{
        let response = await fetch("../api/admin/get_all_user_data.php", {
            method: "POST",
        })
        response = await response.json();

        if(!response.success){
            console.error("Failed to fetch users: ", response.error);
            return;
        }

        const users = response.users;
        const userTable = document.getElementById("userTable");




        users.forEach(user => {
            userDiv = document.createElement("div");
            userDiv.className = "col-12 userRow";
            userDiv.innerHTML = ` 
                <input value="${user.FirstName}" class="userInput small" id="firstName${user.UserID}">
                <input value="${user.LastName}" class="userInput small" id="lastName${user.UserID}">
                <input value="${user.Email}" class="userInput big" id="email${user.UserID}">
                <input placeholder="new password" class="userInput" type="password" id="password${user.UserID}">
                ${user.isAdmin?"Admin":"User"}
                
                
                <button class="userButton" style="margin-left: auto" onclick="editUserData(${user.UserID})">Apply</button>
                <button class="userButton" onclick="deleteUser(${user.UserID})">Delete</button>
            `;
            userTable.appendChild(userDiv);
        })

    }catch(e){
        console.error("Failed to fetch users: ", e);
    }
}


buildUserTable();