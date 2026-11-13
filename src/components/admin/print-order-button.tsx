"use client";

import { Printer } from "lucide-react";

export function PrintOrderButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-outline btn-sm flex items-center gap-1.5 print:hidden"
    >
      <Printer className="h-4 w-4" /> Print Packing Slip
    </button>
  );
}
