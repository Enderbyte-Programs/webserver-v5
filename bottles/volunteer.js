var routeids = Array()
var template = structuredClone(document.getElementById("routelist").innerHTML)
var ptemplate = structuredClone(document.getElementById("parentlist").innerHTML)
var parentContributedToIds = Array()
var ToVolunteerCallback = -1
var OpenPviInfoID = 0
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
            document.getElementById(this.routeid+"b2").innerHTML = "✖️"
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

class ParentItem {
    constructor(id,title,description,slots,contributors,needsdescription) {
        this.id = id
        this.title = title
        this.description = description
        this.slots = deforce(slots)
        this.nd = needsdescription
        let ncont = Array()
        contributors.forEach(element => {
            if (deforce(element.VolunteerForID) === id) {
                ncont.push(element)
            }
        });
        this.contributors = ncont
        this.neededslots = slots - ncont.length
    }
}

var ParentData = Array()
var AllVolunteers = new Map()
var routes = Array()
var permits = Array()
//var routeIVolunFor = Array()
function refreshPage(callback) {
    let oldpos = window.scrollY
    startProgress()
    routes = Array()
    //routeIVolunFor = Array()
    parentContributedToIds = Array()
    ParentData = Array()
    routeids = Array()
    permits = Array()
    AllVolunteers = new Map()
    document.getElementById("routelist").innerHTML = ""
    document.getElementById("parentlist").innerHTML = ""
    let ci = 0
    call("get-all-routes",{},function(r) {
        call("get-contributions",{name:username},function(r2) {
            call("get-all-volunteers",{},function(gavresp) {
                
                gavresp.data.forEach(gvri => {
                    let gvri_vfid = String(gvri.VolunteeredForID)//Force string for KV goodness
                    if (!AllVolunteers.has(gvri_vfid)) {
                        AllVolunteers[gvri_vfid] = Array()
                        AllVolunteers[gvri_vfid].push(gvri)
                    } else {
                        AllVolunteers[gvri_vfid].push(gvri)
                    }
                });
                
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

                    let lci = 0;

                    try {    
                        AllVolunteers[String(rid)].forEach(element => {
                            let nlci = lci;
                            let fn = `${element.VolunteerName} in ${element.VolunteerPrimaryClass}`
                            let c = document.createElement("li")
                            if (isadmin) {
                                c.innerHTML = fn+`<button class="smallbutton" onclick=runDeletePerson(${rid},${nlci})>❌</button>`
                            } else {
                                c.innerHTML = fn
                            }
                            document.getElementById(rid+"people").appendChild(c)
                            lci = lci + 1
                        });
                    } catch {
                        //Do nothing
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

                //Add parent data
                call("get-all-pvi",{},function(itemr) {
                    call("get-all-parents",{},function(pvr) {

                        itemr.data.forEach(pitem => {
                            let iiid = deforce(pitem.ItemID)
                            let iin = pitem.Title
                            let iis = pitem.Slots
                            let iid = pitem.Description
                            let ind = pitem.NeedsDescription
                            
                            ParentData.push(new ParentItem(iiid,iin,iid,iis,pvr.data,ind))
                        });
                        //Iter through newly structured data and parse
                        call("get-parent-contributions",{name:username},function(conts) {
                            //To do, load contributed to ids into array then parse onto page
                            conts.data.forEach(cond => {
                                parentContributedToIds.push(deforce(cond.VolunteerForID))
                            });
                            let ci = -1
                            ParentData.forEach(element => {
                                ci += 1
                                let eid = structuredClone(element.id)
                                let cindex = structuredClone(ci)
                                //Parse it onto a page
                                let outdata = structuredClone(ptemplate)
                                outdata = outdata.replaceAll("$pid",eid).replace("hidden=\"\"","").replaceAll("$title",element.title).replace("$description",element.description).replace("$nslots",conjugatevolunteers(element.neededslots)).replace("$hslots",element.slots - element.neededslots).replace("$slots",element.slots)
                                document.getElementById("parentlist").innerHTML += outdata
                                if (isadmin) {
                                    document.getElementById(eid+"infobutton").style.display = "inline"
                                    document.getElementById(eid+"editbutton").style.display = "inline"
                                    document.getElementById(eid+"deletebutton").style.display = "inline"
                                }
                            
                            });
                            ci = 0
                            ParentData.forEach(edata => {
                                let element = edata
                                eid = edata.id
                                let cindex = ci
                                if (isClosed) {
                                    document.getElementById(eid+"volbutton").disabled = true
                                }
                                if (parentContributedToIds.includes(eid)) {
                                    document.getElementById(eid+"volbutton").innerText = "Unvolunteer"
                                    document.getElementById(eid+"volbutton").style.backgroundColor = "pink"
                                } else {
                                    if (edata.neededslots == 0) {
                                        document.getElementById(eid+"volbutton").disabled = true
                                    }
                                }
                                let vlist = document.getElementById(eid+"vlist")
                                let vloc = -1
                                element.contributors.forEach(element2 => {
                                    vloc += 1
                                    let vlocc = structuredClone(vloc)
                                    let a = document.createElement("p")
                                    a.style.display = "inline"
                                    let mb = document.createElement("button")
                                    mb.classList.add("smallbutton")
                                    mb.innerHTML = "❌"
                                    mb.style.padding = "0"
                                    mb.onclick = function() {
                                        runOustParent(cindex,vlocc)
                                    }
                                    mb.style.float = "right"

                                    a.innerText = `${element2.VolunteerName} - ${element2.VolunteerEmail} / ${element2.VolunteerPhone}`
                                    vlist.appendChild(a)
                                    vlist.appendChild(mb)
                                    vlist.appendChild(document.createElement("br"))
                                });
    
                                document.getElementById(eid+"volbutton").onclick = function() {
                                    runParentVolunteer(cindex)
                                }
                                document.getElementById(eid+"ivolbutton").onclick = function() {
                                    runParentVolunteeri(cindex,
                                        document.getElementById(
                                            ParentData[
                                                cindex
                                            ].id+"vbta"
                                        ).value
                                    )
                                }
                                document.getElementById(eid+"deletebutton").onclick = function() {
                                    runDeleteParentItem(cindex)
                                }
                                document.getElementById(eid+"editbutton").onclick = function() {
                                    runEditParentItem(cindex)
                                }
                                document.getElementById(eid+"infobutton").onclick = function() {
                                    runShowParentContrib(cindex)
                                }
                                if (eid == OpenPviInfoID) {
                                    OpenPviInfoID = 0// Reset it
                                    document.getElementById(eid+"infobox").hidden = false
                                }
                                ci = ci + 1
                            })
                            
                            window.scrollTo(0,oldpos)
                            updateStatus()
                            endProgress()
                            if (callback != null) {
                                callback()
                            }
                        })

                        
                    })
                })
            })
            

            
        })
        
    })
}

function runParentVolunteeri(index,description) {
    let routedata = ParentData[index]
    if (parentContributedToIds.includes(routedata.id)) {
        call("parent-unvolunteer",{
            name:username,
            forwhat:routedata.id
        },function(r) {
            refreshPage()
        })
    } else {
        call("parent-volunteer",{
            name : username,
            email : useremail,
            phone : userphone,
            forwhat : routedata.id,
            description : description
        },function(r) {
            refreshPage()
        })
    }
}

function runParentVolunteer(index) {
    let routedata = ParentData[index]
    if (!isLoggedInAsParent()) {
        ToVolunteerCallback = index
        initParent()
        return
    }
    if (routedata.nd && !parentContributedToIds.includes(routedata.id)) {
        document.getElementById(routedata.id+"volbox").hidden = false
    } else {
        runParentVolunteeri(index,"")
    }
}

function runEditParentItem(index) {
    let routedata = ParentData[index]
    document.getElementById("cpititle").value = routedata.title
    document.getElementById("cpita").value = routedata.description
    document.getElementById("cpislots").value = routedata.slots
    document.getElementById("cpicb").checked = routedata.nd
    isEditingParentItem = true
    editingParentItemID = routedata.id
    document.getElementById("cpibox").hidden = false
}

function runDeleteParentItem(index) {
    let routedata = ParentData[index]
    if (confirm(`Are you sure you wish to delete ${routedata.title}?`)) {
        call("delete-pvi",{id:routedata.id},function(r) {
            refreshPage()
        })
    }
}

function runShowParentContrib(index) {
    document.getElementById(ParentData[index].id+"infobox").hidden = false
}

function runOustParent(index,lindex) {
    let routedata = ParentData[index]
    let cdata = routedata.contributors[lindex]
    call("oust",{name:cdata.VolunteerName,id:routedata.id},function(r) {
        OpenPviInfoID = routedata.id
        document.getElementById(routedata.id+"infobox").hidden = true
        refreshPage()
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
    if (permits.includes(rid)) {
        //Unvlunteer
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

function submitAddPVI() {
    let slots = document.getElementById("cpislots").value
    let title = document.getElementById("cpititle").value
    let description = document.getElementById("cpita").value
    let usedescription = b2i(document.getElementById("cpicb").checked)
    if (title === "" || description === "") {
        alert("Ensure you have filled out all text fields.")
        return
    } else {
        if (isEditingParentItem) {
            isEditingParentItem = false//Reset
            args = {
                slots:slots,
                title:title,
                description:description,
                id:editingParentItemID,
                needsrd:usedescription
            }
            call("update-pvi",args,function(r) {
                document.getElementById('cpibox').hidden = true
                resetFields()
                refreshPage()
            })
        } else {
            args = {
                slots:slots,
                title:title,
                description:description,
                NeedsDescription:usedescription
            }
            call("add-pvi",args,function(r) {
                document.getElementById('cpibox').hidden = true
                resetFields()
                refreshPage()
            })
        }
        
    }
}

refreshPage()