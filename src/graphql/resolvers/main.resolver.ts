import { IMonthlyOverviewFilters, IPerformanceComparisonPayload } from "../../types/mainTypes";
import mainData from "../data/main.data";
import mainService from "../service/main.service";

export const productResolvers = {
  Query: {
    getTopSellingProducts: async (_parent: any, args: { limit: number }) => {
      
      return mainService.getTopSellingProducts(args);
    },

    getMonthlyOverview: async (
      _parent: any,
      args: { filters: IMonthlyOverviewFilters }
    ) => {
      
      return mainService.getMonthlyOverview(args.filters); 
    },

    getPerformanceComparison: async (
      _parent: any,
      args: { filters: IPerformanceComparisonPayload }
    ) => {
      
      return mainService.getPerformanceComparison(args.filters); 
    },

    getAllStores: async (_parent: any,) => {
      return mainService.getAllStores()
    }

  },

};
