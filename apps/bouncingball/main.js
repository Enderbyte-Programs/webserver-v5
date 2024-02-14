function main() {
    var c = document.getElementById("cv")
    var ctx = c.getContext("2d")
    ctx.moveTo(0,0)
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
}