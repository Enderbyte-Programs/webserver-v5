<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What File is That?</title>
    <script src="/lib/jquery.js"></script>
    <script> $(function () { $("#includedContent").load("/apps/head.html"); });</script> <!--Import header using Jquery-->
</head>
<body>
    <div id="includedContent"></div><!--Remember! Copy this-->
    <hr>
    <h1>What File is That?</h1>
    <p>Find out what that file or process is on your computer</p>
    <hr>

    <?php
        function page_title($url) {
            $fp = file_get_contents($url);
            if (!$fp) 
                return null;

            $res = preg_match("/<title>(.*)<\/title>/siU", $fp, $title_matches);
            if (!$res) 
                return null; 

            // Clean up title: remove EOL's and excessive whitespace.
            $title = preg_replace('/\s+/', ' ', $title_matches[1]);
            $title = trim($title);
            return $title;
        }
        foreach (scandir(".") as $fname) {
            if (str_ends_with($fname,"index.php") || str_ends_with($fname,"template.html")) {

            } else {
                $pt = page_title($fname);
                echo "<a href=\"$fname\">$pt</a><br>";
            }
        }
    ?>
</body>
</html>