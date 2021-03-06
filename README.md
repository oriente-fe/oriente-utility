# Oriente Utility

A collection of validation, normalization and business related helpers which can only be used in modern web development with transpiler.

This library is for internal use, it has **no babel** and **no terser**, therefore it will not compatible to all kinds of usage.

[Document](#)

## Usage

Install utilities

```
yarn add git+ssh://git@github.com:oriente-fe/oriente-utility
```

ES Module

```js
import { formatMobile } from 'oriente-utility'
```

CommonJS

```js
const { formatMobile } = require('oriente-utility')
```

## Contribute

Start development server

```
yarn dev
```

Follow the naming convention as below:

- `formatXXX`: parameter type and return type are the same
- `getXXX`: parameter type and return type are different
- `isXXX`: return type is boolean or string (e.g. validation)
- `XXX`: common helpers (e.g. string, array, ...etc)

Let's create a math utility:

1. Create `src/addOne.js` file
1. Write code with [jsdoc](https://yuri4ever.github.io/jsdoc/) and add default export

   ```js
   /**
    * Add one to the number
    *
    * @param {number} n - input number
    * @returns {number}
    */
   const addOne = n => {
     return Number(n) + 1
   }

   export default addOne
   ```
1. Update `index.js`

   ```js
   import addOne from './addOne'

   export default {
     addOne,
   }
   export {
     addOne,
   }
   ```
1. Add unit test

   ```js
   import addOne from '~/addOne'

   describe('addOne', () => {
     it('should work when input number', () => {
       expect(addOne(-1)).toBe(0)
     })
     it('should work when input string', () => {
       expect(addOne('0')).toBe(1)
     })
   })
   ```
1. Create PR

## Deploy

Publish new version

```
yarn version
```
