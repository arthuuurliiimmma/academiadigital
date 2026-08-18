import type { Metadata } from "next";

import { storeConfig } from "@/config/store";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade da Academia Digital."
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-paper pt-24">
      <article className="section-shell max-w-3xl py-12">
        <div className="rounded-lg border border-line bg-white p-6 shadow-card md:p-10">
          <h1 className="text-3xl font-semibold text-ink">
            Política de Privacidade
          </h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
            {/* Revisar com assessoria jurídica antes da publicação. */}
            <p>
              Esta política descreve como {storeConfig.companyName} pode coletar
              e utilizar dados fornecidos pelo cliente durante navegação, compra,
              suporte e acesso a conteúdos digitais.
            </p>
            <p>
              Podemos coletar nome, e-mail, telefone, documento e dados
              necessários para processamento de pagamento, suporte e entrega do
              produto adquirido.
            </p>
            <p>
              Os dados de pagamento são enviados ao provedor responsável pelo
              processamento da transação. O site não deve armazenar dados
              sensíveis de cartão.
            </p>
            <p>
              O cliente pode solicitar informações sobre seus dados pelos canais
              de suporte informados neste site.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
