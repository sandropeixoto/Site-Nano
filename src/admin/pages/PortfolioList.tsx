import { useState, useEffect } from "react";
import { databases, APPWRITE_CONFIG } from "../../lib/appwrite";
import { Query } from "appwrite";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioForm from "./PortfolioForm";

interface Project {
  $id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export default function PortfolioList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionId,
        [Query.orderDesc("$createdAt")]
      );
      setProjects(response.documents as unknown as Project[]);
    } catch (err) {
      console.error(err);
      setError("Falha ao carregar projetos do banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      await databases.deleteDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionId,
        id
      );
      
      setProjects(prev => prev.filter(p => p.$id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao excluir.";
      alert("Erro ao excluir: " + errorMessage);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && projects.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-premium-emerald" />
        <p>Carregando projetos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-inter">Portfólio</h1>
          <p className="text-slate-400 mt-1">Gerencie os projetos exibidos no site público.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="btn-premium flex items-center gap-2 py-2.5 px-6"
        >
          <Plus className="w-4 h-4" /> Novo Projeto
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Pesquisar projetos por título ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-all text-sm">
          <Filter className="w-4 h-4" /> Filtros
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Projects Table/Grid */}
      <div className="glass-card overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Projeto</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Categoria</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tags</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.tr 
                      key={project.$id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-slate-800 flex-shrink-0">
                            <img src={project.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{project.title}</p>
                            <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{project.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 capitalize">
                          {project.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tags?.slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] text-premium-emerald bg-premium-emerald/10 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                          {project.tags?.length > 2 && (
                            <span className="text-[10px] text-slate-500">+{project.tags.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEdit(project)}
                            className="p-2 rounded-lg hover:bg-premium-emerald/10 text-slate-400 hover:text-premium-emerald transition-all" title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {project.link && project.link !== "#" && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-premium-cyan/10 text-slate-400 hover:text-premium-cyan transition-all" title="Ver Online">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button 
                            onClick={() => handleDelete(project.$id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all" title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-20 text-center text-slate-500 text-sm">
                      {loading ? "Carregando..." : "Nenhum projeto encontrado."}
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <PortfolioForm 
          project={editingProject} 
          onClose={() => setIsFormOpen(false)}
          onSuccess={fetchProjects}
        />
      )}
    </div>
  );
}
