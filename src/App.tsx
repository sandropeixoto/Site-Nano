import { motion, AnimatePresence } from "framer-motion";
import logoImg from "./assets/programacao.png";
import { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Rocket,
  Smartphone,
  Globe,
  BarChart3,
  Mail,
  CheckCircle2,
  Clock,
  Trophy,
  ExternalLink,
  Loader2
} from "lucide-react";
import { databases, APPWRITE_CONFIG } from "./lib/appwrite";
import { Query } from "appwrite";

// Lazy loaded Admin Module
const AdminModule = lazy(() => import("./admin/AdminModule"));

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
        <a href="#portfolio" className="hover:text-premium-emerald transition-colors">Portfólio</a>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface Project {
  $id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

const Portfolio = () => {
  type Category = 'all' | 'websites' | 'solutions' | 'microsaas';
  
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await databases.listDocuments(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collectionId,
          [Query.orderDesc("$createdAt")]
        );
        setProjects(response.documents as unknown as Project[]);
      } catch (error) {
        console.error("Erro ao carregar portfólio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filterOptions: { label: string, value: Category }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Websites & Clientes', value: 'websites' },
    { label: 'Soluções Customizadas', value: 'solutions' },
    { label: 'Micro SaaS', value: 'microsaas' }
  ];

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Casos de Sucesso</h2>
          <p className="text-slate-400">Resultados reais para desafios tecnológicos complexos.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveFilter(opt.value)}
              className={`px-6 py-2 rounded-full border transition-all text-sm font-medium ${
                activeFilter === opt.value
                  ? 'bg-premium-emerald text-white border-premium-emerald'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-premium-emerald/50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="relative min-h-[400px]">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-premium-emerald" />
              <p className="text-sm uppercase tracking-widest font-medium">Carregando cases...</p>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.$id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card overflow-hidden border-white/5 group relative"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* External Link Icon */}
                      {project.link && project.link !== "#" && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-premium-emerald backdrop-blur-md rounded-full border border-white/10 transition-all opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0"
                        >
                          <ExternalLink className="w-4 h-4 text-white" />
                        </a>
                      )}

                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {project.tags?.map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 bg-premium-emerald/20 border border-premium-emerald/30 text-premium-emerald text-[10px] rounded-md backdrop-blur-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-premium-emerald transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      {project.link && project.link !== "#" && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-premium-emerald hover:gap-3 transition-all"
                        >
                          Ver Projeto Online <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

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
      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          subject: 'Novo contato via site NANO'
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
      <div className="text-sm text-slate-500">
        Desenvolvido por <a href="https://sandropeixoto.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-premium-emerald/30 underline-offset-4">Sandro Peixoto</a>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <div className="min-h-screen relative overflow-x-hidden selection:bg-premium-emerald/30 selection:text-white">
    {/* Dynamic Background Noise */}
    <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />

    <Navbar />
    <main>
      <Hero />
      <Metrics />
      <Services />
      <Portfolio />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/admin/*" 
        element={
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-inter">Carregando Painel...</div>}>
            <AdminModule />
          </Suspense>
        } 
      />
    </Routes>
  );
}
