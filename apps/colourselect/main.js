function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function showerror() {
    document.getElementById("error").hidden = false
}

function hideerror() {
    document.getElementById("error").hidden = true
}

function copyhex() {
    let pgh = structuredClone(document.getElementById("cbutton").style.backgroundColor)
    document.getElementById("cbutton").style.backgroundColor = "green"
    navigator.clipboard.writeText(document.getElementById("hex").value)
    setTimeout(() => {
        document.getElementById("cbutton").style.backgroundColor =pgh
    }, 500);
}

function onschange() {
    hideerror()
    let ldh = rgbToHex(
        parseInt(document.getElementById("r").value),
        parseInt(document.getElementById("g").value),
        parseInt(document.getElementById("b").value)
    )

    document.getElementsByTagName("body")[0].style.backgroundColor = ldh

    document.getElementById("hex").value = ldh
}

function onhchange() {
    let nnh = document.getElementById("hex").value
    document.getElementsByTagName("body")[0].style.backgroundColor = nnh
    let nnhp = hexToRgb(nnh)
    if (nnhp === null) {
        showerror()
        return
    } else {
        hideerror()
    }
    document.getElementById("r").value = nnhp.r
    document.getElementById("g").value = nnhp.g
    document.getElementById("b").value = nnhp.b
}