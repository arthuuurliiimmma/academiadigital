export type PaymentMethod = "pix" | "credit_card";

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone_number: string;
  document: string;
  street_name?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip_code?: string;
};

export type CheckoutCard = {
  number: string;
  holder_name: string;
  exp_month: number;
  exp_year: number;
  cvv: string;
};

export type CheckoutTracking = {
  src?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
};

export type CreatePaymentRequest = {
  productId: string;
  paymentMethod: PaymentMethod;
  customer: CheckoutCustomer;
  card?: CheckoutCard;
  installments?: number;
  tracking?: CheckoutTracking;
};

export type CreatePaymentResult = {
  paymentId: string | null;
  transactionHash: string | null;
  status: string;
  paymentMethod: PaymentMethod;
  amountInCents: number;
  checkoutUrl: string | null;
  qrCode: string | null;
  pixCopyPaste: string | null;
  message: string;
};

export async function startCheckout(
  request: CreatePaymentRequest
): Promise<CreatePaymentResult> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  const payload = (await response.json()) as
    | CreatePaymentResult
    | { error: string };

  if (!response.ok) {
    throw new Error("error" in payload ? payload.error : "Falha ao iniciar pagamento.");
  }

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
