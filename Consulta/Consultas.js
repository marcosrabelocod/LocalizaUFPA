const express = require('express');
const router = express.Router(); // Criando o roteador
//exportar vinculo com banco de dados
const db = require("../bancoDeDados/pg")
//ROTA DE PESQUISA DE LOCAIS
router.get('/pesquisa', async (req, res) => {
    try {
        const dados = await db.selectLocais();

        // Verifica se os dados estão vazios ou indefinidos
        if (!dados || dados.length === 0) {
            return res.render('pesquisa', {
                dados: [],
                mensagem: 'Nenhum local encontrado.' // Exibe uma mensagem no frontend
            });
        }

        // Renderiza a página com os dados encontrados
        res.render('pesquisa', {
            dados: dados
        });
    }
    catch (error) {
        // Caso ocorra um erro na execução da função
        console.error('Erro ao buscar os locais:', error);

        res.render('pesquisa', {
            dados: [],
            mensagem: 'Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.'
        });
    }
});

router.get('/local/:id', async (req, res) => {
    try {
        // Obtém o ID da URL
        const id = req.params.id;

        // Valida se o ID é um número válido (opcional, dependendo da necessidade)
        if (isNaN(id)) {
            throw new Error('ID inválido'); // Gera um erro manualmente para capturar no catch
        }

        // Tenta buscar o local no banco de dados
        const local = await db.selectId('localidade', id);

        // Verifica se a consulta retornou algum dado
        if (!local || local.length === 0) {
            throw new Error('Nenhum local encontrado para este ID');
        }

        // Renderiza a página com os dados encontrados
        res.render('local', { local }); // Pode ajustar para passar `local` ao frontend
        console.log(local);
    } catch (error) {
        // Trata erros ocorridos durante a execução
        console.error('Erro ao buscar o local:', error.message);

        // Exibe uma mensagem no console (no futuro, renderize uma página de erro)
        console.log('erro');

        // Por enquanto, envia uma resposta genérica ao cliente
        res.status(400).send('Ocorreu um erro. Verifique o ID informado.');
    }
});

// Exportar o roteador
module.exports = router;
