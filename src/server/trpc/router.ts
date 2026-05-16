import { soilRouter } from "./routers/soil";
import { router } from "./trpc";

export const appRouter = router({
  soil: soilRouter,
});

export type AppRouter = typeof appRouter;
