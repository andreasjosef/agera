import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { TimeSelector } from "./TimeSelector";

const meta: Meta<typeof TimeSelector> = {
  title: "Features/TimeSelector",
  component: TimeSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    setTime: fn(),
    handleSelectSubmit: fn((e) => {
      e.preventDefault();
    }),
  },
};

export default meta;
type Story = StoryObj<typeof TimeSelector>;

export const Default: Story = {
  args: {
    timeSeconds: 1800000, // 30 min
  },
};
