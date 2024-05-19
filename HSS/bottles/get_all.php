<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$server_name = "localhost";
$username = "root";
$password = "EnderbytePrograms4ever";

$conn = new mysqli($server_name,$username,$password,"HSS");
$result = $conn->query("select * from SimpleRoutes");

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      //$row is array
        echo $row["done"].";".$row["name"].";;";
    }
}

$conn->close();