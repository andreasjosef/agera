import { RequirementCardLink } from "@/components/RequirementCardLink";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/app/requirements/")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.all),
});

function RouteComponent() {
  return (
    <Suspense
      fallback={
        <div className="gallary-grid gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl bg-app-surface-hover h-32 w-full"
            />
          ))}
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}

function Content() {
  const { data: requirements } = useSuspenseQuery(requirementQueryOptions.all);
  return (
    <>
      <nav className="mb-8">
        <h2 className="primary-button bg-app-surface-raised text-content-main font-medium text-3xl">
          Mina Uppdrag
        </h2>
      </nav>

      <ul className="gallary-grid gap-2">
        {requirements
          .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
          .map((requirement, index) => (
            <li key={requirement.id}>
              <RequirementCardLink requirement={requirement} index={index} />
            </li>
          ))}
      </ul>
    </>
  );
}
