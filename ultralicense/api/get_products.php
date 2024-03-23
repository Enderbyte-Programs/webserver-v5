<?php

require("env.php");
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

$name = $_GET["name"] or die("E2");
$name = escape_things($name);
$password = $_GET["pwd"] or die("E2");
$password = decrypt_rot_rot($password);
$password = escape_things($password);

//$conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
//$conn->select_db("ul_master") or die("E4");

$dbname = get_db_by_pasword($name,$password);
$conn = new mysqli($server_name,$dbname,$password);
$conn->select_db($dbname);
$data = extract_data($conn->query("select * from products")) or die("E3");
echo "G";
foreach ($data as $row) {
    $n = scescape($row["name"]);
    $a = scescape(convert_b_t_s($row["active"]));
    $dt = scescape($row["defaultType"]);

    echo "$n;$a;$dt;;";
}

$conn->close();

