"use client";

import {
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  LockKeyhole,
  Wallet
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import {
  isIronPayConfigured,
  type Product
} from "@/config/store";
import {
  startCheckout,
  type CreatePaymentRequest,
  type CreatePaymentResult,
  type PaymentMethod
} from "@/services/payment";

const inputClass =
  "focus-ring min-h-12 w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-slate-400";

function valueFrom(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

export function CheckoutPanel({ product }: { product: Product }) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreatePaymentResult | null>(null);
  const [copied, setCopied] = useState(false);
  const configured = isIronPayConfigured(product);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);

    const form = new FormData(event.currentTarget);
    const request: CreatePaymentRequest = {
      productId: product.id,
      paymentMethod,
      customer: {
        name: valueFrom(form, "name"),
        email: valueFrom(form, "email"),
        phone_number: valueFrom(form, "phone_number"),
        document: valueFrom(form, "document")
      },
      installments:
        paymentMethod === "credit_card"
          ? Number(valueFrom(form, "installments") || 1)
          : 1
    };

    if (paymentMethod === "credit_card") {
      request.card = {
        number: valueFrom(form, "card_number"),
        holder_name: valueFrom(form, "card_holder"),
        exp_month: Number(valueFrom(form, "exp_month")),
        exp_year: Number(valueFrom(form, "exp_year")),
        cvv: valueFrom(form, "cvv")
      };
    }

    setIsSubmitting(true);

    try {
      const checkout = await startCheckout(request);
      setResult(checkout);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Não foi possível iniciar o pagamento."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function copyPixCode() {
    if (!result?.pixCopyPaste) {
      return;
    }

    await navigator.clipboard.writeText(result.pixCopyPaste);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <aside className="rounded-lg border border-line bg-white p-5 shadow-soft lg:sticky lg:top-24">
      <div className="grid gap-5">
        <div className="overflow-hidden rounded-lg border border-line bg-paper">
          <div className="relative aspect-[16/10] bg-[#07111f]">
            <Image
              src={product.image}
              alt={product.imageAlt}
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-contain"
            />
          </div>
          <div className="border-t border-line bg-white p-4">
            <p className="text-sm text-muted">Oferta</p>
            <div className="mt-1 flex items-center justify-between gap-4">
              <h2 className="font-semibold text-ink">
                {product.name}
              </h2>
              <span className="text-lg font-bold text-brand-navy">
                {product.priceLabel}
              </span>
            </div>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                paymentMethod === "pix"
                  ? "bg-white text-brand-navy shadow-card"
                  : "text-slate-600 hover:text-ink"
              }`}
              onClick={() => setPaymentMethod("pix")}
            >
              <Wallet size={17} />
              PIX
            </button>
            <button
              type="button"
              className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
                paymentMethod === "credit_card"
                  ? "bg-white text-brand-navy shadow-card"
                  : "text-slate-600 hover:text-ink"
              }`}
              onClick={() => setPaymentMethod("credit_card")}
            >
              <CreditCard size={17} />
              Cartão
            </button>
          </div>

          <div className="grid gap-3">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Nome completo
              <input
                className={inputClass}
                name="name"
                autoComplete="name"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              E-mail
              <input
                className={inputClass}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-ink">
                Telefone
                <input
                  className={inputClass}
                  name="phone_number"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="11999999999"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                CPF/CNPJ
                <input
                  className={inputClass}
                  name="document"
                  inputMode="numeric"
                  placeholder="Somente números"
                  required
                />
              </label>
            </div>
          </div>

          {paymentMethod === "credit_card" ? (
            <div className="grid gap-3 rounded-lg border border-line bg-paper p-4">
              <label className="grid gap-2 text-sm font-medium text-ink">
                Número do cartão
                <input
                  className={inputClass}
                  name="card_number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                Nome impresso no cartão
                <input
                  className={inputClass}
                  name="card_holder"
                  autoComplete="cc-name"
                  required
                />
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Mês
                  <input
                    className={inputClass}
                    name="exp_month"
                    inputMode="numeric"
                    autoComplete="cc-exp-month"
                    placeholder="12"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  Ano
                  <input
                    className={inputClass}
                    name="exp_year"
                    inputMode="numeric"
                    autoComplete="cc-exp-year"
                    placeholder="2028"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-ink">
                  CVV
                  <input
                    className={inputClass}
                    name="cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    required
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium text-ink">
                Parcelas
                <select className={inputClass} name="installments" defaultValue="1">
                  {Array.from({ length: 12 }, (_, index) => index + 1).map(
                    (installment) => (
                      <option key={installment} value={installment}>
                        {installment}x
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
          ) : null}

          {!configured ? (
            <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              Informe os códigos reais da oferta e do produto para ativar este
              checkout.
            </p>
          ) : null}

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={!configured || isSubmitting}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <LockKeyhole size={18} />
            )}
            {paymentMethod === "pix" ? "Gerar PIX" : "Pagar com cartão"}
          </button>
        </form>

        {result ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-900">
              <CheckCircle2 size={18} />
              {result.message}
            </div>
            <p className="text-sm text-emerald-900">
              Status: <strong>{result.status}</strong>
            </p>

            {result.pixCopyPaste ? (
              <div className="mt-4 grid gap-3">
                <div className="grid place-items-center rounded-md bg-white p-4">
                  <QRCodeSVG value={result.pixCopyPaste} size={176} />
                </div>
                <textarea
                  readOnly
                  value={result.pixCopyPaste}
                  className="min-h-24 rounded-md border border-emerald-200 bg-white p-3 text-xs text-slate-700"
                />
                <button
                  type="button"
                  className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-900"
                  onClick={copyPixCode}
                >
                  <Copy size={16} />
                  {copied ? "Copiado" : "Copiar código PIX"}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
