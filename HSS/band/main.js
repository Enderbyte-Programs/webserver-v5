allRoutes = Array()

function is_admin() {
    let urlParams = new URLSearchParams(window.location.search);
    let x = urlParams.get('admin');
    if (x==="true") {
        return true
    } else {
        return false
    }
}

function si_to_b(input) {
    let i = parseInt(input)
    if (i === 0) {
        return false;
    } else {
        return true;
    }
}

function complete_route(id) {

}

function uncomplete_route(id) {

}

function reserve_route(id) {

}

function unreserve_route(id) {

}
function submit_add(id) {

}
function remove_reg(id) {

}
function clearMain() {
    let z = document.getElementById("main")
    let p = z.getElementsByTagName("div")
    while (p[0]) {
        p[0].parentNode.removeChild(p[0])
    }
} 

class Route {
    constructor (rawstring) {
        let srs = rawstring.split(";")
        this.id = srs[0];
        this.name = srs[1]
        this.minimum = parseInt(srs[2])
        this.maximum = parseInt(srs[3])
        this.isDone = si_to_b(srs[4])
        this.isReserved = si_to_b(srs[5])
    }
    draw() {
        let m = document.getElementById("main")
        let a = document.createElement("div")
        a.id = `R${this.id}`;
        //Populate it now
        let heading = document.createElement("h2")
        heading.innerText = this.name
        a.appendChild(heading)
        if (this.isDone) {
            let dm = document.createElement("strong")
            dm.style = "color:green"
            dm.innerText = "This route has already been marked as complete."
            a.appendChild(dm)

            let db = document.createElement("button")
            db.classList.add("button")
            db.style = "background-color:red"
            db.innerText = "Mark uncomplete"
            db.onclick = function() {
                uncomplete_route(this.id)
            }
            a.appendChild(db)
        } else {
            if (this.isReserved) {
                let dm = document.createElement("strong")
                dm.style = "color:red"
                dm.innerText = "This route has already been reserved."
                a.appendChild(dm)
                let db = document.createElement("button")
                db.classList.add("button")
                db.style = "background-color:red"
                db.innerText = "Force Unreserve"
                db.onclick = function() {
                    unreserve_route(this.id)
                }
                a.appendChild(db)
                let b1 = document.createElement("button")
                b1.classList.add("buttons")
                b1.style = "background-color:green"
                b1.innerText = "Mark Complete"
                b1.onclick = function() {
                    complete_route(this.id)
                }
                a.appendChild(b1)
            }
            else {
                //Unreserved and incomplete
                let rf = document.createElement("form")
                

                a.appendChild(rf)
            }
        }

        a.appendChild(document.createElement("hr"))
        m.appendChild(a)
    }
}

if (is_admin()) {
    document.getElementById("admin").hidden = false
}

fetch("/HSS/band/api/get_all_routes.php").then(function(r) {
    r.text().then(function(t) {
        t.split(";;").forEach(element => {
            allRoutes.push(new Route(element))//Create new route object and put in on the array
        });
    })
})