import { useNavigate } from "react-router-dom";
import { AdminLayout } from "../../components/AdminLayout";
import { createStudent } from "../../services/students.services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const studentSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  promotion: z.string().min(2, "La promotion est requise"),
});

export const AddStudent = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    await createStudent(data);

    navigate("/students");
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Ajouter un étudiant</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold">Prénom</label>
          <input
            type="text"
            {...register("firstName")}
            className="border w-full p-2"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Nom</label>
          <input
            type="text"
            {...register("lastName")}
            className="border w-full p-2"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Promotion</label>
          <input
            type="text"
            {...register("promotion")}
            className="border w-full p-2"
          />
          {errors.promotion && (
            <p className="text-red-500 text-sm">{errors.promotion.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
        >
          Ajouter l'étudiant
        </button>
      </form>
    </AdminLayout>
  );
};
