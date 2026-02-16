import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ListItem } from "./ListItem";

const meta = {
  component: ListItem,
  tags: ["autodocs"],
  argTypes: {
    showChevron: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    title: {
      control: "text",
    },
    subtitle: {
      control: "text",
    },
  },
  args: {
    title: "Иван Иванов",
    subtitle: "Имя и фамилия",
  },
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

const listStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 400,
};

export const Default: Story = {
  args: {
    title: "Иван Иванов",
    subtitle: "Имя и фамилия",
  },
};

export const List: Story = {
  render: () => (
    <div style={listStyle}>
      <ListItem title="Иван Иванов" subtitle="Имя и фамилия" />
      <ListItem title="Мария Петрова" subtitle="Имя и фамилия" />
      <ListItem title="Алексей Сидоров" subtitle="Имя и фамилия" />
      <ListItem title="Елена Козлова" subtitle="Имя и фамилия" />
    </div>
  ),
};

export const WithCustomAvatar: Story = {
  render: () => (
    <div style={listStyle}>
      <ListItem
        title="Иван Иванов"
        subtitle="Имя и фамилия"
        avatar={
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
      />
      <ListItem
        title="Мария Петрова"
        subtitle="Имя и фамилия"
        avatar={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2653F2",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            МП
          </div>
        }
      />
    </div>
  ),
};

export const WithoutSubtitle: Story = {
  render: () => (
    <div style={listStyle}>
      <ListItem title="Иван Иванов" />
      <ListItem title="Мария Петрова" />
      <ListItem title="Алексей Сидоров" />
    </div>
  ),
};

export const WithoutChevron: Story = {
  args: {
    title: "Иван Иванов",
    subtitle: "Имя и фамилия",
    showChevron: false,
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={listStyle}>
      <ListItem title="Иван Иванов" subtitle="Имя и фамилия" disabled />
      <ListItem title="Мария Петрова" subtitle="Имя и фамилия" />
      <ListItem title="Алексей Сидоров" subtitle="Имя и фамилия" disabled />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={listStyle}>
      <ListItem
        title="Иван Иванов"
        subtitle="Имя и фамилия"
        onClick={() => alert("Клик по Иван Иванов")}
      />
      <ListItem
        title="Мария Петрова"
        subtitle="Имя и фамилия"
        onClick={() => alert("Клик по Мария Петрова")}
      />
      <ListItem
        title="Алексей Сидоров"
        subtitle="Имя и фамилия"
        onClick={() => alert("Клик по Алексей Сидоров")}
      />
    </div>
  ),
};
