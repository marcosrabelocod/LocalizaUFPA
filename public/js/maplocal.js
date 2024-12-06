
var lon = document.getElementById('longitude').innerText
var lat = document.getElementById('latitude').innerText


var pin = L.icon({
	iconUrl:'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
	iconSize:     [30, 47], // size of the icon
    iconAnchor:   [15, 48]

})

var map = L.map('map').setView([lon, lat], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker = L.marker([lon, lat], {icon: pin}).addTo(map);
