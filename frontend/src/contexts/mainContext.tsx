import { createContext, FC, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export interface MainContextProps {
  name?: string;
  children?: any;
}
export const MainContext = createContext({} as any);

export const useMainContext = () => useContext(MainContext);

const MainContextProvider: FC<MainContextProps> = ({ children }) => {
  const [projects, setProjects] = useState<any[]>([]);

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

  useEffect(() => {
    (async () => {
      updateProjectsFile();
    })();
  }, []);

  return (
    <MainContext.Provider
      value={{
        projects,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
