import { createContext, FC, useContext, useEffect, useState } from "react";
import { Deployments } from "../client/models/Deployments";
import { FilesService } from "../client/services/FilesService";
import { ProjectWithDeployment } from "../client/models/ProjectWithDeployment";
import { ProjectsService } from "../client/services/ProjectsService";
import { Stats } from "../client/models/Stats";
import { HomeService } from "../client/services/HomeService";

export interface MainContextProps {
  name?: string;
  children?: any;
}
export const MainContext = createContext({} as any);

export const useMainContext = () => useContext(MainContext);

const MainContextProvider: FC<MainContextProps> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectWithDeployment[]>([]);
  const [currentProject, setCurrentProject] = useState<number | null>(null);
  const [currentDeployment, setCurrentDeployment] = useState<number | null>(
    null
  );
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<Stats>();

  const updateProjects = () => {
    ProjectsService.readProjectsWithDeploymentsProjectsDeploymentsGet()
      .then((projects) => {
        setProjects(projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateListFile = () => {
    currentDeployment &&
      FilesService.readDeploymentFilesFilesDeploymentIdGet(currentDeployment)
        .then((files) => {
          setFiles(files);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const updateGlobalStats = () => {
    HomeService.getUserStatsHomeStatsGet()
      .then((globalStats) => {
        setGlobalStats(globalStats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const project = (): ProjectWithDeployment | undefined => {
    return projects.find((p) => p.id === currentProject);
  };

  const deployment = (): Deployments | undefined => {
    return projects
      .find((p) => p.id === currentProject)
      ?.deployments?.find((d) => d.id === currentDeployment);
  };
  
  useEffect(() => {
    (async () => {
      updateProjects();
      updateGlobalStats();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      currentDeployment &&
        projects.forEach((p) => {
          const goodP = p.deployments?.find((d) => d.id === currentDeployment);
          if (goodP) {
            setCurrentProject(p.id);
          }
        });
    })();
  }, [projects]);

  useEffect(() => {
    (async () => {
      updateListFile();
    })();
  }, [currentDeployment]);

  return (
    <MainContext.Provider
      value={{
        projects,
        project,
        setCurrentProject,
        deployment,
        setCurrentDeployment,
        currentImage,
        setCurrentImage,
        files,
        updateListFile,
        globalStats,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
