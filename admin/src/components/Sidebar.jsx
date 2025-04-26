import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpenDot,
  GraduationCap,
  LogOut,
} from "lucide-react";

export const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-gray-200 flex gap-4 ${
      pathname === path ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 border-r flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Panel Admin</h1>

        <nav className="space-y-2 flex flex-col pt-18">
          <Link to="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard /> Dashboard
          </Link>
          <Link to="/projects" className={linkClass("/projects")}>
            <FolderOpenDot />
            Projets
          </Link>
          <Link to="/students" className={linkClass("/students")}>
            <GraduationCap />
            Étudiants
          </Link>
        </nav>
      </div>

      <div>
        <button
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/login";
          }}
          className="flex px-4 py-2 rounded w-full hover:bg-gray-800 hover:text-white  gap-4"
        >
          <LogOut />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};
