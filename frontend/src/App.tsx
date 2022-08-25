import "./App.css";
import Main from "./pages/main";
import Project from "./pages/project";
import Deployment from "./pages/deployment";
import Image from "./pages/image";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContextProvider from "./contexts/mainContext";
import NewDeployment from "./pages/newdeployment";
import ProjectSheet from "./pages/projectSheet";
import DeviceMenuPage from "./pages/deviceMenu";
import {theme} from "./theme";
import { ThemeProvider } from "@mui/material";



function App() {
  return (
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/project/:projectId" element={<Project />}></Route>
            <Route path="/devices/" element={<DeviceMenuPage />}></Route>
            <Route path="/deployment/new" element={<NewDeployment />}></Route>
            <Route path="/projectsheet/:projectId" element={<ProjectSheet />}></Route>
            <Route
              path="deployment/:deploymentId"
              element={<Deployment />}
            ></Route>
            <Route
              path="deployment/:deploymentId/:imageId"
              element={<Image />}
            ></Route>
            <Route path="*" element={<Main />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MainContextProvider>
  );
}

export default App;
