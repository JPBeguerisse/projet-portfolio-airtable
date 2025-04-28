import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchAllStudents } from "../../services/students.services";
import {
  fetchProjectById,
  updateProject,
  TECHNO_OPTIONS,
  CATEGORY_OPTIONS,
} from "../../services/projects.service";
import { z } from "zod";
import Select from "react-select";
import { toast } from "react-toastify";
import { AdminLayout } from "../../components/AdminLayout";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { Trash2, UploadCloud } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Nom requis"),
  description: z.string().optional(),
  link: z.string().optional(),
  promotion: z.string().optional(),
  category: z.string().optional(),
  visible: z.boolean(),
  technologies: z.array(z.string()).min(1, "Choisir au moins une techno"),
  students: z.array(z.string()).min(1, "Sélectionner au moins un étudiant"),
  images: z.array(z.object({ url: z.string() })).optional(),
});

export const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

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
      visible: false,
      technologies: [],
      students: [],
      link: "",
      promotion: "",
      category: "",
      images: [],
    },
  });

  useEffect(() => {
    fetchAllStudents().then(setStudentsList);
    fetchProjectById(id).then((project) => {
      for (const key in project) {
        if (key === "images" && project.images) {
          setPreviewImages(
            project.images.map((img) => ({
              previewUrl: img.url,
              name: img.url.split("/").pop(),
            }))
          );
        }
        setValue(key, project[key]);
      }
    });
  }, [id, setValue]);

  const handleRemoveImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    const currentImages = watch("images") || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setValue("images", updatedImages);
  };

  const onSubmit = async (data) => {
    try {
      await updateProject(id, data);
      toast.success("Projet modifié !");
      navigate("/projects");
    } catch (err) {
      toast.error("Erreur lors de la modification");
      console.error(err);
    }
  };

  const techOptions = TECHNO_OPTIONS.map((t) => ({ label: t, value: t }));
  const categoryOptions = CATEGORY_OPTIONS.map((c) => ({ label: c, value: c }));
  const selectedStudents = watch("students");
  const selectedTechnos = watch("technologies");

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Modifier le projet</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
        <div>
          <label>Nom</label>
          <input {...register("name")} className="border w-full p-2" />
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="border w-full p-2"
          />
        </div>

        <div>
          <label>Technologies</label>
          <Select
            isMulti
            options={techOptions}
            value={techOptions.filter((t) => selectedTechnos.includes(t.value))}
            onChange={(selected) =>
              setValue(
                "technologies",
                selected.map((s) => s.value)
              )
            }
          />
        </div>

        <div>
          <label>Étudiants</label>
          <Select
            isMulti
            options={studentsList.map((s) => ({
              label: `${s.firstName} ${s.lastName}`,
              value: s.airtableId,
            }))}
            value={studentsList
              .filter((s) => selectedStudents.includes(s.airtableId))
              .map((s) => ({
                label: `${s.firstName} ${s.lastName}`,
                value: s.airtableId,
              }))}
            onChange={(selected) =>
              setValue(
                "students",
                selected.map((s) => s.value)
              )
            }
          />
        </div>

        <div>
          <label>Lien</label>
          <input {...register("link")} className="border w-full p-2" />
        </div>

        <div>
          <label>Promotion</label>
          <input {...register("promotion")} className="border w-full p-2" />
        </div>

        <div>
          <label>Catégorie</label>
          <Select
            options={categoryOptions}
            value={categoryOptions.find((c) => c.value === watch("category"))}
            onChange={(selected) => setValue("category", selected.value)}
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={watch("visible")}
              onChange={(e) => setValue("visible", e.target.checked)}
            />
            Projet visible
          </label>
        </div>

        <div>
          <label>Images déjà associées</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {previewImages.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.previewUrl}
                  alt={img.name}
                  className="w-full h-auto border rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs cursor-pointer "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="mt-4">
          <label className="font-semibold block mb-1">
            Ajouter de nouvelles images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files);

              // Upload sur Cloudinary
              const uploads = await Promise.all(
                files.map((file) => uploadToCloudinary(file))
              );

              // Format attendu pour Airtable [{ url }]
              const newUploadedImages = uploads.map((url) => ({ url }));

              // 1. Mettre à jour les previews
              setPreviewImages((prev) => [
                ...prev,
                ...uploads.map((url) => ({
                  previewUrl: url,
                  name: url.split("/").pop(),
                })),
              ]);

              // 2. Mettre à jour React Hook Form
              const currentImages = watch("images") || [];
              setValue("images", [...currentImages, ...newUploadedImages]);
            }}
            className="border p-2 w-full rounded"
          />
        </div> */}
        <div className="mt-4">
          <label className="font-semibold block mb-2">Ajouter une image</label>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg w-32 h-32 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <UploadCloud className="text-gray-400 w-8 h-8" />
          </div>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files);
              const uploads = await Promise.all(files.map(uploadToCloudinary));
              const newImages = uploads.map((url) => ({ url }));

              setPreviewImages((prev) => [
                ...prev,
                ...uploads.map((url) => ({
                  previewUrl: url,
                  name: url.split("/").pop(),
                })),
              ]);

              const currentImages = watch("images") || [];
              setValue("images", [...currentImages, ...newImages]);

              toast.success(
                `${uploads.length} image(s) ajoutée(s) avec succès !`
              );
            }}
            className="hidden"
          />
        </div>

        <button className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </AdminLayout>
  );
};
