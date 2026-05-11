import { useNextStep } from "@/modules/requirement/hooks";
import { Play, Goal, WandSparkles } from "lucide-react";

export default function NowCard() {
  const { nextStep, error, isLoading } = useNextStep();

  if (isLoading) return <p>Loading Next Step...</p>;

  {
    /* TODO: We should not actually display the error message from the server this is just for easier dev but should 
       be handled cleaner 
    */
  }
  if (error) return <p>{error.message}</p>;

  return (
    <article className="surface-container grid gap-y-6 mt-8 p-6">
      <div className="divide-y divide-gray-200 grid gap-y-4">
        <header className="flex justify-between items-center pb-4 mb-3">
          <div>
            <h2 className="text-3xl font-display font-semibold">
              {nextStep?.requirementTitle}
            </h2>
            <p className="text-sm text-content-subtle">
              est:
              <span> {nextStep?.estimatedMinutes} min, </span>
              due:
              <span> {nextStep?.effectiveDeadline.toDateString()}</span>
            </p>
          </div>

          {/**
          <span className="bg-app-surface-hover px-2 py-0.5 rounded-full text-content-muted self-start">
            {nextStep?.category}
          </span>
          **/}
        </header>

        <div className="grid gap-y-10">
          <section>
            <header className="flex gap-2 items-center mb-2">
              <Play className="stroke-brand-subtle" />
              <h3 className="text-content-muted">
                Steg {nextStep?.dependencyOrder}
              </h3>
            </header>
            <p className="text-lg leading-relaxed">{nextStep?.action}</p>
          </section>

          <section>
            <header className="flex gap-2 items-center mb-2">
              <Goal className="stroke-brand-subtle" />
              <h3 className="text-content-muted">Varför?</h3>
            </header>
            <p className="text-lg leading-relaxed">
              {nextStep?.outcomeDefinition}
            </p>
          </section>

          <section>
            <header className="flex gap-2 items-center mb-2">
              <WandSparkles className="stroke-brand-subtle" />
              <h3 className="text-content-muted">Hur börjar jag?</h3>
            </header>
            <p className="text-lg leading-relaxed">
              {nextStep?.quickStartLinkHint}
            </p>
          </section>
        </div>
      </div>

      <button className="primary-button tracking-widest uppercase my-4">
        Done
      </button>
    </article>
  );
}
