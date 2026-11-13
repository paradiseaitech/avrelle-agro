import "server-only";

export interface NotificationResult {
  sent: boolean;
  provider: string;
  recipient: string;
  subject: string;
  reason?: string;
}

/**
 * Transactional notification service for AVRELLE AGRO.
 *
 * Supported events:
 * - Account created
 * - Password reset link
 * - Order placed
 * - Order status changes (confirmed, packed, shipped, out for delivery, delivered, cancelled)
 *
 * When an email provider (such as Resend, Postmark, or SMTP) is configured in
 * environment variables, notifications are delivered directly to the recipient.
 * When not configured, a clean log entry is generated for observability without
 * failing user operations or faking delivery.
 */
export async function sendEmailNotification(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<NotificationResult> {
  const { to, subject, html, text } = options;
  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.NOTIFICATION_SENDER_EMAIL || "orders@avrelle.com";

  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `AVRELLE AGRO <${senderEmail}>`,
          to: [to],
          subject,
          html,
          text: text || html.replace(/<[^>]+>/g, ""),
        }),
      });
      if (res.ok) {
        return { sent: true, provider: "resend", recipient: to, subject };
      }
      const err = await res.text();
      console.warn(`[Notification Error] Resend API responded with error: ${err}`);
      return { sent: false, provider: "resend", recipient: to, subject, reason: err };
    } catch (e) {
      console.warn(`[Notification Error] Failed to send via Resend:`, e);
      return { sent: false, provider: "resend", recipient: to, subject, reason: String(e) };
    }
  }

  // Graceful fallback when no provider is configured
  console.log(`[Notification Service — Ready for Provider]`, {
    recipient: to,
    subject,
    status: "Provider not configured. Set RESEND_API_KEY to enable live email delivery.",
  });

  return {
    sent: false,
    provider: "none",
    recipient: to,
    subject,
    reason: "No email provider configured in environment variables (RESEND_API_KEY).",
  };
}

export async function notifyAccountCreated(customer: { name: string; email: string }): Promise<NotificationResult> {
  return sendEmailNotification({
    to: customer.email,
    subject: "Welcome to AVRELLE AGRO — Account Created",
    html: `
      <div style="font-family: serif; color: #1e3329; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #12211b; font-size: 26px;">Welcome to AVRELLE AGRO, ${customer.name}</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #3c4a43;">
          Your customer account has been created. You can now track your orders, save delivery addresses, and enjoy seamless checkout with hand-graded Purnea makhana.
        </p>
        <p style="margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account" style="background-color: #1b3d2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: bold;">
            View Your Account
          </a>
        </p>
      </div>
    `,
  });
}

export async function notifyPasswordReset(email: string, resetUrl: string): Promise<NotificationResult> {
  return sendEmailNotification({
    to: email,
    subject: "Reset your AVRELLE AGRO password",
    html: `
      <div style="font-family: serif; color: #1e3329; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #12211b; font-size: 24px;">Reset Password Request</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #3c4a43;">
          We received a request to reset your password. Click the secure link below to choose a new password. This link is valid for 1 hour.
        </p>
        <p style="margin: 24px 0;">
          <a href="${resetUrl}" style="background-color: #1b3d2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: bold;">
            Reset Password
          </a>
        </p>
        <p style="font-size: 13px; color: #6b7770;">
          If you did not request this reset, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function notifyOrderPlaced(order: {
  reference: string;
  customerName: string;
  email?: string | null;
  totalPaise: number;
  paymentMethod: string;
  itemsCount: number;
}): Promise<NotificationResult | null> {
  if (!order.email) return null;
  const totalRupees = (order.totalPaise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });

  return sendEmailNotification({
    to: order.email,
    subject: `Order Confirmed: ${order.reference} — AVRELLE AGRO`,
    html: `
      <div style="font-family: serif; color: #1e3329; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #12211b; font-size: 26px;">Order Received: ${order.reference}</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #3c4a43;">
          Thank you, ${order.customerName}. We have received your order for ${order.itemsCount} item(s).
        </p>
        <div style="background-color: #f7f6f2; border: 1px solid #e5e0d4; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Order Reference:</strong> ${order.reference}</p>
          <p style="margin: 0 0 8px 0;"><strong>Total Amount:</strong> ₹${totalRupees}</p>
          <p style="margin: 0;"><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
        </div>
        <p style="margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account/orders/${order.reference}" style="background-color: #1b3d2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: bold;">
            Track Your Order
          </a>
        </p>
      </div>
    `,
  });
}

export async function notifyOrderStatusUpdated(order: {
  reference: string;
  customerName: string;
  email?: string | null;
  newStatus: string;
  note?: string;
}): Promise<NotificationResult | null> {
  if (!order.email) return null;

  const statusLabels: Record<string, string> = {
    confirmed: "Order Confirmed",
    packed: "Order Packed & Ready for Dispatch",
    shipped: "Order Shipped",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Order Cancelled",
  };

  const label = statusLabels[order.newStatus] || order.newStatus.toUpperCase();

  return sendEmailNotification({
    to: order.email,
    subject: `Update on your order ${order.reference}: ${label}`,
    html: `
      <div style="font-family: serif; color: #1e3329; max-width: 600px; margin: 0 auto; padding: 24px;">
        <h1 style="color: #12211b; font-size: 24px;">Order Status: ${label}</h1>
        <p style="font-size: 15px; line-height: 1.6; color: #3c4a43;">
          Hello ${order.customerName}, your order <strong>${order.reference}</strong> is now <strong>${label}</strong>.
        </p>
        ${order.note ? `<p style="background: #f7f6f2; padding: 12px; border-left: 3px solid #b89047; font-style: italic;">“${order.note}”</p>` : ""}
        <p style="margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account/orders/${order.reference}" style="background-color: #1b3d2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 2px; font-weight: bold;">
            View Real-Time Tracking
          </a>
        </p>
      </div>
    `,
  });
}
