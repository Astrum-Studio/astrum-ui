// @ts-ignore
import { addons } from "storybook/manager-api";
// @ts-ignore
import { create } from "storybook/theming";

const theme = create({
  base: "dark",
  brandTitle: "Astrum UI",
  brandUrl: "https://github.com/Astrum-Studio/astrum-ui",
  brandImage: "logo.svg",
  brandTarget: "_self",

  colorPrimary: "#5988FF",
  colorSecondary: "#2653F2",

  appBg: "#1E1E1E",
  appContentBg: "#1E1E1E",
  appPreviewBg: "#1E1E1E",
  appBorderColor: "#3A3A3A",
  appBorderRadius: 4,

  textColor: "#E0E0E0",
  textInverseColor: "#1E1E1E",
  textMutedColor: "#ABABAB",

  barTextColor: "#E0E0E0",
  barSelectedColor: "#5988FF",
  barHoverColor: "#2653F2",
  barBg: "#2A2A2A",

  inputBg: "#2A2A2A",
  inputBorder: "#3A3A3A",
  inputTextColor: "#E0E0E0",
  inputBorderRadius: 4,

  fontBase: '"Involve", sans-serif',
  fontCode: '"Fira Code", "Consolas", "Monaco", monospace',
});

addons.setConfig({
  theme,
  favicon: "favicon.svg",
});
