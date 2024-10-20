import { Hono } from "hono";
import { join } from "path";
import { readdir } from "fs/promises";
import type { AutoLoadRoute } from "./types/autoloader";

export const createAutoloader: (
  app: Hono,
  routesDir: string
) => Promise<void> = async (app, routesDir) => {
  try {
    const loadRoutes = async () => {
      const files = await readdir(join(routesDir));
      for (const file of files) {
        if (file.endsWith(".ts") || file.endsWith(".js")) {
          const fullPath = join(routesDir, file);

          console.log(`[Debug] Attempting to import: ${fullPath}`);

          try {
            const importedModule = await import(fullPath);
            const routeModule: AutoLoadRoute = importedModule.default;

            if (!routeModule || !routeModule.path || !routeModule.handler) {
              throw new Error(`Invalid route module in file: ${file}`);
            }

            app.route(routeModule.path, routeModule.handler);
            console.log(
              `[Info] Loaded route: ${routeModule.path} from ${file}`
            );
          } catch (importError) {
            console.error(
              `[Err] Failed to import or process ${file}:`,
              importError
            );
          }
        }
      }
    };
    console.log("[Info] Loading routes from: " + routesDir);
    await loadRoutes();
  } catch (error) {
    console.error("[Err] Error loading routes: ", error);
  }
};
