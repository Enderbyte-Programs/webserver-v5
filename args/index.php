<!DOCTYPE html>
<html lang="en">

<head>
    <script src="/lib/jquery.js"></script>
    <script> $(function () { $("#includedContent").load("/apps/head.html"); });</script> <!--Import header using Jquery-->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Argument Test</title>
</head>

<body>
    <div id="includedContent"></div><!--Remember! Copy this-->
    <h2>GET args recieved:</h2>
    <?php
        foreach ($_GET as $key => $value) {
            echo "<p>" . $key . "=".$value. "</p>";
        }
    ?>
</body>

</html>