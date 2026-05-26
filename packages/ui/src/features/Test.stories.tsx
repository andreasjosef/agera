import type { Meta, StoryObj } from "@storybook/react-vite";
import { Test } from "./Test";

const meta: Meta<typeof Error> = {
  title: "Features/Test",
  component: Test,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Test>;

export const Default: Story = {
  args: {
    onNavigateToIntegration: () => console.log("Navigate"),
    onNavigateToBreakdown: () => console.log("Navigate"),
    onNavigateToCockpit: () => console.log("Navigate"),
    onNavigateToFocus: () => console.log("Navigate"),
    onNavigateToManualAdd: () => console.log("Navigate"),
  },
};
