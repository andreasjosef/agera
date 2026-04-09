---
title: "@field-logic/cdd"
---

**Compile Driven Development Monitor**

A minimalist filter for the TypeScript compiler. It intercepts the noisy output stream of `tsc --watch`, clears the terminal on new cycles, and presents a static, deduplicated list of active errors.

---

## Architecture

This tool operates on the Unix philosophy of text streams, following a strict **Input-Process-Output (IPO)** model:

1. **Input:** Reads raw `stdout` from the compiler.
2. **Process:**

- **Normalization:** Strips ANSI codes and detects build events (Start/Error/Complete).
- **Coalescing:** Bridges the gap between composite sub-projects (e.g., `node` -> `app`) to prevent screen flickering.
- **Deduplication:** Filters out redundant error messages caused by composite builds re-checking shared files.

3. **Output:** Renders a single, stable frame: either a list of unique errors or a success indicator.

---

## Installation

```bash
bun add -d @field-logic/cdd

```

---

## Usage

Add the following script to your `package.json`.

**Important:** You must use specific flags for the compiler to work correctly with this tool.

```json
"scripts": {
  "cdd": "tsc -b --watch --preserveWatchOutput --pretty false | cdd"
}

```

### Flags Reference

- **`-b` (Build Mode):** Mandatory for composite projects (Vite, Monorepos). Forces `tsc` to follow project references (`tsconfig.app.json`). Without this, `tsc` may report "0 Errors" even when code is broken.
- **`--watch`:** Keep the process alive and streaming.
- **`--preserveWatchOutput`:** Prevents `tsc` from clearing the buffer, allowing `cdd` to manage the screen.
- **`--pretty false`:** Disables complex formatting, ensuring machine-readable output for the parser.
- **`| cdd`:** Pipes the raw stream into the monitor.

---

## Troubleshooting

### Symptom: "Found 0 errors" but app crashes

**Cause:** You are likely running standard `tsc` in a composite project (e.g., a modern Vite template). The root `tsconfig.json` often contains `"files": []` and references sub-configs. Standard `tsc` only checks the empty root file.
**Fix:** Ensure you are using the `-b` flag: `tsc -b`.

### Symptom: Double rendering or flickering

**Cause:** Composite projects compile in waves (e.g., `tsconfig.node` finishes, then `tsconfig.app` starts).
**Fix:** `cdd` includes a bridge timer (1.5s) to coalesce these waves. If flickering persists, ensure your system is not running multiple `tsc` instances.