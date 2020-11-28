# tra-typed-fetch

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

A package that implements common http requests using fetch, allowing for typed responses with typescript.

## Getting Started <a name = "getting_started"></a>

To work with this package, you'll need at the bare minimum to create a no_results.csv file and an output.csv file. You will then either need an input.csv file or to pass an option of inputFormat as a string with inputData formatted as seen below. The default option is file.

### Installing

`npm install tra-typed-fetch`

`yarn add tra-typed-fetch`

```ts
import { get } from 'tra-typed-fetch';

interface Product {
  name: string;
  id: number;
}
const response = await get<Product>('/products');

// Where data will be the typed value bound to the function in the Response
const { data, headers, status } = response;
```
