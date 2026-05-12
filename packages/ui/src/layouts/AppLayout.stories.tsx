import type { Meta, StoryObj } from "@storybook/react-vite";
import AppLayout from "./AppLayout";
import AppSidebar from "../features/AppSidebar";

const meta: Meta<typeof AppLayout> = {
  title: "Layouts/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

export const Default: Story = {
  args: {
    children: <div> Main Content </div>,
    sidebar: <AppSidebar open />,
  },
};

export const SidebarClosed: Story = {
  args: {
    children: <div> Main Content </div>,
    sidebar: <AppSidebar open={false} />,
  },
};
