import { UpstreamError } from "@/lib/http";
import { getForecast } from "@/lib/providers/open-meteo";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  const daysParam = searchParams.get("days");
  const days = daysParam ? Number(daysParam) : undefined;

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "VAL_001", message: "lat and lon are required numbers" },
      },
      { status: 400 },
    );
  }

  try {
    const data = await getForecast({ lat, lon, days });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof UpstreamError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPSTREAM_001",
            message: `Open-Meteo returned ${err.status}`,
          },
        },
        { status: 502 },
      );
    }
    console.error("[/api/weather]", err);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SRV_001", message: "Internal error" },
      },
      { status: 500 },
    );
  }
}
