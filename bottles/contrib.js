var volfinal = new Map()
call("get-all-volunteers",{},function(r) {
    let names = Array()
    r.data.forEach(element => {
        //Element is a volunteer object
        let name = element.VolunteerName
        if (names.includes(name)) {

        } else {
            names.push(name)
        }
        if (volfinal[name] != undefined) {
            volfinal[name]++
        } else {
            volfinal[name] = 1
        }
    });
    
    let listd = document.getElementById("contriblist")
    let rr = 0
    names.forEach(key => {
        let value = volfinal[key]
        let i = document.createElement("li")
        if (rr < 5) {
            i.innerHTML = `<b>${key} - ${value} routes</b>`
        } else {
            i.innerHTML = `${key} - ${value} routes`
        }
        listd.appendChild(i)
        rr = rr + 1;
    });
        
    
})