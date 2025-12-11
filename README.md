<div align="center">
  <br/>
  <img src="./readme-assets/logo.jpg" />
  <br/>
  <br/>

![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/react-creme)
[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-creme/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-creme)
<!-- [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-creme) -->
<!-- [![CodeQL](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml) -->
[![dev status](https://img.shields.io/badge/status-beta-green)](https://img.shields.io/badge/status-beta-green)
[![GitHub license](https://img.shields.io/github/license/prabhuignoto/react-creme)](https://github.com/prabhuignoto/react-creme/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/react-creme)
</br>

</div>

</br>

Modern UI Toolkit for React

[Explore the Components](https://react-creme.vercel.app/)

<h2>Highlights</h2>

- 57 production-ready React components built with TypeScript 5.9 (strict).
- Accessible by default with ARIA-friendly patterns and keyboard support.
- CSS Modules, design tokens, and theming via `ThemeProvider`.
- Namespaced entry points for tree-shaking; fully typed API surface.
- Light dependency stack focused on React, TypeScript, and CSS Modules.
- React 19 ready; ships ESM and CJS plus type declarations.

<h2>Table of Contents</h2>

- [✨ Key Features](#-key-features)
- [📦 Packaging & Bundles](#-packaging--bundles)
- [🧰 Tooling & Quality](#-tooling--quality)
- [🚀 Getting Started](#-getting-started)
- [☕ Quick Usage](#-quick-usage)
- [🎨 Theming](#-theming)
- [🌍 Browser Support](#-browser-support)
- [🍫 Documentation](#-documentation)
- [🔨 Build & Test](#-build--test)
- [🤝 Contributing](#-contributing)

## ✨ Key Features

- Comprehensive component set: forms, navigation, overlays, data display, media, layout, disclosure, feedback, core primitives.
- Theming-first: design tokens, CSS variables, and `ThemeProvider` to keep brand control.
- Tree-shakeable namespaces to keep bundles lean; side effects minimized.
- Accessibility baked in: keyboard interactions and sensible ARIA defaults.
- Type-safe: emitted declarations for every entry point; IntelliSense-friendly.

## 📦 Packaging & Bundles

- Package name: `react-creme` (unscoped).
- Namespaced imports (recommended):
  - `react-creme/core`, `react-creme/forms`, `react-creme/feedback`, `react-creme/data-display`,
    `react-creme/navigation`, `react-creme/overlay`, `react-creme/layout`, `react-creme/disclosure`,
    `react-creme/media`.
- Measured bundles (latest build):
  - Full ESM bundle: ~119 KB gzipped.
  - CSS bundle: ~47 KB gzipped.
  - Examples (ESM): core ~36 KB, forms ~80 KB, data-display ~88 KB, navigation ~64 KB, overlay ~60 KB.
- Legacy root import `react-creme` remains for compatibility.

## 🧰 Tooling & Quality

- Build: Vite 6 and Bun build pipeline; Turborepo for orchestration.
- Linting: ESLint, Stylelint, Oxlint; format via Prettier.
- Tests: Vitest + Testing Library; coverage tracked with Codecov.
- Security and analysis: Snyk, SonarCloud, CodeQL, CodeFactor.
- Supported runtimes: Node >= 20.18.1, Bun >= 1.1.0.

## 🚀 Getting Started

Install with your preferred package manager:

```sh
npm install react-creme
yarn add react-creme
pnpm add react-creme
bun add react-creme
```

Import the bundled styles once (typically in your root entry point):
```ts
import 'react-creme/css';
```

Use namespaced entry points for tree-shaking:

- `react-creme/core` — buttons, ThemeProvider, utilities
- `react-creme/forms` — inputs, sliders, switches, file upload
- `react-creme/feedback` — notifications, loaders, progress
- `react-creme/data-display` — tables, tags, timelines
- `react-creme/navigation` — tabs, breadcrumbs, menus
- `react-creme/overlay` — dialogs, drawers, tooltips
- `react-creme/layout` — layout primitives
- `react-creme/disclosure` — accordion and collapsible surfaces
- `react-creme/media` — media helpers

Full bundle (ESM) is ~119 KB gzipped; CSS bundle is ~47 KB gzipped. The legacy root import `react-creme` remains available for compatibility.

## ☕ Quick Usage

```tsx
import { Button, ThemeProvider } from "react-creme/core";
import "react-creme/css";

function App() {
  return (
    <ThemeProvider>
      <Button>Welcome to react-creme</Button>
    </ThemeProvider>
  );
}

export default App;
```

## 🎨 Theming

Theme tokens are provided via `ThemeProvider` from `react-creme/core`. Define your palette, typography, and sizing once and components across namespaces inherit it. Example:

```tsx
import { ThemeProvider, Theme } from "react-creme/core";
import { Input } from "react-creme/forms";
import "react-creme/css";

const theme: Theme = {
  colors: { primary: "#0074B7" },
  fontSizes: { md: 16, sm: 14 },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Input placeholder="Search" />
    </ThemeProvider>
  );
}
```

## 🌍 Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Chrome                                                                                              | Firefox                                                                                                | Microsoft Edge                                                                              | Opera                                                                                            | Safari                                                                                              |

## 🍫 Documentation

Full docs, live examples, and API reference: [react-creme.vercel.app](https://react-creme.vercel.app)

## 🔨 Build & Test

- Build everything: `bun build`
- Build library only: `bun build:lib`
- Build docs: `bun build:doc` then `cd packages/documentation/expo_dist && bunx serve .`
- Tests: `bun test`

## 🤝 Contributing

Contributions, ideas and PR's are welcome!. Please read the [guidelines](/CONTRIBUTING.md) for more details.

1. [Fork it](https://github.com/prabhuignoto/react-creme/fork)
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=react-creme)
