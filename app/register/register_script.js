
async function handleRegister(){
    const formData = new FormData();
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password_confirmation = document.getElementById("passwordWH").value.trim();

    if(fname === '' || lname === '' || email === '' || password === '' || password_confirmation === ''){
        // alert("Please enter a valid data");
        showNotification("Please enter valid data",'error' );

        return;
    }

    if(password !== password_confirmation){
        showNotification("Passwords don't match",'error' );
        // alert("Passwords don't match");
        return;
    }

    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("isAdmin", "0")
    try{
        let response = await fetch("../api/auth/register.php", {
            method: "POST",
            body: formData,
        })

        response = await response.json();
        if(response.success){
            login();
        }
        else{
            // alert(response.error);
            showNotification(`${response.error}`, 'error');

        }
    }catch(error){
        console.error("Login failed: ", error);

    }
}


document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegister();
} );