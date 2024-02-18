function myf() {
    var name = document.getElementsByName('fname')[0].value;
    alert("Hello, ".concat(name,"!"));
    return false;
}

function processcl() {
    var cl = document.getElementsByName('cl')[0].value;
    document.body.style.background = cl;
}