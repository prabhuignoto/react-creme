[![Snyk](https://github.com/prabhuignoto/react-creme/actions/workflows/snyk.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/snyk.yml)
[![Lint Code Base](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml/badge.svg)](https://github.com/prabhuignoto/react-creme/actions/workflows/linter.yml)
[![codecov](https://codecov.io/gh/prabhuignoto/react-creme/branch/master/graph/badge.svg?token=JEL70TGE8Q)](https://codecov.io/gh/prabhuignoto/react-creme)


# React-Creme

Extensive UI Toolkit built for React

## Getting Started

Install the package using npm or yarn

```sh
yarn add react-creme

or

npm install react-creme

```

## Local Development

```sh
yarn install
yarn run dev
```

## Linting Javascript and CSS

Linting Typescript

```sh
  yarn run eslint
```

Linting SCSS

```sh
  yarn run lint:css
```

Linting everything

```sh
  yarn run lint:all
```


## Prettier

Check for issues

```sh
  yarn run prettier:check
```

Format

```sh
  yarn run format
```


## Building and running the documentation

```sh
yarn build:doc

cd ./expo_dist
npx serve .

```

## Building and packaging the library

```sh
yarn build:lib
```