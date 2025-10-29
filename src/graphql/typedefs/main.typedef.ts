import { gql } from "apollo-server";

export const productTypeDefs = gql`
  type TopProductReport {
    product_id: Int!
    product_name: String!
    total_sold: Int!
  }

  type Query {
    getTopSellingProducts(limit: Int = 10): [TopProductReport]
  }
`;
