import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M8 2v8m0 0l3-3m-3 3L5 7" />
    <path d="M2 12h12" />
  </svg>
);

const meta = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["primary", "outlined", "dashed", "grey", "white", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["s", "m", "l"],
      control: { type: "radio" },
    },
    iconPosition: {
      options: ["left", "right"],
      control: { type: "inline-radio" },
    },
    shape: {
      options: ["default", "square", "circle"],
      control: { type: "inline-radio" },
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "m",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const sizesRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  alignItems: "center",
  flexWrap: "wrap",
};

export const Default: Story = {};

export const Primary: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="primary" size="s">
        Button
      </Button>
      <Button variant="primary" size="m">
        Button
      </Button>
      <Button variant="primary" size="l">
        Button
      </Button>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="outlined" size="s">
        Button
      </Button>
      <Button variant="outlined" size="m">
        Button
      </Button>
      <Button variant="outlined" size="l">
        Button
      </Button>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="dashed" size="s">
        Button
      </Button>
      <Button variant="dashed" size="m">
        Button
      </Button>
      <Button variant="dashed" size="l">
        Button
      </Button>
    </div>
  ),
};

export const Grey: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="grey" size="s">
        Button
      </Button>
      <Button variant="grey" size="m">
        Button
      </Button>
      <Button variant="grey" size="l">
        Button
      </Button>
    </div>
  ),
};

export const White: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="white" size="s">
        Button
      </Button>
      <Button variant="white" size="m">
        Button
      </Button>
      <Button variant="white" size="l">
        Button
      </Button>
    </div>
  ),
};

export const Ghost: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button variant="ghost" size="s">
        Button
      </Button>
      <Button variant="ghost" size="m">
        Button
      </Button>
      <Button variant="ghost" size="l">
        Button
      </Button>
    </div>
  ),
};

export const Icon: Story = {
  render: () => (
    <div style={sizesRowStyle}>
      <Button
        variant="primary"
        size="l"
        icon={<DownloadIcon />}
        iconPosition="left"
      >
        Button
      </Button>
      <Button
        variant="primary"
        size="l"
        icon={<DownloadIcon />}
        iconPosition="right"
      >
        Button
      </Button>
      <Button
        variant="primary"
        size="l"
        icon={<DownloadIcon />}
        shape="square"
      ></Button>
      <Button
        variant="primary"
        size="l"
        icon={<DownloadIcon />}
        shape="circle"
      ></Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button variant="primary" disabled>
        Button
      </Button>
      <Button variant="outlined" disabled>
        Button
      </Button>
      <Button variant="dashed" disabled>
        Button
      </Button>
      <Button variant="grey" disabled>
        Button
      </Button>
      <Button variant="white" disabled>
        Button
      </Button>
      <Button variant="ghost" disabled>
        Button
      </Button>
    </div>
  ),
};
