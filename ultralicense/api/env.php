<?php

$db_admin_password = "EnderbytePrograms4ever";
$server_name = "localhost";

/*
Errors List

E1: There was an error connecting to the databse
E2: There was an error parsing your args
E3: there was an error executing a query
E4: There was an error selecting a database.
*/
function escape_things($input) {
    $result = str_replace("\"","\\\"",$input);//Can't have any mean hackers HACKING my SQL!
    $result = str_replace("'","\\'",$result);
    $result = str_replace("%","\\%'",$result);
    $result = str_replace("_","\\_'",$result);
    $result = str_replace("[","\\[",$result);
    return $result;
}

function de_escape($input) {
    $result = $input;
    $result = str_replace("\\'","'",$result);
    $result = str_replace("\\%","%'",$result);
    $result = str_replace("\\_","_'",$result);
    $result = str_replace("\\[","[",$result);
    $result = str_replace("\\\"","\"",$result);
    return $result;
}

function extract_data($sqli) {
    $result = array();
    if ($sqli->num_rows > 0) {
        // output data of each row
        while($row = $sqli->fetch_assoc()) {
            $temp = array();
            foreach ($row as $key => $value) {
                $temp[$key] = $value;
            }
            array_push($result,$temp);
               
        }
    }
    return $result;
}

function decrypt_rot_rot($data) {
    $chars = explode("","1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
    $ri = -1;
    $final = array();
    foreach (explode("",$data) as $key => $value) {
        $ri++;
        $loc = array_search($value,$chars);
        if (!$loc) {
            array_push($final,$value);
        } else {
            $offset = $loc - $ri;
            $nc = $chars[$offset % count($chars)];
            array_push($final,$nc);
        }
    }
    return $final;
}