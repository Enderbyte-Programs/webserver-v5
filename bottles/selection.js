var grades = ["Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"]
var positions = ["Concert Band","Jazz Band","Choir","Strings"]
var hasAnswered = false
var username = "";
var usergrade;
var userclass;
var sbcallback;

function masterInit() {
    if (!isLoggedInAsStudent() && !isLoggedInAsTeacher() && !isadmin) {
        document.getElementById("welcomebox").hidden = false
    } else {
        if (isLoggedInAsStudent()) {
            //Hide parent data
            document.getElementById("parentlist").hidden = true
        } else if (isLoggedInAsTeacher()) {
            //Hide student data
            document.getElementById("routelist").hidden = true
            document.getElementById("routelists").hidden = true
        }
        if (isadmin) {
            //Force show everything
            document.getElementById("parentlist").hidden = false
            document.getElementById("routelist").hidden = false
            document.getElementById("routelists").hidden = false
        }
    
    }
}

function initStudent() {
    document.getElementById("welcomebox").hidden = true
    loadsb()
}

function initTeacher() {
    document.getElementById("welcomebox").hidden = true
    openLogin()
}

function initParent() {
    document.getElementById("welcomebox").hidden = true
    document.getElementById("parentbox").hidden = false
}

function submitPV() {
    let pname = document.getElementById("pvname").value
    let pemail = document.getElementById("pvemail").value
    let pphone = document.getElementById("pvphone").value
    if (pemail === "" && pphone === "") {
        alert("You must provide an email or a phone.")
        return
    }
    if (pname === "") {
        alert("You must specify your name.")
        return
    }
    if (pemail === "") {
        pemail = "[UNSET]"
    }
    if (pphone === "") {
        pphone = "[UNSET]"
    }
    setCookie("name",pname,60)
    setCookie("email",pemail,60)
    setCookie("phone",pphone,60)
    document.getElementById("parentbox").hidden = true
    masterInit()
}

function loadsb(callback=null) {
    sbcallback = callback
    if (!(doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class"))) {
        document.getElementById("infoselect").hidden = false//Prompt user

        if (callback == null) {
            document.getElementById("isc").disabled = true
            document.getElementById("iss").disabled = false
        } else {
            document.getElementById("isc").disabled = false
            document.getElementById("iss").disabled = true
        }
    } else {
        username = getCookie("name")
        usergrade = getCookie("grade")
        userclass = getCookie("class")
        hasAnswered = true
        masterInit()
    }
}

function loadsbunsafe() {
    username = getCookie("name")
    usergrade = getCookie("grade")
    userclass = getCookie("class")
    hasAnswered = true
    masterInit()
}

function submitIS() {
    let nname = document.getElementById("isname").value
    let ngr = grades[document.getElementById("isselg").selectedIndex]
    let ncl = positions[document.getElementById("isselc").selectedIndex]
    if (nname.trim() === "" || ngr.trim() === "" || ncl.trim() === "") {
        alert("Please fill in all values.")
    } else {
        setCookie("name",nname,60)
        username = nname
        usergrade = ngr
        userclass = ncl
        setCookie("grade",ngr,60)
        setCookie("class",ncl,60)
        document.getElementById('infoselect').hidden = true
        masterInit()
        if (sbcallback != null) {
            sbcallback()
        }
    }
}

function isLoggedInAsStudent() {
    return doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class")
}

function isLoggedInAsTeacher() {
    return doesCookieExist("name") && doesCookieExist("email") && doesCookieExist("phone")
}