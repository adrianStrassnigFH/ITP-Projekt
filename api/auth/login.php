<?php

require_once "../database/dbconnect.php";
require_once "../helper.php";

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

$sql = "SELECT UserID,Email,Password FROM User where Email=?";
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
    $response["userID"] = $user->UserID;
}else{
    $response["error"] = "Invalid login credentials";
}

$stmt->close();
echo json_encode($response);
exit;