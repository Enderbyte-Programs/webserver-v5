<?php

//Usage:
//?user=username&password=HASH
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "localhost";
$username = "root";
$password = "EnderbytePrograms4ever";

$nu = $_GET["user"] or die("-1");
$np = $_GET["password"] or die("-1");
$conn = mysqli_connect($servername,$username,$password,"ep") or die("error");//Log in to Enderbyte Programs database as Supreme Leader
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } else {
    $conn->query("
    IF NOT EXISTS 
        (SELECT * FROM accounts 
        WHERE username='".$nu."') 
    THEN
        INSERT INTO `accounts` (`username`,`password`,`lastlogin`,`visits`,`perms`) 
        VALUES ('".$nu."','".$np."',NOW(),0,0); 
    END IF;") 
    or die("Connection failed: " . $conn->connect_error);
    //$conn->query("SELECT * FROM `accounts`");
    $conn->close();
  }
