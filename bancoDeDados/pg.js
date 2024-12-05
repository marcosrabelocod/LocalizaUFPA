const { Pool } = require('pg');

// Configurações de conexão
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'localizaufpa',
  password: 'root',
  port: 5432, // Porta padrão do PostgreSQL
});


//                     ***FUNÇÕES DE CONSULTA***
//****************************************************************

//FUNÇÃO DE SELEÇÃO DA TELA DE PESQUISA
async function selectLocais() {
  const client = await pool.connect(); // Conexão ao banco de dados
  try {
    const res = await client.query('SELECT id, nome FROM localidade;');
    return res.rows; // Retorna os resultados como array de objetos
  } finally {
    client.release(); // Libera a conexão para o pool
  }
}

//FUNÇÃO DE PESQUISA DE VALORES ISOLADOS
async function selectId(tabela, valor) {
  const client = await pool.connect(); // Conectar ao banco
  try {
    const sql = `SELECT * FROM ${tabela} WHERE id = $1;`; // Usando o parâmetro $1
    const res = await client.query(sql, [valor]); // Passando valor como parâmetro
    return res.rows[0]; // Retorna o primeiro registro encontrado
  } finally {
    client.release(); // Libera a conexão para o pool
  }
}

//FUNÇÃO DA BARRA DE PESQUISA
async function selectPesquisa(name) {
  const client = await pool.connect(); // Conectar ao banco
  try {
    const sql = 'SELECT Id, Nome FROM localidade WHERE Nome LIKE $1'; // Usando o parâmetro $1
    const res = await client.query(sql, [`%${name}%`]); // Passando o parâmetro como uma string com '%'
    return res.rows; // Retorna todos os registros encontrados
  } finally {
    client.release(); // Libera a conexão para o pool
  }
}
module.exports={selectLocais, selectId, selectPesquisa}