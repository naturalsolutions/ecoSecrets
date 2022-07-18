import { createContext, FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export interface ProjectContextProps {
  name?: string;
  children?: any;
}
export const ProjectContext = createContext({} as any);

export const useProjectContext = () => useContext(ProjectContext);

const ProjectContextProvider: FC<ProjectContextProps> = ({ children }) => {
  const [project, setProject] = useState<string | null>(null);
  const [deployments, setDeployments] = useState<any[]>([]);
  let params = useParams();
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

  useEffect(() => {
    (async () => {
      updateDeploymentsFile();
    })();
  }, [project]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        deployments,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
