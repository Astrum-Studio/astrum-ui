import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuItem } from "./MenuItem";

const GearIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 3.5V2m0 16v-1.5m6.5-6.5H18m-16 0h1.5m12.5-5.5l-1.06 1.06M4.56 15.44l-1.06 1.06m11.88 0l-1.06-1.06M4.56 4.56L5.62 3.5m9.88 11.88l-1.06-1.06M15.44 4.56l1.06-1.06"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const LightningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M8.5 2l-4 6h3l-1 6 4-6h-3l1-6z"
      fill="currentColor"
    />
  </svg>
);

const meta = {
  component: MenuItem,
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    showChevron: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Настройки",
  },
} satisfies Meta<typeof MenuItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  maxWidth: 300,
};

export const Default: Story = {
  args: {
    children: "Настройки",
    endIcon: <LightningIcon />,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Настройки",
    icon: <GearIcon />,
    endIcon: <LightningIcon />,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem endIcon={<LightningIcon />}>Настройки</MenuItem>
      <MenuItem icon={<GearIcon />} endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
    </div>
  ),
};

export const HoverState: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem endIcon={<LightningIcon />}>Настройки (hover)</MenuItem>
      <MenuItem icon={<GearIcon />} endIcon={<LightningIcon />}>
        Настройки (hover)
      </MenuItem>
    </div>
  ),
};

export const FocusedState: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem endIcon={<LightningIcon />} onFocus={(e) => e.currentTarget.focus()}>
        Настройки (focused)
      </MenuItem>
      <MenuItem icon={<GearIcon />} endIcon={<LightningIcon />} onFocus={(e) => e.currentTarget.focus()}>
        Настройки (focused)
      </MenuItem>
    </div>
  ),
};

export const ActiveState: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem active endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
      <MenuItem active icon={<GearIcon />} endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
    </div>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem disabled endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
      <MenuItem disabled icon={<GearIcon />} endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
    </div>
  ),
};

export const WithoutEndIcon: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem>Настройки</MenuItem>
      <MenuItem icon={<GearIcon />}>Настройки</MenuItem>
    </div>
  ),
};

export const MenuList: Story = {
  render: () => (
    <div style={listStyle}>
      <MenuItem icon={<GearIcon />} endIcon={<LightningIcon />}>
        Настройки
      </MenuItem>
      <MenuItem endIcon={<LightningIcon />}>Профиль</MenuItem>
      <MenuItem active icon={<GearIcon />} endIcon={<LightningIcon />}>
        Активный пункт
      </MenuItem>
      <MenuItem disabled endIcon={<LightningIcon />}>
        Отключено
      </MenuItem>
    </div>
  ),
};
