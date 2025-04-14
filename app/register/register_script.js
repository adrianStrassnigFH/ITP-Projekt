
function handleRegister(event){
    console.log("register event");
    // TODO client side validation

    // TODO server api call registration

    // TODO login
}


document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault();
    handleRegister();
} );