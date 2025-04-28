import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HeaderNav from "./components/HeaderNav";
import { ProjectDetail } from "./pages/ProjectDetails";

function App() {
  return (
    <>
      <HeaderNav />
      <div className="min-h-screen w-full bg-gray-100 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:id/detail" element={<ProjectDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
