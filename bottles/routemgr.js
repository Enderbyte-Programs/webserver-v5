var isAcceptingMapInput = false
var polycolour = "blue"
var isEditingRoute = false
var currentRouteIndex = 0
var addedMapPoints = Array()

function openRouteBox(isedit=false) {
    document.getElementById("addroute").hidden = false
    addmap.invalidateSize()
    isAcceptingMapInput = true
    if (!isedit) {
        isEditingRoute = false
        polycolour = "blue" 
        document.getElementById("mc1").disabled = false
        document.getElementById("mc2").disabled = false
        document.getElementById("mc3").disabled = false
        document.getElementById("addrouteerror").innerHTML = ""
    } else {
        isEditingRoute = true
        polycolour = "darkgreen"
        document.getElementById("mc1").disabled = false
        document.getElementById("mc2").disabled = false
        document.getElementById("mc3").disabled = false
        document.getElementById("addrouteerror").innerHTML = ""
    }
    updateMap()
}
function closeRouteBox() {
    document.getElementById("addroute").hidden = true
    isAcceptingMapInput = false
}
function submitRouteBox(isedit=false) {
    try {
        let mp = collapsePolygon()
        let bounds = addMapPolygon.getBounds().getCenter()
        let blat = bounds.lat
        let blong = bounds.lng
        let np = document.getElementById("nrnum").value
        let nn = document.getElementById("nrname").value
        if (nn.trim() === "") {
            document.getElementById("addrouteerror").innerHTML = "Please choose a name"
            return;
        }
        if (addedMapPoints.length < 3) {
            document.getElementById("addrouteerror").innerHTML = "Route polygon must have at least three nodes"
            return
        }
        if (!isedit) {
            let args = {
                name:nn,
                points:mp,
                centerlat:blat,
                centerlong:blong,
                people:np
            }
            console.log(JSON.stringify(args))
            call("add-route",args,function(r) {
                if (!r.iserror) {
                    mapClear()
                    closeRouteBox()
                    resetFields()
                    refreshPage()
                }
            })
        } else {
            let args = {
                name:nn,
                points:mp,
                centerlat:blat,
                centerlong:blong,
                people:np,
                rid:routeids[currentRouteIndex]
            }
            console.log(JSON.stringify(args))
            call("edit-route",args,function(r) {
                if (!r.iserror) {
                    mapClear()
                    closeRouteBox()
                    resetFields()
                    refreshPage()
                }
            })
        }
        
    } catch {
        document.getElementById("addrouteerror").innerHTML = "There was an error"
    }
}
var lastMarkerPosition;
//Set up leaflet map
var addmap = L.map('addmap').setView([49.3515, -123.1015], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(addmap);
addmap.on('click',function(e) {
    let lastpoint = e.latlng
    if (isAcceptingMapInput) {
        addedMapPoints.push(lastpoint)
        updateMap()
    }
})
var addMapPolygon;
function updateMap() {
    try {
        addmap.removeControl(addMapPolygon)
    } catch {

    }
    addMapPolygon = new L.Polygon(addedMapPoints,{color:polycolour})
    addMapPolygon.addTo(addmap)
}

function mapClear() {
    addedMapPoints = Array()//Clear points array
    polycolour = "blue"
    updateMap()
}

function mapUndo() {
    addedMapPoints.pop()
    updateMap()
}

function mapFinish() {
    isAcceptingMapInput = false
    polycolour = "purple"
    updateMap()
    document.getElementById("mc1").disabled = true
    document.getElementById("mc2").disabled = true
    document.getElementById("mc3").disabled = true
}

function collapsePolygon() {
    //Return SQL compatible string
    let final = ""
    addedMapPoints.forEach(element => {
        final += `${element.lat},${element.lng};`
    });
    return final
}