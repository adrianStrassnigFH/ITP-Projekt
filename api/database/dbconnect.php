<?php
require_once "dbaccess.php";
/** @var string $host */
/** @var string $user */
/** @var string $password */
/** @var string $database */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$db_obj = new mysqli($host, $user, $password, $database);
if ($db_obj->connect_error) {
    echo "Connection Error: " . $db_obj->connect_error;
    exit();
}
