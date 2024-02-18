<?php
//This checks if directory is available
$rootdir = $_SERVER['DOCUMENT_ROOT'] . "/apps/forwards";
$needle = $_GET['dir'] or die("-1");

function scont($haystack,$needle) {
    if (strpos($haystack, $needle) !== false) {
        return true;
    } else {
        return false;
    }
    
}

if (scont($needle,"/") || scont($needle,"\\") || scont($needle,"<") || scont($needle,">") || scont($needle,"{") || scont($needle,"}") || scont($needle,"^")) {
    die("-1");//Bad character
}
//No dir? No way!
if (is_dir($rootdir . "/" . $needle)) {
    echo "0";
} else {
    echo "1";
}
//-1: There was an error
//0: Directory is not available
//1: Directory is available