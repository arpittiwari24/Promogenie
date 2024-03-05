import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import IsPremiumContextProvider from "@/components/IsPremium";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "promogenie",
  description: "all in one marketing content platform for your business growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <IsPremiumContextProvider>
          {children}
          </IsPremiumContextProvider>
        </Providers>
      </body>
    </html>
  );
}
