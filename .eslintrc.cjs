module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:storybook/recommended"
  ],
  ignorePatterns: ["dist", "build", "node_modules", "*.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  settings: { react: { version: "detect" } },
  overrides: [
    { files: ["**/*.tsx"], rules: { "react/prop-types": "off" } }
  ]
};
