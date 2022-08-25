import "./App.css";
import Main from "./pages/main";
import Project from "./pages/project";
import Deployment from "./pages/deployment";
import Image from "./pages/image";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContextProvider from "./contexts/mainContext";
import ProjectSheet from "./pages/projectSheet";
import DeploymentSheet from "./pages/deploymentSheet";


function App() {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/project/:projectId" element={<Project />}></Route>
          <Route path="/projectsheet/:projectId" element={<ProjectSheet />}></Route>
          <Route
            path="deployment/:deploymentId"
            element={<Deployment />}
          ></Route>
          <Route path="/project/:projectId/deployment/:deploymentId" element={<DeploymentSheet />}></Route>
          <Route
            path="deployment/:deploymentId/:imageId"
            element={<Image />}
          ></Route>
          <Route path="*" element={<Main />}></Route>
        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  );
}

export default App;
