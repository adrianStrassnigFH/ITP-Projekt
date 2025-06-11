<?php

require_once "../database/dbconnect.php";
require_once "../helper.php";

session_start();

header("Content-Type: application/json");
$response = [];

$email = test_input($_POST["email"]);
$password = test_input($_POST["password"]);

// Check if all filter have been passed
if(!$email || !$password){
    $response["error"] = "Missing required fields.";
    echo json_encode($response);
    exit;
}

$sql = "SELECT UserID,Email,Password,isAdmin FROM User where Email=?";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("s",$email);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows == 0){
    $response["error"] = "Invalid login credentials";
    $stmt->close();
    echo json_encode($response);
    exit;
}


$user = $result->fetch_object();
if(password_verify($password,$user->Password)){
    $response["success"] = true;
    $_SESSION["userID"] = $user->UserID;
    $_SESSION["isAdmin"] = $user->isAdmin;
}else{
    $response["error"] = "Invalid login credentials";
}

$stmt->close();
echo json_encode($response);
exit;