<?php

$rootdir = "/home/jordan/master_web" . "/apps/forwards";
$dir = $_GET['name'] or die("Not found");

$finaldir = $rootdir . "/" . $dir . "/usercount.txt";
$file = fopen($finaldir,'r');
$data = fread($file,filesize($finaldir));
fclose($file);
echo($data);