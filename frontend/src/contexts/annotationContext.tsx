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
    const { image, updateListFile, currentImage, setCurrentImage, files } =
    useFilesContext();
    const [observations, setObservations] = useState<Annotation[]>([]);
    const [metadata, setMetadata] = useState<MetadataData>();
    const [status, setStatus] = useState<undefined | string>(undefined);
    const [isMinimalObservation, setIsMinimalObservation] = useState(
      observations?.length == 0
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

    const previous = () => {
        files.forEach((f, i) => {
            if (f.id === currentImage) {
                let ind = i === 0 ? (i = files.length) : i;
                setCurrentImage(files[ind - 1].id);

                updateUrl(files[ind - 1].id);
            }
        });
        setIsMinimalObservation(true);
    };

    const next = () => {
        files.forEach((f, i) => {
            if (f.id === currentImage) {
                let ind = i === files.length - 1 ? -1 : i;
                setCurrentImage(files[ind + 1].id);
                updateUrl(files[ind + 1].id);
            }
        });
        setIsMinimalObservation(true);
    };

    const lastOrFirstImage = (indice) => {
        if (indice == 'first') {
            setCurrentImage(files[0].id);
            updateUrl(files[0].id);
        }
        if (indice == 'last') {
            setCurrentImage(files[files.length - 1].id);
            updateUrl(files[files.length - 1].id);
        }
    };

    const save = () =>{
        if (!gridView) {
            if(modifiedObservationGroup.length > 0) {
                setOpenAnnotationGroupModale(true);
            };
            if(modifiedObservationGroup.length == 0) {
                FilesService
                .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, { annotations: { annotations:  observations, id_group: idGroup }, deployment_id: currentDeployment} )
                .then(res => {
                    updateListFile();
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
                        updateListFile();
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
            observationTemplate.id = uuidv4();
            setObservations([...observations, {...observationTemplate, id_group: idGroup}]);
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
        setStatus("being processed");
    };

    const handleCheckChange = () => {
        if (!checked) {
            setObservations([]);
            setIsMinimalObservation(true);
        };
        if (checked) {
            setObservations([...observations, observationTemplate]);
            setIsMinimalObservation(false);
        };
        setChecked(!checked);
        setStatus("being processed");
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
                let data = image().annotations?.map(item => ({ ...item }))
                image() && setObservations(data);
                image() && setStatus(image().treated ? "processed" : "not processed");
                image() && setMetadata({ date: image().date });
            }
        })();
    }, [files, currentImage]);

    useEffect(() => {
        (async () => {
            setChecked(observations?.length === 0);
        })();
    }, [observations]);
    
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
