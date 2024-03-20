if (readCookie("pwd") === null || readCookie("name") === null) {
    document.location.href = `./login.html?return=${window.location.pathname}`
} else {
    let name = readCookie("name")
    let encryptedpassword = readCookie("pwd")
    fetch(`/ultralicense/api/do_login.php?name=${name}&pwd=${encryptedpassword}`).then(function(r) {
        r.text().then(function(t) {
            let tx = new StandardizedResponse(t.trim())
            if (tx.isgood()) {
                if (document.getElementById("subtitle") != null) {
                    document.getElementById("subtitle").innerText = `Welcome to UltraLicense, ${name}`
                }
            } else {
                document.location.href = `./login.html?return=${window.location.pathname}`
            }
        })
    })
}