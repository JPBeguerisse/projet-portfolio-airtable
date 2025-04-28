import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { confirmUser } from "../services/users.services";
import { toast } from "react-toastify";

export const Confirm = () => {
  const [status, setStatus] = useState("checking");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  useEffect(() => {
    (async () => {
      if (!token) return setStatus("invalid");
      const ok = await confirmUser(token);
      setStatus(ok ? "ok" : "invalid");
      if (ok) toast.success("Compte confirmé ! Connecte-toi.");
      else toast.error("Lien invalide ou expiré.");
    })();
  }, [token]);

  if (status === "checking") {
    return <div className="p-4">Vérification…</div>;
  }
  if (status === "ok") {
    return (
      <div className="p-4 max-w-sm mx-auto mt-20 text-center">
        <h1 className="text-xl font-bold mb-4">Confirmation réussie</h1>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Se connecter
        </button>
      </div>
    );
  }
  return (
    <div className="p-4 max-w-sm mx-auto mt-20 text-center">
      <h1 className="text-xl font-bold mb-4">Lien invalide</h1>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => navigate("/register")}
      >
        Réessayer l’inscription
      </button>
    </div>
  );
};
