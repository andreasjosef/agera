import { Card } from "../primitives/Card";

export interface WelcomeCardProps {
  username: string;
  hour?: number;
}

type Period = "morning" | "day" | "evening" | "night";

function getPeriod(hour: number): Period {
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "day";
  if (hour >= 17 && hour < 22) return "evening";
  return "night";
}

const config: Record<Period, { greeting: string; message: string; gradient: string }> = {
  morning: {
    greeting: "God morgon",
    message: "En bra dag börjar med ett litet steg",
    gradient: "bg-linear-to-r from-amber-100 to-white",
  },
  day: {
    greeting: "God dag",
    message: "En sak i taget",
    gradient: "bg-linear-to-r from-blue-100 to-white",
  },
  evening: {
    greeting: "God kväll",
    message: "Du har gjort mycket idag",
    gradient: "bg-linear-to-r from-purple-100 to-white",
  },
  night: {
    greeting: "God natt",
    message: "Vila är också produktivt",
    gradient: "bg-linear-to-r from-zinc-100 to-white",
  },
};

export function WelcomeCard({ username, hour = new Date().getHours() }: WelcomeCardProps) {
  const period = getPeriod(hour);
  const { greeting, message, gradient } = config[period];

  return (
    <Card className={gradient}>
      <h2 className="font-display text-xl font-semibold">
        {greeting} {username}
      </h2>
      <p className="text-content-muted text-sm">{message}</p>
    </Card>
  );
}