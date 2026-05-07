import { describe, expect, it } from 'vitest';
import { type RestShowRecord } from '../src/datasources/tvmaze-api.js';
import { mapRestShowToShow } from '../src/modules/show/show.mapper.js';

const primary: RestShowRecord = { id: '169', name: 'The Expanse', language: 'English', genreName: 'Drama', ratingAverage: 8.3, genres: ['Drama', 'Science-Fiction', 'Thriller'] };
const sparse: RestShowRecord = { id: '999', name: 'Untitled Show', language: '', genreName: null, ratingAverage: null, genres: [] };

describe('mapRestShowToShow', () => {
  it('maps a TVMaze API response into the GraphQL model', () => {
    expect(mapRestShowToShow(primary)).toEqual({ id: '169', name: 'The Expanse', detail: 'English', genre: 'DRAMA', metric: 8.3, tags: ['Drama', 'Science-Fiction', 'Thriller'] });
  });

  it('normalizes empty optional values, defaults metrics, and sorts tags', () => {
    expect(mapRestShowToShow(sparse)).toEqual({ id: '999', name: 'Untitled Show', detail: null, genre: null, metric: 0, tags: [] });
  });
});
