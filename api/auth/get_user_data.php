<?php
require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"];

if(!$userId ){
    $response["error"] = "UserID is null.";
    echo json_encode($response);
    exit;
}

$sql = "SELECT Email,FirstName, LastName FROM User where UserID=?";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("s",$userId);
$stmt->execute();
$result = $stmt->get_result();

if($result->num_rows == 0){
    $response["error"] = "Invalid login credentials";
    $stmt->close();
    echo json_encode($response);
    exit;
}else{
    $user = $result->fetch_object();
    $response["success"] = true;
    $response["Email"] = $user->Email;
    $response["FirstName"] = $user->FirstName;
    $response["LastName"] = $user->LastName;
}

$stmt->close();
echo json_encode($response);
exit;

?>