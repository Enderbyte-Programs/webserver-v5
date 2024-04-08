
function makeBoldText(text) {
    let bld = document.createElement("strong")
    bld.appendChild(document.createTextNode(text))
    return bld
}

function newproduct() {
    showVignette()
    let thename = document.getElementById("pname").value
    let ktype = document.getElementById("keytype").selectedIndex
    let lname = readCookie("name")
    let lp = readCookie("pwd")
    if (thename == "") {
        alert("Name must not be empty")
        hideVignette()
    } else {
        fetch(`/ultralicense/api/add_product.php?name=${lname}&pwd=${lp}&pname=${thename}&pdt=${ktype}`).then(function(r) {
            r.text().then(function(t) {
                hideVignette()
                let j = new StandardizedResponse(t)
                if (!j.isgood()) {
                    if (j.getResult() == "5") {
                        alert("That name is already used.")
                    } else {
                        alert("ERROR: " + j.getResult())
                    }
                } else {
                    updateProductTable()
                }
            })
        })
    }
}

function enableButton(element,colour="#e1ecf4") {
    element.disabled = false
    //element.style.backgroundColor = colour
}

function disableButton(element) {
    element.disabled = true
    //element.style.backgroundColor = "gray"
}

function ptactive(loc) {

    let newdat = document.getElementById("ptablew").rows[loc+1].cells[1].innerText.startsWith("N")
    let pname = document.getElementById("ptablew").rows[loc+1].cells[0].innerText
    let nv;
    if (newdat) {
        nv = "Yes"
        document.getElementById("ptablew").rows[loc+1].cells[3].childNodes[0].innerText = "Deactivate"
    } else {
        nv = "No"
        document.getElementById("ptablew").rows[loc+1].cells[3].childNodes[0].innerText = "Activate"
    }
    showVignette()
    fetch(construct_auth_url('/ultralicense/api/toggle_p_active.php',`&pname=${pname}`)).then(function(r){hideVignette()})
    document.getElementById("ptablew").rows[loc+1].cells[1].innerText = nv
}

function prename(loc) {
    let buttoncell = document.getElementById("ptablew").rows[loc+1].cells[3]
    let namecell = document.getElementById("ptablew").rows[loc+1].cells[0]
    namecell.contentEditable = true
    namecell.style.backgroundColor = "lightgray"
    let savebutton = document.createElement("button")
    savebutton.classList.add("button")
    savebutton.innerText = "Save"
    savebutton.style.backgroundColor = "lightgreen"
    savebutton.onclick = function() {
        psave(loc)
    }
    buttoncell.appendChild(savebutton)

    let cancelbutton = document.createElement("button")
    cancelbutton.classList.add("button")
    cancelbutton.innerText = "Cancel"
    cancelbutton.style.backgroundColor = "pink"
    cancelbutton.onclick = function() {
        pcancel(loc)
    }
    buttoncell.appendChild(cancelbutton)

    disableButton(buttoncell.childNodes[0])
    disableButton(buttoncell.childNodes[1])
    disableButton(buttoncell.childNodes[2])
}

function psave(loc) {
    pReturnButtons(loc)
}

function pcancel(loc) {
    pReturnButtons(loc)
}

function pReturnButtons(loc) {
    let buttoncell = document.getElementById("ptablew").rows[loc+1].cells[3]
    removeSpecificNode(buttoncell,4)
    removeSpecificNode(buttoncell,3)
}

function pdelete(loc) {
    alert(loc)
}

function updateProductTable() {
    let lname = readCookie("name")
    let lp = readCookie("pwd")
    let thetable = document.getElementById("ptable")
    $("#ptable tr").remove()
    let rw = thetable.insertRow()
    rw.insertCell().appendChild(makeBoldText("Software Name"))
    rw.insertCell().appendChild(makeBoldText("Software is active?"))
    rw.insertCell().appendChild(makeBoldText("License Type"))
    fetch(`/ultralicense/api/get_products.php?name=${lname}&pwd=${lp}`).then(function(r) {
        r.text().then(function(t) {
            let j = new StandardizedResponse(t)
            if (j.isgood()) {
                let x = 0;
                j.getResult().split(";;").forEach(element => {
                    
                    if (element === "") {

                    } else {
                        let yy = x;
                        let nr = thetable.insertRow()
                        let ds = element.split(";")
                        ds.forEach(element2 => {
                            let c = nr.insertCell()
                            c.innerText = element2
                        });
                        let b1 = document.createElement("button")
                        b1.classList.add("button")
                        b1.innerText = "Activate"
                        if (ds[1].startsWith("Y")) {
                            b1.innerText = "Deactivate"
                        }
                        b1.onclick = function() {
                            ptactive(yy)
                        }
                        let bc = nr.insertCell()
                        bc.appendChild(b1)
                        let b2 = document.createElement("button")
                        b2.classList.add("button")
                        b2.innerText = "Rename"
                        b2.onclick = function() {
                            prename(yy)
                        }
                        bc.appendChild(b2)
                        let b3 = document.createElement("button")
                        b3.classList.add("button")
                        b3.innerText = "Delete"
                        b3.style.backgroundColor = "pink"
                        b3.onclick = function() {
                            pdelete(yy)
                        }
                        bc.appendChild(b3)
                        x++
                    }
                });
            }
        })
    })
}

updateProductTable()