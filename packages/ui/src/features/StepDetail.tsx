import { ReactNode } from "react";
import { Card } from "../primitives/Card";
import { ScoredStep, StepType } from "@ccpilot/domain";
import { minutesToHours } from "date-fns";
import {
  Tag,
  CircleCheck,
  Clock,
  BarChart3,
  LucideIcon,
  CircleDashed,
} from "lucide-react";

export interface StepDetailProps {
  step: ScoredStep;
}

const categoryConfig: Record<StepType, { label: string; color: string }> = {
  admin: { label: "Admin", color: "text-sky-500" },
  deepwork: { label: "Deep Work", color: "text-purple-500" },
  research: { label: "Research", color: "text-blue-500" },
  planning: { label: "Planning", color: "text-amber-500" },
  polish: { label: "Polish", color: "text-pink-500" },
  decisions: { label: "Beslut", color: "text-emerald-500" },
};

export function StepDetail({ step }: StepDetailProps) {
  const detailRows = [
    // { label: "Din uppgift", value: step.action }, // This feels redundant to me
    { label: "Reflektion & Fokus", value: step.curiosityTrigger },
    { label: "Målet", value: step.outcomeDefinition },
    { label: "Kom igång-resurser", value: step.quickStartLinkHint },
  ];

  const status = step.complete
    ? StepDetail.StatusConfig.complete
    : StepDetail.StatusConfig.incomplete;

  const infoItems = [
    {
      icon: Tag,
      label: "Kategori",
      value: categoryConfig[step.category].label,
      iconClass: categoryConfig[step.category]?.color ?? "text-violet-500",
    },
    {
      icon: BarChart3,
      label: "Svårighetsgrad",
      value: `${step.complexity}`,
      iconClass: "text-amber-500",
    },
    {
      icon: Clock,
      label: "Beräknad Tid",
      value:
        step.estimatedMinutes < 60
          ? `${step.estimatedMinutes} min`
          : `${minutesToHours(step.estimatedMinutes)} timmar`,
      iconClass: "text-blue-500",
    },
    {
      icon: status.icon,
      label: "Status",
      value: status.text,
      iconClass: status.iconClass,
    },
  ];

  return (
    <Card className="max-w-5xl ">
      <div className="mx-auto flex w-full flex-col gap-8 px-12 py-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-content-subtle font-medium">
            <span>{step.requirementTitle}</span>
            <span>•</span>
            <span
              className={`font-semibold uppercase tracking-wider text-xs ${categoryConfig[step.category].color}`}
            >
              {categoryConfig[step.category]?.label ?? step.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-content-main leading-tight">
            {step.action}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 py-4 px-6 rounded border border-app-border">
          {infoItems.map((item) => (
            <StepDetail.Info
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              iconClass={item.iconClass}
            />
          ))}
        </div>

        <div className="flex flex-col mt-2">
          {detailRows.map((row) => (
            <StepDetail.Row
              key={row.label}
              label={row.label}
              value={row.value}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

StepDetail.StatusConfig = {
  complete: {
    text: "Avklarad",
    icon: CircleCheck,
    iconClass: "text-emerald-500",
  },
  incomplete: {
    text: "Ej påbörjad",
    icon: CircleDashed,
    iconClass: "text-zinc-400 stroke-[2]",
  },
};

StepDetail.Row = function StepDetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 py-6 border-b border-zinc-200 last:border-0">
      <h2 className="text-sm font-semibold text-zinc-800 tracking-wide uppercase md:normal-case md:text-base">
        {label}
      </h2>
      <div className="md:col-span-2 text-base md:text-lg text-content-muted leading-relaxed font-normal">
        {value}
      </div>
    </div>
  );
};

StepDetail.Info = function StepDetailInfo({
  icon: Icon,
  label,
  value,
  iconClass,
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  iconClass: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2 px-1">
      <div className={iconClass}>
        <Icon className="size-5 stroke-2" />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-xs font-medium text-content-subtle uppercase tracking-wider">
          {label}
        </h3>
        <div className="text-sm font-semibold text-content-main">{value}</div>
      </div>
    </div>
  );
};
