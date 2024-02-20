<?php

//Usage:
//?user=username&password=HASH
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "localhost";
$username = "root";
$password = "EnderbytePrograms4ever";
$conn = mysqli_connect($servername,$username,$password,"ep") or die("error");//Log in to Enderbyte Programs database as Supreme Leader
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  } else {
    $result = $conn->query("select * from nodes");
    while($row = $result->fetch_assoc()) {
        echo $row["lat"] . " " . $row["lon"];
    }
    //$conn->query("SELECT * FROM `accounts`");
    $conn->close();
  }