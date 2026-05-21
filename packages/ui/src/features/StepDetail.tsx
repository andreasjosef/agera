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
    text: "Klar",
    badge: "Klar",
    icon: CircleCheck,
    iconClass: "bg-emerald-100 text-emerald-600",
    textClass: "text-green-700",
    badgeClass: "bg-green-100 text-green-700",
  },

  incomplete: {
    text: "Inte Klar",
    badge: "Pågående",
    icon: X,
    iconClass: "bg-red-100 text-red-600",
    textClass: "text-zinc-700",
    badgeClass: "bg-zinc-200 text-zinc-700",
  },
};

function StepDetailRow({ label, value }: StepDetailRowProps) {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <h2 className="text-sm font-medium text-content-main">{label}</h2>

      <div className="col-span-2 text-sm text-content-muted">{value}</div>
    </div>
  );
}

function StepInfo({ icon: Icon, label, value, iconClass }: StepInfoProps) {
  return (
    <div className="flex items-center gap-6 p-4">
      <div className={`rounded-xl p-3 ${iconClass}`}>
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
  const detailRows = [
    { label: "Din uppgift", value: step.action },
    { label: "Det här ska du tänka på", value: step.curiosityTrigger },
    { label: "Målet", value: step.outcomeDefinition },
    { label: "Tips för att starta", value: step.quickStartLinkHint },
  ];

  const status = step.complete
    ? STATUS_CONFIG.complete
    : STATUS_CONFIG.incomplete;

  const infoItems = [
    {
      icon: Tag,
      label: "Kategori",
      value: step.category.charAt(0).toUpperCase() + step.category.slice(1),
      iconClass: "bg-violet-100 text-violet-600",
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      label: "Svårighetsgrad",
      value: step.complexity,
      iconClass: "bg-orange-100 text-orange-600",
    },
    {
      icon: Clock,
      label: "Beräknad Tid",
      value: `${step.estimatedMinutes} min`,
      iconClass: "bg-blue-100 text-blue-600",
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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 pt-5 pb-6.5">
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
              iconClass={item.iconClass}
            />
          ))}
        </Card>

        <Card className="flex flex-col gap-8">
          {detailRows.map((row) => (
            <StepDetailRow
              key={row.label}
              label={row.label}
              value={row.value}
            />
          ))}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <p className={`text-sm font-medium ${status.textClass}`}>
              {step.complete
                ? "Det här steget är klart."
                : "Det här steget är inte klart ännu."}
            </p>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${status.badgeClass}`}
            >
              {status.badge}
            </span>
          </div>
        </Card>
      </div>
    </Card>
  );
}
