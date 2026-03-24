export interface CompilerError {
  file: string;
  line: string;
  col: string;
  code: string;
  message: string;
}

export type LineType =
  | { type: "start" }
  | { type: "complete" }
  | { type: "success" }
  | { type: "error"; payload: CompilerError }
  | { type: "ignore" };
