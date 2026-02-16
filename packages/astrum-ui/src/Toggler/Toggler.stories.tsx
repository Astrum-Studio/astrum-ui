import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggler } from "./Toggler";

const meta = {
  component: Toggler,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["s", "m"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
  args: {
    label: "Toggler",
    size: "m",
  },
} satisfies Meta<typeof Toggler>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={rowStyle}>
        <Toggler checked label="Вкл" />
        <Toggler checked label="Вкл (hover)" />
        <Toggler checked disabled label="Вкл (disabled)" />
      </div>
      <div style={rowStyle}>
        <Toggler label="Выкл" />
        <Toggler label="Выкл (hover)" />
        <Toggler disabled label="Выкл (disabled)" />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledRender() {
    const [on, setOn] = useState(false);
    return (
      <Toggler
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
        label={on ? "Включено" : "Выключено"}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Toggler label="Размер S" size="s" />
      <Toggler label="Размер M" size="m" checked />
    </div>
  ),
};
