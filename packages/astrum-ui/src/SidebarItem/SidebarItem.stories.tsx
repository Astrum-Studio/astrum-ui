import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SidebarItem, SidebarItemSettingsIcon } from "./SidebarItem";

const meta = {
  component: SidebarItem,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    showEndIcon: { control: "boolean" },
    children: { control: "text" },
    leadingIcon: { control: false },
    endIcon: { control: false },
    href: { control: "text", description: "Можно не заполнять" },
    as: { control: false },
  },
  args: {
    children: "Настройки",
    active: false,
    disabled: false,
    showEndIcon: true,
  },
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const col: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 280,
};

export const Default: Story = {
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} leadingIcon={<SidebarItemSettingsIcon />} />
    </div>
  ),
};

export const WithoutLeadingIcon: Story = {
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} />
    </div>
  ),
};

export const Active: Story = {
  args: { active: true },
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} leadingIcon={<SidebarItemSettingsIcon />} />
    </div>
  ),
};

export const ActiveTextOnly: Story = {
  name: "Active",
  args: { active: true },
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} leadingIcon={<SidebarItemSettingsIcon />} />
    </div>
  ),
};

export const AsLink: Story = {
  args: { href: "#", active: false },
  render: (args) => (
    <div style={col}>
      <SidebarItem {...args} leadingIcon={<SidebarItemSettingsIcon />} />
    </div>
  ),
};

export const Overview: Story = {
  name: "Все состояния (макет)",
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      <div style={col}>
        <span style={{ fontSize: 12, color: "#818181" }}>С иконкой слева</span>
        <SidebarItem leadingIcon={<SidebarItemSettingsIcon />}>Настройки</SidebarItem>
        <SidebarItem active leadingIcon={<SidebarItemSettingsIcon />}>
          Настройки
        </SidebarItem>
        <SidebarItem disabled leadingIcon={<SidebarItemSettingsIcon />}>
          Настройки
        </SidebarItem>
      </div>
      <div style={col}>
        <span style={{ fontSize: 12, color: "#818181" }}>Без иконки слева</span>
        <SidebarItem>Настройки</SidebarItem>
        <SidebarItem active>Настройки</SidebarItem>
        <SidebarItem disabled>Настройки</SidebarItem>
      </div>
    </div>
  ),
};
