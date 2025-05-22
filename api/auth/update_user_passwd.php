<?php
require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"];
$newPassword = $_POST["password"];

if(!$userId ){
    $response["error"] = "UserID is null.";
    echo json_encode($response);
    exit;
}
if(!$newPassword ){
    $response["error"] = "Password is null.";
    echo json_encode($response);
    exit;
}

$sql = "UPDATE User SET Password = ? WHERE UserID =?;";
$stmt = $db_obj->prepare($sql);
$dbPassword = password_hash($newPassword,PASSWORD_DEFAULT);
$stmt->bind_param("ss",$dbPassword, $userId);
$stmt->execute();

if($stmt->affected_rows == 0){
    $response["error"] = "Nothing was updated";
}else{

    $response["success"] = true;
}

$stmt->close();
echo json_encode($response);
exit;

?>