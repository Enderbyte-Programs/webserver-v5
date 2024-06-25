var isExiled = false;
function exile() {
    let d = document.getElementById("sad-napoleon")
    let b = document.getElementById("eb")
    if (isExiled) {
        b.innerText = "Click here to exile Napoleon"
        d.style = "position: absolute;top: 0px;left: 30px;max-height: 100px;max-width: 50px;transform: scaleX(-1);"
    }else {
        let a = new Audio("/assets/sounds/sad.mp3")
        a.play()
        b.innerText = "Click here to reinstate Napoleon"
        d.style = "position: absolute;top: 300px;left: 300px;max-height: 100px;max-width: 50px;"
    }
    isExiled = !isExiled
}