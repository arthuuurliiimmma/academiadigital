import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  // TODO: validar assinatura/origem quando a IronPay disponibilizar esse dado
  // na documentação da conta, e persistir o status da transação em banco.
  if (!payload) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  return NextResponse.json({ received: true });
}
