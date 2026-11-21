import { getSettings } from "@/lib/db-data";

export async function AnnouncementBar() {
  const { announcement } = await getSettings();
  if (!announcement.enabled || !announcement.text) return null;

  return (
    <div className="bg-charcoal-900 text-ivory-50 border-b border-charcoal-800">
      <div className="section-shell flex h-8 sm:h-9 items-center justify-center overflow-hidden">
        <p className="truncate text-center text-[10.5px] font-medium uppercase tracking-luxe text-ivory-50/90 sm:text-[11px]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400 mr-2 align-middle" />
          {announcement.text}
        </p>
      </div>
    </div>
  );
}
