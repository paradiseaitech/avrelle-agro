import { NextResponse } from "next/server";
import { createRateLimiter } from "@/lib/site";
import { getSettings, listPublishedGrades } from "@/lib/db-data";

const limiter = createRateLimiter(40, 60_000);

interface ChatRequest {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!limiter(`chat:${ip}`)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment before sending another message." },
      { status: 429 },
    );
  }

  let body: ChatRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = (body.message ?? "").trim();
  if (!query) {
    return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
  }

  const { business, shipping } = await getSettings();
  const grades = await listPublishedGrades();
  const phone = business.phone || "+917979782185";
  const rawNumber = business.whatsapp.replace(/\D/g, "") || "917979782185";
  const email = business.email || "averelleagro@gmail.com";

  // If GEMINI_API_KEY is configured in the environment, we can optionally query Google Gemini.
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const geminiResponse = await callGeminiAPI({
        apiKey,
        query,
        history: body.history ?? [],
        grades,
        business,
        shipping,
      });
      if (geminiResponse) {
        return NextResponse.json(geminiResponse);
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local expert system:", e);
    }
  }

  // Built-in expert knowledge system grounded in website details
  const response = answerFromWebsiteKnowledge(query, {
    grades,
    business,
    shipping,
    phone,
    rawNumber,
    email,
  });

  return NextResponse.json(response);
}

// -----------------------------------------------------------------------------
// Website Knowledge Engine
// -----------------------------------------------------------------------------

interface KnowledgeContext {
  grades: Array<{
    name: string;
    slug: string;
    sizeMinMm: number | null;
    sizeMaxMm: number | null;
    summary: string | null;
    description: string | null;
  }>;
  business: {
    displayName: string;
    phone: string;
    email: string;
    city: string;
    state: string;
  };
  shipping: {
    defaultPaise: number;
    freeShippingAbovePaise: number;
    codFeePaise: number;
    estDaysMin: number;
    estDaysMax: number;
  };
  phone: string;
  rawNumber: string;
  email: string;
}

interface ChatReply {
  reply: string;
  matched: boolean;
  contactPrompt?: boolean;
  suggestions?: string[];
  links?: Array<{ label: string; href: string; external?: boolean }>;
}

