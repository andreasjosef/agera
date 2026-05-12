import type { Meta, StoryObj } from "@storybook/react-vite";
import AppSidebar from "./AppSidebar";
import { NavItem } from "../primitives/NavItem";
import { GalleryHorizontalEnd, LayoutDashboard, Settings } from "lucide-react";

const meta: Meta<typeof AppSidebar> = {
  title: "Features/AppSidebar",
  component: AppSidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  // Wrap the component in a full height view
  decorators: [
    (Story) => (
      <div className="h-screen p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  args: {
    open: true,
    children: (
      // TODO: Make this a reusable mockup component ?
      <div className="flex flex-col h-full">
        <nav>
          <NavItem label="Cockpit" icon={LayoutDashboard} isActive />
          <NavItem label="All" icon={GalleryHorizontalEnd} />
        </nav>

        <footer className="mt-auto">
          {/* TODO: Implement an actual component */}
          <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
          <NavItem label="Settings" icon={Settings} />
        </footer>
      </div>
    ),
  },
};
