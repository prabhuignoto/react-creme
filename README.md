[![Lint Code Base](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml)
[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-creme/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-creme)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-creme)
[![CodeFactor](https://www.codefactor.io/repository/github/prabhuignoto/react-creme/badge)](https://www.codefactor.io/repository/github/prabhuignoto/react-creme)
[![dev status](https://img.shields.io/badge/status-alpha-green)](https://img.shields.io/badge/status-alpha-green)

<section>
  <img src="./readme-assets/backdrop.jpg" />
</section>

</br>

# react-creme

Modern UI Toolkit for React

> This is a Monorepo powered by Turbo Repo. Both the library and the documentation is housed in the mono repo

## Getting Started

Install the package using npm or yarn

```sh
yarn add react-creme

or

npm install react-creme

```

## Usage

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

## Browser Support

`react-creme` is a modern UI component library with support for all the latest browsers

<div style="display: flex; justify-content: space-between; width: 280px">
  <img src="./readme-assets/chrome.svg" alt="chrome" width=50 />
  <img src="./readme-assets/firefox.svg" alt="chrome" width=50 />
  <img src="./readme-assets/edge.svg" alt="chrome" width=50 />
  <img src="./readme-assets/safari.svg" alt="chrome" width=50 />
</div>

## Development

```sh
pnpm install
pnpm dev
```

## Build

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
cd ./documentation/expo_dist && npx serve .
```

To run the Unit tests

```sh
pnpm test
```

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=react-creme)
