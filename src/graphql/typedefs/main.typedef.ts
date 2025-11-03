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

  type PerformanceComparison {
    name: String
    city: String
    state: String
    full_address: String
    is_active: Boolean
    total_sales:Float
    total_earnings:Float
    avg_ticket:Float
  }

  input inputPerformanceComparison {
    states: [String]
    ditrict: String
    dateStart: String
    dateEnd: String
    isOwn: Boolean
  }

  type Query {
    getTopSellingProducts(limit: Int = 10): [TopProductReport]
    getMonthlyOverview(filters: inputMonthlyOverview): [MonthlyOverview]
    getPerformanceComparison(filters: inputPerformanceComparison): [PerformanceComparison]
  }
`;
