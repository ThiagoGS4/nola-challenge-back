import knex from 'knex';
import { config } from './knexfile';

// Estamos dizendo ao Knex para usar as configurações 'development'
// Em um app real, isso poderia ser process.env.NODE_ENV 
const connection = knex(config.development);

export default connection;