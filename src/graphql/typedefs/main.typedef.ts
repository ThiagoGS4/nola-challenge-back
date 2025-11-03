import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type TopProductReport {
    product_id: Int!
    product_name: String!
    total_sold: Int!
  }

  type MonthlyOverview {
    day: String
    total_earnings: Float
  }

  input inputMonthlyOverview {
    selectedMonth: String!
  }

  type Query {
    getTopSellingProducts(limit: Int = 10): [TopProductReport]
    getMonthlyOverview(filters: inputMonthlyOverview): [MonthlyOverview]
  }
`;
