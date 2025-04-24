import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { fetchUsers } from "../services/airtable";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const users = await fetchUsers();
    // const user = users.find(
    //   u => u.email === email && u.password === sha256(password)
    // );

    const user = users.find(
        u => u.email === email &&
             u.password === sha256(password) &&
             u.role === "admin"
      );

    if (user) {
        localStorage.setItem("admin", user.id);
        navigate("/dashboard");
    } else {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Connexion Admin</h1>
      <input
        className="border w-full p-2 mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border w-full p-2 mb-2"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={handleLogin}
      >
        Se connecter
      </button>
    </div>
  );
}
