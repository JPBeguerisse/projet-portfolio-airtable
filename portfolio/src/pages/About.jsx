import HeaderNav from "../components/HeaderNav";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 px-4 max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">À propos</h1>
        <p className="text-gray-600">
          Ce site présente les projets réalisés par les étudiants de la filière
          Ingénierie du Web de l’ESGI.
        </p>
        <p className="text-gray-600">
          Il est développé avec React, Vite, et Airtable pour la gestion des
          données. Vous pouvez consulter, liker et commenter les projets.
        </p>
      </main>
    </div>
  );
}
