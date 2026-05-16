import { appRouter } from "./router";
import { createCallerFactory } from "./trpc";

export const createCaller = createCallerFactory(appRouter);
