import type { Coordinates } from "@/types/dto/coordinates";
import type { SoilMoistureLayer, SoilMoistureReading } from "@/types/dto/soil-reading";
import { TRPCError } from "@trpc/server";

const ENDPOINT = "https://api.open-meteo.com/v1/forecast";

type OpenMeteoResponse = {
  hourly: {
    time: string[];
    soil_moisture_0_to_7cm?: (number | null)[];
    soil_moisture_7_to_28cm?: (number | null)[];
    soil_moisture_28_to_100cm?: (number | null)[];
    soil_moisture_100_to_255cm?: (number | null)[];
    soil_temperature_0_to_7cm?: (number | null)[];
    soil_temperature_7_to_28cm?: (number | null)[];
  };
};

const DEPTHS = [
  {
    label: "0-7cm" as const,
    moistureKey: "soil_moisture_0_to_7cm" as const,
    temperatureKey: "soil_temperature_0_to_7cm" as const,
  },
  {
    label: "7-28cm" as const,
    moistureKey: "soil_moisture_7_to_28cm" as const,
    temperatureKey: "soil_temperature_7_to_28cm" as const,
  },
  {
    label: "28-100cm" as const,
    moistureKey: "soil_moisture_28_to_100cm" as const,
    temperatureKey: null,
  },
  {
    label: "100-255cm" as const,
    moistureKey: "soil_moisture_100_to_255cm" as const,
    temperatureKey: null,
  },
];

function latestIndex(times: string[]): number {
  const nowMs = Date.now();
  let best = -1;
  for (let i = 0; i < times.length; i++) {
    const ts = Date.parse(`${times[i]}:00Z`);
    if (Number.isNaN(ts)) continue;
    if (ts <= nowMs) best = i;
  }
  return best === -1 ? times.length - 1 : best;
}

export async function fetchSoilProfile(coords: Coordinates): Promise<SoilMoistureReading> {
  const params = new URLSearchParams({
    latitude: coords.lat.toString(),
    longitude: coords.lng.toString(),
    hourly: [
      "soil_moisture_0_to_7cm",
      "soil_moisture_7_to_28cm",
      "soil_moisture_28_to_100cm",
      "soil_moisture_100_to_255cm",
      "soil_temperature_0_to_7cm",
      "soil_temperature_7_to_28cm",
    ].join(","),
    timezone: "UTC",
    forecast_days: "1",
  });

  const res = await fetch(`${ENDPOINT}?${params.toString()}`);
  if (!res.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `Open-Meteo responded ${res.status}`,
    });
  }

  const body = (await res.json()) as OpenMeteoResponse;
  const times = body.hourly?.time ?? [];
  if (times.length === 0) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: "Open-Meteo returned no hourly data",
    });
  }

  const idx = latestIndex(times);
  const measuredAt = new Date(`${times[idx]}:00Z`).toISOString();

  const layers: SoilMoistureLayer[] = DEPTHS.flatMap(({ label, moistureKey, temperatureKey }) => {
    const moisture = body.hourly[moistureKey]?.[idx];
    if (moisture == null) return [];
    const temperature = temperatureKey ? (body.hourly[temperatureKey]?.[idx] ?? null) : null;
    return [{ depth: label, moisture, temperature, measuredAt }];
  });

  return {
    source: "open-meteo",
    fetchedAt: new Date().toISOString(),
    coordinates: coords,
    layers,
  };
}
