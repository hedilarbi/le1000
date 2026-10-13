import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin Le 1000" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div id="admin-root" className="min-h-screen bg-[#101213] text-[15px] text-ivory">{children}</div>;
}
