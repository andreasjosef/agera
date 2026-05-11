import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Features/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    isLoading: false,
    onSubmit: (data) => console.log("Form submitted:", data),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: () => {},
  },
};
