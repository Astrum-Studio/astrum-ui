import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["s", "m"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
  args: {
    size: "m",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
};

export const Default: Story = {};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={rowStyle}>
        <Checkbox checked />
        <Checkbox checked disabled />
        <Checkbox indeterminate />
      </div>
      <div style={rowStyle}>
        <Checkbox />
        <Checkbox disabled />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Checkbox size="s" />
      <Checkbox size="m" checked />
    </div>
  ),
};
