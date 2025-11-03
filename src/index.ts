import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import db from "./database";

console.log("Servidor TypeScript rodando!");

// Função para iniciar o servidor
async function startServer() {
  // 1. Testa a conexão com o banco antes de subir a API
  try {
    await db.raw("SELECT 1+1");
    console.log("✅ Conexão com o banco de dados OK.");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco. Abortando...");
    console.error(error);
    process.exit(1); // Encerra o app se não puder conectar
  }

  // 2. Cria a instância do Apollo Server
  const server = new ApolloServer({
    typeDefs, // pega todos os typedefs
    resolvers, // pega todos os resolvers
    cors: {
      origin: "http://localhost:5173", // 👈 Permite seu frontend Vue
      credentials: true, // Permite o envio de cookies (útil no futuro)
    },
  });

  // 3. Inicia o servidor
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Servidor GraphQL rodando em ${url}`);
    console.log(`🔬 Explore no Apollo Studio: ${url}graphql`);
  });
}

startServer();
