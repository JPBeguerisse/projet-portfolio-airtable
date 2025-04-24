import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { fetchAllStudents } from "../../services/students.services";
import { fetchProjectById, updateProject, TECHNO_OPTIONS, CATEGORY_OPTIONS } from "../../services/projects.service";
import { z } from "zod";
import Select from "react-select";
import { toast } from "react-toastify";
import {AdminLayout} from "../../components/AdminLayout";

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
      visible: true,
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
          <textarea {...register("description")} className="border w-full p-2" />
        </div>

        <div>
          <label>Technologies</label>
          <Select
            isMulti
            options={techOptions}
            value={techOptions.filter((t) => selectedTechnos.includes(t.value))}
            onChange={(selected) =>
              setValue("technologies", selected.map((s) => s.value))
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
              setValue("students", selected.map((s) => s.value))
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
            value={categoryOptions.find(
              (c) => c.value === watch("category")
            )}
            onChange={(selected) => setValue("category", selected.value)}
          />
        </div>

        <div>
          <label>Projet visible</label>
          <input type="checkbox" {...register("visible")} />
        </div>

        <div>
          <label>Images déjà associées</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {previewImages.map((img, i) => (
              <img
                key={i}
                src={img.previewUrl}
                alt={img.name}
                className="w-full h-auto border rounded"
              />
            ))}
          </div>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </AdminLayout>
  );
};

