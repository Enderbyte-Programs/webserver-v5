class Poli {
    constructor(x,y) {
        this.y = y
        this.x = x
    }
}

var polidata = new Map()
polidata.set("hitler",new Poli(250,30))
polidata.set("stalin",new Poli(50,100))
polidata.set("trudeau",new Poli(180,230))
polidata.set("ndp",new Poli(130,230))
polidata.set("poli",new Poli(300,150))
polidata.set("trump",new Poli(350,100))

function rn(name) {
    let c = document.getElementById("cc")
    document.getElementById("cr").hidden = false
    c.hidden = false
    let d = polidata.get(name)
    //c.style = `z-index:-1; top:${d.y}; left:${d.x}`
    c.setAttribute("cx",d.x)
    c.setAttribute("cy",d.y)
}