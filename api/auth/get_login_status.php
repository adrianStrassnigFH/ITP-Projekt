<?php

session_start();

if(!isset($_SESSION['userID'])) {
    echo json_encode(["status" => false]);
    exit;
}

$isAdmin = $_SESSION['isAdmin'];

echo json_encode(["status" => true, "isAdmin" => $isAdmin, "userID" => $_SESSION['userID']]);