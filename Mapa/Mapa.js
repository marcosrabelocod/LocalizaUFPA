const express = require('express');
const router = express.Router(); // Criando o roteador

// Rota principal para exibir uma mensagem
router.get('/', (req, res) => {
    res.render('home');
});

// Outra rota como exemplo para dados via POST
router.get('/mapa', (req, res) => {
    res.render('mpa')
});

router.get('/mapa/:latitude/:longitude', (req, res) => {
    const latitude = req.params.latitude
    const longitude = req.params.longitude
    res.render('mpaLocal',{
        latitude:latitude,
        longitude:longitude
    })
});
// Exportar o roteador
module.exports = router;
