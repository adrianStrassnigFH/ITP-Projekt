<?php

require_once "../database/dbconnect.php";
require_once "../helper.php";
session_start();
header("Content-Type: application/json");
$response = [];

$fname = test_input($_POST["fname"]);
$lname = test_input($_POST["lname"]);
$email = test_input($_POST["email"]);
$password = test_input($_POST["password"]);
$isAdmin = test_input($_POST["isAdmin"]);

// Check if all filter have been passed
if(!$fname || !$lname || !$email || !$password){
    $response["error"] = "Missing required fields.";
    echo json_encode($response);
    exit;
}

if(isEmailTaken($email, $db_obj)){
    $response["error"] = "Email is already taken.";
    echo json_encode($response);
    exit;
}


$stmt = $db_obj->prepare("INSERT INTO User (isAdmin, Email, Password, FirstName, LastName) VALUES (?, ?, ?, ?, ?)");
$dbPassword = password_hash($password,PASSWORD_DEFAULT);
$stmt->bind_param("issss", $isAdmin, $email,$dbPassword,$fname, $lname);
if ($stmt->execute()) {
    $response["success"] = true;
    $userID = $db_obj->insert_id;
    $response["userID"] = $userID;
    $_SESSION["userID"] = $userID;
    $_SESSION["isAdmin"] = false;
} else {
    $response["error"] = "Database error: " . $stmt->error;
}

$stmt->close();
echo json_encode($response);
exit;