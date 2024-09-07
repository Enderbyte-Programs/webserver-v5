var isClosed = false

function refreshDrivePage() {
    call("get-active-drive",{},function(r) {
        if (r.data.length == 0) {
            document.getElementById("adname").innerText = "Please create a new drive"
            document.getElementById("ccd").style.display = "none"
            document.getElementById("rcd").style.backgroundColor = "lightgreen"
            document.getElementById("cadinput").hidden = true
            document.getElementById("managedrivesc").getElementsByTagName("h3")[0].innerHTML = "No active drive. Please create a new one"
        } else {
            let data = r.data[0]
            document.getElementById("adname").innerText = `Name: ${data.Name}`
            document.getElementById("adcdate").innerText = `Created Date: ${data.CreateDate}`
            document.getElementById("adddate").value = r2jst(data.DueDate)
            document.getElementById("adadate").value = r2jst(data.ActionDate)
            document.getElementById("stime").value = data.StartTime
            document.getElementById("etime").value = data.EndTime
        }
    })
    call("get-all-drives",{},function(r2) {
        let lll = document.getElementById("historicaldrives")
        lll.innerHTML = ""//Clear
        r2.data.forEach(element => {
            let d = document.createElement("li")
            d.innerText = `${element.Name} - C: ${element.CreateDate} D: ${element.DueDate} A: ${element.ActionDate}`
            lll.appendChild(d)
        });
    })
}

function r2jst(rawtime) {
    return new Date(rawtime).toISOString().split("T")[0]
}

function updateActiveDrive() {
    let currentname = document.getElementById("adname").innerText.replace("Name: ","").trim()
    //alert(currentname)
    let newddate = document.getElementById("adddate").value
    let newadate = document.getElementById("adadate").value
    let newstime = document.getElementById("stime").value
    let newetime = document.getElementById("etime").value
    if (newddate == null || newddate === "" || newadate == null || newadate === "" || newstime === "" || newetime === "") {
        alert("Please fill in all dates.")
        return
    }
    call("update-ad",{
        "newddate" : newddate,
        "newadate" : newadate,
        "drivename" : currentname,
        "stime" : newstime,
        "etime" : newetime
    },function(r) {
        document.location.reload()
    })
}

function openAddDrive() {
    document.getElementById("adddrive").hidden = false
}

function closeAddDrive() {
    document.getElementById("adddrive").hidden = true
}

function submitAddDrive() {
    if (!confirm("Warning: You are about to reset the program. All assignments will be reset. Are you sure you wish to continue?")) {
        return
    }
    let ddate = document.getElementById("ndddate").value
    let adate = document.getElementById("ndadate").value
    let dname = document.getElementById("ndname").value
    let stime = document.getElementById("nstime").value
    let etime = document.getElementById("netime").value
    if (dname.trim() === "" || ddate === "" || adate === "" || etime === "" || stime === "") {
        document.getElementById("adddriveerror").innerHTML = "Invalid. Please verify you have filled in the data"
    } else {
        call("drive-exists",{
            "drivename" : dname
        },function(r) {
            if (r.data) {
                document.getElementById("adddriveerror").innerHTML = "The name already exists"
            } else {
                call("new-drive",{
                    "drivename" : dname,
                    "ddate" : ddate,
                    "adate" : adate,
                    "stime" : stime,
                    "etime" : etime
                },function(r2) {
                    if (!r2.iserror) {
                        alert("Drive reset")
                        document.location.reload()
                    }
                })
            }
        })
    }
}

function createWithText(tagname,text) {
    let d = document.createElement(tagname)
    d.innerHTML = text
    return d
}

function createLink(text,link) {
    let d = document.createElement("a")
    d.innerHTML = text
    d.href = link
    return d
}

function updateStatus() {
    if (isClosed) {
        let children=document.getElementById("routelist").children
        for (let i = 0;i<children.length;i++) {
            let child = children[i]
            let buttons = child.getElementsByTagName("button")
            for (let j = 0;j<buttons.length;j++) {
                let button = buttons[j]
                if (button.id.endsWith("3") || button.id.endsWith("4")) {
                    continue
                }
                button.disabled = true
            }
        }
    }
}

