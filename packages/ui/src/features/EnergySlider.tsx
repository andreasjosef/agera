import { Card } from "../primitives/Card";
import { Battery, BatteryFull } from "lucide-react";
import { useState } from "react";

export function EnergySlider() {
  const [energy, setEnergy] = useState(50);

  const getEnergyFeedback = (value: number) => {
    console.log("[ENERGY SLIDER] normalized value: ", value / 10);
    if (value < 35)
      return "Helt okej. Vi fokuserar på korta, lätta uppgifter idag.";
    if (value > 75)
      return "Kraftfullt! Ett perfekt tillfälle för ett djupt deepwork-pass.";
    return "Stabil energi. Nu hittar vi en skön rytm.";
  };

  return (
    <Card className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold tracking-widest text-content-muted uppercase">
          Vad är din energinivå idag?
        </h3>
        <span className="text-sm font-bold text-violet-600">{energy}%</span>
      </div>

      <div className="flex items-center gap-4">
        <Battery
          className={`size-5 transition-colors ${energy < 35 ? "text-state-caution" : "text-content-subtle"}`}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full h-2 bg-app-surface-hover rounded-lg appearance-none cursor-pointer accent-brand-primary focus:outline-none"
        />

        <BatteryFull
          className={`size-5 transition-colors ${energy > 75 ? "text-state-success" : "text-content-subtle"}`}
        />
      </div>

      <p className="text-sm font-medium text-content-subtle italic transition-all duration-300">
        {getEnergyFeedback(energy)}
      </p>
    </Card>
  );
}
