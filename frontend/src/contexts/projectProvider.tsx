import { createContext, FC, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export interface ProjectProviderProps {
  name?: string;
  children?: any;
}
export const ProjectContext = createContext({} as any);

export const useProjectContext = () => useContext(ProjectContext);

const ProjectProvider: FC<ProjectProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<any[]>([]);

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
      updateListFile();
    })();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        files,
        updateListFile,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
