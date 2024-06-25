var map = L.map('map').setView([42, 9], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([41.9181,8.7386]).addTo(map)
marker.bindPopup("Napoleon's Birthplace House").openPopup()