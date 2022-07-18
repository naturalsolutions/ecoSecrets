import "./App.css";
import Main from "./pages/main";
import Project from "./pages/project";
import Deployment from "./pages/deployment";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/project/:projectId" element={<Project />}></Route>
        <Route path="deployment/:deploymentId" element={<Deployment />}></Route>
        <Route path="*" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
