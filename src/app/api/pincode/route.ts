import { NextResponse } from "next/server";
import { checkPincode } from "@/lib/db-data";
import { createRateLimiter } from "@/lib/site";

const limit = createRateLimiter(60, 60_000);

export async function GET(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!limit(`pincode:${ip}`)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const pincode = new URL(request.url).searchParams.get("pincode") ?? "";
  const result = await checkPincode(pincode.trim());
  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
