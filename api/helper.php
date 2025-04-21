<?php
function test_input($data)
{
    $data = trim($data); // removes spaces,tabs,newlines
    $data = stripslashes($data); // removes slashes /
    $data = htmlspecialchars($data); // checks if html code is within, returns empty string if found
    return $data;
}

function isEmailTaken($email,$connection){
    $sql = 'SELECT * FROM User WHERE Email=?';
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("s",$email);
    $stmt->execute();

    $stmt->store_result();
    $isTaken = $stmt->num_rows() == 1;
    $stmt->close();
    return $isTaken;
}