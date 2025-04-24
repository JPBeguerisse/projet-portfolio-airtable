import { AdminLayout } from "../components/AdminLayout";

export const Dashboard = () => {
    return (
      <AdminLayout>
        <h2 className="text-2xl font-semibold mb-4">Bienvenue 👋</h2>
        <p>Tu es connecté en tant qu’administrateur.</p>
      </AdminLayout>
    );
  }