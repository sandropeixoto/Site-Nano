<div align="center">
  <img src="https://nano.net.br/assets/programacao-DzAvORjU.png" width="50" alt="Logo NANO" />
  
  # NANO
  
  ### TECNOLOGIA SOB MEDIDA
</div>

# Site-Nano

## Visão Geral

Site institucional moderno em TypeScript com SPA (Vite) e um módulo administrativo (painel) para gerenciamento de portfólio e usuários. Resolve a necessidade de um site leve e editável sem exigir um backend customizado — a persistência e identidade são delegadas a um BaaS (Appwrite).

- Objetivo principal: fornecer um site responsivo e um painel administrativo integrado para publicar e gerenciar portfólios.
- Público-alvo: agências, estúdios e equipes que precisam de presença digital profissional com um CMS leve.

---

## Funcionalidades Principais

> Página pública com navegação e seção de portfólio

> Painel administrativo (Dashboard) com CRUD de portfólios

> Autenticação e fluxo de recuperação de senha (módulo de login/recovery)

> Formulário de contato integrado com proxy de e-mail

> Gerenciamento de usuários no painel administrativo

---

## Stack Técnica

| Categoria | Tecnologia |
|---|---|
| Frontend | TypeScript (React, TSX) |
| Framework / Bundler | Vite (`vite.config.ts`) |
| UI / Estilos | Tailwind CSS (`tailwind.config.js`) + PostCSS (`postcss.config.js`) |
| Estado / Context | React Context + Hooks (`src/admin/context`, `src/admin/hooks`) |
| Backend / BaaS | Appwrite (client em `src/lib/appwrite.ts`) |
| Autenticação | Implementação via Appwrite + AuthContext (`src/admin/context/AuthContext.tsx`) |
| APIs | Appwrite SDK; proxy de e-mail externo identificado em `src/App.tsx` |
| Lint / Qualidade | ESLint (`eslint.config.js`) |
| TypeScript | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| Deploy | Vercel (`vercel.json`) — `public/_redirects` compatível com Netlify |
| Build | Vite + tsc (`npm run build` executa `tsc -b && vite build`) |

---

## Arquitetura do Projeto

Organização principal

- src/
  - admin/ — módulo administrativo (pages, components, context, hooks)
  - lib/ — integrações externas e clientes (ex.: `appwrite.ts`)
  - App.tsx — shell da aplicação, rotas públicas e rota para `/admin/*` que carrega o módulo admin sob demanda
  - main.tsx — ponto de entrada (BrowserRouter com `basename` controlado por `import.meta.env.BASE_URL`)
  - estilos globais (`index.css`, `App.css`)
- public/ — ativos estáticos (favicon, icons.svg, 404.html, `_redirects`)
- configuração: `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`, arquivos TypeScript

Separação de responsabilidades

- Apresentação (público) e administração (privada) estão fisicamente separadas em pastas, o que facilita a manutenção e futura extração em micro-frontends.
- Integrações com serviços externos são centralizadas em `src/lib/` (ex.: `appwrite.ts`).
- Autenticação é gerida por React Context e consumida via hooks (`useAuth.ts`) nas páginas administrativas.

Fluxo de execução

1. `main.tsx` inicializa o router e carrega `App`.
2. `App.tsx` expõe rotas públicas (home, seções) e uma rota para `/admin/*` que faz lazy-load do módulo administrativo.
3. O módulo admin consome `account`, `databases` e `storage` exportados por `src/lib/appwrite.ts` para operações de autenticação e CRUD.
4. A listagem de portfólios usa `databases.listDocuments(...)` (ver `src/App.tsx`) e ordenação via Query do Appwrite.

Padrões identificados

- SPA com lazy-loading do painel administrativo
- Cliente BaaS (Appwrite) para reduzir necessidade de backend customizado
- React Context + custom hooks para gerenciamento de autenticação e estado local

---

## Instalação e Execução

Pré-requisitos

- Node.js LTS (recomenda-se >=16)
- npm (ou yarn/pnpm)
- Variáveis de ambiente definidas (ver seção abaixo)

Instalação

```bash
git clone https://github.com/sandropeixoto/Site-Nano.git
cd Site-Nano
npm install
```

Scripts (conforme `package.json`)

```bash
npm run dev     # inicia Vite em modo desenvolvimento
npm run build   # executa tsc -b && vite build -> gera assets de produção
npm run preview # preview da build local (vite preview)
npm run lint    # executa eslint .
```

Variáveis de ambiente relevantes

