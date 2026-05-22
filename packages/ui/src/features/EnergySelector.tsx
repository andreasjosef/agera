import { Card } from "../primitives/Card";
import { SelectList } from "../primitives/SelectList";

export type EnergyLevel = "low" | "high";

const energyOptions = [
  { label: "Låg", value: "low" },
  { label: "Full Laddat", value: "high" },
] as const;

interface EnergySelectorProps {
  energyLevel: EnergyLevel;
  setEnergyLevel: (value: EnergyLevel) => void;
}

export function EnergySelector({
  energyLevel,
  setEnergyLevel,
}: EnergySelectorProps) {
  return (
    <Card className="grid gap-y-2">
      <h3 className="text-lg font-semibold">Vad är din Energi Nivå idag?</h3>
      <SelectList
        options={energyOptions}
        value={energyLevel}
        onChange={setEnergyLevel}
        columns={energyOptions.length}
      />
    </Card>
  );
}
