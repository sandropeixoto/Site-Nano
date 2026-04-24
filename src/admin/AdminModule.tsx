import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";
import PortfolioList from "./pages/PortfolioList";
import UserList from "./pages/UserList";
import AdminLayout from "./components/AdminLayout";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-inter">Verificando sessão...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="recovery" element={<Recovery />} />
      
      {/* Protected Admin Area */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="portfolio" 
        element={
          <ProtectedRoute>
            <PortfolioList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="users" 
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect /admin to /admin/ if needed or handle 404 */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default function AdminModule() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-white font-inter selection:bg-premium-emerald/30">
        <AdminRoutes />
      </div>
    </AuthProvider>
  );
}
