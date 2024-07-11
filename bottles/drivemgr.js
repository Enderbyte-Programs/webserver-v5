function refreshDrivePage() {
    call("get-active-drive",{},function(r) {
        let data = r.data[0]
        document.getElementById("adname").innerText = `Name: ${data.Name}`
        document.getElementById("adcdate").innerText = `Created Date: ${data.CreateDate}`
        document.getElementById("adddate").value = r2jst(data.DueDate)
        document.getElementById("adadate").value = r2jst(data.ActionDate)
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
    if (newddate == null || newddate === "" || newadate == null || newadate === "") {
        alert("Please fill in all dates.")
        return
    }
    call("update-ad",{
        "newddate" : newddate,
        "newadate" : newadate,
        "drivename" : currentname
    },function(r) {
        refreshDrivePage()
        alert("Saved changes")
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
    if (dname.trim() === "" || ddate === "" || adate === "") {
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
                    "adate" : adate
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