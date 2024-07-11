var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("cactive");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = content.scrollHeight + "px";
      setTimeout(function() {
        content.style.maxHeight = null;
      }, 50)
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      setTimeout(function() {
        content.style.maxHeight = "fit-content";
      }, 250)
    }
  });
}