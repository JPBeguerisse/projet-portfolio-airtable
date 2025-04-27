import { useEffect, useState } from "react";
import { AdminLayout } from "../components/AdminLayout";
import { fetchAllUsers, updateUserRole } from "../services/users.services";
import { toast } from "react-toastify";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers().then(setUsers);
  }, []);

  const handleRoleChange = async (userId, role) => {
    await updateUserRole(userId, role);
    setUsers(u => u.map(x => x.id === userId ? { ...x, role } : x));
    toast.success("Rôle mis à jour !");
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Email</th><th>Rôle</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "user" ? (
                  <button
                    onClick={() => handleRoleChange(u.id, "admin")}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Promouvoir Admin
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(u.id, "user")}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Rétrograder User
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};
