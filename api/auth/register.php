<?php
$fname = test_input($_POST["fname"]);
$lname = test_input($_POST["lname"]);
$email = test_input($_POST["email"]);
$password = test_input($_POST["password"]);
$registerSuccess = TRUE;

// Check if all filter have been passed
if($fname && $lname && $email  && $password ){
    $registerSuccess = FALSE;
}

if(isUsernameTaken($username,$connection)){
    $_GET["usernameError"] = true;
    $registerSuccess = false;
}


if(!$registerSuccess) {
    $_GET["page"]="REGISTER";
    $_GET["actionFailure"] = true;
}
else{
    $stmt = $connection->prepare("INSERT INTO users (username, password, email, isAdmin, isActive, fname, lname, salutationID_FK) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $dbPassword = password_hash($password,PASSWORD_DEFAULT);
    $dbIsAdmin = 0;
    $dbIsActive = 1;
    $stmt->bind_param("sssiissi", $username, $dbPassword, $email, $dbIsAdmin, $dbIsActive, $fname, $lname, $salutation);
    $stmt->execute();
    $stmt->close();
    make_login($username);
}