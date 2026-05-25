import type { Meta, StoryObj } from "@storybook/react-vite";
import { WelcomeCard } from "./WelcomeCard";

const meta: Meta<typeof WelcomeCard> = {
  title: "Features/WelcomeCard",
  component: WelcomeCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeCard>;

export const Default: Story = {
  args: {
    username: "Guenther",
  },
};

export const Morning: Story = {
  args: {
    username: "Guenther",
    hour: 8,
  },
};

export const Day: Story = {
  args: {
    username: "Guenther",
    hour: 14,
  },
};

export const Evening: Story = {
  args: {
    username: "Guenther",
    hour: 19,
  },
};

export const Night: Story = {
  args: {
    username: "Guenther",
    hour: 1,
  },
};