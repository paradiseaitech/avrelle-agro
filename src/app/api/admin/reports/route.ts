import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import {
  exportInventoryReportCsv,
  exportOrdersReportCsv,
  exportProductsReportCsv,
  exportSalesReportCsv,
} from "@/lib/reports";

export async function GET(req: NextRequest) {
  // Authorize request: admin session required
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized. Administrator credentials required to download reports." },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;
  const status = searchParams.get("status") || undefined;

  let csvContent = "";
  let filename = `avrelle-${type || "report"}-${new Date().toISOString().slice(0, 10)}.csv`;

  try {
    switch (type) {
      case "orders":
        csvContent = await exportOrdersReportCsv({ from, to, status });
        break;
      case "sales":
        csvContent = await exportSalesReportCsv({ from, to, status });
        break;
      case "inventory":
        csvContent = await exportInventoryReportCsv();
        break;
      case "products":
        csvContent = await exportProductsReportCsv();
        break;
      default:
        return NextResponse.json(
          { error: "Invalid report type requested. Must be 'orders', 'sales', 'inventory', or 'products'." },
          { status: 400 },
        );
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("[Report Export Error]:", err);
    return NextResponse.json({ error: "Failed to generate report export." }, { status: 500 });
  }
}
