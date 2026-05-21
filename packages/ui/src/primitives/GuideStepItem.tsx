import { Card } from "@ccpilot/ui";

interface GuideStepItemProps {
  index: number;
  title: string;
  content: string;
}

export function GuideStepItem({ index, title, content }: GuideStepItemProps) {
  return (
    <Card className="grid gap-y-2">
      <header className="flex gap-x-2 items-center">
        <div className="size-10 rounded-sm border-brand-primary border text-brand-primary font-display flex items-center justify-center text-sm font-bold">
          {index}
        </div>
        <h3 className="font-medium">{title}</h3>
      </header>
      <p className="text-content-muted">{content}</p>
    </Card>
  );
}
