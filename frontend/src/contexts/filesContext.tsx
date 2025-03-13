import { createContext, useContext, useEffect, useState, FC } from "react";
import { useMainContext } from "./mainContext";
import { FilesService } from "../client/services/FilesService";

interface Filters {
  species: string;
  family: string;
  genus: string;
  classe: string;
  order: string;
  start_date: Date | null;
  end_date: Date | null;
}
export interface FilesContextProps {
  name?: string;
  children?: any;
}
export const FilesContext = createContext({} as any);

export const useFilesContext = () => useContext(FilesContext);

const FilesContextProvider: FC<FilesContextProps> = ({ children }) => {
  const { currentDeployment, updateDeploymentData } = useMainContext();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    species: "",
    family: "",
    genus: "",
    classe: "",
    order: "",
    start_date: null,
    end_date: null,
  });

  const image = (): any | null => {
    return files.find((f) => f.id === currentImage);
  };

  const updateListFile = () => {
    setIsLoaded(false);
    currentDeployment &&
      FilesService.getFilesWithFiltersFilesFiltersDeploymentIdGet(
        currentDeployment,
        filters?.species,
        filters?.family,
        filters?.genus,
        filters?.classe,
        filters?.order,
        filters?.start_date?.toISOString().slice(0, -1),
        filters?.end_date?.toISOString().slice(0, -1)
      )
        .then((files) => {
          setFiles(files);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    (async () => {
      updateListFile();
      updateDeploymentData();
    })();
  }, [currentDeployment, filters]);

  return (
    <FilesContext.Provider
      value={{
        filters,
        setFilters,
        files,
        updateListFile,
        currentImage,
        setCurrentImage,
        image,
        isLoaded,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContextProvider;
