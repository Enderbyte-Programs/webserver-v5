function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

function tick() {
    setTimeout(() => {
        tick()
    }, 100);

    let currentime = new Date(Date.now())
    document.getElementById("lt").innerText = `${pad(currentime.getHours(),2)}:${pad(currentime.getMinutes(),2)}:${pad(currentime.getSeconds(),2)}.${pad(currentime.getMilliseconds(),3)}`
    document.getElementById("utct").innerText = `${pad(currentime.getUTCHours(),2)}:${pad(currentime.getUTCMinutes(),2)}:${pad(currentime.getUTCSeconds(),2)}.${pad(currentime.getMilliseconds(),3)}`
}

tick()

function cl() {
    navigator.clipboard.writeText(document.getElementById("lt").innerText)
}

function cu() {
    navigator.clipboard.writeText(document.getElementById("utct").innerText)
}