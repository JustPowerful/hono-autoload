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
import { createAutoloader } from "hono-autoload";
import { join } from "path";

const app = new Hono();

const autoloader = await createAutoloader(app, join(__dirname, "routes"));

// ... listen for your server here
```

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

## License

MIT

## Contributing

You can contribute to this project on [GitHub](https://github.com/honojs/hono-autoload).
