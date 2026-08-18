import { isIronPayConfigured, storeConfig, type Product } from "@/config/store";
import type {
  CheckoutCustomer,
  CreatePaymentRequest,
  CreatePaymentResult
} from "@/services/payment";

type IronPayResponse = {
  id?: number | string;
  hash?: string;
  transaction?: string;
  payment_method?: "pix" | "credit_card";
  payment_status?: string;
  status?: string;
  pix?: {
    pix_url?: string | null;
    pix_qr_code?: string | null;
  } | null;
  billet?: {
    url?: string | null;
    billet_url?: string | null;
  } | null;
  amount?: number;
  amount_total?: number;
  data?: IronPayResponse;
  message?: string;
  error?: string;
  errors?: unknown;
};

export class PaymentGatewayError extends Error {
  statusCode: number;
  safeMessage: string;

  constructor(statusCode: number, safeMessage: string) {
    super(safeMessage);
    this.name = "PaymentGatewayError";
    this.statusCode = statusCode;
    this.safeMessage = safeMessage;
  }
}

const DEFAULT_API_BASE_URL = storeConfig.payment.apiBaseUrl;

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function normalizeOptional(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeCustomer(customer: CheckoutCustomer) {
  return {
    name: customer.name.trim(),
    email: customer.email.trim().toLowerCase(),
    phone_number: onlyDigits(customer.phone_number),
    document: onlyDigits(customer.document),
    street_name: normalizeOptional(customer.street_name),
    number: normalizeOptional(customer.number),
    complement: normalizeOptional(customer.complement),
    neighborhood: normalizeOptional(customer.neighborhood),
    city: normalizeOptional(customer.city),
    state: normalizeOptional(customer.state)?.toUpperCase(),
    zip_code: customer.zip_code ? onlyDigits(customer.zip_code) : undefined
  };
}

function validateCustomer(customer: ReturnType<typeof normalizeCustomer>) {
  if (!customer.name || !customer.email || !customer.phone_number || !customer.document) {
    throw new PaymentGatewayError(
      400,
      "Preencha nome, e-mail, telefone e CPF/CNPJ para continuar."
    );
  }
}

function getToken() {
  const token = process.env.IRONPAY_API_TOKEN?.trim();

  if (!token) {
    throw new PaymentGatewayError(
      503,
      "Configuração de pagamento não finalizada no servidor."
    );
  }

  return token;
}

function getApiBaseUrl() {
  return (
    process.env.IRONPAY_API_BASE_URL?.trim() ||
    DEFAULT_API_BASE_URL
  ).replace(/\/$/, "");
}

function buildPostbackUrl(origin: string) {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || origin.replace(/\/$/, "");

  return `${configuredSiteUrl.replace(/\/$/, "")}${storeConfig.payment.postbackPath}`;
}

function buildGatewayCoverUrl(origin: string) {
  const explicitCover = process.env.IRONPAY_PRODUCT_COVER_URL?.trim();

  if (explicitCover) {
    return explicitCover;
  }

  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || origin.replace(/\/$/, "");

  return new URL(storeConfig.payment.gatewayProductImage, configuredSiteUrl).toString();
}

function mapGatewayError(statusCode: number, body: IronPayResponse | string) {
  if (typeof body === "string") {
    return body || "Não foi possível criar a transação agora.";
  }

  if (statusCode === 401) {
    return "Pagamento indisponível no momento. Tente novamente mais tarde.";
  }

  if (statusCode === 422) {
    return "Revise os dados do cliente e do pagamento antes de continuar.";
  }

  return "Não foi possível criar a transação agora.";
}

function normalizeGatewayResponse(
  product: Product,
  paymentMethod: "pix" | "credit_card",
  response: IronPayResponse
): CreatePaymentResult {
  const transaction = response.data ?? response;
  const transactionHash =
    transaction.hash ?? (transaction.transaction ? String(transaction.transaction) : null);
  const paymentId =
    transaction.id !== undefined
      ? String(transaction.id)
      : transaction.transaction
        ? String(transaction.transaction)
        : transactionHash;
  const pixCopyPaste = transaction.pix?.pix_qr_code ?? null;
  const checkoutUrl =
    transaction.pix?.pix_url ??
    transaction.billet?.url ??
    transaction.billet?.billet_url ??
    null;

  return {
    paymentId,
    transactionHash,
    status: transaction.payment_status ?? transaction.status ?? "pending",
    paymentMethod,
    amountInCents: transaction.amount_total ?? transaction.amount ?? product.priceInCents,
    checkoutUrl,
    qrCode: pixCopyPaste,
    pixCopyPaste,
    message:
      paymentMethod === "pix"
        ? "PIX gerado com sucesso."
        : "Transação de cartão enviada para processamento."
  };
}

export async function createPayment(
  product: Product,
  request: CreatePaymentRequest,
  origin: string
): Promise<CreatePaymentResult> {
  if (!isIronPayConfigured(product)) {
    throw new PaymentGatewayError(
      503,
      "Informe os códigos reais da oferta e do produto para ativar este checkout."
    );
  }

  const token = getToken();
  const customer = normalizeCustomer(request.customer);
  validateCustomer(customer);

  const installments =
    request.paymentMethod === "credit_card"
      ? Math.max(1, Number(request.installments ?? 1))
      : 1;

  if (request.paymentMethod === "credit_card" && !request.card) {
    throw new PaymentGatewayError(400, "Informe os dados do cartão.");
  }

  const payload = {
    amount: product.priceInCents,
    offer_hash: product.ironPay.offerHash,
    payment_method: request.paymentMethod,
    card:
      request.paymentMethod === "credit_card" && request.card
        ? {
            number: request.card.number.replace(/\s/g, ""),
            holder_name: request.card.holder_name.trim(),
            exp_month: Number(request.card.exp_month),
            exp_year: Number(request.card.exp_year),
            cvv: request.card.cvv.trim()
          }
        : undefined,
    customer,
    cart: [
      {
        product_hash: product.ironPay.productHash,
        title: storeConfig.payment.gatewayProductName,
        cover: buildGatewayCoverUrl(origin),
        price: product.priceInCents,
        quantity: 1,
        operation_type: 1,
        tangible: false
      }
    ],
    installments,
    expire_in_days: 1,
    transaction_origin: "api",
    tracking: request.tracking ?? {},
    postback_url: buildPostbackUrl(origin)
  };

  const endpoint = new URL(`${getApiBaseUrl()}/transactions`);
  endpoint.searchParams.set("api_token", token);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  const contentType = response.headers.get("content-type");
  const body = contentType?.includes("application/json")
    ? ((await response.json()) as IronPayResponse)
    : await response.text();

  if (!response.ok) {
    throw new PaymentGatewayError(
      response.status,
      mapGatewayError(response.status, body)
    );
  }

  return normalizeGatewayResponse(
    product,
    request.paymentMethod,
    body as IronPayResponse
  );
}
