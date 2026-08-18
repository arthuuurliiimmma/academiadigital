import type { Metadata } from "next";
import { Mail, MessageCircle, Timer } from "lucide-react";

import { SupportForm } from "@/components/SupportForm";
import { storeConfig } from "@/config/store";

export const metadata: Metadata = {
  title: "Suporte",
  description: "Canais de suporte da Academia Digital."
};

export default function SupportPage() {
  return (
    <main className="bg-paper pt-24">
      <section className="section-shell grid gap-8 py-12 lg:grid-cols-[0.85fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-normal text-brand-blue">
              Atendimento
            </p>
            <h1 className="text-4xl font-semibold text-ink">Suporte</h1>
            <p className="text-base leading-8 text-muted">
              Entre em contato para dúvidas sobre compra, pagamento, acesso ou
              entrega dos conteúdos digitais.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="flex gap-3 rounded-lg border border-line bg-white p-5 shadow-card">
              <Mail className="mt-0.5 text-brand-blue" size={22} />
              <div>
                <p className="font-semibold text-ink">E-mail</p>
                <p className="mt-1 text-sm text-muted">{storeConfig.supportEmail}</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-line bg-white p-5 shadow-card">
              <MessageCircle className="mt-0.5 text-brand-green" size={22} />
              <div>
                <p className="font-semibold text-ink">WhatsApp</p>
                <p className="mt-1 text-sm text-muted">{storeConfig.whatsapp}</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-line bg-white p-5 shadow-card">
              <Timer className="mt-0.5 text-brand-violet" size={22} />
              <div>
                <p className="font-semibold text-ink">Horário</p>
                <p className="mt-1 text-sm text-muted">{storeConfig.supportHours}</p>
              </div>
            </div>
          </div>
        </div>

        <SupportForm />
      </section>
    </main>
  );
}
