const { Pool } = require('pg');

// Configurações de conexão
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'localizaufpa',
  password: 'root',
  port: 5432, // Porta padrão do PostgreSQL
});