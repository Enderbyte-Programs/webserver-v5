function processdata() {
    var number1 = parseInt(document.getElementsByName('n1')[0].value);
    var number2 = parseInt(document.getElementsByName('n2')[0].value);
    var operation = document.getElementsByName('todo')[0].value;
    var result;
    if (operation === "1") {
        //+
        result = number1 + number2
    }
    if (operation === "2") {
        // -
        result = number1 - number2
    }
    if (operation === "3" ) {
        //*
        result = number1 * number2
    }
    if (operation === "4") {
        result = number1 / number2
    }
    document.getElementById('answer').innerHTML = "Answer: " + result
}