import { requirementQueryOptions } from "@/modules/requirement/api";
import { useQuery } from "@tanstack/react-query";

export default function NowCard() {
  const { data: requirements } = useQuery(requirementQueryOptions.all);
  const syncedRequirement = requirements?.find(
    (req) => req.status === "COMPLETE",
  );

  if (!syncedRequirement) {
    return <p> No synced requiremnets found !</p>;
  }

  const firstStep = syncedRequirement.steps?.find(
    (step) => step.dependencyOrder === 1,
  );

  return (
    <article className="bg-neutral-200 rounded-sm p-4 grid gap-y-6">
      <div className="divide-y divide-gray-400 grid gap-y-4">
        <header className="flex justify-between items-center pb-4">
          <div>
            <h2 className="text-2xl font-bold">{syncedRequirement.title}</h2>
            <p>
              Time:
              <span>{firstStep?.estimatedMinutes} min</span>, Complexity:
              <span>{firstStep?.complexity}</span>
            </p>
          </div>

          <span className="bg-neutral-400 p-2 rounded-full">
            {syncedRequirement.type}
          </span>
        </header>

        <div className="grid gap-y-2">
          <section>
            <h3 className="font-medium text-xl">Action:</h3>
            <p>{firstStep?.action}</p>
          </section>

          <section>
            <h3 className="font-medium text-xl">Outcome:</h3>
            <p>{firstStep?.outcomeDefinition}</p>
          </section>

          <section>
            <h3 className="font-medium text-xl">Quick Hint:</h3>
            <p>{firstStep?.quickStartLinkHint}</p>
          </section>
        </div>
      </div>

      <button className="grid gap-y-4 px-5 py-3 text-neutral-900 bg-neutral-300 hover:bg-neutral-400 focus:bg-neutral-400 cursor-pointer">
        Next Step
      </button>
    </article>
  );
}
