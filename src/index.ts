import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import db from "./database";

console.log("Servidor TypeScript rodando!");

async function startServer() {
  try {
    await db.raw("SELECT 1+1");
    console.log("✅ Conexão com o banco de dados OK.");
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco. Abortando...");
    console.error(error);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Servidor GraphQL rodando em ${url}`);
    console.log(`🔬 Explore no Apollo Studio: ${url}graphql`);
  });
}

startServer();
