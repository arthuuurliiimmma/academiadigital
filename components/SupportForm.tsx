"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export function SupportForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="grid gap-4 rounded-lg border border-line bg-white p-6 shadow-card"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Nome
          <input
            name="name"
            required
            autoComplete="name"
            className="focus-ring min-h-12 rounded-md border border-line px-3 text-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          E-mail
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="focus-ring min-h-12 rounded-md border border-line px-3 text-sm"
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Assunto
        <input
          name="subject"
          required
          className="focus-ring min-h-12 rounded-md border border-line px-3 text-sm"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-ink">
        Mensagem
        <textarea
          name="message"
          required
          rows={5}
          className="focus-ring resize-y rounded-md border border-line px-3 py-3 text-sm"
        />
      </label>
      <button
        type="submit"
        className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <Send size={17} />
        Enviar mensagem
      </button>
      {sent ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Mensagem registrada nesta demonstração. Conecte um serviço de e-mail
          antes da publicação.
        </p>
      ) : null}
    </form>
  );
}
