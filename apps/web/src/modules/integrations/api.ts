import { CanvasConnectionPayloadSchema } from "@ccpilot/domain";
import { safePostItem, zodRawParser } from "@ccpilot/ts-fetch";

// TODO: Use proxy instead
const BASE_URL = "http://localhost:4000/api/auth";

const CanvasConnectionPayloadParser = zodRawParser(
  CanvasConnectionPayloadSchema,
);

export const integrationMutations = {
  connectCanvas: (token: string) => {
    return safePostItem(
      `${BASE_URL}/api/requirements/sync`,
      { token },
      CanvasConnectionPayloadParser,
    );
  },
};
