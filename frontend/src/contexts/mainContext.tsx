import { createContext, FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export interface MainContextProps {
  name?: string;
  children?: any;
}
export const MainContext = createContext({} as any);

export const useMainContext = () => useContext(MainContext);

const MainContextProvider: FC<MainContextProps> = ({ children }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [project, setProject] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<any[]>([]);
  const [deployment, setDeployment] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const updateProjectsFile = () => {
    api
      .get("projects/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDeploymentsFile = () => {
    api
      .get(`deployments/`)
      .then((res) => {
        setDeployments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateListFile = () => {
    api
      .get("files/")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    (async () => {
      updateProjectsFile();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      updateDeploymentsFile();
    })();
  }, [project]);

  return (
    <MainContext.Provider
      value={{
        projects,
        project,
        setProject,
        deployments,
        deployment,
        setDeployment,
        files,
        updateListFile,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
