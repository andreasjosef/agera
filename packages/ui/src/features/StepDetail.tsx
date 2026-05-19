import { Card } from "../primitives/Card";
import { ScoredStep } from "@ccpilot/domain";
import {
  Tag,
  Info,
  CircleCheck,
  Clock,
  ChartNoAxesColumnIncreasing,
  X,
  LucideIcon,
} from "lucide-react";

export interface StepDetailProps {
  step: ScoredStep;
}

interface StepDetailRowProps {
  label: string;
  children: React.ReactNode;
}

interface StepInfoProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  iconClassName: string;
}

function StepDetailRow({ label, children }: StepDetailRowProps) {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <h2 className="text-sm font-medium text-content-main">{label}</h2>

      <div className="col-span-2 text-sm text-content-muted">{children}</div>
    </div>
  );
}

function StepInfo({ icon: Icon, label, value, iconClassName }: StepInfoProps) {
  return (
    <div className="flex items-center gap-6 p-4">
      <div className={`rounded-xl p-3 ${iconClassName}`}>
        <Icon className="size-5" />
      </div>

      <div>
        <h2 className="text-sm font-medium text-content-main">{label}</h2>

        <div className="text-sm text-content-muted">{value}</div>
      </div>
    </div>
  );
}

export function StepDetail({ step }: StepDetailProps) {
  const isComplete = step.complete;

  const status = isComplete
    ? {
        text: "Klar",
        badge: "Klar",
        icon: CircleCheck,
        iconClass: "bg-emerald-100 text-emerald-600",
        containerClass: "border-green-100 bg-green-50",
        textClass: "text-green-900",
        badgeClass: "bg-green-100 text-green-700",
      }
    : {
        text: "Inte Klar",
        badge: "Pågående",
        icon: X,
        iconClass: "bg-red-100 text-red-600",
        containerClass: "border-zinc-200 bg-zinc-50",
        textClass: "text-zinc-700",
        badgeClass: "bg-zinc-200 text-zinc-700",
      };

  const infoItems = [
    {
      icon: Tag,
      label: "Kategori",
      value: step.category.charAt(0).toUpperCase() + step.category.slice(1),
      iconClassName: "bg-violet-100 text-violet-600",
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      label: "Svårighetsgrad",
      value: step.complexity,
      iconClassName: "bg-orange-100 text-orange-600",
    },
    {
      icon: Clock,
      label: "Beräknad Tid",
      value: `${step.estimatedMinutes} min`,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      icon: status.icon,
      label: "Status",
      value: status.text,
      iconClassName: status.iconClass,
    },
  ];

  return (
    <Card className="p-18">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
        <div className="space-y-1.5">
          <h1 className="flex items-center gap-2 text-2xl">
            <Info />
            Steg Information
          </h1>

          <p className="text-content-muted">
            Detaljerad information om det här steget
          </p>
        </div>

        <Card className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {infoItems.map((item) => (
            <StepInfo
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              iconClassName={item.iconClassName}
            />
          ))}
        </Card>

        <Card className="flex flex-col gap-8">
          <StepDetailRow label="Din uppgift">{step.action}</StepDetailRow>

          <StepDetailRow label="Det här ska du göra">
            {step.curiosityTrigger}
          </StepDetailRow>

          <StepDetailRow label="Ditt mål">
            {step.outcomeDefinition}
          </StepDetailRow>

          <StepDetailRow label="Tips för att starta">
            {step.quickStartLinkHint}
          </StepDetailRow>
        </Card>

        <div
          className={`mt-6 rounded-2xl border px-5 py-4 ${status.containerClass}`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${status.textClass}`}>
              {isComplete
                ? "Det här steget är klart."
                : "Det här steget är inte klart ännu."}
            </p>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${status.badgeClass}`}
            >
              {status.badge}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
