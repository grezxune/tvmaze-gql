import { mergeResolvers } from '@graphql-tools/merge';
import { showResolvers } from '../modules/show/show.resolver.js';

export const resolvers = mergeResolvers([showResolvers]);
