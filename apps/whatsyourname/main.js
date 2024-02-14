function myf() {
    var name = document.getElementsByName('fname')[0].value;
    alert("Hello, ".concat(name,"!"));
    return false;
}