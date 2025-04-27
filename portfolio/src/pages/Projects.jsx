import { useState, useEffect } from "react";
import { fetchVisibleProjects } from "../services/airtable";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchVisibleProjects().then(setProjects);
    }, []);

    return (
        <div className="projectlist-container">
            <main className="projectlist-main">
                <h1 className="projectlist-title">Projets publiés</h1>
                <div className="projectlist-grid">
                    {projects.map((project) => {
                        const desc = project.description || "";
                        const shortDesc =
                            desc.length > 150 ? `${desc.slice(0, 150)}…` : desc;

                        return (
                            <div key={project.id} className="projectlist-card">
                                <div className="projectlist-card-body">
                                    <h2 className="projectlist-card-title">{project.name}</h2>
                                    <p className="projectlist-card-desc">{shortDesc}</p>
                                    <div className="projectlist-badges">
                                        {(project.technologies || []).map((tech) => (
                                            <span key={tech} className="projectlist-badge">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="projectlist-card-footer">
                                    <a
                                        href={`/projects/${project.id}/detail`}
                                        className="projectlist-link"
                                    >
                                        Voir détails →
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
