import { AdminLayout } from "../../components/AdminLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  CATEGORY_OPTIONS,
  createProject,
  TECHNO_OPTIONS,
} from "../../services/projects.service";
import { fetchAllStudents } from "../../services/students.services";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { toast } from "react-toastify";
import Select from "react-select";

const schema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  link: z.string().optional(),
  promotion: z.string().optional(),
  category: z.enum(CATEGORY_OPTIONS),
  visible: z.boolean(),
  technologies: z.array(z.string()).min(1, "Au moins 1 techno"),
  students: z.array(z.string()).min(1, "Sélectionner au moins 1 étudiant"),
  images: z.array(z.object({ url: z.string() })).optional(),
});

export const AddProject = () => {
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const techOptions = TECHNO_OPTIONS.map((tech) => ({
    label: tech,
    value: tech,
  }));

  const categoryOptions = CATEGORY_OPTIONS.map((cat) => ({
    label: cat,
    value: cat,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      visible: true,
      technologies: [],
      students: [],
      link: "",
      promotion: "",
      category: "",
      images: [],
    },
  });

  // Charger les étudiants
  useEffect(() => {
    fetchAllStudents().then(setStudentsList);
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Form data:", data);

      await createProject({ ...data, technologies: data.technologies });
      toast.success("Projet ajouté avec succès !");
      navigate("/projects");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du projet");
      console.error(error);
    }
  };

  const selectedTechnos = watch("technologies");
  const selectedStudents = watch("students");
  useEffect(() => {
    console.log("selectedStudents", selectedStudents);
  }, [selectedStudents]);

  const handleRemoveImage = (index) => {
    // Retirer du preview
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // Retirer du form (React Hook Form)
    const currentImages = watch("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    setValue("images", newImages);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Ajouter un projet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <div>
          <label className="font-semibold block">Nom</label>
          <input {...register("name")} className="border w-full p-2" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-semibold block">Description</label>
          <textarea
            {...register("description")}
            className="border w-full p-2"
          />
        </div>

        <div>
          <div>
            <label className="font-semibold block mb-1">Technologies</label>
            <Select
              isMulti
              options={techOptions}
              onChange={(selected) =>
                setValue(
                  "technologies",
                  selected.map((s) => s.value)
                )
              }
              className="text-sm"
            />
            {errors.technologies && (
              <p className="text-red-500">{errors.technologies.message}</p>
            )}
          </div>
        </div>

        <div>
          <div>
            <label className="font-semibold block mb-1">Étudiants</label>
            <Select
              isMulti
              options={studentsList.map((student) => ({
                label: `${student.firstName} ${student.lastName}`,
                value: student.airtableId,
              }))}
              onChange={(selected) =>
                setValue(
                  "students",
                  selected.map((s) => s.value)
                )
              }
              className="text-sm"
            />
            {errors.students && (
              <p className="text-red-500">{errors.students.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block font-semibold">Lien vers le projet</label>
          <input
            type="url"
            {...register("link")}
            className="border w-full p-2"
            placeholder="https://monprojet.com"
          />
          {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Promotion</label>
          <input
            type="text"
            {...register("promotion")}
            className="border w-full p-2"
            placeholder="5IW2"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Catégorie</label>
          <Select
            options={categoryOptions}
            onChange={(selected) => setValue("category", selected.value)}
            className="text-sm"
          />
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Images du projet</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files);

              // 1. Ajouter les previews locales
              const previews = files.map((file) => ({
                name: file.name,
                previewUrl: URL.createObjectURL(file),
              }));
              setPreviewImages((prev) => [...prev, ...previews]);

              // 2. Upload vers Cloudinary
              const uploads = await Promise.all(
                files.map((file) => uploadToCloudinary(file))
              );

              // 3. Ajouter aux images existantes dans le form
              const currentImages = watch("images") || [];
              const newImages = uploads.map((url) => ({ url }));
              setValue("images", [...currentImages, ...newImages]);
            }}
            className="border w-full p-2"
          />

          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-2">
              {previewImages.map((img, index) => (
                <div key={index} className="relative border p-2 rounded shadow">
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 cursor-pointer right-1  text-white px-2 py-1 rounded-full text-xs"
                  >
                    ❌
                  </button>
                  <img
                    src={img.previewUrl}
                    alt={img.name}
                    className="w-full h-auto rounded"
                  />
                  <p className="text-sm mt-1 text-center">{img.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("visible")} />
            Projet visible
          </label>
        </div>

        <button
          type="submit"
          className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded"
        >
          Créer le projet
        </button>
      </form>
    </AdminLayout>
  );
};
