import { describe, expect, it, vi } from 'vitest';
import { type AppContext } from '../src/context.js';
import { type RestShowRecord, UpstreamServiceError } from '../src/datasources/tvmaze-api.js';
import { createServer } from '../src/server.js';

const lookupQuery = /* GraphQL */ `
  query Lookup($id: ID!) {
    show(id: $id) {
      show {
        id
        name
        detail
        tags
        summary
      }
      error {
        code
        message
      }
    }
  }
`;


const primary: RestShowRecord = { id: '169', name: 'The Expanse', language: 'English', genreName: 'Drama', ratingAverage: 8.3, genres: ['Drama', 'Science-Fiction', 'Thriller'] };

const createMockContext = () => {
  const getShowById = vi.fn(async (_id: string) => null as RestShowRecord | null);

  const context: AppContext = {
    dataSources: {
      tvMazeApi: {
        getShowById,
      },
    },
  };

  return { context, getShowById };
};

const executeSingle = async (query: string, variables: Record<string, unknown>, contextValue: AppContext) => {
  const server = createServer();

  try {
    const response = await server.executeOperation({ query, variables }, { contextValue });

    if (response.body.kind !== 'single') {
      throw new Error('Expected a single GraphQL result.');
    }

    return response.body.singleResult;
  } finally {
    await server.stop();
  }
};

describe('show queries', () => {
  it('returns a mapped show and computed summary for a valid id', async () => {
    const { context, getShowById } = createMockContext();
    getShowById.mockResolvedValue(primary);

    const result = await executeSingle(lookupQuery, { id: ' 169 ' }, context);

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      show: {
        show: {
          id: '169',
          name: 'The Expanse',
          detail: 'English',
          tags: ['Drama', 'Science-Fiction', 'Thriller'],
          summary: 'The Expanse (169) is a show in DRAMA. Detail: English. Rating: 8.3.',
        },
        error: null,
      },
    });
    expect(getShowById).toHaveBeenCalledWith('169');
  });

  it('returns INVALID_INPUT and skips the datasource when the id is malformed', async () => {
    const { context, getShowById } = createMockContext();

    const result = await executeSingle(lookupQuery, { id: 'zero' }, context);

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      show: {
        show: null,
        error: {
          code: 'INVALID_INPUT',
          message: 'Show id must be a positive integer.',
        },
      },
    });
    expect(getShowById).not.toHaveBeenCalled();
  });

  it('returns NOT_FOUND when the datasource cannot find a show', async () => {
    const { context, getShowById } = createMockContext();
    getShowById.mockResolvedValue(null);

    const result = await executeSingle(lookupQuery, { id: '999999' }, context);

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      show: {
        show: null,
        error: {
          code: 'NOT_FOUND',
          message: 'No show found for id "999999".',
        },
      },
    });
  });

  it('returns UPSTREAM_ERROR when the datasource throws an upstream failure', async () => {
    const { context, getShowById } = createMockContext();
    getShowById.mockRejectedValue(new UpstreamServiceError('boom'));

    const result = await executeSingle(lookupQuery, { id: ' 169 ' }, context);

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      show: {
        show: null,
        error: {
          code: 'UPSTREAM_ERROR',
          message: 'TVMaze is currently unavailable.',
        },
      },
    });
  });
});
