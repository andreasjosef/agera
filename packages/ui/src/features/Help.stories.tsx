import type { Meta, StoryObj } from "@storybook/react-vite";
import { Help } from "./Help";

const meta: Meta<typeof Help> = {
  title: "Features/GettingStarted",
  component: Help,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Help>;

export const Default: Story = {
  args: {
    onAdjustEnergy: () => console.log("Navigate"),
    onConnectCanvas: () => console.log("Navigate"),
    onExploreFlow: () => console.log("Navigate"),
    onGoToFocus: () => console.log("Navigate"),
  },
};
