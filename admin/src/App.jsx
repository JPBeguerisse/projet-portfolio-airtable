import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Login from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { Confirm } from "./pages/Confirm";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/projects/Projects";
import { AddProject } from "./pages/projects/AddProject";
import { EditProject } from "./pages/projects/EditProject";
import { ProjectDetail } from "./pages/projects/ProjectDetail";
import { Students } from "./pages/students/Students";
import { AddStudent } from "./pages/students/AddStudent";
import { EditStudent } from "./pages/students/EditStudent";
import { Users } from "./pages/Users";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function ProtectedRoute({ children }) {
  const { role, loading } = useAuth();
  if (loading) {
    return <div>Chargement…</div>;
  }
  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/confirm" element={<Confirm />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/add"
            element={
              <ProtectedRoute>
                <AddProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/detail"
            element={
              <ProtectedRoute>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:id"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
