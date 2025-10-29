import { gql } from 'apollo-server';
    import mainData from './data/main.data';
    import { productTypeDefs } from './typedefs/main.typedef';

    // Um 'type Query' base para que os módulos possam "estender"
    const baseTypeDefs = gql `type Query { _empty: String }`;

  export const typeDefs = [ baseTypeDefs, productTypeDefs ];