import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    value: {
      control: "text",
    },
  },
  args: {
    value: "radio",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  flexWrap: "wrap",
};

export const Default: Story = {
  args: {
    value: "radio",
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={rowStyle}>
        <Radio name="row1" value="1" checked />
        <Radio name="row2" value="2" checked />
        <Radio name="row3" value="3" checked disabled />
      </div>
      <div style={rowStyle}>
        <Radio name="row4" value="4" />
        <Radio name="row5" value="5" />
        <Radio name="row6" value="6" disabled />
      </div>
    </div>
  ),
};

export const WithRadioGroup: Story = {
  render: function WithRadioGroupRender() {
    const [value, setValue] = useState<string | null>("2");
    return (
      <RadioGroup name="choice" value={value} onChange={setValue}>
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" />
      </RadioGroup>
    );
  },
};

