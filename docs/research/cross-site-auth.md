# Research: better-auth cross-site cookie behavior (Railway backend + Vercel frontend)

Resolves: [#4](https://github.com/andreasjosef/agera/issues/4). Context: [#2](https://github.com/andreasjosef/agera/issues/2) (deployment migration map).

## Verdict

**A one-line config tweak is necessary but not sufficient.** Setting
`sameSite: "none"` (+ `secure: true`) on the session cookie is required and will
make cross-site auth work in Chrome/Edge and Firefox. **It will silently fail in
Safari/iOS**, because Safari blocks all cross-site cookies by default regardless
of `SameSite` value, and there is no shared parent domain between a `*.vercel.app`
frontend and a `*.up.railway.app` backend to fall back on. This is a real,
current (2026), well-documented risk — not an outdated assumption — and
better-auth's own docs recommend fixing it at the **routing layer** (a same-site
reverse proxy), not just the cookie layer. This is a small, contained change
(a Vercel rewrite rule), not a rearchitecture of auth.

## What's in this repo today

`packages/auth-betterauth/src/better-auth-config.ts` (better-auth `^1.6.5`,
locked to exactly `1.6.5` per `pnpm-lock.yaml`):

```ts
export const auth = betterAuth({
  plugins: [resultWrapper()],
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:4000/api/auth",
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: [process.env.TRUSTED_ORIGINS ?? "http://localhost:3000"],
  advanced: {
    secureCookies: isProduction,
    cookiePrefix: isProduction ? "__Secure-" : "",
  },
});
```

No `sameSite`, no `crossSubDomainCookies`, no `defaultCookieAttributes`. Today
frontend and backend share one origin behind a k8s ingress, so the default
`SameSite=Lax` cookie works fine — it only breaks once the two apps move to
genuinely different registrable domains.

