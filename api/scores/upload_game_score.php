<?php

require_once "../database/dbconnect.php";

header("Content-Type: application/json");
$response = [];

$userID = $_POST["userID"];
$gameID = $_POST["gameID"];
$difficultyID = $_POST["difficultyID"];
$score = $_POST["score"];

// TODO Update if already exists

$sqlScores = "insert into Scoreboard (UserID_FK, GameID_FK, DifficultyID_FK, Score) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE Score = VALUES(Score)";
$stmtScores = $db_obj->prepare($sqlScores);
$stmtScores->bind_param("iiii",$userID, $gameID, $difficultyID, $score );
$stmtScores->execute();
$stmtScores->close();
$response["success"] = true;

echo json_encode($response);
exit;