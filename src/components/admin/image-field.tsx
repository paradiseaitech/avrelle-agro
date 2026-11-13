"use client";

import { useRef, useState } from "react";

export function ImageField({
  name,
  initial = [],
}: {
  name: string;
  initial?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlDraft, setUrlDraft] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function upload(files: FileList) {
    setError(null);
    setBusy(true);
    try {
      for (const file of Array.from(files)) {
        if (urls.length >= 6) {
          setError("Up to 6 images per product.");
          break;
        }
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          setError(data.error ?? "Upload failed.");
          break;
        }
        setUrls((prev) => [...prev, data.url as string]);
      }
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function addUrl() {
    const v = urlDraft.trim();
    if (!v) return;
    if (urls.length >= 6) {
      setError("Up to 6 images per product.");
      return;
    }
    setUrls((prev) => [...prev, v]);
    setUrlDraft("");
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          disabled={busy}
          onChange={(e) => {
            if (e.target.files?.length) void upload(e.target.files);
          }}
          className="block text-[12.5px] text-ink-600 file:mr-3 file:border file:border-beige-300 file:bg-ivory-100 file:px-3 file:py-1.5 file:text-[11.5px] file:font-semibold file:uppercase file:tracking-wider file:text-forest-800 hover:file:border-forest-600"
        />
        {busy && <span className="text-[12px] text-ink-500">Uploading…</span>}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          type="url"
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          placeholder="…or paste an image URL"
          className="field"
        />
        <button type="button" onClick={addUrl} className="btn-outline btn-sm shrink-0">
          Add URL
        </button>
      </div>

      {error && <p role="alert" className="mt-2 text-[12px] text-danger-600">{error}</p>}

      {urls.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {urls.map((url, i) => (
            <li key={`${url}-${i}`} className="border border-beige-200 bg-ivory-50 p-2">
              <img src={url} alt="" className="mx-auto h-24 w-full object-contain" />
              <div className="mt-2 flex items-center justify-between gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  {i === 0 ? "Primary" : `Image ${i + 1}`}
                </span>
                <span className="flex gap-2">
                  {i > 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setUrls((prev) => [prev[i], ...prev.filter((_, idx) => idx !== i)])
                      }
                      className="text-[10.5px] font-medium text-forest-700 hover:text-gold-700"
                    >
                      Make primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
                    className="text-[10.5px] font-medium text-danger-600 hover:underline"
                  >
                    Remove
                  </button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-2 text-[11.5px] text-ink-500">
        JPG, PNG, WebP or AVIF · max 5 MB each. The first image is used on cards and listings.
      </p>
    </div>
  );
}