function answerFromWebsiteKnowledge(query: string, ctx: KnowledgeContext): ChatReply {
  const q = query.toLowerCase();

  // Helper for contact fallback
  const fallbackContact = (): ChatReply => ({
    matched: false,
    contactPrompt: true,
    reply: `I don't have that specific detail in my website records. For personalized assistance, custom orders, or queries not covered on our site, please contact our team directly at **${ctx.phone}** (Call or WhatsApp) or email us at **${ctx.email}**. We'll be delighted to help!`,
    links: [
      { label: `Call ${ctx.phone}`, href: `tel:${ctx.phone.replace(/\s+/g, "")}` },
      { label: "WhatsApp Us", href: `https://wa.me/${ctx.rawNumber}`, external: true },
      { label: "Contact Page", href: "/contact" },
    ],
    suggestions: [
      "What are the makhana grades?",
      "How do bulk orders work?",
      "What are shipping charges?",
    ],
  });

  // 1. Greetings
  if (/^(hi|hello|hey|namaste|greetings|good\s*(morning|afternoon|evening))\b/i.test(q)) {
    return {
      matched: true,
      reply: `Hello and welcome to **${ctx.business.displayName}**! 🌾\n\nI am your AI assistant for makhana grades, sizing, bulk supply, and order queries direct from Purnea, Bihar.\n\nHow can I help you today? You can ask about our suta grades, shipping, retail packs, or wholesale supply.`,
      suggestions: [
        "What is the difference between grades?",
        "What is 6+ Suta?",
        "Do you provide bulk supply?",
        "What are shipping charges?",
      ],
    };
  }

  // 2. Who are you / About the company / Origin / Location
  if (
    q.includes("who are you") ||
    q.includes("about avrelle") ||
    q.includes("about you") ||
    q.includes("where are you located") ||
    q.includes("where is your office") ||
    q.includes("origin") ||
    q.includes("location") ||
    q.includes("purnea") ||
    q.includes("bihar")
  ) {
    return {
      matched: true,
      reply: `**${ctx.business.displayName}** is based in **Purnea, Bihar, India** — the world's leading region for phool makhana (fox nuts / lotus seeds).\n\n• **Direct Regional Sourcing**: Grown in the natural wetlands of Purnea & Mithila.\n• **Artisanal Processing**: Wood-fired slow roasting on clay chulhas by skilled traditional artisans.\n• **Hygienic Machine Grading**: Cleanly sorted into distinct suta sizes so buyers know exactly what they are getting.\n\nWe serve both retail households and wholesale business buyers across India.`,
      links: [
        { label: "Our Story (About Us)", href: "/about" },
        { label: "Explore Grades", href: "/grades" },
      ],
      suggestions: [
        "What are your makhana grades?",
        "Can I place a bulk order?",
        "How can I contact you?",
      ],
    };
  }

  // 3. Contact details / Phone number / Mobile / WhatsApp / Email
  if (
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("call") ||
    q.includes("number") ||
    q.includes("whatsapp") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("address")
  ) {
    return {
      matched: true,
      reply: `You can reach the **${ctx.business.displayName}** team directly via:\n\n• **Phone / Call**: ${ctx.phone}\n• **WhatsApp**: [Message on WhatsApp](https://wa.me/${ctx.rawNumber})\n• **Email**: ${ctx.email}\n• **Location**: Purnea, Bihar, India\n\nWe are available Monday to Saturday for retail orders, grade consultations, and wholesale quotations.`,
      links: [
        { label: `Call ${ctx.phone}`, href: `tel:${ctx.phone.replace(/\s+/g, "")}` },
        { label: "Chat on WhatsApp", href: `https://wa.me/${ctx.rawNumber}`, external: true },
        { label: "Contact Form", href: "/contact" },
      ],
    };
  }

  // 4. Suta meaning / Sizing definition / Size comparison
  if (
    q.includes("what is suta") ||
    q.includes("suta scale") ||
    q.includes("size comparison") ||
    q.includes("how is it measured") ||
    q.includes("size chart") ||
    q.includes("scale") ||
    q.includes("how big")
  ) {
    return {
      matched: true,
      reply: `**What is a Suta?**\nIn India's traditional agricultural trade, makhana is graded using the **Suta** scale:\n\n• **1 Suta ≈ ⅛ inch (~3.175 mm)**\n• Larger suta grades mean larger diameter, rarer fox nuts with superior puffing.\n\n**Standard Size Ranges:**\n• **6+ Suta**: ~19–24 mm (extra-large, premium gifting)\n• **5 Suta**: ~15.7–19 mm (large, uniform table grade)\n• **4 Suta**: ~12.5–15.5 mm (mid-size, everyday cooking & kheer)\n• **3 Suta**: ~9–12.3 mm (compact, cooking & snack mixes)\n• **Thurr(i)**: ~6–8 mm (processing & flour grade)\n\nYou can view our photographic scale comparison chart on the Grades page!`,
      links: [
        { label: "View Size Comparison Chart", href: "/grades" },
        { label: "Shop Makhana", href: "/shop" },
      ],
      suggestions: [
        "Tell me about 6+ Suta",
        "Tell me about 5 Suta",
        "What is Thurr makhana?",
      ],
    };
  }

  // 5. Specific Grade: 6+ Suta
  if (q.includes("6+") || q.includes("6 suta") || q.includes("6-suta") || q.includes("largest")) {
    return {
      matched: true,
      reply: `**6+ Suta Makhana (~19–24 mm)**\nOur largest and most prestigious grade.\n\n• **Characteristics**: Exceptional size, majestic puffing, hand-graded.\n• **Ideal For**: Festive gifting, luxury retail packaging, temple offerings, and premium tabletop snacks.\n• **Packs**: Available in 250g, 500g, and 1kg unroasted raw packs.\n• **Bulk**: Also available in bulk bags for wholesale buyers.`,
      links: [
        { label: "View 6+ Suta Grade Guide", href: "/grades/6-suta" },
        { label: "Shop 6+ Suta", href: "/product/phool-makhana-6-suta" },
      ],
      suggestions: [
        "How does 6+ Suta compare to 5 Suta?",
        "What are the retail pack prices?",
      ],
    };
  }

  // 6. Specific Grade: 5 Suta
  if (q.includes("5 suta") || q.includes("5-suta") || q.includes("five suta")) {
    return {
      matched: true,
      reply: `**5 Suta Makhana (~15.7–19 mm)**\nA popular premium grade favoured for regular consumption.\n\n• **Characteristics**: Noticeably large, uniform, crisp texture when roasted.\n• **Ideal For**: Households that dry-roast their own makhana with ghee, and premium brand retail packs.\n• **Packs**: Available in 250g, 500g, and 1kg unroasted packs.`,
      links: [
        { label: "View 5 Suta Grade Guide", href: "/grades/5-suta" },
        { label: "Shop 5 Suta", href: "/product/phool-makhana-5-suta" },
      ],
      suggestions: [
        "Tell me about 4 Suta",
        "How do I roast makhana?",
      ],
    };
  }

  // 7. Specific Grade: 4 Suta
  if (q.includes("4 suta") || q.includes("4-suta") || q.includes("four suta")) {
    return {
      matched: true,
      reply: `**4 Suta Makhana (~12.5–15.5 mm)**\nA balanced, versatile mid-size grade.\n\n• **Characteristics**: Even size, highly adaptable, cost-effective.\n• **Ideal For**: Makhana kheer, everyday spiced roasted snacks, curries, and family cooking.\n• **Packs**: Available in 250g, 500g, and 1kg packs.`,
      links: [
        { label: "View 4 Suta Grade Guide", href: "/grades/4-suta" },
        { label: "Shop 4 Suta", href: "/product/phool-makhana-4-suta" },
      ],
    };
  }

  // 8. Specific Grade: 3 Suta
  if (q.includes("3 suta") || q.includes("3-suta") || q.includes("three suta")) {
    return {
      matched: true,
      reply: `**3 Suta Makhana (~9–12.3 mm)**\nCompact, practical, and economical.\n\n• **Characteristics**: Smaller nut diameter, high crunch, affordable.\n• **Ideal For**: Cooking, sweets (mithai), masala snack mixtures, and powdered culinary uses.\n• **Packs**: Available in 250g, 500g, and 1kg packs.`,
      links: [
        { label: "View 3 Suta Grade Guide", href: "/grades/3-suta" },
        { label: "Shop 3 Suta", href: "/product/phool-makhana-3-suta" },
      ],
    };
  }

  // 9. Specific Grade: Thurr
  if (q.includes("thurr") || q.includes("flour") || q.includes("processing grade")) {
    return {
      matched: true,
      reply: `**Thurr(i) Makhana (~6–8 mm)**\nThe smallest grade in the catalogue.\n\n• **Characteristics**: Consists of small unpopped seeds and pieces.\n• **Ideal For**: Makhana flour (atta), industrial food processing, infant foods, and specialized animal feed.\n• **Availability**: Supplied primarily in bulk on enquiry.`,
      links: [
        { label: "Enquire About Thurr", href: "/bulk-orders" },
        { label: "Grades Overview", href: "/grades" },
      ],
    };
  }

  // 10. All Grades / Grade differences / Which grade should I buy
  if (
    q.includes("grade") ||
    q.includes("difference") ||
    q.includes("which one") ||
    q.includes("which should i buy") ||
    q.includes("grades overview")
  ) {
    return {
      matched: true,
      reply: `We offer 5 standard suta grades:\n\n1. **6+ Suta (~19–24 mm)**: Supreme size for luxury gifting & festive packs.\n2. **5 Suta (~15.7–19 mm)**: Large & uniform for premium daily roasting.\n3. **4 Suta (~12.5–15.5 mm)**: Balanced mid-size for kheer, cooking & snacks.\n4. **3 Suta (~9–12.3 mm)**: Compact & economical for daily recipes.\n5. **Thurr(i) (~6–8 mm)**: Processing & flour grade.\n\nAll grades contain 100% natural, unflavoured phool makhana directly from Purnea, Bihar!`,
      links: [
        { label: "Full Grades Guide", href: "/grades" },
        { label: "Shop All Grades", href: "/shop" },
      ],
      suggestions: [
        "What are shipping charges?",
        "Do you offer Cash on Delivery?",
      ],
    };
  }

  // 11. Wholesale / Bulk Orders / B2B / Private Label / Quotation
  if (
    q.includes("bulk") ||
    q.includes("wholesale") ||
    q.includes("quote") ||
    q.includes("quotation") ||
    q.includes("b2b") ||
    q.includes("private label") ||
    q.includes("distributor") ||
    q.includes("export") ||
    q.includes("quintal") ||
    q.includes("ton") ||
    q.includes("kg bag")
  ) {
    return {
      matched: true,
      reply: `**Wholesale & Bulk Supply from AVRELLE AGRO**:\n\nWe supply raw and graded makhana in wholesale quantities to distributors, supermarkets, export houses, and food manufacturers.\n\n• **Grades Available**: 3 Suta to 6+ Suta, plus Thurr(i) on enquiry.\n• **Packaging**: Bulk bags (10 kg, 20 kg, 25 kg), retail pouches, or private label options.\n• **Pricing**: Handled separately from retail with tailored per-quintal/per-kg quotations based on volume and delivery PIN code.\n\nYou can submit our bulk enquiry form or speak directly with our wholesale desk.`,
      links: [
        { label: "Request Bulk Quotation", href: "/bulk-orders" },
        { label: `Call Wholesale: ${ctx.phone}`, href: `tel:${ctx.phone.replace(/\s+/g, "")}` },
        { label: "WhatsApp Wholesale", href: `https://wa.me/${ctx.rawNumber}?text=Hello%20AVRELLE%20AGRO,%20I%20am%20interested%20in%20a%20bulk%20quotation.`, external: true },
      ],
      suggestions: [
        "What are the available grades for bulk?",
        "Can I get samples before ordering?",
      ],
    };
  }

  // 12. Shipping, Delivery, Rates, Timeline, PIN Code
  if (
    q.includes("shipping") ||
    q.includes("delivery") ||
    q.includes("courier") ||
    q.includes("dispatch") ||
    q.includes("charge") ||
    q.includes("free shipping") ||
    q.includes("pincode") ||
    q.includes("pin code") ||
    q.includes("how long")
  ) {
    const freeAbove = Math.round(ctx.shipping.freeShippingAbovePaise / 100);
    const fee = Math.round(ctx.shipping.defaultPaise / 100);
    return {
      matched: true,
      reply: `**Shipping & Delivery Details**:\n\n• **Standard Shipping Fee**: ₹${fee} flat rate.\n• **Free Shipping**: Available on all retail orders above **₹${freeAbove}**!\n• **Delivery Timeframe**: Typically **${ctx.shipping.estDaysMin} to ${ctx.shipping.estDaysMax} working days** across serviceable PIN codes in India.\n• **Dispatch**: Orders are usually dispatched within 2–3 business days with tracking details provided.`,
      links: [
        { label: "Shipping Policy", href: "/shipping-policy" },
        { label: "Track Order Status", href: "/order-status" },
      ],
      suggestions: [
        "Do you have Cash on Delivery?",
        "What is your return policy?",
      ],
    };
  }

  // 13. Payment methods / Cash on Delivery (COD) / Prices
  if (
    q.includes("payment") ||
    q.includes("cod") ||
    q.includes("cash on delivery") ||
    q.includes("pay") ||
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("sample price")
  ) {
    return {
      matched: true,
      reply: `**Payment & Pricing**:\n\n• **Cash on Delivery (COD)**: Yes, we support Cash on Delivery across serviceable PIN codes with zero extra COD fee!\n• **Online Payments**: Secure payments supported.\n• **Retail Pack Sizes**: Available in 100g, 200g, 400g, 500g, and 1kg packs.\n• **Current Catalogue Notice**: The retail shop is currently showing indicative preview pricing pending verified retail stock launch. Wholesale rates are quoted separately on enquiry.`,
      links: [
        { label: "Shop Makhana", href: "/shop" },
        { label: "Wholesale Enquiry", href: "/bulk-orders" },
      ],
      suggestions: [
        "What are shipping charges?",
        "How do bulk orders work?",
      ],
    };
  }

  // 14. How to roast / Recipe / Usage / Health benefits
  if (
    q.includes("roast") ||
    q.includes("cook") ||
    q.includes("recipe") ||
    q.includes("health") ||
    q.includes("benefit") ||
    q.includes("raw") ||
    q.includes("flavoured")
  ) {
    return {
      matched: true,
      reply: `**How to Enjoy AVRELLE AGRO Makhana**:\n\n• **100% Unroasted & Unflavoured**: We supply natural raw phool makhana so you can roast fresh at home.\n• **Quick Roasting**: Heat 1 tsp of desi ghee or olive oil in a pan, add makhana on low-medium flame, roast for 4–6 minutes until crisp, and sprinkle rock salt, pepper, or chaat masala.\n• **Health Benefits**: High in plant protein, rich in calcium and antioxidants, gluten-free, low glycemic index, and low in calories.\n• **Dishes**: Perfect for makhana kheer, roasted savory snacks, curry gravies, or fitness diets.`,
      links: [
        { label: "Shop 5 Suta (Table Roasting)", href: "/product/phool-makhana-5-suta" },
        { label: "Shop 4 Suta (Cooking & Kheer)", href: "/product/phool-makhana-4-suta" },
      ],
    };
  }

  // 15. Storage & Shelf life
  if (q.includes("stor") || q.includes("shelf life") || q.includes("expiry") || q.includes("keep")) {
    return {
      matched: true,
      reply: `**Storage Instructions & Shelf Life**:\n\n• **Airtight Container**: Store in a clean, airtight tin or container immediately after opening.\n• **Keep Dry**: Keep away from humidity, heat, and direct sunlight.\n• **Odour Protection**: Keep away from strong spices or chemicals, as makhana naturally absorbs surrounding aromas.\n• **Shelf Life**: Best before **12 months** from packing when stored in cool, dry conditions.`,
      links: [
        { label: "Shop Makhana", href: "/shop" },
      ],
    };
  }

  // 16. Returns & Refunds / Damaged item
  if (
    q.includes("return") ||
    q.includes("refund") ||
    q.includes("cancel") ||
    q.includes("damaged") ||
    q.includes("complaint")
  ) {
    return {
      matched: true,
      reply: `**Returns & Claims Policy**:\n\n• **Inspection**: Please inspect your package upon delivery.\n• **Notification Window**: If you receive a damaged, opened, or incorrect item, please notify us within **24 hours of delivery**.\n• **Order Reference**: Keep your order reference handy (e.g. \`AVG-XXXXXX\`).\n• **Resolution**: Call or WhatsApp us at **${ctx.phone}** or email **${ctx.email}** with photos of the package for prompt replacement or resolution.`,
      links: [
        { label: "Returns Policy", href: "/returns-policy" },
        { label: `Call Support: ${ctx.phone}`, href: `tel:${ctx.phone.replace(/\s+/g, "")}` },
        { label: "WhatsApp Support", href: `https://wa.me/${ctx.rawNumber}`, external: true },
      ],
    };
  }

  // 17. Track Order / Order status
  if (q.includes("track") || q.includes("order status") || q.includes("where is my order")) {
    return {
      matched: true,
      reply: `To track your order, visit our **Order Status** page and enter your 6-character Order Reference (e.g. \`AVG-ABC123\`) and contact email/phone.\n\nYou can also WhatsApp us at **${ctx.phone}** with your reference for quick updates.`,
      links: [
        { label: "Track Order Status", href: "/order-status" },
        { label: "WhatsApp Support", href: `https://wa.me/${ctx.rawNumber}`, external: true },
      ],
    };
  }

  // 18. Default fallback for unhandled or uncertain questions
  return fallbackContact();
}

