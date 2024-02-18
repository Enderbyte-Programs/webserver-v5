function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

var cx = 100
var cy = 100
var dx = 10
var dy = 10
var s = 10

var running = true
var playaudio = true
var colourtk = 0
var hits = 0

function main() {
    window.requestAnimationFrame(frame)
    var c = document.getElementById("cv")
    var ctx = c.getContext("2d")
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight-400
}

function normalizeangle(input) {
    if (input > 360) {
        return input - 360
    } else if (input < 0) {
        return input + 360
    } else {
        return input
    }
}

function playDing() {
    var audio = new Audio("/downloads/assets/ding.mp3")
    audio.load()
    audio.play()
}

function halt() {
    running = false;
}
function resume() {
    running = true;
}
function updateaud() {
    
    playaudio = document.getElementById("cb").checked
}

function updatespeeds() {
    newspeed = parseInt(document.getElementById("range").value)
    s = newspeed
    if (dx < 0) {
        dx = -newspeed
    } else {
        dx = newspeed
    }
    if (dy < 0) {
        dy = -newspeed
    } else {
        dy = newspeed
    }
}

function frame() {
    if (running) {
        tr = 0
        var c = document.getElementById("cv")
        var ctx = c.getContext("2d")
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.moveTo(cx,cy)
        ctx.beginPath();
        cx += dx
        cy += dy
        ctx.arc(cx,cy, 40, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.save()
        var sar = document.getElementById("speed")
        sar.innerHTML = `Speed: ${s}`
        var debug = document.getElementById("debug")
        debug.innerHTML = `DX: ${dx}; DY: ${dy};X: ${cx}; Y: ${cy}; <strong>Hits: ${hits}</strong>`
        //Hit
        if (cx+dx-40 < 0 || cx+dx+40 > c.width) {
            cooldown = 10
            if (playaudio) {
                playDing()
            }
            dx = -dx 
            tr++
        }
        else if (cy+dy-40 < 0 ||cy+dx+40 > c.height) {
            cooldown = 10
            if (playaudio) {
                playDing()
            }
            dy = -dy
            tr++
        }
        if (tr === 2) {
            document.body.style.background = "yellow"
            colourtk = 100
        }
        if (colourtk > 0) {
            colourtk--
        }
        if (colourtk == 0) {
            document.body.style.background = "white"
        }
        hits += tr
    }
    window.requestAnimationFrame(frame)

}