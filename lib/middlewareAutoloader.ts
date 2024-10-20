import { Hono } from "hono";
import { join } from "path";
import type { AutoLoadMiddleware } from "../types/autoloader";
import { readdir } from "fs/promises";

export const createAutoloaderMiddleware: (
  app: Hono,
  middlewareDir: string
) => Promise<void> = async (app, middlewareDir) => {
  try {
    const loadMiddleware = async () => {
      const files = await readdir(join(middlewareDir));
      for (const file of files) {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
          const fullPath = join(middlewareDir, file);

          console.log(`[Debug] Attempting to import: ${fullPath}`);

          try {
            const importedModule = await import(fullPath);
            const middlewareModule: AutoLoadMiddleware = importedModule.default;

            if (!middlewareModule || !middlewareModule.handler) {
              throw new Error(`Invalid middleware module in file: ${file}`);
            }

            if (middlewareModule.matcher && middlewareModule.matcher !== "*") {
              console.log(
                `[Info] Loaded middleware: ${middlewareModule.matcher} from ${file}`
              );
              app.use(middlewareModule.matcher, middlewareModule.handler);
            } else {
              console.log(`[Info] Loaded a global middleware from ${file}`);
              app.use(middlewareModule.handler);
            }
          } catch (importError) {
            console.error(
              `[Err] Failed to import or process ${file}:`,
              importError
            );
          }
        }
      }
    };
    console.log("[Info] Loading middlewares from: " + middlewareDir);
    await loadMiddleware();
  } catch (error) {
    console.error("[Err] Error loading middlewares: ", error);
  }
};
