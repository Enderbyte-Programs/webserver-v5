<?php

//NOTICE!! DELETE THIS
error_reporting(E_ALL);
ini_set('display_errors', '1');

require("env.php");
$data = $_GET["data"];
echo decrypt_rot_rot($data);