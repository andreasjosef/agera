import z, { prettifyError } from "zod";
import { Result, fail, ok } from "@ccpilot/domain";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestConfig extends RequestInit {
  extractArray?: (data: any) => unknown[];
  parseMeta?: (data: any) => void;
}

/**
 * Internal Engine: The Single Source of Truth for all Network calls.
 */
async function _fetchRaw<TOut>(
  url: string,
  method: HttpMethod,
  payload: unknown | null,
  config: RequestConfig,
  parser?: (input: unknown) => Result<TOut>,
): Promise<Result<TOut | null>> {
  try {
    const headers = new Headers(config.headers || {});
    if (!headers.has("Content-Type"))
      headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
      ...config,
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok)
      return fail(`HTTP ${response.status}: ${response.statusText}`);

    // If no parser is provided, we treat it as a "Fire and Forget" (204 No Content style)
    if (!parser) return ok(null);

    const rawData: unknown = await response.json();

    // Side-effect hook for metadata (counts, pagination)
    if (config.parseMeta) config.parseMeta(rawData);

    return parser(rawData);
  } catch (e) {
    return fail(e instanceof Error ? e.message : "Network Error");
  }
}

/**
 * 🛠️ The Public Refinery: Semantic wrappers for the rest of the app.
 */
export const safeFetchItem = <T>(
  url: string,
  parser: (i: unknown) => Result<T>,
  c: RequestInit = {},
) => _fetchRaw<T>(url, "GET", null, c, parser) as Promise<Result<T>>;

export const safePostItem = <TIn, TOut>(
  url: string,
  payload: TIn,
  parser: (i: unknown) => Result<TOut>,
  c: RequestInit = {},
) => _fetchRaw<TOut>(url, "POST", payload, c, parser) as Promise<Result<TOut>>;

export const safePutItem = <TIn, TOut>(
  url: string,
  payload: TIn,
  parser: (i: unknown) => Result<TOut>,
  c: RequestInit = {},
) => _fetchRaw<TOut>(url, "PUT", payload, c, parser) as Promise<Result<TOut>>;

/**
 * Fetch a List: Handles array extraction and per-item parsing.
 */
export async function fetchList<T>(
  url: string,
  itemParser: (input: unknown) => Result<T>,
  options: RequestConfig = {},
): Promise<Result<T[]>> {
  // We use a custom parser to handle the array logic
  const listParser = (rawData: any): Result<T[]> => {
    const resolveList = (data: any): unknown => {
      if (options.extractArray) return options.extractArray(data);
      if (Array.isArray(data)) return data;
      if (data?.results && Array.isArray(data.results)) return data.results;
      return undefined;
    };

    const list = resolveList(rawData);
    if (!Array.isArray(list)) return ok([]); // Graceful fallback

    const successes = list.reduce<T[]>((acc, item) => {
      const res = itemParser(item);
      if (res.ok) acc.push(res.value);
      return acc;
    }, []);

    return ok(successes);
  };

  return _fetchRaw<T[]>(url, "GET", null, options, listParser) as Promise<
    Result<T[]>
  >;
}

/**
 * 🗑️ Overloaded Delete: Supports both "Silent Delete" and "Confirmed Delete"
 */
export function deleteItem<T>(
  url: string,
  parser: (i: unknown) => Result<T>,
  c?: RequestInit,
): Promise<Result<T>>;
export function deleteItem(url: string, c?: RequestInit): Promise<Result<null>>;
export async function deleteItem<T>(
  url: string,
  arg2?: any,
  arg3?: any,
): Promise<Result<T | null>> {
  const hasParser = typeof arg2 === "function";
  const parser = hasParser ? arg2 : undefined;
  const config = hasParser ? arg3 : arg2;
  return _fetchRaw(url, "DELETE", null, config || {}, parser);
}

/**
 * 🧬 Parsers: Turning raw JSON into Domain Types.
 */
export const zodParser =
  <T>(schema: z.ZodSchema<T>) =>
  (input: unknown): Result<T> => {
    // Handle the 'Result' wrapper from your backend response
    const wrapper = input as { ok: boolean; value?: any; error?: string };
    if (!wrapper.ok) return fail(wrapper.error || "API Error");

    const result = schema.safeParse(wrapper.value);
    return result.success ? ok(result.data) : fail(prettifyError(result.error));
  };
