import type { Metadata } from "next";

import { storeConfig } from "@/config/store";

export const metadata: Metadata = {
  title: "Política de Reembolso",
  description: "Política de cancelamento e reembolso da Academia Digital."
};

export default function RefundPage() {
  return (
    <main className="bg-paper pt-24">
      <article className="section-shell max-w-3xl py-12">
        <div className="rounded-lg border border-line bg-white p-6 shadow-card md:p-10">
          <h1 className="text-3xl font-semibold text-ink">
            Política de Reembolso
          </h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
            {/* Revisar com assessoria jurídica antes da publicação. */}
            <p>{storeConfig.refundPolicySummary}</p>
            <p>
              Para solicitar análise de cancelamento ou reembolso, o cliente
              deve entrar em contato com o suporte informando os dados da compra
              e o motivo da solicitação.
            </p>
            <p>
              O prazo de análise e a forma de retorno podem variar conforme o
              método de pagamento, status da transação e condições apresentadas
              no momento da compra.
            </p>
            <p>
              Em caso de aprovação, o reembolso deve seguir os procedimentos do
              provedor de pagamento utilizado na transação.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
