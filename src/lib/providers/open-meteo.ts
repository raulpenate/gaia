import { fetchJson } from "@/lib/http";

const FREE_BASE = "https://api.open-meteo.com/v1";
const COMMERCIAL_BASE = "https://customer-api.open-meteo.com/v1";

export type OpenMeteoForecast = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    et0_fao_evapotranspiration: number[];
  };
};

export type ForecastParams = {
  lat: number;
  lon: number;
  days?: number;
};

export async function getForecast({
  lat,
  lon,
  days = 7,
}: ForecastParams): Promise<OpenMeteoForecast> {
  const apiKey = process.env.OPEN_METEO_API_KEY;
  const base = apiKey ? COMMERCIAL_BASE : FREE_BASE;

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum,et0_fao_evapotranspiration",
    forecast_days: days.toString(),
    timezone: "auto",
  });
  if (apiKey) params.set("apikey", apiKey);

  return fetchJson<OpenMeteoForecast>(`${base}/forecast?${params}`, {
    provider: "open-meteo",
    revalidate: 600,
  });
}
