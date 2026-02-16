import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggler } from "./Toggler";

const meta = {
  component: Toggler,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
  args: {
    checked: false,
  },
} satisfies Meta<typeof Toggler>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [checked, setChecked] = useState(false);
    return <Toggler checked={checked} onChange={setChecked} />;
  },
};
