<?php

$rootdir = "/home/jordan/master_web" . "/apps/forwards";
//var_dump($_POST);
$dir = $_POST['dir'] or die("-2");
$fwd = $_POST['link'] or die("-1");

$template = $rootdir . "/template.php";
$file = fopen($template,'r');
$templatedata = fread($file,filesize($template));
fclose($file);

$ntd = str_replace("##LINK!",$fwd,$templatedata);
$ndir = $rootdir . "/" . $dir;

if (is_dir($ndir)) {
    die("0");
} else {
    mkdir($ndir);
    $wfile = fopen($ndir . "/index.php",'w');
    fwrite($wfile,$ntd);
    fclose($wfile);
    $qfile = fopen($ndir . "/usercount.txt",'w');
    fwrite($qfile,"0");
    fclose($qfile);
    echo "1";
}