<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Enderbyte Programs</title>
</head>
<body>
    <h1 style="text-align: center;">Enderbyte Programs Server</h1>
    <p style="text-align: center;">This page has web apps and video downloads!</p>
    <hr />
    <h2 style="text-align: center;"><span style="background-color: #999999;"><a style="background-color: #999999;" title="Go to video downloads" href="/downloads"><span style="text-decoration: underline;"><em><strong><span style="background-color: #ff99cc;">Go to video downloads</span></strong></em></span></a></span></h2>
    <p style="text-align: center;">Download some random videos. Go to /downloads/videos/private an input a password to get access to private videos.</p>
    <hr />
    <h2 style="text-align: center;"><a title="Go to my main website" href="https://enderbyteprograms.weebly.com"><span style="text-decoration: underline;"><em><strong><span style="background-color: #ffcc99;">Go to my main website</span></strong></em></span></a></h2>
    <p style="text-align: center;">My main website looks nicer and has download links to my software</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="Check out my web apps" href="/apps"><span style="background-color: #ccffff;">Check out my web apps</span></a></strong></span></em></h2>
    <p style="text-align: center;">I am starting to write some web apps. Check them out here</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="Check out my GitHub" href="https://github.com/Enderbyte-Programs"><span style="background-color: #ccffcc;">Check out my GitHub</span></a></strong></span></em></h2>
    <p style="text-align: center;">All source code for all of my apps is hosted here</p>
    <hr />

    <?php
        $filepath = "usercount.txt";
        $file = fopen($filepath,"r");
        $count = fread($file,filesize($filepath));
        fclose($file);

        $count++;

        echo sprintf("<p style=\"text-align: center;\"><strong>YOU ARE VIEWER %s TO THIS WEBSITE.</strong></p>",$count);

        $wfile = fopen($filepath,"w");
        fwrite($wfile,$count);
        fclose($wfile);
    ?>
</body>
</html>