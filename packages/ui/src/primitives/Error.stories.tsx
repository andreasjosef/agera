import type { Meta, StoryObj } from "@storybook/react-vite";
import { Error } from "./Error";

const meta: Meta<typeof Error> = {
  title: "Primitives/Error",
  component: Error,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    message: "Kunde inte ladda nästa Steg!",
  },
};
