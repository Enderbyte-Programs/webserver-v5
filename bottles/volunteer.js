var routeids = Array()
var template = structuredClone(document.getElementById("routelist").innerHTML)
class Route {
    constructor(apiretr,nloc,completedrouteids) {
        //completedrouteids will be used to determine if the person has permission to do this. It will be set to [0] if admin
        let lia = false
        if (completedrouteids[0] === 0) {
            lia = true
        }
        //console.log(completedrouteids)
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
        
        document.getElementById("routelist").innerHTML += template.replaceAll("$rid",this.routeid).replaceAll("$routename",this.routename).replace("hidden=\"\"","").replace("$people",conjugatepeople(this.neededvolunteers))
        this.respbox = document.getElementById(this.routeid+"root")
        if (this.completed) {
            document.getElementById(this.routeid+"overlay").hidden = false
            document.getElementById(this.routeid+"b2").innerHTML = "Mark route incomplete"
        }
        if (completedrouteids.includes(this.routeid)) {
            document.getElementById(this.routeid+"b1").innerHTML = "Unvolunteer"
            document.getElementById(this.routeid+"b1").style.backgroundColor = "pink"
        }
        if (!completedrouteids.includes(this.routeid) && !lia) {
            document.getElementById(this.routeid+"b2").disabled = true
        }
        
    }
}

var routes = Array()
function refreshPage() {
    let oldpos = window.scrollY
    startProgress()
    routes = Array()
    routeids = Array()
    document.getElementById("routelist").innerHTML = ""
    let ci = 0
    call("get-all-routes",{},function(r) {
        call("get-contributions",{name:username},function(r2) {
            let permits = Array()
            if (isadmin) {
                permits.push(0)
            }
            r2.data.forEach(element => {
                permits.push(element.VolunteeredForID)
            });
            
            r.data.forEach(element => {
                let nci = ci
                routeids.push(element.RouteID)
                let d = new Route(element,nci,permits)
                
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
                //console.log(rid)
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
                call("get-volunteers",{routeid:rid},function(r3) {
                    let lci = 0;
                    r3.data.forEach(element => {
                        let nlci = lci;
                        let fn = `${element.VolunteerName} in ${element.VolunteerGrade} ${element.VolunteerPrimaryClass}`
                        let c = document.createElement("li")
                        c.innerHTML = fn+`<button class="smallbutton" onclick=runDeletePerson(${rid},${nlci})>X</button>`
                        document.getElementById(rid+"people").appendChild(c)
                        lci = lci + 1
                    });
                })
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
            window.scrollTo(0,oldpos)
            updateStatus()
            endProgress()
        })
        
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

function runVolunteerA(index) {
    
    let rid = routeids[index]
    if (document.getElementById(rid+"b1").innerHTML.toLowerCase().startsWith("un")) {
        call("unvolunteer",{
            forwhich:rid,
            name:username
        },function(r) {
            refreshPage()
        })
        return
    }
    let d2p = {
        forwhich:rid,
        name:username,
        class:userclass,
        grade:usergrade
    }
    console.log(d2p)
    call("volunteer",d2p,function(r) {
        refreshPage()
    })
}

function runVolunteer(index) {
    if (!(doesCookieExist("name") && doesCookieExist("grade") && doesCookieExist("class"))) {
        loadsb(function() {
            runVolunteerA(index)
        })
    } else {
        username = getCookie("name")
        usergrade = getCookie("grade")
        userclass = getCookie("class")
        runVolunteerA(index)
    }
}
function runComplete(index) {
    call("invert-route",{
        routeid:routeids[index]
    },function(r) {
        refreshPage()
    })
}
function runEditRoute(index) {
    let d = routes[index]
    document.getElementById("nrname").value = d.routename
    document.getElementById("nrnum").value = d.neededvolunteers
    addedMapPoints = d.polygon
    currentRouteIndex = index
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
    let rid = index
    let dbox = document.getElementById(rid+"people")
    let sd = dbox.children[lindex].innerHTML.split("<")[0]
    let pname = sd.split(" in ")[0]
    call("unvolunteer",{
        forwhich:rid,
        name:pname
    },function(r) {
        refreshPage()
    })
}

refreshPage()