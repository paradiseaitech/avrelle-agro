import "server-only";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export interface UploadResult {
  url: string;
}

export class UploadError extends Error {}

export function uploadsDirectory(): string {
  return process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : path.join(process.cwd(), ".data", "uploads");
}

function safeExtension(name: string, type: string): string {
  const fromType = ALLOWED_TYPES[type];
  if (fromType) return fromType;
  const ext = path.extname(name).replace(".", "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "avif"].includes(ext)) {
    return ext === "jpeg" ? "jpg" : ext;
  }
  throw new UploadError("Unsupported image format. Use JPG, PNG, WebP, or AVIF.");
}

function uniqueName(ext: string): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  return `${stamp}-${randomBytes(8).toString("hex")}.${ext}`;
}

async function uploadToSupabase(buffer: Buffer, filename: string, contentType: string): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? "product-images";

  if (!url || !key) {
    throw new UploadError(
      "Supabase Storage is selected but NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.",
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const { data: bucketInfo } = await supabase.storage.getBucket(bucket);
  if (!bucketInfo) {
    const { error: createError } = await supabase.storage.createBucket(bucket, { public: true });
    if (createError && !/already exists/i.test(createError.message)) {
      throw new UploadError(`Could not prepare storage bucket: ${createError.message}`);
    }
  }

  const objectPath = `products/${filename}`;
  const { error } = await supabase.storage
    .from(bucket)
    .upload(objectPath, buffer, { contentType, upsert: false, cacheControl: "31536000" });

  if (error) throw new UploadError(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl;
}

async function uploadLocally(buffer: Buffer, filename: string): Promise<string> {
  const dir = uploadsDirectory();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/api/files/${filename}`;
}

export async function saveImage(file: File): Promise<UploadResult> {
  if (!file || file.size === 0) throw new UploadError("No file was selected.");
  if (file.size > MAX_BYTES) throw new UploadError("Images must be 5 MB or smaller.");

  const ext = safeExtension(file.name, file.type);
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = uniqueName(ext);

  const provider = (process.env.IMAGE_STORAGE_PROVIDER ?? "local").toLowerCase();
  const url =
    provider === "supabase"
      ? await uploadToSupabase(buffer, filename, file.type || "image/jpeg")
      : await uploadLocally(buffer, filename);

  return { url };
}
