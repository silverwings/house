// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthErrorHandler } from "@/components/AuthErrorHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "House - Trova la tua casa ideale",
  description: "Scopri immobili e design di interni per la tua casa perfetta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <AuthErrorHandler />
        {children}
      </body>
    </html>
  );
}