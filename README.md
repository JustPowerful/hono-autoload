# hono-autoload

An auto-loader for hono to simplify the routing process, and to void boilerplate code.

## Installation

for npm:

```bash
npm i hono-autoload
```

for bun:

```bash
bun i hono-autoload
```

## Usage

```ts
// index.ts
import { Hono } from "hono";
import { createAutoloader, createAutoloaderMiddleware } from "hono-autoload";
import { join } from "path";

const app = new Hono();

async function runLoader() {
  // NOTE: put your middleware loader before the route loader
  await createAutoloaderMiddleware(app, join(__dirname, "middleware"));
  await createAutoloader(app, join(__dirname, "routes"));
}

runLoader().then(() => {
  console.log("Loaded all routes and middleware");
});

// ... listen for your server here
```

## Creating a route module

create a `routes` directory inside your project and put your route modules in there.
A route module should export a `path` and `handler` property like this:

```ts
import type { AutoLoadRoute } from "hono-autoload/types/autoloader";
const routeModule: AutoLoadRoute = {
  path: "/api",
  handler: app,
};
export default routeModule; // don't forget to export default the route module
```

## Creating a middleware module

create a `middleware` directory inside your project and put your middleware modules in there.
A middleware module should export a `handler` and `matcher` property like this:

```ts
import type { AutoLoadMiddleware } from "hono-autoload/types/autoloader";
const middlewareModule: AutoLoadMiddleware = {
  handler: app,
  matcher: "/api", // NOTE: not defining a matcher means the middleware works on all routes
};
export default middlewareModule; // don't forget to export default the middleware module
```

## License

MIT

## Contributing

You can contribute to this project on [GitHub](https://github.com/honojs/hono-autoload).
Contact me if you have any questions or suggestions.
E-mail: ahmedaminedoudech@gmail.com
