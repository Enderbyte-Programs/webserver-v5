<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);

$sql_loc = "localhost";
$sql_db = "bottles";
$sql_user = "handsworth";
$sql_password = "hss4ever";
$sql_port = 3306;

function run_non_query($qs) {
    //Returns a bool, true if success
    global $sql_loc;
    global $sql_db;
    global $sql_user;
    global $sql_password;

    $c = new mysqli(
        $sql_loc,
        $sql_user,
        $sql_password,
        $sql_db
    );
    //$c->connect();
    $c->query($qs);
    $c->close();
    return true;
}

function encode_for_sql($input) {
    $input = str_replace("'","#SQ",$input);
    $input = str_replace("\"","#DQ",$input);
    return $input;
}

function decode_for_sql($input) {
    $input = str_replace("#SQ","'",$input);
    $input = str_replace("#DQ","\"",$input);
    return $input;
}

function tvconv($iv) {
    if ($iv == "1") {
        return true;
    } elseif ($iv == "0") {
        return false;
    }
    if (is_numeric($iv)) {
        if (str_contains($iv,".")) {
            return (float)$iv;
        }
        return (int)$iv;
    } else {
        return $iv;
    }
}

function run_query($qs) {
    //Returns list of dicts or null if error.
    global $sql_loc;
    global $sql_db;
    global $sql_user;
    global $sql_password;

    $c = new mysqli(
        $sql_loc,
        $sql_user,
        $sql_password,
        $sql_db
    );
    //$c->connect();
    
    $result = $c->query($qs);
    $final = array();
    if (is_bool($result)) {
        return array();
    }
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            //array_push($final,$row);
            $t = array();
            foreach ($row as $key => $value) {
                $nv = tvconv($value);
                //echo $key . " : " . $nv. " : " . gettype($nv) . "\n";
                //For some reason, it isn't preserving the types
                $t[$key] = $nv;
            }
            array_push($final,$t);
        }
    } else {
        $final = array();
    }

    $c->close();
    return $final;

}

function run_query_p($query) {
    $final = array();
    foreach ($query as $st) {
        //echo $st;
        $final = array_merge($final,run_query($st));
    }
    return $final;
}

function run_non_query_p($query) {
    $iserror = false;
    foreach ($query as $st) {
        
        if (!run_non_query($st)) {
            $iserror = true;
            break;
        }
    }
    return $iserror;
}

function echo_and_run($query,$isExpectedToReturnData,$returnBool) {
    
    if ($isExpectedToReturnData) {
        $r = run_query_p($query);
        if (count($r) == 0 && $returnBool) {
            echo "{\"error\":false,\"data\":false}"; 
            return;
        } else if (count($r) > 0 && $returnBool) {
            echo "{\"error\":false,\"data\":true}";
            return;
        }
        if (is_null($r)) {
            echo "{\"error\":true,\"data\":{}}";
        } else {
            $final = json_encode($r);
            echo "{\"error\":false,\"data\":$final}";
        }

    } else {
        $r = !run_non_query_p($query);
        if (!$r) {
            echo "{\"error\":true,\"data\":{}}";
        } else {
            echo "{\"error\":false,\"data\":{}}";
        }
    }
}
header("content-type: application/json");

enum VarTypes {
    case String;
    case Number;
    case Bool;
}

class ApiAccept {
    //public $pp;
    public $vname;
    public $vtype;
    public $vdata;
    //public $p;
    function __construct($n,$t) {
        $this->vname = $n;
        if (str_contains($t,"bool")) {
            $this->vtype = VarTypes::Bool;
        } else if (str_contains($t,"num")) {
            $this->vtype = VarTypes::Number;
        } else {
            //str
            $this->vtype = VarTypes::String;
        }
    }
    function loadfrom($ar) {
        $raw = $ar[$this->vname];
        if ($this->vtype == VarTypes::Bool) {
            if ($raw) {
                $this->vdata = true;
            } else {
                $this->vdata = false;
            }
        } else if ($this->vtype == VarTypes::Number) {
            $this->vdata = floatval($raw);
        } else {
            $this->vdata = $raw;
        }
    }
    function get() {
        return $this->vdata;
    }
}

class ApiAction {
    public $variables = array();
    public $actionname;
    public $statement;
    private $aq;
    private $retrbool;
    private $usesql;

    function __construct($ar) {
        $this->actionname = $ar["action"];
        $this->statement = $ar["commands"];
        $this->aq = $ar["returns"];
        $this->usesql = $ar["usesql"];
        foreach ($ar["accepts"] as $key => $value) {
            array_push($this->variables,new ApiAccept($key,$value));
        }
        $this->retrbool = $ar["sendbool"];
    }
    function processvars() {
        //$result = $this->statement;
        $final = array();
        foreach ($this->statement as $svalue) {
            $sresult = $svalue;
            foreach ($this->variables as $value) {
            
                $sresult = str_replace("$".$value->vname,encode_for_sql($value->get()),$sresult);
            }
            array_push($final,$sresult);
        }
        
        return $final;
    }
    function execute() {
        if ($this->usesql) {
            echo_and_run($this->processvars(),$this->aq,$this->retrbool);
        } else {
            foreach ($this->processvars() as $cmd) {
                system($cmd . " | tee -a apicmdlog.txt > /dev/null");
                echo "{\"error\":false,\"data\":{}}";
            }
        }
    }
}
$body = json_decode(file_get_contents('php://input'),true);
$calls = array();
$file = fopen("api-format.json",'r');
$rd = json_decode(fread($file,filesize("api-format.json")),true);
fclose($file);

foreach ($rd["api"] as $value) {
    $calls[$value["action"]] = new ApiAction($value);
}

$action2get = $body["action"];//TODOTODOTOFO!!!!!!!!!!!!!!!!!!!! Decode json from body!!!!! Set as variables
foreach ($calls as $key => $value) {
    if ($key == $action2get) {
        foreach ($value->variables as $kvv) {
            $kvv->loadfrom($body);
        }
        $value->execute();
        exit(0);
    }
}
echo "{\"error\":true,\"data\":{}}";
exit(1);
