Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}
  //Copied from SO! Yippee

var money = 0;
const vals = [25,50,100,200,500,0,0]
const nicevals = [25,50,100,200,500,100,50]
var vaults = 0
const aud = new Audio("/downloads/assets/horn.mp3")
aud.load()
var statusx = "Ready to play"

var tgames = 0;
var tvaults = 0;
var tmoney = 0;

function updatestats() {
    var docx = document.getElementById("game")
    docx.innerHTML = `
    <p><i>${statusx}</i></p>
    <p>Vault Number: ${vaults}</p>
    <p><b>Money: $${money}</b></p>
    `
    docx = document.getElementById("stats")
    docx.innerHTML = `
    <p><b>Games Played: ${tgames}</b></p>
    <p>Vaults Opened: ${tvaults}</p>
    <p>Total Money Earned: $${tmoney}</p>
    `
}
let bakery = document.cookie
tgames = parseInt(bakery.split(";")[0].split("=")[1])
tvaults = parseInt(bakery.split(";")[1].split("=")[1])
tmoney = parseInt(bakery.split(";")[2].split("=")[1])
updatestats()

function writecookie() {
    document.cookie = `games=${tgames};expires=2025-01-01 0:00:00`
    document.cookie = `tvaults=${tvaults};expires=2025-01-01 0:00:00`
    document.cookie = `tmoney=${tmoney};expires=2025-01-01 0:00:00`
}

function openvault() {
    vaults++
    var chosen = 0;
    if (vaults < 3) {
        chosen = nicevals.random()
    } else {
        chosen = vals.random()
    }
    statusx = `<p style=\"color:green\">You opened vault ${vaults} and got $${chosen}</p>`
    if (chosen === 0) {
        updatestats()
        aud.play()
        money = 0
        statusx = "<p style=\"color:red\">YOU GOT THE ALARM</p>"
        
        alert("You LOSE!!")
        document.getElementById("open").hidden = true;
        document.getElementById("save").hidden = true;
    } else {
        money += chosen
    }
    updatestats()
}

function newgame() {
    vaults = 0
    statusx = "Ready to play"
    money = 0
    document.getElementById("open").hidden = false
    document.getElementById("save").hidden = false
    updatestats()
}

function finish() {
    if (vaults > 0) {
        tgames++
    }
    tvaults += vaults
    tmoney += money
    writecookie()
    newgame()
}