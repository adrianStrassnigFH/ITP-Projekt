
async function editUserData(userID){
    let UserFirstNameInput = document.getElementById('firstName'+userID);
    let UserlastNameInput = document.getElementById("lastName"+userID);
    let UserEmailInput = document.getElementById("email"+userID);
    let UserPasswordInput = document.getElementById("password"+userID);
    let UserRoleInput = document.getElementById("role"+userID);

    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("FirstName", UserFirstNameInput.value);
    formData.append("LastName", UserlastNameInput.value);
    formData.append("Email", UserEmailInput.value);
    formData.append("Password", UserPasswordInput.value)
    formData.append("isAdmin", UserRoleInput? UserRoleInput.value: 1);
    try{
        let response = await fetch("../api/admin/update_user_data.php", {
            method: "POST",
            body: formData,
        })
        response = await response.json();
        if(!response.success){
            // alert(response.error);
            showNotification(response.error, 'error');
            loadPage("manageUsers");
        }
        else{
            // alert("Data updated");
            showNotification("Data updated", 'success');

            loadPage("manageUsers");
        }
    }catch(error){
        console.error("Login failed: ", error);
        loadPage("manageUsers");
    }
}

async function deleteUser(userID){
    let loginData = await getLoginStatus();
    if(loginData.userID === userID) {
        // alert ("You can't delete yourself");
        showNotification("You can't delete yourself", 'error');

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
            // alert(response.error);
            showNotification(`${response.error}`,'error');
        }
        else{
            // alert("User deleted");
            showNotification("User deleted", 'success');

            loadPage("manageUsers")
        }
    }catch(error){
        console.error("Update failed: ", error);
    }
}

async function addUser(){
    const formData = new FormData();
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const isAdmin = document.getElementById("role").value;

    if(fname === '' || lname === '' || email === '' || password === ''){
        // alert("Please enter valid data");
        showNotification("Please enter valid data", 'error');
        return;
    }

    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isAdmin", isAdmin);
    try{
        let response = await fetch("../api/auth/register.php", {
            method: "POST",
            body: formData,
        })

        response = await response.json();
        if(response.success){
            // alert("User created");
            showNotification("User created", 'success');
            loadPage("manageUsers");
        }
        else{
            // alert(response.error);
            showNotification(`${response.error}`,'error');

        }
    }catch(error){
        console.error("User creation failed: ", error);
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


        let loginData = await getLoginStatus();


        users.forEach(user => {
            userDiv = document.createElement("div");
            userDiv.className = "col-12 userRow";
            userDiv.innerHTML = ` 
                <input value="${user.FirstName}" class="userInput small" id="firstName${user.UserID}">
                <input value="${user.LastName}" class="userInput small" id="lastName${user.UserID}">
                <input value="${user.Email}" class="userInput big" id="email${user.UserID}">
                <input placeholder="new password" class="userInput" type="password" id="password${user.UserID}">
                
                ${user.UserID === loginData.userID ?"Admin":"" +
                '<select id="role'+user.UserID+ '" class="roleSelect">' +
                '<option value="0">User</option>' +
                '<option value="1"' + (user.isAdmin?"selected":"")+ '>Admin</option>' +
                '</select>'}
                
                
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