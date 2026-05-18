import type { Meta, StoryObj } from "@storybook/react-vite";
import { BodyDoublingDisplay } from "./BodyDoublingDisplay";

const meta: Meta<typeof BodyDoublingDisplay> = {
  title: "Features/BodyDoublingDisplay",
  component: BodyDoublingDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    activeCount: 42,
  },
};

export default meta;
type Story = StoryObj<typeof BodyDoublingDisplay>;

export const Default: Story = {
  args: {},
};
