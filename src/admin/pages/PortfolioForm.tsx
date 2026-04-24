import { useState } from "react";
import { databases, storage, APPWRITE_CONFIG } from "../../lib/appwrite";
import { ID } from "appwrite";
import { 
  X, 
  Upload, 
  Save, 
  Loader2, 
  Image as ImageIcon,
  Tag,
  Link as LinkIcon,
  Type,
  FileText
} from "lucide-react";

interface ProjectFormData {
  title: string;
  category: string;
  description: string;
  tags: string;
  link: string;
  imageFile?: File;
  imageUrl?: string;
}

interface PortfolioFormProps {
  project?: {
    $id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    image: string;
    link: string;
  } | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PortfolioForm({ project, onClose, onSuccess }: PortfolioFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || "",
    category: project?.category || "websites",
    description: project?.description || "",
    tags: project?.tags?.join(", ") || "",
    link: project?.link || "",
    imageUrl: project?.image || "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ 
        ...prev, 
        imageFile: file,
        imageUrl: URL.createObjectURL(file) // Preview
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.imageUrl;

      // 1. Handle image upload if new file selected
      if (formData.imageFile) {
        const uploadResponse = await storage.createFile(
          APPWRITE_CONFIG.bucketId,
          ID.unique(),
          formData.imageFile
        );
        
        // Get the view URL for the file
        const fileUrl = storage.getFileView(
          APPWRITE_CONFIG.bucketId,
          uploadResponse.$id
        );
        finalImageUrl = fileUrl.toString();
      }

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""),
        image: finalImageUrl || "",
        link: formData.link,
      };

      if (project?.$id) {
        // Update
        await databases.updateDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collectionId,
          project.$id,
          projectData
        );
      } else {
        // Create
        await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          APPWRITE_CONFIG.collectionId,
          ID.unique(),
          projectData
        );
      }

      onSuccess();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao salvar projeto.";
      alert("Erro ao salvar projeto: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="max-w-2xl w-full glass-card border-white/5 relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {project ? "Editar Projeto" : "Novo Projeto"}
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Imagem do Projeto</label>
            <div 
              className="relative aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 overflow-hidden group cursor-pointer hover:border-premium-emerald/50 transition-all"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-white" />
                      <span className="text-xs text-white font-medium uppercase tracking-wider">Alterar Imagem</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500">
                  <ImageIcon className="w-12 h-12 opacity-20" />
                  <p className="text-sm">Clique ou arraste para fazer upload</p>
                  <p className="text-[10px] uppercase tracking-widest">JPG, PNG ou WEBP (Max 2MB)</p>
                </div>
              )}
              <input 
                id="file-upload"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1 flex items-center gap-2">
                <Type className="w-3.5 h-3.5" /> Título
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                placeholder="Ex: TrackNano SaaS"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm appearance-none"
              >
                <option value="websites">Websites & Clientes</option>
                <option value="solutions">Soluções Customizadas</option>
                <option value="microsaas">Micro SaaS</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Descrição Curta
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
              placeholder="Descreva o projeto em poucas palavras..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" /> Tags (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                placeholder="React, SaaS, API..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1 flex items-center gap-2">
                <LinkIcon className="w-3.5 h-3.5" /> Link do Projeto
              </label>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-premium-emerald transition-colors text-white text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-end gap-3">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="btn-premium flex items-center gap-2 py-2.5 px-8 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {project ? "Salvar Alterações" : "Criar Projeto"}
          </button>
        </div>
      </div>
    </div>
  );
}
