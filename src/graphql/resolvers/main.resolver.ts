import mainData from "../data/main.data";

    export const productResolvers = { Query: {

    // Este resolver é "burro": ele só repassa a chamada
    // para a camada de serviço e retorna o que ela der.
    getTopSellingProducts: async (
      _parent: any,
      args: { limit: number }
    ) => {
      // Chama o serviço (controller) com os argumentos
      return mainData.getStopSelers(args);
    }

    // adicionar queries

    }

    // Mutations iriam aqui (ex: Mutation: { ... })
     };