import mainData from "../data/main.data";

class ProductService {
  async getTopSellingProducts(filters: { limit: number }) {
    try {
      const dbResults = await mainData.getStopSelers(filters);

      // 2. Trata os dados (a lógica do .map que fizemos)
      // Esta camada é responsável por transformar o dado "cru" do banco
      // em algo limpo para o GraphQL.
      const treatedResults = dbResults.map((item) => ({
        ...item,
        total_sold: parseInt(item.total_sold.toString(), 10),
      }));

      return treatedResults;
    } catch (error) {
      // Aqui você pode tratar erros específicos do Knex
      console.error("Erro no Service ao buscar produtos:", error);
      // Lança um erro amigável para o GraphQL
      throw new Error("Não foi possível buscar o relatório de produtos.");
    }
  }
}

export default new ProductService();
