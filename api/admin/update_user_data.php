<?php
require_once "../database/dbconnect.php";
require_once "../helper.php";

header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"];
$userFirstName = $_POST["FirstName"];
$userLastName = $_POST["LastName"];
$userEmail = $_POST["Email"];
$userPassword = $_POST["Password"];
$userIsAdmin = $_POST["isAdmin"];

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

if($userPassword){
    $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);
    $sql = "UPDATE User SET FirstName = ?, LastName = ?, Email = ?, Password = ?, isAdmin = ? WHERE UserID =?;";
    $stmt = $db_obj->prepare($sql);
    $stmt->bind_param("ssssis",$userFirstName, $userLastName, $userEmail, $userPassword,$userIsAdmin,$userId);
    $stmt->execute();
}else{
    $sql = "UPDATE User SET FirstName = ?, LastName = ?, Email = ?, isAdmin = ? WHERE UserID =?;";
    $stmt = $db_obj->prepare($sql);
    $stmt->bind_param("sssis",$userFirstName, $userLastName, $userEmail,$userIsAdmin,$userId);
    $stmt->execute();
}



if($stmt->affected_rows == 0){
    $response["error"] = "Nothing was updated";
}else{
    $response["success"] = true;
}

$stmt->close();
echo json_encode($response);
exit;

