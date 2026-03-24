import { stdout } from "node:process";
import type { CompilerError } from "./types.ts";

const C = {
  CYAN: "\x1b[36m",
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  RESET: "\x1b[0m",
  BOLD: "\x1b[1m",
  DIM: "\x1b[2m",
  CLEAR: "\x1b[2J\x1b[3J\x1b[H",
};

export function renderUI(errorCount: number, isCompiling: boolean) {
  stdout.write(C.CLEAR);
  console.log(`${C.BOLD}TSCDD Monitor${C.RESET} ${C.DIM}`);

  if (isCompiling) {
    console.log(`${C.YELLOW}${C.BOLD}Compiling..${C.RESET}\n`);
  } else {
    const label = errorCount === 1 ? "Error" : "Errors";
    const statusText =
      errorCount > 0
        ? `${C.RED}${C.BOLD}${errorCount} ${label}${C.RESET}`
        : `${C.GREEN}Clean${C.RESET}`;

    // Merged: X Errors | Waiting for changes..
    console.log(`${statusText} ${C.DIM}| Waiting for changes..${C.RESET}\n`);
  }
}

export function printError(err: CompilerError) {
  const loc = `${err.file}:${err.line}:${err.col}`;
  console.log(`${C.BOLD}${C.CYAN}${loc}${C.RESET}`);
  console.log(`${C.RED}→ ${err.message}${C.RESET}\n`);
}
