function padLeading(innumber,pad) {
    var vx = innumber.toString()
    var zerofilled = ('0'.repeat(pad)+vx).slice(-pad);
    return zerofilled
}

var laps = 1;

class StopwatchTime {
    constructor (hours=0,minutes=0,seconds=0,millis=0) {
        this.h = hours
        this.m = minutes
        this.s = seconds
        this.ms = millis
    }
    add(millis) {
        this.ms += millis
        this.update()//Update values
    }
    update() {
        if (this.ms > 999) {
            this.ms = 0
            this.s++
        }
        if (this.s > 59) {
            this.s = 0
            this.m++
        }
        if (this.m > 59) {
            this.m = 0
            this.h++
        }
    }
    outToStr() {
        var pm = padLeading(this.m, 2)
        var ps = padLeading(this.s, 2)
        var pms = padLeading(this.ms, 3)
        return `${this.h}:${pm}:${ps}.${pms}`
    }
    reset() {
        this.s = 0
        this.m = 0
        this.h = 0
        this.ms = 0
    }
}

function updateArea(text) {
    var dx  = document.getElementById("watch")
    dx.innerHTML = `<p style="font-size: 72px;">${text}</p>`
}

var master = new StopwatchTime()
var running = false
var lastStartTime = Date.now()

function frame() {
    if (running) {
        var now = Date.now()
        var msdiff = (now - lastStartTime)
        master.add(msdiff)
        updateArea(master.outToStr())
        lastStartTime = now
        
    }
}

function main() {

}

function startclick() {
    running = true
    lastStartTime = Date.now()
}

function stopclick() {
    running = false
}

function reset() {
    master.reset()
    updateArea(master.outToStr())
}