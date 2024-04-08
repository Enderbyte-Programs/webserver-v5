<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Enderbyte Programs</title>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2494058265892846"
     crossorigin="anonymous"></script>
     <style>
        p {
            color: white;
        }
        h1 {
            color:white;
        }
     </style>
</head>
<body style="font-family: helvetica;background-image: url('/downloads/assets/background.png');">
    <h1 style="text-align: center;">Enderbyte Programs Server</h1>
    <p style="text-align: center;">This page has web apps and software downloads!</p>
    <hr />
	<h2 style="text-align: center;"><a title="My Software" href="/software.html"><span style="text-decoration: underline;"><em><strong><span style="background-color: #ff9999;">My Software</span></strong></em></span></a></h2>
    <p style="text-align: center;">My best software that you should download</p>
    <hr />
    <h2 style="text-align: center;"><a title="Go to my other website" href="https://enderbyteprograms.weebly.com"><span style="text-decoration: underline;"><em><strong><span style="background-color: #ffcc99;">Go to my main website</span></strong></em></span></a></h2>
    <p style="text-align: center;">My other website looks nicer and has download links to all my software, even the bad ones</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="Check out my web apps" href="/apps"><span style="background-color: #ccffff;">Check out my web apps</span></a></strong></span></em></h2>
    <p style="text-align: center;">I am starting to write some web apps. Check them out here</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="Check out my GitHub" href="https://github.com/Enderbyte-Programs"><span style="background-color: #ccffcc;">Check out my GitHub</span></a></strong></span></em></h2>
    <p style="text-align: center;">All source code for all of my apps is hosted here</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="About Us / Contact Us" href="/about.html"><span style="background-color: #ddccff;">About Us / Contact Us</span></a></strong></span></em></h2>
    <p style="text-align: center;">Contact Enderbyte Programs. Also see information about Enderbyte Programs</p>
    <hr />
    <h2 style="text-align: center;"><em><span style="text-decoration: underline;"><strong><a title="What File is that?" href="/blogs/whatfile/index.php"><span style="background-color: #ffffff;">What File is That?</span></a></strong></span></em></h2>
    <p style="text-align: center;">Find out about files you find in your task manager or file explorer</p>
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
	<p>Privacy Policy: <a href="/privacy.html">here</a></p>
</body>
</html>
