import "server-only";
import { and, count, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

/** Lightweight counters for the sidebar navigation badges. */
export async function getNavBadges(): Promise<Record<string, number>> {
  const [openOrders, newEnquiries, newMessages] = await Promise.all([
    db
      .select({ n: count() })
      .from(schema.orders)
      .where(inArray(schema.orders.fulfilmentStatus, ["pending", "confirmed", "packed"])),
    db
      .select({ n: count() })
      .from(schema.bulkEnquiries)
      .where(eq(schema.bulkEnquiries.status, "new")),
    db
      .select({ n: count() })
      .from(schema.contactMessages)
      .where(eq(schema.contactMessages.status, "new")),
  ]);

  return {
    "/admin/orders": Number(openOrders[0]?.n ?? 0) || 0,
    "/admin/enquiries": Number(newEnquiries[0]?.n ?? 0) || 0,
    "/admin/messages": Number(newMessages[0]?.n ?? 0) || 0,
  };
}

void and;
