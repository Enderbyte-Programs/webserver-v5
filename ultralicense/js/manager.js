function makeBoldText(text) {
    let bld = document.createElement("strong")
    bld.appendChild(document.createTextNode(text))
    return bld
}

function newproduct() {
    let thename = document.getElementById("pname").value
    let ktype = document.getElementById("keytype").selectedIndex
    let lname = readCookie("name")
    let lp = readCookie("pwd")
    if (thename == "") {
        alert("Name must not be empty")
    } else {
        fetch(`/ultralicense/api/add_product.php?name=${lname}&pwd=${lp}&pname=${thename}&pdt=${ktype}`).then(function(r) {
            r.text().then(function(t) {
                let j = new StandardizedResponse(t)
                if (!j.isgood()) {
                    alert("ERROR: " + j.getResult())
                }
            })
        })
    }
}