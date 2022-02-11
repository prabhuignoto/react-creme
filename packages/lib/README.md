<div align="center">
  <img src="./readme-assets/logo.jpg" />

[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-creme/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-creme)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-creme)
[![CodeFactor](https://www.codefactor.io/repository/github/prabhuignoto/react-creme/badge)](https://www.codefactor.io/repository/github/prabhuignoto/react-creme)
[![CodeQL](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/codeql-analysis.yml)
[![dev status](https://img.shields.io/badge/status-alpha-green)](https://img.shields.io/badge/status-alpha-green)

</div>

</br>

# react-creme

Modern UI Toolkit for React

<h2>Features</h2>

- 💎 High quality react components.
- 💪 Robust components written in Typescript.
- ♿ Fully Accessible UI Components.

- 🏳️‍🌈 30+ UI Elements.

- 🛠️ Customizable components.

- 📱 Complete Touch support.

- 🎨 Themeable components.

- ⚙️ Minimal Third party dependencies.

<h2>Table of Contents</h2>

- [react-creme](#react-creme)
  - [🚀 Getting Started](#-getting-started)
  - [☕ Usage](#-usage)
  - [🌍 Browser Support](#-browser-support)
  - [🍫 Examples & Documentation](#-examples--documentation)
  - [🔨 Build](#-build)
  - [🤝Contributing](#contributing)

## 🚀 Getting Started

Install the package using npm or yarn

```sh
yarn add react-creme

or

npm install react-creme

```

## ☕ Usage

```sh
  import React from "react";
  import { Button } from "react-creme";

  const App = () => {
    return (
      <div>
        <Button>Click Me</Button>
      </div>
    );
  };

  export default App;
```

## 🌍 Browser Support

`react-creme` is a modern UI component library with support for all the latest browsers.

<div style="display: flex; justify-content: space-between; width: 280px">
  <img src="./readme-assets/chrome.svg" alt="chrome" width=50 />
  <img src="./readme-assets/firefox.svg" alt="chrome" width=50 />
  <img src="./readme-assets/edge.svg" alt="chrome" width=50 />
  <img src="./readme-assets/safari.svg" alt="chrome" width=50 />
</div>

## 🍫 Examples & Documentation

For more thorough examples and the API details visit the [main site](https://react-creme.vercel.app)

## 🔨 Build

To build everything

```sh
pnpm build
```

To build the library

```sh
pnpm build: lib
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
