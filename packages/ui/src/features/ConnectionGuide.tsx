import { Card } from "@ccpilot/ui";
import { GuideStepItem } from "../primitives/GuideStepItem";

interface ConnectionGuideProps {
  title: string;
  steps: { title: string; content: string }[];
}

export function ConnectionGuide({ title, steps }: ConnectionGuideProps) {
  return (
    <Card className="grid gap-y-2 my-2">
      <h2 className="text-xl font-bold"> {title} </h2>
      <ul>
        {steps.map((step, index) => (
          <li className="after:h-7 after:w-2 after:bg-cod-gray-200 not-last:after:ml-4 not-last:after:block after:shadow-[2px_0px_0px_var(--color-brand-primary)]">
            <GuideStepItem index={index + 1} {...step} />
          </li>
        ))}
      </ul>
    </Card>
  );
}
