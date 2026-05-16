import { fetchJson } from "@/lib/http";

const BASE = "https://power.larc.nasa.gov/api/temporal/daily/point";

// AG-community parameters most relevant to soil health.
const DEFAULT_PARAMETERS = [
  "T2M", // mean air temperature (°C)
  "T2M_MAX",
  "T2M_MIN",
  "PRECTOTCORR", // bias-corrected precipitation (mm/day)
  "ALLSKY_SFC_SW_DWN", // solar radiation (MJ/m²/day)
  "RH2M", // relative humidity (%)
  "EVPTRNS", // evapotranspiration (mm/day)
] as const;

export type PowerDailyResponse = {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number, number] };
  properties: {
    parameter: Record<string, Record<string, number>>;
  };
  header: {
    title: string;
    api: { version: string; name: string };
    start: string;
    end: string;
  };
};

export type PowerDailyParams = {
  lat: number;
  lon: number;
  /** YYYYMMDD */
  start: string;
  /** YYYYMMDD */
  end: string;
  parameters?: readonly string[];
};

export async function getDailyPoint({
  lat,
  lon,
  start,
  end,
  parameters = DEFAULT_PARAMETERS,
}: PowerDailyParams): Promise<PowerDailyResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    start,
    end,
    parameters: parameters.join(","),
    community: "AG",
    format: "JSON",
  });

  return fetchJson<PowerDailyResponse>(`${BASE}?${params}`, {
    provider: "nasa-power",
    revalidate: 86_400,
  });
}
