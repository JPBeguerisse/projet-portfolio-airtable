import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchVisibleProjects,
  fetchStudents,
  updateProjectLikes,
} from "../services/airtable";

export const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [students, setStudents] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [projects, studentsData] = await Promise.all([
        fetchVisibleProjects(),
        fetchStudents(),
      ]);

      const projectFound = projects.find((p) => String(p.id) === String(id));
      setProject(projectFound);
      setStudents(studentsData);

      if (projectFound) {
        setLikesCount(projectFound.likes || 0); // <-- mettre likes initiaux
      }
    }

    fetchData();
  }, [id]);

  if (!project) return <div className="p-8">Chargement...</div>;

  const projectStudents = project.students?.map((studentId) =>
    students.find((s) => s.airtableId === studentId)
  );

  const handleLike = async () => {
    try {
      // update local
      const newLikesCount = likesCount + 1;
      setLikesCount(newLikesCount);

      // envoyer vers Airtable (via une fonction que je te prépare après)
      await updateProjectLikes(project.airtableId, newLikesCount);
    } catch (error) {
      console.error("Erreur lors du like :", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>

      {project.images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {project.images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`Image ${i}`}
              className="rounded shadow"
            />
          ))}
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">
          {project.description || "Pas de description."}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Technologies utilisées</h2>
        <ul className="flex flex-wrap gap-2">
          {project.technologies?.map((tech, i) => (
            <li key={i} className="bg-gray-200 px-3 py-1 rounded text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Étudiants</h2>
        <ul className="flex flex-wrap gap-2">
          {projectStudents?.length > 0 ? (
            projectStudents.map((student, i) =>
              student ? (
                <li key={i} className="bg-green-200 px-3 py-1 rounded text-sm">
                  {student.firstName} {student.lastName}
                </li>
              ) : null
            )
          ) : (
            <p className="text-gray-500">Aucun étudiant renseigné.</p>
          )}
        </ul>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          onClick={handleLike}
        >
          ❤️ Liker
        </button>
        <span>{likesCount} likes</span>
      </div>

      {project.link && (
        <div className="mt-8">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Voir le projet en ligne
          </a>
        </div>
      )}
    </div>
  );
};
