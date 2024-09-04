var isadmin = true
var ispasswordhidden = false

function openLogin() {
    if (isadmin) {
        eraseCookie("password")
        document.location.reload()
    } else {
        document.getElementById("adminlogin").hidden = false
    }
}

function fullLogout() {
    eraseCookie("password")
    eraseCookie("name")
    eraseCookie("grade")
    eraseCookie("class")
    eraseCookie("email")
    eraseCookie("phone")
    document.location.reload()
}

function closeLogin() {
    document.getElementById('adminlogin').hidden = true
    if (!isLoggedInAsStudent() && !isLoggedInAsParent()) {
        document.getElementById('welcomebox').hidden = false
    }
}

function togglepassword(buttonid,inputid) {
    ispasswordhidden = !ispasswordhidden;
    if (ispasswordhidden) {
        document.getElementById(buttonid).innerText = "👁️❌"
        document.getElementById(inputid).type = "text"
    } else {
        document.getElementById(buttonid).innerText = "👁️"
        document.getElementById(inputid).type = "password"
    }
    
}

function openForgotPassword() {
    document.getElementById("loginhead").innerText = "Change the admin password"
    document.getElementById("newshbutton").hidden = false
    document.getElementById("newpassword").hidden = false
    document.getElementById("srsp").hidden = true
    document.getElementById("srsp").style.display = "none"
    document.getElementById("submitpassword").hidden = true
    hide("submitpassword")
    document.getElementById("cancelpassword").onclick = function() {
        closeForgotPassword()
    }
    document.getElementById("srsp2").hidden = false
    document.getElementById("srsp2").style.display = "inline"
}

function closeForgotPassword() {
    document.location.reload()//Too lazy. Will delete
}

function tryChangePassword() {
    let oldpassword = document.getElementById("password").value
    let newpassword = document.getElementById("newpassword").value
    call("reset-password",{
        forwho : "admin",
        oldpassword : oldpassword,
        newpassword : newpassword
    },function(res) {
        let success = res.data
        if (success) {
            alert("Password changed successfully. Please log in again using the new password on the next screen")
            document.location.reload()
        } else {
            document.getElementById("loginerror").innerText = "Incorrect password. If you have forgotten the password, email 226075s@sd44.ca"
        }
    })
}

function tryLogin(pwd,isfromui) {
    call("check-password",{
        forwho : "admin",
        password : pwd
    },function(res) {
        let success = res.data
        if (success) {
            
            setCookie("password",pwd,60)
            if (isfromui) {
                document.location.reload()//Reload to apply changes
            }
            document.getElementById("n1").style = "display:none"
            isadmin = true
            loadPriviliges()
        } else {
            
            if (isfromui) {
                document.getElementById("loginerror").innerText = "Incorrect password"
            }
            isadmin = false
        }
        //loadsb()
    })
}
if (!doesCookieExist("password")) {
    isadmin = false
    masterInit()
} else {
    tryLogin(getCookie("password"),false)
    loadsbunsafe()
}

function showCBlock(rootid) {
    document.getElementById(rootid).hidden = false
    document.getElementById(rootid+"c").hidden = false
}

function loadPriviliges() {
    if (!doesCookieExist("password")) {//If you ran var isadmin = true;loadPriviliges(), you could hack thewebsite. Not any more!!
        alert("Please stop trying to hack this website. There is nothing of value on it.")
        return;
    }
    if (isadmin) {
        showCBlock("managedrives")
        showCBlock("contrib")
        document.getElementById("addroutebox").hidden = false
        document.getElementById("addroutebox").style.display = "inline"
    }
}

//document.getElementById("srsp2").hidden = true