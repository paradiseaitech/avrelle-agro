import { getSettings } from "@/lib/db-data";

export async function AnnouncementBar() {
  const { announcement } = await getSettings();
  if (!announcement.enabled || !announcement.text) return null;

  return (
    <div className="bg-forest-900 text-ivory-100">
      <div className="section-shell flex h-9 items-center justify-center overflow-hidden">
        <p className="truncate text-center text-[10.5px] font-medium uppercase tracking-luxe text-ivory-100/90 sm:text-[11px]">
          {announcement.text}
        </p>
      </div>
    </div>
  );
}
