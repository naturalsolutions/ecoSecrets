import { createContext, FC, useContext, useEffect, useState } from "react";
import { Deployments } from "../client/models/Deployments";
import { FilesService } from "../client/services/FilesService";
import { ProjectWithDeployment } from "../client/models/ProjectWithDeployment";
import { ProjectsService } from "../client/services/ProjectsService";
import { Stats } from "../client/models/Stats";
import { HomeService } from "../client/services/HomeService";
import { StatsProject } from "../client/models/StatsProject";
import { ProjectSheet } from "../client/models/ProjectSheet";
import { DeploymentsService, DeploymentWithTemplateSequence, Devices, DevicesService, SequencesService, Sites, SitesService, TemplateSequence } from "../client";
import { DeviceMenu } from "../client/models/DeviceMenu";

export interface MainContextProps {
  name?: string;
  children?: any;
}
export const MainContext = createContext({} as any);

export const useMainContext = () => useContext(MainContext);

const MainContextProvider: FC<MainContextProps> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectWithDeployment[]>([]);
  const [currentProject, setCurrentProject] = useState<number | null>(null);
  const [deployments, setDeployments] = useState<Deployments[]>([]);
  const [currentDeployment, setCurrentDeployment] = useState<number | null>(
    null
  );
  const [deploymentData, setDeploymentData] = useState<DeploymentWithTemplateSequence>();
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [globalStats, setGlobalStats] = useState<Stats>();
  const [projectsStats, setProjectsStats] = useState<StatsProject[]>();
  const [projectSheetData, setProjectSheetData] = useState<ProjectSheet>();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [sites, setSites] = useState<Sites[]>([]);
  const [currentSite, setCurrentSite] = useState<number | null>(null);
  const [deviceMenu, setDeviceMenu] = useState<DeviceMenu[]>([]);
  const [currentDevice, setCurrentDevice] = useState<number | null>(null);
  const [autoTemplates, setAutoTemplates] = useState<TemplateSequence[]>();
  const [triggerTemplates, setTriggerTemplates] = useState<TemplateSequence[]>();

  const updateAutoTemplates = () => {
    SequencesService
      .readTemplateSequencesSequencesGet("automatic")
      .then((templates) => {
        setAutoTemplates(templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTriggerTemplates = () => {
    SequencesService
      .readTemplateSequencesSequencesGet("trigger")
      .then((templates) => {
        setTriggerTemplates(templates);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProjects = () => {
    ProjectsService.readProjectsWithDeploymentsProjectsDeploymentsGet()
      .then((projects) => {

        setProjects(projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSites = () => {

    SitesService.readSitesSitesGet()
      .then((sites) => {
        setSites(sites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDeployments = () => {
    DeploymentsService.readDeploymentsDeploymentsGet()
      .then((deployments) => {
        setDeployments(deployments);
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
        setProjectSheetData(projectSheetData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDevices = () => {
    DevicesService.readDevicesDevicesGet()
      .then((devices) => {
        setDevices(devices);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateDeviceMenu = () => {
    DevicesService.readMenuDevicesDevicesMenuGet()
      .then((deviceMenu) => {
        setDeviceMenu(deviceMenu);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const project = (): ProjectWithDeployment | undefined => {
    return projects.find((p) => p.id === currentProject);
  };

  const site = (): Sites | undefined => {
    return sites.find((s) => s.id === currentSite);
  };

  const updateDeploymentData = () => {
    currentDeployment &&
      DeploymentsService.readDeploymentsWithTemplateSequenceDeploymentsTemplateSequenceGet()
        .then((deploymentsData) => {
          setDeploymentData(deploymentsData.find((d) => d.id == currentDeployment));
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const device = (): DeviceMenu | undefined => {
    return deviceMenu.find((d) => d.id === currentDevice);
  };

  useEffect(() => {
    (async () => {
      updateProjects();
      updateDeployments();
      updateGlobalStats();
      updateProjectsStats();
      updateDevices();
      updateDeviceMenu();
      updateSites();
      updateAutoTemplates();
      updateTriggerTemplates();

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
      updateProjectSheetData();
    })();
  }, [currentProject]);

  return (
    <MainContext.Provider
      value={{
        projects,
        project,
        currentDeployment,
        setCurrentProject,
        setCurrentDeployment,
        currentImage,
        setCurrentImage,
        files,
        updateListFile,
        globalStats,
        projectsStats,
        updateProjectsStats,
        projectSheetData,
        setProjectSheetData,
        updateProjectSheetData,
        updateProjects,
        updateGlobalStats,
        devices,
        updateDevices,
        deviceMenu,
        updateDeviceMenu,
        setCurrentDevice,
        device,
        deploymentData,
        setDeploymentData,
        updateDeploymentData,
        deployments,
        setDeployments,
        updateDeployments,
        sites,
        setSites,
        updateSites,
        autoTemplates,
        setAutoTemplates,
        updateAutoTemplates,
        triggerTemplates,
        setTriggerTemplates,
        updateTriggerTemplates,
        site,
        setCurrentSite
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
