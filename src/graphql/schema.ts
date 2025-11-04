import { gql } from 'apollo-server';
    import mainData from './data/main.data';
    import { productTypeDefs } from './typedefs/main.typedef';

    const baseTypeDefs = gql `type Query { _empty: String }`;

  export const typeDefs = [ baseTypeDefs, productTypeDefs ];