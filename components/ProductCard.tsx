import { CheckCircle2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/config/store";

const badgeClasses = {
  ebook: "bg-amber-400 text-slate-950",
  curso: "bg-blue-500 text-white",
  combo: "bg-emerald-500 text-white"
} as const;

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-[#07111f] text-white shadow-[0_18px_42px_rgba(5,13,25,0.22)]">
      <div className="relative aspect-[16/10] bg-[#07111f]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className={
            product.type === "combo"
              ? "object-contain p-2"
              : "object-cover"
          }
        />
        <span
          className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-[11px] font-semibold ${badgeClasses[product.type]}`}
        >
          {product.badgeLabel}
        </span>
      </div>
      <div className="grid gap-5 p-5">
        <div className="space-y-3">
          <h3 className="text-xl font-medium leading-tight text-white">
            {product.name}
          </h3>
          <p className="text-sm leading-6 text-slate-300">{product.description}</p>
        </div>

        <div>
          <p className="text-3xl font-medium text-white">{product.priceLabel}</p>
          <p className="mt-1 text-sm text-slate-400">{product.installmentLabel}</p>
        </div>

        <ul className="grid gap-2 text-sm text-slate-300">
          {product.deliverables.map((deliverable) => (
            <li key={deliverable} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 shrink-0 text-amber-300" size={17} />
              <span>{deliverable}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/produto/${product.slug}`}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#e3b451] to-[#c8912e] px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_26px_rgba(218,166,64,0.2)] transition hover:brightness-105"
        >
          {product.buttonLabel}
          <ShoppingCart size={17} />
        </Link>
      </div>
    </article>
  );
}