//Load notice box
call("get-active-drive",{},function(r) {
    if (r.data.length == 0) {
        let docs = document.getElementById("notice")
        //document.getElementById("routelist").classList.add("disabled")//If no active drive, hide everything
        isClosed = true
        docs.classList.add("errorarea")
        docs.appendChild(createWithText("p",`There are no active bottle drives. This website is now closed.`))
        docs = document.getElementById("parentnotices")
        //document.getElementById("routelist").classList.add("disabled")//If no active drive, hide everything
        isClosed = true
        docs.classList.add("errorarea")
        docs.appendChild(createWithText("p",`There are no active bottle drives. This website is now closed.`))
        return
    }
    let data = r.data[0]
    //document.getElementById("adname").innerText = `Name: ${data.Name}`
    //document.getElementById("adcdate").innerText = `Created Date: ${data.CreateDate}`
    //document.getElementById("adddate").value = r2jst(data.DueDate)
    //document.getElementById("adadate").value = r2jst(data.ActionDate)
    let cname = data.Name
    let ddate = new Date(data.DueDate)
    let adate = new Date(data.ActionDate)
    let stime = data.StartTime
    let etime = data.EndTime
    ddate.setDate(ddate.getDate() + 1)
    adate.setDate(adate.getDate() + 1)
    let today = new Date()
    let docs = document.getElementById("notice")
    let pdocs = document.getElementById("parentnotices")
    if (isLoggedInAsParent() && !isadmin) {
        docs.hidden = true//Hide notices for parents
        docs.style.display = "none"
    } else {
        docs.appendChild(createWithText("h3",`Notices for ${cname}:`))
        if (today < adate && today < ddate) {
            docs.classList.add("noticearea")
            
            docs.appendChild(createWithText("p",`Please hand out all flyers by <b>${ddate.toDateString()}</b>`))
            docs.appendChild(createWithText("p",`The bottle drive will begin on <b>${adate.toDateString()}</b> at <b>${stime}</b>`))
            docs.appendChild(createWithText("p",`The bottle drive will end at <b>${etime}</b>`))
        } else if (today > ddate && today < adate) {
            docs.classList.add("warningarea")
            docs.appendChild(createWithText("p",`Delieveries were due on <b>${ddate.toDateString()}</b>. If you have not delivered, please do so as soon as possible.`))
            docs.appendChild(createWithText("p",`The bottle drive will begin on <b>${adate.toDateString()}</b> at <b>${stime}</b>`))
            docs.appendChild(createWithText("p",`The bottle drive will end at <b>${etime}</b>`))
        } else if (today > ddate && today > adate) {
            docs.classList.add("errorarea")
            isClosed = true
            docs.appendChild(createWithText("p",`The bottle drive's date has passed. This website is now closed.`))
            document.getElementById("routelist").classList.add("disabled")//If no active drive, hide everything
        } else {
            docs.classList.add("noticearea")
            //docs.appendChild(createWithText("h3",`Notices for ${cname}:`))
            docs.appendChild(createWithText("p",`Please hand out all flyers by <b>${ddate.toDateString()}</b>`))
            docs.appendChild(createWithText("p",`The bottle drive will begin on <b>${adate.toDateString()}</b> at <b>${stime}</b>`))
            docs.appendChild(createWithText("p",`The bottle drive will end at <b>${etime}</b>`))
        }
    }

    
    // Load data for parents
    pdocs.appendChild(createWithText("h3",`Parent Notices for ${cname}:`))
    if (today < adate) {
        pdocs.classList.add("noticearea")
        pdocs.appendChild(createWithText("p",`<u>IMPORTANT:</u> If you wish to be a volunteer driver, you must fill out <a href="https://www.sd44.ca/school/handsworth/ProgramsServices/departments/music/hmpa/Documents/hmpa%20volunteer%20driver%20form.pdf">this form</a> and submit it to the school office before you volunteer.<i><br>If you have previously filled out this form you do <b>NOT</b> need to fill it out again.</i>`))

        pdocs.appendChild(createWithText("p",`The bottle drive will begin on <b>${adate.toDateString()}</b> at <b>${stime}</b>`))
        pdocs.appendChild(createWithText("p",`The bottle drive will end at <b>${etime}</b>`))
    }  else if (today > ddate && today > adate) {
        pdocs.classList.add("errorarea")
        isClosed = true
        pdocs.appendChild(createWithText("p",`The bottle drive's date has passed. This website is now closed.`))
        document.getElementById("routelist").classList.add("disabled")//If no active drive, hide everything
    } else {
        pdocs.classList.add("noticearea")
        //pdocs.appendChild(createWithText("h3",`Notices for ${cname}:`))
        pdocs.appendChild(createWithText("p",`The bottle drive will begin on <b>${adate.toDateString()}</b> at <b>${stime}</b>`))
        pdocs.appendChild(createWithText("p",`The bottle drive will end at <b>${etime}</b>`))
    }
    if (isLoggedInAsStudent() && !isLoggedInAsParent() && !isadmin) {
        pdocs.hidden = true
    }
    
    
})

function deleteDrive() {
    if (!confirm("Are you sure you wish to close the drive? This action is irreversible!")) {
        return
    }
    call("close-drive",{},function(r) {
        document.location.reload()
    })
}