# TypeScript + GraphQL Exercise

## Overview

You are joining a codebase that exposes a small GraphQL API over a REST datasource. The project uses modular GraphQL SDL, resolver composition, a typed context datasource, Zod DTO parsing, and focused tests.

## What You Are Building

You are implementing a small GraphQL service backed by the public [TVMaze API](https://www.tvmaze.com/api).

Use this REST API base URL when wiring the datasource:

```text
https://api.tvmaze.com
```

The schema exposes:

- `show(id: ID!): ShowLookupResult!`
- `showsByGenre(genre: ShowGenre!, limit: Int = 5): [Show!]!`

The public `Show` type stays intentionally small: `id`, `name`, `detail`, `tags`, and `summary`.

## Your Task

Make the supplied tests pass by completing:

- `src/context.ts`
- `src/modules/show/show.mapper.ts`
- `src/modules/show/show.resolver.ts`

Functional requirements:

- validate and normalize `id` for `show`
- return `INVALID_INPUT`, `NOT_FOUND`, and `UPSTREAM_ERROR` in the lookup result when appropriate
- map REST DTOs into the GraphQL model with null/default/sorted-array handling
- sort `showsByGenre` results by `name`, then apply `limit`
- treat negative limits as `0`
- compute a deterministic `Show.summary`

## How To Run

```bash
pnpm install
pnpm test
pnpm run typecheck
```
