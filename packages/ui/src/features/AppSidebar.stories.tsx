import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppSidebar } from "./AppSidebar";
import { NavItem } from "../primitives/NavItem";
import {
  BookA,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Settings,
} from "lucide-react";

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
    navLinks: (
      <>
        <NavItem label="Cockpit" icon={LayoutDashboard} isActive />
        <NavItem label="Now" icon={BookA} />
        <NavItem label="All" icon={GalleryHorizontalEnd} />
      </>
    ),
    footerContent: (
      <>
        {/* TODO: Implement an actual component */}
        <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
        <NavItem label="Settings" icon={Settings} />
      </>
    ),
  },
};
export const Closed: Story = {
  args: {
    open: false,
  },
};
