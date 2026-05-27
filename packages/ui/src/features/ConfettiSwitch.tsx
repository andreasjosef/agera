import { PartyPopper } from "lucide-react";
import { Card } from "../primitives/Card";
import { Switch } from "../primitives/Switch";

interface ConfettiSwitchProps {
  isEnabled: boolean;
  setIsEnabled: (val: boolean) => void;
}

export function ConfettiSwitch({
  isEnabled,
  setIsEnabled,
}: ConfettiSwitchProps) {
  return (
    <Card className="grid gap-y-2">
      <header className="grid gap-y-2">
        <div className="flex items-center gap-2">
          <PartyPopper className="size-4 text-content-muted stroke-2" />
          <h4 className="text-xs font-bold tracking-widest text-content-muted uppercase">
            Konfetti
          </h4>
        </div>
        <p className="text-content-muted">
          När du har slutfört ett nytt steg visas en konfettieffekt på skärmen
        </p>
      </header>

      <Switch
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        onLabel="Aktiverad"
        offLabel="Inaktiverad"
      />
    </Card>
  );
}
