function handleLogin(event){
    sessionStorage.setItem("userID","1")
    console.log("login event");
}

document.getElementById("login").addEventListener("submit", (event) => {
    event.preventDefault();
    handleLogin(event);
} );