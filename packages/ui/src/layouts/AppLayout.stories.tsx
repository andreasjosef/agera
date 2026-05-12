import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppLayout } from "./AppLayout";
import { AppSidebar } from "../features/AppSidebar";
import { NavItem } from "../primitives/NavItem";
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
    children: (
      <>
        <aside>
          <AppSidebar open>
            <div className="flex flex-col h-full">
              <nav>
                <NavItem label="Cockpit" icon={LayoutDashboard} isActive />
                <NavItem label="All" icon={GalleryHorizontalEnd} />
              </nav>

              <footer className="mt-auto">
                <p className="p-2 text-center bg-cod-gray-200">Sync Status</p>
                <NavItem label="Settings" icon={Settings} />
              </footer>
            </div>
          </AppSidebar>
        </aside>
        <div className="p-4"> Cockpit Page </div>
      </>
    ),
  },
};

export const SidebarClosed: Story = {
  args: {
    children: (
      <>
        <aside>
          <AppSidebar open={false}></AppSidebar>
        </aside>
        <div className="p-4"> Focus </div>
      </>
    ),
  },
};
