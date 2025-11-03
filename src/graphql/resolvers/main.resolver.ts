import mainData from "../data/main.data";
import mainService from "../service/main.service";

export const productResolvers = {
  Query: {
    getTopSellingProducts: async (_parent: any, args: { limit: number }) => {
      
      return mainService.getTopSellingProducts(args);
    },

    getMonthlyOverview: async (
      _parent: any,
      args: { filters: { selectedMonth: string; } }
    ) => {
      
      return mainService.getMonthlyOverview(args.filters); 
    },

  },

};
