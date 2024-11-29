const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuração para servir arquivos estáticos
app.use(express.static('public'));

//view engine
app.set('view engine', 'ejs')

// Configuração do Body Parser para lidar com JSON e dados de formulários
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar os roteadores dos arquivos Mapa.js e Consulta.js
const mapaRoutes = require('./Mapa/Mapa.js');
const consulta = require('./Consulta/Consultas.js')



// Usar as rotas do mapa
app.use('/', mapaRoutes);
app.use('/', consulta);

// Iniciar o servidor
app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
