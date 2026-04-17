import { type BetterAuthPlugin } from "better-auth";
import { ok } from "node:assert";

export const resultWrapper = (): BetterAuthPlugin => {
  return {
    id: "ccpilot-result-wrapper",
    onResponse: async (response, context) => {
      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");

      if (!isJson) return;

      const resCopy = response.clone();

      try {
        const data = await resCopy.json();

        if (response.ok) {
          const succuessBody = JSON.stringify({
            ok: true,
            value: data,
          });

          const wrappedReponse = new Response(succuessBody, {
            status: response.status,
            headers: response.headers,
          });

          return { response: wrappedReponse };
        }

        const failureBody = JSON.stringify({
          ok: false,
          error: "An error occurred during authentication",
        });

        const failureWrap = new Response(failureBody, {
          status: response.status,
          headers: response.headers,
        });

        return { response: failureWrap };
      } catch (e) {
        return;
      }
    },
  };
};
