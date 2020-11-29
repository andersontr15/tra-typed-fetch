# tra-typed-fetch

## Table of Contents

- [About](#about)
- [Installing](#installing)
- [Usage](#installing)

## About <a name = "about"></a>

A package that implements common http requests using fetch, allowing for typed responses with TypeScript.

### Installing <a name = "installing"></a>

`npm install tra-typed-fetch`

`yarn add tra-typed-fetch`

### Usage <a name = "usage"></a>

```ts
import { createHttpClient, get } from 'tra-typed-fetch';

interface Product {
  name: string;
  id: number;
}
const response = await get<Product>({ url: '/products' });

// Where data will be the typed value bound to the function in the Response
const { data, headers, status } = response;

// Optional exported method to preset headers and baseUrl on each request
interface IRequestConfiguration {
  baseUrl?: string;
  defaultHeaders?: Request['headers'];
}

const client = createHttpClient({
  baseUrl: 'localhost:3000/api/v1/',
  defaultHeaders: new Headers({ 'content-type': 'application/json' }),
});
```
