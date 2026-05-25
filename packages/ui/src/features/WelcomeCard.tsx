import { Card } from "../primitives/Card";
import { Button } from "../primitives/Button";

import { Sunrise, Sun, Sunset, Moon, LucideIcon } from "lucide-react";

export interface WelcomeCardProps {
  username: string;
  hour?: number;
  onStartPass?: () => void;
}

type Period = "morning" | "day" | "evening" | "night";

function getPeriod(hour: number): Period {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "day";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

const config: Record<
  Period,
  {
    greeting: string;
    message: string;
    gradient: string;
    icon: LucideIcon;
    iconClass: string;
  }
> = {
  morning: {
    greeting: "God morgon",
    message: "En bra dag börjar med ett litet steg",
    gradient: "bg-linear-to-r from-amber-100 to-white",
    icon: Sunrise,
    iconClass: "text-amber-500",
  },
  day: {
    greeting: "God dag",
    message: "En sak i taget",
    gradient: "bg-linear-to-r from-blue-100 to-white",
    icon: Sun,
    iconClass: "text-blue-500",
  },
  evening: {
    greeting: "God kväll",
    message: "Du har gjort mycket idag",
    gradient: "bg-linear-to-r from-purple-100 to-white",
    icon: Sunset,
    iconClass: "text-purple-500",
  },
  night: {
    greeting: "God natt",
    message: "Vila är också produktivt",
    gradient: "bg-linear-to-r from-zinc-300 to-white",
    icon: Moon,
    iconClass: "text-zinc-500",
  },
};

export function WelcomeCard({
  username,
  hour = new Date().getHours(),
  onStartPass,
}: WelcomeCardProps) {
  const period = getPeriod(hour);
  const {
    greeting,
    message,
    gradient,
    icon: PeriodIcon,
    iconClass,
  } = config[period];

  return (
    <Card className={gradient}>
      <div className="gap-4">
        <div className="flex justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold">
            {greeting} {username}
          </h2>
          <PeriodIcon className={`size-6 stroke-[1.75] ${iconClass}`} />
        </div>
        <p className="text-content-muted text-sm">{message}</p>

        {onStartPass && (
          <Button onClick={onStartPass} className="w-52">
            STARTA PASSET
          </Button>
        )}
      </div>
    </Card>
  );
}
