import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { User } from "lucide-react";

export async function UserAccountLink() {
  const customer = await getCurrentCustomer();

  return (
    <Link
      href={customer ? "/account" : "/login"}
      className="inline-flex h-10 items-center gap-1.5 px-2 text-forest-800 transition-colors hover:text-gold-700"
      aria-label={customer ? `Account (${customer.name})` : "Sign In to Account"}
      title={customer ? `Signed in as ${customer.name}` : "Sign In"}
    >
      <User className="h-5 w-5" />
      <span className="hidden md:inline text-[13px] font-medium max-w-[100px] truncate">
        {customer ? customer.name.split(" ")[0] : "Sign In"}
      </span>
    </Link>
  );
}
