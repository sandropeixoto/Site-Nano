import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { KeyRound, Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const { recoverPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await recoverPassword(email);
      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Falha ao solicitar recuperação. Verifique o e-mail informado.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-premium-emerald/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-premium-cyan/10 blur-[120px] rounded-full" />
      
      <div className="max-w-md w-full glass-card p-8 border-white/5 relative z-10">
        <button 
          onClick={() => navigate("/admin/login")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao login
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-premium-emerald/20 to-premium-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-premium-emerald/30">
            <KeyRound className="w-8 h-8 text-premium-emerald" />
          </div>
          <h1 className="text-2xl font-bold text-white">Recuperar Senha</h1>
          <p className="text-slate-400 text-sm mt-2">Enviaremos um link de redefinição para o seu e-mail</p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-premium-emerald/10 border border-premium-emerald/20 rounded-xl text-premium-emerald flex flex-col items-center gap-3">
              <CheckCircle2 className="w-8 h-8" />
              <p className="text-sm font-medium">Instruções enviadas com sucesso!</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verifique sua caixa de entrada (e pasta de spam) para completar a redefinição de sua senha.
            </p>
            <button
              onClick={() => navigate("/admin/login")}
              className="btn-premium w-full"
            >
              Entendido
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors text-white"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Solicitando...
                </>
              ) : (
                "Enviar Link de Recuperação"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
