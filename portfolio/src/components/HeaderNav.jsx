import { useState } from "react";

export default function HeaderNav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigation = [
        { name: "Accueil", href: "/" },
        { name: "Projets", href: "/projects" },
        { name: "À propos", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="navbar-container">
            <div className="navbar-content">
                <a href="/" className="navbar-logo-link">
                    <img src="/logo.svg" alt="Portfolio ESGI" className="navbar-logo" />
                </a>

                <nav className="navbar-desktop">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="navbar-link">
                            {item.name}
                        </a>
                    ))}
                    <a href="http://localhost:5173/auth/login" className="navbar-link navbar-admin">
                        Espace Admin
                    </a>
                </nav>

                <button
                    className="navbar-burger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? "✕" : "≡"}
                </button>
            </div>

            {mobileOpen && (
                <nav className="navbar-mobile">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="navbar-link"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <a
                        href="http://localhost:5173/auth/login"
                        className="navbar-link navbar-admin"
                        onClick={() => setMobileOpen(false)}
                    >
                        Espace Admin
                    </a>
                </nav>
            )}
        </header>
    );
}
