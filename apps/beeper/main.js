var startingtime;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.Audio = window.Audio || window.webkitAudio;
var masteraudio = new Audio();
var context = new AudioContext();

function playSound(arr) {
  var buf = new Float32Array(arr.length)
  for (var i = 0; i < arr.length; i++) buf[i] = arr[i]
  var buffer = context.createBuffer(1, buf.length, context.sampleRate)
  buffer.copyToChannel(buf, 0)
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

function sineWaveAt(sampleNumber, tone) {
  var sampleFreq = context.sampleRate / tone
  return Math.sin(sampleNumber / (sampleFreq / (Math.PI * 2)))
}

function playBeep(freq,secs) {
    var arr = [],
    volume = 0.2,
    seconds = secs,
    tone = freq

    for (var i = 0; i < context.sampleRate * seconds; i++) {
    arr[i] = sineWaveAt(i, tone) * volume
    }

    playSound(arr)
}

function markSecond() {
    flashDiv("blue")
    playBeep(1000,0.2)
}

function markMinute() {
    flashDiv("green")
    playBeep(500,0.9)
}

function mark8s() {
    flashDiv("blue")
    playBeep(1000,0.9)
}

function markHour() {
    flashDiv("red")
    masteraudio.src = "SiratoneEOWSChimesSynth.mp3"
    masteraudio.play().then(function() {
        ttssay(`It is now ${new Date(Date.now()).getHours()} o clock`)
    })
}

function markDay() {
    flashDiv("purple")
    masteraudio.src = "SiratoneEOWSChimesSynth.mp3"
    masteraudio.play().then(function() {
        ttssay(`It is now midnight, beginning ${new Date(Date.now()).toDateString()}.`)
    })
}

function flashDiv(colour) {
    document.getElementById("flash").style.backgroundColor = colour
    setTimeout(() => {
        document.getElementById("flash").style.backgroundColor = "white"
    }, 200);
}

function isDivisibleBy(n,d) {
    return n / d == Math.round(n / d)
}

function ttssay(msgt) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = msgt;
    window.speechSynthesis.speak(msg);

}

function tick() {
    setTimeout(() => {
        tick()
    }, 990);
    startingtime = Math.floor(Date.now() / 1000)
    if (isDivisibleBy(startingtime,3600*24)) {
        markDay()
    }
    else if (isDivisibleBy(startingtime,3600)) {
        markHour()
    }
    else if (isDivisibleBy(startingtime,60)) {
        markMinute()
    } 
    else if (isDivisibleBy(startingtime,10)) {
        mark8s()
    }
    else {
        markSecond()
    }
}

function rstick() {
    let pst = Date.now()
    startingtime = Math.floor(Date.now() / 1000)
    setTimeout(() => {
       tick() 
    }, pst - startingtime*1000);
    document.getElementsByTagName("button")[0].style.display = "none"
}