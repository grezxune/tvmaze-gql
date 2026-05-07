import { type AppContext } from '../../context.js';
import { type ShowLookupResult, type ShowModel } from './show.types.js';

interface ShowQueryArgs {
  id: string;
}


const normalizeShowId = (id: string): string => id.trim();

const isValidShowId = (id: string): boolean => /^\d+$/.test(id) && Number(id) > 0;

export const showResolvers = {
  Query: {
    show: async (_parent: unknown, arguments_: ShowQueryArgs, _context: AppContext): Promise<ShowLookupResult> => {
      const normalizedId = normalizeShowId(arguments_.id);

      if (!isValidShowId(normalizedId)) {
        return {
          show: null,
          error: {
            code: 'INVALID_INPUT',
            message: 'TODO: return a clearer invalid-input message' } };
      }

      // TODO:
      // - fetch the show from the datasource
      // - return NOT_FOUND when the datasource returns null
      // - return UPSTREAM_ERROR when the REST API is unavailable
      // - return the mapped show on success
      throw new Error('TODO: implement Query.show');
    },
  },

  Show: {
    summary: (_show: ShowModel): string => {
      // TODO:
      // - derive a readable summary from the mapped ShowModel
      // - include name, id, genre, metric, and detail/fallback
      throw new Error('TODO: implement Show.summary');
    } } };
