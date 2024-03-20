<?php

require("env.php");
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

$name = $_GET["name"] or die("E2");
$name = escape_things($name);
$password = $_GET["pwd"] or die("E2");
$password = decrypt_rot_rot($password);
$password = escape_things($password);

$conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
$conn->select_db("ul_master") or die("E4");
if (count(extract_data($conn->query("select * from companies where name like '$name' and password like '$password'"))) > 0) {
    $conn->query("update companies set lastLoginTime=NOW() where name like '$name'") or die("E3");
} else {
    die("E5");
}
$conn->close();

echo "G0";