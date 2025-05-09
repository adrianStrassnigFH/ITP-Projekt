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


// Get scores and game titles
$sqlScores = "SELECT Game.Title, Scoreboard.Score FROM Scoreboard JOIN Game ON Scoreboard.GameID_FK = Game.GameID WHERE Scoreboard.UserID_FK = ?";
$stmtScores = $db_obj->prepare($sqlScores);
$stmtScores->bind_param("s", $userId);
$stmtScores->execute();
$resultScores = $stmtScores->get_result();

$response["Scores"] = [];
while ($row = $resultScores->fetch_assoc()) {
    $response["Scores"][] = $row;
}

$stmtScores->close();

// Fetch favorite game (just the title)
$sqlFavGame = "SELECT Game.Title 
               FROM Scoreboard 
               JOIN Game ON Scoreboard.GameID_FK = Game.GameID 
               WHERE Scoreboard.UserID_FK = ? 
               GROUP BY Game.Title 
               ORDER BY COUNT(*) DESC 
               LIMIT 1";
$stmtFav = $db_obj->prepare($sqlFavGame);
$stmtFav->bind_param("s", $userId);
$stmtFav->execute();
$resultFav = $stmtFav->get_result();

if ($fav = $resultFav->fetch_assoc()) {
    $response["FavoriteGame"] = $fav["Title"];
} else {
    $response["FavoriteGame"] = null;
}
$stmtFav->close();


echo json_encode($response);
exit;

?>