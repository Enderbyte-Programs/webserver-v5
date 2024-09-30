class TimeSet {
    constructor() {
        this.millis = 0
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
    }
    toStr() {
        return `${this.hours}:${pad(this.minutes,2)}:${pad(this.seconds,2)}.${pad(this.millis,3)}`
    }
    reset() {
        this.millis = 0
        this.seconds = 0
        this.minutes = 0
        this.hours = 0
    }
    step(nms) {
        this.millis += nms

        if (this.millis >= 1000) {
            this.millis = 0
            this.seconds += 1
        }

        if (this.seconds >= 60) {
            this.seconds = 0
            this.minutes += 1
        }

        if (this.minutes >= 60) {
            this.minutes = 0
            this.hours += 1
        }
    }
}

var mastertime = new TimeSet()
var lastCountTime = new TimeSet()
var laps = Array()
var isrunning = false

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

function reset() {
    mastertime.reset()
    updateUi()
}

function updateUi() {
    document.getElementById("master").innerText = mastertime.toStr()
}

function step() {
    if (isrunning) {
        setTimeout(() => {
            step()
        }, 50);
    }
    mastertime.step(60)
    lastCountTime.step(60)

    updateUi()
}

function toggle() {
    if (isrunning) {
        document.getElementById("toggle").style.backgroundColor = "lightgreen"
        document.getElementById("toggle").innerText = "Start"
        isrunning = false
    } else {
        isrunning = true
        document.getElementById("toggle").style.backgroundColor = "pink"
        document.getElementById("toggle").innerText = "Stop"
        step()
    }
}

updateUi()