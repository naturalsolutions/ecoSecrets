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

interface Pagination {
  totalFiles: number;
  currentPage: number;
  totalPages: number;
}

export interface FilesContextProps {
  name?: string;
  children?: any;
}
export const FilesContext = createContext({} as any);

export const useFilesContext = () => useContext(FilesContext);

const FilesContextProvider: FC<FilesContextProps> = ({ children }) => {
  const { currentDeployment, updateDeploymentData } = useMainContext();
  const [paginationFiles, setPaginationFiles] = useState<Pagination>();
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

  const updateListFile = (skip = 0, limit = 100) => {
    setIsLoaded(false);
    currentDeployment &&
      FilesService.getFilesWithFiltersFilesFiltersDeploymentIdGet(
        currentDeployment,
        skip,
        limit,
        filters?.species,
        filters?.family,
        filters?.genus,
        filters?.classe,
        filters?.order,
        filters?.start_date?.toISOString().slice(0, -1),
        filters?.end_date?.toISOString().slice(0, -1)
      )
        .then((files) => {
          setFiles(files["data"]);
          setPaginationFiles({
            currentPage: files["current_page"],
            totalFiles: files["total_items"],
            totalPages: files["total_pages"],
          });
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
        paginationFiles,
        setPaginationFiles,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContextProvider;
