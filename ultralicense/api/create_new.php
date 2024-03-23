<?php

require("env.php");
error_reporting(E_ALL);
ini_set('display_errors', '1');

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
$hashpassword = sha256($secretpassword);

$conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
$conn->select_db("ul_master") or die("E4");
if (count(extract_data($conn->query("select * from companies where name like '$name'"))) == 0) {
    $conn->query("insert into companies (name,registerTime,lastLoginTime,password) values ('$name',NOW(),NOW(),'$secretpassword')") or die("E3");
    $id = extract_data($conn->query("select id from companies where name like '$name'"))[0]["id"] or die("E3");
    $ndbname = "ul_".$id;
    $conn->query("update companies set dbname='$ndbname' where name like '$name'") or die("E3");
    $conn->query("
    create database $ndbname;
    ") or die("E3");
    $conn->select_db($ndbname) or die("E4");
    $conn->query("
    create table products (
        name text,
        config text,
        active bool,
        defaultType int
    );
    
    ") or die("E3");
    $conn->query("
    create table licenses (
        parentProduct text,
        data text,
        expires datetime,
        used bool,
        identifier text,
        onTrial bool,
        lastUsed datetime,
        allowDouble bool,
        keyType int
    );
    ");
    //GRANT ALL PRIVILEGES ON *.* TO 'db_user'@'localhost' IDENTIFIED BY 'P@s$w0rd123!';
    $conn->query("GRANT ALL PRIVILEGES ON $ndbname.* TO '$ndbname'@'$server_name' IDENTIFIED BY '$secretpassword';") or die("E3");
} else {
    die("E5");
}
$conn->close();

echo "G$secretpassword;$name";