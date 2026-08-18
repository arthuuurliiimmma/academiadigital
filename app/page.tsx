import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Infinity,
  Laptop,
  LockKeyhole,
  Mail,
  MessageCircle,
  MonitorPlay,
  Phone,
  Play,
  ShieldCheck,
  Star,
  Timer
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FaqList } from "@/components/FaqList";
import { ProductCard } from "@/components/ProductCard";
import { products, storeConfig } from "@/config/store";

const faqs = [
  {
    question: "Como recebo meu acesso após a compra?",
    answer:
      "As instruções de acesso são enviadas após a confirmação do pagamento."
  },
  {
    question: "Por quanto tempo terei acesso aos conteúdos?",
    answer:
      "Os conteúdos são digitais e ficam disponíveis conforme as condições apresentadas no momento da compra."
  },
  {
    question: "Posso assistir pelo celular?",
    answer:
      "Sim, o site é responsivo e os materiais podem ser acessados em dispositivos compatíveis."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "PIX e cartão de crédito estão disponíveis no checkout."
  }
];

const heroFeatures = [
  {
    title: "Acesso imediato",
    text: "após a compra",
    icon: Timer
  },
  {
    title: "Conteúdo prático",
    text: "e direto ao ponto",
    icon: BookOpen
  },
  {
    title: "Entrega digital",
    text: "para estudar quando quiser",
    icon: Laptop
  }
];

const benefits = [
  {
    title: "Acesso vitalício",
    text: "Compre uma vez e tenha acesso para sempre aos conteúdos.",
    icon: Infinity
  },
  {
    title: "Pagamento seguro",
    text: "Ambiente protegido para garantir sua tranquilidade.",
    icon: LockKeyhole
  },
  {
    title: "Acesso em qualquer lugar",
    text: "Assista pelo computador, celular ou tablet quando quiser.",
    icon: Phone
  },
  {
    title: "Certificado incluso",
    text: "Receba certificado de conclusão nos cursos.",
    icon: Award
  }
];

const testimonials = [
  {
    text: "O curso me ajudou a organizar minha rotina e me tornar muito mais produtivo. Recomendo demais!",
    name: "Carlos M.",
    product: "Aluno do Curso Produtividade Total",
    initials: "CM"
  },
  {
    text: "O e-book é prático, direto e me ajudou a ter mais foco no que realmente importa.",
    name: "Juliana T.",
    product: "Aluna do E-book Foco e Disciplina",
    initials: "JT"
  },
  {
    text: "O combo completo vale cada centavo. Conteúdos excelentes e de fácil aplicação.",
    name: "Rafael S.",
    product: "Aluno do Combo Completo",
    initials: "RS"
  }
];

