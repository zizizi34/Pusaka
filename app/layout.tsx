import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "PUSAKA | Bangga Belanja Produk Lokal",
  description: "E-commerce mewah yang mempromosikan kekayaan budaya Indonesia melalui koleksi produk lokal berkualitas tinggi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Italianno&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LenisProvider />
        {children}
      </body>
    </html>
  );
}
