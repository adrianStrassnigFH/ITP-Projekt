async function handleLogin(){

    const formData = new FormData();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email === '' || password === ''){
        // alert("Please enter a valid data");
        showNotification("Please enter valid data",'error' );
        return;
    }

    formData.append("email", email);
    formData.append("password", password);

    try{
        let response = await fetch("../api/auth/login.php", {
            method: "POST",
            body: formData,
        })

        response = await response.json();
        if(response.success){
            login();
        }
        else{
            // alert(response.error);
            showNotification(response.error, 'error');

        }
    }catch(error){
        console.error("Login failed: ", error);
    }
}

document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin();
} );