// -----------------------------------------------------------------------------
// Optional Gemini API integration (if GEMINI_API_KEY is configured in .env)
// -----------------------------------------------------------------------------

async function callGeminiAPI(params: {
  apiKey: string;
  query: string;
  history: Array<{ role: "user" | "assistant"; content: string }>;
  grades: KnowledgeContext["grades"];
  business: KnowledgeContext["business"];
  shipping: KnowledgeContext["shipping"];
}): Promise<ChatReply | null> {
  const systemPrompt = `You are the official AI assistant for AVRELLE AGRO PVT LTD, a premium makhana (fox nut) company based in Purnea, Bihar, India.
Your mission is to answer user questions accurately based ONLY on the website details below.

WEBSITE KNOWLEDGE:
- Company: AVRELLE AGRO PVT LTD, Purnea, Bihar, India.
- Sourcing: Wetlands of Purnea and Mithila, Bihar.
- Process: Traditional wood-fired clay chulha roasting and manual popping by local artisans, followed by modern hygienic mechanical grading.
- Suta scale: 1 Suta ≈ 1/8 inch (~3.175 mm).
- Grades:
  * 6+ Suta (19-24 mm): Largest, supreme grade, hand-graded. For luxury gifting, festive packs, temple offerings. Packs: 250g, 500g, 1kg.
  * 5 Suta (15.7-19 mm): Large, uniform nuts, high crunch. For daily premium table roasting and brand packs.
  * 4 Suta (12.5-15.5 mm): Balanced mid-size. For makhana kheer, roasted snacks, everyday cooking.
  * 3 Suta (9-12.3 mm): Compact, practical, economical. For daily cooking, sweets, snack mixes.
  * Thurr(i) (6-8 mm): Smallest processing grade / unpopped seeds. For makhana flour and industrial processing.
- Products: 100% pure raw unroasted, unflavoured phool makhana so customers roast fresh at home with their choice of ghee/spices.
- Shipping: ₹${Math.round(params.shipping.defaultPaise / 100)} flat rate. FREE shipping on retail orders above ₹${Math.round(params.shipping.freeShippingAbovePaise / 100)}. Delivery in ${params.shipping.estDaysMin}–${params.shipping.estDaysMax} working days. Cash on Delivery (COD) available with no fee.
- Bulk/Wholesale: Dedicated bulk supply (10kg, 20kg, 25kg bags, private label). Handled on separate quotation via /bulk-orders or direct phone/WhatsApp.
- Storage: Airtight container in a cool, dry place. Shelf life: 12 months.
- Contact: Phone ${params.business.phone}, WhatsApp ${params.business.phone}, Email ${params.business.email}.

CRITICAL RULE:
If the user asks a question whose answer is NOT found in the website knowledge above, or asks for special discounts, negotiations, custom export deals, or personal complaint handling:
YOU MUST EXPLICITLY ASK THEM TO CONTACT THE MOBILE NUMBER: ${params.business.phone} (Call or WhatsApp) or email ${params.business.email}.
Keep your tone warm, respectful, concise, and helpful. Format with clean markdown bullet points where appropriate.`;

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Understood. I will answer customer questions strictly based on AVRELLE AGRO's website details, and instruct them to contact the mobile number whenever details are not available." }] },
    ...params.history.slice(-6).map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }],
    })),
    { role: "user", parts: [{ text: params.query }] },
  ];

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${params.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600,
        },
      }),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  return {
    reply: text,
    matched: true,
    links: [
      { label: `Call ${params.business.phone}`, href: `tel:${params.business.phone.replace(/\s+/g, "")}` },
      { label: "WhatsApp Us", href: `https://wa.me/${params.business.phone.replace(/\D/g, "")}`, external: true },
    ],
  };
}
