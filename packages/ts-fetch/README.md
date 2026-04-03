# TS Fetch

**TS Fetch** is a lightweight, type-safe wrapper around the native Fetch API. It ensures that network responses are validated against your domain models using parsers (like Zod), returning a strictly typed **Result** object instead of raw, unpredictable JSON.

---

## Key Features

* **Type Safety**: Every request requires a parser to ensure the data matches your TypeScript interfaces.
* **Unified Error Handling**: Returns a `Result<T>` type (`ok` or `fail`), eliminating the need for `try/catch` blocks at the call site.
* **Semantic API**: Dedicated methods for `GET`, `POST`, `PUT`, and `DELETE`.
* **List Handling**: Built-in support for extracting arrays from nested JSON structures (e.g., `data.results`) and parsing items individually.
* **Metadata Hooks**: Support for side-effects like capturing pagination headers or counts via `parseMeta`.

---

## Usage

### 1. Define your Parser
The `zodParser` bridge allows you to turn a Zod schema into a validation function compatible with the fetch engine.

```typescript
import z from 'zod';
import { zodParser } from './ts-fetch';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const userParser = zodParser(UserSchema);
```

### 2. Fetching a Single Item
Use `safeFetchItem` for simple `GET` requests.

```typescript
const result = await safeFetchItem('/api/users/1', userParser);

if (result.ok) {
  console.log(result.value.name); // Fully typed
} else {
  console.error(result.error); // Stringified error
}
```

### 3. Fetching a List
`fetchList` is designed for collections. It can automatically find arrays or use a custom extraction function.

```typescript
const result = await fetchList('/api/users', userParser, {
  // Optional: Tell the fetcher where the array lives in the JSON
  extractArray: (data) => data.items,
  // Optional: Capture metadata like total counts
  parseMeta: (data) => console.log(`Total records: ${data.total}`)
});

if (result.ok) {
  const users = result.value; // User[]
}
```

### 4. Mutating Data (Post / Put)
Pass the payload as the second argument. The engine handles `application/json` headers automatically.

```typescript
const newUser = { name: 'Jane Doe', email: 'jane@fieldlogic.com' };

const result = await safePostItem('/api/users', newUser, userParser);
```

### 5. Deleting Items
`deleteItem` is overloaded to support both "Fire and Forget" (returns `Result<null>`) and "Confirmed Delete" (returns a parsed response).

```typescript
// Silent Delete
await deleteItem('/api/users/1');

// Confirmed Delete (parsing the response)
const result = await deleteItem('/api/users/1', userParser);
```

---

## Technical Details

### Request Configuration
The `RequestConfig` extends standard `RequestInit` with two additional hooks:

| Property | Type | Description |
| :--- | :--- | :--- |
| `extractArray` | `(data: any) => unknown[]` | Custom logic to locate the array in a list response. |
| `parseMeta` | `(data: any) => void` | A side-effect hook for processing pagination or status metadata. |

### The Internal Engine
The `_fetchRaw` function serves as the **Single Source of Truth**. It handles:
1. Default Header injection (`Content-Type: application/json`).
2. Payload stringification.
3. Response status validation (`response.ok`).
4. Parsing logic (or returning `null` if no parser is provided).