I confirmed the option names below directly against the better-auth `v1.6.5`
source (the version this repo's lockfile resolves to), not just current docs,
since the API has moved between packages (cookie-related "advanced" options
now live in `@better-auth/core`'s `packages/core/src/types/init-options.ts`):
`crossSubDomainCookies`, `defaultCookieAttributes` (typed as `CookieOptions`
from the `better-call` package), `useSecureCookies`, `cookiePrefix`, and
`disableCSRFCheck` all exist unchanged at `1.6.5`. Source:
[`packages/core/src/types/init-options.ts` @ v1.6.5](https://github.com/better-auth/better-auth/blob/v1.6.5/packages/core/src/types/init-options.ts)
(lines ~186-306 for `BetterAuthAdvancedOptions`).

## 1. What config does better-auth need for two unrelated domains?

better-auth's own cookie docs ([Cookies | Better Auth](https://www.better-auth.com/docs/concepts/cookies))
draw an explicit distinction between two topologies, and **our Railway/Vercel
setup is the harder one**:

- **Cross-subdomain** (`app.example.com` + `api.example.com`, shared
  registrable domain `example.com`): use
  ```ts
  advanced: {
    crossSubDomainCookies: { enabled: true, domain: "example.com" },
  }
  ```
  This makes one cookie readable from both subdomains. It requires a shared
  root domain — it is **not applicable** to `*.vercel.app` +
  `*.up.railway.app`, which are two different entries on the Public Suffix
  List with no shared registrable domain, and would still not be applicable
  even after moving to custom domains unless both custom domains share one
  root (e.g. `app.agera.com` + `api.agera.com`).

- **Cross-site** (fully unrelated domains, our case): the docs' own worked
  example is literally "frontend on `app.domainB.com`, API on `domainA.com`"
  — the same shape as Vercel + Railway. For the cookie to be sent at all on
  cross-site requests, it must carry `SameSite=None; Secure`:
  ```ts
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  }
  ```
  `secure: true` is mandatory here — browsers drop any cookie marked
  `SameSite=None` without `Secure` (this is standard cookie-spec behavior,
  not better-auth-specific; see
  [MDN: Set-Cookie — SameSite=None requires Secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitenone_requires_secure)).
  Railway and Vercel both terminate TLS by default, so this is satisfied as
  long as `BETTER_AUTH_URL`/`trustedOrigins` use `https://`.

  The client also needs `credentials: "include"` on cross-origin requests
  (better-auth's fetch-based client sets this when configured for a
  cross-origin `baseURL`), and the backend's CORS config must echo the exact
  frontend origin (not `*`) with `Access-Control-Allow-Credentials: true` —
  otherwise the browser discards the response before the cookie is even
  considered.

So: `sameSite: "none"` + `secure: true` on `defaultCookieAttributes` is the
right, current (v1.6.5) API for this topology — **not** `crossSubDomainCookies`,
which only applies to the shared-root-domain case this migration does not have.

## 2. Does better-auth document known problems for this exact topology?

Yes, directly. The same docs page
([Cookies | Better Auth](https://www.better-auth.com/docs/concepts/cookies))
that gives the `sameSite: "none"` config immediately follows it with a
**Safari-specific caveat and a recommended fix that is not just a cookie
attribute**:

> "Safari includes a privacy feature called Intelligent Tracking Prevention
> (ITP) that blocks third-party cookies." When frontend and API are on
> different domains (their example: frontend `https://app.domainB.com`, API
> `https://domainA.com` — structurally identical to Vercel + Railway), this
> "results in cookies being blocked when making cross-domain requests,
> causing sessions not to persist or users appearing logged out."

better-auth's own recommended fix is **not** a better-auth config flag — it's
a reverse proxy so the browser never sees the backend as a different origin:

> "Instead of calling your API directly, you can proxy it through the same
> domain as your frontend." Their worked example is a Vercel `rewrites`
> config:
> ```json
> {
>   "rewrites": [
>     { "source": "/api/:path*", "destination": "https://domainA.com/api/:path*" }
>   ]
> }
> ```
> This "makes the request appear first-party to Safari, allowing cookies to
> function correctly."

The alternative they list is the shared-parent-domain + `crossSubDomainCookies`
approach from §1, which (as noted) isn't available to us on the default
`*.vercel.app`/`*.up.railway.app` domains.

This is corroborated by real user reports on better-auth's GitHub, both
unresolved as filed:

- [Issue #4038 — "Cross-Domain cookies not being set on production"](https://github.com/better-auth/better-auth/issues/4038):
  backend on `b.com`, frontend on `a.com`, `sameSite: "none"`, `secure: true`,
  `partitioned: true` all configured correctly, server sends a correct
  `Set-Cookie` header (confirmed in the response), but the browser never
  stores it. No maintainer fix is recorded; the issue was locked with no
  resolution.
- [Issue #2962 — "Authentication cookies not being set on cross-domain requests (307 redirect, no Set-Cookie)"](https://github.com/better-auth/better-auth/issues/2962):
  same shape (API on `a.com`, frontends on `b.com`/`c.com`), `httpOnly`,
  `sameSite: "none"`, `secure: true`, `credentials: "include"`, and correct
  `trustedOrigins` all set — still failed. Closed as "not planned" pointing at
  PR #4482, without a documented workaround in the thread itself.
- [Discussion #2826 — "Cookies Not Set in Safari"](https://github.com/better-auth/better-auth/discussions/2826):
  root cause traced to deploying on a **public-suffix domain** (`render.com`
  subdomains) — structurally the same problem `*.up.railway.app` and
  `*.vercel.app` have, since both are entries on the Public Suffix List.
  Fixed only by moving to a custom domain (which then still requires either
  the proxy or the shared-root-domain pattern, since a single custom domain
  on Vercel and a separate one on Railway are still cross-site).

**Takeaway:** this is not a corner case better-auth's maintainers are unaware
of — it's called out in their own docs with a named fix — but it is also not
something the library can fully solve for you via a cookie flag alone when
the two domains share no registrable root.

## 3. Does the "first-party login flow, not an iframe" distinction help here?

**No — and this is the most important correction to the framing in the
ticket.** Browser third-party-cookie policy is keyed on the **relationship
between the cookie's registrable domain and the top-level page's registrable
domain**, not on whether the request happens inside an `<iframe>` or via a
same-page `fetch()`/`XHR` call. A same-document `fetch()` from a script
running on `app.vercel.app` to `api.up.railway.app` with
`credentials: "include"` is, for cookie-jar purposes, exactly as "third-party"
as an embedded iframe of `api.up.railway.app` would be — the browser only
looks at the domain that's about to receive/set the cookie versus the domain
in the address bar.

- **Safari (WebKit ITP):** per WebKit's own announcement,
  [Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
  (Safari 13.1, macOS 10.15.4 / iOS 13.4, March 2020): "Cookies for cross-site
  resources are now blocked by default across the board." This is unconditional
  cross-site-resource blocking, not an iframe-specific or tracker-classification
  rule, and it has **not** been relaxed since — current 2026 sources confirm
  Safari's ITP "continues to block all third-party cookies by default in
  2026, with no changes to this policy" (e.g. summarized status trackers
  such as [cookiestatus.com/safari](https://www.cookiestatus.com/safari/)).
  A first-party *user intent* (the user really did navigate to and type
  credentials into the Vercel-hosted page) does not change this: the request
  that would carry/receive the session cookie still targets a different
  registrable domain than the address bar, so it is blocked the same as any
  other cross-site cookie. The Storage Access API — the normal workaround for
  legitimate embedded third parties — doesn't apply either, since it's
  designed for content actually embedded (iframe/popup) in the first party,
  not for a plain cross-origin `fetch()` with no such embedding.

- **Chrome:** the opposite risk profile from what a "2020s conventional
  wisdom" answer would say. Google **abandoned** the third-party-cookie
  phase-out: as of 2026, "third-party cookies are still functional in Chrome
  for most users" with no new choice-screen prompt, per
  [Google's Privacy Sandbox shutdown coverage, Oct 2025](https://www.onetrust.com/blog/google-drops-plans-for-third-party-cookie-choice-prompt-in-chrome/)
  and 2026 trackers. So on Chrome/Edge, `sameSite: "none"` alone is
  sufficient today — but this is a policy choice Google could still reverse,
  so it shouldn't be relied on long-term.

- **Firefox:** uses Total Cookie Protection, which **partitions** rather than
  blocks third-party cookies — a cookie set by `up.railway.app` in the
  context of top-level site `vercel.app` is stored in a jar keyed to that
  pair and is sent back on subsequent requests from that same top-level site
  (per [Mozilla: Total Cookie Protection](https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/)
  and [MDN: Third-party cookies](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies)).
  Since this app has exactly one frontend origin talking to the backend
  (no scenario where multiple unrelated top-level sites need to share the
  same session cookie), Firefox's partitioning does not break this login
  flow — only Safari's outright block does.

**Net:** the risk is real, current, and concentrated on Safari/iOS (a
material share of real users, not a negligible edge case), and it is not
mitigated by this being a first-party login UX rather than an embed.

## Recommendation

1. Set `advanced.defaultCookieAttributes: { sameSite: "none", secure: true }`
   in `better-auth-config.ts` (needed regardless — fixes Chrome/Edge/Firefox
   and is a prerequisite for anything else).
2. Do **not** reach for `crossSubDomainCookies` — it doesn't apply without a
   shared root domain.
3. To fix Safari, add a same-site reverse proxy: a `vercel.json` `rewrites`
   rule that forwards `/api/auth/*` (and any other backend API paths the
   frontend calls with credentials) from the Vercel frontend's own domain
   through to the Railway backend, exactly as shown in better-auth's docs.
   Point `baseURL`/the auth client at the proxied same-origin path rather
   than the raw `*.up.railway.app` URL. This keeps the whole login flow
   same-site from the browser's point of view and sidesteps ITP entirely,
   without changing better-auth's auth model, adapters, or session storage.
4. If/when this repo moves to custom domains for both frontend and backend,
   revisit: putting both under one root domain (e.g. `app.agera.dev` /
   `api.agera.dev`) would make `crossSubDomainCookies` viable and let the
   proxy be removed, at the cost of needing one certificate/DNS setup
   spanning both providers.

## Sources

- [better-auth: Cookies (concepts)](https://www.better-auth.com/docs/concepts/cookies) — `crossSubDomainCookies`, cross-domain/Safari section, Vercel rewrite example
- [better-auth: Security (reference)](https://better-auth.com/docs/reference/security) — `SameSite=Lax` default, `defaultCookieAttributes`, `trustedOrigins`, Fetch Metadata / CSRF protections
- [better-auth GitHub, `packages/core/src/types/init-options.ts` @ v1.6.5](https://github.com/better-auth/better-auth/blob/v1.6.5/packages/core/src/types/init-options.ts) — exact `BetterAuthAdvancedOptions` shape pinned in this repo
- [better-auth GitHub Issue #4038](https://github.com/better-auth/better-auth/issues/4038) — cross-domain cookies not set in production despite correct config
- [better-auth GitHub Issue #2962](https://github.com/better-auth/better-auth/issues/2962) — cross-domain `Set-Cookie` not persisted, closed not-planned
- [better-auth GitHub Discussion #2826](https://github.com/better-auth/better-auth/discussions/2826) — Safari + public-suffix-domain cookie failure
- [WebKit blog: Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/) — Safari 13.1 unconditional cross-site cookie blocking, current default
- [MDN: Set-Cookie — SameSite=None requires Secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitenone_requires_secure)
- [MDN: Third-party cookies (Privacy on the web)](https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Third-party_cookies) — partitioning vs. blocking across browsers
- [Mozilla Security Blog: Total Cookie Protection](https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/) — Firefox's partition-not-block model
- [OneTrust: Google Drops Plans for Third-Party Cookie Choice Prompt in Chrome (Oct 2025 coverage)](https://www.onetrust.com/blog/google-drops-plans-for-third-party-cookie-choice-prompt-in-chrome/) — Chrome keeping third-party cookies on by default
- `packages/auth-betterauth/src/better-auth-config.ts`, `pnpm-lock.yaml` (this repo) — current config and pinned `better-auth@1.6.5`
