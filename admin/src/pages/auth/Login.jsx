import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sha256 } from "js-sha256";
import { fetchUserByEmail } from "../../services/users.services";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirige si déjà connecté
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const user = await fetchUserByEmail(email);
    if (user && user.password === sha256(password) && user.role === "admin") {
      localStorage.setItem("admin", user.id);
      localStorage.setItem("adminEmail", user.email);
      navigate("/dashboard");
      return;
    }
    setError("Identifiants incorrects ou accès non autorisé");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion Admin</h1>
        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded mb-4 transition"
          onClick={handleLogin}
        >
          Se connecter
        </button>
        <p className="text-center text-sm">
          Pas encore de compte ?{' '}
          <Link to="/auth/register" className="text-indigo-600 hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}