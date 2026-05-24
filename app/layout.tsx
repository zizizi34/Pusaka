import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
