import { useEffect, useState } from "react";
import { fetchAllProjects } from "../services/projects.service";
import { AdminLayout } from "../components/AdminLayout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b", "#4bc0c0"];
import { LayoutDashboard, Clock, Heart } from "lucide-react";

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const formatDate = (dateStr) => {
    return format(new Date(dateStr), "PPP", { locale: fr });
  };

  useEffect(() => {
    fetchAllProjects().then(setProjects);
  }, []);

  const totalLikes = projects.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalVisible = projects.filter((p) => p.visible).length;

  const categoryData = Object.entries(
    projects.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <AdminLayout>
      <h2 className="flex gap-2 items-center text-2xl font-bold mb-6">
        <LayoutDashboard /> Tableau de bord
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard title="Nombre total de projets" value={projects.length} />
        <StatCard title="Nombre total de likes" value={totalLikes} />
        <StatCard title="Projets visibles" value={totalVisible} />
      </div>

      <div className="mb-10">
        <h3 className="text-xl items-center flex gap-2 font-semibold mt-10 mb-2">
          <Clock />
          Derniers projets ajoutés
        </h3>
        <ul className="space-y-4">
          {[...projects]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map((p) => (
              <li key={p.id} className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(p.createdAt)} · {p.category}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mt-10 mb-2">
          🔥 Top projets likés
        </h3>
        <ul className="space-y-2">
          {[...projects]
            .sort((a, b) => (b.likes || 0) - (a.likes || 0))
            .slice(0, 3)
            .map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="flex gap-2 items-center font-bold">
                  {p.likes || 0}{" "}
                  <Heart
                    className="text-red-500 "
                    fill="currentColor"
                    width={15}
                    height={15}
                  />
                </span>
              </li>
            ))}
        </ul>
      </div>

      <h3 className="text-xl font-semibold mb-2">Répartition par catégorie</h3>
      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded shadow p-4 text-center">
    <h4 className="text-gray-500 mb-1">{title}</h4>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);
