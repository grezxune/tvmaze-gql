export const genreValues = ['COMEDY', 'DRAMA', 'SCIENCE_FICTION'] as const;

export type ShowGenre = (typeof genreValues)[number];

export interface ShowModel {
  id: string;
  name: string;
  detail: string | null;
  genre: ShowGenre | null;
  metric: number;
  tags: string[];
}

export type ShowLookupErrorCode = 'INVALID_INPUT' | 'NOT_FOUND' | 'UPSTREAM_ERROR';

export interface ShowLookupError {
  code: ShowLookupErrorCode;
  message: string;
}

export interface ShowLookupResult {
  show: ShowModel | null;
  error: ShowLookupError | null;
}
