import type { Meta, StoryObj } from "@storybook/react-vite";
import { MobileNavMenu } from "../features/MobileNavMenu";
import { NavItem } from "../primitives/NavItem";
import { GalleryHorizontalEnd, LayoutDashboard, Settings } from "lucide-react";

const meta: Meta<typeof MobileNavMenu> = {
  title: "Features/MobileNavMenu",
  component: MobileNavMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof MobileNavMenu>;

export const Default: Story = {
  args: {
    navLinks: (
      <>
        <li>
          <NavItem label="Cockpit" icon={LayoutDashboard} isActive iconOnly />
        </li>
        <li>
          <NavItem label="All" icon={GalleryHorizontalEnd} iconOnly />
        </li>
        <li>
          <NavItem label="Settings" icon={Settings} iconOnly />
        </li>
      </>
    ),
  },
};
