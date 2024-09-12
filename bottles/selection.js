var grades = ["UNSET"]
var positions = [
    "Grade 8 Beginning Concert Band",
                    "Junior Concert Band (8/9)",
                    "Intermediate Concert Band (9/10)",
                    "Senior Concert Band (11/12)",
                    "Grade 8 Jazz Band",
                    "Grade 9/10 Jazz Band",
                    "Senior Jazz Band (11/12)",
                    "Choir",
                    "Tocatti Strings (8)",
                    "Converti Strings (9/10)",
                    "Chamber Strings (11/12)",
                    "Virtuosi Strings",
]
var hasAnswered = false
var username = "";
var usergrade;
var userclass;
var useremail;
var userphone;
var sbcallback;

function masterInit() {
    

    if (!isLoggedInAsStudent() && !isLoggedInAsParent() && !isadmin) {
        document.getElementById("welcomebox").hidden = false
    } else {
        if (isLoggedInAsStudent()) {
            //Hide parent data
            document.getElementById("parentlist").hidden = true
            document.getElementById("parentlists").hidden = true
            username = getCookie("name")
            usergrade = getCookie("grade")
            userclass = getCookie("class")

        } else if (isLoggedInAsParent()) {
            //Hide student data
            document.getElementById("notice").hidden = true
            document.getElementById("routelist").hidden = true
            document.getElementById("routelists").hidden = true
            username = getCookie("name")
            useremail = getCookie("email")
            userphone = getCookie("phone")
            //TODO! Add detect and load for student data
            if (doesCookieExist("class")) {
                userclass = getCookie("class")
            }
            if (doesCookieExist("grade")) {
                usergrade = getCookie("grade")
            }
        }
        if (isadmin) {
            //Force show everything
            document.getElementById("parentlist").hidden = false
            document.getElementById("parentlists").hidden = false
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
    refreshPage(function() {
        if (ToVolunteerCallback > -1) {
            runParentVolunteer(ToVolunteerCallback)
            ToVolunteerCallback = -1//Reset it for the next time
        }
    })
    
}

function loadsb() {
    
    if (!(doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class"))) {
        document.getElementById("infoselect").hidden = false//Prompt user
        document.getElementById("isname").value = getCookie("name")

        if (ToSBVolunteerCallbackIndex > -1) {
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
    if (doesCookieExist("email")) {
        useremail = getCookie("email")
    }
    if (doesCookieExist("phone")) {
        userphone = getCookie("phone")
    }
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
        refreshPage(function() {
            console.log("rvi")
            if (ToSBVolunteerCallbackIndex > -1) {
                runVolunteerA(ToSBVolunteerCallbackIndex)
                ToSBVolunteerCallbackIndex = -1
            }
        })
        
    }
}

function isLoggedInAsStudent() {
    return doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class")
}

function isLoggedInAsParent() {
    return doesCookieExist("name") && doesCookieExist("email") && doesCookieExist("phone")
}

function isToBeStudent() {
    return getCookie("bypass") === "student"
}

function isToBeParent() {
    return getCookie("bypass") == "parent"
}