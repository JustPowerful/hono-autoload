import type { Hono } from "hono";

export type AutoLoadRoute = {
  path: string;
  handler: Hono;
};
