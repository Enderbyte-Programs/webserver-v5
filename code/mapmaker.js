var map;
function initmap(id,ilat,ilong,iz) {
    map  = L.map(id).setView([ilat, ilong], iz);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
function makemarker(lat,long,name) {
    var marker = L.marker([lat,long]).addTo(map)
    marker.bindPopup(name).openPopup()
}
