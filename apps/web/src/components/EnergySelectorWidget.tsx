import { EnergySlider } from "@ccpilot/ui";
import { useEnergy } from "@/modules/cockpit/store";

export function EnergySelectorWidget() {
  const energyLevel = useEnergy((s) => s.energyLevel);
  const setEnergyLevel = useEnergy((s) => s.setEnergyLevel);

  return <EnergySlider energyLevel={energyLevel} setEnergyLevel={setEnergyLevel} />;
}
