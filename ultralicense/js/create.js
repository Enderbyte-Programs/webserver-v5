function create() {
    let cname = document.getElementById("cname").value
    if (cname.length === 0) {
        return//Ignore is empty.
    }
    if (cname.includes(";")) {
        document.getElementById("status").innerText = "Company names may not contain semicolons."
        return
    }
    document.getElementById("progress-wrapper").hidden = false
    fetch(`/ultralicense/api/create_new.php?name=${cname}`).then(function(r) {
        r.text().then(function(t) {
            document.getElementById("progress-wrapper").hidden = true
            let rz = new StandardizedResponse(t.trim())
            if (rz.isgood()) {
                document.getElementById("forms").hidden = true
                let sp = rz.getResult()
                let spu = sp.split(";")[1]
                let spas = sp.split(";")[0]
                document.getElementById("result").hidden = false
                document.getElementById("pwd").innerText = `Your Password is: ${spas} | Your username is: ${spu}`
                document.getElementById("status").innerText = ""
            } else {
                if (rz.getResult() === "5") {
                    document.getElementById("status").innerText = "This name is already in use."
                } else {
                    document.getElementById("status").innerText = `There was an error: ${rz.raw}`
                }
            }
        })
    })
}