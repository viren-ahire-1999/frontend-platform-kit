import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Badge" },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "success", "danger", "warning", "info"]
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: "neutral", children: "Neutral" } };
export const Success: Story = { args: { tone: "success", children: "Active" } };
export const Danger: Story = { args: { tone: "danger", children: "Failed" } };
export const Warning: Story = { args: { tone: "warning", children: "Pending" } };
export const Info: Story = { args: { tone: "info", children: "Beta" } };
