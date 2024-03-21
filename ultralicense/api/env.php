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

function scescape($input) {
    return str_replace(";","#SC",$input);
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

function mod($x,$n) {
    $r = $x % $n;
    if ($r < 0)
    {
        $r += abs($n);
    }
    return $r;
}

function decrypt_rot_rot($data) {
    $chars = str_split("1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM");
    $ri = -1;
    $final = array();
    foreach (str_split($data) as $key => $value) {
        $ri++;
        $loc = array_search($value,$chars);
        if (!$loc) {
            array_push($final,$value);
        } else {
            $offset = $loc - $ri;
            $nc = $chars[mod($offset, count($chars))];
            array_push($final,$nc);
        }
    }
    return join($final);
}

function get_db_by_pasword($name,$password) {
    global $server_name,$db_admin_password;
    $conn = new mysqli($server_name,"root",$db_admin_password) or die("E1");
    $conn->select_db("ul_master") or die("E4");
    $data = extract_data($conn->query("select dbname from ul_master.companies where name like '$name' and password like '$password' "));
    try {
    $dbn = $data[0]["dbname"];
    } catch(Exception) {
        die("E3");
    }
    $conn->close();
    return $dbn;
}