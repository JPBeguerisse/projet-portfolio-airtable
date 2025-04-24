import { useEffect, useState } from "react";
import { fetchAllProjects, updateProjectVisibility, deleteProject } from "../../services/projects.service";
import {AdminLayout} from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
    const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchAllProjects().then(setProjects);
  }, []);

  const handleToggleVisibility = async (project) => {
    const updated = await updateProjectVisibility(project.airtableId, !project.visible)
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, visible: updated.visible } : p))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.airtableId !== id));
      toast.success("Projet supprimé avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la suppression.");
      console.error(err);
    }
  }


  return (
    <AdminLayout>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Liste des projets</h2>
      <button onClick={() => navigate("/projects/add")} className="bg-blue-500 text-white px-4 py-2 rounded">
        Nouveau projet
      </button>
        </div>
     
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-500">
                Visible : {project.visible ? "✅ Oui" : "❌ Non"}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate(`/projects/${project.airtableId}/detail`)} className="bg-green-500 text-white px-3 py-1 rounded">
                Détails
              </button>
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => navigate(`/projects/${project.airtableId}`)}>
                Modifier
              </button>
            
              <button
                onClick={() => handleToggleVisibility(project)}
                className={`px-3 py-1 rounded ${
                  project.visible ? "bg-yellow-500" : "bg-green-500"
                } text-white`}
              >
                {project.visible ? "Masquer" : "Afficher"}
              </button>
              <button
                onClick={() => handleDelete(project.airtableId)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

