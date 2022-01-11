[![Lint Code Base](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml)
[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-creme/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-creme)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=react-creme&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=react-creme)
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-orange.svg)](https://sonarcloud.io/summary/new_code?id=react-creme)

<section>
  <img src="backdrop.jpg" />
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
