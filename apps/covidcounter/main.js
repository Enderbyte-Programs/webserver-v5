const reference = Date.parse("2020-03-13 15:30:00")

function update() {
    var res = Date.now() - reference
    var sec = Math.round(res/100)/10
    var min = sec/60
    var hur = min/60
    var day = hur/24
    var wek = day/7
    var yer = day/365

    var ryer = Math.floor(yer);
    var _l = sec - ryer*365*24*3600
    var rwek = Math.floor(_l/(7*24*3600))
    _l = _l % (7*24*3600)
    var rday = Math.floor(_l/(24*3600))
    _l = _l % (24*3600)
    var rhur = Math.floor(_l/3600)
    _l = _l % 3600
    var rmin = Math.floor(_l/60)
    _l = _l % 60
    var rsec = Math.floor(_l)

    var docx = document.getElementById("counter")
    docx.innerHTML = `
    <p>It has been <b>${ryer} years, ${rwek} weeks, ${rday} days, ${rhur} hours, ${rmin} minutes, and ${rsec} seconds</b> since life was normal </p>
    <p>${yer} years</p>
    <p>${wek} weeks</p>
    <p>${day} days</p>
    <p>${hur} hours</p>
    <p>${min} minutes</p>
    <p>${sec} seconds</p>
    `
}