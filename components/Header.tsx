"use client";

import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { storeConfig } from "@/config/store";

const navigation = [
  { label: "Início", href: "/#inicio" },
  { label: "Cursos", href: "/#cursos" },
  { label: "E-books", href: "/#ebooks" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Dúvidas", href: "/#duvidas" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#06101d]/95 shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur">
      <div className="section-shell flex h-[72px] items-center justify-between gap-4">
        <Link
          href="/#inicio"
          className="focus-ring flex items-center gap-3 rounded-md"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid size-10 place-items-center rounded-md border border-amber-300/40 bg-amber-400/10 text-amber-300">
            <BookOpen size={24} />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-semibold text-white">
              {storeConfig.storeName.split(" ")[0]}
            </span>
            <span className="block text-xs font-semibold text-amber-300">
              {storeConfig.storeName.split(" ")[1]}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-white/80 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-md transition hover:text-amber-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#conteudos"
            className="focus-ring rounded-md border border-amber-300/80 px-5 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-slate-950"
          >
            Acessar minha conta
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="focus-ring grid size-11 place-items-center rounded-md border border-white/20 bg-white/5 text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#06101d] lg:hidden">
          <nav className="section-shell grid gap-1 py-4 text-sm font-semibold text-white/90">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-md px-2 py-3"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#conteudos"
              className="focus-ring mt-2 rounded-md bg-amber-300 px-4 py-3 text-center font-semibold text-slate-950"
              onClick={() => setIsOpen(false)}
            >
              Acessar minha conta
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
