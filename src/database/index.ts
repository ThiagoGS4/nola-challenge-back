import knex from 'knex';
// Importa o config (use .js se você estiver em ESM/NodeNext)
import config from './knexfile';

// O Render define NODE_ENV='production' automaticamente
// Se não estiver definido, usamos 'development'
const environment = process.env.NODE_ENV || 'development';

console.log(`Knex running in [${environment}] mode...`);

// Seleciona a configuração correta (development ou production)
const connection = knex(config[environment]);

// Exporta a conexão para o resto do seu app (seus arquivos .data.ts)
export default connection;
