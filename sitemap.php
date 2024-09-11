<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Map</title>
</head>
<body>
    <h1>Site Map</h1>
    <?php
        function getDirContents($dir, &$results = array()) {
            $files = scandir($dir);
            $forbiddenpaths = [".git","hosted","Videos","assets"];
        
            foreach ($files as $key => $value) {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (!is_dir($path)) {
                    $results[] = $path;
                } else if ($value != "." && $value != "..") {
                    getDirContents($path, $results);
                    $results[] = $path;
                }
            }
            $final = array();
            foreach ($results as $fls) {
                $br = false;
                foreach ($forbiddenpaths as $forbiddenpath) {
                    if (str_contains($fls,$forbiddenpath)) {
                        $br = true;
                    } 
                }
                if (!str_contains($fls,".html")) {
                    $br = true;
                }
                if ($br) {
                    continue;
                } else {
                    array_push($final,str_replace("/home/jordan/master_web","",$fls));
                }
            }
            return $final;
        }

        $files = getDirContents(".");
        foreach ($files as $path) {
            echo "<a href='$path'>$path</a>";
            echo "<br>";
        }
    ?>
</body>
</html>