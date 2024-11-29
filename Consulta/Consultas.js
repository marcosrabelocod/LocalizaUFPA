const express = require('express');
const router = express.Router(); // Criando o roteador

// Rota principal para exibir uma mensagem
// Outra rota como exemplo para dados via POST
router.get('/pesquisa', (req, res) => {
    res.render('pesquisa')
});

// Exportar o roteador
module.exports = router;
