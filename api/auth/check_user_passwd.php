<?php

require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = test_input($_POST["userID"]);
$password = test_input($_POST["password"]);

// Check if all filter have been passed
if(!$password){
    $response["error"] = "Missing required fields.";
    echo json_encode($response);
    exit;
}

$sql = "SELECT Password FROM User where UserID=?";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("s",$userId);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows == 0){
    $response["error"] = "No user with this userId found";
    $stmt->close();
    echo json_encode($response);
    exit;
}


$user = $result->fetch_object();
if(password_verify($password,$user->Password)){
    $response["success"] = true;
}else{
    $response["error"] = "Old password is not correct";
}

$stmt->close();
echo json_encode($response);
exit;

?>