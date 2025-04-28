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
    setUsers((u) => u.map((x) => (x.id === userId ? { ...x, role } : x)));
    toast.success("Rôle mis à jour !");
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Gestion des utilisateurs
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Rôle</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">{u.email}</td>
                  <td className="py-4 px-6 capitalize">{u.role}</td>
                  <td className="py-4 px-6">
                    {u.role === "user" ? (
                      <button
                        onClick={() => handleRoleChange(u.id, "admin")}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-lg transition"
                      >
                        Promouvoir Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(u.id, "user")}
                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg transition"
                      >
                        Rétrograder User
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
