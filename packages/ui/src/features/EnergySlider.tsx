import { Card } from "../primitives/Card";
import { Battery, BatteryFull } from "lucide-react";
import { useState } from "react";

interface EnergySliderProps {
  energyLevel: number;
  setEnergyLevel: (value: number) => void;
}

export function EnergySlider({
  energyLevel,
  setEnergyLevel,
}: EnergySliderProps) {
  const sliderToNormalized = (value: number): number => {
    if (value < 35) return 1;
    if (value > 75) return 9;
    return 5;
  };

  const normalizedToSlider = (value: number): number => {
    if (value <= 1) return 16;
    if (value >= 9) return 83;
    return 50;
  };

  const [sliderPosition, setSliderPosition] = useState(
    normalizedToSlider(energyLevel),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(e.target.value);
    setSliderPosition(raw);
    const normalized = sliderToNormalized(raw);
    setEnergyLevel(normalized);
  };

  const getEnergyFeedback = (value: number) => {
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
        <span className="text-sm font-bold text-violet-600">
          {sliderPosition}%
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Battery
          className={`size-5 transition-colors ${sliderPosition < 35 ? "text-state-caution" : "text-content-subtle"}`}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleChange}
          className="w-full h-2 bg-app-surface-hover rounded-lg appearance-none cursor-pointer accent-brand-primary focus:outline-none"
        />

        <BatteryFull
          className={`size-5 transition-colors ${sliderPosition > 75 ? "text-state-success" : "text-content-subtle"}`}
        />
      </div>

      <p className="text-sm font-medium text-content-subtle italic transition-all duration-300">
        {getEnergyFeedback(sliderPosition)}
      </p>
    </Card>
  );
}
