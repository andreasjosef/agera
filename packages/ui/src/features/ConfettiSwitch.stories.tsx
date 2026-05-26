import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfettiSwitch } from "./ConfettiSwitch";
import { fn } from "storybook/test";
import { useState } from "react";

const meta: Meta<typeof ConfettiSwitch> = {
  title: "Features/ConfettiSwitch",
  component: ConfettiSwitch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    setIsEnabled: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ConfettiSwitch>;

export const Default: Story = {
  render: (args) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <ConfettiSwitch
        isEnabled={isEnabled}
        setIsEnabled={(val) => {
          setIsEnabled(val);
          args.setIsEnabled(val);
        }}
      />
    );
  },
};
