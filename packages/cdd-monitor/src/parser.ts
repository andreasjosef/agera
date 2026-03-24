import type { LineType } from "./types.ts";

const ANSI_REGEX = /\x1b\[[0-9;]*m/g;
const ERROR_CODE_REGEX = /error\s+(TS\d+)/;
const FILE_LOC_REGEX = /([a-zA-Z0-9_\-./\\]+)[(:](\d+)[,:](\d+)[):]?/;

export function parseLine(line: string): LineType {
  const clean = line.replace(ANSI_REGEX, "").trim();

  if (
    clean.includes("File change detected") ||
    clean.includes("Starting compilation") ||
    clean.includes("Starting incremental")
  ) {
    return { type: "start" };
  }

  if (clean.includes("Watching for file changes")) {
    return { type: "complete" };
  }

  const errorMatch = clean.match(ERROR_CODE_REGEX);
  if (errorMatch) {
    const fileMatch = clean.match(FILE_LOC_REGEX);

    if (fileMatch) {
      const messagePart = clean.split(errorMatch[0])[1] || "";
      return {
        type: "error",
        payload: {
          file: fileMatch[1],
          line: fileMatch[2],
          col: fileMatch[3],
          code: errorMatch[1],
          message: messagePart.replace(/^:\s*/, "").trim(),
        },
      };
    }
  }

  return { type: "ignore" };
}
