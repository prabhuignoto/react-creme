<div align="center">
  <br/>
  <img src="../../readme-assets/logo.jpg" />
  <br/>
  <br/>

![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/react-creme)
[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-creme/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-creme)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-creme)
[![CodeFactor](https://www.codefactor.io/repository/github/prabhuignoto/react-creme/badge)](https://www.codefactor.io/repository/github/prabhuignoto/react-creme)
[![CodeQL](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml)
[![dev status](https://img.shields.io/badge/status-alpha-green)](https://img.shields.io/badge/status-alpha-green)
[![GitHub license](https://img.shields.io/github/license/prabhuignoto/react-creme)](https://github.com/prabhuignoto/react-creme/blob/master/LICENSE)
![npm](https://img.shields.io/npm/v/react-creme)
</br>

</div>

</br>

Modern UI Toolkit for React

[Explore the Components](https://react-creme.vercel.app/)

<h2>Features</h2>

- 💎 High Quality React components.

- 💪 Robust components written in Typescript.

- ♿ Accessible UI Components.

- 🌈 57 UI Components.

- 🛠️ Customizable components.

- 🎨 Themeable components.

- ⚙️ Minimal Third party dependencies.

- 🪶 At ~115kb minified and gzipped, `react-creme` is a lightweight component library.

<h2>Table of Contents</h2>

- [🚀 Getting Started](#-getting-started)
- [☕ Usage](#-usage)
- [🌍 Browser Support](#-browser-support)
- [🍫 Examples & Documentation](#-examples--documentation)
- [🔨 Build](#-build)
- [🤝Contributing](#contributing)

## 🚀 Getting Started

### Install
Use your preferred package manager:

```sh
npm install react-creme
yarn add react-creme
pnpm add react-creme
bun add react-creme
```

### Import styles
```ts
import 'react-creme/css';
```

### Namespaced entry points (recommended)
Use namespaced imports for better tree-shaking:
- `react-creme/core` — buttons, ThemeProvider, utilities
- `react-creme/forms` — inputs, sliders, switches, file upload
- `react-creme/feedback` — notifications, loaders, progress
- `react-creme/data-display` — tables, tags, timelines
- `react-creme/navigation` — tabs, breadcrumbs, menus
- `react-creme/overlay` — dialogs, drawers, tooltips
- `react-creme/layout` — layout primitives
- `react-creme/disclosure` — accordion and collapsible surfaces
- `react-creme/media` — media helpers

The legacy root import `react-creme` remains available for compatibility.

## ☕ Usage

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

## 🌍 Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Chrome                                                                                              | Firefox                                                                                                | Microsoft Edge                                                                              | Opera                                                                                            | Safari                                                                                              |

## 🍫 Examples & Documentation

For more thorough examples and the API details visit the [main site](https://react-creme.vercel.app)

## 🔨 Build

To build everything

```sh
pnpm build
```

To build the library

```sh
pnpm build:lib
```

To build and run the documentation

```sh
pnpm build:doc
cd ./packages/documentation/expo_dist && npx serve .
```

To run the Unit tests

```sh
pnpm test
```

## 🤝Contributing

Contributions, ideas and PR's are welcome!. Please read the [guidelines](/CONTRIBUTING.md) for more details.

1. [Fork it](https://github.com/prabhuignoto/react-creme/fork)
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=react-creme)
