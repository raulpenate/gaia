import { UpstreamError } from "@/lib/http";
import { MissingAgroKey, getNdviHistory } from "@/lib/providers/agro-monitoring";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const polygonId = searchParams.get("polygon_id");
  const start = Number(searchParams.get("start"));
  const end = Number(searchParams.get("end"));

  if (!polygonId || !Number.isFinite(start) || !Number.isFinite(end)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VAL_001",
          message: "polygon_id, start, end (unix seconds) are required",
        },
      },
      { status: 400 },
    );
  }

  try {
    const data = await getNdviHistory({ polygonId, start, end });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    if (err instanceof MissingAgroKey) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "CFG_001", message: "AGRO_API_KEY is not configured" },
        },
        { status: 500 },
      );
    }
    if (err instanceof UpstreamError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UPSTREAM_001",
            message: `AgroMonitoring returned ${err.status}`,
          },
        },
        { status: 502 },
      );
    }
    console.error("[/api/ndvi]", err);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SRV_001", message: "Internal error" },
      },
      { status: 500 },
    );
  }
}
