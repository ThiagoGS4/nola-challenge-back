import { IMonthlyOverviewFilters, IPerformanceComparisonPayload } from "../../types/mainTypes";
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

  async getMonthlyOverview(filters: IMonthlyOverviewFilters) {
    try {
      let dbResults = await mainData.getMonthlyOverview(filters);
      
      dbResults = dbResults.map(result => ({
        ...result,
        day: moment(result.day).format("YYYY-MM-DD")
      }))
      
      
      return dbResults;
    } catch (error) {
      console.error("Erro no Service ao buscar produtos:", error);
      throw new Error("Não foi possível buscar o relatório de produtos.");
    }
  }

  async getPerformanceComparison(filters: IPerformanceComparisonPayload){
    try {
      let dbResults = await mainData.getPerformanceComparison(filters);
      
      dbResults = dbResults.map(result => ({
        ...result,
        full_address: `${result.address_street}, ${result.address_number}`
      }))
      
      
      return dbResults;
    } catch (error) {
      console.error("Erro no Service ao buscar produtos:", error);
      throw new Error("Não foi possível buscar o relatório de produtos.");
    }
  }

  async getAllStores () {
    let dbResults = await mainData.getAllStores()

    return dbResults
  }
}

export default new ProductService();
