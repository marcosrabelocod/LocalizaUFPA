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

        //dados das tabelas auxiliares
        let origem = await db.selectId('localidade', local.origem);
        const setor = await db.selectId('setor', local.setor);
        const portao = await db.selectId('portao', local.portao)

        if (!origem || Origem.length === 0) {
            origem = {
                id : local.id,
                nome: local.nome
            }
        }
        // Renderiza a página com os dados encontrados
        res.render('local', { 
            local:local,
            origem:origem,
            setor: setor,
            portao: portao
        }); // Pode ajustar para passar `local` ao frontend
    } catch (error) {
        // Trata erros ocorridos durante a execução
        console.error('Erro ao buscar o local:', error.message);

        // Exibe uma mensagem no console (no futuro, renderize uma página de erro)
        console.log('erro');

        // Por enquanto, envia uma resposta genérica ao cliente
        res.status(400).send('Ocorreu um erro. Verifique o ID informado.');
    }
});
router.get("/comit", (req, res) =>{
    var search = req.query.search;
    res.redirect('/pesquisa/' + search)
});

router.get('/pesquisa/:nome', async (req, res) => {
    try {
        // Obtém o ID da URL
        const nome = req.params.nome;

        // Tenta buscar o local no banco de dados
        const dados = await db.selectPesquisa(nome);

        // Valida se o ID é um número válido (opcional, dependendo da necessidade)
        if (!dados || dados.length === 0) {
            return res.render('pesquisa', {
                dados: [],
                mensagem: 'Nenhum local encontrado.' // Exibe uma mensagem no frontend
            });
        }
        res.render('pesquisa', {
            dados: dados
        });
    }
    catch{
        res.redirect("/")
        console.log('erro')
    }
})

// Exportar o roteador
module.exports = router;
