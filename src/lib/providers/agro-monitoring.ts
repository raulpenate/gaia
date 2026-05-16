import { fetchJson } from "@/lib/http";

const BASE = "https://api.agromonitoring.com/agro/1.0";

export class MissingAgroKey extends Error {
  constructor() {
    super("AGRO_API_KEY is not set");
    this.name = "MissingAgroKey";
  }
}

function getKey(): string {
  const key = process.env.AGRO_API_KEY;
  if (!key) throw new MissingAgroKey();
  return key;
}

export type NdviStats = {
  dt: number;
  source: string;
  zoom: number;
  dc: number;
  cl: number;
  data: {
    std: number;
    p25: number;
    num: number;
    min: number;
    max: number;
    median: number;
    p75: number;
    mean: number;
  };
};

export type NdviHistoryParams = {
  polygonId: string;
  /** Unix seconds */
  start: number;
  /** Unix seconds */
  end: number;
};

export async function getNdviHistory({
  polygonId,
  start,
  end,
}: NdviHistoryParams): Promise<NdviStats[]> {
  const params = new URLSearchParams({
    polyid: polygonId,
    start: start.toString(),
    end: end.toString(),
    appid: getKey(),
  });

  return fetchJson<NdviStats[]>(`${BASE}/ndvi/history?${params}`, {
    provider: "agro-monitoring",
    revalidate: 3600,
  });
}

export type Polygon = {
  id: string;
  name: string;
  area: number;
  center: [number, number];
  geo_json: {
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: { type: "Polygon"; coordinates: number[][][] };
  };
};

export type CreatePolygonParams = {
  name: string;
  /** GeoJSON polygon ring; first and last point must match. */
  coordinates: number[][];
};

export async function createPolygon({ name, coordinates }: CreatePolygonParams): Promise<Polygon> {
  const res = await fetch(`${BASE}/polygons?appid=${getKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      geo_json: {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: [coordinates] },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`agro-monitoring create polygon ${res.status}: ${body}`);
  }
  return (await res.json()) as Polygon;
}
