import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Binh & Quynh Wedding",
  description: "Wedding invitation of Binh & Quynh",
};

const font = Roboto_Flex({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
