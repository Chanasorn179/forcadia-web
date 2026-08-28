import type { Metadata } from "next";
import "@fontsource/noto-sans-thai/400.css";
import "@fontsource/noto-sans-thai/500.css";
import "@fontsource/noto-sans-thai/600.css";
import "@fontsource/noto-sans-thai/700.css";
import "@fontsource/noto-serif-thai/400.css";
import "@fontsource/noto-serif-thai/600.css";
import "@fontsource/noto-serif-thai/700.css";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Forcadia: The Shattered Ring",
    template: "%s | Forcadia",
  },
  description:
    "อ่านนิยายแฟนตาซี Forcadia: The Shattered Ring และสำรวจตัวละคร ตระกูล เมือง ตำนาน และเส้นเวลาแห่งจักรวรรดิ",
  applicationName: "Forcadia",
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Forcadia",
    title: "Forcadia: The Shattered Ring",
    description:
      "คลังนิยายและสารานุกรมโลกแฟนตาซีแห่งจักรวรรดิ Forcadia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forcadia: The Shattered Ring",
    description:
      "คลังนิยายและสารานุกรมโลกแฟนตาซีแห่งจักรวรรดิ Forcadia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('forcadia-theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){document.documentElement.dataset.theme='dark'}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <div className="site-shell">
          <SiteHeader />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
