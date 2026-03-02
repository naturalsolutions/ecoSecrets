import { capitalize } from "@mui/material";
import { t } from "i18next";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Annotation, FilesService, MetadataData } from "../client";
import { useMainContext } from "./mainContext";
import { useFilesContext } from "./filesContext";

export const AnnotationContext = createContext({} as any);

export const useAnnotationContext = () => useContext(AnnotationContext);

export function AnnotationContextProvider({ children }) {

    let params = useParams();

    const { projects, currentDeployment, setCurrentDeployment, setCurrentProject } = 
    useMainContext();
    const { image, updateListFile, currentImage, setCurrentImage, files, paginationFiles, imagePerPage } =
    useFilesContext();
    const [observations, setObservations] = useState<Annotation[]>([]);
    const [metadata, setMetadata] = useState<MetadataData>();
    const [status, setStatus] = useState<undefined | string>(undefined);
    const [isMinimalObservation, setIsMinimalObservation] = useState(
      observations?.length === 0
    );
    const [checked, setChecked] = useState<boolean>(observations?.length !== 0);
    const [openSaveErrorDialog, setOpenSaveErrorDialog] = useState({state: false, text: ""});
    const [gridView, setGridView] = useState(0); // 0: unique media, 1: grid
    const [selectedMedias, setSelectedMedias] = useState<any[]>([]);
    const [annotationButtonDisabled, setAnnotationButtonDisabled] = useState(false);

    const [tabValue, setTabValue] = useState(0);
    
    const [idGroup, setIdGroup] = useState<string>("");
    const [modifiedObservationGroup, setModifiedObservationGroup] = useState<Annotation[]>([]);
    const [openAnnotationGroupModale, setOpenAnnotationGroupModale] = useState(false);
    const [selectedGroupedObservation, setSelectedGroupedObservation] = useState<string[]>([]);
    const [unselectedGroupedObservation, setUnselectedGroupedObservation] = useState<string[]>([]);

    const fieldsMandatory = useMemo(() => (["species", "genus", "family", "order", "classe"]), []);
    const observationTemplate = useMemo(() => ({ id: "", id_annotation: "", id_group: "", classe: "", order: "", family: "", genus: "", species: "", life_stage: "", biological_state: "", comments: "", behaviour: "", sex: "", number: 0 }), []);

    const handleCloseSaveErrorDialog = () => {
        setOpenSaveErrorDialog({state: false, text: ""});
    };

    const updateUrl = (id) => {
        const url = new URL(window.location.toString());
        url.pathname = `/project/${Number(params.projectId)}/deployment/${Number(params.deploymentId)}/medias/${id}`;
        window.history.pushState({}, "", url);
    };

    const previous = async () => {
        const index = files.findIndex(f => f.id === currentImage);
        if (index === -1) return;
        if (index === 0) {
            if (paginationFiles.currentPage > 1) {
                await updateListFile(
                    (paginationFiles.currentPage - 2) * imagePerPage,
                    { idx: imagePerPage-1, projectId:params.projectId, deploymentId: params.deploymentId }
                );
    
                setIsMinimalObservation(true);
                return;
            }
            setIsMinimalObservation(true);
            return;
        }
        const prevImage = files[index - 1];
        setCurrentImage(prevImage.id);
        updateUrl(prevImage.id);
        setIsMinimalObservation(true);
    };
    

    const next = async () => {
        const index = files.findIndex(f => f.id === currentImage);
        if (index === -1) return;
        if (index === files.length - 1) {
            if (paginationFiles.currentPage < paginationFiles.totalPages) {
                await updateListFile(
                    (paginationFiles.currentPage +1 -1) *imagePerPage,
                    { idx: 0, projectId:params.projectId, deploymentId: params.deploymentId }
                );
                setIsMinimalObservation(true);
                return;
            }
            setIsMinimalObservation(true);
            return;
        }
        const nextImage = files[index + 1];
        setCurrentImage(nextImage.id);
        updateUrl(nextImage.id);
    
        setIsMinimalObservation(true);
    };
    

    const lastOrFirstImage = async (position: 'first' | 'last') => {
        if (files.length === 0) return;
        if (position === 'first') {
            if (paginationFiles.currentPage > 1 || files[0].id !== currentImage) {
                await updateListFile(
                    0,
                    { idx: 0, projectId:params.projectId, deploymentId: params.deploymentId}
                );
            } else {
                setCurrentImage(files[0].id);
                updateUrl(files[0].id);
            }
            setIsMinimalObservation(true);
            return;
        }
    
        if (position === 'last') {
            if (paginationFiles.currentPage < paginationFiles.totalPages || files[files.length - 1].id !== currentImage) {
                const lastPageSkip = (paginationFiles.totalPages - 1) * imagePerPage;
                await updateListFile(lastPageSkip, { idx: imagePerPage-1, projectId:params.projectId, deploymentId: params.deploymentId });
            } else {
                setCurrentImage(files[files.length - 1].id);
                updateUrl(files[files.length - 1].id);
            }
            setIsMinimalObservation(true);
            return;
        }
    };

    const save = () =>{
        if (!gridView) {
            if(modifiedObservationGroup.length > 0) {
                setOpenAnnotationGroupModale(true);
            };
            if(modifiedObservationGroup.length === 0) {
                FilesService
                .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, { annotations: { annotations:  observations, id_group: idGroup }, deployment_id: currentDeployment} )
                .then(res => {
                    updateListFile((paginationFiles.currentPage -1) *imagePerPage); 
                    next();
                })
                .catch((err) => {
                    console.log("Error during annotation saving.");
                    console.log(err);
                });
            };
        };

        if(gridView) {
            let selectedMediaNumber = selectedMedias.length;

            if (selectedMediaNumber === 0) {
                setOpenSaveErrorDialog({state: true, text: capitalize(t("annotations.cannot_save_no_media_selected"))});
            };

            if (selectedMediaNumber > 0) {
                selectedMedias.map((item) => {
                    FilesService
                    .updateAnnotationsFilesAnnotationFileIdPatch(item.id, { annotations: { annotations:  observations, id_group: idGroup }, deployment_id: currentDeployment} )
                    .then(res => {
                        updateListFile((paginationFiles.currentPage -1) *imagePerPage);
                    })
                    .catch((err) => {
                        console.log("Error during annotation saving.");
                        console.log(err);
                    });
                });
                setObservations([]);
            }
        };
    };

    const saveandnext = () => {
        if (isMinimalObservation) {
            save();
            if (gridView) {
                setSelectedMedias([]);
            };
        };
        if (!isMinimalObservation) {
            setOpenSaveErrorDialog({state: true, text: capitalize(t("annotations.cannot_save_species"))});
        };
    };

    const handleAddObservation = () => {
        if (isMinimalObservation) {
            const newObs = { ...observationTemplate, id: uuidv4(), id_group: idGroup };
            setObservations([...observations, newObs]);
        };
        if (checked) {
            setChecked(false);
        };
        setIsMinimalObservation(false);
        setStatus("being processed");
    };

    const handleDeleteObservation = (id: string) => {
        let i = observations && observations.findIndex((obs) => obs.id === id);
        let tmp_obs = [...observations]
        i !== -1 && tmp_obs.splice(i, 1);
        i !== -1 && setObservations(tmp_obs);
        i === observations.length - 1 && setIsMinimalObservation(true);
        setChecked(tmp_obs?.length === 0);
        setStatus("being processed");
    };

    const handleCheckChange = () => {
        const newChecked = !checked;

        setChecked(newChecked);
        setStatus("being processed");

        if (newChecked) {
            setObservations([]);
            setIsMinimalObservation(true);
        };
        if (!newChecked) {
            setObservations([{ ...observationTemplate, id: uuidv4(), id_group: idGroup }]);
            setIsMinimalObservation(false);
        };
    };

    const handleFormChange = (id: string, params: string, value: string) => {
        let tmp_obs = [...observations]

        tmp_obs.forEach(ob => {
            if (ob.id === id) {

                ob[params] = value;
                if (fieldsMandatory.includes(params) 
                    && ob[params] && 
                    ob["number"] === 0) {
                        setIsMinimalObservation(true);
                        ob["number"] = 1;
                };

                if (ob["id_group"] && params !== "comments" && !modifiedObservationGroup.map(observation => observation.id).includes(id)) {
                    setModifiedObservationGroup([...modifiedObservationGroup, ob])
                };
            }
        });
        setObservations(tmp_obs);
        setStatus("being processed");
    };

    useEffect(() => {
        (async () => {
            setCurrentDeployment(Number(params.deploymentId));
            setCurrentImage(params.imageId);
            setCurrentProject(Number(params.projectId));
        })();
    }, [projects]);

    useEffect(() => {
        (async () => {
            if (!gridView) {
                if(tabValue === 0) {
                    const img = image();
                    const data = img?.annotations?.map(item => ({ ...item })) ?? [];

                    if (img) {
                        img && setObservations(data);
                        img && setChecked(data?.length === 0);
                        img && setStatus(img.treated ? "processed" : "not processed");
                        img && setMetadata({ date: img.date });
                    }
                }
            }
        })();
    }, [files, currentImage, gridView, tabValue]);

    useEffect(() => {
        if (gridView) {
            setIdGroup(uuidv4());
        };
        if (!gridView) {
            setIdGroup("");
            setModifiedObservationGroup([]);
        };
        setSelectedMedias([]);
        observationTemplate.id_group = idGroup;
    }, [gridView]);

    useEffect(() => {
        setUnselectedGroupedObservation(modifiedObservationGroup.map((observation: Annotation) => observation.id));
    }, [modifiedObservationGroup]);

    return(
        <AnnotationContext.Provider 
            value={{
                observations, setObservations,
                status, setStatus,
                isMinimalObservation, setIsMinimalObservation,
                checked, setChecked,
                openSaveErrorDialog, setOpenSaveErrorDialog,
                tabValue, setTabValue,
                gridView, setGridView,
                selectedMedias, setSelectedMedias,
                openAnnotationGroupModale, setOpenAnnotationGroupModale,
                annotationButtonDisabled, setAnnotationButtonDisabled,
                modifiedObservationGroup, setModifiedObservationGroup,
                selectedGroupedObservation, setSelectedGroupedObservation,
                unselectedGroupedObservation, setUnselectedGroupedObservation,
                metadata, setMetadata, 
                handleCloseSaveErrorDialog,
                updateUrl,
                previous,
                lastOrFirstImage,
                next,
                save,
                saveandnext,
                handleAddObservation,
                handleDeleteObservation,
                handleCheckChange,
                handleFormChange
            }}
        >
            {children}
        </AnnotationContext.Provider>
    );
}

export default AnnotationContextProvider;
