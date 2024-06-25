function run() {
    let d = document.getElementById("stat")
    d.innerText = "1770 - Before Napoleon"
    setTimeout(() => {
        d.innerText = "1793 - War of the First Coalition"
        setTimeout(() => {
            d.innerText = "1796 - Attack on Austria"
            setTimeout(() => {
                d.innerText = "1799 - War of the Second Coalition"
                setTimeout(() => {
                    d.innerText = "1808 - Capture of Spain"
                    setTimeout(() => {
                        d.innerText = "1812 - Attack on Russia - Empire at its peak"
                        setTimeout(() => {
                            run()
                        }, 1990);
                    }, 990);
                }, 990);
            }, 990);
        }, 990);
    }, 990);
}