<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirect</title>
</head>
<body>
    <p>Redirecting...</p>
    <?php
        $filepath = "usercount.txt";
        $file = fopen($filepath,"r");
        $count = fread($file,filesize($filepath));
        fclose($file);
        $count++;
        $wfile = fopen($filepath,"w");
        fwrite($wfile,$count);
        fclose($wfile);

    ?>
    <script>window.location.href = "##LINK!";</script>
</body>
</html>