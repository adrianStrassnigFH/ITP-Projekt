<?php
require_once "../database/dbconnect.php";
header("Content-Type: application/json");
$response = [];

$userId = $_POST["userID"] ?? null;

if (!$userId) {
    $response["error"] = "UserID is required.";
    echo json_encode($response);
    exit;
}

$sql = "DELETE FROM User WHERE UserID = ?";
$stmt = $db_obj->prepare($sql);
$stmt->bind_param("s", $userId);
$stmt->execute();

if ($stmt->affected_rows === 0) {
    $response["error"] = "User not found or could not be deleted.";
} else {
    $response["success"] = true;
}

$stmt->close();
echo json_encode($response);
exit;
?>
