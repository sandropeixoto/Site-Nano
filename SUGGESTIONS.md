# 🚀 Sugestões de Melhoria - Nano Premium Landing Page

Baseado na auditoria do **Site-Visual-Moderno Standard**, aqui estão as sugestões para elevar a qualidade do projeto:

## 💎 Design & UI
- **Micro-interações:** Adicionar efeitos de "Magnetic Button" nos botões principais para uma sensação mais tátil.
- **Scroll Suave:** Implementar o `Lenis Scroll` para uma experiência de navegação cinematográfica.
- **Dark Mode Persistence:** Embora o site seja nativamente Dark, adicionar um toggle para "Oled Mode" (Pure Black) pode atrair usuários de dispositivos móveis com tela AMOLED.
- **Bento Grid:** Refatorar a seção de serviços ou cases para um layout estilo "Bento Grid" (cards de tamanhos variados) para um visual mais moderno.

## ⚡ Performance & SEO
- **PWA:** Configurar como Progressive Web App para instalação direta no mobile.
- **Imagens WebP:** Garantir que todos os futuros assets de imagem estejam no formato WebP/Avif.
- **Open Graph:** Implementar tags OG para previews incríveis no WhatsApp/LinkedIn.

## 🛠️ Tech Debt & Próximos Passos
- **Componentização:** Extrair os componentes do `App.tsx` para arquivos individuais na pasta `src/components/`.
- **Validação:** Adicionar `Zod` + `React Hook Form` no formulário de contato para melhor UX de erro.
- **Internacionalização:** Preparar o projeto para i18n (Português/Inglês), dado o nível das soluções da Nano.

## 🛡️ Segurança
- **[CONCLUÍDO] API Key Proxy:** A lógica de envio de e-mail foi movida para um proxy seguro no Cloud Run. A chave agora está protegida no backend.
- **Honeypot:** Adicionar um campo oculto no formulário para evitar spam de bots.

---
*Gerado por site-premium-enhancer*
