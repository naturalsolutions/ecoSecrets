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
import { LinearProgress, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { OpenAPI } from "./client";
import SiteMenuPage from "./pages/siteMenu";
import SiteSheetPage from "./pages/siteSheet";
import SnackContextProvider from "./contexts/snackContext";
import { AuthContext } from "./contexts/AuthContextProvider";
import { useContext } from "react";
// import { SnackbarContext } from "./contexts/snackContext";
// import { Snack } from "./client/models/Snack";
// import { useState } from "react";

// Env var processed by nginx
OpenAPI.BASE = window._env_.REACT_APP_API_PATH || "/api/v1";

function App() {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    return <LinearProgress color="primary" />;
  } else {
    return (
      <MainContextProvider>
        <SnackContextProvider>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main />}></Route>
                  {/* <Route path="/project/:projectId" element={<Project />}></Route> */}
                  <Route
                    path="/project/:projectId"
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
                    element={<DeploymentSheet number={0} />}
                  ></Route>
                  <Route
                    path="/project/:projectId/deployment/:deploymentId/medias"
                    element={<DeploymentSheet number={1} />}
                  ></Route>
                  <Route
                    path="/project/:projectId/deployment/:deploymentId/medias/:imageId"
                    element={<Image />}
                  ></Route>
                  <Route
                    path="/project/:projectId/deployment/:deploymentId/details/:imageId"
                    element={<Image />}
                  ></Route>
                  <Route path="*" element={<Main />}></Route>
                </Routes>
              </BrowserRouter>
            </I18nextProvider>
          </ThemeProvider>
        </SnackContextProvider>
      </MainContextProvider>
    );
  }
}

export default App;
