import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { OrderStoreProvider } from "../components/order-store";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Queue",
  description: "Coffee shop ordering UI prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${fraunces.variable} bg-[#f7f2ea] text-[#2a1e15]`}
      >
        <OrderStoreProvider>{children}</OrderStoreProvider>
      </body>
    </html>
  );
}
