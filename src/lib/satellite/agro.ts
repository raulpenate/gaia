import { env } from "@/lib/env";
import type { Coordinates } from "@/types/dto/coordinates";
import type { VegetationReading } from "@/types/dto/soil-reading";
import { TRPCError } from "@trpc/server";

const BASE = "https://api.agromonitoring.com/agro/1.0";

const polygonCache = new Map<string, string>();

function polygonKey(coords: Coordinates): string {
  return `${coords.lat.toFixed(3)},${coords.lng.toFixed(3)}`;
}

function squareAround({ lat, lng }: Coordinates) {
  const halfDeg = 0.005; // ~550 m at the equator; small enough to be a single field
  const west = lng - halfDeg;
  const east = lng + halfDeg;
  const south = lat - halfDeg;
  const north = lat + halfDeg;
  return [
    [west, south],
    [east, south],
    [east, north],
    [west, north],
    [west, south],
  ];
}

async function ensurePolygon(apiKey: string, coords: Coordinates): Promise<string> {
  const key = polygonKey(coords);
  const cached = polygonCache.get(key);
  if (cached) return cached;

  const res = await fetch(`${BASE}/polygons?appid=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `gaia-${key}`,
      geo_json: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [squareAround(coords)],
        },
      },
    }),
  });

  if (!res.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `Agro polygon create failed (${res.status})`,
    });
  }

  const body = (await res.json()) as { id: string };
  polygonCache.set(key, body.id);
  return body.id;
}

type AgroNdviEntry = {
  dt: number;
  data: { mean: number; min: number; max: number };
};

export async function fetchVegetation(coords: Coordinates): Promise<VegetationReading> {
  const apiKey = env.OPENWEATHER_AGRO_API_KEY;
  if (!apiKey) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "OPENWEATHER_AGRO_API_KEY is not set",
    });
  }

  const polyId = await ensurePolygon(apiKey, coords);
  const end = Math.floor(Date.now() / 1000);
  const start = end - 60 * 60 * 24 * 7; // last 7 days

  const url = `${BASE}/ndvi/history?polyid=${polyId}&start=${start}&end=${end}&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `Agro NDVI history failed (${res.status})`,
    });
  }

  const entries = (await res.json()) as AgroNdviEntry[];
  const latest = entries.length > 0 ? entries[entries.length - 1] : null;

  return {
    source: "openweather-agro",
    fetchedAt: new Date().toISOString(),
    coordinates: coords,
    ndvi: latest
      ? {
          mean: latest.data.mean,
          min: latest.data.min,
          max: latest.data.max,
          measuredAt: new Date(latest.dt * 1000).toISOString(),
        }
      : null,
  };
}
