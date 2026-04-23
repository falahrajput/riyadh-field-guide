import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://japan-field-guide.vercel.app"),
  title: "Japan Field Guide \u2014 東京 '26",
  description: "Personal Tokyo trip guide \u00b7 February 12\u201320, 2026",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0C0C0C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-[#0C0C0C]">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} antialiased bg-[#0C0C0C] text-[#FCFAF2]`}
      >
        {children}
      </body>
    </html>
  );
}
