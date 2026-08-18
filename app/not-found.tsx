import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-paper pt-24">
      <section className="section-shell grid min-h-[60vh] place-items-center py-12">
        <div className="max-w-lg rounded-lg border border-line bg-white p-8 text-center shadow-card">
          <h1 className="text-3xl font-semibold text-ink">
            Página não encontrada
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            O conteúdo solicitado não está disponível neste endereço.
          </p>
          <Link
            href="/"
            className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    </main>
  );
}
