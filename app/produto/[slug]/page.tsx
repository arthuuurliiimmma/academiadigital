import type { Metadata } from "next";
import { CheckCircle2, CreditCard, FileText, ShieldCheck, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckoutPanel } from "@/components/CheckoutPanel";
import { FaqList } from "@/components/FaqList";
import { getProductBySlug, products, storeConfig } from "@/config/store";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${storeConfig.storeName}`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.imageAlt
        }
      ]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-paper pt-24">
      <section className="section-shell grid gap-8 py-10 lg:grid-cols-[1fr_380px] lg:items-start">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg border border-line bg-white shadow-card">
            <div className="relative aspect-[16/9] bg-[#07111f]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="grid gap-5 p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-normal text-brand-blue">
                    Produto digital
                  </p>
                  <h1 className="text-3xl font-semibold text-ink md:text-4xl">
                    {product.name}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-muted">
                    {product.longDescription}
                  </p>
                </div>
                <div className="rounded-lg border border-line bg-paper px-5 py-4">
                  <p className="text-sm text-muted">Preço</p>
                  <p className="mt-1 text-2xl font-bold text-brand-navy">
                    {product.priceLabel}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-line bg-paper p-4">
                  <Wallet className="mb-3 text-brand-green" size={24} />
                  <p className="text-sm font-semibold text-ink">PIX</p>
                </div>
                <div className="rounded-lg border border-line bg-paper p-4">
                  <CreditCard className="mb-3 text-brand-violet" size={24} />
                  <p className="text-sm font-semibold text-ink">Cartão</p>
                </div>
                <div className="rounded-lg border border-line bg-paper p-4">
                  <ShieldCheck className="mb-3 text-brand-blue" size={24} />
                  <p className="text-sm font-semibold text-ink">
                    Pagamento seguro
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="rounded-lg border border-line bg-white p-6 shadow-card md:p-8">
            <h2 className="mb-5 text-2xl font-semibold text-ink">
              O que você recebe
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                  <FileText className="text-brand-blue" size={20} />
                  Conteúdo
                </h3>
                <ul className="grid gap-3 text-sm text-muted">
                  {product.contents.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-brand-green"
                        size={17}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-ink">
                  <ShieldCheck className="text-brand-blue" size={20} />
                  Entregáveis
                </h3>
                <ul className="grid gap-3 text-sm text-muted">
                  {product.deliverables.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2
                        className="mt-0.5 shrink-0 text-brand-green"
                        size={17}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-line bg-white p-6 shadow-card md:p-8">
            <h2 className="mb-5 text-2xl font-semibold text-ink">
              Perguntas frequentes
            </h2>
            <FaqList items={product.faq} />
          </section>

          <div className="rounded-lg border border-line bg-white p-6 text-sm leading-6 text-muted shadow-card">
            <p>
              Entrega atual: <strong>{storeConfig.deliveryMethod}</strong>.
              Consulte também a{" "}
              <Link
                href="/reembolso"
                className="font-semibold text-brand-blue underline-offset-4 hover:underline"
              >
                política de reembolso
              </Link>
              .
            </p>
          </div>
        </div>

        <CheckoutPanel product={product} />
      </section>
    </main>
  );
}
