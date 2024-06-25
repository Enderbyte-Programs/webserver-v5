function run() {
    let d = document.getElementById("strategy")
    d.innerText = "Before The Battle"
    setTimeout(() => {
        d.innerText = "Splitting the Enemy"
        setTimeout(() => {
            d.innerText = "Defeating one"
            setTimeout(() => {
                d.innerText = "Defeating the other - Victory"
                setTimeout(() => {
                    run()
                }, 1490);
            }, 990);
        }, 990);
    }, 990);
}