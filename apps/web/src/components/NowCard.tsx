import { useNextStep } from "@/modules/requirement/hooks";

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
    <article className="surface-container grid gap-y-6">
      <div className="divide-y divide-gray-200 grid gap-y-4">
        <header className="flex justify-between items-center pb-4">
          <div>
            <h2 className="text-2xl font-bold">{nextStep?.requirementTitle}</h2>
            <p>
              Time:
              <span>{nextStep?.estimatedMinutes} min, </span>
              Due:
              <span>{nextStep?.effectiveDeadline.toDateString()}</span>
            </p>
          </div>

          <span className="bg-brand-primary p-2 rounded-full text-app-bg">
            {nextStep?.category}
          </span>
        </header>

        <div className="grid gap-y-2">
          <section>
            <h3 className="font-medium text-xl">Action:</h3>
            <p>{nextStep?.action}</p>
          </section>

          <section>
            <h3 className="font-medium text-xl">Outcome:</h3>
            <p>{nextStep?.outcomeDefinition}</p>
          </section>

          <section>
            <h3 className="font-medium text-xl">Quick Hint:</h3>
            <p>{nextStep?.quickStartLinkHint}</p>
          </section>
        </div>
      </div>

      <button className="primary-button">Done</button>
    </article>
  );
}
