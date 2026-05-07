import { z } from 'zod';

const isPresentString = (value: string | null | undefined): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const RestShowRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string().optional().nullable(),
  genreName: z.string().optional().nullable(),
  ratingAverage: z.number().optional().nullable(),
  genres: z.array(z.string()).optional().nullable(),
});

const RawShowSchema = z.object({ id: z.number(), name: z.string(), language: z.string().optional().nullable(), genres: z.array(z.string()).optional().nullable(), rating: z.object({ average: z.number().nullable() }).optional().nullable() });
const toRecord = (show: z.infer<typeof RawShowSchema>): RestShowRecord => ({ id: String(show.id), name: show.name, language: show.language, genreName: show.genres?.[0], ratingAverage: show.rating?.average, genres: show.genres ?? [] });
const parseOne = (body: unknown): RestShowRecord => toRecord(RawShowSchema.parse(body));

export type RestShowRecord = z.infer<typeof RestShowRecordSchema>;

export interface TvMazeApiContract {
  getShowById(id: string): Promise<RestShowRecord | null>;
}

export class UpstreamServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpstreamServiceError';
  }
}

export class TvMazeApi implements TvMazeApiContract {
  constructor(private readonly baseUrl: string) {}

  async getShowById(id: string): Promise<RestShowRecord | null> {
    return this.fetchOne(`/shows/${encodeURIComponent(id)}`, { allowNotFound: true });
  }

  private async fetchOne(path: string, options: { allowNotFound?: boolean } = {}): Promise<RestShowRecord | null> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (response.status === 404 && options.allowNotFound) {
      return null;
    }

    if (!response.ok) {
      throw new UpstreamServiceError(`TVMaze API request failed with status ${response.status}`);
    }

    const body: unknown = await response.json();
    return parseOne(body);
  }
}
