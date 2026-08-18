export type DeliveryMethod =
  | "e-mail"
  | "area-de-membros"
  | "download"
  | "plataforma-externa";

export type ProductType = "curso" | "ebook" | "combo";

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  type: ProductType;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  imageAlt: string;
  imageCredit: {
    author: string;
    sourceUrl: string;
    licenseUrl: string;
  };
  priceInCents: number;
  priceLabel: string;
  installmentLabel: string;
  badgeLabel: string;
  buttonLabel: string;
  contents: string[];
  deliverables: string[];
  paymentMethods: string[];
  faq: ProductFaq[];
  ironPay: {
    offerHash: string;
    productHash: string;
  };
};

export const storeConfig = {
  storeName: "Academia Digital",
  companyName: "Academia Digital",
  cnpj: "00.000.000/0000-00",
  supportEmail: "atendimento.suportewp@gmail.com",
  whatsapp: "(62) 99935-9596",
  supportHours: "Segunda a sexta, das 9h às 18h",
  currency: "BRL",
  siteUrl: "https://www.seudominio.com.br",
  deliveryMethod: "e-mail" as DeliveryMethod,
  refundPolicySummary:
    "Solicitações de cancelamento ou reembolso são analisadas conforme as condições apresentadas no momento da compra e a legislação aplicável.",
  payment: {
    provider: "IronPay",
    apiBaseUrl: "https://api.ironpayapp.com.br/api/public/v1",
    postbackPath: "/api/webhooks/ironpay",
    gatewayProductName: "Produto Digital",
    gatewayProductImage: "/images/oferta-produto-digital.png",
    gatewayProductImageCredit: {
      author: "Meta Platforms",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Meta_Platforms_logo.svg",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Meta_Platforms_logo.svg#Licensing"
    }
  },
  products: [
    {
      id: "ebook-foco-disciplina",
      slug: "ebook-foco-disciplina",
      type: "ebook",
      name: "E-book Foco e Disciplina",
      description:
        "Um guia prático para desenvolver foco, criar hábitos e alcançar seus objetivos.",
      longDescription:
        "Um e-book direto ao ponto para organizar sua rotina, reduzir distrações e transformar metas em ações simples de acompanhar no dia a dia.",
      image: "/images/produto-ebook-foco-disciplina.png",
      imageAlt: "Mockup do e-book Foco e Disciplina em livro, tablet e celular.",
      imageCredit: {
        author: "Academia Digital",
        sourceUrl: "Imagem enviada pelo cliente",
        licenseUrl: "Uso autorizado pelo cliente"
      },
      priceInCents: 1999,
      priceLabel: "R$ 19,99",
      installmentLabel: "ou 2x de R$ 10,52",
      badgeLabel: "MAIS ACESSÍVEL",
      buttonLabel: "Quero este e-book",
      contents: [
        "Capítulos objetivos para leitura rápida",
        "Exercícios simples de organização pessoal",
        "Checklist para montar sua rotina de foco"
      ],
      deliverables: [
        "E-book em PDF",
        "Acesso imediato",
        "Leitura rápida e objetiva"
      ],
      paymentMethods: ["PIX", "Cartão de crédito"],
      faq: [
        {
          question: "Como recebo o e-book?",
          answer:
            "As instruções de acesso são enviadas após a confirmação do pagamento."
        },
        {
          question: "Posso ler pelo celular?",
          answer:
            "Sim, o material digital pode ser acessado em dispositivos compatíveis."
        }
      ],
      ironPay: {
        offerHash: "admrg",
        productHash: "vbhpui9riv"
      }
    },
    {
      id: "curso-produtividade-total",
      slug: "curso-produtividade-total",
      type: "curso",
      name: "Curso Produtividade Total",
      description:
        "Aprenda técnicas e métodos para produzir mais, organizar sua rotina e ter mais tempo livre.",
      longDescription:
        "Um curso digital para criar um sistema simples de produtividade, acompanhar tarefas importantes e manter constância sem depender de motivação.",
      image: "/images/produto-curso-produtividade-total.png",
      imageAlt: "Mockup do Curso Produtividade Total em notebook e celular.",
      imageCredit: {
        author: "Academia Digital",
        sourceUrl: "Imagem enviada pelo cliente",
        licenseUrl: "Uso autorizado pelo cliente"
      },
      priceInCents: 4999,
      priceLabel: "R$ 49,99",
      installmentLabel: "ou 5x de R$ 10,62",
      badgeLabel: "MAIS VENDIDO",
      buttonLabel: "Quero este curso",
      contents: [
        "Aulas em vídeo para assistir no seu ritmo",
        "Métodos práticos de priorização",
        "Materiais para acompanhar sua evolução"
      ],
      deliverables: [
        "Aulas em vídeo",
        "Materiais complementares",
        "Certificado de conclusão"
      ],
      paymentMethods: ["PIX", "Cartão de crédito"],
      faq: [
        {
          question: "Quando recebo meu acesso?",
          answer: "Após a confirmação do pagamento."
        },
        {
          question: "O curso tem acesso pelo celular?",
          answer:
            "Sim, o site é responsivo e os conteúdos podem ser acessados em dispositivos compatíveis."
        }
      ],
      ironPay: {
        offerHash: "admrg",
        productHash: "vbhpui9riv"
      }
    },
    {
      id: "combo-completo",
      slug: "combo-completo",
      type: "combo",
      name: "Combo Completo",
      description:
        "E-book Foco e Disciplina + Curso Produtividade Total com condições especiais.",
      longDescription:
        "Uma opção completa para quem quer combinar aulas em vídeo, material de leitura e bônus de apoio para estudar com mais clareza.",
      image: "/images/produto-combo-completo.png",
      imageAlt: "Mockup do Combo Completo com e-books, curso e bônus digitais.",
      imageCredit: {
        author: "Academia Digital",
        sourceUrl: "Imagem enviada pelo cliente",
        licenseUrl: "Uso autorizado pelo cliente"
      },
      priceInCents: 6999,
      priceLabel: "R$ 69,99",
      installmentLabel: "ou 7x de R$ 10,64",
      badgeLabel: "MELHOR CUSTO-BENEFÍCIO",
      buttonLabel: "Quero o combo completo",
      contents: [
        "Curso Produtividade Total completo",
        "E-book Foco e Disciplina",
        "Materiais extras e bônus digitais"
      ],
      deliverables: [
        "Acesso aos 2 produtos",
        "Bônus exclusivos",
        "Certificado de conclusão"
      ],
      paymentMethods: ["PIX", "Cartão de crédito"],
      faq: [
        {
          question: "O acesso aos dois materiais é enviado junto?",
          answer:
            "Após a confirmação do pagamento, as instruções são enviadas conforme o método de entrega configurado."
        },
        {
          question: "Há suporte para dúvidas de acesso?",
          answer: "Sim, pelos canais informados na página de suporte."
        }
      ],
      ironPay: {
        offerHash: "admrg",
        productHash: "vbhpui9riv"
      }
    }
  ] satisfies Product[]
};

export const products = storeConfig.products;

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function isIronPayConfigured(product: Product) {
  return (
    Boolean(product.ironPay.offerHash) &&
    Boolean(product.ironPay.productHash) &&
    !product.ironPay.offerHash.startsWith("SUBSTITUA_") &&
    !product.ironPay.productHash.startsWith("SUBSTITUA_")
  );
}
