<?php
require_once "../database/dbconnect.php";

header("Content-Type: application/json");
$response = [];

$gameID = $_POST["gameID"];
$difficultyID = $_POST["difficultyID"];

$sqlScores = "SELECT User.FirstName, Scoreboard.Score FROM Scoreboard JOIN User ON Scoreboard.UserID_FK = User.UserID WHERE Scoreboard.GameID_FK = ? AND Scoreboard.DifficultyID_FK = ?";
$stmtScores = $db_obj->prepare($sqlScores);
$stmtScores->bind_param("ii",$gameID, $difficultyID );
$stmtScores->execute();
$resultScores = $stmtScores->get_result();

$response["Scores"] = [];
while ($row = $resultScores->fetch_assoc()) {
    $response["Scores"][] = $row;
}

$stmtScores->close();

echo json_encode($response);
exit;