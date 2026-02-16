## Astrum UI

![node](https://img.shields.io/badge/node-18+-026e00?logo=node.js) ![react](https://img.shields.io/badge/react-18+-61dafb?logo=react) ![typescript](https://img.shields.io/badge/typescript-5.3+-3178c6?logo=typescript) ![license](https://img.shields.io/badge/license-MIT-606770)

### Overview
A modern React component library for building user interfaces. Provides a comprehensive set of accessible, customizable UI components including buttons, forms, navigation items, file uploads, and more. Built with TypeScript, compiled with tsup, and documented with Storybook for efficient development and easy integration.

### Table of Contents
- [Features](#features)
- [Components](#components)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Development](#development)

### Features
- **TypeScript-first**: Full TypeScript support with type definitions
- **Tree-shakeable**: ESM and CJS builds with tree-shaking support
- **Zero dependencies**: Only React and React DOM as peer dependencies
- **Storybook documentation**: Interactive component playground and documentation
- **CSS Modules**: Scoped styles with CSS custom properties
- **Accessible**: ARIA attributes and keyboard navigation support
- **Customizable**: CSS variables for easy theming

### Components
- **Button** - Multiple variants (primary, outlined, dashed, grey, white, ghost) with sizes and icon support
- **Input** - Text input with label, error states, character count, and suffix icons
- **Select** - Custom dropdown select with search and keyboard navigation
- **Checkbox** - Checkbox with indeterminate state and custom styling
- **Radio** - Radio button group with controlled and uncontrolled modes
- **Toggler** - Toggle switch component
- **Chips** - Tag/chip component with removable option
- **ListItem** - List item with avatar, title, subtitle, and chevron
- **MenuItem** - Menu item with icon, text, and end icon support
- **FileUpload** - Drag and drop file upload with large and compact variants
- **ColorPicker** - Color swatch picker component

### Tech Stack
- **Build**: `tsup` for fast TypeScript bundling (ESM + CJS)
- **Documentation**: `Storybook 10` with React and Vite
- **Language**: `TypeScript 5.3+`
- **Styling**: CSS with custom properties (CSS variables)
- **Code Quality**: ESLint, Prettier
- **Package Manager**: Yarn workspaces (monorepo)

### Requirements
- Node.js: 18+ (LTS recommended)
- npm: 9+ or yarn: 1.22+
- React: >=17.0.0 (peer dependency)
- React DOM: >=17.0.0 (peer dependency)

### Quick Start

#### For Development
```bash
# Clone the repository
git clone <repo>
cd astrum-ui

# Install dependencies
yarn install
# or
npm install

# Start Storybook dev server
cd packages/astrum-ui
yarn storybook
# or
npm run storybook

# Open http://localhost:6006
```

#### For Production Build
```bash
# Build the library
cd packages/astrum-ui
yarn build
# or
npm run build

# Output will be in ./dist directory
```

### Installation

```bash
npm install astrum-ui
# or
yarn add astrum-ui
```

### Usage

```tsx
import { Button, Input, Select } from "astrum-ui";
import "astrum-ui/dist/styles.css";

function App() {
  return (
    <div>
      <Button variant="primary" size="m">
        Click me
      </Button>
      
      <Input
        label="Email"
        placeholder="Enter your email"
        error="This field is required"
      />
      
      <Select
        label="Choose option"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]}
      />
    </div>
  );
}
```

### Scripts

#### Root (Monorepo)
```bash
# Build all packages
npm run build

# Clean all build artifacts
npm run clean

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

#### Package (packages/astrum-ui)
```bash
# Build library to ./dist
npm run build

# Clean dist directory
npm run clean

# Start Storybook dev server
npm run storybook

# Build Storybook for production
npm run storybook:build
```

### Project Structure
```text
packages/
  astrum-ui/
    src/
      Button/          # Button component (TSX, CSS, stories)
      Input/           # Input component
      Select/          # Select component
      Checkbox/        # Checkbox component
      Radio/           # Radio component
      Toggler/         # Toggle switch component
      Chips/           # Chips component
      ListItem/        # List item component
      MenuItem/        # Menu item component
      FileUpload/      # File upload component
      ColorPicker/     # Color picker component
      index.ts         # Main export file
      styles.css       # Global styles imports
    dist/              # Build output (CJS + ESM + types)
    .storybook/        # Storybook configuration
    storybook-static/  # Built Storybook documentation
    tsup.config.ts     # Build configuration
    tsconfig.json      # TypeScript configuration
```

### Development

#### Adding a New Component
1. Create component directory in `packages/astrum-ui/src/`
2. Add component files: `ComponentName.tsx`, `ComponentName.css`, `ComponentName.stories.tsx`, `index.ts`
3. Export from `packages/astrum-ui/src/index.ts`
4. Import CSS in `packages/astrum-ui/src/styles.css`
5. Add Storybook story for documentation

#### Component Structure
Each component follows this structure:
- `ComponentName.tsx` - Component implementation with TypeScript
- `ComponentName.css` - Component styles with CSS variables
- `ComponentName.stories.tsx` - Storybook stories
- `index.ts` - Component exports

#### Styling Guidelines
- Use CSS custom properties (variables) for colors and spacing
- Follow BEM-like naming: `.astrum-component`, `.astrum-component__element`, `.astrum-component--modifier`
- Support size variants: `s`, `m`, `l` where applicable
- Include focus-visible styles for accessibility

#### TypeScript
- Export component props as `ComponentNameProps`
- Use `React.forwardRef` for ref support
- Include proper TypeScript types for all props