function HeroShowcase() {
  return (
    <div className="relative mx-auto h-[390px] w-full max-w-[590px] sm:h-[460px]">
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_57%_36%,rgba(215,158,56,0.52),transparent_36%)] blur-2xl" />
      <div className="absolute inset-x-0 top-[10%] h-[78%]">
        <Image
          src="/images/produto-combo-completo.png"
          alt="Combo Completo com e-books, curso e bônus digitais."
          fill
          priority
          sizes="(min-width: 1024px) 590px, 100vw"
          className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
        />
      </div>
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-amber-300">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={16} fill="currentColor" />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-white">
      <section
        id="inicio"
        className="relative isolate overflow-hidden bg-[#06101d] pt-24 text-white"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_63%_28%,rgba(218,159,55,0.28),transparent_34%),linear-gradient(135deg,#06101d_0%,#081421_47%,#030814_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="section-shell grid min-h-[640px] items-center gap-10 pb-12 lg:grid-cols-2">
          <div className="max-w-2xl space-y-7">
            <p className="text-sm font-semibold uppercase text-amber-300">
              Aprenda no seu ritmo
            </p>
            <div className="space-y-5">
              <h1 className="text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-[46px]">
                Conhecimento que
                <span className="block">transforma.</span>
                <span className="block text-amber-300">Resultados que ficam.</span>
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-200">
                Cursos e e-books desenvolvidos para quem busca aprender de
                forma prática, objetiva e alcançar novos resultados.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-amber-300/35 text-amber-300">
                      <Icon size={18} />
                    </span>
                    <p className="text-sm leading-5 text-slate-200">
                      <strong className="block font-medium text-white">
                        {feature.title}
                      </strong>
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#conteudos"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#e4b453] to-[#c8912e] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_34px_rgba(215,158,56,0.26)] transition hover:brightness-105"
              >
                Ver todos os conteúdos
                <ChevronRight size={18} />
              </Link>
              <Link
                href="#como-funciona"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-amber-300/70 px-6 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-slate-950"
              >
                <Play size={17} />
                Como funciona
              </Link>
            </div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      <section id="conteudos" className="scroll-mt-24 bg-white py-16">
        <div className="section-shell">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase text-[#bd8126]">
              Escolha seu conteúdo
            </p>
            <h2 className="mt-2 text-3xl font-medium text-[#07111f] sm:text-4xl">
              Cursos e e-books para acelerar sua evolução
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Conteúdos digitais práticos, completos e acessíveis para
              transformar seu aprendizado em resultados.
            </p>
          </div>

          <div id="cursos" className="scroll-mt-28" />
          <div id="ebooks" className="scroll-mt-28" />
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-[#f7f8fb] py-10">
        <div className="section-shell grid gap-6 md:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className={`flex gap-4 py-4 ${
                  index === 0 ? "" : "md:border-l md:border-slate-200 md:pl-8"
                }`}
              >
                <Icon className="mt-1 shrink-0 text-[#bd8126]" size={30} />
                <div>
                  <h3 className="font-medium text-[#07111f]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {benefit.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#06101d] text-white">
        <div className="section-shell grid gap-8 py-9 lg:grid-cols-[1fr_280px] lg:items-center">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase text-amber-300">
              Confiança e resultados
            </p>
            <div className="grid gap-6 sm:grid-cols-4">
              <div>
                <p className="text-4xl font-medium text-amber-300">+15.000</p>
                <p className="mt-1 text-sm text-slate-200">
                  Alunos transformados
                </p>
              </div>
              <div>
                <p className="text-4xl font-medium text-amber-300">+25</p>
                <p className="mt-1 text-sm text-slate-200">
                  Conteúdos disponíveis
                </p>
              </div>
              <div>
                <p className="text-4xl font-medium text-amber-300">98%</p>
                <p className="mt-1 text-sm text-slate-200">
                  Satisfação dos alunos
                </p>
              </div>
              <div>
                <p className="text-4xl font-medium text-amber-300">4.9/5</p>
                <Stars />
                <p className="mt-1 text-sm text-slate-200">Avaliação média</p>
              </div>
            </div>
          </div>
          <div className="relative hidden h-48 overflow-hidden rounded-lg lg:block">
            <Image
              src="/images/hero-online-class.jpg"
              alt="Mesa de estudos com aula online em notebook."
              fill
              sizes="280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06101d] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section id="depoimentos" className="scroll-mt-24 bg-white py-16">
        <div className="section-shell">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase text-[#bd8126]">
              Depoimentos
            </p>
            <h2 className="mt-2 text-3xl font-medium text-[#07111f]">
              O que nossos alunos dizem
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Histórias de pessoas que transformaram seus resultados com nossos
              conteúdos.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-lg border border-white/10 bg-[#07111f] p-6 text-white shadow-[0_18px_42px_rgba(5,13,25,0.18)]"
              >
                <Stars />
                <p className="mt-4 text-sm leading-6 text-slate-100">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-amber-300 text-sm font-semibold text-slate-950">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-slate-300">
                      {testimonial.product}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="duvidas" className="scroll-mt-24 bg-[#f7f8fb] py-16">
        <div className="section-shell">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase text-[#bd8126]">
              Dúvidas frequentes
            </p>
            <h2 className="mt-2 text-3xl font-medium text-[#07111f]">
              Perguntas frequentes
            </h2>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <FaqList items={faqs} />

            <aside className="rounded-lg border border-white/10 bg-[#07111f] p-8 text-center text-white shadow-[0_18px_42px_rgba(5,13,25,0.18)]">
              <Headphones className="mx-auto text-amber-300" size={46} />
              <h3 className="mt-4 text-2xl font-medium">Ainda tem dúvidas?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Nossa equipe está pronta para ajudar você.
              </p>
              <Link
                href="/suporte"
                className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#e4b453] to-[#c8912e] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
              >
                Falar com o suporte
                <MessageCircle size={18} />
              </Link>
              <div className="mt-5 grid gap-2 text-sm text-slate-300">
                <p className="inline-flex items-center justify-center gap-2">
                  <Mail size={16} className="text-amber-300" />
                  {storeConfig.supportEmail}
                </p>
                <p className="inline-flex items-center justify-center gap-2">
                  <ShieldCheck size={16} className="text-amber-300" />
                  Conteúdos digitais com entrega digital
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="section-shell grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-[0_14px_38px_rgba(15,23,42,0.06)] md:grid-cols-3">
          <div className="flex gap-3">
            <MonitorPlay className="shrink-0 text-[#bd8126]" size={25} />
            <div>
              <h3 className="font-medium text-[#07111f]">Conteúdo digital</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Acesso online aos materiais adquiridos.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="shrink-0 text-[#bd8126]" size={25} />
            <div>
              <h3 className="font-medium text-[#07111f]">Compra objetiva</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Escolha o conteúdo, preencha os dados e finalize.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ShieldCheck className="shrink-0 text-[#bd8126]" size={25} />
            <div>
              <h3 className="font-medium text-[#07111f]">Ambiente protegido</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Pagamentos processados em ambiente seguro.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
