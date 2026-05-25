import type { Meta, StoryObj } from "@storybook/react-vite";
import { LabeledInput } from "./LabeledInput";

const meta: Meta<typeof LabeledInput> = {
  title: "Primitives/LabeledInput",
  component: LabeledInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof LabeledInput>;

export const Default: Story = {
  args: {
    label: "E-post",
  },
};
export const Error: Story = {
  args: {
    label: "E-post",
    error: "Ogiltig e-postadress",
  },
};
