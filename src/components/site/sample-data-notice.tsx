import { getSettings } from "@/lib/db-data";

/**
 * Slim, honest notice shown while the catalogue runs on clearly-flagged
 * sample prices. Administrators can switch this off in Admin → Settings
 * once verified retail prices are entered.
 */
export async function SampleDataNotice() {
  const { homeContent } = await getSettings();
  if (!homeContent.showSampleNotice) return null;

  return (
    <div className="border-b border-warning-700/20 bg-warning-100">
      <p className="section-shell py-2 text-center text-[11.5px] font-medium leading-relaxed text-warning-700">
        Preview catalogue — product prices and stock shown are sample data pending final retail
        pricing. Wholesale rates are quoted separately on enquiry.
      </p>
    </div>
  );
}
