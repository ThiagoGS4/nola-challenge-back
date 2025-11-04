import { Knex } from 'knex';
//import 'dotenv/config'; // Importa para ler seu .env local

// Configuração para seu ambiente local (Docker)
// Ele lê as variáveis do seu .env
const developmentConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
    extension: 'ts',
  }
};

// Configuração para o ambiente de produção (Render)
// Ele lê APENAS a DATABASE_URL que você vai configurar no Render
const productionConfig: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL, // <-- A MÁGICA ESTÁ AQUI
  migrations: {
    directory: './dist/database/migrations', // Em produção, usamos o JS compilado
    extension: 'js',
  }
};

// Objeto de configuração principal que exportamos
const config: { [key: string]: Knex.Config } = {
  development: developmentConfig,
  production: productionConfig,
};

export default config;
