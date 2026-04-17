import { motion } from "framer-motion";
import logoImg from "./assets/programacao.png";
import {
  Rocket,
  Smartphone,
  Globe,
  BarChart3,
  Mail,
  CheckCircle2,
  Clock,
  Trophy
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3 border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-premium-emerald to-premium-cyan rounded-lg flex items-center justify-center overflow-hidden p-1">
          <img src={logoImg} alt="N" className="w-full h-full object-contain" />
        </div>
        <span className="text-xl font-bold text-white tracking-tighter">NANO</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#inicio" className="hover:text-premium-emerald transition-colors">Início</a>
        <a href="#servicos" className="hover:text-premium-emerald transition-colors">Serviços</a>
        {/*<a href="#quem-somos" className="hover:text-premium-emerald transition-colors">Quem Somos</a>*/}
        <a href="#contato" className="btn-premium py-2 px-6 text-xs">Falar com Especialista</a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="inicio" className="relative flex items-center justify-center pt-40 pb-20 overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-premium-emerald/10 blur-[120px] rounded-full" />
    <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-premium-cyan/10 blur-[120px] rounded-full" />

    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="px-4 py-1.5 rounded-full border border-premium-emerald/30 bg-premium-emerald/5 text-premium-emerald text-sm font-medium mb-6 inline-block">
          14 anos transformando o digital
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Soluções Tecnológicas <br />
          <span className="text-gradient">Sob Medida</span> para o seu Negócio
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Transformamos desafios em oportunidades reais através de expertise em desenvolvimento
          web, mobile e consultoria estratégica de alto nível.
        </p>
        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-premium w-full sm:w-auto">
            Iniciar meu Projeto
          </button>
          <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-semibold w-full sm:w-auto">
            Ver Cases de Sucesso
          </button>
        </div> */}
      </motion.div>
    </div>
  </section>
);

const Metrics = () => {
  const metrics = [
    { label: "Projetos Entregues", value: "200+", icon: Rocket },
    { label: "Satisfação dos Clientes", value: "98%", icon: Trophy },
    { label: "Setores Atendidos", value: "15+", icon: Globe },
    { label: "Anos de Experiência", value: "14", icon: Clock },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center border-white/5"
            >
              <div className="w-10 h-10 bg-premium-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-premium-emerald" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-sm text-slate-400">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Desenvolvimento Web",
      description: "Plataformas complexas, e-commerces de alta performance e sistemas internos escaláveis.",
      icon: Globe,
      features: ["React/Next.js", "Node.js", "Arquitetura Cloud"]
    },
    {
      title: "Aplicativos Mobile",
      description: "Experiências nativas e híbridas fluidas para iOS e Android com foco em UX.",
      icon: Smartphone,
      features: ["React Native", "Flutter", "Design Mobile-First"]
    },
    {
      title: "Consultoria Tech",
      description: "Diagnóstico e estratégia personalizada para a transformação digital da sua empresa.",
      icon: BarChart3,
      features: ["Arquitetura", "Metodologia Ágil", "Escalabilidade"]
    }
  ];

  return (
    <section id="servicos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Nossa Expertise</h2>
          <p className="text-slate-400">Desenvolvemos o futuro do seu negócio hoje.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card glass-card-hover p-8 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <service.icon className="w-32 h-32" />
              </div>

              <div className="w-14 h-14 bg-gradient-to-br from-premium-emerald/20 to-premium-cyan/20 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-premium-emerald" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3">
                {service.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-premium-emerald" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* <button className="mt-8 flex items-center gap-2 text-premium-emerald font-semibold group-hover:gap-4 transition-all">
                Saiba mais <ChevronRight className="w-4 h-4" />
              </button> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z.string().min(14, "O telefone deve ser válido").regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres")
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const phoneMask = (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    return value.substring(0, 15);
  };

  const API_URL = 'https://mail-proxy-has46dauxa-rj.a.run.app';

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');

    try {
      const emailBody = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px; border: 1px solid #1a1a1a;">
          <div style="margin-bottom: 30px; text-align: center;">
            <h1 style="color: #10b981; margin: 0; font-size: 24px; letter-spacing: -1px;">NANO</h1>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">Novo contato via site</p>
          </div>
          
          <div style="background-color: #161616; padding: 25px; border-radius: 15px; margin-bottom: 25px;">
            <div style="margin-bottom: 20px;">
              <label style="color: #10b981; font-size: 12px; font-weight: bold; text-transform: uppercase;">Nome</label>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #f8fafc;">${data.name}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="color: #10b981; font-size: 12px; font-weight: bold; text-transform: uppercase;">E-mail</label>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #f8fafc;">${data.email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <label style="color: #10b981; font-size: 12px; font-weight: bold; text-transform: uppercase;">Telefone</label>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #f8fafc;">${data.phone}</p>
            </div>
            
            <div>
              <label style="color: #10b981; font-size: 12px; font-weight: bold; text-transform: uppercase;">Mensagem</label>
              <p style="margin: 5px 0 0 0; font-size: 16px; color: #f8fafc; line-height: 1.6;">${data.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; color: #475569; font-size: 12px;">
            <p>© 2026 Nano Soluções Tecnológicas. Enviado via formulário do site.</p>
          </div>
        </div>
      `;

      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          subject: 'Novo contato via site NANO',
          html: emailBody
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao enviar e-mail');
      }

      setStatus('success');
      reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-20 bg-black/30">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Vamos escalar sua ideia?</h2>
        <p className="text-slate-400 mb-10">
          Nossa equipe de especialistas está pronta para analisar seu projeto e propor a melhor solução técnica.
        </p>

        <div className="glass-card p-8 text-left border-white/5">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Nome</label>
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors`}
                  placeholder="Seu nome"
                  disabled={status === 'loading'}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">E-mail</label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors`}
                  placeholder="contato@empresa.com"
                  disabled={status === 'loading'}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Telefone</label>
              <input
                type="text"
                {...register('phone')}
                onChange={(e) => {
                  e.target.value = phoneMask(e.target.value);
                  register('phone').onChange(e);
                }}
                className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors`}
                placeholder="(99) 99999-9999"
                disabled={status === 'loading'}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Sua Mensagem</label>
              <textarea
                rows={4}
                {...register('message')}
                className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors`}
                placeholder="Descreva seu desafio tecnológico..."
                disabled={status === 'loading'}
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            {status === 'success' && (
              <div className="p-4 bg-premium-emerald/10 border border-premium-emerald/20 rounded-xl text-premium-emerald text-sm text-center">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.
              </div>
            )}

            <button
              type="submit"
              className="btn-premium w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={status === 'loading'}
            >
              <Mail className="w-5 h-5" />
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>

        <div className="mt-12 text-slate-500 text-sm">
          Ou envie um e-mail direto para: <span className="text-white">contato@nano.net.br</span>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-premium-emerald to-premium-cyan rounded flex items-center justify-center overflow-hidden p-[2px]">
          <img src={logoImg} alt="N" className="w-full h-full object-contain" />
        </div>
        <span className="font-bold text-white tracking-tighter">NANO</span>
      </div>
      <div className="text-sm text-slate-500">
        © 2026 Nano Soluções Tecnológicas. Todos os direitos reservados.
      </div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-premium-emerald/30 selection:text-white">
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
