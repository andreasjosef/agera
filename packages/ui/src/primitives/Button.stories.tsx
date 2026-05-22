import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "outline", "muted"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Done",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Skip For Today",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Logout",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Login",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "Cancel",
  },
};
