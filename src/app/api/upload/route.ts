import { NextResponse } from "next/server";
import { getCurrentAdmin, MANAGER_ROLES } from "@/lib/auth";
import { saveImage, UploadError } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !(MANAGER_ROLES as readonly string[]).includes(admin.role)) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 6 * 1024 * 1024) {
    return NextResponse.json({ error: "Upload is too large." }, { status: 413 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file was provided." }, { status: 400 });
    }

    const result = await saveImage(file);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof UploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
