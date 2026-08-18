import type { Metadata } from "next";

import { storeConfig } from "@/config/store";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso da Academia Digital."
};

export default function TermsPage() {
  return (
    <main className="bg-paper pt-24">
      <article className="section-shell max-w-3xl py-12">
        <div className="rounded-lg border border-line bg-white p-6 shadow-card md:p-10">
          <h1 className="text-3xl font-semibold text-ink">Termos de Uso</h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
            {/* Revisar com assessoria jurídica antes da publicação. */}
            <p>
              Ao adquirir um produto digital de {storeConfig.storeName}, o
              cliente declara ter lido as informações da página do produto,
              incluindo preço, forma de pagamento, entrega e suporte.
            </p>
            <p>
              O acesso ao conteúdo é pessoal e deve respeitar as condições
              apresentadas no momento da compra. A redistribuição não autorizada
              de materiais pode violar direitos autorais.
            </p>
            <p>
              A disponibilidade de conteúdos, bônus e materiais complementares
              deve seguir exatamente o que estiver descrito na oferta adquirida.
            </p>
            <p>
              Estes termos podem ser atualizados para refletir mudanças no
              funcionamento da loja, integrações de pagamento ou regras de
              entrega digital.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
