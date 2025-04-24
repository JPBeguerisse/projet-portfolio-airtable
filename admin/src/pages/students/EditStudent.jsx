import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStudentById, updateStudent } from "../../services/students.services";
import {AdminLayout} from "../../components/AdminLayout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


export const studentSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  promotion: z.string().min(2, "La promotion est requise"),
});

export const EditStudent = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log("ID:", id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    fetchStudentById(id).then((student) => {
      setValue("firstName", student.firstName);
      setValue("lastName", student.lastName);
      setValue("promotion", student.promotion);
      setLoading(false);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
    await updateStudent(id, data);
    toast.success("Étudiant mis à jour avec succès !");
    navigate("/students");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de l'étudiant.");
      console.error(error);
    }
  };

  if (loading) return <p className="p-6">Chargement...</p>;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Modifier un étudiant</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold">Prénom</label>
          <input {...register("firstName")} className="border w-full p-2" />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Nom</label>
          <input {...register("lastName")} className="border w-full p-2" />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Promotion</label>
          <input {...register("promotion")} className="border w-full p-2" />
          {errors.promotion && (
            <p className="text-red-500 text-sm">{errors.promotion.message}</p>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer les modifications
        </button>
      </form>
    </AdminLayout>
  );
};

