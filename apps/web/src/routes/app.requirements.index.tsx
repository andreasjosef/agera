import { RequirementCardLink } from "@/components/RequirementCardLink";
import { requirementQueryOptions } from "@/modules/requirement/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/requirements/")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(requirementQueryOptions.all),
});

function RouteComponent() {
  const { data: requirements } = useSuspenseQuery(requirementQueryOptions.all);
  return (
    <>
      <nav className="mb-8">
        <h2 className="primary-button bg-app-surface-raised text-content-main font-medium text-3xl">
          Mina Uppdrag
        </h2>
      </nav>

      <ul className="grid grid-cols-3 gap-5">
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
