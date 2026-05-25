import type { Meta, StoryObj } from "@storybook/react-vite";

import { EnergySelector, type EnergyLevel } from "./EnergySelector";
import { fn } from "storybook/test";
import { useState } from "react";

const meta: Meta<typeof EnergySelector> = {
  title: "Features/EnergySelector",
  component: EnergySelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    setEnergyLevel: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof EnergySelector>;

export const Default: Story = {
  render: (args) => {
    const [energyLevel, setEnergyLevel] = useState<EnergyLevel>("high");

    return (
      <EnergySelector
        energyLevel={energyLevel}
        setEnergyLevel={(val) => {
          setEnergyLevel(val);
          args.setEnergyLevel(val);
        }}
      />
    );
  },
};
