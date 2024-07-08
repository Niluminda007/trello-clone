import type { Metadata } from "next";

import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

import SProvider from "@/components/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo/png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SProvider>
        <body className={inter.className}>
          <NextTopLoader />
          {children}
        </body>
      </SProvider>
    </html>
  );
}
