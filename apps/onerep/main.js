var e = Math.exp(1)

function get_selected_select_option(id) {
    let pe = document.getElementById(id)
    let si = pe.selectedIndex
    return pe.children[si].value
}

function update() {
    let algo = get_selected_select_option("algo-selector")
    let weight = document.getElementById("weight").value
    let reps = document.getElementById("reps").value
    let islbs = document.getElementById("useimp").checked
    if (islbs) {
        weight = weight / 2.2
    }
    if (reps == 0) {
        alert("Please fill in a number higher than 0 for reps.")
        return
    }

    let result = eval(algo)

    if (islbs) {
        result = result * 2.2
    }
    result = Math.round(result)

    document.getElementById("output").innerText = result
    if (islbs) {
        document.getElementById("outputunit").innerText = " lbs"
    } else {
        document.getElementById("outputunit").innerText = " kg"
    }

    if (result < weight) {
        alert("The algorithm does not like your values. Try again with a different algorithm.")
    }
}

function reset() {
    document.getElementById("weight").value = 0
    document.getElementById("reps").value = 0
    document.getElementById("output").innerText = "0"
}