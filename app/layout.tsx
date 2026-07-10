import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rahman Aprian | Fullstack Web Developer Palembang",
  description:
    "Rahman Aprian — Fullstack Web Developer asal Palembang, Indonesia. Spesialis React, Next.js, Laravel, dan Node.js. Terbuka untuk proyek freelance dan kolaborasi.",
  keywords: [
    "Rahman Aprian",
    "Rahman Aprian developer",
    "Fullstack Developer Palembang",
    "Web Developer Palembang",
    "React Developer Indonesia",
    "Next.js Developer",
    "Laravel Developer",
    "Jasa Pembuatan Website Palembang",
    "Freelance Web Developer Indonesia",
    "portofolio rahman aprian",
  ],
  authors: [{ name: "Rahman Aprian", url: "https://portofolio-rahman-aprian.vercel.app" }],
  creator: "Rahman Aprian",
  publisher: "Rahman Aprian",

  metadataBase: new URL("https://portofolio-rahman-aprian.vercel.app"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://portofolio-rahman-aprian.vercel.app",
    title: "Rahman Aprian | Fullstack Web Developer",
    description:
      "Fullstack Web Developer asal Palembang. Membangun aplikasi web modern dengan React, Next.js, dan Laravel.",
    siteName: "Portofolio Rahman Aprian",
    images: [
      {
        url: "/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Rahman Aprian - Fullstack Web Developer",
      },
    ],
    locale: "id_ID",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rahman Aprian | Fullstack Web Developer",
    description:
      "Fullstack Web Developer asal Palembang. Membangun aplikasi web modern dengan React, Next.js, dan Laravel.",
    images: ["/profile.jpeg"],
    creator: "@rhmn0504",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rahman Aprian",
              url: "https://portofolio-rahman-aprian.vercel.app",
              image: "https://portofolio-rahman-aprian.vercel.app/profile.jpeg",
              jobTitle: "Fullstack Web Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Palembang",
                addressRegion: "Sumatera Selatan",
                addressCountry: "ID",
              },
              sameAs: [
                "https://github.com/RahmanAprian",
                "https://www.linkedin.com/in/rahman-aprian-39b6ab279",
                "https://www.instagram.com/rhmn0504",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Laravel",
                "Node.js",
                "TypeScript",
                "Web Development",
                "Fullstack Development",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}