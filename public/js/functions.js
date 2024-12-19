var lon = document.getElementById('longitude').innerText
var lat = document.getElementById('latitude').innerText
const mapa = document.getElementById('mapa');

// Adiciona o evento de duplo clique
mapa.addEventListener('dblclick', () => {
    window.location.href = '/mapa/' + lat + '/' + lon; 
});