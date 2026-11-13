import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Administration",
    template: "%s · AVRELLE Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
