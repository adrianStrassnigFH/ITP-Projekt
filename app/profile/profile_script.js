
async function handleProfile(){
    const userID = sessionStorage.getItem("userID");
    const formData = new FormData();
    formData.append("userID", userID);
    let userEmail;
    let userFirstName;
    let userLastName;
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
        }
        else{
            alert(response.error);
        }
        let UserFirstNameInput = document.getElementById("UserFirstName");
        let UserlastNameInput = document.getElementById("UserLastName");
        let UserEmailInput = document.getElementById("UserEmail");
    
        UserFirstNameInput.value = userFirstName;
        UserlastNameInput.value = userLastName;
        UserEmailInput.value = userEmail;
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
    }catch(error){
        console.error("Login failed: ", error);
    }

}