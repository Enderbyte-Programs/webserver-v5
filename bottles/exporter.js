//This module handles the conversion to CSV of data

function e(inp) {
    inp = inp.toString()
    return inp.replaceAll("\"","\"\"")
}

function exportParentData() {
    let final = "\"Item Name\",\"Name\",\"Email\",\"Phone Number\",\"Comment\"\n"
    ParentData.forEach(item => {
        item.contributors.forEach(person => {
            final += `"${e(item.title)}","${e(person.VolunteerName)}","${e(person.VolunteerEmail)}","+1 ${e(person.VolunteerPhone)}","${e(person.Description)}"\n`
        });

    });
    download("parent-export.csv",final)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }