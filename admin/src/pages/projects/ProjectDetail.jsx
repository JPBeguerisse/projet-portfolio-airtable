import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProjectById } from "../../services/projects.service";
import { fetchAllStudents } from "../../services/students.services";
import { AdminLayout } from "../../components/AdminLayout";
import { fetchCommentsByProject } from "../../services/comments.services";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm as useCommentForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createComment } from "../../services/comments.services";
import { deleteComment } from "../../services/comments.services";
import { Trash2, Heart } from "lucide-react";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), "PPPp", { locale: fr });
  };

  useEffect(() => {
    const load = async () => {
      const proj = await fetchProjectById(id);
      const studentsList = await fetchAllStudents();
      const linkedComments = await fetchCommentsByProject(proj.id); // Airtable ID

      // Rattache les infos étudiants
      const linkedStudents = studentsList.filter((s) =>
        proj.students?.includes(s.airtableId)
      );

      setStudents(linkedStudents);
      setComments(linkedComments);
      setProject(proj);
      setLoading(false);
    };

    load();
  }, [id]);

  const {
    register: register,
    handleSubmit: handleSubmit,
    reset: resetComment,
  } = useCommentForm();

  const onSubmitComment = async (data) => {
    try {
      const adminName = localStorage.getItem("adminName") || "Admin";

      await createComment({
        content: data.comment,
        projectId: id,
        user: adminName,
      });

      toast.success("Commentaire ajouté !");
      resetComment();
      const refreshed = await fetchCommentsByProject(project.id);
      setComments(refreshed);
    } catch (err) {
      toast.error("Erreur lors de l'ajout du commentaire");
      console.error(err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = window.confirm("Supprimer ce commentaire ?");
    if (!confirm) return;

    try {
      await deleteComment(commentId);
      toast.success("Commentaire supprimé !");
      const refreshed = await fetchCommentsByProject(project.id);
      setComments(refreshed);
    } catch (err) {
      toast.error("Erreur lors de la suppression");
      console.error(err);
    }
  };

  // if (loading || !project) return <p className="p-4">Chargement...</p>;

  return (
    <AdminLayout>
      {loading || !project ? (
        <div className="p-4">Chargement...</div>
      ) : (
        <>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{project.name}</h1>

            <div className="text-gray-700 mb-6">{project.description}</div>

            <div className="mb-4">
              <span className="font-semibold">Promotion :</span>{" "}
              {project.promotion}
            </div>

            <div className="mb-4">
              <span className="font-semibold">Catégorie :</span>{" "}
              {project.category}
            </div>

            <div className="mb-4">
              <span className="font-semibold">Technologies :</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {project.technologies?.map((tech, i) => (
                  <li key={i} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <span className="font-semibold">Étudiants :</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {students.map((s) => (
                  <li
                    key={s.airtableId}
                    className="bg-blue-100 px-2 py-1 rounded text-sm"
                  >
                    {s.firstName} {s.lastName}
                  </li>
                ))}
              </ul>
            </div>

            {project.link && (
              <div className="mb-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Voir le projet en ligne ↗
                </a>
              </div>
            )}

            {project.images?.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt={`project-image-${i}`}
                    className="rounded shadow"
                  />
                ))}
              </div>
            )}

            <div className="mb-6 flex items-center gap-2">
              <Heart
                className="text-red-500 "
                fill="currentColor"
                width={15}
                height={15}
              />{" "}
              <span className="font-semibold text-lg">
                {project.likes || 0}
              </span>{" "}
              likes
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-bold mb-2">Commentaires</h2>
              {comments.length > 0 ? (
                <ul className="space-y-4">
                  {comments.map((c) => (
                    <li
                      key={c.id}
                      className="w-full bg-gray-100 px-4 py-3 rounded shadow text-sm relative flex items-center justify-between "
                    >
                      <div>
                        <p className="mb-1 text-gray-800">{c.content}</p>
                        <p className="text-xs text-gray-500 italic">
                          🕒 Créé le : {formatDate(c.date)}
                        </p>
                      </div>

                      <div>
                        <button
                          onClick={() => handleDeleteComment(c.airtableId)}
                          className="cursor-pointer text-red-500  text-xs hover:underline flex items-center gap-1 hover:text-red-700 font-semibold"
                        >
                          <Trash2 width={15} height={15} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-gray-100 px-4 py-2 rounded shadow text-sm">
                  <p className="text-gray-500">
                    Aucun commentaire pour ce projet.
                  </p>
                </div>
              )}
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 mt-10">
            Ajouter un commentaire
          </h2>
          <form onSubmit={handleSubmit(onSubmitComment)}>
            <textarea
              {...register("comment")}
              className="w-full border p-2 rounded"
              placeholder="Écrire un commentaire..."
            />
            <button className="mt-2 bg-gray-800 text-white px-4 py-2 rounded">
              Commenter
            </button>
          </form>
        </>
      )}
    </AdminLayout>
  );
};
