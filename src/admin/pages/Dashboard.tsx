import { useAuth } from "../hooks/useAuth";
import { 
  Briefcase, 
  Users, 
  BarChart3, 
  TrendingUp,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Projetos Ativos", value: "12", icon: Briefcase, color: "text-premium-emerald", bg: "bg-premium-emerald/10" },
    { label: "Usuários Admin", value: "2", icon: Users, color: "text-premium-cyan", bg: "bg-premium-cyan/10" },
    { label: "Visitas no Mês", value: "1.240", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Conversões", value: "48", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Olá, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-slate-400 mt-1">Bem-vindo ao painel de controle da NANO Soluções.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-full uppercase tracking-wider">Mês Atual</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity Stub */}
        <div className="lg:col-span-2 glass-card p-8 border-white/5 h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-premium-emerald" /> Atividade Recente
            </h2>
            <button className="text-xs text-premium-emerald hover:underline">Ver tudo</button>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                  {i === 1 ? '🚀' : i === 2 ? '👤' : '📝'}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">
                    {i === 1 ? 'Novo projeto "NanoAuth" adicionado' : i === 2 ? 'Usuário "Sandro" realizou login' : 'Landing Page de Clientes atualizada'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">há {i * 15} minutos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-card p-8 border-white/5 h-full">
          <h2 className="text-xl font-bold text-white mb-6">Atalhos</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-premium-emerald/50 hover:bg-premium-emerald/5 transition-all group text-left">
              <span className="text-sm font-medium">Novo Projeto</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-premium-emerald" />
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-premium-emerald/50 hover:bg-premium-emerald/5 transition-all group text-left">
              <span className="text-sm font-medium">Gerenciar Usuários</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-premium-emerald" />
            </button>
            <a 
              href="/" 
              target="_blank"
              className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-premium-cyan/50 hover:bg-premium-cyan/5 transition-all group text-left"
            >
              <span className="text-sm font-medium">Ver Site Público</span>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-premium-cyan" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
