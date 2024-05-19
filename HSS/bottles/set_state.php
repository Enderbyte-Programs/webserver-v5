<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

$newstate = $_GET["state"];
$route = $_GET["route"];
$server_name = "localhost";
$username = "root";
$password = "EnderbytePrograms4ever";

$conn = new mysqli($server_name,$username,$password,"HSS");
$conn->query("update SimpleRoutes set done=$newstate where name like '$route'");

$conn->close();