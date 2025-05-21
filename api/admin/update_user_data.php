<?php
require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"];
$userFirstName = $_POST["FirstName"];
$userLastName = $_POST["LastName"];
$userEmail = $_POST["Email"];
$userPassword = password_hash($_POST["Password"], PASSWORD_DEFAULT) ;

if(!$userId ){
    $response["error"] = "UserID is null.";
    echo json_encode($response);
    exit;
}

if($userEmail !== getEmailByUserId($userId, $db_obj) && isEmailTaken($userEmail, $db_obj)){
    $response["error"] = "Email is already taken.";
    echo json_encode($response);
    exit;
}

$sql = "UPDATE User SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE UserID =?;";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("sssss",$userFirstName, $userLastName, $userEmail, $userPassword,$userId);
$stmt->execute();

if($stmt->affected_rows == 0){
    $response["error"] = "Nothing was updated";
}else{
    $response["success"] = true;
}

$stmt->close();
echo json_encode($response);
exit;

