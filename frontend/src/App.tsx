import "./App.css";
import Main from "./pages/main";
import Deployment from "./pages/deployment";
import Annotation from "./pages/annotation";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainContextProvider from "./contexts/mainContext";
import ProjectSheet from "./pages/projectSheet";
import DeploymentSheet from "./pages/deploymentSheet";
import DeviceMenuPage from "./pages/deviceMenu";
import DeviceSheetPage from "./pages/deviceSheet";
import { theme } from "./theme";
import { LinearProgress, ThemeProvider } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { OpenAPI } from "./client";
import SiteMenuPage from "./pages/siteMenu";
import SiteSheetPage from "./pages/siteSheet";
import SnackContextProvider from "./contexts/snackContext";
import { AuthContext } from "./contexts/AuthContextProvider";
import { useContext} from "react";
import FilesContextProvider from "./contexts/filesContext";
import RouteWrapper from "./components/RouteWrapper";

// Env var processed by nginx
OpenAPI.BASE = window._env_.REACT_APP_API_PATH || "/api/v1";

function App() {
  const authContext = useContext(AuthContext);

  return (
    authContext.keycloakReady && authContext.isAuthenticated ? (
      <MainContextProvider>
        <FilesContextProvider>
          <SnackContextProvider>
            <ThemeProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <RouteWrapper>
                          <Main />
                        </RouteWrapper>
                      }
                    />
                    {/* <Route path="/project/:projectId" element={<Project />} /> */}
                    <Route
                      path="/project/:projectId"
                      element={
                        <RouteWrapper>
                          <ProjectSheet />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/sites/"
                      element={
                        <RouteWrapper>
                          <SiteMenuPage />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/devices/"
                      element={
                        <RouteWrapper>
                          <DeviceMenuPage />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/devices/:deviceId"
                      element={
                        <RouteWrapper>
                          <DeviceSheetPage />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/sites/:siteId"
                      element={
                        <RouteWrapper>
                          <SiteSheetPage />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="deployment/:deploymentId"
                      element={
                        <RouteWrapper>
                          <Deployment />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/project/:projectId/deployment/:deploymentId"
                      element={
                        <Navigate replace to="details" />
                      }
                    ></Route>
                    <Route
                      path="/project/:projectId/deployment/:deploymentId/details"
                      element={
                        <RouteWrapper>
                          <DeploymentSheet number={0} />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/project/:projectId/deployment/:deploymentId/medias"
                      element={
                        <RouteWrapper>
                          <DeploymentSheet number={1} />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/project/:projectId/deployment/:deploymentId/medias/:imageId"
                      element={
                        <RouteWrapper>
                          <Annotation />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="/project/:projectId/deployment/:deploymentId/details/:imageId"
                      element={
                        <RouteWrapper>
                          <Annotation />
                        </RouteWrapper>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <RouteWrapper>
                          <Main />
                        </RouteWrapper>
                      }
                    />
                  </Routes>
                </BrowserRouter>
              </I18nextProvider>
            </ThemeProvider>
          </SnackContextProvider>
        </FilesContextProvider>
      </MainContextProvider>
   ) : <LinearProgress color="primary" />
  );
}

export default App;
