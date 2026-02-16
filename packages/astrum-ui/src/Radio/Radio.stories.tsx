import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  component: Radio,
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
    value: {
      control: "text",
    },
  },
  args: {
    label: "Radio",
    value: "radio",
    size: "m",
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

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={rowStyle}>
        <Radio name="row1" value="1" checked label="Выбран" />
        <Radio name="row2" value="2" checked label="Выбран (hover)" />
        <Radio name="row3" value="3" checked disabled label="Выбран (disabled)" />
      </div>
      <div style={rowStyle}>
        <Radio name="row4" value="4" label="Не выбран" />
        <Radio name="row5" value="5" label="Не выбран (hover)" />
        <Radio name="row6" value="6" disabled label="Не выбран (disabled)" />
      </div>
    </div>
  ),
};

export const WithRadioGroup: Story = {
  render: function WithRadioGroupRender() {
    const [value, setValue] = useState<string | null>("2");
    return (
      <RadioGroup name="choice" value={value} onChange={setValue}>
        <Radio value="1" label="Вариант 1" />
        <Radio value="2" label="Вариант 2" />
        <Radio value="3" label="Вариант 3" />
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={rowStyle}>
      <Radio name="size" value="s" label="Размер S" size="s" />
      <Radio name="size" value="m" checked label="Размер M" size="m" />
    </div>
  ),
};

export const InlineGroup: Story = {
  render: function InlineGroupRender() {
    const [value, setValue] = useState<string | null>("b");
    return (
      <RadioGroup name="inline" value={value} onChange={setValue} data-inline>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" />
        <Radio value="c" label="C" />
      </RadioGroup>
    );
  },
};
