import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Forcadia",
  description: "Forcadia Imperial Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body>
        <div className="site-shell">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
