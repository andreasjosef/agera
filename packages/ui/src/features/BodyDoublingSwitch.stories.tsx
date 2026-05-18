import type { Meta, StoryObj } from "@storybook/react-vite";
import { BodyDoublingSwitch } from "./BodyDoublingSwitch";
import { fn } from "storybook/test";
import { useState } from "react";

const meta: Meta<typeof BodyDoublingSwitch> = {
  title: "Features/BodyDoublingSwitch",
  component: BodyDoublingSwitch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    setIsEnable: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof BodyDoublingSwitch>;

export const Default: Story = {
  render: (args) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
      <BodyDoublingSwitch
        enabled={isEnabled}
        setIsEnable={(val) => {
          setIsEnabled(val);
          args.setIsEnable(val); // Log actions
        }}
      />
    );
  },
};
