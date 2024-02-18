var isok = false;
var isgood = false
var vanproc = false;
var zlnk = "";
var title = ""
var fwd = ""

function create() {
    setStatus("Checking availability...")
    title = getTextBoxValue("title")
    fwd = getTextBoxValue("link")
    zlnk = title
    vanproc = false;
    CheckAvail(title).then(result => setStatusAvail(result))
    setTimeout(function (){
        if (isok) {
            CheckCreate(title,fwd).then(result => setCreateCheck(result))
        }
    },1000)
    
}

async function CheckAvail(title) {
    const response = await fetch(`http://enderbyteprograms.ddnsfree.com:10223/apps/forwards/api/available?dir=${title}`,{method:"GET"})
    const pr = await response.text()
    return pr
}

async function CheckAnaly(title) {
    const response = await fetch(`http://enderbyteprograms.ddnsfree.com:10223/apps/forwards/api/get?name=${title}`,{method:"GET"})
    const pr = await response.text()
    return pr
}

async function CheckCreate(title,forward) {
    const response = await fetch(`http://enderbyteprograms.ddnsfree.com:10223/apps/forwards/api/create/`,{
        method:"POST",
        body: `dir=${title}&link=${forward}`,
        headers: {
            "Content-type" : "application/x-www-form-urlencoded"
            
        }
    })
    const pr = await response.text()
    return pr
}

function collect() {
    var tocheck = getTextBoxValue("gtitle")
    getAnaly(tocheck)
}

function getAnaly(name) {
    CheckAnaly(name).then(function(result) {
        document.getElementById("analytics").innerHTML = `Views: ${result}`
    })
}

function setCreateCheck(data) {
    if (data === '1') {
        setStatus(`<p style=\"color:green;display:inline\">Created successfully: Go to <a href=/apps/forwards/${title}>http://enderbyteprograms.freeddns.org/apps/forwards/${title}</a></p>`)
        isgood = true;
    } else {
        setStatus(`<p style=\"color:red;display:inline\">Failed to create (${data})</p>`)
        isgood = false;
    }
}

function setStatusAvail(data) {
    if (data === '0') {
        setStatus("<p style=\"color:red;display:inline\">Not available</p>")
        isok = false;
    } else if (data === '1') {
        setStatus("<p style=\"color:black;display:inline\">Creating...</p>")
        isok = true;
    } else {
        setStatus("<p style=\"color:red;display:inline\">Illegal character.</p>")
        isok = false;
    }
    vanproc = true
}

function setStatus(data) {
    var docx = document.getElementById("status")
    docx.innerHTML = data
}

function getTextBoxValue(id) {
    return document.getElementById(id).value
}