import { useEffect, useState } from "react";
import { fetchAllProjects } from "../services/projects.service";
import { fetchAllStudents } from "../services/students.services";
import { Link } from "react-router-dom";

import { ArrowRight } from "lucide-react";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchAllProjects().then(setProjects);
        fetchAllStudents().then(setStudents);
    }, []);

    const totalProjects = projects.length;
    const totalStudents = students.length;
    const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);

    const topProjects = [...projects]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 3);

    const StatCard = ({ title, value }) => (
        <div className="bg-white border rounded shadow p-6 text-center">
            <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-wide">{title}</h3>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
                    Bienvenue sur Portfolio ESGI
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard title="Projets publiés" value={totalProjects} />
                    <StatCard title="Étudiants" value={totalStudents} />
                    <StatCard title="Likes totaux" value={totalLikes} />
                </div>

                <div className="bg-white rounded shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Top projets likés</h2>
                    <ul className="space-y-3">
                        {topProjects.map((p) => (
                            <li
                                key={p.airtableId}
                                className="flex justify-between items-center"
                            >
                                <span className="text-gray-700">{p.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
