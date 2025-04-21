import { useEffect, useState } from "react";
import { fetchVisibleProjects } from "../services/airtable";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchVisibleProjects().then(data => setProjects(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projets publiés</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(project => (
          <div key={project.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500">Tech : {project.technologies?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
