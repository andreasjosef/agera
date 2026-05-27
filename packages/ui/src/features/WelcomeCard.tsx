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
    greeting: "Godmorgon",
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
    greeting: "Godnatt",
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

  const today = new Date();
  const swedishDate = capitalize(
    today.toLocaleDateString("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "short",
    }),
  );

  return (
    <Card className={gradient}>
      <div className="flex justify-between w-full py-3">
        <div className="space-y-3">
          <header>
            <h2 className="font-display text-3xl font-bold text-zinc-800">
              {greeting} {username}
            </h2>
            <p className="text-content-subtle text-base font-medium">
              {message}
            </p>
          </header>
          {onStartPass && (
            <Button onClick={onStartPass} className="rounded-lg w-max">
              Börja
            </Button>
          )}
        </div>
        <div className="space-y-2">
          <div className="self-end text-xs font-bold tracking-wider uppercase text-content-subtle">
            {swedishDate}
          </div>
          <PeriodIcon className={`ml-auto size-6 stroke-[1.75] ${iconClass}`} />
        </div>
      </div>
    </Card>
  );
}
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
