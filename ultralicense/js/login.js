function trylogin() {
    let name = document.getElementById("cname").value
    let pwd = document.getElementById("cpwd").value
    if (name.length == 0 || pwd.length == 0) {
        document.getElementById("status").innerText = "Fill in all fields in the below form."
        return
    } else {
        var encryptedpassword = rotrot_encrypt(pwd)
        //console.log(encryptedpassword)
        fetch(`/ultralicense/api/do_login.php?name=${name}&pwd=${encryptedpassword}`).then(function(r) {
            r.text().then(function(t) {
                let tx = new StandardizedResponse(t.trim())
                if (tx.isgood()) {
                    createCookie("pwd",encryptedpassword,30)
                    createCookie("name",name,30)
                    if (findGetParameter("return") == null) {
                        window.location.href = "/ultralicense/manager.html"
                    } else {
                        window.location.href = findGetParameter("return")
                    }
                } else {
                    document.getElementById("status").innerText = "Incorrect username or password"
                }
            })
        })
    }
}

function rotrot_encrypt(data) {
    let vals = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".split("")//hehe hackers
    let ri = -1
    let final = Array()
    data.split("").forEach(c => {
        ri++
        let loc = vals.indexOf(c)
        if (loc == -1) {
            final.push(c)//Skip
        } else {
            let offset = ri + loc
            let nv = vals[offset % vals.length]//Hope JS has modulus operator
            final.push(nv)
        }
    });
    return final.join("")
}