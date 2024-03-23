<?php

require("env.php");

$name = $_GET["name"] or die("E2");
$name = escape_things($name);
$password = $_GET["pwd"] or die("E2");
$password = decrypt_rot_rot($password);
$password = escape_things($password);

$pname = escape_things($_GET["pname"]) or die("E2");

$dbname = get_db_by_pasword($name,$password) or die("E3");
$conn = new mysqli($server_name,$dbname,$password) or die("E3");
$conn->select_db($dbname);
$conn->query("update products set active = !active where name like '$pname'") or die("E3");

$conn->close();

echo "G0";