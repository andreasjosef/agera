/**
 * @module
 * @groupDescription Core
 * ### The Railway Pattern
 * The Railway pattern is a functional programming approach to error handling.
 * Instead of using `try/catch` blocks which disrupt the control flow, we treat
 * errors as data.
 * There are two tracks:
 * 1. **The Success Track**: Data flows through transformations.
 * 2. **The Failure Track**: If an error occurs, the process switches tracks and
 * bypasses all subsequent logic until the error is handled.
 *
 * ```typescript
 * const result = await someAction();
 * if (!result.ok) {
 * // We are on the Failure track
 * return fail(result.error);
 * }
 * // We are on the Success track
 * console.log(result.value);
 * ```
 */

/**
 * A container for a successful operation.
 * @template T - The type of the value contained in a successful result.
 * @group Core
 */
export type Success<T> = {
  /** Discriminator for successful results. Always `true`. */
  ok: true;
  /** The payload of the successful operation. */
  value: T;
};

/**
 * A container for a failed operation.
 * @group Core
 */
export type Failure = {
  /** Discriminator for failed results. Always `false`. */
  ok: false;
  /** A descriptive error message explaining why the operation failed. */
  error: string;
};

/**
 * The union type for Railway-oriented results.
 * By using a union of {@link Success} and {@link Failure}, TypeScript can
 * perform **exhaustiveness checking**, ensuring you handle both cases.
 * @template T - The expected successful return type.
 * @group Core
 */
export type Result<T> = Success<T> | Failure;

/**
 * Wraps a value in a successful Result container.
 * @template T - The type of the value being wrapped.
 * @param value - The data to be returned as a success.
 * @returns A {@link Success} object.
 * @group Core
 */
export const ok = <T>(value: T): Success<T> => ({
  ok: true,
  value,
});

/**
 * Wraps an error message in a failed Result container.
 * @param error - A string describing the failure.
 * @returns A {@link Failure} object.
 * @group Core
 */
export const fail = (error: string): Failure => ({
  ok: false,
  error,
});
