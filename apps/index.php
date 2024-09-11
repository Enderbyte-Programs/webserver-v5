<!DOCTYPE php>
<html lang="en">
<head>
    <script src="/lib/jquery.js"></script> 
    <script> 
        $(function(){
          $("#includedContent").load("/apps/head.html"); 
        });
        </script> 
    <!--Import header using Jquery-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Apps</title>
</head>
<body style="font-family: helvetica;">
    <div id="includedContent"></div>
    <!--Remember! Copy this-->
    <h1 style="text-align: center;">My Web Apps</h1>
    <p style="text-align: center;">Here are some web apps I have created.</p>
    <hr />
    <p style="text-align: center;"><strong>The Big List:</strong></p>
    <ul>

        <?php
            function splitlines($ar) {
                return preg_split("/\r\n|\n|\r/", $ar);
            }

            $subdirs = array();
            $items = glob($_SERVER['DOCUMENT_ROOT'] . "/apps" . '/*');
            foreach ($items as $item) {
                
                if (is_dir($item)) {
                    array_push($subdirs,$item);
                }
            }
            foreach ($subdirs as $subdir) {
                $spath = $subdir . "/.epapp";
                if (is_file($spath)) {
                    $file = fopen($spath,"r");
                    $data = fread($file,filesize($spath));
                    fclose($file);

                    //Now process
                    $procdata = splitlines($data);
                    $title = $procdata[0];
                    $description = $procdata[1];
                    $strippedpath = str_replace($_SERVER['DOCUMENT_ROOT'],"",$subdir);

                    $inspath = $subdir . "/index.html";
                    echo sprintf("<li style=\"text-align: left;\">%s: %s <a 
                    title=\"Go to that web app\" href=\"%s\">CLICK HERE
                </a></li>",$title,$description,$strippedpath);
                }
            }
        ?>
    </ul>
</body>
</html>
