import { Card } from "../primitives/Card";

interface BodyDoublingDisplayProps {
  activeCount: number;
}

export function BodyDoublingDisplay({ activeCount }: BodyDoublingDisplayProps) {
  return (
    <Card className="flex items-center gap-x-2">
      <span
        className="size-3 bg-brand-primary rounded-full animate-pulse"
        aria-hidden="true"
      ></span>
      <span>{activeCount} active students</span>
    </Card>
  );
}
