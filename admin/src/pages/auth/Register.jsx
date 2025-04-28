import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../../services/users.services";
import { toast } from "react-toastify";

const schema = z
  .object({
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Au moins 6 caractères"),
    confirm: z.string().min(1, "Confirmation requise"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Mots de passe non identiques",
    path: ["confirm"],
  });

export const Register = () => {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const { confirmToken } = await createUser({
        email: data.email,
        password: data.password,
      });
      console.log("Token d'activation :", confirmToken);
      setSent(true);
      toast.success("Regarde ta boîte mail pour confirmer !");
    } catch {
      toast.error("Erreur lors de l’inscription");
    }
  };

  if (sent) {
    return (
      <div className="p-4 max-w-sm mx-auto mt-20 text-center">
        <h1 className="text-xl font-bold mb-4">Inscription envoyée</h1>
        <p>Un e-mail de confirmation t’a été envoyé.</p>
        <button
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => navigate("/")}
        >
          Retour à la connexion
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Inscription Admin</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="border w-full p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="password"
          {...register("password")}
          placeholder="Mot de passe"
          className="border w-full p-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
        <input
          type="password"
          {...register("confirm")}
          placeholder="Confirme mot de passe"
          className="border w-full p-2"
        />
        {errors.confirm && (
          <p className="text-red-500 text-sm">{errors.confirm.message}</p>
        )}
        <button className="bg-gray-800 text-white px-4 py-2 rounded w-full">
          S’inscrire
        </button>
      </form>
    </div>
  );
};
