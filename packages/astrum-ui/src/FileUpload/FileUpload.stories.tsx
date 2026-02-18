import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUpload, FileItem } from "./FileUpload";

const meta = {
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["large", "compact"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    multiple: {
      control: "boolean",
    },
    accept: {
      control: "text",
    },
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    buttonText: {
      control: "text",
    },
  },
  args: {
    size: "large",
    label: "Выберите PDF-файлы",
    description: "Перетащите PDF-файлы сюда или выберите их, щелкнув мышью.",
    buttonText: "Выберите файлы",
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  maxWidth: 600,
};

function renderWithFileList(args: React.ComponentProps<typeof FileUpload>) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div style={containerStyle}>
      <FileUpload
        {...args}
        onChange={(fileList) => {
          if (fileList) {
            setFiles((prev) => [...prev, ...Array.from(fileList)]);
          }
        }}
      />
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {files.map((file, index) => (
            <FileItem
              key={`${file.name}-${index}`}
              name={file.name}
              size={file.size}
              file={file}
              onRemove={() => {
                setFiles((prev) => prev.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const Default: Story = {
  render: (args) => renderWithFileList(args),
};

export const LargeDisabled: Story = {
  args: {
    size: "large",
    disabled: true,
  },
  render: (args) => renderWithFileList(args),
};

export const Compact: Story = {
  args: {
    size: "compact",
  },
  render: (args) => renderWithFileList(args),
};

export const CompactDisabled: Story = {
  args: {
    size: "compact",
    disabled: true,
  },
  render: (args) => renderWithFileList(args),
};

export const FileItemExample: Story = {
  render: () => (
    <div style={containerStyle}>
      <FileItem
        name="Logo.png"
        size="20 KB"
        previewUrl="/avatar.png"
        onRemove={() => {}}
      />
      <FileItem
        name="Document.pdf"
        size={1024 * 150}
        onRemove={() => {}}
      />
      <FileItem
        name="Image.jpg"
        size="2.5 MB"
        onRemove={() => {}}
      />
    </div>
  ),
};
