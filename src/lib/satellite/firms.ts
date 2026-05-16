import { env } from "@/lib/env";
import type { Coordinates } from "@/types/dto/coordinates";
import type { FireDetection, FireReading } from "@/types/dto/soil-reading";
import { TRPCError } from "@trpc/server";

const BASE = "https://firms.modaps.eosdis.nasa.gov/api/area/csv";
const SOURCE = "VIIRS_SNPP_NRT";
const DAY_RANGE = 1;
const HALF_BBOX_DEG = 0.25; // ~27 km north-south, slightly less east-west near the equator

function bbox({ lat, lng }: Coordinates): string {
  const west = lng - HALF_BBOX_DEG;
  const east = lng + HALF_BBOX_DEG;
  const south = lat - HALF_BBOX_DEG;
  const north = lat + HALF_BBOX_DEG;
  return `${west},${south},${east},${north}`;
}

function parseAcquiredAt(date: string, time: string): string {
  // FIRMS gives acq_date=YYYY-MM-DD and acq_time=HHMM (UTC, no separator).
  const padded = time.padStart(4, "0");
  return new Date(`${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`).toISOString();
}

function parseCsv(csv: string): FireDetection[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const header = lines[0].split(",");
  const idx = {
    lat: header.indexOf("latitude"),
    lng: header.indexOf("longitude"),
    brightness: header.indexOf("bright_ti4"),
    confidence: header.indexOf("confidence"),
    date: header.indexOf("acq_date"),
    time: header.indexOf("acq_time"),
  };

  return lines.slice(1).flatMap((line) => {
    const cols = line.split(",");
    const lat = Number(cols[idx.lat]);
    const lng = Number(cols[idx.lng]);
    const brightness = Number(cols[idx.brightness]);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return [];
    return [
      {
        lat,
        lng,
        brightness: Number.isNaN(brightness) ? 0 : brightness,
        confidence: cols[idx.confidence] ?? "",
        acquiredAt: parseAcquiredAt(cols[idx.date], cols[idx.time]),
      },
    ];
  });
}

export async function fetchFires(coords: Coordinates): Promise<FireReading> {
  const mapKey = env.NASA_FIRMS_MAP_KEY;
  if (!mapKey) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "NASA_FIRMS_MAP_KEY is not set",
    });
  }

  const url = `${BASE}/${mapKey}/${SOURCE}/${bbox(coords)}/${DAY_RANGE}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new TRPCError({
      code: "BAD_GATEWAY",
      message: `NASA FIRMS responded ${res.status}`,
    });
  }

  const csv = await res.text();
  return {
    source: "nasa-firms",
    fetchedAt: new Date().toISOString(),
    coordinates: coords,
    detections: parseCsv(csv),
  };
}
