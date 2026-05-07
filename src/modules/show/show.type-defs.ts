export const showTypeDefs = /* GraphQL */ `
  enum ShowLookupErrorCode {
    INVALID_INPUT
    NOT_FOUND
    UPSTREAM_ERROR
  }

  type ShowLookupError {
    code: ShowLookupErrorCode!
    message: String!
  }

  type Show {
    id: ID!
    name: String!
    detail: String
    tags: [String!]!
    summary: String!
  }

  type ShowLookupResult {
    show: Show
    error: ShowLookupError
  }

  extend type Query {
    show(id: ID!): ShowLookupResult!
  }
`;
