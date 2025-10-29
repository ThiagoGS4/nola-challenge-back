import { Knex } from "knex";
import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: { directory: "./src/database/migrations", extension: "ts" },
    seeds: { directory: "./src/database/seeds", extension: "ts" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "./dist/database/migrations", extension: "js" },
  },
};

export {config}