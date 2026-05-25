import type { Meta, StoryObj } from "@storybook/react-vite";
import { EnergySlider } from "./EnergySlider";

const meta: Meta<typeof EnergySlider> = {
  title: "Features/EnergySlider",
  component: EnergySlider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof EnergySlider>;

export const Default: Story = {
  args: {},
};
