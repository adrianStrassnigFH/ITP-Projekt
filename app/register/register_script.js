
async function handleRegister(){
    const formData = new FormData();
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const password_confirmation = document.getElementById("passwordWH").value.trim();

    if(fname === '' || lname === '' || email === '' || password === '' || password_confirmation === ''){
        alert("Please enter a valid data");
        return;
    }

    if(password !== password_confirmation){
        alert("Passwords don't match");
        return;
    }

    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", password);

    try{
        let response = await fetch("/api/auth/register.php", {
            method: "POST",
            body: formData,
        })

        response = await response.json();
        if(response.success){
            login(response.userID);
        }
        else{
            alert(response.error);
        }
    }catch(error){
        console.error("Registration failed: ", error);
    }
}


document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegister();
} );