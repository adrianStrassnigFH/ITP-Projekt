<?php
require_once "../database/dbconnect.php";

header("Content-Type: application/json");
$response = [];


$sql = "SELECT UserID,Email,FirstName, LastName, isAdmin FROM User";
$stmt = $db_obj->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

$users = [];

if($result->num_rows == 0){
    $response["error"] = "No users found";
} else {
    while($user = $result->fetch_object()){
        $users[] = $user;
    }
    $response["success"] = true;
    $response["users"] = $users;
}

$stmt->close();

echo json_encode($response);
exit;
