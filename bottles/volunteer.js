var routeids = Array()
var template = structuredClone(document.getElementById("routelist").innerHTML)
class Route {
    constructor(apiretr,nloc) {
        this.loc = nloc
        this.polygon = compileNodes(apiretr.MapNodes)
        this.routeid = deforce(apiretr.RouteID)
        
        this.routename = apiretr.RouteName
        this.neededvolunteers = deforce(apiretr.NeededPeople)
        this.centerlocation = {
            lat: apiretr.CenterLat,
            lng: apiretr.CenterLong
        }
        this.completed = apiretr.IsCompleted
        document.getElementById("routelist").innerHTML += template.replaceAll("$rid",this.routeid).replaceAll("$routename",this.routename).replace("hidden=\"\"","")
        this.respbox = document.getElementById(this.routeid+"root")
    }
}

var routes = Array()
function refreshPage() {
    routes = Array()
    routeids = Array()
    document.getElementById("routelist").innerHTML = ""
    let ci = 0
    call("get-all-routes",{},function(r) {
        r.data.forEach(element => {
            let nci = ci
            routeids.push(element.RouteID)
            let d = new Route(element,nci)
            
            routes.push(d)// Why Wont You Just Work!?
            
            ci = ci + 1
        });
        ci = 0
        routeids.forEach(rid => {
            let nci = ci
            if (!isadmin) {
                document.getElementById(rid+"b3").style.display = "none"
                document.getElementById(rid+"b4").style.display = "none"
            } else {
                document.getElementById(rid+"b3").style.display = "inline"
                document.getElementById(rid+"b4").style.display = "inline"
            }
            console.log(rid)
            document.getElementById(rid+"b1").onclick = function() {
                runVolunteer(nci)
            }
            document.getElementById(rid+"b2").onclick = function() {
                runComplete(nci)
            }
            document.getElementById(rid+"b3").onclick = function() {
                runEditRoute(nci)
            }
            document.getElementById(rid+"b4").onclick = function() {
                runDeleteRoute(nci)
            }
            ci = ci + 1
        });
        routes.forEach(routedata => {
            let map = L.map(routedata.routeid+"map").setView(routedata.centerlocation,15)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            new L.Polygon(routedata.polygon).addTo(map)
        });
    })
}
function deforce(val) {
    //Fix weird things with PHP by converting false bools back to ints
    if (val === false) {
        return 0
    } 
    if (val === true) {
        return 1
    }
    return val
}

function compileNodes(raw) {
    //Compile a list of nodes into a polygon object
    let d = Array()
    raw.split(";").forEach(element => {
        if (element.trim() === "") {
        } else {
            d.push({
                lat: parseFloat(element.split(",")[0].trim()),
                lng: parseFloat(element.split(",")[1].trim())
            })
        }
    });
    return d
}

function runVolunteer(index) {
    
}
function runComplete(index) {

}
function runEditRoute(index) {
    let d = routes[index]
    document.getElementById("nrname").value = d.routename
    document.getElementById("nrnum").value = d.neededvolunteers
    addedMapPoints = d.polygon
    openRouteBox(true)
}
function runDeleteRoute(index) {
    let d = routes[index]
    if (confirm(`Are you sure you wish to delete ${d.routename}?`)) {
        call("delete-route",{name:d.routename},function(r) {
            refreshPage()
        })
    }
}
function runDeletePerson(index,lindex) {

}

refreshPage()