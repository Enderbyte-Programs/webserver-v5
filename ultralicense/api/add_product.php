<?php

require("env.php");
error_reporting(E_ALL);
ini_set('display_errors', '1');

$name = $_GET["name"] or die("E2");
$name = escape_things($name);
$password = $_GET["pwd"] or die("E2");
$password = decrypt_rot_rot($password);
$password = escape_things($password);

$pname = escape_things($_GET["pname"]) or die("E2");
$pdt = escape_things($_GET["pdt"]);

//$conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
//$conn->select_db("ul_master") or die("E4");

$dbname = get_db_by_pasword($name,$password) or die("E3");
$conn = new mysqli($server_name,$dbname,$password) or die("E3");
$conn->select_db($dbname);

$conn->query("insert into products values ('$pname','{}',FALSE,$pdt)") or die("E3");

$conn->close();

echo "G0";