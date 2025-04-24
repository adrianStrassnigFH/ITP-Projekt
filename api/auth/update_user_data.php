<?php
require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"];
$userFirstName = $_POST["FirstName"];
$userLastName = $_POST["LastName"];
$userEmail = $_POST["Email"];

if(!$userId ){
    $response["error"] = "UserID is null.";
    echo json_encode($response);
    exit;
}

$sql = "UPDATE User SET FirstName = ?, LastName = ?, Email = ? WHERE UserID =?;";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("ssss",$userFirstName, $userLastName, $userEmail, $userId);
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
}

$stmt->close();
echo json_encode($response);
exit;

?>