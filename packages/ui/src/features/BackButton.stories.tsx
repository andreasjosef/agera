import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { BackButton } from "./BackButton";

const meta: Meta<typeof BackButton> = {
  title: "Features/BackButton",
  component: BackButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    handleBack: fn(),
    canGoBack: true,
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

export const Default: Story = {
  args: {},
};
