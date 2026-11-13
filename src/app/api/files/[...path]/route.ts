import path from "node:path";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import { uploadsDirectory } from "@/lib/storage";

export const runtime = "nodejs";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const dir = uploadsDirectory();
  const resolved = path.resolve(dir, ...segments);

  // Prevent path traversal outside the uploads directory.
  if (resolved !== dir && !resolved.startsWith(dir + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const contentType = CONTENT_TYPES[path.extname(resolved).toLowerCase()];
  if (!contentType) return new NextResponse("Not found", { status: 404 });

  try {
    const data = await readFile(resolved);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
