function processdata() {
    var number1 = parseFloat(document.getElementsByName('n1')[0].value);
    var number2 = parseFloat(document.getElementsByName('n2')[0].value);
    var answ = parseFloat(document.getElementsByName('an')[0].value);

    var isgood = number1 / number2 === answ
    var div = document.getElementById("answer")
    if (isgood) {
        div.innerHTML = "You are correct!"
        div.style.color = "green"
    } else {
        div.innerHTML = "You are incorrect."
        div.style.color = "red"
        if (document.getElementsByName('hd')[0].checked) {
            div.innerHTML += "<br> The correct answer is " + (number1 / number2)
        }
    }
}
