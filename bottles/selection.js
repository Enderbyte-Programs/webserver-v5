var grades = ["Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"]
var positions = ["Concert Band","Jazz Band","Choir","Strings"]
var hasAnswered = false
var username = "";
var usergrade;
var userclass;
var sbcallback;

function loadsb(callback=null) {
    sbcallback = callback
    if (!(doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class"))) {
        document.getElementById("infoselect").hidden = false//Prompt user
        if (isadmin) {
            document.getElementById("islaa").disabled = true
        }

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
    }
}

function loadsbunsafe() {
    username = getCookie("name")
    usergrade = getCookie("grade")
    userclass = getCookie("class")
    hasAnswered = true
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
        if (sbcallback != null) {
            sbcallback()
        }
    }
}