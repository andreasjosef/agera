/**
 * Defines the general contract between ccpilot and external LLM service apis
 * */
export interface LLMClientInterface {
  /**
   * Takes a raw prompt input and returns the full text completion
   * */
  complete: (prompt: string) => Promise<string>;
}
