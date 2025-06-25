<?php
function test_input($data): string
{
    $data = trim($data); // removes spaces,tabs,newlines
    $data = stripslashes($data); // removes slashes /
    $data = htmlspecialchars($data); // checks if html code is within, returns empty string if found
    return $data;
}

function isEmailTaken($email,$connection): bool
{
    $sql = 'SELECT * FROM User WHERE Email=?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("s",$email);
    $stmt->execute();

    $stmt->store_result();
    $isTaken = $stmt->num_rows() == 1;
    $stmt->close();
    return $isTaken;
}

function getEmailByUserId($userId, $db_obj) {
    $sql = "SELECT Email FROM User WHERE UserID = ?";
    $stmt = $db_obj->prepare($sql);
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stmt->close();
        return $row["Email"];
    }

    $stmt->close();
    return null; // Return null if user not found
}