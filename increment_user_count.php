<?php

$file = fopen("usercount.txt","r");
$rdata = fread($file,filesize("usercount.txt"));
fclose($file);

$rdata = $rdata + 1;

$wf = fopen("usercount.txt","w");
fwrite($wf,$rdata);
fclose($wf);