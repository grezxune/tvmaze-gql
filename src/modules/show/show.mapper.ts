import { type RestShowRecord } from '../../datasources/tvmaze-api.js';
import { type ShowModel } from './show.types.js';

export const mapRestShowToShow = (_show: RestShowRecord): ShowModel => {
  // TODO:
  // - map the TVMaze API DTO to the GraphQL-facing ShowModel
  // - convert empty optional values to null where appropriate
  // - default numeric fields used by summary so output is deterministic
  // - sort tags alphabetically
  throw new Error('TODO: implement mapRestShowToShow');
};
