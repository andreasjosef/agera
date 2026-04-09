---
title: ccpilot/web
---
**Frontend Architecture**

## Purpose

This package is the UI orchestration layer. Its job is to compose domain logic from the monorepo into high-performance, interactive user experiences.

## Directory Structure

Plaintext

```
src/
├── app/               # Providers, Global Types, Router Setup
|   └── main.tsx 
├── routes/            # COMPOSERS
│   └── [name].page.tsx    # Page Layout + Projection Logic
│   └── [name].loader.ts   # Route-level Data Priming (TanStack Query)
├── modules/           # PROCESSORS (Domain Modules)
│   └── [entity]/
│       ├── api.ts     # UI Subtypes (Zod) + queryOptions
│       ├── store.ts   # UI State / Projections (Zustand)
│       └── hooks.ts   # Logic to combine Query + Store
└── components/        # OUTPUT (Pure UI)
    └── [name].tsx     # Pure UI components -> deliver JSX based on props no-sideeffects

```

## The Workflow

When starting a new feature, follow this general sequence:

1. **Define UI Subtype (`modules/api.ts`):** Use Zod to pick/extend `@ccpilot/domain` schemas. This is your domain **Contract**.
2. **Export Query Options (`modules/api.ts`):** Define how this data is fetched and transformed into your UI Subtype.
3. **Build Pure Components (`components/`):** Code UI that accepts your Subtype as props. No hooks inside.
4. **Prime the Route (`routes/loader.ts`):** Use `queryClient.ensureQueryData` to block navigation until this interface is satisfied.
5. **Compose & Project (`routes/page.tsx`):** Use a hook to "Project" the cached data into the final view.


## State Management

|     |     |     |     |
| --- | --- | --- | --- |
| **State Type** | **Ownership** | **Tool** | **Usage** |
| **The Truth** | Server State | **TanStack Query** | Raw data, caching, invalidation. |
| **The Intent** | UI State | **Zustand** | Filters, tabs, search strings, draft edits. |
| **The Projection** | Computed View | **Hooks + Memo** | Filtering/Sorting "The Truth" via "The Intent". |


## Example Pattern

### 1. Module (Process)

`modules/requirement/api.ts`

TypeScript

```
import { requirementSchema } from '@ccpilot/domain';

// UI Subtype definition
export const reqUiSchema = requirementSchema.extend({ 
  isUrgent: z.boolean() 
});
export type ReqUI = z.infer<typeof reqUiSchema>;

export const reqQueries = {
  all: () => queryOptions({
    queryKey: ['requirements'],
    queryFn: async () => {
      const data = await client.get('/reqs');
      return data.map(d => ({ ...d, isUrgent: d.priority === 'high' }));
    }
  })
};

```

### 2. Loader (Input)

`routes/dashboard.loader.ts`


```
export const dashboardLoader = (qc: QueryClient) => async () => {
  // Block navigation until "The Truth" is cached
  return await qc.ensureQueryData(reqQueries.all());
};

```

### 3. Page (Output/Projection)

`routes/dashboard.page.tsx`


```
export const DashboardPage = () => {
  // 1. Get the Truth
  const { data: raw } = useQuery(reqQueries.all());
  // 2. Get the Intent (Zustand)
  const search = useReqStore(s => s.search);
  
  // 3. Project the Slice
  const visibleReqs = useMemo(() => 
    raw.filter(r => r.title.includes(search)), 
  [raw, search]);

  return <RequirementList items={visibleReqs} />;
};

```

## Constraints

- **No Side-Effects in Components:** Do not use `useEffect` for data fetching. Use Loaders.
- **No "Naked" Store Data:** Don't put raw API data in Zustand. Keep it in the TanStack Query cache.
- **Pure Components:** If a component is in `src/components`, it should be a pure function of its props. It should not "know" about Query or Zustand.
- **Validation at the Edge:** All API responses must be parsed via Zod in the module layer before reaching the UI.
