import { NextResponse } from "next/server";

import { getProductById } from "@/config/store";
import { createPayment, PaymentGatewayError } from "@/services/ironpay";
import type { CreatePaymentRequest } from "@/services/payment";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: CreatePaymentRequest;

  try {
    payload = (await request.json()) as CreatePaymentRequest;
  } catch {
    return NextResponse.json(
      { error: "Envie os dados do checkout em JSON válido." },
      { status: 400 }
    );
  }

  const product = getProductById(payload.productId);

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado." },
      { status: 404 }
    );
  }

  if (payload.paymentMethod !== "pix" && payload.paymentMethod !== "credit_card") {
    return NextResponse.json(
      { error: "Forma de pagamento inválida." },
      { status: 400 }
    );
  }

  try {
    const origin = new URL(request.url).origin;
    const payment = await createPayment(product, payload, origin);

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    if (error instanceof PaymentGatewayError) {
      return NextResponse.json(
        { error: error.safeMessage },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: "Erro inesperado ao iniciar o pagamento." },
      { status: 500 }
    );
  }
}
