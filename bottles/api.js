var apipath = window.location.pathname.replace("index.html","")+"/api-format.json"
var calls = new Map()

fetch(apipath).then(function(r){r.text().then(function(t) {
    let jsonapi = JSON.parse(t).api
    jsonapi.forEach(element => {
        calls[element.action] = element
    });
})})

class APIResponse {
    constructor(raw) {
        let r = JSON.parse(raw)
        this.iserror = r.error
        this.data = r.data
    }
}

function call(action,variables,callback) {
    variables["action"] = action
    let rawvars = JSON.stringify(variables)
    //alert(rawvars)
    fetch(window.location.pathname.replace("index.html","")+"/api.php", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: rawvars
    }).then(
        function(r) {
            r.text().then(function(t) {
                console.log(t)
                //alert(t)
                callback(new APIResponse(t))
            })
        }
    )
}