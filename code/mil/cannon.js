function fire() {
    let d = document.getElementById("flasher")
    d.hidden = false;
    let a = new Audio('/assets/sounds/cannon.mp3')
    a.play()
    setTimeout(function (){
        d.hidden = true
        setTimeout(function () {
            d.hidden = false
            setTimeout(function () {
                d.hidden = true
            },100)
        },100)
    },200)
}