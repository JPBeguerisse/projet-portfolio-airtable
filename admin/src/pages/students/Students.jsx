import { useEffect, useState } from "react";
import {
  fetchAllStudents,
  deleteStudent,
} from "../../services/students.services";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Pencil, Trash2, Plus } from "lucide-react";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStudents().then(setStudents);
  }, []);

  const handleDelete = async (id) => {
    // if (!window.confirm("Supprimer cet étudiant ?")) return;
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.airtableId !== id));
      toast.success("Étudiant supprimé avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la suppression.");
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Liste des étudiants</h2>

        <button
          onClick={() => navigate("/students/add")}
          className="flex bg-gray-800 cursor-pointer hover:bg-black text-white px-4 py-2 rounded"
        >
          <Plus />
          Nouveau projet
        </button>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.airtableId}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {student.firstName} {student.lastName}
              </p>
              <p className="text-sm text-gray-500">
                Promo : {student.promotion}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/students/${student.airtableId}`)}
                className="border border-gray-300 text-black px-2 py-2 rounded cursor-pointer hover:bg-gray-200"
              >
                <Pencil width={15} height={15} />
              </button>
              <button
                onClick={() => handleDelete(student.airtableId)}
                className="bg-red-500 text-white px-2 py-2 rounded cursor-pointer hover:bg-red-600"
              >
                <Trash2 width={15} height={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
