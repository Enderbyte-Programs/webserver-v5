function create() {
    let cname = document.getElementById("cname").value
    if (cname.length === 0) {
        return//Ignore is empty.
    }
    document.getElementById("progress-wrapper").hidden = false
    fetch(`/ultralicense/api/create_new.php?name=${cname}`).then(function(r) {
        r.text().then(function(t) {
            document.getElementById("progress-wrapper").hidden = true
            let rz = new StandardizedResponse(t.trim())
            if (rz.isgood()) {
                document.getElementById("forms").hidden = true
                let sp = rz.getResult()
                document.getElementById("result").hidden = false
                document.getElementById("pwd").innerText = `Your Password is: ${sp}`
            } else {
                if (rz.getResult() === "5") {
                    alert("This name is already in use. Please choose a different name.")
                } else {
                    alert(`ERROR: ${rz.getResult()}`)
                }
            }
        })
    })
}