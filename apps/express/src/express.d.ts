import { AppContext } from "@ccpilot/domain";

declare global {
  namespace Express {
    export interface Locals {
      ctx?: AppContext;
    }
  }
}
