import { useState } from "react";
import { account } from "../../lib/appwrite";
import { ID } from "appwrite";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User as UserIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from "lucide-react";

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Create user in Appwrite
      await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.name
      );
      
      setSuccess(true);
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Falha ao criar usuário. Verifique se o e-mail já está em uso.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <header>
        <h1 className="text-3xl font-bold text-white font-inter">Usuários</h1>
        <p className="text-slate-400 mt-1">Gerencie quem tem acesso ao painel NanoAdmin.</p>
      </header>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 border-white/5 bg-premium-emerald/5">
            <div className="w-12 h-12 bg-premium-emerald/20 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-premium-emerald" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Segurança em Primeiro Lugar</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Novos usuários criados aqui terão acesso completo ao painel administrativo. Certifique-se de que o e-mail esteja correto.
            </p>
          </div>

          <div className="glass-card p-6 border-white/5">
            <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Dicas</h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-xs text-slate-400">
                <span className="text-premium-emerald">•</span> Senha deve ter no mínimo 8 caracteres.
              </li>
              <li className="flex gap-2 text-xs text-slate-400">
                <span className="text-premium-emerald">•</span> O usuário poderá redefinir a própria senha depois.
              </li>
            </ul>
          </div>
        </div>

        {/* Create User Form */}
        <div className="lg:col-span-3">
          <div className="glass-card p-8 border-white/5">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-premium-emerald" /> Adicionar Administrador
            </h2>

            <form onSubmit={handleCreateUser} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Nome Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                    placeholder="Nome do novo admin"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">E-mail de Acesso</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                    placeholder="email@nano.net.br"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Senha Inicial</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-premium-emerald/10 border border-premium-emerald/20 rounded-xl text-premium-emerald text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5" />
                  Usuário criado com sucesso!
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-premium w-full flex items-center justify-center gap-2 py-3 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
                Criar Conta de Acesso
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
