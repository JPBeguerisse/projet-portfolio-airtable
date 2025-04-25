import { useEffect, useState } from "react";
import {
  fetchAllProjects,
  updateProjectVisibility,
  deleteProject,
} from "../../services/projects.service";
import { AdminLayout } from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { CircleX, CircleCheckBig } from "lucide-react";
import { Pencil, Eye, Trash2, Plus } from "lucide-react";

export const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllProjects().then(setProjects);
  }, []);

  const handleToggleVisibility = async (project) => {
    const updated = await updateProjectVisibility(
      project.airtableId,
      !project.visible
    );
    setProjects((prev) =>
      prev.map((p) =>
        p.id === project.id ? { ...p, visible: updated.visible } : p
      )
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
  };

  const filteredProjects = projects.filter((p) =>
    [p.name, p.description, p.category, p.promotion]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Liste des projets</h2>
        <button
          onClick={() => navigate("/projects/add")}
          className="flex bg-gray-800 cursor-pointer hover:bg-black text-white px-4 py-2 rounded"
        >
          <Plus />
          Nouveau projet
        </button>
      </div>
      <input
        type="text"
        placeholder="Rechercher un projet..."
        className="border px-4 py-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="flex items-center gap-2 text-sm text-gray-500">
                Visible{" "}
                {project.visible ? (
                  <CircleCheckBig
                    className="text-green-500"
                    width={15}
                    height={15}
                  />
                ) : (
                  <CircleX width={15} height={15} className="text-red-400" />
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate(`/projects/${project.airtableId}/detail`)
                }
                className="border border-gray-300 text-black px-2 py-2 rounded cursor-pointer hover:bg-gray-200"
              >
                <Eye width={15} height={15} />
              </button>
              <button
                className="border border-gray-300 text-black px-2 py-2 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => navigate(`/projects/${project.airtableId}`)}
              >
                <Pencil width={15} height={15} />
              </button>

              {/* <button
                onClick={() => handleToggleVisibility(project)}
                className={`px-3 py-1 rounded ${
                  project.visible ? "bg-yellow-500" : "bg-green-500"
                } text-white`}
              >
                {project.visible ? "Masquer" : "Afficher"}
              </button> */}
              <button
                onClick={() => handleDelete(project.airtableId)}
                className="bg-red-500 text-white px-2 py-2 rounded cursor-pointer hover:bg-red-600"
              >
                <Trash2 width={15} height={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
