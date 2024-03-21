function makeBoldText(text) {
    let bld = document.createElement("strong")
    bld.appendChild(document.createTextNode(text))
    return bld
}