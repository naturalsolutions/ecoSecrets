import { createContext, FC, useContext, useEffect, useState } from "react";
import { Deployments } from "../client/models/Deployments";
import { FilesService } from "../client/services/FilesService";
import { ProjectWithDeployment } from "../client/models/ProjectWithDeployment";
import { ProjectsService } from "../client/services/ProjectsService";
import { Stats } from "../client/models/Stats";
import { HomeService } from "../client/services/HomeService";
import { StatsProject } from "../client/models/StatsProject";
import { ProjectSheet } from "../client/models/ProjectSheet";
import { DeploymentsService } from "../client";

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
  const [deploymentData, setDeploymentData] = useState<Deployments>();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<Stats>();
  const [projectsStats, setProjectsStats] = useState<StatsProject[]>();
  const [projectSheetData, setProjectSheetData] = useState<ProjectSheet>();
  
  
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

  const updateProjectsStats = () => {
    ProjectsService.getStatsProjectsProjectsStatsProjectsGet()
      .then((projectsStats) => {
        setProjectsStats(projectsStats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProjectSheetData = () => {
    currentProject && ProjectsService.getInformationsProjectProjectsProjectInformationsProjectIdGet(currentProject)
      .then((projectSheetData) => {
        console.log(projectSheetData)
        setProjectSheetData(projectSheetData);
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

  const updateDeploymentData = () => {
    currentDeployment && 
    DeploymentsService.readDeploymentDeploymentsDeploymentIdGet(currentDeployment)
      .then((deploymentData) => {
        setDeploymentData(deploymentData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    (async () => {
      updateProjects();
      updateGlobalStats();
      updateProjectsStats();
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
      updateDeploymentData();
    })();
  }, [currentDeployment]);

  useEffect(() => {
    (async () => {
      console.log(currentProject)
      updateProjectSheetData();
    })();
  }, [currentProject]);

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
        projectsStats,
        projectSheetData,
        setProjectSheetData,
        updateProjects,
        updateGlobalStats,
        deploymentData,
        setDeploymentData,
        updateDeploymentData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
