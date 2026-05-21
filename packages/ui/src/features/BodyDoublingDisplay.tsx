import { Card } from "../primitives/Card";

interface BodyDoublingDisplayProps {
  activeCount: number;
}

export function BodyDoublingDisplay({ activeCount }: BodyDoublingDisplayProps) {
  return (
    <Card className="flex items-center gap-x-2">
      <span className="pulse-dot bg-brand-primary" aria-hidden="true"></span>
      <span>{activeCount} active students</span>
    </Card>
  );
}
