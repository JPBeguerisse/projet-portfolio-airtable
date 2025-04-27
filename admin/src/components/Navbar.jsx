import { useState } from "react";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigation = [
        { name: "Accueil", href: "/" },
        { name: "Inscription", href: "/auth/register" },
        { name: "Connexion", href: "/auth/login" },
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
                </nav>
            )}
        </header>
    );
}
