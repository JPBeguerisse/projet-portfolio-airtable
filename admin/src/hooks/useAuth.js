import { useState, useEffect } from "react";
import { fetchUserById } from "../services/users.services";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("admin");
    if (!id) {
      setLoading(false);
      return;
    }
    fetchUserById(id).then((u) => {
      setUser(u);
      setRole(u.role);
      setLoading(false);
    });
  }, []);

  return { user, role, loading };
}
