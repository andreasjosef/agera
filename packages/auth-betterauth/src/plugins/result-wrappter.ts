import { type BetterAuthPlugin } from "better-auth";

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
          const flattenedValue = data?.user ?? data;

          const succuessBody = JSON.stringify({
            ok: true,
            value: flattenedValue,
          });

          return {
            response: new Response(succuessBody, {
              status: response.status,
              headers: response.headers,
            }),
          };
        }

        const failureBody = JSON.stringify({
          ok: false,
          error: data?.message || data?.error || "Authentication failed",
        });

        return {
          response: new Response(failureBody, {
            status: response.status,
            headers: response.headers,
          }),
        };
      } catch (e) {
        return;
      }
    },
  };
};
