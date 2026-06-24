import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahman Aprian | Fullstack Developer",
  description: "Portofolio Fullstack Web Developer — membangun aplikasi modern yang cepat, indah, dan skalabel.",
  openGraph: {
    title: "Rahman Aprian | Fullstack Developer",
    description: "Portofolio Fullstack Web Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
