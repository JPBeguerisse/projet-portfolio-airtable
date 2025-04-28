import { useState } from "react";
import { Link } from "react-router-dom";

export default function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projects" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Portfolio ESGI" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              {item.name}
            </Link>
          ))}
          <a
            href="http://localhost:5174/auth/login"
            className="ml-4 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Espace Admin
          </a>
        </nav>

        {/* Burger Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 flex flex-col space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="http://localhost:5174/auth/login"
            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-center"
            onClick={() => setMobileOpen(false)}
          >
            Espace Admin
          </a>
        </nav>
      )}
    </header>
  );
}
