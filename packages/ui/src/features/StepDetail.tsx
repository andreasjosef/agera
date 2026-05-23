import { Card } from "../primitives/Card";
import { ScoredStep } from "@ccpilot/domain";
import { minutesToHours } from "date-fns";
import {
  Tag,
  Circle,
  CircleCheck,
  Clock,
  BarChart3,
  LucideIcon,
} from "lucide-react";

export interface StepDetailProps {
  step: ScoredStep;
  assignmentTitle?: string;
}

interface StepDetailRowProps {
  label: string;
  value: string;
}

interface StepInfoProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  iconClass: string;
}

const STATUS_CONFIG = {
  complete: {
    text: "Avklarad",
    icon: CircleCheck,
    iconClass: "text-emerald-500",
  },
  incomplete: {
    text: "Ej påbörjad",
    icon: Circle,
    iconClass: "text-zinc-400 stroke-[1.5]",
  },
};

function StepDetailRow({ label, value }: StepDetailRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 py-6 border-b border-zinc-100 last:border-0">
      <h2 className="text-sm font-semibold text-zinc-800 tracking-wide uppercase md:normal-case md:text-base">
        {label}
      </h2>
      <div className="md:col-span-2 text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
        {value}
      </div>
    </div>
  );
}

function StepInfo({ icon: Icon, label, value, iconClass }: StepInfoProps) {
  return (
    <div className="flex items-center gap-4 py-2 px-1">
      <div className={`${iconClass}`}>
        <Icon className="size-5 stroke-[1.75]" />
      </div>
      <div className="space-y-0.5">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {label}
        </h3>
        <div className="text-sm font-semibold text-zinc-800">{value}</div>
      </div>
    </div>
  );
}

export function StepDetail({
  step,
  assignmentTitle = "U12 - Projektarbete Chas Challenge",
}: StepDetailProps) {
  const detailRows = [
    { label: "Din uppgift", value: step.action },
    { label: "Reflektion & Fokus", value: step.curiosityTrigger },
    { label: "Målet", value: step.outcomeDefinition },
    { label: "Kom igång-resurser", value: step.quickStartLinkHint },
  ];

  const status = step.complete
    ? STATUS_CONFIG.complete
    : STATUS_CONFIG.incomplete;

  const infoItems = [
    {
      icon: Tag,
      label: "Kategori",
      value: step.category.charAt(0).toUpperCase() + step.category.slice(1),
      iconClass: "text-violet-500",
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
    <Card>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
            <span>{assignmentTitle}</span>
            <span>•</span>
            <span className="text-violet-600 font-semibold uppercase tracking-wider text-xs">
              {step.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
            {step.action}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 py-4 px-6 rounded border border-app-border">
          {infoItems.map((item) => (
            <StepInfo
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
            <StepDetailRow
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
