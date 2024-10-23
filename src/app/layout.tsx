import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Binh & Quynh Wedding",
  description: "Wedding invitation of Binh & Quynh",
};

const font = IBM_Plex_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased bg-[#fafafa]`}>
        <Providers>{children}</Providers>
        <footer className="tracking-tighter text-center text-white bg-red-800 p-1 text-sm">
          Made with ❤️ by binhdoitsme@gmail.com
        </footer>
      </body>
    </html>
  );
}
