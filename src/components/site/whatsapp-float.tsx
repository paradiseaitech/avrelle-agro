import { getSettings } from "@/lib/db-data";

export async function WhatsAppFloat() {
  const { business } = await getSettings();
  const number = business.whatsapp.replace(/\D/g, "");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=${encodeURIComponent(
        "Hello AVRELLE AGRO, I would like to know more about your makhana.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 inline-flex h-13 w-13 items-center justify-center rounded-full bg-forest-800 p-3.5 text-ivory-100 shadow-luxe-lg transition-transform hover:scale-105 hover:bg-forest-700"
      aria-label="Chat with AVRELLE AGRO on WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.53 3.76 1.45 5.32L2 22l4.98-1.6a9.8 9.8 0 0 0 5.06 1.4c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm0 17.86a8 8 0 0 1-4.34-1.28l-.32-.2-2.95.95.96-2.88-.2-.33a7.97 7.97 0 0 1-1.23-4.28c0-4.44 3.62-8.06 8.08-8.06s8.06 3.62 8.06 8.06-3.62 8.02-8.06 8.02Zm4.44-5.98c-.24-.12-1.44-.72-1.66-.8-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.96-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
