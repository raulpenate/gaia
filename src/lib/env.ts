import { z } from "zod";

const schema = z.object({
  OPENWEATHER_AGRO_API_KEY: z.string().min(1).optional(),
  NASA_FIRMS_MAP_KEY: z.string().min(1).optional(),
});

let cached: z.infer<typeof schema> | null = null;

function load() {
  if (cached) return cached;
  cached = schema.parse({
    OPENWEATHER_AGRO_API_KEY: process.env.OPENWEATHER_AGRO_API_KEY,
    NASA_FIRMS_MAP_KEY: process.env.NASA_FIRMS_MAP_KEY,
  });
  return cached;
}

export const env = {
  get OPENWEATHER_AGRO_API_KEY() {
    return load().OPENWEATHER_AGRO_API_KEY;
  },
  get NASA_FIRMS_MAP_KEY() {
    return load().NASA_FIRMS_MAP_KEY;
  },
};

export function requireEnv<K extends keyof typeof env>(key: K): string {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}
