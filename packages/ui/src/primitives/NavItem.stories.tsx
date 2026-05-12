import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavItem } from "./NavItem";
import { Card } from "./Card";
import { User, Bell, Settings, Home } from "lucide-react";

const meta: Meta<typeof NavItem> = {
  title: "Primitives/NavItem",
  component: NavItem,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    icon: {
      control: { type: "select" },
      options: ["Home", "User", "Bell", "Settings"],
      mapping: {
        Home: Home,
        User: User,
        Bell: Bell,
        Settings: Settings,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavItem>;

export const Inactive: Story = {
  args: {
    label: "Profil",
    icon: User,
    isActive: false,
    onClick: () => console.log("Navigating..."),
  },
};

export const Active: Story = {
  args: {
    label: "Integrationer",
    icon: Settings,
    isActive: true,
  },
};

export const SidebarContext: Story = {
  render: (args) => (
    <Card>
      <NavItem {...args} label="Integrations" icon={Settings} isActive={true} />
      <NavItem {...args} label="Preferences" icon={User} isActive={false} />
    </Card>
  ),
};
