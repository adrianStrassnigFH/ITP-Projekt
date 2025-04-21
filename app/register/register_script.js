
function handleRegister(event){
    console.log("register event");
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


    fetch("/api/auth/register.php", {
        method: "POST",
        body: formData,
    }).then(response)

    // TODO server api call registration

    // TODO login
}


document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegister();
} );