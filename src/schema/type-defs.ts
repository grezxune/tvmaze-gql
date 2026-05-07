import { mergeTypeDefs } from '@graphql-tools/merge';
import { showTypeDefs } from '../modules/show/show.type-defs.js';

const baseTypeDefs = /* GraphQL */ `
  type Query {
    _empty: Boolean
  }
`;

export const typeDefs = mergeTypeDefs([baseTypeDefs, showTypeDefs]);
