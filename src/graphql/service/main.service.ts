import mainData from "../data/main.data";
import moment from "moment";

class ProductService {
  async getTopSellingProducts(filters: { limit: number }) {

    
    try {
      const dbResults = await mainData.getStopSelers(filters);
      const treatedResults = dbResults.map((item) => ({
        ...item,
        total_sold: parseInt(item.total_sold.toString(), 10),
      }));

      return treatedResults;
    } catch (error) {
      console.error("Erro no Service ao buscar produtos:", error);
      throw new Error("Não foi possível buscar o relatório de produtos.");
    }
  }

  async getMonthlyOverview(filters: {
    selectedMonth: string;
  }) {
    
    try {
      let dbResults = await mainData.getMonthlyOverview(filters);
      
      dbResults = dbResults.map(result => ({
        ...result,
        day: moment(result.day).format("YYYY-MM-DD")
      }))
      
      
      return dbResults;
    } catch (error) {
      // Aqui você pode tratar erros específicos do Knex
      console.error("Erro no Service ao buscar produtos:", error);
      // Lança um erro amigável para o GraphQL
      throw new Error("Não foi possível buscar o relatório de produtos.");
    }
  }
}

export default new ProductService();
