import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { storeConfig } from "@/config/store";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: `${storeConfig.storeName} | Conteúdos digitais práticos`,
    template: `%s | ${storeConfig.storeName}`
  },
  description:
    "Cursos e materiais digitais para aprender de forma simples, organizada e acessível.",
  openGraph: {
    title: `${storeConfig.storeName} | Conteúdos digitais práticos`,
    description:
      "Página de vendas de infoprodutos digitais com cursos, e-books, suporte e checkout seguro.",
    url: "/",
    siteName: storeConfig.storeName,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/produto-combo-completo.png",
        width: 1536,
        height: 476,
        alt: "Combo Completo com e-books, curso e bônus digitais."
      }
    ]
  },
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
