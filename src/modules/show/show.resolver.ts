import { type AppContext } from '../../context.js';
import { type ShowLookupResult, type ShowModel, type ShowGenre } from './show.types.js';

interface ShowQueryArgs {
  id: string;
}

interface ShowCollectionQueryArgs {
  genre: ShowGenre;
  limit?: number | null;
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
            message: 'TODO: return a clearer invalid-input message',
          },
        };
      }

      // TODO:
      // - fetch the show from the datasource
      // - return NOT_FOUND when the datasource returns null
      // - return UPSTREAM_ERROR when the REST API is unavailable
      // - return the mapped show on success
      throw new Error('TODO: implement Query.show');
    },

    showsByGenre: async (_parent: unknown, _arguments: ShowCollectionQueryArgs, _context: AppContext): Promise<ShowModel[]> => {
      // TODO:
      // - fetch shows for the requested genre
      // - map each DTO into the GraphQL model
      // - sort by name
      // - apply limit after sorting
      // - treat negative limits as 0
      throw new Error('TODO: implement Query.showsByGenre');
    },
  },

  Show: {
    summary: (_show: ShowModel): string => {
      // TODO:
      // - derive a readable summary from the mapped ShowModel
      // - include name, id, genre, metric, and detail/fallback
      throw new Error('TODO: implement Show.summary');
    },
  },
};
