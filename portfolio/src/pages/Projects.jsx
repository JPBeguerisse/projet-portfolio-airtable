import { useState, useEffect } from "react";
import { fetchVisibleProjects } from "../services/airtable";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchVisibleProjects().then(setProjects);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <main>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Projets publiés
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project) => {
            const desc = project.description || "";
            const shortDesc =
              desc.length > 150 ? `${desc.slice(0, 150)}…` : desc;

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between bg-white border rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{shortDesc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/projects/${project.id}/detail`}
                    className="inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Voir détails →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