- VITE_APPWRITE_ENDPOINT — URL do endpoint Appwrite (ex.: https://cloud.appwrite.io/v1)
- VITE_APPWRITE_PROJECT_ID — ID do projeto Appwrite
- VITE_APPWRITE_DATABASE_ID — ID do banco (utilizado em `APPWRITE_CONFIG.databaseId`)
- VITE_APPWRITE_COLLECTION_ID — ID da coleção de portfólios
- VITE_APPWRITE_BUCKET_ID — ID do bucket de storage (imagens/uploads)
- BASE_URL / VITE_BASE_URL — (opcional) `BASE_URL` usado pelo router (controlado pelo Vite)

Observação: variáveis públicas expostas ao cliente devem começar com `VITE_`. Nunca comitar chaves secretas.

Execução em desenvolvimento

```bash
npm run dev
# abrir http://localhost:5173 (porta padrão Vite)
```

Build para produção

```bash
npm run build
# publicar conteúdo da pasta dist/ no provedor de hospedagem (Vercel/Netlify/Cloud Storage)
```

---

## Scripts Disponíveis (documentado)

| Script | Descrição |
|---|---|
| dev | Inicializa servidor de desenvolvimento (Vite) |
| build | Compila TypeScript (`tsc -b`) e gera build otimizado com Vite |
| preview | Serve a build localmente para verificação |
| lint | Executa ESLint em todo o projeto |

(Ver `package.json` na raiz para checar versões e dependências exatas.)

---

## Estrutura de Pastas (resumida)

```text
.
├─ public/                # ativos estáticos (favicon, icons, 404, _redirects)
├─ src/
│  ├─ admin/              # painel administrativo (components, context, hooks, pages)
│  ├─ lib/                # integracoes (appwrite.ts)
│  ├─ App.tsx             # rotas públicas + lazy-load do admin
│  ├─ main.tsx            # entrypoint (BrowserRouter)
│  ├─ index.css
│  └─ App.css
├─ index.html
├─ vite.config.ts
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig*.json
├─ eslint.config.js
├─ package.json
└─ vercel.json
```

---

## Deploy

Detectado: `vercel.json` e `public/_redirects`.

Opções de hospedagem identificadas

- Vercel: `vercel.json` presente, fluxo de deploy simples via integração com GitHub (build: `npm run build`).
- Netlify: `public/_redirects` compatível com redirects para SPA; pode usar build command `npm run build` e publicar `dist/`.
- CDN/Storage: gerar `dist/` e publicar em S3+CloudFront ou similar.

Recomendações mínimas para deploy em Vercel

1. Configurar variáveis de ambiente no painel do Vercel (VITE_APPWRITE_*)
2. Definir comando de build: `npm run build`
3. Publicar

CI/CD

- O repositório contém `.github/` — recomendo adicionar um workflow que execute `npm ci`, `npm run lint`, `npm run build` em pushes para `main` e crie uma action para deploy (se não usar integração direta do provedor).

---

## Integrações Observadas

- Appwrite: client configurado em `src/lib/appwrite.ts`. Responsável por Account, Databases e Storage.
- Proxy de envio de e-mail: `API_URL` apontando para `https://mail-proxy-has46dauxa-rj.a.run.app` (utilizado no formulário de contato em `src/App.tsx`).
- Vercel: `vercel.json` presente para configuração de hosting.

---

## Considerações Técnicas

- Tipagem e segurança: o uso de TypeScript melhora manutenção e previne regressões. Verificar regras de permissão do Appwrite para proteger operações de escrita.
- Modularização: `admin` isolado facilita testes e implantação independente.
- Performance: Vite oferece build rápido e otimizações (code-splitting). Utilizar cache e CDN para assets estáticos.
- Segurança: não expor chaves privadas no bundle; usar regras do Appwrite para controle de acesso; habilitar HTTPS e CORS adequados.
- Observabilidade: integrar Sentry/monitoramento front para captura de erros em produção.

---

## Pontos de Verificação Antes de Produção

- Confirmar que nenhum secret está em `.env` com commit.
- Validar regras de permissão das collections Appwrite (CRUD) e buckets de storage.
- Testar envio de contato via proxy e tratar respostas de erro.
- Configurar política de cache e compressão no provedor de hosting.

---

## Referências Rápidas (arquivos chave)

- `src/App.tsx` — renderização da homepage, portfolio e integração com Appwrite
- `src/lib/appwrite.ts` — client Appwrite e variáveis necessárias
- `src/admin/` — painel administrativo (Login, Dashboard, PortfolioForm, PortfolioList, UserList)
- `vite.config.ts`, `tailwind.config.js`, `postcss.config.js` — configuração de build e estilos
- `package.json` — scripts e dependências
- `vercel.json`, `public/_redirects` — configurações de deploy

---

## 🚀 Desenvolvido por

> **Sandro Peixoto**  
> https://www.sandropeixoto.com.br
>
> **NANO**  
> https://nano.net.br

---
