---
status: accepted
---

# Retire k8s/GitLab CI for managed hosting

`agera` was built as a school project (ChasChallenge) with a dedicated devops sub-team running a Kubernetes cluster (namespace `doe25-group-4`) and a GitLab CI/CD pipeline, including a self-hosted Postgres StatefulSet in-cluster. That team has disbanded and the repo is now solo-maintained on a hobby budget, so we're retiring `infrastructure/k8s/` and `.gitlab-ci.yml` entirely in favor of managed platforms: Railway for the backend (`apps/express`, deploying natively from GitHub with no custom deploy script), Vercel for the frontend (`apps/web`, whose PR previews also absorb the old staging environment's role), and a still-to-be-chosen free-tier external Postgres provider for the database. GitHub Actions replaces GitLab CI as the test/lint gate. We picked managed, per-concern platforms over any form of self-hosting because a solo maintainer can no longer justify operating a cluster: the trade-off is accepting cross-origin frontend/backend traffic (two different domains, real CORS) and losing the option to co-locate the DB with compute, in exchange for near-zero operational burden and near-zero cost.
