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

function conjugatevolunteers(p) {
    if (p == 1) {
        return `${p} volunteer`
    } else {
        return `${p} volunteers`
    }
}

function startProgress() {
    document.getElementById("progress").hidden = false
    document.getElementById("loadinganimation").hidden = false
}

function endProgress() {
    document.getElementById("progress").hidden = true
    document.getElementById("loadinganimation").hidden = true
}

function b2i(v) {
    if (v) {
        return 1
    }  else {
        return 0
    }
}

function resetFields() {
    var elements = document.querySelectorAll("input,textarea");
    addedMapPoints = Array() //Reset map points
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

function doCopyOf(text) {
    navigator.clipboard.writeText(text)
}

function email_dco_anim() {
    show("oneccp")
    setTimeout(() => {
        hide("oneccp")
    }, 1000);
}

function dict_has(haystack,needle) {
    return haystack[needle] !== undefined
}

function get_childrens_id(parent) {
    //This is a suspicious name...
    var ids = [];
    var children = document.getElementById(parent).children; //get container element children.
    for (var i = 0, len = children.length ; i < len; i++) {
        ids.push(children[i].id); //get child id.
    }
    return ids;

}

function isHidden(el) {
    return (el.offsetParent === null)
}