if (readCookie("pwd") === null || readCookie("name") === null) {
    document.getElementById("n3").innerText = "Log In"
    document.getElementById("n2").hidden = true
} else {
    document.getElementById("n1").hidden = true
    
}