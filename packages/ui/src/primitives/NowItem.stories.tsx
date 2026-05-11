import type { Meta, StoryObj } from "@storybook/react-vite";
import { NowItem } from "./NowItem";
import { Play, Goal } from "lucide-react";

const meta: Meta<typeof NowItem> = {
  title: "Primitives/NowItem",
  component: NowItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NowItem>;

export const Default: Story = {
  args: {
    icon: Play,
    title: "Steg 1",
    content: "Öppna din terminal och kör pnpm dev.",
  },
};

export const WhySection: Story = {
  args: {
    icon: Goal,
    title: "Varför?",
    content:
      "För att säkerställa att din lokala miljö är synkad med de senaste ändringarna.",
  },
};
