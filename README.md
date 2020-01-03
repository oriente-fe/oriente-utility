# Oriente Utility

A collection of validation, normalization and EC helpers.

[Document](#)

## Usage

Install utilities

```
yarn add git+ssh://git@github.com:oriente-fe/oriente-utility
```

## Contribute

Let's create a math utility for demo.

1. Create file under `src` folder: `src/math.js`
1. Add named export and default export

   ```js
   // named export
   export const addOne = n => n + 1

   // default export
   export default {
     addOne
   }
   ```
1. Update `index.js`

   ```js
   ...
   export { default as math } from './math'
   ```
1. Create pull-request

## Deploy

Publish new version

```
yarn version
```
