import { TvMazeApi, type TvMazeApiContract } from './datasources/tvmaze-api.js';

export interface AppContext {
  dataSources: {
    tvMazeApi: TvMazeApiContract;
  };
}

export const createContext = (): AppContext => ({
  dataSources: {
    tvMazeApi: new TvMazeApi(),
  },
});
