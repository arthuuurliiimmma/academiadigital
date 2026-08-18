# Academia Digital

Página de vendas para infoprodutos digitais com Next.js, React, TypeScript, Tailwind CSS e integração server-side com IronPay para PIX e cartão.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Dados para substituir antes de publicar

Atualize `config/store.ts`:

- `companyName`, `cnpj`, `supportEmail`, `whatsapp`, `supportHours`
- `siteUrl`
- `deliveryMethod`
- nomes, descrições, preços e entregáveis dos produtos
- `ironPay.offerHash` e `ironPay.productHash` de cada produto
- `payment.gatewayProductName`, hoje definido como `Produto Digital`, usado somente no payload da IronPay
- `payment.gatewayProductImage`, hoje definido como `/images/oferta-produto-digital.png`, usado somente no payload da IronPay

Configure variáveis de ambiente a partir de `.env.local.example`:

- `IRONPAY_API_TOKEN`: token secreto da IronPay
- `IRONPAY_API_BASE_URL`: base oficial da API pública
- `IRONPAY_PRODUCT_COVER_URL`: URL pública da imagem enviada para a IronPay
- `NEXT_PUBLIC_SITE_URL`: URL pública do site, usada em SEO e webhook

O token informado no chat não foi hardcoded no projeto. Como ele já foi compartilhado fora do painel da IronPay, considere rotacioná-lo antes de publicar.

## IronPay

A integração usa a documentação oficial da IronPay em `https://docs.ironpayapp.com.br/`.

Endpoint usado:

- `POST https://api.ironpayapp.com.br/api/public/v1/transactions?api_token=...`

Payload enviado:

- `amount` em centavos
- `offer_hash`
- `payment_method`: `pix` ou `credit_card`
- `customer`
- `card`, apenas em cartão
- `cart` com `product_hash`, `title: "Produto Digital"`, `cover`, `price`, `quantity`, `operation_type`, `tangible: false`

No site, o checkout exibe o nome e a foto reais do produto configurado. O nome `Produto Digital` e a imagem de gateway são enviados apenas para a IronPay.
- `postback_url`: `/api/webhooks/ironpay`

Para produção com cartão, valide as exigências de segurança/PCI e prefira tokenização ou checkout hospedado se a IronPay oferecer essa opção na sua conta.

## Imagens

Fotos reais usadas no site:

- Hero: Pexels, cottonbro studio, `https://www.pexels.com/photo/overhead-shot-of-a-student-listening-to-online-class-7014779/`
- Curso: Pexels, RDNE Stock project, `https://www.pexels.com/photo/man-studying-using-a-laptop-7683820/`
- E-book: Pexels, @felipepelaquim, `https://www.pexels.com/photo/book-on-a-tablet-8546475/`
- Combo: Pexels, Yan Krukau, `https://www.pexels.com/photo/man-and-woman-studying-while-writing-on-a-notebook-8199667/`
- Oferta enviada à IronPay: Wikimedia Commons, Meta Platforms logo, `https://commons.wikimedia.org/wiki/File:Meta_Platforms_logo.svg`

Pexels informa uso gratuito sem atribuição obrigatória em `https://www.pexels.com/license/`. O logotipo da Meta pode ter restrições de marca; use apenas se a oferta tiver direito de uso e não sugerir afiliação indevida.

## Revisões antes do ar

- Revisar textos legais com assessoria jurídica.
- Trocar placeholders de CNPJ, empresa e suporte.
- Configurar domínio público e `NEXT_PUBLIC_SITE_URL`.
- Configurar `IRONPAY_PRODUCT_COVER_URL` com uma URL pública acessível pela IronPay.
- Substituir hashes `SUBSTITUA_...` pelos hashes reais da IronPay.
- Confirmar webhook `/api/webhooks/ironpay` e persistência de status em banco.
- Testar PIX e cartão com valores reais/controlados antes de liberar tráfego.
