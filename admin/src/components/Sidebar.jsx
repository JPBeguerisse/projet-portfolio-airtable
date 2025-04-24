import { Link, useLocation } from "react-router-dom";

export const  Sidebar = ()  => {
  const { pathname } = useLocation();

  const linkClass = path =>
    `block px-4 py-2 rounded hover:bg-gray-200 ${
      pathname === path ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-gray-100 h-full p-4 border-r">
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/projects" className={linkClass("/projects")}>
          📁 Projets
        </Link>
        <Link to="/students" className={linkClass("/students")}>
          👩‍🎓 Étudiants
        </Link>
        <Link to="/stats" className={linkClass("/stats")}>
          📈 Statistiques
        </Link>
      </nav>
    </aside>
  );
}
