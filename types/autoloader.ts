import type { Hono, MiddlewareHandler } from "hono";

export type AutoLoadRoute = {
  path: string;
  handler: Hono;
};
export type AutoLoadMiddleware = {
  matcher?: string; // if not set, all routes will be matched
  handler: MiddlewareHandler;
};
