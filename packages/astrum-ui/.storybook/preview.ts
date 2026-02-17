import type { Preview } from "@storybook/react-vite";
// @ts-ignore
import { create } from "storybook/theming";
import "../src/styles.css";

const docsTheme = create({
  base: "dark",
  appBg: "#1E1E1E",
  appContentBg: "#1E1E1E",
  appPreviewBg: "#1E1E1E",
  textColor: "#E0E0E0",
  barBg: "#2A2A2A",
  barTextColor: "#E0E0E0",
  barSelectedColor: "#5988FF",
  inputBg: "#2A2A2A",
  inputBorder: "#3A3A3A",
  inputTextColor: "#E0E0E0",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: "requiredFirst",
    },
    docs: {
      theme: docsTheme,
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#1E1E1E",
        },
      ],
    },
  },
};

export default preview;
