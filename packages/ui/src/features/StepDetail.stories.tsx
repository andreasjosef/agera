import type { Meta, StoryObj } from "@storybook/react-vite";
import { StepDetail } from "./StepDetail";

import { mockStep } from "../mocks/steps";

const meta: Meta<typeof StepDetail> = {
  title: "Features/StepDetail",
  component: StepDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof StepDetail>;

export const Default: Story = {
  args: {
    step: mockStep,
  },
};
