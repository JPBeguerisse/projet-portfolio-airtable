import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import {Dashboard }from "./pages/Dashboard";
import {Projects} from "./pages/Projects";
import {AddProject }from "./pages/AddProject";
import {AddStudent} from "./pages/students/AddStudent";
import { Students } from "./pages/students/Students";
import { EditStudent } from "./pages/students/EditStudent";

function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("admin");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
          path="/stats"
          element={
            <ProtectedRoute>
              <div>Statistiques</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
