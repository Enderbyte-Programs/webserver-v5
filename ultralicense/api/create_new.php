<?php

require("env.php");
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

$name = $_GET["name"] or die("E2");
$name = escape_things($name);

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}

$secretpassword = generateRandomString(16);

$conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
$conn->select_db("ul_master") or die("E4");
if (count(extract_data($conn->query("select * from companies where name like '$name'"))) == 0) {
    $conn->query("insert into companies (name,registerTime,lastLoginTime,password) values ('$name',NOW(),NOW(),'$secretpassword')") or die("E3");
} else {
    die("E5");
}
$conn->close();

echo "G$secretpassword";