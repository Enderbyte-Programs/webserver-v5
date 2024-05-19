firstload = true;
function mark_complete(pos,nv) {
    t = document.getElementById("tbody")
    routename = t.rows[pos].cells[0].innerText
    let nnv;
    if (nv) {
        nnv = 1;
    } else {
        nnv = 0;
    }
    fetch(`/HSS/bottles/set_state.php?route=${routename}&state=${nnv}`).then(function(r) {
        updateTable()
    })
    //alert(routename)
}

function makeBoldText(text) {
    let bld = document.createElement("strong")
    bld.appendChild(document.createTextNode(text))
    return bld
}

function  realUpdateTable() {
    $("#tbody tr").remove(); 
    fetch("/HSS/bottles/get_all.php").then(function(r){
        r.text().then(function(t) {
            $('#bigtable').fadeIn(500);
            let b = document.getElementById("tbody")
            let hrow = b.insertRow()
            hrow.insertCell().appendChild(makeBoldText("Route Name/ID"))
            let ind = 0;
            t.split(";;").forEach(element => {
                    ind++
                    let nind = ind//Force scope to reset
                    if (element !== "") {
                    let ts = element.split(";")
                    let ic = parseInt(ts[0]) === 1
                    let inn = ts[1]
                    let nr = b.insertRow()
                    if (ic) {
                        nr.classList.add("okrow")
                    }
                    let tcell = nr.insertCell()
                    if (ic) {
                        tcell.classList.add("okrow")
                        
                    }
                    tcell.appendChild(document.createTextNode(inn))
                    let bcell = nr.insertCell()
                    let btn = document.createElement("button")
                    if (ic) {
                        btn.style = "background-color:pink"
                        btn.innerText = "Incomplete"
                    } else {
                        btn.style = "background-color:lightgreen"
                        btn.innerText = "Mark Completed"
                    }
                    btn.classList.add("button")
                    btn.onclick = function() {
                        mark_complete(nind,!ic)
                    }
                    bcell.appendChild(btn)
                }
                firstload = false

            });
        })
    })
}

function updateTable() {//Reason for weird layout is for nice graphics and shit like that
    if (!firstload) {
        $('#bigtable').fadeOut(500);
        setTimeout(() => {
            realUpdateTable()
        }, 400);
    } else {
        realUpdateTable()
    }
    
    
}

updateTable()