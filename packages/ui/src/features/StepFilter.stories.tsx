import type { Meta, StoryObj } from "@storybook/react-vite";
import { StepFilter, type StepFilterMode } from "./StepFilter";
import { fn } from "storybook/test";
import { useState } from "react";

const meta: Meta<typeof StepFilter> = {
  title: "Features/StepFilter",
  component: StepFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    setStepFilter: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof StepFilter>;

export const Default: Story = {
  args: {},

  render: (args) => {
    const [stepFilter, setStepFilter] = useState<StepFilterMode>("all");

    return (
      <StepFilter
        stepFilter={stepFilter}
        setStepFilter={(mode) => {
          setStepFilter(mode);
          args.setStepFilter(mode);
        }}
      />
    );
  },
};
