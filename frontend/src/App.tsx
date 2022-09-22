import "./App.css";
import Main from "./pages/main";
import Project from "./pages/project";
import Deployment from "./pages/deployment";
import Image from "./pages/image";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainContextProvider from "./contexts/mainContext";
import ProjectSheet from "./pages/projectSheet";
import DeploymentSheet from "./pages/deploymentSheet";
import DeviceMenuPage from "./pages/deviceMenu";
import DeviceSheet from "./components/deviceSheet/deviceSheetMain";
import DeviceSheetPage from "./pages/deviceSheet";
import ProjectSheetPage from "./pages/projectSheet";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { OpenAPI } from "./client";
import SiteMenuPage from "./pages/siteMenu";
import SiteSheetPage from "./pages/siteSheet";

OpenAPI.BASE = process.env.REACT_APP_API_PATH || "http://localhost:3654";

function App() {
  return (
    <MainContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/project/:projectId" element={<Project />}></Route>
            <Route
              path="/projectsheet/:projectId"
              element={<ProjectSheet />}
            ></Route>
            <Route path="/sites/" element={<SiteMenuPage />}></Route>
            <Route path="/devices/" element={<DeviceMenuPage />}></Route>
            <Route
              path="/devices/:deviceId"
              element={<DeviceSheetPage />}
            ></Route>
            <Route
              path="/sites/:siteId"
              element={<SiteSheetPage />}
            ></Route>
            <Route
              path="deployment/:deploymentId"
              element={<Deployment />}
            ></Route>
            <Route
              path="/project/:projectId/deployment/:deploymentId/details"
              element={<DeploymentSheet bool={0}/>}
            ></Route>
            <Route
              path="/project/:projectId/deployment/:deploymentId/medias"
              element={<DeploymentSheet bool={1}/>}
            ></Route>
            <Route
              path="/project/:projectId/deployment/:deploymentId/medias/:imageId"
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
