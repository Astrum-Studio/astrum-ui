import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 40, max: 200, step: 4 },
    },
    src: {
      control: "text",
    },
  },
  args: {
    size: 56,
    src: "https://placehold.co/128",
    alt: "User",
    onUpload: (file: File) => console.log("Upload:", file.name),
    onRemove: () => console.log("Remove"),
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, auto)",
  gap: 24,
  alignItems: "center",
  justifyContent: "start",
};

export const Default: Story = {
  render: function DefaultRender(args) {
    const [img, setImg] = useState<string | null>(args.src ?? "https://placehold.co/128");
    return (
      <Avatar
        {...args}
        size={args.size}
        src={img ?? undefined}
        onUpload={(file) => {
          const url = URL.createObjectURL(file);
          setImg(url);
        }}
        onRemove={() => setImg(null)}
      />
    );
  },
};

export const AllStates: Story = {
  render: () => { 
    const [img, setImg] = useState<string | null>("https://placehold.co/128");

    return (
      <div style={gridStyle}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Avatar
            size={56}
            onUpload={(f) => console.log(f.name)}
            onRemove={() => console.log("remove")}
          />
          <span style={{ fontSize: 12, color: "#666" }}>По умолчанию (пустой)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Avatar
            size={56}
            src={img ?? undefined}
            alt="User"
            onUpload={(file) => {
              const url = URL.createObjectURL(file);
              setImg(url);
            }}
            onRemove={() => setImg(null)}
          />
          <span style={{ fontSize: 12, color: "#666" }}>По умолчанию (с фото)</span>
        </div>
      </div>
    )
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
      <Avatar size={56} onUpload={() => {}} onRemove={() => {}} />
      <Avatar size={64} onUpload={() => {}} onRemove={() => {}} />
      <Avatar size={80} onUpload={() => {}} onRemove={() => {}} />
    </div>
  ),
};
