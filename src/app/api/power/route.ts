import { UpstreamError } from "@/lib/http";
import { getDailyPoint } from "@/lib/providers/nasa-power";
import { NextResponse } from "next/server";

const DATE_RE = /^\d{8}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));
  const start = searchParams.get("start") ?? "";
  const end = searchParams.get("end") ?? "";

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    !DATE_RE.test(start) ||
    !DATE_RE.test(end)
  ) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VAL_001",
          message: "lat, lon (numbers) and start, end (YYYYMMDD) are required",
        },
      },
      { status: 400 },
    );
  }

  try {
    const data = await getDailyPoint({ lat, lon, start, end });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof UpstreamError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPSTREAM_001",
            message: `NASA POWER returned ${err.status}`,
          },
        },
        { status: 502 },
      );
    }
    console.error("[/api/power]", err);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SRV_001", message: "Internal error" },
      },
      { status: 500 },
    );
  }
}
