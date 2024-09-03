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

function resetFields() {
    var elements = document.querySelectorAll("input,textarea");
    for (var ii=0; ii < elements.length; ii++) {
        if (elements[ii].type == "text") {
            elements[ii].value = "";
        }
        if (elements[ii].type == "number") {
            elements[ii].value = 1;
        }
        if (elements[ii].type == "textarea") {
            elements[ii].value = "";
        }
    }
}