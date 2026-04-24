import { useAuth } from "../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  LogOut, 
  Menu, 
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import logoImg from "../../assets/programacao.png";

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Portfólio", icon: Briefcase, path: "/admin/portfolio" },
    { label: "Usuários", icon: Users, path: "/admin/users" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass-card border-y-0 border-l-0 border-r-white/5 transition-transform duration-300 transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-premium-emerald to-premium-cyan rounded-lg flex items-center justify-center overflow-hidden p-1">
              <img src={logoImg} alt="N" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter">NANO Admin</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) => `flex items-center justify-between p-3 rounded-xl transition-all group ${
                  isActive 
                    ? 'bg-premium-emerald/10 text-premium-emerald border border-premium-emerald/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-premium-emerald/20 border border-premium-emerald/30 flex items-center justify-center text-premium-emerald font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user?.name || 'Administrador'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Sair da Sessão</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Header mobile */}
        <header className="lg:hidden p-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-premium-emerald to-premium-cyan rounded-lg flex items-center justify-center overflow-hidden p-1">
              <img src={logoImg} alt="N" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-white">NANO Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
