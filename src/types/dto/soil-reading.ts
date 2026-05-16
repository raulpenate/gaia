import { z } from "zod";
import { Coordinates } from "./coordinates";

export const SoilMoistureLayer = z.object({
  depth: z.enum(["0-7cm", "7-28cm", "28-100cm", "100-255cm"]),
  moisture: z.number(),
  temperature: z.number().nullable(),
  measuredAt: z.string().datetime(),
});
export type SoilMoistureLayer = z.infer<typeof SoilMoistureLayer>;

export const SoilMoistureReading = z.object({
  source: z.literal("open-meteo"),
  fetchedAt: z.string().datetime(),
  coordinates: Coordinates,
  layers: z.array(SoilMoistureLayer),
});
export type SoilMoistureReading = z.infer<typeof SoilMoistureReading>;

export const VegetationReading = z.object({
  source: z.literal("openweather-agro"),
  fetchedAt: z.string().datetime(),
  coordinates: Coordinates,
  ndvi: z
    .object({
      mean: z.number(),
      min: z.number(),
      max: z.number(),
      measuredAt: z.string().datetime(),
    })
    .nullable(),
});
export type VegetationReading = z.infer<typeof VegetationReading>;

export const FireDetection = z.object({
  lat: z.number(),
  lng: z.number(),
  brightness: z.number(),
  confidence: z.string(),
  acquiredAt: z.string().datetime(),
});
export type FireDetection = z.infer<typeof FireDetection>;

export const FireReading = z.object({
  source: z.literal("nasa-firms"),
  fetchedAt: z.string().datetime(),
  coordinates: Coordinates,
  detections: z.array(FireDetection),
});
export type FireReading = z.infer<typeof FireReading>;
