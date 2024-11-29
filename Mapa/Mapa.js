const express = require('express');
const router = express.Router(); // Criando o roteador

// Rota principal para exibir uma mensagem
router.get('/', (req, res) => {
    res.send('Bem-vindo à rota do mapa!');
});

// Outra rota como exemplo para dados via POST
router.get('/mapa', (req, res) => {
    res.render('mpa')
});

// Exportar o roteador
module.exports = router;
