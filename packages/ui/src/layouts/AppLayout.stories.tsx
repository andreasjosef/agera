import type { Meta, StoryObj } from "@storybook/react-vite";
import AppLayout from "./AppLayout";
import AppSidebar from "../features/AppSidebar";
import { SidebarLink } from "../primitives/SidebarLink";
import { GalleryHorizontalEnd, LayoutDashboard, Settings } from "lucide-react";

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
    children: <div> Cockpit Page </div>,
    sidebar: (
      <AppSidebar open>
        <div className="flex flex-col h-full">
          <nav>
            <SidebarLink label="Cockpit" icon={LayoutDashboard} isActive />
            <SidebarLink label="All" icon={GalleryHorizontalEnd} />
          </nav>

          <footer className="mt-auto">
            <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
            <SidebarLink label="Settings" icon={Settings} />
          </footer>
        </div>
      </AppSidebar>
    ),
  },
};

export const SidebarClosed: Story = {
  args: {
    children: <div> Focus </div>,
    sidebar: <AppSidebar open={false}></AppSidebar>,
  },
};
