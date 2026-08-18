import {
  BookOpen,
  Clock3,
  CreditCard,
  LockKeyhole,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

import { storeConfig } from "@/config/store";

const navigationLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Cursos", href: "/#cursos" },
  { label: "E-books", href: "/#ebooks" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Dúvidas", href: "/#duvidas" }
];

const institutionalLinks = [
  { label: "Sobre nós", href: "/#inicio" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos" },
  { label: "Política de Reembolso", href: "/reembolso" },
  { label: "Contato", href: "/suporte" }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06101d] text-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.7fr_0.7fr_0.9fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-amber-300/40 bg-amber-400/10 text-amber-300">
              <BookOpen size={24} />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-semibold text-white">
                Academia
              </span>
              <span className="block text-xs font-semibold text-amber-300">
                Digital
              </span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-6 text-slate-300">
            Transformamos conhecimento em resultados. Aprenda no seu ritmo e
            alcance o próximo nível.
          </p>
          <div className="flex items-center gap-3 pt-2 text-amber-300">
            <span className="grid size-8 place-items-center rounded-md border border-amber-300/25">
              IG
            </span>
            <span className="grid size-8 place-items-center rounded-md border border-amber-300/25">
              YT
            </span>
            <span className="grid size-8 place-items-center rounded-md border border-amber-300/25">
              FB
            </span>
          </div>
        </div>

        <nav className="grid content-start gap-3 text-sm text-slate-300">
          <p className="mb-1 text-xs font-semibold uppercase text-white">Navegação</p>
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md transition hover:text-amber-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="grid content-start gap-3 text-sm text-slate-300">
          <p className="mb-1 text-xs font-semibold uppercase text-white">
            Institucional
          </p>
          {institutionalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md transition hover:text-amber-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 text-sm text-slate-300">
          <p className="mb-1 text-xs font-semibold uppercase text-white">Suporte</p>
          <p className="flex gap-2">
            <Mail className="mt-0.5 shrink-0 text-amber-300" size={17} />
            {storeConfig.supportEmail}
          </p>
          <p className="flex gap-2">
            <Phone className="mt-0.5 shrink-0 text-amber-300" size={17} />
            {storeConfig.whatsapp}
          </p>
          <p className="flex gap-2">
            <Clock3 className="mt-0.5 shrink-0 text-amber-300" size={17} />
            {storeConfig.supportHours}
          </p>
        </div>
      </div>

      <div className="section-shell flex flex-col gap-4 border-t border-white/10 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© 2025 {storeConfig.storeName}. Todos os direitos reservados.</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2">
            <LockKeyhole size={15} className="text-amber-300" />
            Site 100% seguro
          </span>
          <span className="rounded-sm bg-white/10 px-2 py-1 font-semibold text-white">
            VISA
          </span>
          <span className="rounded-sm bg-white/10 px-2 py-1 font-semibold text-white">
            MC
          </span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-white/10 px-2 py-1 font-semibold text-white">
            <CreditCard size={14} />
            PIX
          </span>
        </div>
      </div>
    </footer>
  );
}
