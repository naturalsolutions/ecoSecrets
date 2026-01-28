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
  const imagePerPage = 24;
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

  const updateUrl = (projectId, deploymentId, id) => {
    const url = new URL(window.location.toString());
    url.pathname = `/project/${Number(projectId)}/deployment/${Number(
      deploymentId
    )}/medias/${id}`;
    window.history.pushState({}, "", url);
  };


  const updateListFile = (
    skip: number = 0,
    options: { idx?: number, projectId?: any, deploymentId?: any} = {}
  ): Promise<void> => {
    
    const { idx, projectId, deploymentId } = options;
    setIsLoaded(false);

    if (!currentDeployment) return Promise.resolve();

    return FilesService.getFilesWithFiltersFilesFiltersDeploymentIdGet(
      currentDeployment,
      skip,
      imagePerPage,
      filters?.species,
      filters?.family,
      filters?.genus,
      filters?.classe,
      filters?.order,
      filters?.start_date?.toISOString().slice(0, -1),
      filters?.end_date?.toISOString().slice(0, -1)
    )
      .then((files) => {
        setIsLoaded(true);
        setFiles(files.data);
        setPaginationFiles({
          currentPage: files.current_page,
          totalFiles: files.total_items,
          totalPages: files.total_pages,
        });
        if (idx !== undefined) {
          const minIdx = Math.min(idx, files["data"].length - 1);
          const currentImageId = files["data"][minIdx].id;
          setCurrentImage(currentImageId);
          updateUrl(projectId ,deploymentId, currentImageId);
        }
      })
      .catch((err) => {
        console.error(err);
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
        imagePerPage
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesContextProvider;
