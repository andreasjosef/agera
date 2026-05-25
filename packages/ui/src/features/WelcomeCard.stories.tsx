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
