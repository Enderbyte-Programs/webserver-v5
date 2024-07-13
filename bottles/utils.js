function hide(id) {
    document.getElementById(id).style.display = "none"
}
function show(id) {
    document.getElementById(id).style.display = "inline"
}

function conjugatepeople(p) {
    if (p == 1) {
        return `${p} person`
    } else {
        return `${p} people`
    }
}

function startProgress() {
    document.getElementById("progress").hidden = false
}

function endProgress() {
    document.getElementById("progress").hidden = true
}