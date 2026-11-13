import "server-only";
import { and, desc, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

export async function getCustomerOrders(customerId: string) {
  const orders = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.customerId, customerId))
    .orderBy(desc(schema.orders.createdAt));

  if (!orders.length) return [];

  const orderIds = orders.map((o) => o.id);
  const items = await db
    .select()
    .from(schema.orderItems)
    .where(inArray(schema.orderItems.orderId, orderIds));

  const itemsByOrder = new Map<string, typeof items>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) || [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  return orders.map((order) => ({
    ...order,
    items: itemsByOrder.get(order.id) || [],
  }));
}

export async function getCustomerOrder(reference: string, customerId: string) {
  const [order] = await db
    .select()
    .from(schema.orders)
    .where(
      and(
        eq(schema.orders.reference, reference),
        eq(schema.orders.customerId, customerId),
      ),
    )
    .limit(1);

  if (!order) return null;

  const items = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, order.id));

  return {
    ...order,
    items,
  };
}

export async function getCustomerAddresses(customerId: string) {
  return db
    .select()
    .from(schema.customerAddresses)
    .where(eq(schema.customerAddresses.customerId, customerId))
    .orderBy(desc(schema.customerAddresses.isDefault), desc(schema.customerAddresses.createdAt));
}
