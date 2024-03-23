class StandardizedResponse {
    raw = ""
    constructor(text) {
        this.raw = text
    }
    isgood = function() {
        return this.raw.startsWith("G")
    }
    getResult = function() {
        return this.raw.substring(1)
    }
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function unescape(text) {
    return text.replace("#SC",";");
}

function preproescape(text) {
    return text.replace("&","#AM")
}

function showVignette() {
    document.getElementById("progress-wrapper").hidden = false
}
function hideVignette() {
    document.getElementById("progress-wrapper").hidden = true
}

function construct_auth_url(base,param) {
    let lname = readCookie("name")
    let lp = readCookie("pwd")
    return base+"?name="+lname+"&pwd="+lp+"&"+param
}